# [面试题 04.05. 合法二叉搜索树](https://leetcode.cn/problems/legal-binary-search-tree-lcci/)

## 一、题目描述

实现一个函数，检查一棵二叉树是否为二叉搜索树。

**示例 1：**

```
输入:
    2
   / \
  1   3
输出: true
```

**示例 2：**

```
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
```

**提示：**

- 节点数量在 `[0, 10000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。

---

## 二、解答方法

### 2.1 方法一：中序遍历（递归）

**1. 思路**

二叉搜索树的中序遍历结果是严格递增的。可以使用递归进行中序遍历，并记录上一个节点的值，在遍历时检查当前节点值是否大于上一个节点值。若不符合则返回 `false`。此方法时间复杂度 `O(n)`，空间复杂度 `O(n)`（递归栈）。

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
    private long prev = Long.MIN_VALUE;
    public boolean isValidBST(TreeNode root) {
        if (root == null) return true;
        if (!isValidBST(root.left)) return false;
        if (root.val <= prev) return false;
        prev = root.val;
        return isValidBST(root.right);
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
    def isValidBST(self, root: TreeNode) -> bool:
        self.prev = float('-inf')
        return self.inorder(root)
    def inorder(self, node):
        if not node:
            return True
        if not self.inorder(node.left):
            return False
        if node.val <= self.prev:
            return False
        self.prev = node.val
        return self.inorder(node.right)
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
func isValidBST(root *TreeNode) bool {
    prev := int64(-1 << 63)
    var inorder func(*TreeNode) bool
    inorder = func(node *TreeNode) bool {
        if node == nil {
            return true
        }
        if !inorder(node.Left) {
            return false
        }
        if int64(node.Val) <= prev {
            return false
        }
        prev = int64(node.Val)
        return inorder(node.Right)
    }
    return inorder(root)
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
bool inorder(struct TreeNode* node, long long* prev) {
    if (!node) return true;
    if (!inorder(node->left, prev)) return false;
    if (node->val <= *prev) return false;
    *prev = node->val;
    return inorder(node->right, prev);
}
bool isValidBST(struct TreeNode* root) {
    long long prev = LLONG_MIN;
    return inorder(root, &prev);
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
    bool isValidBST(TreeNode* root) {
        long long prev = LLONG_MIN;
        return inorder(root, prev);
    }
    bool inorder(TreeNode* node, long long& prev) {
        if (!node) return true;
        if (!inorder(node->left, prev)) return false;
        if (node->val <= prev) return false;
        prev = node->val;
        return inorder(node->right, prev);
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
var isValidBST = function(root) {
    let prev = -Infinity;
    function inorder(node) {
        if (!node) return true;
        if (!inorder(node.left)) return false;
        if (node.val <= prev) return false;
        prev = node.val;
        return inorder(node.right);
    }
    return inorder(root);
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
function isValidBST(root: TreeNode | null): boolean {
    let prev = -Infinity;
    function inorder(node: TreeNode | null): boolean {
        if (!node) return true;
        if (!inorder(node.left)) return false;
        if (node.val <= prev) return false;
        prev = node.val;
        return inorder(node.right);
    }
    return inorder(root);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：中序遍历（迭代）

**1. 思路**

使用显式栈模拟中序遍历，依次弹出节点并检查是否严格递增。此方法同样时间复杂度 `O(n)`，空间复杂度 `O(n)`（栈空间），但避免了递归栈溢出风险。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isValidBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;
        long prev = Long.MIN_VALUE;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }
            cur = stack.pop();
            if (cur.val <= prev) return false;
            prev = cur.val;
            cur = cur.right;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        stack = []
        cur = root
        prev = float('-inf')
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            if cur.val <= prev:
                return False
            prev = cur.val
            cur = cur.right
        return True
```

```go [Go]
func isValidBST(root *TreeNode) bool {
    stack := []*TreeNode{}
    cur := root
    prev := int64(-1 << 63)
    for cur != nil || len(stack) > 0 {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }
        cur = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if int64(cur.Val) <= prev {
            return false
        }
        prev = int64(cur.Val)
        cur = cur.Right
    }
    return true
}
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <limits.h>
bool isValidBST(struct TreeNode* root) {
    struct TreeNode* stack[10000];
    int top = 0;
    struct TreeNode* cur = root;
    long long prev = LLONG_MIN;
    while (cur || top > 0) {
        while (cur) {
            stack[top++] = cur;
            cur = cur->left;
        }
        cur = stack[--top];
        if (cur->val <= prev) return false;
        prev = cur->val;
        cur = cur->right;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        stack<TreeNode*> st;
        TreeNode* cur = root;
        long long prev = LLONG_MIN;
        while (cur || !st.empty()) {
            while (cur) {
                st.push(cur);
                cur = cur->left;
            }
            cur = st.top();
            st.pop();
            if (cur->val <= prev) return false;
            prev = cur->val;
            cur = cur->right;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var isValidBST = function(root) {
    const stack = [];
    let cur = root;
    let prev = -Infinity;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        if (cur.val <= prev) return false;
        prev = cur.val;
        cur = cur.right;
    }
    return true;
};
```

