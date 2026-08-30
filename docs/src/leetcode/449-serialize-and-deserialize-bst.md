# [449. 序列化和反序列化二叉搜索树](https://leetcode.cn/problems/serialize-and-deserialize-bst/)

## 一、题目描述

序列化一个二叉搜索树为字符串，并能从字符串重建。要求比一般二叉树序列化**更紧凑**。

可利用 BST 性质：仅用**前序遍历**即可唯一确定 BST（因为中序可由 BST 性质推出）。

**示例 1：**

```
输入：root = [2,1,3]
输出：序列化为 "2,1,3"，反序列化后与原树结构相同。
```

**提示：**

- 树节点数 $\le 10^4$
- `0 <= Node.val <= 10^4`
- 节点值互不相同

## 二、解答方法

### 2.1 方法一：前序遍历 + 值域范围还原

1. 思路

序列化：前序遍历，用逗号拼接值为字符串。反序列化：前序序列中，第一个数作为根，剩余序列里比根小的连续部分构成左子树、剩余构成右子树——或者直接按「当前允许的值域范围 `[low, high]`」递归：弹出首值，若 `low <= val <= high` 则建节点，递归左子树范围 `[low, val-1]`、右子树 `[val+1, high]`。

2. 代码实现（Python，范围法最稳）

:::::: code-group

```python [Python]
class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        vals = []
        def pre(node):
            if node:
                vals.append(str(node.val))
                pre(node.left)
                pre(node.right)
        pre(root)
        return ",".join(vals)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data:
            return None
        vals = iter(list(map(int, data.split(","))))
        def build(low, high):
            v = next(vals, None)
            if v is None or not (low <= v <= high):
                return None
            node = TreeNode(v)
            node.left = build(low, v - 1)
            node.right = build(v + 1, high)
            return node
        return build(-inf, inf)
```

```java [Java]
class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        pre(root, sb);
        return sb.toString();
    }
    void pre(TreeNode n, StringBuilder sb) {
        if (n == null) return;
        sb.append(n.val).append(",");
        pre(n.left, sb); pre(n.right, sb);
    }
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Queue<Integer> q = new LinkedList<>();
        for (String s : data.split(",")) if (!s.isEmpty()) q.offer(Integer.parseInt(s));
        return build(q, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    TreeNode build(Queue<Integer> q, int low, int high) {
        if (q.isEmpty()) return null;
        int v = q.peek();
        if (v < low || v > high) return null;
        q.poll();
        TreeNode node = new TreeNode(v);
        node.left = build(q, low, v - 1);
        node.right = build(q, v + 1, high);
        return node;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$。

## 三、总结

利用 BST 的中序即有序，仅前序即可唯一重建。相关题目：297 二叉树的序列化与反序列化、428 序列化 N 叉树、108 有序数组转 BST。
