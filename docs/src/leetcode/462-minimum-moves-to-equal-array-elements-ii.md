# [462. 最小操作次数使数组元素相等 II](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements-ii/)

## 一、题目描述

每次操作可把数组中**任意一个元素**加 1 或减 1。求使所有元素相等所需的最小操作次数。

**示例 1：**

```
输入：nums = [1,2,3]
输出：2
解释：全部变为 2，需 1+0+1 = 2 次。
```

**示例 2：**

```
输入：nums = [1,10]
输出：9
```

**提示：**

- `n == nums.length`
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## 二、解答方法

### 2.1 方法一：中位数最优

1. 思路

绝对值偏差和最小化在取**中位数**时达到（经典结论）。排序后取中位数 `m`，累加 `|nums[i] - m|` 即为最小操作数。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int minMoves2(int[] nums) {
        Arrays.sort(nums);
        int m = nums[nums.length / 2], ans = 0;
        for (int x : nums) ans += Math.abs(x - m);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        nums.sort()
        m = nums[len(nums) // 2]
        return sum(abs(x - m) for x in nums)
```

```cpp [C++]
class Solution {
public:
    int minMoves2(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int m = nums[nums.size() / 2], ans = 0;
        for (int x : nums) ans += abs(x - m);
        return ans;
    }
};
```

```go [Go]
func minMoves2(nums []int) int {
	sort.Ints(nums)
	m := nums[len(nums)/2]
	ans := 0
	for _, x := range nums {
		if x > m {
			ans += x - m
		} else {
			ans += m - x
		}
	}
	return ans
}
```

```javascript [JavaScript]
var minMoves2 = function (nums) {
    nums.sort((a, b) => a - b);
    const m = nums[Math.floor(nums.length / 2)];
    let ans = 0;
    for (const x of nums) ans += Math.abs(x - m);
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n)$，排序。
- 空间复杂度：$O(1)$。

## 三、总结

「绝对差之和最小在取中位数时成立」是核心数学结论。相关题目：453 最小操作次数 I、295 数据流的中位数、658 找到 K 个最接近的元素。
