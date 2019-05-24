// normal value convert

const utils = require('../utils/index')
const opts = require('../utils/opts')
const enums = require('../utils/enum')


module.exports = function({ path, state, t, enter }, next) {
	if (!enter) { return }

  const { key, value } = path.node;
	const property = enums.widthProperties.filter(property => property === key.name)[0];
	// 不需要转换
	if (!property) { return }

	path.node.value = utils.insertValue(value, opts(state.opts))

	utils.inertRPXImport(path);
}
