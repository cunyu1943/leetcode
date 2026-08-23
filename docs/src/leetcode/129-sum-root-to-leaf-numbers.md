# [129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)



## 一、题目描述

给你一个二叉树的根节点 `root`，树中每个节点都存放有一个 `0` 到 `9` 之间的数字。

每条从根节点到叶节点的路径都代表一个数字：

- 例如，从根节点到叶节点的路径 `1 -> 2 -> 3` 表示数字 `123`。

计算从根节点到叶节点生成的 **所有数字之和**。

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

### 2.1 方法一：深度优先搜索（DFS）

1. **思路**

从根节点出发向下遍历，每经过一个节点，就把当前路径上已组成的数字「乘 10 再加上当前节点值」，得到到达该节点的路径数字。

- 使用一个递归函数 `dfs(node, prevNum)`，`prevNum` 表示从根到父节点已组成的数字；
- 到达当前节点时，更新 `curNum = prevNum * 10 + node.val`；
- 若当前节点是叶子节点（左右子节点均为空），将 `curNum` 累加进结果；
- 否则递归遍历左右子树，传入 `curNum`。

这是最自然的「自顶向下传递路径值」的写法。

2. **代码实现**

::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    private int sum = 0;

    public int sumNumbers(TreeNode root) {
        dfs(root, 0);
        return sum;
    }

    private void dfs(TreeNode node, int prev) {
        if (node == null) return;
        int cur = prev * 10 + node.val;
        if (node.left == null && node.right == null) {
            sum += cur;
            return;
        }
        dfs(node.left, cur);
        dfs(node.right, cur);
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node: Optional[TreeNode], prev: int) -> int:
            if not node:
                return 0
            cur = prev * 10 + node.val
            if not node.left and not node.right:
                return cur
            return dfs(node.left, cur) + dfs(node.right, cur)

        return dfs(root, 0)
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }

    int dfs(TreeNode* node, int prev) {
        if (!node) return 0;
        int cur = prev * 10 + node->val;
        if (!node->left && !node->right) return cur;
        return dfs(node->left, cur) + dfs(node->right, cur);
    }
};
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
func sumNumbers(root *TreeNode) int {
    var dfs func(*TreeNode, int) int
    dfs = func(node *TreeNode, prev int) int {
        if node == nil {
            return 0
        }
        cur := prev*10 + node.Val
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
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    const dfs = (node, prev) => {
        if (!node) return 0;
        const cur = prev * 10 + node.val;
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

int dfs(struct TreeNode* node, int prev) {
    if (!node) return 0;
    int cur = prev * 10 + node->val;
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
    const dfs = (node: TreeNode | null, prev: number): number => {
        if (!node) return 0;
        const cur = prev * 10 + node.val;
        if (!node.left && !node.right) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);
    };
    return dfs(root, 0);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为节点数，每个节点访问一次。
- **空间复杂度**：`O(h)`，递归栈深度，最坏情况下树退化为链表为 `O(n)`，平衡树为 `O(log n)`。

### 2.2 方法二：广度优先搜索（BFS）

1. **思路**

用两个队列分别保存「当前节点」和「到达当前节点的路径数字」，逐层向下扩展：

- 初始将根节点与数字 `0` 分别入队；
- 每次出队一个节点及其路径数字，计算 `cur = prev * 10 + node.val`；
- 若为叶子节点，累加到总和；否则把存在的子节点及其对应的 `cur` 入队。

BFS 避免了递归，使用显式队列。

2. **代码实现**

::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int sumNumbers(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> nodeQ = new LinkedList<>();
        Queue<Integer> numQ = new LinkedList<>();
        nodeQ.offer(root);
        numQ.offer(0);
        int sum = 0;
        while (!nodeQ.isEmpty()) {
            TreeNode node = nodeQ.poll();
            int prev = numQ.poll();
            int cur = prev * 10 + node.val;
            if (node.left == null && node.right == null) {
                sum += cur;
            } else {
                if (node.left != null) {
                    nodeQ.offer(node.left);
                    numQ.offer(cur);
                }
                if (node.right != null) {
                    nodeQ.offer(node.right);
                    numQ.offer(cur);
                }
            }
        }
        return sum;
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        from collections import deque
        if not root:
            return 0
        node_q = deque([root])
        num_q = deque([0])
        total = 0
        while node_q:
            node = node_q.popleft()
            prev = num_q.popleft()
            cur = prev * 10 + node.val
            if not node.left and not node.right:
                total += cur
            else:
                if node.left:
                    node_q.append(node.left)
                    num_q.append(cur)
                if node.right:
                    node_q.append(node.right)
                    num_q.append(cur)
        return total
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int sumNumbers(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> nodeQ;
        queue<int> numQ;
        nodeQ.push(root);
        numQ.push(0);
        int sum = 0;
        while (!nodeQ.empty()) {
            TreeNode* node = nodeQ.front(); nodeQ.pop();
            int prev = numQ.front(); numQ.pop();
            int cur = prev * 10 + node->val;
            if (!node->left && !node->right) {
                sum += cur;
            } else {
                if (node->left) { nodeQ.push(node->left); numQ.push(cur); }
                if (node->right) { nodeQ.push(node->right); numQ.push(cur); }
            }
        }
        return sum;
    }
};
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
func sumNumbers(root *TreeNode) int {
    if root == nil {
        return 0
    }
    type pair struct {
        node *TreeNode
        num  int
    }
    queue := []pair{{root, 0}}
    sum := 0
    for len(queue) > 0 {
        p := queue[0]
        queue = queue[1:]
        cur := p.num*10 + p.node.Val
        if p.node.Left == nil && p.node.Right == nil {
            sum += cur
        } else {
            if p.node.Left != nil {
                queue = append(queue, pair{p.node.Left, cur})
            }
            if p.node.Right != nil {
                queue = append(queue, pair{p.node.Right, cur})
            }
        }
    }
    return sum
}
```

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    if (!root) return 0;
    const nodeQ = [root];
    const numQ = [0];
    let sum = 0;
    while (nodeQ.length) {
        const node = nodeQ.shift();
        const prev = numQ.shift();
        const cur = prev * 10 + node.val;
        if (!node.left && !node.right) {
            sum += cur;
        } else {
            if (node.left) { nodeQ.push(node.left); numQ.push(cur); }
            if (node.right) { nodeQ.push(node.right); numQ.push(cur); }
        }
    }
    return sum;
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
    struct TreeNode** nodeQ = (struct TreeNode**)malloc(1001 * sizeof(struct TreeNode*));
    int* numQ = (int*)malloc(1001 * sizeof(int));
    int qh = 0, qt = 0;
    nodeQ[qt] = root; numQ[qt] = 0; qt++;
    int sum = 0;
    while (qh < qt) {
        struct TreeNode* node = nodeQ[qh];
        int prev = numQ[qh]; qh++;
        int cur = prev * 10 + node->val;
        if (!node->left && !node->right) {
            sum += cur;
        } else {
            if (node->left) { nodeQ[qt] = node->left; numQ[qt] = cur; qt++; }
            if (node->right) { nodeQ[qt] = node->right; numQ[qt] = cur; qt++; }
        }
    }
    free(nodeQ); free(numQ);
    return sum;
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
    const nodeQ: (TreeNode | null)[] = [root];
    const numQ: number[] = [0];
    let sum = 0;
    while (nodeQ.length) {
        const node = nodeQ.shift()!;
        const prev = numQ.shift()!;
        const cur = prev * 10 + node.val;
        if (!node.left && !node.right) {
            sum += cur;
        } else {
            if (node.left) { nodeQ.push(node.left); numQ.push(cur); }
            if (node.right) { nodeQ.push(node.right); numQ.push(cur); }
        }
    }
    return sum;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入队、出队各一次。
- **空间复杂度**：`O(n)`，队列最多存储一层的节点。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| DFS（递归） | `O(n)` | `O(h)` | 代码最简洁，推荐 |
| BFS（队列） | `O(n)` | `O(n)` | 非递归，避免栈溢出风险 |

其中 `n` 为节点数，`h` 为树的高度。两种思路本质相同，都是「自顶向下传递路径数字」。
