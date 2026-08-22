# [100. 相同的树](https://leetcode.cn/problems/same-tree/)



## 一、题目描述

给你两棵二叉树的根节点 `p` 和 `q`，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为是相同的。

**示例 1：**

```
输入：p = [1,2,3], q = [1,2,3]
输出：true
```

**示例 2：**

```
输入：p = [1,2], q = [1,null,2]
输出：false
```

**提示：**

-   两棵树节点数目在范围 `[0, 100]` 内
-   `-10^4 <= Node.val <= 10^4`



## 二、解答方法

### 2.1 方法一：递归


1. **思路**

若两节点均为空则相同；若一个为空另一个非空则不同；若值不等则不同；否则递归比较左右子树。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}
```

```python [Python]
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q: return True
        if not p or not q: return False
        if p.val != q.val: return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

```go [Go]
func isSameTree(p *TreeNode, q *TreeNode) bool {
    if p == nil && q == nil { return true }
    if p == nil || q == nil { return false }
    if p.Val != q.Val { return false }
    return isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
}
```

```c [C]
bool isSameTree(struct TreeNode* p, struct TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p->val != q->val) return false;
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}
```

```cpp [C++]
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        if (p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```

```javascript [JavaScript]
var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

```typescript [TypeScript]
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(min(n, m))`，最少访问到第一个不同节点。
- **空间复杂度**：`O(min(h1, h2))`，递归栈深度。

### 2.2 方法二：迭代（队列/BFS）


1. **思路**

用队列同时层序遍历两棵树，每次取出一对节点进行比较，处理空与非空、值是否相等。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        Deque<TreeNode> dq = new ArrayDeque<>();
        dq.offer(p); dq.offer(q);
        while (!dq.isEmpty()) {
            TreeNode a = dq.poll(), b = dq.poll();
            if (a == null && b == null) continue;
            if (a == null || b == null) return false;
            if (a.val != b.val) return false;
            dq.offer(a.left); dq.offer(b.left);
            dq.offer(a.right); dq.offer(b.right);
        }
        return true;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        dq = deque([(p, q)])
        while dq:
            a, b = dq.popleft()
            if not a and not b: continue
            if not a or not b: return False
            if a.val != b.val: return False
            dq.append((a.left, b.left))
            dq.append((a.right, b.right))
        return True
```

```go [Go]
func isSameTree(p *TreeNode, q *TreeNode) bool {
    dq := []*TreeNode{p, q}
    for len(dq) > 0 {
        a := dq[0]; b := dq[1]
        dq = dq[2:]
        if a == nil && b == nil { continue }
        if a == nil || b == nil { return false }
        if a.Val != b.Val { return false }
        dq = append(dq, a.Left, b.Left, a.Right, b.Right)
    }
    return true
}
```

```c [C]
bool isSameTree(struct TreeNode* p, struct TreeNode* q) {
    struct TreeNode** dq = (struct TreeNode**)malloc(sizeof(struct TreeNode*) * 200);
    int head = 0, tail = 0;
    dq[tail++] = p; dq[tail++] = q;
    while (head < tail) {
        struct TreeNode* a = dq[head++];
        struct TreeNode* b = dq[head++];
        if (!a && !b) continue;
        if (!a || !b) return false;
        if (a->val != b->val) return false;
        dq[tail++] = a->left; dq[tail++] = b->left;
        dq[tail++] = a->right; dq[tail++] = b->right;
    }
    free(dq);
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        vector<TreeNode*> dq = {p, q};
        int i = 0;
        while (i < dq.size()) {
            TreeNode* a = dq[i++];
            TreeNode* b = dq[i++];
            if (!a && !b) continue;
            if (!a || !b) return false;
            if (a->val != b->val) return false;
            dq.push_back(a->left); dq.push_back(b->left);
            dq.push_back(a->right); dq.push_back(b->right);
        }
        return true;
    }
};
```

```javascript [JavaScript]
var isSameTree = function(p, q) {
    const dq = [[p, q]];
    while (dq.length) {
        const [a, b] = dq.shift();
        if (!a && !b) continue;
        if (!a || !b) return false;
        if (a.val !== b.val) return false;
        dq.push([a.left, b.left], [a.right, b.right]);
    }
    return true;
};
```

```typescript [TypeScript]
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    const dq: [TreeNode | null, TreeNode | null][] = [[p, q]];
    while (dq.length) {
        const [a, b] = dq.shift()!;
        if (!a && !b) continue;
        if (!a || !b) return false;
        if (a.val !== b.val) return false;
        dq.push([a.left, b.left], [a.right, b.right]);
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(min(n, m))`。
- **空间复杂度**：`O(min(n, m))`，队列规模。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归 | `O(min(n,m))` | `O(min(h1,h2))` | 代码最简洁，推荐 |
| 迭代（队列/BFS） | `O(min(n,m))` | `O(min(n,m))` | 无递归，便于理解 |
