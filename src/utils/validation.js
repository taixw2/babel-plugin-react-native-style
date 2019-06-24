/* eslint-disable arrow-parens */
const enums = require('./enum');
const t = require('babel-types');
const _ = require('lodash');

module.exports = {
  plainObjectProperty(node) {
    if (!node) return false;
    if (!t.isLiteral(node.value)) return false;
    if (!t.isIdentifier(node.key)) return false;
    return true;
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
    if (!pt) return false;
    return enums.widthProperties.some((v) => v === pt.trim());
  },
};
