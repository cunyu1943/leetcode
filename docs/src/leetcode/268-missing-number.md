# [268. 丢失的数字](https://leetcode.cn/problems/missing-number/)



## 一、题目描述

给定一个包含 `[0, n]` 中 `n` 个数的数组 `nums` ，找出 `[0, n]` 这个范围内 **没有出现在数组中的那个数** 。

**示例 1：**

```
输入：nums = [3,0,1]
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字。
```

**示例 2：**

```
输入：nums = [0,1]
输出：2
解释：n = 2，所有数字在范围 [0,2] 内。2 是丢失的数字。
```

**示例 3：**

```
输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，所有数字在范围 [0,9] 内。8 是丢失的数字。
```

**提示：**

-   `n == nums.length`
-   `1 <= n <= 10⁴`
-   `0 <= nums[i] <= n`
-   `nums` 中的所有数字都 **独一无二**

**进阶：** 你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题？



## 二、解答方法

### 2.1 方法一：数学求和（O(n) 时间，O(1) 空间）

1. **思路**

`[0, n]` 的理论总和为 `n × (n + 1) / 2`，减去数组实际元素之和，差值即丢失的数字。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;      // 0..n 的理论和
        int actual = 0;
        for (int num : nums) {
            actual += num;
        }
        return expected - actual;
    }
}
```

```python [Python]
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)
```

```go [Go]
func missingNumber(nums []int) int {
    n := len(nums)
    expected := n * (n + 1) / 2
    actual := 0
    for _, num := range nums {
        actual += num
    }
    return expected - actual
}
```

```cpp [C++]
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        long long expected = (long long)n * (n + 1) / 2;
        long long actual = 0;
        for (int num : nums) actual += num;
        return expected - actual;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    const n = nums.length;
    const expected = (n * (n + 1)) / 2;
    const actual = nums.reduce((a, b) => a + b, 0);
    return expected - actual;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums: number[]): number {
    const n = nums.length;
    const expected = (n * (n + 1)) / 2;
    const actual = nums.reduce((a, b) => a + b, 0);
    return expected - actual;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：位运算异或（最优，无溢出风险）

1. **思路**

利用 `a ^ a = 0`、`a ^ 0 = a` 的性质：把数组所有元素与 `[0, n]` 的所有下标和数值一起异或，成对的数字会抵消，剩下的就是丢失的数字。

技巧：初始化 `xor = n`（或 `0`），然后遍历 `i` 从 `0` 到 `n-1`，执行 `xor ^= i ^ nums[i]`。

2. **代码实现（Python）**

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        xor = len(nums)          # n
        for i, num in enumerate(nums):
            xor ^= i ^ num       # 下标 i 与元素 num 都参与异或
        return xor
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.3 方法三：哈希集合 / 排序

1. **思路**

- **哈希集合**：把数组元素存入集合，再遍历 `[0, n]` 找出不在集合中的数。时间 `O(n)`，空间 `O(n)`。
- **排序**：排序后检查 `nums[i]` 是否等于 `i`，不等于则 `i` 即丢失的数。时间 `O(n log n)`，空间 `O(1)`。

2. **代码实现（Python）**

```python
# 哈希集合
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        seen = set(nums)
        for i in range(len(nums) + 1):
            if i not in seen:
                return i
        return -1

# 排序
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        nums.sort()
        for i, num in enumerate(nums):
            if i != num:
                return i
        return len(nums)
```

## 三、总结

| 方法 | 时间 | 空间 | 特点 |
| ---- | ---- | ---- | ---- |
| 求和 | `O(n)` | `O(1)` | 直观 |
| **异或** | `O(n)` | `O(1)` | 最优，无溢出风险，推荐 |
| 哈希集合 | `O(n)` | `O(n)` | 简单 |
| 排序 | `O(n log n)` | `O(1)` | 需修改数组 |

求和法需注意 **`n × (n+1)` 可能溢出 int**（C++/Java 中当 n 较大时），用 `long`/`long long` 更安全；**异或法完全无溢出风险**，是本题最优解。

异或法的核心：`(0^1^2^...^n) ^ (nums[0]^nums[1]^...^nums[n-1])`，除丢失数字外所有值都出现两次并被抵消，最终结果即答案。
