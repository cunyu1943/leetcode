# [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

## 一、题目描述

二叉树中，一条「路径」是一系列沿父→子方向连接的节点。给定整数 `targetSum`，求二叉树中**路径和等于 `targetSum`** 的路径总数（路径不必从根开始也不必到叶子，但方向必须向下）。

**示例 1：**

```
输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3
解释：和为 8 的路径有：5->3, 5->2->1, -3->11。
```

**示例 2：**

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：3
```

**提示：**

- 节点数 $\le 1000$
- `-10^9 <= Node.val, targetSum <= 10^9`

## 二、解答方法

### 2.1 方法一：前缀和 + 哈希（单遍 DFS）

1. 思路

从根到当前节点的路径前缀和记为 `cur`，若存在某祖先前缀和 `prev` 使 `cur - prev == targetSum`，则从该祖先子节点到当前节点的路径和为 `targetSum`。用哈希表记录「前缀和 → 出现次数」，自顶向下 DFS 并回溯（出子树时把当前前缀和计数减 1）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    Map<Long, Integer> prefix = new HashMap<>();
    int target;
    public int pathSum(TreeNode root, int targetSum) {
        target = targetSum;
        prefix.put(0L, 1);
        return dfs(root, 0L);
    }
    int dfs(TreeNode node, long cur) {
        if (node == null) return 0;
        cur += node.val;
        int res = prefix.getOrDefault(cur - target, 0);
        prefix.put(cur, prefix.getOrDefault(cur, 0) + 1);
        res += dfs(node.left, cur);
        res += dfs(node.right, cur);
        prefix.put(cur, prefix.get(cur) - 1);
        return res;
    }
}
```

```python [Python]
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        from collections import defaultdict
        prefix = defaultdict(int)
        prefix[0] = 1
        ans = 0
        def dfs(node, cur):
            nonlocal ans
            if not node:
                return
            cur += node.val
            ans += prefix[cur - targetSum]
            prefix[cur] += 1
            dfs(node.left, cur)
            dfs(node.right, cur)
            prefix[cur] -= 1
        dfs(root, 0)
        return ans
```

```cpp [C++]
class Solution {
    unordered_map<long long, int> prefix;
    int target, ans = 0;
public:
    int pathSum(TreeNode* root, int targetSum) {
        target = targetSum;
        prefix[0] = 1;
        dfs(root, 0);
        return ans;
    }
    void dfs(TreeNode* node, long long cur) {
        if (!node) return;
        cur += node->val;
        ans += prefix[cur - target];
        prefix[cur]++;
        dfs(node->left, cur);
        dfs(node->right, cur);
        prefix[cur]--;
    }
};
```

```go [Go]
func pathSum(root *TreeNode, targetSum int) int {
	prefix := map[int64]int{0: 1}
	var ans int
	var dfs func(*TreeNode, int64)
	dfs = func(node *TreeNode, cur int64) {
		if node == nil {
			return
		}
		cur += int64(node.Val)
		ans += prefix[cur-int64(targetSum)]
		prefix[cur]++
		dfs(node.Left, cur)
		dfs(node.Right, cur)
		prefix[cur]--
	}
	dfs(root, 0)
	return ans
}
```

```javascript [JavaScript]
var pathSum = function (root, targetSum) {
    const prefix = { 0: 1 };
    let ans = 0;
    const dfs = (node, cur) => {
        if (!node) return;
        cur += node.val;
        ans += prefix[cur - targetSum] || 0;
        prefix[cur] = (prefix[cur] || 0) + 1;
        dfs(node.left, cur);
        dfs(node.right, cur);
        prefix[cur]--;
    };
    dfs(root, 0);
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$，前缀和表与递归栈。

### 2.2 方法二：双重 DFS

思路：对每个节点作为起点，向下统计和为 `targetSum` 的路径数。时间 $O(n^2)$，实现更直白。

## 三、总结

前缀和 + 哈希是「任意起点向下的路径和」的标准 $O(n)$ 解法。相关题目：560 和为 K 的子数组、113 路径总和 II、124 二叉树中的最大路径和。
