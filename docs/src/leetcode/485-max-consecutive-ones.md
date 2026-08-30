# [485. 最大连续 1 的个数](https://leetcode.cn/problems/max-consecutive-ones/)

## 一、题目描述

给定一个二进制数组 `nums`，返回数组中**连续 1 的最大个数**。

**示例 1：**

```
输入：nums = [1,1,0,1,1,1]
输出：3
解释：末尾连续 3 个 1。
```

**示例 2：**

```
输入：nums = [1,0,1,1,0,1]
输出：2
```

**提示：**

- `1 <= nums.length <= 10^5`
- `nums[i]` 为 0 或 1

## 二、解答方法

### 2.1 方法一：一次扫描计数

1. 思路

遍历数组，遇 1 则当前连续 +1 并更新最大值，遇 0 则当前连续清零。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int cur = 0, ans = 0;
        for (int x : nums) {
            if (x == 1) ans = Math.max(ans, ++cur);
            else cur = 0;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        cur = ans = 0
        for x in nums:
            if x == 1:
                cur += 1
                ans = max(ans, cur)
            else:
                cur = 0
        return ans
```

```cpp [C++]
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int cur = 0, ans = 0;
        for (int x : nums) {
            if (x == 1) ans = max(ans, ++cur);
            else cur = 0;
        }
        return ans;
    }
};
```

```go [Go]
func findMaxConsecutiveOnes(nums []int) int {
	cur, ans := 0, 0
	for _, x := range nums {
		if x == 1 {
			cur++
			if cur > ans {
				ans = cur
			}
		} else {
			cur = 0
		}
	}
	return ans
}
```

```javascript [JavaScript]
var findMaxConsecutiveOnes = function (nums) {
    let cur = 0, ans = 0;
    for (const x of nums) {
        if (x === 1) { cur++; ans = Math.max(ans, cur); }
        else cur = 0;
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

滑动窗口/线性扫描的入门题。相关题目：487 最大连续 1 的个数 II、1004 最大连续 1 的个数 III、424 替换后最长重复字符。
