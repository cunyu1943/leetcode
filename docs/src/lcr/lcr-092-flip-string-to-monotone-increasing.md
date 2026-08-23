# [LCR 092. 将字符串翻转到单调递增](https://leetcode.cn/problems/cyJERH/)



## 一、题目描述

如果一个由 `'0'` 和 `'1'` 组成的字符串，是以一些 `'0'`（可能没有 `'0'`）后面跟着一些 `'1'`（也可能没有 `'1'`）的形式组成的，那么该字符串是 **单调递增** 的。

我们给出一个由字符 `'0'` 和 `'1'` 组成的字符串 `s`，我们可以将任何 `'0'` 翻转为 `'1'` 或者将 `'1'` 翻转为 `'0'`。

返回使 `s` 单调递增的最小翻转次数。



**示例 1：**

```
输入：s = "00110"
输出：1
解释：我们翻转最后一位得到 00111。
```

**示例 2：**

```
输入：s = "010110"
输出：2
解释：我们翻转得到 011111，或者是 000111。
```

**示例 3：**

```
输入：s = "00011000"
输出：2
解释：我们翻转得到 00000000。
```

**提示：**

- `1 <= s.length <= 10⁵`
- `s` 中只包含字符 `'0'` 和 `'1'`



## 二、解答方法

### 2.1 方法一：前缀和（枚举分界点）

1. **思路**

最终单调递增串形如 `0...0 1...1`。枚举分界点 `i`（前 `i` 个字符全为 0，后 `n-i` 个全为 1）：

- 前 `i` 个字符中需要把 `1` 翻成 `0`，数量 = 前缀中 1 的个数；
- 后 `n-i` 个字符中需要把 `0` 翻成 `1`，数量 = 后缀中 0 的个数；
- 总翻转 = 二者之和，取最小值。

