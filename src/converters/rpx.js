// normal value convert
const t = require('babel-types');
const validation = require('../utils/validation');
const valueUtil = require('../utils/value');
const bom = require('../utils/bom');

module.exports = ({ path, state, enter }, next) => {
  if (enter) return next();
  if (!path.node) return next();

  const { key, value } = path.node;

  // 处理对象属性
  if (t.isObjectProperty(path.node)) {
    if (!validation.pointProperty(key.name)) return next();
    path.node.value = valueUtil.gen(value, state.opts);
    bom.insertRPXReference(path);
    return next();
  }

  if (t.isStringLiteral(path.node) && /.+rpx$/.test(path.node.value)) {
    path.replaceWith(valueUtil.specialRPX(path.node, state.opts));
    return next();
  }

  return next();
};
