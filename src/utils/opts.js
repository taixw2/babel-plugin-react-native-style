const _ = require('lodash');

module.exports = (opts = {}) =>
  _.defaultsDeep(opts, {
    rpx: { enable: false, size: 750 },
  });
