# [LCR 090. 打家劫舍 II](https://leetcode.cn/problems/PzWKhm/)



## 一、题目描述

一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈**，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组 `nums` ，请计算 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。



**示例 1：**

```
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

**示例 2：**

```
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。偷窃到的最高金额 = 1 + 3 = 4 。
```

**提示：**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`



## 二、解答方法

### 2.1 方法一：环形转化为两个线性

1. **思路**

环形意味着「首尾不能同时偷」。把问题拆成两个线性打家劫舍（LCR 089）：

- 不偷第 0 间：在 `nums[1..n-1]` 上打家劫舍；
- 不偷第 n-1 间：在 `nums[0..n-2]` 上打家劫舍；

答案取两者较大值。`n == 1` 时特判返回 `nums[0]`。

时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
    private int robRange(int[] nums, int l, int r) {
        int prev2 = 0, prev1 = 0;
        for (int i = l; i <= r; i++) {
            int cur = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}
```

```python [Python]
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]

        def rob_range(l, r):
            prev2 = prev1 = 0
            for i in range(l, r + 1):
                prev2, prev1 = prev1, max(prev1, prev2 + nums[i])
            return prev1

        return max(rob_range(0, n - 2), rob_range(1, n - 1))
```

```cpp [C++]
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        return max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
private:
    int robRange(vector<int>& nums, int l, int r) {
        int prev2 = 0, prev1 = 0;
        for (int i = l; i <= r; i++) {
            int cur = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};
```

```go [Go]
func rob(nums []int) int {
    n := len(nums)
    if n == 1 {
        return nums[0]
    }
    robRange := func(l, r int) int {
        prev2, prev1 := 0, 0
        for i := l; i <= r; i++ {
            cur := prev1
            if prev2+nums[i] > cur {
                cur = prev2 + nums[i]
            }
            prev2, prev1 = prev1, cur
        }
        return prev1
    }
    a := robRange(0, n-2)
    b := robRange(1, n-1)
    if a > b {
        return a
    }
    return b
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    const robRange = (l, r) => {
        let prev2 = 0, prev1 = 0;
        for (let i = l; i <= r; i++) {
            const cur = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    };
    return Math.max(robRange(0, n - 2), robRange(1, n - 1));
};
```

```c [C]
int robRange(int* nums, int l, int r) {
    int prev2 = 0, prev1 = 0;
    for (int i = l; i <= r; i++) {
        int cur = prev1 > prev2 + nums[i] ? prev1 : prev2 + nums[i];
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}

int rob(int* nums, int numsSize) {
    if (numsSize == 1) return nums[0];
    int a = robRange(nums, 0, numsSize - 2);
    int b = robRange(nums, 1, numsSize - 1);
    return a > b ? a : b;
}
```

```ts [TypeScript]
function rob(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return nums[0];
    const robRange = (l: number, r: number): number => {
        let prev2 = 0, prev1 = 0;
        for (let i = l; i <= r; i++) {
            const cur = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    };
    return Math.max(robRange(0, n - 2), robRange(1, n - 1));
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 拆环为两个线性 | `O(n)` | `O(1)` | 标准解法 |

环形打家劫舍的通用思路：首尾互斥，分别求解「不含首」和「不含尾」两种线性情形，取最大值，即可覆盖所有合法偷法。

