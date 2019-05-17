const utils = require('../utils/index')
const options = require('../utils/options')

module.exports = function(path, t) {
    const imported = path.get('body').some(v => {
        if (!t.isImportDeclaration(v)) { return false }
        return v.specifiers.some(spe => spe.imported.name === '__RPX')
    })

    if (imported) {
        return
    }

    // path.get('body').unshift(t.importDeclaration(
    //     [
    //         t.importSpecifier(t.identifier('__RPX'), t.identifier('__RPX'))
    //     ],
    //     t.stringLiteral('babel-plugin-react-native-style/runtime/index')
    // ))
}