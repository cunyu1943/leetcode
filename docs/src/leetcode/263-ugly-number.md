# [263. 丑数](https://leetcode.cn/problems/ugly-number/)



## 一、题目描述

**丑数** 就是只包含 **质因数 `2`、`3` 和/或 `5`** 的 **正整数** 。

给你一个整数 `n` ，请你判断 `n` 是否为 **丑数** 。如果是，返回 `true` ；否则，返回 `false` 。

**示例 1：**

```
输入：n = 6
输出：true
解释：6 = 2 × 3
```

**示例 2：**

```
输入：n = 1
输出：true
解释：1 没有质因数，因此它的全部质因数是 {2, 3, 5} 的空集。习惯上将其视作第一个丑数。
```

**示例 3：**

```
输入：n = 14
输出：false
解释：14 不是丑数，因为它包含了另外一个质因数 7 。
```

**提示：**

-   `-2³¹ <= n <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：反复除以质因数（试除法）

1. **思路**

若 `n <= 0`，直接返回 `false`（丑数定义为正整数）。

否则，依次把 `n` 中的质因子 `2`、`3`、`5` **除尽**（用 `while` 循环反复除），最后检查剩下的数是否为 `1`：

- 若为 `1` → 说明 `n` 只含 2、3、5 的因子，是丑数；
- 若不为 `1` → 说明还有其他质因子（如 7、11...），不是丑数。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) return false;
        for (int factor : new int[]{2, 3, 5}) {
            while (n % factor == 0) {
                n /= factor;
            }
        }
        return n == 1;
    }
}
```

```python [Python]
class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:
            return False
        for factor in (2, 3, 5):
            while n % factor == 0:
                n //= factor
        return n == 1
```

```go [Go]
func isUgly(n int) bool {
    if n <= 0 {
        return false
    }
    for _, factor := range []int{2, 3, 5} {
        for n%factor == 0 {
            n /= factor
        }
    }
    return n == 1
}
```

```cpp [C++]
class Solution {
public:
    bool isUgly(int n) {
        if (n <= 0) return false;
        for (int factor : {2, 3, 5}) {
            while (n % factor == 0) n /= factor;
        }
        return n == 1;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
    if (n <= 0) return false;
    for (const factor of [2, 3, 5]) {
        while (n % factor === 0) {
            n /= factor;
        }
    }
    return n === 1;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {boolean}
 */
function isUgly(n: number): boolean {
    if (n <= 0) return false;
    for (const factor of [2, 3, 5]) {
        while (n % factor === 0) {
            n /= factor;
        }
    }
    return n === 1;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`（除 2/3/5 的次数与位数成正比）。
- **空间复杂度**：`O(1)`。

## 三、总结

判断丑数的核心：**剥离所有 2、3、5 因子后，剩余部分必须恰好为 1**。

注意要点：
1. **`n <= 0` 直接返回 `false`** —— 丑数定义为正整数，要排除 0 和负数（否则 `while (n % 2 == 0)` 在 `n = 0` 时会死循环）；
2. **`n = 1` 是丑数** —— 题目明确「1 视为第一个丑数」，试除法下 `1 % 2 != 0`，直接返回 `1 == 1` → `true`，逻辑自然成立；
3. 必须 **除尽** 每个因子（用 `while` 而非 `if`），例如 `8 = 2³` 需连除三次。

延伸：**264. 丑数 II** 要求找出第 n 个丑数 —— 用三指针动态规划按序生成，而非逐个判断（逐个判断会超时）。
