# [面试题 01.08. 零矩阵](https://leetcode.cn/problems/zero-matrix-lcci/)

## 一、题目描述

编写一种算法，若 M × N 矩阵中某个元素为 0，则将其所在的行与列清零。

**示例 1：**

```
输入：
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出：
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**示例 2：**

```
输入：
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出：
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

**提示：**

- `1 <= matrix.length, matrix[0].length <= 100`
- `-10000 <= matrix[i][j] <= 10000`

---

## 二、解答方法

### 2.1 方法一：使用标记数组

**1. 思路**

遍历矩阵，用两个布尔数组 `rowZero` 和 `colZero` 分别记录哪些行和列需要被清零。再次遍历矩阵，若当前行或列需要清零，则将对应元素置为 0。时间复杂度 `O(m*n)`，空间复杂度 `O(m+n)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[] rowZero = new boolean[m];
        boolean[] colZero = new boolean[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    rowZero[i] = true;
                    colZero[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rowZero[i] || colZero[j]) {
                    matrix[i][j] = 0;
                }
            }
        }
    }
}
```

```python [Python]
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        row_zero = [False] * m
        col_zero = [False] * n
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    row_zero[i] = True
                    col_zero[j] = True
        for i in range(m):
            for j in range(n):
                if row_zero[i] or col_zero[j]:
                    matrix[i][j] = 0
```

```go [Go]
func setZeroes(matrix [][]int) {
    m, n := len(matrix), len(matrix[0])
    rowZero := make([]bool, m)
    colZero := make([]bool, n)
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if matrix[i][j] == 0 {
                rowZero[i] = true
                colZero[j] = true
            }
        }
    }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if rowZero[i] || colZero[j] {
                matrix[i][j] = 0
            }
        }
    }
}
```

```c [C]
#include <stdbool.h>
void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    int m = matrixSize, n = *matrixColSize;
    bool* rowZero = (bool*)calloc(m, sizeof(bool));
    bool* colZero = (bool*)calloc(n, sizeof(bool));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                rowZero[i] = true;
                colZero[j] = true;
            }
        }
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (rowZero[i] || colZero[j]) {
                matrix[i][j] = 0;
            }
        }
    }
    free(rowZero);
    free(colZero);
}
```

```cpp [C++]
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<bool> rowZero(m, false), colZero(n, false);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    rowZero[i] = true;
                    colZero[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rowZero[i] || colZero[j]) {
                    matrix[i][j] = 0;
                }
            }
        }
    }
};
```

```javascript [JavaScript]
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const rowZero = new Array(m).fill(false);
    const colZero = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rowZero[i] = true;
                colZero[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rowZero[i] || colZero[j]) {
                matrix[i][j] = 0;
            }
        }
    }
};
```

```typescript [TypeScript]
function setZeroes(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    const rowZero: boolean[] = new Array(m).fill(false);
    const colZero: boolean[] = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rowZero[i] = true;
                colZero[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rowZero[i] || colZero[j]) {
                matrix[i][j] = 0;
            }
        }
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m * n)`，遍历两次矩阵。
- **空间复杂度**：`O(m + n)`，用于存储行和列的标记数组。

---

### 2.2 方法二：使用第一行和第一列作为标记（原地）

**1. 思路**

