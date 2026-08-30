# [426. 将二叉搜索树转化为排序的双向链表](https://leetcode.cn/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/)

## 一、题目描述

将一个**二叉搜索树**转换成按中序遍历排序的**循环双向链表**。要求：

- 原地转换（不能新建节点），仅调整既有节点的 `left`/`right` 指针：`left` 指向前驱，`right` 指向后继；
- 返回的链表的头节点，其 `left` 指向尾节点，尾节点 `right` 指向头节点（循环）。

**示例 1：**

```
输入：root = [4,2,5,1,3]
输出：[1,2,3,4,5]（按中序循环链表）
解释：链表为 1<->2<->3<->4<->5<->1 循环。
```

**示例 2：**

```
输入：root = []
输出：[]
```

**提示：**

- 节点数 $\le 1000$
- `-1000 <= Node.val <= 1000`

## 二、解答方法

### 2.1 方法一：中序遍历（递归串接）

1. 思路

中序遍历 BST 得到升序序列，遍历过程中用 `pre` 记录上一个访问节点，把 `pre.right = cur`、`cur.left = pre` 串起来；最后用 `head`（首节点）和末节点 `pre` 闭合循环。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    Node head = null, pre = null;
    public Node treeToDoublyList(Node root) {
        if (root == null) return null;
        dfs(root);
        head.left = pre;
        pre.right = head;
        return head;
    }
    void dfs(Node cur) {
        if (cur == null) return;
        dfs(cur.left);
        if (pre == null) head = cur;
        else { pre.right = cur; cur.left = pre; }
        pre = cur;
        dfs(cur.right);
    }
}
```

```python [Python]
class Solution:
    def treeToDoublyList(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return None
        self.head = self.pre = None
        def dfs(cur):
            if not cur:
                return
            dfs(cur.left)
            if not self.pre:
                self.head = cur
            else:
                self.pre.right = cur
                cur.left = self.pre
            self.pre = cur
            dfs(cur.right)
        dfs(root)
        self.head.left = self.pre
        self.pre.right = self.head
        return self.head
```

```cpp [C++]
class Solution {
public:
    Node* treeToDoublyList(Node* root) {
        if (!root) return nullptr;
        Node *head = nullptr, *pre = nullptr;
        function<void(Node*)> dfs = [&](Node* cur) {
            if (!cur) return;
            dfs(cur->left);
            if (!pre) head = cur;
            else { pre->right = cur; cur->left = pre; }
            pre = cur;
            dfs(cur->right);
        };
        dfs(root);
        head->left = pre;
        pre->right = head;
        return head;
    }
};
```

```go [Go]
func treeToDoublyList(root *Node) *Node {
	if root == nil {
		return nil
	}
	var head, pre *Node
	var dfs func(*Node)
	dfs = func(cur *Node) {
		if cur == nil {
			return
		}
		dfs(cur.Left)
		if pre == nil {
			head = cur
		} else {
			pre.Right = cur
			cur.Left = pre
		}
		pre = cur
		dfs(cur.Right)
	}
	dfs(root)
	head.Left = pre
	pre.Right = head
	return head
}
```

```javascript [JavaScript]
var treeToDoublyList = function (root) {
    if (!root) return null;
    let head = null, pre = null;
    const dfs = (cur) => {
        if (!cur) return;
        dfs(cur.left);
        if (!pre) head = cur;
        else { pre.right = cur; cur.left = pre; }
        pre = cur;
        dfs(cur.right);
    };
    dfs(root);
    head.left = pre;
    pre.right = head;
    return head;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(h)$，递归栈。

## 三、总结

BST 中序即有序，串接指针即可。相关题目：94 二叉树的中序遍历、109 有序链表转换二叉搜索树、剑指 Offer 36（同题）。