用前缀 1 计数 `pre[i]` 快速计算。时间 `O(n)`，空间 `O(n)`（或滚动 `O(1)`）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minFlipsMonoIncr(String s) {
        int n = s.length();
        int[] pre = new int[n + 1]; // pre[i] = 前 i 个字符中 '1' 的个数
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + (s.charAt(i) == '1' ? 1 : 0);
        }
        int ans = n;
        for (int i = 0; i <= n; i++) {
            // 前 i 个全为 0：翻转其中的 1；后 n-i 个全为 1：翻转其中的 0
            int flips = pre[i] + (n - i - (pre[n] - pre[i]));
            ans = Math.min(ans, flips);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        n = len(s)
        pre = [0] * (n + 1)
        for i, ch in enumerate(s):
            pre[i + 1] = pre[i] + (1 if ch == '1' else 0)
        ans = n
        for i in range(n + 1):
            flips = pre[i] + (n - i - (pre[n] - pre[i]))
            ans = min(ans, flips)
        return ans
```

```cpp [C++]
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int n = s.size();
        vector<int> pre(n + 1, 0);
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + (s[i] == '1');
        int ans = n;
        for (int i = 0; i <= n; i++)
            ans = min(ans, pre[i] + (n - i - (pre[n] - pre[i])));
        return ans;
    }
};
```

```go [Go]
func minFlipsMonoIncr(s string) int {
    n := len(s)
    pre := make([]int, n+1)
    for i := 0; i < n; i++ {
        pre[i+1] = pre[i]
        if s[i] == '1' {
            pre[i+1]++
        }
    }
    ans := n
    for i := 0; i <= n; i++ {
        flips := pre[i] + (n - i - (pre[n] - pre[i]))
        if flips < ans {
            ans = flips
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function (s) {
    const n = s.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + (s[i] === '1' ? 1 : 0);
    let ans = n;
    for (let i = 0; i <= n; i++) {
        ans = Math.min(ans, pre[i] + (n - i - (pre[n] - pre[i])));
    }
    return ans;
};
```

```c [C]
#include <string.h>

int minFlipsMonoIncr(char* s) {
    int n = (int)strlen(s);
    int* pre = (int*)malloc((n + 1) * sizeof(int));
    pre[0] = 0;
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + (s[i] == '1');
    int ans = n;
    for (int i = 0; i <= n; i++) {
        int flips = pre[i] + (n - i - (pre[n] - pre[i]));
        if (flips < ans) ans = flips;
    }
    free(pre);
    return ans;
}
```

```ts [TypeScript]
function minFlipsMonoIncr(s: string): number {
    const n = s.length;
    const pre: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + (s[i] === '1' ? 1 : 0);
    let ans = n;
    for (let i = 0; i <= n; i++) {
        ans = Math.min(ans, pre[i] + (n - i - (pre[n] - pre[i])));
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（前缀数组）。

### 2.2 方法二：动态规划（滚动 O(1)）

1. **思路**

遍历时维护 `dp0`（当前字符变为 `0` 的最小翻转）与 `dp1`（当前字符变为 `1` 的最小翻转）：

- 变为 0：`dp0' = dp0 + (s[i] == '1')`；
- 变为 1：`dp1' = min(dp0, dp1) + (s[i] == '0')`。

答案为最终的 `min(dp0, dp1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minFlipsMonoIncr(String s) {
        int dp0 = 0, dp1 = 0;
        for (char c : s.toCharArray()) {
            int ndp0 = dp0 + (c == '1' ? 1 : 0);
            int ndp1 = Math.min(dp0, dp1) + (c == '0' ? 1 : 0);
            dp0 = ndp0;
            dp1 = ndp1;
        }
        return Math.min(dp0, dp1);
    }
}
```

```python [Python]
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        dp0 = dp1 = 0
        for ch in s:
            ndp0 = dp0 + (1 if ch == '1' else 0)
            ndp1 = min(dp0, dp1) + (1 if ch == '0' else 0)
            dp0, dp1 = ndp0, ndp1
        return min(dp0, dp1)
```

```cpp [C++]
class Solution {
public:
    int minFlipsMonoIncr(string s) {
        int dp0 = 0, dp1 = 0;
        for (char c : s) {
            int ndp0 = dp0 + (c == '1');
            int ndp1 = min(dp0, dp1) + (c == '0');
            dp0 = ndp0;
            dp1 = ndp1;
        }
        return min(dp0, dp1);
    }
};
```

```go [Go]
func minFlipsMonoIncr(s string) int {
    dp0, dp1 := 0, 0
    for i := 0; i < len(s); i++ {
        ndp0 := dp0
        if s[i] == '1' {
            ndp0++
        }
        ndp1 := dp1
        if dp0 < dp1 {
            ndp1 = dp0
        }
        if s[i] == '0' {
            ndp1++
        }
        dp0, dp1 = ndp0, ndp1
    }
    if dp0 < dp1 {
        return dp0
    }
    return dp1
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function (s) {
    let dp0 = 0, dp1 = 0;
    for (const c of s) {
        const ndp0 = dp0 + (c === '1' ? 1 : 0);
        const ndp1 = Math.min(dp0, dp1) + (c === '0' ? 1 : 0);
        dp0 = ndp0;
        dp1 = ndp1;
    }
    return Math.min(dp0, dp1);
};
```

```c [C]
#include <string.h>

int minFlipsMonoIncr(char* s) {
    int dp0 = 0, dp1 = 0;
    for (int i = 0; s[i]; i++) {
        int ndp0 = dp0 + (s[i] == '1');
        int ndp1 = (dp0 < dp1 ? dp0 : dp1) + (s[i] == '0');
        dp0 = ndp0;
        dp1 = ndp1;
    }
    return dp0 < dp1 ? dp0 : dp1;
}
```

```ts [TypeScript]
function minFlipsMonoIncr(s: string): number {
    let dp0 = 0, dp1 = 0;
    for (const c of s) {
        const ndp0 = dp0 + (c === '1' ? 1 : 0);
        const ndp1 = Math.min(dp0, dp1) + (c === '0' ? 1 : 0);
        dp0 = ndp0;
        dp1 = ndp1;
    }
    return Math.min(dp0, dp1);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前缀和枚举分界点 | `O(n)` | `O(n)` | 直观 |
| DP 滚动 | `O(n)` | `O(1)` | 更省空间，推荐 |

两种方法本质相同：枚举「全 0 | 全 1」的分界位置，计算两侧需要的翻转数。DP 版本用「当前位变 0/1」两个状态线性递推，常数空间完成。

