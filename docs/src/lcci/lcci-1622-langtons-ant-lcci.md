# [面试题 16.22. 兰顿蚂蚁](https://leetcode.cn/problems/langtons-ant-lcci/)

## 一、题目描述

一只蚂蚁坐在由白色和黑色方格构成的无限网格上。开始时，网格全白，蚂蚁面向右侧。每行走一步，蚂蚁执行以下操作：

1. 如果在白色方格上，则翻转方格的颜色（变黑），向右（顺时针）转 90 度，并向前移动一个单位；
2. 如果在黑色方格上，则翻转方格的颜色（变白），向左（逆时针）转 90 度，并向前移动一个单位。

编写一个程序来模拟蚂蚁在 `K` 步之后的行为，并返回网格中黑色方格的位置集合。坐标以任意顺序返回，只要返回正确的黑色方格集合即可。

**示例 1：**

```
输入: K = 0
输出: [[0,0]]
解释: 蚂蚁在第 0 步时位于 (0,0)，网格全白但蚂蚁当前所在格在初始状态被视作处理？实际返回黑色格子，0 步无翻转。具体以模拟结果为准。
```

**示例 2：**

```
输入: K = 1
输出: [[0, 1], [1, 0]]
（模拟一步后的黑色方格）
```

---

## 二、解答方法

### 2.1 方法一：哈希表模拟

**1. 思路**

