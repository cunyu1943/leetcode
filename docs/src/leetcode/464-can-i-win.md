# [464. 我能赢吗](https://leetcode.cn/problems/can-i-win/)

## 一、题目描述

在「100 game」中，两名玩家轮流累加一个累计总和（从 0 开始），每次可选 `1` 到 `maxChoosableInteger` 中未被使用过的整数。先使累计总和 $\ge$ `desiredTotal` 的玩家胜。给定 `maxChoosableInteger` 和 `desiredTotal`，判断先手玩家是否**必胜**（双方都最优）。

**示例 1：**

```
输入：maxChoosableInteger = 10, desiredTotal = 11
输出：false
解释：无论先手怎么选，后手都能凑到 >=11。
```

**示例 2：**

```
输入：maxChoosableInteger = 10, desiredTotal = 0
输出：true
```

**提示：**

- `1 <= maxChoosableInteger <= 20`
- `0 <= desiredTotal <= 300`

## 二、解答方法

### 2.1 方法一：记忆化搜索（状态压缩）

1. 思路

用整数的二进制位表示「哪些数已被使用」（状态），`dp[state]` 表示当前状态下先手是否必胜。对未使用的数 `i`，若 `i >= remaining`（直接胜）或「选 i 后对手必败」则当前必胜。用记忆化避免重复（状态数 $2^{max} \le 2^{20}$）。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
        if desiredTotal == 0:
            return True
        if maxChoosableInteger * (maxChoosableInteger + 1) // 2 < desiredTotal:
            return False
        from functools import lru_cache
        @lru_cache(None)
        def dfs(state, remain):
            for i in range(1, maxChoosableInteger + 1):
                if not (state >> i) & 1:
                    if i >= remain:
                        return True
                    if not dfs(state | (1 << i), remain - i):
                        return True
            return False
        return dfs(0, desiredTotal)
```

```java [Java]
class Solution {
    Boolean[] memo;
    int max, target;
    public boolean canIWin(int maxChoosableInteger, int desiredTotal) {
        max = maxChoosableInteger; target = desiredTotal;
        if (max * (max + 1) / 2 < target) return false;
        if (target == 0) return true;
        memo = new Boolean[1 << (max + 1)];
        return dfs(0, target);
    }
    boolean dfs(int state, int remain) {
        if (remain <= 0) return false;
        if (memo[state] != null) return memo[state];
        for (int i = 1; i <= max; i++) {
            if ((state & (1 << i)) == 0) {
                if (!dfs(state | (1 << i), remain - i)) return memo[state] = true;
            }
        }
        return memo[state] = false;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(2^{max} \cdot max)$。
- 空间复杂度：$O(2^{max})$。

## 三、总结

「博弈 + 状态压缩 + 记忆化」是极小规模组合博弈的通用解法。相关题目：486 预测赢家、292 Nim 游戏、294 翻转游戏 II。
