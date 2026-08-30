# [483. 最小好基数](https://leetcode.cn/problems/smallest-good-base/)

## 一、题目描述

对于给定的正整数 `n`，称 `k`（`k >= 2`）为 `n` 的**好基数**，若 `n` 可以表示为以 `k` 为基的「全 1」形式：`n = 1 + k + k^2 + ... + k^(m-1)`（至少 2 位，即 `m >= 2`）。

若存在多个好基数，返回**最小的**；若不存在（除无意义的退化解外）返回 `"-1"`。保证结果在 `long` 范围内。

**示例 1：**

```
输入：n = "13"
输出："3"
解释：13 = 1 + 3 + 3^2 = 13，以 3 为基是 111。
```

**示例 2：**

```
输入：n = "4681"
输出："8"
```

**提示：**

- `n` 为字符串，范围 `[3, 10^18]`

## 二、解答方法

### 2.1 方法一：枚举位数 + 二分基数

1. 思路

设表示有 `m` 位（全 1），则 `n = (k^m - 1)/(k - 1)`。当 `m` 增大，所需 `k` 减小；`k` 最小为 2 时 `m` 最大约 `log2(n+1)`。枚举位数 `m`（从大到小），对 `k` 在 `[2, n^(1/(m-1))]` 内二分，检查 `sum(k, m) == n`。第一个（最小 `m` 对应最大 `k`）找到即返回；由于从大 `m` 枚举，对应的 `k` 更小，保证了最小好基数。

更直接：从小到大枚举 `m` 从 2 到 `log2(n)`，对每个 `m` 二分 `k`，取满足条件的最小 `k`。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def smallestGoodBase(self, n: str) -> str:
        N = int(n)
        # 枚举位数 m（全 1 的位数），m 越大 k 越小
        import math
        max_m = int(math.log2(N)) + 1
        for m in range(max_m, 1, -1):
            lo, hi = 2, int(N ** (1.0 / (m - 1))) + 1
            while lo <= hi:
                mid = (lo + hi) // 2
                s = (mid ** m - 1) // (mid - 1)
                if s == N:
                    return str(mid)
                elif s < N:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return "-1"
```

```java [Java]
class Solution {
    public String smallestGoodBase(String n) {
        long N = Long.parseLong(n);
        int maxM = (int)(Math.log(N) / Math.log(2)) + 1;
        for (int m = maxM; m >= 2; m--) {
            long lo = 2, hi = (long)(Math.pow(N, 1.0 / (m - 1))) + 1;
            while (lo <= hi) {
                long mid = lo + (hi - lo) / 2;
                long sum = 0, p = 1;
                for (int i = 0; i < m; i++) { sum += p; if (sum > N) break; p *= mid; }
                if (sum == N) return Long.toString(mid);
                else if (sum < N) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return "-1";
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\log^2 n \log n)$。
- 空间复杂度：$O(1)$。

## 三、总结

「位数枚举 + 二分基数 + 等比数列求和」是数学构造题套路。相关题目：483 本身、326 3 的幂、372 超级次方。
