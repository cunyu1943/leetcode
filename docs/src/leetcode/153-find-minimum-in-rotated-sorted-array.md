# [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)



## 一、题目描述

已知一个长度为 `n` 的数组，预先按照升序排列，经由 `1` 到 `n` 次 **旋转** 后，得到输入数组。例如，原数组 `nums = [0,1,2,4,5,6,7]` 在变化后可能得到：

-   若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,2]`
-   若旋转 `7` 次，则可以得到 `[0,1,2,4,5,6,7]`

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` 旋转一次 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

给你一个元素值 **互不相同** 的数组 `nums` ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素** 。

你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。



**示例 1：**

```
输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
```

**提示：**

-   `n == nums.length`
-   `1 <= n <= 5000`
-   `-5000 <= nums[i] <= 5000`
-   `nums` 中的所有整数 **互不相同**
-   `nums` 原来是一个升序排序的数组，并进行了 `1` 至 `n` 次旋转



## 二、解答方法

### 2.1 方法一：二分查找

1. **思路**

旋转数组可看作两段升序数组，最小值为第二段起点。用二分：

- 若 `nums[mid] < nums[right]`，说明 `mid` 在右段（升序），最小值在 `mid` 左侧（含 `mid`）：`right = mid`。
- 否则 `nums[mid] > nums[right]`，最小值在 `mid` 右侧：`left = mid + 1`。

最终 `left == right` 指向最小值。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return nums[left];
    }
}
```

```python [Python]
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = left + (right - left) // 2
            if nums[mid] < nums[right]:
                right = mid
            else:
                left = mid + 1
        return nums[left]
```

```go [Go]
func findMin(nums []int) int {
    left, right := 0, len(nums)-1
    for left < right {
        mid := left + (right-left)/2
        if nums[mid] < nums[right] {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return nums[left]
}
```

```cpp [C++]
class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return nums[left];
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left];
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

旋转排序数组的二分关键在于**用右端点作比较基准**（数组无重复元素时可稳定判断 `mid` 所在段）。154 题含重复元素，需将 `nums[mid] == nums[right]` 时 `right--` 处理。
