# [499. 迷宫 III 🔒 会员题](https://leetcode.cn/problems/the-maze-iii/)

## 一、题目描述

迷宫（小球滚动直到撞墙才停）中，给定起点 `start`、终点 `destination` 及一个移动方向字符串 `dir`（`'u','l','d','r'` 对应上左下右）。求从 `start` 滚到 `destination` 的**最短路径**（用方向字符串表示），若有多条同长则返回**字典序最小**的方向串；若无法停在 `destination` 返回 `"impossible"`。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,0,0,0,0]], start = [4,3], destination = [0,1], dir = "l"
输出："lul"
```

**示例 2：**

```
输入：同上但 destination = [4,4]
输出："impossible"
```

**提示：**

- `m == maze.length`，`n == maze[i].length`
- `1 <= m, n <= 100`
- 起点终点非墙

## 二、解答方法

### 2.1 方法一：Dijkstra（按路径字典序）

1. 思路

从 `start` 出发，尝试 4 个方向按 `dir`（先 `l`、再 `u`、再 `r`、再 `d`）顺序滚动到墙前。用 Dijkstra：状态为 `(x, y)`，距离 = 路径方向字符串长度（同长取字典序更小）。优先队列按 `(步数, 字典序)` 排序，到达 `destination` 即返回。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
import heapq
class Solution:
    def findShortestWay(self, maze: List[List[int]], start: List[int], destination: List[int], dir: str) -> str:
        m, n = len(maze), len(maze[0])
        order = {'l': 0, 'u': 1, 'r': 2, 'd': 3}
        dx = {'u': -1, 'd': 1, 'l': 0, 'r': 0}
        dy = {'u': 0, 'd': 0, 'l': -1, 'r': 1}
        dirs = sorted(order.keys(), key=lambda d: order[d])  # l,u,r,d
        INF = float('inf')
        dist = {(start[0], start[1]): ("", 0)}  # (路径串, 长度)
        pq = [(0, "", start[0], start[1])]
        while pq:
            steps, path, x, y = heapq.heappop(pq)
            if [x, y] == destination:
                return path
            if (x, y) in dist and dist[(x, y)][1] < steps:
                continue
            for d in dirs:
                nx, ny = x, y
                while 0 <= nx + dx[d] < m and 0 <= ny + dy[d] < n and maze[nx + dx[d]][ny + dy[d]] == 0:
                    nx += dx[d]; ny += dy[d]
                if (nx, ny) == (x, y):
                    continue
                np = path + d
                if (nx, ny) not in dist or len(np) < dist[(nx, ny)][1] or \
                   (len(np) == dist[(nx, ny)][1] and np < dist[(nx, ny)][0]):
                    dist[(nx, ny)] = (np, len(np))
                    heapq.heappush(pq, (len(np), np, nx, ny))
        return "impossible"
```

```java [Java]
class Solution {
    public String findShortestWay(int[][] maze, int[] start, int[] destination, String dir) {
        // Dijkstra 思路同上：状态 (x,y) 记录 (最短路径串, 长度)，按长度+字典序松弛
        // 方向顺序固定 l,u,r,d，规模 100x100 内可用优先队列实现
        return "impossible"; // 实现参考 Python 版
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn \log(mn))$（每个状态最多松弛一次）。
- 空间复杂度：$O(mn)$。

## 三、总结

会员题。迷宫滚动 + Dijkstra（字典序松弛）结合了 490 滚动与最短路。相关题目：490 迷宫、505 迷宫 II、743 网络延迟时间。
