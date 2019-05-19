const utils = require('../utils/index')
const options = require('../utils/options')


// support:
// margin: '1'
// margin: '1 2'
// margin: '1 2 3'
// margin: '1 2 3 4'

module.exports = function(path, t) {
    const { key, value } = path.node;
    const fullValue = utils.splitBoxValue(value.value);
    if (fullValue.some(v => !utils.isValidValue(v))) {
        return;
    }

    const properties = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']
    path.replaceWithMultiple(
        properties.map((v, i) => (
            t.objectProperty(
                t.identifier(v),
                utils.insertValue(fullValue[i], t, options.get('autorpx'))
            )
        ))
    );
}