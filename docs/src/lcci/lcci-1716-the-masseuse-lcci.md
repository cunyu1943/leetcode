# [面试题 17.16. 按摩师](https://leetcode.cn/problems/the-masseuse-lcci/)

## 一、题目描述

一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。在不能接相邻的预约（相隔至少一天）的前提下，求一天内最多可以接的预约时长（分钟数）。

**示例 1：**

```
输入: [1,2,3,1]
输出: 4
解释: 选择第 1 和 第 3 个预约，总时长 = 1 + 3 = 4。
```

**示例 2：**

```
输入: [2,7,9,3,1]
输出: 12
解释: 选择 1、3、5 个预约，总时长 = 2 + 9 + 1 = 12。
```

---

## 二、解答方法

### 2.1 方法一：动态规划（打家劫舍模型）

**1. 思路**

经典「打家劫舍」。设 `dp[i]` 为前 `i` 个预约的最大时长，转移：`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`。只需两个变量滚动即可，空间 `O(1)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int massage(int[] nums) {
        int dp0 = 0, dp1 = 0;
        for (int x : nums) {
            int t = Math.max(dp1, dp0 + x);
            dp0 = dp1;
            dp1 = t;
        }
        return dp1;
    }
}
```

```python [Python]
class Solution:
    def massage(self, nums: List[int]) -> int:
        dp0 = dp1 = 0
        for x in nums:
            dp0, dp1 = dp1, max(dp1, dp0 + x)
        return dp1
```

```go [Go]
func massage(nums []int) int {
    dp0, dp1 := 0, 0
    for _, x := range nums {
        dp0, dp1 = dp1, max(dp1, dp0+x)
    }
    return dp1
}
func max(a, b int) int { if a > b { return a }; return b }
```

```c [C]
int massage(int* nums, int numsSize) {
    int dp0 = 0, dp1 = 0, t;
    for (int i = 0; i < numsSize; i++) {
        t = dp1 > dp0 + nums[i] ? dp1 : dp0 + nums[i];
        dp0 = dp1; dp1 = t;
    }
    return dp1;
}
```

```cpp [C++]
class Solution {
public:
    int massage(vector<int>& nums) {
        int dp0 = 0, dp1 = 0;
        for (int x : nums) {
            int t = max(dp1, dp0 + x);
            dp0 = dp1; dp1 = t;
        }
        return dp1;
    }
};
```

```javascript [JavaScript]
var massage = function(nums) {
    let dp0 = 0, dp1 = 0;
    for (const x of nums) {
        [dp0, dp1] = [dp1, Math.max(dp1, dp0 + x)];
    }
    return dp1;
};
```

```typescript [TypeScript]
function massage(nums: number[]): number {
    let dp0 = 0, dp1 = 0;
    for (const x of nums) {
        [dp0, dp1] = [dp1, Math.max(dp1, dp0 + x)];
    }
    return dp1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：带状态 DP 数组

**1. 思路**

用长度为 `n` 的 `dp` 数组，`dp[i]` 表示考虑前 `i` 个预约能得到的最长时长，完整记录每一步便于理解。`dp[0]=nums[0]`，`dp[1]=max(nums[0],nums[1])`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int massage(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[nums.length - 1];
    }
}
```

```python [Python]
class Solution:
    def massage(self, nums: List[int]) -> int:
        if not nums: return 0
        if len(nums) == 1: return nums[0]
        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])
        for i in range(2, len(nums)):
            dp[i] = max(dp[i-1], dp[i-2] + nums[i])
        return dp[-1]
```

```cpp [C++]
class Solution {
public:
    int massage(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        vector<int> dp(n);
        dp[0] = nums[0]; dp[1] = max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) dp[i] = max(dp[i-1], dp[i-2] + nums[i]);
        return dp[n-1];
    }
};
```

```javascript [JavaScript]
var massage = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    const dp = new Array(n).fill(0);
    dp[0] = nums[0]; dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < n; i++) dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    return dp[n-1];
};
```

```typescript [TypeScript]
function massage(nums: number[]): number {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    const dp = new Array(n).fill(0);
    dp[0] = nums[0]; dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < n; i++) dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    return dp[n-1];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 滚动变量 DP    | `O(n)`     | `O(1)`     | 最优，推荐                 |
| 数组 DP        | `O(n)`     | `O(n)`     | 直观，便于调试             |

**推荐**：使用滚动变量 DP（打家劫舍模型），空间 `O(1)`。
