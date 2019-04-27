
const pluginTester = require('babel-plugin-tester')
const reactNativeStyle = require('../src/index')

pluginTester({

    plugin: reactNativeStyle,
    pluginName: 'babel-plugin-react-native-style',

    tests: [{
      title: 'auto tansform pt to rpx',
      pluginOptions: {},
      code: `
        const styles = stylesheet.create({ padding: 10 })
      `,
      output: `
        const styles = stylesheet.create({
          paddingLeft: rpx(10),
          paddingRight: rpx(10),
          paddingTop: rpx(10),
          paddingBottom: rpx(10)
        })
      `
    }, 
    // {
    //   title: 'auto tansform space value',
    //   pluginOptions: {},
    //   code: `
    //     const styles = stylesheet.create({ padding: '10 20 10', margin: '15pt 10' })
    //   `,
    //   output: `
    //     const styles = stylesheet.create({
    //       paddingLeft: rpx(20),
    //       paddingRight: rpx(20),
    //       paddingTop: rpx(10),
    //       paddingBottom: rpx(10),
    //       marginLeft: rpx(10),
    //       marginRight: rpx(10),
    //       marginTop: 15,
    //       marginBottom: 15
    //     })
    //   `
    // }
    ]

})