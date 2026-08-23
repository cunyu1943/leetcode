# [LCR 072. x 的平方根](https://leetcode.cn/problems/jJ0w9p/)



## 一、题目描述

给你一个非负整数 `x` ，计算并返回 `x` 的 **算术平方根** 。

由于返回类型是整数，结果只保留 **整数部分** ，小数部分将被 **舍去** 。

**注意：** 不允许使用任何内置指数函数和算符，例如 `pow(x, 0.5)` 或者 `x ** 0.5` 。



**示例 1：**

```
输入：x = 4
输出：2
```

**示例 2：**

```
输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842...，由于返回类型是整数，小数部分将被舍去。
```

**提示：**

- `0 <= x <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：二分查找

1. **思路**

在 `[0, x]` 中二分找最大的 `m` 使 `m² <= x`：

- 若 `mid² <= x`，答案至少为 `mid`，`l = mid + 1`；
- 否则 `r = mid - 1`。

返回 `r`（最后一个满足 `m² <= x` 的数）。注意用 `long` 防溢出。时间 `O(log x)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int mySqrt(int x) {
        int l = 0, r = x, ans = 0;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((long) m * m <= x) { ans = m; l = m + 1; }
            else r = m - 1;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def mySqrt(self, x: int) -> int:
        l, r, ans = 0, x, 0
        while l <= r:
            m = (l + r) // 2
            if m * m <= x:
                ans = m
                l = m + 1
            else:
                r = m - 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int mySqrt(int x) {
        int l = 0, r = x, ans = 0;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((long long)m * m <= x) { ans = m; l = m + 1; }
            else r = m - 1;
        }
        return ans;
    }
};
```

```go [Go]
func mySqrt(x int) int {
    l, r, ans := 0, x, 0
    for l <= r {
        m := l + (r-l)/2
        if int64(m)*int64(m) <= int64(x) {
            ans = m
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    let l = 0, r = x, ans = 0;
    while (l <= r) {
        const m = (l + r) >> 1;
        if (m * m <= x) { ans = m; l = m + 1; }
        else r = m - 1;
    }
    return ans;
};
```

```c [C]
int mySqrt(int x) {
    int l = 0, r = x, ans = 0;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if ((long long)m * m <= (long long)x) { ans = m; l = m + 1; }
        else r = m - 1;
    }
    return ans;
}
```

```ts [TypeScript]
function mySqrt(x: number): number {
    let l = 0, r = x, ans = 0;
    while (l <= r) {
        const m = (l + r) >> 1;
        if (m * m <= x) { ans = m; l = m + 1; }
        else r = m - 1;
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(log x)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：牛顿迭代法

1. **思路**

求方程 `f(t) = t² - x = 0` 的正根。迭代公式：

```
t = (t + x / t) / 2
```

从 `x` 开始迭代，直到收敛。时间近似 `O(log x)`，收敛极快。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int mySqrt(int x) {
        if (x == 0) return 0;
        double t = x;
        while (true) {
            double nt = (t + x / t) / 2;
            if (Math.abs(nt - t) < 1e-7) break;
            t = nt;
        }
        return (int) t;
    }
}
```

```python [Python]
class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0:
            return 0
        t = float(x)
        while True:
            nt = (t + x / t) / 2
            if abs(nt - t) < 1e-7:
                break
            t = nt
        return int(t)
```

```cpp [C++]
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0) return 0;
        double t = x;
        while (true) {
            double nt = (t + x / t) / 2;
            if (fabs(nt - t) < 1e-7) break;
            t = nt;
        }
        return (int)t;
    }
};
```

```go [Go]
func mySqrt(x int) int {
    if x == 0 {
        return 0
    }
    t := float64(x)
    for {
        nt := (t + float64(x)/t) / 2
        if math.Abs(nt-t) < 1e-7 {
            break
        }
        t = nt
    }
    return int(t)
}
```

```js [JavaScript]
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x === 0) return 0;
    let t = x;
    while (true) {
        const nt = (t + x / t) / 2;
        if (Math.abs(nt - t) < 1e-7) break;
        t = nt;
    }
    return Math.floor(t);
};
```

```c [C]
#include <math.h>

int mySqrt(int x) {
    if (x == 0) return 0;
    double t = x;
    while (1) {
        double nt = (t + x / t) / 2;
        if (fabs(nt - t) < 1e-7) break;
        t = nt;
    }
    return (int)t;
}
```

```ts [TypeScript]
function mySqrt(x: number): number {
    if (x === 0) return 0;
    let t = x;
    while (true) {
        const nt = (t + x / t) / 2;
        if (Math.abs(nt - t) < 1e-7) break;
        t = nt;
    }
    return Math.floor(t);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：迭代收敛，近似 `O(log x)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分查找 | `O(log x)` | `O(1)` | 最稳妥，推荐 |
| 牛顿迭代 | 近似 `O(log x)` | `O(1)` | 收敛快，需注意精度 |

二分法通过「找最大的 m 使 m² ≤ x」直接得到整数平方根；牛顿迭代法则从数值角度快速逼近精确根再截断。

