# [LCR 051. 二叉树中的最大路径和](https://leetcode.cn/problems/jC7MId/)



## 一、题目描述

**路径** 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 **至多出现一次** 。该路径 **至少包含一个** 节点，且不一定经过根节点。

**路径和** 是路径中各节点值的总和。

给定一个二叉树的根节点 `root` ，返回其 **最大路径和**，即所有路径上节点值之和的最大值。



**示例 1：**

```
输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
```

**示例 2：**

```
输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
```

**提示：**

- 树中节点数目范围是 `[1, 3 * 10⁴]`
- `-1000 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：递归（后序遍历）

1. **思路**

对任意节点，经过它的最大路径可能是「左子树贡献 + 节点 + 右子树贡献」。定义递归函数 `gain(node)` 返回「从 `node` 向下走能得到的最大单侧贡献」：

```
gain(node) = node.val + max(gain(left), gain(right), 0)
```

（负数分支贡献按 0 处理，即不选。）

在递归过程中维护全局答案：对每个节点用 `leftGain + node.val + rightGain` 尝试更新答案（左右侧可为 0）。时间 `O(n)`，空间 `O(h)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private int ans = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        dfs(root);
        return ans;
    }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(dfs(node.left), 0);
        int right = Math.max(dfs(node.right), 0);
        ans = Math.max(ans, left + node.val + right);
        return node.val + Math.max(left, right);
    }
}
```

```python [Python]
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.ans = float('-inf')

        def dfs(node):
            if not node:
                return 0
            left = max(dfs(node.left), 0)
            right = max(dfs(node.right), 0)
            self.ans = max(self.ans, left + node.val + right)
            return node.val + max(left, right)

        dfs(root)
        return self.ans
```

```cpp [C++]
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return ans;
    }
private:
    int ans = INT_MIN;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int left = max(dfs(node->left), 0);
        int right = max(dfs(node->right), 0);
        ans = max(ans, left + node->val + right);
        return node->val + max(left, right);
    }
};
```

```go [Go]
func maxPathSum(root *TreeNode) int {
    ans := math.MinInt64
    var dfs func(node *TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        left := dfs(node.Left)
        if left < 0 {
            left = 0
        }
        right := dfs(node.Right)
        if right < 0 {
            right = 0
        }
        if left+node.Val+right > ans {
            ans = left + node.Val + right
        }
        if left > right {
            return node.Val + left
        }
        return node.Val + right
    }
    dfs(root)
    return ans
}
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    let ans = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        ans = Math.max(ans, left + node.val + right);
        return node.val + Math.max(left, right);
    };
    dfs(root);
    return ans;
};
```

```c [C]
#include <stdlib.h>
#include <limits.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

static int ans;

static int dfs(struct TreeNode* node) {
    if (!node) return 0;
    int left = dfs(node->left);
    if (left < 0) left = 0;
    int right = dfs(node->right);
    if (right < 0) right = 0;
    int cur = left + node->val + right;
    if (cur > ans) ans = cur;
    return node->val + (left > right ? left : right);
}

int maxPathSum(struct TreeNode* root) {
    ans = INT_MIN;
    dfs(root);
    return ans;
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

function maxPathSum(root: TreeNode | null): number {
    let ans = -Infinity;
    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        ans = Math.max(ans, left + node.val + right);
        return node.val + Math.max(left, right);
    };
    dfs(root);
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(h)`，递归栈深度。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 后序递归 | `O(n)` | `O(h)` | 标准解法 |

核心是拆分「经过某节点的单侧最大贡献」与「经过某节点的完整路径和」：前者用于向上传递，后者用于更新全局答案。负数分支按 0 处理是避免路径收益下降的关键。

