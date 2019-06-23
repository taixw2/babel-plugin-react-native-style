const valueUtil = require('../utils/value');
const validationUtil = require('../utils/validation');

// support:
module.exports = ({ path, t, enter }, next) => {
  if (!enter) return next();
  if (!validationUtil.plainObjectProperty(path.node)) return next();
  const { key, value } = path.node;
  const properties = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
  if (key.name !== 'padding') return next();

  const values = valueUtil.split(value.value);
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
