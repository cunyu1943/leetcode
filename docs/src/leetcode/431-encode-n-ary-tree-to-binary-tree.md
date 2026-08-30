# [431. 将 N 叉树编码为二叉树 🔒 会员题](https://leetcode.cn/problems/encode-n-ary-tree-to-binary-tree/)

## 一、题目描述

设计一个算法，把一个 N 叉树**编码**为二叉树，并能从二叉树**解码**还原 N 叉树。对编码格式无强制要求，但必须能无损往返。

一种常用约定：N 叉树节点的**第一个孩子**作为二叉树节点的 `left`，该孩子的**兄弟**（原 N 叉树中的下一个孩子）作为 `left` 的 `right`，依次串成右链。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：root = [1,null,3,2,4,null,5,6]
输出：编码为二叉树的序列化字符串（按上述约定）
```

**提示：**

- `N` 叉树高度不超过 1000
- 编码/解码双向往返结果与原始一致即可

## 二、解答方法

### 2.1 方法一：「孩子-兄弟」表示法（左孩子右兄弟）

1. 思路

编码：N 叉树节点 `node` 对应二叉树节点，`node` 的第一个孩子变成二叉树节点的 `left`；该孩子的所有兄弟（原 `node.children` 中的后续节点）沿二叉树 `right` 串成链。
解码：二叉树节点 `left` 是解码后 N 叉树节点的第一个孩子，沿 `right` 遍历收集所有兄弟作为 `children`。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Codec:
    def encode(self, root: 'Optional[Node]') -> Optional[TreeNode]:
        if not root:
            return None
        node = TreeNode(root.val)
        if root.children:
            node.left = self.encode(root.children[0])
            cur = node.left
            for child in root.children[1:]:
                cur.right = self.encode(child)
                cur = cur.right
        return node

    def decode(self, data: Optional[TreeNode]) -> 'Optional[Node]':
        if not data:
            return None
        node = Node(data.val)
        cur = data.left
        while cur:
            node.children.append(self.decode(cur))
            cur = cur.right
        return node
```

```java [Java]
class Codec {
    public TreeNode encode(Node root) {
        if (root == null) return null;
        TreeNode node = new TreeNode(root.val);
        if (!root.children.isEmpty()) {
            node.left = encode(root.children.get(0));
            TreeNode cur = node.left;
            for (int i = 1; i < root.children.size(); i++) {
                cur.right = encode(root.children.get(i));
                cur = cur.right;
            }
        }
        return node;
    }
    public Node decode(TreeNode data) {
        if (data == null) return null;
        Node node = new Node(data.val);
        TreeNode cur = data.left;
        while (cur != null) {
            node.children.add(decode(cur));
            cur = cur.right;
        }
        return node;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(h)$。

## 三、总结

会员题。「左孩子右兄弟」是树结构转换的通用技巧（把多叉树压成二叉树）。相关题目：428 序列化和反序列化 N 叉树、429 N 叉树层序。
