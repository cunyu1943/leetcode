# [442. 数组中重复的数据](https://leetcode.cn/problems/find-all-duplicates-in-an-array/)

## 一、题目描述

给你一个长度为 `n` 的整数数组 `nums`，其中所有元素都在 `[1, n]` 范围内，且每个元素**最多出现 2 次**。请找出所有**出现 2 次**的元素，返回列表（顺序不限）。

要求：时间 $O(n)$、空间 $O(1)$（不计返回）。

**示例 1：**

```
输入：nums = [4,3,2,7,8,2,3,1]
输出：[2,3]
```

**示例 2：**

```
输入：nums = [1,1,2]
输出：[1]
```

**提示：**

- `n == nums.length`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= n`
- 每个元素最多出现 2 次

## 二、解答方法

### 2.1 方法一：原地标记（取负法）

1. 思路

利用值域恰为 `[1, n]`，把出现过的数对应位置 `nums[x-1]` 取负作标记。遍历到 `x` 时，若 `nums[|x|-1]` 已为负，说明 `x` 第二次出现，即为重复元素。注意读取时取绝对值。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();
        for (int x : nums) {
            int idx = Math.abs(x) - 1;
            if (nums[idx] < 0) res.add(Math.abs(x));
            else nums[idx] = -nums[idx];
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        res = []
        for x in nums:
            idx = abs(x) - 1
            if nums[idx] < 0:
                res.append(abs(x))
            else:
                nums[idx] = -nums[idx]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> res;
        for (int x : nums) {
            int idx = abs(x) - 1;
            if (nums[idx] < 0) res.push_back(abs(x));
            else nums[idx] = -nums[idx];
        }
        return res;
    }
};
```

```go [Go]
func findDuplicates(nums []int) []int {
	res := []int{}
	for _, x := range nums {
		idx := abs(x) - 1
		if nums[idx] < 0 {
			res = append(res, abs(x))
		} else {
			nums[idx] = -nums[idx]
		}
	}
	return res
}
func abs(x int) int { if x < 0 { return -x }; return x }
```

```javascript [JavaScript]
var findDuplicates = function (nums) {
    const res = [];
    for (const x of nums) {
        const idx = Math.abs(x) - 1;
        if (nums[idx] < 0) res.push(Math.abs(x));
        else nums[idx] = -nums[idx];
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

「索引取负标记」是值域受限数组找重数的经典技巧。相关题目：41 缺失的第一个正数、448 找到所有消失的数字、287 寻找重复数。
