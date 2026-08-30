# [250. 统计同值子树](https://leetcode.cn/problems/count-univalue-subtrees/)



## 一、题目描述

给定一个二叉树，统计该二叉树中 **同值子树** 的个数。

同值子树是指该子树的所有节点都拥有相同的值。

**示例：**

```
输入：root = [5,1,5,5,5,null,5]

              5
             / \
            1   5
           / \   \
          5   5   5

输出：4
解释：共有 4 个同值子树：三个叶子节点（值为 5、5、5）和 [5,5,5] 这棵子树。
```

**提示：**

-   二叉树的节点个数的范围是 `[0, 1000]`
-   `-1000 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：后序遍历（DFS）

1. **思路**

自底向上判断：对每个节点，先递归处理左右子树，得到「左右子树是否都是同值子树」。当前子树是同值子树当且仅当：

- 左子树是同值子树（或为空）；
- 右子树是同值子树（或为空）；
- 左孩子的值等于当前值（或左子树为空）；
- 右孩子的值等于当前值（或右子树为空）。

**后序遍历** 天然满足「先子后父」的依赖顺序。用一个计数器记录满足条件的节点数。

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
 *         this.val = val; this.left = left; this.right = right;
 *     }
 * }
 */
class Solution {
    private int count = 0;

    public int countUnivalSubtrees(TreeNode root) {
        dfs(root);
        return count;
    }

    // 返回以 node 为根的子树是否为同值子树
    private boolean dfs(TreeNode node) {
        if (node == null) return true;          // 空树视为同值（不影响判断）

        boolean left = dfs(node.left);
        boolean right = dfs(node.right);

        // 当前子树为同值子树的条件
        if (left && right
                && (node.left == null || node.left.val == node.val)
                && (node.right == null || node.right.val == node.val)) {
            count++;
            return true;
        }
        return false;
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
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        self.count = 0

        def dfs(node):
            if not node:
                return True
            left = dfs(node.left)
            right = dfs(node.right)
            if left and right \
                    and (not node.left or node.left.val == node.val) \
                    and (not node.right or node.right.val == node.val):
                self.count += 1
                return True
            return False

        dfs(root)
        return self.count
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
func countUnivalSubtrees(root *TreeNode) int {
    count := 0
    var dfs func(node *TreeNode) bool
    dfs = func(node *TreeNode) bool {
        if node == nil {
            return true
        }
        left := dfs(node.Left)
        right := dfs(node.Right)
        if left && right &&
            (node.Left == nil || node.Left.Val == node.Val) &&
            (node.Right == nil || node.Right.Val == node.Val) {
            count++
            return true
        }
        return false
    }
    dfs(root)
    return count
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
    int count = 0;

    int countUnivalSubtrees(TreeNode* root) {
        dfs(root);
        return count;
    }
private:
    bool dfs(TreeNode* node) {
        if (!node) return true;
        bool left = dfs(node->left);
        bool right = dfs(node->right);
        if (left && right
            && (!node->left || node->left->val == node->val)
            && (!node->right || node->right->val == node->val)) {
            count++;
            return true;
        }
        return false;
    }
};
```

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countUnivalSubtrees = function (root) {
    let count = 0;
    const dfs = (node) => {
        if (!node) return true;
        const left = dfs(node.left);
        const right = dfs(node.right);
        if (left && right
            && (!node.left || node.left.val === node.val)
            && (!node.right || node.right.val === node.val)) {
            count++;
            return true;
        }
        return false;
    };
    dfs(root);
    return count;
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
 * @return {number}
 */
function countUnivalSubtrees(root: TreeNode | null): number {
    let count = 0;
    const dfs = (node: TreeNode | null): boolean => {
        if (!node) return true;
        const left = dfs(node.left);
        const right = dfs(node.right);
        if (left && right
            && (!node.left || node.left.val === node.val)
            && (!node.right || node.right.val === node.val)) {
            count++;
            return true;
        }
        return false;
    };
    dfs(root);
    return count;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（每个节点访问一次）。
- **空间复杂度**：`O(h)`，h 为树高（递归栈）。

## 三、总结

本题是 **树形 DP / 后序遍历** 的经典题：父节点的结论依赖子节点的结论，必须自底向上。

递归函数返回「该子树是否为同值子树」，父节点据此加上「子节点值是否等于自身值」来判断。

两个易错点：
1. **空节点返回 `true`**（而非 `false`）—— 空子树不应阻止父节点成为同值子树；
2. 判断子节点值相等前，必须先判断子节点存在（`node.left == null || node.left.val == node.val`），否则空指针。

对比 `687. 最长同值路径`（LintCode 同类），思路一致，只是统计目标从「子树个数」变为「路径长度」。
