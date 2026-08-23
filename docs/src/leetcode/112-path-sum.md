# [112. 路径总和](https://leetcode.cn/problems/path-sum/)

## 一、题目描述

给你二叉树的根节点 `root` 和一个表示目标和的整数 `targetSum`。判断该树中是否存在 **根节点到叶子节点** 的路径，这条路径上所有节点值相加等于目标和 `targetSum`。

**说明：** 叶子节点是指没有子节点的节点。

**示例 1：**

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
```

**示例 2：**

```
输入：root = [1,2,3], targetSum = 5
输出：false
```

**示例 3：**

```
输入：root = [], targetSum = 0
输出：false
```

**提示：**

- 树中节点数在范围 `[0, 5000]` 内
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

## 二、解答方法

### 2.1 方法一：递归（深度优先）

1. **思路**

从根节点开始，每深入一层就将 `targetSum` 减去当前节点值。当到达叶子节点时，检查剩余值是否等于 0。递归终止条件：
- 空节点返回 `false`
- 叶子节点（无左右孩子）返回 `targetSum == node.val`
- 非叶子节点，递归检查左右子树，目标值减去当前节点值

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }
        int remain = targetSum - root.val;
        return hasPathSum(root.left, remain) || hasPathSum(root.right, remain);
    }
}
```

```python [Python]
class Solution:
    def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
        if not root: return False
        if not root.left and not root.right:
            return targetSum == root.val
        remain = targetSum - root.val
        return self.hasPathSum(root.left, remain) or self.hasPathSum(root.right, remain)
```

```go [Go]
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil { return false }
    if root.Left == nil && root.Right == nil {
        return targetSum == root.Val
    }
    remain := targetSum - root.Val
    return hasPathSum(root.Left, remain) || hasPathSum(root.Right, remain)
}
```

```c [C]
bool hasPathSum(struct TreeNode* root, int targetSum) {
    if (!root) return false;
    if (!root->left && !root->right) {
        return targetSum == root->val;
    }
    int remain = targetSum - root->val;
    return hasPathSum(root->left, remain) || hasPathSum(root->right, remain);
}
```

```cpp [C++]
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) {
            return targetSum == root->val;
        }
        int remain = targetSum - root->val;
        return hasPathSum(root->left, remain) || hasPathSum(root->right, remain);
    }
};
```

```js [JavaScript]
var hasPathSum = function(root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }
    const remain = targetSum - root.val;
    return hasPathSum(root.left, remain) || hasPathSum(root.right, remain);
};
```

```ts [TypeScript]
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }
    const remain = targetSum - root.val;
    return hasPathSum(root.left, remain) || hasPathSum(root.right, remain);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度（最坏为链表）。

---

### 2.2 方法二：BFS（队列，记录路径和）

1. **思路**

使用队列进行广度优先遍历，同时记录每个节点对应的当前路径和。当遇到叶子节点时，检查其路径和是否等于 `targetSum`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        Queue<TreeNode> nodeQ = new LinkedList<>();
        Queue<Integer> sumQ = new LinkedList<>();
        nodeQ.offer(root);
        sumQ.offer(root.val);
        while (!nodeQ.isEmpty()) {
            TreeNode node = nodeQ.poll();
            int curSum = sumQ.poll();
            if (node.left == null && node.right == null) {
                if (curSum == targetSum) return true;
                continue;
            }
            if (node.left != null) {
                nodeQ.offer(node.left);
                sumQ.offer(curSum + node.left.val);
            }
            if (node.right != null) {
                nodeQ.offer(node.right);
                sumQ.offer(curSum + node.right.val);
            }
        }
        return false;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
        if not root: return False
        node_q = deque([root])
        sum_q = deque([root.val])
        while node_q:
            node = node_q.popleft()
            cur_sum = sum_q.popleft()
            if not node.left and not node.right:
                if cur_sum == targetSum: return True
            if node.left:
                node_q.append(node.left)
                sum_q.append(cur_sum + node.left.val)
            if node.right:
                node_q.append(node.right)
                sum_q.append(cur_sum + node.right.val)
        return False
```

