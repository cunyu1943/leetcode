# [面试题 08.01. 三步问题](https://leetcode.cn/problems/three-steps-problem-lcci/)

## 一、题目描述

三步问题。有个小孩正在上楼梯，楼梯有 n 阶台阶，小孩一次可以上 1 阶、2 阶或 3 阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模 1000000007。

**示例 1：**

```
输入：n = 3
输出：4
说明：有四种走法
```

**示例 2：**

```
输入：n = 5
输出：13
```

**提示：**

- n 范围在 `[1, 1000000]` 之间。

---

## 二、解答方法

### 2.1 方法一：动态规划（迭代）

**1. 思路**

设 `dp[i]` 表示走到第 `i` 阶的方法数。最后一步可能是从第 `i-1`、`i-2` 或 `i-3` 阶跨上来的，因此状态转移方程为：

`dp[i] = dp[i-1] + dp[i-2] + dp[i-3]`

初始：`dp[0] = 1`（地面，1 种方式）、`dp[1] = 1`、`dp[2] = 2`。由于只需前三项，可用滚动变量把空间优化到 `O(1)`，并时刻对 `1000000007` 取模避免溢出。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int waysToStep(int n) {
        final int MOD = 1000000007;
        if (n == 1) return 1;
        if (n == 2) return 2;
        if (n == 3) return 4;
        long a = 1, b = 2, c = 4;
        for (int i = 4; i <= n; i++) {
            long d = (a + b + c) % MOD;
            a = b;
            b = c;
            c = d;
        }
        return (int) c;
    }
}
```

```python [Python]
class Solution:
    def waysToStep(self, n: int) -> int:
        MOD = 1000000007
        if n == 1:
            return 1
        if n == 2:
            return 2
        if n == 3:
            return 4
        a, b, c = 1, 2, 4
        for _ in range(4, n + 1):
            d = (a + b + c) % MOD
            a, b, c = b, c, d
        return c
