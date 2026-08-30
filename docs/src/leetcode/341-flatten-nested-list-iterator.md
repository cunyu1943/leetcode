# [341. 扁平化嵌套列表迭代器](https://leetcode.cn/problems/flatten-nested-list-iterator/)

## 一、题目描述

给你一个嵌套的整数列表 `nestedList`。设计一个迭代器，使其能 **逐个** 返回所有整数（忽略嵌套层级，按出现顺序）。实现 `NestedIterator` 类：`hasNext()` 和 `next()`。

**示例：**
```
输入：nestedList = [[1,1],2,[1,1]]   输出：[1,1,2,1,1]（按 next 顺序）
```

**提示：** 列表元素个数 `[0, 10⁴]`，`1 <= NestedInteger.getInteger() <= 10⁴`。

## 二、解答方法

### 方法一：栈（惰性展开）

**思路：** 用栈存储待处理元素（逆序压栈保证顺序）。`hasNext()`：若栈顶是整数直接返回 true；否则弹出该列表，逆序把其元素压栈，继续检查直到栈顶是整数或栈空。`next()` 返回栈顶整数。

:::::: code-group

```java [Java]
public class NestedIterator implements Iterator<Integer> {
    private Deque<NestedInteger> st = new ArrayDeque<>();
    public NestedIterator(List<NestedInteger> nestedList) {
        for (int i = nestedList.size() - 1; i >= 0; i--) st.push(nestedList.get(i));
    }
    @Override public boolean hasNext() {
        while (!st.isEmpty() && !st.peek().isInteger()) {
            List<NestedInteger> list = st.pop().getList();
            for (int i = list.size() - 1; i >= 0; i--) st.push(list.get(i));
        }
        return !st.isEmpty();
    }
    @Override public Integer next() { return st.pop().getInteger(); }
}
```

```python [Python]
class NestedIterator:
    def __init__(self, nestedList: List[NestedInteger]):
        self.stack = nestedList[::-1]
    def next(self) -> int:
        return self.stack.pop().getInteger()
    def hasNext(self) -> bool:
        while self.stack and not self.stack[-1].isInteger():
            lst = self.stack.pop().getList()
            self.stack.extend(lst[::-1])
        return bool(self.stack)
```

```cpp [C++]
class NestedIterator {
    stack<NestedInteger> st;
public:
    NestedIterator(vector<NestedInteger>& nestedList) {
        for (int i=nestedList.size()-1;i>=0;i--) st.push(nestedList[i]);
    }
    int next() { int v = st.top().getInteger(); st.pop(); return v; }
    bool hasNext() {
        while(!st.empty() && !st.top().isInteger()){
            auto list = st.top().getList(); st.pop();
            for(int i=list.size()-1;i>=0;i--) st.push(list[i]);
        }
        return !st.empty();
    }
};
```

```go [Go]
type NestedIterator struct { stack []*NestedInteger }
func Constructor(nestedList []*NestedInteger) *NestedIterator {
    st := &NestedIterator{}
    for i := len(nestedList)-1; i >= 0; i-- { st.stack = append(st.stack, nestedList[i]) }
    return st
}
func (it *NestedIterator) Next() int { v := it.stack[len(it.stack)-1].GetInteger(); it.stack = it.stack[:len(it.stack)-1]; return v }
func (it *NestedIterator) HasNext() bool {
    for len(it.stack) > 0 && !it.stack[len(it.stack)-1].IsInteger() {
        lst := it.stack[len(it.stack)-1].GetList(); it.stack = it.stack[:len(it.stack)-1]
        for i := len(lst)-1; i >= 0; i-- { it.stack = append(it.stack, lst[i]) }
    }
    return len(it.stack) > 0
}
```

```js [JavaScript]
var NestedIterator = function (nestedList) {
    this.stack = nestedList.slice().reverse();
};
NestedIterator.prototype.next = function () { return this.stack.pop().getInteger(); };
NestedIterator.prototype.hasNext = function () {
    while (this.stack.length && !this.stack[this.stack.length-1].isInteger()) {
        const lst = this.stack.pop().getList().slice().reverse();
        this.stack.push(...lst);
    }
    return this.stack.length > 0;
};
```

::::::

**复杂度：** `hasNext`/`next` 均摊 `O(1)`，空间 `O(D)`（栈深）。

## 三、总结

惰性展开用栈：只在 `hasNext` 时展开栈顶列表，避免一次性展开占内存。也可用「预展开成扁平数组」（`__init__` 中 DFS 全部展开），实现更简单但空间 `O(N)`。本题是 `385 迷你语法分析器`（构造）的配套消费端。注意逆序压栈保证顺序。
