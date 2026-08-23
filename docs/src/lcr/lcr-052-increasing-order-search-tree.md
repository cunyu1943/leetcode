# [LCR 052. 递增顺序搜索树](https://leetcode.cn/problems/NYBBNL/)



## 一、题目描述

给你一棵二叉搜索树，请你按 **中序遍历** 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。



**示例 1：**

```
输入：root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
输出：[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
```

**示例 2：**

```
输入：root = [5,1,7]
输出：[1,null,5,null,7]
```

**提示：**

- 树中节点数的取值范围是 `[1, 100]`
- `0 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：中序遍历 + 重新连接

1. **思路**

中序遍历二叉搜索树得到升序序列，在遍历过程中把当前节点连接到「上一个节点的右孩子」，并置左孩子为 `null`：

- 用一个 `dummy` 哨兵节点，`cur` 指向当前已排好的链尾；
- 中序访问每个节点：`cur.right = node; node.left = null; cur = node;`
- 返回 `dummy.right`。

时间 `O(n)`，空间 `O(h)`（递归栈）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private TreeNode cur;
    public TreeNode increasingBST(TreeNode root) {
        TreeNode dummy = new TreeNode(0);
        cur = dummy;
        dfs(root);
        return dummy.right;
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        node.left = null;
        cur.right = node;
        cur = node;
        dfs(node.right);
    }
}
```

```python [Python]
class Solution:
    def increasingBST(self, root: TreeNode) -> TreeNode:
        dummy = TreeNode(0)
        self.cur = dummy

        def dfs(node):
            if not node:
                return
            dfs(node.left)
            node.left = None
            self.cur.right = node
            self.cur = node
            dfs(node.right)

        dfs(root)
        return dummy.right
```

```cpp [C++]
class Solution {
public:
    TreeNode* increasingBST(TreeNode* root) {
        TreeNode* dummy = new TreeNode(0);
        cur = dummy;
        dfs(root);
        return dummy->right;
    }
private:
    TreeNode* cur;
    void dfs(TreeNode* node) {
        if (!node) return;
        dfs(node->left);
        node->left = nullptr;
        cur->right = node;
        cur = node;
        dfs(node->right);
    }
};
```

```go [Go]
func increasingBST(root *TreeNode) *TreeNode {
    dummy := &TreeNode{}
    cur := dummy
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        node.Left = nil
        cur.Right = node
        cur = node
        dfs(node.Right)
    }
    dfs(root)
    return dummy.Right
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    const dummy = new TreeNode(0);
    let cur = dummy;
    const dfs = (node) => {
        if (!node) return;
        dfs(node.left);
        node.left = null;
        cur.right = node;
        cur = node;
        dfs(node.right);
    };
    dfs(root);
    return dummy.right;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* increasingBST(struct TreeNode* root) {
    struct TreeNode dummy;
    dummy.right = NULL;
    struct TreeNode* cur = &dummy;

    // 迭代中序（左根右），边遍历边重连
    struct TreeNode* stk[100];
    int top = 0;
    struct TreeNode* node = root;
    while (node || top > 0) {
        while (node) { stk[top++] = node; node = node->left; }
        node = stk[--top];
        node->left = NULL;
        cur->right = node;
        cur = node;
        node = node->right;
    }
    return dummy.right;
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

function increasingBST(root: TreeNode | null): TreeNode | null {
    const dummy = new TreeNode(0);
    let cur: TreeNode = dummy;
    const dfs = (node: TreeNode | null) => {
        if (!node) return;
        dfs(node.left);
        node.left = null;
        cur.right = node;
        cur = node;
        dfs(node.right);
    };
    dfs(root);
    return dummy.right;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈（C 迭代版为 `O(h)` 显式栈）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 中序 + 重连 | `O(n)` | `O(h)` | 标准解法 |

中序遍历天然产生升序序列，边遍历边把节点串成右链（左孩子置空），即可原地完成「展平为递增顺序搜索树」。

