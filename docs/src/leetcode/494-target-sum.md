# [494. 目标和](https://leetcode.cn/problems/target-sum/)

## 一、题目描述

给定一个非负整数数组 `nums` 和目标整数 `target`。给每个数前面加 `+` 或 `-` 号，求有多少种分配方式使表达式结果等于 `target`。

**示例 1：**

```
输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：5 个 1，3 个 + 和 2 个 -，有 C(5,3)=5 种。
```

**示例 2：**

```
输入：nums = [1], target = 1
输出：1
```

**提示：**

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `-1000 <= target <= 1000`

## 二、解答方法

### 2.1 方法一：动态规划（0-1 背包）

1. 思路

设正数和为 `P`，负数绝对值和为 `N`，有 `P - N = target` 且 `P + N = sum(nums)`。解得 `P = (sum + target) / 2`。问题转为「选若干数使其和为 P」的方案数（0-1 背包计数）。若 `sum + target` 为奇数或无解返回 0。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int x : nums) sum += x;
        if ((sum + target) % 2 != 0 || sum < Math.abs(target)) return 0;
        int P = (sum + target) / 2;
        int[] dp = new int[P + 1];
        dp[0] = 1;
        for (int x : nums)
            for (int j = P; j >= x; j--)
                dp[j] += dp[j - x];
        return dp[P];
    }
}
```

```python [Python]
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if (total + target) % 2 or total < abs(target):
            return 0
        P = (total + target) // 2
        dp = [0] * (P + 1)
        dp[0] = 1
        for x in nums:
            for j in range(P, x - 1, -1):
                dp[j] += dp[j - x]
        return dp[P]
```

```cpp [C++]
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = 0;
        for (int x : nums) sum += x;
        if ((sum + target) % 2 != 0 || sum < abs(target)) return 0;
        int P = (sum + target) / 2;
        vector<int> dp(P + 1, 0);
        dp[0] = 1;
        for (int x : nums)
            for (int j = P; j >= x; j--)
                dp[j] += dp[j - x];
        return dp[P];
    }
};
```

```go [Go]
func findTargetSumWays(nums []int, target int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	if (sum+target)%2 != 0 || sum < abs(target) {
		return 0
	}
	P := (sum + target) / 2
	dp := make([]int, P+1)
	dp[0] = 1
	for _, x := range nums {
		for j := P; j >= x; j-- {
			dp[j] += dp[j-x]
		}
	}
	return dp[P]
}
func abs(x int) int { if x < 0 { return -x }; return x }
```

```javascript [JavaScript]
var findTargetSumWays = function (nums, target) {
    let sum = 0;
    for (const x of nums) sum += x;
    if ((sum + target) % 2 !== 0 || sum < Math.abs(target)) return 0;
    const P = (sum + target) / 2;
    const dp = new Array(P + 1).fill(0);
    dp[0] = 1;
    for (const x of nums)
        for (let j = P; j >= x; j--)
            dp[j] += dp[j - x];
    return dp[P];
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \cdot P)$。
- 空间复杂度：$O(P)$。

## 三、总结

「符号分配 = 选子集背包计数」是目标和题的核心转化。相关题目：416 分割等和子集、474 一和零、322 零钱兑换。
