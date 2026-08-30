# [201. 数字范围按位与](https://leetcode.cn/problems/bitwise-and-of-numbers-range/)



## 一、题目描述

给你两个整数 `left` 和 `right` ，表示区间 `[left, right]` ，返回此区间内所有数字 **按位与** 的结果（包含 `left` 、`right` 端点）。

**示例 1：**

```
输入：left = 5, right = 7
输出：4
解释：5 & 6 & 7 = 4
```

**示例 2：**

```
输入：left = 0, right = 0
输出：0
```

**示例 3：**

```
输入：left = 1, right = 2147483647
输出：0
```

**提示：**

-   `0 <= left <= right <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：公共前缀（位移）

1. **思路**

区间内所有数按位与的结果 = 这些数二进制表示的 **公共前缀**（后面补 0）。因为从 `left` 递增到 `right` 的过程中，只要某一位发生了变化（出现过 0 和 1），该位与的结果必为 0；只有始终不变的高位（公共前缀）才保留。

做法：不断同时右移 `left` 和 `right`，直到二者相等，记录右移次数 `shift`，最后左移回去。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift;
    }
}
```

```python [Python]
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        shift = 0
        while left < right:
            left >>= 1
            right >>= 1
            shift += 1
        return left << shift
```

```go [Go]
func rangeBitwiseAnd(left int, right int) int {
    shift := 0
    for left < right {
        left >>= 1
        right >>= 1
        shift++
    }
    return left << shift
}
```

```cpp [C++]
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift;
    }
};
```

```js [JavaScript]
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
    let shift = 0;
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    return left << shift;
};
```

```ts [TypeScript]
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function rangeBitwiseAnd(left: number, right: number): number {
    let shift = 0;
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    return left << shift;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log right)`，最多右移 31 次。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：Brian Kernighan 算法（消去最低位 1）

1. **思路**

反复执行 `right &= right - 1`（消去 `right` 最低位的 1），直到 `right <= left`。此时 `right` 剩下的就是区间公共前缀。

2. **代码实现（Python）**

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        while left < right:
            right &= right - 1
        return right
```

3. **复杂度分析**

- **时间复杂度**：`O(log right)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 思路 |
| ---- | ---- |
| 公共前缀位移 | 同时右移到相等再左移回去 |
| `n & (n-1)` | 消去 `right` 低位 1 直到 ≤ `left` |

核心结论：**区间按位与 = 区间端点的二进制公共前缀**。暴力遍历 `[left, right]` 会超时（`O(n)`），必须用位运算技巧。
