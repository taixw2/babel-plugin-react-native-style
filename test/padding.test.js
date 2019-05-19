const pluginTester = require('babel-plugin-tester')
const reactNativeStyle = require('../src/index')


pluginTester({

  plugin: reactNativeStyle,
  pluginName: 'babel-plugin-react-native-style',

  tests: [{
    title: '10 Abstand auf allen Seiten',
    code: `const styles = stylesheet.create({ padding: 10 })`,
    output: `
              const styles = stylesheet.create({
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10
              });
            `
  }, {
    pluginOptions: {
      autorpx: { enable: true, size: 750 },
    },
    title: 'oben und unten 10， links und rechts 20',
    code: `const styles = stylesheet.create({ padding: '10 20' })`,
    output: `
                import { __RPX } from 'babel-plugin-react-native-style/runtime/index';
                const styles = stylesheet.create({
                  paddingTop: __RPX(10, 750),
                  paddingRight: __RPX(20, 750),
                  paddingBottom: __RPX(10, 750),
                  paddingLeft: __RPX(20, 750)
                });
            `
  }, {
    pluginOptions: {
      autorpx: { enable: false },
    },
    title: 'oben 10， links und rechts 3， unten 20',
    code: `const styles = stylesheet.create({ padding: '10 3 20' })`,
    output: `
        const styles = stylesheet.create({
          paddingTop: 10,
          paddingRight: 3,
          paddingBottom: 20,
          paddingLeft: 3
        });
      `
  }, {
    pluginOptions: {
      autorpx: { enable: false },
    },
    title: 'oben 10， rechts 3， unten 30， links 5',
    code: `const styles = stylesheet.create({ padding: '10 3 30 5' })`,
    output: `
      const styles = stylesheet.create({
        paddingTop: 10,
        paddingRight: 3,
        paddingBottom: 30,
        paddingLeft: 5
      });
    `
  }]

})