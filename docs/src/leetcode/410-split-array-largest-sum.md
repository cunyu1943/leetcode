# [410. 分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/)

## 一、题目描述

给定一个非负整数数组 `nums` 和一个整数 `k`，你可以把数组分成 `k` 个**非空连续子数组**。设计一个算法使得这 `k` 个子数组各自元素和中的**最大值**尽可能小，返回这个最小的最大和。

**示例 1：**

```
输入：nums = [7,2,5,10,8], k = 2
输出：18
解释：分成 [7,2,5] 和 [10,8]，和分别为 14、18，最大值为 18（最优）。
```

**示例 2：**

```
输入：nums = [1,2,3,4,5], k = 2
输出：9
```

**提示：**

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= min(nums.length, 15)`

## 二、解答方法

### 2.1 方法一：二分答案（「使子数组和不超过 x 最少需要分几段」）

1. 思路

答案（最大和）的范围是 `[max(nums), sum(nums)]`。对候选值 `x`，贪心地从左到右尽量多装（累加不超过 `x`），计算最少分段数 `cnt`；若 `cnt <= k` 说明 `x` 可行，可尝试更小，否则需要更大。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int splitArray(int[] nums, int k) {
        long l = 0, r = 0;
        for (int x : nums) { l = Math.max(l, x); r += x; }
        while (l < r) {
            long mid = (l + r) / 2;
            if (check(nums, mid) <= k) r = mid;
            else l = mid + 1;
        }
        return (int) l;
    }
    private int check(int[] nums, long limit) {
        int cnt = 1; long sum = 0;
        for (int x : nums) {
            if (sum + x > limit) { cnt++; sum = x; }
            else sum += x;
        }
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        def check(limit: int) -> int:
            cnt, s = 1, 0
            for x in nums:
                if s + x > limit:
                    cnt += 1
                    s = x
                else:
                    s += x
            return cnt
        lo, hi = max(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if check(mid) <= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
```

```cpp [C++]
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        long long l = 0, r = 0;
        for (int x : nums) { l = max(l, (long long)x); r += x; }
        while (l < r) {
            long long mid = (l + r) / 2;
            if (check(nums, mid) <= k) r = mid;
            else l = mid + 1;
        }
        return l;
    }
    int check(vector<int>& nums, long long limit) {
        int cnt = 1; long long sum = 0;
        for (int x : nums) {
            if (sum + x > limit) { cnt++; sum = x; }
            else sum += x;
        }
        return cnt;
    }
};
```

```go [Go]
func splitArray(nums []int, k int) int {
	lo, hi := 0, 0
	for _, x := range nums {
		if x > lo {
			lo = x
		}
		hi += x
	}
	check := func(limit int) int {
		cnt, sum := 1, 0
		for _, x := range nums {
			if sum+x > limit {
				cnt++
				sum = x
			} else {
				sum += x
			}
		}
		return cnt
	}
	for lo < hi {
		mid := (lo + hi) / 2
		if check(mid) <= k {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
```

```javascript [JavaScript]
var splitArray = function (nums, k) {
    let lo = 0, hi = 0;
    for (const x of nums) { lo = Math.max(lo, x); hi += x; }
    const check = (limit) => {
        let cnt = 1, sum = 0;
        for (const x of nums) {
            if (sum + x > limit) { cnt++; sum = x; }
            else sum += x;
        }
        return cnt;
    };
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (check(mid) <= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log(\text{sum}))$，二分范围 + 每次 $O(n)$ 校验。
- 空间复杂度：$O(1)$。

### 2.2 方法二：动态规划

1. 思路

`dp[i][j]` 表示前 `i` 个数分成 `j` 段的最小最大和，枚举最后一段起点。复杂度 $O(n^2 k)$，适合小数组；二分法更通用。

## 三、总结

「最小化最大值」是二分答案的经典应用场景：把判定性问题（能否在 x 内分完）转成单调性二分。相关题目：1011 在 D 天内送达包裹、875 爱吃香蕉的珂珂、LCP 12。
