# [LCR 095. 最长公共子序列](https://leetcode.cn/problems/qJnOS7/)



## 一、题目描述

给定两个字符串 `text1` 和 `text2`，返回这两个字符串的最长 **公共子序列** 的长度。如果不存在 **公共子序列** ，返回 `0` 。

一个字符串的 **子序列** 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，`"ace"` 是 `"abcde"` 的子序列，但 `"aec"` 不是 `"abcde"` 的子序列。

两个字符串的 **公共子序列** 是这两个字符串所共同拥有的子序列。



**示例 1：**

```
输入：text1 = "abcde", text2 = "ace"
输出：3
解释：最长公共子序列是 "ace" ，它的长度为 3 。
```

**示例 2：**

```
输入：text1 = "abc", text2 = "abc"
输出：3
```

**示例 3：**

```
输入：text1 = "abc", text2 = "def"
输出：0
```

**提示：**

- `1 <= text1.length, text2.length <= 1000`
- `text1` 和 `text2` 仅由小写英文字符组成



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

设 `dp[i][j]` 为 `text1[0..i-1]` 与 `text2[0..j-1]` 的最长公共子序列长度：

- 若 `text1[i-1] == text2[j-1]`：`dp[i][j] = dp[i-1][j-1] + 1`；
- 否则：`dp[i][j] = max(dp[i-1][j], dp[i][j-1])`。

时间 `O(mn)`，空间 `O(mn)`（可滚动到 `O(n)`）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[] dp = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            int prev = 0;
            for (int j = 1; j <= n; j++) {
                int tmp = dp[j];
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }
                prev = tmp;
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [0] * (n + 1)
        for i in range(1, m + 1):
            prev = 0
            for j in range(1, n + 1):
                tmp = dp[j]
                if text1[i - 1] == text2[j - 1]:
                    dp[j] = prev + 1
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                prev = tmp
        return dp[n]
```

```cpp [C++]
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= m; i++) {
            int prev = 0;
            for (int j = 1; j <= n; j++) {
                int tmp = dp[j];
                if (text1[i - 1] == text2[j - 1]) dp[j] = prev + 1;
                else dp[j] = max(dp[j], dp[j - 1]);
                prev = tmp;
            }
        }
        return dp[n];
    }
};
```

```go [Go]
func longestCommonSubsequence(text1 string, text2 string) int {
    m, n := len(text1), len(text2)
    dp := make([]int, n+1)
    for i := 1; i <= m; i++ {
        prev := 0
        for j := 1; j <= n; j++ {
            tmp := dp[j]
            if text1[i-1] == text2[j-1] {
                dp[j] = prev + 1
            } else if dp[j-1] > dp[j] {
                dp[j] = dp[j-1]
            }
            prev = tmp
        }
    }
    return dp[n]
}
```

```js [JavaScript]
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        let prev = 0;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            if (text1[i - 1] === text2[j - 1]) dp[j] = prev + 1;
            else dp[j] = Math.max(dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int longestCommonSubsequence(char* text1, char* text2) {
    int m = (int)strlen(text1), n = (int)strlen(text2);
    int* dp = (int*)calloc(n + 1, sizeof(int));
    for (int i = 1; i <= m; i++) {
        int prev = 0;
        for (int j = 1; j <= n; j++) {
            int tmp = dp[j];
            if (text1[i - 1] == text2[j - 1]) dp[j] = prev + 1;
            else dp[j] = dp[j] > dp[j - 1] ? dp[j] : dp[j - 1];
            prev = tmp;
        }
    }
    int res = dp[n];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length, n = text2.length;
    const dp: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        let prev = 0;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            if (text1[i - 1] === text2[j - 1]) dp[j] = prev + 1;
            else dp[j] = Math.max(dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`。
- **空间复杂度**：`O(n)`，滚动数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(mn)` | `O(n)` | 标准解法 |

LCS 是经典二维 DP：末尾字符相等则 `+1` 沿对角线，不等则取「删除任一末尾字符」的较大者。滚动数组把空间从 `O(mn)` 压到 `O(n)`。

