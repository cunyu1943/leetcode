# [490. 迷宫](https://leetcode.cn/problems/the-maze/)

## 一、题目描述

由 `0`（空）和 `1`（墙）组成的二维迷宫。小球从 `start` 出发，可沿某方向滚动，**直到撞墙才会停下**（不能在中途停）。给定 `start` 和 `destination`，判断小球能否在 `destination` 停下。

**示例 1：**

```
输入：maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
输出：true
```

**示例 2：**

```
输入：同上但 destination = [3,2]
输出：false
```

**提示：**

- `m == maze.length`，`n == maze[i].length`
- `1 <= m, n <= 100`
- 起点终点非墙

## 二、解答方法

### 2.1 方法一：BFS / DFS（滚动到墙才停）

1. 思路

从 `start` 出发，对 4 个方向一直滚动直到遇到墙前一步停下，若该停止点未访问则入队。若某次停在 `destination` 返回 `true`。

2. 代码实现（Python，BFS）

:::::: code-group

```python [Python]
class Solution:
    def hasPath(self, maze: List[List[int]], start: List[int], destination: List[int]) -> bool:
        from collections import deque
        m, n = len(maze), len(maze[0])
        dx = [1, -1, 0, 0]
        dy = [0, 0, 1, -1]
        q = deque([tuple(start)])
        vis = {tuple(start)}
        while q:
            x, y = q.popleft()
            if [x, y] == destination:
                return True
            for k in range(4):
                nx, ny = x, y
                while 0 <= nx + dx[k] < m and 0 <= ny + dy[k] < n and maze[nx + dx[k]][ny + dy[k]] == 0:
                    nx += dx[k]
                    ny += dy[k]
                if (nx, ny) not in vis:
                    vis.add((nx, ny))
                    q.append((nx, ny))
        return False
```

```java [Java]
class Solution {
    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        int m = maze.length, n = maze[0].length;
        int[] dx = {1,-1,0,0}, dy = {0,0,1,-1};
        boolean[][] vis = new boolean[m][n];
        Queue<int[]> q = new LinkedList<>();
        q.offer(start); vis[start[0]][start[1]] = true;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == destination[0] && cur[1] == destination[1]) return true;
            for (int k = 0; k < 4; k++) {
                int x = cur[0], y = cur[1];
                while (x + dx[k] >= 0 && y + dy[k] >= 0 && x + dx[k] < m && y + dy[k] < n && maze[x + dx[k]][y + dy[k]] == 0) {
                    x += dx[k]; y += dy[k];
                }
                if (!vis[x][y]) { vis[x][y] = true; q.offer(new int[]{x, y}); }
            }
        }
        return false;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn)$。
- 空间复杂度：$O(mn)$。

## 三、总结

「滚动到墙停」的 BFS，与 505 迷宫 II、499 迷宫 III 同系列。相关题目：200 岛屿数量、490 本身、面试题迷宫类。
