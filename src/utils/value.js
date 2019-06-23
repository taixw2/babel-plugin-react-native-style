/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-assign */

const t = require('babel-types');
const defaultOpts = require('./opts');
const validation = require('./validation');
const _ = require('lodash');

module.exports = {
  // split value
  // @returns [top, right, bottom, left]
  split(value) {
    let top = 0;
    let right = 0;
    let bottom = 0;
    let left = 0;
    if (!value) return null;
    const values = String(value)
      .split(' ')
      .filter((v) => v.trim());

    if (values.length === 1) {
      top = right = bottom = left = values[0];
    }
    if (values.length === 2) {
      top = bottom = values[0];
      right = left = values[1];
    }
    if (values.length === 3) {
      top = values[0];
      right = left = values[1];
      bottom = values[2];
    }
    if (values.length > 3) {
      [top, right, bottom, left] = values;
    }
    return [top, right, bottom, left];
  },

  callRPX(node, opts) {
    const options = defaultOpts(opts);
    return t.callExpression(t.identifier('__RPX'), [node, t.numericLiteral(options.rpx.size || 750)]);
  },

  specialRPX(node, opts) {
    const options = defaultOpts(opts);
    if (!validation.value(node.value)) {
      return node;
    }

    if (/.+rpx$/.test(node.value)) {
      node.value = Number(node.value.replace('rpx', ''));
      return this.callRPX(node, options);
    }

    return node;
  },

  gen(node, opts) {
    const options = defaultOpts(opts);
    if (!validation.value(node.value)) {
      return node;
    }

    // 数字， 并且默认启动 rpx: { padding: 1 }
    if (options.rpx.enable && _.isFinite(Number(node.value))) {
      return this.callRPX(node, options);
    }

    // 显示声明 rpx: { padding: '1rpx' }
    if (/.+rpx$/.test(node.value)) {
      node.value = Number(node.value.replace('rpx', ''));
      return this.callRPX(node, options);
    }

    // 带 pt 结尾的： { padding: '1pt' }
    if (/\d+pt$/.test(node.value)) {
      return t.numericLiteral(Number(node.value.replace('pt', '')));
    }

    return node;
  },

  genPlain(plainValue) {
    if (_.isFinite(Number(plainValue))) {
      return t.numericLiteral(Number(plainValue));
    }
    if (_.isString(plainValue)) {
      return t.stringLiteral(plainValue);
    }

    throw new Error(`value invalid: ${plainValue}`);
  },
};
