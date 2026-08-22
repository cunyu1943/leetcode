# [50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)



## 一、题目描述

实现 `pow(x, n)`，即计算 `x` 的整数 `n` 次幂函数（即，`x^n`）。



**示例 1：**

```
输入：x = 2.00000, n = 10
输出：1024.00000
```

**示例 2：**

```
输入：x = 2.10000, n = 3
输出：9.26100
```

**示例 3：**

```
输入：x = 2.00000, n = -2
输出：0.25000
解释：2⁻² = 1/4 = 0.25
```

**提示：**

-   `-100.0 < x < 100.0`
-   `-2^31 <= n <= 2^31 - 1`
-   `n` 是一个整数
-   要么 `x` 不为零，要么 `n > 0`
-   `-10^4 <= x^n <= 10^4`



## 二、解答方法

### 2.1 方法一：快速幂（递归，二分思想）

1. **思路**

利用 `x^n = x^(n/2) * x^(n/2)`，把指数折半：

-   若 `n == 0` 返回 1；若 `n < 0` 转成 `1 / x^(-n)`（注意 `n = -2^31` 时取反会溢出，用 `long` 处理）；
-   递归计算 `half = myPow(x, n/2)`，返回 `n` 为偶数则 `half * half`，奇数则 `half * half * x`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public double myPow(double x, int n) {
        long N = n;
        return N >= 0 ? quickPow(x, N) : 1.0 / quickPow(x, -N);
    }

    private double quickPow(double x, long n) {
        if (n == 0) return 1.0;
        double half = quickPow(x, n / 2);
        return n % 2 == 0 ? half * half : half * half * x;
    }
}
```

```python [Python]
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def quick_pow(x: float, n: int) -> float:
            if n == 0:
                return 1.0
            half = quick_pow(x, n // 2)
            return half * half if n % 2 == 0 else half * half * x
        return quick_pow(x, n) if n >= 0 else 1.0 / quick_pow(x, -n)
```

```go [Go]
func myPow(x float64, n int) float64 {
    N := int64(n)
    var quick func(float64, int64) float64
    quick = func(x float64, n int64) float64 {
        if n == 0 {
            return 1.0
        }
        half := quick(x, n/2)
        if n%2 == 0 {
            return half * half
        }
        return half * half * x
    }
    if N >= 0 {
        return quick(x, N)
    }
    return 1.0 / quick(x, -N)
}
```

```c [C]
double myPow(double x, int n) {
    long N = n;
    double quick(double x, long n) {
        if (n == 0) return 1.0;
        double half = quick(x, n / 2);
        return n % 2 == 0 ? half * half : half * half * x;
    }
    if (N >= 0) return quick(x, N);
    return 1.0 / quick(x, -N);
}
```

```cpp [C++]
class Solution {
public:
    double myPow(double x, int n) {
        long N = n;
        return N >= 0 ? quickPow(x, N) : 1.0 / quickPow(x, -N);
    }

private:
    double quickPow(double x, long n) {
        if (n == 0) return 1.0;
        double half = quickPow(x, n / 2);
        return n % 2 == 0 ? half * half : half * half * x;
    }
};
```

```js [JavaScript]
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    const quickPow = (x, n) => {
        if (n === 0) return 1.0;
        const half = quickPow(x, Math.floor(n / 2));
        return n % 2 === 0 ? half * half : half * half * x;
    };
    return n >= 0 ? quickPow(x, n) : 1.0 / quickPow(x, -n);
};
```

```ts [TypeScript]
function myPow(x: number, n: number): number {
    const quickPow = (x: number, n: number): number => {
        if (n === 0) return 1.0;
        const half = quickPow(x, Math.floor(n / 2));
        return n % 2 === 0 ? half * half : half * half * x;
    };
    return n >= 0 ? quickPow(x, n) : 1.0 / quickPow(x, -n);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log |n|)`，每轮指数折半。
- **空间复杂度**：`O(log |n|)`，递归栈深度。

### 2.2 方法二：快速幂（迭代，二进制拆分）

1. **思路**

把指数 `n` 拆成二进制，从低到高遍历其比特位：当前位为 1 时把「当前底数幂」乘入结果，底数每轮自乘平方，指数右移。全程循环无递归，空间 `O(1)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) { x = 1 / x; N = -N; }
        double res = 1.0;
        while (N > 0) {
            if ((N & 1) == 1) res *= x;
            x *= x;
            N >>= 1;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def myPow(self, x: float, n: int) -> float:
        N = n
        if N < 0:
            x = 1 / x
            N = -N
        res = 1.0
        while N > 0:
            if N & 1:
                res *= x
            x *= x
            N >>= 1
        return res
```

```go [Go]
func myPow(x float64, n int) float64 {
    N := int64(n)
    if N < 0 {
        x = 1 / x
        N = -N
    }
    res := 1.0
    for N > 0 {
        if N&1 == 1 {
            res *= x
        }
        x *= x
        N >>= 1
    }
    return res
}
```

```c [C]
double myPow(double x, int n) {
    long N = n;
    if (N < 0) { x = 1.0 / x; N = -N; }
    double res = 1.0;
    while (N > 0) {
        if (N & 1) res *= x;
        x *= x;
        N >>= 1;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    double myPow(double x, int n) {
        long N = n;
        if (N < 0) { x = 1 / x; N = -N; }
        double res = 1.0;
        while (N > 0) {
            if (N & 1) res *= x;
            x *= x;
            N >>= 1;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    let N = n;
    if (N < 0) { x = 1 / x; N = -N; }
    let res = 1.0;
    while (N > 0) {
        if (N & 1) res *= x;
        x *= x;
        N >>= 1;
    }
    return res;
};
```

```ts [TypeScript]
function myPow(x: number, n: number): number {
    let N = n;
    if (N < 0) { x = 1 / x; N = -N; }
    let res = 1.0;
    while (N > 0) {
        if (N & 1) res *= x;
        x *= x;
        N >>= 1;
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log |n|)`。
- **空间复杂度**：`O(1)`，无递归栈。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 快速幂（递归，二分思想） | `O(log |n|)` | `O(log |n|)` | 思路清晰，二分递归 |
| 快速幂（迭代，二进制拆分） | `O(log |n|)` | `O(1)` | 无递归，空间更优，推荐 |

