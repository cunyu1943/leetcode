# [44. 通配符匹配](https://leetcode.cn/problems/wildcard-matching/)



## 一、题目描述

给你一个输入字符串 `s` 和一个字符模式 `p`，请你实现一个支持 `'?'` 和 `'*'` 匹配规则的通配符匹配：

-   `'?'` 可以匹配任何单个字符。
-   `'*'` 可以匹配任意字符序列（包括空字符序列）。

判定匹配成功的充要条件是：字符模式必须能够 **完全匹配** 输入字符串（而不是部分匹配）。



**示例 1：**

```
输入：s = "aa", p = "a"
输出：false
```

**示例 2：**

```
输入：s = "aa", p = "*"
输出：true
```

**示例 3：**

```
输入：s = "cb", p = "?a"
输出：false
```

**提示：**

-   `0 <= s.length, p.length <= 2000`
-   `s` 仅由小写英文字母组成
-   `p` 仅由小写英文字母、`'?'` 或 `'*'` 组成



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

定义 `dp[i][j]` 表示 `s` 的前 `i` 个字符能否被 `p` 的前 `j` 个字符匹配：

-   `p[j-1] == '*'`：`*` 可匹配空（`dp[i][j-1]`）或可匹配当前字符（`dp[i-1][j]`）；
-   `p[j-1] == '?'` 或 `p[j-1] == s[i-1]`：`dp[i][j] = dp[i-1][j-1]`；
-   否则为 `false`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?' || pc == s.charAt(i - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
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
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 1]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                pc = p[j - 1]
                if pc == '*':
                    dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
                elif pc == '?' or pc == s[i - 1]:
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
    for j := 1; j <= n; j++ {
        if p[j-1] == '*' {
            dp[0][j] = dp[0][j-1]
        }
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            pc := p[j-1]
            if pc == '*' {
                dp[i][j] = dp[i][j-1] || dp[i-1][j]
            } else if pc == '?' || pc == s[i-1] {
                dp[i][j] = dp[i-1][j-1]
            }
        }
    }
    return dp[m][n]
}
```

```c [C]
int isMatch(char* s, char* p) {
    int m = 0, n = 0;
    while (s[m]) m++;
    while (p[n]) n++;
    int** dp = (int**)malloc(sizeof(int*) * (m + 1));
    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)calloc(n + 1, sizeof(int));
    }
    dp[0][0] = 1;
    for (int j = 1; j <= n; j++) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 1];
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            char pc = p[j - 1];
            if (pc == '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else if (pc == '?' || pc == s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    int r = dp[m][n];
    for (int i = 0; i <= m; i++) free(dp[i]);
    free(dp);
    return r;
}
```

```cpp [C++]
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 1];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p[j - 1];
                if (pc == '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                else if (pc == '?' || pc == s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
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
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const pc = p[j - 1];
            if (pc === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            else if (pc === '?' || pc === s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
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
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const pc = p[j - 1];
            if (pc === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            else if (pc === '?' || pc === s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
        }
    }
    return dp[m][n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`。
- **空间复杂度**：`O(m * n)`，可优化为 `O(n)` 滚动数组。

### 2.2 方法二：贪心（双指针 + 回溯星号）

1. **思路**

贪心处理：用 `i`、`j` 遍历 `s`、`p`；遇到 `*` 时记录星号位置 `star` 和 `s` 的回溯点 `match`，先让 `*` 匹配空（跳过），若后续失配则让 `*` 多匹配一个字符（回溯 `i = match + 1`）。每当 `p[j] == '*'`，重置 `j` 到星号后，复用该星号。比 DP 空间更优且更快。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isMatch(String s, String p) {
        int i = 0, j = 0, star = -1, match = 0;
        while (i < s.length()) {
            if (j < p.length() && (p.charAt(j) == '?' || p.charAt(j) == s.charAt(i))) {
                i++; j++;
            } else if (j < p.length() && p.charAt(j) == '*') {
                star = j;
                match = i;
                j++;
            } else if (star != -1) {
                j = star + 1;
                match++;
                i = match;
            } else {
                return false;
            }
        }
        while (j < p.length() && p.charAt(j) == '*') j++;
        return j == p.length();
    }
}
```

```python [Python]
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        i = j = star = -1
        match = 0
        while i < len(s):
            if j < len(p) and (p[j] == '?' or p[j] == s[i]):
                i += 1
                j += 1
            elif j < len(p) and p[j] == '*':
                star = j
                match = i
                j += 1
            elif star != -1:
                j = star + 1
                match += 1
                i = match
            else:
                return False
        while j < len(p) and p[j] == '*':
            j += 1
        return j == len(p)
```

```go [Go]
func isMatch(s string, p string) bool {
    i, j, star, match := 0, 0, -1, 0
    for i < len(s) {
        if j < len(p) && (p[j] == '?' || p[j] == s[i]) {
            i++; j++
        } else if j < len(p) && p[j] == '*' {
            star = j
            match = i
            j++
        } else if star != -1 {
            j = star + 1
            match++
            i = match
        } else {
            return false
        }
    }
    for j < len(p) && p[j] == '*' {
        j++
    }
    return j == len(p)
}
```

```c [C]
int isMatch(char* s, char* p) {
    int i = 0, j = 0, star = -1, match = 0;
    while (s[i]) {
        if (p[j] && (p[j] == '?' || p[j] == s[i])) {
            i++; j++;
        } else if (p[j] && p[j] == '*') {
            star = j;
            match = i;
            j++;
        } else if (star != -1) {
            j = star + 1;
            match++;
            i = match;
        } else {
            return 0;
        }
    }
    while (p[j] && p[j] == '*') j++;
    return p[j] == '\0';
}
```

```cpp [C++]
class Solution {
public:
    bool isMatch(string s, string p) {
        int i = 0, j = 0, star = -1, match = 0;
        while (i < s.size()) {
            if (j < p.size() && (p[j] == '?' || p[j] == s[i])) {
                i++; j++;
            } else if (j < p.size() && p[j] == '*') {
                star = j;
                match = i;
                j++;
            } else if (star != -1) {
                j = star + 1;
                match++;
                i = match;
            } else {
                return false;
            }
        }
        while (j < p.size() && p[j] == '*') j++;
        return j == p.size();
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
    let i = 0, j = 0, star = -1, match = 0;
    while (i < s.length) {
        if (j < p.length && (p[j] === '?' || p[j] === s[i])) {
            i++; j++;
        } else if (j < p.length && p[j] === '*') {
            star = j;
            match = i;
            j++;
        } else if (star !== -1) {
            j = star + 1;
            match++;
            i = match;
        } else {
            return false;
        }
    }
    while (j < p.length && p[j] === '*') j++;
    return j === p.length;
};
```

```ts [TypeScript]
function isMatch(s: string, p: string): boolean {
    let i = 0, j = 0, star = -1, match = 0;
    while (i < s.length) {
        if (j < p.length && (p[j] === '?' || p[j] === s[i])) {
            i++; j++;
        } else if (j < p.length && p[j] === '*') {
            star = j;
            match = i;
            j++;
        } else if (star !== -1) {
            j = star + 1;
            match++;
            i = match;
        } else {
            return false;
        }
    }
    while (j < p.length && p[j] === '*') j++;
    return j === p.length;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)` 最坏，但均摊接近 `O(m + n)`。
- **空间复杂度**：`O(1)`，只使用指针。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(m * n)` | `O(m * n)` | 思路清晰，易推导 |
| 贪心（双指针 + 回溯星号） | `O(m * n)` | `O(1)` | 空间最优，速度快 |

