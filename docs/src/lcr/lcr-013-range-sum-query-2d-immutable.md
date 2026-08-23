# [LCR 013. 二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/2bCMpM/)



## 一、题目描述

给定一个二维矩阵 `matrix`，以下类型的多个请求：

计算其子矩形范围内元素的总和，该子矩阵的 **左上角** 为 `(row1, col1)` 、**右下角** 为 `(row2, col2)` 。

你需要实现一个类 `NumMatrix` ：

- `NumMatrix(int[][] matrix)` 给定整数矩阵 `matrix` 进行初始化
- `int sumRegion(int row1, int col1, int row2, int col2)` 返回 **左上角** `(row1, col1)` 、**右下角** `(row2, col2)` 所描述的子矩阵的元素总和。



**示例 1：**

```
输入：
["NumMatrix","sumRegion","sumRegion","sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]
输出：
[null, 8, 11, 12]
解释：
sumRegion(2, 1, 4, 3) = 8
sumRegion(1, 1, 2, 2) = 11
sumRegion(1, 2, 2, 4) = 12
```

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-10⁵ <= matrix[i][j] <= 10⁵`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- 最多调用 `10⁴` 次 `sumRegion`



## 二、解答方法

### 2.1 方法一：二维前缀和（容斥原理）

1. **思路**

构造前缀和矩阵 `pre`，其中 `pre[i][j]` 表示原矩阵左上角 `(0,0)` 到 `(i-1, j-1)` 的矩形和，并多开一圈避免边界判断：

```
pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1]
```

查询子矩形和时利用容斥：

```
sum = pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1]
```

预处理 `O(mn)`，每次查询 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class NumMatrix {
    private int[][] pre;
    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        pre = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                pre[i][j] = pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1];
    }
}
```

```python [Python]
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.pre = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                self.pre[i][j] = (self.pre[i - 1][j] + self.pre[i][j - 1]
                                  - self.pre[i - 1][j - 1] + matrix[i - 1][j - 1])

    def sumRegion(self, r1: int, c1: int, r2: int, c2: int) -> int:
        return (self.pre[r2 + 1][c2 + 1] - self.pre[r1][c2 + 1]
                - self.pre[r2 + 1][c1] + self.pre[r1][c1])
```

```cpp [C++]
class NumMatrix {
    vector<vector<int>> pre;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        pre.assign(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                pre[i][j] = pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
    int sumRegion(int r1, int c1, int r2, int c2) {
        return pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1];
    }
};
```

```go [Go]
type NumMatrix struct {
    pre [][]int
}

func Constructor(matrix [][]int) NumMatrix {
    m, n := len(matrix), len(matrix[0])
    pre := make([][]int, m+1)
    for i := range pre {
        pre[i] = make([]int, n+1)
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1]
        }
    }
    return NumMatrix{pre: pre}
}

func (nm *NumMatrix) SumRegion(r1 int, c1 int, r2 int, c2 int) int {
    return nm.pre[r2+1][c2+1] - nm.pre[r1][c2+1] - nm.pre[r2+1][c1] + nm.pre[r1][c1]
}
```

```js [JavaScript]
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    this.pre = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            this.pre[i][j] = this.pre[i - 1][j] + this.pre[i][j - 1]
                - this.pre[i - 1][j - 1] + matrix[i - 1][j - 1];
        }
    }
};

/**
 * @param {number} r1
 * @param {number} c1
 * @param {number} r2
 * @param {number} c2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (r1, c1, r2, c2) {
    return this.pre[r2 + 1][c2 + 1] - this.pre[r1][c2 + 1]
        - this.pre[r2 + 1][c1] + this.pre[r1][c1];
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int** pre;
    int m, n;
} NumMatrix;

NumMatrix* numMatrixCreate(int** matrix, int matrixSize, int* matrixColSize) {
    NumMatrix* obj = (NumMatrix*)malloc(sizeof(NumMatrix));
    int m = matrixSize, n = matrixColSize[0];
    obj->m = m; obj->n = n;
    obj->pre = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) obj->pre[i] = (int*)calloc(n + 1, sizeof(int));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            obj->pre[i][j] = obj->pre[i - 1][j] + obj->pre[i][j - 1]
                - obj->pre[i - 1][j - 1] + matrix[i - 1][j - 1];
    return obj;
}

int numMatrixSumRegion(NumMatrix* obj, int r1, int c1, int r2, int c2) {
    return obj->pre[r2 + 1][c2 + 1] - obj->pre[r1][c2 + 1]
        - obj->pre[r2 + 1][c1] + obj->pre[r1][c1];
}

void numMatrixFree(NumMatrix* obj) {
    for (int i = 0; i <= obj->m; i++) free(obj->pre[i]);
    free(obj->pre);
    free(obj);
}
```

```ts [TypeScript]
class NumMatrix {
    private pre: number[][];
    constructor(matrix: number[][]) {
        const m = matrix.length, n = matrix[0].length;
        this.pre = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                this.pre[i][j] = this.pre[i - 1][j] + this.pre[i][j - 1]
                    - this.pre[i - 1][j - 1] + matrix[i - 1][j - 1];
            }
        }
    }
    sumRegion(r1: number, c1: number, r2: number, c2: number): number {
        return this.pre[r2 + 1][c2 + 1] - this.pre[r1][c2 + 1]
            - this.pre[r2 + 1][c1] + this.pre[r1][c1];
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：预处理 `O(mn)`，每次查询 `O(1)`。
- **空间复杂度**：`O(mn)`，前缀和矩阵。

## 三、总结

| 方法 | 预处理 | 查询 | 空间 | 特点 |
| ---- | ---------- | ---------- | ---------- | ---- |
| 二维前缀和 | `O(mn)` | `O(1)` | `O(mn)` | 经典容斥，适合多次查询 |

二维前缀和是一维前缀和的推广，利用「容斥原理」在 `O(1)` 内求出任意子矩形和，是处理矩阵区间求和的标准方法。