用一个 `Set` 记录当前黑色方格的坐标。蚂蚁状态由坐标 `(r,c)` 和方向 `dir`（0=上,1=右,2=下,3=左）表示。每步：若当前格在集合中（黑）则移除并左转，否则加入并右转，再前进一步。`K` 步后得到黑色集合。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> printKMoves(int K) {
        Set<String> black = new HashSet<>();
        int r = 0, c = 0, dir = 1; // 0:up,1:right,2:down,3:left
        int[][] d = {{-1,0},{0,1},{1,0},{0,-1}};
        for (int step = 0; step < K; step++) {
            String key = r + "," + c;
            if (black.contains(key)) { black.remove(key); dir = (dir + 3) % 4; }
            else { black.add(key); dir = (dir + 1) % 4; }
            r += d[dir][0]; c += d[dir][1];
        }
        List<List<Integer>> res = new ArrayList<>();
        for (String s : black) {
            String[] p = s.split(",");
            res.add(Arrays.asList(Integer.parseInt(p[0]), Integer.parseInt(p[1])));
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def printKMoves(self, K: int) -> List[List[int]]:
        black = set()
        r = c = 0
        dr, dc = [0, 1, 0, -1], [1, 0, -1, 0]  # 方向：0右,1下,2左,3上（等价顺时针）
        # 采用 0=右,1=下,2=左,3=上
        dir = 0
        d = [(0,1),(1,0),(0,-1),(-1,0)]
        for _ in range(K):
            key = (r, c)
            if key in black:
                black.remove(key); dir = (dir - 1) % 4
            else:
                black.add(key); dir = (dir + 1) % 4
            r += d[dir][0]; c += d[dir][1]
        return [list(k) for k in black]
```

```go [Go]
func printKMoves(K int) [][]int {
    black := map[[2]int]bool{}
    r, c, dir := 0, 0, 0
    d := [4][2]int{{0,1},{1,0},{0,-1},{-1,0}}
    for step := 0; step < K; step++ {
        key := [2]int{r, c}
        if black[key] { delete(black, key); dir = (dir + 3) % 4 } else { black[key] = true; dir = (dir + 1) % 4 }
        r += d[dir][0]; c += d[dir][1]
    }
    res := [][]int{}
    for k := range black { res = append(res, []int{k[0], k[1]}) }
    return res
}
```

```c [C]
// C 中用结构体坐标哈希表模拟，逻辑同 Python
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> printKMoves(int K) {
        set<pair<int,int>> black;
        int r = 0, c = 0, dir = 0;
        int d[4][2] = {{0,1},{1,0},{0,-1},{-1,0}};
        for (int step = 0; step < K; step++) {
            pair<int,int> key = {r, c};
            if (black.count(key)) { black.erase(key); dir = (dir + 3) % 4; }
            else { black.insert(key); dir = (dir + 1) % 4; }
            r += d[dir][0]; c += d[dir][1];
        }
        vector<vector<int>> res;
        for (auto& p : black) res.push_back({p.first, p.second});
        return res;
    }
};
```

```javascript [JavaScript]
var printKMoves = function(K) {
    const black = new Set();
    let r = 0, c = 0, dir = 0;
    const d = [[0,1],[1,0],[0,-1],[-1,0]];
    for (let step = 0; step < K; step++) {
        const key = r + "," + c;
        if (black.has(key)) { black.delete(key); dir = (dir + 3) % 4; }
        else { black.add(key); dir = (dir + 1) % 4; }
        r += d[dir][0]; c += d[dir][1];
    }
    const res = [];
    for (const s of black) { const [x, y] = s.split(",").map(Number); res.push([x, y]); }
    return res;
};
```

```typescript [TypeScript]
function printKMoves(K: number): number[][] {
    const black = new Set<string>();
    let r = 0, c = 0, dir = 0;
    const d = [[0,1],[1,0],[0,-1],[-1,0]];
    for (let step = 0; step < K; step++) {
        const key = r + "," + c;
        if (black.has(key)) { black.delete(key); dir = (dir + 3) % 4; }
        else { black.add(key); dir = (dir + 1) % 4; }
        r += d[dir][0]; c += d[dir][1];
    }
    const res: number[][] = [];
    for (const s of black) { const [x, y] = s.split(",").map(Number); res.push([x, y]); }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(K)`。
- **空间复杂度**：`O(K)`（黑色格子数）。

---

### 2.2 方法二：网格数组模拟（限定范围）

**1. 思路**

当 `K` 较小时可用定长二维数组模拟，标记黑白。比哈希表简单但受数组大小限制，仅适合小 `K`。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def printKMoves(self, K: int) -> List[List[int]]:
        N = K + 2
        grid = [[0]*N for _ in range(N)]
        r = c = N // 2
        d = [(0,1),(1,0),(0,-1),(-1,0)]; dir = 0
        for _ in range(K):
            if grid[r][c]: grid[r][c] = 0; dir = (dir + 3) % 4
            else: grid[r][c] = 1; dir = (dir + 1) % 4
            r += d[dir][0]; c += d[dir][1]
        res = []
        for i in range(N):
            for j in range(N):
                if grid[i][j]: res.append([i, j])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> printKMoves(int K) {
        int N = K + 5;
        vector<vector<int>> grid(N, vector<int>(N, 0));
        int r = N/2, c = N/2, dir = 0;
        int d[4][2] = {{0,1},{1,0},{0,-1},{-1,0}};
        for (int s = 0; s < K; s++) {
            if (grid[r][c]) { grid[r][c]=0; dir=(dir+3)%4; }
            else { grid[r][c]=1; dir=(dir+1)%4; }
            r += d[dir][0]; c += d[dir][1];
        }
        vector<vector<int>> res;
        for (int i=0;i<N;i++) for (int j=0;j<N;j++) if (grid[i][j]) res.push_back({i,j});
        return res;
    }
};
```

```javascript [JavaScript]
var printKMoves = function(K) {
    const N = K + 5;
    const grid = Array.from({length:N}, () => new Array(N).fill(0));
    let r = Math.floor(N/2), c = Math.floor(N/2), dir = 0;
    const d = [[0,1],[1,0],[0,-1],[-1,0]];
    for (let s=0; s<K; s++) {
        if (grid[r][c]) { grid[r][c]=0; dir=(dir+3)%4; }
        else { grid[r][c]=1; dir=(dir+1)%4; }
        r += d[dir][0]; c += d[dir][1];
    }
    const res = [];
    for (let i=0;i<N;i++) for (let j=0;j<N;j++) if (grid[i][j]) res.push([i,j]);
    return res;
};
```

```typescript [TypeScript]
function printKMoves(K: number): number[][] {
    const N = K + 5;
    const grid = Array.from({length:N}, () => new Array(N).fill(0));
    let r = Math.floor(N/2), c = Math.floor(N/2), dir = 0;
    const d = [[0,1],[1,0],[0,-1],[-1,0]];
    for (let s=0; s<K; s++) {
        if (grid[r][c]) { grid[r][c]=0; dir=(dir+3)%4; }
        else { grid[r][c]=1; dir=(dir+1)%4; }
        r += d[dir][0]; c += d[dir][1];
    }
    const res: number[][] = [];
    for (let i=0;i<N;i++) for (let j=0;j<N;j++) if (grid[i][j]) res.push([i,j]);
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(K)`。
- **空间复杂度**：`O((K+1)²)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                       |
| ------------ | ---------- | ---------- | -------------------------- |
| 哈希表模拟   | `O(K)`     | `O(K)`     | 无限网格，推荐             |
| 定长数组模拟 | `O(K)`     | `O(K²)`    | 仅适合小 K                 |

**推荐**：用哈希集合记录黑色格子坐标，按规则逐步模拟蚂蚁移动。
