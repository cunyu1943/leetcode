# [283. 移动零](https://leetcode.cn/problems/move-zeroes/)

## 一、题目描述

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的 **末尾**，同时 **保持非零元素的相对顺序**。

**注意：** 必须 **原地** 修改输入数组，且 **不能使用额外的数组**（空间复杂度应为 `O(1)`）。

**示例：**

```
输入：nums = [0,1,0,3,12]   输出：[1,3,12,0,0]
```

**提示：** `1 <= nums.length <= 10⁴`，`-2³¹ <= nums[i] <= 2³¹ - 1`

## 二、解答方法

### 方法一：双指针（快排 partition 思想）

**思路：** 维护指针 `slow` 指向下一个非零元素应放的位置。遍历 `fast`，遇到非零元素就把它交换/赋值到 `slow` 并 `slow++`。遍历结束后 `[slow, n)` 区间全部填 0。

等价于「把非零元素依次前移，剩余补零」。

:::::: code-group

```java [Java]
class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                int tmp = nums[slow]; nums[slow] = nums[fast]; nums[fast] = tmp;
                slow++;
            }
        }
    }
}
```

```python [Python]
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        slow = 0
        for fast in range(len(nums)):
            if nums[fast] != 0:
                nums[slow], nums[fast] = nums[fast], nums[slow]
                slow += 1
```

```cpp [C++]
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.size(); fast++) {
            if (nums[fast] != 0) {
                swap(nums[slow++], nums[fast]);
            }
        }
    }
};
```

```go [Go]
func moveZeroes(nums []int) {
    slow := 0
    for fast := 0; fast < len(nums); fast++ {
        if nums[fast] != 0 {
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow++
        }
    }
}
```

```js [JavaScript]
var moveZeroes = function (nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

本质是 **快排的 partition 步骤**（把非零视为「小于 pivot」）。`slow` 之前都是非零，遇到非零就和 `fast` 交换并推进 `slow`。若不想做多余交换（数组已部分有序时），可改为「先赋值非零，再补零」两段式，但交换写法最简洁。这是数组原地操作的入门题，与 `27 移除元素`、`26 删除有序数组重复项` 同属双指针家族。
