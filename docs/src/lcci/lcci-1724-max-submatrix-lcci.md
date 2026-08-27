# [面试题 17.24. 最大子矩阵](https://leetcode.cn/problems/max-submatrix-lcci/)

## 一、题目描述

给定一个正整数、负整数和 0 组成的 `N × M` 矩阵，编写代码找出元素总和最大的子矩阵，并返回一个数组 `[r1, c1, r2, c2]`，其中 `r1, c1` 为左上角坐标，`r2, c2` 为右下角坐标。若有多个答案，返回任意一个。

**示例：**

```
输入:
[
  [9,-8,1,3],
  [-3,7,6,-2],
  [-1,2,4,-5],
  [4,3,-6,9]
]
输出: [0,0,2,2]（子矩阵和最大）
```

---

## 二、解答方法

### 2.1 方法一：压缩行 + 最大子段和（Kadane）

**1. 思路**

枚举子矩阵的上下边界 `top`、`bottom`，将这两行之间的每一列求和压缩成一维数组，再对该一维数组跑「最大子段和（Kadane）」求最优左右边界。复杂度 `O(rows² · cols)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] getMaxMatrix(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        int[] res = new int[4];
        int maxSum = Integer.MIN_VALUE;
        for (int top = 0; top < rows; top++) {
            int[] colSum = new int[cols];
            for (int bottom = top; bottom < rows; bottom++) {
                int cur = 0, bestLeft = 0;
                for (int c = 0; c < cols; c++) {
                    colSum[c] += matrix[bottom][c];
                    if (cur <= 0) { cur = colSum[c]; bestLeft = c; }
                    else cur += colSum[c];
                    if (cur > maxSum) {
                        maxSum = cur;
                        res[0] = top; res[1] = bestLeft; res[2] = bottom; res[3] = c;
                    }
                }
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def getMaxMatrix(self, matrix: List[List[int]]) -> List[int]:
        rows, cols = len(matrix), len(matrix[0])
        max_sum = float('-inf')
        res = [0, 0, 0, 0]
        for top in range(rows):
            col_sum = [0] * cols
            for bottom in range(top, rows):
                cur = 0
                best_left = 0
                for c in range(cols):
                    col_sum[c] += matrix[bottom][c]
                    if cur <= 0:
                        cur = col_sum[c]
                        best_left = c
                    else:
                        cur += col_sum[c]
                    if cur > max_sum:
                        max_sum = cur
                        res = [top, best_left, bottom, c]
        return res
```

```go [Go]
func getMaxMatrix(matrix [][]int) []int {
    rows, cols := len(matrix), len(matrix[0])
    res := []int{0,0,0,0}
    maxSum := -1 << 60
    for top := 0; top < rows; top++ {
        colSum := make([]int, cols)
        for bottom := top; bottom < rows; bottom++ {
            cur, bestLeft := 0, 0
            for c := 0; c < cols; c++ {
                colSum[c] += matrix[bottom][c]
                if cur <= 0 { cur = colSum[c]; bestLeft = c } else { cur += colSum[c] }
                if cur > maxSum {
                    maxSum = cur
                    res = []int{top, bestLeft, bottom, c}
                }
            }
        }
    }
    return res
}
```

```c [C]
// 行压缩+Kadane 在 C 中实现较长，逻辑同上：枚举上下界压缩列做最大子段和
```

```cpp [C++]
class Solution {
public:
    vector<int> getMaxMatrix(vector<vector<int>>& matrix) {
        int rows = matrix.size(), cols = matrix[0].size();
        vector<int> res(4, 0);
        int maxSum = INT_MIN;
        for (int top = 0; top < rows; top++) {
            vector<int> colSum(cols, 0);
            for (int bottom = top; bottom < rows; bottom++) {
                int cur = 0, bestLeft = 0;
                for (int c = 0; c < cols; c++) {
                    colSum[c] += matrix[bottom][c];
                    if (cur <= 0) { cur = colSum[c]; bestLeft = c; }
                    else cur += colSum[c];
                    if (cur > maxSum) {
                        maxSum = cur;
                        res = {top, bestLeft, bottom, c};
                    }
                }
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var getMaxMatrix = function(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    let res = [0,0,0,0], maxSum = -Infinity;
    for (let top = 0; top < rows; top++) {
        const colSum = new Array(cols).fill(0);
        for (let bottom = top; bottom < rows; bottom++) {
            let cur = 0, bestLeft = 0;
            for (let c = 0; c < cols; c++) {
                colSum[c] += matrix[bottom][c];
                if (cur <= 0) { cur = colSum[c]; bestLeft = c; }
                else cur += colSum[c];
                if (cur > maxSum) { maxSum = cur; res = [top, bestLeft, bottom, c]; }
            }
        }
    }
    return res;
};
```

```typescript [TypeScript]
function getMaxMatrix(matrix: number[][]): number[] {
    const rows = matrix.length, cols = matrix[0].length;
    let res = [0,0,0,0], maxSum = -Infinity;
    for (let top = 0; top < rows; top++) {
        const colSum = new Array(cols).fill(0);
        for (let bottom = top; bottom < rows; bottom++) {
            let cur = 0, bestLeft = 0;
            for (let c = 0; c < cols; c++) {
                colSum[c] += matrix[bottom][c];
                if (cur <= 0) { cur = colSum[c]; bestLeft = c; }
                else cur += colSum[c];
                if (cur > maxSum) { maxSum = cur; res = [top, bestLeft, bottom, c]; }
            }
        }
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(rows² · cols)`。
- **空间复杂度**：`O(cols)`（压缩数组）。

