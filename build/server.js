const path = require('path')
const devConfigFun = require("./plugin.conf.base")

function removeDllPlugin(plugins) {
    var i = 0
    while (plugins && i < plugins.length) {
        if (plugins[i].constructor && plugins[i].constructor.name == 'DllReferencePlugin') {
            plugins.splice(i, 1)
        } else {
            i++
        }
    }
}

module.exports = function (env) {
    var config = devConfigFun(env)
    config.output.path = path.resolve(__dirname, './dist')
    config.output.publicPath = '/'
    removeDllPlugin(config.plugins)
    return config
}