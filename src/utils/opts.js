const _ = require('lodash');

module.exports = (opts = {}) =>
  _.defaultsDeep(
    {
      rpx: { enable: false, size: 750 },
    },
    opts,
  );
