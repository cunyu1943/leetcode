# [116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)

## 一、题目描述

给定一个 **完美二叉树**，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 `NULL`。

初始状态下，所有 next 指针都被设置为 `NULL`。

**示例 1：**

```
输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
```

**示例 2：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点数在范围 `[0, 2^12 - 1]` 内
- `-1000 <= Node.val <= 1000`

**进阶：**

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

## 二、解答方法

### 2.1 方法一：层序遍历（BFS）

1. **思路**

使用队列进行层序遍历。对于每一层，从左到右遍历节点，将当前节点的 `next` 指向队列中下一个节点（同一层）。遍历完一层后，`next` 指针自动连接下一层。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                Node node = q.poll();
                if (i < size - 1) node.next = q.peek();
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return root;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root: return None
        q = deque([root])
        while q:
            size = len(q)
            for i in range(size):
                node = q.popleft()
                if i < size - 1:
                    node.next = q[0]
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
        return root
```

```go [Go]
func connect(root *Node) *Node {
    if root == nil { return nil }
    q := []*Node{root}
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            if i < size-1 {
                node.Next = q[0]
            }
            if node.Left != nil { q = append(q, node.Left) }
            if node.Right != nil { q = append(q, node.Right) }
        }
    }
    return root
}
```

```c [C]
struct Node* connect(struct Node* root) {
    if (!root) return NULL;
    struct Node* q[5000];
    int head = 0, tail = 0;
    q[tail++] = root;
    while (head < tail) {
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            struct Node* node = q[head++];
            if (i < size - 1) node->next = q[head];
            if (node->left) q[tail++] = node->left;
            if (node->right) q[tail++] = node->right;
        }
    }
    return root;
}
```

```cpp [C++]
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                Node* node = q.front(); q.pop();
                if (i < size - 1) node->next = q.front();
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return root;
    }
};
```

```js [JavaScript]
var connect = function(root) {
    if (!root) return null;
    const q = [root];
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            if (i < size - 1) node.next = q[0];
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return root;
};
```

```ts [TypeScript]
function connect(root: Node | null): Node | null {
    if (!root) return null;
    const q: Node[] = [root];
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift()!;
            if (i < size - 1) node.next = q[0];
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，队列存储最多一层节点。

---

### 2.2 方法二：递归（利用完美二叉树特性）

1. **思路**

对于完美二叉树，每个父节点的左右子节点可以这样连接：
- 左子节点的 `next` 指向右子节点。
- 右子节点的 `next` 指向父节点的 `next` 的左子节点（如果父节点有 `next` 的话）。

递归处理左右子树。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        if (root.left != null) {
            root.left.next = root.right;
            if (root.next != null) {
                root.right.next = root.next.left;
            }
            connect(root.left);
            connect(root.right);
        }
        return root;
    }
}
```

```python [Python]
class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root: return None
        if root.left:
            root.left.next = root.right
            if root.next:
                root.right.next = root.next.left
            self.connect(root.left)
            self.connect(root.right)
        return root
