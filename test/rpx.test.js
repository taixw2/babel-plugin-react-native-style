const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',

  tests: [
    {
      snapshot: true,
      title: 'rpx convert',
      pluginOptions: { rpx: { enable: true, size: 750 } },
      code: 'const styles = stylesheet.create({ padding: 1 })',
    },
  ],
});
