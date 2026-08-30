# [486. 预测赢家](https://leetcode.cn/problems/predict-the-winner/)

## 一、题目描述

给定一个非负整数数组 `nums`，玩家 1 和玩家 2 轮流从数组**两端**取一个数加到自己分数，两人都采取最优策略。判断玩家 1（先手）分数是否**不低于**玩家 2（即能否成为赢家，平局算赢）。

**示例 1：**

```
输入：nums = [1,5,2]
输出：false
解释：先手取 1，后手取 5，先手取 2，后手 5 胜；先手取 2 同样输。先手无法赢。
```

**示例 2：**

```
输入：nums = [1,5,233,7]
输出：true
```

**提示：**

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 10^7`

## 二、解答方法

### 2.1 方法一：区间 DP

1. 思路

`dp[i][j]` 表示在当前区间 `[i, j]` 内，先手相对后手的**最大净胜分**。转移：`dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])`（取左端则剩余区间对手净胜 `dp[i+1][j]`，所以自己净胜 `nums[i] - dp[i+1][j]`）。最终 `dp[0][n-1] >= 0` 即先手赢。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean predictTheWinner(int[] nums) {
        int n = nums.length;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = nums[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] >= 0;
    }
}
```

```python [Python]
class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        n = len(nums)
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = nums[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])
        return dp[0][n - 1] >= 0
```

```cpp [C++]
class Solution {
public:
    bool predictTheWinner(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) dp[i][i] = nums[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] >= 0;
    }
};
```

```go [Go]
func predictTheWinner(nums []int) bool {
	n := len(nums)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
		dp[i][i] = nums[i]
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length <= n; i++ {
			j := i + length - 1
			a := nums[i] - dp[i+1][j]
			b := nums[j] - dp[i][j-1]
			if a > b {
				dp[i][j] = a
			} else {
				dp[i][j] = b
			}
		}
	}
	return dp[0][n-1] >= 0
}
```

```javascript [JavaScript]
var predictTheWinner = function (nums) {
    const n = nums.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) dp[i][i] = nums[i];
    for (let len = 2; len <= n; len++)
        for (let i = 0; i + len <= n; i++) {
            const j = i + len - 1;
            dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
        }
    return dp[0][n - 1] >= 0;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$。
- 空间复杂度：$O(n^2)$（可优化到 $O(n)$ 一维滚动）。

## 三、总结

「区间 DP 算净胜分」是两端取数博弈的通用解法。相关题目：464 我能赢吗、877 石子游戏（同型）、312 戳气球。
