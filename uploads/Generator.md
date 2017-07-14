# Generator
>Generator 函数是 ES6 提供的一种异步编程解决方案

形式

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```
总结一下，调用 `Generator` 函数，返回一个遍历器对象，代表 `Generator` 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

## 与Iterator接口的关系
由于 `Generator` 函数就是遍历器生成函数，因此可以把 `Generator` 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 `Iterator` 接口。

```
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

```

## next 方法的参数
## for...of循环
