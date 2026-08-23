# [LCR 102. 目标和](https://leetcode.cn/problems/YaVDxD/)



## 一、题目描述

给定一个正整数数组 `nums` 和一个整数 `target` 。

向数组中的每个整数前添加 `'+'` 或 `'-'` ，然后串联起所有整数，可以构造一个 **表达式**：

- 例如，`nums = [2, 1]` ，可以在 `2` 之前添加 `'+'` ，在 `1` 之前添加 `'-'` ，然后串联起来得到表达式 `"+2-1"`。

返回可以通过上述方法构造的、运算结果等于 `target` 的不同 **表达式** 的数目。



**示例 1：**

```
输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
```

**示例 2：**

```
输入：nums = [1], target = 1
输出：1
```

**提示：**

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`



## 二、解答方法

### 2.1 方法一：动态规划（转化为子集和）

1. **思路**

设所有添加 `'+'` 的数字和为 `P`，总和为 `sum`，则表达式值为 `P - (sum - P) = 2P - sum = target`，故 `P = (target + sum) / 2`。

问题转化为：从 `nums` 中选出若干数使和为 `P` 的方案数（0/1 背包计数）。

- 若 `(target + sum)` 为奇数或为负，直接返回 0；
- `dp[j]` 表示凑出和 `j` 的方案数，`dp[0] = 1`，`dp[j] += dp[j - x]`（从大到小）。

时间 `O(n·P)`，空间 `O(P)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int x : nums) sum += x;
        int diff = sum - target;
        if (diff < 0 || diff % 2 != 0) return 0;
        int P = diff / 2; // 需要添加负号的数字和
        int[] dp = new int[P + 1];
        dp[0] = 1;
        for (int x : nums) {
            for (int j = P; j >= x; j--) {
                dp[j] += dp[j - x];
            }
        }
        return dp[P];
    }
}
```

```python [Python]
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        s = sum(nums)
        diff = s - target
        if diff < 0 or diff % 2 != 0:
            return 0
        P = diff // 2
        dp = [0] * (P + 1)
        dp[0] = 1
        for x in nums:
            for j in range(P, x - 1, -1):
                dp[j] += dp[j - x]
        return dp[P]
```

```cpp [C++]
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        int diff = sum - target;
        if (diff < 0 || diff % 2 != 0) return 0;
        int P = diff / 2;
        vector<int> dp(P + 1, 0);
        dp[0] = 1;
        for (int x : nums)
            for (int j = P; j >= x; j--)
                dp[j] += dp[j - x];
        return dp[P];
    }
};
```

```go [Go]
func findTargetSumWays(nums []int, target int) int {
    sum := 0
    for _, x := range nums {
        sum += x
    }
    diff := sum - target
    if diff < 0 || diff%2 != 0 {
        return 0
    }
    P := diff / 2
    dp := make([]int, P+1)
    dp[0] = 1
    for _, x := range nums {
        for j := P; j >= x; j-- {
            dp[j] += dp[j-x]
        }
    }
    return dp[P]
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    const sum = nums.reduce((a, b) => a + b, 0);
    const diff = sum - target;
    if (diff < 0 || diff % 2 !== 0) return 0;
    const P = diff / 2;
    const dp = new Array(P + 1).fill(0);
    dp[0] = 1;
    for (const x of nums) {
        for (let j = P; j >= x; j--) {
            dp[j] += dp[j - x];
        }
    }
    return dp[P];
};
```

```c [C]
#include <stdlib.h>

