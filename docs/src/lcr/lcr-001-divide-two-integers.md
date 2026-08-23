# [LCR 001. 两数相除](https://leetcode.cn/problems/xoh6Oh/)



## 一、题目描述

给定两个整数 `a` 和 `b`，求它们的除法的商 `a/b`，要求不得使用乘号 `'*'`、除号 `'/'` 以及求余符号 `'%'`。



**注意：**

- 整数除法的结果应当截去（`truncate`）其小数部分，例如：`truncate(8.345) = 8` 以及 `truncate(-2.7335) = -2`
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 `[-2³¹, 2³¹ - 1]`。本题中，如果除法结果溢出，则返回 `2³¹ - 1`



**示例 1：**

```
输入：a = 15, b = 2
输出：7
解释：15/2 = truncate(7.5) = 7
```

**示例 2：**

```
输入：a = 7, b = -3
输出：-2
解释：7/-3 = truncate(-2.33333..) = -2
```

**示例 3：**

```
输入：a = 0, b = 1
输出：0
```

**示例 4：**

```
输入：a = 1, b = 1
输出：1
```

**提示：**

- `-2³¹ <= a, b <= 2³¹ - 1`
- `b != 0`



## 二、解答方法

### 2.1 方法一：位运算（倍增减法）

1. **思路**

不能用乘除法，可以把「除法」转化为「不断减去除数」的计数。但朴素地一个一个减会超时，因此用 **倍增** 思想：

- 先处理符号：记录结果正负，把 `a`、`b` 都转成负数（用负数避免 `-2³¹` 取正溢出），统一在负数域运算；
- 对当前的被除数 `-a`，从「最大的 2 的幂倍除数」开始尝试：设 `temp = b`，`cnt = 1`，若 `temp >= (1<<31)` 且 `temp + temp >= a`（即还可以翻倍），就 `temp += temp; cnt += cnt`；
- 当 `a <= temp` 时，说明这一档可以减，令 `a -= temp`，结果累加 `cnt`；
- 重复直到 `a > b`（不能再减），最后按符号返回，注意溢出返回 `2³¹ - 1`。

每次把 `temp` 翻倍，复杂度从 `O(n)` 降到 `O(log²n)`（内部再嵌套一层 `log n` 枚举倍数）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int divide(int a, int b) {
        if (a == Integer.MIN_VALUE && b == -1) return Integer.MAX_VALUE;
        int sign = (a > 0) ^ (b > 0) ? -1 : 1;
        long x = Math.abs((long) a), y = Math.abs((long) b);
        long res = 0;
        while (x >= y) {
            long temp = y, cnt = 1;
            while (x >= temp + temp) {
                temp += temp;
                cnt += cnt;
            }
            x -= temp;
            res += cnt;
        }
        return sign == 1 ? (int) res : -(int) res;
    }
}
```

```python [Python]
class Solution:
    def divide(self, a: int, b: int) -> int:
        if a == -2**31 and b == -1:
            return 2**31 - 1
        sign = -1 if (a > 0) ^ (b > 0) else 1
        x, y = abs(a), abs(b)
        res = 0
        while x >= y:
            temp, cnt = y, 1
            while x >= temp + temp:
                temp += temp
                cnt += cnt
            x -= temp
            res += cnt
        return res if sign == 1 else -res
```

```cpp [C++]
class Solution {
public:
    int divide(int a, int b) {
        if (a == INT_MIN && b == -1) return INT_MAX;
        int sign = ((a > 0) ^ (b > 0)) ? -1 : 1;
        long x = abs((long)a), y = abs((long)b), res = 0;
        while (x >= y) {
            long temp = y, cnt = 1;
            while (x >= temp + temp) {
                temp += temp;
                cnt += cnt;
            }
            x -= temp;
            res += cnt;
        }
        return sign == 1 ? (int)res : -(int)res;
    }
};
```

```go [Go]
func divide(a int, b int) int {
    if a == math.MinInt32 && b == -1 {
        return math.MaxInt32
    }
    sign := 1
    if (a > 0) != (b > 0) {
        sign = -1
    }
    x, y := abs(int64(a)), abs(int64(b))
    var res int64
    for x >= y {
        temp, cnt := y, int64(1)
        for x >= temp+temp {
            temp += temp
            cnt += cnt
        }
        x -= temp
        res += cnt
    }
    if sign == 1 {
        return int(res)
    }
    return int(-res)
}

func abs(x int64) int64 {
    if x < 0 {
        return -x
    }
    return x
}
```

```js [JavaScript]
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var divide = function (a, b) {
    if (a === -Math.pow(2, 31) && b === -1) return Math.pow(2, 31) - 1;
    const sign = (a > 0) !== (b > 0) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    while (x >= y) {
        let temp = y, cnt = 1;
        while (x >= temp + temp) {
            temp += temp;
            cnt += cnt;
        }
        x -= temp;
        res += cnt;
    }
    return sign === 1 ? res : -res;
};
```

```c [C]
#include <limits.h>
#include <stdlib.h>