```

```go [Go]
func waysToStep(n int) int {
	const MOD int64 = 1000000007
	if n == 1 {
		return 1
	}
	if n == 2 {
		return 2
	}
	if n == 3 {
		return 4
	}
	a, b, c := int64(1), int64(2), int64(4)
	for i := 4; i <= n; i++ {
		d := (a + b + c) % MOD
		a, b, c = b, c, d
	}
	return int(c)
}
```

```c [C]
int waysToStep(int n) {
    const int MOD = 1000000007;
    if (n == 1) return 1;
    if (n == 2) return 2;
    if (n == 3) return 4;
    long a = 1, b = 2, c = 4;
    for (int i = 4; i <= n; i++) {
        long d = (a + b + c) % MOD;
        a = b;
        b = c;
        c = d;
    }
    return (int) c;
}
```

```cpp [C++]
class Solution {
public:
    int waysToStep(int n) {
        const int MOD = 1000000007;
        if (n == 1) return 1;
        if (n == 2) return 2;
        if (n == 3) return 4;
        long a = 1, b = 2, c = 4;
        for (int i = 4; i <= n; i++) {
            long d = (a + b + c) % MOD;
            a = b;
            b = c;
            c = d;
        }
        return (int) c;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function (n) {
    const MOD = 1000000007;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;
    let a = 1n, b = 2n, c = 4n;
    for (let i = 4; i <= n; i++) {
        const d = (a + b + c) % 1000000007n;
        a = b;
        b = c;
        c = d;
    }
    return Number(c);
};
```

```typescript [TypeScript]
function waysToStep(n: number): number {
    const MOD = 1000000007;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;
    let a = 1n, b = 2n, c = 4n;
    for (let i = 4; i <= n; i++) {
        const d = (a + b + c) % 1000000007n;
        a = b;
        b = c;
        c = d;
    }
    return Number(c);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`，仅用滚动变量。

---

### 2.2 方法二：矩阵快速幂（进阶）

**1. 思路**

状态转移可写成 3×3 矩阵的形式，利用矩阵快速幂可在 `O(log n)` 时间内求出第 `n` 项，适合 `n` 极大的场景。面试中迭代动态规划通常已足够，矩阵快速幂仅作性能优化的拓展思路。

**状态矩阵：**

```
[dp[i]  ]   [1 1 1][dp[i-1]]
[dp[i-1]] = [1 0 0][dp[i-2]]
[dp[i-2]]   [0 1 0][dp[i-3]]
```

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    static final int MOD = 1000000007;
    public int waysToStep(int n) {
        if (n == 1) return 1;
        if (n == 2) return 2;
        if (n == 3) return 4;
        long[][] base = {{1, 1, 1}, {1, 0, 0}, {0, 1, 0}};
        long[][] res = matrixPow(base, n - 3);
        long ans = (res[0][0] * 4 + res[0][1] * 2 + res[0][2] * 1) % MOD;
        return (int) ans;
    }
    private long[][] matrixPow(long[][] m, int p) {
        long[][] r = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
        while (p > 0) {
            if ((p & 1) == 1) r = multiply(r, m);
            m = multiply(m, m);
            p >>= 1;
        }
        return r;
    }
    private long[][] multiply(long[][] a, long[][] b) {
        long[][] c = new long[3][3];
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                for (int k = 0; k < 3; k++)
                    c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        return c;
    }
}
```

```python [Python]
class Solution:
    def waysToStep(self, n: int) -> int:
        MOD = 1000000007
        if n == 1:
            return 1
        if n == 2:
            return 2
        if n == 3:
            return 4

        def multiply(a, b):
            c = [[0] * 3 for _ in range(3)]
            for i in range(3):
                for j in range(3):
                    for k in range(3):
                        c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD
            return c

        def powM(m, p):
            r = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
            while p:
                if p & 1:
                    r = multiply(r, m)
                m = multiply(m, m)
                p >>= 1
            return r

        base = [[1, 1, 1], [1, 0, 0], [0, 1, 0]]
        res = powM(base, n - 3)
        return (res[0][0] * 4 + res[0][1] * 2 + res[0][2] * 1) % MOD
```

```go [Go]
func waysToStep(n int) int {
	const MOD int64 = 1000000007
	if n == 1 {
		return 1
	}
	if n == 2 {
		return 2
	}
	if n == 3 {
		return 4
	}
	base := [3][3]int64{{1, 1, 1}, {1, 0, 0}, {0, 1, 0}}
	res := matrixPow(base, n-3)
	ans := (res[0][0]*4 + res[0][1]*2 + res[0][2]*1) % MOD
	return int(ans)
}

func multiply(a, b [3][3]int64) [3][3]int64 {
	var c [3][3]int64
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			for k := 0; k < 3; k++ {
				c[i][j] = (c[i][j] + a[i][k]*b[k][j]) % MOD
			}
		}
	}
	return c
}

func matrixPow(m [3][3]int64, p int) [3][3]int64 {
	var r [3][3]int64 = [3][3]int64{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}
	for p > 0 {
		if p&1 == 1 {
			r = multiply(r, m)
		}
		m = multiply(m, m)
		p >>= 1
	}
	return r
}
```

```c [C]
#define MOD 1000000007
void multiply(long a[3][3], long b[3][3], long c[3][3]) {
    long t[3][3] = {0};
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            for (int k = 0; k < 3; k++)
                t[i][j] = (t[i][j] + a[i][k] * b[k][j]) % MOD;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            c[i][j] = t[i][j];
}
int waysToStep(int n) {
    if (n == 1) return 1;
    if (n == 2) return 2;
    if (n == 3) return 4;
    long base[3][3] = {{1,1,1},{1,0,0},{0,1,0}};
    long res[3][3] = {{1,0,0},{0,1,0},{0,0,1}};
    int p = n - 3;
    while (p > 0) {
        if (p & 1) multiply(res, base, res);
        multiply(base, base, base);
        p >>= 1;
    }
    long ans = (res[0][0]*4 + res[0][1]*2 + res[0][2]*1) % MOD;
    return (int) ans;
}
```

```cpp [C++]
class Solution {
public:
    static const int MOD = 1000000007;
    int waysToStep(int n) {
        if (n == 1) return 1;
        if (n == 2) return 2;
        if (n == 3) return 4;
        vector<vector<long>> base = {{1,1,1},{1,0,0},{0,1,0}};
        vector<vector<long>> res = {{1,0,0},{0,1,0},{0,0,1}};
        int p = n - 3;
        while (p > 0) {
            if (p & 1) res = multiply(res, base);
            base = multiply(base, base);
            p >>= 1;
        }
        long ans = (res[0][0]*4 + res[0][1]*2 + res[0][2]*1) % MOD;
        return (int) ans;
    }
private:
    vector<vector<long>> multiply(vector<vector<long>>& a, vector<vector<long>>& b) {
        vector<vector<long>> c(3, vector<long>(3, 0));
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                for (int k = 0; k < 3; k++)
                    c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        return c;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function (n) {
    const MOD = 1000000007n;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;
    const multiply = (a, b) => {
        const c = [[0n,0n,0n],[0n,0n,0n],[0n,0n,0n]];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        return c;
    };
    let base = [[1n,1n,1n],[1n,0n,0n],[0n,1n,0n]];
    let res = [[1n,0n,0n],[0n,1n,0n],[0n,0n,1n]];
    let p = n - 3;
    while (p > 0) {
        if (p & 1) res = multiply(res, base);
        base = multiply(base, base);
        p >>= 1;
    }
    const ans = (res[0][0]*4n + res[0][1]*2n + res[0][2]*1n) % MOD;
    return Number(ans);
};
```

```typescript [TypeScript]
function waysToStep(n: number): number {
    const MOD = 1000000007n;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;
    const multiply = (a: bigint[][], b: bigint[][]): bigint[][] => {
        const c: bigint[][] = [[0n,0n,0n],[0n,0n,0n],[0n,0n,0n]];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        return c;
    };
    let base: bigint[][] = [[1n,1n,1n],[1n,0n,0n],[0n,1n,0n]];
    let res: bigint[][] = [[1n,0n,0n],[0n,1n,0n],[0n,0n,1n]];
    let p = n - 3;
    while (p > 0) {
        if (p & 1) res = multiply(res, base);
        base = multiply(base, base);
        p >>= 1;
    }
    const ans = (res[0][0]*4n + res[0][1]*2n + res[0][2]*1n) % MOD;
    return Number(ans);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log n)`（矩阵快速幂）。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                                 |
| ------------ | ---------- | ---------- | ------------------------------------ |
| 动态规划迭代 | `O(n)`     | `O(1)`     | 代码简洁，面试首选，推荐             |
| 矩阵快速幂   | `O(log n)` | `O(1)`     | 超大 n 下更优，理解成本高，可作拓展 |

**推荐解法**：方法一（动态规划迭代）。核心状态转移 `dp[i] = dp[i-1] + dp[i-2] + dp[i-3]`，注意每次相加都要对 `1000000007` 取模（Java/C/C++ 用 `long` 暂存再取模，JS/TS 用 `BigInt` 避免精度丢失），否则会溢出。
