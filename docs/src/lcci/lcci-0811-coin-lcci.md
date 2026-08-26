# [面试题 08.11. 硬币](https://leetcode.cn/problems/coin-lcci/)

## 一、题目描述

硬币。给定数量不限的硬币，币值为 25 分、10 分、5 分和 1 分，编写代码计算 n 分有几种表示法。（结果可能会很大，你需要将结果 Mod 1000000007）

**示例 1：**

```
输入：n = 5
输出：2
解释：5 = 5 / 1+1+1+1+1
```

**示例 2：**

```
输入：n = 10
输出：4
解释：10 = 10 / 5+5 / 5+1+1+1+1+1 / 1+1+1+1+1+1+1+1+1+1
```

**示例 3：**

```
输入：n = 25
输出：13
```

**提示：**

- `0 <= n <= 1000000`

---

## 二、解答方法

### 2.1 方法一：动态规划（完全背包）

**1. 思路**

这是「硬币找零组合数」问题（每种硬币无限次，且不计顺序）。设 `dp[i]` 表示凑出金额 `i` 的方案数。按顺序考虑每种硬币 `c`，对 `i >= c` 累加：`dp[i] = (dp[i] + dp[i - c]) % MOD`。先遍历硬币、内循环遍历金额，可保证方案不重复（组合数而非排列数）。初始 `dp[0] = 1`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int waysToChange(int n) {
        final int MOD = 1000000007;
        int[] coins = {1, 5, 10, 25};
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int c : coins) {
            for (int i = c; i <= n; i++) {
                dp[i] = (dp[i] + dp[i - c]) % MOD;
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def waysToChange(self, n: int) -> int:
        MOD = 1000000007
        coins = [1, 5, 10, 25]
        dp = [0] * (n + 1)
        dp[0] = 1
        for c in coins:
            for i in range(c, n + 1):
                dp[i] = (dp[i] + dp[i - c]) % MOD
        return dp[n]
```

```go [Go]
func waysToChange(n int) int {
	const MOD int64 = 1000000007
	coins := []int{1, 5, 10, 25}
	dp := make([]int64, n+1)
	dp[0] = 1
	for _, c := range coins {
		for i := c; i <= n; i++ {
			dp[i] = (dp[i] + dp[i-int64(c)]) % MOD
		}
	}
	return int(dp[n])
}
```

```c [C]
int waysToChange(int n) {
    const int MOD = 1000000007;
    int coins[4] = {1, 5, 10, 25};
    long* dp = (long*)calloc(n + 1, sizeof(long));
    dp[0] = 1;
    for (int k = 0; k < 4; k++) {
        int c = coins[k];
        for (int i = c; i <= n; i++) {
            dp[i] = (dp[i] + dp[i - c]) % MOD;
        }
    }
    int ans = (int)dp[n];
    free(dp);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int waysToChange(int n) {
        const int MOD = 1000000007;
        int coins[4] = {1, 5, 10, 25};
        vector<long> dp(n + 1, 0);
        dp[0] = 1;
        for (int c : coins) {
            for (int i = c; i <= n; i++) {
                dp[i] = (dp[i] + dp[i - c]) % MOD;
            }
        }
        return (int)dp[n];
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function (n) {
    const MOD = 1000000007n;
    const coins = [1, 5, 10, 25];
    const dp = new Array(n + 1).fill(0n);
    dp[0] = 1n;
    for (const c of coins) {
        for (let i = c; i <= n; i++) {
            dp[i] = (dp[i] + dp[i - c]) % MOD;
        }
    }
    return Number(dp[n]);
};
```

```typescript [TypeScript]
function waysToChange(n: number): number {
    const MOD = 1000000007n;
    const coins = [1, 5, 10, 25];
    const dp: bigint[] = new Array(n + 1).fill(0n);
    dp[0] = 1n;
    for (const c of coins) {
        for (let i = c; i <= n; i++) {
            dp[i] = (dp[i] + dp[i - c]) % MOD;
        }
    }
    return Number(dp[n]);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(4 * n)`，即 `O(n)`。
- **空间复杂度**：`O(n)`。

---

### 2.2 方法二：数学公式（O(1) 枚举）

**1. 思路**

由于只有 4 种硬币，可用两层枚举替代 DP。枚举 25 分硬币数量 `i`（最多 `n/25` 个），再枚举 10 分硬币数量 `j`（最多 `(n-25i)/10` 个），剩余金额由 5 分和 1 分组合，而 5 分和 1 分的组合数恰好是 `⌊剩余金额/5⌋ + 1`（剩余金额 k，5 分可取 0..⌊k/5⌋ 共 ⌊k/5⌋+1 种）。累加并取模即可，`O(n^2/250)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int waysToChange(int n) {
        final int MOD = 1000000007;
        long ans = 0;
        for (int i = 0; i * 25 <= n; i++) {
            int rest = n - i * 25;
            for (int j = 0; j * 10 <= rest; j++) {
                int r = rest - j * 10;
                ans = (ans + (r / 5) + 1) % MOD;
            }
        }
        return (int) ans;
    }
}
```

```python [Python]
class Solution:
    def waysToChange(self, n: int) -> int:
        MOD = 1000000007
        ans = 0
        i = 0
        while i * 25 <= n:
            rest = n - i * 25
            j = 0
            while j * 10 <= rest:
                r = rest - j * 10
                ans = (ans + r // 5 + 1) % MOD
                j += 1
            i += 1
        return ans
```

```go [Go]
func waysToChange(n int) int {
	const MOD int64 = 1000000007
	var ans int64
	for i := 0; i*25 <= n; i++ {
		rest := n - i*25
		for j := 0; j*10 <= rest; j++ {
			r := rest - j*10
			ans = (ans + int64(r/5) + 1) % MOD
		}
	}
	return int(ans)
}
```

```c [C]
int waysToChange(int n) {
    const int MOD = 1000000007;
    long ans = 0;
    for (int i = 0; i * 25 <= n; i++) {
        int rest = n - i * 25;
        for (int j = 0; j * 10 <= rest; j++) {
            int r = rest - j * 10;
            ans = (ans + r / 5 + 1) % MOD;
        }
    }
    return (int) ans;
}
```

```cpp [C++]
class Solution {
public:
    int waysToChange(int n) {
        const int MOD = 1000000007;
        long ans = 0;
        for (int i = 0; i * 25 <= n; i++) {
            int rest = n - i * 25;
            for (int j = 0; j * 10 <= rest; j++) {
                int r = rest - j * 10;
                ans = (ans + r / 5 + 1) % MOD;
            }
        }
        return (int) ans;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function (n) {
    const MOD = 1000000007n;
    let ans = 0n;
    for (let i = 0; i * 25 <= n; i++) {
        const rest = n - i * 25;
        for (let j = 0; j * 10 <= rest; j++) {
            const r = rest - j * 10;
            ans = (ans + BigInt(Math.floor(r / 5)) + 1n) % MOD;
        }
    }
    return Number(ans);
};
```

```typescript [TypeScript]
function waysToChange(n: number): number {
    const MOD = 1000000007n;
    let ans = 0n;
    for (let i = 0; i * 25 <= n; i++) {
        const rest = n - i * 25;
        for (let j = 0; j * 10 <= rest; j++) {
            const r = rest - j * 10;
            ans = (ans + BigInt(Math.floor(r / 5)) + 1n) % MOD;
        }
    }
    return Number(ans);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n^2 / 250)`，约 `4 * 10^9 / 250 = 1.6 * 10^7`，仍可通过。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                         |
| -------- | ---------- | ---------- | ---------------------------- |
| 动态规划 | `O(n)`     | `O(n)`     | 思路通用，可扩展更多币种，推荐 |
| 数学枚举 | `O(n^2/250)` | `O(1)`     | 空间最优，利用币种少可直接枚举 |

**推荐解法**：方法一（动态规划 / 完全背包）。注意是「组合数」而非「排列数」，必须「先遍历硬币、再遍历金额」才能得到不重复的组合；同时每次累加都要对 `1000000007` 取模防止溢出。
