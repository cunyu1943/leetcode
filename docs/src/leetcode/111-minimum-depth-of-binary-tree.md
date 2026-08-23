# [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

## 一、题目描述

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：** 叶子节点是指没有子节点的节点。

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：2
```

**示例 2：**

```
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
```

**提示：**

- 树中节点数在范围 `[0, 10^5]` 内
- `-1000 <= Node.val <= 1000`

## 二、解答方法

### 2.1 方法一：递归（深度优先）

1. **思路**

计算最小深度时，需要区分节点类型：
- 空节点返回 0
- 叶子节点（无左右孩子）返回 1
- 只有左孩子，则返回左子树最小深度 + 1
- 只有右孩子，则返回右子树最小深度 + 1
- 两个孩子都有，返回左右子树最小深度的较小值 + 1

**注意**：不能直接返回 `min(minDepth(left), minDepth(right)) + 1`，否则当某子树为空时会返回 1，但空子树并不代表叶子节点，会导致错误。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        int left = minDepth(root.left);
        int right = minDepth(root.right);
        if (root.left == null) return right + 1;
        if (root.right == null) return left + 1;
        return Math.min(left, right) + 1;
    }
}
```

```python [Python]
class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root: return 0
        left = self.minDepth(root.left)
        right = self.minDepth(root.right)
        if not root.left: return right + 1
        if not root.right: return left + 1
        return min(left, right) + 1
```

```go [Go]
func minDepth(root *TreeNode) int {
    if root == nil { return 0 }
    left := minDepth(root.Left)
    right := minDepth(root.Right)
    if root.Left == nil { return right + 1 }
    if root.Right == nil { return left + 1 }
    if left < right { return left + 1 }
    return right + 1
}
```

```c [C]
int minDepth(struct TreeNode* root) {
    if (!root) return 0;
    int left = minDepth(root->left);
    int right = minDepth(root->right);
    if (!root->left) return right + 1;
    if (!root->right) return left + 1;
    return (left < right ? left : right) + 1;
}
```

```cpp [C++]
class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        int left = minDepth(root->left);
        int right = minDepth(root->right);
        if (!root->left) return right + 1;
        if (!root->right) return left + 1;
        return min(left, right) + 1;
    }
};
```

```js [JavaScript]
var minDepth = function(root) {
    if (!root) return 0;
    const left = minDepth(root.left);
    const right = minDepth(root.right);
    if (!root.left) return right + 1;
    if (!root.right) return left + 1;
    return Math.min(left, right) + 1;
};
```

```ts [TypeScript]
function minDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const left = minDepth(root.left);
    const right = minDepth(root.right);
    if (!root.left) return right + 1;
    if (!root.right) return left + 1;
    return Math.min(left, right) + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：BFS（广度优先，提前终止）

1. **思路**

使用队列进行层序遍历。当第一次遇到叶子节点（左右孩子都为空）时，当前层数即为最小深度。BFS 可以提前返回，不必遍历所有节点，在多数情况下效率更高。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int depth = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (node.left == null && node.right == null) return depth;
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
    def minDepth(self, root: TreeNode) -> int:
        if not root: return 0
        q = deque([root])
        depth = 1
        while q:
            for _ in range(len(q)):
                node = q.popleft()
                if not node.left and not node.right:
                    return depth
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            depth += 1
        return depth
```

```go [Go]
func minDepth(root *TreeNode) int {
    if root == nil { return 0 }
    q := []*TreeNode{root}
    depth := 1
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            if node.Left == nil && node.Right == nil {
                return depth
            }
            if node.Left != nil { q = append(q, node.Left) }
            if node.Right != nil { q = append(q, node.Right) }
        }
        depth++
    }
    return depth
}
```

```c [C]
int minDepth(struct TreeNode* root) {
    if (!root) return 0;
    struct TreeNode* q[100000];
    int head = 0, tail = 0;
    q[tail++] = root;
    int depth = 1;
    while (head < tail) {
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            struct TreeNode* node = q[head++];
            if (!node->left && !node->right) return depth;
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
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q;
        q.push(root);
        int depth = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                if (!node->left && !node->right) return depth;
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
var minDepth = function(root) {
    if (!root) return 0;
    const q = [root];
    let depth = 1;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            if (!node.left && !node.right) return depth;
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        depth++;
    }
    return depth;
};
```

