# [397. 整数替换](https://leetcode.cn/problems/integer-replacement/)

## 一、题目描述

给定一个正整数 `n`，你可以做如下操作：

1. 如果 `n` 是偶数，则用 `n / 2` 替换 `n`；
2. 如果 `n` 是奇数，则可以用 `n + 1` 或 `n - 1` 替换 `n`。

返回 `n` 变成 `1` 所需的**最小替换次数**。

**示例 1：**

```
输入：n = 8
输出：3
解释：8 -> 4 -> 2 -> 1。
```

**示例 2：**

```
输入：n = 7
输出：4
解释：7 -> 8 -> 4 -> 2 -> 1 或 7 -> 6 -> 3 -> 2 -> 1。
```

**示例 3：**

```
输入：n = 4
输出：2
```

**提示：**

- `1 <= n <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：贪心 + 位运算

1. 思路

- 偶数直接除 2；
- 奇数时，目标是尽快把低位清成 0。若末两位是 `01`（如 5）选 `-1`；若末两位是 `11`（如 7）选 `+1`（除 3 这种特殊情况选 `-1`，避免溢出且更快收敛）；`n == 3` 时直接 `3 -> 2 -> 1` 更优。

本质是在二进制层面消除尾随 1。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int integerReplacement(int n) {
        int ans = 0;
        long x = n;
        while (x != 1) {
            if (x % 2 == 0) x /= 2;
            else if (x == 3 || (x & 3) == 1) x--;
            else x++;
            ans++;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def integerReplacement(self, n: int) -> int:
        ans = 0
        x = n
        while x != 1:
            if x % 2 == 0:
                x //= 2
            elif x == 3 or x % 4 == 1:
                x -= 1
            else:
                x += 1
            ans += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int integerReplacement(int n) {
        int ans = 0;
        long long x = n;
        while (x != 1) {
            if (x % 2 == 0) x /= 2;
            else if (x == 3 || (x & 3) == 1) x--;
            else x++;
            ans++;
        }
        return ans;
    }
};
```

```go [Go]
func integerReplacement(n int) int {
	ans := 0
	x := int64(n)
	for x != 1 {
		if x%2 == 0 {
			x /= 2
		} else if x == 3 || x&3 == 1 {
			x--
		} else {
			x++
		}
		ans++
	}
	return ans
}
```

```javascript [JavaScript]
var integerReplacement = function (n) {
    let ans = 0;
    let x = n;
    while (x !== 1) {
        if (x % 2 === 0) x = Math.floor(x / 2);
        else if (x === 3 || (x & 3) === 1) x--;
        else x++;
        ans++;
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log n)$，每次操作至少消除一位。
- 空间复杂度：$O(1)$。

### 2.2 方法二：记忆化 / BFS

1. 思路

用记忆化递归或 BFS 搜索最小步数，语义直观但常数略大；对 `n` 较大时贪心法更优。BFS 在 `n` 较小时方便验证。

2. 代码实现（记忆化递归，Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def integerReplacement(self, n: int) -> int:
        from functools import lru_cache
        @lru_cache(None)
        def dfs(x: int) -> int:
            if x == 1:
                return 0
            if x % 2 == 0:
                return 1 + dfs(x // 2)
            return 1 + min(dfs(x - 1), dfs(x + 1))
        return dfs(n)
```

```java [Java]
class Solution {
    Map<Long, Integer> memo = new HashMap<>();
    public int integerReplacement(int n) {
        return dfs((long) n);
    }
    private int dfs(long x) {
        if (x == 1) return 0;
        if (memo.containsKey(x)) return memo.get(x);
        int res;
        if (x % 2 == 0) res = 1 + dfs(x / 2);
        else res = 1 + Math.min(dfs(x - 1), dfs(x + 1));
        memo.put(x, res);
        return res;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log n)$。
- 空间复杂度：$O(\log n)$，记忆化表 / 递归栈。

## 三、总结

贪心选择（+1 或 -1）的依据是让二进制尾随的 1 尽快清零，注意 `n == 3` 与 `n = 2^31 - 1` 的边界处理（用 `long` 避免溢出）。相关题目：50 Pow(x,n)、372 超级次方（均涉及整数位操作）。
