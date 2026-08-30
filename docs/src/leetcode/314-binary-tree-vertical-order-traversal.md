# [314. 二叉树的垂直遍历](https://leetcode.cn/problems/binary-tree-vertical-order-traversal/) [🔒 会员题]

## 一、题目描述

给定二叉树根节点，返回其 **垂直遍历** 的结果。对同一列（col，根=0，左孩子 col-1，右孩子 col+1）的节点，按「从上到下、同行从左到右」的顺序排列；同位置按行优先、行内左子树在右子树之前。

**示例：**
```
输入：root = [3,9,20,null,null,15,7]
输出：[[9],[3,15],[20],[7]]
```

**提示：** 节点数 `[0, 100]`，`-100 <= Node.val <= 100`。

## 二、解答方法

### 方法一：BFS + 列坐标映射

**思路：** 层序遍历，记录每个节点 `(col, row)`，存入按列分组的列表。为保证「同列从上到下、同行左到右」，用 BFS（天然按层/行顺序），每列按到达顺序追加即可（同列先遇到的在上面，同行先遇左子再右子）。最后按列号排序输出。

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> verticalOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Map<Integer, List<Integer>> map = new TreeMap<>();   // col -> nodes
        Queue<TreeNode> q = new LinkedList<>();
        Queue<Integer> cols = new LinkedList<>();
        q.offer(root); cols.offer(0);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            int c = cols.poll();
            map.computeIfAbsent(c, k -> new ArrayList<>()).add(node.val);
            if (node.left != null) { q.offer(node.left); cols.offer(c - 1); }
            if (node.right != null) { q.offer(node.right); cols.offer(c + 1); }
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        from collections import deque, defaultdict
        colMap = defaultdict(list)
        q = deque([(root, 0)])
        while q:
            node, c = q.popleft()
            colMap[c].append(node.val)
            if node.left: q.append((node.left, c-1))
            if node.right: q.append((node.right, c+1))
        return [colMap[c] for c in sorted(colMap)]
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        map<int, vector<int>> colMap;
        queue<pair<TreeNode*, int>> q; q.push({root, 0});
        while (!q.empty()) {
            auto [node, c] = q.front(); q.pop();
            colMap[c].push_back(node->val);
            if (node->left) q.push({node->left, c-1});
            if (node->right) q.push({node->right, c+1});
        }
        for (auto& kv : colMap) res.push_back(kv.second);
        return res;
    }
};
```

```go [Go]
func verticalOrder(root *TreeNode) [][]int {
    if root == nil { return [][]int{} }
    type node struct { t *TreeNode; c int }
    colMap := map[int][]int{}
    q := []node{{root, 0}}
    var minC, maxC int
    for len(q) > 0 {
        cur := q[0]; q = q[1:]
        colMap[cur.c] = append(colMap[cur.c], cur.t.Val)
        if cur.c < minC { minC = cur.c }
        if cur.c > maxC { maxC = cur.c }
        if cur.t.Left != nil { q = append(q, node{cur.t.Left, cur.c-1}) }
        if cur.t.Right != nil { q = append(q, node{cur.t.Right, cur.c+1}) }
    }
    res := make([][]int, 0)
    for c := minC; c <= maxC; c++ { res = append(res, colMap[c]) }
    return res
}
```

```js [JavaScript]
var verticalOrder = function (root) {
    if (!root) return [];
    const colMap = new Map();
    const q = [{ node: root, c: 0 }];
    let minC = 0, maxC = 0;
    while (q.length) {
        const { node, c } = q.shift();
        if (!colMap.has(c)) colMap.set(c, []);
        colMap.get(c).push(node.val);
        minC = Math.min(minC, c); maxC = Math.max(maxC, c);
        if (node.left) q.push({ node: node.left, c: c-1 });
        if (node.right) q.push({ node: node.right, c: c+1 });
    }
    const res = [];
    for (let c = minC; c <= maxC; c++) res.push(colMap.get(c));
    return res;
};
```

::::::

**复杂度：** 时间 `O(n log n)`（TreeMap）或 `O(n)`，空间 `O(n)`。

## 三、总结

垂直遍历要求「严格从上到下、同行左到右」，必须用 **BFS** 而非 DFS（DFS 无法保证同行左右顺序）。用队列同时带 `col`，按列分组；`TreeMap`/扫描 min/max 列保证列号有序。对比 `987 二叉树的垂序遍历`（额外要求同行同列按 val 排序，需用 row 也记录）。
