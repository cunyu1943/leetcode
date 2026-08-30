# [487. 最大连续 1 的个数 II 🔒 会员题](https://leetcode.cn/problems/max-consecutive-ones-ii/)

## 一、题目描述

给定一个二进制数组 `nums`，**最多**可以把其中 1 个 `0` 翻转为 `1`，返回翻转后数组中**连续 1 的最大个数**。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：nums = [1,0,1,1,0]
输出：4
解释：把第 2 个 0 翻成 1，得到 [1,0,1,1,1]，连续 1 最长为 4（从索引 1 到 4：0,1,1,1 含一个 0）。
```

**示例 2：**

```
输入：nums = [1,1,1,0,0,0]
输出：4
```

**提示：**

- `1 <= nums.length <= 10^5`
- `nums[i]` 为 0 或 1

## 二、解答方法

### 2.1 方法一：滑动窗口（允许一个 0）

1. 思路

维护窗口 `[l, r]`，统计窗口内 0 的个数 `zeros`。若 `zeros > 1` 则左移 `l` 直到 `zeros <= 1`。窗口最大长度即答案。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        l = zeros = ans = 0
        for r, x in enumerate(nums):
            if x == 0:
                zeros += 1
            while zeros > 1:
                if nums[l] == 0:
                    zeros -= 1
                l += 1
            ans = max(ans, r - l + 1)
        return ans
```

```java [Java]
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int l = 0, zeros = 0, ans = 0;
        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == 0) zeros++;
            while (zeros > 1) {
                if (nums[l] == 0) zeros--;
                l++;
            }
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

会员题。滑动窗口 +「允许至多 K 个 0」的推广即 1004 最大连续 1 的个数 III（K 个翻转）。相关题目：485、1004、424 替换后最长重复字符。
