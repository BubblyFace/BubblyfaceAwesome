import Util from 'Util'

export function getContentStyle(withHeader, offset) {
    var gF = Util.select('.groupFilter')
    var gFHeight = 42;

    if (gF && gF.length > 0) {
        gFHeight = gF[0].offsetHeight
    }

    offset = offset || 0
    return {
        top: (withHeader ? Util.getHeaderHeight() : 0) + gFHeight + offset + 'px'
    }
}