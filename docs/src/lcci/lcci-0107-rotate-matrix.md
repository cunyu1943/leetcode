# [面试题 01.07. 旋转矩阵](https://leetcode.cn/problems/rotate-matrix-lcci/)

## 一、题目描述

给定一幅由 `N × N` 矩阵表示的图像，其中每个像素的大小为 4 字节。编写一种方法，将图像旋转 90 度。

你能否在不占用额外内存空间的情况下完成操作？

**示例 1：**

```
给定 matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**示例 2：**

```
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
],

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

**提示：**

- `matrix.length == matrix[0].length == n`
- `0 <= n <= 100`
- `matrix[i][j]` 在 `[0, 100]` 范围内

---

## 二、解答方法

### 2.1 方法一：先转置，再水平翻转（原地）

**1. 思路**

顺时针旋转 90° 等价于两步操作：
1. 沿主对角线转置（`matrix[i][j]` 与 `matrix[j][i]` 互换）。
2. 对每一行进行水平翻转（左右镜像）。

此方法只需原地交换，不使用额外矩阵，空间复杂度 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // 转置
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // 每行水平翻转
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}
```

```python [Python]
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        # 转置
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        # 每行水平翻转
        for i in range(n):
            for j in range(n // 2):
                matrix[i][j], matrix[i][n - 1 - j] = matrix[i][n - 1 - j], matrix[i][j]
```

```go [Go]
func rotate(matrix [][]int) {
    n := len(matrix)
    // 转置
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        }
    }
    // 每行水平翻转
    for i := 0; i < n; i++ {
        for j := 0; j < n/2; j++ {
            matrix[i][j], matrix[i][n-1-j] = matrix[i][n-1-j], matrix[i][j]
        }
    }
}
```

```c [C]
void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    int n = matrixSize;
    // 转置
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // 每行水平翻转
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n/2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n-1-j];
            matrix[i][n-1-j] = temp;
        }
    }
}
```

```cpp [C++]
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 转置
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // 每行水平翻转
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n/2; j++) {
                swap(matrix[i][j], matrix[i][n-1-j]);
            }
        }
    }
};
```

```javascript [JavaScript]
var rotate = function(matrix) {
    const n = matrix.length;
    // 转置
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // 每行水平翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n / 2; j++) {
            [matrix[i][j], matrix[i][n-1-j]] = [matrix[i][n-1-j], matrix[i][j]];
        }
    }
};
```

```typescript [TypeScript]
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    // 转置
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // 每行水平翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < Math.floor(n / 2); j++) {
            [matrix[i][j], matrix[i][n-1-j]] = [matrix[i][n-1-j], matrix[i][j]];
        }
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`，遍历矩阵两次。
- **空间复杂度**：`O(1)`，原地操作，仅使用常数空间。

---

### 2.2 方法二：分层旋转（原地逐层处理）

**1. 思路**

将矩阵视为若干层，从最外层向内层逐层旋转。对于每一层，将四个边上的元素进行顺时针交换。具体地，对于第 `i` 层，从 `i` 到 `n-1-i` 的每个位置，将上、右、下、左四个元素依次交换。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n / 2; i++) {
            for (int j = i; j < n - 1 - i; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[n - 1 - j][i];
                matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
                matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
                matrix[j][n - 1 - i] = temp;
            }
        }
    }
}
```

```python [Python]
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        for i in range(n // 2):
            for j in range(i, n - 1 - i):
                temp = matrix[i][j]
                matrix[i][j] = matrix[n - 1 - j][i]
                matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j]
                matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i]
                matrix[j][n - 1 - i] = temp
```

```go [Go]
func rotate(matrix [][]int) {
    n := len(matrix)
    for i := 0; i < n/2; i++ {
        for j := i; j < n-1-i; j++ {
            temp := matrix[i][j]
            matrix[i][j] = matrix[n-1-j][i]
            matrix[n-1-j][i] = matrix[n-1-i][n-1-j]
            matrix[n-1-i][n-1-j] = matrix[j][n-1-i]
            matrix[j][n-1-i] = temp
        }
    }
}
```

```c [C]
void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    int n = matrixSize;
    for (int i = 0; i < n/2; i++) {
        for (int j = i; j < n-1-i; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[n-1-j][i];
            matrix[n-1-j][i] = matrix[n-1-i][n-1-j];
            matrix[n-1-i][n-1-j] = matrix[j][n-1-i];
            matrix[j][n-1-i] = temp;
        }
    }
}
```

```cpp [C++]
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n/2; i++) {
            for (int j = i; j < n-1-i; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[n-1-j][i];
                matrix[n-1-j][i] = matrix[n-1-i][n-1-j];
                matrix[n-1-i][n-1-j] = matrix[j][n-1-i];
                matrix[j][n-1-i] = temp;
            }
        }
    }
};
```

```javascript [JavaScript]
var rotate = function(matrix) {
    const n = matrix.length;
    for (let i = 0; i < n/2; i++) {
        for (let j = i; j < n-1-i; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n-1-j][i];
            matrix[n-1-j][i] = matrix[n-1-i][n-1-j];
            matrix[n-1-i][n-1-j] = matrix[j][n-1-i];
            matrix[j][n-1-i] = temp;
        }
    }
};
```

```typescript [TypeScript]
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    for (let i = 0; i < n/2; i++) {
        for (let j = i; j < n-1-i; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n-1-j][i];
            matrix[n-1-j][i] = matrix[n-1-i][n-1-j];
            matrix[n-1-i][n-1-j] = matrix[j][n-1-i];
            matrix[j][n-1-i] = temp;
        }
    }
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`，原地操作。

---

## 三、总结

| 方法            | 时间复杂度 | 空间复杂度 | 特点                   |
| --------------- | ---------- | ---------- | ---------------------- |
| 转置 + 水平翻转 | `O(n²)`    | `O(1)`     | 代码简洁，易于理解     |
| 分层旋转        | `O(n²)`    | `O(1)`     | 直接旋转，无需辅助操作 |

两种方法均为原地旋转，满足题目“不占用额外内存空间”的要求。**推荐**面试中使用 **方法一（转置 + 水平翻转）**，代码更清晰，不易出错。