```ts [TypeScript]
function minDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const q: TreeNode[] = [root];
    let depth = 1;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift()!;
            if (!node.left && !node.right) return depth;
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

- **时间复杂度**：`O(n)`，最坏遍历所有节点，但平均提前终止。
- **空间复杂度**：`O(n)`，队列存储节点。

---

### 2.3 方法三：DFS 迭代（栈，带深度）

1. **思路**

使用栈进行深度优先遍历，同时记录每个节点的深度。遇到叶子节点时更新最小深度。虽然会遍历所有节点，但可以避免递归栈溢出，适合极深树。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        Stack<TreeNode> stack = new Stack<>();
        Stack<Integer> depths = new Stack<>();
        stack.push(root);
        depths.push(1);
        int min = Integer.MAX_VALUE;
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            int depth = depths.pop();
            if (node.left == null && node.right == null) {
                min = Math.min(min, depth);
            }
            if (node.left != null) { stack.push(node.left); depths.push(depth + 1); }
            if (node.right != null) { stack.push(node.right); depths.push(depth + 1); }
        }
        return min;
    }
}
```

```python [Python]
class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root: return 0
        stack = [(root, 1)]
        min_depth = float('inf')
        while stack:
            node, depth = stack.pop()
            if not node.left and not node.right:
                min_depth = min(min_depth, depth)
            if node.left: stack.append((node.left, depth + 1))
            if node.right: stack.append((node.right, depth + 1))
        return min_depth
```

```go [Go]
func minDepth(root *TreeNode) int {
    if root == nil { return 0 }
    stack := []*TreeNode{root}
    depths := []int{1}
    min := int(^uint(0) >> 1) // MaxInt
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        depth := depths[len(depths)-1]
        depths = depths[:len(depths)-1]
        if node.Left == nil && node.Right == nil {
            if depth < min { min = depth }
        }
        if node.Left != nil { stack = append(stack, node.Left); depths = append(depths, depth+1) }
        if node.Right != nil { stack = append(stack, node.Right); depths = append(depths, depth+1) }
    }
    return min
}
```

```c [C]
int minDepth(struct TreeNode* root) {
    if (!root) return 0;
    struct TreeNode* stack[100000];
    int depths[100000];
    int top = 0;
    stack[top] = root; depths[top] = 1; top++;
    int min = 1000000000;
    while (top > 0) {
        top--;
        struct TreeNode* node = stack[top];
        int depth = depths[top];
        if (!node->left && !node->right) {
            if (depth < min) min = depth;
        }
        if (node->left) { stack[top] = node->left; depths[top] = depth+1; top++; }
        if (node->right) { stack[top] = node->right; depths[top] = depth+1; top++; }
    }
    return min;
}
```

```cpp [C++]
class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        stack<TreeNode*> st;
        stack<int> depths;
        st.push(root); depths.push(1);
        int min = INT_MAX;
        while (!st.empty()) {
            TreeNode* node = st.top(); st.pop();
            int depth = depths.top(); depths.pop();
            if (!node->left && !node->right) {
                min = std::min(min, depth);
            }
            if (node->left) { st.push(node->left); depths.push(depth+1); }
            if (node->right) { st.push(node->right); depths.push(depth+1); }
        }
        return min;
    }
};
```

```js [JavaScript]
var minDepth = function(root) {
    if (!root) return 0;
    const stack = [[root, 1]];
    let min = Infinity;
    while (stack.length) {
        const [node, depth] = stack.pop();
        if (!node.left && !node.right) {
            min = Math.min(min, depth);
        }
        if (node.left) stack.push([node.left, depth+1]);
        if (node.right) stack.push([node.right, depth+1]);
    }
    return min;
};
```

```ts [TypeScript]
function minDepth(root: TreeNode | null): number {
    if (!root) return 0;
    const stack: [TreeNode, number][] = [[root, 1]];
    let min = Infinity;
    while (stack.length) {
        const [node, depth] = stack.pop()!;
        if (!node.left && !node.right) {
            min = Math.min(min, depth);
        }
        if (node.left) stack.push([node.left, depth+1]);
        if (node.right) stack.push([node.right, depth+1]);
    }
    return min;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入栈出栈一次。
- **空间复杂度**：`O(n)`，栈存储节点。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                                   |
| -------------- | ---------- | ---------- | -------------------------------------- |
| 递归（DFS）    | `O(n)`     | `O(n)`     | 代码简洁，注意单分支处理               |
| BFS（队列）    | `O(n)`     | `O(n)`     | **推荐**，找到第一个叶子即返回，效率高 |
| 迭代 DFS（栈） | `O(n)`     | `O(n)`     | 避免递归栈溢出                         |

**推荐**：面试中首选 **BFS 方法（方法二）**，因为它在最坏情况下也能提前终止，且逻辑直观。递归方法也可行，但需注意单分支节点的特殊处理。
