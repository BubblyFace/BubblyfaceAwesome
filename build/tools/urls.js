const path = require('path')

const rootPath = path.dirname(path.dirname(__dirname))
const urls = {
    rootPath: rootPath,
    distPath: path.join(rootPath, 'dist'),
    srcPath: path.join(rootPath, 'src'),
    dllName: 'modules.dll.js'
}
module.exports = urls