利用矩阵的第一行和第一列来记录哪些行和列需要清零。先检查第一行和第一列本身是否包含 0，并用两个布尔变量记录。然后遍历除第一行第一列外的元素，若 `matrix[i][j] == 0`，则将 `matrix[i][0]` 和 `matrix[0][j]` 置为 0。最后根据这些标记将对应的行和列置零，再根据之前记录的标志处理第一行和第一列。空间复杂度 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean firstRowZero = false, firstColZero = false;
        // 检查第一行
        for (int j = 0; j < n; j++) {
            if (matrix[0][j] == 0) { firstRowZero = true; break; }
        }
        // 检查第一列
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) { firstColZero = true; break; }
        }
        // 用第一行和第一列记录其他行和列的零
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        // 根据标记清零
        for (int i = 1; i < m; i++) {
            if (matrix[i][0] == 0) {
                for (int j = 1; j < n; j++) matrix[i][j] = 0;
            }
        }
        for (int j = 1; j < n; j++) {
            if (matrix[0][j] == 0) {
                for (int i = 1; i < m; i++) matrix[i][j] = 0;
            }
        }
        // 处理第一行和第一列
        if (firstRowZero) {
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        }
        if (firstColZero) {
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
        }
    }
}
```

```python [Python]
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        first_row_zero = any(matrix[0][j] == 0 for j in range(n))
        first_col_zero = any(matrix[i][0] == 0 for i in range(m))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0
        for i in range(1, m):
            if matrix[i][0] == 0:
                for j in range(1, n):
                    matrix[i][j] = 0
        for j in range(1, n):
            if matrix[0][j] == 0:
                for i in range(1, m):
                    matrix[i][j] = 0
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0
```

```go [Go]
func setZeroes(matrix [][]int) {
    m, n := len(matrix), len(matrix[0])
    firstRowZero := false
    for j := 0; j < n; j++ {
        if matrix[0][j] == 0 { firstRowZero = true; break }
    }
    firstColZero := false
    for i := 0; i < m; i++ {
        if matrix[i][0] == 0 { firstColZero = true; break }
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if matrix[i][j] == 0 {
                matrix[i][0] = 0
                matrix[0][j] = 0
            }
        }
    }
    for i := 1; i < m; i++ {
        if matrix[i][0] == 0 {
            for j := 1; j < n; j++ {
                matrix[i][j] = 0
            }
        }
    }
    for j := 1; j < n; j++ {
        if matrix[0][j] == 0 {
            for i := 1; i < m; i++ {
                matrix[i][j] = 0
            }
        }
    }
    if firstRowZero {
        for j := 0; j < n; j++ {
            matrix[0][j] = 0
        }
    }
    if firstColZero {
        for i := 0; i < m; i++ {
            matrix[i][0] = 0
        }
    }
}
```

```c [C]
void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    int m = matrixSize, n = *matrixColSize;
    int firstRowZero = 0, firstColZero = 0;
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) { firstRowZero = 1; break; }
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) { firstColZero = 1; break; }
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (int i = 1; i < m; i++) {
        if (matrix[i][0] == 0) {
            for (int j = 1; j < n; j++) matrix[i][j] = 0;
        }
    }
    for (int j = 1; j < n; j++) {
        if (matrix[0][j] == 0) {
            for (int i = 1; i < m; i++) matrix[i][j] = 0;
        }
    }
    if (firstRowZero) {
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
    if (firstColZero) {
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}
```

```cpp [C++]
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool firstRowZero = false, firstColZero = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) { firstRowZero = true; break; }
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) { firstColZero = true; break; }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            if (matrix[i][0] == 0) {
                for (int j = 1; j < n; j++) matrix[i][j] = 0;
            }
        }
        for (int j = 1; j < n; j++) {
            if (matrix[0][j] == 0) {
                for (int i = 1; i < m; i++) matrix[i][j] = 0;
            }
        }
        if (firstRowZero) {
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        }
        if (firstColZero) {
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
        }
    }
};
```

```javascript [JavaScript]
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) { firstRowZero = true; break; }
    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) { firstColZero = true; break; }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = 1; i < m; i++) {
        if (matrix[i][0] === 0) {
            for (let j = 1; j < n; j++) matrix[i][j] = 0;
        }
    }
    for (let j = 1; j < n; j++) {
        if (matrix[0][j] === 0) {
            for (let i = 1; i < m; i++) matrix[i][j] = 0;
        }
    }
    if (firstRowZero) {
        for (let j = 0; j < n; j++) matrix[0][j] = 0;
    }
    if (firstColZero) {
        for (let i = 0; i < m; i++) matrix[i][0] = 0;
    }
};
```

```typescript [TypeScript]
function setZeroes(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) { firstRowZero = true; break; }
    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) { firstColZero = true; break; }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = 1; i < m; i++) {
        if (matrix[i][0] === 0) {
            for (let j = 1; j < n; j++) matrix[i][j] = 0;
        }
    }
    for (let j = 1; j < n; j++) {
        if (matrix[0][j] === 0) {
            for (let i = 1; i < m; i++) matrix[i][j] = 0;
        }
    }
    if (firstRowZero) {
        for (let j = 0; j < n; j++) matrix[0][j] = 0;
    }
    if (firstColZero) {
        for (let i = 0; i < m; i++) matrix[i][0] = 0;
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m * n)`。
- **空间复杂度**：`O(1)`，只使用常数空间。

---

## 三、总结

| 方法                       | 时间复杂度 | 空间复杂度 | 特点           |
| -------------------------- | ---------- | ---------- | -------------- |
| 标记数组                   | `O(m*n)`   | `O(m+n)`   | 直观，易理解   |
| 原地标记（第一行和第一列） | `O(m*n)`   | `O(1)`     | 空间最优，推荐 |

**推荐**：面试中优先使用 **方法二（原地标记）**，满足题目要求的不使用额外空间，但需要注意先检查第一行和第一列的状态，避免被后续标记覆盖。若对空间要求不严格，方法一更清晰可靠。