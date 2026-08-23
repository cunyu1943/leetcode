# [LCR 020. 回文子串](https://leetcode.cn/problems/a7VOh2/)



## 一、题目描述

给定一个字符串 `s` ，请你统计并返回这个字符串中 **回文子串** 的数目。

回文字符串是正着读和倒过来读一样的字符串。子字符串是字符串中的由连续字符组成的一个序列。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。



**示例 1：**

```
输入：s = "abc"
输出：3
解释：三个回文子串: "a", "b", "c"
```

**示例 2：**

```
输入：s = "aaa"
输出：6
解释：六个回文子串: "a", "a", "a", "aa", "aa", "aaa"
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 由小写英文字母组成



## 二、解答方法

### 2.1 方法一：中心扩展法

1. **思路**

回文中心可能是「单个字符」（奇数长度）或「相邻两个相同字符」（偶数长度）。枚举每个中心，向两侧扩展，每成功扩展一次就计数 +1。

- 共 `n` 个奇数中心、`n-1` 个偶数中心；
- 扩展时若两端相等则 `cnt++` 并继续，否则停止。

时间 `O(n²)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int countSubstrings(String s) {
        int n = s.length(), cnt = 0;
        for (int c = 0; c < n; c++) {
            cnt += expand(s, c, c);
            cnt += expand(s, c, c + 1);
        }
        return cnt;
    }
    private int expand(String s, int l, int r) {
        int cnt = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            cnt++; l--; r++;
        }
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def countSubstrings(self, s: str) -> int:
        n = len(s)
        cnt = 0
        def expand(l: int, r: int) -> int:
            c = 0
            while l >= 0 and r < n and s[l] == s[r]:
                c += 1
                l -= 1
                r += 1
            return c
        for i in range(n):
            cnt += expand(i, i)
            cnt += expand(i, i + 1)
        return cnt
```

```cpp [C++]
class Solution {
public:
    int countSubstrings(string s) {
        int n = s.size(), cnt = 0;
        auto expand = [&](int l, int r) -> int {
            int c = 0;
            while (l >= 0 && r < n && s[l] == s[r]) { c++; l--; r++; }
            return c;
        };
        for (int c = 0; c < n; c++) {
            cnt += expand(c, c);
            cnt += expand(c, c + 1);
        }
        return cnt;
    }
};
```

```go [Go]
func countSubstrings(s string) int {
    n := len(s)
    cnt := 0
    expand := func(l, r int) int {
        c := 0
        for l >= 0 && r < n && s[l] == s[r] {
            c++
            l--
            r++
        }
        return c
    }
    for i := 0; i < n; i++ {
        cnt += expand(i, i)
        cnt += expand(i, i+1)
    }
    return cnt
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    const n = s.length;
    let cnt = 0;
    const expand = (l, r) => {
        let c = 0;
        while (l >= 0 && r < n && s[l] === s[r]) { c++; l--; r++; }
        return c;
    };
    for (let i = 0; i < n; i++) {
        cnt += expand(i, i);
        cnt += expand(i, i + 1);
    }
    return cnt;
};
```

```c [C]
#include <string.h>

static int expand(char* s, int n, int l, int r) {
    int c = 0;
    while (l >= 0 && r < n && s[l] == s[r]) { c++; l--; r++; }
    return c;
}

int countSubstrings(char* s) {
    int n = (int)strlen(s), cnt = 0;
    for (int c = 0; c < n; c++) {
        cnt += expand(s, n, c, c);
        cnt += expand(s, n, c, c + 1);
    }
    return cnt;
}
```

```ts [TypeScript]
function countSubstrings(s: string): number {
    const n = s.length;
    let cnt = 0;
    const expand = (l: number, r: number): number => {
        let c = 0;
        while (l >= 0 && r < n && s[l] === s[r]) { c++; l--; r++; }
        return c;
    };
    for (let i = 0; i < n; i++) {
        cnt += expand(i, i);
        cnt += expand(i, i + 1);
    }
    return cnt;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：动态规划

1. **思路**

设 `dp[l][r]` 表示子串 `s[l..r]` 是否回文。状态转移：

- `r - l <= 1` 且 `s[l] == s[r]` 时为真（单字符或两个相同字符）；
- 否则 `dp[l][r] = (s[l] == s[r]) && dp[l+1][r-1]`。

从短到长递推，统计为真的个数。时间 `O(n²)`，空间 `O(n²)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int countSubstrings(String s) {
        int n = s.length(), cnt = 0;
        boolean[][] dp = new boolean[n][n];
        for (int len = 1; len <= n; len++) {
            for (int l = 0; l + len - 1 < n; l++) {
                int r = l + len - 1;
                if (s.charAt(l) == s.charAt(r) && (len <= 2 || dp[l + 1][r - 1])) {
                    dp[l][r] = true;
                    cnt++;
                }
            }
        }
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def countSubstrings(self, s: str) -> int:
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        cnt = 0
        for length in range(1, n + 1):
            for l in range(n - length + 1):
                r = l + length - 1
                if s[l] == s[r] and (length <= 2 or dp[l + 1][r - 1]):
                    dp[l][r] = True
                    cnt += 1
        return cnt
```

```cpp [C++]
class Solution {
public:
    int countSubstrings(string s) {
        int n = s.size(), cnt = 0;
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        for (int len = 1; len <= n; len++) {
            for (int l = 0; l + len - 1 < n; l++) {
                int r = l + len - 1;
                if (s[l] == s[r] && (len <= 2 || dp[l + 1][r - 1])) {
                    dp[l][r] = true;
                    cnt++;
                }
            }
        }
        return cnt;
    }
};
```

```go [Go]
func countSubstrings(s string) int {
    n := len(s)
    dp := make([][]bool, n)
    for i := range dp {
        dp[i] = make([]bool, n)
    }
    cnt := 0
    for length := 1; length <= n; length++ {
        for l := 0; l+length-1 < n; l++ {
            r := l + length - 1
            if (s[l] == s[r]) && (length <= 2 || dp[l+1][r-1]) {
                dp[l][r] = true
                cnt++
            }
        }
    }
    return cnt
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(false));
    let cnt = 0;
    for (let len = 1; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            const r = l + len - 1;
            if (s[l] === s[r] && (len <= 2 || dp[l + 1][r - 1])) {
                dp[l][r] = true;
                cnt++;
            }
        }
    }
    return cnt;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int countSubstrings(char* s) {
    int n = (int)strlen(s), cnt = 0;
    int** dp = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) dp[i] = (int*)calloc(n, sizeof(int));
    for (int len = 1; len <= n; len++) {
        for (int l = 0; l + len - 1 < n; l++) {
            int r = l + len - 1;
            if (s[l] == s[r] && (len <= 2 || dp[l + 1][r - 1])) {
                dp[l][r] = 1;
                cnt++;
            }
        }
    }
    for (int i = 0; i < n; i++) free(dp[i]);
    free(dp);
    return cnt;
}
```

```ts [TypeScript]
function countSubstrings(s: string): number {
    const n = s.length;
    const dp: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
    let cnt = 0;
    for (let len = 1; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            const r = l + len - 1;
            if (s[l] === s[r] && (len <= 2 || dp[l + 1][r - 1])) {
                dp[l][r] = true;
                cnt++;
            }
        }
    }
    return cnt;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n²)`（可优化为 `O(n)` 滚动数组）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 中心扩展 | `O(n²)` | `O(1)` | 最优，实现简洁 |
| 动态规划 | `O(n²)` | `O(n²)` | 思路直观 |

中心扩展法枚举每个可能的回文中心（奇偶），向两侧延展计数，是统计回文子串最常用的写法。

