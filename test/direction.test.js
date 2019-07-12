/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable prefer-spread */
const pluginTester = require('babel-plugin-tester');
const esmRequire = require('esm')(module)
const reactNativeStyle = esmRequire('../src/index');

const direction = ['padding', 'margin', 'borderRadius'];

const flat = (array) => [].concat.apply([], array);

// console.log('TCL: data', data);

const tempCode = (code) => `const styles = stylesheet.create({${code}})`;

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',
  title: 'directions shorthand',
  pluginOptions: { rpx: false, designWidth: 750 },
  tests: flat(
    direction
      // eslint-disable-next-line arrow-body-style
      .map((item) => {
        return ['4', '3', '2', '1'].map((length) => {
          const values = Array.from({ length }).map((_, i) => i);
          return {
            title: `transforms ${item} shorthand with ${length} values`,
            code: tempCode(`${item}: "${values.join(' ')}"`),
            snapshot: true,
          };
        });
      }),
  ),
});