int divide(int a, int b) {
    if (a == INT_MIN && b == -1) return INT_MAX;
    int sign = ((a > 0) ^ (b > 0)) ? -1 : 1;
    long x = labs((long)a), y = labs((long)b), res = 0;
    while (x >= y) {
        long temp = y, cnt = 1;
        while (x >= temp + temp) {
            temp += temp;
            cnt += cnt;
        }
        x -= temp;
        res += cnt;
    }
    return sign == 1 ? (int)res : -(int)res;
}
```

```ts [TypeScript]
function divide(a: number, b: number): number {
    if (a === -Math.pow(2, 31) && b === -1) return Math.pow(2, 31) - 1;
    const sign = (a > 0) !== (b > 0) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    while (x >= y) {
        let temp = y, cnt = 1;
        while (x >= temp + temp) {
            temp += temp;
            cnt += cnt;
        }
        x -= temp;
        res += cnt;
    }
    return sign === 1 ? res : -res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log²a)`，外层循环 `O(log a)`，内部翻倍 `O(log a)`。
- **空间复杂度**：`O(1)`，只使用常数变量。

### 2.2 方法二：长除法（位权累加）

1. **思路**

把商用二进制表示，从最高位（`2³⁰`）到最低位逐位判断该位是否可取：若 `(b << i) <= a`，则该位为 1，令 `a -= (b << i)`，并把 `1 << i` 累加到结果。本质是用移位代替乘法做长除法。

- 符号处理同上，统一在负数域（或转正数但注意溢出）；
- 从 `i = 31` 递减到 `0`，若 `b << i <= a`，则结果 `|= (1 << i)`，`a -= (b << i)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int divide(int a, int b) {
        if (a == Integer.MIN_VALUE && b == -1) return Integer.MAX_VALUE;
        int sign = (a > 0) ^ (b > 0) ? -1 : 1;
        long x = Math.abs((long) a), y = Math.abs((long) b), res = 0;
        for (int i = 31; i >= 0; i--) {
            if ((y << i) <= x) {
                res += (1L << i);
                x -= (y << i);
            }
        }
        return sign == 1 ? (int) res : -(int) res;
    }
}
```

```python [Python]
class Solution:
    def divide(self, a: int, b: int) -> int:
        if a == -2**31 and b == -1:
            return 2**31 - 1
        sign = -1 if (a > 0) ^ (b > 0) else 1
        x, y = abs(a), abs(b)
        res = 0
        for i in range(31, -1, -1):
            if (y << i) <= x:
                res += (1 << i)
                x -= (y << i)
        return res if sign == 1 else -res
```

```cpp [C++]
class Solution {
public:
    int divide(int a, int b) {
        if (a == INT_MIN && b == -1) return INT_MAX;
        int sign = ((a > 0) ^ (b > 0)) ? -1 : 1;
        long x = abs((long)a), y = abs((long)b), res = 0;
        for (int i = 31; i >= 0; i--) {
            if ((y << i) <= x) {
                res += (1L << i);
                x -= (y << i);
            }
        }
        return sign == 1 ? (int)res : -(int)res;
    }
};
```

```go [Go]
func divide(a int, b int) int {
    if a == math.MinInt32 && b == -1 {
        return math.MaxInt32
    }
    sign := 1
    if (a > 0) != (b > 0) {
        sign = -1
    }
    x, y := abs(int64(a)), abs(int64(b))
    var res int64
    for i := 31; i >= 0; i-- {
        if (y << i) <= x {
            res += (1 << i)
            x -= (y << i)
        }
    }
    if sign == 1 {
        return int(res)
    }
    return int(-res)
}

func abs(x int64) int64 {
    if x < 0 {
        return -x
    }
    return x
}
```

```js [JavaScript]
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var divide = function (a, b) {
    if (a === -Math.pow(2, 31) && b === -1) return Math.pow(2, 31) - 1;
    const sign = (a > 0) !== (b > 0) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    for (let i = 31; i >= 0; i--) {
        if ((y << i) <= x) {
            res += (1 << i);
            x -= (y << i);
        }
    }
    return sign === 1 ? res : -res;
};
```

```c [C]
#include <limits.h>
#include <stdlib.h>

int divide(int a, int b) {
    if (a == INT_MIN && b == -1) return INT_MAX;
    int sign = ((a > 0) ^ (b > 0)) ? -1 : 1;
    long x = labs((long)a), y = labs((long)b), res = 0;
    for (int i = 31; i >= 0; i--) {
        if ((y << i) <= x) {
            res += (1L << i);
            x -= (y << i);
        }
    }
    return sign == 1 ? (int)res : -(int)res;
}
```

```ts [TypeScript]
function divide(a: number, b: number): number {
    if (a === -Math.pow(2, 31) && b === -1) return Math.pow(2, 31) - 1;
    const sign = (a > 0) !== (b > 0) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    for (let i = 31; i >= 0; i--) {
        if ((y << i) <= x) {
            res += (1 << i);
            x -= (y << i);
        }
    }
    return sign === 1 ? res : -res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log a)`，固定 32 次循环。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 倍增减法 | `O(log²a)` | `O(1)` | 思路直观，规避乘法 |
| 长除法（位权） | `O(log a)` | `O(1)` | 更优，推荐 |

两种方法都巧妙避开了乘除法，核心是用 **移位 + 减法** 模拟除法过程。注意 `-2³¹` 取绝对值会溢出，需转为 `long` 或统一在负数域运算。
