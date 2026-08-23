# [LCR 012. 寻找数组的中心下标](https://leetcode.cn/problems/tvdfwe/)



## 一、题目描述

给你一个整数数组 `nums` ，请计算数组的 **中心下标** 。

数组 **中心下标** 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。如果中心下标位于数组最左端，那么左侧数之和视为 `0` ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

如果数组有多个中心下标，应该返回 **最靠近左边** 的那一个。如果数组不存在中心下标，返回 `-1` 。



**示例 1：**

```
输入：nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：中心下标是 3 ，左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。
```

**示例 2：**

```
输入：nums = [1, 2, 3]
输出：-1
```

**示例 3：**

```
输入：nums = [2, 1, -1]
输出：0
解释：下标 0 左侧不存在元素，视作和为 0 ；右侧数之和为 1 + (-1) = 0 ，二者相等。
```

**提示：**

- `1 <= nums.length <= 10⁴`
- `-1000 <= nums[i] <= 1000`



## 二、解答方法

### 2.1 方法一：前缀和（一次遍历）

1. **思路**

先求数组总和 `total`。从左到右遍历，维护「左侧和 `left`」：

- 当前位置 `i` 右侧和 = `total - left - nums[i]`；
- 若 `left == total - left - nums[i]`，则 `i` 为中心下标，直接返回；
- 否则 `left += nums[i]`，继续右移。

只需一次遍历，时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total = sum(nums)
        left = 0
        for i, x in enumerate(nums):
            if left == total - left - x:
                return i
            left += x
        return -1
```

```cpp [C++]
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int x : nums) total += x;
        int left = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
};
```

```go [Go]
func pivotIndex(nums []int) int {
    total := 0
    for _, x := range nums {
        total += x
    }
    left := 0
    for i, x := range nums {
        if left == total-left-x {
            return i
        }
        left += x
    }
    return -1
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
};
```

```c [C]
int pivotIndex(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i++) total += nums[i];
    int left = 0;
    for (int i = 0; i < numsSize; i++) {
        if (left == total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}
```

```ts [TypeScript]
function pivotIndex(nums: number[]): number {
    const total = nums.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前缀和一次遍历 | `O(n)` | `O(1)` | 最优，边走边判断 |

核心公式：`左侧和 == 总和 - 左侧和 - 当前值`，一次遍历即可定位最左中心下标。

