declare module 'css-to-react-native' {
  interface IJSObject {
    [key: string]: string;
  }

  function transform(rule: Array<[string, string]>): IJSObject;

  export function getPropertyName(name: string): string;
  export function getStylesForProperty(key: string, value: string): IJSObject;

  export default transform;
}
