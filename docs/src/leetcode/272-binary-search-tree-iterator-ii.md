# [272. 二叉搜索树迭代器 II](https://leetcode.cn/problems/binary-search-tree-iterator-ii/) [🔒 会员题]



## 一、题目描述

实现 `BSTIterator` 类，该类表示一个按 **中序遍历** 顺序遍历二叉搜索树（BST）的迭代器：

-   `BSTIterator(TreeNode root)` 初始化 `BSTIterator` 类的一个对象。BST 的根节点 `root` 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
-   `boolean hasNext()` 如果向指针右侧遍历存在数字，则返回 `true` ；否则返回 `false` 。
-   `int next()` 将指针向右移动，然后返回指针处的数字。
-   `boolean hasPrev()` 如果向指针左侧遍历存在数字，则返回 `true` ；否则返回 `false` 。
-   `int prev()` 将指针向左移动，然后返回指针处的数字。

注意：指针初始化为一个不存在于 BST 中的数字，所以对 `hasNext()` 的首次调用将返回 `true` 。你可以假设 `next()` 和 `prev()` 的调用总是有效的（即存在可供遍历的元素）。

**示例：**

```
输入
["BSTIterator", "next", "next", "prev", "next", "hasNext", "next", "next", "next", "hasNext", "hasPrev", "prev", "prev"]
[[[7, 3, 15, 9, 20]], [], [], [], [], [], [], [], [], [], [], []]
输出
[null, 3, 7, 3, 9, true, 15, 20, false, true, 15, 9]

解释
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, 9, 20]);
bSTIterator.next();    // 返回 3
bSTIterator.next();    // 返回 7
bSTIterator.prev();    // 返回 3
bSTIterator.next();    // 返回 9
bSTIterator.hasNext(); // 返回 True
bSTIterator.next();    // 返回 15
bSTIterator.next();    // 返回 20
bSTIterator.hasNext(); // 返回 False
bSTIterator.hasPrev(); // 返回 True
bSTIterator.prev();    // 返回 15
bSTIterator.prev();    // 返回 9
```

**提示：**

-   树中节点数目在范围 `[1, 10⁵]` 内
-   `0 <= Node.val <= 10⁶`
-   最多调用 `10⁵` 次 `hasNext`、 `next`、 `hasPrev` 和 `prev` 。

**进阶：** 你可以不使用任何额外的空间来解决这个问题吗？（提示：使用「惰性加载」与栈）



## 二、解答方法

### 2.1 方法一：数组 + 指针（摊还 O(1)）

1. **思路**

构造时用中序遍历把 BST 的所有节点值存入数组 `arr`，用指针 `index` 表示当前位置。

- 初始 `index = -1`（指向「最小元素之前」）；
- `next()`：`index++`，返回 `arr[index]`；
- `prev()`：`index--`，返回 `arr[index]`；
- `hasNext()`：`index + 1 < arr.length`；
- `hasPrev()`：`index - 1 >= 0`。

所有操作 `O(1)`，构造 `O(n)` 时间 + `O(n)` 空间。

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
 *         this.val = val; this.left = left; this.right = right;
 *     }
 * }
 */
class BSTIterator {
    private List<Integer> arr = new ArrayList<>();
    private int index = -1;          // 指向当前元素，初始在最小元素之前

    public BSTIterator(TreeNode root) {
        inorder(root);               // 中序遍历得到升序数组
    }

    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        arr.add(node.val);
        inorder(node.right);
    }

    public boolean hasNext() {
        return index + 1 < arr.size();
    }

    public int next() {
        return arr.get(++index);
    }

    public boolean hasPrev() {
        return index - 1 >= 0;
    }

    public int prev() {
        return arr.get(--index);
    }
}
```

```python [Python]
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.arr = []
        self.index = -1
        self._inorder(root)

    def _inorder(self, node):
        if not node:
            return
        self._inorder(node.left)
        self.arr.append(node.val)
        self._inorder(node.right)

    def hasNext(self) -> bool:
        return self.index + 1 < len(self.arr)

    def next(self) -> int:
        self.index += 1
        return self.arr[self.index]

    def hasPrev(self) -> bool:
        return self.index - 1 >= 0

    def prev(self) -> int:
        self.index -= 1
        return self.arr[self.index]
```

```go [Go]
type BSTIterator struct {
    arr   []int
    index int
}

func Constructor(root *TreeNode) BSTIterator {
    it := BSTIterator{index: -1}
    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)
        it.arr = append(it.arr, node.Val)
        inorder(node.Right)
    }
    inorder(root)
    return it
}

