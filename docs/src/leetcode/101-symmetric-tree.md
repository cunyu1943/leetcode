# [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

## 一、题目描述

给你一个二叉树的根节点 `root`，检查它是否轴对称（即镜像对称）。

**示例 1：**

```
输入：root = [1,2,2,3,4,4,3]
输出：true
```

**示例 2：**

```
输入：root = [1,2,2,null,3,null,3]
输出：false
```

**提示：**

- 树中节点数目在范围 `[1, 1000]` 内
- `-100 <= Node.val <= 100`

## 二、解答方法

### 2.1 方法一：递归（深度优先）

1. **思路**

一棵树对称，当且仅当它的左子树和右子树互为镜像。定义递归函数 `check(p, q)`，判断两棵树是否镜像：

- 若 `p` 和 `q` 都为空，返回 `true`
- 若 `p` 或 `q` 其中一个为空，返回 `false`
- 否则，`p.val == q.val` 且 `check(p.left, q.right)` 且 `check(p.right, q.left)`

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root.left, root.right);
    }
    private boolean check(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
    }
}
```

```python [Python]
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        def check(p, q):
            if not p and not q: return True
            if not p or not q: return False
            return p.val == q.val and check(p.left, q.right) and check(p.right, q.left)
        return check(root.left, root.right)
```

```go [Go]
func isSymmetric(root *TreeNode) bool {
    var check func(p, q *TreeNode) bool
    check = func(p, q *TreeNode) bool {
        if p == nil && q == nil { return true }
        if p == nil || q == nil { return false }
        return p.Val == q.Val && check(p.Left, q.Right) && check(p.Right, q.Left)
    }
    return check(root.Left, root.Right)
}
```

```c [C]
bool check(struct TreeNode* p, struct TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p->val == q->val && check(p->left, q->right) && check(p->right, q->left);
}
bool isSymmetric(struct TreeNode* root) {
    return check(root->left, root->right);
}
```

```cpp [C++]
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return check(root->left, root->right);
    }
    bool check(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        return p->val == q->val && check(p->left, q->right) && check(p->right, q->left);
    }
};
```

```js [JavaScript]
var isSymmetric = function(root) {
    function check(p, q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
    }
    return check(root.left, root.right);
};
```

```ts [TypeScript]
function isSymmetric(root: TreeNode | null): boolean {
    function check(p: TreeNode | null, q: TreeNode | null): boolean {
        if (!p && !q) return true;
        if (!p || !q) return false;
        return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
    }
    return check(root.left, root.right);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次
- **空间复杂度**：`O(n)`，递归栈深度（最坏情况为树高，链表时 `O(n)`）

---

### 2.2 方法二：迭代（广度优先 / 队列）

1. **思路**

用队列模拟递归过程：初始将 `root.left` 和 `root.right` 入队，每次取出两个节点比较，再将它们的镜像子节点按顺序入队（`p.left` 与 `q.right`，`p.right` 与 `q.left`）。若所有配对都相等，则为对称。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isSymmetric(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root.left);
        q.offer(root.right);
        while (!q.isEmpty()) {
            TreeNode p = q.poll();
            TreeNode qNode = q.poll();
            if (p == null && qNode == null) continue;
            if (p == null || qNode == null) return false;
            if (p.val != qNode.val) return false;
            q.offer(p.left);
            q.offer(qNode.right);
            q.offer(p.right);
            q.offer(qNode.left);
        }
        return true;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        q = deque([root.left, root.right])
        while q:
            p = q.popleft()
            r = q.popleft()
            if not p and not r: continue
            if not p or not r: return False
            if p.val != r.val: return False
            q.append(p.left); q.append(r.right)
            q.append(p.right); q.append(r.left)
        return True
```

```go [Go]
func isSymmetric(root *TreeNode) bool {
    q := []*TreeNode{root.Left, root.Right}
    for len(q) > 0 {
        p, r := q[0], q[1]
        q = q[2:]
        if p == nil && r == nil { continue }
        if p == nil || r == nil { return false }
        if p.Val != r.Val { return false }
        q = append(q, p.Left, r.Right, p.Right, r.Left)
    }
    return true
}
```

```c [C]
bool isSymmetric(struct TreeNode* root) {
    struct TreeNode* q[2000];
    int head = 0, tail = 0;
    q[tail++] = root->left; q[tail++] = root->right;
    while (head < tail) {
        struct TreeNode* p = q[head++];
        struct TreeNode* r = q[head++];
        if (!p && !r) continue;
        if (!p || !r) return false;
        if (p->val != r->val) return false;
        q[tail++] = p->left; q[tail++] = r->right;
        q[tail++] = p->right; q[tail++] = r->left;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root->left); q.push(root->right);
        while (!q.empty()) {
            TreeNode* p = q.front(); q.pop();
            TreeNode* r = q.front(); q.pop();
            if (!p && !r) continue;
            if (!p || !r) return false;
            if (p->val != r->val) return false;
            q.push(p->left); q.push(r->right);
            q.push(p->right); q.push(r->left);
        }
        return true;
    }
};
```

```js [JavaScript]
var isSymmetric = function(root) {
    const q = [root.left, root.right];
    while (q.length) {
        const p = q.shift();
        const r = q.shift();
        if (!p && !r) continue;
        if (!p || !r) return false;
        if (p.val !== r.val) return false;
        q.push(p.left, r.right, p.right, r.left);
    }
    return true;
};
```

```ts [TypeScript]
function isSymmetric(root: TreeNode | null): boolean {
    const q: (TreeNode | null)[] = [root.left, root.right];
    while (q.length) {
        const p = q.shift()!;
        const r = q.shift()!;
        if (!p && !r) continue;
        if (!p || !r) return false;
        if (p.val !== r.val) return false;
        q.push(p.left, r.right, p.right, r.left);
    }
    return true;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点入队出队一次
- **空间复杂度**：`O(n)`，队列最多存储一层节点（最坏 `O(n)`）

## 三、总结

两种方法对比：

| 方法         | 时间复杂度 | 空间复杂度 | 特点                                     |
| ------------ | ---------- | ---------- | ---------------------------------------- |
| 递归         | `O(n)`     | `O(n)`     | 代码简洁，但递归栈可能溢出（树深过大时） |
| 迭代（队列） | `O(n)`     | `O(n)`     | 避免递归深度限制，更加安全               |

推荐在实际面试中两种都掌握，递归写法更直观，迭代写法更显工程健壮性。
