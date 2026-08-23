# [LCR 044. 在每个树行中找最大值](https://leetcode.cn/problems/hPov7L/)



## 一、题目描述

给定一棵二叉树的根节点 `root` ，请找出该二叉树中每一层的最大值。



**示例 1：**

```
输入: root = [1,3,2,5,3,null,9]
输出: [1,3,9]
```

**示例 2：**

```
输入: root = [1,2,3]
输出: [1,3]
```

**提示：**

- 二叉树的节点个数的范围是 `[0, 10⁴]`
- `-2³¹ <= Node.val <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：层序遍历（BFS）

1. **思路**

按层遍历二叉树，每一层用一个队列（或记录每层大小）取出，边取边求该层最大值，把每层最大值加入结果。

时间 `O(n)`，空间 `O(n)`（最坏一层 `n/2` 个节点）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            int mx = Integer.MIN_VALUE;
            for (int i = 0; i < size; i++) {
                TreeNode cur = q.poll();
                mx = Math.max(mx, cur.val);
                if (cur.left != null) q.offer(cur.left);
                if (cur.right != null) q.offer(cur.right);
            }
            res.add(mx);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        if not root:
            return res
        q = [root]
        while q:
            mx = float('-inf')
            nxt = []
            for node in q:
                mx = max(mx, node.val)
                if node.left:
                    nxt.append(node.left)
                if node.right:
                    nxt.append(node.right)
            res.append(mx)
            q = nxt
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> largestValues(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            int mx = INT_MIN;
            for (int i = 0; i < size; i++) {
                TreeNode* cur = q.front();
                q.pop();
                mx = max(mx, cur->val);
                if (cur->left) q.push(cur->left);
                if (cur->right) q.push(cur->right);
            }
            res.push_back(mx);
        }
        return res;
    }
};
```

```go [Go]
func largestValues(root *TreeNode) []int {
    var res []int
    if root == nil {
        return res
    }
    q := []*TreeNode{root}
    for len(q) > 0 {
        mx := math.MinInt64
        var nxt []*TreeNode
        for _, node := range q {
            if node.Val > mx {
                mx = node.Val
            }
            if node.Left != nil {
                nxt = append(nxt, node.Left)
            }
            if node.Right != nil {
                nxt = append(nxt, node.Right)
            }
        }
        res = append(res, mx)
        q = nxt
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
    const res = [];
    if (!root) return res;
    let q = [root];
    while (q.length) {
        let mx = -Infinity;
        const nxt = [];
        for (const node of q) {
            mx = Math.max(mx, node.val);
            if (node.left) nxt.push(node.left);
            if (node.right) nxt.push(node.right);
        }
        res.push(mx);
        q = nxt;
    }
    return res;
};
```

```c [C]
#include <stdlib.h>
#include <limits.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int* largestValues(struct TreeNode* root, int* returnSize) {
    int* res = (int*)malloc(10005 * sizeof(int));
    int cnt = 0;
    if (!root) { *returnSize = 0; return res; }
    struct TreeNode** q = (struct TreeNode**)malloc(10005 * sizeof(struct TreeNode*));
    int head = 0, tail = 0;
    q[tail++] = root;
    while (head < tail) {
        int size = tail - head;
        int mx = INT_MIN;
        for (int i = 0; i < size; i++) {
            struct TreeNode* cur = q[head++];
            if (cur->val > mx) mx = cur->val;
            if (cur->left) q[tail++] = cur->left;
            if (cur->right) q[tail++] = cur->right;
        }
        res[cnt++] = mx;
    }
    free(q);
    *returnSize = cnt;
    return res;
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

function largestValues(root: TreeNode | null): number[] {
    const res: number[] = [];
    if (!root) return res;
    let q: TreeNode[] = [root];
    while (q.length) {
        let mx = -Infinity;
        const nxt: TreeNode[] = [];
        for (const node of q) {
            mx = Math.max(mx, node.val);
            if (node.left) nxt.push(node.left);
            if (node.right) nxt.push(node.right);
        }
        res.push(mx);
        q = nxt;
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，队列。

### 2.2 方法二：深度优先（DFS + 记录深度）

1. **思路**

递归时带上深度 `d`，若 `d == res.size()` 说明是这一层第一个访问的节点，直接把值加入；否则用 `max` 更新。先访问左孩子即可保证按层顺序。时间 `O(n)`，空间 `O(h)`（栈深度）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private List<Integer> res = new ArrayList<>();
    public List<Integer> largestValues(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    private void dfs(TreeNode node, int d) {
        if (node == null) return;
        if (d == res.size()) res.add(node.val);
        else res.set(d, Math.max(res.get(d), node.val));
        dfs(node.left, d + 1);
        dfs(node.right, d + 1);
    }
}
```

```python [Python]
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node, d):
            if not node:
                return
            if d == len(res):
                res.append(node.val)
            else:
                res[d] = max(res[d], node.val)
            dfs(node.left, d + 1)
            dfs(node.right, d + 1)
        dfs(root, 0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> largestValues(TreeNode* root) {
        dfs(root, 0);
        return res;
    }
private:
    vector<int> res;
    void dfs(TreeNode* node, int d) {
        if (!node) return;
        if (d == (int)res.size()) res.push_back(node->val);
        else res[d] = max(res[d], node->val);
        dfs(node->left, d + 1);
        dfs(node->right, d + 1);
    }
};
```

```go [Go]
func largestValues(root *TreeNode) []int {
    var res []int
    var dfs func(node *TreeNode, d int)
    dfs = func(node *TreeNode, d int) {
        if node == nil {
            return
        }
        if d == len(res) {
            res = append(res, node.Val)
        } else if node.Val > res[d] {
            res[d] = node.Val
        }
        dfs(node.Left, d+1)
        dfs(node.Right, d+1)
    }
    dfs(root, 0)
    return res
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
    const res = [];
    const dfs = (node, d) => {
        if (!node) return;
        if (d === res.length) res.push(node.val);
        else res[d] = Math.max(res[d], node.val);
        dfs(node.left, d + 1);
        dfs(node.right, d + 1);
    };
    dfs(root, 0);
    return res;
};
```

```c [C]
#include <stdlib.h>
#include <limits.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int res[10005];
int cnt;

static void dfs(struct TreeNode* node, int d) {
    if (!node) return;
    if (d == cnt) res[cnt++] = node->val;
    else if (node->val > res[d]) res[d] = node->val;
    dfs(node->left, d + 1);
    dfs(node->right, d + 1);
}

int* largestValues(struct TreeNode* root, int* returnSize) {
    cnt = 0;
    dfs(root, 0);
    *returnSize = cnt;
    return res;
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

function largestValues(root: TreeNode | null): number[] {
    const res: number[] = [];
    const dfs = (node: TreeNode | null, d: number) => {
        if (!node) return;
        if (d === res.length) res.push(node.val);
        else res[d] = Math.max(res[d], node.val);
        dfs(node.left, d + 1);
        dfs(node.right, d + 1);
    };
    dfs(root, 0);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈深度。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 层序遍历 BFS | `O(n)` | `O(n)` | 直观，按层处理 |
| DFS 记录深度 | `O(n)` | `O(h)` | 空间更省 |

按层求最大值可用 BFS 直接对每层取 max，也可用 DFS 携带深度逐层更新，二者时间复杂度相同。

