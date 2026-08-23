# [LCR 049. 求根节点到叶节点数字之和](https://leetcode.cn/problems/3Etpl5/)



## 一、题目描述

给定一个二叉树的根节点 `root` ，树中每个节点都存放有一个 `0` 到 `9` 之间的数字。

每条从根节点到叶节点的路径都代表一个数字：

- 例如，从根节点到叶节点的路径 `1 -> 2 -> 3` 表示数字 `123`。

计算从根节点到叶节点生成的 **所有数字之和** 。

**叶节点** 是指没有子节点的节点。



**示例 1：**

```
输入：root = [1,2,3]
输出：25
解释：
从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25
```

**示例 2：**

```
输入：root = [4,9,0,5,1]
输出：1026
解释：
从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026
```

**提示：**

- 树中节点的数目在范围 `[1, 1000]` 内
- `0 <= Node.val <= 9`
- 树的深度不超过 `10`



## 二、解答方法

### 2.1 方法一：深度优先（DFS 前序遍历）

1. **思路**

前序遍历，携带「从根到当前节点的路径数字」`cur = cur * 10 + node.val`：

- 遇到叶子节点（左右孩子都为空），累加 `cur`；
- 否则递归处理左右子树。

时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }
    private int dfs(TreeNode node, int cur) {
        if (node == null) return 0;
        cur = cur * 10 + node.val;
        if (node.left == null && node.right == null) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);
    }
}
```

```python [Python]
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node, cur):
            if not node:
                return 0
            cur = cur * 10 + node.val
            if not node.left and not node.right:
                return cur
            return dfs(node.left, cur) + dfs(node.right, cur)
        return dfs(root, 0)
```

```cpp [C++]
class Solution {
public:
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }
private:
    int dfs(TreeNode* node, int cur) {
        if (!node) return 0;
        cur = cur * 10 + node->val;
        if (!node->left && !node->right) return cur;
        return dfs(node->left, cur) + dfs(node->right, cur);
    }
};
```

```go [Go]
func sumNumbers(root *TreeNode) int {
    var dfs func(node *TreeNode, cur int) int
    dfs = func(node *TreeNode, cur int) int {
        if node == nil {
            return 0
        }
        cur = cur*10 + node.Val
        if node.Left == nil && node.Right == nil {
            return cur
        }
        return dfs(node.Left, cur) + dfs(node.Right, cur)
    }
    return dfs(root, 0)
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    const dfs = (node, cur) => {
        if (!node) return 0;
        cur = cur * 10 + node.val;
        if (!node.left && !node.right) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);
    };
    return dfs(root, 0);
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

static int dfs(struct TreeNode* node, int cur) {
    if (!node) return 0;
    cur = cur * 10 + node->val;
    if (!node->left && !node->right) return cur;
    return dfs(node->left, cur) + dfs(node->right, cur);
}

int sumNumbers(struct TreeNode* root) {
    return dfs(root, 0);
}
```

```ts [TypeScript]
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function sumNumbers(root: TreeNode | null): number {
    const dfs = (node: TreeNode | null, cur: number): number => {
        if (!node) return 0;
        cur = cur * 10 + node.val;
        if (!node.left && !node.right) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);
    };
    return dfs(root, 0);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈。

### 2.2 方法二：广度优先（BFS 双队列）

1. **思路**

