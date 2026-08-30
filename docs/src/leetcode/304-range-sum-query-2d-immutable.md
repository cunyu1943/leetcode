# [304. 二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/)

## 一、题目描述

给定一个二维矩阵 `matrix`，多次查询 `sumRegion(row1, col1, row2, col2)`（返回子矩阵元素和，含边界）。矩阵构造后不变。

**示例：**
```
输入：matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]
sumRegion(2,1,4,3) = 8
sumRegion(1,1,2,2) = 11
```

**提示：** `m == matrix.length`, `n == matrix[0].length`, `1 <= m,n <= 200`，最多 `10⁴` 次查询。

## 二、解答方法

### 方法一：二维前缀和（O(1) 查询）

**思路：** `pre[i][j]` = 以 `(0,0)` 到 `(i-1,j-1)` 为范围的子矩阵和（多加一行一列便于处理边界）。插入式：
`pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1]`。
查询：`sum = pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1]`。

:::::: code-group

```java [Java]
class NumMatrix {
    private int[][] pre;
    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        pre = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1];
    }
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];
    }
}
```

```python [Python]
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.pre = [[0]*(n+1) for _ in range(m+1)]
        for i in range(1, m+1):
            for j in range(1, n+1):
                self.pre[i][j] = self.pre[i-1][j] + self.pre[i][j-1] - self.pre[i-1][j-1] + matrix[i-1][j-1]
    def sumRegion(self, r1: int, c1: int, r2: int, c2: int) -> int:
        return self.pre[r2+1][c2+1] - self.pre[r1][c2+1] - self.pre[r2+1][c1] + self.pre[r1][c1]
```

```cpp [C++]
class NumMatrix {
    vector<vector<int>> pre;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        pre.assign(m+1, vector<int>(n+1, 0));
        for (int i=1;i<=m;i++) for (int j=1;j<=n;j++)
            pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1];
    }
    int sumRegion(int r1, int c1, int r2, int c2) {
        return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];
    }
};
```

```go [Go]
type NumMatrix struct { pre [][]int }
func Constructor(matrix [][]int) NumMatrix {
    m, n := len(matrix), len(matrix[0])
    pre := make([][]int, m+1)
    for i := range pre { pre[i] = make([]int, n+1) }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1]
        }
    }
    return NumMatrix{pre}
}
func (n NumMatrix) SumRegion(r1, c1, r2, c2 int) int {
    return n.pre[r2+1][c2+1] - n.pre[r1][c2+1] - n.pre[r2+1][c1] + n.pre[r1][c1]
}
```

```js [JavaScript]
var NumMatrix = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    this.pre = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
        this.pre[i][j] = this.pre[i-1][j] + this.pre[i][j-1] - this.pre[i-1][j-1] + matrix[i-1][j-1];
};
NumMatrix.prototype.sumRegion = function (r1, c1, r2, c2) {
    return this.pre[r2+1][c2+1] - this.pre[r1][c2+1] - this.pre[r2+1][c1] + this.pre[r1][c1];
};
```

::::::

**复杂度：** 构造 `O(mn)`，查询 `O(1)`，空间 `O(mn)`。

## 三、总结

二维前缀和 = 一维前缀和自然推广，容斥原理处理重叠：`sum = 右下 - 上 - 左 + 左上`。与 `303` 同属「不可变前缀和」系列；若矩阵可变则用二维树状数组/线段树。注意下标偏移（建 `m+1 × n+1` 避免特判）。
