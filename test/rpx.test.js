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
    {
      snapshot: true,
      title: 'specific rpx',
      pluginOptions: { rpx: { enable: false, size: 750 } },
      code: `
        function call() { return 1 };
        const height = call() + '100rpx'+ 30;
        const styles = stylesheet.create({ padding: "1rpx", height })
      `,
    },
  ],
});
