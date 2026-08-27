# [面试题 17.23. 最大黑方阵](https://leetcode.cn/problems/max-black-square-lcci/)

## 一、题目描述

给定一个由 0 和 1 组成的方阵 `matrix`，编写程序找出全由 1 组成的最大子方阵（正方形），并返回该方阵的边长。若全为 0 则返回 0。

**示例：**

```
输入:
[
  [1,0,1,0,0],
  [1,0,1,1,1],
  [1,1,1,1,1],
  [1,0,0,1,0]
]
输出: 3
解释: 存在边长为 3 的全 1 子方阵（如右下 3x3）。
```

---

## 二、解答方法

### 2.1 方法一：预处理右下连续 1 + 枚举边长

**1. 思路**

先预处理 `down[i][j]`（向下连续 1 个数）和 `right[i][j]`（向右连续 1 个数）。对每个可能的边长 `k`（从大到小），枚举左上角 `(i,j)`，若该点向下、向右的连续 1 均 ≥ k，再检查右下角 `(i+k-1, j+k-1)` 的向上、向左连续 1 是否 ≥ k，满足则为最大边长。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findSquare(int[][] matrix) {
        int n = matrix.length;
        if (n == 0) return 0;
        int[][] down = new int[n][n], right = new int[n][n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (matrix[i][j] == 1) {
                    down[i][j] = (i + 1 < n ? down[i+1][j] : 0) + 1;
                    right[i][j] = (j + 1 < n ? right[i][j+1] : 0) + 1;
                }
            }
        }
        for (int k = n; k >= 1; k--) {
            for (int i = 0; i + k <= n; i++) {
                for (int j = 0; j + k <= n; j++) {
                    if (down[i][j] >= k && right[i][j] >= k
                        && down[i+k-1][j] >= k && right[i][j+k-1] >= k)
                        return k;
                }
            }
        }
        return 0;
    }
}
```

```python [Python]
class Solution:
    def findSquare(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        if n == 0:
            return 0
        down = [[0]*n for _ in range(n)]
        right = [[0]*n for _ in range(n)]
        for i in range(n-1, -1, -1):
            for j in range(n-1, -1, -1):
                if matrix[i][j] == 1:
                    down[i][j] = (down[i+1][j] if i+1 < n else 0) + 1
                    right[i][j] = (right[i][j+1] if j+1 < n else 0) + 1
        for k in range(n, 0, -1):
            for i in range(n - k + 1):
                for j in range(n - k + 1):
                    if down[i][j] >= k and right[i][j] >= k and down[i+k-1][j] >= k and right[i][j+k-1] >= k:
                        return k
        return 0
```

```go [Go]
func findSquare(matrix [][]int) int {
    n := len(matrix)
    if n == 0 { return 0 }
    down := make([][]int, n); right := make([][]int, n)
    for i := range down { down[i] = make([]int, n); right[i] = make([]int, n) }
    for i := n-1; i >= 0; i-- {
        for j := n-1; j >= 0; j-- {
            if matrix[i][j] == 1 {
                if i+1 < n { down[i][j] = down[i+1][j] + 1 } else { down[i][j] = 1 }
                if j+1 < n { right[i][j] = right[i][j+1] + 1 } else { right[i][j] = 1 }
            }
        }
    }
    for k := n; k >= 1; k-- {
        for i := 0; i+k <= n; i++ {
            for j := 0; j+k <= n; j++ {
                if down[i][j] >= k && right[i][j] >= k && down[i+k-1][j] >= k && right[i][j+k-1] >= k {
                    return k
                }
            }
        }
    }
    return 0
}
```

```c [C]
// 预处理 down/right 后在 C 中枚举边长，逻辑同上
```

```cpp [C++]
class Solution {
public:
    int findSquare(vector<vector<int>>& matrix) {
        int n = matrix.size();
        if (n == 0) return 0;
        vector<vector<int>> down(n, vector<int>(n, 0)), right(n, vector<int>(n, 0));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (matrix[i][j] == 1) {
                    down[i][j] = (i+1 < n ? down[i+1][j] : 0) + 1;
                    right[i][j] = (j+1 < n ? right[i][j+1] : 0) + 1;
                }
            }
        }
        for (int k = n; k >= 1; k--) {
            for (int i = 0; i + k <= n; i++) {
                for (int j = 0; j + k <= n; j++) {
                    if (down[i][j] >= k && right[i][j] >= k && down[i+k-1][j] >= k && right[i][j+k-1] >= k)
                        return k;
                }
            }
        }
        return 0;
    }
};
```

```javascript [JavaScript]
var findSquare = function(matrix) {
    const n = matrix.length;
    if (n === 0) return 0;
    const down = Array.from({length:n}, () => new Array(n).fill(0));
    const right = Array.from({length:n}, () => new Array(n).fill(0));
    for (let i = n-1; i >= 0; i--) {
        for (let j = n-1; j >= 0; j--) {
            if (matrix[i][j] === 1) {
                down[i][j] = (i+1 < n ? down[i+1][j] : 0) + 1;
                right[i][j] = (j+1 < n ? right[i][j+1] : 0) + 1;
            }
        }
    }
    for (let k = n; k >= 1; k--) {
        for (let i = 0; i+k <= n; i++) {
            for (let j = 0; j+k <= n; j++) {
                if (down[i][j] >= k && right[i][j] >= k && down[i+k-1][j] >= k && right[i][j+k-1] >= k)
                    return k;
            }
        }
    }
    return 0;
};
```

```typescript [TypeScript]
function findSquare(matrix: number[][]): number {
    const n = matrix.length;
    if (n === 0) return 0;
    const down = Array.from({length:n}, () => new Array(n).fill(0));
    const right = Array.from({length:n}, () => new Array(n).fill(0));
    for (let i = n-1; i >= 0; i--) {
        for (let j = n-1; j >= 0; j--) {
            if (matrix[i][j] === 1) {
                down[i][j] = (i+1 < n ? down[i+1][j] : 0) + 1;
                right[i][j] = (j+1 < n ? right[i][j+1] : 0) + 1;
            }
        }
    }
    for (let k = n; k >= 1; k--) {
        for (let i = 0; i+k <= n; i++) {
            for (let j = 0; j+k <= n; j++) {
                if (down[i][j] >= k && right[i][j] >= k && down[i+k-1][j] >= k && right[i][j+k-1] >= k)
                    return k;
            }
        }
    }
    return 0;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n³)`（枚举边长 + 左上角）。
- **空间复杂度**：`O(n²)`。

---

### 2.2 方法二：动态规划（最大正方形）

**1. 思路**

经典最大正方形 DP：`dp[i][j]` 表示以 `(i,j)` 为右下角的最大全 1 正方形边长，`dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`。遍历取最大值。空间可压缩为一维。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findSquare(int[][] matrix) {
        int n = matrix.length, ans = 0;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    if (i == 0 || j == 0) dp[i][j] = 1;
                    else dp[i][j] = Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1])) + 1;
                    ans = Math.max(ans, dp[i][j]);
                }
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findSquare(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        dp = [[0]*n for _ in range(n)]
        ans = 0
        for i in range(n):
            for j in range(n):
                if matrix[i][j] == 1:
                    dp[i][j] = 1 if (i==0 or j==0) else min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                    ans = max(ans, dp[i][j])
        return ans
```

```cpp [C++]
class Solution {
public:
    int findSquare(vector<vector<int>>& matrix) {
        int n = matrix.size(), ans = 0;
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    dp[i][j] = (i==0||j==0) ? 1 : min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                    ans = max(ans, dp[i][j]);
                }
            }
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var findSquare = function(matrix) {
    const n = matrix.length;
    const dp = Array.from({length:n}, () => new Array(n).fill(0));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                dp[i][j] = (i===0||j===0) ? 1 : Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                ans = Math.max(ans, dp[i][j]);
            }
        }
    }
    return ans;
};
```

```typescript [TypeScript]
function findSquare(matrix: number[][]): number {
    const n = matrix.length;
    const dp = Array.from({length:n}, () => new Array(n).fill(0));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                dp[i][j] = (i===0||j===0) ? 1 : Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                ans = Math.max(ans, dp[i][j]);
            }
        }
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n²)`（可压至 `O(n)`）。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 预处理+枚举    | `O(n³)`    | `O(n²)`    | 思路直观                   |
| DP 最大正方形  | `O(n²)`    | `O(n²)`    | 最优，推荐                 |

**推荐**：使用动态规划（最大正方形）法，`O(n²)` 即求出最大边长。
