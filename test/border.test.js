const pluginTester = require('babel-plugin-tester')
const reactNativeStyle = require('../src/index')


pluginTester({

  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',

  tests: [{
    title: 'style',
    code: `const styles = stylesheet.create({ border: 'solid' })`,
    output: `
              const styles = stylesheet.create({
                borderStyle: 'solid',
              });
            `
  }]

})