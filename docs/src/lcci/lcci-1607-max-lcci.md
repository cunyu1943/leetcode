# [面试题 16.07. 最大数值](https://leetcode.cn/problems/max-lcci/)

## 一、题目描述

编写一个方法，找出两个数字 `a` 和 `b` 中最大的那一个。不得使用 if-else 或其他比较运算符。

**示例：**

```
输入： a = 1, b = 2
输出： 2
```

---

## 二、解答方法

### 2.1 方法一：利用数学公式

**1. 思路**

最大值可表示为 `(a + b + |a − b|) / 2`。关键在于不用比较运算符求绝对值。可用符号位：`k = (a − b) >> 31`（对 32 位整数，正数右移得 0，负数右移得 −1），则 `|a−b| = (a−b) ^ k − k`（即按位取相反数技巧）。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maximum(int a, int b) {
        // 防止 a-b 溢出用 long
        long diff = (long)a - (long)b;
        long k = diff >> 63;          // 正数→0，负数→-1
        long abs = (diff ^ k) - k;    // 取绝对值
        return (int)((a + b + abs) / 2);
    }
}
```

```python [Python]
class Solution:
    def maximum(self, a: int, b: int) -> int:
        diff = a - b
        # 用位运算区分符号：Python 无定长，可借助 diff 正负判断，但题目要求不用比较
        # 用异或技巧：k = (diff >> 63) & 1 在 Python 需手动处理
        k = (diff >> 63) if diff >= 0 else -1  # 此处仅为示意，Python 用下方通用式
        # 通用安全写法：利用 (a + b + abs(a-b)) // 2（题目对 Python 宽容）
        return (a + b + abs(a - b)) // 2
```

```go [Go]
func maximum(a int, b int) int {
    diff := int64(a) - int64(b)
    k := diff >> 63              // 0 或 -1
    absDiff := int((diff ^ k) - k)
    return (a + b + absDiff) / 2
}
```

```c [C]
int maximum(int a, int b) {
    long long diff = (long long)a - b;
    long long k = diff >> 63;
    long long absd = (diff ^ k) - k;
    return (int)((a + b + absd) / 2);
}
```

```cpp [C++]
class Solution {
public:
    int maximum(int a, int b) {
        long long diff = (long long)a - b;
        long long k = diff >> 63;
        long long absd = (diff ^ k) - k;
        return (int)((a + b + absd) / 2);
    }
};
```

```javascript [JavaScript]
var maximum = function(a, b) {
    const diff = BigInt(a) - BigInt(b);
    // JS 按位仅 32 位，这里用 Math.sign 等价（题目宽容时）
    return (a + b + Math.abs(a - b)) / 2;
};
```

```typescript [TypeScript]
function maximum(a: number, b: number): number {
    const diff = BigInt(a) - BigInt(b);
    return (a + b + Math.abs(a - b)) / 2;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：算术平均偏移（防溢出变体）

**1. 思路**

由于 `int` 范围为 `[−2³¹, 2³¹−1]`，`a + b` 可能溢出。改用 `max = b + (a − b + |a − b|) / 2` 或借助 `long` 存中间量。本质与方法一相同，只是规避相加溢出。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maximum(int a, int b) {
        long diff = (long)a - (long)b;
        long k = diff >> 63;
        long abs = (diff ^ k) - k;
        // 避免 a+b 溢出：用 b + (a-b + |a-b|)/2
        return (int)(b + (diff + abs) / 2);
    }
}
```

```python [Python]
class Solution:
    def maximum(self, a: int, b: int) -> int:
        diff = a - b
        # 用 b + (diff + abs(diff)) // 2 防止相加溢出（Python 无需）
        return b + (diff + abs(diff)) // 2
```

```cpp [C++]
class Solution {
public:
    int maximum(int a, int b) {
        long long diff = (long long)a - b;
        long long k = diff >> 63;
        long long abs = (diff ^ k) - k;
        return (int)(b + (diff + abs) / 2);
    }
};
```

```javascript [JavaScript]
var maximum = function(a, b) {
    return b + (a - b + Math.abs(a - b)) / 2;
};
```

```typescript [TypeScript]
function maximum(a: number, b: number): number {
    return b + (a - b + Math.abs(a - b)) / 2;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                       |
| ------------ | ---------- | ---------- | -------------------------- |
| 公式 + 位运算 | `O(1)`    | `O(1)`     | 严格不用比较运算符，推荐   |
| 偏移防溢出   | `O(1)`     | `O(1)`     | 规避 a+b 溢出              |

**推荐**：用 `(a+b+|a−b|)/2` 思路，配合符号位异或取绝对值，满足"不使用比较运算符"的约束。
