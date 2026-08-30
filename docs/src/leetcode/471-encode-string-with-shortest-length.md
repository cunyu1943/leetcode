# [471. 最短编码 🔒 会员题](https://leetcode.cn/problems/encode-string-with-shortest-length/)

## 一、题目描述

给定一个非空字符串，将其编码为**最短**的字符串。编码规则：`k[encoded_string]` 表示 `encoded_string` 重复 `k` 次，`k` 为正整数。

返回最短的编码字符串长度（或直接返回编码串，本题要求最短长度？——原题要求返回最短编码串本身；下文按「返回最短编码串」给出解法，统计长度类似）。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：s = "aaa"
输出："aaa" 的最短编码为 "3[a]"（长度 5? 实际 "3[a]" 长度 5，但原串 "aaa" 长度 3，这里编码用于压缩长重复）。返回 "3[a]"。
```

**示例 2：**

```
输入：s = "abcdef"
输出："abcdef"（无重复，原样返回）
```

**提示：**

- `1 <= s.length <= 150`
- `s` 由小写字母组成

## 二、解答方法

### 2.1 方法一：区间 DP

1. 思路

`dp[i][j]` 表示 `s[i..j]` 的最短编码长度。转移：

- 若 `s[i..j]` 可由 `s[i..k]` 重复若干次得到，则 `dp[i][j] = min(dp[i][k] + 编码开销)`；
- 否则一刀切成两段 `dp[i][j] = min(dp[i][k] + dp[k+1][j])`。

需判断子串是否由前缀重复构成（用 KMP 周期或枚举）。本题规模小可暴力。

2. 代码实现（Python，区间 DP + 重复判定）

:::::: code-group

```python [Python]
class Solution:
    def encode(self, s: str) -> str:
        n = len(s)
        dp = [["" for _ in range(n)] for _ in range(n)]
        for i in range(n):
            dp[i][i] = s[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = s[i:j+1]
                # 切分
                for k in range(i, j):
                    cand = dp[i][k] + dp[k+1][j]
                    if len(cand) < len(dp[i][j]):
                        dp[i][j] = cand
                # 重复
                sub = s[i:j+1]
                pos = (sub + sub).find(sub, 1)
                if pos < len(sub):
                    rep = len(sub) // pos
                    cand = f"{rep}[{dp[i][i+pos-1]}]"
                    if len(cand) < len(dp[i][j]):
                        dp[i][j] = cand
        return dp[0][n-1]
```

```java [Java]
class Solution {
    public String encode(String s) {
        int n = s.length();
        String[][] dp = new String[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = s.substring(i, i + 1);
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = s.substring(i, j + 1);
                for (int k = i; k < j; k++) {
                    String cand = dp[i][k] + dp[k + 1][j];
                    if (cand.length() < dp[i][j].length()) dp[i][j] = cand;
                }
                String sub = s.substring(i, j + 1);
                int pos = (sub + sub).indexOf(sub, 1);
                if (pos < sub.length()) {
                    int rep = sub.length() / pos;
                    String cand = rep + "[" + dp[i][i + pos - 1] + "]";
                    if (cand.length() < dp[i][j].length()) dp[i][j] = cand;
                }
            }
        }
        return dp[0][n - 1];
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^3)$。
- 空间复杂度：$O(n^2)$。

## 三、总结

会员题。区间 DP + 重复子串判定，与 394 字符串解码（逆运算）对应。相关题目：394 字符串解码、1092 最短公共超序列（命名易混淆）。
