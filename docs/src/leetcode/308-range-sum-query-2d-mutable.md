# [308. 二维区域和检索 - 可变](https://leetcode.cn/problems/range-sum-query-2d-mutable/) [🔒 会员题]

## 一、题目描述

给定二维矩阵，支持：① `update(row, col, val)` 把某格更新为新值；② `sumRegion(row1, col1, row2, col2)` 求子矩阵和。矩阵可频繁修改。

**示例：**
```
输入：matrix = [[3,0,1,2],[4,5,6,7]]
update(0,1,5) → 矩阵变 [[3,5,1,2],...]
sumRegion(0,0,1,1) = 12（3+5+4+5）
```

**提示：** `m == matrix.length`, `n == matrix[i].length`, `1 <= m,n <= 500`，最多 `10⁴` 次操作。

## 二、解答方法

### 方法一：二维树状数组（2D Fenwick）

**思路：** 把一维 BIT 推广为二维：每个点维护一个矩形前缀和。`add(r,c,delta)` 双层循环 `i += lowbit(i)`；`query(r,c)` 求 `(0,0)` 到 `(r,c)` 的和，再容斥得子矩阵和。注意下标从 1 开始。

:::::: code-group

```java [Java]
class NumMatrix {
    private int[][] tree, matrix;
    private int m, n;
    private int lowbit(int x) { return x & -x; }
    private void add(int r, int c, int v) {
        for (int i = r; i <= m; i += lowbit(i))
            for (int j = c; j <= n; j += lowbit(j)) tree[i][j] += v;
    }
    private int query(int r, int c) {
        int s = 0;
        for (int i = r; i > 0; i -= lowbit(i))
            for (int j = c; j > 0; j -= lowbit(j)) s += tree[i][j];
        return s;
    }
    public NumMatrix(int[][] matrix) {
        m = matrix.length; n = matrix[0].length;
        this.matrix = new int[m][n]; tree = new int[m + 1][n + 1];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) update(i, j, matrix[i][j]);
    }
    public void update(int row, int col, int val) {
        int d = val - matrix[row][col]; matrix[row][col] = val; add(row+1, col+1, d);
    }
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return query(r2+1, c2+1) - query(r1, c2+1) - query(r2+1, c1) + query(r1, c1);
    }
}
```

```python [Python]
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        self.m, self.n = len(matrix), len(matrix[0])
        self.matrix = [[0]*self.n for _ in range(self.m)]
        self.tree = [[0]*(self.n+1) for _ in range(self.m+1)]
        for i in range(self.m):
            for j in range(self.n): self.update(i, j, matrix[i][j])
    def _lowbit(self, x): return x & -x
    def _add(self, r, c, v):
        i = r
        while i <= self.m:
            j = c
            while j <= self.n: self.tree[i][j] += v; j += self._lowbit(j)
            i += self._lowbit(i)
    def _query(self, r, c):
        s = 0; i = r
        while i > 0:
            j = c
            while j > 0: s += self.tree[i][j]; j -= self._lowbit(j)
            i -= self._lowbit(i)
        return s
    def update(self, row: int, col: int, val: int) -> None:
        d = val - self.matrix[row][col]; self.matrix[row][col] = val; self._add(row+1, col+1, d)
    def sumRegion(self, r1: int, c1: int, r2: int, c2: int) -> int:
        return self._query(r2+1,c2+1) - self._query(r1,c2+1) - self._query(r2+1,c1) + self._query(r1,c1)
```

