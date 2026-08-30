# [257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)



## 一、题目描述

给你一个二叉树的根节点 `root` ，按 **任意顺序** ，返回所有从根节点到叶子节点的路径。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

```
输入：root = [1,2,3,null,5]
输出：["1->2->5","1->3"]
```

**示例 2：**

```
输入：root = [1]
输出：["1"]
```

**提示：**

-   树中节点的数目在范围 `[1, 100]` 内
-   `-100 <= Node.val <= 100`



## 二、解答方法

### 2.1 方法一：DFS 回溯

1. **思路**

深度优先遍历，用 `path` 记录当前路径上的节点值。

- 访问节点时把值加入 `path`；
- 若是 **叶子节点**（左右子树均为空），把 `path` 用 `"->"` 连接成字符串加入结果；
- 否则递归左右子树；
- 递归返回后 **撤销选择**（`path.pop()`），即回溯。

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
    private List<String> res = new ArrayList<>();

    public List<String> binaryTreePaths(TreeNode root) {
        dfs(root, new ArrayList<>());
        return res;
    }

    private void dfs(TreeNode node, List<String> path) {
        if (node == null) return;
        path.add(String.valueOf(node.val));
        if (node.left == null && node.right == null) {   // 叶子节点
            res.add(String.join("->", path));
        } else {
            dfs(node.left, path);
            dfs(node.right, path);
        }
        path.remove(path.size() - 1);                    // 回溯
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
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        res = []

        def dfs(node, path):
            if not node:
                return
            path.append(str(node.val))
            if not node.left and not node.right:      # 叶子节点
                res.append('->'.join(path))
            else:
                dfs(node.left, path)
                dfs(node.right, path)
            path.pop()                                # 回溯

        dfs(root, [])
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
func binaryTreePaths(root *TreeNode) []string {
    res := []string{}
    var dfs func(node *TreeNode, path []string)
    dfs = func(node *TreeNode, path []string) {
        if node == nil {
            return
        }
        path = append(path, strconv.Itoa(node.Val))
        if node.Left == nil && node.Right == nil {
            res = append(res, strings.Join(path, "->"))
        } else {
            dfs(node.Left, path)
            dfs(node.Right, path)
        }
        path = path[:len(path)-1]      // 回溯
    }
    dfs(root, []string{})
    return res
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
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> res;
        vector<string> path;
        dfs(root, path, res);
        return res;
    }
private:
    void dfs(TreeNode* node, vector<string>& path, vector<string>& res) {
        if (!node) return;
        path.push_back(to_string(node->val));
        if (!node->left && !node->right) {
            string s;
            for (int i = 0; i < path.size(); i++) {
                if (i > 0) s += "->";
                s += path[i];
            }
            res.push_back(s);
        } else {
            dfs(node->left, path, res);
            dfs(node->right, path, res);
        }
        path.pop_back();
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    const res = [];
    const dfs = (node, path) => {
        if (!node) return;
        path.push(String(node.val));
        if (!node.left && !node.right) {
            res.push(path.join('->'));
        } else {
            dfs(node.left, path);
            dfs(node.right, path);
        }
        path.pop();
    };
    dfs(root, []);
    return res;
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
 * @return {string[]}
 */
function binaryTreePaths(root: TreeNode | null): string[] {
    const res: string[] = [];
    const dfs = (node: TreeNode | null, path: string[]): void => {
        if (!node) return;
        path.push(String(node.val));
        if (!node.left && !node.right) {
            res.push(path.join('->'));
        } else {
            dfs(node.left, path);
            dfs(node.right, path);
        }
        path.pop();
    };
    dfs(root, []);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n × h)`，n 为节点数，h 为树高（每条路径拼接需 `O(h)`）。
- **空间复杂度**：`O(n × h)`（结果集），递归栈 `O(h)`。

### 2.2 方法二：BFS 层序遍历

1. **思路**

用队列同时维护「节点」和「该节点对应的路径字符串」。遍历到叶子节点时把路径加入结果。

2. **代码实现（Python）**

```python
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        from collections import deque
        res = []
        queue = deque([(root, str(root.val))])
        while queue:
            node, path = queue.popleft()
            if not node.left and not node.right:
                res.append(path)
                continue
            if node.left:
                queue.append((node.left, path + '->' + str(node.left.val)))
            if node.right:
                queue.append((node.right, path + '->' + str(node.right.val)))
        return res
```

3. **复杂度分析**

- **时间复杂度**：`O(n × h)`。
- **空间复杂度**：`O(n × h)`。

## 三、总结

| 方法 | 特点 |
| ---- | ---- |
| DFS + 回溯 | 空间效率高（共享 `path`），推荐 |
| BFS 队列 | 每个节点各自保存路径字符串，直观但费空间 |

**回溯三要素**在树路径问题中的体现：

1. **做选择**：`path.append(node.val)`；
2. **递归**：`dfs(node.left)` / `dfs(node.right)`；
3. **撤销选择**：`path.pop()`。

终止条件是「到达叶子节点」（左右子树都为空），而非「节点为空」—— 后者会导致路径重复。

同类题：`113. 路径总和 II`（找和为 target 的路径）、`988. 从叶结点开始的最小字符串`。
