# [113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/)

## 一、题目描述

给你二叉树的根节点 `root` 和一个整数目标和 `targetSum`，找出所有 **从根节点到叶子节点** 路径总和等于给定目标和的路径。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：[[5,4,11,2],[5,8,4,5]]
```

**示例 2：**

```
输入：root = [1,2,3], targetSum = 5
输出：[]
```

**示例 3：**

```
输入：root = [1,2], targetSum = 0
输出：[]
```

**提示：**

- 树中节点数在范围 `[0, 5000]` 内
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

## 二、解答方法

### 2.1 方法一：递归 + 回溯（深度优先）

1. **思路**

使用 DFS 遍历所有从根到叶子的路径，同时维护当前路径 `path` 和当前路径和 `curSum`。当到达叶子节点时，判断 `curSum` 是否等于 `targetSum`，若相等则将当前路径的副本加入结果集。

关键点：在递归返回时需要回溯，即从 `path` 中移除当前节点，以恢复状态。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        dfs(root, targetSum);
        return res;
    }

    private void dfs(TreeNode node, int remain) {
        if (node == null) return;
        path.add(node.val);
        remain -= node.val;
        if (node.left == null && node.right == null && remain == 0) {
            res.add(new ArrayList<>(path));
        } else {
            dfs(node.left, remain);
            dfs(node.right, remain);
        }
        path.remove(path.size() - 1);
    }
}
```

```python [Python]
class Solution:
    def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
        res = []
        path = []

        def dfs(node: TreeNode, remain: int):
            if not node: return
            path.append(node.val)
            remain -= node.val
            if not node.left and not node.right and remain == 0:
                res.append(path[:])
            else:
                dfs(node.left, remain)
                dfs(node.right, remain)
            path.pop()

        dfs(root, targetSum)
        return res
```

```go [Go]
func pathSum(root *TreeNode, targetSum int) [][]int {
    res := [][]int{}
    path := []int{}

    var dfs func(*TreeNode, int)
    dfs = func(node *TreeNode, remain int) {
        if node == nil { return }
        path = append(path, node.Val)
        remain -= node.Val
        if node.Left == nil && node.Right == nil && remain == 0 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
        } else {
            dfs(node.Left, remain)
            dfs(node.Right, remain)
        }
        path = path[:len(path)-1]
    }

    dfs(root, targetSum)
    return res
}
```

```c [C]
void dfs(struct TreeNode* node, int remain, int* path, int depth, int** res, int* returnSize, int** returnColumnSizes) {
    if (!node) return;
    path[depth] = node->val;
    remain -= node->val;
    if (!node->left && !node->right && remain == 0) {
        res[*returnSize] = (int*)malloc((depth+1) * sizeof(int));
        for (int i = 0; i <= depth; i++) res[*returnSize][i] = path[i];
        (*returnColumnSizes)[*returnSize] = depth + 1;
        (*returnSize)++;
    } else {
        dfs(node->left, remain, path, depth+1, res, returnSize, returnColumnSizes);
        dfs(node->right, remain, path, depth+1, res, returnSize, returnColumnSizes);
    }
}

int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes) {
    int** res = (int**)malloc(5000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(5000 * sizeof(int));
    *returnSize = 0;
    int* path = (int*)malloc(5000 * sizeof(int));
    dfs(root, targetSum, path, 0, res, returnSize, returnColumnSizes);
    free(path);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }

    void dfs(TreeNode* node, int remain, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        remain -= node->val;
        if (!node->left && !node->right && remain == 0) {
            res.push_back(path);
        } else {
            dfs(node->left, remain, path, res);
            dfs(node->right, remain, path, res);
        }
        path.pop_back();
    }
};
```

```js [JavaScript]
var pathSum = function(root, targetSum) {
    const res = [];
    const path = [];

    function dfs(node, remain) {
        if (!node) return;
        path.push(node.val);
        remain -= node.val;
        if (!node.left && !node.right && remain === 0) {
            res.push([...path]);
        } else {
            dfs(node.left, remain);
            dfs(node.right, remain);
        }
        path.pop();
    }

    dfs(root, targetSum);
    return res;
};
```

