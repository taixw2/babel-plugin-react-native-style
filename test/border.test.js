const pluginTester = require('babel-plugin-tester');
const esmRequire = require('esm')(module)
const reactNativeStyle = esmRequire('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',
  tests: [
    {
      snapshot: true,
      title: 'border test',
      pluginOptions: { rpx: true, designWidth: 750 },
      code: `const styles = stylesheet.create({
          one: { border: 'solid #efe', borderLeft: '1 solid' },
          two: { borderLeft: '1pt solid' },
          three: { borderLeft: '1rpx solid rgba(51, 51, 51, 0.15)' },
        })`,
    },
  ],
});
