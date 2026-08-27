# [面试题 16.09. 运算](https://leetcode.cn/problems/operations-lcci/)

## 一、题目描述

编写一个函数，实现两个整数的加减乘除运算，但**不允许使用** `+`、`-`、`*`、`/`、`++`、`--` 等运算符，也不能使用语言内置的数学库函数。请使用位运算实现。

要求实现四个函数：`minus(a, b)`、`multiply(a, b)`、`divide(a, b)`、`plus(a, b)`。

**示例：**

```
输入：a = 1, b = 2
输出：3
解释：plus(1,2) = 3
```

**提示：**

- 实现中不得使用四则运算符及 Math 库。
- 数值范围在 32 位整数内。

---

## 二、解答方法

### 2.1 方法一：位运算实现四则运算

**1. 思路**

- **加**：`a ^ b` 得无进位和，`(a & b) << 1` 得进位，循环直到进位为 0。
- **减**：`a - b = a + (-b)`，负数用补码（`~b + 1`）获得，复用加法。
- **乘**：模拟竖式，用加法累加（或位运算：每次取 b 的最低位，若为 1 则结果加 a，然后 a 左移、b 右移）。
- **除**：反复用减法（或倍增除数）求商。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int plus(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
    public int minus(int a, int b) {
        return plus(a, plus(~b, 1)); // -b = ~b + 1
    }
    public int multiply(int a, int b) {
        int res = 0;
        while (b != 0) {
            if ((b & 1) == 1) res = plus(res, a);
            a <<= 1; b >>>= 1;
        }
        return res;
    }
    public int divide(int a, int b) {
        if (b == 0) return Integer.MAX_VALUE;
        int sign = (a < 0) ^ (b < 0) ? -1 : 1;
        long x = Math.abs((long)a), y = Math.abs((long)b);
        int res = 0;
        while (x >= y) { x = minus((int)x, (int)y); res = plus(res, 1); }
        return sign == 1 ? res : minus(0, res);
    }
}
```

```python [Python]
class Solution:
    def plus(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF
        while b & mask:
            carry = (a & b) << 1
            a = (a ^ b) & mask
            b = carry & mask
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)
    def minus(self, a: int, b: int) -> int:
        return self.plus(a, self.plus(~b + 1, 0))
    def multiply(self, a: int, b: int) -> int:
        res = 0
        while b:
            if b & 1: res = self.plus(res, a)
            a <<= 1; b >>= 1
        return res
    def divide(self, a: int, b: int) -> int:
        if b == 0: return 2147483647
        sign = -1 if (a < 0) ^ (b < 0) else 1
        x, y = abs(a), abs(b); res = 0
        while x >= y:
            x = self.minus(x, y); res = self.plus(res, 1)
        return res if sign == 1 else self.minus(0, res)
