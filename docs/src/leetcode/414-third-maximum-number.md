# [414. 第三大的数](https://leetcode.cn/problems/third-maximum-number/)

## 一、题目描述

给你一个非空数组 `nums`，返回该数组中**第三大的数**。如果不存在，则返回数组中**最大的数**。

算法时间复杂度必须是 $O(n)$。

**示例 1：**

```
输入：nums = [3,2,1]
输出：1
解释：第三大数为 1。
```

**示例 2：**

```
输入：nums = [1,2]
输出：2
解释：不足三个不同数，返回最大数 2。
```

**示例 3：**

```
输入：nums = [2,2,3,1]
输出：1
解释：去重后三个不同数为 3、2、1，第三大是 1。
```

**提示：**

- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：维护三个最大值

1. 思路

用三个变量 `a > b > c` 维护前三大。遍历时更新，遇到比 `a` 大的整体后移，比 `b` 大的更新 `b`，比 `c` 大的更新 `c`。注意用哨兵 `Long.MIN_VALUE` 表示「尚未出现」，且跳过相等值。返回时若 `c` 仍为哨兵则返回 `a`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int thirdMax(int[] nums) {
        long a = Long.MIN_VALUE, b = Long.MIN_VALUE, c = Long.MIN_VALUE;
        for (int x : nums) {
            if (x == a || x == b || x == c) continue;
            if (x > a) { c = b; b = a; a = x; }
            else if (x > b) { c = b; b = x; }
            else if (x > c) { c = x; }
        }
        return c == Long.MIN_VALUE ? (int) a : (int) c;
    }
}
```

```python [Python]
class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        top = [float('-inf')] * 3
        for x in nums:
            if x in top:
                continue
            if x > top[0]:
                top = [x, top[0], top[1]]
            elif x > top[1]:
                top = [top[0], x, top[1]]
            elif x > top[2]:
                top = [top[0], top[1], x]
        return top[2] if top[2] != float('-inf') else top[0]
```

```cpp [C++]
class Solution {
public:
    int thirdMax(vector<int>& nums) {
        long long a = LLONG_MIN, b = LLONG_MIN, c = LLONG_MIN;
        for (int x : nums) {
            if (x == a || x == b || x == c) continue;
            if (x > a) { c = b; b = a; a = x; }
            else if (x > b) { c = b; b = x; }
            else if (x > c) { c = x; }
        }
        return c == LLONG_MIN ? (int)a : (int)c;
    }
};
```

```go [Go]
func thirdMax(nums []int) int {
	a, b, c := math.MinInt64, math.MinInt64, math.MinInt64
	for _, x := range nums {
		if x == a || x == b || x == c {
			continue
		}
		if x > a {
			c, b, a = b, a, x
		} else if x > b {
			c, b = b, x
		} else if x > c {
			c = x
		}
	}
	if c == math.MinInt64 {
		return int(a)
	}
	return int(c)
}
```

```javascript [JavaScript]
var thirdMax = function (nums) {
    let a = -Infinity, b = -Infinity, c = -Infinity;
    for (const x of nums) {
        if (x === a || x === b || x === c) continue;
        if (x > a) { c = b; b = a; a = x; }
        else if (x > b) { c = b; b = x; }
        else if (x > c) { c = x; }
    }
    return c === -Infinity ? a : c;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

此「维护 K 个极值」技巧可推广到「第 K 大」。也可排序去重后取倒数第三。相关题目：215 数组中的第 K 个最大元素、628 三个数的最大乘积。
