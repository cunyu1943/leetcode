# [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

## 一、题目描述

给你二叉树的根节点 `root`，请你将它展开为一个单链表：

- 展开后的单链表应该同样使用 `TreeNode`，其中 `right` 子指针指向链表中下一个节点，而 `left` 子指针始终为 `null`。
- 展开后的单链表应该与二叉树 **先序遍历** 顺序相同。

**示例 1：**

```
输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [0]
输出：[0]
```

**提示：**

- 树中节点数在范围 `[0, 2000]` 内
- `-100 <= Node.val <= 100`

## 二、解答方法

### 2.1 方法一：递归 + 前序遍历

1. **思路**

先对二叉树进行前序遍历，将遍历结果存入列表，然后遍历列表重新构建链表：将每个节点的左指针置为空，右指针指向下一个节点。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void flatten(TreeNode root) {
        if (root == null) return;
        List<TreeNode> list = new ArrayList<>();
        preorder(root, list);
        for (int i = 0; i < list.size() - 1; i++) {
            list.get(i).left = null;
            list.get(i).right = list.get(i + 1);
        }
    }
    private void preorder(TreeNode node, List<TreeNode> list) {
        if (node == null) return;
        list.add(node);
        preorder(node.left, list);
        preorder(node.right, list);
    }
}
```

```python [Python]
class Solution:
    def flatten(self, root: TreeNode) -> None:
        if not root: return
        nodes = []
        def preorder(node):
            if not node: return
            nodes.append(node)
            preorder(node.left)
            preorder(node.right)
        preorder(root)
        for i in range(len(nodes) - 1):
            nodes[i].left = None
            nodes[i].right = nodes[i + 1]
```

```go [Go]
func flatten(root *TreeNode) {
    if root == nil { return }
    nodes := []*TreeNode{}
    var preorder func(*TreeNode)
    preorder = func(node *TreeNode) {
        if node == nil { return }
        nodes = append(nodes, node)
        preorder(node.Left)
        preorder(node.Right)
    }
    preorder(root)
    for i := 0; i < len(nodes)-1; i++ {
        nodes[i].Left = nil
        nodes[i].Right = nodes[i+1]
    }
}
```

```c [C]
void preorder(struct TreeNode* node, struct TreeNode** list, int* idx) {
    if (!node) return;
    list[(*idx)++] = node;
    preorder(node->left, list, idx);
    preorder(node->right, list, idx);
}
void flatten(struct TreeNode* root) {
    if (!root) return;
    struct TreeNode* list[2000];
    int idx = 0;
    preorder(root, list, &idx);
    for (int i = 0; i < idx - 1; i++) {
        list[i]->left = NULL;
        list[i]->right = list[i+1];
    }
}
```

```cpp [C++]
class Solution {
public:
    void flatten(TreeNode* root) {
        if (!root) return;
        vector<TreeNode*> nodes;
        preorder(root, nodes);
        for (int i = 0; i < (int)nodes.size() - 1; i++) {
            nodes[i]->left = nullptr;
            nodes[i]->right = nodes[i+1];
        }
    }
    void preorder(TreeNode* node, vector<TreeNode*>& nodes) {
        if (!node) return;
        nodes.push_back(node);
        preorder(node->left, nodes);
        preorder(node->right, nodes);
    }
};
```

```js [JavaScript]
var flatten = function(root) {
    if (!root) return;
    const nodes = [];
    function preorder(node) {
        if (!node) return;
        nodes.push(node);
        preorder(node.left);
        preorder(node.right);
    }
    preorder(root);
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].left = null;
        nodes[i].right = nodes[i + 1];
    }
};
```

```ts [TypeScript]
function flatten(root: TreeNode | null): void {
    if (!root) return;
    const nodes: TreeNode[] = [];
    function preorder(node: TreeNode | null): void {
        if (!node) return;
        nodes.push(node);
        preorder(node.left);
        preorder(node.right);
    }
    preorder(root);
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].left = null;
        nodes[i].right = nodes[i + 1];
    }
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，存储前序遍历结果。

---

### 2.2 方法二：迭代（栈）模拟前序 + 重建

1. **思路**

使用栈模拟前序遍历，依次弹出节点并构建链表。在遍历过程中，将右子节点先入栈，左子节点后入栈（确保左子节点先被访问）。同时维护一个 `prev` 指针，将当前节点作为前一个节点的右孩子。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void flatten(TreeNode root) {
        if (root == null) return;
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        TreeNode prev = null;
        while (!stack.isEmpty()) {
            TreeNode cur = stack.pop();
            if (prev != null) {
                prev.left = null;
                prev.right = cur;
            }
            if (cur.right != null) stack.push(cur.right);
            if (cur.left != null) stack.push(cur.left);
            prev = cur;
        }
    }
}
```

```python [Python]
class Solution:
    def flatten(self, root: TreeNode) -> None:
        if not root: return
        stack = [root]
        prev = None
        while stack:
            cur = stack.pop()
            if prev:
                prev.left = None
                prev.right = cur
            if cur.right: stack.append(cur.right)
            if cur.left: stack.append(cur.left)
            prev = cur
