/* eslint-disable arrow-parens */
const enums = require('./enum');
const t = require('babel-types');
const _ = require('lodash');

module.exports = {
  plainObjectProperty(node) {
    return node && t.isLiteral(node.key) && t.isLiteral(node.value);
  },

  value(value) {
    if (value === 'auto') return true;
    if (/^(\d+(\.\d+)?|\.\d+|\d+)?(%|pt|rpx)*$/.test(value)) return true;
    return false;
  },

  borderStyle(borderStyle) {
    return enums.borderStyle.includes(borderStyle);
  },

  color(color) {
    const colorWithoutSpaces = color.replace(/\s/g, '');
    return enums.colors.some((pattern) => {
      if (_.isString(pattern)) {
        return pattern === colorWithoutSpaces;
      }
      return pattern.test(colorWithoutSpaces);
    });
  },

  pointProperty(pt) {
    return enums.widthProperties.some((v) => v === pt.trim());
  },
};
