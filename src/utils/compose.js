const middlewares = {};

exports.use = function(fn, type) {
  if (typeof fn !== 'function') throw new TypeError('must be a function!');

  if (!middlewares[type]) { middlewares[type] = [] }
  middlewares[type].push(fn)
}

exports.compose = function(type) {
  const middleware = middlewares[type] || [];
  return function(context, next) {

    let index = -1
    return dispatch(0)

    function dispatch(i) {
      if (i <= index) return;
      index = i;
      let fn = middleware[i];


      if (i === middleware.length) fn = next;
      if (!fn) return;

      return fn(context, function() {
      	return dispatch(i + 1)
      })
    }
  }
}