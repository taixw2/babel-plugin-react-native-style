import { PluginObj } from '@babel/core';
import { normalTransform } from './transform';

export default (): PluginObj => {
  return {
    name: 'babel-plugin-react-native-style',

    visitor: {
      ObjectProperty: {
        enter(path) {
          normalTransform(path);
        },
      },
    },
  };
};
