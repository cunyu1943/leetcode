# [416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

## 一、题目描述

给你一个**只包含正整数**的非空数组 `nums`，判断是否可将该数组分割成两个子集，使两个子集的元素和相等。

**示例 1：**

```
输入：nums = [1,5,11,5]
输出：true
解释：可分成 [1,5,5] 和 [11]，和均为 11。
```

**示例 2：**

```
输入：nums = [1,2,3,5]
输出：false
```

**提示：**

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

## 二、解答方法

### 2.1 方法一：0-1 背包（动态规划）

1. 思路

总和 `sum` 为奇数必然不可分；否则目标为找一个子集和为 `sum/2`。`dp[j]` 表示能否凑出和 `j`，自底向上：`dp[j] = dp[j] || dp[j - nums[i]]`（逆序遍历避免重复选）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 == 1) return false;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int x : nums) {
            for (int j = target; j >= x; j--)
                dp[j] = dp[j] || dp[j - x];
        }
        return dp[target];
    }
}
```

```python [Python]
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for x in nums:
            for j in range(target, x - 1, -1):
                dp[j] = dp[j] or dp[j - x]
        return dp[target]
```

```cpp [C++]
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum & 1) return false;
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int x : nums)
            for (int j = target; j >= x; j--)
                dp[j] = dp[j] || dp[j - x];
        return dp[target];
    }
};
```

```go [Go]
func canPartition(nums []int) bool {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	if sum%2 == 1 {
		return false
	}
	target := sum / 2
	dp := make([]bool, target+1)
	dp[0] = true
	for _, x := range nums {
		for j := target; j >= x; j-- {
			dp[j] = dp[j] || dp[j-x]
		}
	}
	return dp[target]
}
```

```javascript [JavaScript]
var canPartition = function (nums) {
    let sum = 0;
    for (const x of nums) sum += x;
    if (sum % 2) return false;
    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    for (const x of nums)
        for (let j = target; j >= x; j--)
            dp[j] = dp[j] || dp[j - x];
    return dp[target];
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \cdot \text{target})$。
- 空间复杂度：$O(\text{target})$。

## 三、总结

本质是「0-1 背包能否装满容量 target」。相关题目：494 目标和（背包计数）、1049 最后一块石头的重量 II、322 零钱兑换。
