# ES6 Promise
>三态 `pending resolve reject`

## then(resolve,reject)

注意一点，promise对象建立的时候就已经执行，后续动作是通过`then`方法进行选择执行。

想利用promise 进行异步操作需要在方法中返回Promise对象，

`then`方法是返回的是一个新的`Promise`对象。
### Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。
### Promise.all()
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
所有的promise全变成fulfilled 它才会变成fulfilled 否则变成reject
### Promise.race()
同上率先改变的就是回调函数
### Promise.resolve() Promise.reject()

这两个方法会返回一个已经更改过状态的Promise。



