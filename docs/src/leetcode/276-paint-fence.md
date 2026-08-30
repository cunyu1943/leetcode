# [276. 栅栏涂色](https://leetcode.cn/problems/paint-fence/) [🔒 会员题]

## 一、题目描述

有 `k` 种颜色的涂料和一个包含 `n` 个栅栏柱的栅栏，请你按照 **以下规则** 给栅栏柱涂色：

-   所有栅栏柱必须用涂料涂色（每个柱子一种颜色）；
-   连续的栅栏柱 **最多有两根颜色相同**（即不允许出现连续三根同色）。

请你返回所有有效的涂色方案的 **数目** 。

**示例：**

```
输入：n = 3, k = 2   输出：6
解释：共有 6 种合法涂色方案（k=2 颜色、3 根柱子，不能有连续 3 根同色）
```

**提示：** `1 <= n <= 500`，`1 <= k <= 10`

## 二、解答方法

### 方法一：动态规划（O(n)）

**思路：** 设 `same[i]` = 第 i 根与第 i-1 根 **同色** 的方案数，`diff[i]` = 第 i 根与第 i-1 根 **不同色** 的方案数。

- `same[i] = diff[i-1]`（要同色，则前一对必须不同色，颜色唯一确定）；
- `diff[i] = (same[i-1] + diff[i-1]) * (k - 1)`（不同色时有 k-1 种选择）。

总方案数 `f[i] = same[i] + diff[i]`。可用滚动变量优化到 O(1) 空间。

边界：`same[0] = 0`，`diff[0] = k`（第 1 根任意选 k 色）。

:::::: code-group

```java [Java]
class Solution {
    public int numWays(int n, int k) {
        if (n == 1) return k;
        int same = 0, diff = k;             // 以第 1 根计
        for (int i = 2; i <= n; i++) {
            int same2 = diff;
            int diff2 = (same + diff) * (k - 1);
            same = same2; diff = diff2;
        }
        return same + diff;
    }
}
```

```python [Python]
class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 1: return k
        same, diff = 0, k
        for _ in range(2, n + 1):
            same, diff = diff, (same + diff) * (k - 1)
        return same + diff
```

```cpp [C++]
class Solution {
public:
    int numWays(int n, int k) {
        if (n == 1) return k;
        long long same = 0, diff = k;
        for (int i = 2; i <= n; i++) {
            long long same2 = diff;
            long long diff2 = (same + diff) * (k - 1);
            same = same2; diff = diff2;
        }
        return same + diff;
    }
};
```

```go [Go]
func numWays(n int, k int) int {
    if n == 1 { return k }
    same, diff := 0, k
    for i := 2; i <= n; i++ {
        same, diff = diff, (same+diff)*(k-1)
    }
    return same + diff
}
```

```js [JavaScript]
var numWays = function (n, k) {
    if (n === 1) return k;
    let same = 0, diff = k;
    for (let i = 2; i <= n; i++) {
        const same2 = diff;
        const diff2 = (same + diff) * (k - 1);
        same = same2; diff = diff2;
    }
    return same + diff;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

本题是 `256/265 粉刷房子` 的变体，约束从「相邻不可同色」放松为「**最多连续两根同色**」。状态机 DP：

- 同色方案只能接在「上一对不同色」之后；
- 不同色方案 = 之前所有方案 × (k-1)。

注意用 `long long` 防止方案数溢出（n=500, k=10 时结果很大）。初始 `n=0 → 0`、`n=1 → k`。