```ts [TypeScript]
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const res: number[][] = [];
    const path: number[] = [];

    function dfs(node: TreeNode | null, remain: number): void {
        if (!node) return;
        path.push(node.val);
        remain -= node.val;
        if (!node.left && !node.right && remain === 0) {
            res.push([...path]);
        } else {
            dfs(node.left, remain);
            dfs(node.right, remain);
        }
        path.pop();
    }

    dfs(root, targetSum);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，最坏情况下每个叶子都满足条件，复制路径需要 `O(n)`，总复杂度 `O(n^2)`。
- **空间复杂度**：`O(n)`，递归栈深度加上路径存储。

---

### 2.2 方法二：BFS（队列，记录路径和父节点）

1. **思路**

使用 BFS 遍历树，每个节点记录从根到该节点的路径和以及父节点。当遇到叶子节点且路径和等于 `targetSum` 时，从该叶子节点向上回溯父节点构建路径。最后反转路径得到从根到叶子的顺序。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> nodeQ = new LinkedList<>();
        Queue<Integer> sumQ = new LinkedList<>();
        Map<TreeNode, TreeNode> parentMap = new HashMap<>();
        nodeQ.offer(root);
        sumQ.offer(root.val);
        parentMap.put(root, null);

        while (!nodeQ.isEmpty()) {
            TreeNode node = nodeQ.poll();
            int curSum = sumQ.poll();
            if (node.left == null && node.right == null) {
                if (curSum == targetSum) {
                    List<Integer> path = new ArrayList<>();
                    TreeNode cur = node;
                    while (cur != null) {
                        path.add(cur.val);
                        cur = parentMap.get(cur);
                    }
                    Collections.reverse(path);
                    res.add(path);
                }
                continue;
            }
            if (node.left != null) {
                parentMap.put(node.left, node);
                nodeQ.offer(node.left);
                sumQ.offer(curSum + node.left.val);
            }
            if (node.right != null) {
                parentMap.put(node.right, node);
                nodeQ.offer(node.right);
                sumQ.offer(curSum + node.right.val);
            }
        }
        return res;
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
        if not root: return []
        res = []
        node_q = deque([root])
        sum_q = deque([root.val])
        parent = {root: None}

        while node_q:
            node = node_q.popleft()
            cur_sum = sum_q.popleft()
            if not node.left and not node.right:
                if cur_sum == targetSum:
                    path = []
                    cur = node
                    while cur:
                        path.append(cur.val)
                        cur = parent[cur]
                    res.append(path[::-1])
            if node.left:
                parent[node.left] = node
                node_q.append(node.left)
                sum_q.append(cur_sum + node.left.val)
            if node.right:
                parent[node.right] = node
                node_q.append(node.right)
                sum_q.append(cur_sum + node.right.val)
        return res
```

```go [Go]
func pathSum(root *TreeNode, targetSum int) [][]int {
    if root == nil { return [][]int{} }
    res := [][]int{}
    nodeQ := []*TreeNode{root}
    sumQ := []int{root.Val}
    parent := map[*TreeNode]*TreeNode{root: nil}

    for len(nodeQ) > 0 {
        node := nodeQ[0]; nodeQ = nodeQ[1:]
        curSum := sumQ[0]; sumQ = sumQ[1:]
        if node.Left == nil && node.Right == nil {
            if curSum == targetSum {
                path := []int{}
                cur := node
                for cur != nil {
                    path = append(path, cur.Val)
                    cur = parent[cur]
                }
                // 反转
                for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
                    path[i], path[j] = path[j], path[i]
                }
                res = append(res, path)
            }
            continue
        }
        if node.Left != nil {
            parent[node.Left] = node
            nodeQ = append(nodeQ, node.Left)
            sumQ = append(sumQ, curSum + node.Left.Val)
        }
        if node.Right != nil {
            parent[node.Right] = node
            nodeQ = append(nodeQ, node.Right)
            sumQ = append(sumQ, curSum + node.Right.Val)
        }
    }
    return res
}
```

```c [C]
// C语言实现BFS+父节点映射较为复杂，此处省略，实际可用递归方法。
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> nodeQ;
        queue<int> sumQ;
        unordered_map<TreeNode*, TreeNode*> parent;
        nodeQ.push(root); sumQ.push(root->val); parent[root] = nullptr;

        while (!nodeQ.empty()) {
            TreeNode* node = nodeQ.front(); nodeQ.pop();
            int curSum = sumQ.front(); sumQ.pop();
            if (!node->left && !node->right) {
                if (curSum == targetSum) {
                    vector<int> path;
                    TreeNode* cur = node;
                    while (cur) {
                        path.push_back(cur->val);
                        cur = parent[cur];
                    }
                    reverse(path.begin(), path.end());
                    res.push_back(path);
                }
                continue;
            }
            if (node->left) {
                parent[node->left] = node;
                nodeQ.push(node->left);
                sumQ.push(curSum + node->left->val);
            }
            if (node->right) {
                parent[node->right] = node;
                nodeQ.push(node->right);
                sumQ.push(curSum + node->right->val);
            }
        }
        return res;
    }
};
```

