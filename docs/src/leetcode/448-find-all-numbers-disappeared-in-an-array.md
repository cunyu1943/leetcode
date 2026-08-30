# [448. 找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)

## 一、题目描述

给你一个含 `n` 个整数的数组 `nums`，其中所有数字都在 `[1, n]` 范围内。有些元素出现 2 次，有些出现 1 次。找出 `[1, n]` 中**未出现**的数字，返回列表。

要求：时间 $O(n)$、空间 $O(1)$（不计返回）。

**示例 1：**

```
输入：nums = [4,3,2,7,8,2,3,1]
输出：[5,6]
```

**示例 2：**

```
输入：nums = [1,1]
输出：[2]
```

**提示：**

- `n == nums.length`
- `1 <= n <= 10^5`

## 二、解答方法

### 2.1 方法一：原地取负标记

1. 思路

遍历每个数 `x`，把位置 `|x|-1` 上的数取负作「已出现」标记。第二遍扫描：若 `nums[i] > 0` 说明数字 `i+1` 未出现，加入结果。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int x : nums) {
            int idx = Math.abs(x) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++)
            if (nums[i] > 0) res.add(i + 1);
        return res;
    }
}
```

```python [Python]
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for x in nums:
            idx = abs(x) - 1
            nums[idx] = -abs(nums[idx])
        return [i + 1 for i, v in enumerate(nums) if v > 0]
```

```cpp [C++]
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        for (int x : nums) {
            int idx = abs(x) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        vector<int> res;
        for (int i = 0; i < nums.size(); i++)
            if (nums[i] > 0) res.push_back(i + 1);
        return res;
    }
};
```

```go [Go]
func findDisappearedNumbers(nums []int) []int {
	for _, x := range nums {
		idx := abs(x) - 1
		if nums[idx] > 0 {
			nums[idx] = -nums[idx]
		}
	}
	res := []int{}
	for i, v := range nums {
		if v > 0 {
			res = append(res, i+1)
		}
	}
	return res
}
func abs(x int) int { if x < 0 { return -x }; return x }
```

```javascript [JavaScript]
var findDisappearedNumbers = function (nums) {
    for (const x of nums) {
        const idx = Math.abs(x) - 1;
        if (nums[idx] > 0) nums[idx] = -nums[idx];
    }
    const res = [];
    for (let i = 0; i < nums.length; i++) if (nums[i] > 0) res.push(i + 1);
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

### 2.2 方法二：交换归位（循环排序）

思路：把每个数放到它应在的位置 `nums[x-1]`，最后位置不对的即为缺失。空间同样 $O(1)$。

## 三、总结

与 442 同源，「索引取负」是最简洁的原地标记法。相关题目：41 缺失的第一个正数、442 数组中重复的数据、645 错误的集合。
