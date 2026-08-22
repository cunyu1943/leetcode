# [31. 下一个排列](https://leetcode.cn/problems/next-permutation/)



## 一、题目描述

整数数组的一个 **排列** 就是将其所有成员以序列或线性顺序排列。

整数数组的 **下一个排列** 是指其整数的下一个字典序更大的排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

给你一个整数数组 `nums`，找出 `nums` 的下一个排列。必须 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 修改，只允许使用额外常数空间。



**示例 1：**

```
输入：nums = [1,2,3]
输出：[1,3,2]
```

**示例 2：**

```
输入：nums = [3,2,1]
输出：[1,2,3]
```

**示例 3：**

```
输入：nums = [1,1,5]
输出：[1,5,1]
```

**提示：**

-   `1 <= nums.length <= 100`
-   `0 <= nums[i] <= 100`



## 二、解答方法

### 2.1 方法一：标准两遍扫描（原地）

1. **思路**

字典序下一个排列的通用算法，分三步：

-   **从右往左** 找到第一对 `nums[i] < nums[i+1]`，记 `i` 为「较小数」位置（若不存在说明已是最大排列，直接翻转整个数组）；
-   **从右往左** 找到第一个 `nums[j] > nums[i]`，`j` 为「较大数」位置；
-   **交换** `nums[i]` 与 `nums[j]`，再 **反转** `i+1` 到末尾（因为这部分原本降序，反转后变成最小升序）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (j >= 0 && nums[j] <= nums[i]) j--;
            swap(nums, i, j);
        }
        reverse(nums, i + 1, n - 1);
    }

    private void swap(int[] a, int i, int j) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
    }

    private void reverse(int[] a, int l, int r) {
        while (l < r) swap(a, l++, r--);
    }
}
```

```python [Python]
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        left, right = i + 1, n - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
```

```go [Go]
func nextPermutation(nums []int) {
    n := len(nums)
    i := n - 2
    for i >= 0 && nums[i] >= nums[i+1] {
        i--
    }
    if i >= 0 {
        j := n - 1
        for nums[j] <= nums[i] {
            j--
        }
        nums[i], nums[j] = nums[j], nums[i]
    }
    for left, right := i+1, n-1; left < right; left, right = left+1, right-1 {
        nums[left], nums[right] = nums[right], nums[left]
    }
}
```

```c [C]
void nextPermutation(int* nums, int numsSize) {
    int i = numsSize - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = numsSize - 1;
        while (nums[j] <= nums[i]) j--;
        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
    }
    for (int left = i + 1, right = numsSize - 1; left < right; left++, right--) {
        int t = nums[left]; nums[left] = nums[right]; nums[right] = t;
    }
}
```

```cpp [C++]
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    let left = i + 1, right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++; right--;
    }
};
```

```ts [TypeScript]
function nextPermutation(nums: number[]): void {
    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    let left = i + 1, right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++; right--;
    }
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，最多两遍扫描 + 一次反转。
- **空间复杂度**：`O(1)`，原地修改。

### 2.2 方法二：C++ next_permutation 库函数

1. **思路**

C++ 标准库已提供 `std::next_permutation`，内部实现与上述一致。其他语言可借助排序/全排列思路，但效率或空间不如原地算法。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void nextPermutation(int[] nums) {
        // Java 无内建，推荐方法一
    }
}
```

```python [Python]
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        # Python 无内建，推荐方法一
        pass
```

```go [Go]
func nextPermutation(nums []int) {
    // Go 无内建，推荐方法一
}
```

```c [C]
void nextPermutation(int* nums, int numsSize) {
    /* C 无库函数，使用双指针法见方法一 */
}
```

```cpp [C++]
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        next_permutation(nums.begin(), nums.end());
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {void}
 */
var nextPermutation = function (nums) {
    // JS 无内建，推荐方法一
};
```

```ts [TypeScript]
function nextPermutation(nums: number[]): void {
    // TS 无内建，推荐方法一
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，`std::next_permutation` 内部同方法一。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 标准两遍扫描（原地） | `O(n)` | `O(1)` | 常规实现 |
| C++ next_permutation 库函数 | `O(n)` | `O(1)` | 常规实现 |