```js [JavaScript]
var pathSum = function(root, targetSum) {
    if (!root) return [];
    const res = [];
    const nodeQ = [root];
    const sumQ = [root.val];
    const parent = new Map();
    parent.set(root, null);

    while (nodeQ.length) {
        const node = nodeQ.shift();
        const curSum = sumQ.shift();
        if (!node.left && !node.right) {
            if (curSum === targetSum) {
                const path = [];
                let cur = node;
                while (cur) {
                    path.push(cur.val);
                    cur = parent.get(cur);
                }
                res.push(path.reverse());
            }
            continue;
        }
        if (node.left) {
            parent.set(node.left, node);
            nodeQ.push(node.left);
            sumQ.push(curSum + node.left.val);
        }
        if (node.right) {
            parent.set(node.right, node);
            nodeQ.push(node.right);
            sumQ.push(curSum + node.right.val);
        }
    }
    return res;
};
```

```ts [TypeScript]
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    if (!root) return [];
    const res: number[][] = [];
    const nodeQ: TreeNode[] = [root];
    const sumQ: number[] = [root.val];
    const parent = new Map<TreeNode, TreeNode | null>();
    parent.set(root, null);

    while (nodeQ.length) {
        const node = nodeQ.shift()!;
        const curSum = sumQ.shift()!;
        if (!node.left && !node.right) {
            if (curSum === targetSum) {
                const path: number[] = [];
                let cur: TreeNode | null = node;
                while (cur) {
                    path.push(cur.val);
                    cur = parent.get(cur) || null;
                }
                res.push(path.reverse());
            }
            continue;
        }
        if (node.left) {
            parent.set(node.left, node);
            nodeQ.push(node.left);
            sumQ.push(curSum + node.left.val);
        }
        if (node.right) {
            parent.set(node.right, node);
            nodeQ.push(node.right);
            sumQ.push(curSum + node.right.val);
        }
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，最坏情况复制路径开销。
- **空间复杂度**：`O(n)`，队列和父映射。

---

### 2.3 方法三：迭代 DFS（栈，记录路径）

1. **思路**

使用栈进行深度优先遍历，栈中保存节点、当前路径、当前路径和。当遇到叶子节点且路径和等于 `targetSum` 时，将路径加入结果集。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Stack<TreeNode> nodeStack = new Stack<>();
        Stack<List<Integer>> pathStack = new Stack<>();
        Stack<Integer> sumStack = new Stack<>();
        nodeStack.push(root);
        List<Integer> initPath = new ArrayList<>();
        initPath.add(root.val);
        pathStack.push(initPath);
        sumStack.push(root.val);

        while (!nodeStack.isEmpty()) {
            TreeNode node = nodeStack.pop();
            List<Integer> path = pathStack.pop();
            int curSum = sumStack.pop();
            if (node.left == null && node.right == null) {
                if (curSum == targetSum) {
                    res.add(path);
                }
                continue;
            }
            if (node.right != null) {
                nodeStack.push(node.right);
                List<Integer> rightPath = new ArrayList<>(path);
                rightPath.add(node.right.val);
                pathStack.push(rightPath);
                sumStack.push(curSum + node.right.val);
            }
            if (node.left != null) {
                nodeStack.push(node.left);
                List<Integer> leftPath = new ArrayList<>(path);
                leftPath.add(node.left.val);
                pathStack.push(leftPath);
                sumStack.push(curSum + node.left.val);
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
        if not root: return []
        res = []
        stack = [(root, [root.val], root.val)]
        while stack:
            node, path, cur_sum = stack.pop()
            if not node.left and not node.right:
                if cur_sum == targetSum:
                    res.append(path)
                continue
            if node.right:
                stack.append((node.right, path + [node.right.val], cur_sum + node.right.val))
            if node.left:
                stack.append((node.left, path + [node.left.val], cur_sum + node.left.val))
        return res
```

