# [48. 旋转图像](https://leetcode.cn/problems/rotate-image/)



## 一、题目描述

给定一个 `n × n` 的二维矩阵 `matrix` 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。



**示例 1：**

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
```

**示例 2：**

```
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

**提示：**

-   `n == matrix.length == matrix[i].length`
-   `1 <= n <= 20`
-   `-1000 <= matrix[i][j] <= 1000`



## 二、解答方法

### 2.1 方法一：原地旋转（先转置再翻转每行）

1. **思路**

顺时针旋转 90° 等价于「先沿主对角线转置，再翻转每一行」。

-   转置：交换 `matrix[i][j]` 与 `matrix[j][i]`（`i < j`）；
-   每行翻转：`matrix[i][j]` 与 `matrix[i][n-1-j]` 交换。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                swap(matrix, i, j, j, i);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n / 2; j++)
                swap(matrix, i, j, i, n - 1 - j);
    }

    private void swap(int[][] m, int i, int j, int x, int y) {
        int t = m[i][j]; m[i][j] = m[x][y]; m[x][y] = t;
    }
}
```

```python [Python]
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        for i in range(n):
            matrix[i].reverse()
```

```go [Go]
func rotate(matrix [][]int) {
    n := len(matrix)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        }
    }
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
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t;
        }
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n / 2; j++) {
            int t = matrix[i][j]; matrix[i][j] = matrix[i][n-1-j]; matrix[i][n-1-j] = t;
        }
}
```

```cpp [C++]
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                swap(matrix[i][j], matrix[j][i]);
        for (int i = 0; i < n; i++)
            reverse(matrix[i].begin(), matrix[i].end());
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    const n = matrix.length;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    for (let i = 0; i < n; i++)
        for (let j = 0; j < Math.floor(n / 2); j++)
            [matrix[i][j], matrix[i][n - 1 - j]] = [matrix[i][n - 1 - j], matrix[i][j]];
};
```

```ts [TypeScript]
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    for (let i = 0; i < n; i++)
        for (let j = 0; j < Math.floor(n / 2); j++)
            [matrix[i][j], matrix[i][n - 1 - j]] = [matrix[i][n - 1 - j], matrix[i][j]];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，遍历矩阵两遍。
- **空间复杂度**：`O(1)`，原地操作。

### 2.2 方法二：原地一圈一圈旋转（四角交换）

1. **思路**

把矩阵从外到内分层「圈」，每圈上四个对应位置（左上、右上、右下、左下）循环交换。一圈处理完缩进一层，直到中心。

-   对第 `k` 圈（`k` 从 0 到 `n/2-1`），`i` 从 `k` 到 `n-1-k-1`：
    `top = matrix[k][i]`，然后 `left → top`、`bottom → left`、`right → bottom`、`top → right` 依次赋值。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int k = 0; k < n / 2; k++) {
            for (int i = k; i < n - 1 - k; i++) {
                int top = matrix[k][i];
                matrix[k][i] = matrix[n - 1 - i][k];
                matrix[n - 1 - i][k] = matrix[n - 1 - k][n - 1 - i];
                matrix[n - 1 - k][n - 1 - i] = matrix[i][n - 1 - k];
                matrix[i][n - 1 - k] = top;
            }
        }
    }
}
```

```python [Python]
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        for k in range(n // 2):
            for i in range(k, n - 1 - k):
                top = matrix[k][i]
                matrix[k][i] = matrix[n - 1 - i][k]
                matrix[n - 1 - i][k] = matrix[n - 1 - k][n - 1 - i]
                matrix[n - 1 - k][n - 1 - i] = matrix[i][n - 1 - k]
                matrix[i][n - 1 - k] = top
```

```go [Go]
func rotate(matrix [][]int) {
    n := len(matrix)
    for k := 0; k < n/2; k++ {
        for i := k; i < n-1-k; i++ {
            top := matrix[k][i]
            matrix[k][i] = matrix[n-1-i][k]
            matrix[n-1-i][k] = matrix[n-1-k][n-1-i]
            matrix[n-1-k][n-1-i] = matrix[i][n-1-k]
            matrix[i][n-1-k] = top
        }
    }
}
```

```c [C]
void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    int n = matrixSize;
    for (int k = 0; k < n / 2; k++) {
        for (int i = k; i < n - 1 - k; i++) {
            int top = matrix[k][i];
            matrix[k][i] = matrix[n-1-i][k];
            matrix[n-1-i][k] = matrix[n-1-k][n-1-i];
            matrix[n-1-k][n-1-i] = matrix[i][n-1-k];
            matrix[i][n-1-k] = top;
        }
    }
}
```

```cpp [C++]
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int k = 0; k < n / 2; k++)
            for (int i = k; i < n - 1 - k; i++) {
                int top = matrix[k][i];
                matrix[k][i] = matrix[n - 1 - i][k];
                matrix[n - 1 - i][k] = matrix[n - 1 - k][n - 1 - i];
                matrix[n - 1 - k][n - 1 - i] = matrix[i][n - 1 - k];
                matrix[i][n - 1 - k] = top;
            }
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} matrix
 * @return {void}
 */
var rotate = function (matrix) {
    const n = matrix.length;
    for (let k = 0; k < Math.floor(n / 2); k++) {
        for (let i = k; i < n - 1 - k; i++) {
            const top = matrix[k][i];
            matrix[k][i] = matrix[n - 1 - i][k];
            matrix[n - 1 - i][k] = matrix[n - 1 - k][n - 1 - i];
            matrix[n - 1 - k][n - 1 - i] = matrix[i][n - 1 - k];
            matrix[i][n - 1 - k] = top;
        }
    }
};
```

```ts [TypeScript]
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    for (let k = 0; k < Math.floor(n / 2); k++) {
        for (let i = k; i < n - 1 - k; i++) {
            const top = matrix[k][i];
            matrix[k][i] = matrix[n - 1 - i][k];
            matrix[n - 1 - i][k] = matrix[n - 1 - k][n - 1 - i];
            matrix[n - 1 - k][n - 1 - i] = matrix[i][n - 1 - k];
            matrix[i][n - 1 - k] = top;
        }
    }
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 原地旋转（先转置再翻转每行） | `O(n²)` | `O(1)` | 两步简单操作，推荐 |
| 原地一圈一圈旋转（四角交换） | `O(n²)` | `O(1)` | 直接映射旋转坐标 |