---

### 2.2 方法二：前缀和 + 全枚举

**1. 思路**

预处理二维前缀和，枚举所有 `(top,left,bottom,right)` 四元组，用前缀和 `O(1)` 求子矩阵和。复杂度 `O(rows² · cols²)`，仅适合极小矩阵。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] getMaxMatrix(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        int[][] pre = new int[rows + 1][cols + 1];
        for (int i = 1; i <= rows; i++)
            for (int j = 1; j <= cols; j++)
                pre[i][j] = matrix[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
        int maxSum = Integer.MIN_VALUE;
        int[] res = new int[4];
        for (int r1 = 1; r1 <= rows; r1++)
            for (int r2 = r1; r2 <= rows; r2++)
                for (int c1 = 1; c1 <= cols; c1++)
                    for (int c2 = c1; c2 <= cols; c2++) {
                        int s = pre[r2][c2] - pre[r1-1][c2] - pre[r2][c1-1] + pre[r1-1][c1-1];
                        if (s > maxSum) { maxSum = s; res = new int[]{r1-1, c1-1, r2-1, c2-1}; }
                    }
        return res;
    }
}
```

```python [Python]
class Solution:
    def getMaxMatrix(self, matrix: List[List[int]]) -> List[int]:
        rows, cols = len(matrix), len(matrix[0])
        pre = [[0]*(cols+1) for _ in range(rows+1)]
        for i in range(1, rows+1):
            for j in range(1, cols+1):
                pre[i][j] = matrix[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1]
        max_sum = float('-inf'); res = [0,0,0,0]
        for r1 in range(1, rows+1):
            for r2 in range(r1, rows+1):
                for c1 in range(1, cols+1):
                    for c2 in range(c1, cols+1):
                        s = pre[r2][c2] - pre[r1-1][c2] - pre[r2][c1-1] + pre[r1-1][c1-1]
                        if s > max_sum:
                            max_sum = s; res = [r1-1, c1-1, r2-1, c2-1]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> getMaxMatrix(vector<vector<int>>& matrix) {
        int rows = matrix.size(), cols = matrix[0].size();
        vector<vector<int>> pre(rows+1, vector<int>(cols+1, 0));
        for (int i = 1; i <= rows; i++)
            for (int j = 1; j <= cols; j++)
                pre[i][j] = matrix[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
        int maxSum = INT_MIN; vector<int> res(4, 0);
        for (int r1 = 1; r1 <= rows; r1++)
            for (int r2 = r1; r2 <= rows; r2++)
                for (int c1 = 1; c1 <= cols; c1++)
                    for (int c2 = c1; c2 <= cols; c2++) {
                        int s = pre[r2][c2] - pre[r1-1][c2] - pre[r2][c1-1] + pre[r1-1][c1-1];
                        if (s > maxSum) { maxSum = s; res = {r1-1, c1-1, r2-1, c2-1}; }
                    }
        return res;
    }
};
```

```javascript [JavaScript]
var getMaxMatrix = function(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    const pre = Array.from({length: rows+1}, () => new Array(cols+1).fill(0));
    for (let i = 1; i <= rows; i++)
        for (let j = 1; j <= cols; j++)
            pre[i][j] = matrix[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
    let maxSum = -Infinity; let res = [0,0,0,0];
    for (let r1 = 1; r1 <= rows; r1++)
        for (let r2 = r1; r2 <= rows; r2++)
            for (let c1 = 1; c1 <= cols; c1++)
                for (let c2 = c1; c2 <= cols; c2++) {
                    const s = pre[r2][c2] - pre[r1-1][c2] - pre[r2][c1-1] + pre[r1-1][c1-1];
                    if (s > maxSum) { maxSum = s; res = [r1-1, c1-1, r2-1, c2-1]; }
                }
    return res;
};
```

```typescript [TypeScript]
function getMaxMatrix(matrix: number[][]): number[] {
    const rows = matrix.length, cols = matrix[0].length;
    const pre = Array.from({length: rows+1}, () => new Array(cols+1).fill(0));
    for (let i = 1; i <= rows; i++)
        for (let j = 1; j <= cols; j++)
            pre[i][j] = matrix[i-1][j-1] + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
    let maxSum = -Infinity; let res = [0,0,0,0];
    for (let r1 = 1; r1 <= rows; r1++)
        for (let r2 = r1; r2 <= rows; r2++)
            for (let c1 = 1; c1 <= cols; c1++)
                for (let c2 = c1; c2 <= cols; c2++) {
                    const s = pre[r2][c2] - pre[r1-1][c2] - pre[r2][c1-1] + pre[r1-1][c1-1];
                    if (s > maxSum) { maxSum = s; res = [r1-1, c1-1, r2-1, c2-1]; }
                }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(rows² · cols²)`。
- **空间复杂度**：`O(rows · cols)`。

---

## 三、总结

| 方法           | 时间复杂度        | 空间复杂度 | 特点                       |
| -------------- | ----------------- | ---------- | -------------------------- |
| 行压缩+Kadane  | `O(rows²·cols)`   | `O(cols)`  | 最优，推荐                 |
| 前缀和全枚举   | `O(rows²·cols²)`  | `O(rows·cols)` | 直观，规模大超时         |

**推荐**：使用行压缩 + Kadane 最大子段和，将二维问题降为一维高效求解。
