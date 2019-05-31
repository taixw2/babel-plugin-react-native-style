// normal value convert
const validation = require('../utils/validation');
const valueUtil = require('../utils/value');
const bom = require('../utils/bom');

module.exports = ({ path, state, enter }, next) => {
  if (enter) return next();
  if (!path.node) return next();

  const { key, value } = path.node;
  // 不需要转换
  if (!validation.pointProperty(key.name)) return next();

  path.node.value = valueUtil.gen(value, state.opts);
  bom.insertRPXReference(path);
  return next();
};
