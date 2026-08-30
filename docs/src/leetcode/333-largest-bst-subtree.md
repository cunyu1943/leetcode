# [333. 最大 BST 子树](https://leetcode.cn/problems/largest-bst-subtree/) [🔒 会员题]

## 一、题目描述

给定一棵二叉树，找到其中 **最大的二叉搜索树（BST）子树**，返回该子树中的节点数。若整棵树是 BST，返回整棵树的节点数。

**示例：**
```
输入：root = [10,5,15,1,8,null,7]   输出：3（子树 [5,1,8] 是 BST，节点数 3，最大）
```

**提示：** 节点数 `[0, 10⁴]`，`-10⁴ <= Node.val <= 10⁴`。

## 二、解答方法

### 方法一：后序遍历返回 (是否为BST, 节点数, 最小, 最大)

**思路：** 自底向上返回每棵子树的信息：`{isBST, count, min, max}`。对节点 `u`：
- 左右都返回；若 `left.isBST && right.isBST && left.max < u.val < right.min`，则 `u` 为 BST，节点数 = `1+left.cnt+right.cnt`；
- 否则 `u` 不是 BST，但向上传递其「作为候选的最大 BST 子树大小」= `max(left.bstSize, right.bstSize)`。

:::::: code-group

```java [Java]
class Solution {
    private int maxSize = 0;
    public int largestBSTSubtree(TreeNode root) {
        dfs(root);
        return maxSize;
    }
    // 返回 [isBST, count, min, max]
    int[] dfs(TreeNode node) {
        if (node == null) return new int[]{1, 0, Integer.MAX_VALUE, Integer.MIN_VALUE};
        int[] left = dfs(node.left), right = dfs(node.right);
        if (left[0]==1 && right[0]==1 && left[3] < node.val && node.val < right[2]) {
            int cnt = 1 + left[1] + right[1];
            maxSize = Math.max(maxSize, cnt);
            return new int[]{1, cnt, Math.min(left[2], node.val), Math.max(right[3], node.val)};
        }
        // 非BST：向上传递左右中较大的 BST 子树大小
        int cand = Math.max(left[1], right[1]);
        maxSize = Math.max(maxSize, cand);
        return new int[]{0, cand, 0, 0};
    }
}
```

```python [Python]
class Solution:
    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node: return (True, 0, float('inf'), float('-inf'))
            lBST, lcnt, lmin, lmax = dfs(node.left)
            rBST, rcnt, rmin, rmax = dfs(node.right)
            if lBST and rBST and lmax < node.val < rmin:
                cnt = 1 + lcnt + rcnt
                self.ans = max(self.ans, cnt)
                return (True, cnt, min(lmin, node.val), max(rmax, node.val))
            cand = max(lcnt, rcnt)
            self.ans = max(self.ans, cand)
            return (False, cand, 0, 0)
        dfs(root)
        return self.ans
```

```cpp [C++]
class Solution {
    int ans=0;
    struct Info { bool isBST; int cnt; int mn, mx; };
    Info dfs(TreeNode* node){
        if(!node) return {true,0,INT_MAX,INT_MIN};
        auto l=dfs(node->left), r=dfs(node->right);
        if(l.isBST && r.isBST && l.mx < node->val && node->val < r.mn){
            int cnt=1+l.cnt+r.cnt; ans=max(ans,cnt);
            return {true,cnt,min(l.mn,node->val),max(r.mx,node->val)};
        }
        int cand=max(l.cnt,r.cnt); ans=max(ans,cand);
        return {false,cand,0,0};
    }
public:
    int largestBSTSubtree(TreeNode* root){ dfs(root); return ans; }
};
```

```go [Go]
func largestBSTSubtree(root *TreeNode) int {
    ans := 0
    var dfs func(*TreeNode) (bool, int, int, int)
    dfs = func(node *TreeNode) (bool, int, int, int) {
        if node == nil { return true, 0, 1<<30, -(1 << 30) }
        lBST, lcnt, lmin, lmax := dfs(node.Left)
        rBST, rcnt, rmin, rmax := dfs(node.Right)
        if lBST && rBST && lmax < node.Val && node.Val < rmin {
            cnt := 1 + lcnt + rcnt
            if cnt > ans { ans = cnt }
            return true, cnt, min(lmin, node.Val), max(rmax, node.Val)
        }
        cand := lcnt; if rcnt > cand { cand = rcnt }
        if cand > ans { ans = cand }
        return false, cand, 0, 0
    }
    dfs(root)
    return ans
}
func min(a, b int) int { if a < b { return a }; return b }
func max(a, b int) int { if a > b { return a }; return b }
```

```js [JavaScript]
var largestBSTSubtree = function (root) {
    let ans = 0;
    const dfs = (node) => {
        if (!node) return [true, 0, Infinity, -Infinity];
        const [lBST, lcnt, lmin, lmax] = dfs(node.left);
        const [rBST, rcnt, rmin, rmax] = dfs(node.right);
        if (lBST && rBST && lmax < node.val && node.val < rmin) {
            const cnt = 1 + lcnt + rcnt; ans = Math.max(ans, cnt);
            return [true, cnt, Math.min(lmin, node.val), Math.max(rmax, node.val)];
        }
        const cand = Math.max(lcnt, rcnt); ans = Math.max(ans, cand);
        return [false, cand, 0, 0];
    };
    dfs(root);
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(h)`。

## 三、总结

后序返回「子树四元组」(是否BST, 节点数, min, max) 是基础技巧，用于判断「以某节点为根的 BST 合法性」并向上传递候选。注意非 BST 时不能只返回 0，要带上「左右子树中最大的 BST 大小」继续向上。同类：`98 验证BST`（整棵）、`1373 二叉搜索子树的最大键值和`。
