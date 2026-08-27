# [面试题 17.01. 不用加号的加法](https://leetcode.cn/problems/add-without-plus-lcci/)

## 一、题目描述

设计一个函数把两个数字相加。不得使用 `+` 或者其他算术运算符。

**示例：**

```
输入: a = 1, b = 1
输出: 2
```

**提示：**

- `a`、`b` 均可能是负数或 0。
- 结果不会溢出 32 位整数。

---

## 二、解答方法

### 2.1 方法一：位运算（半加器思想）

**1. 思路**

不使用算术运算符时，用位运算模拟加法：无进位和 = `a ^ b`，进位 = `(a & b) << 1`。将二者相加（递归或循环）直到进位为 0。

注意 Python 无符号整数处理：需将负数按 32 位补码处理，并在最后若结果溢出则转回负数。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int add(int a, int b) {
        while (b != 0) {
            int sum = (a ^ b);
            int carry = (a & b) << 1;
            a = sum;
            b = carry;
        }
        return a;
    }
}
```

```python [Python]
class Solution:
    def add(self, a: int, b: int) -> int:
        MASK = 0xFFFFFFFF
        while b & MASK:
            a, b = (a ^ b) & MASK, ((a & b) << 1) & MASK
        return a if a <= 0x7FFFFFFF else ~(a ^ MASK)
```

```go [Go]
func add(a int, b int) int {
    for b != 0 {
        sum := a ^ b
        carry := (a & b) << 1
        a, b = sum, carry
    }
    return a
}
```

```c [C]
int add(int a, int b) {
    while (b != 0) {
        int sum = a ^ b;
        int carry = (a & b) << 1;
        a = sum;
        b = carry;
    }
    return a;
}
```

```cpp [C++]
class Solution {
public:
    int add(int a, int b) {
        while (b) {
            int sum = a ^ b;
            int carry = (unsigned int)(a & b) << 1;
            a = sum;
            b = carry;
        }
        return a;
    }
};
```

```javascript [JavaScript]
var add = function(a, b) {
    while (b !== 0) {
        const sum = a ^ b;
        const carry = (a & b) << 1;
        a = sum;
        b = carry;
    }
    return a;
};
```

```typescript [TypeScript]
function add(a: number, b: number): number {
    while (b !== 0) {
        const sum = a ^ b;
        const carry = (a & b) << 1;
        a = sum;
        b = carry;
    }
    return a;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，循环次数受整数位数限制（最多 32 次）。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：递归版位运算

**1. 思路**

与方法一等价，用递归表达：`add(a, b) = add(a ^ b, (a & b) << 1)`，直到进位为 0。代码更简洁，但深度受位数限制。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int add(int a, int b) {
        return b == 0 ? a : add(a ^ b, (a & b) << 1);
    }
}
```

```python [Python]
class Solution:
    def add(self, a: int, b: int) -> int:
        MASK = 0xFFFFFFFF
        if not b & MASK:
            return a if a <= 0x7FFFFFFF else ~(a ^ MASK)
        return self.add((a ^ b) & MASK, ((a & b) << 1) & MASK)
```

```cpp [C++]
class Solution {
public:
    int add(int a, int b) {
        return b == 0 ? a : add(a ^ b, (unsigned int)(a & b) << 1);
    }
};
```

```javascript [JavaScript]
var add = function(a, b) {
    return b === 0 ? a : add(a ^ b, (a & b) << 1);
};
```

```typescript [TypeScript]
function add(a: number, b: number): number {
    return b === 0 ? a : add(a ^ b, (a & b) << 1);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`（递归栈 `O(位数)`）。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 迭代位运算     | `O(1)`     | `O(1)`     | 推荐，无栈溢出风险         |
| 递归位运算     | `O(1)`     | `O(位数)`  | 代码简洁，深度可控         |

**推荐**：使用迭代位运算，避免递归深度问题，对负数需按 32 位补码处理（如 Python）。
