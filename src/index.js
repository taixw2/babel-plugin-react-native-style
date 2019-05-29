/* eslint-disable no-console */
require('./converters/index');
const compose = require('./utils/compose');

module.exports = ({ types: t }) => {
  console.info('react native style start');
  return {
    name: 'babel-plugin-react-native-style',
    visitor: {
      CallExpression: {
        enter(path, state) {
          compose.compose('CallExpression')({ path, t, state, enter: true });
        },
        exit(path, state) {
          compose.compose('CallExpression')({ path, t, state, exit: true });
        },
      },

      ObjectProperty: {
        enter(path, state) {
          compose.compose('ObjectProperty')({ path, t, state, enter: true });
        },
        exit(path, state) {
          compose.compose('ObjectProperty')({ path, t, state, exit: true });
        },
      },
    },
  };
};
