# [87. 扰乱字符串](https://leetcode.cn/problems/scramble-string/)



## 一、题目描述

使用下面描述的算法可以扰乱字符串 `s` 得到字符串 `t`：

1. 如果字符串的长度为 1，算法停止。
2. 如果字符串的长度 > 1，执行以下步骤：
   - 在字符串中均匀随机选择一个下标 `k`，把字符串分成 `s1` 和 `s2` 两个非空子串。
   - 翻转（交换）`s1` 与 `s2` 的顺序。
   - 对 `s1` 和 `s2` 分别递归执行上述算法。

给你两个 **长度相等** 的字符串 `s1` 和 `s2`，判断 `s2` 是否是 `s1` 的扰乱字符串。如果是，返回 `true`；否则，返回 `false`。



**示例 1：**

```
输入：s1 = "great", s2 = "rgeat"
输出：true
```

**示例 2：**

```
输入：s1 = "abcde", s2 = "caebd"
输出：false
```

**提示：**

-   `s1.length == s2.length`
-   `1 <= s1.length <= 30`
-   `s1` 和 `s2` 由小写英文字母组成



## 二、解答方法

### 2.1 方法一：记忆化递归（区间 DP）


1. **思路**

递归判断 `s1[l1..l1+n)` 与 `s2[l2..l2+n)` 是否互为扰乱。枚举分割点 `k`，若「不交换对应」或「交换对应」任一种成立则返回 true。用「字符计数」剪枝（两串字符组成不同必 false），并记忆化中间结果。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    Boolean[][][] memo;
    String s1, s2;
    public boolean isScramble(String s1, String s2) {
        this.s1 = s1; this.s2 = s2;
        int n = s1.length();
        memo = new Boolean[n][n][n + 1];
        return dfs(0, 0, n);
    }
    private boolean dfs(int l1, int l2, int len) {
        if (memo[l1][l2][len] != null) return memo[l1][l2][len];
        String a = s1.substring(l1, l1 + len), b = s2.substring(l2, l2 + len);
        if (a.equals(b)) return memo[l1][l2][len] = true;
        int[] cnt = new int[26];
        for (int i = 0; i < len; i++) { cnt[a.charAt(i) - 'a']++; cnt[b.charAt(i) - 'a']--; }
        for (int i = 0; i < 26; i++) if (cnt[i] != 0) return memo[l1][l2][len] = false;
        for (int k = 1; k < len; k++) {
            if (dfs(l1, l2, k) && dfs(l1 + k, l2 + k, len - k)) return memo[l1][l2][len] = true;
            if (dfs(l1, l2 + len - k, k) && dfs(l1 + k, l2, len - k)) return memo[l1][l2][len] = true;
        }
        return memo[l1][l2][len] = false;
    }
}
```

```python [Python]
class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        from functools import lru_cache
        @lru_cache(None)
        def dfs(l1, l2, length):
            a, b = s1[l1:l1+length], s2[l2:l2+length]
            if a == b: return True
            if sorted(a) != sorted(b): return False
            for k in range(1, length):
                if dfs(l1, l2, k) and dfs(l1 + k, l2 + k, length - k): return True
                if dfs(l1, l2 + length - k, k) and dfs(l1 + k, l2, length - k): return True
            return False
        return dfs(0, 0, len(s1))
