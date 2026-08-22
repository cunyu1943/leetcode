# [10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching/)



## 一、题目描述

给你一个字符串 `s` 和一个字符规律 `p`，请你来实现一个支持 `'.'` 和 `'*'` 的正则表达式匹配。

-   `'.'` 匹配任意单个字符；
-   `'*'` 匹配零个或多个前面的那一个元素。

返回一个布尔值，表示匹配是否覆盖整个输入字符串（而非部分）。



**示例 1：**

```
输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
```

**示例 2：**

```
输入：s = "aa", p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素，在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```

**示例 3：**

```
输入：s = "ab", p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```

**提示：**

-   `1 <= s.length <= 20`
-   `1 <= p.length <= 20`
-   `s` 只包含从 `a-z` 的小写字母。
-   `p` 只包含从 `a-z` 的小写字母，以及字符 `.` 和 `*`。
-   保证每次出现字符 `*` 时，前面都匹配到有效的字符。



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

定义 `dp[i][j]` 表示 `s` 的前 `i` 个字符能否被 `p` 的前 `j` 个字符匹配。

-   初始 `dp[0][0] = true`（空串匹配空串）；
-   处理 `*`：当 `p[j-1] == '*'` 时，它前面的字符是 `p[j-2]`：
    -   **匹配零个**：`dp[i][j] = dp[i][j-2]`；
    -   **匹配一个或多个**：需要 `s[i-1]` 与 `p[j-2]` 能匹配（相等或 `p[j-2]=='.'`），且 `dp[i-1][j]` 为真；
-   非 `*` 情况：若 `s[i-1] == p[j-1]` 或 `p[j-1] == '.'`，则 `dp[i][j] = dp[i-1][j-1]`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int j = 2; j <= n; j++) {
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2];
                    char prev = p.charAt(j - 2);
                    if (prev == '.' || prev == s.charAt(i - 1)) {
                        dp[i][j] |= dp[i - 1][j];
                    }
                } else {
                    if (pc == '.' || pc == s.charAt(i - 1)) {
                        dp[i][j] = dp[i - 1][j - 1];
                    }
                }
            }
        }
        return dp[m][n];
    }
}
```

```python [Python]
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for j in range(2, n + 1):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 2]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                pc = p[j - 1]
                if pc == '*':
                    dp[i][j] = dp[i][j - 2]
                    prev = p[j - 2]
                    if prev == '.' or prev == s[i - 1]:
                        dp[i][j] |= dp[i - 1][j]
                else:
                    if pc == '.' or pc == s[i - 1]:
                        dp[i][j] = dp[i - 1][j - 1]
        return dp[m][n]
```

```go [Go]
func isMatch(s string, p string) bool {
    m, n := len(s), len(p)
    dp := make([][]bool, m+1)
    for i := range dp {
        dp[i] = make([]bool, n+1)
    }
    dp[0][0] = true
    for j := 2; j <= n; j++ {
        if p[j-1] == '*' {
            dp[0][j] = dp[0][j-2]
        }
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            pc := p[j-1]
            if pc == '*' {
                dp[i][j] = dp[i][j-2]
                prev := p[j-2]
                if prev == '.' || prev == s[i-1] {
                    dp[i][j] = dp[i][j] || dp[i-1][j]
                }
            } else {
                if pc == '.' || pc == s[i-1] {
                    dp[i][j] = dp[i-1][j-1]
                }
            }
        }
    }
    return dp[m][n]
}
```

```c [C]
#include <stdbool.h>
#include <string.h>

