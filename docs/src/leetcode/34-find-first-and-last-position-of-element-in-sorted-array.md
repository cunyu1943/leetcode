# [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)



## 一、题目描述

给你一个按照 **非递减顺序** 排列的整数数组 `nums`，和一个目标值 `target`。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 `target`，返回 `[-1, -1]`。

你必须设计并实现时间复杂度为 `O(log n)` 的算法。



**示例 1：**

```
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
```

**示例 2：**

```
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
```

**示例 3：**

```
输入：nums = [], target = 0
输出：[-1,-1]
```

**提示：**

-   `0 <= nums.length <= 10^5`
-   `-10^9 <= nums[i] <= 10^9`
-   `nums` 是一个非递减数组
-   `-10^9 <= target <= 10^9`



## 二、解答方法

### 2.1 方法一：两次二分查找（找左右边界）

1. **思路**

利用二分分别找 `target` 的「第一次出现位置」和「最后一次出现位置」：

-   找左边界：标准二分，当 `nums[mid] >= target` 时 `right = mid - 1`（即使等于也向左收缩），最后检查 `nums[left]` 是否等于 `target`；
-   找右边界：当 `nums[mid] <= target` 时 `left = mid + 1`（即使等于也向右收缩），最后检查 `nums[right]`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = findFirst(nums, target);
        if (left == -1) return new int[]{-1, -1};
        int right = findLast(nums, target);
        return new int[]{left, right};
    }

    private int findFirst(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] >= target) right = mid - 1;
            else left = mid + 1;
        }
        if (left < nums.length && nums[left] == target) return left;
        return -1;
    }

    private int findLast(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target) left = mid + 1;
            else right = mid - 1;
        }
        if (right >= 0 && nums[right] == target) return right;
        return -1;
    }
}
```

```python [Python]
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def find_first():
            left, right = 0, len(nums) - 1
            while left <= right:
                mid = (left + right) // 2
                if nums[mid] >= target:
                    right = mid - 1
                else:
                    left = mid + 1
            if left < len(nums) and nums[left] == target:
                return left
            return -1

        def find_last():
            left, right = 0, len(nums) - 1
            while left <= right:
                mid = (left + right) // 2
                if nums[mid] <= target:
                    left = mid + 1
                else:
                    right = mid - 1
            if right >= 0 and nums[right] == target:
                return right
            return -1

        first = find_first()
        if first == -1:
            return [-1, -1]
        return [first, find_last()]
```

```go [Go]
func searchRange(nums []int, target int) []int {
    findFirst := func() int {
        left, right := 0, len(nums)-1
        for left <= right {
            mid := left + (right-left)/2
            if nums[mid] >= target {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
        if left < len(nums) && nums[left] == target {
            return left
        }
        return -1
    }
    findLast := func() int {
        left, right := 0, len(nums)-1
        for left <= right {
            mid := left + (right-left)/2
            if nums[mid] <= target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        if right >= 0 && nums[right] == target {
            return right
        }
        return -1
    }
    first := findFirst()
    if first == -1 {
        return []int{-1, -1}
    }
    return []int{first, findLast()}
}
```

```c [C]
int* searchRange(int* nums, int numsSize, int target, int* returnSize) {
    int* res = (int*)malloc(sizeof(int) * 2);
    res[0] = res[1] = -1;
    *returnSize = 2;
    if (numsSize == 0) return res;
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] >= target) right = mid - 1; else left = mid + 1;
    }
    if (left < numsSize && nums[left] == target) res[0] = left;
    else return res;
    left = 0; right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] <= target) left = mid + 1; else right = mid - 1;
    }
    if (right >= 0 && nums[right] == target) res[1] = right;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return {-1, -1};
        int last = findBound(nums, target, false);
        return {first, last};
    }