```go [Go]
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil { return false }
    nodeQ := []*TreeNode{root}
    sumQ := []int{root.Val}
    for len(nodeQ) > 0 {
        node := nodeQ[0]; nodeQ = nodeQ[1:]
        curSum := sumQ[0]; sumQ = sumQ[1:]
        if node.Left == nil && node.Right == nil {
            if curSum == targetSum { return true }
            continue
        }
        if node.Left != nil {
            nodeQ = append(nodeQ, node.Left)
            sumQ = append(sumQ, curSum + node.Left.Val)
        }
        if node.Right != nil {
            nodeQ = append(nodeQ, node.Right)
            sumQ = append(sumQ, curSum + node.Right.Val)
        }
    }
    return false
}
```

```c [C]
bool hasPathSum(struct TreeNode* root, int targetSum) {
    if (!root) return false;
    struct TreeNode* nodeQ[5000];
    int sumQ[5000];
    int head = 0, tail = 0;
    nodeQ[tail] = root; sumQ[tail] = root->val; tail++;
    while (head < tail) {
        struct TreeNode* node = nodeQ[head];
        int curSum = sumQ[head];
        head++;
        if (!node->left && !node->right) {
            if (curSum == targetSum) return true;
            continue;
        }
        if (node->left) {
            nodeQ[tail] = node->left;
            sumQ[tail] = curSum + node->left->val;
            tail++;
        }
        if (node->right) {
            nodeQ[tail] = node->right;
            sumQ[tail] = curSum + node->right->val;
            tail++;
        }
    }
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        queue<TreeNode*> nodeQ;
        queue<int> sumQ;
        nodeQ.push(root); sumQ.push(root->val);
        while (!nodeQ.empty()) {
            TreeNode* node = nodeQ.front(); nodeQ.pop();
            int curSum = sumQ.front(); sumQ.pop();
            if (!node->left && !node->right) {
                if (curSum == targetSum) return true;
                continue;
            }
            if (node->left) {
                nodeQ.push(node->left);
                sumQ.push(curSum + node->left->val);
            }
            if (node->right) {
                nodeQ.push(node->right);
                sumQ.push(curSum + node->right->val);
            }
        }
        return false;
    }
};
```

```js [JavaScript]
var hasPathSum = function(root, targetSum) {
    if (!root) return false;
    const nodeQ = [root];
    const sumQ = [root.val];
    while (nodeQ.length) {
        const node = nodeQ.shift();
        const curSum = sumQ.shift();
        if (!node.left && !node.right) {
            if (curSum === targetSum) return true;
            continue;
        }
        if (node.left) {
            nodeQ.push(node.left);
            sumQ.push(curSum + node.left.val);
        }
        if (node.right) {
            nodeQ.push(node.right);
            sumQ.push(curSum + node.right.val);
        }
    }
    return false;
};
```

```ts [TypeScript]
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;
    const nodeQ: TreeNode[] = [root];
    const sumQ: number[] = [root.val];
    while (nodeQ.length) {
        const node = nodeQ.shift()!;
        const curSum = sumQ.shift()!;
        if (!node.left && !node.right) {
            if (curSum === targetSum) return true;
            continue;
        }
        if (node.left) {
            nodeQ.push(node.left);
            sumQ.push(curSum + node.left.val);
        }
        if (node.right) {
            nodeQ.push(node.right);
            sumQ.push(curSum + node.right.val);
        }
    }
    return false;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入队出队一次。
- **空间复杂度**：`O(n)`，队列存储节点和路径和。

---

### 2.3 方法三：DFS 迭代（栈，记录路径和）

1. **思路**

使用栈进行深度优先遍历，同时记录每个节点对应的路径和。与 BFS 类似，但使用栈后进先出，也能在遍历到叶子节点时检查路径和。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        Stack<TreeNode> nodeStack = new Stack<>();
        Stack<Integer> sumStack = new Stack<>();
        nodeStack.push(root);
        sumStack.push(root.val);
        while (!nodeStack.isEmpty()) {
            TreeNode node = nodeStack.pop();
            int curSum = sumStack.pop();
            if (node.left == null && node.right == null) {
                if (curSum == targetSum) return true;
                continue;
            }
            if (node.right != null) {
                nodeStack.push(node.right);
                sumStack.push(curSum + node.right.val);
            }
            if (node.left != null) {
                nodeStack.push(node.left);
                sumStack.push(curSum + node.left.val);
            }
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
        if not root: return False
        stack = [(root, root.val)]
        while stack:
            node, cur_sum = stack.pop()
            if not node.left and not node.right:
                if cur_sum == targetSum: return True
            if node.right:
                stack.append((node.right, cur_sum + node.right.val))
            if node.left:
                stack.append((node.left, cur_sum + node.left.val))
        return False
```

