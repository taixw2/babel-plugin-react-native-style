const t = require('babel-types');
const _ = require('lodash');

module.exports = {
  program(path) {
    return path.findParent((parent) => parent.isProgram());
  },

  insertFirst(path, expression) {
    this.program(path).node.body.unshift(expression);
  },

  insertLaster(path, expression) {
    this.program(path).node.body.pop(expression);
  },

  insertImport(path, identifier, source) {
    if (this.imported(path, identifier, source)) {
      return;
    }

    this.insertFirst(
      path,
      t.variableDeclaration('var', [
        t.variableDeclarator(
          t.identifier(identifier),
          t.memberExpression(
            t.callExpression(t.identifier('require'), [t.stringLiteral(source)]),
            t.identifier(identifier),
          ),
        ),
      ]),
    );
  },

  insertRPXReference(path) {
    this.insertImport(path, '__RPX', 'babel-plugin-react-native-style-runtime');
  },


  /**
   * 判断是否 require， 目前仅判断变量是否声明
   *
   * @param {*} path
   * @param {*} name
   * @returns
   */
  imported(path, name) {
    // TODO: 如果拥有相同的引用常量名称
    return _.find(this.program(path).node.body, (node) => {
      if (!t.isVariableDeclaration(node)) {
        return false;
      }

      return node.declarations[0].id.name === name;
    });
  },
};
