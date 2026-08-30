# [173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator/)



## 一、题目描述

实现一个二叉搜索树迭代器类 `BSTIterator`，表示一个按中序遍历二叉搜索树（BST）的迭代器：

-   `BSTIterator(TreeNode root)` 初始化 `BSTIterator` 类的实例。BST 的根节点 `root` 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
-   `boolean hasNext()` 如果向指针右侧遍历存在数字，则返回 `true`；否则返回 `false` 。
-   `int next()` 将指针向右移动，然后返回指针处的数字。

注意，指针初始化为一个不存在于 BST 中的数字，所以对 `next()` 的首次调用将返回 BST 中的最小元素。

可以假设 `next()` 调用总是有效的，也就是说，当调用 `next()` 时，`BST` 的中序遍历中至少存在一个下一个数字。

**进阶（优化）：**

-   `next()` 和 `hasNext()` 操作均摊时间复杂度为 `O(1)` ，并使用 `O(h)` 额外空间（其中 `h` 是树的高度）。



**示例：**

```
输入
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
输出
[null, 3, 7, true, 9, true, 15, true, 20, false]
解释：中序遍历结果为 [3, 7, 9, 15, 20]。
```

**提示：**

-   树中节点的数目在范围 `[1, 10⁵]` 内
-   `0 <= Node.val <= 10⁶`
-   最多调用 `10⁵` 次 `hasNext` 和 `next`



## 二、解答方法

### 2.1 方法一：扁平化（提前中序遍历）

1. **思路**

构造函数时一次性中序遍历，把所有值存进数组，`next`/`hasNext` 直接操作数组指针。简单但空间 `O(n)`，不满足 `O(h)` 进阶。

2. **代码实现（Python）**

```python
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.vals = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)
            self.vals.append(node.val)
            dfs(node.right)
        dfs(root)
        self.idx = 0

    def next(self) -> int:
        val = self.vals[self.idx]
        self.idx += 1
        return val

    def hasNext(self) -> bool:
        return self.idx < len(self.vals)
```

### 2.2 方法二：受控递归（栈，O(h) 空间）

1. **思路**

用栈模拟中序遍历：每次 `next` 时把当前节点及其所有左孩子压栈，弹出栈顶即下一个最小节点，再将其右子树同样处理。均摊 `O(1)`，`hasNext` 即判断栈非空。

2. **代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class BSTIterator {
    private Deque<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        stack = new ArrayDeque<>();
        pushLeft(root);
    }

    private void pushLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }

    public int next() {
        TreeNode node = stack.pop();
        pushLeft(node.right);
        return node.val;
    }

    public boolean hasNext() {
        return !stack.isEmpty();
    }
}
```

```python [Python]
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        node = self.stack.pop()
        self._push_left(node.right)
        return node.val

    def hasNext(self) -> bool:
        return bool(self.stack)
```

```go [Go]
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
type BSTIterator struct {
    stack []*TreeNode
}

func Constructor(root *TreeNode) BSTIterator {
    it := BSTIterator{}
    it.pushLeft(root)
    return it
}

func (it *BSTIterator) pushLeft(node *TreeNode) {
    for node != nil {
        it.stack = append(it.stack, node)
        node = node.Left
    }
}

func (it *BSTIterator) Next() int {
    n := len(it.stack)
    node := it.stack[n-1]
    it.stack = it.stack[:n-1]
    it.pushLeft(node.Right)
    return node.Val
}

func (it *BSTIterator) HasNext() bool {
    return len(it.stack) > 0
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class BSTIterator {
    stack<TreeNode*> st;
    void pushLeft(TreeNode* node) {
        while (node) {
            st.push(node);
            node = node->left;
        }
    }
public:
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }

    int next() {
        TreeNode* node = st.top(); st.pop();
        pushLeft(node->right);
        return node->val;
    }

    bool hasNext() {
        return !st.empty();
    }
};
```

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.left = (left === undefined ? null : left)
 *     this.right = (right === undefined ? null : right)
 * }
 */
var BSTIterator = function (root) {
    this.stack = [];
    this.pushLeft(root);
};

BSTIterator.prototype.pushLeft = function (node) {
    while (node) {
        this.stack.push(node);
        node = node.left;
    }
};

BSTIterator.prototype.next = function () {
    const node = this.stack.pop();
    this.pushLeft(node.right);
    return node.val;
};

BSTIterator.prototype.hasNext = function () {
    return this.stack.length > 0;
};
```

```ts [TypeScript]
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.left = (left === undefined ? null : left)
 *         this.right = (right === undefined ? null : right)
 *     }
 * }
 */
class BSTIterator {
    private stack: TreeNode[];

    constructor(root: TreeNode | null) {
        this.stack = [];
        this.pushLeft(root);
    }

    private pushLeft(node: TreeNode | null): void {
        while (node) {
            this.stack.push(node);
            node = node.left;
        }
    }

    next(): number {
        const node = this.stack.pop()!;
        this.pushLeft(node.right);
        return node.val;
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`next`/`hasNext` 均摊 `O(1)`。
- **空间复杂度**：`O(h)`，h 为树高。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 扁平化数组 | `O(n)` | 简单直接 |
| 受控栈 | `O(h)` | 满足进阶，推荐 |

受控栈法本质是**惰性中序遍历**：不在构造时全展开，而是按需展开左链，是迭代器设计的经典范式。
