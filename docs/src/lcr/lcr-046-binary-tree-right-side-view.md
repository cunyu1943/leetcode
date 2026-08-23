# [LCR 046. 二叉树的右视图](https://leetcode.cn/problems/WNC0Lk/)



## 一、题目描述

给定一个二叉树的 **根节点** `root`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。



**示例 1：**

```
输入: [1,2,3,null,5,null,4]
输出: [1,3,4]
```

**示例 2：**

```
输入: [1,null,3]
输出: [1,3]
```

**示例 3：**

```
输入: []
输出: []
```

**提示：**

- 二叉树的节点个数的范围是 `[0, 100]`
- `-100 <= Node.val <= 100`



## 二、解答方法

### 2.1 方法一：层序遍历（BFS）

1. **思路**

按层遍历，每层的最后一个节点就是从右侧看到的节点。把每层最后一个节点的值加入结果即可。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode cur = q.poll();
                if (i == size - 1) res.add(cur.val);
                if (cur.left != null) q.offer(cur.left);
                if (cur.right != null) q.offer(cur.right);
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        if not root:
            return res
        q = [root]
        while q:
            nxt = []
            for i, node in enumerate(q):
                if i == len(q) - 1:
                    res.append(node.val)
                if node.left:
                    nxt.append(node.left)
                if node.right:
                    nxt.append(node.right)
            q = nxt
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* cur = q.front();
                q.pop();
                if (i == size - 1) res.push_back(cur->val);
                if (cur->left) q.push(cur->left);
                if (cur->right) q.push(cur->right);
            }
        }
        return res;
    }
};
```

```go [Go]
func rightSideView(root *TreeNode) []int {
    var res []int
    if root == nil {
        return res
    }
    q := []*TreeNode{root}
    for len(q) > 0 {
        var nxt []*TreeNode
        for i, node := range q {
            if i == len(q)-1 {
                res = append(res, node.Val)
            }
            if node.Left != nil {
                nxt = append(nxt, node.Left)
            }
            if node.Right != nil {
                nxt = append(nxt, node.Right)
            }
        }
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
var rightSideView = function (root) {
    const res = [];
    if (!root) return res;
    let q = [root];
    while (q.length) {
        const nxt = [];
        for (let i = 0; i < q.length; i++) {
            const node = q[i];
            if (i === q.length - 1) res.push(node.val);
            if (node.left) nxt.push(node.left);
            if (node.right) nxt.push(node.right);
        }
        q = nxt;
    }
    return res;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int* rightSideView(struct TreeNode* root, int* returnSize) {
    int* res = (int*)malloc(105 * sizeof(int));
    int cnt = 0;
    if (!root) { *returnSize = 0; return res; }
    struct TreeNode** q = (struct TreeNode**)malloc(105 * sizeof(struct TreeNode*));
    int head = 0, tail = 0;
    q[tail++] = root;
    while (head < tail) {
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            struct TreeNode* cur = q[head++];
            if (i == size - 1) res[cnt++] = cur->val;
            if (cur->left) q[tail++] = cur->left;
            if (cur->right) q[tail++] = cur->right;
        }
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

function rightSideView(root: TreeNode | null): number[] {
    const res: number[] = [];
    if (!root) return res;
    let q: TreeNode[] = [root];
    while (q.length) {
        const nxt: TreeNode[] = [];
        for (let i = 0; i < q.length; i++) {
            const node = q[i];
            if (i === q.length - 1) res.push(node.val);
            if (node.left) nxt.push(node.left);
            if (node.right) nxt.push(node.right);
        }
        q = nxt;
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，队列。

### 2.2 方法二：DFS（先右后左）

1. **思路**

深度优先遍历，**先右后左** 访问。当到达一个新深度时，第一个访问到的节点即该层最右侧节点，加入结果。时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private List<Integer> res = new ArrayList<>();
    public List<Integer> rightSideView(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    private void dfs(TreeNode node, int d) {
        if (node == null) return;
        if (d == res.size()) res.add(node.val);
        dfs(node.right, d + 1); // 先右
        dfs(node.left, d + 1);  // 后左
    }
}
```

```python [Python]
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node, d):
            if not node:
                return
            if d == len(res):
                res.append(node.val)
            dfs(node.right, d + 1)
            dfs(node.left, d + 1)
        dfs(root, 0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        dfs(root, 0);
        return res;
    }
private:
    vector<int> res;
    void dfs(TreeNode* node, int d) {
        if (!node) return;
        if (d == (int)res.size()) res.push_back(node->val);
        dfs(node->right, d + 1);
        dfs(node->left, d + 1);
    }
};
```

```go [Go]
func rightSideView(root *TreeNode) []int {
    var res []int
    var dfs func(node *TreeNode, d int)
    dfs = func(node *TreeNode, d int) {
        if node == nil {
            return
        }
        if d == len(res) {
            res = append(res, node.Val)
        }
        dfs(node.Right, d+1)
        dfs(node.Left, d+1)
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
var rightSideView = function (root) {
    const res = [];
    const dfs = (node, d) => {
        if (!node) return;
        if (d === res.length) res.push(node.val);
        dfs(node.right, d + 1);
        dfs(node.left, d + 1);
    };
    dfs(root, 0);
    return res;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int res[105];
int cnt;

static void dfs(struct TreeNode* node, int d) {
    if (!node) return;
    if (d == cnt) res[cnt++] = node->val;
    dfs(node->right, d + 1);
    dfs(node->left, d + 1);
}

int* rightSideView(struct TreeNode* root, int* returnSize) {
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

function rightSideView(root: TreeNode | null): number[] {
    const res: number[] = [];
    const dfs = (node: TreeNode | null, d: number) => {
        if (!node) return;
        if (d === res.length) res.push(node.val);
        dfs(node.right, d + 1);
        dfs(node.left, d + 1);
    };
    dfs(root, 0);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 层序遍历 | `O(n)` | `O(n)` | 直观，取每层最后一个 |
| DFS 先右后左 | `O(n)` | `O(h)` | 空间更省，更简洁 |

右视图的本质是「每层最右边的节点」：BFS 取每层末尾，DFS 则通过先右后左保证每个深度第一个访问到的即最右节点。