private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int left = 0, right = nums.size() - 1, res = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                res = mid;
                if (isFirst) right = mid - 1; else left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    const findFirst = () => {
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] >= target) right = mid - 1; else left = mid + 1;
        }
        if (left < nums.length && nums[left] === target) return left;
        return -1;
    };
    const findLast = () => {
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] <= target) left = mid + 1; else right = mid - 1;
        }
        if (right >= 0 && nums[right] === target) return right;
        return -1;
    };
    const first = findFirst();
    if (first === -1) return [-1, -1];
    return [first, findLast()];
};
```

```ts [TypeScript]
function searchRange(nums: number[], target: number): number[] {
    const findFirst = (): number => {
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] >= target) right = mid - 1; else left = mid + 1;
        }
        if (left < nums.length && nums[left] === target) return left;
        return -1;
    };
    const findLast = (): number => {
        let left = 0, right = nums.length - 1;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] <= target) left = mid + 1; else right = mid - 1;
        }
        if (right >= 0 && nums[right] === target) return right;
        return -1;
    };
    const first = findFirst();
    if (first === -1) return [-1, -1];
    return [first, findLast()];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`，两次二分查找，每次 `O(log n)`。
- **空间复杂度**：`O(1)`，只使用常数变量（C++ 返回 vector 不计）。

### 2.2 方法二：二分 + 线性扩展（仅找一次）

1. **思路**

先二分找到一个等于 `target` 的位置 `pos`（普通二分），再从 `pos` 向左右线性扩展直到不等。最坏情况（全为 `target`）退化为 `O(n)`，不严格满足 `O(log n)`，仅作对比。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = 0, right = nums.length - 1, pos = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) { pos = mid; break; }
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        if (pos == -1) return new int[]{-1, -1};
        int start = pos, end = pos;
        while (start > 0 && nums[start - 1] == target) start--;
        while (end < nums.length - 1 && nums[end + 1] == target) end++;
        return new int[]{start, end};
    }
}
```

```python [Python]
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left, right = 0, len(nums) - 1
        pos = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                pos = mid
                break
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        if pos == -1:
            return [-1, -1]
        start = end = pos
        while start > 0 and nums[start - 1] == target:
            start -= 1
        while end < len(nums) - 1 and nums[end + 1] == target:
            end += 1
        return [start, end]
```

```go [Go]
func searchRange(nums []int, target int) []int {
    left, right := 0, len(nums)-1
    pos := -1
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            pos = mid
            break
        } else if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    if pos == -1 {
        return []int{-1, -1}
    }
    start, end := pos, pos
    for start > 0 && nums[start-1] == target {
        start--
    }
    for end < len(nums)-1 && nums[end+1] == target {
        end++
    }
    return []int{start, end}
}
```

```c [C]
int* searchRange(int* nums, int numsSize, int target, int* returnSize) {
    int* res = (int*)malloc(sizeof(int) * 2);
    res[0] = res[1] = -1;
    *returnSize = 2;
    int left = 0, right = numsSize - 1, pos = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) { pos = mid; break; }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (pos == -1) return res;
    int start = pos, end = pos;
    while (start > 0 && nums[start - 1] == target) start--;
    while (end < numsSize - 1 && nums[end + 1] == target) end++;
    res[0] = start; res[1] = end;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1, pos = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) { pos = mid; break; }
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        if (pos == -1) return {-1, -1};
        int start = pos, end = pos;
        while (start > 0 && nums[start - 1] == target) start--;
        while (end < nums.size() - 1 && nums[end + 1] == target) end++;
        return {start, end};
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    let left = 0, right = nums.length - 1, pos = -1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) { pos = mid; break; }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (pos === -1) return [-1, -1];
    let start = pos, end = pos;
    while (start > 0 && nums[start - 1] === target) start--;
    while (end < nums.length - 1 && nums[end + 1] === target) end++;
    return [start, end];
};
```

```ts [TypeScript]
function searchRange(nums: number[], target: number): number[] {
    let left = 0, right = nums.length - 1, pos = -1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) { pos = mid; break; }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (pos === -1) return [-1, -1];
    let start = pos, end = pos;
    while (start > 0 && nums[start - 1] === target) start--;
    while (end < nums.length - 1 && nums[end + 1] === target) end++;
    return [start, end];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：二分 `O(log n)`，但最坏线性扩展为 `O(n)`（数组全为 `target`）。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 两次二分查找（找左右边界） | `O(log n)` | `O(1)` | 折半降低复杂度 |
| 二分 + 线性扩展（仅找一次） | `—` | `O(1)` | 折半降低复杂度 |

