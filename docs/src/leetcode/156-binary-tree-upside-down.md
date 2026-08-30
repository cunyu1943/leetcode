# [156. 上下翻转二叉树](https://leetcode.cn/problems/binary-tree-upside-down/) [🔒 会员题]



## 一、题目描述

给定一棵二叉树的根节点 `root` ，该二叉树的所有右节点要么是具有兄弟节点（拥有相同父节点的左节点）的叶节点，要么为空。请将该二叉树 **上下翻转** ，并返回新的根节点。

你可以原地完成翻转，但如果不是原地翻转也能通过。

翻转规则：原左孩子变成新的根，原根变成新根的右孩子，原右孩子变成新根的左孩子（递归应用到整棵树）。



**示例：**

```
输入：root = [1,2,3,4,5]
输出：[4,5,2,null,null,3,1]
解释：原树：        1           翻转后：   4
                    / \                    / \
                   2   3                  5   2
                  / \                        / \
                 4   5                      3   1
```

**提示：**

-   树中节点数目在范围 `[0, 10]` 内（会员题，数据量小）
-   `1 <= Node.val <= 10`
-   树中每层的右节点要么为空，要么是叶子节点且与左节点共享父节点



## 二、解答方法

### 2.1 方法一：递归

1. **思路**

每个节点的左子树整体翻转后，该节点变为其左孩子的右孩子，原右孩子变为左孩子的左孩子。递归返回新的子树根（即原最左节点）。

2. **代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode upsideDownBinaryTree(TreeNode root) {
        if (root == null || root.left == null) return root;
        TreeNode newRoot = upsideDownBinaryTree(root.left);
        root.left.left = root.right;
        root.left.right = root;
        root.left = null;
        root.right = null;
        return newRoot;
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def upsideDownBinaryTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root or not root.left:
            return root
        new_root = self.upsideDownBinaryTree(root.left)
        root.left.left = root.right
        root.left.right = root
        root.left = None
        root.right = None
        return new_root
```

```go [Go]
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func upsideDownBinaryTree(root *TreeNode) *TreeNode {
    if root == nil || root.Left == nil {
        return root
    }
    newRoot := upsideDownBinaryTree(root.Left)
    root.Left.Left = root.Right
    root.Left.Right = root
    root.Left = nil
    root.Right = nil
    return newRoot
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* upsideDownBinaryTree(TreeNode* root) {
        if (!root || !root->left) return root;
        TreeNode* newRoot = upsideDownBinaryTree(root->left);
        root->left->left = root->right;
        root->left->right = root;
        root->left = nullptr;
        root->right = nullptr;
        return newRoot;
    }
};
```

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.left = (left === undefined ? null : left)
 *     this.right = (right === undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var upsideDownBinaryTree = function (root) {
    if (!root || !root.left) return root;
    const newRoot = upsideDownBinaryTree(root.left);
    root.left.left = root.right;
    root.left.right = root;
    root.left = null;
    root.right = null;
    return newRoot;
};
```

```ts [TypeScript]
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.left = (left === undefined ? null : left)
 *         this.right = (right === undefined ? null : right)
 *     }
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function upsideDownBinaryTree(root: TreeNode | null): TreeNode | null {
    if (!root || !root.left) return root;
    const newRoot = upsideDownBinaryTree(root.left);
    root.left.left = root.right;
    root.left.right = root;
    root.left = null;
    root.right = null;
    return newRoot;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈深度。

### 2.2 方法二：迭代

1. **思路**

维护 `curr`、`prev`、`next`、`tmp` 四个指针，自顶向下依次翻转，避免递归栈。

2. **代码实现（Python）**

```python
class Solution:
    def upsideDownBinaryTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        prev = prev_right = None
        curr = root
        while curr:
            nxt = curr.left
            curr.left = prev_right
            prev_right = curr.right
            curr.right = prev
            prev = curr
            curr = nxt
        return prev
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

本题利用「每个节点至多一个左孩子、右孩子为叶子」的特殊结构，递归将每个孩子翻转并调整父子关系即可。迭代版可做到 `O(1)` 空间。
