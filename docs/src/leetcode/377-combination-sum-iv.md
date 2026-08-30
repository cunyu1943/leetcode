# [377. 组合总和 IV](https://leetcode.cn/problems/combination-sum-iv/)

## 一、题目描述

给定一个无重复正整数数组 `nums` 和一个整数 `target`，求 **顺序不同视为不同** 的组合数（即排列数），使得元素和为 `target`。每个数字可无限使用。

**示例：**
```
输入：nums = [1,2,3], target = 4
输出：7
解释：排列 (1,1,1,1),(1,1,2),(1,2,1),(2,1,1),(2,2),(1,3),(3,1) 共 7 种
```

**提示：** `1 <= nums.length <= 200`，`1 <= nums[i] <= 1000`，`1 <= target <= 1000`。

## 二、解答方法

### 方法一：动态规划（完全背包 - 排列）

**思路：** `dp[t]` = 凑成和 `t` 的排列数。转移：`dp[t] = Σ dp[t - num]`（对所有 `num <= t`）。注意是 **排列数**，故外层遍历 `t`、`内层遍历 num`（顺序敏感）。初始 `dp[0]=1`。

:::::: code-group

```java [Java]
class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int t = 1; t <= target; t++)
            for (int x : nums)
                if (x <= t) dp[t] += dp[t - x];       // 可能溢出，题目用 int
        return dp[target];
    }
}
```

```python [Python]
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        from functools import lru_cache
        @lru_cache(None)
        def dfs(rem):
            if rem == 0: return 1
            return sum(dfs(rem - x) for x in nums if x <= rem)
        return dfs(target)
```

```cpp [C++]
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned int> dp(target+1, 0);   // unsigned 防溢出
        dp[0] = 1;
        for (int t=1; t<=target; t++)
            for (int x : nums)
                if (x <= t) dp[t] += dp[t-x];
        return dp[target];
    }
};
```

```go [Go]
func combinationSum4(nums []int, target int) int {
    dp := make([]int, target+1)
    dp[0] = 1
    for t := 1; t <= target; t++ {
        for _, x := range nums {
            if x <= t { dp[t] += dp[t-x] }
        }
    }
    return dp[target]
}
```

```js [JavaScript]
var combinationSum4 = function (nums, target) {
    const dp = new Array(target+1).fill(0);
    dp[0] = 1;
    for (let t=1; t<=target; t++)
        for (const x of nums)
            if (x <= t) dp[t] += dp[t-x];
    return dp[target];
};
```

::::::

**复杂度：** 时间 `O(target · n)`，空间 `O(target)`。

## 三、总结

完全背包求「排列数」：外层 `target`、内层 `num`（顺序敏感 → 排列）。对比 `518 零钱兑换 II`（求组合数，外层 `num`、内层 `target`）；`322 零钱`（求最少个数）。三者仅遍历顺序不同，结果意义迥异，是背包 DP 经典三连。`377` 可能整数溢出（用例小心），可用 `long`/`unsigned`。
