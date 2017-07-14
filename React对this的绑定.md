# React对this的绑定
引用官方文档所说
>You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.

在使用类方法进行回调的时候。方法的回调的this需要手动绑定，为解决这一问题总结数方法如下。
## React.createClass 自动绑定

React 中创建组件的方式已经很多，比较古老的诸如 React.createClass 应该很多人并不陌生。当然，从 React 0.13 开始，可以使用 ES6 Class 代替 React.createClass 了，这应该是今后推荐的方法。
但是需要知道，React.createClass 创建的组件，可以自动绑定 this。也就是说，this 这个关键字会自动绑定在组件实例上面。
## 渲染时绑定
`onChange = {this.handle.bind(this)}`

这种方法简明扼要，但是有一个潜在的性能问题：当组件每次重新渲染时，都会有一个新的函数创建。OMG! 这听上去貌似是一个很大的问题，但是其实在真正的开发场景中，由此引发的性能问题往往不值一提（除非是大型组件消费类应用或游戏）。

## 箭头函数绑定
利用ES6的箭头函数隐式绑定this

`onChange = {e => this.handleChange(e)}`

副作用同上

### **两个规避消耗的方法**

## Constructor 内绑定（官网推荐）
```
constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
}
```
这种方式往往被推荐为“最佳实践”，也是官网最推荐的方法。

但是就个人习惯而言，我认为与前两种方法相比，constructor 内绑定在可读性和可维护性上也许有些欠缺。
同时，我们知道在 constructor 声明的方法不会存在实例的原型上，而属于实例本身的方法。每个实例都有同样一个 handleChange，这本身也是一种重复和浪费。

## Class 属性中使用 = 和箭头函数

```
handleChange = () => {
      // call this function from render 
      // and this.whatever in here works fine.
};
```
写这篇文档的目的就是寻找这个方法，因为在官网上学习使用第四种方法的时候，考虑到在大规模使用回调后如果每个方法都需要添加一个绑定语句，代码量会大增，且难以维护。

这个方法有这些优点：

* 使用箭头函数，有效绑定了 this；
* 没有第二种方法和第三种方法的潜在性能问题；
* 避免了方法四的组件实例重复问题；
* 我们可以直接从 ES5 createClass 重构得来。

## 总结
抛弃原来的`createClass` ，以及有性能损耗的23方法，又可以避免方法4里的大量创建的实例。花了我这么久找的方法五解决了我在看**Material**官方文档`bind``this`解决方法的疑惑.