```typescript [TypeScript]
function isValidBST(root: TreeNode | null): boolean {
    const stack: TreeNode[] = [];
    let cur = root;
    let prev = -Infinity;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop()!;
        if (cur.val <= prev) return false;
        prev = cur.val;
        cur = cur.right;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（栈空间）。

---

### 2.3 方法三：递归限定范围（上下界法）

**1. 思路**

递归时，为每个节点传递一个允许的值范围 `(lower, upper)`。根节点的范围是 `(-∞, +∞)`，左子树的节点值必须小于父节点值，右子树必须大于父节点值。若当前节点值不在合法范围内，则返回 `false`。此方法时间复杂度 `O(n)`，空间复杂度 `O(n)`（递归栈）。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isValidBST(TreeNode root) {
        return helper(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean helper(TreeNode node, long lower, long upper) {
        if (node == null) return true;
        if (node.val <= lower || node.val >= upper) return false;
        return helper(node.left, lower, node.val) && helper(node.right, node.val, upper);
    }
}
```

```python [Python]
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        return self.helper(root, float('-inf'), float('inf'))
    def helper(self, node, lower, upper):
        if not node:
            return True
        if node.val <= lower or node.val >= upper:
            return False
        return self.helper(node.left, lower, node.val) and self.helper(node.right, node.val, upper)
```

```go [Go]
func isValidBST(root *TreeNode) bool {
    return helper(root, int64(-1<<63), int64(1<<63-1))
}
func helper(node *TreeNode, lower, upper int64) bool {
    if node == nil {
        return true
    }
    if int64(node.Val) <= lower || int64(node.Val) >= upper {
        return false
    }
    return helper(node.Left, lower, int64(node.Val)) && helper(node.Right, int64(node.Val), upper)
}
```

```c [C]
#include <stdbool.h>
#include <limits.h>
bool helper(struct TreeNode* node, long long lower, long long upper) {
    if (!node) return true;
    if (node->val <= lower || node->val >= upper) return false;
    return helper(node->left, lower, node->val) && helper(node->right, node->val, upper);
}
bool isValidBST(struct TreeNode* root) {
    return helper(root, LLONG_MIN, LLONG_MAX);
}
```

```cpp [C++]
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return helper(root, LLONG_MIN, LLONG_MAX);
    }
    bool helper(TreeNode* node, long long lower, long long upper) {
        if (!node) return true;
        if (node->val <= lower || node->val >= upper) return false;
        return helper(node->left, lower, node->val) && helper(node->right, node->val, upper);
    }
};
```

```javascript [JavaScript]
var isValidBST = function(root) {
    function helper(node, lower, upper) {
        if (!node) return true;
        if (node.val <= lower || node.val >= upper) return false;
        return helper(node.left, lower, node.val) && helper(node.right, node.val, upper);
    }
    return helper(root, -Infinity, Infinity);
};
```

```typescript [TypeScript]
function isValidBST(root: TreeNode | null): boolean {
    function helper(node: TreeNode | null, lower: number, upper: number): boolean {
        if (!node) return true;
        if (node.val <= lower || node.val >= upper) return false;
        return helper(node.left, lower, node.val) && helper(node.right, node.val, upper);
    }
    return helper(root, -Infinity, Infinity);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（递归栈）。

---

## 三、总结

| 方法             | 时间复杂度 | 空间复杂度 | 特点                  |
| ---------------- | ---------- | ---------- | --------------------- |
| 中序遍历（递归） | `O(n)`     | `O(n)`     | 简洁，但递归有栈风险  |
| 中序遍历（迭代） | `O(n)`     | `O(n)`     | 避免递归，安全        |
| 递归限定范围     | `O(n)`     | `O(n)`     | 直接利用BST定义，直观 |

**推荐**：面试中优先使用 **中序遍历（递归）** 或 **递归限定范围**，两者代码简洁。若树深度极大，可选择迭代中序遍历。所有方法均能正确通过测试。
