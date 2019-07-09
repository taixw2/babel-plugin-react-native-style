/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-assign */

const t = require('babel-types');

module.exports = {
  getLiteral(value) {
    const valueToNumber = Number(value);
    if (!Number.isNaN(valueToNumber)) {
      return t.numericLiteral(valueToNumber);
    }
    return t.stringLiteral(value);
  },

  callExpressionWithRPX(node, options = {}) {
    const { value } = node;
    const numericLiteral = Number(String(value).replace(/rpx$/, ''));
    if (Number.isNaN(numericLiteral)) return node;

    return t.callExpression(t.identifier('__RPX'), [
      t.numericLiteral(numericLiteral),
      t.numericLiteral(options.designWidth),
    ]);
  },

  transformUnit(node, options = {}) {
    // 数字， 并且默认启动 rpx: { padding: 1 }
    if (options.rpx) {
      return this.callExpressionWithRPX(node, options);
    }

    // 显示声明 rpx: { padding: '1rpx' }
    if (/.+rpx$/.test(node.value)) {
      return this.callExpressionWithRPX(node, options);
    }

    // 带 pt 结尾的： { padding: '1pt' }
    if (/.+pt$/.test(node.value)) {
      return t.numericLiteral(Number(node.value.replace('pt', '')));
    }

    return node;
  },
};
