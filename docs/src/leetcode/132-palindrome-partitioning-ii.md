# [132. 分割回文串 II](https://leetcode.cn/problems/palindrome-partitioning-ii/)



## 一、题目描述

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是回文串。

返回符合要求的 **最少分割次数**。



**示例 1：**

```
输入：s = "aab"
输出：1
解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样一组回文子串。
```

**示例 2：**

```
输入：s = "a"
输出：0
```

**示例 3：**

```
输入：s = "ab"
输出：1
```

**提示：**

- `1 <= s.length <= 2000`
- `s` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：动态规划（预处理回文 + 最少分割）

1. **思路**

先做 `O(n²)` 预处理，得到 `isPalin[i][j]` 表示子串 `s[i..j]` 是否为回文。然后定义 `dp[i]` 为「将前 `i` 个字符（即 `s[0..i-1]`）分割为回文的最小次数」。

- 初始化 `dp[i] = i - 1`（最坏情况：每个字符单独成段，需要 `i-1` 次分割）；
- 枚举最后一个回文段的起点 `j`（`0 <= j < i`），若 `s[j..i-1]` 是回文，则：
  `dp[i] = min(dp[i], dp[j] + 1)`；
- 特别地，若整段 `s[0..i-1]` 本身就是回文，则 `dp[i] = 0`。

最终 `dp[n]` 即为答案。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minCut(String s) {
        int n = s.length();
        boolean[][] isPalin = new boolean[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                if (s.charAt(i) == s.charAt(j) && (i - j <= 2 || isPalin[j + 1][i - 1])) {
                    isPalin[j][i] = true;
                }
            }
        }

        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) dp[i] = i - 1;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (isPalin[j][i - 1]) {
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        is_palin = [[False] * n for _ in range(n)]
        for i in range(n):
            for j in range(i + 1):
                if s[i] == s[j] and (i - j <= 2 or is_palin[j + 1][i - 1]):
                    is_palin[j][i] = True

        dp = [i - 1 for i in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(i):
                if is_palin[j][i - 1]:
                    dp[i] = min(dp[i], dp[j] + 1)
        return dp[n]
```

```cpp [C++]
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        for (int i = 0; i < n; i++)
            for (int j = 0; j <= i; j++)
                if (s[i] == s[j] && (i - j <= 2 || isPalin[j + 1][i - 1]))
                    isPalin[j][i] = true;

        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) dp[i] = i - 1;
        for (int i = 1; i <= n; i++)
            for (int j = 0; j < i; j++)
                if (isPalin[j][i - 1])
                    dp[i] = min(dp[i], dp[j] + 1);
        return dp[n];
    }
};
```

```go [Go]
func minCut(s string) int {
    n := len(s)
    isPalin := make([][]bool, n)
    for i := range isPalin {
        isPalin[i] = make([]bool, n)
    }
    for i := 0; i < n; i++ {
        for j := 0; j <= i; j++ {
            if s[i] == s[j] && (i-j <= 2 || isPalin[j+1][i-1]) {
                isPalin[j][i] = true
            }
        }
    }

    dp := make([]int, n+1)
    for i := 1; i <= n; i++ {
        dp[i] = i - 1
    }
    for i := 1; i <= n; i++ {
        for j := 0; j < i; j++ {
            if isPalin[j][i-1] {
                if dp[j]+1 < dp[i] {
                    dp[i] = dp[j] + 1
                }
            }
        }
    }
    return dp[n]
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    const n = s.length;
    const isPalin = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (s[i] === s[j] && (i - j <= 2 || isPalin[j + 1][i - 1])) {
                isPalin[j][i] = true;
            }
        }
    }

    const dp = Array.from({ length: n + 1 }, (_, i) => i - 1);
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (isPalin[j][i - 1]) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }
    return dp[n];
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