```go [Go]
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil { return false }
    nodeStack := []*TreeNode{root}
    sumStack := []int{root.Val}
    for len(nodeStack) > 0 {
        node := nodeStack[len(nodeStack)-1]; nodeStack = nodeStack[:len(nodeStack)-1]
        curSum := sumStack[len(sumStack)-1]; sumStack = sumStack[:len(sumStack)-1]
        if node.Left == nil && node.Right == nil {
            if curSum == targetSum { return true }
            continue
        }
        if node.Right != nil {
            nodeStack = append(nodeStack, node.Right)
            sumStack = append(sumStack, curSum + node.Right.Val)
        }
        if node.Left != nil {
            nodeStack = append(nodeStack, node.Left)
            sumStack = append(sumStack, curSum + node.Left.Val)
        }
    }
    return false
}
```

```c [C]
bool hasPathSum(struct TreeNode* root, int targetSum) {
    if (!root) return false;
    struct TreeNode* nodeStack[5000];
    int sumStack[5000];
    int top = 0;
    nodeStack[top] = root; sumStack[top] = root->val; top++;
    while (top > 0) {
        top--;
        struct TreeNode* node = nodeStack[top];
        int curSum = sumStack[top];
        if (!node->left && !node->right) {
            if (curSum == targetSum) return true;
            continue;
        }
        if (node->right) {
            nodeStack[top] = node->right;
            sumStack[top] = curSum + node->right->val;
            top++;
        }
        if (node->left) {
            nodeStack[top] = node->left;
            sumStack[top] = curSum + node->left->val;
            top++;
        }
    }
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        stack<TreeNode*> nodeStack;
        stack<int> sumStack;
        nodeStack.push(root); sumStack.push(root->val);
        while (!nodeStack.empty()) {
            TreeNode* node = nodeStack.top(); nodeStack.pop();
            int curSum = sumStack.top(); sumStack.pop();
            if (!node->left && !node->right) {
                if (curSum == targetSum) return true;
                continue;
            }
            if (node->right) {
                nodeStack.push(node->right);
                sumStack.push(curSum + node->right->val);
            }
            if (node->left) {
                nodeStack.push(node->left);
                sumStack.push(curSum + node->left->val);
            }
        }
        return false;
    }
};
```

```js [JavaScript]
var hasPathSum = function(root, targetSum) {
    if (!root) return false;
    const stack = [[root, root.val]];
    while (stack.length) {
        const [node, curSum] = stack.pop();
        if (!node.left && !node.right) {
            if (curSum === targetSum) return true;
            continue;
        }
        if (node.right) stack.push([node.right, curSum + node.right.val]);
        if (node.left) stack.push([node.left, curSum + node.left.val]);
    }
    return false;
};
```

```ts [TypeScript]
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;
    const stack: [TreeNode, number][] = [[root, root.val]];
    while (stack.length) {
        const [node, curSum] = stack.pop()!;
        if (!node.left && !node.right) {
            if (curSum === targetSum) return true;
            continue;
        }
        if (node.right) stack.push([node.right, curSum + node.right.val]);
        if (node.left) stack.push([node.left, curSum + node.left.val]);
    }
    return false;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入栈出栈一次。
- **空间复杂度**：`O(n)`，栈存储节点和路径和。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                     |
| -------------- | ---------- | ---------- | ------------------------ |
| 递归（DFS）    | `O(n)`     | `O(n)`     | 代码最简洁，推荐         |
| BFS（队列）    | `O(n)`     | `O(n)`     | 按层遍历，找到叶子即返回 |
| 迭代 DFS（栈） | `O(n)`     | `O(n)`     | 避免递归，适合极深树     |

**推荐**：面试中首选 **递归方法（方法一）**，代码简洁且易理解。若树深度极大可能导致递归栈溢出，则选择 **迭代 DFS（方法三）**。
