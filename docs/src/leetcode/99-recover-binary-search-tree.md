# [99. 恢复二叉搜索树](https://leetcode.cn/problems/recover-binary-search-tree/)



## 一、题目描述

给你二叉搜索树的根节点 `root`，该树中的 **恰好两个节点** 被错误地交换。请在不改变其结构的前提下，恢复这棵树。

**示例 1：**

```
输入：root = [1,3,null,null,2]
输出：[3,1,null,null,2]
```

**示例 2：**

```
输入：root = [3,1,4,null,null,2]
输出：[2,1,4,null,null,3]
```

**提示：**

-   树上节点的数目在范围 `[2, 1000]` 内
-   `-2^31 <= Node.val <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：显式中序遍历


1. **思路**

BST 中序遍历应为递增序列，被交换的两个节点破坏了该性质。先中序遍历收集节点，再找出逆序对，交换其值即可。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void recoverTree(TreeNode root) {
        List<TreeNode> list = new ArrayList<>();
        dfs(root, list);
        TreeNode x = null, y = null;
        for (int i = 0; i < list.size() - 1; i++) {
            if (list.get(i).val > list.get(i + 1).val) {
                y = list.get(i + 1);
                if (x == null) x = list.get(i);
            }
        }
        int t = x.val; x.val = y.val; y.val = t;
    }
    private void dfs(TreeNode node, List<TreeNode> list) {
        if (node == null) return;
        dfs(node.left, list);
        list.add(node);
        dfs(node.right, list);
    }
}
```

```python [Python]
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        nodes = []
        def dfs(node):
            if not node: return
            dfs(node.left)
            nodes.append(node)
            dfs(node.right)
        dfs(root)
        x = y = None
        for i in range(len(nodes) - 1):
            if nodes[i].val > nodes[i + 1].val:
                y = nodes[i + 1]
                if x is None: x = nodes[i]
        x.val, y.val = y.val, x.val
```

```go [Go]
func recoverTree(root *TreeNode) {
    var nodes []*TreeNode
    var dfs func(*TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil { return }
        dfs(node.Left)
        nodes = append(nodes, node)
        dfs(node.Right)
    }
    dfs(root)
    var x, y *TreeNode
    for i := 0; i < len(nodes)-1; i++ {
        if nodes[i].Val > nodes[i+1].Val {
            y = nodes[i+1]
            if x == nil { x = nodes[i] }
        }
    }
    x.Val, y.Val = y.Val, x.Val
}
```

```c [C]
void dfs(struct TreeNode* node, struct TreeNode** arr, int* cnt) {
    if (!node) return;
    dfs(node->left, arr, cnt);
    arr[(*cnt)++] = node;
    dfs(node->right, arr, cnt);
}
void recoverTree(struct TreeNode* root) {
    struct TreeNode* arr[1000];
    int cnt = 0;
    dfs(root, arr, &cnt);
    struct TreeNode *x = NULL, *y = NULL;
    for (int i = 0; i < cnt - 1; i++) {
        if (arr[i]->val > arr[i+1]->val) {
            y = arr[i+1];
            if (x == NULL) x = arr[i];
        }
    }
    int t = x->val; x->val = y->val; y->val = t;
}
```

```cpp [C++]
class Solution {
public:
    void recoverTree(TreeNode* root) {
        vector<TreeNode*> nodes;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;
            dfs(node->left);
            nodes.push_back(node);
            dfs(node->right);
        };
        dfs(root);
        TreeNode *x = nullptr, *y = nullptr;
        for (int i = 0; i < nodes.size() - 1; i++) {
            if (nodes[i]->val > nodes[i + 1]->val) {
                y = nodes[i + 1];
                if (!x) x = nodes[i];
            }
        }
        swap(x->val, y->val);
    }
};
```

```javascript [JavaScript]
var recoverTree = function(root) {
    const nodes = [];
    const dfs = (node) => {
        if (!node) return;
        dfs(node.left);
        nodes.push(node);
        dfs(node.right);
    };
    dfs(root);
    let x = null, y = null;
    for (let i = 0; i < nodes.length - 1; i++) {
        if (nodes[i].val > nodes[i + 1].val) {
            y = nodes[i + 1];
            if (!x) x = nodes[i];
        }
    }
    [x.val, y.val] = [y.val, x.val];
};
```

```typescript [TypeScript]
function recoverTree(root: TreeNode | null): void {
    const nodes: TreeNode[] = [];
    const dfs = (node: TreeNode | null): void => {
        if (!node) return;
        dfs(node.left);
        nodes.push(node);
        dfs(node.right);
    };
    dfs(root);
    let x: TreeNode | null = null, y: TreeNode | null = null;
    for (let i = 0; i < nodes.length - 1; i++) {
        if (nodes[i].val > nodes[i + 1].val) {
            y = nodes[i + 1];
            if (!x) x = nodes[i];
        }
    }
    [x.val, y.val] = [y.val, x.val];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，存储节点列表。

### 2.2 方法二：Morris 中序遍历


1. **思路**

利用 Morris 遍历实现 `O(1)` 空间的中序遍历，在遍历过程中直接定位两个错误节点并交换。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void recoverTree(TreeNode root) {
        TreeNode x = null, y = null, pred = null, cur = root;
        while (cur != null) {
            if (cur.left == null) {
                if (pred != null && pred.val > cur.val) {
                    y = cur;
                    if (x == null) x = pred;
                }
                pred = cur;
                cur = cur.right;
            } else {
                TreeNode pre = cur.left;
                while (pre.right != null && pre.right != cur) pre = pre.right;
                if (pre.right == null) { pre.right = cur; cur = cur.left; }
                else { pre.right = null;
                    if (pred != null && pred.val > cur.val) {
                        y = cur; if (x == null) x = pred;
                    }
                    pred = cur; cur = cur.right;
                }
            }
        }
        int t = x.val; x.val = y.val; y.val = t;
    }
}
```

