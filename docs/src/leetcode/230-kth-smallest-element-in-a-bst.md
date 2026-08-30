# [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)



## 一、题目描述

给定一个二叉搜索树的根节点 `root` ，和一个整数 `k` ，请你设计一个算法查找其中第 `k` 小的元素（**从 1 开始计数**）。



**示例 1：**

```
输入：root = [3,1,4,null,2], k = 1
输出：1
```

**示例 2：**

```
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
```

**提示：**

-   树中的节点数为 `n` 。
-   `1 <= k <= n <= 10⁴`
-   `0 <= Node.val <= 10⁴`

**进阶：** 如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？



## 二、解答方法

### 2.1 方法一：中序遍历（递归 / 迭代）

1. **思路**

**BST 的中序遍历结果是升序序列**，因此第 k 个被访问的节点即第 k 小的元素。遍历时用计数器 `k`，每访问一个节点减 1，减到 0 时记录答案并可提前返回（剪枝）。

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
    private int k;
    private int result;

    public int kthSmallest(TreeNode root, int k) {
        this.k = k;
        inorder(root);
        return result;
    }

    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (--k == 0) {
            result = node.val;
            return;               // 提前终止
        }
        inorder(node.right);
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
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        cur = root
        while cur or stack:
            while cur:                  # 一路向左
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()           # 访问节点
            k -= 1
            if k == 0:
                return cur.val
            cur = cur.right             # 转向右子树
        return -1
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
func kthSmallest(root *TreeNode, k int) int {
    stack := []*TreeNode{}
    cur := root
    for cur != nil || len(stack) > 0 {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }
        cur = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        k--
        if k == 0 {
            return cur.Val
        }
        cur = cur.Right
    }
    return -1
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
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* cur = root;
        while (cur || !st.empty()) {
            while (cur) {
                st.push(cur);
                cur = cur->left;
            }
            cur = st.top(); st.pop();
            if (--k == 0) return cur->val;
            cur = cur->right;
        }
        return -1;
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    const stack = [];
    let cur = root;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        if (--k === 0) return cur.val;
        cur = cur.right;
    }
    return -1;
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
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root: TreeNode | null, k: number): number {
    const stack: TreeNode[] = [];
    let cur = root;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop()!;
        if (--k === 0) return cur.val;
        cur = cur.right;
    }
    return -1;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(h + k)`，h 为树高（找到第 k 个即停止）。
- **空间复杂度**：`O(h)`（栈 / 递归）。

### 2.2 方法二：记录子树节点数（进阶，支持频繁查询）

1. **思路**

若 BST 频繁修改且需频繁查询第 k 小，可维护每个节点的 **子树节点总数**（在插入/删除时更新）。查询时从根出发：

- 记左子树节点数为 `leftCount`；
- 若 `k <= leftCount` → 在左子树中查找；
- 若 `k == leftCount + 1` → 当前节点即答案；
- 否则 → 在右子树中找第 `k - leftCount - 1` 小。

单次查询降为 `O(h)`（平衡时 `O(log n)`）。

2. **代码实现（Python，示意）**

```python
class Solution:
    def kthSmallest(self, root, k):
        # 假设每个节点已维护 .size（子树节点总数）
        node = root
        while node:
            left_size = node.left.size if node.left else 0
            if k <= left_size:
                node = node.left
            elif k == left_size + 1:
                return node.val
            else:
                k -= left_size + 1
                node = node.right
        return -1
```

3. **复杂度分析**

- 查询 `O(h)`，平衡树 `O(log n)`。

## 三、总结

| 方法 | 时间 | 适用 |
| ---- | ---- | ---- |
| 中序遍历 | `O(h + k)` | 一次性查询 |
| 子树节点数 | `O(h)` | 频繁修改 + 频繁查询 |

核心性质：**BST 的中序遍历 = 升序序列**（94 题）。迭代版中序遍历（显式栈）是通用模板，可提前在第 k 个节点终止，避免遍历全树。
