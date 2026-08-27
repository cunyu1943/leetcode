# [面试题 16.05. 阶乘尾数](https://leetcode.cn/problems/factorial-zeros-lcci/)

## 一、题目描述

给定一个整数 `n`，返回 `n!` （`n` 的阶乘）的尾随零的个数。注意：你的解法应处于对数及优于线性的时间复杂度。

**示例 1：**

```
输入：n = 3
输出：0
解释：3! = 6，尾数为 0 个 0。
```

**示例 2：**

```
输入：n = 5
输出：1
解释：5! = 120，尾数为 1 个 0。
```

**示例 3：**

```
输入：n = 10
输出：2
```

---

## 二、解答方法

### 2.1 方法一：统计因子 5 的个数

**1. 思路**

阶乘尾零由因子 `2 × 5` 决定。2 的数量总是多于 5，所以只需统计 `1..n` 中因子 5 的总个数。等价于累加 `⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int trailingZeroes(int n) {
        int ans = 0;
        while (n > 0) {
            n /= 5;
            ans += n;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def trailingZeroes(self, n: int) -> int:
        ans = 0
        while n > 0:
            n //= 5
            ans += n
        return ans
```

```go [Go]
func trailingZeroes(n int) int {
    ans := 0
    for n > 0 {
        n /= 5
        ans += n
    }
    return ans
}
```

```c [C]
int trailingZeroes(int n) {
    int ans = 0;
    while (n > 0) { n /= 5; ans += n; }
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int trailingZeroes(int n) {
        int ans = 0;
        while (n > 0) { n /= 5; ans += n; }
        return ans;
    }
};
```

```javascript [JavaScript]
var trailingZeroes = function(n) {
    let ans = 0;
    while (n > 0) { n = Math.floor(n / 5); ans += n; }
    return ans;
};
```

```typescript [TypeScript]
function trailingZeroes(n: number): number {
    let ans = 0;
    while (n > 0) { n = Math.floor(n / 5); ans += n; }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log n)`（以 5 为底）。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：递归写法

**1. 思路**

将累加过程写成递归：`f(n) = ⌊n/5⌋ + f(⌊n/5⌋)`。逻辑同方法一，代码更简洁。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int trailingZeroes(int n) {
        if (n == 0) return 0;
        return n / 5 + trailingZeroes(n / 5);
    }
}
```

```python [Python]
class Solution:
    def trailingZeroes(self, n: int) -> int:
        return 0 if n == 0 else n // 5 + self.trailingZeroes(n // 5)
```

```cpp [C++]
class Solution {
public:
    int trailingZeroes(int n) {
        return n == 0 ? 0 : n / 5 + trailingZeroes(n / 5);
    }
};
```

```javascript [JavaScript]
var trailingZeroes = function(n) {
    if (n === 0) return 0;
    return Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5));
};
```

```typescript [TypeScript]
function trailingZeroes(n: number): number {
    if (n === 0) return 0;
    return Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5));
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(log n)`（递归栈）。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                       |
| -------- | ---------- | ---------- | -------------------------- |
| 迭代统计 | `O(log n)` | `O(1)`     | 最优，推荐                 |
| 递归统计 | `O(log n)` | `O(log n)` | 代码简洁                   |

**推荐**：使用迭代统计因子 5 的个数，时间复杂度 `O(log n)` 优于线性。
