# [366. 寻找二叉树的叶节点](https://leetcode.cn/problems/find-leaves-of-binary-tree/) [🔒 会员题]

## 一、题目描述

给定一棵二叉树，反复进行如下操作：每次把所有 **叶子节点** 收集起来并删除，直到树空。返回一个列表，每个元素是一轮收集的叶子节点值（按收集顺序，从最外层叶子到根）。

**示例：**
```
输入：root = [1,2,3,4,5]
        1
       / \
      2   3
     / \
    4   5
输出：[[4,5],[2,3],[1]]
（第一轮叶子4,5；删后2,3变叶；再删得1）
```

**提示：** 节点数 `[1, 100]`。

## 二、解答方法

### 方法一：DFS 返回节点高度（距叶距离）

**思路：** 对每个节点，`dfs(node)` 返回它到最近叶子的距离（叶子返回 0）。把节点按这个距离分组到 `res[height]`。高度恰好等于「第几轮被收集」（叶子第 0 轮先收集）。一次 DFS 同时确定高度与分组。

:::::: code-group

```java [Java]
class Solution {
    private List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> findLeaves(TreeNode root) {
        dfs(root);
        return res;
    }
    int dfs(TreeNode node) {
        if (node == null) return -1;          // 空节点高度 -1
        int h = 1 + Math.max(dfs(node.left), dfs(node.right));
        if (h >= res.size()) res.add(new ArrayList<>());
        res.get(h).add(node.val);
        return h;
    }
}
```

```python [Python]
class Solution:
    def findLeaves(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []
        def dfs(node):
            if not node: return -1
            h = 1 + max(dfs(node.left), dfs(node.right))
            if h == len(res): res.append([])
            res[h].append(node.val)
            return h
        dfs(root)
        return res
```

```cpp [C++]
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> findLeaves(TreeNode* root) {
        function<int(TreeNode*)> dfs = [&](TreeNode* node){
            if(!node) return -1;
            int h=1+max(dfs(node->left), dfs(node->right));
            if(h==res.size()) res.push_back({});
            res[h].push_back(node->val);
            return h;
        };
        dfs(root);
        return res;
    }
};
```

```go [Go]
func findLeaves(root *TreeNode) [][]int {
    res := [][]int{}
    var dfs func(*TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil { return -1 }
        h := 1 + max(dfs(node.Left), dfs(node.Right))
        if h == len(res) { res = append(res, []int{}) }
        res[h] = append(res[h], node.Val)
        return h
    }
    dfs(root)
    return res
}
func max(a, b int) int { if a>b { return a }; return b }
```

```js [JavaScript]
var findLeaves = function (root) {
    const res = [];
    const dfs = (node) => {
        if (!node) return -1;
        const h = 1 + Math.max(dfs(node.left), dfs(node.right));
        if (h === res.length) res.push([]);
        res[h].push(node.val);
        return h;
    };
    dfs(root);
    return res;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

「按距叶距离分层」一题双解：DFS 返回高度，数组 `res[height]` 自动按轮次分组。本质是把树按「层」从外到内剥离，等价于求每个节点的「高度（到叶）」。比真的删节点（模拟）简洁。同类：`310 最小高度树`（也是找中心/剥层）。注意空节点返回 -1，叶子返回 0。
