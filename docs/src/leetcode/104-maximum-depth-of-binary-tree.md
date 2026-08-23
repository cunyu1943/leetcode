# [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

## 一、题目描述

给定一个二叉树 `root`，返回其最大深度。

二叉树的 **最大深度** 是指从根节点到最远叶子节点的最长路径上的节点数。

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：3
```

**示例 2：**

```
输入：root = [1,null,2]
输出：2
```

**提示：**

- 树中节点数量在 `[0, 10^4]` 范围内
- `-100 <= Node.val <= 100`

## 二、解答方法

### 2.1 方法一：递归（后序遍历）

1. **思路**

最大深度 = `max(左子树深度, 右子树深度) + 1`。空节点深度为 0。这是后序遍历的经典应用：先递归求左右子树深度，再汇总得到当前节点深度。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
```

```python [Python]
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root:
            return 0
        return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
```

```go [Go]
func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    left := maxDepth(root.Left)
    right := maxDepth(root.Right)
    if left > right {
        return left + 1
    }
    return right + 1
}
```

```c [C]
int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return (left > right ? left : right) + 1;
}
```

```cpp [C++]
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```

```js [JavaScript]
var maxDepth = function(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

```ts [TypeScript]
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(height)`，递归栈深度，最坏情况下树退化为链表时为 `O(n)`。

---

### 2.2 方法二：BFS（层序遍历）

1. **思路**

使用队列进行层序遍历。每遍历完一层，深度加 1。当队列为空时，遍历完所有节点，深度即为最大值。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int depth = 0;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            depth++;
        }
        return depth;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root: return 0
        q = deque([root])
        depth = 0
        while q:
            for _ in range(len(q)):
                node = q.popleft()
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            depth += 1
        return depth
```

```go [Go]
func maxDepth(root *TreeNode) int {
    if root == nil { return 0 }
    q := []*TreeNode{root}
    depth := 0
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            if node.Left != nil { q = append(q, node.Left) }
            if node.Right != nil { q = append(q, node.Right) }
        }
        depth++
    }
    return depth
}
```

```c [C]
int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    struct TreeNode* q[10000];
    int head = 0, tail = 0;
    q[tail++] = root;
    int depth = 0;
    while (head < tail) {
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            struct TreeNode* node = q[head++];
            if (node->left) q[tail++] = node->left;
            if (node->right) q[tail++] = node->right;
        }
        depth++;
    }
    return depth;
}
```

```cpp [C++]
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q;
        q.push(root);
        int depth = 0;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            depth++;
        }
        return depth;
    }
};
```

```js [JavaScript]
var maxDepth = function(root) {
    if (!root) return 0;
    const q = [root];
    let depth = 0;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        depth++;
    }
    return depth;
};
```

```ts [TypeScript]
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const q: TreeNode[] = [root];
    let depth = 0;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift()!;
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        depth++;
    }
    return depth;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入队出队一次。
- **空间复杂度**：`O(w)`，`w` 为树的最大宽度（最底层节点数），最坏 `O(n)`。

---

### 2.3 方法三：DFS 前序遍历（带深度参数）

1. **思路**

从根节点开始向下递归，每层传递当前深度 `depth`。每次访问节点时更新全局最大深度。本质是前序遍历，信息从根向叶子传递。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private int max = 0;
    public int maxDepth(TreeNode root) {
        dfs(root, 1);
        return max;
    }
    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        max = Math.max(max, depth);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
}
```

```python [Python]
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        self.max_depth = 0
        def dfs(node, depth):
            if not node: return
            self.max_depth = max(self.max_depth, depth)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        dfs(root, 1)
        return self.max_depth
```

```go [Go]
func maxDepth(root *TreeNode) int {
    max := 0
    var dfs func(*TreeNode, int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil { return }
        if depth > max { max = depth }
        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }
    dfs(root, 1)
    return max
}
```

```c [C]
void dfs(struct TreeNode* node, int depth, int* max) {
    if (!node) return;
    if (depth > *max) *max = depth;
    dfs(node->left, depth+1, max);
    dfs(node->right, depth+1, max);
}
int maxDepth(struct TreeNode* root) {
    int max = 0;
    dfs(root, 1, &max);
    return max;
}
```

```cpp [C++]
class Solution {
public:
    int maxDepth(TreeNode* root) {
        int max = 0;
        dfs(root, 1, max);
        return max;
    }
    void dfs(TreeNode* node, int depth, int& max) {
        if (!node) return;
        max = std::max(max, depth);
        dfs(node->left, depth+1, max);
        dfs(node->right, depth+1, max);
    }
};
```

