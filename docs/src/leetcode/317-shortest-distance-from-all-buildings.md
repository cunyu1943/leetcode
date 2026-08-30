# [317. 离建筑物最近的距离](https://leetcode.cn/problems/shortest-distance-from-all-buildings/) [🔒 会员题]

## 一、题目描述

给定一个 `m × n` 的网格，其中 `0` 表示空地、`1` 表示建筑、`2` 表示障碍。找到一块空地，使其到 **所有建筑** 的曼哈顿距离之和最小，返回该最小总距离。若无法到达所有建筑（被障碍隔断），返回 -1。

**示例：**
```
输入：grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
输出：7
解释：选 (1,2) 空地，到 3 栋建筑距离和 = 3+1+3 = 7 最小
```

**提示：** `m == grid.length`, `n == grid[i].length`, `1 <= m, n <= 50`。

## 二、解答方法

### 方法一：从每个建筑 BFS 累加距离

**思路：** 对每栋建筑（值为 1）做 BFS，把到各空地的距离累加到 `dist[r][c]`，同时用 `reach[r][c]` 记录能到达该空地的建筑数量。最后遍历所有空地，取 `reach == 建筑总数` 中 `dist` 最小的。优化：从剩余建筑数最少的行/列建筑开始 BFS，一旦可达建筑数 < 已遍历建筑数可提前剪枝。

:::::: code-group

```java [Java]
class Solution {
    public int shortestDistance(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dist = new int[m][n], reach = new int[m][n];
        int buildings = 0;
        for (int i=0;i<m;i++) for (int j=0;j<n;j++) if (grid[i][j]==1) buildings++;
        int[][] dir = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int i=0;i<m;i++) for (int j=0;j<n;j++) {
            if (grid[i][j] != 1) continue;
            int[][] seen = new int[m][n];
            Queue<int[]> q = new LinkedList<>(); q.offer(new int[]{i,j});
            int step = 0;
            while (!q.isEmpty()) {
                int sz = q.size();
                step++;
                for (int t=0;t<sz;t++) {
                    int[] cur = q.poll();
                    for (int[] d : dir) {
                        int nr=cur[0]+d[0], nc=cur[1]+d[1];
                        if (nr>=0&&nr<m&&nc>=0&&nc<n && grid[nr][nc]==0 && seen[nr][nc]==0) {
                            seen[nr][nc]=1; dist[nr][nc]+=step; reach[nr][nc]++;
                            q.offer(new int[]{nr,nc});
                        }
                    }
                }
            }
        }
        int ans = Integer.MAX_VALUE;
        for (int i=0;i<m;i++) for (int j=0;j<n;j++)
            if (grid[i][j]==0 && reach[i][j]==buildings) ans = Math.min(ans, dist[i][j]);
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
```

```python [Python]
class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dist = [[0]*n for _ in range(m)]
        reach = [[0]*n for _ in range(m)]
        buildings = sum(row.count(1) for row in grid)
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        for i in range(m):
            for j in range(n):
                if grid[i][j] != 1: continue
                seen = [[False]*n for _ in range(m)]
                q = deque([(i,j,0)])
                while q:
                    r,c,step = q.popleft()
                    for dr,dc in dirs:
                        nr,nc = r+dr,c+dc
                        if 0<=nr<m and 0<=nc<n and grid[nr][nc]==0 and not seen[nr][nc]:
                            seen[nr][nc]=True; dist[nr][nc]+=step+1; reach[nr][nc]+=1
                            q.append((nr,nc,step+1))
        ans = inf
        for i in range(m):
            for j in range(n):
                if grid[i][j]==0 and reach[i][j]==buildings: ans=min(ans,dist[i][j])
        return -1 if ans==inf else ans
```

