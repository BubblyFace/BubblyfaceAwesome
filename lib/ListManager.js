import Util from 'Util'

export const COUNT_PER_PAGE = 10

var baseData = () => ({
    hasMore: true,
    dataList: [],
    totalCount: 0,
    isLoading: false,
    pageIndex: 1
})

var baseComputed = {
    disableLoad() {
        return !this.hasMore
    },
    isEmpty() {
        return !this.hasMore && this.dataList.length == 0
    },
    hasInit() {
        return !this.hasMore || this.dataList.length > 0
    },
}


function resolveResult(options) {
    try {
        var {result, isRefresh, pageSize, parser, getList} = options
        if (result && result.success) {
            var data = result.data || result.resultInfo || {}
            var loadedList = (getList && getList(data))
                || data.list || [];
            resolveHasMore.call(this, loadedList, isRefresh, pageSize)
            loadedList.map(item => {
                let newItem = parser && parser.call(this, item)
                this.dataList.push(newItem ? newItem : item)
            })

            if (data.allCount) {
                this.totalCount = data.allCount
            } else {
                this.totalCount = this.dataList.length
            }

        } else {
            Util.log(`加载列表失败:${result.message}`)
        }
    } catch (e) {
        Util.log("加载列表错误：")
        Util.log(e)
    }
}


//@deprecated, use resolveResult(options) instead
function resolveResultData(result, isRefresh, parser, pageSize) {
    resolveResult.call(this, {
        result: result,
        isRefresh: isRefresh,
        parser: parser,
        pageSize: pageSize
    })
}

function resolveHasMore(loadedList, isRefresh, pageSize) {
    if (isRefresh) {
        Util.clearList(this.dataList)
        this.hasMore = true
        this.pageIndex = 1
    } else {
        this.pageIndex++
    }

    if (!loadedList || loadedList.length == 0) {
        this.hasMore = false
        return
    }

    var size = pageSize || COUNT_PER_PAGE
    if (loadedList.length < size) {
        this.hasMore = false
    }
}

function finishLoad() {
    this.isLoading = false
}

function startLoad() {
    this.isLoading = true
}

export {
    baseData,
    baseComputed,
    resolveHasMore,
    resolveResultData,
    startLoad,
    finishLoad,
    resolveResult
}

