# [LCR 003. 比特位计数](https://leetcode.cn/problems/w3tCBm/)



## 一、题目描述

给定一个非负整数 `n`，请计算 `0` 到 `n` 之间的每个数字的二进制表示中 `1` 的个数，并输出一个数组。



**示例 1：**

```
输入: n = 2
输出: [0,1,1]
解释:
0 --> 0
1 --> 1
2 --> 10
```

**示例 2：**

```
输入: n = 5
输出: [0,1,1,2,1,2]
解释:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

**说明：**

- `0 <= n <= 10⁵`

**进阶：**

- 给出时间复杂度为 `O(n × sizeof(integer))` 的解答非常容易。但你可以在线性时间 `O(n)` 内用一趟扫描做到吗？
- 要求算法的空间复杂度为 `O(n)`（输出数组不计入空间）。
- 你能进一步完善解法吗？要求在 C++ 或其他语言中不使用任何内置函数（如 C++ 中的 `__builtin_popcount`）来执行此操作。



## 二、解答方法

### 2.1 方法一：动态规划（最低位 / 最高位）

1. **思路**

利用已经算过的结果推导新数，避免逐位统计：

- **最低位法**：对任意 `i`，`i` 的二进制 `1` 的个数 = `i >> 1` 的个数 + `i` 的最低位（`i & 1`）。即 `dp[i] = dp[i >> 1] + (i & 1)`。
- **最高位法**：设 `high` 为不超过 `i` 的最大 2 的幂，则 `dp[i] = dp[i - high] + 1`。

两种推导都能在 `O(n)` 内一趟得出全部结果。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);   // 最低位法
        }
        return dp;
    }
}
```

```python [Python]
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp
```

```cpp [C++]
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};
```

```go [Go]
func countBits(n int) []int {
    dp := make([]int, n+1)
    for i := 1; i <= n; i++ {
        dp[i] = dp[i>>1] + (i & 1)
    }
    return dp
}
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
};
```

```c [C]
#include <stdlib.h>

int* countBits(int n, int* returnSize) {
    *returnSize = n + 1;
    int* dp = (int*)malloc((n + 1) * sizeof(int));
    dp[0] = 0;
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}
```

```ts [TypeScript]
function countBits(n: number): number[] {
    const dp: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，一趟扫描。
- **空间复杂度**：`O(n)`，输出数组（不计入额外要求的 `O(n)` 限制）。

### 2.2 方法二：Brian Kernighan 算法（逐位消去）

1. **思路**

`x & (x - 1)` 会把 `x` 二进制最低位的 `1` 消成 `0`。不断执行 `x &= x - 1` 直到 `x == 0`，执行的次数就是 `1` 的个数。

- 对每个 `i` 从 `0` 到 `n`，用该技巧统计其 `1` 的个数；
- 时间复杂度 `O(n × k)`（`k` 为二进制位数），满足进阶里 `O(n × sizeof(integer))` 的要求，但略慢于 DP。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            int x = i, cnt = 0;
            while (x > 0) {
                x &= x - 1;
                cnt++;
            }
            ans[i] = cnt;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = []
        for i in range(n + 1):
            x, cnt = i, 0
            while x:
                x &= x - 1
                cnt += 1
            ans.append(cnt)
        return ans
```

```cpp [C++]
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 0; i <= n; i++) {
            int x = i, cnt = 0;
            while (x) { x &= x - 1; cnt++; }
            ans[i] = cnt;
        }
        return ans;
    }
};
```

```go [Go]
func countBits(n int) []int {
    ans := make([]int, n+1)
    for i := 0; i <= n; i++ {
        x, cnt := i, 0
        for x > 0 {
            x &= x - 1
            cnt++
        }
        ans[i] = cnt
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    const ans = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
        let x = i, cnt = 0;
        while (x) { x &= x - 1; cnt++; }
        ans[i] = cnt;
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int* countBits(int n, int* returnSize) {
    *returnSize = n + 1;
    int* ans = (int*)malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) {
        int x = i, cnt = 0;
        while (x) { x &= x - 1; cnt++; }
        ans[i] = cnt;
    }
    return ans;
}
```

```ts [TypeScript]
function countBits(n: number): number[] {
    const ans: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
        let x = i, cnt = 0;
        while (x) { x &= x - 1; cnt++; }
        ans[i] = cnt;
    }
    return ans;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n × log n)`，每个数最多消去 `log n` 个 `1`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（位关系） | `O(n)` | `O(n)` | 最优，推荐 |
| Brian Kernighan 算法 | `O(n log n)` | `O(n)` | 通用技巧，适合单个数 |

DP 法利用 `dp[i] = dp[i >> 1] + (i & 1)` 在线性时间内完成，是最优解；Brian Kernighan 算法则常用于「统计单个整数二进制 1 的个数」场景。