```

```go [Go]
func flatten(root *TreeNode) {
    if root == nil { return }
    stack := []*TreeNode{root}
    var prev *TreeNode
    for len(stack) > 0 {
        cur := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if prev != nil {
            prev.Left = nil
            prev.Right = cur
        }
        if cur.Right != nil { stack = append(stack, cur.Right) }
        if cur.Left != nil { stack = append(stack, cur.Left) }
        prev = cur
    }
}
```

```c [C]
void flatten(struct TreeNode* root) {
    if (!root) return;
    struct TreeNode* stack[2000];
    int top = 0;
    stack[top++] = root;
    struct TreeNode* prev = NULL;
    while (top > 0) {
        struct TreeNode* cur = stack[--top];
        if (prev) {
            prev->left = NULL;
            prev->right = cur;
        }
        if (cur->right) stack[top++] = cur->right;
        if (cur->left) stack[top++] = cur->left;
        prev = cur;
    }
}
```

```cpp [C++]
class Solution {
public:
    void flatten(TreeNode* root) {
        if (!root) return;
        stack<TreeNode*> st;
        st.push(root);
        TreeNode* prev = nullptr;
        while (!st.empty()) {
            TreeNode* cur = st.top(); st.pop();
            if (prev) {
                prev->left = nullptr;
                prev->right = cur;
            }
            if (cur->right) st.push(cur->right);
            if (cur->left) st.push(cur->left);
            prev = cur;
        }
    }
};
```

```js [JavaScript]
var flatten = function(root) {
    if (!root) return;
    const stack = [root];
    let prev = null;
    while (stack.length) {
        const cur = stack.pop();
        if (prev) {
            prev.left = null;
            prev.right = cur;
        }
        if (cur.right) stack.push(cur.right);
        if (cur.left) stack.push(cur.left);
        prev = cur;
    }
};
```

```ts [TypeScript]
function flatten(root: TreeNode | null): void {
    if (!root) return;
    const stack: TreeNode[] = [root];
    let prev: TreeNode | null = null;
    while (stack.length) {
        const cur = stack.pop()!;
        if (prev) {
            prev.left = null;
            prev.right = cur;
        }
        if (cur.right) stack.push(cur.right);
        if (cur.left) stack.push(cur.left);
        prev = cur;
    }
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入栈出栈一次。
- **空间复杂度**：`O(n)`，栈最坏存储所有节点。

---

### 2.3 方法三：O(1) 空间原地展开（寻找前驱）

1. **思路**

利用二叉树的性质，对于当前节点 `cur`：
- 如果 `cur.left` 不为空，则找到左子树中最右边的节点（即左子树的前驱节点 `pre`）。
- 将 `cur.right` 接到 `pre.right` 上。
- 将 `cur.left` 移到 `cur.right`，并将 `cur.left` 置为空。
- 然后 `cur` 移动到 `cur.right` 继续处理。

这种方法不使用额外空间，时间复杂度 `O(n)`，每个节点最多被访问两次。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void flatten(TreeNode root) {
        TreeNode cur = root;
        while (cur != null) {
            if (cur.left != null) {
                TreeNode pre = cur.left;
                while (pre.right != null) pre = pre.right;
                pre.right = cur.right;
                cur.right = cur.left;
                cur.left = null;
            }
            cur = cur.right;
        }
    }
}
```

```python [Python]
class Solution:
    def flatten(self, root: TreeNode) -> None:
        cur = root
        while cur:
            if cur.left:
                pre = cur.left
                while pre.right:
                    pre = pre.right
                pre.right = cur.right
                cur.right = cur.left
                cur.left = None
            cur = cur.right
```

```go [Go]
func flatten(root *TreeNode) {
    cur := root
    for cur != nil {
        if cur.Left != nil {
            pre := cur.Left
            for pre.Right != nil {
                pre = pre.Right
            }
            pre.Right = cur.Right
            cur.Right = cur.Left
            cur.Left = nil
        }
        cur = cur.Right
    }
}
```

```c [C]
void flatten(struct TreeNode* root) {
    struct TreeNode* cur = root;
    while (cur) {
        if (cur->left) {
            struct TreeNode* pre = cur->left;
            while (pre->right) pre = pre->right;
            pre->right = cur->right;
            cur->right = cur->left;
            cur->left = NULL;
        }
        cur = cur->right;
    }
}
```

```cpp [C++]
class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* cur = root;
        while (cur) {
            if (cur->left) {
                TreeNode* pre = cur->left;
                while (pre->right) pre = pre->right;
                pre->right = cur->right;
                cur->right = cur->left;
                cur->left = nullptr;
            }
            cur = cur->right;
        }
    }
};
```

```js [JavaScript]
var flatten = function(root) {
    let cur = root;
    while (cur) {
        if (cur.left) {
            let pre = cur.left;
            while (pre.right) pre = pre.right;
            pre.right = cur.right;
            cur.right = cur.left;
            cur.left = null;
        }
        cur = cur.right;
    }
};
```

```ts [TypeScript]
function flatten(root: TreeNode | null): void {
    let cur = root;
    while (cur) {
        if (cur.left) {
            let pre = cur.left;
            while (pre.right) pre = pre.right;
            pre.right = cur.right;
            cur.right = cur.left;
            cur.left = null;
        }
        cur = cur.right;
    }
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点最多被访问两次。
- **空间复杂度**：`O(1)`，不使用额外空间。

## 三、总结

| 方法               | 时间复杂度 | 空间复杂度 | 特点                 |
| ------------------ | ---------- | ---------- | -------------------- |
| 递归前序 + 列表    | `O(n)`     | `O(n)`     | 直观，易理解         |
| 迭代栈模拟前序     | `O(n)`     | `O(n)`     | 避免递归，但需额外栈 |
| 原地展开（找前驱） | `O(n)`     | `O(1)`     | **推荐**，空间最优   |

**推荐**：面试中首选 **方法三（原地展开）**，空间复杂度 `O(1)`，且代码简洁。如果面试官允许使用额外空间，方法一和方法二也容易快速实现。
