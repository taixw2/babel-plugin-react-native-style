const valueUtil = require('../utils/value');

// support:
module.exports = ({ path, state, t, enter }, next) => {
  if (!enter) return next();
  if (!path.node) return next();
  const { key, value } = path.node;
  const properties = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];

  if (properties.some((property) => property === key.name)) {
    // console.log('TCL: value', value.value, key.name);
    path.node.value = valueUtil.gen(value, state.opts);
    return next();
  }
  if (key.name !== 'padding') return next();

  console.log('TCL: value.value', value.value, key.name);
  const values = valueUtil.split(value.value);
  if (!values || values.some((v) => !valueUtil.isValid(v))) {
    return next();
  }

  console.log('TCL: value', value.value, key.name);
  path.replaceWithMultiple(
    properties.map((v, i) => {
      const propertyKey = t.identifier(v);
      const propertyValue = valueUtil.genPlain(values[i]);
      return t.objectProperty(propertyKey, propertyValue);
    }),
  );
  return next();
};
