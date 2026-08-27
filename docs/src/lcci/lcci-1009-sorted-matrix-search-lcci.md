# [面试题 10.09. 排序矩阵查找](https://leetcode.cn/problems/sorted-matrix-search-lcci/)

## 一、题目描述

给定 `M × N` 矩阵，每一行、每一列都按升序排列，请编写代码找出某元素。

**示例：**

```
现有矩阵 matrix 如下：
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

给定 target = 5，返回 true。
给定 target = 20，返回 false。
```

---

## 二、解答方法

### 2.1 方法一：右上角（或左下角）出发收缩法

**1. 思路**

从矩阵右上角出发：若当前值等于 `target` 返回 `true`；若当前值大于 `target`，说明当前列下方的元素都更大，可排除该列，左移；若当前值小于 `target`，说明当前行左侧都更小，可排除该行，下移。每一步排除一行或一列，`O(M + N)` 完成。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0) return false;
        int row = 0, col = matrix[0].length - 1;
        while (row < matrix.length && col >= 0) {
            if (matrix[row][col] == target) return true;
            else if (matrix[row][col] > target) col--;
            else row++;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        row, col = 0, len(matrix[0]) - 1
        while row < len(matrix) and col >= 0:
            if matrix[row][col] == target:
                return True
            elif matrix[row][col] > target:
                col -= 1
            else:
                row += 1
        return False
```

```go [Go]
func searchMatrix(matrix [][]int, target int) bool {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return false
    }
    row, col := 0, len(matrix[0])-1
    for row < len(matrix) && col >= 0 {
        if matrix[row][col] == target {
            return true
        } else if matrix[row][col] > target {
            col--
        } else {
            row++
        }
    }
    return false
}
```

```c [C]
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    if (matrixSize == 0 || matrixColSize[0] == 0) return false;
    int row = 0, col = matrixColSize[0] - 1;
    while (row < matrixSize && col >= 0) {
        if (matrix[row][col] == target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int row = 0, col = matrix[0].size() - 1;
        while (row < matrix.size() && col >= 0) {
            if (matrix[row][col] == target) return true;
            else if (matrix[row][col] > target) col--;
            else row++;
        }
        return false;
    }
};
```

```javascript [JavaScript]
var searchMatrix = function(matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;
    let row = 0, col = matrix[0].length - 1;
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
};
```

```typescript [TypeScript]
function searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix.length || !matrix[0].length) return false;
    let row = 0, col = matrix[0].length - 1;
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(M + N)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：每行二分查找

**1. 思路**

对矩阵的每一行分别进行二分查找。每行有序，二分复杂度 `O(log N)`，共 `M` 行，总复杂度 `O(M log N)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        for (int[] row : matrix) {
            int left = 0, right = row.length - 1;
            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (row[mid] == target) return true;
                else if (row[mid] < target) left = mid + 1;
                else right = mid - 1;
            }
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        import bisect
        for row in matrix:
            idx = bisect.bisect_left(row, target)
            if idx < len(row) and row[idx] == target:
                return True
        return False
```

```cpp [C++]
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (auto& row : matrix) {
            int left = 0, right = row.size() - 1;
            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (row[mid] == target) return true;
                else if (row[mid] < target) left = mid + 1;
                else right = mid - 1;
            }
        }
        return false;
    }
};
```

```javascript [JavaScript]
var searchMatrix = function(matrix, target) {
    for (const row of matrix) {
        let left = 0, right = row.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (row[mid] === target) return true;
            else if (row[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
    }
    return false;
};
```

```typescript [TypeScript]
function searchMatrix(matrix: number[][], target: number): boolean {
    for (const row of matrix) {
        let left = 0, right = row.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (row[mid] === target) return true;
            else if (row[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
    }
    return false;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(M · log N)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法                 | 时间复杂度      | 空间复杂度 | 特点                         |
| -------------------- | --------------- | ---------- | ---------------------------- |
| 右上角收缩法         | `O(M + N)`      | `O(1)`     | 最优，一次遍历排除行列       |
| 每行二分查找         | `O(M · log N)`  | `O(1)`     | 实现直观，略慢               |

**推荐**：优先使用右上角收缩法，复杂度最优且无需二分细节。
