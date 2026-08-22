# [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)



## 一、题目描述

给你一个字符串 `s`，找到 `s` 中最长的 **回文** 子串。



**示例 1：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

**示例 2：**

```
输入：s = "cbbd"
输出："bb"
```

**提示：**

-   `1 <= s.length <= 1000`
-   `s` 仅由数字和英文字母组成



## 二、解答方法

### 2.1 方法一：中心扩展法

1. **思路**

回文串的中心可能是一个字符（奇数长度），也可能是两个字符之间（偶数长度）。因此我们从每个可能的「中心」向两侧扩展：

-   枚举每个位置 `i` 作为中心；
-   分别处理奇数长度（中心 `i`）和偶数长度（中心 `i, i+1`）；
-   从中心向左右扩展，直到左右字符不相等或越界；
-   记录扩展得到的最长回文串起点与长度。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String longestPalindrome(String s) {
        int n = s.length();
        if (n < 2) return s;
        int start = 0, maxLen = 1;
        for (int i = 0; i < n; i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }
        return s.substring(start, start + maxLen);
    }

    private int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}
```

```python [Python]
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        if n < 2:
            return s
        start, max_len = 0, 1

        def expand(left: int, right: int) -> int:
            while left >= 0 and right < n and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1

        for i in range(n):
            l1 = expand(i, i)
            l2 = expand(i, i + 1)
            length = max(l1, l2)
            if length > max_len:
                max_len = length
                start = i - (length - 1) // 2
        return s[start:start + max_len]
```

```go [Go]
func longestPalindrome(s string) string {
    n := len(s)
    if n < 2 {
        return s
    }
    start, maxLen := 0, 1
    expand := func(left, right int) int {
        for left >= 0 && right < n && s[left] == s[right] {
            left--
            right++
        }
        return right - left - 1
    }
    for i := 0; i < n; i++ {
        l1 := expand(i, i)
        l2 := expand(i, i+1)
        length := l1
        if l2 > length {
            length = l2
        }
        if length > maxLen {
            maxLen = length
            start = i - (length-1)/2
        }
    }
    return s[start : start+maxLen]
}
```

```c [C]
char* longestPalindrome(char* s) {
    int n = 0;
    while (s[n]) n++;
    if (n < 2) return s;
    int start = 0, maxLen = 1;
    for (int i = 0; i < n; i++) {
        int l1 = i, r1 = i;
        while (l1 >= 0 && r1 < n && s[l1] == s[r1]) { l1--; r1++; }
        int len1 = r1 - l1 - 1;
        int l2 = i, r2 = i + 1;
        while (l2 >= 0 && r2 < n && s[l2] == s[r2]) { l2--; r2++; }
        int len2 = r2 - l2 - 1;
        int length = len1 > len2 ? len1 : len2;
        if (length > maxLen) {
            maxLen = length;
            start = i - (length - 1) / 2;
        }
    }
    char* res = (char*)malloc(sizeof(char) * (maxLen + 1));
    for (int k = 0; k < maxLen; k++) res[k] = s[start + k];
    res[maxLen] = '\0';
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.size();
        if (n < 2) return s;
        int start = 0, maxLen = 1;
        auto expand = [&](int left, int right) {
            while (left >= 0 && right < n && s[left] == s[right]) {
                left--; right++;
            }
            return right - left - 1;
        };
        for (int i = 0; i < n; i++) {
            int len1 = expand(i, i);
            int len2 = expand(i, i + 1);
            int length = max(len1, len2);
            if (length > maxLen) {
                maxLen = length;
                start = i - (length - 1) / 2;
            }
        }
        return s.substr(start, maxLen);
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const n = s.length;
    if (n < 2) return s;
    let start = 0, maxLen = 1;
    const expand = (left, right) => {
        while (left >= 0 && right < n && s[left] === s[right]) {
            left--; right++;
        }
        return right - left - 1;
    };
    for (let i = 0; i < n; i++) {
        const len1 = expand(i, i);
        const len2 = expand(i, i + 1);
        const length = Math.max(len1, len2);
        if (length > maxLen) {
            maxLen = length;
            start = i - (length - 1) / 2;
        }
    }
    return s.substring(start, start + maxLen);
};
```

```ts [TypeScript]
function longestPalindrome(s: string): string {
    const n = s.length;
    if (n < 2) return s;
    let start = 0, maxLen = 1;
    const expand = (left: number, right: number): number => {
        while (left >= 0 && right < n && s[left] === s[right]) {
            left--; right++;
        }
        return right - left - 1;
    };
    for (let i = 0; i < n; i++) {
        const len1 = expand(i, i);
        const len2 = expand(i, i + 1);
        const length = Math.max(len1, len2);
        if (length > maxLen) {
            maxLen = length;
            start = i - (length - 1) / 2;
        }
    }
    return s.substring(start, start + maxLen);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`**，共有 `2n - 1` 个中心，每个中心最多扩展 `O(n)` 次。
- **空间复杂度**：`O(1)`**，只使用常数个变量。

### 2.2 方法二：动态规划

1. **思路**

定义 `dp[i][j]` 表示子串 `s[i..j]` 是否为回文。状态转移利用已知的小区间结果：

-   长度为 1 的子串一定是回文：`dp[i][i] = true`；
-   长度为 2 时，若 `s[i] == s[j]` 则为回文；
-   长度大于 2 时：`dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]`；
-   从小到大枚举长度，记录最长回文子串的起止位置。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String longestPalindrome(String s) {
        int n = s.length();
        if (n < 2) return s;
        boolean[][] dp = new boolean[n][n];
        int start = 0, maxLen = 1;
        for (int i = 0; i < n; i++) dp[i][i] = true;
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    if (len == 2) dp[i][j] = true;
                    else dp[i][j] = dp[i + 1][j - 1];
                }
                if (dp[i][j] && len > maxLen) {
                    maxLen = len;
                    start = i;
                }
            }
        }
        return s.substring(start, start + maxLen);
    }
}
```

