# [235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)



## 一、题目描述

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/最近公共祖先/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉搜索树:  `root = [6,2,8,0,4,7,9,null,null,3,5]`

**示例 1：**

```
输入：root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出：6
解释：节点 2 和节点 8 的最近公共祖先是 6。
```

**示例 2：**

```
输入：root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出：2
解释：节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
```

**提示：**

-   所有节点的值都是唯一的。
-   `p`、`q` 为不同节点且均存在于给定的二叉搜索树中。



## 二、解答方法

### 2.1 方法一：利用 BST 性质（迭代，最优）

1. **思路**

BST 的关键性质：**左子树所有节点值 < 根 < 右子树所有节点值**。因此从根开始：

- 若 `p.val` 和 `q.val` **都小于** `root.val` → LCA 在左子树，`root = root.left`；
- 若 **都大于** → LCA 在右子树，`root = root.right`；
- 否则（一个在左一个在右，或其中一个就是 `root`）→ 当前 `root` 即 LCA。

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
        while (root != null) {
            if (root.val > p.val && root.val > q.val) {
                root = root.left;
            } else if (root.val < p.val && root.val < q.val) {
                root = root.right;
            } else {
                return root;      // 分岔点即为 LCA
            }
        }
        return null;
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
        while root:
            if root.val > p.val and root.val > q.val:
                root = root.left
            elif root.val < p.val and root.val < q.val:
                root = root.right
            else:
                return root
        return None
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
    for root != nil {
        if root.Val > p.Val && root.Val > q.Val {
            root = root.Left
        } else if root.Val < p.Val && root.Val < q.Val {
            root = root.Right
        } else {
            return root
        }
    }
    return nil
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
        while (root) {
            if (root->val > p->val && root->val > q->val) {
                root = root->left;
            } else if (root->val < p->val && root->val < q->val) {
                root = root->right;
            } else {
                return root;
            }
        }
        return nullptr;
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
    while (root) {
        if (root.val > p.val && root.val > q.val) {
            root = root.left;
        } else if (root.val < p.val && root.val < q.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
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
    while (root && p && q) {
        if (root.val > p.val && root.val > q.val) {
            root = root.left;
        } else if (root.val < p.val && root.val < q.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(h)`，h 为树高（平衡 BST 为 `O(log n)`，最坏 `O(n)`）。
- **空间复杂度**：`O(1)`（迭代）。

### 2.2 方法二：递归

1. **思路**

同上的判断逻辑，用递归表达。

2. **代码实现（Python）**

```python
class Solution:
    def lowestCommonAncestor(self, root, p, q):
        if root.val > p.val and root.val > q.val:
            return self.lowestCommonAncestor(root.left, p, q)
        if root.val < p.val and root.val < q.val:
            return self.lowestCommonAncestor(root.right, p, q)
        return root
```

3. **复杂度分析**

- **时间复杂度**：`O(h)`。
- **空间复杂度**：`O(h)`（递归栈）。

## 三、总结

| 方法 | 空间 |
| ---- | ---- |
| 迭代 | `O(1)` |
| 递归 | `O(h)` |

BST 的 LCA 比普通二叉树（236 题）简单得多 —— 无需后序遍历，只需利用 **值的大小关系** 一路向下走：找到 `p`、`q` **分道扬镳的那个节点** 即为 LCA。

注意边界：当 `p` 或 `q` 之一等于 `root` 时，另一个必然在其子树中，`root` 自身就是 LCA（由 `else` 分支直接返回）。
