# [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)

## 一、题目描述

给你二叉树的根节点 `root`，返回其节点值的 **锯齿形层序遍历**。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]
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
- `-100 <= Node.val <= 100`

## 二、解答方法

### 2.1 方法一：BFS + 双端队列

1. **思路**

在标准层序遍历基础上，使用双端队列（`Deque`）或普通列表，根据当前层数的奇偶性决定节点值的添加方向：

- **偶数层（从左到右）**：将节点值追加到列表尾部
- **奇数层（从右到左）**：将节点值插入到列表头部

这样每层遍历顺序不变（仍从左到右遍历节点），但值的存储方向交替变化。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        boolean leftToRight = true;
        while (!q.isEmpty()) {
            int size = q.size();
            LinkedList<Integer> level = new LinkedList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (leftToRight) {
                    level.addLast(node.val);
                } else {
                    level.addFirst(node.val);
                }
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root: return []
        res, q = [], deque([root])
        left_to_right = True
        while q:
            level = deque()
            for _ in range(len(q)):
                node = q.popleft()
                if left_to_right:
                    level.append(node.val)
                else:
                    level.appendleft(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(list(level))
            left_to_right = not left_to_right
        return res
```

```go [Go]
func zigzagLevelOrder(root *TreeNode) [][]int {
    if root == nil { return [][]int{} }
    res := [][]int{}
    q := []*TreeNode{root}
    leftToRight := true
    for len(q) > 0 {
        size := len(q)
        level := make([]int, size)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            idx := i
            if !leftToRight {
                idx = size - 1 - i
            }
            level[idx] = node.Val
            if node.Left != nil { q = append(q, node.Left) }
            if node.Right != nil { q = append(q, node.Right) }
        }
        res = append(res, level)
        leftToRight = !leftToRight
    }
    return res
}
```

```c [C]
int** zigzagLevelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    if (!root) { *returnSize = 0; return NULL; }
    struct TreeNode* q[2000];
    int head = 0, tail = 0;
    q[tail++] = root;
    int** res = (int**)malloc(2000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2000 * sizeof(int));
    *returnSize = 0;
    bool leftToRight = true;
    while (head < tail) {
        int size = tail - head;
        int* level = (int*)malloc(size * sizeof(int));
        (*returnColumnSizes)[*returnSize] = size;
        for (int i = 0; i < size; i++) {
            struct TreeNode* node = q[head++];
            int idx = leftToRight ? i : size - 1 - i;
            level[idx] = node->val;
            if (node->left) q[tail++] = node->left;
            if (node->right) q[tail++] = node->right;
        }
        res[(*returnSize)++] = level;
        leftToRight = !leftToRight;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int size = q.size();
            deque<int> level;
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                if (leftToRight) level.push_back(node->val);
                else level.push_front(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(vector<int>(level.begin(), level.end()));
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```

```js [JavaScript]
var zigzagLevelOrder = function(root) {
    if (!root) return [];
    const res = [], q = [root];
    let leftToRight = true;
    while (q.length) {
        const size = q.length;
        const level = [];
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            if (leftToRight) level.push(node.val);
            else level.unshift(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(level);
        leftToRight = !leftToRight;
    }
    return res;
};
```

```ts [TypeScript]
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const res: number[][] = [];
    const q: TreeNode[] = [root];
    let leftToRight = true;
    while (q.length) {
        const size = q.length;
        const level: number[] = [];
        for (let i = 0; i < size; i++) {
            const node = q.shift()!;
            if (leftToRight) level.push(node.val);
            else level.unshift(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(level);
        leftToRight = !leftToRight;
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次
- **空间复杂度**：`O(n)`，队列存储最多一层节点

---

### 2.2 方法二：DFS + 层号辅助

1. **思路**

与层序遍历的 DFS 类似，递归时传递深度 `depth`。根据 `depth` 的奇偶性，将节点值插入到对应层列表的末尾（偶数层）或开头（奇数层）。由于 DFS 访问顺序是前序（根、左、右），直接插入列表尾部会得到左到右顺序；若想得到右到左，插入到头部即可。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth == res.size()) res.add(new LinkedList<>());
        if (depth % 2 == 0) {
            res.get(depth).add(node.val);
        } else {
            res.get(depth).add(0, node.val);
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
}
```

```python [Python]
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        def dfs(node, depth):
            if not node: return
            if depth == len(res): res.append([])
            if depth % 2 == 0:
                res[depth].append(node.val)
            else:
                res[depth].insert(0, node.val)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        dfs(root, 0)
        return res
```

```go [Go]
func zigzagLevelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    var dfs func(*TreeNode, int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil { return }
        if depth == len(res) { res = append(res, []int{}) }
        if depth%2 == 0 {
            res[depth] = append(res[depth], node.Val)
        } else {
            res[depth] = append([]int{node.Val}, res[depth]...)
        }
        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }
    dfs(root, 0)
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        dfs(root, 0, res);
        return res;
    }
    void dfs(TreeNode* node, int depth, vector<vector<int>>& res) {
        if (!node) return;
        if (depth == res.size()) res.push_back({});
        if (depth % 2 == 0) {
            res[depth].push_back(node->val);
        } else {
            res[depth].insert(res[depth].begin(), node->val);
        }
        dfs(node->left, depth+1, res);
        dfs(node->right, depth+1, res);
    }
};
```

```js [JavaScript]
var zigzagLevelOrder = function(root) {
    const res = [];
    function dfs(node, depth) {
        if (!node) return;
        if (depth === res.length) res.push([]);
        if (depth % 2 === 0) {
            res[depth].push(node.val);
        } else {
            res[depth].unshift(node.val);
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return res;
};
```

```ts [TypeScript]
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const res: number[][] = [];
    function dfs(node: TreeNode | null, depth: number): void {
        if (!node) return;
        if (depth === res.length) res.push([]);
        if (depth % 2 === 0) {
            res[depth].push(node.val);
        } else {
            res[depth].unshift(node.val);
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。注意在列表头部插入的复杂度为 `O(k)`（`k` 为当前层节点数），但总复杂度仍为 `O(n)`。
- **空间复杂度**：`O(n)`，递归栈深度与结果存储

## 三、总结

两种方法对比：

| 方法           | 时间复杂度 | 空间复杂度 | 特点                                                |
| -------------- | ---------- | ---------- | --------------------------------------------------- |
| BFS + 双端队列 | `O(n)`     | `O(n)`     | 直观，推荐，每层用 `LinkedList` 或 `deque` 控制方向 |
| DFS + 插入方向 | `O(n)`     | `O(n)`     | 代码短，但列表头部插入有额外开销，理解稍复杂        |

实际面试中推荐 BFS 写法，因为它逻辑清晰，容易扩展到其他变种（如每层输出不同顺序）。
