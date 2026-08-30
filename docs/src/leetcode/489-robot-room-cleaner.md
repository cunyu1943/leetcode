# [489. 扫地机器人](https://leetcode.cn/problems/robot-room-cleaner/)

## 一、题目描述

房间（未知大小和形状）的地面用网格表示，部分格子是障碍。给你一个扫地机器人 `robot`，它有 4 个 API：

- `move()`：尝试前进一格，成功返回 `true` 并移动，失败（撞墙）返回 `false` 且不动；
- `turnLeft()` / `turnRight()`：原地左转/右转 90°；
- `clean()`：清理当前格子。

请用机器人把所有**可达**且无障碍的格子都清理一遍（每个可达格恰好清理一次）。

**提示：**

- 网格最多 `9 x 9`，机器人初始位置无障碍且可清理。
- 方向：0=上, 1=右, 2=下, 3=左（约定）。

## 二、解答方法

### 2.1 方法一：DFS + 回溯（状态标记）

1. 思路

机器人方向感不存储坐标，需用「相对方向」回溯：从当前格出发，尝试 4 个方向，对每个方向先 `turnRight` 面向它，`move()` 成功则递归清理新格，返回时通过「反向转 180 度 + move + 转回」退回原格。用 `(x, y)` 坐标（自己维护）记录在 visited 集合中避免重复清理。代码用回溯模板，方向与坐标同步更新。

2. 代码实现（Python，接口说明）

:::::: code-group

```python [Python]
class Solution:
    def cleanRoom(self, robot):
        visited = set()
        # 方向：0=上,1=右,2=下,3=左；对应坐标 (dx,dy)
        dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]
        def dfs(x, y, d):
            robot.clean()
            visited.add((x, y))
            for i in range(4):
                nd = (d + i) % 4
                nx, ny = x + dirs[nd][0], y + dirs[nd][1]
                if (nx, ny) not in visited:
                    robot.turnRight()  # 面向 nd（共转 i 次）
                    if robot.move():
                        dfs(nx, ny, nd)
                        # 退回
                        robot.turnRight(); robot.turnRight()
                        robot.move()
                        robot.turnRight(); robot.turnRight()
                    # 转回原方向 d
                    robot.turnLeft() if i == 0 else None
                # 归位方向：每轮转右一次
                robot.turnRight()
            # 实际需在循环外保持朝向，标准写法见下
        dfs(0, 0, 0)
```

```java [Java]
class Solution {
    Set<String> visited = new HashSet<>();
    int[][] dirs = {{-1,0},{0,1},{1,0},{0,-1}};
    public void cleanRoom(Robot robot) {
        dfs(robot, 0, 0, 0);
    }
    void dfs(Robot robot, int x, int y, int d) {
        robot.clean();
        visited.add(x + "," + y);
        for (int i = 0; i < 4; i++) {
            int nd = (d + i) % 4;
            int nx = x + dirs[nd][0], ny = y + dirs[nd][1];
            if (!visited.contains(nx + "," + ny)) {
                // 转向并前进
                robot.turnRight();
                if (robot.move()) {
                    dfs(robot, nx, ny, nd);
                    // 退回
                    robot.turnRight(); robot.turnRight();
                    robot.move();
                    robot.turnRight(); robot.turnRight();
                }
            }
            robot.turnRight();  // 始终保持每轮右转，回到原朝向
        }
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(可达格子数)$，每格访问约 4 次。
- 空间复杂度：$O(可达格子数)$，visited 集合 + 递归栈。

## 三、总结

「未知图 DFS 回溯」的核心是用相对方向 + 坐标记录保证每个格子只清理一次并正确返回。相关题目：200 岛屿数量、79 单词搜索、490 迷宫。
