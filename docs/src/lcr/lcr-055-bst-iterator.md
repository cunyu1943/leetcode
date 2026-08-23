# [LCR 055. 二叉搜索树迭代器](https://leetcode.cn/problems/kTOapQ/)



## 一、题目描述

实现一个二叉搜索树迭代器类 `BSTIterator` ，表示一个按中序遍历二叉搜索树（BST）的迭代器：

- `BSTIterator(TreeNode root)` 初始化 `BSTIterator` 类的一个对象。BST 的根节点 `root` 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
- `boolean hasNext()` 如果向指针右侧遍历存在数字，则返回 `true`；否则返回 `false`。
- `int next()` 将指针向右移动，然后返回指针处的数字。

注意，指针初始化为一个不存在于 BST 中的数字，所以对 `next()` 的首次调用将返回 BST 中的最小元素。

可以假设 `next()` 调用总是有效的，也就是说，当调用 `next()` 时，BST 的中序遍历中至少存在一个下一个数字。



**示例 1：**

```
输入
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
输出
[null, 3, 7, true, 9, true, 15, true, 20, false]
```

**提示：**

- 树中节点数 `[1, 10⁵]`
- `0 <= Node.val <= 10⁶`
- 最多调用 `hasNext` 和 `next` 操作共 `10⁵` 次
- 调用 `next()` 的总次数不超过树中节点数



## 二、解答方法

### 2.1 方法一：模拟中序递归栈（均摊 O(1)）

1. **思路**

不提前遍历全部节点，而是用栈模拟中序遍历的「逐步展开」：

- 构造时，从根开始把所有左孩子压栈；
- `next()`：弹出栈顶（当前最小值），若它有右孩子，则把该右孩子的所有左孩子压栈（继续展开），返回弹出的值；
- `hasNext()`：判断栈是否为空。

`next()` 均摊 `O(1)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class BSTIterator {
    private Deque<TreeNode> stk;

    public BSTIterator(TreeNode root) {
        stk = new ArrayDeque<>();
        pushLeft(root);
    }

    public int next() {
        TreeNode node = stk.pop();
        pushLeft(node.right);
        return node.val;
    }

    public boolean hasNext() {
        return !stk.isEmpty();
    }

    private void pushLeft(TreeNode node) {
        while (node != null) {
            stk.push(node);
            node = node.left;
        }
    }
}
```

```python [Python]
class BSTIterator:
    def __init__(self, root: TreeNode):
        self.stk = []
        self.push_left(root)

    def next(self) -> int:
        node = self.stk.pop()
        self.push_left(node.right)
        return node.val

    def hasNext(self) -> bool:
        return len(self.stk) > 0

    def push_left(self, node):
        while node:
            self.stk.append(node)
            node = node.left
```

```cpp [C++]
class BSTIterator {
    stack<TreeNode*> stk;
public:
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }

    int next() {
        TreeNode* node = stk.top();
        stk.pop();
        pushLeft(node->right);
        return node->val;
    }

    bool hasNext() {
        return !stk.empty();
    }

private:
    void pushLeft(TreeNode* node) {
        while (node) {
            stk.push(node);
            node = node->left;
        }
    }
};
```

```go [Go]
type BSTIterator struct {
    stk []*TreeNode
}

func Constructor(root *TreeNode) BSTIterator {
    it := BSTIterator{}
    it.pushLeft(root)
    return it
}

func (it *BSTIterator) Next() int {
    node := it.stk[len(it.stk)-1]
    it.stk = it.stk[:len(it.stk)-1]
    it.pushLeft(node.Right)
    return node.Val
}

func (it *BSTIterator) HasNext() bool {
    return len(it.stk) > 0
}

func (it *BSTIterator) pushLeft(node *TreeNode) {
    for node != nil {
        it.stk = append(it.stk, node)
        node = node.Left
    }
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
    this.stk = [];
    this.pushLeft(root);
};

BSTIterator.prototype.pushLeft = function (node) {
    while (node) {
        this.stk.push(node);
        node = node.left;
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
    const node = this.stk.pop();
    this.pushLeft(node.right);
    return node.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
    return this.stk.length > 0;
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
    struct TreeNode** stk;
    int top;
} BSTIterator;

static void pushLeft(BSTIterator* obj, struct TreeNode* node) {
    while (node) {
        obj->stk[obj->top++] = node;
        node = node->left;
    }
}

BSTIterator* bSTIteratorCreate(struct TreeNode* root) {
    BSTIterator* obj = (BSTIterator*)calloc(1, sizeof(BSTIterator));
    obj->stk = (struct TreeNode**)malloc(100005 * sizeof(struct TreeNode*));
    pushLeft(obj, root);
    return obj;
}

int bSTIteratorNext(BSTIterator* obj) {
    struct TreeNode* node = obj->stk[--obj->top];
    pushLeft(obj, node->right);
    return node->val;
}

bool bSTIteratorHasNext(BSTIterator* obj) {
    return obj->top > 0;
}

void bSTIteratorFree(BSTIterator* obj) {
    free(obj->stk);
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

class BSTIterator {
    private stk: TreeNode[] = [];

    constructor(root: TreeNode | null) {
        this.pushLeft(root);
    }

    next(): number {
        const node = this.stk.pop()!;
        this.pushLeft(node.right);
        return node.val;
    }

    hasNext(): boolean {
        return this.stk.length > 0;
    }

    private pushLeft(node: TreeNode | null): void {
        while (node) {
            this.stk.push(node);
            node = node.left;
        }
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`next` 均摊 `O(1)`，`hasNext` `O(1)`。
- **空间复杂度**：`O(h)`，栈中最多存放树高个节点。

## 三、总结

| 方法 | next | hasNext | 空间 |
| ---- | ---------- | ---------- | ---------- |
| 模拟中序栈 | `O(1)` 均摊 | `O(1)` | `O(h)` |

「按需展开」的迭代器中序遍历，每次 `next` 只把即将访问的路径压栈，避免了构造时全量遍历，达到均摊 `O(1)` 且空间 `O(h)`。

