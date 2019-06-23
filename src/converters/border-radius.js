const t = require('babel-types');
const valueUtil = require('../utils/value');
const validationUtil = require('../utils/validation');

module.exports = ({ path, enter }, next) => {
  if (!enter) return next();
  if (!path.node) return next();
  const { key, value } = path.node;
  if (key.name !== 'borderRadius') return next();
  if (!t.isLiteral(value)) return next();

  const properties = [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ];

  const values = valueUtil.split(value.value);
  // 值无效
  if (!values || values.some((v) => !validationUtil.value(v))) {
    return next();
  }

  path.replaceWithMultiple(
    properties.map((v, i) => {
      const propertyKey = t.identifier(v);
      const propertyValue = valueUtil.genPlain(values[i]);
      return t.objectProperty(propertyKey, propertyValue);
    }),
  );
  return next();
};
