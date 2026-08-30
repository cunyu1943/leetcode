# [270. 最接近的二叉搜索树值](https://leetcode.cn/problems/closest-binary-search-tree-value/)



## 一、题目描述

给你一个 **二叉搜索树** 的根节点 `root` 和一个目标值 `target`，请你在该二叉搜索树中找到 **最接近** `target` 的节点值。

如果有多个值 equally close（差值相同），你可以返回其中任意一个。

**注意：** 本题保证 BST 中至少存在一个节点值不等于 `target`。

**示例 1：**

```
输入：root = [4,2,5,1,3], target = 3.714286
输出：4
```

**示例 2：**

```
输入：root = [1], target = 4.428571
输出：1
```

**提示：**

-   树中节点的数目在范围 `[1, 10⁴]` 内
-   `0 <= Node.val <= 10⁹`
-   `-10⁹ <= target <= 10⁹`



## 二、解答方法

### 2.1 方法一：利用 BST 性质迭代（最优）

1. **思路**

从根出发，利用 BST 性质：

- 若 `target < root.val` → 更接近的值在 **左子树**；
- 若 `target > root.val` → 更接近的值在 **右子树**；
- 若相等 → 直接返回。

在下降过程中持续用 `closest` 记录当前遇到的最优值（比较 `|val - target|`）。走到 `null` 时返回 `closest`。

这样只走一条从根到叶的路径，无需遍历整棵树。

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
    public int closestValue(TreeNode root, double target) {
        int closest = root.val;
        TreeNode cur = root;
        while (cur != null) {
            // 更新最优值
            if (Math.abs(cur.val - target) < Math.abs(closest - target)) {
                closest = cur.val;
            }
            // 按 BST 性质下降
            if (target < cur.val) {
                cur = cur.left;
            } else if (target > cur.val) {
                cur = cur.right;
            } else {
                return cur.val;              // 精确命中
            }
        }
        return closest;
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
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        closest = root.val
        cur = root
        while cur:
            if abs(cur.val - target) < abs(closest - target):
                closest = cur.val
            if target < cur.val:
                cur = cur.left
            elif target > cur.val:
                cur = cur.right
            else:
                return cur.val
        return closest
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
func closestValue(root *TreeNode, target float64) int {
    closest := root.Val
    cur := root
    for cur != nil {
        if abs(cur.Val, target) < abs(closest, target) {
            closest = cur.Val
        }
        if target < float64(cur.Val) {
            cur = cur.Left
        } else if target > float64(cur.Val) {
            cur = cur.Right
        } else {
            return cur.Val
        }
    }
    return closest
}

func abs(x int, t float64) float64 {
    d := float64(x) - t
    if d < 0 {
        return -d
    }
    return d
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
    int closestValue(TreeNode* root, double target) {
        int closest = root->val;
        TreeNode* cur = root;
        while (cur) {
            if (fabs(cur->val - target) < fabs(closest - target)) {
                closest = cur->val;
            }
            if (target < cur->val) cur = cur->left;
            else if (target > cur->val) cur = cur->right;
            else return cur->val;
        }
        return closest;
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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
    let closest = root.val;
    let cur = root;
    while (cur) {
        if (Math.abs(cur.val - target) < Math.abs(closest - target)) {
            closest = cur.val;
        }
        if (target < cur.val) cur = cur.left;
        else if (target > cur.val) cur = cur.right;
        else return cur.val;
    }
    return closest;
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
 * @param {number} target
 * @return {number}
 */
function closestValue(root: TreeNode | null, target: number): number {
    let closest = root!.val;
    let cur = root;
    while (cur) {
        if (Math.abs(cur.val - target) < Math.abs(closest - target)) {
            closest = cur.val;
        }
        if (target < cur.val) cur = cur.left;
        else if (target > cur.val) cur = cur.right;
        else return cur.val;
    }
    return closest;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(h)`，h 为树高（平衡 BST 为 `O(log n)`，最坏 `O(n)`）。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：中序遍历（通用，无需 BST 性质）

1. **思路**

BST 的中序遍历是 **升序序列**。遍历过程中维护 `closest`，因为序列递增，一旦当前值与 target 的差值开始变大，就可以提前终止（后续只会更远）。

2. **代码实现（Python）**

```python
class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        closest = root.val
        stack = []
        cur = root
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            if abs(cur.val - target) < abs(closest - target):
                closest = cur.val
            elif cur.val > target:
                break                      # 序列递增，后续只会更远
            cur = cur.right
        return closest
```

3. **复杂度分析**

- **时间复杂度**：`O(h + k)`，k 为实际遍历的节点数。
- **空间复杂度**：`O(h)`。

## 三、总结

| 方法 | 时间 | 空间 | 特点 |
| ---- | ---- | ---- | ---- |
| 利用 BST 性质下降 | `O(h)` | `O(1)` | 最优，推荐 |
| 中序遍历 | `O(n)` | `O(h)` | 通用，可提前终止 |

**核心思路**：BST 提供了「二分查找」能力 —— 每一步都能确定性地排除一半子树，同时在路径上记录遇到的最优解。

为什么「沿路径记录最优值」是正确的？因为最接近 target 的节点必然在 **从根到 target 应走的那条搜索路径** 上：若 target 小于当前节点值而走向左子树，那么右子树的所有值都比当前值更大，只会离 target 更远。

延伸：`272. 最接近的二叉搜索树值 II`（找最接近的 k 个值）需要用双向的中序序列（单调栈）。