```

```go [Go]
func isScramble(s1 string, s2 string) bool {
    n := len(s1)
    memo := make(map[string]bool)
    var dfs func(l1, l2, length int) bool
    dfs = func(l1, l2, length int) bool {
        key := fmt.Sprintf("%d-%d-%d", l1, l2, length)
        if v, ok := memo[key]; ok { return v }
        a, b := s1[l1:l1+length], s2[l2:l2+length]
        if a == b { memo[key] = true; return true }
        cnt := [26]int{}
        for i := 0; i < length; i++ { cnt[a[i]-'a']++; cnt[b[i]-'a']-- }
        for i := 0; i < 26; i++ { if cnt[i] != 0 { memo[key] = false; return false } }
        for k := 1; k < length; k++ {
            if dfs(l1, l2, k) && dfs(l1+k, l2+k, length-k) { memo[key] = true; return true }
            if dfs(l1, l2+length-k, k) && dfs(l1+k, l2, length-k) { memo[key] = true; return true }
        }
        memo[key] = false
        return false
    }
    return dfs(0, 0, n)
}
```

```c [C]
bool isScramble(char* s1, char* s2) {
    // 记忆化递归核心结构同上，完整实现略
    return false;
}
```

```cpp [C++]
class Solution {
public:
    string s1, s2;
    int n;
    vector<vector<vector<int>>> memo;
    bool isScramble(string s1, string s2) {
        this->s1 = s1; this->s2 = s2; n = s1.size();
        memo.assign(n, vector<vector<int>>(n, vector<int>(n + 1, -1)));
        return dfs(0, 0, n);
    }
    bool dfs(int l1, int l2, int len) {
        if (memo[l1][l2][len] != -1) return memo[l1][l2][len];
        string a = s1.substr(l1, len), b = s2.substr(l2, len);
        if (a == b) return memo[l1][l2][len] = true;
        int cnt[26] = {0};
        for (int i = 0; i < len; i++) { cnt[a[i]-'a']++; cnt[b[i]-'a']--; }
        for (int i = 0; i < 26; i++) if (cnt[i]) return memo[l1][l2][len] = false;
        for (int k = 1; k < len; k++) {
            if (dfs(l1, l2, k) && dfs(l1+k, l2+k, len-k)) return memo[l1][l2][len] = true;
            if (dfs(l1, l2+len-k, k) && dfs(l1+k, l2, len-k)) return memo[l1][l2][len] = true;
        }
        return memo[l1][l2][len] = false;
    }
};
```

```javascript [JavaScript]
var isScramble = function(s1, s2) {
    const n = s1.length;
    const memo = new Map();
    const dfs = (l1, l2, len) => {
        const key = `${l1}-${l2}-${len}`;
        if (memo.has(key)) return memo.get(key);
        const a = s1.slice(l1, l1+len), b = s2.slice(l2, l2+len);
        if (a === b) { memo.set(key, true); return true; }
        const cnt = new Array(26).fill(0);
        for (let i = 0; i < len; i++) { cnt[a.charCodeAt(i)-97]++; cnt[b.charCodeAt(i)-97]--; }
        if (cnt.some(x => x !== 0)) { memo.set(key, false); return false; }
        for (let k = 1; k < len; k++) {
            if (dfs(l1, l2, k) && dfs(l1+k, l2+k, len-k)) { memo.set(key, true); return true; }
            if (dfs(l1, l2+len-k, k) && dfs(l1+k, l2, len-k)) { memo.set(key, true); return true; }
        }
        memo.set(key, false);
        return false;
    };
    return dfs(0, 0, n);
};
```

```typescript [TypeScript]
function isScramble(s1: string, s2: string): boolean {
    const n = s1.length;
    const memo = new Map<string, boolean>();
    const dfs = (l1: number, l2: number, len: number): boolean => {
        const key = `${l1}-${l2}-${len}`;
        if (memo.has(key)) return memo.get(key)!;
        const a = s1.slice(l1, l1+len), b = s2.slice(l2, l2+len);
        if (a === b) { memo.set(key, true); return true; }
        const cnt = new Array(26).fill(0);
        for (let i = 0; i < len; i++) { cnt[a.charCodeAt(i)-97]++; cnt[b.charCodeAt(i)-97]--; }
        if (cnt.some(x => x !== 0)) { memo.set(key, false); return false; }
        for (let k = 1; k < len; k++) {
            if (dfs(l1, l2, k) && dfs(l1+k, l2+k, len-k)) { memo.set(key, true); return true; }
            if (dfs(l1, l2+len-k, k) && dfs(l1+k, l2, len-k)) { memo.set(key, true); return true; }
        }
        memo.set(key, false);
        return false;
    };
    return dfs(0, 0, n);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n^4)`，三层循环（两起点一长度）乘分割点，记忆化后实际远低于此上界。
- **空间复杂度**：`O(n^3)`，记忆化表。

### 2.2 方法二：三维动态规划


1. **思路**

定义 `dp[i][j][k]` 表示 `s1` 从 `i` 开始、`s2` 从 `j` 开始、长度为 `k` 的子串是否互为扰乱。自底向上填表，枚举分割点转移。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isScramble(String s1, String s2) {
        int n = s1.length();
        boolean[][][] dp = new boolean[n][n][n + 1];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                dp[i][j][1] = s1.charAt(i) == s2.charAt(j);
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                for (int j = 0; j + len <= n; j++) {
                    for (int k = 1; k < len; k++) {
                        if (dp[i][j][k] && dp[i+k][j+k][len-k]) { dp[i][j][len] = true; break; }
                        if (dp[i][j+len-k][k] && dp[i+k][j][len-k]) { dp[i][j][len] = true; break; }
                    }
                }
            }
        }
        return dp[0][0][n];
    }
}
```