层序遍历时维护两个队列：节点队列和「对应路径数字」队列。节点出队时把路径数字同步取出；若该节点是叶子则累加；否则把左右孩子连同更新后的路径数字入队。时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int sumNumbers(TreeNode root) {
        if (root == null) return 0;
        int ans = 0;
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> sums = new ArrayDeque<>();
        nodes.offer(root);
        sums.offer(root.val);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.poll();
            int cur = sums.poll();
            if (node.left == null && node.right == null) ans += cur;
            if (node.left != null) { nodes.offer(node.left); sums.offer(cur * 10 + node.left.val); }
            if (node.right != null) { nodes.offer(node.right); sums.offer(cur * 10 + node.right.val); }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        ans = 0
        nodes = [root]
        sums = [root.val]
        while nodes:
            node = nodes.pop(0)
            cur = sums.pop(0)
            if not node.left and not node.right:
                ans += cur
            if node.left:
                nodes.append(node.left)
                sums.append(cur * 10 + node.left.val)
            if node.right:
                nodes.append(node.right)
                sums.append(cur * 10 + node.right.val)
        return ans
```

```cpp [C++]
class Solution {
public:
    int sumNumbers(TreeNode* root) {
        if (!root) return 0;
        int ans = 0;
        queue<TreeNode*> nodes;
        queue<int> sums;
        nodes.push(root);
        sums.push(root->val);
        while (!nodes.empty()) {
            TreeNode* node = nodes.front(); nodes.pop();
            int cur = sums.front(); sums.pop();
            if (!node->left && !node->right) ans += cur;
            if (node->left) { nodes.push(node->left); sums.push(cur * 10 + node->left->val); }
            if (node->right) { nodes.push(node->right); sums.push(cur * 10 + node->right->val); }
        }
        return ans;
    }
};
```

```go [Go]
func sumNumbers(root *TreeNode) int {
    if root == nil {
        return 0
    }
    ans := 0
    nodes := []*TreeNode{root}
    sums := []int{root.Val}
    for len(nodes) > 0 {
        node := nodes[0]
        nodes = nodes[1:]
        cur := sums[0]
        sums = sums[1:]
        if node.Left == nil && node.Right == nil {
            ans += cur
        }
        if node.Left != nil {
            nodes = append(nodes, node.Left)
            sums = append(sums, cur*10+node.Left.Val)
        }
        if node.Right != nil {
            nodes = append(nodes, node.Right)
            sums = append(sums, cur*10+node.Right.Val)
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    if (!root) return 0;
    let ans = 0;
    const nodes = [root];
    const sums = [root.val];
    while (nodes.length) {
        const node = nodes.shift();
        const cur = sums.shift();
        if (!node.left && !node.right) ans += cur;
        if (node.left) { nodes.push(node.left); sums.push(cur * 10 + node.left.val); }
        if (node.right) { nodes.push(node.right); sums.push(cur * 10 + node.right.val); }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int sumNumbers(struct TreeNode* root) {
    if (!root) return 0;
    struct TreeNode** nodes = (struct TreeNode**)malloc(1005 * sizeof(struct TreeNode*));
    int* sums = (int*)malloc(1005 * sizeof(int));
    int head = 0, tail = 0;
    nodes[tail] = root;
    sums[tail++] = root->val;
    int ans = 0;
    while (head < tail) {
        struct TreeNode* node = nodes[head];
        int cur = sums[head++];
        if (!node->left && !node->right) ans += cur;
        if (node->left) { nodes[tail] = node->left; sums[tail++] = cur * 10 + node->left->val; }
        if (node->right) { nodes[tail] = node->right; sums[tail++] = cur * 10 + node->right->val; }
    }
    free(nodes);
    free(sums);
    return ans;
}
```

```ts [TypeScript]
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function sumNumbers(root: TreeNode | null): number {
    if (!root) return 0;
    let ans = 0;
    const nodes: TreeNode[] = [root];
    const sums: number[] = [root.val];
    while (nodes.length) {
        const node = nodes.shift()!;
        const cur = sums.shift()!;
        if (!node.left && !node.right) ans += cur;
        if (node.left) { nodes.push(node.left); sums.push(cur * 10 + node.left.val); }
        if (node.right) { nodes.push(node.right); sums.push(cur * 10 + node.right.val); }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| DFS 前序 | `O(n)` | `O(h)` | 简洁，推荐 |
| BFS 双队列 | `O(n)` | `O(n)` | 迭代实现 |

路径数字的累加规则 `cur = cur * 10 + val` 是本题核心，DFS 在叶子处收束求和，BFS 则同步维护每个节点对应的路径数字。

