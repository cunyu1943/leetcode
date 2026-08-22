# [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)



## 一、题目描述

给你一个 `m` 行 `n` 列的矩阵 `matrix`，请按照 **顺时针螺旋顺序**，返回矩阵中的所有元素。



**示例 1：**

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

**示例 2：**

```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

**提示：**

-   `m == matrix.length`
-   `n == matrix[i].length`
-   `1 <= m, n <= 10`
-   `-100 <= matrix[i][j] <= 100`



## 二、解答方法

### 2.1 方法一：按层模拟（设定边界）


1. **思路**

用四个边界 `top / bottom / left / right` 表示当前待遍历的最外圈，依次向右、向下、向左、向上遍历，每遍历完一条边就收缩对应边界，直到边界交错。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int m = matrix.length, n = matrix[0].length;
        int top = 0, bottom = m - 1, left = 0, right = n - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.add(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1
        while top <= bottom and left <= right:
            for i in range(left, right + 1):
                res.append(matrix[top][i])
            top += 1
            for i in range(top, bottom + 1):
                res.append(matrix[i][right])
            right -= 1
            if top <= bottom:
                for i in range(right, left - 1, -1):
                    res.append(matrix[bottom][i])
                bottom -= 1
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    res.append(matrix[i][left])
                left += 1
        return res
```

```go [Go]
func spiralOrder(matrix [][]int) []int {
    res := []int{}
    m, n := len(matrix), len(matrix[0])
    top, bottom, left, right := 0, m-1, 0, n-1
    for top <= bottom && left <= right {
        for i := left; i <= right; i++ { res = append(res, matrix[top][i]) }
        top++
        for i := top; i <= bottom; i++ { res = append(res, matrix[i][right]) }
        right--
        if top <= bottom {
            for i := right; i >= left; i-- { res = append(res, matrix[bottom][i]) }
            bottom--
        }
        if left <= right {
            for i := bottom; i >= top; i-- { res = append(res, matrix[i][left]) }
            left++
        }
    }
    return res
}
```

```c [C]
int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    int m = matrixSize, n = matrixColSize[0];
    int* res = (int*)malloc(sizeof(int) * m * n);
    *returnSize = 0;
    int top = 0, bottom = m - 1, left = 0, right = n - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) res[(*returnSize)++] = matrix[top][i];
        top++;
        for (int i = top; i <= bottom; i++) res[(*returnSize)++] = matrix[i][right];
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) res[(*returnSize)++] = matrix[bottom][i];
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) res[(*returnSize)++] = matrix[i][left];
            left++;
        }
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int m = matrix.size(), n = matrix[0].size();
        int top = 0, bottom = m - 1, left = 0, right = n - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var spiralOrder = function(matrix) {
    const res = [];
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) res.push(matrix[top][i]);
        top++;
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
            left++;
        }
    }
    return res;
};
```

```typescript [TypeScript]
function spiralOrder(matrix: number[][]): number[] {
    const res: number[] = [];
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) res.push(matrix[top][i]);
        top++;
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
            left++;
        }
    }
    return res;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，每个元素恰好访问一次。
- **空间复杂度**：`O(1)`（不计返回结果），只用到边界变量。

### 2.2 方法二：方向数组模拟


1. **思路**

按固定方向（右→下→左→上）行走，用方向数组表示四个转向；每走到边界或已访问位置就顺时针转向下一个方向，直到走完所有格子。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[][] seen = new boolean[m][n];
        int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        List<Integer> res = new ArrayList<>();
        int r = 0, c = 0, d = 0;
        for (int k = 0; k < m * n; k++) {
            res.add(matrix[r][c]);
            seen[r][c] = true;
            int nr = r + dirs[d][0], nc = c + dirs[d][1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) {
                d = (d + 1) % 4;
                nr = r + dirs[d][0]; nc = c + dirs[d][1];
            }
            r = nr; c = nc;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        m, n = len(matrix), len(matrix[0])
        seen = [[False] * n for _ in range(m)]
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        res = []
        r = c = d = 0
        for _ in range(m * n):
            res.append(matrix[r][c])
            seen[r][c] = True
            nr, nc = r + dirs[d][0], c + dirs[d][1]
            if nr < 0 or nr >= m or nc < 0 or nc >= n or seen[nr][nc]:
                d = (d + 1) % 4
                nr, nc = r + dirs[d][0], c + dirs[d][1]
            r, c = nr, nc
        return res
```

```go [Go]
func spiralOrder(matrix [][]int) []int {
    m, n := len(matrix), len(matrix[0])
    seen := make([][]bool, m)
    for i := range seen { seen[i] = make([]bool, n) }
    dirs := [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
    res := []int{}
    r, c, d := 0, 0, 0
    for k := 0; k < m*n; k++ {
        res = append(res, matrix[r][c])
        seen[r][c] = true
        nr, nc := r+dirs[d][0], c+dirs[d][1]
        if nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc] {
            d = (d + 1) % 4
            nr, nc = r+dirs[d][0], c+dirs[d][1]
        }
        r, c = nr, nc
    }
    return res
}
```

```c [C]
int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    // 方向数组模拟核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        vector<vector<int>> dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        vector<int> res;
        int r = 0, c = 0, d = 0;
        for (int k = 0; k < m * n; k++) {
            res.push_back(matrix[r][c]);
            seen[r][c] = true;
            int nr = r + dirs[d][0], nc = c + dirs[d][1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) {
                d = (d + 1) % 4;
                nr = r + dirs[d][0]; nc = c + dirs[d][1];
            }
            r = nr; c = nc;
        }
        return res;
    }
};
```

```javascript [JavaScript]
var spiralOrder = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const seen = Array.from({ length: m }, () => Array(n).fill(false));
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const res = [];
    let r = 0, c = 0, d = 0;
    for (let k = 0; k < m * n; k++) {
        res.push(matrix[r][c]);
        seen[r][c] = true;
        let nr = r + dirs[d][0], nc = c + dirs[d][1];
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) {
            d = (d + 1) % 4;
            nr = r + dirs[d][0]; nc = c + dirs[d][1];
        }
        r = nr; c = nc;
    }
    return res;
};
```

```typescript [TypeScript]
function spiralOrder(matrix: number[][]): number[] {
    const m = matrix.length, n = matrix[0].length;
    const seen = Array.from({ length: m }, () => Array(n).fill(false));
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const res: number[] = [];
    let r = 0, c = 0, d = 0;
    for (let k = 0; k < m * n; k++) {
        res.push(matrix[r][c]);
        seen[r][c] = true;
        let nr = r + dirs[d][0], nc = c + dirs[d][1];
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) {
            d = (d + 1) % 4;
            nr = r + dirs[d][0]; nc = c + dirs[d][1];
        }
        r = nr; c = nc;
    }
    return res;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，每个元素访问一次。
- **空间复杂度**：`O(m * n)`**，需要一个 visited 数组记录是否访问过。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 按层模拟（边界收缩） | `O(m * n)` | `O(1)` | 空间最优，推荐 |
| 方向数组模拟 | `O(m * n)` | `O(m * n)` | 思路统一，易实现 |
