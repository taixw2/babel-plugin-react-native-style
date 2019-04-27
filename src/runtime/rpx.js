const reactNative = require('react-native');

const { width } = reactNative.Dimensions.get('window');
module.exports = (pt, designSize = 750) => reactNative.PixelRatio.roundToNearestPixel((pt * width) / designSize);