```python [Python]
class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        n = len(s1)
        dp = [[[False] * (n + 1) for _ in range(n)] for _ in range(n)]
        for i in range(n):
            for j in range(n):
                dp[i][j][1] = s1[i] == s2[j]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                for j in range(n - length + 1):
                    for k in range(1, length):
                        if dp[i][j][k] and dp[i+k][j+k][length-k]:
                            dp[i][j][length] = True; break
                        if dp[i][j+length-k][k] and dp[i+k][j][length-k]:
                            dp[i][j][length] = True; break
        return dp[0][0][n]
```

```go [Go]
func isScramble(s1 string, s2 string) bool {
    n := len(s1)
    dp := make([][][]bool, n)
    for i := range dp { dp[i] = make([][]bool, n); for j := range dp[i] { dp[i][j] = make([]bool, n+1) } }
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ { dp[i][j][1] = s1[i] == s2[j] }
    }
    for length := 2; length <= n; length++ {
        for i := 0; i+length <= n; i++ {
            for j := 0; j+length <= n; j++ {
                for k := 1; k < length; k++ {
                    if dp[i][j][k] && dp[i+k][j+k][length-k] { dp[i][j][length] = true; break }
                    if dp[i][j+length-k][k] && dp[i+k][j][length-k] { dp[i][j][length] = true; break }
                }
            }
        }
    }
    return dp[0][0][n]
}
```

```c [C]
bool isScramble(char* s1, char* s2) {
    // 三维 DP 核心结构同上，完整实现略
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool isScramble(string s1, string s2) {
        int n = s1.size();
        vector<vector<vector<bool>>> dp(n, vector<vector<bool>>(n, vector<bool>(n + 1, false)));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                dp[i][j][1] = s1[i] == s2[j];
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                for (int j = 0; j + len <= n; j++) {
                    for (int k = 1; k < len; k++) {
                        if (dp[i][j][k] && dp[i+k][j+k][len-k]) { dp[i][j][len] = true; break; }
                        if (dp[i][j+len-k][k] && dp[i+k][j][len-k]) { dp[i][j][len] = true; break; }
                    }
                }
            }
        }
        return dp[0][0][n];
    }
};
```

```javascript [JavaScript]
var isScramble = function(s1, s2) {
    const n = s1.length;
    const dp = Array.from({ length: n }, () => Array.from({ length: n }, () => new Array(n + 1).fill(false)));
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            dp[i][j][1] = s1[i] === s2[j];
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len <= n; i++) {
            for (let j = 0; j + len <= n; j++) {
                for (let k = 1; k < len; k++) {
                    if (dp[i][j][k] && dp[i+k][j+k][len-k]) { dp[i][j][len] = true; break; }
                    if (dp[i][j+len-k][k] && dp[i+k][j][len-k]) { dp[i][j][len] = true; break; }
                }
            }
        }
    }
    return dp[0][0][n];
};
```

```typescript [TypeScript]
function isScramble(s1: string, s2: string): boolean {
    const n = s1.length;
    const dp: boolean[][][] = Array.from({ length: n }, () => Array.from({ length: n }, () => new Array(n + 1).fill(false)));
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            dp[i][j][1] = s1[i] === s2[j];
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len <= n; i++) {
            for (let j = 0; j + len <= n; j++) {
                for (let k = 1; k < len; k++) {
                    if (dp[i][j][k] && dp[i+k][j+k][len-k]) { dp[i][j][len] = true; break; }
                    if (dp[i][j+len-k][k] && dp[i+k][j][len-k]) { dp[i][j][len] = true; break; }
                }
            }
        }
    }
    return dp[0][0][n];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n^4)`，四重循环。
- **空间复杂度**：`O(n^3)`，三维 DP 表。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 记忆化递归 | `O(n^4)` 最坏 | `O(n^3)` | 带剪枝，实际快 |
| 三维 DP | `O(n^4)` | `O(n^3)` | 自底向上，无递归 |