```go [Go]
func pathSum(root *TreeNode, targetSum int) [][]int {
    if root == nil { return [][]int{} }
    res := [][]int{}
    nodeStack := []*TreeNode{root}
    pathStack := [][]int{{root.Val}}
    sumStack := []int{root.Val}

    for len(nodeStack) > 0 {
        node := nodeStack[len(nodeStack)-1]; nodeStack = nodeStack[:len(nodeStack)-1]
        path := pathStack[len(pathStack)-1]; pathStack = pathStack[:len(pathStack)-1]
        curSum := sumStack[len(sumStack)-1]; sumStack = sumStack[:len(sumStack)-1]

        if node.Left == nil && node.Right == nil {
            if curSum == targetSum {
                res = append(res, path)
            }
            continue
        }
        if node.Right != nil {
            nodeStack = append(nodeStack, node.Right)
            rightPath := make([]int, len(path))
            copy(rightPath, path)
            rightPath = append(rightPath, node.Right.Val)
            pathStack = append(pathStack, rightPath)
            sumStack = append(sumStack, curSum + node.Right.Val)
        }
        if node.Left != nil {
            nodeStack = append(nodeStack, node.Left)
            leftPath := make([]int, len(path))
            copy(leftPath, path)
            leftPath = append(leftPath, node.Left.Val)
            pathStack = append(pathStack, leftPath)
            sumStack = append(sumStack, curSum + node.Left.Val)
        }
    }
    return res
}
```

```c [C]
// 迭代DFS在C中实现较复杂，此处省略，推荐使用递归方法。
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        if (!root) return res;
        stack<TreeNode*> nodeStack;
        stack<vector<int>> pathStack;
        stack<int> sumStack;
        nodeStack.push(root);
        pathStack.push({root->val});
        sumStack.push(root->val);

        while (!nodeStack.empty()) {
            TreeNode* node = nodeStack.top(); nodeStack.pop();
            vector<int> path = pathStack.top(); pathStack.pop();
            int curSum = sumStack.top(); sumStack.pop();

            if (!node->left && !node->right) {
                if (curSum == targetSum) res.push_back(path);
                continue;
            }
            if (node->right) {
                nodeStack.push(node->right);
                vector<int> rightPath = path;
                rightPath.push_back(node->right->val);
                pathStack.push(rightPath);
                sumStack.push(curSum + node->right->val);
            }
            if (node->left) {
                nodeStack.push(node->left);
                vector<int> leftPath = path;
                leftPath.push_back(node->left->val);
                pathStack.push(leftPath);
                sumStack.push(curSum + node->left->val);
            }
        }
        return res;
    }
};
```

```js [JavaScript]
var pathSum = function(root, targetSum) {
    if (!root) return [];
    const res = [];
    const stack = [[root, [root.val], root.val]];
    while (stack.length) {
        const [node, path, curSum] = stack.pop();
        if (!node.left && !node.right) {
            if (curSum === targetSum) res.push(path);
            continue;
        }
        if (node.right) {
            stack.push([node.right, [...path, node.right.val], curSum + node.right.val]);
        }
        if (node.left) {
            stack.push([node.left, [...path, node.left.val], curSum + node.left.val]);
        }
    }
    return res;
};
```

```ts [TypeScript]
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    if (!root) return [];
    const res: number[][] = [];
    const stack: [TreeNode, number[], number][] = [[root, [root.val], root.val]];
    while (stack.length) {
        const [node, path, curSum] = stack.pop()!;
        if (!node.left && !node.right) {
            if (curSum === targetSum) res.push(path);
            continue;
        }
        if (node.right) {
            stack.push([node.right, [...path, node.right.val], curSum + node.right.val]);
        }
        if (node.left) {
            stack.push([node.left, [...path, node.left.val], curSum + node.left.val]);
        }
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，复制路径开销。
- **空间复杂度**：`O(n^2)`，栈中存储多条路径副本。

---

## 三、总结

| 方法             | 时间复杂度 | 空间复杂度 | 特点                         |
| ---------------- | ---------- | ---------- | ---------------------------- |
| 递归 + 回溯      | `O(n^2)`   | `O(n)`     | **推荐**，代码简洁，空间优化 |
| BFS + 父节点映射 | `O(n^2)`   | `O(n)`     | 按层遍历，需存储父节点       |
| 迭代 DFS（栈）   | `O(n^2)`   | `O(n^2)`   | 避免递归，但空间开销大       |

**推荐**：面试中首选 **方法一（递归+回溯）**，代码清晰，空间效率高。若树深度极大可能栈溢出，则考虑迭代方法。