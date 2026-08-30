# [298. 二叉树最长连续序列](https://leetcode.cn/problems/binary-tree-longest-consecutive-sequence/) [🔒 会员题]

## 一、题目描述

给定一棵二叉树，请找出 **最长的连续序列路径** 的长度。

连续序列路径是指，路径上的节点值按 `父 → 子` 方向 **严格递增 1**（即 `child.val == parent.val + 1`）。路径 **必须从父节点到子节点向下**（不能转折向上），但可以从任意节点开始、任意节点结束。

返回最长连续序列路径的 **节点个数**。

**示例：**

```
输入：root = [1,3,2,4,5]
解释：路径 3→4→5 是连续递增序列（3,4,5 各相差 1），长度为 3 → 返回 3
```

**提示：** 树节点数 `1 <= n <= 3000`，`-10⁹ <= Node.val <= 10⁹`。

## 二、解答方法

### 方法一：DFS 自顶向下传递长度

**思路：** 递归遍历，向下传递「以当前节点结尾、从某祖先起连续递增的长度 `len`」。

- 若 `node.val == parent.val + 1`，则 `len = parentLen + 1`；
- 否则重新开始，`len = 1`；
- 用全局 `maxLen` 记录遍历过程中遇到的最大 `len`。

:::::: code-group

```java [Java]
class Solution {
    private int maxLen = 0;
    public int longestConsecutive(TreeNode root) {
        if (root == null) return 0;
        dfs(root, null, 0);
        return maxLen;
    }
    private void dfs(TreeNode node, TreeNode parent, int len) {
        if (node == null) return;
        if (parent != null && node.val == parent.val + 1) len++;
        else len = 1;                       // 不连续，重新开始
        maxLen = Math.max(maxLen, len);
        dfs(node.left, node, len);
        dfs(node.right, node, len);
    }
}
```

```python [Python]
class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        self.maxLen = 0
        def dfs(node, parent, length):
            if not node:
                return
            if parent is not None and node.val == parent.val + 1:
                length += 1
            else:
                length = 1
            self.maxLen = max(self.maxLen, length)
            dfs(node.left, node, length)
            dfs(node.right, node, length)
        dfs(root, None, 0)
        return self.maxLen
```

```cpp [C++]
class Solution {
    int maxLen = 0;
public:
    int longestConsecutive(TreeNode* root) {
        if (!root) return 0;
        dfs(root, nullptr, 0);
        return maxLen;
    }
    void dfs(TreeNode* node, TreeNode* parent, int len) {
        if (!node) return;
        if (parent && node->val == parent->val + 1) len++;
        else len = 1;
        maxLen = max(maxLen, len);
        dfs(node->left, node, len);
        dfs(node->right, node, len);
    }
};
```

```go [Go]
func longestConsecutive(root *TreeNode) int {
    maxLen := 0
    var dfs func(*TreeNode, *TreeNode, int)
    dfs = func(node, parent *TreeNode, len int) {
        if node == nil { return }
        if parent != nil && node.Val == parent.Val+1 { len++ } else { len = 1 }
        if len > maxLen { maxLen = len }
        dfs(node.Left, node, len)
        dfs(node.Right, node, len)
    }
    dfs(root, nil, 0)
    return maxLen
}
```

```js [JavaScript]
var longestConsecutive = function (root) {
    let maxLen = 0;
    const dfs = (node, parent, len) => {
        if (!node) return;
        if (parent !== null && node.val === parent.val + 1) len++;
        else len = 1;
        maxLen = Math.max(maxLen, len);
        dfs(node.left, node, len);
        dfs(node.right, node, len);
    };
    dfs(root, null, 0);
    return maxLen;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(h)`（递归栈）。

## 三、总结

本题与 `549 二叉树最长连续序列（可升可降）` 区别：298 只要求 **向下递增 1**，路径不能折返。递归时把「当前连续长度」作为参数向下传，断掉就重置为 1。注意「连续」判定是 `child == parent + 1`（只增），不是「相邻不同」。若要求可上可下，则需同时传「递增长度」和「递减长度」（549 题）。
