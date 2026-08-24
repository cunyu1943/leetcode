# [面试题 01.05. 一次编辑](https://leetcode.cn/problems/one-away-lcci/)

## 一、题目描述

字符串有三种编辑操作：插入一个字符、删除一个字符、替换一个字符。给定两个字符串，编写一个函数判定它们是否只需要一次（或零次）编辑。

**示例 1：**

```
输入: first = "pale", second = "ple"
输出: True
解释: 删除 first 中的一个字符 'a'。
```

**示例 2：**

```
输入: first = "pales", second = "pal"
输出: False
解释: 需要两次删除操作。
```

**示例 3：**

```
输入: first = "pale", second = "bale"
输出: True
解释: 替换第一个字符。
```

**示例 4：**

```
输入: first = "pale", second = "bake"
输出: False
解释: 需要两次替换。
```

**提示：**

- `0 <= len(first), len(second) <= 10000`
- 字符串仅包含小写字母

---

## 二、解答方法

### 2.1 方法一：双指针（分类讨论）

**1. 思路**

根据两个字符串的长度差进行分类讨论：

- 若长度差 > 1，直接返回 `false`。
- 若长度相等，则统计不同字符的个数，若不同字符数 <= 1 则返回 `true`。
- 若长度差为 1，则用双指针分别遍历两个字符串。遇到不同字符时，较长字符串的指针跳过该字符，并记录一次编辑。若后续再次出现不同字符，则返回 `false`。