```cpp [C++]
class Solution {
public:
    int shortestDistance(vector<vector<int>>& grid) {
        int m=grid.size(), n=grid[0].size();
        vector<vector<int>> dist(m,vector<int>(n,0)), reach(m,vector<int>(n,0));
        int buildings=0; for(auto&row:grid) for(int v:row) if(v==1) buildings++;
        int dir[4][2]={{1,0},{-1,0},{0,1},{0,-1}};
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) {
            if(grid[i][j]!=1) continue;
            vector<vector<bool>> seen(m,vector<bool>(n,false));
            queue<pair<int,int>> q; q.push({i,j}); int step=0;
            while(!q.empty()){
                int sz=q.size(); step++;
                while(sz--){
                    auto [r,c]=q.front(); q.pop();
                    for(auto&d:dir){
                        int nr=r+d[0],nc=c+d[1];
                        if(nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]==0&&!seen[nr][nc]){
                            seen[nr][nc]=true; dist[nr][nc]+=step; reach[nr][nc]++; q.push({nr,nc});
                        }
                    }
                }
            }
        }
        int ans=INT_MAX;
        for(int i=0;i<m;i++) for(int j=0;j<n;j++)
            if(grid[i][j]==0&&reach[i][j]==buildings) ans=min(ans,dist[i][j]);
        return ans==INT_MAX?-1:ans;
    }
};
```

```go [Go]
func shortestDistance(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dist := make([][]int, m); reach := make([][]int, m)
    for i := range dist { dist[i] = make([]int, n); reach[i] = make([]int, n) }
    buildings := 0
    for _, row := range grid { for _, v := range row { if v == 1 { buildings++ } } }
    dirs := [][]int{{1,0},{-1,0},{0,1},{0,-1}}
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] != 1 { continue }
            seen := make([][]bool, m); for r := range seen { seen[r] = make([]bool, n) }
            q := [][3]int{{i,j,0}}
            for len(q) > 0 {
                r,c,step := q[0][0],q[0][1],q[0][2]; q = q[1:]
                for _, d := range dirs {
                    nr,nc := r+d[0],c+d[1]
                    if nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]==0&&!seen[nr][nc] {
                        seen[nr][nc]=true; dist[nr][nc]+=step+1; reach[nr][nc]++; q=append(q,[3]int{nr,nc,step+1})
                    }
                }
            }
        }
    }
    ans := 1<<30
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j]==0 && reach[i][j]==buildings && dist[i][j] < ans { ans = dist[i][j] }
        }
    }
    if ans == 1<<30 { return -1 }
    return ans
}
```

```js [JavaScript]
var shortestDistance = function (grid) {
    const m=grid.length, n=grid[0].length;
    const dist=Array.from({length:m},()=>new Array(n).fill(0));
    const reach=Array.from({length:m},()=>new Array(n).fill(0));
    let buildings=0; for(const row of grid) for(const v of row) if(v===1) buildings++;
    const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    for(let i=0;i<m;i++) for(let j=0;j<n;j++){
        if(grid[i][j]!==1) continue;
        const seen=Array.from({length:m},()=>new Array(n).fill(false));
        let q=[[i,j,0]];
        while(q.length){
            const [r,c,step]=q.shift();
            for(const [dr,dc] of dirs){
                const nr=r+dr,nc=c+dc;
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]===0&&!seen[nr][nc]){
                    seen[nr][nc]=true; dist[nr][nc]+=step+1; reach[nr][nc]++; q.push([nr,nc,step+1]);
                }
            }
        }
    }
    let ans=Infinity;
    for(let i=0;i<m;i++) for(let j=0;j<n;j++) if(grid[i][j]===0&&reach[i][j]===buildings) ans=Math.min(ans,dist[i][j]);
    return ans===Infinity?-1:ans;
};
```

::::::

**复杂度：** 时间 `O(k·m·n)`（k=建筑数），空间 `O(mn)`。

## 三、总结

多源 BFS 求和的变体：每个建筑做一次 BFS，累加到可达空地。必须用 `reach` 校验「能到达所有建筑」，否则被障碍隔断的空地不能选（返回 -1）。可优化：只从建筑 BFS，对每个空地统计总距离与可达数。对比 `296 最佳碰头地点`（只有房子、单源中位数），本题多源且含障碍。从建筑少的一侧起步可剪枝。
