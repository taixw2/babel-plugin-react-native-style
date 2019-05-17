const t = require('babel-types')

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

exports.insertValue = (value, t, autorpx) => {
    let _value = value;
    const valueIsNumber = Number(_value) === Number(_value);
    if (!autorpx.enable || !valueIsNumber) {
        if (/pt$/.test(_value)) {
            _value = _value.replace('pt', '')
        }
        return valueIsNumber ? t.numericLiteral(Number(_value)) : t.stringLiteral(_value);
    }

    return t.callExpression(
        t.identifier('__RPX'),
        [t.numericLiteral(Number(value)), t.numericLiteral(Number(autorpx.size))]
    );
}



// 如果是 pt 则返回原来的值
// 如果是 % 则返回原来的值
// 如果是 rpx 则返回通过 rpx 包装的值
// 如果是 正常数字则判断是否启动