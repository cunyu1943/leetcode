# [LCR 043. 完全二叉树插入器](https://leetcode.cn/problems/Naqh0n/)



## 一、题目描述

**完全二叉树** 是每一层（除最后一层外）都是完全填充（即，节点数达到最大）的，并且所有的节点都尽可能地集中在左侧。

设计一个用完全二叉树初始化的数据结构 `CBTInserter`，它支持以下几种操作：

- `CBTInserter(TreeNode root)` 使用根节点为 `root` 的给定树初始化该数据结构；
- `CBTInserter.insert(int v)` 向树中插入一个新节点，节点类型为 `TreeNode`，值为 `v` 。使树保持完全二叉树的状态，并返回插入的新节点的父节点的值；
- `CBTInserter.get_root()` 将返回树的根节点。



**示例 1：**

```
输入：inputs = ["CBTInserter","insert","insert","get_root"], inputs = [[[1,2]],[3],[4],[]]
输出：[null,1,1,[1,2,3,4]]
```

**示例 2：**

```
输入：inputs = ["CBTInserter","insert","insert","insert","get_root"], inputs = [[[1,2,3,4,5,6]],[7],[8],[9],[]]
输出：[null,3,4,4,[1,2,3,4,5,6,7,8,9]]
```

**提示：**

- 最初给定的树是完全二叉树，且包含 `1` 到 `1000` 个节点
- 每个测试用例最多调用 `CBTInserter.insert` 操作 `10⁴` 次
- 给定树中的节点值在 `[1, 5000]` 之间
- 每个测试用例中插入的所有新节点值都在 `[1, 5000]` 之间
- 所有节点值不重复



## 二、解答方法

### 2.1 方法一：队列存储待插入位置

1. **思路**

完全二叉树的插入位置总是「某个节点的左孩子或右孩子」，这些节点一定是缺少左孩子或右孩子的节点。用队列维护所有「可以接收新孩子的节点」：

- 构造时层序遍历，把所有缺左孩子或缺右孩子的节点加入候选队列；
- `insert(v)` 时取出队首作为父节点：若它没有左孩子则挂左孩子；否则挂右孩子并将父节点出队（该节点已满）；
- `get_root` 返回根。

每个节点入队一次，时间均摊 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class CBTInserter {
    private TreeNode root;
    private Deque<TreeNode> q;

    public CBTInserter(TreeNode root) {
        this.root = root;
        q = new ArrayDeque<>();
        Deque<TreeNode> level = new ArrayDeque<>();
        level.offer(root);
        while (!level.isEmpty()) {
            TreeNode cur = level.poll();
            if (cur.left != null) level.offer(cur.left);
            if (cur.right != null) level.offer(cur.right);
            if (cur.left == null || cur.right == null) q.offer(cur);
        }
    }

    public int insert(int v) {
        TreeNode parent = q.peek();
        TreeNode node = new TreeNode(v);
        if (parent.left == null) {
            parent.left = node;
        } else {
            parent.right = node;
            q.poll();
        }
        q.offer(node);
        return parent.val;
    }

    public TreeNode get_root() {
        return root;
    }
}
```

```python [Python]
class CBTInserter:
    def __init__(self, root: TreeNode):
        self.root = root
        self.q = []
        level = [root]
        while level:
            cur = level.pop(0)
            if cur.left:
                level.append(cur.left)
            if cur.right:
                level.append(cur.right)
            if not cur.left or not cur.right:
                self.q.append(cur)

    def insert(self, v: int) -> int:
        parent = self.q[0]
        node = TreeNode(v)
        if not parent.left:
            parent.left = node
        else:
            parent.right = node
            self.q.pop(0)
        self.q.append(node)
        return parent.val

    def get_root(self) -> TreeNode:
        return self.root
```

```cpp [C++]
class CBTInserter {
    TreeNode* root;
    queue<TreeNode*> q;
public:
    CBTInserter(TreeNode* root) {
        this->root = root;
        queue<TreeNode*> level;
        level.push(root);
        while (!level.empty()) {
            TreeNode* cur = level.front();
            level.pop();
            if (cur->left) level.push(cur->left);
            if (cur->right) level.push(cur->right);
            if (!cur->left || !cur->right) q.push(cur);
        }
    }

    int insert(int v) {
        TreeNode* parent = q.front();
        TreeNode* node = new TreeNode(v);
        if (!parent->left) parent->left = node;
        else { parent->right = node; q.pop(); }
        q.push(node);
        return parent->val;
    }

