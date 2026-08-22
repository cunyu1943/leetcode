# [91. 解码方法](https://leetcode.cn/problems/decode-ways/)



## 一、题目描述

一条包含字母 `A-Z` 的消息通过以下映射进行了 **编码**：

```
'A' -> "1", 'B' -> "2", ..., 'Z' -> "26"
```

给定一个只包含数字的非空字符串 `s`，请计算并返回 **解码** 方法的 **总数**。

题目数据保证答案肯定是一个 **32 位** 的整数。



**示例 1：**

```
输入：s = "12"
输出：2
解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
```

**示例 2：**

```
输入：s = "226"
输出：3
解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6)。
```

**提示：**

-   `1 <= s.length <= 100`
-   `s` 只包含数字，并且可能包含前导零。



## 二、解答方法

### 2.1 方法一：动态规划（一维）


1. **思路**

`dp[i]` 表示前 `i` 个字符的解码数。若 `s[i-1]` 不为 `'0'` 则 `dp[i] += dp[i-1]`；若 `s[i-2..i-1]` 组成 `10~26` 则 `dp[i] += dp[i-2]`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) != '0') dp[i] += dp[i - 1];
            if (i >= 2) {
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
                if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def numDecodings(self, s: str) -> int:
        n = len(s)
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            if s[i - 1] != '0':
                dp[i] += dp[i - 1]
            if i >= 2:
                two = int(s[i - 2:i])
                if 10 <= two <= 26:
                    dp[i] += dp[i - 2]
        return dp[n]
```

```go [Go]
func numDecodings(s string) int {
    n := len(s)
    dp := make([]int, n+1)
    dp[0] = 1
    for i := 1; i <= n; i++ {
        if s[i-1] != '0' { dp[i] += dp[i-1] }
        if i >= 2 {
            two := (int(s[i-2]-'0'))*10 + int(s[i-1]-'0')
            if two >= 10 && two <= 26 { dp[i] += dp[i-2] }
        }
    }
    return dp[n]
}
```

```c [C]
int numDecodings(char* s) {
    int n = strlen(s);
    int* dp = (int*)calloc(n + 1, sizeof(int));
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        if (s[i-1] != '0') dp[i] += dp[i-1];
        if (i >= 2) {
            int two = (s[i-2]-'0')*10 + (s[i-1]-'0');
            if (two >= 10 && two <= 26) dp[i] += dp[i-2];
        }
    }
    int ans = dp[n];
    free(dp);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= n; i++) {
            if (s[i - 1] != '0') dp[i] += dp[i - 1];
            if (i >= 2) {
                int two = (s[i - 2] - '0') * 10 + (s[i - 1] - '0');
                if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
            }
        }
        return dp[n];
    }
};
```

```javascript [JavaScript]
var numDecodings = function(s) {
    const n = s.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        if (s[i - 1] !== '0') dp[i] += dp[i - 1];
        if (i >= 2) {
            const two = Number(s.substring(i - 2, i));
            if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
        }
    }
    return dp[n];
};
```

```typescript [TypeScript]
function numDecodings(s: string): number {
    const n = s.length;
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        if (s[i - 1] !== '0') dp[i] += dp[i - 1];
        if (i >= 2) {
            const two = Number(s.substring(i - 2, i));
            if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
        }
    }
    return dp[n];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(n)`，DP 数组。

### 2.2 方法二：动态规划（滚动变量）


1. **思路**

只保留 `dp[i-1]` 和 `dp[i-2]`，用两个变量滚动，将空间降到 `O(1)`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        int prev2 = 1, prev1 = s.charAt(0) == '0' ? 0 : 1;
        for (int i = 2; i <= n; i++) {
            int cur = 0;
            if (s.charAt(i - 1) != '0') cur += prev1;
            int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
            if (two >= 10 && two <= 26) cur += prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}
```

```python [Python]
class Solution:
    def numDecodings(self, s: str) -> int:
        prev2 = 1
        prev1 = 0 if s[0] == '0' else 1
        for i in range(2, len(s) + 1):
            cur = 0
            if s[i-1] != '0': cur += prev1
            two = int(s[i-2:i])
            if 10 <= two <= 26: cur += prev2
            prev2, prev1 = prev1, cur
        return prev1
```

```go [Go]
func numDecodings(s string) int {
    n := len(s)
    prev2, prev1 := 1, 0
    if s[0] != '0' { prev1 = 1 }
    for i := 2; i <= n; i++ {
        cur := 0
        if s[i-1] != '0' { cur += prev1 }
        two := (int(s[i-2]-'0'))*10 + int(s[i-1]-'0')
        if two >= 10 && two <= 26 { cur += prev2 }
        prev2, prev1 = prev1, cur
    }
    return prev1
}
```

```c [C]
int numDecodings(char* s) {
    int n = strlen(s);
    int prev2 = 1, prev1 = (s[0] == '0') ? 0 : 1;
    for (int i = 2; i <= n; i++) {
        int cur = 0;
        if (s[i-1] != '0') cur += prev1;
        int two = (s[i-2]-'0')*10 + (s[i-1]-'0');
        if (two >= 10 && two <= 26) cur += prev2;
        prev2 = prev1; prev1 = cur;
    }
    return prev1;
}
```

```cpp [C++]
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        int prev2 = 1, prev1 = (s[0] == '0') ? 0 : 1;
        for (int i = 2; i <= n; i++) {
            int cur = 0;
            if (s[i - 1] != '0') cur += prev1;
            int two = (s[i - 2] - '0') * 10 + (s[i - 1] - '0');
            if (two >= 10 && two <= 26) cur += prev2;
            prev2 = prev1; prev1 = cur;
        }
        return prev1;
    }
};
```

```javascript [JavaScript]
var numDecodings = function(s) {
    const n = s.length;
    let prev2 = 1, prev1 = s[0] === '0' ? 0 : 1;
    for (let i = 2; i <= n; i++) {
        let cur = 0;
        if (s[i - 1] !== '0') cur += prev1;
        const two = Number(s.substring(i - 2, i));
        if (two >= 10 && two <= 26) cur += prev2;
        prev2 = prev1; prev1 = cur;
    }
    return prev1;
};
```

```typescript [TypeScript]
function numDecodings(s: string): number {
    const n = s.length;
    let prev2 = 1, prev1 = s[0] === '0' ? 0 : 1;
    for (let i = 2; i <= n; i++) {
        let cur = 0;
        if (s[i - 1] !== '0') cur += prev1;
        const two = Number(s.substring(i - 2, i));
        if (two >= 10 && two <= 26) cur += prev2;
        prev2 = prev1; prev1 = cur;
    }
    return prev1;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，滚动变量。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（一维） | `O(n)` | `O(n)` | 直观易写 |
| 动态规划（滚动） | `O(n)` | `O(1)` | 空间最优，推荐 |