```cpp [C++]
class NumMatrix {
    vector<vector<int>> tree, mat; int m, n;
    int lb(int x){ return x & -x; }
    void add(int r,int c,int v){ for(int i=r;i<=m;i+=lb(i)) for(int j=c;j<=n;j+=lb(j)) tree[i][j]+=v; }
    int query(int r,int c){ int s=0; for(int i=r;i>0;i-=lb(i)) for(int j=c;j>0;j-=lb(j)) s+=tree[i][j]; return s; }
public:
    NumMatrix(vector<vector<int>>& matrix) {
        m=matrix.size(); n=matrix[0].size(); mat=matrix;
        tree.assign(m+1, vector<int>(n+1,0));
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) add(i+1,j+1,matrix[i][j]);
    }
    void update(int row,int col,int val){ int d=val-mat[row][col]; mat[row][col]=val; add(row+1,col+1,d); }
    int sumRegion(int r1,int c1,int r2,int c2){ return query(r2+1,c2+1)-query(r1,c2+1)-query(r2+1,c1)+query(r1,c1); }
};
```

```go [Go]
type NumMatrix struct { tree, mat [][]int; m, n int }
func (n NumMatrix) lb(x int) int { return x & -x }
func (n *NumMatrix) add(r, c, v int) { for i:=r; i<=n.m; i+=n.lb(i) { for j:=c; j<=n.n; j+=n.lb(j) { n.tree[i][j]+=v } } }
func (n NumMatrix) query(r, c int) int { s:=0; for i:=r; i>0; i-=n.lb(i) { for j:=c; j>0; j-=n.lb(j) { s+=n.tree[i][j] } }; return s }
func Constructor(matrix [][]int) NumMatrix {
    m, n := len(matrix), len(matrix[0])
    nm := NumMatrix{m:m, n:n, mat: make([][]int, m), tree: make([][]int, m+1)}
    for i := range nm.tree { nm.tree[i] = make([]int, n+1) }
    for i := 0; i < m; i++ { nm.mat[i] = make([]int, n); for j := 0; j < n; j++ { nm.mat[i][j] = matrix[i][j]; nm.add(i+1, j+1, matrix[i][j]) } }
    return nm
}
func (n *NumMatrix) Update(row, col, val int) { d := val - n.mat[row][col]; n.mat[row][col]=val; n.add(row+1, col+1, d) }
func (n NumMatrix) SumRegion(r1, c1, r2, c2 int) int {
    return n.query(r2+1,c2+1) - n.query(r1,c2+1) - n.query(r2+1,c1) + n.query(r1,c1)
}
```

```js [JavaScript]
var NumMatrix = function (matrix) {
    this.m = matrix.length; this.n = matrix[0].length;
    this.mat = matrix.map(r => r.slice());
    this.tree = Array.from({length: this.m+1}, () => new Array(this.n+1).fill(0));
    for (let i=0;i<this.m;i++) for (let j=0;j<this.n;j++) this._add(i+1, j+1, matrix[i][j]);
};
NumMatrix.prototype._lb = function (x) { return x & -x; };
NumMatrix.prototype._add = function (r, c, v) {
    for (let i=r; i<=this.m; i+=this._lb(i)) for (let j=c; j<=this.n; j+=this._lb(j)) this.tree[i][j] += v;
};
NumMatrix.prototype._query = function (r, c) {
    let s=0; for (let i=r; i>0; i-=this._lb(i)) for (let j=c; j>0; j-=this._lb(j)) s += this.tree[i][j]; return s;
};
NumMatrix.prototype.update = function (row, col, val) { const d = val - this.mat[row][col]; this.mat[row][col]=val; this._add(row+1, col+1, d); };
NumMatrix.prototype.sumRegion = function (r1, c1, r2, c2) {
    return this._query(r2+1,c2+1) - this._query(r1,c2+1) - this._query(r2+1,c1) + this._query(r1,c1);
};
```

::::::

**复杂度：** 构造 `O(mn log m log n)`，更新/查询 `O(log m log n)`，空间 `O(mn)`。

## 三、总结

可变矩阵的区间和 = 二维树状数组（或二维线段树）。`304` 是不可变二维前缀和（O(1)），本题可变必须上 BIT。二维 BIT 的 `add`/`query` 都是两层 `lowbit` 循环。下标统一 +1 从 1 计数，容斥公式与 `304` 一致。
