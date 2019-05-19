const compose = require('./utils/compose')
const converters = require('./converters/index')

module.exports = ({ types: t }) => {
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
        }
        // (path, { opts }) {
        //   // Object.keys(opts || {}).forEach(key => options.set(key, opts[key]));
        //   // if (!t.isIdentifier(key)) return;
        //   // if (!converters[key.name]) return;
        //   // converters[key.name](path, t);
        // },
      }
    }
}