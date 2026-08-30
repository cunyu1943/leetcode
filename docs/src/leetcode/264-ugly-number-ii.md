# [264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii/)



## 一、题目描述

给你一个整数 `n` ，请你找出并返回第 `n` 个 **丑数** 。

**丑数** 就是质因子只包含 `2`、`3` 和 `5` 的正整数。

**示例 1：**

```
输入：n = 10
输出：12
解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
```

**示例 2：**

```
输入：n = 1
输出：1
解释：1 通常被视为丑数。
```

**提示：**

-   `1 <= n <= 1690`



## 二、解答方法

### 2.1 方法一：动态规划 + 三指针（最优）

1. **思路**

关键洞察：**每个丑数都可以由某个更小的丑数乘以 2、3 或 5 得到**。

维护数组 `dp`，`dp[0] = 1`（第一个丑数），以及三个指针 `p2`、`p3`、`p5`，分别指向「下一个待乘以 2 / 3 / 5 的丑数下标」。

每次取三个候选值的最小值作为新的丑数：

```
next = min(dp[p2] * 2, dp[p3] * 3, dp[p5] * 5)
```

然后把 **所有产生该最小值的指针都后移一位**（用 `if` 而非 `else if`，避免 `2×3 = 3×2 = 6` 这类重复）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int nthUglyNumber(int n) {
        int[] dp = new int[n];
        dp[0] = 1;
        int p2 = 0, p3 = 0, p5 = 0;
        for (int i = 1; i < n; i++) {
            int next2 = dp[p2] * 2;
            int next3 = dp[p3] * 3;
            int next5 = dp[p5] * 5;
            dp[i] = Math.min(next2, Math.min(next3, next5));
            // 注意：用 if 而非 else if，去重
            if (dp[i] == next2) p2++;
            if (dp[i] == next3) p3++;
            if (dp[i] == next5) p5++;
        }
        return dp[n - 1];
    }
}
```

```python [Python]
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [1] * n
        p2 = p3 = p5 = 0
        for i in range(1, n):
            next2, next3, next5 = dp[p2] * 2, dp[p3] * 3, dp[p5] * 5
            dp[i] = min(next2, next3, next5)
            if dp[i] == next2: p2 += 1
            if dp[i] == next3: p3 += 1
            if dp[i] == next5: p5 += 1
        return dp[-1]
```

```go [Go]
func nthUglyNumber(n int) int {
    dp := make([]int, n)
    dp[0] = 1
    p2, p3, p5 := 0, 0, 0
    for i := 1; i < n; i++ {
        next2, next3, next5 := dp[p2]*2, dp[p3]*3, dp[p5]*5
        dp[i] = min(next2, min(next3, next5))
        if dp[i] == next2 { p2++ }
        if dp[i] == next3 { p3++ }
        if dp[i] == next5 { p5++ }
    }
    return dp[n-1]
}

func min(a, b int) int { if a < b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> dp(n);
        dp[0] = 1;
        int p2 = 0, p3 = 0, p5 = 0;
        for (int i = 1; i < n; i++) {
            int next2 = dp[p2] * 2, next3 = dp[p3] * 3, next5 = dp[p5] * 5;
            dp[i] = min({next2, next3, next5});
            if (dp[i] == next2) p2++;
            if (dp[i] == next3) p3++;
            if (dp[i] == next5) p5++;
        }
        return dp[n - 1];
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    const dp = new Array(n);
    dp[0] = 1;
    let p2 = 0, p3 = 0, p5 = 0;
    for (let i = 1; i < n; i++) {
        const next2 = dp[p2] * 2, next3 = dp[p3] * 3, next5 = dp[p5] * 5;
        dp[i] = Math.min(next2, next3, next5);
        if (dp[i] === next2) p2++;
        if (dp[i] === next3) p3++;
        if (dp[i] === next5) p5++;
    }
    return dp[n - 1];
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {number}
 */
function nthUglyNumber(n: number): number {
    const dp = new Array(n);
    dp[0] = 1;
    let p2 = 0, p3 = 0, p5 = 0;
    for (let i = 1; i < n; i++) {
        const next2 = dp[p2] * 2, next3 = dp[p3] * 3, next5 = dp[p5] * 5;
        dp[i] = Math.min(next2, next3, next5);
        if (dp[i] === next2) p2++;
        if (dp[i] === next3) p3++;
        if (dp[i] === next5) p5++;
    }
    return dp[n - 1];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：最小堆 + 哈希去重

1. **思路**

从 1 开始，每次取出堆中最小的丑数，把它乘以 2、3、5 后入堆，并用 `Set` 去重。取第 n 次出堆的元素即答案。

思路通用（可扩展到任意「超级丑数」），但需要 `O(n log n)` 时间与 `O(n)` 空间。

2. **代码实现（Python）**

```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        import heapq
        heap = [1]
        seen = {1}
        for _ in range(n):
            cur = heapq.heappop(heap)
            for factor in (2, 3, 5):
                nxt = cur * factor
                if nxt not in seen:
                    seen.add(nxt)
                    heapq.heappush(heap, nxt)
        return cur
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间 | 空间 | 特点 |
| ---- | ---- | ---- | ---- |
| 三指针 DP | `O(n)` | `O(n)` | 最优，推荐 |
| 最小堆 + Set | `O(n log n)` | `O(n)` | 通用易扩展 |

**三指针法的核心**：维护三个「待乘」指针，每次取最小候选值，保证丑数 **按升序且不重复** 地生成。

**最关键细节**：更新指针时必须用 **三个独立的 `if`**（而非 `if-else if`）—— 因为同一个丑数可能由多种方式产生（如 `6 = 2×3 = 3×2`），若只移动一个指针会导致 `dp` 中出现重复值。

对比 `263. 丑数`（判断单个数是否为丑数）用试除法；本题要「按序生成第 n 个」，若逐个试除判断会超时，必须用生成式 DP。