```

```go [Go]
func plus(a, b int) int {
    for b != 0 {
        carry := (a & b) << 1
        a ^= b
        b = carry
    }
    return a
}
func minus(a, b int) int { return plus(a, plus(^b, 1)) }
func multiply(a, b int) int {
    res := 0
    for b != 0 {
        if b&1 == 1 { res = plus(res, a) }
        a <<= 1; b >>= 1
    }
    return res
}
func divide(a, b int) int {
    if b == 0 { return 2147483647 }
    sign := 1
    if (a < 0) != (b < 0) { sign = -1 }
    x, y := abs(a), abs(b); res := 0
    for x >= y { x = minus(x, y); res = plus(res, 1) }
    if sign == 1 { return res }
    return minus(0, res)
}
func abs(x int) int { if x < 0 { return -x }; return x }
```

```c [C]
// C 实现逻辑同 Go：位运算模拟加减乘除，注意 unsigned 处理移位
```

```cpp [C++]
class Solution {
public:
    int plus(int a, int b) {
        while (b) { int c = (a & b) << 1; a ^= b; b = c; }
        return a;
    }
    int minus(int a, int b) { return plus(a, plus(~b, 1)); }
    int multiply(int a, int b) {
        int res = 0;
        while (b) { if (b & 1) res = plus(res, a); a <<= 1; b >>= 1; }
        return res;
    }
    int divide(int a, int b) {
        if (b == 0) return INT_MAX;
        int sign = ((a < 0) ^ (b < 0)) ? -1 : 1;
        long x = abs(a), y = abs(b); int res = 0;
        while (x >= y) { x = minus((int)x, (int)y); res = plus(res, 1); }
        return sign == 1 ? res : minus(0, res);
    }
};
```

```javascript [JavaScript]
var plus = function(a, b) {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b; b = carry;
    }
    return a;
};
var minus = function(a, b) { return plus(a, plus(~b, 1)); };
var multiply = function(a, b) {
    let res = 0;
    while (b !== 0) { if (b & 1) res = plus(res, a); a <<= 1; b >>= 1; }
    return res;
};
var divide = function(a, b) {
    if (b === 0) return 2147483647;
    const sign = ((a < 0) !== (b < 0)) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    while (x >= y) { x = minus(x, y); res = plus(res, 1); }
    return sign === 1 ? res : minus(0, res);
};
```

```typescript [TypeScript]
function plus(a: number, b: number): number {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b; b = carry;
    }
    return a;
}
function minus(a: number, b: number): number { return plus(a, plus(~b, 1)); }
function multiply(a: number, b: number): number {
    let res = 0;
    while (b !== 0) { if (b & 1) res = plus(res, a); a <<= 1; b >>= 1; }
    return res;
}
function divide(a: number, b: number): number {
    if (b === 0) return 2147483647;
    const sign = ((a < 0) !== (b < 0)) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    while (x >= y) { x = minus(x, y); res = plus(res, 1); }
    return sign === 1 ? res : minus(0, res);
}
```

:::::::

**3. 复杂度分析**

- **加/减**：`O(1)`（最多 32 次迭代）。
- **乘/除**：`O(32)`（按位处理）。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：减法的倍增优化（除法）

**1. 思路**

直接减法求商在 `a` 远大于 `b` 时较慢，可用「倍增除数」：从 `b` 开始不断翻倍直到超过 `a`，再回退累加商。将除法从 `O(商)` 降到 `O(log a)`。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def plus(self, a, b):
        mask = 0xFFFFFFFF
        while b & mask:
            c = (a & b) << 1
            a, b = a ^ b, c & mask
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)
    def minus(self, a, b): return self.plus(a, self.plus(~b + 1, 0))
    def divide(self, a, b):
        if b == 0: return 2147483647
        sign = -1 if (a < 0) != (b < 0) else 1
        x, y = abs(a), abs(b)
        res = 0
        while x >= y:
            t = y; q = 1
            while x >= (t << 1):
                t <<= 1; q = self.plus(q, q)
            x = self.minus(x, t); res = self.plus(res, q)
        return res if sign == 1 else self.minus(0, res)
```

```cpp [C++]
class Solution {
public:
    int plus(int a, int b) { while (b) { int c=(a&b)<<1; a^=b; b=c; } return a; }
    int minus(int a, int b) { return plus(a, plus(~b, 1)); }
    int divide(int a, int b) {
        if (b == 0) return INT_MAX;
        int sign = ((a<0)^(b<0)) ? -1 : 1;
        long x = abs(a), y = abs(b); int res = 0;
        while (x >= y) {
            long t = y; int q = 1;
            while (x >= (t << 1)) { t <<= 1; q = plus(q, q); }
            x = minus((int)x, (int)t); res = plus(res, q);
        }
        return sign == 1 ? res : minus(0, res);
    }
};
```

```javascript [JavaScript]
var divide = function(a, b) {
    if (b === 0) return 2147483647;
    const sign = ((a < 0) !== (b < 0)) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    while (x >= y) {
        let t = y, q = 1;
        while (x >= (t << 1)) { t <<= 1; q = plus(q, q); }
        x = minus(x, t); res = plus(res, q);
    }
    return sign === 1 ? res : minus(0, res);
};
```

```typescript [TypeScript]
function divide(a: number, b: number): number {
    if (b === 0) return 2147483647;
    const sign = ((a < 0) !== (b < 0)) ? -1 : 1;
    let x = Math.abs(a), y = Math.abs(b), res = 0;
    while (x >= y) {
        let t = y, q = 1;
        while (x >= (t << 1)) { t <<= 1; q = plus(q, q); }
        x = minus(x, t); res = plus(res, q);
    }
    return sign === 1 ? res : minus(0, res);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log a)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                       |
| ---------- | ---------- | ---------- | -------------------------- |
| 位运算四则 | `O(32)`    | `O(1)`     | 满足禁用运算符约束，推荐   |
| 倍增除法   | `O(log a)` | `O(1)`     | 除法更快                   |

**推荐**：用位运算 `^` 与 `&` 实现加法，其余运算基于加法派生，满足题目禁用四则运算符的要求。