```python [Python]
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        if n < 2:
            return s
        dp = [[False] * n for _ in range(n)]
        start, max_len = 0, 1
        for i in range(n):
            dp[i][i] = True
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j]:
                    dp[i][j] = True if length == 2 else dp[i + 1][j - 1]
                if dp[i][j] and length > max_len:
                    max_len = length
                    start = i
        return s[start:start + max_len]
```

```go [Go]
func longestPalindrome(s string) string {
    n := len(s)
    if n < 2 {
        return s
    }
    dp := make([][]bool, n)
    for i := range dp {
        dp[i] = make([]bool, n)
    }
    start, maxLen := 0, 1
    for i := 0; i < n; i++ {
        dp[i][i] = true
    }
    for length := 2; length <= n; length++ {
        for i := 0; i+length-1 < n; i++ {
            j := i + length - 1
            if s[i] == s[j] {
                if length == 2 {
                    dp[i][j] = true
                } else {
                    dp[i][j] = dp[i+1][j-1]
                }
            }
            if dp[i][j] && length > maxLen {
                maxLen = length
                start = i
            }
        }
    }
    return s[start : start+maxLen]
}
```

```c [C]
char* longestPalindrome(char* s) {
    int n = 0;
    while (s[n]) n++;
    if (n < 2) return s;
    int* dp = (int*)malloc(sizeof(int) * n * n);
    for (int i = 0; i < n * n; i++) dp[i] = 0;
    int start = 0, maxLen = 1;
    for (int i = 0; i < n; i++) dp[i * n + i] = 1;
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            if (s[i] == s[j]) {
                if (len == 2) dp[i * n + j] = 1;
                else dp[i * n + j] = dp[(i + 1) * n + (j - 1)];
            }
            if (dp[i * n + j] && len > maxLen) {
                maxLen = len;
                start = i;
            }
        }
    }
    char* res = (char*)malloc(sizeof(char) * (maxLen + 1));
    for (int k = 0; k < maxLen; k++) res[k] = s[start + k];
    res[maxLen] = '\0';
    free(dp);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.size();
        if (n < 2) return s;
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        int start = 0, maxLen = 1;
        for (int i = 0; i < n; i++) dp[i][i] = true;
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (s[i] == s[j]) {
                    dp[i][j] = (len == 2) ? true : dp[i + 1][j - 1];
                }
                if (dp[i][j] && len > maxLen) {
                    maxLen = len;
                    start = i;
                }
            }
        }
        return s.substr(start, maxLen);
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const n = s.length;
    if (n < 2) return s;
    const dp = Array.from({ length: n }, () => new Array(n).fill(false));
    let start = 0, maxLen = 1;
    for (let i = 0; i < n; i++) dp[i][i] = true;
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            if (s[i] === s[j]) {
                dp[i][j] = len === 2 ? true : dp[i + 1][j - 1];
            }
            if (dp[i][j] && len > maxLen) {
                maxLen = len;
                start = i;
            }
        }
    }
    return s.substring(start, start + maxLen);
};
```

```ts [TypeScript]
function longestPalindrome(s: string): string {
    const n = s.length;
    if (n < 2) return s;
    const dp: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
    let start = 0, maxLen = 1;
    for (let i = 0; i < n; i++) dp[i][i] = true;
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            if (s[i] === s[j]) {
                dp[i][j] = len === 2 ? true : dp[i + 1][j - 1];
            }
            if (dp[i][j] && len > maxLen) {
                maxLen = len;
                start = i;
            }
        }
    }
    return s.substring(start, start + maxLen);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，`dp` 数组共有 `n²` 个状态，每个状态 `O(1)` 转移。
- **空间复杂度**：`O(n²)`，需要 `n × n` 的二维数组。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 中心扩展法 | `O(n²)` | `O(1)` | 常规实现 |
| 动态规划 | `O(n²)` | `O(n²)` | 思路清晰，易推导 |