int isMatch(char* s, char* p) {
    int m = strlen(s), n = strlen(p);
    bool dp[21][21];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) dp[i][j] = false;
    dp[0][0] = true;
    for (int j = 2; j <= n; j++) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            char pc = p[j - 1];
            if (pc == '*') {
                dp[i][j] = dp[i][j - 2];
                char prev = p[j - 2];
                if (prev == '.' || prev == s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else {
                if (pc == '.' || pc == s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
    }
    return dp[m][n];
}
```

```cpp [C++]
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int j = 2; j <= n; j++) {
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p[j - 1];
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2];
                    char prev = p[j - 2];
                    if (prev == '.' || prev == s[i - 1]) {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                } else {
                    if (pc == '.' || pc == s[i - 1]) {
                        dp[i][j] = dp[i - 1][j - 1];
                    }
                }
            }
        }
        return dp[m][n];
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const m = s.length, n = p.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    dp[0][0] = true;
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const pc = p[j - 1];
            if (pc === '*') {
                dp[i][j] = dp[i][j - 2];
                const prev = p[j - 2];
                if (prev === '.' || prev === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else {
                if (pc === '.' || pc === s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
    }
    return dp[m][n];
};
```

```ts [TypeScript]
function isMatch(s: string, p: string): boolean {
    const m = s.length, n = p.length;
    const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    dp[0][0] = true;
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const pc = p[j - 1];
            if (pc === '*') {
                dp[i][j] = dp[i][j - 2];
                const prev = p[j - 2];
                if (prev === '.' || prev === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else {
                if (pc === '.' || pc === s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
    }
    return dp[m][n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，其中 `m`、`n` 分别是 `s` 和 `p` 的长度，需要填满二维 DP 表。
- **空间复杂度**：`O(m * n)`，DP 表的大小。

### 2.2 方法二：带记忆化的递归

1. **思路**

直接递归定义匹配关系，并用哈希表 / 二维数组记忆已经计算过的 `(i, j)` 状态，避免重复计算。

-   若 `p` 当前是 `*`（即 `p[j+1] == '*'`）：要么跳过 `p[j]p[j+1]`（匹配 0 个），要么当前字符匹配且 `s` 后移继续匹配；
-   否则，若当前字符匹配，则双双后移；
-   用记忆化消除指数级重复。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    Boolean[][] memo;
    String s, p;

    public boolean isMatch(String s, String p) {
        this.s = s; this.p = p;
        memo = new Boolean[s.length() + 1][p.length() + 1];
        return dfs(0, 0);
    }

    private boolean dfs(int i, int j) {
        if (j == p.length()) return i == s.length();
        if (i <= s.length() && memo[i][j] != null) return memo[i][j];
        boolean firstMatch = i < s.length() &&
            (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');
        boolean ans;
        if (j + 1 < p.length() && p.charAt(j + 1) == '*') {
            ans = dfs(i, j + 2) || (firstMatch && dfs(i + 1, j));
        } else {
            ans = firstMatch && dfs(i + 1, j + 1);
        }
        if (i <= s.length()) memo[i][j] = ans;
        return ans;
    }
}
```

```python [Python]
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        from functools import lru_cache
        @lru_cache(None)
        def dfs(i, j):
            if j == len(p):
                return i == len(s)
            first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')
            if j + 1 < len(p) and p[j + 1] == '*':
                return dfs(i, j + 2) or (first_match and dfs(i + 1, j))
            return first_match and dfs(i + 1, j + 1)
        return dfs(0, 0)
```

```go [Go]
func isMatch(s string, p string) bool {
    m, n := len(s), len(p)
    memo := make([][]int, m+1)
    for i := range memo {
        memo[i] = make([]int, n+1)
    }
    var dfs func(i, j int) bool
    dfs = func(i, j int) bool {
        if j == n {
            return i == m
        }
        if memo[i][j] != 0 {
            return memo[i][j] == 1
        }
        first := false
        if i < m && (p[j] == s[i] || p[j] == '.') {
            first = true
        }
        var ans bool
        if j+1 < n && p[j+1] == '*' {
            ans = dfs(i, j+2) || (first && dfs(i+1, j))
        } else {
            ans = first && dfs(i+1, j+1)
        }
        if ans {
            memo[i][j] = 1
        } else {
            memo[i][j] = -1
        }
        return ans
    }
    return dfs(0, 0)
}
```

```c [C]
/* C 语言实现记忆化递归需要手动管理 memo 数组，较繁琐，推荐直接使用方法一的 DP */
```

```cpp [C++]
class Solution {
public:
    int memo[21][21];
    string s, p;

    bool dfs(int i, int j) {
        if (j == p.size()) return i == s.size();
        if (memo[i][j] != 0) return memo[i][j] == 1;
        bool firstMatch = i < s.size() && (p[j] == s[i] || p[j] == '.');
        bool ans;
        if (j + 1 < p.size() && p[j + 1] == '*') {
            ans = dfs(i, j + 2) || (firstMatch && dfs(i + 1, j));
        } else {
            ans = firstMatch && dfs(i + 1, j + 1);
        }
        memo[i][j] = ans ? 1 : -1;
        return ans;
    }

    bool isMatch(string s, string p) {
        this->s = s; this->p = p;
        memset(memo, 0, sizeof(memo));
        return dfs(0, 0);
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const m = s.length, n = p.length;
    const memo = new Map();
    function dfs(i, j) {
        if (j === n) return i === m;
        const key = i + ',' + j;
        if (memo.has(key)) return memo.get(key);
        const firstMatch = i < m && (p[j] === s[i] || p[j] === '.');
        let ans;
        if (j + 1 < n && p[j + 1] === '*') {
            ans = dfs(i, j + 2) || (firstMatch && dfs(i + 1, j));
        } else {
            ans = firstMatch && dfs(i + 1, j + 1);
        }
        memo.set(key, ans);
        return ans;
    }
    return dfs(0, 0);
};
```

```ts [TypeScript]
function isMatch(s: string, p: string): boolean {
    const m = s.length, n = p.length;
    const memo = new Map<string, boolean>();
    function dfs(i: number, j: number): boolean {
        if (j === n) return i === m;
        const key = i + ',' + j;
        if (memo.has(key)) return memo.get(key) as boolean;
        const firstMatch = i < m && (p[j] === s[i] || p[j] === '.');
        let ans: boolean;
        if (j + 1 < n && p[j + 1] === '*') {
            ans = dfs(i, j + 2) || (firstMatch && dfs(i + 1, j));
        } else {
            ans = firstMatch && dfs(i + 1, j + 1);
        }
        memo.set(key, ans);
        return ans;
    }
    return dfs(0, 0);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，每个 `(i, j)` 状态至多计算一次。
- **空间复杂度**：`O(m * n)`，记忆化数组 / 递归栈开销。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(m * n)` | `O(m * n)` | 思路清晰，易推导 |
| 带记忆化的递归 | `O(m * n)` | `O(m * n)` | 代码简洁，有递归开销 |

