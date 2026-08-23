# [LCR 104. 组合总和 Ⅳ](https://leetcode.cn/problems/D0F0SV/)



## 一、题目描述

给你一个由 **不同** 整数组成的数组 `nums` ，和一个目标整数 `target` 。请你从 `nums` 中找出并返回总和为 `target` 的元素组合的个数。

题目数据保证答案符合 32 位整数范围。

**注意：** 顺序不同的序列被视作不同的组合。



**示例 1：**

```
输入：nums = [1,2,3], target = 4
输出：7
解释：所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
请注意，顺序不同的序列被视作不同的组合。
```

**示例 2：**

```
输入：nums = [9], target = 3
输出：0
```

**提示：**

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- `nums` 中的所有元素 **互不相同**
- `1 <= target <= 1000`



## 二、解答方法

### 2.1 方法一：动态规划（排列型背包）

1. **思路**

「顺序不同视为不同」是排列型计数。设 `dp[j]` 为「总和为 `j` 的排列数」，枚举 **最后一个数字**：

```
dp[j] = Σ dp[j - x]，其中 x ∈ nums 且 x <= j
```

因此外层遍历金额 `j`，内层遍历 `nums`（与零钱兑换 II 的「组合」恰好相反）。时间 `O(target · n)`，空间 `O(target)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int j = 1; j <= target; j++) {
            for (int x : nums) {
                if (x <= j) dp[j] += dp[j - x];
            }
        }
        return dp[target];
    }
}
```

```python [Python]
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = [0] * (target + 1)
        dp[0] = 1
        for j in range(1, target + 1):
            for x in nums:
                if x <= j:
                    dp[j] += dp[j - x]
        return dp[target]
```

```cpp [C++]
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned long long> dp(target + 1, 0);
        dp[0] = 1;
        for (int j = 1; j <= target; j++)
            for (int x : nums)
                if (x <= j) dp[j] += dp[j - x];
        return (int)dp[target];
    }
};
```

```go [Go]
func combinationSum4(nums []int, target int) int {
    dp := make([]int, target+1)
    dp[0] = 1
    for j := 1; j <= target; j++ {
        for _, x := range nums {
            if x <= j {
                dp[j] += dp[j-x]
            }
        }
    }
    return dp[target]
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let j = 1; j <= target; j++) {
        for (const x of nums) {
            if (x <= j) dp[j] += dp[j - x];
        }
    }
    return dp[target];
};
```

```c [C]
#include <stdlib.h>

int combinationSum4(int* nums, int numsSize, int target) {
    unsigned long long* dp = (unsigned long long*)calloc(target + 1, sizeof(unsigned long long));
    dp[0] = 1;
    for (int j = 1; j <= target; j++)
        for (int i = 0; i < numsSize; i++)
            if (nums[i] <= j) dp[j] += dp[j - nums[i]];
    int res = (int)dp[target];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function combinationSum4(nums: number[], target: number): number {
    const dp: number[] = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let j = 1; j <= target; j++) {
        for (const x of nums) {
            if (x <= j) dp[j] += dp[j - x];
        }
    }
    return dp[target];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(target · n)`。
- **空间复杂度**：`O(target)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排列型背包 | `O(target·n)` | `O(target)` | 标准解法 |

与「组合型」背包（先遍历物品）不同，排列型必须「先遍历金额、再遍历物品」，使每个序列的最后一位都能被独立枚举，从而正确计入不同顺序。

