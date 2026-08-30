# [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)

## 一、题目描述

给你一个整数数组 `nums` ，找到其中 **最长严格递增子序列** 的长度。

**子序列** 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。

**示例：**

```
输入：nums = [10,9,2,5,3,7,101,18]   输出：4
解释：最长递增子序列是 [2,3,7,101]（或 [2,5,7,101] 等），长度为 4
```

**提示：** `1 <= nums.length <= 2500`，`-10⁴ <= nums[i] <= 10⁴`

**进阶：** 你可以设计 `O(n²)` 的算法吗？能否进一步优化到 `O(n log n)`？

## 二、解答方法

### 方法一：动态规划（O(n²)）

**思路：** `dp[i]` = 以 `nums[i]` 结尾的最长递增子序列长度。对 `j < i`，若 `nums[j] < nums[i]`，则 `dp[i] = max(dp[i], dp[j] + 1)`。答案是 `max(dp)`。

:::::: code-group

```java [Java]
class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length, ans = 1;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        dp = [1] * len(nums)
        for i in range(len(nums)):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)
```

```cpp [C++]
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size(), ans = 1;
        vector<int> dp(n, 1);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++)
                if (nums[j] < nums[i]) dp[i] = max(dp[i], dp[j] + 1);
            ans = max(ans, dp[i]);
        }
        return ans;
    }
};
```

```go [Go]
func lengthOfLIS(nums []int) int {
    n := len(nums)
    dp := make([]int, n)
    for i := range dp { dp[i] = 1 }
    ans := 1
    for i := 0; i < n; i++ {
        for j := 0; j < i; j++ {
            if nums[j] < nums[i] && dp[j]+1 > dp[i] { dp[i] = dp[j] + 1 }
        }
        if dp[i] > ans { ans = dp[i] }
    }
    return ans
}
```

```js [JavaScript]
var lengthOfLIS = function (nums) {
    const n = nums.length;
    const dp = new Array(n).fill(1);
    let ans = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        ans = Math.max(ans, dp[i]);
    }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n²)`，空间 `O(n)`。

### 方法二：贪心 + 二分（O(n log n)，进阶）

**思路：** 维护一个数组 `tails`，`tails[k]` 表示「长度为 k+1 的递增子序列的 **最小结尾元素**」。遍历 `nums`：

- 若 `x > tails` 末尾，则追加（能接更长的序列）；
- 否则二分查找 `tails` 中第一个 `>= x` 的位置并替换（让该长度的结尾更小，为后续留更大空间）。

最终 `tails.length` 即 LIS 长度。

:::::: code-group

```java [Java]
class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int lo = 0, hi = tails.size();
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (tails.get(mid) < x) lo = mid + 1;
                else hi = mid;
            }
            if (lo == tails.size()) tails.add(x);
            else tails.set(lo, x);
        }
        return tails.size();
    }
}
```

```python [Python]
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        import bisect
        tails = []
        for x in nums:
            i = bisect.bisect_left(tails, x)   # 第一个 >= x 的位置
            if i == len(tails): tails.append(x)
            else: tails[i] = x
        return len(tails)
```

```cpp [C++]
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return tails.size();
    }
};
```

```go [Go]
func lengthOfLIS(nums []int) int {
    tails := []int{}
    for _, x := range nums {
        lo, hi := 0, len(tails)
        for lo < hi {
            mid := lo + (hi-lo)/2
            if tails[mid] < x { lo = mid + 1 } else { hi = mid }
        }
        if lo == len(tails) { tails = append(tails, x) } else { tails[lo] = x }
    }
    return len(tails)
}
```

```js [JavaScript]
var lengthOfLIS = function (nums) {
    const tails = [];
    for (const x of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        if (lo === tails.length) tails.push(x);
        else tails[lo] = x;
    }
    return tails.length;
};
```

::::::

**复杂度：** 时间 `O(n log n)`，空间 `O(n)`。

## 三、总结

| 方法 | 时间 | 适用 |
| ---- | ---- | ---- |
| DP `O(n²)` | 易理解，可还原具体序列 | 小数据 / 需输出序列 |
| 贪心+二分 `O(n log n)` | 只求长度，最优 | 大数据 |

关键洞察：`tails[k]` 存「长度为 k+1 的 LIS 的最小可能结尾」。替换操作 **不改变 LIS 长度**，但让后续元素更容易接上，从而求出全局最长。注意 `tails` 数组 **本身不一定是真实子序列**（只是长度正确），若需还原序列需额外记录前驱。本题是 LIS 经典题，衍生有 `334 递增的三元组`、`673 最长递增子序列的个数`、`354 俄罗斯套娃信封`。
