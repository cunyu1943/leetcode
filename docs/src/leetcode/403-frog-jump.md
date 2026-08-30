# [403. 青蛙过河](https://leetcode.cn/problems/frog-jump/)

## 一、题目描述

一只青蛙想去对岸（终点位置在 `stones` 最后一块石头）。它最开始在第 0 块石头上，第一次必须跳 1 个单位。若青蛙上一次跳了 `k` 个单位，那么下一次它可以选择跳 `k-1`、`k` 或 `k+1` 个单位，且落点必须是一块石头。

给定石头排序后的位置数组 `stones`（升序，且 `stones[0] = 0`），判断青蛙能否成功过河到达最后一块石头。

**示例 1：**

```
输入：stones = [0,1,3,5,6,8,12,17]
输出：true
解释：依次跳 1,2,2,3,4,5,6 个单位即可到达。
```

**示例 2：**

```
输入：stones = [0,1,2,3,4,8,9,11]
输出：false
```

**提示：**

- `2 <= stones.length <= 2000`
- `0 <= stones[i] <= 2^31 - 1`
- `stones[0] == 0`，`stones` 严格升序。

## 二、解答方法

### 2.1 方法一：记忆化 DFS

1. 思路

用 `dfs(pos, k)` 表示「当前在位置 `pos`，且上一步跳了 `k`」能否到达终点。从 `pos` 可跳 `k-1, k, k+1` 三种步长，落点需在 `stones` 中。用哈希表把位置映射到下标，记忆化避免重复。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    Map<Integer, Integer> idx = new HashMap<>();
    Map<String, Boolean> memo = new HashMap<>();
    int[] stones;
    public boolean canCross(int[] stones) {
        this.stones = stones;
        for (int i = 0; i < stones.length; i++) idx.put(stones[i], i);
        return dfs(0, 0);
    }
    private boolean dfs(int pos, int k) {
        if (pos == stones[stones.length - 1]) return true;
        String key = pos + "," + k;
        if (memo.containsKey(key)) return memo.get(key);
        for (int step = k - 1; step <= k + 1; step++) {
            if (step <= 0) continue;
            if (idx.containsKey(pos + step) && dfs(pos + step, step)) {
                memo.put(key, true);
                return true;
            }
        }
        memo.put(key, false);
        return false;
    }
}
```

```python [Python]
class Solution:
    def canCross(self, stones: List[int]) -> bool:
        idx = {s: i for i, s in enumerate(stones)}
        from functools import lru_cache
        @lru_cache(None)
        def dfs(pos, k):
            if pos == stones[-1]:
                return True
            for step in (k - 1, k, k + 1):
                if step > 0 and (pos + step) in idx and dfs(pos + step, step):
                    return True
            return False
        return dfs(0, 0)
```

```cpp [C++]
class Solution {
    unordered_map<int, int> idx;
    unordered_map<string, bool> memo;
    vector<int> stones;
public:
    bool canCross(vector<int>& stones) {
        this->stones = stones;
        for (int i = 0; i < stones.size(); i++) idx[stones[i]] = i;
        return dfs(0, 0);
    }
    bool dfs(int pos, int k) {
        if (pos == stones.back()) return true;
        string key = to_string(pos) + "," + to_string(k);
        if (memo.count(key)) return memo[key];
        for (int step = k - 1; step <= k + 1; step++) {
            if (step <= 0) continue;
            if (idx.count(pos + step) && dfs(pos + step, step)) return memo[key] = true;
        }
        return memo[key] = false;
    }
};
```

```go [Go]
func canCross(stones []int) bool {
	idx := map[int]int{}
	for i, s := range stones {
		idx[s] = i
	}
	memo := map[[2]int]bool{}
	var dfs func(int, int) bool
	dfs = func(pos, k int) bool {
		if pos == stones[len(stones)-1] {
			return true
		}
		if v, ok := memo[[2]int{pos, k}]; ok {
			return v
		}
		memo[[2]int{pos, k}] = false
		for step := k - 1; step <= k+1; step++ {
			if step <= 0 {
				continue
			}
			if _, ok := idx[pos+step]; ok && dfs(pos+step, step) {
				memo[[2]int{pos, k}] = true
				return true
			}
		}
		return false
	}
	return dfs(0, 0)
}
```

```javascript [JavaScript]
var canCross = function (stones) {
    const idx = {};
    stones.forEach((s, i) => (idx[s] = i));
    const memo = {};
    const dfs = (pos, k) => {
        if (pos === stones[stones.length - 1]) return true;
        const key = pos + ',' + k;
        if (key in memo) return memo[key];
        memo[key] = false;
        for (let step = k - 1; step <= k + 1; step++) {
            if (step <= 0) continue;
            if (idx[pos + step] !== undefined && dfs(pos + step, step)) return (memo[key] = true);
        }
        return false;
    };
    return dfs(0, 0);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$，状态数最多 $n \times$（最长步长），记忆化后约 $O(n^2)$。
- 空间复杂度：$O(n^2)$。

## 三、总结

本题是典型的「状态含上一步信息」的搜索 + 记忆化，关键是状态定义为 `(位置, 上一步步长)`。相关题目：55 跳跃游戏、45 跳跃游戏 II、1345 跳跃游戏 IV。
