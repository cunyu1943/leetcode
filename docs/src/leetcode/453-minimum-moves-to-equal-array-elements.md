# [453. 最小操作次数使数组元素相等](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements/)

## 一、题目描述

给你一个长度为 `n` 的整数数组 `nums`，每次操作**任选 n-1 个元素各加 1**。返回使所有元素相等所需的**最少操作次数**。

**示例 1：**

```
输入：nums = [1,2,3]
输出：3
解释：选 [1,2] 加 1 -> [2,3,3]，再选 [2,3]->[3,4,3]，再选 [3,3]->[4,4,4]，共 3 次。
```

**示例 2：**

```
输入：nums = [1,1,1]
输出：0
```

**提示：**

- `n == nums.length`
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## 二、解答方法

### 2.1 方法一：数学转化

1. 思路

每次给 n-1 个数 +1，等价于「给没被选中那个数 -1」（相对差距）。使全部相等所需的操作数 = 每个数距最小值的增量之和 = `sum(nums) - n * min(nums)`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int minMoves(int[] nums) {
        int min = Integer.MAX_VALUE;
        long sum = 0;
        for (int x : nums) { min = Math.min(min, x); sum += x; }
        return (int) (sum - (long) min * nums.length);
    }
}
```

```python [Python]
class Solution:
    def minMoves(self, nums: List[int]) -> int:
        return sum(nums) - min(nums) * len(nums)
```

```cpp [C++]
class Solution {
public:
    int minMoves(vector<int>& nums) {
        int mn = INT_MAX;
        long long sum = 0;
        for (int x : nums) { mn = min(mn, x); sum += x; }
        return sum - (long long)mn * nums.size();
    }
};
```

```go [Go]
func minMoves(nums []int) int {
	mn := nums[0]
	sum := 0
	for _, x := range nums {
		if x < mn {
			mn = x
		}
		sum += x
	}
	return sum - mn*len(nums)
}
```

```javascript [JavaScript]
var minMoves = function (nums) {
    const min = Math.min(...nums);
    let sum = 0;
    for (const x of nums) sum += x;
    return sum - min * nums.length;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

「给 n-1 个 +1」⇔「给 1 个 -1」的转化是本题关键。相关题目：462 最小操作次数使数组元素相等 II、453、455 分发饼干（贪心基础）。
