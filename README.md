# babel-plugin-react-native-style

Improve the writing stylesheet experience

[![Package Quality](https://npm.packagequality.com/shield/babel-plugin-react-native-style.svg?style=flat)](https://packagequality.com/#?package=babel-plugin-react-native-style)
[![Travis](https://img.shields.io/travis/taixw2/babel-plugin-react-native-style.svg?style=flat)](https://travis-ci.org/taixw2/babel-plugin-react-native-style)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/taixw2/babel-plugin-react-native-style.svg)](https://github.com/taixw2/babel-plugin-react-native-style)

This plugin is a highly recommended supplement to the base stylesheet library of react native, offering some useful features:

- compilation rpx
- supporting space values: `padding: "20rpx 20pt 10"`

## output
```javascript
// 1. border: '1 solid #fff'
// --->output
borderWidth: 1,
borderStyle: 'solid',
borderColor: '#fff',

// 2. rpx
// height: '1rpx'
// --->output
var __RPX = require('babel-plugin-react-native-style-runtime').__RPX;
height: __RPX(1)

// 3. padding: '1 2rpx'
// --->output
var __RPX = require('babel-plugin-react-native-style-runtime').__RPX;
paddingTop: 1,
paddingBottom: 1,
paddingLeft: __RPX(2),
paddingRight: __RPX(2)

// ...support list
// padding, margin, border, borderRadius, ...
```

## Quick start

Install the plugin first:

```bash
npm install babel-plugin-react-native-style-runtime babel-plugin-react-native-style --save-dev
```

or use `yarn`

```bash
yarn add babel-plugin-react-native-style-runtime babel-plugin-react-native-style -D
```

Then add it to your babel configuration:

```json
{
  "plugins": ["react-native-style"]
}
```

## License
Licensed under the MIT License,Copyright (c) 2019 ouyangxin.

See [LICENSE.md](./LICENSE) for more information.

