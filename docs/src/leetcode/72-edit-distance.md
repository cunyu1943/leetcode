# [72. 编辑距离](https://leetcode.cn/problems/edit-distance/)



## 一、题目描述

给你两个单词 `word1` 和 `word2`，请返回将 `word1` 转换成 `word2` 所使用的最少操作数。

你可以对一个单词进行如下三种操作：插入一个字符、删除一个字符、替换一个字符。



**示例 1：**

```
输入：word1 = "horse", word2 = "ros"
输出：3
解释：horse -> rorse (将 'h' 替换为 'r') -> rose (删除 'r') -> ros (删除 'e')。
```

**示例 2：**

```
输入：word1 = "intention", word2 = "execution"
输出：5
```

**提示：**

-   `0 <= word1.length, word2.length <= 500`
-   `word1` 和 `word2` 由小写英文字母组成



## 二、解答方法

### 2.1 方法一：动态规划


1. **思路**

`dp[i][j]` 表示 `word1` 前 `i` 个字符到 `word2` 前 `j` 个字符的最小编辑距离。若 `word1[i-1]==word2[j-1]` 则 `dp[i][j]=dp[i-1][j-1]`，否则取插入/删除/替换的最小值加一。可压缩为一维。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[] dp = new int[n + 1];
        for (int j = 0; j <= n; j++) dp[j] = j;
        for (int i = 1; i <= m; i++) {
            int prev = dp[0];
            dp[0] = i;
            for (int j = 1; j <= n; j++) {
                int tmp = dp[j];
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[j] = prev;
                else dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j - 1]));
                prev = tmp;
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = list(range(n + 1))
        for i in range(1, m + 1):
            prev = dp[0]
            dp[0] = i
            for j in range(1, n + 1):
                tmp = dp[j]
                if word1[i - 1] == word2[j - 1]:
                    dp[j] = prev
                else:
                    dp[j] = 1 + min(prev, dp[j], dp[j - 1])
                prev = tmp
        return dp[n]
```

```go [Go]
func minDistance(word1 string, word2 string) int {
    m, n := len(word1), len(word2)
    dp := make([]int, n+1)
    for j := 0; j <= n; j++ { dp[j] = j }
    for i := 1; i <= m; i++ {
        prev := dp[0]
        dp[0] = i
        for j := 1; j <= n; j++ {
            tmp := dp[j]
            if word1[i-1] == word2[j-1] { dp[j] = prev } else {
                if prev < dp[j] { if prev < dp[j-1] { dp[j] = prev + 1 } else { dp[j] = dp[j-1] + 1 } } else {
                    if dp[j] < dp[j-1] { dp[j] = dp[j] + 1 } else { dp[j] = dp[j-1] + 1 }
                }
            }
            prev = tmp
        }
    }
    return dp[n]
}
```

```c [C]
int minDistance(char* word1, char* word2) {
    int m = strlen(word1), n = strlen(word2);
    int* dp = (int*)malloc(sizeof(int) * (n + 1));
    for (int j = 0; j <= n; j++) dp[j] = j;
    for (int i = 1; i <= m; i++) {
        int prev = dp[0];
        dp[0] = i;
        for (int j = 1; j <= n; j++) {
            int tmp = dp[j];
            if (word1[i-1] == word2[j-1]) dp[j] = prev;
            else dp[j] = 1 + (prev < dp[j] ? (prev < dp[j-1] ? prev : dp[j-1]) : (dp[j] < dp[j-1] ? dp[j] : dp[j-1]));
            prev = tmp;
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
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<int> dp(n + 1);
        for (int j = 0; j <= n; j++) dp[j] = j;
        for (int i = 1; i <= m; i++) {
            int prev = dp[0];
            dp[0] = i;
            for (int j = 1; j <= n; j++) {
                int tmp = dp[j];
                if (word1[i - 1] == word2[j - 1]) dp[j] = prev;
                else dp[j] = 1 + min({prev, dp[j], dp[j - 1]});
                prev = tmp;
            }
        }
        return dp[n];
    }
};
```

```javascript [JavaScript]
var minDistance = function(word1, word2) {
    const m = word1.length, n = word2.length;
    let dp = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            if (word1[i - 1] === word2[j - 1]) dp[j] = prev;
            else dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
};
```

```typescript [TypeScript]
function minDistance(word1: string, word2: string): number {
    const m = word1.length, n = word2.length;
    let dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            if (word1[i - 1] === word2[j - 1]) dp[j] = prev;
            else dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，两层循环。
- **空间复杂度**：`O(n)`，一维数组。

### 2.2 方法二：动态规划（二维数组）


1. **思路**

直接用二维 `dp[i][j]`，逻辑最直观，便于理解和调试，空间略高。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
        return dp[m][n];
    }
}
```

```python [Python]
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i
        for j in range(n + 1): dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i-1] == word2[j-1]:
                    dp[i][j] = dp[i-1][j-1]
                else:
                    dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
        return dp[m][n]
```

```go [Go]
func minDistance(word1 string, word2 string) int {
    m, n := len(word1), len(word2)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }
    for i := 0; i <= m; i++ { dp[i][0] = i }
    for j := 0; j <= n; j++ { dp[0][j] = j }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if word1[i-1] == word2[j-1] { dp[i][j] = dp[i-1][j-1] } else {
                dp[i][j] = 1 + min3(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
}
func min3(a, b, c int) int {
    if a < b { if a < c { return a }; return c }
    if b < c { return b }; return c
}
```

```c [C]
int minDistance(char* word1, char* word2) {
    int m = strlen(word1), n = strlen(word2);
    int** dp = (int**)malloc(sizeof(int*) * (m + 1));
    for (int i = 0; i <= m; i++) dp[i] = (int*)malloc(sizeof(int) * (n + 1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + (dp[i-1][j-1] < dp[i-1][j] ? (dp[i-1][j-1] < dp[i][j-1] ? dp[i-1][j-1] : dp[i][j-1]) : (dp[i-1][j] < dp[i][j-1] ? dp[i-1][j] : dp[i][j-1]));
    int ans = dp[m][n];
    for (int i = 0; i <= m; i++) free(dp[i]);
    free(dp);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]});
        return dp[m][n];
    }
};
```

```javascript [JavaScript]
var minDistance = function(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    return dp[m][n];
};
```

```typescript [TypeScript]
function minDistance(word1: string, word2: string): number {
    const m = word1.length, n = word2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    return dp[m][n];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，两层循环。
- **空间复杂度**：`O(m * n)`，二维数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（一维） | `O(m * n)` | `O(n)` | 空间更优，推荐 |
| 动态规划（二维） | `O(m * n)` | `O(m * n)` | 逻辑直观，易调试 |
