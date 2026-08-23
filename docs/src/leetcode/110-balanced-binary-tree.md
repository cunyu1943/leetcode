# [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)

## 一、题目描述

给定一个二叉树，判断它是否是高度平衡的二叉树。

一棵高度平衡二叉树定义为：一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1。

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：true
```

**示例 2：**

```
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false
```

**示例 3：**

```
输入：root = []
输出：true
```

**提示：**

- 树中的节点数在范围 `[0, 5000]` 内
- `-10^4 <= Node.val <= 10^4`

## 二、解答方法

### 2.1 方法一：自顶向下递归（先判断当前节点，再递归子树）

1. **思路**

定义函数 `height(node)` 返回节点的高度（空节点为 0）。对于当前节点，先计算左右子树的高度差，若大于 1 则返回 `false`；否则递归判断左右子树是否各自平衡。

缺点是重复计算高度，时间复杂度较高（`O(n log n)`）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        int leftH = height(root.left);
        int rightH = height(root.right);
        if (Math.abs(leftH - rightH) > 1) return false;
        return isBalanced(root.left) && isBalanced(root.right);
    }
    private int height(TreeNode node) {
        if (node == null) return 0;
        return Math.max(height(node.left), height(node.right)) + 1;
    }
}
```

```python [Python]
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        if not root: return True
        leftH = self.height(root.left)
        rightH = self.height(root.right)
        if abs(leftH - rightH) > 1:
            return False
        return self.isBalanced(root.left) and self.isBalanced(root.right)
    def height(self, node: TreeNode) -> int:
        if not node: return 0
        return max(self.height(node.left), self.height(node.right)) + 1
```

```go [Go]
func isBalanced(root *TreeNode) bool {
    if root == nil { return true }
    leftH := height(root.Left)
    rightH := height(root.Right)
    if abs(leftH-rightH) > 1 { return false }
    return isBalanced(root.Left) && isBalanced(root.Right)
}
func height(node *TreeNode) int {
    if node == nil { return 0 }
    return max(height(node.Left), height(node.Right)) + 1
}
func max(a, b int) int { if a > b { return a }; return b }
func abs(a int) int { if a < 0 { return -a }; return a }
```

```c [C]
int height(struct TreeNode* node) {
    if (!node) return 0;
    int left = height(node->left);
    int right = height(node->right);
    return (left > right ? left : right) + 1;
}
bool isBalanced(struct TreeNode* root) {
    if (!root) return true;
    int leftH = height(root->left);
    int rightH = height(root->right);
    if (abs(leftH - rightH) > 1) return false;
    return isBalanced(root->left) && isBalanced(root->right);
}
```

```cpp [C++]
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        if (!root) return true;
        int leftH = height(root->left);
        int rightH = height(root->right);
        if (abs(leftH - rightH) > 1) return false;
        return isBalanced(root->left) && isBalanced(root->right);
    }
    int height(TreeNode* node) {
        if (!node) return 0;
        return max(height(node->left), height(node->right)) + 1;
    }
};
```

```js [JavaScript]
var isBalanced = function(root) {
    if (!root) return true;
    const leftH = height(root.left);
    const rightH = height(root.right);
    if (Math.abs(leftH - rightH) > 1) return false;
    return isBalanced(root.left) && isBalanced(root.right);
};
function height(node) {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
}
```

```ts [TypeScript]
function isBalanced(root: TreeNode | null): boolean {
    if (!root) return true;
    const leftH = height(root.left);
    const rightH = height(root.right);
    if (Math.abs(leftH - rightH) > 1) return false;
    return isBalanced(root.left) && isBalanced(root.right);
}
function height(node: TreeNode | null): number {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`，每个节点都要计算高度，而高度函数递归遍历子树，存在大量重复计算。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：自底向上（优化，推荐）

1. **思路**

在递归计算高度的同时判断是否平衡。如果子树不平衡，直接返回 `-1` 标记，终止计算。这样每个节点只访问一次，时间复杂度 `O(n)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }
    private int height(TreeNode node) {
        if (node == null) return 0;
        int leftH = height(node.left);
        if (leftH == -1) return -1;
        int rightH = height(node.right);
        if (rightH == -1) return -1;
        if (Math.abs(leftH - rightH) > 1) return -1;
        return Math.max(leftH, rightH) + 1;
    }
}
```

