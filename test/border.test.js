const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',
  tests: [
    {
      snapshot: true,
      title: 'border test',
      pluginOptions: { rpx: { enable: true, size: 750 } },
      code: `const styles = stylesheet.create({
          one: { border: 'solid #efe', borderLeft: '1 solid', borderLeftColor: '#fff' },
          two: { borderLeft: '1pt solid', borderLeftColor: '#fff' },
        })`,
    },
  ],
});
