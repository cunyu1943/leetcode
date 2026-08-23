# [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

## 一、题目描述

给你二叉树的根节点 `root`，返回其节点值的 **层序遍历**。（即逐层地，从左到右访问所有节点）。

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```

**示例 2：**

```
输入：root = [1]
输出：[[1]]
```

**示例 3：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点数目在范围 `[0, 2000]` 内
- `-1000 <= Node.val <= 1000`

## 二、解答方法

### 2.1 方法一：广度优先搜索（BFS / 队列）

1. **思路**

使用队列进行层序遍历。每一轮开始前，记录当前队列长度（即当前层节点数），然后循环弹出该层所有节点，将它们的值加入当前层结果列表，同时将它们的非空子节点依次入队。重复直到队列为空。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root: return []
        res, q = [], deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res
```

```go [Go]
func levelOrder(root *TreeNode) [][]int {
    if root == nil { return [][]int{} }
    res := [][]int{}
    q := []*TreeNode{root}
    for len(q) > 0 {
        level := []int{}
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            level = append(level, node.Val)
            if node.Left != nil { q = append(q, node.Left) }
            if node.Right != nil { q = append(q, node.Right) }
        }
        res = append(res, level)
    }
    return res
}
```

```c [C]
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    if (!root) { *returnSize = 0; return NULL; }
    struct TreeNode* q[2000];
    int head = 0, tail = 0;
    q[tail++] = root;
    int** res = (int**)malloc(2000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2000 * sizeof(int));
    *returnSize = 0;
    while (head < tail) {
        int size = tail - head;
        int* level = (int*)malloc(size * sizeof(int));
        (*returnColumnSizes)[*returnSize] = size;
        for (int i = 0; i < size; i++) {
            struct TreeNode* node = q[head++];
            level[i] = node->val;
            if (node->left) q[tail++] = node->left;
            if (node->right) q[tail++] = node->right;
        }
        res[(*returnSize)++] = level;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            vector<int> level;
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
```

```js [JavaScript]
var levelOrder = function(root) {
    if (!root) return [];
    const res = [], q = [root];
    while (q.length) {
        const size = q.length;
        const level = [];
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            level.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(level);
    }
    return res;
};
```

```ts [TypeScript]
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const res: number[][] = [];
    const q: TreeNode[] = [root];
    while (q.length) {
        const size = q.length;
        const level: number[] = [];
        for (let i = 0; i < size; i++) {
            const node = q.shift()!;
            level.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(level);
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入队、出队各一次
- **空间复杂度**：`O(n)`，队列中最多存储一层节点（最坏为满二叉树最后一层，约 `n/2`）

---

### 2.2 方法二：深度优先搜索（DFS / 递归）

1. **思路**

使用递归前序遍历（或任意顺序），同时传递当前深度 `depth`。首次到达某一深度时，在结果列表中新建一个子列表；然后将当前节点值追加到对应深度的子列表中。递归访问左右子树并深度 + 1。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> levelOrder(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth == res.size()) res.add(new ArrayList<>());
        res.get(depth).add(node.val);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
}
```

```python [Python]
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        def dfs(node, depth):
            if not node: return
            if depth == len(res): res.append([])
            res[depth].append(node.val)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        dfs(root, 0)
        return res
```

```go [Go]
func levelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    var dfs func(*TreeNode, int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil { return }
        if depth == len(res) { res = append(res, []int{}) }
        res[depth] = append(res[depth], node.Val)
        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }
    dfs(root, 0)
    return res
}
```

```c [C]
void dfs(struct TreeNode* node, int depth, int*** res, int* size, int** colSizes) {
    if (!node) return;
    if (depth == *size) {
        *res = (int**)realloc(*res, (*size + 1) * sizeof(int*));
        (*colSizes) = (int*)realloc(*colSizes, (*size + 1) * sizeof(int));
        (*colSizes)[*size] = 0;
        (*size)++;
    }
    (*res)[depth] = (int*)realloc((*res)[depth], ((*colSizes)[depth] + 1) * sizeof(int));
    (*res)[depth][(*colSizes)[depth]++] = node->val;
    dfs(node->left, depth+1, res, size, colSizes);
    dfs(node->right, depth+1, res, size, colSizes);
}
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    int** res = NULL;
    *returnColumnSizes = NULL;
    *returnSize = 0;
    dfs(root, 0, &res, returnSize, returnColumnSizes);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        dfs(root, 0, res);
        return res;
    }
    void dfs(TreeNode* node, int depth, vector<vector<int>>& res) {
        if (!node) return;
        if (depth == res.size()) res.push_back({});
        res[depth].push_back(node->val);
        dfs(node->left, depth+1, res);
        dfs(node->right, depth+1, res);
    }
};
```

```js [JavaScript]
var levelOrder = function(root) {
    const res = [];
    function dfs(node, depth) {
        if (!node) return;
        if (depth === res.length) res.push([]);
        res[depth].push(node.val);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return res;
};
```

```ts [TypeScript]
function levelOrder(root: TreeNode | null): number[][] {
    const res: number[][] = [];
    function dfs(node: TreeNode | null, depth: number): void {
        if (!node) return;
        if (depth === res.length) res.push([]);
        res[depth].push(node.val);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次
- **空间复杂度**：`O(n)`，递归栈深度（最坏为树高 `O(n)`），以及结果存储空间

## 三、总结

两种方法对比：

| 方法        | 时间复杂度 | 空间复杂度 | 特点                                       |
| ----------- | ---------- | ---------- | ------------------------------------------ |
| BFS（队列） | `O(n)`     | `O(n)`     | 直观，符合层序逻辑，推荐作为首选           |
| DFS（递归） | `O(n)`     | `O(n)`     | 代码更短，但依赖递归深度，需要额外传递层数 |

实际面试中推荐 BFS 写法，因为它直接对应层序的定义，且不依赖递归栈，更安全。
