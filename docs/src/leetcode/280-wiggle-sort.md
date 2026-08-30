# [280. 摆动排序](https://leetcode.cn/problems/wiggle-sort/) [🔒 会员题]

## 一、题目描述

给你一个整数数组 `nums`，将它重新排列成 `nums[0] < nums[1] > nums[2] < nums[3] ...` 的 **摆动序列** 顺序（即相邻元素大小交替）。

你可以假设所有输入数组 **至少存在一个** 摆动排序的结果（因此只需返回任意一个合法结果，原地修改）。

**示例：**

```
输入：nums = [3,5,2,1,6,4]   输出：[3,5,1,6,2,4]（或任一合法摆动序列）
```

**提示：** `1 <= nums.length <= 5 × 10³`，`0 <= nums[i] <= 10⁴`

## 二、解答方法

### 方法一：贪心一次扫描（O(n)，最优）

**思路：** 遍历数组，按位置奇偶性要求：偶数位（0,2,4...）应 **小于** 后一位，奇数位应 **大于** 后一位。若不满足就交换 `nums[i]` 与 `nums[i+1]`。这样每一步局部修正保证全局成立（不破坏已处理部分）。

性质：对任意连续三个位置，交换相邻逆序对只会让关系趋向正确。

:::::: code-group

```java [Java]
class Solution {
    public void wiggleSort(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            if ((i % 2 == 0 && nums[i] > nums[i + 1]) ||  // 偶数位应 < 下一位
                (i % 2 == 1 && nums[i] < nums[i + 1])) { // 奇数位应 > 下一位
                int tmp = nums[i]; nums[i] = nums[i + 1]; nums[i + 1] = tmp;
            }
        }
    }
}
```

```python [Python]
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        for i in range(len(nums) - 1):
            if (i % 2 == 0 and nums[i] > nums[i + 1]) or \
               (i % 2 == 1 and nums[i] < nums[i + 1]):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]
```

```cpp [C++]
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        for (int i = 0; i + 1 < nums.size(); i++) {
            if ((i % 2 == 0 && nums[i] > nums[i + 1]) ||
                (i % 2 == 1 && nums[i] < nums[i + 1]))
                swap(nums[i], nums[i + 1]);
        }
    }
};
```

```go [Go]
func wiggleSort(nums []int) {
    for i := 0; i+1 < len(nums); i++ {
        if (i%2 == 0 && nums[i] > nums[i+1]) || (i%2 == 1 && nums[i] < nums[i+1]) {
            nums[i], nums[i+1] = nums[i+1], nums[i]
        }
    }
}
```

```js [JavaScript]
var wiggleSort = function (nums) {
    for (let i = 0; i + 1 < nums.length; i++) {
        if ((i % 2 === 0 && nums[i] > nums[i + 1]) ||
            (i % 2 === 1 && nums[i] < nums[i + 1])) {
            [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        }
    }
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

### 方法二：排序后交叉放置（O(n log n)）

**思路：** 先排序，然后两两交换相邻元素（`nums[0]↔nums[1]`, `nums[2]↔nums[3]`...）。排序后相邻元素满足 `a<b`，交换成 `b>a` 即获得摆动。简单但较慢，且对重复元素可能产生相等（不满足严格交替），故推荐方法一。

```python [Python]
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        nums.sort()
        for i in range(1, len(nums) - 1, 2):
            nums[i], nums[i + 1] = nums[i + 1], nums[i]
```

## 三、总结

本题是 `324 摆动排序 II`（要求 `nums[0] < nums[1] > nums[2] < ...` 且针对「中间小两边大」的三路划分）的简化版（只要求奇偶交替，可原地）。

贪心一次扫描的 **正确性证明**：每处理完位置 i，前 i+1 个元素已构成合法摆动段；交换只发生在相邻位置，不影响已固定的更前段。这是 O(n) 原地最优解法。注意条件用 `i % 2` 决定大小方向。
