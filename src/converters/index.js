const compose = require('../utils/compose');

compose.use(require('./rpx'), 'ObjectProperty', 'StringLiteral');
compose.use(require('./padding'), 'ObjectProperty');
compose.use(require('./margin'), 'ObjectProperty');
compose.use(require('./border'), 'ObjectProperty');