```python [Python]
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        return self.height(root) != -1
    def height(self, node: TreeNode) -> int:
        if not node: return 0
        leftH = self.height(node.left)
        if leftH == -1: return -1
        rightH = self.height(node.right)
        if rightH == -1: return -1
        if abs(leftH - rightH) > 1: return -1
        return max(leftH, rightH) + 1
```

```go [Go]
func isBalanced(root *TreeNode) bool {
    return height(root) != -1
}
func height(node *TreeNode) int {
    if node == nil { return 0 }
    leftH := height(node.Left)
    if leftH == -1 { return -1 }
    rightH := height(node.Right)
    if rightH == -1 { return -1 }
    if abs(leftH-rightH) > 1 { return -1 }
    return max(leftH, rightH) + 1
}
func max(a, b int) int { if a > b { return a }; return b }
func abs(a int) int { if a < 0 { return -a }; return a }
```

```c [C]
int height(struct TreeNode* node) {
    if (!node) return 0;
    int leftH = height(node->left);
    if (leftH == -1) return -1;
    int rightH = height(node->right);
    if (rightH == -1) return -1;
    if (abs(leftH - rightH) > 1) return -1;
    return (leftH > rightH ? leftH : rightH) + 1;
}
bool isBalanced(struct TreeNode* root) {
    return height(root) != -1;
}
```

```cpp [C++]
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return height(root) != -1;
    }
    int height(TreeNode* node) {
        if (!node) return 0;
        int leftH = height(node->left);
        if (leftH == -1) return -1;
        int rightH = height(node->right);
        if (rightH == -1) return -1;
        if (abs(leftH - rightH) > 1) return -1;
        return max(leftH, rightH) + 1;
    }
};
```

```js [JavaScript]
var isBalanced = function(root) {
    return height(root) !== -1;
};
function height(node) {
    if (!node) return 0;
    const leftH = height(node.left);
    if (leftH === -1) return -1;
    const rightH = height(node.right);
    if (rightH === -1) return -1;
    if (Math.abs(leftH - rightH) > 1) return -1;
    return Math.max(leftH, rightH) + 1;
}
```

```ts [TypeScript]
function isBalanced(root: TreeNode | null): boolean {
    return height(root) !== -1;
}
function height(node: TreeNode | null): number {
    if (!node) return 0;
    const leftH = height(node.left);
    if (leftH === -1) return -1;
    const rightH = height(node.right);
    if (rightH === -1) return -1;
    if (Math.abs(leftH - rightH) > 1) return -1;
    return Math.max(leftH, rightH) + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点只访问一次。
- **空间复杂度**：`O(n)`，递归栈深度。

---

### 2.3 方法三：迭代后序遍历（避免递归）

1. **思路**

使用栈模拟后序遍历，在访问节点时已经得到左右子树的高度，从而判断是否平衡。适合树深度极大、需要避免递归栈溢出的场景。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        Stack<TreeNode> stack = new Stack<>();
        Map<TreeNode, Integer> heightMap = new HashMap<>();
        TreeNode cur = root, last = null;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }
            TreeNode node = stack.peek();
            if (node.right == null || node.right == last) {
                stack.pop();
                int leftH = heightMap.getOrDefault(node.left, 0);
                int rightH = heightMap.getOrDefault(node.right, 0);
                if (Math.abs(leftH - rightH) > 1) return false;
                heightMap.put(node, Math.max(leftH, rightH) + 1);
                last = node;
            } else {
                cur = node.right;
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        if not root: return True
        stack = []
        height_map = {}
        cur, last = root, None
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            node = stack[-1]
            if not node.right or node.right == last:
                stack.pop()
                leftH = height_map.get(node.left, 0)
                rightH = height_map.get(node.right, 0)
                if abs(leftH - rightH) > 1:
                    return False
                height_map[node] = max(leftH, rightH) + 1
                last = node
            else:
                cur = node.right
        return True
```

