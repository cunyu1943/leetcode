# [428. 序列化和反序列化 N 叉树](https://leetcode.cn/problems/serialize-and-deserialize-n-ary-tree/)

## 一、题目描述

序列化是把 N 叉树转为字符串，反序列化是把字符串重建为 N 叉树。需保证任意 N 叉树都能被正确往返转换。

**示例 1：**

```
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
```

**提示：**

- 树节点数在 `[0, 10^4]`
- N 叉树每个节点的值范围 `[0, 10^4]`
- 不能有前导零（题目序列化格式自定，但常用层序 / 前序 + 子节点数）

## 二、解答方法

### 2.1 方法一：前序遍历（节点值 + 子节点数）

1. 思路

用前序：序列化时对每个节点输出「值#子节点数」，子节点递归优先；反序列化时按同样顺序读回：读值建节点，读子节点数，递归读入相应数量的子节点。

2. 代码实现（Python，使用逗号分隔）

:::::: code-group

```python [Python]
class Codec:
    def serialize(self, root: 'Optional[Node]') -> str:
        res = []
        def dfs(node):
            if not node:
                return
            res.append(str(node.val) + "," + str(len(node.children)))
            for c in node.children:
                dfs(c)
        dfs(root)
        return "|".join(res)

    def deserialize(self, data: str) -> 'Optional[Node]':
        if not data:
            return None
        vals = data.split("|")
        idx = 0
        def dfs():
            nonlocal idx
            parts = vals[idx].split(",")
            val = int(parts[0]); k = int(parts[1])
            idx += 1
            node = Node(val)
            for _ in range(k):
                node.children.append(dfs())
            return node
        return dfs()
```

```java [Java]
class Codec {
    public String serialize(Node root) {
        StringBuilder sb = new StringBuilder();
        pre(root, sb);
        return sb.toString();
    }
    void pre(Node n, StringBuilder sb) {
        if (n == null) return;
        sb.append(n.val).append(",").append(n.children.size()).append("|");
        for (Node c : n.children) pre(c, sb);
    }
    public Node deserialize(String data) {
        if (data.isEmpty()) return null;
        String[] vals = data.split("\\|");
        int[] idx = {0};
        return dfs(vals, idx);
    }
    Node dfs(String[] vals, int[] idx) {
        String[] p = vals[idx[0]].split(",");
        int val = Integer.parseInt(p[0]), k = Integer.parseInt(p[1]);
        idx[0]++;
        Node node = new Node(val);
        for (int i = 0; i < k; i++) node.children.add(dfs(vals, idx));
        return node;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(n)$。

## 三、总结

N 叉树序列化常用「值 + 子节点数」前序方案（避免用 `#` 占位空指针）。相关题目：297 二叉树的序列化与反序列化、449 序列化二叉搜索树、428 本身。
