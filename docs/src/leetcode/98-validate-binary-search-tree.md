# [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)



## 一、题目描述

给你一个二叉树的根节点 `root`，判断其是否是一个有效的 **二叉搜索树（BST）**。

有效 BST 定义：节点的左子树只包含小于当前节点的数；右子树只包含大于当前节点的数；左右子树也必须是 BST。

**示例 1：**

```
输入：root = [2,1,3]
输出：true
```

**示例 2：**

```
输入：root = [5,1,4,null,null,3,6]
输出：false
```

**提示：**

-   树中节点数目在范围 `[1, 10^4]` 内
-   `-2^31 <= Node.val <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：递归（上下界）


1. **思路**

对每个节点维护一个合法的取值范围 `[low, high]`，递归判断左子树上限为当前值、右子树下限为当前值。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isValidBST(TreeNode root) {
        return dfs(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean dfs(TreeNode node, long low, long high) {
        if (node == null) return true;
        if (node.val <= low || node.val >= high) return false;
        return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
    }
}
```

```python [Python]
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def dfs(node, low, high):
            if not node: return True
            if node.val <= low or node.val >= high: return False
            return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)
        return dfs(root, float('-inf'), float('inf'))
```

```go [Go]
func isValidBST(root *TreeNode) bool {
    var dfs func(*TreeNode, int, int) bool
    dfs = func(node *TreeNode, low, high int) bool {
        if node == nil { return true }
        if node.Val <= low || node.Val >= high { return false }
        return dfs(node.Left, low, node.Val) && dfs(node.Right, node.Val, high)
    }
    return dfs(root, -1<<31-1, 1<<31)
}
```

```c [C]
bool dfs(struct TreeNode* node, long low, long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    return dfs(node->left, low, node->val) && dfs(node->right, node->val, high);
}
bool isValidBST(struct TreeNode* root) {
    return dfs(root, -2147483649L, 2147483648L);
}
```

```cpp [C++]
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return dfs(root, LONG_MIN, LONG_MAX);
    }
private:
    bool dfs(TreeNode* node, long low, long high) {
        if (!node) return true;
        if (node->val <= low || node->val >= high) return false;
        return dfs(node->left, low, node->val) && dfs(node->right, node->val, high);
    }
};
```

```javascript [JavaScript]
var isValidBST = function(root) {
    const dfs = (node, low, high) => {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
    };
    return dfs(root, -Infinity, Infinity);
};
```

```typescript [TypeScript]
function isValidBST(root: TreeNode | null): boolean {
    const dfs = (node: TreeNode | null, low: number, high: number): boolean => {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
    };
    return dfs(root, -Infinity, Infinity);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(n)`，递归栈深度。

### 2.2 方法二：中序遍历


1. **思路**

BST 的中序遍历结果为严格递增序列，遍历过程中记录前驱值，若出现非递增即可判定无效。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private long prev = Long.MIN_VALUE;
    public boolean isValidBST(TreeNode root) {
        if (root == null) return true;
        if (!isValidBST(root.left)) return false;
        if (root.val <= prev) return false;
        prev = root.val;
        return isValidBST(root.right);
    }
}
```

```python [Python]
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        prev = [float('-inf')]
        def dfs(node):
            if not node: return True
            if not dfs(node.left): return False
            if node.val <= prev[0]: return False
            prev[0] = node.val
            return dfs(node.right)
        return dfs(root)
```

```go [Go]
func isValidBST(root *TreeNode) bool {
    prev := math.MinInt64
    var dfs func(*TreeNode) bool
    dfs = func(node *TreeNode) bool {
        if node == nil { return true }
        if !dfs(node.Left) { return false }
        if node.Val <= prev { return false }
        prev = node.Val
        return dfs(node.Right)
    }
    return dfs(root)
}
```

```c [C]
bool dfs(struct TreeNode* node, long* prev) {
    if (!node) return true;
    if (!dfs(node->left, prev)) return false;
    if (node->val <= *prev) return false;
    *prev = node->val;
    return dfs(node->right, prev);
}
bool isValidBST(struct TreeNode* root) {
    long prev = -2147483649L;
    return dfs(root, &prev);
}
```

```cpp [C++]
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        long prev = LONG_MIN;
        function<bool(TreeNode*)> dfs = [&](TreeNode* node) -> bool {
            if (!node) return true;
            if (!dfs(node->left)) return false;
            if (node->val <= prev) return false;
            prev = node->val;
            return dfs(node->right);
        };
        return dfs(root);
    }
};
```

```javascript [JavaScript]
var isValidBST = function(root) {
    let prev = -Infinity;
    const dfs = (node) => {
        if (!node) return true;
        if (!dfs(node.left)) return false;
        if (node.val <= prev) return false;
        prev = node.val;
        return dfs(node.right);
    };
    return dfs(root);
};
```

```typescript [TypeScript]
function isValidBST(root: TreeNode | null): boolean {
    let prev: number = -Infinity;
    const dfs = (node: TreeNode | null): boolean => {
        if (!node) return true;
        if (!dfs(node.left)) return false;
        if (node.val <= prev) return false;
        prev = node.val;
        return dfs(node.right);
    };
    return dfs(root);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，递归栈或隐式中序。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归（上下界） | `O(n)` | `O(n)` | 概念清晰，推荐 |
| 中序遍历 | `O(n)` | `O(n)` | 利用 BST 有序性质 |
