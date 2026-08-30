# [330. 按要求补齐数组](https://leetcode.cn/problems/patching-array/)

## 一、题目描述

给定一个已排序正整数数组 `nums` 和整数 `n`。数组中元素可组成某些和。求 **最少添加多少个数字**，使得从数组能组合出 `1 ~ n` 的 **所有整数**（组合指选若干元素求和，每个最多用一次）。

**示例：**
```
输入：nums = [1,3], n = 6   输出：1（添加 2，可覆盖 1~6：[1],[2],[3],[1+2],[3+2]...）
输入：nums = [1,5,10], n = 20  输出：2（添加 2,4 等，最少 2 个）
```

**提示：** `1 <= nums.length <= 1000`，`1 <= nums[i] <= 10⁴`，`1 <= n <= 2³¹-1`。

## 二、解答方法

### 方法一：贪心（覆盖区间）

**思路：** 维护当前能覆盖的区间 `[1, miss)`（`miss` 为第一个无法表示的数）。遍历 `nums`：
- 若 `nums[i] <= miss`：可覆盖扩展到 `miss + nums[i]`（`miss += nums[i]`）；
- 否则：补一个数 `miss` 自身，使覆盖扩展到 `miss*2`（`miss += miss`，补数 +1）。
直到 `miss > n`。

:::::: code-group

```java [Java]
class Solution {
    public int minPatches(int[] nums, int n) {
        long miss = 1; int ans = 0, i = 0;
        while (miss <= n) {
            if (i < nums.length && nums[i] <= miss) miss += nums[i++];
            else { miss += miss; ans++; }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        miss = 1; ans = 0; i = 0
        while miss <= n:
            if i < len(nums) and nums[i] <= miss: miss += nums[i]; i += 1
            else: miss += miss; ans += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        long miss=1; int ans=0,i=0;
        while(miss<=n){
            if(i<nums.size() && nums[i]<=miss) miss+=nums[i++];
            else { miss+=miss; ans++; }
        }
        return ans;
    }
};
```

```go [Go]
func minPatches(nums []int, n int) int {
    var miss int64 = 1; ans, i := 0, 0
    for miss <= int64(n) {
        if i < len(nums) && int64(nums[i]) <= miss { miss += int64(nums[i]); i++ } else { miss += miss; ans++ }
    }
    return ans
}
```

```js [JavaScript]
var minPatches = function (nums, n) {
    let miss = 1; let ans = 0, i = 0;
    while (miss <= n) {
        if (i < nums.length && nums[i] <= miss) { miss += nums[i]; i++; }
        else { miss += miss; ans++; }
    }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(m + log n)`（m=nums 长度，补数最多 log n 次），空间 `O(1)`。

## 三、总结

经典贪心：已知能覆盖 `[1, miss)`，则加任意 `x ≤ miss` 可扩到 `miss+x`；最贪的是加 `miss` 自身扩到 `2·miss`。用 `long` 防溢出（`miss` 可能超过 int）。关键不变量：「能覆盖 `[1, miss)`」。是 `O(log n)` 补数思想的代表题。
