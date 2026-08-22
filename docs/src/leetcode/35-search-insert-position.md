# [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)



## 一、题目描述

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 `O(log n)` 的算法。



**示例 1：**

```
输入：nums = [1,3,5,6], target = 5
输出：2
```

**示例 2：**

```
输入：nums = [1,3,5,6], target = 2
输出：1
```

**示例 3：**

```
输入：nums = [1,3,5,6], target = 7
输出：4
```

**提示：**

-   `1 <= nums.length <= 10^4`
-   `-10^4 <= nums[i] <= 10^4`
-   `nums` 为 **无重复元素** 的 **升序** 排列数组
-   `-10^4 <= target <= 10^4`



## 二、解答方法

### 2.1 方法一：二分查找（标准）

1. **思路**

在升序无重复数组中查找 `target`。若找到直接返回下标；若找不到，二分结束时 `left` 恰好指向「第一个不小于 `target` 的位置」，即插入位置：

-   标准二分，当 `nums[mid] < target` 时 `left = mid + 1`，否则 `right = mid - 1`；
-   循环结束 `left > right`，`left` 就是插入下标。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
}
```

```python [Python]
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left
```

```go [Go]
func searchInsert(nums []int, target int) int {
    left, right := 0, len(nums)-1
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return left
}
```

```c [C]
int searchInsert(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}
```

```cpp [C++]
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
};
```

```ts [TypeScript]
function searchInsert(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`，标准二分查找。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：遍历查找（线性）

1. **思路**

从头遍历，遇到第一个 `>= target` 的位置即返回；遍历完仍未找到说明 `target` 大于所有元素，返回 `nums.length`。直观但 `O(n)`，不满足进阶要求。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int searchInsert(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= target) return i;
        }
        return nums.length;
    }
}
```

```python [Python]
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        for i, num in enumerate(nums):
            if num >= target:
                return i
        return len(nums)
```

```go [Go]
func searchInsert(nums []int, target int) int {
    for i, num := range nums {
        if num >= target {
            return i
        }
    }
    return len(nums)
}
```

```c [C]
int searchInsert(int* nums, int numsSize, int target) {
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] >= target) return i;
    }
    return numsSize;
}
```

```cpp [C++]
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] >= target) return i;
        }
        return nums.size();
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) return i;
    }
    return nums.length;
};
```

```ts [TypeScript]
function searchInsert(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) return i;
    }
    return nums.length;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，最坏遍历整个数组。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分查找（标准） | `O(log n)` | `O(1)` | 折半降低复杂度 |
| 遍历查找（线性） | `O(n)` | `O(1)` | 常规实现 |

