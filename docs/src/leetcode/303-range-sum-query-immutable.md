# [303. 区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/)

## 一、题目描述

给定一个整数数组 `nums`，处理多次查询 `sumRange(i, j)`（求 `nums[i..j]` 元素和，含两端）。数组在构造后 **不会变化**（不可变）。

**示例：**
```
输入：["NumArray","sumRange","sumRange","sumRange"]
     [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]
输出：[null,1,-1,-3]
```

**提示：** `0 <= i <= j < nums.length`，`nums.length <= 10⁴`，最多 `10⁴` 次查询。

## 二、解答方法

### 方法一：前缀和（O(1) 查询）

**思路：** 预处理前缀和 `pre[k] = nums[0..k-1]` 之和（或 `pre[k]=Σnums[0..k]`）。则 `sumRange(i,j) = pre[j+1] - pre[i]`。构造 `O(n)`，查询 `O(1)`。

:::::: code-group

```java [Java]
class NumArray {
    private int[] pre;
    public NumArray(int[] nums) {
        pre = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) pre[i + 1] = pre[i] + nums[i];
    }
    public int sumRange(int i, int j) { return pre[j + 1] - pre[i]; }
}
```

```python [Python]
class NumArray:
    def __init__(self, nums: List[int]):
        self.pre = [0]
        for x in nums: self.pre.append(self.pre[-1] + x)
    def sumRange(self, i: int, j: int) -> int:
        return self.pre[j + 1] - self.pre[i]
```

```cpp [C++]
class NumArray {
    vector<int> pre;
public:
    NumArray(vector<int>& nums) {
        pre.resize(nums.size() + 1);
        for (int i = 0; i < nums.size(); i++) pre[i+1] = pre[i] + nums[i];
    }
    int sumRange(int i, int j) { return pre[j+1] - pre[i]; }
};
```

```go [Go]
type NumArray struct { pre []int }
func Constructor(nums []int) NumArray {
    pre := make([]int, len(nums)+1)
    for i, x := range nums { pre[i+1] = pre[i] + x }
    return NumArray{pre}
}
func (n NumArray) SumRange(i, j int) int { return n.pre[j+1] - n.pre[i] }
```

```js [JavaScript]
var NumArray = function (nums) {
    this.pre = [0];
    for (const x of nums) this.pre.push(this.pre[this.pre.length - 1] + x);
};
NumArray.prototype.sumRange = function (i, j) {
    return this.pre[j + 1] - this.pre[i];
};
```

::::::

**复杂度：** 构造 `O(n)`，查询 `O(1)`，空间 `O(n)`。

## 三、总结

不可变数组的区间和用 **前缀和** 是最优解。若数组可变则需树状数组/线段树（见 `307 区域和检索 - 数组可变`）。前缀和模板 `pre[0]=0, pre[k]=pre[k-1]+nums[k-1]`，区间和 `pre[j+1]-pre[i]`。
