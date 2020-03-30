/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
const reactNative = require('react-native');

const screenWidth = reactNative.Dimensions.get('window').width;

exports.__RPX = (size, opts) =>
  reactNative.PixelRatio.roundToNearestPixel((screenWidth / opts.designWidth) * parseInt(size, 10));
