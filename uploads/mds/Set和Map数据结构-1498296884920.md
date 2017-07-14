## set
> 一个类似于数组的构造函数，成员唯一，没有重复值。

### Weakset

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

## Map
Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
任何具有 Iterator 接口的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。