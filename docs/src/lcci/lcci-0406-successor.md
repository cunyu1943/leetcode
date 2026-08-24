# [面试题 04.06. 后继者](https://leetcode.cn/problems/successor-lcci/)

## 一、题目描述

设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。

如果指定节点没有对应的“下一个”节点，则返回 `null`。

**示例 1：**

```
输入: root = [2,1,3], p = 1
输出: 2
```

**示例 2：**

```
输入: root = [5,3,6,2,4,null,null,1], p = 6
输出: null
```

**提示：**

- 树中节点数在 `[0, 10000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。
- 每个节点的值互不相同。

---

## 二、解答方法

### 2.1 方法一：中序遍历 + 查找后继（利用有序性）

**1. 思路**

对二叉搜索树进行中序遍历，得到升序序列。遍历时记录前一个节点，当 `pre == p` 时，当前节点即为后继。此方法时间复杂度 `O(n)`，空间复杂度 `O(n)`（递归栈），但无需额外数组。

**2. 代码实现**

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
    private TreeNode pre = null;
    private TreeNode result = null;

    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        inorder(root, p);
        return result;
    }

    private void inorder(TreeNode node, TreeNode p) {
        if (node == null || result != null) return;
        inorder(node.left, p);
        if (pre == p) {
            result = node;
            return;
        }
        pre = node;
        inorder(node.right, p);
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
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> TreeNode:
        self.pre = None
        self.result = None
        self.inorder(root, p)
        return self.result

    def inorder(self, node, p):
        if not node or self.result:
            return
        self.inorder(node.left, p)
        if self.pre == p:
            self.result = node
            return
        self.pre = node
        self.inorder(node.right, p)
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
func inorderSuccessor(root *TreeNode, p *TreeNode) *TreeNode {
    var pre *TreeNode
    var result *TreeNode
    var inorder func(*TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil || result != nil {
            return
        }
        inorder(node.Left)
        if pre == p {
            result = node
            return
        }
        pre = node
        inorder(node.Right)
    }
    inorder(root)
    return result
}
```

```c [C]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
struct TreeNode* pre = NULL;
struct TreeNode* result = NULL;

void inorder(struct TreeNode* node, struct TreeNode* p) {
    if (!node || result) return;
    inorder(node->left, p);
    if (pre == p) {
        result = node;
        return;
    }
    pre = node;
    inorder(node->right, p);
}

struct TreeNode* inorderSuccessor(struct TreeNode* root, struct TreeNode* p) {
    pre = NULL;
    result = NULL;
    inorder(root, p);
    return result;
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        pre = nullptr;
        result = nullptr;
        inorder(root, p);
        return result;
    }
private:
    TreeNode* pre;
    TreeNode* result;
    void inorder(TreeNode* node, TreeNode* p) {
        if (!node || result) return;
        inorder(node->left, p);
        if (pre == p) {
            result = node;
            return;
        }
        pre = node;
        inorder(node->right, p);
    }
};
```

```javascript [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var inorderSuccessor = function(root, p) {
    let pre = null;
    let result = null;
    function inorder(node) {
        if (!node || result) return;
        inorder(node.left);
        if (pre === p) {
            result = node;
            return;
        }
        pre = node;
        inorder(node.right);
    }
    inorder(root);
    return result;
};
```

```typescript [TypeScript]
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
function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
    let pre: TreeNode | null = null;
    let result: TreeNode | null = null;
    function inorder(node: TreeNode | null): void {
        if (!node || result) return;
        inorder(node.left);
        if (pre === p) {
            result = node;
            return;
        }
        pre = node;
        inorder(node.right);
    }
    inorder(root);
    return result;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，需要遍历所有节点，最坏情况为 O(n)。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：利用二叉搜索树性质（迭代查找）

**1. 思路**

在二叉搜索树中，中序后继（即比 p 大的最小节点）可以通过以下方式找到：

- 如果 `p` 有右子树，则后继为右子树中的最左节点。
- 如果 `p` 没有右子树，则从根节点开始查找，记录所有大于 `p.val` 的祖先节点中最小值，即沿着树向下，若 `p.val < node.val`，则 `node` 是候选后继，并转向左子树；否则转向右子树。

此方法时间复杂度 `O(h)`，`h` 为树高，空间复杂度 `O(1)`（迭代）或 `O(h)`（递归），是更优解法。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        // 情况1：p 有右子树
        if (p.right != null) {
            TreeNode node = p.right;
            while (node.left != null) {
                node = node.left;
            }
            return node;
        }
        // 情况2：p 没有右子树，从根节点查找
        TreeNode successor = null;
        TreeNode cur = root;
        while (cur != null) {
            if (p.val < cur.val) {
                successor = cur;
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return successor;
    }
}
```

