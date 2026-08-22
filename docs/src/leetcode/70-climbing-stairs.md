# [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)



## 一、题目描述

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶？



**示例 1：**

```
输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶：1 阶 + 1 阶；2 阶。
```

**示例 2：**

```
输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶：1 阶 + 1 阶 + 1 阶；1 阶 + 2 阶；2 阶 + 1 阶。
```

**提示：**

-   `1 <= n <= 45`



## 二、解答方法

### 2.1 方法一：动态规划（滚动数组）


1. **思路**

`dp[i]` 表示到达第 `i` 阶的方法数，转移 `dp[i] = dp[i-1] + dp[i-2]`，只需维护前两项即可。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}
```

```python [Python]
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b
```

```go [Go]
func climbStairs(n int) int {
    if n <= 2 { return n }
    a, b := 1, 2
    for i := 3; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}
```

```c [C]
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b; a = b; b = c;
    }
    return b;
}
```

```cpp [C++]
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b; a = b; b = c;
        }
        return b;
    }
};
```

```javascript [JavaScript]
var climbStairs = function(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) { const c = a + b; a = b; b = c; }
    return b;
};
```

```typescript [TypeScript]
function climbStairs(n: number): number {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) { const c = a + b; a = b; b = c; }
    return b;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，线性递推。
- **空间复杂度**：`O(1)`**，滚动变量。

### 2.2 方法二：矩阵快速幂


1. **思路**

将递推表示为矩阵乘，利用快速幂在 `O(log n)` 内求得第 `n` 项，适合 `n` 很大的场景。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        long[][] m = {{1, 1}, {1, 0}};
        long[][] res = pow(m, n - 1);
        return (int) (res[0][0] + res[0][1]);
    }
    private long[][] pow(long[][] a, int k) {
        long[][] r = {{1, 0}, {0, 1}};
        while (k > 0) {
            if ((k & 1) == 1) r = mul(r, a);
            a = mul(a, a);
            k >>= 1;
        }
        return r;
    }
    private long[][] mul(long[][] a, long[][] b) {
        long[][] c = new long[2][2];
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
        return c;
    }
}
```

```python [Python]
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        def mul(a, b):
            return [[a[0][0]*b[0][0]+a[0][1]*b[1][0], a[0][0]*b[0][1]+a[0][1]*b[1][1]],
                    [a[1][0]*b[0][0]+a[1][1]*b[1][0], a[1][0]*b[0][1]+a[1][1]*b[1][1]]]
        def pow(m, k):
            r = [[1, 0], [0, 1]]
            while k:
                if k & 1: r = mul(r, m)
                m = mul(m, m); k >>= 1
            return r
        res = pow([[1, 1], [1, 0]], n - 1)
        return res[0][0] + res[0][1]
```

```go [Go]
func climbStairs(n int) int {
    if n <= 2 { return n }
    pow := func(a [2][2]int, k int) [2][2]int {
        r := [2][2]int{{1, 0}, {0, 1}}
        for k > 0 {
            if k&1 == 1 { r = mul(r, a) }
            a = mul(a, a); k >>= 1
        }
        return r
    }
    res := pow([2][2]int{{1, 1}, {1, 0}}, n-1)
    return res[0][0] + res[0][1]
}
func mul(a, b [2][2]int) [2][2]int {
    return [2][2]int{
        {a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]},
        {a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]},
    }
}
```

```c [C]
int climbStairs(int n) {
    if (n <= 2) return n;
    long long a = 1, b = 1;
    for (int i = 2; i <= n; i++) { long long c = a + b; a = b; b = c; }
    return (int)b;
}
```

```cpp [C++]
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        long long a = 1, b = 1;
        for (int i = 2; i <= n; i++) { long long c = a + b; a = b; b = c; }
        return (int)b;
    }
};
```

```javascript [JavaScript]
var climbStairs = function(n) {
    if (n <= 2) return n;
    let a = 1, b = 1;
    for (let i = 2; i <= n; i++) { const c = a + b; a = b; b = c; }
    return b;
};
```

```typescript [TypeScript]
function climbStairs(n: number): number {
    if (n <= 2) return n;
    let a = 1, b = 1;
    for (let i = 2; i <= n; i++) { const c = a + b; a = b; b = c; }
    return b;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`，矩阵快速幂。
- **空间复杂度**：`O(1)`，固定 2×2 矩阵。

> 注：滚动数组已足够应对 `n <= 45`，矩阵快速幂主要用于演示 `O(log n)` 思路。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（滚动数组） | `O(n)` | `O(1)` | 直观简洁，面试首选 |
| 矩阵快速幂 | `O(log n)` | `O(1)` | 适合极大 n |
