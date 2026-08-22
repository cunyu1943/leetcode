# [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)



## 一、题目描述

整数数组 `nums` 按升序排列，数组中的值 **互不相同**。

在传递给函数之前，`nums` 在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了 **旋转**，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`（下标从 0 开始计数）。

给你 **旋转后** 的数组 `nums` 和一个整数 `target`，如果 `target` 在这个数组中存在，则返回它的下标，否则返回 `-1`。

你必须设计一个时间复杂度为 `O(log n)` 的算法。



**示例 1：**

```
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
```

**示例 3：**

```
输入：nums = [1], target = 0
输出：-1
```

**提示：**

-   `1 <= nums.length <= 5000`
-   `-10^4 <= nums[i] <= 10^4`
-   `nums` 中的每个值都 **独一无二**
-   `nums` 肯定会在某个点上旋转
-   `-10^4 <= target <= 10^4`



## 二、解答方法

### 2.1 方法一：二分查找（判断有序半区）

1. **思路**

虽然整体旋转，但二分后至少有一半是有序的。每次取 `mid`：

-   若 `nums[mid] == target` 直接返回；
-   判断左半 `[left, mid]` 是否有序（`nums[left] <= nums[mid]`）：
    -   若有序且 `target` 落在 `[nums[left], nums[mid])` 内，则答案在左半，否则在右半；
    -   若左半无序，则右半 `[mid, right]` 必然有序，同理判断 `target` 是否在右半。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1
```

```go [Go]
func search(nums []int, target int) int {
    left, right := 0, len(nums)-1
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            return mid
        }
        if nums[left] <= nums[mid] {
            if nums[left] <= target && target < nums[mid] {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            if nums[mid] < target && target <= nums[right] {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
}
```

```c [C]
int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
};
```

```ts [TypeScript]
function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`，二分发散查找，每次排除一半。
- **空间复杂度**：`O(1)`，只用常数变量。

### 2.2 方法二：先找旋转点再二分（两段二分）

1. **思路**

先用二分找到「最小值下标 `rot`」（即旋转点），数组被分成两个有序段 `[rot, n-1]` 和 `[0, rot-1]`。根据 `target` 与 `nums[0]` 的大小，判断它落在哪一段，再在该段内做普通二分。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int search(int[] nums, int target) {
        int n = nums.length;
        int left = 0, right = n - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        int rot = left;
        if (target >= nums[rot] && target <= nums[n - 1]) left = rot; else left = 0;
        right = (left == rot) ? n - 1 : rot - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1; else right = mid - 1;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        n = len(nums)
        left, right = 0, n - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        rot = left
        if nums[rot] <= target <= nums[n - 1]:
            left, right = rot, n - 1
        else:
            left, right = 0, rot - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
```

```go [Go]
func search(nums []int, target int) int {
    n := len(nums)
    left, right := 0, n-1
    for left < right {
        mid := left + (right-left)/2
        if nums[mid] > nums[right] {
            left = mid + 1
        } else {
            right = mid
        }
    }
    rot := left
    if nums[rot] <= target && target <= nums[n-1] {
        left, right = rot, n-1
    } else {
        left, right = 0, rot-1
    }
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            return mid
        }
        if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}
```

```c [C]
int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    int rot = left;
    if (nums[rot] <= target && target <= nums[numsSize - 1]) { left = rot; right = numsSize - 1; }
    else { left = 0; right = rot - 1; }
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1; else right = mid - 1;
    }
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int left = 0, right = n - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        int rot = left;
        if (target >= nums[rot] && target <= nums[n - 1]) { left = rot; right = n - 1; }
        else { left = 0; right = rot - 1; }
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1; else right = mid - 1;
        }
        return -1;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    const rot = left;
    if (target >= nums[rot] && target <= nums[n - 1]) { left = rot; right = n - 1; }
    else { left = 0; right = rot - 1; }
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1; else right = mid - 1;
    }
    return -1;
};
```

```ts [TypeScript]
function search(nums: number[], target: number): number {
    const n = nums.length;
    let left = 0, right = n - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    const rot = left;
    if (target >= nums[rot] && target <= nums[n - 1]) { left = rot; right = n - 1; }
    else { left = 0; right = rot - 1; }
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1; else right = mid - 1;
    }
    return -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`，两次二分均为对数级。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分查找（判断有序半区） | `O(log n)` | `O(1)` | 折半降低复杂度 |
| 先找旋转点再二分（两段二分） | `O(log n)` | `O(1)` | 折半降低复杂度 |