```js [JavaScript]
var maxDepth = function(root) {
    let max = 0;
    function dfs(node, depth) {
        if (!node) return;
        max = Math.max(max, depth);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 1);
    return max;
};
```

```ts [TypeScript]
function maxDepth(root: TreeNode | null): number {
    let max = 0;
    function dfs(node: TreeNode | null, depth: number): void {
        if (!node) return;
        max = Math.max(max, depth);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 1);
    return max;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(height)`，递归栈深度。

---

### 2.4 方法四：栈模拟迭代（后序遍历变体）

1. **思路**

使用栈模拟递归，同时用另一个栈（或配对）记录每个节点对应的深度。每次弹出节点时更新最大深度，并将其子节点与深度 `+1` 一起压栈。这种方式避免了递归，适用于树深度很大时的场景。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        Stack<TreeNode> stack = new Stack<>();
        Stack<Integer> depths = new Stack<>();
        stack.push(root);
        depths.push(1);
        int max = 0;
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            int depth = depths.pop();
            max = Math.max(max, depth);
            if (node.left != null) { stack.push(node.left); depths.push(depth + 1); }
            if (node.right != null) { stack.push(node.right); depths.push(depth + 1); }
        }
        return max;
    }
}
```

```python [Python]
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root: return 0
        stack = [(root, 1)]
        max_depth = 0
        while stack:
            node, depth = stack.pop()
            max_depth = max(max_depth, depth)
            if node.left: stack.append((node.left, depth+1))
            if node.right: stack.append((node.right, depth+1))
        return max_depth
```

```go [Go]
func maxDepth(root *TreeNode) int {
    if root == nil { return 0 }
    stack := []*TreeNode{root}
    depths := []int{1}
    max := 0
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        depth := depths[len(depths)-1]
        depths = depths[:len(depths)-1]
        if depth > max { max = depth }
        if node.Left != nil {
            stack = append(stack, node.Left)
            depths = append(depths, depth+1)
        }
        if node.Right != nil {
            stack = append(stack, node.Right)
            depths = append(depths, depth+1)
        }
    }
    return max
}
```

```c [C]
int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    struct TreeNode* stack[10000];
    int depths[10000];
    int top = 0;
    stack[top] = root; depths[top] = 1; top++;
    int max = 0;
    while (top > 0) {
        top--;
        struct TreeNode* node = stack[top];
        int depth = depths[top];
        if (depth > max) max = depth;
        if (node->left) { stack[top] = node->left; depths[top] = depth+1; top++; }
        if (node->right) { stack[top] = node->right; depths[top] = depth+1; top++; }
    }
    return max;
}
```

```cpp [C++]
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        stack<TreeNode*> st;
        stack<int> depths;
        st.push(root); depths.push(1);
        int max = 0;
        while (!st.empty()) {
            TreeNode* node = st.top(); st.pop();
            int depth = depths.top(); depths.pop();
            max = std::max(max, depth);
            if (node->left) { st.push(node->left); depths.push(depth+1); }
            if (node->right) { st.push(node->right); depths.push(depth+1); }
        }
        return max;
    }
};
```

```js [JavaScript]
var maxDepth = function(root) {
    if (!root) return 0;
    const stack = [[root, 1]];
    let max = 0;
    while (stack.length) {
        const [node, depth] = stack.pop();
        max = Math.max(max, depth);
        if (node.left) stack.push([node.left, depth+1]);
        if (node.right) stack.push([node.right, depth+1]);
    }
    return max;
};
```

```ts [TypeScript]
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const stack: [TreeNode, number][] = [[root, 1]];
    let max = 0;
    while (stack.length) {
        const [node, depth] = stack.pop()!;
        max = Math.max(max, depth);
        if (node.left) stack.push([node.left, depth+1]);
        if (node.right) stack.push([node.right, depth+1]);
    }
    return max;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入栈出栈一次。
- **空间复杂度**：`O(n)`，栈最坏存储所有节点。

---

## 三、总结

四种方法对比：

| 方法               | 时间复杂度 | 空间复杂度  | 特点                       |
| ------------------ | ---------- | ----------- | -------------------------- |
| 递归（后序）       | `O(n)`     | `O(height)` | 代码最简洁，推荐首选       |
| BFS（层序）        | `O(n)`     | `O(w)`      | 直观，适合层序相关变种     |
| DFS 前序（带深度） | `O(n)`     | `O(height)` | 递归思路清晰，易于改造     |
| 栈模拟迭代         | `O(n)`     | `O(n)`      | 避免递归深度限制，工程健壮 |

**推荐**：面试中首选递归写法（方法一），两行核心代码，清晰且高效。若面试官追问“递归深度过大怎么办”，则给出迭代版本（方法四）。