```python [Python]
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        x = y = pred = None
        cur = root
        while cur:
            if not cur.left:
                if pred and pred.val > cur.val:
                    y = cur
                    if not x: x = pred
                pred = cur
                cur = cur.right
            else:
                pre = cur.left
                while pre.right and pre.right != cur:
                    pre = pre.right
                if not pre.right:
                    pre.right = cur
                    cur = cur.left
                else:
                    pre.right = None
                    if pred and pred.val > cur.val:
                        y = cur
                        if not x: x = pred
                    pred = cur
                    cur = cur.right
        x.val, y.val = y.val, x.val
```

```go [Go]
func recoverTree(root *TreeNode) {
    var x, y, pred, cur *TreeNode = nil, nil, nil, root
    for cur != nil {
        if cur.Left == nil {
            if pred != nil && pred.Val > cur.Val {
                y = cur
                if x == nil { x = pred }
            }
            pred = cur
            cur = cur.Right
        } else {
            pre := cur.Left
            for pre.Right != nil && pre.Right != cur { pre = pre.Right }
            if pre.Right == nil {
                pre.Right = cur
                cur = cur.Left
            } else {
                pre.Right = nil
                if pred != nil && pred.Val > cur.Val {
                    y = cur
                    if x == nil { x = pred }
                }
                pred = cur
                cur = cur.Right
            }
        }
    }
    x.Val, y.Val = y.Val, x.Val
}
```

```c [C]
void recoverTree(struct TreeNode* root) {
    struct TreeNode *x = NULL, *y = NULL, *pred = NULL, *cur = root;
    while (cur) {
        if (!cur->left) {
            if (pred && pred->val > cur->val) {
                y = cur;
                if (!x) x = pred;
            }
            pred = cur;
            cur = cur->right;
        } else {
            struct TreeNode* pre = cur->left;
            while (pre->right && pre->right != cur) pre = pre->right;
            if (!pre->right) {
                pre->right = cur;
                cur = cur->left;
            } else {
                pre->right = NULL;
                if (pred && pred->val > cur->val) {
                    y = cur;
                    if (!x) x = pred;
                }
                pred = cur;
                cur = cur->right;
            }
        }
    }
    int t = x->val; x->val = y->val; y->val = t;
}
```

```cpp [C++]
class Solution {
public:
    void recoverTree(TreeNode* root) {
        TreeNode *x = nullptr, *y = nullptr, *pred = nullptr, *cur = root;
        while (cur) {
            if (!cur->left) {
                if (pred && pred->val > cur->val) {
                    y = cur;
                    if (!x) x = pred;
                }
                pred = cur;
                cur = cur->right;
            } else {
                TreeNode* pre = cur->left;
                while (pre->right && pre->right != cur) pre = pre->right;
                if (!pre->right) { pre->right = cur; cur = cur->left; }
                else {
                    pre->right = nullptr;
                    if (pred && pred->val > cur->val) {
                        y = cur;
                        if (!x) x = pred;
                    }
                    pred = cur;
                    cur = cur->right;
                }
            }
        }
        swap(x->val, y->val);
    }
};
```

```javascript [JavaScript]
var recoverTree = function(root) {
    let x = null, y = null, pred = null, cur = root;
    while (cur) {
        if (!cur.left) {
            if (pred && pred.val > cur.val) {
                y = cur;
                if (!x) x = pred;
            }
            pred = cur;
            cur = cur.right;
        } else {
            let pre = cur.left;
            while (pre.right && pre.right !== cur) pre = pre.right;
            if (!pre.right) {
                pre.right = cur;
                cur = cur.left;
            } else {
                pre.right = null;
                if (pred && pred.val > cur.val) {
                    y = cur;
                    if (!x) x = pred;
                }
                pred = cur;
                cur = cur.right;
            }
        }
    }
    [x.val, y.val] = [y.val, x.val];
};
```

```typescript [TypeScript]
function recoverTree(root: TreeNode | null): void {
    let x: TreeNode | null = null, y: TreeNode | null = null, pred: TreeNode | null = null, cur: TreeNode | null = root;
    while (cur) {
        if (!cur.left) {
            if (pred && pred.val > cur.val) {
                y = cur;
                if (!x) x = pred;
            }
            pred = cur;
            cur = cur.right;
        } else {
            let pre = cur.left;
            while (pre.right && pre.right !== cur) pre = pre.right;
            if (!pre.right) {
                pre.right = cur;
                cur = cur.left;
            } else {
                pre.right = null;
                if (pred && pred.val > cur.val) {
                    y = cur;
                    if (!x) x = pred;
                }
                pred = cur;
                cur = cur.right;
            }
        }
    }
    [x.val, y.val] = [y.val, x.val];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`，无需额外栈/数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 显式中序遍历 | `O(n)` | `O(n)` | 思路简单直观 |
| Morris 中序遍历 | `O(n)` | `O(1)` | 空间最优，代码复杂 |