int findTargetSumWays(int* nums, int numsSize, int target) {
    int sum = 0;
    for (int i = 0; i < numsSize; i++) sum += nums[i];
    int diff = sum - target;
    if (diff < 0 || diff % 2 != 0) return 0;
    int P = diff / 2;
    int* dp = (int*)calloc(P + 1, sizeof(int));
    dp[0] = 1;
    for (int i = 0; i < numsSize; i++)
        for (int j = P; j >= nums[i]; j--)
            dp[j] += dp[j - nums[i]];
    int res = dp[P];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function findTargetSumWays(nums: number[], target: number): number {
    const sum = nums.reduce((a, b) => a + b, 0);
    const diff = sum - target;
    if (diff < 0 || diff % 2 !== 0) return 0;
    const P = diff / 2;
    const dp: number[] = new Array(P + 1).fill(0);
    dp[0] = 1;
    for (const x of nums) {
        for (let j = P; j >= x; j--) {
            dp[j] += dp[j - x];
        }
    }
    return dp[P];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n·P)`，`P = (sum-target)/2`。
- **空间复杂度**：`O(P)`。

### 2.2 方法二：回溯（数据量小时）

1. **思路**

`nums.length <= 20` 时可直接回溯枚举每个数的 `+`/`-` 两种选择，统计和为 `target` 的方案数。时间 `O(2ⁿ)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int ans = 0;
    public int findTargetSumWays(int[] nums, int target) {
        dfs(nums, 0, 0, target);
        return ans;
    }
    private void dfs(int[] nums, int idx, int cur, int target) {
        if (idx == nums.length) {
            if (cur == target) ans++;
            return;
        }
        dfs(nums, idx + 1, cur + nums[idx], target);
        dfs(nums, idx + 1, cur - nums[idx], target);
    }
}
```

```python [Python]
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        self.ans = 0

        def dfs(idx, cur):
            if idx == len(nums):
                if cur == target:
                    self.ans += 1
                return
            dfs(idx + 1, cur + nums[idx])
            dfs(idx + 1, cur - nums[idx])

        dfs(0, 0)
        return self.ans
```

```cpp [C++]
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int ans = 0;
        dfs(nums, 0, 0, target, ans);
        return ans;
    }
private:
    void dfs(vector<int>& nums, int idx, int cur, int target, int& ans) {
        if (idx == nums.size()) { if (cur == target) ans++; return; }
        dfs(nums, idx + 1, cur + nums[idx], target, ans);
        dfs(nums, idx + 1, cur - nums[idx], target, ans);
    }
};
```

```go [Go]
func findTargetSumWays(nums []int, target int) int {
    ans := 0
    var dfs func(idx, cur int)
    dfs = func(idx, cur int) {
        if idx == len(nums) {
            if cur == target {
                ans++
            }
            return
        }
        dfs(idx+1, cur+nums[idx])
        dfs(idx+1, cur-nums[idx])
    }
    dfs(0, 0)
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    let ans = 0;
    const dfs = (idx, cur) => {
        if (idx === nums.length) {
            if (cur === target) ans++;
            return;
        }
        dfs(idx + 1, cur + nums[idx]);
        dfs(idx + 1, cur - nums[idx]);
    };
    dfs(0, 0);
    return ans;
};
```

```c [C]
#include <stdlib.h>

static int ans;

static void dfs(int* nums, int numsSize, int idx, int cur, int target) {
    if (idx == numsSize) {
        if (cur == target) ans++;
        return;
    }
    dfs(nums, numsSize, idx + 1, cur + nums[idx], target);
    dfs(nums, numsSize, idx + 1, cur - nums[idx], target);
}

int findTargetSumWays(int* nums, int numsSize, int target) {
    ans = 0;
    dfs(nums, numsSize, 0, 0, target);
    return ans;
}
```

```ts [TypeScript]
function findTargetSumWays(nums: number[], target: number): number {
    let ans = 0;
    const dfs = (idx: number, cur: number) => {
        if (idx === nums.length) {
            if (cur === target) ans++;
            return;
        }
        dfs(idx + 1, cur + nums[idx]);
        dfs(idx + 1, cur - nums[idx]);
    };
    dfs(0, 0);
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(2ⁿ)`。
- **空间复杂度**：`O(n)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 背包 DP | `O(n·P)` | `O(P)` | 数据量大时推荐 |
| 回溯 | `O(2ⁿ)` | `O(n)` | n ≤ 20 时简单直接 |

「目标和」可通过 `P = (sum - target) / 2` 转化为经典子集和计数（0/1 背包）；`n` 很小（≤20）时直接回溯枚举 `+`/`-` 也足够。

