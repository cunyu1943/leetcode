# [80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)



## 一、题目描述

给你一个有序数组 `nums`，请你 **原地** 删除重复出现的元素，使得出现次数超过两次的元素只出现两次，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 **原地** 修改输入数组，并在使用 `O(1)` 额外空间的条件下完成。



**示例 1：**

```
输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
```

**示例 2：**

```
输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
```

**提示：**

-   `1 <= nums.length <= 3 * 10^4`
-   `-10^4 <= nums[i] <= 10^4`
-   `nums` 已按升序排列



## 二、解答方法

### 2.1 方法一：双指针（慢指针慢两步）


1. **思路**

快指针 `i` 遍历，慢指针 `idx` 指向可写入位置；当 `nums[i]` 与 `nums[idx-2]` 不同时才写入，保证同一元素最多出现两次。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int removeDuplicates(int[] nums) {
        int idx = 0;
        for (int x : nums) {
            if (idx < 2 || x != nums[idx - 2]) nums[idx++] = x;
        }
        return idx;
    }
}
```

```python [Python]
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        idx = 0
        for x in nums:
            if idx < 2 or x != nums[idx - 2]:
                nums[idx] = x
                idx += 1
        return idx
```

```go [Go]
func removeDuplicates(nums []int) int {
    idx := 0
    for _, x := range nums {
        if idx < 2 || x != nums[idx-2] { nums[idx] = x; idx++ }
    }
    return idx
}
```

```c [C]
int removeDuplicates(int* nums, int numsSize) {
    int idx = 0;
    for (int i = 0; i < numsSize; i++) {
        if (idx < 2 || nums[i] != nums[idx - 2]) nums[idx++] = nums[i];
    }
    return idx;
}
```

```cpp [C++]
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int idx = 0;
        for (int x : nums) {
            if (idx < 2 || x != nums[idx - 2]) nums[idx++] = x;
        }
        return idx;
    }
};
```

```javascript [JavaScript]
var removeDuplicates = function(nums) {
    let idx = 0;
    for (const x of nums) {
        if (idx < 2 || x !== nums[idx - 2]) { nums[idx] = x; idx++; }
    }
    return idx;
};
```

```typescript [TypeScript]
function removeDuplicates(nums: number[]): number {
    let idx = 0;
    for (const x of nums) {
        if (idx < 2 || x !== nums[idx - 2]) { nums[idx] = x; idx++; }
    }
    return idx;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，原地修改。

### 2.2 方法二：通用 k 次出现


1. **思路**

将「允许出现 2 次」推广为「允许出现 k 次」，判断条件改为 `idx < k || x != nums[idx - k]`，可复用于任意 k。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int removeDuplicates(int[] nums) {
        return removeK(nums, 2);
    }
    private int removeK(int[] nums, int k) {
        int idx = 0;
        for (int x : nums) {
            if (idx < k || x != nums[idx - k]) nums[idx++] = x;
        }
        return idx;
    }
}
```

```python [Python]
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        idx = 0
        for x in nums:
            if idx < 2 or x != nums[idx - 2]:
                nums[idx] = x; idx += 1
        return idx
```

```go [Go]
func removeDuplicates(nums []int) int {
    idx := 0
    for _, x := range nums {
        if idx < 2 || x != nums[idx-2] { nums[idx] = x; idx++ }
    }
    return idx
}
```

```c [C]
int removeDuplicates(int* nums, int numsSize) {
    int idx = 0;
    for (int i = 0; i < numsSize; i++) {
        if (idx < 2 || nums[i] != nums[idx - 2]) nums[idx++] = nums[i];
    }
    return idx;
}
```

```cpp [C++]
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 2, idx = 0;
        for (int x : nums) {
            if (idx < k || x != nums[idx - k]) nums[idx++] = x;
        }
        return idx;
    }
};
```

```javascript [JavaScript]
var removeDuplicates = function(nums) {
    let idx = 0;
    for (const x of nums) {
        if (idx < 2 || x !== nums[idx - 2]) { nums[idx] = x; idx++; }
    }
    return idx;
};
```

```typescript [TypeScript]
function removeDuplicates(nums: number[]): number {
    let idx = 0;
    for (const x of nums) {
        if (idx < 2 || x !== nums[idx - 2]) { nums[idx] = x; idx++; }
    }
    return idx;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，原地修改。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（慢两步） | `O(n)` | `O(1)` | 针对 k=2 直观 |
| 通用 k 次出现 | `O(n)` | `O(1)` | 可推广任意 k |
