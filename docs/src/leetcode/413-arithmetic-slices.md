# [413. 等差数列划分](https://leetcode.cn/problems/arithmetic-slices/)

## 一、题目描述

如果一个数列**至少有三个元素**且任意相邻两元素之差相同，则称为等差数列。

给定一个整数数组 `nums`，返回数组中是**等差子数组**的个数。子数组是连续子序列。

**示例 1：**

```
输入：nums = [1,2,3,4]
输出：3
解释：等差子数组为 [1,2,3]、[2,3,4]、[1,2,3,4]，共 3 个。
```

**示例 2：**

```
输入：nums = [1]
输出：0
```

**提示：**

- `1 <= nums.length <= 5000`
- `-1000 <= nums[i] <= 1000`

## 二、解答方法

### 2.1 方法一：连续等差段计数（数学）

1. 思路

从左到右记录当前等差段的连续长度 `len`（>=2 时）。当等差段长度为 `L`（`L>=2`）时，以第 `L` 个元素结尾、长度 $\ge 3$ 的等差子数组有 `L-2` 个。累加即可。公式：长度为 `n` 的等差段贡献 $\frac{(n-2)(n-1)}{2}$ 个。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int n = nums.length, ans = 0, len = 2;
        for (int i = 2; i < n; i++) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) {
                len++;
                ans += len - 2;
            } else len = 2;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        n, ans, length = len(nums), 0, 2
        for i in range(2, n):
            if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
                length += 1
                ans += length - 2
            else:
                length = 2
        return ans
```

```cpp [C++]
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int n = nums.size(), ans = 0, len = 2;
        for (int i = 2; i < n; i++) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) {
                len++; ans += len - 2;
            } else len = 2;
        }
        return ans;
    }
};
```

```go [Go]
func numberOfArithmeticSlices(nums []int) int {
	n, ans, length := len(nums), 0, 2
	for i := 2; i < n; i++ {
		if nums[i]-nums[i-1] == nums[i-1]-nums[i-2] {
			length++
			ans += length - 2
		} else {
			length = 2
		}
	}
	return ans
}
```

```javascript [JavaScript]
var numberOfArithmeticSlices = function (nums) {
    const n = nums.length;
    let ans = 0, len = 2;
    for (let i = 2; i < n; i++) {
        if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
            len++; ans += len - 2;
        } else len = 2;
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

### 2.2 方法二：动态规划

1. 思路

`dp[i]` 表示以 `nums[i]` 结尾的等差子数组个数，则 `dp[i] = dp[i-1] + 1`（当前等差成立时），累加 `dp`。

## 三、总结

关键是「长度为 L 的等差段贡献 L-2 个新子数组」的递推关系。相关题目：446 等差数列划分 II - 子序列（改求子序列，需哈希 + DP）。
