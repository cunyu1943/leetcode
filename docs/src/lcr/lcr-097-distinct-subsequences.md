# [LCR 097. 不同的子序列](https://leetcode.cn/problems/21dk04/)



## 一、题目描述

给定一个字符串 `s` 和一个字符串 `t` ，计算在 `s` 的子序列中 `t` 出现的个数。

字符串的一个 **子序列** 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，`"ACE"` 是 `"ABCDE"` 的一个子序列，而 `"AEC"` 不是）。

题目数据保证答案符合 32 位带符号整数范围。



**示例 1：**

```
输入：s = "rabbbit", t = "rabbit"
输出：3
解释：如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
```

**示例 2：**

```
输入：s = "babgbag", t = "bag"
输出：5
```

**提示：**

- `0 <= s.length, t.length <= 1000`
- `s` 和 `t` 由英文字母组成



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

设 `dp[i][j]` 为「`s[0..i-1]` 中 `t[0..j-1]` 作为子序列出现的次数」：

- 若 `s[i-1] == t[j-1]`：`dp[i][j] = dp[i-1][j-1] + dp[i-1][j]`（匹配该字符 or 不匹配）；
- 否则：`dp[i][j] = dp[i-1][j]`（只能不用 s 的该字符）。

边界：`dp[i][0] = 1`（空串是任何串的子序列）。用滚动数组优化空间。时间 `O(mn)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        if (m < n) return 0;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= m; i++) {
            // 从后往前更新，避免覆盖 dp[j-1]
            for (int j = n; j >= 1; j--) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1];
                }
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

```cpp [C++]
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        if (m < n) return 0;
        vector<unsigned long long> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= m; i++)
            for (int j = n; j >= 1; j--)
                if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];
        return (int)dp[n];
    }
};
```

```go [Go]
func numDistinct(s string, t string) int {
    m, n := len(s), len(t)
    if m < n {
        return 0
    }
    dp := make([]int, n+1)
    dp[0] = 1
    for i := 1; i <= m; i++ {
        for j := n; j >= 1; j-- {
            if s[i-1] == t[j-1] {
                dp[j] += dp[j-1]
            }
        }
    }
    return dp[n]
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    const m = s.length, n = t.length;
    if (m < n) return 0;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];
        }
    }
    return dp[n];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int numDistinct(char* s, char* t) {
    int m = (int)strlen(s), n = (int)strlen(t);
    if (m < n) return 0;
    unsigned long long* dp = (unsigned long long*)calloc(n + 1, sizeof(unsigned long long));
    dp[0] = 1;
    for (int i = 1; i <= m; i++)
        for (int j = n; j >= 1; j--)
            if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];
    int res = (int)dp[n];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function numDistinct(s: string, t: string): number {
    const m = s.length, n = t.length;
    if (m < n) return 0;
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];
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

转移本质是「是否用 s 的当前字符去匹配 t 的当前字符」：匹配时加 `dp[j-1]`（用）与 `dp[j]`（不用）。滚动数组需从后往前更新，避免覆盖 `dp[j-1]`。

