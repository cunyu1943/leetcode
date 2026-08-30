# [474. 一和零](https://leetcode.cn/problems/ones-and-zeroes/)

## 一、题目描述

给你一个二进制字符串数组 `strs` 和两个整数 `m` 和 `n`。每个字符串含若干 `0` 和 `1`。求最多能选出多少个字符串，使得这些字符串中 `0` 的总数不超过 `m`、`1` 的总数不超过 `n`。

**示例 1：**

```
输入：strs = ["10","0001","111001","1","0"], m = 5, n = 3
输出：4
解释：选 "10","0001","1","0" 用 0 共 5 个、1 共 3 个，最多 4 个。
```

**示例 2：**

```
输入：strs = ["10","0","1"], m = 1, n = 1
输出：2
```

**提示：**

- `1 <= strs.length <= 600`
- `1 <= strs[i].length <= 100`
- `strs[i]` 仅含 `'0'` 和 `'1'`
- `1 <= m, n <= 100`

## 二、解答方法

### 2.1 方法一：二维 0-1 背包

1. 思路

每个字符串是「物品」，代价为 `(zeros, ones)`，背包容量为 `(m, n)`。三维 DP 降维：`dp[i][j]` 表示用 `i` 个 0、`j` 个 1 能选的最大字符串数，逆序遍历避免重复选。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        for (String s : strs) {
            int z = 0, o = 0;
            for (char c : s.toCharArray()) if (c == '0') z++; else o++;
            for (int i = m; i >= z; i--)
                for (int j = n; j >= o; j--)
                    dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);
        }
        return dp[m][n];
    }
}
```

```python [Python]
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for s in strs:
            z = s.count('0')
            o = len(s) - z
            for i in range(m, z - 1, -1):
                for j in range(n, o - 1, -1):
                    dp[i][j] = max(dp[i][j], dp[i - z][j - o] + 1)
        return dp[m][n]
```

```cpp [C++]
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (auto& s : strs) {
            int z = 0, o = 0;
            for (char c : s) c == '0' ? z++ : o++;
            for (int i = m; i >= z; i--)
                for (int j = n; j >= o; j--)
                    dp[i][j] = max(dp[i][j], dp[i - z][j - o] + 1);
        }
        return dp[m][n];
    }
};
```

```go [Go]
func findMaxForm(strs []string, m, n int) int {
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for _, s := range strs {
		z, o := 0, 0
		for _, c := range s {
			if c == '0' {
				z++
			} else {
				o++
			}
		}
		for i := m; i >= z; i-- {
			for j := n; j >= o; j-- {
				if dp[i][j] < dp[i-z][j-o]+1 {
					dp[i][j] = dp[i-z][j-o] + 1
				}
			}
		}
	}
	return dp[m][n]
}
```

```javascript [JavaScript]
var findMaxForm = function (strs, m, n) {
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (const s of strs) {
        let z = 0;
        for (const c of s) if (c === '0') z++;
        const o = s.length - z;
        for (let i = m; i >= z; i--)
            for (let j = n; j >= o; j--)
                dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);
    }
    return dp[m][n];
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|strs| \cdot m \cdot n)$。
- 空间复杂度：$O(m \cdot n)$。

## 三、总结

「二维费用背包」是 0-1 背包的推广。相关题目：416 分割等和子集、494 目标和、322 零钱兑换。
