# [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)

## 一、题目描述

二叉树的节点代表房屋，每个节点有金额。相邻节点（父子）不能同时抢劫。求能抢到的最大金额。

**示例：**
```
输入：[3,2,3,null,3,null,1]   输出：7（抢 3(根)+3(左孙)+1(右孙) = 7）
输入：[3,4,5,1,3,null,1]       输出：9（抢 4+5+... = 9）
```

**提示：** 节点数 `[0, 10⁴]`，`0 <= Node.val <= 10⁴`。

## 二、解答方法

### 方法一：树上 DP（后序返回 [不抢, 抢]）

**思路：** 对每个节点返回长度为 2 的数组 `dp`：`dp[0]` = 不抢该节点的最大金额，`dp[1]` = 抢该节点的最大金额。
- `dp[1] = node.val + left[0] + right[0]`（抢自己，孩子都不能抢）；
- `dp[0] = max(left[0],left[1]) + max(right[0],right[1])`（不抢自己，孩子可抢可不抢）。

:::::: code-group

```java [Java]
class Solution {
    public int rob(TreeNode root) {
        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }
    int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] left = dfs(node.left), right = dfs(node.right);
        int rob = node.val + left[0] + right[0];
        int not = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return new int[]{not, rob};
    }
}
```

```python [Python]
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node: return (0, 0)
            l0, l1 = dfs(node.left)
            r0, r1 = dfs(node.right)
            rob = node.val + l0 + r0
            notRob = max(l0, l1) + max(r0, r1)
            return (notRob, rob)
        return max(dfs(root))
```

```cpp [C++]
class Solution {
public:
    pair<int,int> dfs(TreeNode* node){
        if(!node) return {0,0};
        auto [l0,l1]=dfs(node->left);
        auto [r0,r1]=dfs(node->right);
        int rob=node->val+l0+r0;
        int notr=max(l0,l1)+max(r0,r1);
        return {notr,rob};
    }
    int rob(TreeNode* root){ auto [a,b]=dfs(root); return max(a,b); }
};
```

```go [Go]
func rob(root *TreeNode) int {
    var dfs func(*TreeNode) (int, int)
    dfs = func(node *TreeNode) (int, int) {
        if node == nil { return 0, 0 }
        l0, l1 := dfs(node.Left)
        r0, r1 := dfs(node.Right)
        rob := node.Val + l0 + r0
        notRob := max(l0,l1) + max(r0,r1)
        return notRob, rob
    }
    a, b := dfs(root)
    if a > b { return a }
    return b
}
func max(a, b int) int { if a > b { return a }; return b }
```

```js [JavaScript]
var rob = function (root) {
    const dfs = (node) => {
        if (!node) return [0, 0];
        const [l0, l1] = dfs(node.left);
        const [r0, r1] = dfs(node.right);
        const rob = node.val + l0 + r0;
        const notRob = Math.max(l0, l1) + Math.max(r0, r1);
        return [notRob, rob];
    };
    const [a, b] = dfs(root);
    return Math.max(a, b);
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(h)`。

## 三、总结

树形 DP 经典：`198 打家劫舍`（数组）、`213`（环形）的树版。每个节点两种状态（抢/不抢）后序返回。记忆化可避免重复（本题每个节点只算一次）。注意返回 `[不抢, 抢]` 顺序一致即可。同类：`1140 石子游戏 II`（树上博弈）。
