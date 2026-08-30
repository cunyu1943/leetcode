# [491. 递增子序列](https://leetcode.cn/problems/increasing-subsequences/)

## 一、题目描述

给你一个整数数组 `nums`，返回所有**递增**（严格大于）子序列，且子序列长度**至少为 2**。子序列可按任意顺序返回，但**不重复**。

**示例 1：**

```
输入：nums = [4,6,7,7]
输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

**示例 2：**

```
输入：nums = [4,4,3,2,1]
输出：[[4,4]]
```

**提示：**

- `1 <= nums.length <= 15`
- `-100 <= nums[i] <= 100`

## 二、解答方法

### 2.1 方法一：回溯 + 同层去重

1. 思路

DFS 构造递增子序列：对每个位置，尝试把「比当前末尾大」的数接在后面。为去重，在**同一递归层**用集合记录已用过的数，避免选相同值产生重复序列。注意不能对原数组排序（会破坏子序列的「子序列」定义），只能同层去重。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> findSubsequences(int[] nums) {
        dfs(nums, 0);
        return res;
    }
    void dfs(int[] nums, int i) {
        if (path.size() >= 2) res.add(new ArrayList<>(path));
        Set<Integer> used = new HashSet<>();
        for (int j = i; j < nums.length; j++) {
            if (!path.isEmpty() && nums[j] < path.get(path.size() - 1)) continue;
            if (used.contains(nums[j])) continue;
            used.add(nums[j]);
            path.add(nums[j]);
            dfs(nums, j + 1);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        res, path = [], []
        def dfs(i):
            if len(path) >= 2:
                res.append(path[:])
            used = set()
            for j in range(i, len(nums)):
                if path and nums[j] < path[-1]:
                    continue
                if nums[j] in used:
                    continue
                used.add(nums[j])
                path.append(nums[j])
                dfs(j + 1)
                path.pop()
        dfs(0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> findSubsequences(vector<int>& nums) {
        dfs(nums, 0);
        return res;
    }
    void dfs(vector<int>& nums, int i) {
        if (path.size() >= 2) res.push_back(path);
        unordered_set<int> used;
        for (int j = i; j < nums.size(); j++) {
            if (!path.empty() && nums[j] < path.back()) continue;
            if (used.count(nums[j])) continue;
            used.insert(nums[j]);
            path.push_back(nums[j]);
            dfs(nums, j + 1);
            path.pop_back();
        }
    }
};
```

```go [Go]
func findSubsequences(nums []int) [][]int {
	res := [][]int{}
	path := []int{}
	var dfs func(int)
	dfs = func(i int) {
		if len(path) >= 2 {
			tmp := make([]int, len(path))
			copy(tmp, path)
			res = append(res, tmp)
		}
		used := map[int]bool{}
		for j := i; j < len(nums); j++ {
			if len(path) > 0 && nums[j] < path[len(path)-1] {
				continue
			}
			if used[nums[j]] {
				continue
			}
			used[nums[j]] = true
			path = append(path, nums[j])
			dfs(j + 1)
			path = path[:len(path)-1]
		}
	}
	dfs(0)
	return res
}
```

```javascript [JavaScript]
var findSubsequences = function (nums) {
    const res = [], path = [];
    const dfs = (i) => {
        if (path.length >= 2) res.push([...path]);
        const used = new Set();
        for (let j = i; j < nums.length; j++) {
            if (path.length && nums[j] < path[path.length - 1]) continue;
            if (used.has(nums[j])) continue;
            used.add(nums[j]);
            path.push(nums[j]);
            dfs(j + 1);
            path.pop();
        }
    };
    dfs(0);
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(2^n)$。
- 空间复杂度：$O(n)$。

## 三、总结

「同层 used 去重」是递增子序列去重的关键（不同于 90 子集 II 的排序去重）。相关题目：90 子集 II、491 本身、78 子集。
