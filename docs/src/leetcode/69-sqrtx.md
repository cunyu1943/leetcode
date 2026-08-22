# [69. x 的平方根](https://leetcode.cn/problems/sqrtx/)



## 一、题目描述

给你一个非负整数 `x`，计算并返回 `x` 的 **算术平方根**。

由于返回类型是整数，结果只保留 **整数部分**，小数部分将被 **舍去**。

**注意：** 不允许使用任何内置指数函数和算符，例如 `pow(x, 0.5)` 或者 `x ** 0.5`。



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

-   `0 <= x <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：二分查找


1. **思路**

在 `[0, x]` 区间内二分，寻找最大的 `mid` 满足 `mid * mid <= x`。注意用 `mid <= x / mid` 避免溢出。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int mySqrt(int x) {
        int l = 0, r = x;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (mid <= x / mid) l = mid + 1;
            else r = mid - 1;
        }
        return r;
    }
}
```

```python [Python]
class Solution:
    def mySqrt(self, x: int) -> int:
        l, r = 0, x
        while l <= r:
            mid = (l + r) // 2
            if mid * mid <= x:
                l = mid + 1
            else:
                r = mid - 1
        return r
```

```go [Go]
func mySqrt(x int) int {
    l, r := 0, x
    for l <= r {
        mid := l + (r-l)/2
        if mid <= x/mid { l = mid + 1 } else { r = mid - 1 }
    }
    return r
}
```

```c [C]
int mySqrt(int x) {
    int l = 0, r = x;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (mid <= x / mid) l = mid + 1;
        else r = mid - 1;
    }
    return r;
}
```

```cpp [C++]
class Solution {
public:
    int mySqrt(int x) {
        int l = 0, r = x;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if ((long long)mid * mid <= x) l = mid + 1;
            else r = mid - 1;
        }
        return r;
    }
};
```

```javascript [JavaScript]
var mySqrt = function(x) {
    let l = 0, r = x;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (mid <= Math.floor(x / mid)) l = mid + 1;
        else r = mid - 1;
    }
    return r;
};
```

```typescript [TypeScript]
function mySqrt(x: number): number {
    let l = 0, r = x;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (mid <= Math.floor(x / mid)) l = mid + 1;
        else r = mid - 1;
    }
    return r;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log x)`**，二分区间长度每轮减半。
- **空间复杂度**：`O(1)`**，只用常数变量。

### 2.2 方法二：牛顿迭代法


1. **思路**

利用牛顿法迭代公式 `x_{n+1} = (x_n + a / x_n) / 2` 逼近平方根，收敛速度比二分更快。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int mySqrt(int x) {
        if (x == 0) return 0;
        long r = x;
        while (r > x / r) {
            r = (r + x / r) / 2;
        }
        return (int) r;
    }
}
```

```python [Python]
class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0:
            return 0
        r = x
        while r > x // r:
            r = (r + x // r) // 2
        return r
```

```go [Go]
func mySqrt(x int) int {
    if x == 0 { return 0 }
    r := x
    for r > x/r { r = (r + x/r) / 2 }
    return r
}
```

```c [C]
int mySqrt(int x) {
    if (x == 0) return 0;
    long r = x;
    while (r > x / r) r = (r + x / r) / 2;
    return (int)r;
}
```

```cpp [C++]
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0) return 0;
        long r = x;
        while (r > x / r) r = (r + x / r) / 2;
        return (int)r;
    }
};
```

```javascript [JavaScript]
var mySqrt = function(x) {
    if (x === 0) return 0;
    let r = x;
    while (r > Math.floor(x / r)) r = Math.floor((r + Math.floor(x / r)) / 2);
    return r;
};
```

```typescript [TypeScript]
function mySqrt(x: number): number {
    if (x === 0) return 0;
    let r = x;
    while (r > Math.floor(x / r)) r = Math.floor((r + Math.floor(x / r)) / 2);
    return r;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log x)`**，牛顿法二次收敛，常数更小。
- **空间复杂度**：`O(1)`**，只用常数变量。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分查找 | `O(log x)` | `O(1)` | 思路直观，稳定 |
| 牛顿迭代法 | `O(log x)` | `O(1)` | 收敛更快，推荐 |
