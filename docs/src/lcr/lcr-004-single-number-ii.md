# [LCR 004. 只出现一次的数字 II](https://leetcode.cn/problems/WGki4K/)



## 一、题目描述

给你一个整数数组 `nums` ，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次** 。请你找出并返回那个只出现了一次的元素。

**注意：** 你的算法应该具有线性时间复杂度。你可以不使用额外空间来实现吗？



**示例 1：**

```
输入：nums = [2,2,3,2]
输出：3
```

**示例 2：**

```
输入：nums = [0,1,0,1,0,1,100]
输出：100
```

**提示：**

- `1 <= nums.length <= 3 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `nums` 中，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**



## 二、解答方法

### 2.1 方法一：依次确定每一个二进制位（位运算）

1. **思路**

因为除目标数字外，其余数字都恰好出现三次，所以把数组中所有数字的 **每一个二进制位** 累加起来：

- 若某一位上 `1` 的总个数是 `3` 的倍数，说明目标数字在这一位上是 `0`；
- 否则（余数为 `1`），说明目标数字在这一位上是 `1`。

据此从低位到高位（0~31 位）依次还原出目标数字的每一位，时间复杂度 `O(32·n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

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
            if (sum % 3 != 0) ans |= (1 << k);
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
            sum += (num >> k) & 1
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

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(32·n)`，每个数处理 32 位。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：有限状态自动机（位运算优化）

1. **思路**

用两个变量 `a`、`b` 记录「当前已出现次数模 3」的二进制状态：

- 状态 `(a,b) = (0,0)` 表示出现 0 次，`(1,0)` 表示出现 1 次，`(0,1)` 表示出现 2 次；
- 每来一个新数字 `x`，按状态转移方程更新 `a`、`b`，当某位累计出现 3 次时自动归零。

最终只出现一次的数字就保存在 `a` 中。状态转移：

```
a = (a ^ x) & ~b
b = (b ^ x) & ~a
```

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int singleNumber(int[] nums) {
        int a = 0, b = 0;
        for (int x : nums) {
            int ta = (a ^ x) & ~b;
            int tb = (b ^ x) & ~a;
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
            ta = (a ^ x) & ~b
            tb = (b ^ x) & ~a
            a, b = ta, tb
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

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，仅遍历一次。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 逐位统计 | `O(32·n)` | `O(1)` | 思路直观，易理解 |
| 有限状态机 | `O(n)` | `O(1)` | 最优，无需考虑 32 位细节 |

两种方法都满足线性时间、常数空间的要求。方法二借助位运算状态机，一次遍历即可完成，是本题的经典最优解。

