// normal value convert

const utils = require('../utils/index');
const opts = require('../utils/opts');
const enums = require('../utils/enum');

module.exports = ({ path, state, enter }, next) => {
  if (!enter) return next();

  const { key, value } = path.node;
  const property = enums.widthProperties.filter(pro => pro === key.name)[0];
  // 不需要转换
  if (!property) return next();

  path.node.value = utils.insertValue(value, opts(state.opts));
  utils.inertRPXImport(path);
  return next();
};
