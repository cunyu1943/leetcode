# [446. 等差数列划分 II - 子序列](https://leetcode.cn/problems/arithmetic-slices-ii-subsequence/)

## 一、题目描述

给你一个整数数组 `nums`，返回 `nums` 中**等差子序列**的个数。

子序列指下标递增、不要求连续；等差数列至少有 3 个元素。结果可能很大，返回其对 `10^9 + 7` 取模的值。

**示例 1：**

```
输入：nums = [2,4,6,8,10]
输出：7
解释：等差子序列共 7 个（含长度 3、4、5 的多种）。
```

**示例 2：**

```
输入：nums = [7,7,7,7]
输出：3
```

**提示：**

- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：动态规划 + 哈希（按公差计数）

1. 思路

`dp[i][d]` 表示以 `nums[i]` 结尾、公差为 `d` 的**等差子序列（长度 $\ge 2$）**的数量。枚举 `j < i`，公差 `d = nums[i] - nums[j]`：以 `j` 结尾、公差 `d` 的长度为 $\ge 2$ 的子序列，接上 `nums[i]` 后变成长度 $\ge 3$ 的等差子序列，贡献 `dp[j][d]`；同时把 `nums[i]` 与 `nums[j]` 组成长度 2 的新子序列，`dp[i][d] += dp[j][d] + 1`。把每个 `dp[j][d]` 累加到答案。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int n = nums.length, MOD = (int) 1e9 + 7;
        Map<Integer, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) dp[i] = new HashMap<>();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long d = (long) nums[i] - nums[j];
                if (d < Integer.MIN_VALUE || d > Integer.MAX_VALUE) continue;
                int diff = (int) d;
                int prev = dp[j].getOrDefault(diff, 0);
                int cur = dp[i].getOrDefault(diff, 0);
                dp[i].put(diff, (cur + prev + 1) % MOD);
                ans = (ans + prev) % MOD;
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        dp = [defaultdict(int) for _ in range(n)]
        ans = 0
        for i in range(n):
            for j in range(i):
                d = nums[i] - nums[j]
                prev = dp[j][d]
                dp[i][d] = (dp[i][d] + prev + 1) % MOD
                ans = (ans + prev) % MOD
        return ans
```

```cpp [C++]
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int n = nums.size(), MOD = 1e9 + 7;
        vector<unordered_map<long long, int>> dp(n);
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long long d = (long long)nums[i] - nums[j];
                int prev = dp[j][d];
                dp[i][d] = (dp[i][d] + prev + 1) % MOD;
                ans = (ans + prev) % MOD;
            }
        }
        return ans;
    }
};
```

```go [Go]
func numberOfArithmeticSlices(nums []int) int {
	const MOD = 1_000_000_007
	n := len(nums)
	dp := make([]map[int64]int, n)
	for i := range dp {
		dp[i] = map[int64]int{}
	}
	ans := 0
	for i := 0; i < n; i++ {
		for j := 0; j < i; j++ {
			d := int64(nums[i]) - int64(nums[j])
			prev := dp[j][d]
			dp[i][d] = (dp[i][d] + prev + 1) % MOD
			ans = (ans + prev) % MOD
		}
	}
	return ans
}
```

```javascript [JavaScript]
var numberOfArithmeticSlices = function (nums) {
    const MOD = 1e9 + 7;
    const n = nums.length;
    const dp = Array.from({ length: n }, () => ({}));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const d = nums[i] - nums[j];
            const prev = dp[j][d] || 0;
            dp[i][d] = (dp[i][d] + prev + 1) % MOD;
            ans = (ans + prev) % MOD;
        }
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$。
- 空间复杂度：$O(n^2)$。

## 三、总结

本题是 413 的「子序列」升级版，用哈希按公差存 `dp`。相关题目：413 等差数列划分、446 本身、873 最长的斐波那契子序列的长度。
