# [LCR 094. 分割回文串 II](https://leetcode.cn/problems/omKAoA/)



## 一、题目描述

给定一个字符串 `s`，请将 `s` 分割成一些子串，使每个子串都是回文串。

返回符合要求的 **最少分割次数** 。



**示例 1：**

```
输入：s = "aab"
输出：1
解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
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

### 2.1 方法一：预处理回文 + 动态规划

1. **思路**

- 先预处理 `pal[i][j]` 表示 `s[i..j]` 是否为回文（区间 DP：`pal[i][j] = (s[i]==s[j]) && (j-i<=1 || pal[i+1][j-1])`）；
- 设 `dp[i]` 为「前缀 `s[0..i]` 的最少分割次数」：
  - 若 `s[0..i]` 本身是回文，`dp[i] = 0`；
  - 否则枚举最后一段 `s[j+1..i]` 为回文：`dp[i] = min(dp[j] + 1)`。

时间 `O(n²)`，空间 `O(n²)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minCut(String s) {
        int n = s.length();
        boolean[][] pal = new boolean[n][n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i <= 1 || pal[i + 1][j - 1])) {
                    pal[i][j] = true;
                }
            }
        }
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = i; // 每个字符一段时 i 次分割
        for (int i = 0; i < n; i++) {
            if (pal[0][i]) { dp[i] = 0; continue; }
            for (int j = 0; j < i; j++) {
                if (pal[j + 1][i]) dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
        return dp[n - 1];
    }
}
```

```python [Python]
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        pal = [[False] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i <= 1 or pal[i + 1][j - 1]):
                    pal[i][j] = True
        dp = [i for i in range(n)]
        for i in range(n):
            if pal[0][i]:
                dp[i] = 0
                continue
            for j in range(i):
                if pal[j + 1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)
        return dp[n - 1]
```

```cpp [C++]
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<vector<bool>> pal(n, vector<bool>(n, false));
        for (int i = n - 1; i >= 0; i--)
            for (int j = i; j < n; j++)
                if (s[i] == s[j] && (j - i <= 1 || pal[i + 1][j - 1]))
                    pal[i][j] = true;
        vector<int> dp(n);
        for (int i = 0; i < n; i++) {
            dp[i] = i;
            if (pal[0][i]) { dp[i] = 0; continue; }
            for (int j = 0; j < i; j++)
                if (pal[j + 1][i]) dp[i] = min(dp[i], dp[j] + 1);
        }
        return dp[n - 1];
    }
};
```

```go [Go]
func minCut(s string) int {
    n := len(s)
    pal := make([][]bool, n)
    for i := range pal {
        pal[i] = make([]bool, n)
    }
    for i := n - 1; i >= 0; i-- {
        for j := i; j < n; j++ {
            if s[i] == s[j] && (j-i <= 1 || pal[i+1][j-1]) {
                pal[i][j] = true
            }
        }
    }
    dp := make([]int, n)
    for i := 0; i < n; i++ {
        dp[i] = i
        if pal[0][i] {
            dp[i] = 0
            continue
        }
        for j := 0; j < i; j++ {
            if pal[j+1][i] && dp[j]+1 < dp[i] {
                dp[i] = dp[j] + 1
            }
        }
    }
    return dp[n-1]
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    const n = s.length;
    const pal = Array.from({ length: n }, () => new Array(n).fill(false));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (s[i] === s[j] && (j - i <= 1 || pal[i + 1][j - 1])) pal[i][j] = true;
        }
    }
    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = i;
        if (pal[0][i]) { dp[i] = 0; continue; }
        for (let j = 0; j < i; j++) {
            if (pal[j + 1][i]) dp[i] = Math.min(dp[i], dp[j] + 1);
        }
    }
    return dp[n - 1];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int minCut(char* s) {
    int n = (int)strlen(s);
    int** pal = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) pal[i] = (int*)calloc(n, sizeof(int));
    for (int i = n - 1; i >= 0; i--) {
        for (int j = i; j < n; j++) {
            if (s[i] == s[j] && (j - i <= 1 || pal[i + 1][j - 1])) pal[i][j] = 1;
        }
    }
    int* dp = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        dp[i] = i;
        if (pal[0][i]) { dp[i] = 0; continue; }
        for (int j = 0; j < i; j++) {
            if (pal[j + 1][i] && dp[j] + 1 < dp[i]) dp[i] = dp[j] + 1;
        }
    }
    int res = dp[n - 1];
    for (int i = 0; i < n; i++) free(pal[i]);
    free(pal);
    free(dp);
    return res;
}
```

```ts [TypeScript]
function minCut(s: string): number {
    const n = s.length;
    const pal: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (s[i] === s[j] && (j - i <= 1 || pal[i + 1][j - 1])) pal[i][j] = true;
        }
    }
    const dp: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = i;
        if (pal[0][i]) { dp[i] = 0; continue; }
        for (let j = 0; j < i; j++) {
            if (pal[j + 1][i]) dp[i] = Math.min(dp[i], dp[j] + 1);
        }
    }
    return dp[n - 1];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n²)`，回文预处理表。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回文预处理 + DP | `O(n²)` | `O(n²)` | 标准解法 |

分两步：先用区间 DP 预处理所有子串是否为回文；再用一维 DP 求「前缀最少分割次数」，枚举最后一段回文的起点转移。`dp[i] = min(dp[j] + 1)` 其中 `s[j+1..i]` 为回文。

