# [117. 填充每个节点的下一个右侧节点指针 II](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/)

## 一、题目描述

给定一个二叉树：

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 `next` 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 `next` 指针设置为 `NULL`。

初始状态下，所有 `next` 指针都被设置为 `NULL`。

**进阶：**

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

**示例 1：**

```
输入：root = [1,2,3,4,5,null,7]
输出：[1,#,2,3,#,4,5,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
```

**示例 2：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中的节点数在范围 `[0, 6000]` 内
- `-100 <= Node.val <= 100`

## 二、解答方法

### 2.1 方法一：层序遍历（BFS）

1. **思路**

使用队列进行层序遍历，与第 116 题完全相同。由于是普通二叉树，每个节点仍然按层序处理，将当前节点的 `next` 指向队列中下一个节点。这种方法适用于任何二叉树，但空间复杂度为 `O(n)`。

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
    struct Node* q[6000];
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

### 2.2 方法二：递归（利用已建立的 next 指针）

1. **思路**

对于普通二叉树，不能直接像完美二叉树那样简单连接。但可以递归处理：先递归处理右子树，再处理左子树，利用已经建立的 `next` 指针在层级间移动。

更常见的是使用迭代 O(1) 空间方法，但递归也可行，需要借助 `next` 指针找到下一层的起始节点。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        // 找到当前层下一层的起始节点（最左非空节点）
        Node dummy = new Node(0);
        Node tail = dummy;
        Node cur = root;
        while (cur != null) {
            if (cur.left != null) { tail.next = cur.left; tail = tail.next; }
            if (cur.right != null) { tail.next = cur.right; tail = tail.next; }
            cur = cur.next;
        }
        // 递归处理下一层
        connect(dummy.next);
        return root;
    }
}
```

```python [Python]
class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root: return None
        dummy = Node(0)
        tail = dummy
        cur = root
        while cur:
            if cur.left:
                tail.next = cur.left
                tail = tail.next
            if cur.right:
                tail.next = cur.right
                tail = tail.next
            cur = cur.next
        self.connect(dummy.next)
        return root
