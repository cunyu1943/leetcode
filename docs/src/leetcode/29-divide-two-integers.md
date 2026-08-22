# [29. 两数相除](https://leetcode.cn/problems/divide-two-integers/)



## 一、题目描述

给你两个整数，被除数 `dividend` 和除数 `divisor`。将两数相除，要求 **不使用** 乘法、除法和取余运算。

整数除法应该向零截断，也就是截去（`truncate`）其小数部分。例如 `8.345` 将被截断为 `8`，`-2.7335` 将被截断至 `-2`。

返回被除数 `dividend` 除以除数 `divisor` 得到的 **商**。

**注意：**假设我们的环境只能存储 **32 位** 有符号整数，其数值范围是 `[−2^31, 2^31 − 1]`。本题中，如果商 **严格大于** `2^31 − 1`，则返回 `2^31 − 1`；如果商 **严格小于** `-2^31`，则返回 `-2^31`。

**提示：**

-   `-2^31 <= dividend, divisor <= 2^31 - 1`
-   `divisor != 0`



**示例 1：**

```
输入：dividend = 10, divisor = 3
输出：3
解释：10/3 = 3.33333..，向零截断后得到 3。
```

**示例 2：**

```
输入：dividend = 7, divisor = -3
输出：-2
解释：7/-3 = -2.33333..，向零截断后得到 -2。
```



## 二、解答方法

### 2.1 方法一：倍增减法（位运算加速）

1. **思路**

不能用乘除取余，就用「减法」模拟除法，但朴素地一次次减会超时（如 `2^31-1 / 1`）。优化思路：每次减去「当前能减的最大 `divisor * 2^k`」。

-   先处理符号：记录结果正负，统一转成正数运算（用 `long` 避免 `-2^31` 取反溢出）；
-   当 `dividend >= divisor` 时，不断把 `divisor` 翻倍（`tmp = divisor, mul = 1`；`while dividend >= tmp + tmp` 时 `tmp += tmp; mul += mul`），减去 `tmp` 并累加 `mul` 到商；
-   最后根据符号返回，并做 `2^31` 边界截断。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
        long a = Math.abs((long) dividend), b = Math.abs((long) divisor);
        long res = 0;
        while (a >= b) {
            long tmp = b, mul = 1;
            while (a >= tmp + tmp) {
                tmp += tmp;
                mul += mul;
            }
            a -= tmp;
            res += mul;
        }
        res = (dividend > 0) == (divisor > 0) ? res : -res;
        if (res > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (res < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int) res;
    }
}
```

```python [Python]
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        INT_MIN, INT_MAX = -2**31, 2**31 - 1
        if dividend == INT_MIN and divisor == -1:
            return INT_MAX
        a = abs(dividend)
        b = abs(divisor)
        res = 0
        while a >= b:
            tmp, mul = b, 1
            while a >= tmp + tmp:
                tmp += tmp
                mul += mul
            a -= tmp
            res += mul
        if (dividend > 0) != (divisor > 0):
            res = -res
        return min(max(res, INT_MIN), INT_MAX)
```

```go [Go]
func divide(dividend int, divisor int) int {
    INT_MIN, INT_MAX := -1<<31, 1<<31-1
    if dividend == INT_MIN && divisor == -1 {
        return INT_MAX
    }
    a, b := int64(dividend), int64(divisor)
    if a < 0 {
        a = -a
    }
    if b < 0 {
        b = -b
    }
    var res int64 = 0
    for a >= b {
        tmp, mul := b, int64(1)
        for a >= tmp+tmp {
            tmp += tmp
            mul += mul
        }
        a -= tmp
        res += mul
    }
    if (dividend > 0) != (divisor > 0) {
        res = -res
    }
    if res > int64(INT_MAX) {
        return INT_MAX
    }
    if res < int64(INT_MIN) {
        return INT_MIN
    }
    return int(res)
}
```

```c [C]
int divide(int dividend, int divisor) {
    if (dividend == INT_MIN && divisor == -1) return INT_MAX;
    long a = labs((long)dividend), b = labs((long)divisor);
    long res = 0;
    while (a >= b) {
        long tmp = b, mul = 1;
        while (a >= tmp + tmp) {
            tmp += tmp;
            mul += mul;
        }
        a -= tmp;
        res += mul;
    }
    if ((dividend > 0) != (divisor > 0)) res = -res;
    if (res > INT_MAX) return INT_MAX;
    if (res < INT_MIN) return INT_MIN;
    return (int)res;
}
```

```cpp [C++]
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;
        long a = labs((long)dividend), b = labs((long)divisor);
        long res = 0;
        while (a >= b) {
            long tmp = b, mul = 1;
            while (a >= tmp + tmp) {
                tmp += tmp;
                mul += mul;
            }
            a -= tmp;
            res += mul;
        }
        if ((dividend > 0) != (divisor > 0)) res = -res;
        if (res > INT_MAX) return INT_MAX;
        if (res < INT_MIN) return INT_MIN;
        return (int)res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    const INT_MIN = -Math.pow(2, 31), INT_MAX = Math.pow(2, 31) - 1;
    if (dividend === INT_MIN && divisor === -1) return INT_MAX;
    let a = Math.abs(dividend), b = Math.abs(divisor);
    let res = 0;
    while (a >= b) {
        let tmp = b, mul = 1;
        while (a >= tmp + tmp) {
            tmp += tmp;
            mul += mul;
        }
        a -= tmp;
        res += mul;
    }
    if ((dividend > 0) !== (divisor > 0)) res = -res;
    if (res > INT_MAX) return INT_MAX;
    if (res < INT_MIN) return INT_MIN;
    return res;
};
```

```ts [TypeScript]
function divide(dividend: number, divisor: number): number {
    const INT_MIN = -Math.pow(2, 31), INT_MAX = Math.pow(2, 31) - 1;
    if (dividend === INT_MIN && divisor === -1) return INT_MAX;
    let a = Math.abs(dividend), b = Math.abs(divisor);
    let res = 0;
    while (a >= b) {
        let tmp = b, mul = 1;
        while (a >= tmp + tmp) {
            tmp += tmp;
            mul += mul;
        }
        a -= tmp;
        res += mul;
    }
    if ((dividend > 0) !== (divisor > 0)) res = -res;
    if (res > INT_MAX) return INT_MAX;
    if (res < INT_MIN) return INT_MIN;
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log dividend)`，每次至少将除数翻倍，最多 `log` 轮。
- **空间复杂度**：`O(1)`，只使用若干变量。

### 2.2 方法二：纯位运算（移位累加）

1. **思路**

等价地，用位移实现翻倍：枚举 `k` 从 `31` 到 `0`，若 `divisor << k <= dividend`，则减去该值并将 `1 << k` 加入商。逻辑与倍增减法一致，只不过用位移表达。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
        long a = Math.abs((long) dividend), b = Math.abs((long) divisor);
        long res = 0;
        for (int k = 31; k >= 0; k--) {
            if ((b << k) <= a) {
                a -= (b << k);
                res += (1L << k);
            }
        }
        res = (dividend > 0) == (divisor > 0) ? res : -res;
        if (res > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (res < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        return (int) res;
    }
}
```

