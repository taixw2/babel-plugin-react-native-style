const options = require('./utils/options')
const converters = require('./converters/index')

module.exports = ({ types: t }) => {
    return {
      name: 'babel-plugin-react-native-style',
      visitor: {

        Program(path, { opts }) {
          converters.runtime(path, t);
        },

        ObjectProperty(path, { opts }) {
          const { node: { key, value } } = path;
          if (!t.isIdentifier(key)) return;
          if (!converters[key.name]) return;
          Object.keys(opts || {}).forEach(key => options.set(key, opts[key]));
          converters[key.name](path, t);
        },
      }
    }
}