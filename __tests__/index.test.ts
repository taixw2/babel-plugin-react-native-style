// const pluginTester = require('babel-plugin-tester').default
// const plugin = require('../packages/core/dist/index').default

import test from 'babel-plugin-tester';
import plugin from '../packages/core/src/index';

test({

  plugin,

  pluginName: 'babel-plugin-react-native-style',

  tests: [
    {
      code: `
          function sayHi(person = 'World') {
            return 'Hello ' + person + '!'
          }
        `,
      snapshot: true,
    },
    {
      code: `
          const styles = {
            container: { padding: '10px 10px 10px' }
          }
        `,
      snapshot: true,
    },
    {
      code: `
          const styles = {
            container: { height: '100vh' }
          }
        `,
      snapshot: true,
    },
   
  ],
});
