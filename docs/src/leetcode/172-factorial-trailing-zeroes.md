# [172. 阶乘后的零](https://leetcode.cn/problems/factorial-trailing-zeroes/)



## 一、题目描述

给定一个整数 `n` ，返回 `n!` （n 的阶乘）结果中尾随零的数量。

**注意** 返回结果是一个 **32 位** 整数。

**进阶：** 你可以设计并实现对数时间复杂度的算法来解决此问题吗？



**示例 1：**

```
输入：n = 3
输出：0
解释：3! = 6 ，不含尾随零。
```

**示例 2：**

```
输入：n = 5
输出：1
解释：5! = 120 ，有一个尾随零。
```

**示例 3：**

```
输入：n = 0
输出：0
```

**提示：**

-   `0 <= n <= 10⁴`



## 二、解答方法

### 2.1 方法一：统计因子 5 的个数

1. **思路**

尾零由因子 `2 × 5` 产生。阶乘中因子 2 远多于因子 5，因此尾零数量 = 因子 5 的个数。即统计 `1..n` 中能被 5、25、125… 整除的数的贡献：`n/5 + n/25 + n/125 + ...`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            n /= 5;
            count += n;
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0
        while n > 0:
            n //= 5
            count += n
        return count
```

```go [Go]
func trailingZeroes(n int) int {
    count := 0
    for n > 0 {
        n /= 5
        count += n
    }
    return count
}
```

```cpp [C++]
class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            n /= 5;
            count += n;
        }
        return count;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
    let count = 0;
    while (n > 0) {
        n = Math.floor(n / 5);
        count += n;
    }
    return count;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n: number): number {
    let count = 0;
    while (n > 0) {
        n = Math.floor(n / 5);
        count += n;
    }
    return count;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log₅ n)`，满足进阶要求。
- **空间复杂度**：`O(1)`。

## 三、总结

关键洞察：**尾零数 = 因子 5 的个数**（因为 2 永远够用）。`125 = 5³` 贡献 3 个 5，所以要累加 `n/5 + n/25 + n/125…`，不可只算 `n/5`。
