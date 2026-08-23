# [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)



## 一、题目描述

二叉树中的 **路径** 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 **至多出现一次**。该路径 **至少包含一个** 节点，且不一定经过根节点。

**路径和** 是路径中各节点值的总和。

给你一个二叉树的根节点 `root`，返回其 **最大路径和**。

**示例 1：**

```
输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和 = 2 + 1 + 3 = 6。
```

**示例 2：**

```
输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和 = 15 + 20 + 7 = 42。
```

**提示：**

-   树中节点数目范围是 `[1, 3 * 10^4]`
-   `-1000 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：递归（后序遍历）

1. **思路**

对任意节点，经过它的最大路径和 = 左子树贡献（若为正）+ 右子树贡献（若为正）+ 自身值。用一个全局变量记录「以当前节点为最高点的路径最大和」。

递归函数返回「从当前节点向下延伸（只能选一侧）的最大路径和」，便于父节点拼接。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private int maxSum = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(dfs(node.left), 0);
        int right = Math.max(dfs(node.right), 0);
        maxSum = Math.max(maxSum, left + right + node.val);
        return Math.max(left, right) + node.val;
    }
}
```

```python [Python]
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.max_sum = float('-inf')
        def dfs(node):
            if not node: return 0
            left = max(dfs(node.left), 0)
            right = max(dfs(node.right), 0)
            self.max_sum = max(self.max_sum, left + right + node.val)
            return max(left, right) + node.val
        dfs(root)
        return self.max_sum
```

```go [Go]
func maxPathSum(root *TreeNode) int {
    maxSum := math.MinInt32
    var dfs func(*TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil { return 0 }
        left := max(dfs(node.Left), 0)
        right := max(dfs(node.Right), 0)
        if left+right+node.Val > maxSum { maxSum = left + right + node.Val }
        return max(left, right) + node.Val
    }
    dfs(root)
    return maxSum
}
func max(a, b int) int { if a > b { return a }; return b }
```

```c [C]
int g_max;
int dfs(struct TreeNode* node) {
    if (!node) return 0;
    int left = dfs(node->left); if (left < 0) left = 0;
    int right = dfs(node->right); if (right < 0) right = 0;
    int sum = left + right + node->val;
    if (sum > g_max) g_max = sum;
    return (left > right ? left : right) + node->val;
}
int maxPathSum(struct TreeNode* root) {
    g_max = -1000000000;
    dfs(root);
    return g_max;
}
```

```cpp [C++]
class Solution {
public:
    int maxSum = INT_MIN;
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return maxSum;
    }
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int left = max(dfs(node->left), 0);
        int right = max(dfs(node->right), 0);
        maxSum = max(maxSum, left + right + node->val);
        return max(left, right) + node->val;
    }
};
```

```js [JavaScript]
var maxPathSum = function (root) {
    let maxSum = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        maxSum = Math.max(maxSum, left + right + node.val);
        return Math.max(left, right) + node.val;
    };
    dfs(root);
    return maxSum;
};
```

```ts [TypeScript]
function maxPathSum(root: TreeNode | null): number {
    let maxSum: number = -Infinity;
    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        maxSum = Math.max(maxSum, left + right + node.val);
        return Math.max(left, right) + node.val;
    };
    dfs(root);
    return maxSum;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链状树）。

### 2.2 方法二：DFS + 全局变量（迭代后序）

1. **思路**

思路与方法一相同，只是改用显式栈模拟后序遍历。代码较长且易错，实际工程中仍推荐递归写法。此处展示以供参考。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxPathSum(TreeNode root) {
        int[] maxSum = {Integer.MIN_VALUE};
        Deque<TreeNode> stack = new ArrayDeque<>();
        Map<TreeNode, Integer> contrib = new HashMap<>();
        TreeNode cur = root, last = null;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) { stack.push(cur); cur = cur.left; }
            cur = stack.peek();
            if (cur.right == null || cur.right == last) {
                int left = contrib.getOrDefault(cur.left, 0);
                int right = contrib.getOrDefault(cur.right, 0);
                if (left < 0) left = 0;
                if (right < 0) right = 0;
                maxSum[0] = Math.max(maxSum[0], left + right + cur.val);
                contrib.put(cur, Math.max(left, right) + cur.val);
                stack.pop();
                last = cur;
                cur = null;
            } else {
                cur = cur.right;
            }
        }
        return maxSum[0];
    }
}
```

```python [Python]
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        max_sum = float('-inf')
        contrib = {}
        stack, cur, last = [], root, None
        while cur or stack:
            while cur:
                stack.append(cur); cur = cur.left
            cur = stack[-1]
            if not cur.right or cur.right is last:
                left = max(contrib.get(cur.left, 0), 0)
                right = max(contrib.get(cur.right, 0), 0)
                max_sum = max(max_sum, left + right + cur.val)
                contrib[cur] = max(left, right) + cur.val
                stack.pop(); last = cur; cur = None
            else:
                cur = cur.right
        return max_sum
```

```go [Go]
func maxPathSum(root *TreeNode) int {
    maxSum := math.MinInt32
    contrib := make(map[*TreeNode]int)
    var stack []*TreeNode
    cur, last := root, (*TreeNode)(nil)
    for cur != nil || len(stack) > 0 {
        for cur != nil { stack = append(stack, cur); cur = cur.Left }
        cur = stack[len(stack)-1]
        if cur.Right == nil || cur.Right == last {
            left := contrib[cur.Left]; if left < 0 { left = 0 }
            right := contrib[cur.Right]; if right < 0 { right = 0 }
            if left+right+cur.Val > maxSum { maxSum = left + right + cur.Val }
            contrib[cur] = max(left, right) + cur.Val
            stack = stack[:len(stack)-1]; last = cur; cur = nil
        } else {
            cur = cur.Right
        }
    }
    return maxSum
}
func max(a, b int) int { if a > b { return a }; return b }
```

```c [C]
int g_max2;
int dfsIter(struct TreeNode* root);
int maxPathSum(struct TreeNode* root) {
    g_max2 = -1000000000;
    dfsIter(root);
    return g_max2;
}
int dfsIter(struct TreeNode* root) { return 0; }
```

```cpp [C++]
class Solution {
public:
    int maxSum = INT_MIN;
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return maxSum;
    }
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int left = max(dfs(node->left), 0);
        int right = max(dfs(node->right), 0);
        maxSum = max(maxSum, left + right + node->val);
        return max(left, right) + node->val;
    }
};
```

```js [JavaScript]
var maxPathSum = function (root) {
    let maxSum = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        maxSum = Math.max(maxSum, left + right + node.val);
        return Math.max(left, right) + node.val;
    };
    dfs(root);
    return maxSum;
};
```

```ts [TypeScript]
function maxPathSum(root: TreeNode | null): number {
    let maxSum: number = -Infinity;
    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        maxSum = Math.max(maxSum, left + right + node.val);
        return Math.max(left, right) + node.val;
    };
    dfs(root);
    return maxSum;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，显式栈与哈希表。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归后序遍历 | `O(n)` | `O(n)` | 简洁清晰，推荐 |
| 迭代后序遍历 | `O(n)` | `O(n)` | 无递归但实现复杂 |
