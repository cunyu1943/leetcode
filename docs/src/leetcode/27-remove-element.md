# [27. 移除元素](https://leetcode.cn/problems/remove-element/)



## 一、题目描述

给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 移除所有数值等于 `val` 的元素。元素的顺序可能发生改变。然后返回 `nums` 中与 `val` 不同的元素的数量 `k`。

`nums` 的前 `k` 个元素应包含不等于 `val` 的元素，`nums` 的其余元素和 `nums` 的大小并不重要。返回 `k`。



**示例 1：**

```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2,_,_]
解释：函数应该返回 k = 2，并且 nums 中的前两个元素均为 2。
```

**示例 2：**

```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3,_,_,_]
解释：函数应该返回 k = 5，并且 nums 中的前五个元素为 0,1,3,0,4（顺序任意）。
```

**提示：**

-   `0 <= nums.length <= 100`
-   `0 <= nums[i] <= 50`
-   `0 <= val <= 100`



## 二、解答方法

### 2.1 方法一：双指针（快慢指针）

1. **思路**

与第 26 题类似，但这里是「保留不等于 `val` 的元素」：

-   慢指针 `slow` 指向下一个保留位；快指针 `fast` 遍历；
-   若 `nums[fast] != val`，保留它：`nums[slow++] = nums[fast]`；
-   否则跳过；
-   返回 `slow`（即保留元素个数）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int removeElement(int[] nums, int val) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != val) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }
}
```

```python [Python]
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        slow = 0
        for fast in range(len(nums)):
            if nums[fast] != val:
                nums[slow] = nums[fast]
                slow += 1
        return slow
```

```go [Go]
func removeElement(nums []int, val int) int {
    slow := 0
    for fast := 0; fast < len(nums); fast++ {
        if nums[fast] != val {
            nums[slow] = nums[fast]
            slow++
        }
    }
    return slow
}
```

```c [C]
int removeElement(int* nums, int numsSize, int val) {
    int slow = 0;
    for (int fast = 0; fast < numsSize; fast++) {
        if (nums[fast] != val) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}
```

```cpp [C++]
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int slow = 0;
        for (int fast = 0; fast < nums.size(); fast++) {
            if (nums[fast] != val) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
};
```

```ts [TypeScript]
function removeElement(nums: number[], val: number): number {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，快指针遍历数组一次。
- **空间复杂度**：`O(1)`，原地修改。

### 2.2 方法二：双指针（首尾交换，减少写操作）

1. **思路**

若被移除元素很少，方法一仍会把大量保留元素前移。优化：用首尾指针，遇到 `val` 时，用末尾元素覆盖它，并把尾指针左移。注意覆盖后 `fast` 不前进（因为新覆盖来的元素尚未检查）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int removeElement(int[] nums, int val) {
        int left = 0, right = nums.length;
        while (left < right) {
            if (nums[left] == val) {
                nums[left] = nums[right - 1];
                right--;
            } else {
                left++;
            }
        }
        return right;
    }
}
```

```python [Python]
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        left, right = 0, len(nums)
        while left < right:
            if nums[left] == val:
                nums[left] = nums[right - 1]
                right -= 1
            else:
                left += 1
        return right
```

```go [Go]
func removeElement(nums []int, val int) int {
    left, right := 0, len(nums)
    for left < right {
        if nums[left] == val {
            nums[left] = nums[right-1]
            right--
        } else {
            left++
        }
    }
    return right
}
```

```c [C]
int removeElement(int* nums, int numsSize, int val) {
    int left = 0, right = numsSize;
    while (left < right) {
        if (nums[left] == val) {
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    return right;
}
```

```cpp [C++]
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int left = 0, right = nums.size();
        while (left < right) {
            if (nums[left] == val) {
                nums[left] = nums[right - 1];
                right--;
            } else {
                left++;
            }
        }
        return right;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let left = 0, right = nums.length;
    while (left < right) {
        if (nums[left] === val) {
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    return right;
};
```

```ts [TypeScript]
function removeElement(nums: number[], val: number): number {
    let left = 0, right = nums.length;
    while (left < right) {
        if (nums[left] === val) {
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    return right;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素最多被访问/赋值一次。
- **空间复杂度**：`O(1)`，原地修改。当 `val` 很少时，写操作少于方法一。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（快慢指针） | `O(n)` | `O(1)` | 空间紧凑，常为常数级 |
| 双指针（首尾交换，减少写操作） | `O(n)` | `O(1)` | 空间紧凑，常为常数级 |

