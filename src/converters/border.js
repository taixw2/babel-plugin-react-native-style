const utils = require('../utils/index')
const opts = require('../utils/opts')
const enums = require('../utils/enum')


// support:
// border: '1'    // width
// border: 'solid'    // style
// border: '1 solid'    // width style
// border: 'solid #000'    // style color
// border: '1 solid #000'    // width style color
module.exports = function({ path, state, t }, next) {
  const { key, value } = path.node;
  const [propertyName] = key.name.match(/^border[Left|Right|Top|Bottom]*$/) || [];
  if (!propertyName) {
    return;
  }

  let width = 1;
  let style = 'solid';
  let color = '#000';

  const values = value.value.split(' ');

  function setValue(value) {
    if (Number(value) === Number(values[0])) {
      width = Number(value);
      return
    }

    if (enums.borderStyle.includes(value)) {
      style = value;
      return
    }

    if (utils.isValidColor(value)) {
      color = value;
    }
  }

  if (values.length === 1) {
    setValue(values[0])
  }
  if (values.length === 2) {
    setValue(values[0])
    setValue(values[1])
  }
  if (values.length === 3) {
    setValue(values[0])
    setValue(values[1])
    setValue(values[3])
  }

  const widthIdentifier = t.identifier(`${propertyName}Width`);
  const styleIdentifier = t.identifier(`${propertyName}Style`);
  const colorIdentifier = t.identifier(`${propertyName}Color`);

  path.replaceWithMultiple(
    [
      t.objectProperty(widthIdentifier, utils.insertValue(t.numericLiteral(width), opts(state.opts))),
      t.objectProperty(styleIdentifier, t.stringLiteral(style)),
      t.objectProperty(colorIdentifier, t.stringLiteral(color)),
    ]
  );
}