# [311. 稀疏矩阵乘法](https://leetcode.cn/problems/sparse-matrix-multiplication/) [🔒 会员题]

## 一、题目描述

给定两个 **稀疏矩阵** `mat1`（m×k）和 `mat2`（k×n），返回它们的乘积 `mat3 = mat1 × mat2`。稀疏矩阵指大部分元素为 0。请利用稀疏性优化。

**示例：**
```
输入：mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
输出：[[7,0,0],[-7,0,3]]
```

**提示：** `m == mat1.length`, `k == mat1[0].length == mat2.length`, `n == mat2[0].length`，`1 <= m,k,n <= 100`，`-100 <= 元素 <= 100`，非零元素很少。

## 二、解答方法

### 方法一：跳过零元素的三重循环

**思路：** 标准矩阵乘 `C[i][j] += A[i][r]*B[r][j]`。优化：只遍历 `A[i][r] != 0` 的位置，再叠加对应 `B[r][j]`（跳过 `B[r][j]==0`）。可预处理 `B` 每行的非零列，或直接计算。

:::::: code-group

```java [Java]
class Solution {
    public int[][] multiply(int[][] mat1, int[][] mat2) {
        int m = mat1.length, k = mat2.length, n = mat2[0].length;
        int[][] res = new int[m][n];
        for (int i = 0; i < m; i++)
            for (int r = 0; r < k; r++) {
                if (mat1[i][r] == 0) continue;            // 跳过零
                for (int j = 0; j < n; j++) {
                    if (mat2[r][j] != 0) res[i][j] += mat1[i][r] * mat2[r][j];
                }
            }
        return res;
    }
}
```

```python [Python]
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        m, k, n = len(mat1), len(mat2), len(mat2[0])
        res = [[0]*n for _ in range(m)]
        for i in range(m):
            for r in range(k):
                if mat1[i][r] == 0: continue
                for j in range(n):
                    if mat2[r][j]: res[i][j] += mat1[i][r] * mat2[r][j]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> multiply(vector<vector<int>>& mat1, vector<vector<int>>& mat2) {
        int m=mat1.size(), k=mat2.size(), n=mat2[0].size();
        vector<vector<int>> res(m, vector<int>(n,0));
        for(int i=0;i<m;i++) for(int r=0;r<k;r++){
            if(mat1[i][r]==0) continue;
            for(int j=0;j<n;j++) if(mat2[r][j]!=0) res[i][j]+=mat1[i][r]*mat2[r][j];
        }
        return res;
    }
};
```

```go [Go]
func multiply(mat1 [][]int, mat2 [][]int) [][]int {
    m, k, n := len(mat1), len(mat2), len(mat2[0])
    res := make([][]int, m)
    for i := range res { res[i] = make([]int, n) }
    for i := 0; i < m; i++ {
        for r := 0; r < k; r++ {
            if mat1[i][r] == 0 { continue }
            for j := 0; j < n; j++ {
                if mat2[r][j] != 0 { res[i][j] += mat1[i][r] * mat2[r][j] }
            }
        }
    }
    return res
}
```

```js [JavaScript]
var multiply = function (mat1, mat2) {
    const m = mat1.length, k = mat2.length, n = mat2[0].length;
    const res = Array.from({length: m}, () => new Array(n).fill(0));
    for (let i=0;i<m;i++) for (let r=0;r<k;r++) {
        if (mat1[i][r] === 0) continue;
        for (let j=0;j<n;j++) if (mat2[r][j] !== 0) res[i][j] += mat1[i][r]*mat2[r][j];
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(m·k·n)`（跳过零后实际与非零数相关），空间 `O(m·n)`。

## 三、总结

稀疏矩阵乘的核心就是 **跳过零元素**，避免无效乘法。可进一步预处理 `mat2` 每行的「非零列索引+值」列表，使内层只遍历非零列；或用「行压缩存储（CSR）」。本题是分块/CSR 优化的基础，面试常考空间换时间。
