# [LCR 068. 搜索插入位置](https://leetcode.cn/problems/N6YdxV/)



## 一、题目描述

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 `O(log n)` 的算法。



**示例 1：**

```
输入: nums = [1,3,5,6], target = 5
输出: 2
```

**示例 2：**

```
输入: nums = [1,3,5,6], target = 2
输出: 1
```

**示例 3：**

```
输入: nums = [1,3,5,6], target = 7
输出: 4
```

**提示：**

- `1 <= nums.length <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`
- `nums` 为 **无重复元素** 的 **升序** 排列数组
- `-10⁴ <= target <= 10⁴`



## 二、解答方法

### 2.1 方法一：二分查找（找第一个 >= target 的位置）

1. **思路**

等价于在数组中找「第一个 `>= target` 的元素下标」：

- 若 `nums[mid] >= target`，答案在左半区（含 mid），`r = mid`；
- 否则 `l = mid + 1`。

循环结束后 `l` 即插入位置。时间 `O(log n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) r = m;
            else l = m + 1;
        }
        return l;
    }
}
```

```python [Python]
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        import bisect
        return bisect.bisect_left(nums, target)
```

```cpp [C++]
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        return lower_bound(nums.begin(), nums.end(), target) - nums.begin();
    }
};
```

```go [Go]
func searchInsert(nums []int, target int) int {
    return sort.SearchInts(nums, target)
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let l = 0, r = nums.length;
    while (l < r) {
        const m = l + ((r - l) >> 1);
        if (nums[m] >= target) r = m;
        else l = m + 1;
    }
    return l;
};
```

```c [C]
int searchInsert(int* nums, int numsSize, int target) {
    int l = 0, r = numsSize;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (nums[m] >= target) r = m;
        else l = m + 1;
    }
    return l;
}
```

```ts [TypeScript]
function searchInsert(nums: number[], target: number): number {
    let l = 0, r = nums.length;
    while (l < r) {
        const m = l + ((r - l) >> 1);
        if (nums[m] >= target) r = m;
        else l = m + 1;
    }
    return l;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分（lower_bound） | `O(log n)` | `O(1)` | 标准解法 |

「搜索插入位置」即求 `lower_bound`：第一个不小于 target 的下标。注意边界 `r` 从 `n` 开始，保证 `target` 大于所有元素时返回 `n`。

