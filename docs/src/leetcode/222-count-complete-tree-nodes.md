# [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)



## 一、题目描述

给你一棵 **完全二叉树** 的根节点 `root` ，求出该树的节点个数。

**完全二叉树** 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层 **最左边** 的若干位置。若最底层为第 `h` 层，则该层包含 `1~ 2ʰ` 个节点。

**示例 1：**

```
输入：root = [1,2,3,4,5,6]
输出：6
```

**示例 2：**

```
输入：root = []
输出：0
```

**示例 3：**

```
输入：root = [1]
输出：1
```

**提示：**

-   树中节点的数目范围是 `[0, 5 * 10⁴]`
-   `0 <= Node.val <= 5 * 10⁴`
-   题目数据保证输入的树是 **完全二叉树**

**进阶：** 遍历树来统计节点是一种时间复杂度为 `O(n)` 的简单解决方案。你可以设计一个更快的算法吗？



## 二、解答方法

### 2.1 方法一：利用完全二叉树性质（O(log² n)，最优）

1. **思路**

完全二叉树的关键性质：**其左/右子树中至少有一棵是「满二叉树」**，满二叉树节点数可直接用公式 `2^h - 1` 计算。

- 分别求 **最左路径高度** `leftHeight` 和 **最右路径高度** `rightHeight`；
- 若二者相等 ⇒ 该树是 **满二叉树**，直接返回 `2^h - 1`；
- 否则递归统计左右子树节点数之和 + 1（根）。

由于每层的两个子树中总有一个是满二叉树（可 `O(log n)` 直接算），递归深度 `O(log n)`，总时间 `O(log² n)`。

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
class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int leftH = 0, rightH = 0;
        TreeNode p = root;
        while (p != null) { leftH++; p = p.left; }    // 最左路径高度
        p = root;
        while (p != null) { rightH++; p = p.right; }  // 最右路径高度
        if (leftH == rightH) {
            return (1 << leftH) - 1;                  // 满二叉树：2^h - 1
        }
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        left_h = right_h = 0
        p = root
        while p:
            left_h += 1
            p = p.left
        p = root
        while p:
            right_h += 1
            p = p.right
        if left_h == right_h:
            return (1 << left_h) - 1          # 满二叉树公式
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
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
func countNodes(root *TreeNode) int {
    if root == nil {
        return 0
    }
    leftH, rightH := 0, 0
    for p := root; p != nil; p = p.Left {
        leftH++
    }
    for p := root; p != nil; p = p.Right {
        rightH++
    }
    if leftH == rightH {
        return (1 << leftH) - 1
    }
    return 1 + countNodes(root.Left) + countNodes(root.Right)
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
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int leftH = 0, rightH = 0;
        for (TreeNode* p = root; p; p = p->left) leftH++;
        for (TreeNode* p = root; p; p = p->right) rightH++;
        if (leftH == rightH) return (1 << leftH) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    if (!root) return 0;
    let leftH = 0, rightH = 0;
    for (let p = root; p; p = p.left) leftH++;
    for (let p = root; p; p = p.right) rightH++;
    if (leftH === rightH) return (1 << leftH) - 1;
    return 1 + countNodes(root.left) + countNodes(root.right);
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
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
/**
 * @param {TreeNode | null} root
 * @return {number}
 */
function countNodes(root: TreeNode | null): number {
    if (!root) return 0;
    let leftH = 0, rightH = 0;
    for (let p: TreeNode | null = root; p; p = p.left) leftH++;
    for (let p: TreeNode | null = root; p; p = p.right) rightH++;
    if (leftH === rightH) return (1 << leftH) - 1;
    return 1 + countNodes(root.left) + countNodes(root.right);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log² n)`（每层 `O(log n)` 求高度，共 `O(log n)` 层）。
- **空间复杂度**：`O(log n)`（递归栈）。

### 2.2 方法二：二分查找 + 位路径判断（O(log² n)）

1. **思路**

完全二叉树的节点可按层序编号 `1 ~ n`。判断编号 `k` 的节点是否存在：把 `k` 写成二进制，去掉最高位的 `1`，剩余位从高位到低位指示「0 走左、1 走右」的路径（这一性质源于完全二叉树的层序编号与堆式存储一致）。于是可 **二分查找** 最大存在的编号。

2. **代码实现（Python）**

```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        # 求最左路径高度
        level = 0
        p = root
        while p.left:
            level += 1
            p = p.left
        # 二分查找最后一层最大编号
        lo, hi = 1 << level, (1 << (level + 1)) - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if self.exists(root, level, mid):
                lo = mid
            else:
                hi = mid - 1
        return lo

    def exists(self, root, level, k):
        # 用 k 的第 (level-1) ~ 0 位（去掉最高位）决定路径
        bits = 1 << (level - 1)
        node = root
        while node and bits > 0:
            if bits & k:
                node = node.right
            else:
                node = node.left
            bits >>= 1
        return node is not None
```

3. **复杂度分析**

- **时间复杂度**：`O(log² n)`。
- **空间复杂度**：`O(1)`（不计递归）。

### 2.3 方法三：普通遍历（O(n)）

1. **思路**

完全二叉树也是二叉树，直接递归/层序遍历统计即可，最简单但不符合进阶要求。

2. **代码实现（Python）**

```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
```

## 三、总结

| 方法 | 时间 | 特点 |
| ---- | ---- | ---- |
| 满二叉树性质递归 | `O(log² n)` | 推荐，代码简洁 |
| 二分 + 位路径 | `O(log² n)` | 思路巧妙，常数略大 |
| 普通遍历 | `O(n)` | 通用但不满足进阶 |

核心性质：**完全二叉树的子树中必有一个是满二叉树**，满二叉树节点数 `= 2^h - 1` 可 `O(1)` 计算，从而避免遍历全部节点。
