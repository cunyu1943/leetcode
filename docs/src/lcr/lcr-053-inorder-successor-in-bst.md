# [LCR 053. 二叉搜索树中的中序后继](https://leetcode.cn/problems/P5rCT8/)



## 一、题目描述

给定一棵二叉搜索树和其中的一个节点 `p` ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 `null` 。

节点 `p` 的后继是值比 `p.val` 大的节点中键值最小的节点，即按中序遍历的顺序节点 `p` 的下一个节点。



**示例 1：**

```
输入: root = [2,1,3], p = 1
输出: 2
```

**示例 2：**

```
输入: root = [5,3,6,2,4,null,null,1], p = 6
输出: null
```

**提示：**

- 树中节点的数目范围是 `[1, 10⁴]`
- `-10⁵ <= Node.val <= 10⁵`
- 树中各节点的值均保证唯一



## 二、解答方法

### 2.1 方法一：利用二叉搜索树性质（沿树查找）

1. **思路**

根据 BST 性质：

- 若 `p` 有右子树，中序后继就是右子树中最左的节点；
- 若 `p` 没有右子树，从根开始向下搜索：记录「最后一个值大于 `p.val` 的节点」作为候选后继。沿树下降时，若 `node.val > p.val`，则 `node` 可能是后继（先记录），继续去左子树找更小的；否则去右子树。

时间 `O(h)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        if (p.right != null) {
            TreeNode node = p.right;
            while (node.left != null) node = node.left;
            return node;
        }
        TreeNode res = null, cur = root;
        while (cur != null) {
            if (cur.val > p.val) {
                res = cur;
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def inorderSuccessor(self, root: 'TreeNode', p: 'TreeNode') -> 'TreeNode':
        if p.right:
            node = p.right
            while node.left:
                node = node.left
            return node
        res = None
        cur = root
        while cur:
            if cur.val > p.val:
                res = cur
                cur = cur.left
            else:
                cur = cur.right
        return res
```

```cpp [C++]
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        if (p->right) {
            TreeNode* node = p->right;
            while (node->left) node = node->left;
            return node;
        }
        TreeNode* res = nullptr;
        TreeNode* cur = root;
        while (cur) {
            if (cur->val > p->val) {
                res = cur;
                cur = cur->left;
            } else {
                cur = cur->right;
            }
        }
        return res;
    }
};
```

```go [Go]
func inorderSuccessor(root *TreeNode, p *TreeNode) *TreeNode {
    if p.Right != nil {
        node := p.Right
        for node.Left != nil {
            node = node.Left
        }
        return node
    }
    var res *TreeNode
    cur := root
    for cur != nil {
        if cur.Val > p.Val {
            res = cur
            cur = cur.Left
        } else {
            cur = cur.Right
        }
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
    if (p.right) {
        let node = p.right;
        while (node.left) node = node.left;
        return node;
    }
    let res = null, cur = root;
    while (cur) {
        if (cur.val > p.val) {
            res = cur;
            cur = cur.left;
        } else {
            cur = cur.right;
        }
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

struct TreeNode* inorderSuccessor(struct TreeNode* root, struct TreeNode* p) {
    if (p->right) {
        struct TreeNode* node = p->right;
        while (node->left) node = node->left;
        return node;
    }
    struct TreeNode* res = NULL;
    struct TreeNode* cur = root;
    while (cur) {
        if (cur->val > p->val) {
            res = cur;
            cur = cur->left;
        } else {
            cur = cur->right;
        }
    }
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

function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
    if (p!.right) {
        let node: TreeNode | null = p!.right;
        while (node.left) node = node.left;
        return node;
    }
    let res: TreeNode | null = null;
    let cur: TreeNode | null = root;
    while (cur) {
        if (cur.val > p!.val) {
            res = cur;
            cur = cur.left;
        } else {
            cur = cur.right;
        }
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(h)`，`h` 为树高。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：中序遍历（记录前驱）

1. **思路**

对整棵树做中序遍历，记录上一个访问的节点 `prev`。当 `prev == p` 时，当前节点就是中序后继。适合不熟悉 BST 性质的场景，时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private TreeNode prev = null, res = null;
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        dfs(root, p);
        return res;
    }
    private void dfs(TreeNode node, TreeNode p) {
        if (node == null || res != null) return;
        dfs(node.left, p);
        if (prev == p) res = node;
        prev = node;
        dfs(node.right, p);
    }
}
```

```python [Python]
class Solution:
    def inorderSuccessor(self, root: 'TreeNode', p: 'TreeNode') -> 'TreeNode':
        self.prev = None
        self.res = None

        def dfs(node):
            if not node or self.res:
                return
            dfs(node.left)
            if self.prev == p:
                self.res = node
            self.prev = node
            dfs(node.right)

        dfs(root)
        return self.res
```

```cpp [C++]
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        dfs(root, p);
        return res;
    }
private:
    TreeNode* prev = nullptr;
    TreeNode* res = nullptr;
    void dfs(TreeNode* node, TreeNode* p) {
        if (!node || res) return;
        dfs(node->left, p);
        if (prev == p) res = node;
        prev = node;
        dfs(node->right, p);
    }
};
```

```go [Go]
func inorderSuccessor(root *TreeNode, p *TreeNode) *TreeNode {
    var prev, res *TreeNode
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil || res != nil {
            return
        }
        dfs(node.Left)
        if prev == p {
            res = node
        }
        prev = node
        dfs(node.Right)
    }
    dfs(root)
    return res
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
    let prev = null, res = null;
    const dfs = (node) => {
        if (!node || res) return;
        dfs(node.left);
        if (prev === p) res = node;
        prev = node;
        dfs(node.right);
    };
    dfs(root);
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

static struct TreeNode* prevNode;
static struct TreeNode* resNode;

static void dfs(struct TreeNode* node, struct TreeNode* p) {
    if (!node || resNode) return;
    dfs(node->left, p);
    if (prevNode == p) resNode = node;
    prevNode = node;
    dfs(node->right, p);
}

struct TreeNode* inorderSuccessor(struct TreeNode* root, struct TreeNode* p) {
    prevNode = NULL;
    resNode = NULL;
    dfs(root, p);
    return resNode;
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

function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
    let prev: TreeNode | null = null;
    let res: TreeNode | null = null;
    const dfs = (node: TreeNode | null) => {
        if (!node || res) return;
        dfs(node.left);
        if (prev === p) res = node;
        prev = node;
        dfs(node.right);
    };
    dfs(root);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 利用 BST 性质 | `O(h)` | `O(1)` | 最优，推荐 |
| 中序遍历找前驱 | `O(n)` | `O(h)` | 通用但较慢 |

「有右子树则找右子树最左节点；否则沿根下降记录最后一个大于 p 的节点」是利用 BST 有序性求解后继的经典思路。

