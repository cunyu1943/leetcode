# [97. 交错字符串](https://leetcode.cn/problems/interleaving-string/)



## 一、题目描述

给定三个字符串 `s1`、`s2`、`s3`，请判断 `s3` 是否由 `s1` 和 `s2` 的 **交错组成**（保持各自内部字符的相对顺序）。

**示例 1：**

```
输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
输出：true
```

**示例 2：**

```
输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
输出：false
```

**提示：**

-   `0 <= s1.length, s2.length <= 100`
-   `0 <= s3.length <= 200`



## 二、解答方法

### 2.1 方法一：二维动态规划


1. **思路**

设 `dp[i][j]` 表示 `s1` 前 `i` 个字符与 `s2` 前 `j` 个字符能否交错组成 `s3` 前 `i+j` 个字符。状态转移：若 `s1[i-1]==s3[i+j-1]` 则可由 `dp[i-1][j]` 转移，若 `s2[j-1]==s3[i+j-1]` 则可由 `dp[i][j-1]` 转移。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int n = s1.length(), m = s2.length();
        if (n + m != s3.length()) return false;
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && s1.charAt(i - 1) == s3.charAt(i + j - 1)) dp[i][j] |= dp[i - 1][j];
                if (j > 0 && s2.charAt(j - 1) == s3.charAt(i + j - 1)) dp[i][j] |= dp[i][j - 1];
            }
        }
        return dp[n][m];
    }
}
```

```python [Python]
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        n, m = len(s1), len(s2)
        if n + m != len(s3): return False
        dp = [[False] * (m + 1) for _ in range(n + 1)]
        dp[0][0] = True
        for i in range(n + 1):
            for j in range(m + 1):
                if i > 0 and s1[i - 1] == s3[i + j - 1]: dp[i][j] |= dp[i - 1][j]
                if j > 0 and s2[j - 1] == s3[i + j - 1]: dp[i][j] |= dp[i][j - 1]
        return dp[n][m]
```

```go [Go]
func isInterleave(s1 string, s2 string, s3 string) bool {
    n, m := len(s1), len(s2)
    if n + m != len(s3) { return false }
    dp := make([][]bool, n+1)
    for i := range dp { dp[i] = make([]bool, m+1) }
    dp[0][0] = true
    for i := 0; i <= n; i++ {
        for j := 0; j <= m; j++ {
            if i > 0 && s1[i-1] == s3[i+j-1] { dp[i][j] = dp[i][j] || dp[i-1][j] }
            if j > 0 && s2[j-1] == s3[i+j-1] { dp[i][j] = dp[i][j] || dp[i][j-1] }
        }
    }
    return dp[n][m]
}
```

```c [C]
bool isInterleave(char* s1, char* s2, char* s3) {
    int n = strlen(s1), m = strlen(s2);
    if (n + m != strlen(s3)) return false;
    bool dp[n + 1][m + 1];
    memset(dp, 0, sizeof(dp));
    dp[0][0] = true;
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            if (i > 0 && s1[i - 1] == s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
            if (j > 0 && s2[j - 1] == s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
        }
    }
    return dp[n][m];
}
```

```cpp [C++]
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size(), m = s2.size();
        if (n + m != s3.size()) return false;
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
        dp[0][0] = true;
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && s1[i - 1] == s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
                if (j > 0 && s2[j - 1] == s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
            }
        }
        return dp[n][m];
    }
};
```

```javascript [JavaScript]
var isInterleave = function(s1, s2, s3) {
    const n = s1.length, m = s2.length;
    if (n + m !== s3.length) return false;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
    dp[0][0] = true;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i > 0 && s1[i - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
            if (j > 0 && s2[j - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
        }
    }
    return dp[n][m];
};
```

```typescript [TypeScript]
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const n = s1.length, m = s2.length;
    if (n + m !== s3.length) return false;
    const dp: boolean[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
    dp[0][0] = true;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i > 0 && s1[i - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
            if (j > 0 && s2[j - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
        }
    }
    return dp[n][m];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n*m)`。
- **空间复杂度**：`O(n*m)`，可优化为 `O(min(n,m))`。

### 2.2 方法二：动态规划 + 滚动数组


1. **思路**

观察转移方程只依赖上一行和当前行，可仅用一维数组 `dp[j]` 滚动更新，将空间优化为 `O(m)`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int n = s1.length(), m = s2.length();
        if (n + m != s3.length()) return false;
        boolean[] dp = new boolean[m + 1];
        dp[0] = true;
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0) dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1);
                if (j > 0) dp[j] = dp[j] || (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        }
        return dp[m];
    }
}
```

```python [Python]
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        n, m = len(s1), len(s2)
        if n + m != len(s3): return False
        dp = [False] * (m + 1)
        dp[0] = True
        for i in range(n + 1):
            for j in range(m + 1):
                if i > 0: dp[j] = dp[j] and s1[i - 1] == s3[i + j - 1]
                if j > 0: dp[j] = dp[j] or (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
        return dp[m]
```

```go [Go]
func isInterleave(s1 string, s2 string, s3 string) bool {
    n, m := len(s1), len(s2)
    if n + m != len(s3) { return false }
    dp := make([]bool, m+1)
    dp[0] = true
    for i := 0; i <= n; i++ {
        for j := 0; j <= m; j++ {
            if i > 0 { dp[j] = dp[j] && s1[i-1] == s3[i+j-1] }
            if j > 0 { dp[j] = dp[j] || (dp[j-1] && s2[j-1] == s3[i+j-1]) }
        }
    }
    return dp[m]
}
```

```c [C]
bool isInterleave(char* s1, char* s2, char* s3) {
    int n = strlen(s1), m = strlen(s2);
    if (n + m != strlen(s3)) return false;
    bool dp[m + 1];
    for (int k = 0; k <= m; k++) dp[k] = false;
    dp[0] = true;
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            if (i > 0) dp[j] = dp[j] && s1[i - 1] == s3[i + j - 1];
            if (j > 0) dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] == s3[i + j - 1]);
        }
    }
    return dp[m];
}
```

```cpp [C++]
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size(), m = s2.size();
        if (n + m != s3.size()) return false;
        vector<bool> dp(m + 1, false);
        dp[0] = true;
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0) dp[j] = dp[j] && s1[i - 1] == s3[i + j - 1];
                if (j > 0) dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] == s3[i + j - 1]);
            }
        }
        return dp[m];
    }
};
```

```javascript [JavaScript]
var isInterleave = function(s1, s2, s3) {
    const n = s1.length, m = s2.length;
    if (n + m !== s3.length) return false;
    const dp = new Array(m + 1).fill(false);
    dp[0] = true;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i > 0) dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1];
            if (j > 0) dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }
    return dp[m];
};
```

```typescript [TypeScript]
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const n = s1.length, m = s2.length;
    if (n + m !== s3.length) return false;
    const dp: boolean[] = new Array(m + 1).fill(false);
    dp[0] = true;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i > 0) dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1];
            if (j > 0) dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }
    return dp[m];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n*m)`。
- **空间复杂度**：`O(m)`，滚动数组优化。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二维动态规划 | `O(n*m)` | `O(n*m)` | 直观易懂 |
| 动态规划 + 滚动数组 | `O(n*m)` | `O(m)` | 空间最优 |
