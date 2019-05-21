const t = require('babel-types');

const enums = require('./enum');


exports.identifierIsEqual = (identifier, value) => {
  if (!t.isIdentifier(identifier)) {
    return false
  }
  return identifier.name === value;
}

/**
 * array[top, right, bottom, left]
 */
exports.splitBoxValue = (value) => {
  const _value = String(value).split(' ').filter(v => v.trim());
  switch (_value.length) {
    case 0:
      return [0, 0, 0, 0];
    case 1:
      return [value, value, value, value];
    case 2:
      return [_value[0], _value[1], _value[0], _value[1]];
    case 3:
      return [_value[0], _value[1], _value[2], _value[1]];
    case 4:
      return [_value[0], _value[1], _value[2], _value[3]];
  }
}

/**
 * 100pt, 100.00pt, 100rpx, 100%, auto
 */
exports.isValidValue = (value) => {
  if (value === 'auto') return true;
  if (/^(\d+(\.\d+)?|\.\d+|\d+)?(%|pt|rpx)*$/.test(value)) return true;
  return false;
}

/**
 * 100pt, 100.00pt, 100rpx, 100%, auto
 */
exports.insertImport = (id, path, source, t) => {
  const program = path.findParent((path) => path.isProgram());
  const node = program.node;

  const imported = node.body.some(v => {
    if (!t.isImportDeclaration(v)) { return false }
    return v.specifiers.some(spe => spe.imported.name === id)
  })
  if (imported) { return }
  node.body.unshift(t.importDeclaration(
    [
      t.importSpecifier(t.identifier(id), t.identifier(id))
    ],
    t.stringLiteral(source)
  ))
}

exports.insertValue = (value, opts) => {
  // 如果不是启动了 rpx， 如果是数字， 则返回 rpx
  const originValue = value.value;

  if (t.isNumericLiteral(value) && opts.rpx.enable) {
    return t.callExpression(
      t.identifier('__RPX'),
      [value, t.numericLiteral(opts.rpx.size)]
    );
  }

  // 123pt => 123
  if (/\d+pt$/.test(originValue)) {
    return t.numericLiteral(originValue.replace('pt', ''));
  }

  // return origin value
  return value;
}

exports.isValidColor = (color) => {
  let _value = value;

  enums.colors.some(v => {
    if (typeof v === 'string') {
      return v === color.trim();
    }

    return v.test(color.replace(/\s/g, ''));
  })
}