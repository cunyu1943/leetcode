# [LCR 096. 交错字符串](https://leetcode.cn/problems/IY6buf/)



## 一、题目描述

给定三个字符串 `s1`、`s2`、`s3`，请判断 `s3` 能不能由 `s1` 和 `s2` **交织** 组成。

两个字符串 `s` 和 `t` **交织** 的定义与过程如下，其中每个字符串都会被分割成若干 **非空** 子字符串：

```
s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
```

**交织** 是 `s1 + t1 + s2 + t2 + s3 + t3 + ...` 或者 `t1 + s1 + t2 + s2 + t3 + s3 + ...`。

提示：`a + b` 意味着字符串 `a` 和 `b` 连接。



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

**示例 3：**

```
输入：s1 = "", s2 = "", s3 = ""
输出：true
```

**提示：**

- `0 <= s1.length, s2.length <= 100`
- `0 <= s3.length <= 200`
- `s1`、`s2`、`s3` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

设 `dp[i][j]` 表示 `s3` 的前 `i+j` 个字符能否由 `s1` 的前 `i` 个与 `s2` 的前 `j` 个交错组成：

- 首项条件：`len(s1) + len(s2) == len(s3)`，否则直接 `false`；
- `dp[0][0] = true`；
- 转移：
  - 若 `s1[i-1] == s3[i+j-1]`，可由 `dp[i-1][j]` 转移；
  - 若 `s2[j-1] == s3[i+j-1]`，可由 `dp[i][j-1]` 转移。

时间 `O(mn)`，空间 `O(mn)`（可滚动到 `O(n)`）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i > 0 && s1.charAt(i - 1) == s3.charAt(i + j - 1))
                    dp[i][j] |= dp[i - 1][j];
                if (j > 0 && s2.charAt(j - 1) == s3.charAt(i + j - 1))
                    dp[i][j] |= dp[i][j - 1];
            }
        }
        return dp[m][n];
    }
}
```

```python [Python]
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for i in range(m + 1):
            for j in range(n + 1):
                if i > 0 and s1[i - 1] == s3[i + j - 1]:
                    dp[i][j] |= dp[i - 1][j]
                if j > 0 and s2[j - 1] == s3[i + j - 1]:
                    dp[i][j] |= dp[i][j - 1]
        return dp[m][n]
```

```cpp [C++]
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != s3.size()) return false;
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i > 0 && s1[i - 1] == s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
                if (j > 0 && s2[j - 1] == s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
            }
        }
        return dp[m][n];
    }
};
```

```go [Go]
func isInterleave(s1 string, s2 string, s3 string) bool {
    m, n := len(s1), len(s2)
    if m+n != len(s3) {
        return false
    }
    dp := make([][]bool, m+1)
    for i := range dp {
        dp[i] = make([]bool, n+1)
    }
    dp[0][0] = true
    for i := 0; i <= m; i++ {
        for j := 0; j <= n; j++ {
            if i > 0 && s1[i-1] == s3[i+j-1] && dp[i-1][j] {
                dp[i][j] = true
            }
            if j > 0 && s2[j-1] == s3[i+j-1] && dp[i][j-1] {
                dp[i][j] = true
            }
        }
    }
    return dp[m][n]
}
```

```js [JavaScript]
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
    const m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    dp[0][0] = true;
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i > 0 && s1[i - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
            if (j > 0 && s2[j - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
        }
    }
    return dp[m][n];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int isInterleave(char* s1, char* s2, char* s3) {
    int m = (int)strlen(s1), n = (int)strlen(s2);
    if (m + n != (int)strlen(s3)) return 0;
    int** dp = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) dp[i] = (int*)calloc(n + 1, sizeof(int));
    dp[0][0] = 1;
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i > 0 && s1[i - 1] == s3[i + j - 1] && dp[i - 1][j]) dp[i][j] = 1;
            if (j > 0 && s2[j - 1] == s3[i + j - 1] && dp[i][j - 1]) dp[i][j] = 1;
        }
    }
    int res = dp[m][n];
    for (int i = 0; i <= m; i++) free(dp[i]);
    free(dp);
    return res;
}
```

```ts [TypeScript]
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;
    const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    dp[0][0] = true;
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i > 0 && s1[i - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j];
            if (j > 0 && s2[j - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j] || dp[i][j - 1];
        }
    }
    return dp[m][n];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`。
- **空间复杂度**：`O(mn)`（可滚动优化到 `O(n)`）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(mn)` | `O(mn)` | 标准解法 |

`dp[i][j]` 表示「用 s1 前 i 个与 s2 前 j 个字符能否交织成 s3 的前 i+j 个」。每次只消耗 s1 或 s2 的最后一个字符，与 s3 对应位置比较即可完成转移。

