# [LCR 089. 打家劫舍](https://leetcode.cn/problems/Gu0c2T/)



## 一、题目描述

一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组 `nums` ，请计算 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。



**示例 1：**

```
输入：nums = [1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```
输入：nums = [2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

**提示：**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`



## 二、解答方法

### 2.1 方法一：动态规划（滚动数组）

1. **思路**

设 `dp[i]` 为「偷前 `i` 间房屋能得到的最高金额」。对第 `i` 间房屋（0 下标）：

- 偷它：`dp[i-2] + nums[i]`；
- 不偷：`dp[i-1]`。

```
dp[i] = max(dp[i-1], dp[i-2] + nums[i])
```

用两个变量滚动，`dp[i-1]` 与 `dp[i-2]`。时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int cur = Math.max(prev1, prev2 + x);
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
        prev2 = prev1 = 0
        for x in nums:
            prev2, prev1 = prev1, max(prev1, prev2 + x)
        return prev1
```

```cpp [C++]
class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int cur = max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};
```

```go [Go]
func rob(nums []int) int {
    prev2, prev1 := 0, 0
    for _, x := range nums {
        cur := prev1
        if prev2+x > cur {
            cur = prev2 + x
        }
        prev2, prev1 = prev1, cur
    }
    return prev1
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    let prev2 = 0, prev1 = 0;
    for (const x of nums) {
        const cur = Math.max(prev1, prev2 + x);
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
};
```

```c [C]
int rob(int* nums, int numsSize) {
    int prev2 = 0, prev1 = 0;
    for (int i = 0; i < numsSize; i++) {
        int cur = prev1 > prev2 + nums[i] ? prev1 : prev2 + nums[i];
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```

```ts [TypeScript]
function rob(nums: number[]): number {
    let prev2 = 0, prev1 = 0;
    for (const x of nums) {
        const cur = Math.max(prev1, prev2 + x);
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`，滚动变量。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(n)` | `O(1)` | 标准解法 |

核心转移「`偷或不偷`」：`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`。由于只依赖前两个状态，用滚动变量即可常数空间求解。

