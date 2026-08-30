# [285. 二叉搜索树中的中序后继](https://leetcode.cn/problems/inorder-successor-in-bst/) [🔒 会员题]

## 一、题目描述

给定一棵二叉搜索树（BST）的根节点 `root` 和一个节点 `p`，请你找到该 BST 中 **中序遍历顺序下 `p` 的下一个节点（后继）**。如果 `p` 没有中序后继，则返回 `null`。

**注意：** 该题保证 `p` 是 BST 中的一个真实节点。

**示例：**

```
输入：root = [2,1,3], p = 1   输出：2
解释：1 的中序后继是 2
```

**提示：** 树中节点数 `2 <= n <= 500`，`-10⁵ <= Node.val <= 10⁵`，所有值互不相同。

## 二、解答方法

### 方法一：利用 BST 性质迭代（O(h)）

**思路：** 中序后继 = 中序遍历中 `p` 之后第一个比 `p.val` 大的节点。

从根出发：若 `p.val < root.val`，则候选后继是 `root`（左子树中的后继更小，root 是可能的第一个更大者），继续向左找更小的候选；若 `p.val >= root.val`，则 `root` 及其左子树都 <= p，向右走。最后记录的 `successor` 即答案。

:::::: code-group

```java [Java]
class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;
        while (root != null) {
            if (p.val < root.val) {        // p 在左子树，root 可能是后继
                successor = root;
                root = root.left;
            } else {                        // p >= root，向右
                root = root.right;
            }
        }
        return successor;
    }
}
```

```python [Python]
class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        successor = None
        cur = root
        while cur:
            if p.val < cur.val:
                successor = cur
                cur = cur.left
            else:
                cur = cur.right
        return successor
```

```cpp [C++]
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        TreeNode* succ = nullptr;
        while (root) {
            if (p->val < root->val) { succ = root; root = root->left; }
            else root = root->right;
        }
        return succ;
    }
};
```

```go [Go]
func inorderSuccessor(root *TreeNode, p *TreeNode) *TreeNode {
    var succ *TreeNode
    for root != nil {
        if p.Val < root.Val {
            succ = root
            root = root.Left
        } else {
            root = root.Right
        }
    }
    return succ
}
```

```js [JavaScript]
var inorderSuccessor = function (root, p) {
    let successor = null;
    while (root) {
        if (p.val < root.val) { successor = root; root = root.left; }
        else root = root.right;
    }
    return successor;
};
```

::::::

**复杂度：** 时间 `O(h)`，空间 `O(1)`。

### 方法二：中序遍历（通用 O(n)）

**思路：** 若不知道 BST 或想通用，直接中序遍历，记录上一个访问节点，当上一个节点 == p 时当前节点即后继。

```python [Python]
class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        prev = None
        stack = []
        cur = root
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            if prev == p:
                return cur
            prev = cur
            cur = cur.right
        return None
```

## 三、总结

利用 BST 性质可在 `O(h)` 内找到后继：**当当前节点值 > p.val 时记录为候选并向左（找更近的后继）；否则向右**。这是 `270 最接近的 BST 值`、`Predecessor/Successor` 系列题的同一思路。若求前驱（中序前驱），则镜像：`p.val > root.val` 时记录 root 为候选并向右。
