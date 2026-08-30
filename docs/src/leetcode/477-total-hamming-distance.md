# [477. 总汉明距离](https://leetcode.cn/problems/total-hamming-distance/)

## 一、题目描述

给定整数数组 `nums`，求数组中所有数对之间的**汉明距离之和**。

**示例 1：**

```
输入：nums = [4,14,2]
输出：6
解释：4(0100),14(1110),2(0010)，两两距离 (4,14)=2,(4,2)=2,(14,2)=2，共 6。
```

**示例 2：**

```
输入：nums = [4,14,4]
输出：4
```

**提示：**

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^9`

## 二、解答方法

### 2.1 方法一：按位统计（0/1 配对）

1. 思路

逐位考虑：第 `k` 位上有 `c` 个 1、`n-c` 个 0，则这一位对总距离的贡献为 `c * (n - c)`（每个 1 与每个 0 在该位不同）。把所有位贡献相加。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int totalHammingDistance(int[] nums) {
        int n = nums.length, ans = 0;
        for (int k = 0; k < 32; k++) {
            int cnt1 = 0;
            for (int x : nums) if (((x >> k) & 1) == 1) cnt1++;
            ans += cnt1 * (n - cnt1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        for k in range(32):
            cnt1 = sum((x >> k) & 1 for x in nums)
            ans += cnt1 * (n - cnt1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int totalHammingDistance(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int k = 0; k < 32; k++) {
            int c = 0;
            for (int x : nums) c += (x >> k) & 1;
            ans += c * (n - c);
        }
        return ans;
    }
};
```

```go [Go]
func totalHammingDistance(nums []int) int {
	n := len(nums)
	ans := 0
	for k := 0; k < 32; k++ {
		cnt := 0
		for _, x := range nums {
			if x>>k&1 == 1 {
				cnt++
			}
		}
		ans += cnt * (n - cnt)
	}
	return ans
}
```

```javascript [JavaScript]
var totalHammingDistance = function (nums) {
    const n = nums.length;
    let ans = 0;
    for (let k = 0; k < 32; k++) {
        let c = 0;
        for (const x of nums) if ((x >> k) & 1) c++;
        ans += c * (n - c);
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(32 \cdot n)$。
- 空间复杂度：$O(1)$。

## 三、总结

「按位独立统计、配对计数」是总距离类题的技巧。相关题目：461 汉明距离、477 本身、191 位 1 的个数。
