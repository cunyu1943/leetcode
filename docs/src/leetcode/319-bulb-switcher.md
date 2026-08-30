# [319. 灯泡开关](https://leetcode.cn/problems/bulb-switcher/)

## 一、题目描述

有 `n` 盏初始关闭的灯，编号 `1 ~ n`。进行 `n` 轮操作：第 `i` 轮切换所有编号为 `i` 倍数的灯的开关。返回 `n` 轮后 **亮着的灯的数量**。

**示例：**
```
输入：n = 3   输出：1
解释：初始[关,关,关]；第1轮全开[开,开,开]；第2轮切2倍数[开,关,开]；第3轮切3倍数[开,关,关] → 仅1号亮
```

**提示：** `0 <= n <= 10⁹`。

## 二、解答方法

### 方法一：数学（完全平方数）

**思路：** 第 `k` 盏灯被切换的次数 = `k` 的约数个数。只有约数为 **奇数** 个的灯最终亮着——而约数个数为奇数 ⟺ `k` 是 **完全平方数**（约数成对，平方数有 √k 重复）。因此亮灯数 = `⌊√n⌋`。

:::::: code-group

```java [Java]
class Solution {
    public int bulbSwitch(int n) {
        return (int) Math.sqrt(n);
    }
}
```

```python [Python]
class Solution:
    def bulbSwitch(self, n: int) -> int:
        return int(n ** 0.5)
```

```cpp [C++]
class Solution {
public:
    int bulbSwitch(int n) {
        return (int) sqrt(n);
    }
};
```

```go [Go]
func bulbSwitch(n int) int {
    return int(math.Sqrt(float64(n)))
}
```

```js [JavaScript]
var bulbSwitch = function (n) {
    return Math.floor(Math.sqrt(n));
};
```

::::::

**复杂度：** 时间 `O(1)`，空间 `O(1)`。

## 三、总结

这是一道「数学观察题」：每盏灯切换次数 = 约数个数，完全平方数约数奇数个故最终亮。`n` 很大（10⁹）时绝对不能模拟，直接返回 `⌊√n⌋`。类似思维题：`672 灯泡开关 II`（加状态约束，需找周期）。