func (it *BSTIterator) HasNext() bool {
    return it.index+1 < len(it.arr)
}

func (it *BSTIterator) Next() int {
    it.index++
    return it.arr[it.index]
}

func (it *BSTIterator) HasPrev() bool {
    return it.index-1 >= 0
}

func (it *BSTIterator) Prev() int {
    it.index--
    return it.arr[it.index]
}
```

```cpp [C++]
class BSTIterator {
private:
    vector<int> arr;
    int index = -1;

    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        arr.push_back(node->val);
        inorder(node->right);
    }
public:
    BSTIterator(TreeNode* root) {
        inorder(root);
    }

    bool hasNext() {
        return index + 1 < arr.size();
    }

    int next() {
        return arr[++index];
    }

    bool hasPrev() {
        return index - 1 >= 0;
    }

    int prev() {
        return arr[--index];
    }
};
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
    this.arr = [];
    this.index = -1;
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        this.arr.push(node.val);
        inorder(node.right);
    };
    inorder(root);
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
    return this.index + 1 < this.arr.length;
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
    return this.arr[++this.index];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasPrev = function () {
    return this.index - 1 >= 0;
};

/**
 * @return {number}
 */
BSTIterator.prototype.prev = function () {
    return this.arr[--this.index];
};
```

```ts [TypeScript]
class BSTIterator {
    private arr: number[] = [];
    private index: number = -1;

    constructor(root: TreeNode | null) {
        const inorder = (node: TreeNode | null): void => {
            if (!node) return;
            inorder(node.left);
            this.arr.push(node.val);
            inorder(node.right);
        };
        inorder(root);
    }

    hasNext(): boolean {
        return this.index + 1 < this.arr.length;
    }

    next(): number {
        return this.arr[++this.index];
    }

    hasPrev(): boolean {
        return this.index - 1 >= 0;
    }

    prev(): number {
        return this.arr[--this.index];
    }
}
```

::::::

3. **复杂度分析**

- **构造**：`O(n)` 时间、`O(n)` 空间。
- **各操作**：`O(1)`。

### 2.2 方法二：惰性加载 + 单调栈（摊还 O(1) 空间优化）

1. **思路**

若不想一次性遍历整棵树（尤其树很大而只用前几个元素时），可 **惰性中序遍历**：

- 用栈 `stack` 模拟中序遍历，`next()` 时若栈中已耗尽则继续「一路向左」下沉；
- 用数组 `history` 记录 **已经访问过的元素**（用于 `prev()`）；
- `index` 指向 `history` 中当前位置。

- `next()`：若 `index + 1 == history.length`，说明需要「向前推进」，从栈中弹出下一个元素加入 `history`；然后 `index++` 返回；
- `prev()`：直接 `index--` 返回 `history[index]`（已访问过的元素都在 `history` 中）；
- `hasNext()`：栈非空 或 `index + 1 < history.length`；
- `hasPrev()`：`index > 0`。

这样空间只与「已访问元素数 + 树高」成正比，而非整棵树。

2. **代码实现（Python）**

```python
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self.history = []
        self.index = -1
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def hasNext(self) -> bool:
        return self.index + 1 < len(self.history) or bool(self.stack)

    def next(self) -> int:
        self.index += 1
        if self.index == len(self.history):       # 需要新取一个元素
            node = self.stack.pop()
            self.history.append(node.val)
            self._push_left(node.right)
        return self.history[self.index]

    def hasPrev(self) -> bool:
        return self.index > 0

    def prev(self) -> int:
        self.index -= 1
        return self.history[self.index]
```

3. **复杂度分析**

- **构造**：`O(h)`（初始化时一路向左）。
- **`next` / `prev`**：摊还 `O(1)`。
- **空间复杂度**：`O(h + k)`，h 为树高，k 为已访问元素数。

## 三、总结

| 方法 | 构造 | 额外空间 | 特点 |
| ---- | ---- | -------- | ---- |
| 数组 + 指针 | `O(n)` | `O(n)` | 最简单，所有操作 `O(1)` |
| 惰性加载 + 栈 | `O(h)` | `O(h + k)` | 空间渐进分配，进阶要求 |

本题是 `173. 二叉搜索树迭代器` 的扩展，新增了 **向前遍历（`prev`）** 的能力。

关键设计：`prev()` 只能访问 **已经访问过的元素**，因此需要额外维护一个 `history` 数组记录遍历过的节点值。指针 `index` 同时在「已知序列」中前后移动，而 `next()` 在越界时才真正从树中取下一个元素（惰性）。

对比两种方案：若树很大但只遍历前几个元素，惰性法更省空间；若会完整遍历，两者空间相当。