int minCut(char* s) {
    int n = (int)strlen(s);
    bool** isPalin = (bool**)malloc(n * sizeof(bool*));
    for (int i = 0; i < n; i++) isPalin[i] = (bool*)calloc(n, sizeof(bool));
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            if (s[i] == s[j] && (i - j <= 2 || isPalin[j + 1][i - 1]))
                isPalin[j][i] = true;
    int* dp = (int*)malloc((n + 1) * sizeof(int));
    for (int i = 1; i <= n; i++) dp[i] = i - 1;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            if (isPalin[j][i - 1] && dp[j] + 1 < dp[i])
                dp[i] = dp[j] + 1;
    int ans = dp[n];
    for (int i = 0; i < n; i++) free(isPalin[i]);
    free(isPalin); free(dp);
    return ans;
}
```

```ts [TypeScript]
function minCut(s: string): number {
    const n = s.length;
    const isPalin: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (s[i] === s[j] && (i - j <= 2 || isPalin[j + 1][i - 1])) {
                isPalin[j][i] = true;
            }
        }
    }

    const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i - 1);
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (isPalin[j][i - 1]) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }
    return dp[n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，预处理回文 `O(n²)` + DP 转移 `O(n²)`。
- **空间复杂度**：`O(n²)`，`isPalin` 二维数组，可优化到 `O(n)`。

### 2.2 方法二：动态规划优化（一维状态 + 中心扩展）

1. **思路**

可以省掉 `isPalin` 表，用一个一维 `dp[i]` 表示前 `i` 个字符的最小分割次数，并利用「中心扩展」枚举所有回文中心：每发现一个回文 `s[l..r]`，则 `dp[r+1] = min(dp[r+1], dp[l] + 1)`。

- 初始化 `dp[i] = i - 1`；
- 以每个位置（及相邻位置）为中心向两侧扩展，得到回文区间 `[l, r]`；
- 用该回文更新 `dp[r+1]`。

这样只需 `O(n²)` 时间和 `O(n)` 空间。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) dp[i] = i - 1;

        for (int center = 0; center < n; center++) {
            // 奇数长度
            for (int l = center, r = center; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++) {
                dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
            }
            // 偶数长度
            for (int l = center, r = center + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++) {
                dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = [i - 1 for i in range(n + 1)]

        for center in range(n):
            l = r = center
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r + 1] = min(dp[r + 1], dp[l] + 1)
                l -= 1
                r += 1
            l, r = center, center + 1
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r + 1] = min(dp[r + 1], dp[l] + 1)
                l -= 1
                r += 1
        return dp[n]
```

```cpp [C++]
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n + 1, 0);
        for (int i = 0; i <= n; i++) dp[i] = i - 1;

        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r + 1] = min(dp[r + 1], dp[l] + 1);
            for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r + 1] = min(dp[r + 1], dp[l] + 1);
        }
        return dp[n];
    }
};
```

```go [Go]
func minCut(s string) int {
    n := len(s)
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = i - 1
    }

    for c := 0; c < n; c++ {
        for l, r := c, c; l >= 0 && r < n && s[l] == s[r]; l, r = l-1, r+1 {
            if dp[l]+1 < dp[r+1] {
                dp[r+1] = dp[l] + 1
            }
        }
        for l, r := c, c+1; l >= 0 && r < n && s[l] == s[r]; l, r = l-1, r+1 {
            if dp[l]+1 < dp[r+1] {
                dp[r+1] = dp[l] + 1
            }
        }
    }
    return dp[n]
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n + 1 }, (_, i) => i - 1);

    for (let c = 0; c < n; c++) {
        for (let l = c, r = c; l >= 0 && r < n && s[l] === s[r]; l--, r++) {
            dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
        }
        for (let l = c, r = c + 1; l >= 0 && r < n && s[l] === s[r]; l--, r++) {
            dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
        }
    }
    return dp[n];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int minCut(char* s) {
    int n = (int)strlen(s);
    int* dp = (int*)malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) dp[i] = i - 1;
    for (int c = 0; c < n; c++) {
        for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; l--, r++)
            if (dp[l] + 1 < dp[r + 1]) dp[r + 1] = dp[l] + 1;
        for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++)
            if (dp[l] + 1 < dp[r + 1]) dp[r + 1] = dp[l] + 1;
    }
    int ans = dp[n];
    free(dp);
    return ans;
}
```

```ts [TypeScript]
function minCut(s: string): number {
    const n = s.length;
    const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i - 1);

    for (let c = 0; c < n; c++) {
        for (let l = c, r = c; l >= 0 && r < n && s[l] === s[r]; l--, r++) {
            dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
        }
        for (let l = c, r = c + 1; l >= 0 && r < n && s[l] === s[r]; l--, r++) {
            dp[r + 1] = Math.min(dp[r + 1], dp[l] + 1);
        }
    }
    return dp[n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，中心扩展枚举所有回文区间。
- **空间复杂度**：`O(n)`，`dp` 一维数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二维 DP + 预处理回文 | `O(n²)` | `O(n²)` | 思路清晰易写 |
| 一维 DP + 中心扩展 | `O(n²)` | `O(n)` | 空间更优，推荐 |

在 `s.length <= 2000` 约束下，两种方法都能高效通过，方法二空间占用更小。
