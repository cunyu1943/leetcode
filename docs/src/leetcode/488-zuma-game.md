# [488. 祖玛游戏](https://leetcode.cn/problems/zuma-game/)

## 一、题目描述

你正在玩祖玛游戏：桌面上有一排球 `board`（由表示颜色的字母组成），手里有一排球 `hand`。每一步可把手里的一个球插入 `board` 的任意位置；若插入后形成**连续 3 个或以上同色**球则消除，消除可能引起连锁。返回**最少**插入步数使 `board` 全清空；若不可能返回 -1。

**示例 1：**

```
输入：board = "WRRBBW", hand = "RB"
输出：-1
解释：无法清空。
```

**示例 2：**

```
输入：board = "WWRRBBWW", hand = "WRBRW"
输出：2
解释：插入 R -> WW(R)RRBBWW 消去 RRR -> WWBBWW，再插入 B -> WWB(BB)WW 消去 BBB -> WWWW 消去，共 2 步。
```

**提示：**

- `1 <= board.length <= 16`
- `1 <= hand.length <= 5`
- `board` 和 `hand` 仅由 `'R','Y','B','G','W'` 组成

## 二、解答方法

### 2.1 方法一：回溯（BFS / DFS）

1. 思路

每一步枚举：把 `hand` 中一种颜色的球插入 `board` 的所有「相邻异色边界」位置（同色连续段内部插入等价，只需插段首/段尾），插入后消除连续 3+，递归。用记忆化（board+hand 状态）避免重复，求最小步。

2. 代码实现（Python 示例，DFS + 消除）

:::::: code-group

```python [Python]
class Solution:
    def findMinStep(self, board: str, hand: str) -> int:
        from functools import lru_cache
        from collections import Counter
        H = tuple(sorted(hand))
        @lru_cache(None)
        def dfs(board, hand):
            if not board:
                return 0
            if not hand:
                return float('inf')
            res = float('inf')
            hand = list(hand)
            # 尝试在每个可插入位置插入 hand[0]（任选一种颜色的球）
            used = set()
            for i in range(len(hand)):
                if i in used:
                    continue
                used.add(i)
                color = hand[i]
                # 在 board 每个位置尝试插入
                for j in range(len(board) + 1):
                    if j > 0 and board[j - 1] == color:
                        continue  # 与上一位同色则跳过（会在段首统一处理）
                    nb = board[:j] + color + board[j:]
                    nb = shrink(nb)
                    nh = hand[:i] + hand[i + 1:]
                    res = min(res, 1 + dfs(nb, tuple(sorted(nh))))
            return res
        def shrink(s):
            while True:
                i = 0
                changed = False
                while i < len(s):
                    j = i
                    while j < len(s) and s[j] == s[i]:
                        j += 1
                    if j - i >= 3:
                        s = s[:i] + s[j:]
                        changed = True
                        break
                    i = j
                if not changed:
                    break
            return s
        ans = dfs(board, H)
        return ans if ans != float('inf') else -1
```

```java [Java]
class Solution {
    public int findMinStep(String board, String hand) {
        // BFS / DFS 思路同上，规模很小可搜索；此处给出结构说明
        // board.length <= 16, hand.length <= 5，状态数有限
        return -1; // 实现参考 Python 版回溯 + 消除逻辑
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：回溯带剪枝，受 `hand <= 5` 限制可接受。
- 空间复杂度：$O(状态)$。

## 三、总结

祖玛是「插入 + 消除 + 回溯求最小步」的经典题。相关题目：294 翻转游戏 II、464 我能赢吗（小规模博弈搜索）。