```go [Go]
func isBalanced(root *TreeNode) bool {
    if root == nil { return true }
    stack := []*TreeNode{}
    heightMap := make(map[*TreeNode]int)
    cur, last := root, (*TreeNode)(nil)
    for cur != nil || len(stack) > 0 {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }
        node := stack[len(stack)-1]
        if node.Right == nil || node.Right == last {
            stack = stack[:len(stack)-1]
            leftH := heightMap[node.Left]
            rightH := heightMap[node.Right]
            if abs(leftH-rightH) > 1 { return false }
            heightMap[node] = max(leftH, rightH) + 1
            last = node
        } else {
            cur = node.Right
        }
    }
    return true
}
func max(a, b int) int { if a > b { return a }; return b }
func abs(a int) int { if a < 0 { return -a }; return a }
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
struct TreeNode;
bool isBalanced(struct TreeNode* root) {
    if (!root) return true;
    struct TreeNode* stack[5000];
    int top = 0;
    struct TreeNode* cur = root;
    struct TreeNode* last = NULL;
    int heightMap[5000] = {0}; // 假设节点值不重复，且值非负，用值作为索引简化，实际需用地址映射，此处仅示意
    // 实际实现中需要使用 hash 表，为简化不展开
    // 这里给出伪代码结构
    while (cur || top > 0) {
        while (cur) {
            stack[top++] = cur;
            cur = cur->left;
        }
        struct TreeNode* node = stack[top-1];
        if (!node->right || node->right == last) {
            top--;
            int leftH = 0, rightH = 0;
            // 实际需从 hash 表获取
            if (abs(leftH - rightH) > 1) return false;
            // heightMap[node->val] = max(leftH,rightH)+1;
            last = node;
        } else {
            cur = node->right;
        }
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        if (!root) return true;
        stack<TreeNode*> st;
        unordered_map<TreeNode*, int> heightMap;
        TreeNode* cur = root;
        TreeNode* last = nullptr;
        while (cur || !st.empty()) {
            while (cur) {
                st.push(cur);
                cur = cur->left;
            }
            TreeNode* node = st.top();
            if (!node->right || node->right == last) {
                st.pop();
                int leftH = heightMap[node->left];
                int rightH = heightMap[node->right];
                if (abs(leftH - rightH) > 1) return false;
                heightMap[node] = max(leftH, rightH) + 1;
                last = node;
            } else {
                cur = node->right;
            }
        }
        return true;
    }
};
```

```js [JavaScript]
var isBalanced = function(root) {
    if (!root) return true;
    const stack = [];
    const heightMap = new Map();
    let cur = root, last = null;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        const node = stack[stack.length - 1];
        if (!node.right || node.right === last) {
            stack.pop();
            const leftH = heightMap.get(node.left) || 0;
            const rightH = heightMap.get(node.right) || 0;
            if (Math.abs(leftH - rightH) > 1) return false;
            heightMap.set(node, Math.max(leftH, rightH) + 1);
            last = node;
        } else {
            cur = node.right;
        }
    }
    return true;
};
```

```ts [TypeScript]
function isBalanced(root: TreeNode | null): boolean {
    if (!root) return true;
    const stack: TreeNode[] = [];
    const heightMap = new Map<TreeNode, number>();
    let cur: TreeNode | null = root;
    let last: TreeNode | null = null;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        const node = stack[stack.length - 1];
        if (!node.right || node.right === last) {
            stack.pop();
            const leftH = heightMap.get(node.left) || 0;
            const rightH = heightMap.get(node.right) || 0;
            if (Math.abs(leftH - rightH) > 1) return false;
            heightMap.set(node, Math.max(leftH, rightH) + 1);
            last = node;
        } else {
            cur = node.right;
        }
    }
    return true;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入栈出栈一次。
- **空间复杂度**：`O(n)`，栈和哈希表存储。

---

## 三、总结

| 方法             | 时间复杂度   | 空间复杂度 | 特点                         |
| ---------------- | ------------ | ---------- | ---------------------------- |
| 自顶向下递归     | `O(n log n)` | `O(n)`     | 简单但重复计算，不推荐大数据 |
| 自底向上（推荐） | `O(n)`       | `O(n)`     | 高效，一次遍历，推荐面试使用 |
| 迭代后序         | `O(n)`       | `O(n)`     | 避免递归，适合极深树         |

**推荐**：面试中首选 **方法二（自底向上）**，时间 `O(n)`，代码简洁且高效。如果树深度极大（如 10^5 以上），可考虑方法三。
