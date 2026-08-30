# [456. 132 模式](https://leetcode.cn/problems/132-pattern/)

## 一、题目描述

给你一个整数数组 `nums`，判断是否存在 **132 模式**的子序列：

- 下标 `i < j < k`；
- 满足 `nums[i] < nums[k] < nums[j]`。

若存在返回 `true`，否则 `false`。

**示例 1：**

```
输入：nums = [1,2,3,4]
输出：false
```

**示例 2：**

```
输入：nums = [3,1,4,2]
输出：true
解释：i=1(j: nums[1]=1), j=2(4), k=3(2) 满足 3 模式? 实际是 nums[0]=3 不。应是 i=1(1),j=2(4),k=3(2): 1<2<4 满足 132。
```

**示例 3：**

```
输入：nums = [-1,3,2]
输出：true
```

**提示：**

- `n == nums.length`
- `1 <= n <= 2 * 10^5`
- `-10^9 <= nums[i] <= 10^9`

## 二、解答方法

### 2.1 方法一：单调栈（从右向左维护次大值）

1. 思路

从左向右扫描，维护「当前已遇到的最小值 `min_i`（作为候选的 1）」；从右向左用单调递减栈找「比某个数小的次大值」。更常用：从右向左遍历，维护一个变量 `sec` 表示已经扫描过的、可作为「2」（即 j）且比某个 k 大的次大值，栈里存候选的 j。具体：遍历 `k`（从右到左），维护单调递减栈 `st` 存 j 的候选；若 `nums[k] < sec`（sec 是之前弹出的、比栈顶小的次大值），说明存在 `min_i < nums[k] < j` 即 132。

实际经典写法：从右向左，`st` 为单调递减栈；对当前 `i`，把比 `nums[i]` 小的栈顶弹出，弹出的最后一个值作为 `sec`（即候选的 2），再判断是否有 `third(=nums[i]) < sec`。但需配合从左的 min。

最干净的实现：从左向右，`min_i` 取前缀最小；从右向左单调栈，找 `j > k` 且 `nums[j] > nums[k]`，并维护 `sec = 次大`。这里给出「从右向左 + 递减栈 + 记录次大」的可靠版本（详见代码注释）。

2. 代码实现（Python，最经典：从右向左单调栈）

:::::: code-group

```python [Python]
class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        st = []          # 单调递减栈，存候选的 "3"（j 位置值）
        sec = float('-inf')  # 已经弹出的、比栈顶小的次大值（候选的 "2"）
        for x in reversed(nums):
            # x 作为候选的 "1"（最小）
            if x < sec:
                return True
            while st and st[-1] < x:
                # 栈顶比 x 小，弹出，它可能成为 "2"（次大）的一部分
                sec = st.pop()
            st.append(x)
        return False
```

```java [Java]
class Solution {
    public boolean find132pattern(int[] nums) {
        Deque<Integer> st = new ArrayDeque<>();
        int sec = Integer.MIN_VALUE;
        for (int k = nums.length - 1; k >= 0; k--) {
            if (nums[k] < sec) return true;
            while (!st.isEmpty() && st.peek() < nums[k]) sec = st.pop();
            st.push(nums[k]);
        }
        return false;
    }
}
```

```cpp [C++]
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        stack<int> st;
        int sec = INT_MIN;
        for (int k = nums.size() - 1; k >= 0; k--) {
            if (nums[k] < sec) return true;
            while (!st.empty() && st.top() < nums[k]) sec = st.top(), st.pop();
            st.push(nums[k]);
        }
        return false;
    }
};
```

```go [Go]
func find132pattern(nums []int) bool {
	st := []int{}
	sec := math.MinInt32
	for k := len(nums) - 1; k >= 0; k-- {
		if nums[k] < sec {
			return true
		}
		for len(st) > 0 && st[len(st)-1] < nums[k] {
			sec = st[len(st)-1]
			st = st[:len(st)-1]
		}
		st = append(st, nums[k])
	}
	return false
}
```

```javascript [JavaScript]
var find132pattern = function (nums) {
    const st = [];
    let sec = -Infinity;
    for (let k = nums.length - 1; k >= 0; k--) {
        if (nums[k] < sec) return true;
        while (st.length && st[st.length - 1] < nums[k]) sec = st.pop();
        st.push(nums[k]);
    }
    return false;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$。

## 三、总结

单调栈找「132」的精妙在于从右向左维护次大值 `sec`。相关题目：456 本身、739 每日温度（单调栈）、84 柱状图最大矩形。
