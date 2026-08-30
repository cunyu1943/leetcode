# [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)



## 一、题目描述

峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 `nums`，找到 **峰值元素** 并返回其索引。数组可能包含多个峰值，在这种情况下，返回 **任何一个峰值** 所在位置即可。

你可以假设 `nums[-1] = nums[n] = -∞` 。

你必须实现时间复杂度为 `O(log n)` 的算法来解决此问题。



**示例 1：**

```
输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。
```

**示例 2：**

```
输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5
解释：你的函数可以返回索引 1，其峰值元素为 2；或者返回索引 5，其峰值元素为 6。
```

**提示：**

-   `1 <= nums.length <= 1000`
-   `-2³¹ <= nums[i] <= 2³¹ - 1`
-   对于所有有效的 `i` 都有 `nums[i] != nums[i + 1]`



## 二、解答方法

### 2.1 方法一：二分查找

1. **思路**

由于首尾视为 `-∞`，数组必然存在峰值。用二分：若 `nums[mid] < nums[mid+1]`，说明右侧存在上升段，峰值在右侧（`left = mid + 1`）；否则峰值在左侧（`right = mid`）。最终 `left == right` 即为峰值索引。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

```python [Python]
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = left + (right - left) // 2
            if nums[mid] < nums[mid + 1]:
                left = mid + 1
            else:
                right = mid
        return left
```

```go [Go]
func findPeakElement(nums []int) int {
    left, right := 0, len(nums)-1
    for left < right {
        mid := left + (right-left)/2
        if nums[mid] < nums[mid+1] {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
}
```

```cpp [C++]
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

本题是二分查找的经典变体，核心洞察：**只要向「上升」方向走，必能找到峰值**。无需比较全局最大，满足 `O(log n)` 要求。线性扫描 `O(n)` 同样可行，但不符合进阶要求。
