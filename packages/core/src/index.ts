import { PluginObj, NodePath } from '@babel/core';
import t from '@babel/types';
import { getStylesForProperty } from 'css-to-react-native';
import StyleTable from './style-table';

const supportUnit = ['rpx', 'pt', 'px', 'vh', 'vw'];

/**
 * 插入import
 * 判断 import 是否有同名
 * 如果没有则插入一条新的
 * 如果有，
 * 则判断是否有导出同名的 ident,
 * 如果有则跳过，
 * 如果没有则替换
 *
 * @param {*} bpath ast path
 * @param {*} source 依赖名
 * @param {*} ident 导出字段名
 */
function injectImportExpression(bpath: NodePath, source: string, ident: string) {
  const program = bpath.findParent((parentNode) => t.isProgram(parentNode));
  const find = (callback: (path: NodePath<t.Node>) => boolean) =>
    program.get('body').find(callback);

  const firstImportNodePath = find((nodePath) => t.isImportDeclaration(nodePath.node));

  const matchedLibraryPath = find(
    (nodePath) => t.isImportDeclaration(nodePath.node) && nodePath.node.source.value === source,
  );

  const generatorImportStrcut = (idents: Array<string>) =>
    t.importDeclaration(
      idents.map((curId: string) => t.importSpecifier(t.identifier(curId), t.identifier(curId))),
      t.stringLiteral(source),
    );

  if (!firstImportNodePath) return;
  if (!matchedLibraryPath) {
    firstImportNodePath.replaceWithMultiple([
      firstImportNodePath.node,
      generatorImportStrcut([ident]),
    ]);
    return;
  }

  const importNode = matchedLibraryPath.node as t.ImportDeclaration;
  if (!importNode.specifiers) {
    console.log('依赖没有 specifier, 请检查', source);
    return;
  }

  const existIdentifier = importNode.specifiers.find((v) => v.local.name === ident);
  // 已经导入了，则跳过
  if (existIdentifier) return;
  importNode.specifiers.push(t.importSpecifier(t.identifier(ident), t.identifier(ident)));
}

export default (): PluginObj => {
  return {
    name: 'babel-plugin-react-native-style',

    visitor: {
      ObjectProperty(path) {
        if (!StyleTable.includes(path.node.key?.name)) return;
        if (!t.isStringLiteral(path.node.value) || !t.isNumberLiteral) return;
        const styleSheet = getStylesForProperty(path.node.key.name, path.node.value.value);

        const importLibrarys = new Set();
        const nodes = Object.keys(styleSheet).map((key) => {
          const value = styleSheet[key];
          const isNumber = Number(value) === Number(value);

          let propertyValue:
            | t.NumericLiteral
            | t.StringLiteral
            | t.CallExpression = t.stringLiteral(value);
          if (isNumber) {
            propertyValue = t.numericLiteral(Number(value));
          } else if (supportUnit.some((unit) => value.endsWith(unit))) {
            for (let index = 0; index < supportUnit.length; index++) {
              const unit = supportUnit[index];
              const variName = '__$' + unit;
              importLibrarys.add(variName);

              propertyValue = t.callExpression(t.identifier(variName), [
                t.numericLiteral(Number(value)),
              ]);
            }
          }

          return t.objectProperty(t.identifier(key), propertyValue);
        });

        importLibrarys.forEach((vari: any) => {
          injectImportExpression(path, 'react-native-style-runtime', vari as string);
        });

        path.replaceWithMultiple(nodes);
      },
    },
  };
};
