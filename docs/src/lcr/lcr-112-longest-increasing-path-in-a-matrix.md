# [LCR 112. 矩阵中的最长递增路径](https://leetcode.cn/problems/fpTFWP/)



## 一、题目描述

给定一个 `m x n` 整数矩阵 `matrix` ，找出其中 **最长递增路径** 的长度。

对于每个单元格，你可以往上，下，左，右四个方向移动。 你不能在 **对角线** 方向上移动或移动到 **边界外**（即不允许环绕）。



**示例 1：**

```
输入：matrix = [[9,9,4],[6,6,8],[2,1,1]]
输出：4
解释：最长递增路径为 [1, 2, 6, 9]。
```

**示例 2：**

```
输入：matrix = [[3,4,5],[3,2,6],[2,2,1]]
输出：4
解释：最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。
```

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `0 <= matrix[i][j] <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：记忆化 DFS

1. **思路**

从每个单元格出发，求以它为起点的最长递增路径：

```
dfs(i, j) = 1 + max(dfs(邻接且值更大的单元格))
```

- 用 `memo[i][j]` 记忆化，避免重复计算；
- 只向「值更大」的方向移动，天然保证无环，无需 visited。

时间 `O(mn)`（每个格子的最长路径只算一次），空间 `O(mn)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int[][] memo;
    private int m, n;
    public int longestIncreasingPath(int[][] matrix) {
        m = matrix.length;
        n = matrix[0].length;
        memo = new int[m][n];
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = Math.max(ans, dfs(matrix, i, j));
        return ans;
    }
    private int dfs(int[][] matrix, int i, int j) {
        if (memo[i][j] != 0) return memo[i][j];
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        int best = 1;
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
                best = Math.max(best, 1 + dfs(matrix, ni, nj));
            }
        }
        memo[i][j] = best;
        return best;
    }
}
```

```python [Python]
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        memo = [[0] * n for _ in range(m)]

        def dfs(i, j):
            if memo[i][j]:
                return memo[i][j]
            best = 1
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + dx, j + dy
                if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] > matrix[i][j]:
                    best = max(best, 1 + dfs(ni, nj))
            memo[i][j] = best
            return best

        return max(dfs(i, j) for i in range(m) for j in range(n))
```

```cpp [C++]
class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size();
        n = matrix[0].size();
        memo.assign(m, vector<int>(n, 0));
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = max(ans, dfs(matrix, i, j));
        return ans;
    }
private:
    int m, n;
    vector<vector<int>> memo;
    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int dfs(vector<vector<int>>& g, int i, int j) {
        if (memo[i][j]) return memo[i][j];
        int best = 1;
        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && g[ni][nj] > g[i][j])
                best = max(best, 1 + dfs(g, ni, nj));
        }
        return memo[i][j] = best;
    }
};
```

```go [Go]
func longestIncreasingPath(matrix [][]int) int {
    m, n := len(matrix), len(matrix[0])
    memo := make([][]int, m)
    for i := range memo {
        memo[i] = make([]int, n)
    }
    dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if memo[i][j] != 0 {
            return memo[i][j]
        }
        best := 1
        for _, d := range dirs {
            ni, nj := i+d[0], j+d[1]
            if ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j] {
                if v := 1 + dfs(ni, nj); v > best {
                    best = v
                }
            }
        }
        memo[i][j] = best
        return best
    }
    ans := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if v := dfs(i, j); v > ans {
                ans = v
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array.from({ length: m }, () => new Array(n).fill(0));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const dfs = (i, j) => {
        if (memo[i][j]) return memo[i][j];
        let best = 1;
        for (const [dx, dy] of dirs) {
            const ni = i + dx, nj = j + dy;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
                best = Math.max(best, 1 + dfs(ni, nj));
            }
        }
        memo[i][j] = best;
        return best;
    };
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans = Math.max(ans, dfs(i, j));
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

static int dfs(int** matrix, int m, int n, int** memo, int i, int j) {
    if (memo[i][j]) return memo[i][j];
    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int best = 1;
    for (int d = 0; d < 4; d++) {
        int ni = i + dirs[d][0], nj = j + dirs[d][1];
        if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
            int v = 1 + dfs(matrix, m, n, memo, ni, nj);
            if (v > best) best = v;
        }
    }
    memo[i][j] = best;
    return best;
}

int longestIncreasingPath(int** matrix, int matrixSize, int* matrixColSize) {
    int m = matrixSize, n = matrixColSize[0];
    int** memo = (int**)calloc(m, sizeof(int*));
    for (int i = 0; i < m; i++) memo[i] = (int*)calloc(n, sizeof(int));
    int ans = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            int v = dfs(matrix, m, n, memo, i, j);
            if (v > ans) ans = v;
        }
    for (int i = 0; i < m; i++) free(memo[i]);
    free(memo);
    return ans;
}
```

```ts [TypeScript]
function longestIncreasingPath(matrix: number[][]): number {
    const m = matrix.length, n = matrix[0].length;
    const memo: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const dfs = (i: number, j: number): number => {
        if (memo[i][j]) return memo[i][j];
        let best = 1;
        for (const [dx, dy] of dirs) {
            const ni = i + dx, nj = j + dy;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
                best = Math.max(best, 1 + dfs(ni, nj));
            }
        }
        memo[i][j] = best;
        return best;
    };
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans = Math.max(ans, dfs(i, j));
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`，每个格子记忆化后只算一次。
- **空间复杂度**：`O(mn)`，记忆化数组与递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 记忆化 DFS | `O(mn)` | `O(mn)` | 标准解法 |

「只向值更大的方向移动」让搜索天然无环，配合记忆化即可在 `O(mn)` 内求出全局最长递增路径。这是网格 DP 与 DFS 结合的经典题。

