import { NodePath } from '@babel/core';
import * as t from '@babel/types';

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
export function injectImportExpression(bpath: NodePath, source: string, ident: string) {
  const programPath = bpath.findParent((parentNode) => t.isProgram(parentNode));
  const find = (callback: (path: NodePath<t.Node>) => boolean) =>
    programPath.get('body').find(callback);

  const firstImportNodePath = find((nodePath) => t.isImportDeclaration(nodePath.node));

  const generatorImportStrcut = (idents: Array<string>) =>
    t.importDeclaration(
      idents.map((curId: string) => t.importSpecifier(t.identifier(curId), t.identifier(curId))),
      t.stringLiteral(source),
    );

  if (!firstImportNodePath) {
    // program.get('body').unshiftContainer
    (programPath.node as t.Program).body.unshift(generatorImportStrcut([ident]));
    return;
  }

  const matchedLibraryPath = find(
    (nodePath) => t.isImportDeclaration(nodePath.node) && nodePath.node.source.value === source,
  );

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
