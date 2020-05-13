import { NodePath } from '@babel/core';
import * as t from '@babel/types';
import { getStylesForProperty } from 'css-to-react-native';
import StyleTable from './style-table';
import { injectImportExpression } from './utils';
import { isEqual } from 'lodash';

const supportUnit = ['rpx', 'pt', 'px', 'vh', 'vw'];

export function normalTransform(path: NodePath<t.ObjectProperty>) {
  if (!StyleTable.includes(path.node.key?.name)) {
    return;
  }

  // 只会转换 string 和 number, 其他表达式不转换
  if (!t.isStringLiteral(path.node.value) && !t.isNumericLiteral(path.node.value)) return;

  const styleSheet = getStylesForProperty(path.node.key?.name, String(path.node.value.value));

  // 无需转换
  if (
    isEqual(styleSheet, { [path.node.key?.name]: path.node.value.value }) &&
    !isSuportUnit(path.node.value.value)
  ) {
    return;
  }

  const importLibrarys = new Set();
  const nodes: t.ObjectProperty[] = [];

  // 转换成 babel ast
  Object.keys(styleSheet).forEach((key: string) => {
    const value = styleSheet[key];

    if (isNumber(value)) {
      nodes.push(t.objectProperty(t.identifier(key), t.numericLiteral(Number(value))));
      return;
    }

    if (isSuportUnit(value)) {
      const unit = getUnit(value);
      const exportVariable = `__$${unit}`;
      importLibrarys.add(exportVariable);

      nodes.push(
        t.objectProperty(
          t.identifier(key),
          t.callExpression(t.identifier(exportVariable), [
            t.numericLiteral(Number(value.substr(0, value.length - unit.length))),
          ]),
        ),
      );
      return;
    }

    nodes.push(t.objectProperty(t.identifier(key), t.stringLiteral(value)));
  });

  importLibrarys.forEach((vari: any) => {
    injectImportExpression(path as any, 'react-native-style-runtime', vari as string);
  });

  path.replaceWithMultiple(nodes);
}

function isNumber(value: any): boolean {
  return value * 1 === value * 1;
}

function isSuportUnit(value: any): boolean {
  return supportUnit.some((unit) => String(value).endsWith(unit));
}

function getUnit(value: string): string {
  return supportUnit.filter((unit) => value.endsWith(unit))[0];
}
