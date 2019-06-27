const _ = require('lodash');

module.exports = (opts = {}) =>
  _.defaultsDeep(opts, {
    rpx: false,
    designWidth: 750,
  });
