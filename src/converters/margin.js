const valueUtil = require('../utils/value');

// support:
// margin: '1'
// margin: '1 2'
// margin: '1 2 3'
// margin: '1 2 3 4'
module.exports = ({ path, t, enter }, next) => {
  if (!enter) return next();
  if (!path.node) return next();
  const { key, value } = path.node;
  const properties = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
  if (key.name !== 'margin') return next();

  const values = valueUtil.split(value.value);
  // 值无效
  if (!values || values.some((v) => !valueUtil.isValid(v))) {
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
