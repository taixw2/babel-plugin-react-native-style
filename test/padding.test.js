const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',

  tests: [
    {
      snapshot: true,
      title: 'padding test',
      pluginOptions: { rpx: { enable: true, size: 750 } },
      code: `
      const styles = stylesheet.create({
        one: { padding: '0pt' },
        two: { padding: '10% 1pt' },
        three: { padding: '10% 1pt 5' },
        four: { padding: '10% 1pt 0.5 3' },
        five: { padding: '10 auto 5' },
      })
    `,
    },
  ],
});
