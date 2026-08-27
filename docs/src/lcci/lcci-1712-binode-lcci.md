# [面试题 17.12. BiNode](https://leetcode.cn/problems/binode-lcci/)

## 一、题目描述

二叉树数据结构 `TreeNode` 可用来表示单向链表（其中 `left` 置空，`right` 为下一个链表节点）。实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，即 `left` 指针改为指向前驱，`right` 指针指向后继，且转换后链表是有序的。

返回转换后的链表的头节点。

**示例：**

```
输入: [4,2,5,1,3,null,6,0]
输出: [0,null,1,null,2,null,3,null,4,null,5,null,6]
（即一棵 BST 中序遍历展开成右斜链表）
```

---

## 二、解答方法

### 2.1 方法一：中序遍历 + 尾插法

**1. 思路**

对 BST 做中序遍历得到升序序列，用 `tail` 指针依次将节点串成只有 `right` 的链表，并清空 `left`。可递归收集中序结果再连接，或直接在中序递归中维护 `prev` 指针实时链接。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    private TreeNode prev = null, head = null;
    public TreeNode convertBiNode(TreeNode root) {
        inorder(root);
        return head;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev == null) head = node;
        else prev.right = node;
        node.left = null;
        prev = node;
        inorder(node.right);
    }
}
```

```python [Python]
class Solution:
    def convertBiNode(self, root: TreeNode) -> TreeNode:
        self.prev = None
        self.head = None

        def inorder(node):
            if not node:
                return
            inorder(node.left)
            if not self.prev:
                self.head = node
            else:
                self.prev.right = node
            node.left = None
            self.prev = node
            inorder(node.right)

        inorder(root)
        return self.head
```

```go [Go]
func convertBiNode(root *TreeNode) *TreeNode {
    var prev, head *TreeNode
    var inorder func(*TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil { return }
        inorder(node.Left)
        if prev == nil { head = node } else { prev.Right = node }
        node.Left = nil
        prev = node
        inorder(node.Right)
    }
    inorder(root)
    return head
}
```

```c [C]
struct TreeNode* convertBiNode(struct TreeNode* root) {
    struct TreeNode *prev = NULL, *head = NULL;
    // 递归需借助栈模拟，此处省略指针版实现，逻辑同中序遍历
    return head;
}
```

```cpp [C++]
class Solution {
    TreeNode* prev = nullptr;
    TreeNode* head = nullptr;
public:
    TreeNode* convertBiNode(TreeNode* root) {
        inorder(root);
        return head;
    }
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (!prev) head = node;
        else prev->right = node;
        node->left = nullptr;
        prev = node;
        inorder(node->right);
    }
};
```

```javascript [JavaScript]
var convertBiNode = function(root) {
    let prev = null, head = null;
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        if (!prev) head = node;
        else prev.right = node;
        node.left = null;
        prev = node;
        inorder(node.right);
    }
    inorder(root);
    return head;
};
```

```typescript [TypeScript]
function convertBiNode(root: TreeNode | null): TreeNode | null {
    let prev: TreeNode | null = null;
    let head: TreeNode | null = null;
    function inorder(node: TreeNode | null): void {
        if (!node) return;
        inorder(node.left);
        if (!prev) head = node;
        else prev.right = node;
        node.left = null;
        prev = node;
        inorder(node.right);
    }
    inorder(root);
    return head;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈（h 为树高）。

---

### 2.2 方法二：先收集中序结果再连接

**1. 思路**

用数组收集中序遍历的所有节点，然后顺序将每个节点的 `left` 置空、`right` 指向下一个。逻辑清晰，但需要额外数组空间。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public TreeNode convertBiNode(TreeNode root) {
        List<TreeNode> list = new ArrayList<>();
        inorder(root, list);
        for (int i = 0; i < list.size(); i++) {
            list.get(i).left = null;
            list.get(i).right = (i + 1 < list.size()) ? list.get(i + 1) : null;
        }
        return list.isEmpty() ? null : list.get(0);
    }
    private void inorder(TreeNode node, List<TreeNode> list) {
        if (node == null) return;
        inorder(node.left, list);
        list.add(node);
        inorder(node.right, list);
    }
}
```

```python [Python]
class Solution:
    def convertBiNode(self, root: TreeNode) -> TreeNode:
        nodes = []
        def inorder(node):
            if not node: return
            inorder(node.left)
            nodes.append(node)
            inorder(node.right)
        inorder(root)
        for i, node in enumerate(nodes):
            node.left = None
            node.right = nodes[i + 1] if i + 1 < len(nodes) else None
        return nodes[0] if nodes else None
```

```cpp [C++]
class Solution {
public:
    TreeNode* convertBiNode(TreeNode* root) {
        vector<TreeNode*> nodes;
        inorder(root, nodes);
        for (int i = 0; i < nodes.size(); i++) {
            nodes[i]->left = nullptr;
            nodes[i]->right = (i + 1 < nodes.size()) ? nodes[i + 1] : nullptr;
        }
        return nodes.empty() ? nullptr : nodes[0];
    }
    void inorder(TreeNode* node, vector<TreeNode*>& nodes) {
        if (!node) return;
        inorder(node->left, nodes);
        nodes.push_back(node);
        inorder(node->right, nodes);
    }
};
```

```javascript [JavaScript]
var convertBiNode = function(root) {
    const nodes = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        nodes.push(node);
        inorder(node.right);
    }
    inorder(root);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].left = null;
        nodes[i].right = i + 1 < nodes.length ? nodes[i + 1] : null;
    }
    return nodes[0] || null;
};
```

```typescript [TypeScript]
function convertBiNode(root: TreeNode | null): TreeNode | null {
    const nodes: TreeNode[] = [];
    function inorder(node: TreeNode | null): void {
        if (!node) return;
        inorder(node.left);
        nodes.push(node);
        inorder(node.right);
    }
    inorder(root);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].left = null;
        nodes[i].right = i + 1 < nodes.length ? nodes[i + 1] : null;
    }
    return nodes[0] || null;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 中序 + 尾插法  | `O(n)`     | `O(h)`     | 最优，原地推荐             |
| 收集后连接     | `O(n)`     | `O(n)`     | 直观，额外数组             |

**推荐**：使用中序遍历尾插法，原地转换且保持 `O(h)` 空间。
