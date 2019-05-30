const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',
  tests: [
    {
      snapshot: true,
      title: 'border test',
      code:
        "const styles = stylesheet.create({ border: 'solid', borderLeft: '1 solid', borderLeftColor: '#fff' })",
    },
  ],
});
