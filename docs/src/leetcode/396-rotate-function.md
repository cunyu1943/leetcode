# [396. 旋转函数](https://leetcode.cn/problems/rotate-function/)

## 一、题目描述

给定一个长度为 `n` 的整数数组 `nums`。

假设 `arr_k` 是数组 `nums` 顺时针旋转 `k` 个位置后的数组，定义其「旋转函数」`F` 为：

`F(k) = 0 * arr_k[0] + 1 * arr_k[1] + ... + (n - 1) * arr_k[n - 1]`

返回 `F(0), F(1), ..., F(n-1)` 中的最大值。

**示例 1：**

```
输入：nums = [4,3,2,6]
输出：26
解释：F(0) = 0*4 + 1*3 + 2*2 + 3*6 = 25
     F(1) = 0*6 + 1*4 + 2*3 + 3*2 = 17
     F(2) = 0*2 + 1*6 + 2*4 + 3*3 = 23
     F(3) = 0*3 + 1*2 + 2*6 + 3*4 = 26
     最大值为 26。
```

**示例 2：**

```
输入：nums = [100]
输出：0
```

**提示：**

- `n == nums.length`
- `1 <= n <= 10^5`
- `-100 <= nums[i] <= 100`

## 二、解答方法

### 2.1 方法一：递推（滚动计算）

1. 思路

设 `sum` 为数组总和，`F(k)` 与 `F(k-1)` 满足递推关系：

`F(k) = F(k-1) + sum - n * nums[n-k]`

即每右移一位，除末元素外其余各元素权重加 1（贡献 +sum），再减去末元素原来的高权重（`n * 末元素`）。从 `F(0)` 出发递推所有值取最大即可，避免 $O(n^2)$。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int maxRotateFunction(int[] nums) {
        int n = nums.length, sum = 0, f = 0;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
            f += i * nums[i];
        }
        int ans = f;
        for (int k = 1; k < n; k++) {
            f = f + sum - n * nums[n - k];
            ans = Math.max(ans, f);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxRotateFunction(self, nums: List[int]) -> int:
        n = len(nums)
        total = sum(nums)
        f = sum(i * x for i, x in enumerate(nums))
        ans = f
        for k in range(1, n):
            f = f + total - n * nums[n - k]
            ans = max(ans, f)
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxRotateFunction(vector<int>& nums) {
        int n = nums.size();
        long long sum = 0, f = 0;
        for (int i = 0; i < n; i++) { sum += nums[i]; f += (long long)i * nums[i]; }
        long long ans = f;
        for (int k = 1; k < n; k++) {
            f = f + sum - (long long)n * nums[n - k];
            ans = max(ans, f);
        }
        return ans;
    }
};
```

```go [Go]
func maxRotateFunction(nums []int) int {
	n := len(nums)
	sum, f := 0, 0
	for i, x := range nums {
		sum += x
		f += i * x
	}
	ans := f
	for k := 1; k < n; k++ {
		f = f + sum - n*nums[n-k]
		if f > ans {
			ans = f
		}
	}
	return ans
}
```

```javascript [JavaScript]
var maxRotateFunction = function (nums) {
    const n = nums.length;
    let sum = 0, f = 0;
    for (let i = 0; i < n; i++) { sum += nums[i]; f += i * nums[i]; }
    let ans = f;
    for (let k = 1; k < n; k++) {
        f = f + sum - n * nums[n - k];
        ans = Math.max(ans, f);
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

本题的关键在于发现相邻旋转结果的**递推关系**，从而把朴素 $O(n^2)$ 降到 $O(n)$。这类「避免重复计算、用差分/递推从上一状态推导下一状态」的思想也常见于 238、560 等题目。
