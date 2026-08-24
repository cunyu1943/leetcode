# [面试题 04.12. 求和路径](https://leetcode.cn/problems/paths-with-sum-lcci/)

## 一、题目描述

给定一棵二叉树，其中每个节点都含有一个整数数值（该值或正或负）。设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。注意，路径不一定非得从二叉树的根节点开始，也不一定到叶子节点结束，但路径方向必须向下（只能从父节点走向子节点）。

**示例：**

```
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1

返回：3
解释：和为 22 的路径有：[5,4,11,2], [5,8,4,5], [4,11,7]
```

**提示：**

- 节点总数在 `[0, 10000]` 范围内。
- 每个节点的值在 `[-10000, 10000]` 范围内。
- 目标值 `sum` 在 `[-10000, 10000]` 范围内。

---

## 二、解答方法

### 2.1 方法一：双重递归（暴力枚举）

**1. 思路**

对于每个节点，以该节点为起点，向下递归计算所有路径和，统计等于目标值的数量。这需要两层递归：外层遍历所有节点，内层以该节点为起点计算路径和。时间复杂度 O(n^2)，空间复杂度 O(n)（递归栈）。适用于节点数较少的情况。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int pathSum(TreeNode root, int sum) {
        if (root == null) return 0;
        return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    }
    private int dfs(TreeNode node, int sum) {
        if (node == null) return 0;
        int res = 0;
        if (node.val == sum) res++;
        res += dfs(node.left, sum - node.val);
        res += dfs(node.right, sum - node.val);
        return res;
    }
}
```

```python [Python]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> int:
        if not root:
            return 0
        return self.dfs(root, sum) + self.pathSum(root.left, sum) + self.pathSum(root.right, sum)

    def dfs(self, node, sum):
        if not node:
            return 0
        res = 1 if node.val == sum else 0
        res += self.dfs(node.left, sum - node.val)
        res += self.dfs(node.right, sum - node.val)
        return res
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
func pathSum(root *TreeNode, sum int) int {
    if root == nil {
        return 0
    }
    return dfs(root, sum) + pathSum(root.Left, sum) + pathSum(root.Right, sum)
}
func dfs(node *TreeNode, sum int) int {
    if node == nil {
        return 0
    }
    res := 0
    if node.Val == sum {
        res++
    }
    res += dfs(node.Left, sum-node.Val)
    res += dfs(node.Right, sum-node.Val)
    return res
}
```

```c [C]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
int dfs(struct TreeNode* node, int sum) {
    if (!node) return 0;
    int res = (node->val == sum) ? 1 : 0;
    res += dfs(node->left, sum - node->val);
    res += dfs(node->right, sum - node->val);
    return res;
}
int pathSum(struct TreeNode* root, int sum) {
    if (!root) return 0;
    return dfs(root, sum) + pathSum(root->left, sum) + pathSum(root->right, sum);
}
```

```cpp [C++]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int pathSum(TreeNode* root, int sum) {
        if (!root) return 0;
        return dfs(root, sum) + pathSum(root->left, sum) + pathSum(root->right, sum);
    }
    int dfs(TreeNode* node, int sum) {
        if (!node) return 0;
        int res = (node->val == sum) ? 1 : 0;
        res += dfs(node->left, sum - node->val);
        res += dfs(node->right, sum - node->val);
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var pathSum = function(root, sum) {
    if (!root) return 0;
    function dfs(node, target) {
        if (!node) return 0;
        let res = (node.val === target) ? 1 : 0;
        res += dfs(node.left, target - node.val);
        res += dfs(node.right, target - node.val);
        return res;
    }
    return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
};
```

```typescript [TypeScript]
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
function pathSum(root: TreeNode | null, sum: number): number {
    if (!root) return 0;
    function dfs(node: TreeNode | null, target: number): number {
        if (!node) return 0;
        let res = (node.val === target) ? 1 : 0;
        res += dfs(node.left, target - node.val);
        res += dfs(node.right, target - node.val);
        return res;
    }
    return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n^2)`，最坏情况下每个节点都要向下遍历。
- **空间复杂度**：`O(n)`，递归栈深度。

---

### 2.2 方法二：前缀和 + DFS（一次性遍历，O(n)）

**1. 思路**

利用前缀和思想。在深度优先遍历过程中，维护从根节点到当前节点的路径和 `currSum`，同时用一个哈希表记录从根节点到当前节点为止，所有前缀和出现的次数。对于每个节点，我们需要查找 `currSum - target` 是否已经出现过，若出现，则说明存在以该节点为终点的路径，其和为 `target`。注意：路径方向必须向下，前缀和的思想正好满足。

具体步骤：

- 使用哈希表 `prefix`，初始存入 `{0: 1}`，表示空路径。
- 递归遍历节点，计算当前路径和 `currSum`。
- 查找 `currSum - target` 在哈希表中的次数，累加到结果。
- 更新哈希表，增加 `currSum` 的计数。
- 递归处理左右子节点。
- 回溯时，减少 `currSum` 的计数（恢复状态）。

此方法时间复杂度 O(n)，空间复杂度 O(n)。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    private int count = 0;
    public int pathSum(TreeNode root, int sum) {
        Map<Integer, Integer> prefix = new HashMap<>();
        prefix.put(0, 1);
        dfs(root, 0, sum, prefix);
        return count;
    }
    private void dfs(TreeNode node, int currSum, int target, Map<Integer, Integer> prefix) {
        if (node == null) return;
        currSum += node.val;
        count += prefix.getOrDefault(currSum - target, 0);
        prefix.put(currSum, prefix.getOrDefault(currSum, 0) + 1);
        dfs(node.left, currSum, target, prefix);
        dfs(node.right, currSum, target, prefix);
        prefix.put(currSum, prefix.get(currSum) - 1);
    }
}
```

```python [Python]
class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> int:
        self.count = 0
        prefix = {0: 1}
        def dfs(node, curr_sum):
            if not node:
                return
            curr_sum += node.val
            self.count += prefix.get(curr_sum - sum, 0)
            prefix[curr_sum] = prefix.get(curr_sum, 0) + 1
            dfs(node.left, curr_sum)
            dfs(node.right, curr_sum)
            prefix[curr_sum] -= 1
        dfs(root, 0)
        return self.count
```

```go [Go]
func pathSum(root *TreeNode, sum int) int {
    count := 0
    prefix := map[int]int{0: 1}
    var dfs func(*TreeNode, int)
    dfs = func(node *TreeNode, currSum int) {
        if node == nil {
            return
        }
        currSum += node.Val
        count += prefix[currSum-sum]
        prefix[currSum]++
        dfs(node.Left, currSum)
        dfs(node.Right, currSum)
        prefix[currSum]--
    }
    dfs(root, 0)
    return count
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

// 使用简单哈希表（假设节点值范围有限，此处用数组模拟，实际可改用uthash）
// 此处为了演示，采用递归+数组（但值可能为负，不通用），实际建议使用uthash。
// 下面给出使用静态数组的简化版本（仅作思路展示，生产环境应使用uthash）。
int count = 0;
int prefix[20001] = {0}; // 假设值范围-10000~10000，偏移量10000
void dfs(struct TreeNode* node, int currSum, int target) {
    if (!node) return;
    currSum += node->val;
    int key = currSum + 10000;
    count += prefix[key - target + 10000];
    prefix[key]++;
    dfs(node->left, currSum, target);
    dfs(node->right, currSum, target);
    prefix[key]--;
}
int pathSum(struct TreeNode* root, int sum) {
    count = 0;
    memset(prefix, 0, sizeof(prefix));
    prefix[10000] = 1; // 空路径
    dfs(root, 0, sum);
    return count;
}
```

```cpp [C++]
class Solution {
public:
    int pathSum(TreeNode* root, int sum) {
        int count = 0;
        unordered_map<int, int> prefix;
        prefix[0] = 1;
        function<void(TreeNode*, int)> dfs = [&](TreeNode* node, int currSum) {
            if (!node) return;
            currSum += node->val;
            count += prefix[currSum - sum];
            prefix[currSum]++;
            dfs(node->left, currSum);
            dfs(node->right, currSum);
            prefix[currSum]--;
        };
        dfs(root, 0);
        return count;
    }
};
```

```javascript [JavaScript]
var pathSum = function(root, sum) {
    let count = 0;
    const prefix = new Map();
    prefix.set(0, 1);
    function dfs(node, currSum) {
        if (!node) return;
        currSum += node.val;
        count += prefix.get(currSum - sum) || 0;
        prefix.set(currSum, (prefix.get(currSum) || 0) + 1);
        dfs(node.left, currSum);
        dfs(node.right, currSum);
        prefix.set(currSum, prefix.get(currSum) - 1);
    }
    dfs(root, 0);
    return count;
};
```

```typescript [TypeScript]
function pathSum(root: TreeNode | null, sum: number): number {
    let count = 0;
    const prefix = new Map<number, number>();
    prefix.set(0, 1);
    function dfs(node: TreeNode | null, currSum: number): void {
        if (!node) return;
        currSum += node.val;
        count += prefix.get(currSum - sum) || 0;
        prefix.set(currSum, (prefix.get(currSum) || 0) + 1);
        dfs(node.left, currSum);
        dfs(node.right, currSum);
        prefix.set(currSum, prefix.get(currSum)! - 1);
    }
    dfs(root, 0);
    return count;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个节点遍历一次。
- **空间复杂度**：`O(n)`，哈希表和递归栈。

---

## 三、总结

| 方法                 | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------------- | ---------- | ---------- | -------------------------- |
| 双重递归（暴力枚举） | `O(n²)`    | `O(n)`     | 直观易懂，但效率较低       |
| 前缀和 + DFS         | `O(n)`     | `O(n)`     | **推荐**，一次性遍历，高效 |

**推荐**：在实际生产环境中，**方法二（前缀和 + DFS）** 是最佳选择，时间复杂度 O(n)，能高效处理大数据量。方法一虽然实现简单，但在节点数较多时可能超时。
