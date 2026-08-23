# [LCR 054. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/w6cpku/)



## 一、题目描述

给定一个二叉搜索树，请将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和。

提醒一下，二叉搜索树满足下列约束条件：

- 节点的左子树仅包含键 **小于** 节点键的节点
- 节点的右子树仅包含键 **大于** 节点键的节点
- 左右子树也必须是二叉搜索树



**示例 1：**

```
输入：root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

**示例 2：**

```
输入：root = [0,null,1]
输出：[1,null,1]
```

**提示：**

- 树中的节点数在 `[0, 10⁴]` 范围内
- `-10⁴ <= Node.val <= 10⁴`
- 树中的所有值 **互不相同**，且给定的树为二叉搜索树



## 二、解答方法

### 2.1 方法一：反中序遍历（右-中-左）

1. **思路**

累加树要求每个节点值变为「所有不小于它的节点值之和」。BST 的中序遍历是升序，反中序遍历（右根左）就是降序。遍历过程中维护累加和 `sum`：

```
sum += node.val;  node.val = sum;
```

先遍历右子树（更大的值），再处理自身，最后左子树，即可完成累加。时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int sum = 0;
    public TreeNode convertBST(TreeNode root) {
        dfs(root);
        return root;
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.right);
        sum += node.val;
        node.val = sum;
        dfs(node.left);
    }
}
```

```python [Python]
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        self.sum = 0

        def dfs(node):
            if not node:
                return
            dfs(node.right)
            self.sum += node.val
            node.val = self.sum
            dfs(node.left)

        dfs(root)
        return root
```

```cpp [C++]
class Solution {
public:
    TreeNode* convertBST(TreeNode* root) {
        int sum = 0;
        dfs(root, sum);
        return root;
    }
private:
    void dfs(TreeNode* node, int& sum) {
        if (!node) return;
        dfs(node->right, sum);
        sum += node->val;
        node->val = sum;
        dfs(node->left, sum);
    }
};
```

```go [Go]
func convertBST(root *TreeNode) *TreeNode {
    sum := 0
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Right)
        sum += node.Val
        node.Val = sum
        dfs(node.Left)
    }
    dfs(root)
    return root
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
    let sum = 0;
    const dfs = (node) => {
        if (!node) return;
        dfs(node.right);
        sum += node.val;
        node.val = sum;
        dfs(node.left);
    };
    dfs(root);
    return root;
};
```

```c [C]
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

static int sum;

static void dfs(struct TreeNode* node) {
    if (!node) return;
    dfs(node->right);
    sum += node->val;
    node->val = sum;
    dfs(node->left);
}

struct TreeNode* convertBST(struct TreeNode* root) {
    sum = 0;
    dfs(root);
    return root;
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

function convertBST(root: TreeNode | null): TreeNode | null {
    let sum = 0;
    const dfs = (node: TreeNode | null) => {
        if (!node) return;
        dfs(node.right);
        sum += node.val;
        node.val = sum;
        dfs(node.left);
    };
    dfs(root);
    return root;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(h)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 反中序累加 | `O(n)` | `O(h)` | 标准解法 |

「所有不小于当前节点的值之和」在 BST 中就是「右子树的值 + 自身 + 累加和」，用反中序遍历从大到小一次累加即可原地转换。

