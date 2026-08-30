# [441. 排列硬币](https://leetcode.cn/problems/arranging-coins/)

## 一、题目描述

你总共有 `n` 枚硬币，把它们摆成阶梯形状：第 `k` 行恰好放 `k` 枚硬币。求能形成的**完整阶梯行**的最大行数 `k`（即 `1 + 2 + ... + k <= n` 的最大 `k`）。

**示例 1：**

```
输入：n = 5
输出：2
解释：第 1 行 1 枚、第 2 行 2 枚，共 3 枚；第 3 行需 3 枚但只剩 2 枚，不完整。
```

**示例 2：**

```
输入：n = 8
输出：3
```

**提示：**

- `1 <= n <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：二分查找

1. 思路

求最大 `k` 使 `k(k+1)/2 <= n`，对 `k` 在 `[1, √(2n)]` 内二分。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int arrangeCoins(int n) {
        long l = 1, r = (long) Math.sqrt(2.0 * n) + 1;
        while (l <= r) {
            long mid = (l + r) / 2;
            if (mid * (mid + 1) / 2 <= n) l = mid + 1;
            else r = mid - 1;
        }
        return (int) r;
    }
}
```

```python [Python]
class Solution:
    def arrangeCoins(self, n: int) -> int:
        import math
        l, r = 1, int(math.sqrt(2 * n)) + 1
        while l <= r:
            mid = (l + r) // 2
            if mid * (mid + 1) // 2 <= n:
                l = mid + 1
            else:
                r = mid - 1
        return r
```

```cpp [C++]
class Solution {
public:
    int arrangeCoins(int n) {
        long long l = 1, r = (long long)sqrt(2.0 * n) + 1;
        while (l <= r) {
            long long mid = (l + r) / 2;
            if (mid * (mid + 1) / 2 <= n) l = mid + 1;
            else r = mid - 1;
        }
        return r;
    }
};
```

```go [Go]
func arrangeCoins(n int) int {
	l, r := 1, int(math.Sqrt(float64(2*n)))+1
	for l <= r {
		mid := (l + r) / 2
		if int64(mid)*int64(mid+1)/2 <= int64(n) {
			l = mid + 1
		} else {
			r = mid - 1
		}
	}
	return r
}
```

```javascript [JavaScript]
var arrangeCoins = function (n) {
    let l = 1, r = Math.floor(Math.sqrt(2 * n)) + 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (mid * (mid + 1) / 2 <= n) l = mid + 1;
        else r = mid - 1;
    }
    return r;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log \sqrt{n})$。
- 空间复杂度：$O(1)$。

### 2.2 方法二：求根公式

`k^2 + k - 2n <= 0` ⇒ `k <= (√(1+8n) - 1)/2`，直接取整数部分。

## 三、总结

本质是求满足三角数不等式的最大整数。相关题目：69 x 的平方根、367 有效的完全平方数、633 平方数之和。
