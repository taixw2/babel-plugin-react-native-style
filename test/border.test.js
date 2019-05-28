const pluginTester = require('babel-plugin-tester');
const reactNativeStyle = require('../src/index');

pluginTester({
  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',
  tests: [
    {
      snapshot: false,
      title: 'border test',
      code:
        "const styles = stylesheet.create({ border: 'solid', borderLeft: '1 solid', borderLeftColor: '#fff' })",
      output: `
          const styles = stylesheet.create({
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#000',
            borderLeftWidth: 1,
            borderLeftStyle: 'solid',
            borderLeftColor: '#000',
            borderLeftColor: '#fff' });
            `,
    },
  ],
});
