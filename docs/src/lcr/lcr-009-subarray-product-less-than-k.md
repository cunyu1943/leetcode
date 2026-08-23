# [LCR 009. 乘积小于 K 的子数组](https://leetcode.cn/problems/ZVAVXX/)



## 一、题目描述

给定一个正整数数组 `nums` 和整数 `k` ，请找出该数组内乘积小于 `k` 的连续子数组的个数。



**示例 1：**

```
输入: nums = [10, 5, 2, 6], k = 100
输出: 8
解释: 8 个乘积小于 100 的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
```

**示例 2：**

```
输入: nums = [1,2,3], k = 0
输出: 0
```

**提示：**

- `1 <= nums.length <= 3 * 10⁴`
- `1 <= nums[i] <= 1000`
- `0 <= k <= 10⁶`



## 二、解答方法

### 2.1 方法一：滑动窗口（双指针）

1. **思路**

由于 `nums[i] ≥ 1`，窗口内乘积随右边界扩张单调递增。对每个右端点 `r`，维护左端点 `l` 使得 `[l, r]` 内乘积 `< k`。一旦乘积 `≥ k`，就收缩左边界。

关键计数技巧：以 `r` 为右端点的、满足条件的连续子数组个数恰好为 `r - l + 1`（即从 `l` 到 `r` 的每一个结尾都合法）。

时间复杂度 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int n = nums.length, l = 0, prod = 1, ans = 0;
        for (int r = 0; r < n; r++) {
            prod *= nums[r];
            while (prod >= k) prod /= nums[l++];
            ans += r - l + 1;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
        n = len(nums)
        l = s = 0
        ans = 0
        for r in range(n):
            s *= nums[r]
            while s >= k:
                s //= nums[l]
                l += 1
            ans += r - l + 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1) return 0;
        int n = nums.size(), l = 0, prod = 1, ans = 0;
        for (int r = 0; r < n; r++) {
            prod *= nums[r];
            while (prod >= k) prod /= nums[l++];
            ans += r - l + 1;
        }
        return ans;
    }
};
```

```go [Go]
func numSubarrayProductLessThanK(nums []int, k int) int {
    if k <= 1 {
        return 0
    }
    n := len(nums)
    l, s, ans := 0, 1, 0
    for r := 0; r < n; r++ {
        s *= nums[r]
        for s >= k {
            s /= nums[l]
            l++
        }
        ans += r - l + 1
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
    if (k <= 1) return 0;
    const n = nums.length;
    let l = 0, prod = 1, ans = 0;
    for (let r = 0; r < n; r++) {
        prod *= nums[r];
        while (prod >= k) prod /= nums[l++];
        ans += r - l + 1;
    }
    return ans;
};
```

```c [C]
int numSubarrayProductLessThanK(int* nums, int numsSize, int k) {
    if (k <= 1) return 0;
    int l = 0, prod = 1, ans = 0;
    for (int r = 0; r < numsSize; r++) {
        prod *= nums[r];
        while (prod >= k) prod /= nums[l++];
        ans += r - l + 1;
    }
    return ans;
}
```

```ts [TypeScript]
function numSubarrayProductLessThanK(nums: number[], k: number): number {
    if (k <= 1) return 0;
    const n = nums.length;
    let l = 0, prod = 1, ans = 0;
    for (let r = 0; r < n; r++) {
        prod *= nums[r];
        while (prod >= k) prod /= nums[l++];
        ans += r - l + 1;
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素进出窗口各一次。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑动窗口 | `O(n)` | `O(1)` | 最优，利用乘积单调性计数 |

本题与「长度最小的子数组」同属滑动窗口族，区别在于计数方式为「以 `r` 结尾的合法子数组有 `r - l + 1` 个」。

