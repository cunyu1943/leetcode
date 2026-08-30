# [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)



## 一、题目描述

给定一个二叉树的 **根节点** `root`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

**示例 1：**

```
输入：[1,2,3,null,5,null,4]
输出：[1,3,4]
解释：从右看，第一层看到 1，第二层看到 3，第三层看到 4（5 被 4 遮挡）。
```

**示例 2：**

```
输入：[1,null,3]
输出：[1,3]
```

**示例 3：**

```
输入：[]
输出：[]
```

**提示：**

-   二叉树的节点个数的范围是 `[0, 100]`
-   `-100 <= Node.val <= 100`



## 二、解答方法

### 2.1 方法一：层序遍历（BFS）

1. **思路**

按层遍历，每一层取 **最后一个节点**（最右侧）的值加入结果。最直观。

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
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == size - 1) res.add(node.val); // 本层最后一个
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        from collections import deque
        res = []
        if not root:
            return res
        q = deque([root])
        while q:
            size = len(q)
            for i in range(size):
                node = q.popleft()
                if i == size - 1:
                    res.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
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
func rightSideView(root *TreeNode) []int {
    res := []int{}
    if root == nil {
        return res
    }
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        size := len(queue)
        for i := 0; i < size; i++ {
            node := queue[0]
            queue = queue[1:]
            if i == size-1 {
                res = append(res, node.Val)
            }
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == size - 1) res.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    const res = [];
    if (!root) return res;
    const queue = [root];
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (i === size - 1) res.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {TreeNode | null} root
 * @return {number[]}
 */
function rightSideView(root: TreeNode | null): number[] {
    const res: number[] = [];
    if (!root) return res;
    const queue: TreeNode[] = [root];
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!;
            if (i === size - 1) res.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（队列）。

### 2.2 方法二：DFS（先右后左）

1. **思路**

深度优先，先递归右子树再左子树，每进入一层若结果数组长度等于当前深度（说明该层还没记录），则记录第一个遇到的节点（即最右节点）。

2. **代码实现（Python）**

```python
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node, depth):
            if not node:
                return
            if depth == len(res):
                res.append(node.val)
            dfs(node.right, depth + 1)
            dfs(node.left, depth + 1)
        dfs(root, 0)
        return res
```

3. **复杂度分析**

- 时间 `O(n)`，空间 `O(h)`（递归栈）。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| BFS 层序 | 直观，取每层末位 |
| DFS 先右后左 | 代码更短 |

「右视图」本质是「每层最右节点」，BFS 直接取层末；DFS 利用「先右后左 + 深度首次访问」保证记录到最右。左视图（199 的镜像）同理，先左后右即可。
