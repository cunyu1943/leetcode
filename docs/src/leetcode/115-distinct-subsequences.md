# [115. 不同的子序列](https://leetcode.cn/problems/distinct-subsequences/)

## 一、题目描述

给定一个字符串 `s` 和一个字符串 `t`，计算在 `s` 的子序列中 `t` 出现的个数。

字符串的一个 **子序列** 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，`"ACE"` 是 `"ABCDE"` 的一个子序列，而 `"AEC"` 不是）

题目数据保证答案符合 32 位带符号整数范围。

**示例 1：**

```
输入：s = "rabbbit", t = "rabbit"
输出：3
解释：如下图所示，有 3 种可以从 s 中得到 "rabbit" 的方案。
rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^
```

**示例 2：**

```
输入：s = "babgbag", t = "bag"
输出：5
```

**提示：**

- `0 <= s.length <= 1000`
- `0 <= t.length <= 1000`
- `s` 和 `t` 由英文字母组成

## 二、解答方法

### 2.1 方法一：二维动态规划

1. **思路**

定义 `dp[i][j]` 表示 `s` 的前 `i` 个字符中，`t` 的前 `j` 个字符出现的次数。

- 若 `s[i-1] != t[j-1]`，则 `dp[i][j] = dp[i-1][j]`（不使用当前 `s` 字符）
- 若 `s[i-1] == t[j-1]`，则 `dp[i][j] = dp[i-1][j] + dp[i-1][j-1]`（不使用当前字符 + 使用当前字符匹配）

边界条件：`dp[i][0] = 1`（空串是任何字符串的子序列），`dp[0][j] = 0`（j>0）

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[m][n];
    }
}
```

```python [Python]
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = 1
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s[i - 1] == t[j - 1]:
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
                else:
                    dp[i][j] = dp[i - 1][j]
        return dp[m][n]
```

```go [Go]
func numDistinct(s string, t string) int {
    m, n := len(s), len(t)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        dp[i][0] = 1
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if s[i-1] == t[j-1] {
                dp[i][j] = dp[i-1][j] + dp[i-1][j-1]
            } else {
                dp[i][j] = dp[i-1][j]
            }
        }
    }
    return dp[m][n]
}
```

```c [C]
int numDistinct(char* s, char* t) {
    int m = strlen(s), n = strlen(t);
    int dp[1001][1001] = {0};
    for (int i = 0; i <= m; i++) dp[i][0] = 1;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s[i-1] == t[j-1]) {
                dp[i][j] = dp[i-1][j] + dp[i-1][j-1];
            } else {
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[m][n];
}
```

```cpp [C++]
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<vector<long long>> dp(m + 1, vector<long long>(n + 1, 0));
        for (int i = 0; i <= m; i++) dp[i][0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i-1] == t[j-1]) {
                    dp[i][j] = dp[i-1][j] + dp[i-1][j-1];
                } else {
                    dp[i][j] = dp[i-1][j];
                }
            }
        }
        return dp[m][n];
    }
};
```

```js [JavaScript]
var numDistinct = function(s, t) {
    const m = s.length, n = t.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i-1] === t[j-1]) {
                dp[i][j] = dp[i-1][j] + dp[i-1][j-1];
            } else {
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[m][n];
};
```

```ts [TypeScript]
function numDistinct(s: string, t: string): number {
    const m = s.length, n = t.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i-1] === t[j-1]) {
                dp[i][j] = dp[i-1][j] + dp[i-1][j-1];
            } else {
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[m][n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，其中 `m = len(s)`，`n = len(t)`。
- **空间复杂度**：`O(m * n)`，存储整个 DP 表。

---

### 2.2 方法二：一维动态规划（空间优化）

1. **思路**

由于 `dp[i][j]` 只依赖 `dp[i-1][j]` 和 `dp[i-1][j-1]`，可以用一维数组 `dp[j]` 表示当前行的结果，从右向左更新 `dp[j]`，避免覆盖上一行的 `dp[j-1]`。

边界：`dp[0] = 1`

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[j] = dp[j] + dp[j - 1];
                }
                // 不等则 dp[j] 保持不变（继承上一行）
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, m + 1):
            for j in range(n, 0, -1):
                if s[i - 1] == t[j - 1]:
                    dp[j] += dp[j - 1]
        return dp[n]
```

```go [Go]
func numDistinct(s string, t string) int {
    m, n := len(s), len(t)
    dp := make([]int, n+1)
    dp[0] = 1
    for i := 1; i <= m; i++ {
        for j := n; j >= 1; j-- {
            if s[i-1] == t[j-1] {
                dp[j] = dp[j] + dp[j-1]
            }
        }
    }
    return dp[n]
}
```

```c [C]
int numDistinct(char* s, char* t) {
    int m = strlen(s), n = strlen(t);
    int dp[1001] = {0};
    dp[0] = 1;
    for (int i = 1; i <= m; i++) {
        for (int j = n; j >= 1; j--) {
            if (s[i-1] == t[j-1]) {
                dp[j] += dp[j-1];
            }
        }
    }
    return dp[n];
}
```

```cpp [C++]
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<long long> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                if (s[i-1] == t[j-1]) {
                    dp[j] += dp[j-1];
                }
            }
        }
        return dp[n];
    }
};
```

```js [JavaScript]
var numDistinct = function(s, t) {
    const m = s.length, n = t.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i-1] === t[j-1]) {
                dp[j] += dp[j-1];
            }
        }
    }
    return dp[n];
};
```

```ts [TypeScript]
function numDistinct(s: string, t: string): number {
    const m = s.length, n = t.length;
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i-1] === t[j-1]) {
                dp[j] += dp[j-1];
            }
        }
    }
    return dp[n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`。
- **空间复杂度**：`O(n)`，只使用一维数组。

---

## 三、总结

| 方法                | 时间复杂度 | 空间复杂度 | 特点               |
| ------------------- | ---------- | ---------- | ------------------ |
| 二维 DP             | `O(m*n)`   | `O(m*n)`   | 直观，易于理解     |
| 一维 DP（空间优化） | `O(m*n)`   | `O(n)`     | **推荐**，空间更优 |

**推荐**：面试中首选 **方法二（一维 DP）**，代码简洁且空间复杂度低。若需要更清晰的推导过程，二维 DP 也易于展示。

