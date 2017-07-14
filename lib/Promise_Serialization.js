var Promise_Serialization = function(){
    this.queue = [];
    //check
    this.isPromise = true;
}
// 正确的拼接Buffer
var chunks = [];
var size = 0;
res.on('data',(chunk)=>{
    chunks.push(chunk);
    size += chunk.length;
})
res.on('end',()=>{
    //存储所有的,进行buffer拼接
    var buf = Buffer.concat(buf,size);
    //转码 
    //var str = iconv.decode(buf,'utf-8');
    // 学习buffer.concat 源码
})

Promise_Serialization.prototype.then = function(fulfilledHandler, errorHandler, progressHandler){
    //处理函数序列
    var handler = {};
    if (typeof fulfilledHandler === 'function'){
        handler.fulfilled = fulfilledHandler;
    };
    if (typeof errorHandler === 'function'){
        handler.error = errorHandler
    };
    this.queue.push(handler);
    return this;
}


