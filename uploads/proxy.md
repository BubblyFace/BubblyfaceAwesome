# proxy
>不是我设想的什么都可以拦截，而是拦截一些固定的操作。

它用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

## 拦截操作一览

### （1）get(target, propKey, receiver)

拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。

最后一个参数`receiver`是一个对象，可选，参见下面`Reflect.get`的部分。

### （2）set(target, propKey, value, receiver)

拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

### （3）has(target, propKey)

拦截`propKey in proxy`的操作，返回一个布尔值。

### （4）deleteProperty(target, propKey)

拦截`delete proxy[propKey]`的操作，返回一个布尔值。

### （5）ownKeys(target)

拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。

### （6）getOwnPropertyDescriptor(target, propKey)

拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。

### （7）defineProperty(target, propKey, propDesc)

拦截`Object.defineProperty(proxy, propKey, propDesc`）、`Object.defineProperties(proxy, propDescs)，`返回一个布尔值。

### （8）preventExtensions(target)

拦截`Object.preventExtensions(proxy)`，返回一个布尔值。

### （9）getPrototypeOf(target)

拦截`Object.getPrototypeOf(proxy)`，返回一个对象。

### （10）isExtensible(target)

拦截`Object.isExtensible(proxy)`，返回一个布尔值。

### （11）setPrototypeOf(target, proto)

拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。

如果目标对象是函数，那么还有两种额外操作可以拦截。

### （12）apply(target, object, args)

拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

### （13）construct(target, args)

拦截 `Proxy` 实例作为构造函数调用的操作，比如`new proxy(...args)`。