此方法时间复杂度 `O(n)`，空间 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean oneEditAway(String first, String second) {
        int m = first.length(), n = second.length();
        if (Math.abs(m - n) > 1) return false;
        if (m == n) {
            int diff = 0;
            for (int i = 0; i < m; i++) {
                if (first.charAt(i) != second.charAt(i)) diff++;
                if (diff > 1) return false;
            }
            return true;
        }
        // 确保 first 是较长的字符串
        if (m < n) return oneEditAway(second, first);
        // 此时 first 比 second 长 1
        int i = 0, j = 0;
        while (i < m && j < n) {
            if (first.charAt(i) == second.charAt(j)) {
                i++; j++;
            } else {
                // 跳过 first 中的当前字符，相当于删除
                i++;
                if (i - j > 1) return false; // 跳过次数超过1
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def oneEditAway(self, first: str, second: str) -> bool:
        m, n = len(first), len(second)
        if abs(m - n) > 1:
            return False
        if m == n:
            diff = sum(1 for a, b in zip(first, second) if a != b)
            return diff <= 1
        # 确保 first 是较长的
        if m < n:
            return self.oneEditAway(second, first)
        # 此时 first 比 second 长 1
        i = j = 0
        while i < m and j < n:
            if first[i] == second[j]:
                i += 1; j += 1
            else:
                i += 1
                if i - j > 1:
                    return False
        return True
```

```go [Go]
func oneEditAway(first string, second string) bool {
    m, n := len(first), len(second)
    if abs(m-n) > 1 {
        return false
    }
    if m == n {
        diff := 0
        for i := 0; i < m; i++ {
            if first[i] != second[i] {
                diff++
                if diff > 1 {
                    return false
                }
            }
        }
        return true
    }
    // 确保 first 是较长的
    if m < n {
        return oneEditAway(second, first)
    }
    i, j := 0, 0
    for i < m && j < n {
        if first[i] == second[j] {
            i++; j++
        } else {
            i++
            if i-j > 1 {
                return false
            }
        }
    }
    return true
}
func abs(a int) int {
    if a < 0 { return -a }
    return a
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
bool oneEditAway(char* first, char* second) {
    int m = strlen(first), n = strlen(second);
    if (abs(m - n) > 1) return false;
    if (m == n) {
        int diff = 0;
        for (int i = 0; i < m; i++) {
            if (first[i] != second[i]) {
                diff++;
                if (diff > 1) return false;
            }
        }
        return true;
    }
    // 确保 first 是较长的
    if (m < n) {
        char* tmp = first;
        first = second;
        second = tmp;
        int t = m; m = n; n = t;
    }
    int i = 0, j = 0;
    while (i < m && j < n) {
        if (first[i] == second[j]) {
            i++; j++;
        } else {
            i++;
            if (i - j > 1) return false;
        }
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool oneEditAway(string first, string second) {
        int m = first.size(), n = second.size();
        if (abs(m - n) > 1) return false;
        if (m == n) {
            int diff = 0;
            for (int i = 0; i < m; i++) {
                if (first[i] != second[i]) diff++;
                if (diff > 1) return false;
            }
            return true;
        }
        if (m < n) return oneEditAway(second, first);
        int i = 0, j = 0;
        while (i < m && j < n) {
            if (first[i] == second[j]) {
                i++; j++;
            } else {
                i++;
                if (i - j > 1) return false;
            }
        }
        return true;
    }
};
```

```javascript [JavaScript]
var oneEditAway = function(first, second) {
    const m = first.length, n = second.length;
    if (Math.abs(m - n) > 1) return false;
    if (m === n) {
        let diff = 0;
        for (let i = 0; i < m; i++) {
            if (first[i] !== second[i]) diff++;
            if (diff > 1) return false;
        }
        return true;
    }
    if (m < n) return oneEditAway(second, first);
    let i = 0, j = 0;
    while (i < m && j < n) {
        if (first[i] === second[j]) {
            i++; j++;
        } else {
            i++;
            if (i - j > 1) return false;
        }
    }
    return true;
};
```

```typescript [TypeScript]
function oneEditAway(first: string, second: string): boolean {
    const m = first.length, n = second.length;
    if (Math.abs(m - n) > 1) return false;
    if (m === n) {
        let diff = 0;
        for (let i = 0; i < m; i++) {
            if (first[i] !== second[i]) diff++;
            if (diff > 1) return false;
        }
        return true;
    }
    if (m < n) return oneEditAway(second, first);
    let i = 0, j = 0;
    while (i < m && j < n) {
        if (first[i] === second[j]) {
            i++; j++;
        } else {
            i++;
            if (i - j > 1) return false;
        }
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为较长字符串的长度。
- **空间复杂度**：`O(1)`，仅使用常数变量。

---

### 2.2 方法二：动态规划（编辑距离）

**1. 思路**

使用二维动态规划计算编辑距离，若最终编辑距离 <= 1 则返回 `true`。定义 `dp[i][j]` 表示 `first` 的前 `i` 个字符和 `second` 的前 `j` 个字符的编辑距离。转移方程与经典编辑距离相同。此方法时间复杂度 `O(m*n)`，本题中虽不是最优，但展示了通用思路，便于扩展。

**2. 代码实现**

（注意：由于动态规划可能超时，但题目长度限制在 10000，仍可接受，不过为了性能，实际推荐方法一。这里提供代码以展示多种解法。）

:::::: code-group

```java [Java]
class Solution {
    public boolean oneEditAway(String first, String second) {
        int m = first.length(), n = second.length();
        if (Math.abs(m - n) > 1) return false;
        int[][] dp = new int[m+1][n+1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (first.charAt(i-1) == second.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
                }
            }
        }
        return dp[m][n] <= 1;
    }
}
```

```python [Python]
class Solution:
    def oneEditAway(self, first: str, second: str) -> bool:
        m, n = len(first), len(second)
        if abs(m - n) > 1:
            return False
        dp = [[0] * (n+1) for _ in range(m+1)]
        for i in range(m+1): dp[i][0] = i
        for j in range(n+1): dp[0][j] = j
        for i in range(1, m+1):
            for j in range(1, n+1):
                if first[i-1] == second[j-1]:
                    dp[i][j] = dp[i-1][j-1]
                else:
                    dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
        return dp[m][n] <= 1
```

```go [Go]
func oneEditAway(first string, second string) bool {
    m, n := len(first), len(second)
    if abs(m-n) > 1 { return false }
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        dp[i][0] = i
    }
    for j := 0; j <= n; j++ { dp[0][j] = j }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if first[i-1] == second[j-1] {
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = 1 + min(dp[i-1][j], min(dp[i][j-1], dp[i-1][j-1]))
            }
        }
    }
    return dp[m][n] <= 1
}
func min(a, b int) int { if a < b { return a }; return b }
func abs(a int) int { if a < 0 { return -a }; return a }
```

```c [C]
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
bool oneEditAway(char* first, char* second) {
    int m = strlen(first), n = strlen(second);
    if (abs(m - n) > 1) return false;
    int dp[10005][10005]; // 此处使用固定大小，实际需要动态分配，但示例简化
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (first[i-1] == second[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                int min = dp[i-1][j];
                if (dp[i][j-1] < min) min = dp[i][j-1];
                if (dp[i-1][j-1] < min) min = dp[i-1][j-1];
                dp[i][j] = 1 + min;
            }
        }
    }
    return dp[m][n] <= 1;
}
```

```cpp [C++]
class Solution {
public:
    bool oneEditAway(string first, string second) {
        int m = first.size(), n = second.size();
        if (abs(m - n) > 1) return false;
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (first[i-1] == second[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                }
            }
        }
        return dp[m][n] <= 1;
    }
};
```

```javascript [JavaScript]
var oneEditAway = function(first, second) {
    const m = first.length, n = second.length;
    if (Math.abs(m - n) > 1) return false;
    const dp = Array.from({ length: m+1 }, () => Array(n+1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (first[i-1] === second[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
    }
    return dp[m][n] <= 1;
};
```

```typescript [TypeScript]
function oneEditAway(first: string, second: string): boolean {
    const m = first.length, n = second.length;
    if (Math.abs(m - n) > 1) return false;
    const dp: number[][] = Array.from({ length: m+1 }, () => Array(n+1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (first[i-1] === second[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
    }
    return dp[m][n] <= 1;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m * n)`，其中 `m`、`n` 分别为两个字符串的长度。
- **空间复杂度**：`O(m * n)`，使用二维数组。

---

## 三、总结

| 方法                 | 时间复杂度 | 空间复杂度 | 适用场景           |
| -------------------- | ---------- | ---------- | ------------------ |
| 双指针分类讨论       | `O(n)`     | `O(1)`     | **推荐**，高效简洁 |
| 动态规划（编辑距离） | `O(m*n)`   | `O(m*n)`   | 通用，适合扩展     |

**推荐**：实际面试中优先选择 **方法一（双指针）**，时间 `O(n)`，空间 `O(1)`，且针对本题最优。动态规划虽然通用，但本题长度可达 10000，`O(n^2)` 可能超时，故不推荐。