```python [Python]
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        INT_MIN, INT_MAX = -2**31, 2**31 - 1
        if dividend == INT_MIN and divisor == -1:
            return INT_MAX
        a, b = abs(dividend), abs(divisor)
        res = 0
        for k in range(31, -1, -1):
            if (b << k) <= a:
                a -= (b << k)
                res += (1 << k)
        if (dividend > 0) != (divisor > 0):
            res = -res
        return min(max(res, INT_MIN), INT_MAX)
```

```go [Go]
func divide(dividend int, divisor int) int {
    INT_MIN, INT_MAX := -1<<31, 1<<31-1
    if dividend == INT_MIN && divisor == -1 {
        return INT_MAX
    }
    a, b := int64(dividend), int64(divisor)
    if a < 0 { a = -a }
    if b < 0 { b = -b }
    var res int64 = 0
    for k := 31; k >= 0; k-- {
        if (b << k) <= a {
            a -= (b << k)
            res += (1 << k)
        }
    }
    if (dividend > 0) != (divisor > 0) {
        res = -res
    }
    if res > int64(INT_MAX) { return INT_MAX }
    if res < int64(INT_MIN) { return INT_MIN }
    return int(res)
}
```

```c [C]
int divide(int dividend, int divisor) {
    if (dividend == INT_MIN && divisor == -1) return INT_MAX;
    long a = labs((long)dividend), b = labs((long)divisor);
    long res = 0;
    for (int k = 31; k >= 0; k--) {
        if ((b << k) <= a) {
            a -= (b << k);
            res += (1L << k);
        }
    }
    if ((dividend > 0) != (divisor > 0)) res = -res;
    if (res > INT_MAX) return INT_MAX;
    if (res < INT_MIN) return INT_MIN;
    return (int)res;
}
```

```cpp [C++]
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;
        long a = labs((long)dividend), b = labs((long)divisor);
        long res = 0;
        for (int k = 31; k >= 0; k--) {
            if ((b << k) <= a) {
                a -= (b << k);
                res += (1L << k);
            }
        }
        if ((dividend > 0) != (divisor > 0)) res = -res;
        if (res > INT_MAX) return INT_MAX;
        if (res < INT_MIN) return INT_MIN;
        return (int)res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    const INT_MIN = -Math.pow(2, 31), INT_MAX = Math.pow(2, 31) - 1;
    if (dividend === INT_MIN && divisor === -1) return INT_MAX;
    let a = Math.abs(dividend), b = Math.abs(divisor);
    let res = 0;
    for (let k = 31; k >= 0; k--) {
        if ((b << k) <= a) {
            a -= (b << k);
            res += (1 << k);
        }
    }
    if ((dividend > 0) !== (divisor > 0)) res = -res;
    if (res > INT_MAX) return INT_MAX;
    if (res < INT_MIN) return INT_MIN;
    return res;
};
```

```ts [TypeScript]
function divide(dividend: number, divisor: number): number {
    const INT_MIN = -Math.pow(2, 31), INT_MAX = Math.pow(2, 31) - 1;
    if (dividend === INT_MIN && divisor === -1) return INT_MAX;
    let a = Math.abs(dividend), b = Math.abs(divisor);
    let res = 0;
    for (let k = 31; k >= 0; k--) {
        if ((b << k) <= a) {
            a -= (b << k);
            res += (1 << k);
        }
    }
    if ((dividend > 0) !== (divisor > 0)) res = -res;
    if (res > INT_MAX) return INT_MAX;
    if (res < INT_MIN) return INT_MIN;
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(32)`，固定 32 次循环。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 倍增减法（位运算加速） | `O(log dividend)` | `O(1)` | 常规实现 |
| 纯位运算（移位累加） | `O(32)` | `O(1)` | 常规实现 |

