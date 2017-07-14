const EventEmitter = require('events');
const Util = require('util');
const Promise_test = function () {
    EventEmitter.call(this)
}

Util.inherits(Promise_test, EventEmitter);

Promise_test.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler);
    }
    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler);
    }
    if (typeof progressHandler === 'function') {
        this.once('progress', progressHandler);
    }
    // 
    return this;
}
const Deferred = function () {
    this.state = 'unfulfilled';
    this.promise = new Promise_test();
}


//延迟对象
//三个函数都只接受function对象
//更改状态后执行回调
Deferred.prototype.resolve = function (obj) {
    this.state = "fulfilled";
    this.promise.emit("success", obj);
}

Deferred.prototype.reject = function (obj) {
    this.state = "failed";
    this.promise.emit("error", obj);
}

Deferred.prototype.progress = function (obj) {
    this.state = "progress";
    this.promise.emit("progress", obj);
}

//多异步协作的实现
Deferred.prototype.all = function (...promises) {
    console.log(promises);
    var count = promises.length;
    //这边使用一个数组
    var results = [];
    promises.forEach((promise, i) => {
        promise.then((data) => {
            count--;
            results[i] = data;
            //当计数为空时resolve
            if (count === 0) {
                that.resolve(results);
            }
        }, (err) => {
            this.reject(err);
        })
    });
    return this.promise;
}

// export default {
//     Promise_s: Promise_test
// }

//针对res的流程进行异步包装
var promisify_res = function (res) {
    var deffered = new Deffered();
    var result_data = '';
    //progress
    res.on("data", (chunk) => {
        result_data += chunk;
        deffered.progress(chunk);
    });
    res.on("end", () => {
        deffered.resolve(result_data);
    });
    res.on("error", (err) => {
        deffered.reject(err);
    });
    return Deferred.promise;
}

// //执行
// promisify_res(res).then((data) => {
//     //done~!   
// }, (err) => {
//     //error
// },(chunk)=>{
//     //progress
// })

//demo1

function readFile_t (url, encoding) {
	return new Promise( (resolve, reject) => {
		require('fs').readFile(url, encoding, (err, data) => {
			if (err) {
				return reject(err)
			}
			return resolve(data)
		})
	})
}



var file1 = readFile_t("sysConfig.js", "utf-8");

var file2= readFile_t("utf8.js", "utf-8");


var deffered2 = new Deferred();

deffered2.all(file1, file2).then((result) => {
    console.dir(result)
})