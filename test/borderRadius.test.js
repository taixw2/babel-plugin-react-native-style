const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',
  tests: [
    {
      snapshot: true,
      title: 'border radius test',
      pluginOptions: { rpx: true, designWidth: 750 },
      code: `const styles = stylesheet.create({
          one: { borderRadius: '1 1pt 0 0' },
          two: { borderRadius: '1 1 0', },
          three: { borderRadius: '1rpx 0' }
        })`,
    },
  ],
});
