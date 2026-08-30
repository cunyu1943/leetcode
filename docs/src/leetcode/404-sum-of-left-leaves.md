# [404. 左叶子之和](https://leetcode.cn/problems/sum-of-left-leaves/)

## 一、题目描述

给定二叉树的根节点 `root`，返回所有**左叶子**的值之和。

「左叶子」是指：是其父节点的左孩子，且自身为叶子节点（无左右孩子）。

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：24
解释：左叶子为 9 和 15，9 + 15 = 24。
```

**示例 2：**

```
输入：root = [1]
输出：0
```

**提示：**

- 节点数在 `[1, 1000]` 范围
- `-1000 <= Node.val <= 1000`

## 二、解答方法

### 2.1 方法一：DFS（区分左右）

1. 思路

递归遍历时，判断「当前节点的左孩子是否为叶子」，若是则累加其值；然后递归处理左右子树。注意不能用「节点本身在左边」判断，必须判断它是「父节点的左孩子且为叶子」。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int sumOfLeftLeaves(TreeNode root) {
        if (root == null) return 0;
        int sum = 0;
        if (root.left != null && root.left.left == null && root.left.right == null)
            sum += root.left.val;
        sum += sumOfLeftLeaves(root.left);
        sum += sumOfLeftLeaves(root.right);
        return sum;
    }
}
```

```python [Python]
class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        s = 0
        if root.left and not root.left.left and not root.left.right:
            s += root.left.val
        s += self.sumOfLeftLeaves(root.left)
        s += self.sumOfLeftLeaves(root.right)
        return s
```

```cpp [C++]
class Solution {
public:
    int sumOfLeftLeaves(TreeNode* root) {
        if (!root) return 0;
        int sum = 0;
        if (root->left && !root->left->left && !root->left->right)
            sum += root->left->val;
        sum += sumOfLeftLeaves(root->left);
        sum += sumOfLeftLeaves(root->right);
        return sum;
    }
};
```

```go [Go]
func sumOfLeftLeaves(root *TreeNode) int {
	if root == nil {
		return 0
	}
	sum := 0
	if root.Left != nil && root.Left.Left == nil && root.Left.Right == nil {
		sum += root.Left.Val
	}
	sum += sumOfLeftLeaves(root.Left)
	sum += sumOfLeftLeaves(root.Right)
	return sum
}
```

```javascript [JavaScript]
var sumOfLeftLeaves = function (root) {
    if (!root) return 0;
    let sum = 0;
    if (root.left && !root.left.left && !root.left.right) sum += root.left.val;
    sum += sumOfLeftLeaves(root.left);
    sum += sumOfLeftLeaves(root.right);
    return sum;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$，遍历整棵树。
- 空间复杂度：$O(h)$，递归栈，$h$ 为树高。

## 三、总结

树遍历的易错点是「左叶子」的定义——必须是叶子。判断叶子需在父节点处完成。相关题目：112 路径总和、257 二叉树的所有路径、513 找树左下角的值。
