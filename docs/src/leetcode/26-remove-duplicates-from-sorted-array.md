# [26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)



## 一、题目描述

给你一个 **非严格递增排列** 的数组 `nums`，请你 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 删除重复出现的元素，使每个元素 **只出现一次**，返回删除后数组的新长度。元素的 **相对顺序** 应该保持 **一致**。

考虑 `nums` 的唯一元素的数量为 `k`。去重后，返回唯一元素的数量 `k`。`nums` 的前 `k` 个元素应包含排序后的唯一数字。



**示例 1：**

```
输入：nums = [1,1,2]
输出：2, nums = [1,2,_]
解释：函数应该返回新的长度 2，并且原数组 nums 的前两个元素被修改为 1, 2。
```

**示例 2：**

```
输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4,_,_,_,_,_]
解释：函数应该返回新的长度 5，并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
```

**提示：**

-   `1 <= nums.length <= 3 * 10^4`
-   `-100 <= nums[i] <= 100`
-   `nums` 已按 **非递减** 顺序排列



## 二、解答方法

### 2.1 方法一：双指针（快慢指针）

1. **思路**

利用数组已排序、重复项相邻的特点。慢指针 `slow` 指向「下一个唯一元素应放的位置」，快指针 `fast` 遍历数组：

-   若 `nums[fast] != nums[slow]`，说明遇到新元素，先 `slow++` 再赋值 `nums[slow] = nums[fast]`；
-   否则 `fast` 继续后移跳过重复项；
-   返回长度为 `slow + 1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
}
```

```python [Python]
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        slow = 0
        for fast in range(1, len(nums)):
            if nums[fast] != nums[slow]:
                slow += 1
                nums[slow] = nums[fast]
        return slow + 1
```

```go [Go]
func removeDuplicates(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    slow := 0
    for fast := 1; fast < len(nums); fast++ {
        if nums[fast] != nums[slow] {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
}
```

```c [C]
int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    int slow = 0;
    for (int fast = 1; fast < numsSize; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
```

```cpp [C++]
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.size(); fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums.length === 0) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
};
```

```ts [TypeScript]
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，快指针遍历数组一次。
- **空间复杂度**：`O(1)`，原地修改，只用两个指针。

### 2.2 方法二：利用 STL / 库函数

1. **思路**

部分语言提供「去重」库函数（如 C++ 的 `unique`、Python 的 `set`/字典序），但需注意题目要求「原地」且保持相对顺序。C++ `unique` 配合 `erase` 最符合；Python 若允许额外空间可直接用有序集合，但非正式解法。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int removeDuplicates(int[] nums) {
        // Java 标准库无原地去重，推荐方法一双指针
        return new Solution().removeDuplicates(nums);
    }
}
```

```python [Python]
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # 库函数思路（非原地，仅作对比）：用有序字典保留顺序
        seen = dict.fromkeys(nums)
        uniq = list(seen)
        nums[:len(uniq)] = uniq
        return len(uniq)
```

```go [Go]
func removeDuplicates(nums []int) int {
    // Go 标准库无原地去重，推荐方法一双指针
    return len(nums)
}
```

```c [C]
int removeDuplicates(int* nums, int numsSize) {
    /* C 无库函数，使用双指针法，见方法一 */
    return numsSize;
}
```

```cpp [C++]
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        return nums.size();
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) nums[k++] = nums[i];
    }
    return k;
};
```

```ts [TypeScript]
function removeDuplicates(nums: number[]): number {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) nums[k++] = nums[i];
    }
    return k;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：C++ `unique` 为 `O(n)`；Python 字典法 `O(n)` 但额外空间。
- **空间复杂度**：C++ `O(1)`；Python 字典法 `O(n)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（快慢指针） | `O(n)` | `O(1)` | 空间紧凑，常为常数级 |
| 利用 STL / 库函数 | `—` | `—` | 常规实现 |

