# [284. 顶端迭代器](https://leetcode.cn/problems/peeking-iterator/)

## 一、题目描述

给定一个迭代器类的接口，支持 `hasNext()` 和 `next()` 两个操作。请设计并实现一个支持 `peek()` 操作的迭代器 —— 返回下一个元素的值但 **不移动指针**。

实现 `PeekingIterator` 类：

-   `PeekingIterator(Iterator<int> nums)` 用迭代器 `nums` 初始化对象；
-   `int next()` 返回下一个元素并移动指针；
-   `boolean hasNext()` 如果还有下一个元素则返回 `true`；
-   `int peek()` 返回下一个元素但 **不移动** 指针。

**示例：**

```
输入：nums = [1,2,3]
调用：peek() → 1；next() → 1；next() → 2；hasNext() → true；... 
```

**提示：** `1 <= nums.length <= 1000`，`1 <= nums[i] <= 1000`，最多调用 `1000` 次 `next/peek/hasNext`。

## 二、解答方法

### 方法一：缓存下一个元素（提前预读）

**思路：** 用一个变量 `nextVal` 缓存「下一个待返回的元素」。构造时或每次 `next()` 后，立即预读 `nums.next()` 存入 `nextVal`，并维护 `hasNext` 标志。`peek()` 直接返回 `nextVal` 而不消费；`next()` 取出 `nextVal` 后重新预读下一个。

:::::: code-group

```java [Java]
class PeekingIterator implements Iterator<Integer> {
    private Iterator<Integer> it;
    private Integer nextVal;     // 缓存的下一个元素
    private boolean hasNextFlag;

    public PeekingIterator(Iterator<Integer> iterator) {
        it = iterator;
        hasNextFlag = it.hasNext();
        if (hasNextFlag) nextVal = it.next();
    }
    public Integer peek() { return nextVal; }
    @Override
    public Integer next() {
        Integer res = nextVal;
        hasNextFlag = it.hasNext();
        nextVal = hasNextFlag ? it.next() : null;
        return res;
    }
    @Override
    public boolean hasNext() { return hasNextFlag; }
}
```

```python [Python]
class PeekingIterator:
    def __init__(self, iterator):
        self._it = iterator
        self._has_next = iterator.hasNext()
        self._next_val = iterator.next() if self._has_next else None

    def peek(self) -> int:
        return self._next_val

    def next(self) -> int:
        res = self._next_val
        self._has_next = self._it.hasNext()
        self._next_val = self._it.next() if self._has_next else None
        return res

    def hasNext(self) -> bool:
        return self._has_next
```

```cpp [C++]
class PeekingIterator : public Iterator {
    int nextVal;
    bool hasNextFlag;
public:
    PeekingIterator(const vector<int>& nums) : Iterator(nums) {
        hasNextFlag = Iterator::hasNext();
        if (hasNextFlag) nextVal = Iterator::next();
    }
    int peek() { return nextVal; }
    int next() {
        int res = nextVal;
        hasNextFlag = Iterator::hasNext();
        if (hasNextFlag) nextVal = Iterator::next();
        return res;
    }
    bool hasNext() const { return hasNextFlag; }
};
```

```go [Go]
type PeekingIterator struct {
    it        *Iterator
    nextVal   int
    hasNextFl bool
}
func Constructor(iter *Iterator) *PeekingIterator {
    pi := &PeekingIterator{it: iter}
    pi.hasNextFl = pi.it.hasNext()
    if pi.hasNextFl { pi.nextVal = pi.it.next() }
    return pi
}
func (pi *PeekingIterator) peek() int { return pi.nextVal }
func (pi *PeekingIterator) next() int {
    res := pi.nextVal
    pi.hasNextFl = pi.it.hasNext()
    if pi.hasNextFl { pi.nextVal = pi.it.next() }
    return res
}
func (pi *PeekingIterator) hasNext() bool { return pi.hasNextFl }
```

```js [JavaScript]
var PeekingIterator = function (iterator) {
    this._it = iterator;
    this._hasNext = iterator.hasNext();
    this._nextVal = this._hasNext ? iterator.next() : null;
};
PeekingIterator.prototype.peek = function () { return this._nextVal; };
PeekingIterator.prototype.next = function () {
    const res = this._nextVal;
    this._hasNext = this._it.hasNext();
    this._nextVal = this._hasNext ? this._it.next() : null;
    return res;
};
PeekingIterator.prototype.hasNext = function () { return this._hasNext; };
```

::::::

**复杂度：** 时间 `O(1)` 每次操作，空间 `O(1)`。

## 三、总结

「预读（look-ahead）」是给迭代器加 `peek` 能力的标准手法：始终比调用方 **多读一个元素** 缓存起来。`peek` 看缓存、`next` 返回缓存并重新预读。注意构造时就要预读一次，且 `hasNext` 应返回缓存标志而非直接问底层迭代器（否则会多消费一个）。这与 `173/272 二叉搜索树迭代器` 的「惰性加载」思想相通。
