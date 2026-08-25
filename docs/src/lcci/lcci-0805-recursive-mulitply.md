# [面试题 08.05. 递归乘法](https://leetcode.cn/problems/recursive-mulitply-lcci/)

## 一、题目描述

递归乘法。写一个递归函数，不使用 `*` 运算符，实现两个正整数的相乘。可以使用加号、减号、位移，但要吝啬一些。

**示例 1：**

```
输入：A = 1, B = 10
输出：10
```

**示例 2：**

```
输入：A = 3, B = 4
输出：12
```

**提示：**

- 保证乘法范围不会溢出。

---

## 二、解答方法

### 2.1 方法一：减半 + 位运算（高效递归）

**1. 思路**

把 `a * b` 拆成更小的子问题，避免逐次相加（逐次相加是 `O(b)` 的朴素做法）。令 `a` 为较小者、`b` 为较大者（减少递归深度），利用：

- 若 `a` 为偶数：`a * b = 2 * (a/2) * b = (a/2 * b) << 1`
- 若 `a` 为奇数：`a * b = (a-1) * b + b`

递归到 `a == 0` 返回 0，即为 `O(log a)` 的递归乘法（与快速幂思想一致）。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int multiply(int A, int B) {
        int a = Math.min(A, B);
        int b = Math.max(A, B);
        return dfs(a, b);
    }
    private int dfs(int a, int b) {
        if (a == 0) return 0;
        if (a == 1) return b;
        int half = dfs(a >> 1, b);
        int res = half << 1;
        if ((a & 1) == 1) res += b;   // a 为奇数时补一个 b
        return res;
    }
}
```

```python [Python]
class Solution:
    def multiply(self, A: int, B: int) -> int:
        a, b = min(A, B), max(A, B)
        def dfs(a, b):
            if a == 0:
                return 0
            if a == 1:
                return b
            half = dfs(a >> 1, b)
            res = half << 1
            if a & 1:
                res += b
            return res
        return dfs(a, b)
```

```go [Go]
func multiply(A int, B int) int {
	a, b := A, B
	if a > b {
		a, b = b, a
	}
	var dfs func(int, int) int
	dfs = func(a, b int) int {
		if a == 0 {
			return 0
		}
		if a == 1 {
			return b
		}
		half := dfs(a>>1, b)
		res := half << 1
		if a&1 == 1 {
			res += b
		}
		return res
	}
	return dfs(a, b)
}
```

```c [C]
int dfs(int a, int b) {
    if (a == 0) return 0;
    if (a == 1) return b;
    int half = dfs(a >> 1, b);
    int res = half << 1;
    if (a & 1) res += b;
    return res;
}
int multiply(int A, int B) {
    int a = A < B ? A : B;
    int b = A < B ? B : A;
    return dfs(a, b);
}
```

```cpp [C++]
class Solution {
public:
    int multiply(int A, int B) {
        int a = min(A, B), b = max(A, B);
        return dfs(a, b);
    }
private:
    int dfs(int a, int b) {
        if (a == 0) return 0;
        if (a == 1) return b;
        int half = dfs(a >> 1, b);
        int res = half << 1;
        if (a & 1) res += b;
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var multiply = function (A, B) {
    let a = Math.min(A, B), b = Math.max(A, B);
    const dfs = (a, b) => {
        if (a === 0) return 0;
        if (a === 1) return b;
        const half = dfs(Math.floor(a / 2), b);
        let res = half << 1;
        if (a & 1) res += b;
        return res;
    };
    return dfs(a, b);
};
```

```typescript [TypeScript]
function multiply(A: number, B: number): number {
    let a = Math.min(A, B), b = Math.max(A, B);
    const dfs = (a: number, b: number): number => {
        if (a === 0) return 0;
        if (a === 1) return b;
        const half = dfs(Math.floor(a / 2), b);
        let res = half << 1;
        if (a & 1) res += b;
        return res;
    };
    return dfs(a, b);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log(min(A, B)))`，每次递归规模减半。
- **空间复杂度**：`O(log(min(A, B)))` 递归栈。

---

### 2.2 方法二：俄罗斯农民乘法（迭代）

**1. 思路**

非递归版本，思路与减半一致：用 `a, b` 两变量，`a` 右移、`b` 左移，每当 `a` 的最低位为 1 就把当前 `b` 累加进结果。本质是把 `a` 写成二进制，用位运算累加 `b` 的倍数，等价于 `O(log a)` 的迭代乘法。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int multiply(int A, int B) {
        int a = Math.min(A, B);
        int b = Math.max(A, B);
        int res = 0;
        while (a > 0) {
            if ((a & 1) == 1) res += b;   // a 当前最低位为 1，累加 b
            a >>= 1;
            b <<= 1;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def multiply(self, A: int, B: int) -> int:
        a, b = min(A, B), max(A, B)
        res = 0
        while a > 0:
            if a & 1:
                res += b
            a >>= 1
            b <<= 1
        return res
```

```go [Go]
func multiply(A int, B int) int {
	a, b := A, B
	if a > b {
		a, b = b, a
	}
	res := 0
	for a > 0 {
		if a&1 == 1 {
			res += b
		}
		a >>= 1
		b <<= 1
	}
	return res
}
```

```c [C]
int multiply(int A, int B) {
    int a = A < B ? A : B;
    int b = A < B ? B : A;
    int res = 0;
    while (a > 0) {
        if (a & 1) res += b;
        a >>= 1;
        b <<= 1;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    int multiply(int A, int B) {
        int a = min(A, B), b = max(A, B);
        int res = 0;
        while (a > 0) {
            if (a & 1) res += b;
            a >>= 1;
            b <<= 1;
        }
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var multiply = function (A, B) {
    let a = Math.min(A, B), b = Math.max(A, B);
    let res = 0;
    while (a > 0) {
        if (a & 1) res += b;
        a >>= 1;
        b <<= 1;
    }
    return res;
};
```

```typescript [TypeScript]
function multiply(A: number, B: number): number {
    let a = Math.min(A, B), b = Math.max(A, B);
    let res = 0;
    while (a > 0) {
        if (a & 1) res += b;
        a >>= 1;
        b <<= 1;
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log(min(A, B)))`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法             | 时间复杂度 | 空间复杂度 | 特点                               |
| ---------------- | ---------- | ---------- | ---------------------------------- |
| 减半 + 位运算（递归） | `O(log min)` | `O(log min)` | 思路清晰，面试题面首选，推荐     |
| 俄罗斯农民乘法   | `O(log min)` | `O(1)`     | 迭代实现，无需递归栈               |

**推荐解法**：方法一（减半 + 位运算）。核心是把 `a * b` 拆成「`a/2 * b` 左移 1 位」与「奇数时补一个 `b`」两部分，递归深度仅 `O(log a)`，比逐次加 `b` 的 `O(b)` 高效得多。注意先让 `a` 取两数中较小者以缩短递归深度。
