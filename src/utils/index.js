const t = require('babel-types')

exports.identifierIsEqual = (identifier, value) => {
    if (!t.isIdentifier(identifier)) {
        return false
    }
    return identifier.name === value;
}

exports.identifierIsEqual = (value, opts) => {
    if (!t.isIdentifier(identifier)) {
        return false
    }
    return identifier.name === value;
}