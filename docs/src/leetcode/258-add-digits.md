# [258. 各位相加](https://leetcode.cn/problems/add-digits/)



## 一、题目描述

给定一个非负整数 `num`，反复将各个位上的数字相加，直到结果为一位数。

返回这个结果。

**示例 1：**

```
输入: num = 38
输出: 2
解释: 各位相加的过程为：
38 --> 3 + 8 --> 11
11 --> 1 + 1 --> 2
由于 2 是一位数，所以返回 2。
```

**示例 2：**

```
输入: num = 0
输出: 0
```

**提示：**

-   `0 <= num <= 2³¹ - 1`

**进阶：** 你可以不使用循环或者递归，且在 `O(1)` 时间复杂度内解决这个问题吗？



## 二、解答方法

### 2.1 方法一：数学公式（数根，O(1)）

1. **思路**

这道题本质是求 **数根（Digital Root）**。数根有封闭公式：

```
若 num == 0        →  结果为 0
若 num % 9 == 0    →  结果为 9
否则               →  结果为 num % 9
```

可统一写成：`(num - 1) % 9 + 1`（`num > 0` 时）。

**原理**：一个数与其各位数字之和 **模 9 同余**（因为 `10^k ≡ 1 (mod 9)`）。反复求和直到一位数，结果就是 `num mod 9`；当 `num` 是 9 的倍数时，结果取 9 而非 0。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int addDigits(int num) {
        return (num - 1) % 9 + 1;     // num > 0
    }
}
```

```python [Python]
class Solution:
    def addDigits(self, num: int) -> int:
        if num == 0:
            return 0
        return (num - 1) % 9 + 1
```

```go [Go]
func addDigits(num int) int {
    if num == 0 {
        return 0
    }
    return (num-1)%9 + 1
}
```

```cpp [C++]
class Solution {
public:
    int addDigits(int num) {
        if (num == 0) return 0;
        return (num - 1) % 9 + 1;
    }
};
```

```js [JavaScript]
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
    if (num === 0) return 0;
    return (num - 1) % 9 + 1;
};
```

```ts [TypeScript]
/**
 * @param {number} num
 * @return {number}
 */
function addDigits(num: number): number {
    if (num === 0) return 0;
    return (num - 1) % 9 + 1;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：模拟（循环 / 递归）

1. **思路**

按题意直接模拟：反复把各位数字相加，直到结果小于 10。

2. **代码实现（Python）**

```python
class Solution:
    def addDigits(self, num: int) -> int:
        while num >= 10:
            num = sum(int(d) for d in str(num))
        return num
```

递归版：

```python
class Solution:
    def addDigits(self, num: int) -> int:
        if num < 10:
            return num
        return self.addDigits(sum(int(d) for d in str(num)))
```

3. **复杂度分析**

- **时间复杂度**：`O(log num)`（每次迭代位数大幅减少）。
- **空间复杂度**：`O(1)`（循环版）/`O(log num)`（递归栈）。

## 三、总结

| 方法 | 时间 | 适用 |
| ---- | ---- | ---- |
| 数根公式 | `O(1)` | 满足进阶，推荐 |
| 模拟求和 | `O(log n)` | 直观 |

**数根（Digital Root）公式**：

```
dr(n) = 0                , n = 0
dr(n) = 9                , n > 0 且 n ≡ 0 (mod 9)
dr(n) = n mod 9          , n ≢ 0 (mod 9)
```

一行写法：`(n - 1) % 9 + 1`（n > 0）。

原理：`10^k ≡ 1 (mod 9)`，所以 `n = Σ(d_i × 10^i) ≡ Σd_i (mod 9)`，即「数与其各位数字之和模 9 同余」。反复迭代不改变模 9 的余数，最终结果必为 `n mod 9`（0 时取 9）。
