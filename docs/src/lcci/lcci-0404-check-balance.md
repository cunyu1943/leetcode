# [面试题 04.04. 检查平衡性](https://leetcode.cn/problems/check-balance-lcci/)

## 一、题目描述

实现一个函数，检查二叉树是否平衡。在这个问题中，平衡树的定义如下：任意一个节点，其两棵子树的高度差不超过 1。

**示例 1：**

```
给定二叉树 [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7
返回 true。
```

**示例 2：**

```
给定二叉树 [1,2,2,3,3,null,null,4,4]
      1
     / \
    2   2
   / \
  3   3
 / \
4   4
返回 false。
```

**提示：**

- 树中节点数在 `[0, 5000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。

---

## 二、解答方法

### 2.1 方法一：自顶向下递归（先判断当前节点，再递归子树）

**1. 思路**

定义函数 `height(node)` 返回节点的高度（空节点为 0）。对于当前节点，先计算左右子树的高度差，若大于 1 则返回 `false`；否则递归判断左右子树是否各自平衡。缺点是重复计算高度，时间复杂度较高（`O(n log n)`）。

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
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        if not root:
            return True
        left_h = self.height(root.left)
        right_h = self.height(root.right)
        if abs(left_h - right_h) > 1:
            return False
        return self.isBalanced(root.left) and self.isBalanced(root.right)

    def height(self, node: TreeNode) -> int:
        if not node:
            return 0
        return max(self.height(node.left), self.height(node.right)) + 1
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
func isBalanced(root *TreeNode) bool {
    if root == nil {
        return true
    }
    leftH := height(root.Left)
    rightH := height(root.Right)
    if abs(leftH-rightH) > 1 {
        return false
    }
    return isBalanced(root.Left) && isBalanced(root.Right)
}
func height(node *TreeNode) int {
    if node == nil {
        return 0
    }
    return max(height(node.Left), height(node.Right)) + 1
}
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
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

```javascript [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
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

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，每个节点都要计算高度，而高度函数递归遍历子树，存在大量重复计算。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：自底向上（优化，推荐）

**1. 思路**

在递归计算高度的同时判断是否平衡。如果子树不平衡，直接返回 `-1` 标记，终止计算。这样每个节点只访问一次，时间复杂度 `O(n)`。

**2. 代码实现**

:::::: code-group

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
        if not node:
            return 0
        left_h = self.height(node.left)
        if left_h == -1:
            return -1
        right_h = self.height(node.right)
        if right_h == -1:
            return -1
        if abs(left_h - right_h) > 1:
            return -1
        return max(left_h, right_h) + 1
```

```go [Go]
func isBalanced(root *TreeNode) bool {
    return height(root) != -1
}
func height(node *TreeNode) int {
    if node == nil {
        return 0
    }
    leftH := height(node.Left)
    if leftH == -1 {
        return -1
    }
    rightH := height(node.Right)
    if rightH == -1 {
        return -1
    }
    if abs(leftH-rightH) > 1 {
        return -1
    }
    return max(leftH, rightH) + 1
}
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}
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

```javascript [JavaScript]
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

```typescript [TypeScript]
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

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个节点只访问一次。
- **空间复杂度**：`O(n)`，递归栈深度。

---

### 2.3 方法三：迭代后序遍历（避免递归）

**1. 思路**

使用栈模拟后序遍历，在访问节点时已经得到左右子树的高度，从而判断是否平衡。适合树深度极大、需要避免递归栈溢出的场景。

**2. 代码实现**

:::::: code-group

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
        if not root:
            return True
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
                left_h = height_map.get(node.left, 0)
                right_h = height_map.get(node.right, 0)
                if abs(left_h - right_h) > 1:
                    return False
                height_map[node] = max(left_h, right_h) + 1
                last = node
            else:
                cur = node.right
        return True
```

```go [Go]
func isBalanced(root *TreeNode) bool {
    if root == nil {
        return true
    }
    stack := []*TreeNode{}
    heightMap := map[*TreeNode]int{}
    cur := root
    var last *TreeNode
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
            if abs(leftH-rightH) > 1 {
                return false
            }
            heightMap[node] = max(leftH, rightH) + 1
            last = node
        } else {
            cur = node.Right
        }
    }
    return true
}
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}
```

```c [C]
// 迭代后序遍历在C语言中实现较复杂，需要手动维护栈和高度映射，此处省略完整实现。
// 实际生产可使用递归方法。
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

```javascript [JavaScript]
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

```typescript [TypeScript]
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

::::::

**3. 复杂度分析**

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
