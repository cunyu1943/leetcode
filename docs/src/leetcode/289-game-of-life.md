# [289. 生命游戏](https://leetcode.cn/problems/game-of-life/)

## 一、题目描述

根据 **百度百科** ，生命游戏，简称为 **生命**，是英国数学家约翰·何顿·康威在 1970 年发明的 **细胞自动机**。

给定一个包含正 `m` 个格子、`n` 个格子的面板 `board`，每个格子被标记为 `1`（活）或 `0`（死）。根据下列规则计算下一代状态：

1. 活细胞周围 **少于 2** 个活细胞 → 死于孤立；
2. 活细胞周围有 **2 或 3** 个活细胞 → 存活；
3. 活细胞周围 **多于 3** 个活细胞 → 死于拥挤；
4. 死细胞周围 **正好 3** 个活细胞 → 复活。

下一代所有格子状态需 **同时** 更新（即更新 board 时不能用新状态算邻居）。请 **原地** 修改 board。

**示例：**

```
输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

**提示：** `m == board.length`，`n == board[i].length`，`1 <= m, n <= 25`。

## 二、解答方法

### 方法一：状态编码原地更新（双位复用）

**思路：** 由于要原地且不能同时更新，用 **两位** 表示一个格子：低位存「当前状态」，高位存「下一代状态」。约定：

-   `0`：当前死，下一代死；
-   `1`：当前活，下一代死；
-   `2`：当前死，下一代活；
-   `3`：当前活，下一代活。

第一轮遍历：统计活邻居数，按规则把目标状态写入高位（`| 2` 表示下一代活）；第二轮遍历：把每个格子 `board[i][j] >>= 1`（右移取高位作为新状态）。

:::::: code-group

```java [Java]
class Solution {
    public void gameOfLife(int[][] board) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int live = 0;
                for (int x = Math.max(0, i-1); x <= Math.min(m-1, i+1); x++)
                    for (int y = Math.max(0, j-1); y <= Math.min(n-1, j+1); y++)
                        if (board[x][y] % 2 == 1) live++;    // 取当前状态
                if (board[i][j] == 1 && (live == 2 || live == 3)) board[i][j] |= 2;
                if (board[i][j] == 0 && live == 3) board[i][j] |= 2;
            }
        }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) board[i][j] >>= 1;
    }
}
```

```python [Python]
class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        m, n = len(board), len(board[0])
        for i in range(m):
            for j in range(n):
                live = 0
                for x in range(max(0, i-1), min(m, i+2)):
                    for y in range(max(0, j-1), min(n, j+2)):
                        if board[x][y] & 1:     # 当前活
                            live += 1
                live -= board[i][j] & 1         # 去掉自己
                if board[i][j] == 1 and live in (2, 3): board[i][j] |= 2
                if board[i][j] == 0 and live == 3: board[i][j] |= 2
        for i in range(m):
            for j in range(n):
                board[i][j] >>= 1
```

```cpp [C++]
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int live = 0;
                for (int x = max(0, i-1); x <= min(m-1, i+1); x++)
                    for (int y = max(0, j-1); y <= min(n-1, j+1); y++)
                        live += board[x][y] & 1;
                live -= board[i][j] & 1;
                if (board[i][j] == 1 && (live == 2 || live == 3)) board[i][j] |= 2;
                if (board[i][j] == 0 && live == 3) board[i][j] |= 2;
            }
        }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) board[i][j] >>= 1;
    }
};
```

```go [Go]
func gameOfLife(board [][]int) {
    m, n := len(board), len(board[0])
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            live := 0
            for x := max(0, i-1); x <= min(m-1, i+1); x++ {
                for y := max(0, j-1); y <= min(n-1, j+1); y++ {
                    if board[x][y]&1 == 1 { live++ }
                }
            }
            if board[i][j]&1 == 1 { live-- }
            if (board[i][j] == 1 && (live == 2 || live == 3)) || (board[i][j] == 0 && live == 3) {
                board[i][j] |= 2
            }
        }
    }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ { board[i][j] >>= 1 }
    }
}
func max(a, b int) int { if a > b { return a }; return b }
func min(a, b int) int { if a < b { return a }; return b }
```

```js [JavaScript]
var gameOfLife = function (board) {
    const m = board.length, n = board[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let live = 0;
            for (let x = Math.max(0, i-1); x <= Math.min(m-1, i+1); x++)
                for (let y = Math.max(0, j-1); y <= Math.min(n-1, j+1); y++)
                    if (board[x][y] & 1) live++;
            live -= board[i][j] & 1;
            if (board[i][j] === 1 && (live === 2 || live === 3)) board[i][j] |= 2;
            if (board[i][j] === 0 && live === 3) board[i][j] |= 2;
        }
    }
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++) board[i][j] >>= 1;
};
```

::::::

**复杂度：** 时间 `O(mn)`，空间 `O(1)`。

## 三、总结

「同时更新」问题（不用额外矩阵）的经典技巧是 **状态位编码**：用额外 bit 同时保存「当前状态」和「下一状态」，两遍扫描（写、读）完成。约定：`bit1`（低位）= 当前，`bit2`（高位）= 下一代。读取邻居时用 `&1`，写下一代用 `|=2`，最后统一 `>>=1`。也可改用 `-1`（下一代死）、`2`（下一代活）等标记法，思路一致。同类题：`73 矩阵置零`（同样需要保存原状态信息）。
