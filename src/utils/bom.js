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
      t.importDeclaration(
        [t.importSpecifier(t.identifier(identifier), t.identifier(identifier))],
        t.stringLiteral(source),
      ),
    );
  },

  insertRPXReference(path) {
    this.insertImport(path, '__RPX', 'babel-plugin-react-native-style/src/runtime/index');
  },

  imported(path, name, source) {
    // TODO: 如果拥有相同的引用常量名称
    return _.find(this.program(path).node.body, (node) => {
      if (!t.isImportDeclaration(node)) {
        return false;
      }

      if (node.source.value !== source) {
        return false;
      }

      return node.specifiers.some((spe) => {
        if (t.isImportDefaultSpecifier(spe)) {
          return spe.local.name === name;
        }
        if (t.isImportSpecifier(spe)) {
          return spe.imported.name === name || spe.local.name === name;
        }
        return false;
      });
    });
  },
};
