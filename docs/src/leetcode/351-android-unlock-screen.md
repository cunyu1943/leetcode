# [351. 安卓系统解锁图案](https://leetcode.cn/problems/android-unlock-patterns/) [🔒 会员题]

## 一、题目描述

安卓 `3×3` 解锁图案：用 `1~9` 连接点，手指从一个点滑到另一个点，若两点 **中间还有未访问的点** 则不允许跳过（除非中间点已访问）。给定最小长度 `m`、最大长度 `n`，求所有可能的合法图案数量（`m <= 长度 <= n`）。

**示例：**
```
输入：m = 1, n = 1   输出：9（只用 1 个点，9 种）
输入：m = 1, n = 2   输出：65
```

**提示：** `1 <= m <= n <= 9`。

## 二、解答方法

### 方法一：DFS + 跳过规则表

**思路：** 9 个点编号 1~9。预计算「跨过点跳跃表」`skip[a][b]`：若 a、b 之间隔了某点 k（且 k 未访问），则不能直接连。DFS 从每个起点出发，尝试连向所有未访问点，若 `skip[a][b]==0 || 已访问skip[a][b]` 则合法。统计长度在 `[m,n]` 的路径数。

:::::: code-group

```java [Java]
class Solution {
    public int numberOfPatterns(int m, int n) {
        int[][] skip = new int[10][10];
        skip[1][3]=skip[3][1]=2; skip[1][7]=skip[7][1]=4; skip[3][9]=skip[9][3]=6; skip[7][9]=skip[9][7]=8;
        skip[1][9]=skip[9][1]=skip[3][7]=skip[7][3]=5;
        boolean[] vis = new boolean[10];
        int ans = 0;
        for (int len = m; len <= n; len++) {
            ans += dfs(1, len, vis, skip) * 4;   // 1,3,7,9 对称
            ans += dfs(2, len, vis, skip) * 4;   // 2,4,6,8 对称
            ans += dfs(5, len, vis, skip);        // 中心
        }
        return ans;
    }
    int dfs(int u, int len, boolean[] vis, int[][] skip) {
        if (len == 1) return 1;
        vis[u] = true; int cnt = 0;
        for (int v = 1; v <= 9; v++) {
            int k = skip[u][v];
            if (!vis[v] && (k == 0 || vis[k])) cnt += dfs(v, len - 1, vis, skip);
        }
        vis[u] = false;
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def numberOfPatterns(self, m: int, n: int) -> int:
        skip = [[0]*10 for _ in range(10)]
        for a,b,k in [(1,3,2),(1,7,4),(3,9,6),(7,9,8),(1,9,5),(3,7,5)]:
            skip[a][b]=skip[b][a]=k
        vis=[False]*10
        def dfs(u, length):
            if length==1: return 1
            vis[u]=True; cnt=0
            for v in range(1,10):
                k=skip[u][v]
                if not vis[v] and (k==0 or vis[k]): cnt+=dfs(v,length-1)
            vis[u]=False
            return cnt
        ans=0
        for length in range(m,n+1):
            ans += dfs(1,length)*4 + dfs(2,length)*4 + dfs(5,length)
        return ans
```

```cpp [C++]
class Solution {
    int skip[10][10]={0};
    bool vis[10]={false};
    int dfs(int u,int len){
        if(len==1) return 1;
        vis[u]=true; int cnt=0;
        for(int v=1;v<=9;v++){ int k=skip[u][v]; if(!vis[v]&&(k==0||vis[k])) cnt+=dfs(v,len-1); }
        vis[u]=false; return cnt;
    }
public:
    int numberOfPatterns(int m,int n){
        skip[1][3]=skip[3][1]=2; skip[1][7]=skip[7][1]=4; skip[3][9]=skip[9][3]=6; skip[7][9]=skip[9][7]=8;
        skip[1][9]=skip[9][1]=skip[3][7]=skip[7][3]=5;
        int ans=0;
        for(int len=m;len<=n;len++) ans += dfs(1,len)*4 + dfs(2,len)*4 + dfs(5,len);
        return ans;
    }
};
```

```go [Go]
func numberOfPatterns(m, n int) int {
    skip := [10][10]int{}
    pairs := [][3]int{{1,3,2},{1,7,4},{3,9,6},{7,9,8},{1,9,5},{3,7,5}}
    for _, p := range pairs { skip[p[0]][p[1]]=p[2]; skip[p[1]][p[0]]=p[2] }
    vis := [10]bool{}
    var dfs func(int,int) int
    dfs = func(u, length int) int {
        if length==1 { return 1 }
        vis[u]=true; cnt:=0
        for v:=1; v<=9; v++ {
            k:=skip[u][v]
            if !vis[v] && (k==0 || vis[k]) { cnt += dfs(v, length-1) }
        }
        vis[u]=false; return cnt
    }
    ans := 0
    for length:=m; length<=n; length++ { ans += dfs(1,length)*4 + dfs(2,length)*4 + dfs(5,length) }
    return ans
}
```

```js [JavaScript]
var numberOfPatterns = function (m, n) {
    const skip = Array.from({length:10},()=>new Array(10).fill(0));
    [[1,3,2],[1,7,4],[3,9,6],[7,9,8],[1,9,5],[3,7,5]].forEach(([a,b,k])=>{skip[a][b]=skip[b][a]=k;});
    const vis = new Array(10).fill(false);
    const dfs = (u, length) => {
        if (length===1) return 1;
        vis[u]=true; let cnt=0;
        for (let v=1;v<=9;v++){ const k=skip[u][v]; if(!vis[v]&&(k===0||vis[k])) cnt+=dfs(v,length-1); }
        vis[u]=false; return cnt;
    };
    let ans=0;
    for (let length=m; length<=n; length++) ans += dfs(1,length)*4 + dfs(2,length)*4 + dfs(5,length);
    return ans;
};
```

::::::

**复杂度：** 时间 `O(9!)` 量级（剪枝后很小），空间 `O(1)`。

## 三、总结

回溯 + 对称性优化（4 角、4 边、1 中心各算一次乘 4/4/1）。关键是 `skip` 表：跨点必须中间点已访问。本题是组合回溯经典，注意不能用「位运算 1<<v」表示访问（此处用 `vis` 数组即可）。结果可能很大但 n≤9 安全。进阶：考虑不同起点的对称性减少重复 DFS。