```

```go [Go]
func connect(root *Node) *Node {
    if root == nil { return nil }
    dummy := &Node{}
    tail := dummy
    cur := root
    for cur != nil {
        if cur.Left != nil {
            tail.Next = cur.Left
            tail = tail.Next
        }
        if cur.Right != nil {
            tail.Next = cur.Right
            tail = tail.Next
        }
        cur = cur.Next
    }
    connect(dummy.Next)
    return root
}
```

```c [C]
struct Node* connect(struct Node* root) {
    if (!root) return NULL;
    struct Node dummy;
    struct Node* tail = &dummy;
    struct Node* cur = root;
    while (cur) {
        if (cur->left) { tail->next = cur->left; tail = tail->next; }
        if (cur->right) { tail->next = cur->right; tail = tail->next; }
        cur = cur->next;
    }
    connect(dummy.next);
    return root;
}
```

```cpp [C++]
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node dummy;
        Node* tail = &dummy;
        Node* cur = root;
        while (cur) {
            if (cur->left) { tail->next = cur->left; tail = tail->next; }
            if (cur->right) { tail->next = cur->right; tail = tail->next; }
            cur = cur->next;
        }
        connect(dummy.next);
        return root;
    }
};
```

```js [JavaScript]
var connect = function(root) {
    if (!root) return null;
    const dummy = new Node(0);
    let tail = dummy;
    let cur = root;
    while (cur) {
        if (cur.left) { tail.next = cur.left; tail = tail.next; }
        if (cur.right) { tail.next = cur.right; tail = tail.next; }
        cur = cur.next;
    }
    connect(dummy.next);
    return root;
};
```

```ts [TypeScript]
function connect(root: Node | null): Node | null {
    if (!root) return null;
    const dummy = new Node(0);
    let tail = dummy;
    let cur: Node | null = root;
    while (cur) {
        if (cur.left) { tail.next = cur.left; tail = tail.next; }
        if (cur.right) { tail.next = cur.right; tail = tail.next; }
        cur = cur.next;
    }
    connect(dummy.next);
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(h)`，递归栈深度，`h` 为树高。

---

### 2.3 方法三：迭代（O(1) 空间）

1. **思路**

与方法二的递归思路相同，但使用循环代替递归。每次处理一层，用 `dummy` 节点连接下一层的所有节点，然后移动到下一层的最左节点继续。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Node leftmost = root;
        while (leftmost != null) {
            Node dummy = new Node(0);
            Node tail = dummy;
            Node cur = leftmost;
            while (cur != null) {
                if (cur.left != null) { tail.next = cur.left; tail = tail.next; }
                if (cur.right != null) { tail.next = cur.right; tail = tail.next; }
                cur = cur.next;
            }
            leftmost = dummy.next;
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
        while leftmost:
            dummy = Node(0)
            tail = dummy
            cur = leftmost
            while cur:
                if cur.left:
                    tail.next = cur.left
                    tail = tail.next
                if cur.right:
                    tail.next = cur.right
                    tail = tail.next
                cur = cur.next
            leftmost = dummy.next
        return root
```

```go [Go]
func connect(root *Node) *Node {
    if root == nil { return nil }
    leftmost := root
    for leftmost != nil {
        dummy := &Node{}
        tail := dummy
        cur := leftmost
        for cur != nil {
            if cur.Left != nil {
                tail.Next = cur.Left
                tail = tail.Next
            }
            if cur.Right != nil {
                tail.Next = cur.Right
                tail = tail.Next
            }
            cur = cur.Next
        }
        leftmost = dummy.Next
    }
    return root
}
```

```c [C]
struct Node* connect(struct Node* root) {
    if (!root) return NULL;
    struct Node* leftmost = root;
    while (leftmost) {
        struct Node dummy;
        struct Node* tail = &dummy;
        struct Node* cur = leftmost;
        while (cur) {
            if (cur->left) { tail->next = cur->left; tail = tail->next; }
            if (cur->right) { tail->next = cur->right; tail = tail->next; }
            cur = cur->next;
        }
        leftmost = dummy.next;
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
        while (leftmost) {
            Node dummy;
            Node* tail = &dummy;
            Node* cur = leftmost;
            while (cur) {
                if (cur->left) { tail->next = cur->left; tail = tail->next; }
                if (cur->right) { tail->next = cur->right; tail = tail->next; }
                cur = cur->next;
            }
            leftmost = dummy.next;
        }
        return root;
    }
};
```

```js [JavaScript]
var connect = function(root) {
    if (!root) return null;
    let leftmost = root;
    while (leftmost) {
        const dummy = new Node(0);
        let tail = dummy;
        let cur = leftmost;
        while (cur) {
            if (cur.left) { tail.next = cur.left; tail = tail.next; }
            if (cur.right) { tail.next = cur.right; tail = tail.next; }
            cur = cur.next;
        }
        leftmost = dummy.next;
    }
    return root;
};
```

```ts [TypeScript]
function connect(root: Node | null): Node | null {
    if (!root) return null;
    let leftmost: Node | null = root;
    while (leftmost) {
        const dummy = new Node(0);
        let tail = dummy;
        let cur: Node | null = leftmost;
        while (cur) {
            if (cur.left) { tail.next = cur.left; tail = tail.next; }
            if (cur.right) { tail.next = cur.right; tail = tail.next; }
            cur = cur.next;
        }
        leftmost = dummy.next;
    }
    return root;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(1)`，不使用额外空间。

---

## 三、总结

| 方法              | 时间复杂度 | 空间复杂度 | 特点                     |
| ----------------- | ---------- | ---------- | ------------------------ |
| BFS（队列）       | `O(n)`     | `O(n)`     | 直观通用，适合所有二叉树 |
| 递归（利用 next） | `O(n)`     | `O(h)`     | 代码简洁，但递归有栈开销 |
| 迭代 O(1) 空间    | `O(n)`     | `O(1)`     | **推荐**，空间最优       |

**推荐**：面试中首选 **方法三（迭代 O(1) 空间）**，既满足进阶要求，又高效。注意与第 116 题的区别：普通二叉树不能简单通过 `root.next.left` 连接，需要 `dummy` 节点辅助。