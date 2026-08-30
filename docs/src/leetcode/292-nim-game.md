# [292. Nim 游戏](https://leetcode.cn/problems/nim-game/)

## 一、题目描述

你和你的朋友，两个人一起玩 **Nim 游戏**：

-   桌子上有一堆石头；
-   你们轮流进行自己的回合，你作为 **先手**；
-   每一回合，轮到的人拿掉 `1 ~ 3` 块石头；
-   拿掉最后一块石头的人获胜。

假设你们每一步都是最优解。请编写一个函数，来判断你是否可以在给定石头数量为 `n` 的情况下赢得游戏。如果可以赢，返回 `true`；否则，返回 `false`。

**示例：**

```
输入：n = 4   输出：false
解释：无论你拿 1/2/3 块，对手都能拿走剩余全部 → 你必输
输入：n = 1   输出：true
```

**提示：** `1 <= n <= 2³¹ - 1`

## 二、解答方法

### 方法一：数学归纳（巴什博弈）

**思路：** 这是一个经典 **巴什博弈（Bash Game）**。关键结论：**当石头数是 4 的倍数时，先手必败；否则先手必胜**。

证明（归纳）：若 `n % 4 == 0`，无论先手拿 `1/2/3` 块，剩余 `3/2/1`，对手总能拿走剩余凑成 4 的倍数回给你；最终对手拿走最后一块。若 `n % 4 != 0`，先手拿走 `n % 4` 块使剩余为 4 的倍数，之后对手陷入必败态。

:::::: code-group

```java [Java]
class Solution {
    public boolean canWinNim(int n) {
        return n % 4 != 0;
    }
}
```

```python [Python]
class Solution:
    def canWinNim(self, n: int) -> bool:
        return n % 4 != 0
```

```cpp [C++]
class Solution {
public:
    bool canWinNim(int n) {
        return n % 4 != 0;
    }
};
```

```go [Go]
func canWinNim(n int) bool {
    return n%4 != 0
}
```

```js [JavaScript]
var canWinNim = function (n) {
    return n % 4 !== 0;
};
```

::::::

**复杂度：** 时间 `O(1)`，空间 `O(1)`。

## 三、总结

巴什博弈模板：面对「每回合可取 1~m 个、取最后一个者胜」的游戏，当 `n % (m+1) == 0` 时先手必败（本题 m=3，故 `n % 4 == 0` 必败），否则先手取 `n % (m+1)` 个即必胜。不要写递归/DP，直接取模即可。拓展：`292` × 进阶是 `293 翻转游戏`、`294 翻转游戏 II`（状态转移博弈，用 Minimax / 记忆化搜索）。
