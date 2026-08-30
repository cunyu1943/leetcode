# [429. N 叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/)

## 一、题目描述

给定一个 N 叉树的根节点 `root`，返回其节点值的**层序遍历**（即逐层从左到右）。

**示例 1：**

```
输入：root = [1,null,3,2,4,null,5,6]
输出：[[1],[3,2,4],[5,6]]
```

**示例 2：**

```
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13,14]]
```

**提示：**

- 节点数在 `[0, 10^4]`
- N 叉树高度不超过 1000

## 二、解答方法

### 2.1 方法一：BFS 层序

1. 思路

用队列，每次处理一整层的节点，把该层值收集并把它所有孩子入队。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < sz; i++) {
                Node cur = q.poll();
                level.add(cur.val);
                q.addAll(cur.children);
            }
            res.add(level);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def levelOrder(self, root: 'Node') -> List[List[int]]:
        if not root:
            return []
        res, q = [], deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                cur = q.popleft()
                level.append(cur.val)
                q.extend(cur.children)
            res.append(level)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            while (sz--) {
                Node* cur = q.front(); q.pop();
                level.push_back(cur->val);
                for (auto c : cur->children) q.push(c);
            }
            res.push_back(level);
        }
        return res;
    }
};
```

```go [Go]
func levelOrder(root *Node) [][]int {
	res := [][]int{}
	if root == nil {
		return res
	}
	q := []*Node{root}
	for len(q) > 0 {
		level := []int{}
		nxt := []*Node{}
		for _, cur := range q {
			level = append(level, cur.Val)
			nxt = append(nxt, cur.Children...)
		}
		res = append(res, level)
		q = nxt
	}
	return res
}
```

```javascript [JavaScript]
var levelOrder = function (root) {
    if (!root) return [];
    const res = [];
    let q = [root];
    while (q.length) {
        const level = [];
        const nxt = [];
        for (const cur of q) {
            level.push(cur.val);
            nxt.push(...cur.children);
        }
        res.push(level);
        q = nxt;
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$。

## 三、总结

层序遍历是 BFS 基础。相关题目：102 二叉树的层序遍历、103 锯齿形层序、662 二叉树最大宽度。