```

```go [Go]
func connect(root *Node) *Node {
    if root == nil { return nil }
    if root.Left != nil {
        root.Left.Next = root.Right
        if root.Next != nil {
            root.Right.Next = root.Next.Left
        }
        connect(root.Left)
        connect(root.Right)
    }
    return root
}
```

```c [C]
struct Node* connect(struct Node* root) {
    if (!root) return NULL;
    if (root->left) {
        root->left->next = root->right;
        if (root->next) {
            root->right->next = root->next->left;
        }
        connect(root->left);
        connect(root->right);
    }
    return root;
}
```

```cpp [C++]
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        if (root->left) {
            root->left->next = root->right;
            if (root->next) {
                root->right->next = root->next->left;
            }
            connect(root->left);
            connect(root->right);
        }
        return root;
    }
};
```

```js [JavaScript]
var connect = function(root) {
    if (!root) return null;
    if (root.left) {
        root.left.next = root.right;
        if (root.next) {
            root.right.next = root.next.left;
        }
        connect(root.left);
        connect(root.right);
    }
    return root;
};
```

```ts [TypeScript]
function connect(root: Node | null): Node | null {
    if (!root) return null;
    if (root.left) {
        root.left.next = root.right;
        if (root.next) {
            root.right.next = root.next.left;
        }
        connect(root.left);
        connect(root.right);
    }
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(log n)`，递归栈深度（完美二叉树高度）。

---

### 2.3 方法三：迭代（O(1) 空间）

1. **思路**

利用已建立的 `next` 指针，从根节点开始，逐层处理。对于每一层，从左到右遍历该层节点，将它们的子节点连接起来：
- 左子节点指向右子节点
- 右子节点指向当前节点 `next` 的左子节点（若当前节点有 `next`）

然后移动到下一层的最左节点继续。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Node leftmost = root;
        while (leftmost.left != null) {
            Node head = leftmost;
            while (head != null) {
                head.left.next = head.right;
                if (head.next != null) {
                    head.right.next = head.next.left;
                }
                head = head.next;
            }
            leftmost = leftmost.left;
        }
        return root;
    }
}
```

```python [Python]
class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root: return None
        leftmost = root
        while leftmost.left:
            head = leftmost
            while head:
                head.left.next = head.right
                if head.next:
                    head.right.next = head.next.left
                head = head.next
            leftmost = leftmost.left
        return root
```

```go [Go]
func connect(root *Node) *Node {
    if root == nil { return nil }
    leftmost := root
    for leftmost.Left != nil {
        head := leftmost
        for head != nil {
            head.Left.Next = head.Right
            if head.Next != nil {
                head.Right.Next = head.Next.Left
            }
            head = head.Next
        }
        leftmost = leftmost.Left
    }
    return root
}
```

```c [C]
struct Node* connect(struct Node* root) {
    if (!root) return NULL;
    struct Node* leftmost = root;
    while (leftmost->left) {
        struct Node* head = leftmost;
        while (head) {
            head->left->next = head->right;
            if (head->next) {
                head->right->next = head->next->left;
            }
            head = head->next;
        }
        leftmost = leftmost->left;
    }
    return root;
}
```

```cpp [C++]
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* leftmost = root;
        while (leftmost->left) {
            Node* head = leftmost;
            while (head) {
                head->left->next = head->right;
                if (head->next) {
                    head->right->next = head->next->left;
                }
                head = head->next;
            }
            leftmost = leftmost->left;
        }
        return root;
    }
};
```

```js [JavaScript]
var connect = function(root) {
    if (!root) return null;
    let leftmost = root;
    while (leftmost.left) {
        let head = leftmost;
        while (head) {
            head.left.next = head.right;
            if (head.next) {
                head.right.next = head.next.left;
            }
            head = head.next;
        }
        leftmost = leftmost.left;
    }
    return root;
};
```

```ts [TypeScript]
function connect(root: Node | null): Node | null {
    if (!root) return null;
    let leftmost: Node = root;
    while (leftmost.left) {
        let head: Node | null = leftmost;
        while (head) {
            head.left.next = head.right;
            if (head.next) {
                head.right.next = head.next.left;
            }
            head = head.next;
        }
        leftmost = leftmost.left;
    }
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(1)`，不使用额外空间（递归栈不算）。

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                               |
| -------------- | ---------- | ---------- | ---------------------------------- |
| BFS（队列）    | `O(n)`     | `O(n)`     | 直观，通用性强（不限于完美二叉树） |
| 递归           | `O(n)`     | `O(log n)` | 利用完美二叉树特性，代码简洁       |
| 迭代 O(1) 空间 | `O(n)`     | `O(1)`     | **推荐**，空间最优                 |

**推荐**：面试中首选 **方法三（迭代 O(1) 空间）**，既满足进阶要求，又高效。如果面试官允许递归，方法二也很简洁。
