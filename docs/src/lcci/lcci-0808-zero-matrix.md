# [面试题 08.08. 零矩阵](https://leetcode.cn/problems/zero-matrix-lcci/)

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

---

## 二、解答方法

### 2.1 方法一：标记数组（O(M+N) 空间）

**1. 思路**

先遍历矩阵，用两个布尔数组 `rows`、`cols` 记录哪些行、列含有 0；再第二次遍历时，凡是属于「含 0 的行或列」的格子都置 0。避免了「边遍历边清零导致误判整行整列」的问题。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[] rows = new boolean[m];
        boolean[] cols = new boolean[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    rows[i] = true;
                    cols[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rows[i] || cols[j]) matrix[i][j] = 0;
            }
        }
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
			if matrix[i][j] == 0 {
				rows[i] = true
				cols[j] = true
			}
		}
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if rows[i] || cols[j] {
				matrix[i][j] = 0
			}
		}
	}
}
```

```c [C]
void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    int m = matrixSize, n = matrixColSize[0];
    int* rows = (int*)calloc(m, sizeof(int));
    int* cols = (int*)calloc(n, sizeof(int));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                rows[i] = 1;
                cols[j] = 1;
            }
        }
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (rows[i] || cols[j]) matrix[i][j] = 0;
        }
    }
    free(rows);
    free(cols);
}
```

```cpp [C++]
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<bool> rows(m, false), cols(n, false);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    rows[i] = true;
                    cols[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rows[i] || cols[j]) matrix[i][j] = 0;
            }
        }
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const rows = new Array(m).fill(false);
    const cols = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rows[i] = true;
                cols[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows[i] || cols[j]) matrix[i][j] = 0;
        }
    }
};
```

```typescript [TypeScript]
function setZeroes(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    const rows: boolean[] = new Array(m).fill(false);
    const cols: boolean[] = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rows[i] = true;
                cols[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows[i] || cols[j]) matrix[i][j] = 0;
        }
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(M * N)`。
- **空间复杂度**：`O(M + N)`。

---

### 2.2 方法二：原地标记（O(1) 空间）

**1. 思路**

用矩阵的第一行和第一列充当「标记数组」：先记录首行/首列自身是否含 0，再用首行首列标记其余行列是否需要清零。最后根据标记清零，最后处理首行首列。关键在于顺序——先处理非首行首列的格子，最后再单独处理首行首列，避免标记被提前抹掉。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void setZeroes(int[][] m) {
        int r = m.length, c = m[0].length;
        boolean row0 = false, col0 = false;
        for (int i = 0; i < r; i++) if (m[i][0] == 0) { col0 = true; break; }
        for (int j = 0; j < c; j++) if (m[0][j] == 0) { row0 = true; break; }
        for (int i = 1; i < r; i++) {
            for (int j = 1; j < c; j++) {
                if (m[i][j] == 0) { m[i][0] = 0; m[0][j] = 0; }
            }
        }
        for (int i = 1; i < r; i++) {
            for (int j = 1; j < c; j++) {
                if (m[i][0] == 0 || m[0][j] == 0) m[i][j] = 0;
            }
        }
        if (col0) for (int i = 0; i < r; i++) m[i][0] = 0;
        if (row0) for (int j = 0; j < c; j++) m[0][j] = 0;
    }
}
```

```python [Python]
class Solution:
    def setZeroes(self, m: List[List[int]]) -> None:
        r, c = len(m), len(m[0])
        row0 = any(m[i][0] == 0 for i in range(r))
        col0 = any(m[0][j] == 0 for j in range(c))
        for i in range(1, r):
            for j in range(1, c):
                if m[i][j] == 0:
                    m[i][0] = 0
                    m[0][j] = 0
        for i in range(1, r):
            for j in range(1, c):
                if m[i][0] == 0 or m[0][j] == 0:
                    m[i][j] = 0
        if col0:
            for i in range(r): m[i][0] = 0
        if row0:
            for j in range(c): m[0][j] = 0
```

```go [Go]
func setZeroes(m [][]int) {
	r, c := len(m), len(m[0])
	row0, col0 := false, false
	for i := 0; i < r; i++ {
		if m[i][0] == 0 { col0 = true; break }
	}
	for j := 0; j < c; j++ {
		if m[0][j] == 0 { row0 = true; break }
	}
	for i := 1; i < r; i++ {
		for j := 1; j < c; j++ {
			if m[i][j] == 0 { m[i][0] = 0; m[0][j] = 0 }
		}
	}
	for i := 1; i < r; i++ {
		for j := 1; j < c; j++ {
			if m[i][0] == 0 || m[0][j] == 0 { m[i][j] = 0 }
		}
	}
	if col0 {
		for i := 0; i < r; i++ { m[i][0] = 0 }
	}
	if row0 {
		for j := 0; j < c; j++ { m[0][j] = 0 }
	}
}
```

