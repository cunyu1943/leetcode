# [107. 二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)

## 一、题目描述

给你二叉树的根节点 `root`，返回其节点值 **自底向上的层序遍历**。（即按从叶子节点所在层到根节点所在的层，逐层从左到右遍历）

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]]
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

### 2.1 方法一：BFS + 反转结果

1. **思路**

先进行标准的层序遍历（从上到下），得到 `res` 列表，然后将 `res` 反转，即为自底向上的结果。BFS 使用队列实现，每层记录节点值。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
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
        Collections.reverse(res);
        return res;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
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
        return res[::-1]
```

```go [Go]
func levelOrderBottom(root *TreeNode) [][]int {
    if root == nil { return [][]int{} }
    res := [][]int{}
    q := []*TreeNode{root}
    for len(q) > 0 {
        size := len(q)
        level := []int{}
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            level = append(level, node.Val)
            if node.Left != nil { q = append(q, node.Left) }
            if node.Right != nil { q = append(q, node.Right) }
        }
        res = append(res, level)
    }
    // 反转
    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return res
}
```

```c [C]
int** levelOrderBottom(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
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
    // 反转结果数组
    for (int i = 0; i < *returnSize/2; i++) {
        int* tmp = res[i];
        res[i] = res[*returnSize-1-i];
        res[*returnSize-1-i] = tmp;
        int tmpSize = (*returnColumnSizes)[i];
        (*returnColumnSizes)[i] = (*returnColumnSizes)[*returnSize-1-i];
        (*returnColumnSizes)[*returnSize-1-i] = tmpSize;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
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
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```js [JavaScript]
var levelOrderBottom = function(root) {
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
    return res.reverse();
};
```

```ts [TypeScript]
function levelOrderBottom(root: TreeNode | null): number[][] {
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
    return res.reverse();
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次，反转操作 `O(L)`，`L` 为层数，小于 `n`。
- **空间复杂度**：`O(n)`，队列存储节点，结果存储所有节点值。

---

### 2.2 方法二：DFS + 深度参数，结果逆序插入

1. **思路**

使用 DFS 递归遍历，记录深度 `depth`。在结果列表 `res` 中，根对应索引 `0`，但我们需要自底向上，因此可以在插入时直接插入到 `res` 的头部（`res.add(0, level)`），或者先按正常顺序存储，最后反转。

为了更直观展示 DFS 思路，这里采用先按深度存储到对应索引（类似正向层序的 DFS），最后反转整个结果列表。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        dfs(root, 0);
        Collections.reverse(res);
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
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        res = []
        def dfs(node, depth):
            if not node: return
            if depth == len(res): res.append([])
            res[depth].append(node.val)
            dfs(node.left, depth+1)
            dfs(node.right, depth+1)
        dfs(root, 0)
        return res[::-1]
```

```go [Go]
func levelOrderBottom(root *TreeNode) [][]int {
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
    // 反转
    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return res
}
```

```c [C]
void dfs(struct TreeNode* node, int depth, int*** res, int* size, int** colSizes) {
    if (!node) return;
    if (depth == *size) {
        *res = (int**)realloc(*res, (*size+1)*sizeof(int*));
        *colSizes = (int*)realloc(*colSizes, (*size+1)*sizeof(int));
        (*colSizes)[*size] = 0;
        (*size)++;
    }
    (*res)[depth] = (int*)realloc((*res)[depth], ((*colSizes)[depth]+1)*sizeof(int));
    (*res)[depth][(*colSizes)[depth]++] = node->val;
    dfs(node->left, depth+1, res, size, colSizes);
    dfs(node->right, depth+1, res, size, colSizes);
}
int** levelOrderBottom(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    int** res = NULL;
    *returnColumnSizes = NULL;
    *returnSize = 0;
    dfs(root, 0, &res, returnSize, returnColumnSizes);
    // 反转
    for (int i = 0; i < *returnSize/2; i++) {
        int* tmp = res[i];
        res[i] = res[*returnSize-1-i];
        res[*returnSize-1-i] = tmp;
        int tmpSize = (*returnColumnSizes)[i];
        (*returnColumnSizes)[i] = (*returnColumnSizes)[*returnSize-1-i];
        (*returnColumnSizes)[*returnSize-1-i] = tmpSize;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        vector<vector<int>> res;
        dfs(root, 0, res);
        reverse(res.begin(), res.end());
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
var levelOrderBottom = function(root) {
    const res = [];
    function dfs(node, depth) {
        if (!node) return;
        if (depth === res.length) res.push([]);
        res[depth].push(node.val);
        dfs(node.left, depth+1);
        dfs(node.right, depth+1);
    }
    dfs(root, 0);
    return res.reverse();
};
```

```ts [TypeScript]
function levelOrderBottom(root: TreeNode | null): number[][] {
    const res: number[][] = [];
    function dfs(node: TreeNode | null, depth: number): void {
        if (!node) return;
        if (depth === res.length) res.push([]);
        res[depth].push(node.val);
        dfs(node.left, depth+1);
        dfs(node.right, depth+1);
    }
    dfs(root, 0);
    return res.reverse();
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度 `O(height)`，结果存储 `O(n)`。

---

## 三、总结

两种方法对比：

| 方法                  | 时间复杂度 | 空间复杂度 | 特点                           |
| --------------------- | ---------- | ---------- | ------------------------------ |
| BFS + 反转            | `O(n)`     | `O(n)`     | 直观，推荐，与层序遍历几乎相同 |
| DFS + 深度参数 + 反转 | `O(n)`     | `O(n)`     | 递归思路，适合偏好 DFS 的场景  |

**推荐**：面试中首选 **BFS 方法（方法一）**，代码与层序遍历几乎一致，只需最后反转结果，逻辑清晰且不易出错。DFS 方法也可行，但需要额外递归栈。
