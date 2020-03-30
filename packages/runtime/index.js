/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
const reactNative = require('react-native');

const screenWidth = reactNative.Dimensions.get('window').width;
const screenHeight = reactNative.Dimensions.get('window').height;

const roundToNearestPixel = (arg) => reactNative.PixelRatio.roundToNearestPixel(arg)

exports.__$rpx = size => roundToNearestPixel((screenWidth / 750) * size);
exports.__$vw = size => roundToNearestPixel(screenWidth * (size * 0.01));
exports.__$vh = size => roundToNearestPixel(screenHeight * (size * 0.01));
exports.__$pt = size => size;
exports.__$px = size => size;
