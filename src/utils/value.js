/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-assign */

const t = require('babel-types');
const defaultOpts = require('./opts');
const _ = require('lodash');

module.exports = {
  // split value
  // @returns [top, right, bottom, left]
  split(value) {
    let top = 0;
    let right = 0;
    let bottom = 0;
    let left = 0;
    // console.log('TCL: split -> value', value);
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

  isValid(value) {
    if (value === 'auto') return true;
    if (/^(\d+(\.\d+)?|\.\d+|\d+)?(%|pt|rpx)*$/.test(value)) return true;
    return false;
  },

  gen(value, opts) {
    const options = defaultOpts(opts);
    if (t.isNumericLiteral(value) && options.rpx.enable) {
      return t.callExpression(t.identifier('__RPX'), [
        value,
        t.numericLiteral(opts.rpx.size || 750),
      ]);
    }
    if (/\d+pt$/.test(value.value)) {
      return t.numericLiteral(Number(value.value.replace('pt', '')));
    }
    if (_.isFinite(Number(value.value))) {
      return t.numericLiteral(Number(value.value));
    }
    return value;
  },

  genPlain(plainValue) {
    let value = null;
    if (_.isFinite(Number(plainValue))) {
      value = t.numericLiteral(Number(plainValue));
    }
    if (_.isString(plainValue)) {
      value = t.stringLiteral(plainValue);
    }

    if (!value) {
      throw new Error(`value invalid: ${plainValue}`);
    }
    return value;
  },
};
