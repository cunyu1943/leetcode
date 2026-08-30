# [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)

## 一、题目描述

给定一个二叉搜索树的根节点 `root` 和待删除的键 `key`，删除该键对应的节点并保持 BST 性质，返回新的根节点。

删除规则：

- 叶子节点：直接删除；
- 只有一个孩子：用孩子替代；
- 有两个孩子：用**中序后继**（右子树最小节点）或前驱替代，再递归删除那个后继/前驱节点。

**示例 1：**

```
输入：root = [5,3,6,2,4,null,7], key = 3
输出：[5,4,6,2,null,null,7]
```

**示例 2：**

```
输入：root = [5,3,6,2,4,null,7], key = 0
输出：原树（key 不存在）
```

**提示：**

- 节点数 $\le 10^4$
- `-10^5 <= Node.val <= 10^5`
- 所有值互不相同

## 二、解答方法

### 2.1 方法一：递归删除

1. 思路

在 BST 中找 `key`：若 `key` 小于当前值走左、大于走右；找到后按三种情况处理（最稳妥：用右子树最小节点 `min` 替换，再删 `min`）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val) root.left = deleteNode(root.left, key);
        else if (key > root.val) root.right = deleteNode(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode min = root.right;
            while (min.left != null) min = min.left;
            root.val = min.val;
            root.right = deleteNode(root.right, min.val);
        }
        return root;
    }
}
```

```python [Python]
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return None
        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.left:
                return root.right
            if not root.right:
                return root.left
            mn = root.right
            while mn.left:
                mn = mn.left
            root.val = mn.val
            root.right = self.deleteNode(root.right, mn.val)
        return root
```

```cpp [C++]
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->val) root->left = deleteNode(root->left, key);
        else if (key > root->val) root->right = deleteNode(root->right, key);
        else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;
            TreeNode* mn = root->right;
            while (mn->left) mn = mn->left;
            root->val = mn->val;
            root->right = deleteNode(root->right, mn->val);
        }
        return root;
    }
};
```

```go [Go]
func deleteNode(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return nil
	}
	if key < root.Val {
		root.Left = deleteNode(root.Left, key)
	} else if key > root.Val {
		root.Right = deleteNode(root.Right, key)
	} else {
		if root.Left == nil {
			return root.Right
		}
		if root.Right == nil {
			return root.Left
		}
		mn := root.Right
		for mn.Left != nil {
			mn = mn.Left
		}
		root.Val = mn.Val
		root.Right = deleteNode(root.Right, mn.Val)
	}
	return root
}
```

```javascript [JavaScript]
var deleteNode = function (root, key) {
    if (!root) return null;
    if (key < root.val) root.left = deleteNode(root.left, key);
    else if (key > root.val) root.right = deleteNode(root.right, key);
    else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        let mn = root.right;
        while (mn.left) mn = mn.left;
        root.val = mn.val;
        root.right = deleteNode(root.right, mn.val);
    }
    return root;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(h)$，$h$ 为树高。
- 空间复杂度：$O(h)$，递归栈。

## 三、总结

BST 删除的三类情况（叶子 / 单孩子 / 双孩子用后继替代）是标准操作。相关题目：701 二叉搜索树中的插入操作、108 有序数组转 BST、98 验证 BST。
