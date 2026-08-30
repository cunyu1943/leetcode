# [365. 水壶问题](https://leetcode.cn/problems/water-and-jug-problem/)

## 一、题目描述

有两个水壶，容量分别为 `x` 和 `y` 升。可以：`装满任一壶`、`清空任一壶`、把一壶倒进另一壶（直到倒空或倒满）。判断能否恰好量出 `target` 升水。

**示例：**
```
输入：x = 3, y = 5, target = 4   输出：true（5-1=4：装满5，倒满3剩2，清空3，倒2进3，再装满5倒满3需1，剩4）
输入：x = 2, y = 6, target = 5   输出：false
```

**提示：** `0 <= x, y, target <= 10⁶`。

## 二、解答方法

### 方法一：数学（Bézout 恒等式）

**思路：** 所有可达水量都是 `a·x + b·y`（`a,b` 可正可负）的形式，即 `gcd(x,y)` 的整数倍。故能倒出 `target` ⟺ `target <= x+y` 且 `target % gcd(x,y) == 0`（包括两壶都为 0 时 target=0 也成立，但需非零操作？target 可为 0）。

:::::: code-group

```java [Java]
class Solution {
    public boolean canMeasureWater(int x, int y, int target) {
        if (target > x + y) return false;
        return target % gcd(x, y) == 0;
    }
    int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
}
```

```python [Python]
class Solution:
    def canMeasureWater(self, x: int, y: int, target: int) -> bool:
        import math
        if target > x + y: return False
        return target % math.gcd(x, y) == 0
```

```cpp [C++]
class Solution {
public:
    bool canMeasureWater(int x, int y, int target) {
        if (target > x + y) return false;
        return target % gcd(x, y) == 0;
    }
    int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
};
```

```go [Go]
func canMeasureWater(x, y, target int) bool {
    if target > x+y { return false }
    return target%gcd(x,y) == 0
}
func gcd(a, b int) int { for b != 0 { a, b = b, a%b }; return a }
```

```js [JavaScript]
var canMeasureWater = function (x, y, target) {
    if (target > x + y) return false;
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    return target % gcd(x, y) === 0;
};
```

::::::

**复杂度：** 时间 `O(log(max(x,y)))`，空间 `O(1)`。

## 三、总结

经典数论：`Bézout` 定理——`a·x + b·y` 能表示所有 `gcd(x,y)` 的倍数。能测量 `target` 当且仅当它是 `gcd` 倍数且不超过总容量 `x+y`。比 BFS 模拟所有状态（`O(x*y)`）优得多。注意 `target=0` 也返回 true（两壶空即 0）。本题是 `365 水壶问题`（经典面试题）。
