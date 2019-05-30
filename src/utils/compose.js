/* eslint-disable no-use-before-define */
const middlewares = {};

exports.use = (fn, type) => {
  if (typeof fn !== 'function') throw new TypeError('must be a function!');

  if (!middlewares[type]) {
    middlewares[type] = [];
  }
  middlewares[type].push(fn);
};

exports.compose = (type) => {
  const middleware = middlewares[type] || [];
  return (context, next) => {
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) return null;
      index = i;
      let fn = middleware[i];

      if (i === middleware.length) fn = next;
      if (!fn) return null;

      return fn(context, () => dispatch(i + 1));
    }
  };
};
