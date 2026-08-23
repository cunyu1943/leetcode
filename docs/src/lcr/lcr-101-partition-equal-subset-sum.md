# [LCR 101. 分割等和子集](https://leetcode.cn/problems/NUPfPr/)



## 一、题目描述

给定一个非空的正整数数组 `nums` ，请判断能否将这些数字分成元素和相等的两部分。



**示例 1：**

```
输入：nums = [1,5,11,5]
输出：true
解释：nums 可以分割成 [1, 5, 5] 和 [11] 。
```

**示例 2：**

```
输入：nums = [1,2,3,5]
输出：false
解释：nums 不可以分为和相等的两部分。
```

**提示：**

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`



## 二、解答方法

### 2.1 方法一：0/1 背包（动态规划）

1. **思路**

若能分成和相等的两部分，则总和 `sum` 必须为偶数，目标为 `target = sum / 2`。问题转化为：能否从 `nums` 中选出若干数，使它们的和为 `target`（0/1 背包可行性）。

- `dp[j]` 表示「能否凑出和为 `j`」；
- 对每个数 `x`，从 `target` 向下更新：`dp[j] |= dp[j - x]`；
- `dp[0] = true`。

时间 `O(n · target)`，空间 `O(target)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int x : nums) {
            for (int j = target; j >= x; j--) {
                dp[j] |= dp[j - x];
            }
        }
        return dp[target];
    }
}
```

```python [Python]
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)
        if s % 2 != 0:
            return False
        target = s // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for x in nums:
            for j in range(target, x - 1, -1):
                dp[j] = dp[j] or dp[j - x]
        return dp[target]
```

```cpp [C++]
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int x : nums)
            for (int j = target; j >= x; j--)
                dp[j] = dp[j] || dp[j - x];
        return dp[target];
    }
};
```

```go [Go]
func canPartition(nums []int) bool {
    sum := 0
    for _, x := range nums {
        sum += x
    }
    if sum%2 != 0 {
        return false
    }
    target := sum / 2
    dp := make([]bool, target+1)
    dp[0] = true
    for _, x := range nums {
        for j := target; j >= x; j-- {
            if dp[j-x] {
                dp[j] = true
            }
        }
    }
    return dp[target]
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    for (const x of nums) {
        for (let j = target; j >= x; j--) {
            dp[j] = dp[j] || dp[j - x];
        }
    }
    return dp[target];
};
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

bool canPartition(int* nums, int numsSize) {
    int sum = 0;
    for (int i = 0; i < numsSize; i++) sum += nums[i];
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    bool* dp = (bool*)calloc(target + 1, sizeof(bool));
    dp[0] = true;
    for (int i = 0; i < numsSize; i++) {
        for (int j = target; j >= nums[i]; j--) {
            if (dp[j - nums[i]]) dp[j] = true;
        }
    }
    bool res = dp[target];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function canPartition(nums: number[]): boolean {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    const target = sum / 2;
    const dp: boolean[] = new Array(target + 1).fill(false);
    dp[0] = true;
    for (const x of nums) {
        for (let j = target; j >= x; j--) {
            dp[j] = dp[j] || dp[j - x];
        }
    }
    return dp[target];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n · target)`，`target = sum/2`。
- **空间复杂度**：`O(target)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 0/1 背包 | `O(n·target)` | `O(target)` | 标准解法 |

「分割等和」即「能否凑出总和的一半」。0/1 背包可行性 DP 中，每个数只能用一次，因此内层从大到小遍历避免重复选取。

