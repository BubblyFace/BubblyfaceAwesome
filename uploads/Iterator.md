# Iterator
>遍历器。对于对象、数组、Map、Set
>遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator主要供`for...of`进行消费

## 接口
Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内。

```
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```
## 使用场合
### （1）解构赋值

`let [first, ...rest] = set`默认调用 `Symbol.iterator`
### （2）扩展运算符

扩展运算符（...）也会调用默认的iterator接口。
### （3）yield*

yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

##   retrurn() throw ()
`return`方法会在`for...of...`提前退出时就会调用`return`函数

```
function readLinesSync(file) {
  return {
    next() {
      if (file.isAtEndOfFile()) {
        file.close();
        return { done: true };
      }
    },
    return() {
      file.close();
      return { done: true };
    },
  };
}

for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}4

```