```c [C]
void setZeroes(int** m, int matrixSize, int* matrixColSize) {
    int r = matrixSize, c = matrixColSize[0];
    int row0 = 0, col0 = 0;
    for (int i = 0; i < r; i++) if (m[i][0] == 0) { col0 = 1; break; }
    for (int j = 0; j < c; j++) if (m[0][j] == 0) { row0 = 1; break; }
    for (int i = 1; i < r; i++) {
        for (int j = 1; j < c; j++) {
            if (m[i][j] == 0) { m[i][0] = 0; m[0][j] = 0; }
        }
    }
    for (int i = 1; i < r; i++) {
        for (int j = 1; j < c; j++) {
            if (m[i][0] == 0 || m[0][j] == 0) m[i][j] = 0;
        }
    }
    if (col0) for (int i = 0; i < r; i++) m[i][0] = 0;
    if (row0) for (int j = 0; j < c; j++) m[0][j] = 0;
}
```

```cpp [C++]
class Solution {
public:
    void setZeroes(vector<vector<int>>& m) {
        int r = m.size(), c = m[0].size();
        bool row0 = false, col0 = false;
        for (int i = 0; i < r; i++) if (m[i][0] == 0) { col0 = true; break; }
        for (int j = 0; j < c; j++) if (m[0][j] == 0) { row0 = true; break; }
        for (int i = 1; i < r; i++) {
            for (int j = 1; j < c; j++) {
                if (m[i][j] == 0) { m[i][0] = 0; m[0][j] = 0; }
            }
        }
        for (int i = 1; i < r; i++) {
            for (int j = 1; j < c; j++) {
                if (m[i][0] == 0 || m[0][j] == 0) m[i][j] = 0;
            }
        }
        if (col0) for (int i = 0; i < r; i++) m[i][0] = 0;
        if (row0) for (int j = 0; j < c; j++) m[0][j] = 0;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[][]} m
 * @return {void} Do not return anything, modify m in-place instead.
 */
var setZeroes = function (m) {
    const r = m.length, c = m[0].length;
    let row0 = false, col0 = false;
    for (let i = 0; i < r; i++) if (m[i][0] === 0) { col0 = true; break; }
    for (let j = 0; j < c; j++) if (m[0][j] === 0) { row0 = true; break; }
    for (let i = 1; i < r; i++) {
        for (let j = 1; j < c; j++) {
            if (m[i][j] === 0) { m[i][0] = 0; m[0][j] = 0; }
        }
    }
    for (let i = 1; i < r; i++) {
        for (let j = 1; j < c; j++) {
            if (m[i][0] === 0 || m[0][j] === 0) m[i][j] = 0;
        }
    }
    if (col0) for (let i = 0; i < r; i++) m[i][0] = 0;
    if (row0) for (let j = 0; j < c; j++) m[0][j] = 0;
};
```

```typescript [TypeScript]
function setZeroes(m: number[][]): void {
    const r = m.length, c = m[0].length;
    let row0 = false, col0 = false;
    for (let i = 0; i < r; i++) if (m[i][0] === 0) { col0 = true; break; }
    for (let j = 0; j < c; j++) if (m[0][j] === 0) { row0 = true; break; }
    for (let i = 1; i < r; i++) {
        for (let j = 1; j < c; j++) {
            if (m[i][j] === 0) { m[i][0] = 0; m[0][j] = 0; }
        }
    }
    for (let i = 1; i < r; i++) {
        for (let j = 1; j < c; j++) {
            if (m[i][0] === 0 || m[0][j] === 0) m[i][j] = 0;
        }
    }
    if (col0) for (let i = 0; i < r; i++) m[i][0] = 0;
    if (row0) for (let j = 0; j < c; j++) m[0][j] = 0;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(M * N)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                             |
| -------- | ---------- | ---------- | -------------------------------- |
| 标记数组 | `O(M*N)`   | `O(M+N)`   | 思路最直观，易写不易错，推荐     |
| 原地标记 | `O(M*N)`   | `O(1)`     | 用首行首列当标记，空间最优       |

**推荐解法**：方法一（标记数组）最稳妥，面试优先保证正确。方法二把首行首列当作标记位，做到 `O(1)` 空间，注意要先单独记录首行/首列是否含 0，并在最后才处理它们，否则标记会被提前覆盖。