    TreeNode* get_root() {
        return root;
    }
};
```

```go [Go]
type CBTInserter struct {
    root *TreeNode
    q    []*TreeNode
}

func Constructor(root *TreeNode) CBTInserter {
    cbt := CBTInserter{root: root}
    level := []*TreeNode{root}
    for len(level) > 0 {
        cur := level[0]
        level = level[1:]
        if cur.Left != nil {
            level = append(level, cur.Left)
        }
        if cur.Right != nil {
            level = append(level, cur.Right)
        }
        if cur.Left == nil || cur.Right == nil {
            cbt.q = append(cbt.q, cur)
        }
    }
    return cbt
}

func (cbt *CBTInserter) Insert(v int) int {
    parent := cbt.q[0]
    node := &TreeNode{Val: v}
    if parent.Left == nil {
        parent.Left = node
    } else {
        parent.Right = node
        cbt.q = cbt.q[1:]
    }
    cbt.q = append(cbt.q, node)
    return parent.Val
}

func (cbt *CBTInserter) Get_root() *TreeNode {
    return cbt.root
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 */
var CBTInserter = function (root) {
    this.root = root;
    this.q = [];
    const level = [root];
    while (level.length) {
        const cur = level.shift();
        if (cur.left) level.push(cur.left);
        if (cur.right) level.push(cur.right);
        if (!cur.left || !cur.right) this.q.push(cur);
    }
};

/**
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function (v) {
    const parent = this.q[0];
    const node = new TreeNode(v);
    if (!parent.left) {
        parent.left = node;
    } else {
        parent.right = node;
        this.q.shift();
    }
    this.q.push(node);
    return parent.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
    return this.root;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

typedef struct {
    struct TreeNode* root;
    struct TreeNode** q;
    int head, tail;
} CBTInserter;

CBTInserter* cBTInserterCreate(struct TreeNode* root) {
    CBTInserter* obj = (CBTInserter*)calloc(1, sizeof(CBTInserter));
    obj->root = root;
    obj->q = (struct TreeNode**)malloc(4000 * sizeof(struct TreeNode*));
    struct TreeNode* level[1000];
    int h = 0, t = 0;
    level[t++] = root;
    while (h < t) {
        struct TreeNode* cur = level[h++];
        if (cur->left) level[t++] = cur->left;
        if (cur->right) level[t++] = cur->right;
        if (!cur->left || !cur->right) obj->q[obj->tail++] = cur;
    }
    return obj;
}

int cBTInserterInsert(CBTInserter* obj, int v) {
    struct TreeNode* parent = obj->q[obj->head];
    struct TreeNode* node = (struct TreeNode*)calloc(1, sizeof(struct TreeNode));
    node->val = v;
    if (!parent->left) parent->left = node;
    else {
        parent->right = node;
        obj->head++;
    }
    obj->q[obj->tail++] = node;
    return parent->val;
}

struct TreeNode* cBTInserterGet_root(CBTInserter* obj) {
    return obj->root;
}

void cBTInserterFree(CBTInserter* obj) {
    free(obj->q);
    free(obj);
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

class CBTInserter {
    private root: TreeNode | null;
    private q: TreeNode[] = [];

    constructor(root: TreeNode | null) {
        this.root = root;
        const level: TreeNode[] = [root!];
        while (level.length) {
            const cur = level.shift()!;
            if (cur.left) level.push(cur.left);
            if (cur.right) level.push(cur.right);
            if (!cur.left || !cur.right) this.q.push(cur);
        }
    }

    insert(v: number): number {
        const parent = this.q[0];
        const node = new TreeNode(v);
        if (!parent.left) {
            parent.left = node;
        } else {
            parent.right = node;
            this.q.shift();
        }
        this.q.push(node);
        return parent.val;
    }

    get_root(): TreeNode | null {
        return this.root;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：构造 `O(n)`；`insert` 均摊 `O(1)`。
- **空间复杂度**：`O(n)`，队列最多存一层节点。

## 三、总结

| 方法 | 构造 | insert | 空间 |
| ---- | ---------- | ---------- | ---------- |
| 队列存候选父节点 | `O(n)` | `O(1)` 均摊 | `O(n)` |

完全二叉树插入的诀窍是：候选父节点正好是「层序遍历中缺少某个孩子的节点」，用队列维护这些节点即可快速定位新节点的位置。