```python [Python]
class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> TreeNode:
        # 情况1：p 有右子树
        if p.right:
            node = p.right
            while node.left:
                node = node.left
            return node
        # 情况2：p 没有右子树
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

```go [Go]
func inorderSuccessor(root *TreeNode, p *TreeNode) *TreeNode {
    // 情况1：p 有右子树
    if p.Right != nil {
        node := p.Right
        for node.Left != nil {
            node = node.Left
        }
        return node
    }
    // 情况2：p 没有右子树
    var successor *TreeNode
    cur := root
    for cur != nil {
        if p.Val < cur.Val {
            successor = cur
            cur = cur.Left
        } else {
            cur = cur.Right
        }
    }
    return successor
}
```

```c [C]
struct TreeNode* inorderSuccessor(struct TreeNode* root, struct TreeNode* p) {
    // 情况1：p 有右子树
    if (p->right) {
        struct TreeNode* node = p->right;
        while (node->left) node = node->left;
        return node;
    }
    // 情况2：p 没有右子树
    struct TreeNode* successor = NULL;
    struct TreeNode* cur = root;
    while (cur) {
        if (p->val < cur->val) {
            successor = cur;
            cur = cur->left;
        } else {
            cur = cur->right;
        }
    }
    return successor;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        // 情况1：p 有右子树
        if (p->right) {
            TreeNode* node = p->right;
            while (node->left) node = node->left;
            return node;
        }
        // 情况2：p 没有右子树
        TreeNode* successor = nullptr;
        TreeNode* cur = root;
        while (cur) {
            if (p->val < cur->val) {
                successor = cur;
                cur = cur->left;
            } else {
                cur = cur->right;
            }
        }
        return successor;
    }
};
```

```javascript [JavaScript]
var inorderSuccessor = function(root, p) {
    // 情况1：p 有右子树
    if (p.right) {
        let node = p.right;
        while (node.left) {
            node = node.left;
        }
        return node;
    }
    // 情况2：p 没有右子树
    let successor = null;
    let cur = root;
    while (cur) {
        if (p.val < cur.val) {
            successor = cur;
            cur = cur.left;
        } else {
            cur = cur.right;
        }
    }
    return successor;
};
```

```typescript [TypeScript]
function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
    if (!p) return null;
    // 情况1：p 有右子树
    if (p.right) {
        let node = p.right;
        while (node.left) {
            node = node.left;
        }
        return node;
    }
    // 情况2：p 没有右子树
    let successor: TreeNode | null = null;
    let cur = root;
    while (cur) {
        if (p.val < cur.val) {
            successor = cur;
            cur = cur.left;
        } else {
            cur = cur.right;
        }
    }
    return successor;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(h)`，其中 `h` 为树高，平均 `O(log n)`，最坏 `O(n)`。
- **空间复杂度**：`O(1)`（仅使用常数变量）。

---

## 三、总结

| 方法             | 时间复杂度 | 空间复杂度 | 特点                            |
| ---------------- | ---------- | ---------- | ------------------------------- |
| 中序遍历（通用） | `O(n)`     | `O(n)`     | 适用于所有二叉树，但效率较低    |
| 利用BST性质      | `O(h)`     | `O(1)`     | **推荐**，充分利用BST特性，高效 |

**推荐**：在实际生产环境中，**方法二** 是最佳选择，时间 `O(h)`，空间 `O(1)`，且逻辑清晰。方法一虽然可工作，但效率不如方法二。
