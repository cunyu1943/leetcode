# [7. 整数反转](https://leetcode.cn/problems/reverse-integer/)



## 一、题目描述

给你一个 32 位的有符号整数 `x`，返回将 `x` 中的数字部分反转后的结果。

如果反转后整数超过 32 位有符号整数的范围 `[−2^31, 2^31 − 1]`，就返回 0。

**假设环境不允许存储 64 位整数（有符号或无符号）。**



**示例 1：**

```
输入：x = 123
输出：321
```

**示例 2：**

```
输入：x = -123
输出：-321
```

**示例 3：**

```
输入：x = 120
输出：21
```

**示例 4：**

```
输入：x = 0
输出：0
```

**提示：**

-   `-2^31 <= x <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：逐位取模反转（数学法）

1. **思路**

每次取 `x` 的末位（`x % 10`），将其加到结果 `rev` 的末尾（`rev = rev * 10 + digit`），再把 `x` 除以 10。关键在于**提前判断溢出**：

-   32 位有符号整数上界 `INT_MAX = 2^31 - 1 = 2147483647`，下界 `INT_MIN = -2^31 = -2147483648`；
-   在 `rev = rev * 10 + digit` 之前，若 `rev > INT_MAX / 10` 或 `rev == INT_MAX / 10` 且 `digit > 7`，必溢出；下界同理（`digit < -8`）；
-   用 `int` 即可完成判断，无需 64 位整数。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            if (rev > Integer.MAX_VALUE / 10 ||
                (rev == Integer.MAX_VALUE / 10 && digit > 7)) return 0;
            if (rev < Integer.MIN_VALUE / 10 ||
                (rev == Integer.MIN_VALUE / 10 && digit < -8)) return 0;
            rev = rev * 10 + digit;
        }
        return rev;
    }
}
```

```python [Python]
class Solution:
    def reverse(self, x: int) -> int:
        INT_MIN, INT_MAX = -2**31, 2**31 - 1
        rev = 0
        while x != 0:
            digit = x % 10 if x > 0 else x % -10
            x = x // 10 if x > 0 else -(abs(x) // 10)
            if rev > INT_MAX // 10 or (rev == INT_MAX // 10 and digit > 7):
                return 0
            if rev < INT_MIN // 10 or (rev == INT_MIN // 10 and digit < -8):
                return 0
            rev = rev * 10 + digit
        return rev
```

```go [Go]
func reverse(x int) int {
    const INT_MAX = 1<<31 - 1
    const INT_MIN = -1 << 31
    rev := 0
    for x != 0 {
        digit := x % 10
        x /= 10
        if rev > INT_MAX/10 || (rev == INT_MAX/10 && digit > 7) {
            return 0
        }
        if rev < INT_MIN/10 || (rev == INT_MIN/10 && digit < -8) {
            return 0
        }
        rev = rev*10 + digit
    }
    return rev
}
```

```c [C]
int reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int digit = x % 10;
        x /= 10;
        if (rev > INT_MAX / 10 || (rev == INT_MAX / 10 && digit > 7)) return 0;
        if (rev < INT_MIN / 10 || (rev == INT_MIN / 10 && digit < -8)) return 0;
        rev = rev * 10 + digit;
    }
    return rev;
}
```

```cpp [C++]
class Solution {
public:
    int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            if (rev > INT_MAX / 10 || (rev == INT_MAX / 10 && digit > 7)) return 0;
            if (rev < INT_MIN / 10 || (rev == INT_MIN / 10 && digit < -8)) return 0;
            rev = rev * 10 + digit;
        }
        return rev;
    }
};
```

```js [JavaScript]
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    const INT_MAX = 2 ** 31 - 1, INT_MIN = -(2 ** 31);
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = x > 0 ? Math.floor(x / 10) : Math.ceil(x / 10);
        if (rev > INT_MAX / 10 || (rev === INT_MAX / 10 && digit > 7)) return 0;
        if (rev < INT_MIN / 10 || (rev === INT_MIN / 10 && digit < -8)) return 0;
        rev = rev * 10 + digit;
    }
    return rev;
};
```

```ts [TypeScript]
function reverse(x: number): number {
    const INT_MAX = 2 ** 31 - 1, INT_MIN = -(2 ** 31);
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = x > 0 ? Math.floor(x / 10) : Math.ceil(x / 10);
        if (rev > INT_MAX / 10 || (rev === INT_MAX / 10 && digit > 7)) return 0;
        if (rev < INT_MIN / 10 || (rev === INT_MIN / 10 && digit < -8)) return 0;
        rev = rev * 10 + digit;
    }
    return rev;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log|x|)`**，反转的位数等于 `x` 的十进制位数。
- **空间复杂度**：`O(1)`**，只使用常数个变量。

## 三、总结

整数反转是经典的边界处理题，核心在于「边反转边判断溢出」，而非反转完成后再比较。注意负数取模在 C/Java 与 Python/JS 中的差异（负数 `%` 规则不同），需在循环内统一末位取值逻辑。时间复杂度 `O(log|x|)`，空间 `O(1)`。
两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 逐位取模反转（数学法） | `O(log|x|)` | `O(1)` | 常规实现 |

