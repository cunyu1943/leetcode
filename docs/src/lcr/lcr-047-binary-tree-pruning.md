# [LCR 047. 二叉树剪枝](https://leetcode.cn/problems/pOCWxh/)



## 一、题目描述

给定一个二叉树 **根节点** `root` ，树的每个节点的值要么是 `0`，要么是 `1`。请剪除该二叉树中所有节点的值为 `0` 的子树。

节点 `node` 的子树为 `node` 本身，以及所有 `node` 的后代。



**示例 1：**

```
输入: [1,null,0,0,1]
输出: [1,null,0,null,1]
解释: 只有红色节点满足条件“所有不包含 1 的子树”。
```

**示例 2：**

```
输入: [1,0,1,0,0,0,1]
输出: [1,null,1,null,1]
```

**示例 3：**

```
输入: [1,1,0,1,1,0,1,0]
输出: [1,1,0,1,1,null,1]
```

**提示：**

- 二叉树的节点个数的范围是 `[1, 200]`
- 二叉树节点的值只会是 `0` 或 `1`



## 二、解答方法

### 2.1 方法一：后序遍历递归剪枝

1. **思路**

剪枝的关键是「先看子树再决定是否剪掉父节点」，用后序遍历：

- 递归处理左右子树，得到剪枝后的子树；
- 若当前节点的左子树为空、右子树为空、且自身值为 `0`，则该节点是「全 0 子树」，剪掉返回 `null`；
- 否则返回当前节点。

时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public TreeNode pruneTree(TreeNode root) {
        if (root == null) return null;
        root.left = pruneTree(root.left);
        root.right = pruneTree(root.right);
        if (root.left == null && root.right == null && root.val == 0) return null;
        return root;
    }
}
```

```python [Python]
class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left = self.pruneTree(root.left)
        root.right = self.pruneTree(root.right)
        if not root.left and not root.right and root.val == 0:
            return None
        return root
```

```cpp [C++]
class Solution {
public:
    TreeNode* pruneTree(TreeNode* root) {
        if (!root) return nullptr;
        root->left = pruneTree(root->left);
        root->right = pruneTree(root->right);
        if (!root->left && !root->right && root->val == 0) return nullptr;
        return root;
    }
};
```

```go [Go]
func pruneTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    root.Left = pruneTree(root.Left)
    root.Right = pruneTree(root.Right)
    if root.Left == nil && root.Right == nil && root.Val == 0 {
        return nil
    }
    return root
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function (root) {
    if (!root) return null;
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    if (!root.left && !root.right && root.val === 0) return null;
    return root;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* pruneTree(struct TreeNode* root) {
    if (!root) return NULL;
    root->left = pruneTree(root->left);
    root->right = pruneTree(root->right);
    if (!root->left && !root->right && root->val == 0) {
        free(root);
        return NULL;
    }
    return root;
}
```

```ts [TypeScript]
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function pruneTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    if (!root.left && !root.right && root.val === 0) return null;
    return root;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(h)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 后序递归 | `O(n)` | `O(h)` | 标准解法 |

剪枝必须自底向上（后序遍历）：只有左右子树都被剪掉且自身为 0 时，该节点才应被剪除，从而保证「剪掉的是不包含 1 的整棵子树」。

