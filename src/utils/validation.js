/* eslint-disable arrow-parens */
const t = require('babel-types');

module.exports = {
  plainObjectProperty(node) {
    if (!node) return false;
    if (!t.isLiteral(node.value)) return false;
    if (!t.isIdentifier(node.key)) return false;
    return true;
  },

  lengthUnit(value) {
    return /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?(vh|vw|rpx|pt))$/.test(value);
  },
};
