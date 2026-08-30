# [213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/)



## 一、题目描述

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈** ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警** 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **在不触动警报装置的情况下** ，今晚能够偷窃到的最高金额。



**示例 1：**

```
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（2），然后偷窃 3 号房屋（2），因为他们是相邻的。
```

**示例 2：**

```
输入：nums = [1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (1) ，然后偷窃 3 号房屋 (3)。偷窃到的最高金额 = 1 + 3 = 4。
```

**示例 3：**

```
输入：nums = [1,2,3]
输出：3
```

**提示：**

-   `1 <= nums.length <= 100`
-   `0 <= nums[i] <= 1000`



## 二、解答方法

### 2.1 方法一：动态规划（拆成两个 198 题）

1. **思路**

环形约束 = 「首」和「尾」不能同时偷。因此把问题拆成两个 **线性** 打家劫舍（198 题）：

- 偷 `nums[0..n-2]`（不偷最后一间）；
- 偷 `nums[1..n-1]`（不偷第一间）。

取两者最大值即为答案。特殊情况：`n == 1` 时直接返回 `nums[0]`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }

    private int robLinear(int[] nums, int start, int end) {
        int prev = 0, curr = 0;
        for (int i = start; i <= end; i++) {
            int temp = Math.max(curr, prev + nums[i]);
            prev = curr;
            curr = temp;
        }
        return curr;
    }
}
```

```python [Python]
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]
        def rob_linear(arr):
            prev = curr = 0
            for num in arr:
                prev, curr = curr, max(curr, prev + num)
            return curr
        return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))
```

```go [Go]
func rob(nums []int) int {
    n := len(nums)
    if n == 1 {
        return nums[0]
    }
    return max(robLinear(nums, 0, n-2), robLinear(nums, 1, n-1))
}

func robLinear(nums []int, start, end int) int {
    prev, curr := 0, 0
    for i := start; i <= end; i++ {
        prev, curr = curr, max(curr, prev+nums[i])
    }
    return curr
}

func max(a, b int) int { if a > b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
private:
    int robLinear(vector<int>& nums, int start, int end) {
        int prev = 0, curr = 0;
        for (int i = start; i <= end; i++) {
            int temp = max(curr, prev + nums[i]);
            prev = curr;
            curr = temp;
        }
        return curr;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    const robLinear = (arr) => {
        let prev = 0, curr = 0;
        for (const num of arr) {
            [prev, curr] = [curr, Math.max(curr, prev + num)];
        }
        return curr;
    };
    return Math.max(robLinear(nums.slice(0, n - 1)), robLinear(nums.slice(1)));
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return nums[0];
    const robLinear = (arr: number[]): number => {
        let prev = 0, curr = 0;
        for (const num of arr) {
            [prev, curr] = [curr, Math.max(curr, prev + num)];
        }
        return curr;
    };
    return Math.max(robLinear(nums.slice(0, n - 1)), robLinear(nums.slice(1)));
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

打家劫舍系列的 **环形变体**：核心是把「环形约束」转化为「两次线性 DP 取最大」——分别排除首、排除尾。

| 题号 | 变体 | 思路 |
| ---- | ---- | ---- |
| 198 | 线性 | 一维滚动 DP |
| 213 | 环形 | 拆 `nums[:-1]` 与 `nums[1:]` 取 max |
| 337 | 二叉树 | 树形 DP，每个节点返回「偷/不偷」两态 |

注意 `n == 1` 的边界：此时 `nums[:-1]` 和 `nums[1:]` 都为空，需直接返回 `nums[0]`。
