# [137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/)



## 一、题目描述

给你一个整数数组 `nums`，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**。请你找出并返回那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法且 **不使用额外空间** 来解决此问题。



**示例 1：**

```
输入：nums = [2,2,3,2]
输出：3
```

**示例 2：**

```
输入：nums = [0,1,0,1,0,1,99]
输出：99
```

**提示：**

- `1 <= nums.length <= 3 × 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `nums` 中，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**



## 二、解答方法

### 2.1 方法一：位运算（按位统计）

1. **思路**

每个数出现 3 次，意味着对于整数的 **每一个二进制位**，该位上 `1` 出现的次数要么是 `3` 的倍数（对应只出现一次的数该位为 `0`），要么比 `3` 的倍数多 1（对应只出现一次的数该位为 `1`）。

- 对 `0 ~ 31` 每一位 `k`，统计所有数在该位上 `1` 的个数 `sum`；
- 若 `sum % 3 != 0`，说明只出现一次的数在第 `k` 位是 `1`，把它置位到结果中；
- 注意负数采用补码表示，Java/C++ 等需用无符号右移或显式处理 32 位。

该方法时间 `O(32n)`，空间 `O(1)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int singleNumber(int[] nums) {
        int ans = 0;
        for (int k = 0; k < 32; k++) {
            int sum = 0;
            for (int num : nums) {
                sum += (num >> k) & 1;
            }
            if (sum % 3 != 0) {
                ans |= (1 << k);
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        ans = 0
        for k in range(32):
            s = sum((num >> k) & 1 for num in nums)
            if s % 3 != 0:
                ans |= (1 << k)
        # 处理 Python 的无限整数位宽，截断为 32 位补码
        if ans >= (1 << 31):
            ans -= (1 << 32)
        return ans
```

```cpp [C++]
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int k = 0; k < 32; k++) {
            int sum = 0;
            for (int num : nums) sum += (num >> k) & 1;
            if (sum % 3) ans |= (1 << k);
        }
        return ans;
    }
};
```

```go [Go]
func singleNumber(nums []int) int {
    ans := 0
    for k := 0; k < 32; k++ {
        sum := 0
        for _, num := range nums {
            if (num>>k)&1 == 1 {
                sum++
            }
        }
        if sum%3 != 0 {
            ans |= (1 << k)
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let ans = 0;
    for (let k = 0; k < 32; k++) {
        let sum = 0;
        for (const num of nums) {
            sum += (num >> k) & 1;
        }
        if (sum % 3 !== 0) {
            ans |= (1 << k);
        }
    }
    return ans;
};
```

```c [C]
int singleNumber(int* nums, int numsSize) {
    int ans = 0;
    for (int k = 0; k < 32; k++) {
        int sum = 0;
        for (int i = 0; i < numsSize; i++) sum += (nums[i] >> k) & 1;
        if (sum % 3 != 0) ans |= (1 << k);
    }
    return ans;
}
```

```ts [TypeScript]
function singleNumber(nums: number[]): number {
    let ans = 0;
    for (let k = 0; k < 32; k++) {
        let sum = 0;
        for (const num of nums) {
            sum += (num >> k) & 1;
        }
        if (sum % 3 !== 0) {
            ans |= (1 << k);
        }
    }
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(32 × n)`，即 `O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：有限状态自动机（位运算优化）

1. **思路**

用两个变量 `a`、`b` 表示每个二进制位上「出现次数 mod 3」的状态（00→01→10→00 循环）。对每个输入 `x` 更新状态：

- `a = (a ^ x) & ~b`
- `b = (b ^ x) & ~a`

当某一位出现 3 次时，状态回到 `00`；只出现 1 次的数最终保留在 `a` 中。最终 `a` 即为答案。需要把更新放在同一个表达式并用临时变量避免互相干扰。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int singleNumber(int[] nums) {
        int a = 0, b = 0;
        for (int x : nums) {
            int ta = (a ^ x) & ~b;
            int tb = (~a & b) | (b & ~x);
            // 等价于 tb = (b ^ x) & ~a
            tb = (b ^ x) & ~a;
            a = ta;
            b = tb;
        }
        return a;
    }
}
```

```python [Python]
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        a = b = 0
        for x in nums:
            a, b = (a ^ x) & ~b, (b ^ x) & ~a
        return a
```

```cpp [C++]
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int a = 0, b = 0;
        for (int x : nums) {
            int ta = (a ^ x) & ~b;
            int tb = (b ^ x) & ~a;
            a = ta;
            b = tb;
        }
        return a;
    }
};
```

```go [Go]
func singleNumber(nums []int) int {
    a, b := 0, 0
    for _, x := range nums {
        ta := (a ^ x) & ^b
        tb := (b ^ x) & ^a
        a, b = ta, tb
    }
    return a
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let a = 0, b = 0;
    for (const x of nums) {
        const ta = (a ^ x) & ~b;
        const tb = (b ^ x) & ~a;
        a = ta;
        b = tb;
    }
    return a;
};
```

```c [C]
int singleNumber(int* nums, int numsSize) {
    int a = 0, b = 0;
    for (int i = 0; i < numsSize; i++) {
        int x = nums[i];
        int ta = (a ^ x) & ~b;
        int tb = (b ^ x) & ~a;
        a = ta;
        b = tb;
    }
    return a;
}
```

```ts [TypeScript]
function singleNumber(nums: number[]): number {
    let a = 0, b = 0;
    for (const x of nums) {
        const ta = (a ^ x) & ~b;
        const tb = (b ^ x) & ~a;
        a = ta;
        b = tb;
    }
    return a;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，一次遍历。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 按位统计 | `O(n)` | `O(1)` | 易理解，推荐 |
| 有限状态自动机 | `O(n)` | `O(1)` | 最省位操作，技巧性强 |

两种方法都满足线性时间与常数空间要求。方法一通过「每位 1 的个数 % 3」判断，逻辑直观；方法二用状态机更巧妙，但可读性稍差。
