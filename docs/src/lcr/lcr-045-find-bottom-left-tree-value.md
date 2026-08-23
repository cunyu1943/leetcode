# [LCR 045. 找树左下角的值](https://leetcode.cn/problems/LwUNpT/)



## 一、题目描述

给定一个二叉树的 **根节点** `root`，请找出该二叉树的 **最底层 最左边** 节点的值。

假设二叉树中至少有一个节点。



**示例 1：**

```
输入: root = [2,1,3]
输出: 1
```

**示例 2：**

```
输入: root = [1,2,3,4,null,5,6,null,null,7]
输出: 7
```

**提示：**

- 二叉树的节点个数的范围是 `[1, 10⁴]`
- `-2³¹ <= Node.val <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：层序遍历（BFS，从右往左）

1. **思路**

用队列按层遍历。**从右往左** 入队（先右后左），则最后一个出队的节点就是「最底层最左边」的节点。也可以用普通层序记录每层第一个节点。

更直观的写法：正常从左往右层序遍历，维护每层第一个节点；最后一层的第一个节点即答案。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findBottomLeftValue(TreeNode root) {
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        TreeNode res = root;
        while (!q.isEmpty()) {
            res = q.poll();
            if (res.right != null) q.offer(res.right); // 先右后左
            if (res.left != null) q.offer(res.left);
        }
        return res.val;
    }
}
```

```python [Python]
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        q = [root]
        res = root
        while q:
            res = q.pop(0)
            if res.right:
                q.append(res.right)
            if res.left:
                q.append(res.left)
        return res.val
```

```cpp [C++]
class Solution {
public:
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* res = root;
        while (!q.empty()) {
            res = q.front();
            q.pop();
            if (res->right) q.push(res->right);
            if (res->left) q.push(res->left);
        }
        return res->val;
    }
};
```

```go [Go]
func findBottomLeftValue(root *TreeNode) int {
    q := []*TreeNode{root}
    res := root
    for len(q) > 0 {
        res = q[0]
        q = q[1:]
        if res.Right != nil {
            q = append(q, res.Right)
        }
        if res.Left != nil {
            q = append(q, res.Left)
        }
    }
    return res.Val
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    const q = [root];
    let res = root;
    while (q.length) {
        res = q.shift();
        if (res.right) q.push(res.right);
        if (res.left) q.push(res.left);
    }
    return res.val;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int findBottomLeftValue(struct TreeNode* root) {
    struct TreeNode** q = (struct TreeNode**)malloc(10005 * sizeof(struct TreeNode*));
    int head = 0, tail = 0;
    q[tail++] = root;
    struct TreeNode* res = root;
    while (head < tail) {
        res = q[head++];
        if (res->right) q[tail++] = res->right;
        if (res->left) q[tail++] = res->left;
    }
    free(q);
    return res->val;
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

function findBottomLeftValue(root: TreeNode | null): number {
    const q: TreeNode[] = [root!];
    let res: TreeNode = root!;
    while (q.length) {
        res = q.shift()!;
        if (res.right) q.push(res.right);
        if (res.left) q.push(res.left);
    }
    return res.val;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，队列。

### 2.2 方法二：DFS 记录最深最左

1. **思路**

先序遍历（先左后右），记录当前深度。当到达比已记录深度更深的节点时更新答案，因为先访问左孩子，同一深度最先到达的是最左节点。时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int maxDepth = -1, ans = 0;
    public int findBottomLeftValue(TreeNode root) {
        dfs(root, 0);
        return ans;
    }
    private void dfs(TreeNode node, int d) {
        if (node == null) return;
        if (d > maxDepth) { maxDepth = d; ans = node.val; }
        dfs(node.left, d + 1);
        dfs(node.right, d + 1);
    }
}
```

```python [Python]
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        max_depth, ans = -1, 0
        def dfs(node, d):
            nonlocal max_depth, ans
            if not node:
                return
            if d > max_depth:
                max_depth = d
                ans = node.val
            dfs(node.left, d + 1)
            dfs(node.right, d + 1)
        dfs(root, 0)
        return ans
```

```cpp [C++]
class Solution {
public:
    int findBottomLeftValue(TreeNode* root) {
        dfs(root, 0);
        return ans;
    }
private:
    int maxDepth = -1, ans = 0;
    void dfs(TreeNode* node, int d) {
        if (!node) return;
        if (d > maxDepth) { maxDepth = d; ans = node->val; }
        dfs(node->left, d + 1);
        dfs(node->right, d + 1);
    }
};
```

```go [Go]
func findBottomLeftValue(root *TreeNode) int {
    maxDepth, ans := -1, 0
    var dfs func(node *TreeNode, d int)
    dfs = func(node *TreeNode, d int) {
        if node == nil {
            return
        }
        if d > maxDepth {
            maxDepth = d
            ans = node.Val
        }
        dfs(node.Left, d+1)
        dfs(node.Right, d+1)
    }
    dfs(root, 0)
    return ans
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    let maxDepth = -1, ans = 0;
    const dfs = (node, d) => {
        if (!node) return;
        if (d > maxDepth) { maxDepth = d; ans = node.val; }
        dfs(node.left, d + 1);
        dfs(node.right, d + 1);
    };
    dfs(root, 0);
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

static int maxDepth, ans;

static void dfs(struct TreeNode* node, int d) {
    if (!node) return;
    if (d > maxDepth) { maxDepth = d; ans = node->val; }
    dfs(node->left, d + 1);
    dfs(node->right, d + 1);
}

int findBottomLeftValue(struct TreeNode* root) {
    maxDepth = -1;
    dfs(root, 0);
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

function findBottomLeftValue(root: TreeNode | null): number {
    let maxDepth = -1, ans = 0;
    const dfs = (node: TreeNode | null, d: number) => {
        if (!node) return;
        if (d > maxDepth) { maxDepth = d; ans = node.val; }
        dfs(node.left, d + 1);
        dfs(node.right, d + 1);
    };
    dfs(root, 0);
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| BFS 从右往左 | `O(n)` | `O(n)` | 巧妙：最后出队即答案 |
| DFS 记录深度 | `O(n)` | `O(h)` | 空间更优 |

「从右往左层序遍历，最后出队的节点即最左最深节点」是一招巧妙的 BFS 技巧；DFS 则通过先访问左子树保证「最深且最左」。

