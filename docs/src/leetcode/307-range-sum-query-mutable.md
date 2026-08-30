# [307. 区域和检索 - 数组可变](https://leetcode.cn/problems/range-sum-query-mutable/)

## 一、题目描述

设计一个数据结构，支持：更新数组某下标的值（`update(index, val)`），以及查询区间和（`sumRange(left, right)`）。数组可频繁修改。

**示例：**
```
输入：["NumArray","update","sumRange","update","sumRange"]
     [[[1,3,5]],[1,2],[0,2],[1,10],[0,2]]
输出：[null,null,9,null,8]
```

**提示：** `nums.length <= 3×10⁴`，最多 `3×10⁴` 次 `update` 与 `sumRange`。

## 二、解答方法

### 方法一：树状数组（Fenwick Tree）

**思路：** 前缀和无法高效支持单点更新（`O(n)`）。树状数组用 `lowbit` 维护前缀和：`update(i, delta)` 与 `query(i)` 均 `O(log n)`。区间和 = `query(right) - query(left-1)`。

:::::: code-group

```java [Java]
class NumArray {
    private int[] tree, nums;
    private int n;
    public NumArray(int[] nums) {
        n = nums.length; this.nums = nums.clone(); tree = new int[n + 1];
        for (int i = 0; i < n; i++) add(i + 1, nums[i]);
    }
    private int lowbit(int x) { return x & -x; }
    private void add(int i, int v) { for (; i <= n; i += lowbit(i)) tree[i] += v; }
    private int query(int i) { int s = 0; for (; i > 0; i -= lowbit(i)) s += tree[i]; return s; }
    public void update(int index, int val) { add(index + 1, val - nums[index]); nums[index] = val; }
    public int sumRange(int left, int right) { return query(right + 1) - query(left); }
}
```

```python [Python]
class NumArray:
    def __init__(self, nums: List[int]):
        self.n = len(nums); self.nums = nums[:]; self.tree = [0]*(self.n+1)
        for i, x in enumerate(nums): self._add(i+1, x)
    def _lowbit(self, x): return x & -x
    def _add(self, i, v):
        while i <= self.n: self.tree[i] += v; i += self._lowbit(i)
    def _query(self, i):
        s = 0
        while i > 0: s += self.tree[i]; i -= self._lowbit(i)
        return s
    def update(self, index: int, val: int) -> None:
        self._add(index+1, val - self.nums[index]); self.nums[index] = val
    def sumRange(self, left: int, right: int) -> int:
        return self._query(right+1) - self._query(left)
```

```cpp [C++]
class NumArray {
    vector<int> tree, nums; int n;
    int lowbit(int x){ return x & -x; }
    void add(int i, int v){ for(;i<=n;i+=lowbit(i)) tree[i]+=v; }
    int query(int i){ int s=0; for(;i>0;i-=lowbit(i)) s+=tree[i]; return s; }
public:
    NumArray(vector<int>& nums) {
        n = nums.size(); this->nums = nums; tree.assign(n+1, 0);
        for (int i=0;i<n;i++) add(i+1, nums[i]);
    }
    void update(int index, int val){ add(index+1, val-nums[index]); nums[index]=val; }
    int sumRange(int left, int right){ return query(right+1)-query(left); }
};
```

```go [Go]
type NumArray struct { tree, nums []int; n int }
func (n NumArray) lowbit(x int) int { return x & -x }
func (n *NumArray) add(i, v int) { for ; i <= n.n; i += n.lowbit(i) { n.tree[i] += v } }
func (n NumArray) query(i int) int { s := 0; for ; i > 0; i -= n.lowbit(i) { s += n.tree[i] }; return s }
func Constructor(nums []int) NumArray {
    na := NumArray{n: len(nums), nums: append([]int(nil), nums...), tree: make([]int, len(nums)+1)}
    for i, x := range nums { na.add(i+1, x) }
    return na
}
func (n *NumArray) Update(index, val int) { n.add(index+1, val-n.nums[index]); n.nums[index]=val }
func (n NumArray) SumRange(left, right int) int { return n.query(right+1)-n.query(left) }
```

```js [JavaScript]
var NumArray = function (nums) {
    this.n = nums.length; this.nums = nums.slice(); this.tree = new Array(this.n+1).fill(0);
    for (let i=0;i<this.n;i++) this._add(i+1, nums[i]);
};
NumArray.prototype._lowbit = function (x) { return x & -x; };
NumArray.prototype._add = function (i, v) { for (; i<=this.n; i+=this._lowbit(i)) this.tree[i]+=v; };
NumArray.prototype._query = function (i) { let s=0; for(;i>0;i-=this._lowbit(i)) s+=this.tree[i]; return s; };
NumArray.prototype.update = function (index, val) { this._add(index+1, val-this.nums[index]); this.nums[index]=val; };
NumArray.prototype.sumRange = function (left, right) { return this._query(right+1) - this._query(left); };
```

::::::

**复杂度：** 构造 `O(n)`，更新/查询 `O(log n)`，空间 `O(n)`。

## 三、总结

可变数组区间和 = 树状数组/线段树。`303` 是不可变前缀和（O(1) 查询）；本题可变必须用 BIT。线段树同样可行但 BIT 更简洁。注意 `update` 传的是「新值」而非增量，需先算 `delta = val - nums[index]`。
