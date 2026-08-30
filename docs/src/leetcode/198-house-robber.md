# [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)



## 一、题目描述

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组 `nums`，请计算 **不触动警报装置** 的情况下 ，一夜之内能够偷窃到的 **最高金额** 。



**示例 1：**

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号 (2) + 3 号 (9) + 5 号 (1) = 12。
```

**提示：**

-   `1 <= nums.length <= 100`
-   `0 <= nums[i] <= 400`



## 二、解答方法

### 2.1 方法一：动态规划（滚动数组）

1. **思路**

`dp[i]` 表示前 `i` 间房能偷到的最高金额。状态转移：`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`。只依赖前两项，可用两个变量滚动，空间 `O(1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int rob(int[] nums) {
        int prev = 0, curr = 0; // prev = dp[i-2], curr = dp[i-1]
        for (int num : nums) {
            int temp = Math.max(curr, prev + num);
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
        prev = curr = 0
        for num in nums:
            prev, curr = curr, max(curr, prev + num)
        return curr
```

```go [Go]
func rob(nums []int) int {
    prev, curr := 0, 0
    for _, num := range nums {
        prev, curr = curr, max(curr, prev+num)
    }
    return curr
}

func max(a, b int) int { if a > b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int rob(vector<int>& nums) {
        int prev = 0, curr = 0;
        for (int num : nums) {
            int temp = max(curr, prev + num);
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
    let prev = 0, curr = 0;
    for (const num of nums) {
        [prev, curr] = [curr, Math.max(curr, prev + num)];
    }
    return curr;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums: number[]): number {
    let prev = 0, curr = 0;
    for (const num of nums) {
        [prev, curr] = [curr, Math.max(curr, prev + num)];
    }
    return curr;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

本题是 **DP 入门经典**：每个位置都面临「选或不选」的抉择，选则 +`nums[i]` 且跳过前一间，不选则沿用前一个最大值。滚动数组将空间优化到 `O(1)`。后续 213（环形）、337（二叉树）都是本模型的变体。
