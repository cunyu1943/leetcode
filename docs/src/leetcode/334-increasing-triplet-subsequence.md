# [334. 递增的三元组子序列](https://leetcode.cn/problems/increasing-triplet-subsequence/)

## 一、题目描述

给定一个整数数组 `nums`，判断是否存在下标 `i < j < k` 使得 `nums[i] < nums[j] < nums[k]`。存在返回 `true`，否则 `false`。

**示例：**
```
输入：nums = [1,2,3,4,5]   输出：true
输入：nums = [5,4,3,2,1]   输出：false
```

**提示：** `1 <= nums.length <= 5×10⁵`，`-2³¹ <= nums[i] <= 2³¹-1`。

## 二、解答方法

### 方法一：贪心维护 first、second（O(n)）

**思路：** 维护「当前最小元素」`first` 和「当前第二小元素」`second`（均已出现且 `first < second`）。遍历 `x`：
- `x <= first`：`first = x`（更小的最小值）；
- `first < x <= second`：`second = x`（更新第二小）；
- `x > second`：找到第三大，返回 `true`。

:::::: code-group

```java [Java]
class Solution {
    public boolean increasingTriplet(int[] nums) {
        int first = Integer.MAX_VALUE, second = Integer.MAX_VALUE;
        for (int x : nums) {
            if (x <= first) first = x;
            else if (x <= second) second = x;
            else return true;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        first = second = float('inf')
        for x in nums:
            if x <= first: first = x
            elif x <= second: second = x
            else: return True
        return False
```

```cpp [C++]
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int first = INT_MAX, second = INT_MAX;
        for (int x : nums) {
            if (x <= first) first = x;
            else if (x <= second) second = x;
            else return true;
        }
        return false;
    }
};
```

```go [Go]
func increasingTriplet(nums []int) bool {
    first, second := 1<<31-1, 1<<31-1
    for _, x := range nums {
        if x <= first { first = x } else if x <= second { second = x } else { return true }
    }
    return false
}
```

```js [JavaScript]
var increasingTriplet = function (nums) {
    let first = Infinity, second = Infinity;
    for (const x of nums) {
        if (x <= first) first = x;
        else if (x <= second) second = x;
        else return true;
    }
    return false;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

`first/second` 贪心是 `O(n)` 解法，比 `O(n²)` 遍历 `j` 优。本质是「LIS 长度为 3 的特判」（`300` 的简化）。注意 `first` 和 `second` 不必来自相同递增对，只要存在更小的前驱即可——因为 `second` 被更新时，`first` 一定小于它（逻辑保证）。这题常考，务必掌握。
