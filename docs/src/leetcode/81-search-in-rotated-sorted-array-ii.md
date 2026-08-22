# [81. 搜索旋转排序数组 II](https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/)



## 一、题目描述

已知存在一个按非降序排列的整数数组 `nums`，数组中的值不必互不相同。在传递给函数之前，`nums` 在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了旋转，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`。

给你旋转后的数组 `nums` 和一个整数 `target`，如果 `nums` 中存在这个目标值 `target`，则返回 `true`，否则返回 `false`。



**示例 1：**

```
输入：nums = [2,5,6,0,0,1,2], target = 0
输出：true
```

**示例 2：**

```
输入：nums = [2,5,6,0,0,1,2], target = 3
输出：false
```

**提示：**

-   `1 <= nums.length <= 5000`
-   `-10^4 <= nums[i] <= 10^4`
-   题目数据保证 `nums` 在预先未知的某个下标上进行了旋转



## 二、解答方法

### 2.1 方法一：二分查找（跳过重复）


1. **思路**

与无重复版本类似，但遇到 `nums[l] == nums[mid]` 时无法判断哪侧有序，需 `l++` 跳过重复元素。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return true;
            if (nums[l] == nums[mid]) { l++; continue; }
            if (nums[l] <= nums[mid]) {
                if (target >= nums[l] && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return True
            if nums[l] == nums[mid]: l += 1; continue
            if nums[l] <= nums[mid]:
                if nums[l] <= target < nums[mid]: r = mid - 1
                else: l = mid + 1
            else:
                if nums[mid] < target <= nums[r]: l = mid + 1
                else: r = mid - 1
        return False
```

```go [Go]
func search(nums []int, target int) bool {
    l, r := 0, len(nums)-1
    for l <= r {
        mid := l + (r-l)/2
        if nums[mid] == target { return true }
        if nums[l] == nums[mid] { l++; continue }
        if nums[l] <= nums[mid] {
            if target >= nums[l] && target < nums[mid] { r = mid - 1 } else { l = mid + 1 }
        } else {
            if target > nums[mid] && target <= nums[r] { l = mid + 1 } else { r = mid - 1 }
        }
    }
    return false
}
```

```c [C]
bool search(int* nums, int numsSize, int target) {
    int l = 0, r = numsSize - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return true;
        if (nums[l] == nums[mid]) { l++; continue; }
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return true;
            if (nums[l] == nums[mid]) { l++; continue; }
            if (nums[l] <= nums[mid]) {
                if (target >= nums[l] && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return false;
    }
};
```

```javascript [JavaScript]
var search = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return true;
        if (nums[l] === nums[mid]) { l++; continue; }
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return false;
};
```

```typescript [TypeScript]
function search(nums: number[], target: number): boolean {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return true;
        if (nums[l] === nums[mid]) { l++; continue; }
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：平均 `O(log n)`，最坏（全相同）`O(n)`。
- **空间复杂度**：`O(1)`，只用下标。

### 2.2 方法二：线性扫描


1. **思路**

直接遍历数组判断是否存在 `target`，代码最简单，适合数据规模较小或重复极多的场景。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean search(int[] nums, int target) {
        for (int x : nums) if (x == target) return true;
        return false;
    }
}
```

```python [Python]
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        return target in nums
```

```go [Go]
func search(nums []int, target int) bool {
    for _, x := range nums { if x == target { return true } }
    return false
}
```

```c [C]
bool search(int* nums, int numsSize, int target) {
    for (int i = 0; i < numsSize; i++) if (nums[i] == target) return true;
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        for (int x : nums) if (x == target) return true;
        return false;
    }
};
```

```javascript [JavaScript]
var search = function(nums, target) {
    return nums.includes(target);
};
```

```typescript [TypeScript]
function search(nums: number[], target: number): boolean {
    return nums.includes(target);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，遍历一次。
- **空间复杂度**：`O(1)`，只用下标。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分查找（跳过重复） | `O(log n)` 平均 / `O(n)` 最坏 | `O(1)` | 高效，面试首选 |
| 线性扫描 | `O(n)` | `O(1)` | 代码最简，最坏更稳 |
