/* eslint-disable no-console */
const convertUtil = require('babel-plugin-react-native-style-convert-plugin');
const t = require('babel-types');
const _ = require('lodash');
const validationUtil = require('./utils/validation');
const valueUtil = require('./utils/value');
const constants = require('./utils/constant');

const defaultOptions = {
  rpx: false,
  designWidth: 750,
  debug: false,
};

module.exports = () => {
  function transformProperty(path, state) {
    const { node } = path;
    const options = _.defaults(state.opts, defaultOptions);
    if (!validationUtil.plainObjectProperty(node)) return;
    if (!constants.allowProperties.includes(node.key.name)) return;

    const styles = convertUtil.getStylesForProperty(node.key.name, String(node.value.value));
    if (!styles) {
      if (options.debug) {
        console.info('无法转换: ', node.key.name, node.value.value);
        console.info(state.file.opts.filename);
      }
      return null;
    }
    path.replaceWithMultiple(
      Object.keys(styles).map((keyName) =>
        t.objectProperty(t.identifier(keyName), valueUtil.getLiteral(styles[keyName])),
      ),
    );
  }

  function transformUnit(path, state) {
    const { node } = path;
    const options = _.defaults(state.opts, defaultOptions);
    if (
      validationUtil.plainObjectProperty(node) &&
      constants.lengthProperties.includes(node.key.name)
    ) {
      const transformNodeValue = valueUtil.transformUnit(node.value, options);
      if (transformNodeValue === node.value) return;

      path.replaceWith(t.objectProperty(node.key, transformNodeValue));
    }
  }

  return {
    name: 'babel-plugin-react-native-style',
    visitor: {
      /**
       * 替换对应对象
       * 对应对象的值如果是 pt, rpx, vh, vw 等会直接转换
       *
       * @param {*} path
       * @param {*} state
       */
      ObjectProperty(path, state) {
        transformProperty(path, state);
        transformUnit(path, state);
      },
      StringLiteral: {
        /**
         * 字符串中存在 rpx 会被转换，其余均不会
         *
         * @param {*} path
         * @param {*} state
         */
        exit(path, state) {
          const { node } = path;
          if (!node) return;
          if (!node.value) return;
          if (!node.value.endsWith('rpx')) return;
          const transformNodeValue = valueUtil.callExpressionWithRPX(
            node,
            _.defaults(state.opts, defaultOptions),
          );
          if (transformNodeValue === node) return;
          path.replaceWith(transformNodeValue);
        },
      },
      CallExpression(path) {
        const { name } = path.node.callee;
        if (name !== '__RPX') return;
        if (path.scope.hasBinding(name)) return;
        const Program = path.findParent((p) => p.isProgram());

        const referenceRPX = t.variableDeclaration('var', [
          t.variableDeclarator(
            t.identifier('__RPX'),
            t.memberExpression(
              t.callExpression(t.identifier('require'), [
                t.stringLiteral('babel-plugin-react-native-style-runtime'),
              ]),
              t.identifier('__RPX'),
            ),
          ),
        ]);

        const parentScope = path.scope.getFunctionParent() || path.scope.getProgramParent();

        Program.unshiftContainer('body', referenceRPX);
        parentScope.registerBinding('var', Program.get('body.0.declarations.0.id'));
      },
    },
  };
};
