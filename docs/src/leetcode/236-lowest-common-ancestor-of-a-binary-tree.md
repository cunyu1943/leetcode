# [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)



## 一、题目描述

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/最近公共祖先/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

**示例 1：**

```
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3。
```

**示例 2：**

```
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```

**示例 3：**

```
输入：root = [1,2], p = 1, q = 2
输出：1
```

**提示：**

-   树中节点数目在范围 `[2, 10⁵]` 内。
-   `-10⁹ <= Node.val <= 10⁹`
-   所有 `Node.val` 互不相同。
-   `p != q`
-   `p` 和 `q` 均存在于给定的二叉树中。



## 二、解答方法

### 2.1 方法一：递归（后序遍历，推荐）

1. **思路**

对任意节点 `root`，LCA 只有三种情况：

1. `p`、`q` 分别在 `root` 的左右子树中 → `root` 即 LCA；
2. `p`、`q` 都在左子树 → LCA 在左子树；
3. `p`、`q` 都在右子树 → LCA 在右子树。

另外，若 `root` 本身就是 `p` 或 `q`，则 `root` 即 LCA（题目允许节点是自己的祖先）。

递归函数返回「以 `root` 为根的子树中是否包含 `p` 或 `q`」：

```
left  = dfs(root.left)
right = dfs(root.right)
若 root 是 p 或 q → 返回 root
若 left 和 right 都非空 → root 即 LCA
否则返回非空的那一侧
```

2. **代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;   // p、q 分居两侧
        return left != null ? left : right;
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left if left else right
```

```go [Go]
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val   int
 *     Left  *TreeNode
 *     Right *TreeNode
 * }
 */
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q {
        return root
    }
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)
    if left != nil && right != nil {
        return root
    }
    if left != nil {
        return left
    }
    return right
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};
```

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
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
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
/**
 * @param {TreeNode | null} root
 * @param {TreeNode | null} p
 * @param {TreeNode | null} q
 * @return {TreeNode | null}
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（最坏遍历所有节点）。
- **空间复杂度**：`O(h)`，h 为树高（递归栈）。

### 2.2 方法二：父指针哈希 + 路径比较

1. **思路**

先 DFS 遍历整棵树，用哈希表记录每个节点的父节点；然后从 `p` 向上回溯到根，记录 `p` 的所有祖先；再从 `q` 向上回溯，第一个出现在 `p` 祖先集合中的节点即 LCA。

2. **代码实现（Python）**

```python
class Solution:
    def lowestCommonAncestor(self, root, p, q):
        parent = {root: None}

        def dfs(node):
            if node.left:
                parent[node.left] = node
                dfs(node.left)
            if node.right:
                parent[node.right] = node
                dfs(node.right)

        dfs(root)
        ancestors = set()
        while p:
            ancestors.add(p)
            p = parent[p]
        while q not in ancestors:
            q = parent[q]
        return q
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 递归后序 | `O(h)` | 代码最简洁，推荐 |
| 父指针哈希 | `O(n)` | 思路直观，类似「链表相交」 |

递归法是 **树形 DP / 后序遍历** 的经典应用，短短 5 行涵盖全部情况：

```
if (!root || root == p || root == q) return root;     // 基线：命中自身
left = dfs(root.left); right = dfs(root.right);
if (left && right) return root;                        // 分居两侧
return left ? left : right;                            // 单侧传递
```

注意与 235 题（BST 版）的区别：BST 可利用值大小关系 `O(h)` 定位，普通二叉树只能自底向上（后序）收集信息。
