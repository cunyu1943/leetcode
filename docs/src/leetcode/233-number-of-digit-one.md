# [233. 数字 1 的个数](https://leetcode.cn/problems/number-of-digit-one/)



## 一、题目描述

给定一个整数 `n`，计算所有小于等于 `n` 的非负整数中数字 `1` 出现的个数。

**示例 1：**

```
输入：n = 13
输出：6
解释：1, 10, 11, 12, 13 中数字 1 共出现 6 次（11 中有两个 1）。
```

**示例 2：**

```
输入：n = 0
输出：0
```

**提示：**

-   `0 <= n <= 10⁹`



## 二、解答方法

### 2.1 方法一：按位统计（数学规律，最优）

1. **思路**

逐位（个位、十位、百位……）统计该位上 `1` 出现的次数。对于第 `k` 位（权 `m = 10^k`），把 `n` 拆成三部分：

- `high = n / (m * 10)`（高位）
- `cur = (n / m) % 10`（当前位数字）
- `low = n % m`（低位）

当前位出现 1 的次数：

| `cur` | 该位 1 的个数 |
| ----- | ------------- |
| `cur == 0` | `high * m` |
| `cur == 1` | `high * m + low + 1` |
| `cur > 1`  | `(high + 1) * m` |

直观理解：完整的 `0 ~ 10m-1` 周期中，每 `10m` 个数该位出现 `m` 次 1。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int countDigitOne(int n) {
        long count = 0;
        for (long m = 1; m <= n; m *= 10) {
            long high = n / (m * 10);
            long cur = (n / m) % 10;
            long low = n % m;
            if (cur == 0) {
                count += high * m;
            } else if (cur == 1) {
                count += high * m + low + 1;
            } else {
                count += (high + 1) * m;
            }
        }
        return (int) count;
    }
}
```

```python [Python]
class Solution:
    def countDigitOne(self, n: int) -> int:
        count = 0
        m = 1
        while m <= n:
            high = n // (m * 10)
            cur = (n // m) % 10
            low = n % m
            if cur == 0:
                count += high * m
            elif cur == 1:
                count += high * m + low + 1
            else:
                count += (high + 1) * m
            m *= 10
        return count
```

```go [Go]
func countDigitOne(n int) int {
    count := 0
    for m := 1; m <= n; m *= 10 {
        high := n / (m * 10)
        cur := (n / m) % 10
        low := n % m
        if cur == 0 {
            count += high * m
        } else if cur == 1 {
            count += high*m + low + 1
        } else {
            count += (high + 1) * m
        }
    }
    return count
}
```

```cpp [C++]
class Solution {
public:
    int countDigitOne(int n) {
        long long count = 0;
        for (long long m = 1; m <= n; m *= 10) {
            long long high = n / (m * 10);
            long long cur = (n / m) % 10;
            long long low = n % m;
            if (cur == 0) count += high * m;
            else if (cur == 1) count += high * m + low + 1;
            else count += (high + 1) * m;
        }
        return (int) count;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function (n) {
    let count = 0;
    for (let m = 1; m <= n; m *= 10) {
        const high = Math.floor(n / (m * 10));
        const cur = Math.floor(n / m) % 10;
        const low = n % m;
        if (cur === 0) count += high * m;
        else if (cur === 1) count += high * m + low + 1;
        else count += (high + 1) * m;
    }
    return count;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {number}
 */
function countDigitOne(n: number): number {
    let count = 0;
    for (let m = 1; m <= n; m *= 10) {
        const high = Math.floor(n / (m * 10));
        const cur = Math.floor(n / m) % 10;
        const low = n % m;
        if (cur === 0) count += high * m;
        else if (cur === 1) count += high * m + low + 1;
        else count += (high + 1) * m;
    }
    return count;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`（位数级别）。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：暴力枚举（会超时）

1. **思路**

从 1 遍历到 n，逐个统计每个数中 1 的个数。思路简单但 `n` 可达 `10⁹`，会超时。

2. **代码实现（Python，仅示意）**

```python
class Solution:
    def countDigitOne(self, n: int) -> int:
        return sum(str(i).count('1') for i in range(1, n + 1))
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`，超时。

## 三、总结

按位统计是 **数位 DP / 数字规律** 类问题的经典模板。三分支公式是该题核心：

```
cur == 0 → high * m
cur == 1 → high * m + low + 1
cur  > 1 → (high + 1) * m
```

注意：
1. `m` 从 1 开始每次 `*= 10`，在 Java/C++ 中 `m * 10` 可能 **溢出 int**（`n ≤ 10⁹` 时 `m` 会到 `10⁹`，再乘 10 溢出），必须用 `long`；
2. 结果也可能超过 int 范围（如 `n = 10⁹` 时答案约 `9×10⁸`，仍在 int 内，但保险起见用 `long`）。

同类题目：`400. 第 N 位数字`、`43. 字符串相乘`，均属「找数学规律」而非暴力枚举。
