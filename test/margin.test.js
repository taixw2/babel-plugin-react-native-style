const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',

  tests: [
    {
      snapshot: true,
      title: 'margin test',
      pluginOptions: { rpx: true, designWidth: 750 },
      code: `
      const styles = stylesheet.create({
        one: { margin: 0 },
        two: { margin: '10 1' },
        three: { margin: '10 1 5' },
        four: { margin: '10 1 5 3' },
        five: { margin: '10 auto 5' },
      })
    `,
    },
  ],
});
