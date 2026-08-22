# [73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)



## 一、题目描述

给定一个 `*m x n*` 的矩阵 `matrix`，请按照以下规则将其原地置零：

如果矩阵中某个元素为 `0`，则将其所在行和所在列的所有元素都设为 `0`。

请使用 **原地** 算法。



**示例 1：**

```
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]
```

**示例 2：**

```
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

**提示：**

-   `m == matrix.length`
-   `n == matrix[0].length`
-   `1 <= m, n <= 200`
-   `-2^31 <= matrix[i][j] <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：用首行首列作标记


1. **思路**

用两个布尔变量记录首行、首列是否需要置零，再用首行首列作为标记位记录其余行列是否置零，最后按标记处理，实现 `O(1)` 额外空间。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean row0 = false, col0 = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) { row0 = true; break; }
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) { col0 = true; break; }
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        if (row0) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (col0) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}
```

```python [Python]
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        row0 = any(matrix[0][j] == 0 for j in range(n))
        col0 = any(matrix[i][0] == 0 for i in range(m))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        if row0:
            for j in range(n): matrix[0][j] = 0
        if col0:
            for i in range(m): matrix[i][0] = 0
```

```go [Go]
func setZeroes(matrix [][]int) {
    m, n := len(matrix), len(matrix[0])
    row0, col0 := false, false
    for j := 0; j < n; j++ { if matrix[0][j] == 0 { row0 = true; break } }
    for i := 0; i < m; i++ { if matrix[i][0] == 0 { col0 = true; break } }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if matrix[i][j] == 0 { matrix[i][0] = 0; matrix[0][j] = 0 }
        }
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if matrix[i][0] == 0 || matrix[0][j] == 0 { matrix[i][j] = 0 }
        }
    }
    if row0 { for j := 0; j < n; j++ { matrix[0][j] = 0 } }
    if col0 { for i := 0; i < m; i++ { matrix[i][0] = 0 } }
}
```

```c [C]
void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    int m = matrixSize, n = matrixColSize[0];
    int row0 = 0, col0 = 0;
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) { row0 = 1; break; }
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) { col0 = 1; break; }
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
    if (row0) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (col0) for (int i = 0; i < m; i++) matrix[i][0] = 0;
}
```

```cpp [C++]
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool row0 = false, col0 = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) { row0 = true; break; }
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) { col0 = true; break; }
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        if (row0) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (col0) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
};
```

```javascript [JavaScript]
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let row0 = false, col0 = false;
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) { row0 = true; break; }
    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) { col0 = true; break; }
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    if (row0) for (let j = 0; j < n; j++) matrix[0][j] = 0;
    if (col0) for (let i = 0; i < m; i++) matrix[i][0] = 0;
};
```

```typescript [TypeScript]
function setZeroes(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    let row0 = false, col0 = false;
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) { row0 = true; break; }
    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) { col0 = true; break; }
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    if (row0) for (let j = 0; j < n; j++) matrix[0][j] = 0;
    if (col0) for (let i = 0; i < m; i++) matrix[i][0] = 0;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，遍历矩阵两次。
- **空间复杂度**：`O(1)`，仅用两个标记变量。

### 2.2 方法二：额外标记数组


1. **思路**

用两个布尔数组 `rows`、`cols` 记录哪些行、列需要置零，直观易写，但额外 `O(m + n)` 空间。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[] rows = new boolean[m], cols = new boolean[n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (matrix[i][j] == 0) { rows[i] = true; cols[j] = true; }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (rows[i] || cols[j]) matrix[i][j] = 0;
    }
}
```

```python [Python]
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        rows = [False] * m
        cols = [False] * n
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    rows[i] = True
                    cols[j] = True
        for i in range(m):
            for j in range(n):
                if rows[i] or cols[j]:
                    matrix[i][j] = 0
```

```go [Go]
func setZeroes(matrix [][]int) {
    m, n := len(matrix), len(matrix[0])
    rows := make([]bool, m)
    cols := make([]bool, n)
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if matrix[i][j] == 0 { rows[i] = true; cols[j] = true }
        }
    }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if rows[i] || cols[j] { matrix[i][j] = 0 }
        }
    }
}
```

```c [C]
void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    int m = matrixSize, n = matrixColSize[0];
    int* rows = (int*)calloc(m, sizeof(int));
    int* cols = (int*)calloc(n, sizeof(int));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (matrix[i][j] == 0) { rows[i] = 1; cols[j] = 1; }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (rows[i] || cols[j]) matrix[i][j] = 0;
    free(rows); free(cols);
}
```

```cpp [C++]
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<bool> rows(m, false), cols(n, false);
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (matrix[i][j] == 0) { rows[i] = true; cols[j] = true; }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (rows[i] || cols[j]) matrix[i][j] = 0;
    }
};
```

```javascript [JavaScript]
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const rows = new Array(m).fill(false);
    const cols = new Array(n).fill(false);
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (matrix[i][j] === 0) { rows[i] = true; cols[j] = true; }
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (rows[i] || cols[j]) matrix[i][j] = 0;
};
```

```typescript [TypeScript]
function setZeroes(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    const rows: boolean[] = new Array(m).fill(false);
    const cols: boolean[] = new Array(n).fill(false);
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (matrix[i][j] === 0) { rows[i] = true; cols[j] = true; }
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (rows[i] || cols[j]) matrix[i][j] = 0;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，遍历矩阵两次。
- **空间复杂度**：`O(m + n)`，两个标记数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 首行首列作标记 | `O(m * n)` | `O(1)` | 空间最优，推荐 |
| 额外标记数组 | `O(m * n)` | `O(m + n)` | 直观易写，空间略高 |
