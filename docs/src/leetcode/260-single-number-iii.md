# [260. 只出现一次的数字 III](https://leetcode.cn/problems/single-number-iii/)



## 一、题目描述

给你一个整数数组 `nums`，其中恰好有 **两个** 元素只出现一次，其余所有元素均出现 **两次** 。找出只出现一次的那两个元素。你可以按 **任意顺序** 返回答案。

你必须设计并实现 **线性时间复杂度** 的算法且仅使用 **常量额外空间** 来解决此问题。



**示例 1：**

```
输入：nums = [1,2,1,3,2,5]
输出：[3,5]
解释：[5, 3] 也是有效的答案。
```

**示例 2：**

```
输入：nums = [-1,0]
输出：[-1,0]
```

**示例 3：**

```
输入：nums = [0,1]
输出：[1,0]
```

**提示：**

-   `2 <= nums.length <= 3 * 10⁴`
-   `-2³¹ <= nums[i] <= 2³¹ - 1`
-   除两个只出现一次的整数外，`nums` 中的其他数字都出现两次



## 二、解答方法

### 2.1 方法一：位运算（分组异或）

1. **思路**

设两个只出现一次的数字为 `a` 和 `b`。

1. **全部异或**：`xor = a ^ b`（成对的数字异或后抵消，剩下 `a ^ b`）。由于 `a != b`，`xor != 0`。
2. **找区分位**：取 `xor` 中任意一个为 1 的二进制位（说明 `a` 和 `b` 在这一位上不同）。常用 `lowbit = xor & (-xor)` 取最低位的 1。
3. **分组异或**：按该位是否为 1 把数组分成两组，`a` 和 `b` 必然分属不同组，而相同的数字会被分到同一组并相互抵消。对每组分别异或，即得 `a` 和 `b`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;                  // a ^ b
        }
        int lowbit = xor & (-xor);       // 取最低位的 1（区分 a 和 b）
        int a = 0, b = 0;
        for (int num : nums) {
            if ((num & lowbit) == 0) {
                a ^= num;                // 该位为 0 的组
            } else {
                b ^= num;                // 该位为 1 的组
            }
        }
        return new int[]{a, b};
    }
}
```

```python [Python]
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor = 0
        for num in nums:
            xor ^= num                   # a ^ b
        lowbit = xor & (-xor)            # 最低位的 1
        a = b = 0
        for num in nums:
            if num & lowbit:
                a ^= num
            else:
                b ^= num
        return [a, b]
```

```go [Go]
func singleNumber(nums []int) []int {
    xor := 0
    for _, num := range nums {
        xor ^= num
    }
    lowbit := xor & (-xor)
    a, b := 0, 0
    for _, num := range nums {
        if num&lowbit == 0 {
            a ^= num
        } else {
            b ^= num
        }
    }
    return []int{a, b}
}
```

```cpp [C++]
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        long long xorSum = 0;
        for (int num : nums) xorSum ^= num;
        long long lowbit = xorSum & (-xorSum);
        int a = 0, b = 0;
        for (int num : nums) {
            if (num & lowbit) a ^= num;
            else b ^= num;
        }
        return {a, b};
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
    let xor = 0;
    for (const num of nums) xor ^= num;
    const lowbit = xor & (-xor);
    let a = 0, b = 0;
    for (const num of nums) {
        if (num & lowbit) a ^= num;
        else b ^= num;
    }
    return [a, b];
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function singleNumber(nums: number[]): number[] {
    let xor = 0;
    for (const num of nums) xor ^= num;
    const lowbit = xor & (-xor);
    let a = 0, b = 0;
    for (const num of nums) {
        if (num & lowbit) a ^= num;
        else b ^= num;
    }
    return [a, b];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（两趟遍历）。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：哈希集合

1. **思路**

用集合记录出现过的数字，第二次遇到就移除，最后剩下的两个即答案。简单但需 `O(n)` 空间，不满足进阶要求。

2. **代码实现（Python）**

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        seen = set()
        for num in nums:
            if num in seen:
                seen.remove(num)
            else:
                seen.add(num)
        return list(seen)
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间 | 空间 |
| ---- | ---- | ---- |
| 位运算分组异或 | `O(n)` | `O(1)`，推荐 |
| 哈希集合 | `O(n)` | `O(n)` |

本题是 `136. 只出现一次的数字`（全部异或即得答案）的升级版，核心在于 **分组**：

```
1. xor = a ^ b                     （成对数字抵消）
2. lowbit = xor & (-xor)           （找到 a、b 的一个不同位）
3. 按 lowbit 分组分别异或          （a、b 分到不同组，各自组内成对数字抵消）
```

关键性质：
- `x ^ x = 0`、`x ^ 0 = x` —— 成对抵消；
- `x & (-x)` 提取最低位的 1（lowbit）；
- `a != b` 保证 `a ^ b != 0`，一定能找到区分位。

注意：Java/C++ 中 `-xor` 对 `Integer.MIN_VALUE` 的处理（`-MIN_VALUE == MIN_VALUE`，其 lowbit 仍是自身），逻辑依然成立。
