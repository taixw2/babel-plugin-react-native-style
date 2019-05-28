const compose = require('../utils/compose');

// compose.use(require('./padding')， 'ObjectProperty')
// compose.use(require('./margin')， 'ObjectProperty')
compose.use(require('./rpx'), 'ObjectProperty');
compose.use(require('./border'), 'ObjectProperty');
