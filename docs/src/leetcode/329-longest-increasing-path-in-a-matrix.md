# [329. 矩阵中的最长递增路径](https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/)

## 一、题目描述

给定一个 `m × n` 整数矩阵，求其中 **严格递增** 的最长路径长度（只能向上下左右移动，且下一个值必须严格大于当前值）。

**示例：**
```
输入：matrix = [[9,9,4],[6,6,8],[2,1,1]]
输出：4（路径 1→2→6→9 或 1→...，长度 4）
```

**提示：** `m == matrix.length`, `n == matrix[i].length`, `1 <= m,n <= 200`。

## 二、解答方法

### 方法一：记忆化 DFS（拓扑序 DP）

**思路：** 从每个点 DFS 求以它开头的最长递增路径 `dfs(r,c)`（只能走向更大的邻居）。记忆化 `memo[r][c]` 避免重复计算（因为「递增」保证无环，DP 合法）。答案 = 所有点 `dfs` 最大值。

:::::: code-group

```java [Java]
class Solution {
    private int[][] memo, g;
    private int m, n;
    private int[][] dir = {{1,0},{-1,0},{0,1},{0,-1}};
    public int longestIncreasingPath(int[][] matrix) {
        m = matrix.length; n = matrix[0].length; g = matrix;
        memo = new int[m][n];
        int ans = 0;
        for (int i=0;i<m;i++) for (int j=0;j<n;j++) ans = Math.max(ans, dfs(i, j));
        return ans;
    }
    int dfs(int r, int c) {
        if (memo[r][c] > 0) return memo[r][c];
        int best = 1;
        for (int[] d : dir) {
            int nr = r+d[0], nc = c+d[1];
            if (nr>=0&&nr<m&&nc>=0&&nc<n && g[nr][nc] > g[r][c])
                best = Math.max(best, 1 + dfs(nr, nc));
        }
        return memo[r][c] = best;
    }
}
```

```python [Python]
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        from functools import lru_cache
        m, n = len(matrix), len(matrix[0])
        @lru_cache(None)
        def dfs(r, c):
            best = 1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r+dr, c+dc
                if 0<=nr<m and 0<=nc<n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1+dfs(nr, nc))
            return best
        return max(dfs(i,j) for i in range(m) for j in range(n))
```

```cpp [C++]
class Solution {
    int m,n; vector<vector<int>> memo,g;
    int dir[4][2]={{1,0},{-1,0},{0,1},{0,-1}};
    int dfs(int r,int c){
        if(memo[r][c]>0) return memo[r][c];
        int best=1;
        for(auto&d:dir){
            int nr=r+d[0],nc=c+d[1];
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]>g[r][c])
                best=max(best,1+dfs(nr,nc));
        }
        return memo[r][c]=best;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix){
        g=matrix; m=matrix.size(); n=matrix[0].size();
        memo.assign(m,vector<int>(n,0));
        int ans=0;
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) ans=max(ans,dfs(i,j));
        return ans;
    }
};
```

```go [Go]
func longestIncreasingPath(matrix [][]int) int {
    m, n := len(matrix), len(matrix[0])
    memo := make([][]int, m); for i := range memo { memo[i] = make([]int, n) }
    dirs := [][]int{{1,0},{-1,0},{0,1},{0,-1}}
    var dfs func(int, int) int
    dfs = func(r, c int) int {
        if memo[r][c] > 0 { return memo[r][c] }
        best := 1
        for _, d := range dirs {
            nr, nc := r+d[0], c+d[1]
            if nr>=0&&nr<m&&nc>=0&&nc<n && matrix[nr][nc] > matrix[r][c] {
                if v := 1+dfs(nr, nc); v > best { best = v }
            }
        }
        memo[r][c] = best; return best
    }
    ans := 0
    for i := 0; i < m; i++ { for j := 0; j < n; j++ { if v := dfs(i,j); v > ans { ans = v } } }
    return ans
}
```

```js [JavaScript]
var longestIncreasingPath = function (matrix) {
    const m=matrix.length, n=matrix[0].length;
    const memo=Array.from({length:m},()=>new Array(n).fill(0));
    const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    const dfs=(r,c)=>{
        if(memo[r][c]>0) return memo[r][c];
        let best=1;
        for(const [dr,dc] of dirs){
            const nr=r+dr,nc=c+dc;
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&matrix[nr][nc]>matrix[r][c])
                best=Math.max(best,1+dfs(nr,nc));
        }
        return memo[r][c]=best;
    };
    let ans=0;
    for(let i=0;i<m;i++) for(let j=0;j<n;j++) ans=Math.max(ans,dfs(i,j));
    return ans;
};
```

::::::

**复杂度：** 时间 `O(mn)`，空间 `O(mn)`。

## 三、总结

记忆化 DFS 是标准解（「出度 DP」）。严格递增保证无环，所以 memo 安全。也可视为「拓扑排序求 DAG 最长路」（按值排序后 DP）。注意 memo 初始 0 表示未算、结果 ≥1。同类：`104 二叉树最大深度`、`98` 之外，本题是网格版 LIS。
