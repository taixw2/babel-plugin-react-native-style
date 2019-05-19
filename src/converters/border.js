const utils = require('../utils/index')


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

  const borderStyles = ['solid', 'dotted', 'dashed'];
  const values = value.value.split(' ');
  if (values.length === 1) {
    if (Number(values[0]) === Number(values[0])) {
      width = Number(values[0]);
    }

    if (['solid', 'dotted', 'dashed'].includes) {}

  }

  // console.info('propertyName', propertyName, value)

  // const fullValue = utils.splitBoxValue(value.value);
  // if (fullValue.some(v => !utils.isValidValue(v))) {
  //   return;
  // }

  // const properties = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']
  // path.replaceWithMultiple(
  //   properties.map((v, i) => (
  //     t.objectProperty(
  //       t.identifier(v),
  //       utils.insertValue(fullValue[i], t, options.get('autorpx'))
  //     )
  //   ))
  // );
}