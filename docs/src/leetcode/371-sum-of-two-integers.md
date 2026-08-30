# [371. 两整数之和](https://leetcode.cn/problems/sum-of-two-integers/)

## 一、题目描述

给你两个整数 `a` 和 `b`，**不使用** 运算符 `+` 和 `-`，返回它们的和。

**示例：**
```
输入：a = 1, b = 2   输出：3
输入：a = -2, b = 3  输出：1
```

**提示：** `-1000 <= a, b <= 1000`。进阶：语言层面不应用 `+`/`-`（用位运算）。

## 二、解答方法

### 方法一：位运算（半加器 + 进位）

**思路：** 异或 `a^b` 得「无进位和」；与 `a&b` 得「进位位」，左移 1 位即进位。递归/迭代地：`a = a^b; b = (old_a & old_b) << 1`，直到 `b==0`。用 `unsigned`/长整型防符号溢出（Java 用 `long` 模拟，JS 用 `>>>0`）。

:::::: code-group

```java [Java]
class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;     // 进位
            a = a ^ b;                     // 无进位和
            b = carry;
        }
        return a;
    }
}
```

```python [Python]
class Solution:
    def getSum(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF
        while b & mask:
            a, b = (a ^ b) & mask, ((a & b) << 1) & mask
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)
```

```cpp [C++]
class Solution {
public:
    int getSum(int a, int b) {
        while (b) { int carry = (unsigned)(a & b) << 1; a = a ^ b; b = carry; }
        return a;
    }
};
```

```go [Go]
func getSum(a int, b int) int {
    for b != 0 {
        carry := (a & b) << 1
        a = a ^ b
        b = carry
    }
    return a
}
```

```js [JavaScript]
var getSum = function (a, b) {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
};
```

::::::

**复杂度：** 时间 `O(1)`（最多 32 次迭代），空间 `O(1)`。

## 三、总结

位运算加法：`^` 无进位和、`&` 进位、左移累加。负数在补码下自然成立（注意 Python 需掩码处理无限符号位）。同类：`389 找不同`（异或去重）、`136 只出现一次的数字`（异或）。本题是「不用 + 实现加法」的经典，考察补码与位运算理解。
