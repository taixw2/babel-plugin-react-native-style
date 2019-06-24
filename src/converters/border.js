const t = require('babel-types');
const validationUtil = require('../utils/validation');
const valueUtil = require('../utils/value');

// support:
// border: '1'    // width
// border: 'solid'    // style
// border: '1 solid'    // width style
// border: 'solid #000'    // style color
// border: '1 solid #000'    // width style color
module.exports = ({ path, state }, next) => {
  if (!validationUtil.plainObjectProperty(path.node)) return next();
  const { key, value } = path.node;
  const [propertyName] = key.name.match(/^border[Left|Right|Top|Bottom]*$/) || [];
  if (!propertyName) return next();

  let width = 1;
  let style = 'solid';
  let color = '#000';

  String(value.value)
    .split(' ')
    .slice(0, 3)
    .forEach((v) => {
      // 是一个数字
      if (validationUtil.value(v)) {
        width = v;
        return;
      }
      if (validationUtil.borderStyle(v)) {
        style = v;
        return;
      }
      if (validationUtil.color(v)) {
        color = v;
      }
    });

  const widthIdentifier = t.identifier(`${propertyName}Width`);
  const styleIdentifier = t.identifier('borderStyle');
  const colorIdentifier = t.identifier(`${propertyName}Color`);
  path.replaceWithMultiple([
    t.objectProperty(widthIdentifier, valueUtil.genPlain(width, state.opts)),
    t.objectProperty(styleIdentifier, t.stringLiteral(style)),
    t.objectProperty(colorIdentifier, t.stringLiteral(color)),
  ]);

  return next();
};
