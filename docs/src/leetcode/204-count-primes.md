# [204. 计数质数](https://leetcode.cn/problems/count-primes/)



## 一、题目描述

给定整数 `n` ，返回 **所有小于非负整数 `n` 的质数的数量** 。

质数的定义：大于 1 的自然数中，除了 1 和它本身以外不再有其他因数。

**示例 1：**

```
输入：n = 10
输出：4
解释：小于 10 的质数有 4 个, 它们是 2, 3, 5, 7 。
```

**示例 2：**

```
输入：n = 0
输出：0
```

**示例 3：**

```
输入：n = 1
输出：0
```

**提示：**

-   `0 <= n <= 5 * 10⁶`



## 二、解答方法

### 2.1 方法一：埃拉托斯特尼筛法（埃氏筛）

1. **思路**

用布尔数组 `isPrime[i]` 标记 `i` 是否为质数。从 `i = 2` 开始，若 `i` 是质数，则把 `i*i, i*(i+1), ...` 全部标记为非质数（从 `i*i` 开始而非 `2*i`，因为更小的倍数已被之前的质数筛过）。最后统计 `isPrime` 中 `true` 的个数。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int countPrimes(int n) {
        boolean[] isPrime = new boolean[n];
        Arrays.fill(isPrime, true);
        for (int i = 2; (long) i * i < n; i++) {
            if (isPrime[i]) {
                for (long j = (long) i * i; j < n; j += i) {
                    isPrime[(int) j] = false;
                }
            }
        }
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) count++;
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def countPrimes(self, n: int) -> int:
        if n < 2:
            return 0
        is_prime = [True] * n
        is_prime[0] = is_prime[1] = False
        for i in range(2, int(n ** 0.5) + 1):
            if is_prime[i]:
                for j in range(i * i, n, i):
                    is_prime[j] = False
        return sum(is_prime)
```

```go [Go]
func countPrimes(n int) int {
    if n < 2 {
        return 0
    }
    isPrime := make([]bool, n)
    for i := 2; i < n; i++ {
        isPrime[i] = true
    }
    for i := 2; i*i < n; i++ {
        if isPrime[i] {
            for j := i * i; j < n; j += i {
                isPrime[j] = false
            }
        }
    }
    count := 0
    for i := 2; i < n; i++ {
        if isPrime[i] {
            count++
        }
    }
    return count
}
```

```cpp [C++]
class Solution {
public:
    int countPrimes(int n) {
        if (n < 2) return 0;
        vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;
        for (int i = 2; (long long) i * i < n; i++) {
            if (isPrime[i]) {
                for (long long j = (long long) i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        int count = 0;
        for (int i = 2; i < n; i++) if (isPrime[i]) count++;
        return count;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    if (n < 2) return 0;
    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++) if (isPrime[i]) count++;
    return count;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {number}
 */
function countPrimes(n: number): number {
    if (n < 2) return 0;
    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++) if (isPrime[i]) count++;
    return count;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log log n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：线性筛（欧拉筛）

1. **思路**

埃氏筛会对合数重复标记（如 12 被 2 和 3 各筛一次）。线性筛保证每个合数只被其 **最小质因子** 筛一次，达到 `O(n)`。

2. **代码实现（Python）**

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        primes = []
        is_prime = [True] * n
        for i in range(2, n):
            if is_prime[i]:
                primes.append(i)
            for p in primes:
                if i * p >= n:
                    break
                is_prime[i * p] = False
                if i % p == 0:
                    break
        return len(primes)
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 特点 |
| ---- | ---------- | ---- |
| 暴力判断 | `O(n√n)` | 超时 |
| 埃氏筛 | `O(n log log n)` | 够用、易写，推荐 |
| 线性筛 | `O(n)` | 最优，每个合数只筛一次 |

注意细节：筛的起点用 `i*i`（而非 `2*i`）；循环条件 `i * i < n` 需防溢出（用 `long`/`long long` 或 `int(n**0.5)+1`）；`n < 2` 直接返回 0。
