# [面试题 04.08. 首个共同祖先](https://leetcode.cn/problems/first-common-ancestor-lcci/)

## 一、题目描述

设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先。不得将额外的节点存储在另外的数据结构中。注意：这不一定是二叉搜索树。

**示例：**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

**提示：**

- 树中节点数在 `[0, 100000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。
- 所有节点的值互不相同。
- `p` 和 `q` 均存在于树中。

---

## 二、解答方法

### 2.1 方法一：递归（分治，后序遍历）

**1. 思路**

从根节点开始递归遍历。对当前节点，分别在左子树和右子树中查找 `p` 和 `q`：

- 若左子树和右子树都找到了（即左右返回值均非空），则当前节点即为最近公共祖先。
- 若只有左子树找到，则返回左子树的结果。
- 若只有右子树找到，则返回右子树的结果。
- 若当前节点本身就是 `p` 或 `q`，则返回当前节点（因为另一个节点在它的子树中，则当前节点就是祖先）。

此方法时间复杂度 `O(n)`，空间复杂度 `O(n)`（递归栈）。

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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
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
 *     Val int
 *     Left *TreeNode
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

```c [C]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    if (!root || root == p || root == q) return root;
    struct TreeNode* left = lowestCommonAncestor(root->left, p, q);
    struct TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
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
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
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
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left ? left : right;
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
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left ? left : right;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：存储父节点 + 路径查找（迭代）

**1. 思路**

使用栈或队列遍历树，用哈希表记录每个节点的父节点。然后从 `p` 开始向上回溯，记录所有祖先节点。再从 `q` 开始向上回溯，遇到的第一个出现在 `p` 祖先集合中的节点即为最近公共祖先。此方法需要两次遍历，时间复杂度 `O(n)`，空间复杂度 `O(n)`。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.*;

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        parent.put(root, null);
        stack.push(root);
        while (!parent.containsKey(p) || !parent.containsKey(q)) {
            TreeNode node = stack.pop();
            if (node.left != null) {
                parent.put(node.left, node);
                stack.push(node.left);
            }
            if (node.right != null) {
                parent.put(node.right, node);
                stack.push(node.right);
            }
        }
        Set<TreeNode> ancestors = new HashSet<>();
        while (p != null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        while (!ancestors.contains(q)) {
            q = parent.get(q);
        }
        return q;
    }
}
```

```python [Python]
from collections import deque

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        parent = {root: None}
        stack = [root]
        while p not in parent or q not in parent:
            node = stack.pop()
            if node.left:
                parent[node.left] = node
                stack.append(node.left)
            if node.right:
                parent[node.right] = node
                stack.append(node.right)
        ancestors = set()
        while p:
            ancestors.add(p)
            p = parent[p]
        while q not in ancestors:
            q = parent[q]
        return q
```

```go [Go]
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    parent := map[*TreeNode]*TreeNode{root: nil}
    stack := []*TreeNode{root}
    for {
        _, ok1 := parent[p]
        _, ok2 := parent[q]
        if ok1 && ok2 {
            break
        }
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if node.Left != nil {
            parent[node.Left] = node
            stack = append(stack, node.Left)
        }
        if node.Right != nil {
            parent[node.Right] = node
            stack = append(stack, node.Right)
        }
    }
    ancestors := map[*TreeNode]bool{}
    for p != nil {
        ancestors[p] = true
        p = parent[p]
    }
    for !ancestors[q] {
        q = parent[q]
    }
    return q
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    // C语言实现较复杂，需要构建哈希表，此处省略，实际可使用uthash
    // 但为了完整性，使用递归方法更为方便，故此处不实现迭代版本。
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        unordered_map<TreeNode*, TreeNode*> parent;
        parent[root] = nullptr;
        stack<TreeNode*> st;
        st.push(root);
        while (!parent.count(p) || !parent.count(q)) {
            TreeNode* node = st.top();
            st.pop();
            if (node->left) {
                parent[node->left] = node;
                st.push(node->left);
            }
            if (node->right) {
                parent[node->right] = node;
                st.push(node->right);
            }
        }
        unordered_set<TreeNode*> ancestors;
        while (p) {
            ancestors.insert(p);
            p = parent[p];
        }
        while (!ancestors.count(q)) {
            q = parent[q];
        }
        return q;
    }
};
```

```javascript [JavaScript]
var lowestCommonAncestor = function(root, p, q) {
    const parent = new Map();
    parent.set(root, null);
    const stack = [root];
    while (!parent.has(p) || !parent.has(q)) {
        const node = stack.pop();
        if (node.left) {
            parent.set(node.left, node);
            stack.push(node.left);
        }
        if (node.right) {
            parent.set(node.right, node);
            stack.push(node.right);
        }
    }
    const ancestors = new Set();
    while (p) {
        ancestors.add(p);
        p = parent.get(p);
    }
    while (!ancestors.has(q)) {
        q = parent.get(q);
    }
    return q;
};
```

```typescript [TypeScript]
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root) return null;
    const parent = new Map<TreeNode, TreeNode | null>();
    parent.set(root, null);
    const stack: TreeNode[] = [root];
    while (!parent.has(p!) || !parent.has(q!)) {
        const node = stack.pop()!;
        if (node.left) {
            parent.set(node.left, node);
            stack.push(node.left);
        }
        if (node.right) {
            parent.set(node.right, node);
            stack.push(node.right);
        }
    }
    const ancestors = new Set<TreeNode>();
    let cur: TreeNode | null = p;
    while (cur) {
        ancestors.add(cur);
        cur = parent.get(cur) || null;
    }
    let curQ: TreeNode | null = q;
    while (!ancestors.has(curQ!)) {
        curQ = parent.get(curQ!) || null;
    }
    return curQ;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，需要遍历树直到找到 p 和 q 的父节点。
- **空间复杂度**：`O(n)`，存储父节点和祖先集合。

---

## 三、总结

| 方法                  | 时间复杂度 | 空间复杂度 | 特点                 |
| --------------------- | ---------- | ---------- | -------------------- |
| 递归（分治）          | `O(n)`     | `O(n)`     | **推荐**，简洁高效   |
| 存储父节点 + 路径查找 | `O(n)`     | `O(n)`     | 迭代方式，避免递归栈 |

**推荐**：面试中优先使用 **递归方法（方法一）**，代码简洁，且不依赖额外数据结构。若树深度极大可能栈溢出，可使用方法二（迭代）。两种方法均能正确求出最近公共祖先。
