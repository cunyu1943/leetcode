# [430. 扁平化多级双向链表](https://leetcode.cn/problems/flatten-a-multilevel-doubly-linked-list/)

## 一、题目描述

多级双向链表中，除了指向前一个和后一个节点的指针，每个节点还有一个指向**子链表**的 `child` 指针（子链表也有自己的前/后指针）。请将链表**扁平化**，使所有节点出现在单层双向链表中，且每个节点的 `child` 置为 `null`。

扁平化规则：子链表应插入到当前节点与其下一个节点之间。

**示例 1：**

```
输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
输出：[1,2,3,7,8,11,12,9,10,4,5,6]（扁平化后）
```

**提示：**

- 节点数不超过 1000
- `1 <= Node.val <= 10^5`

## 二、解答方法

### 2.1 方法一：DFS（递归展开子链表）

1. 思路

遍历主链表，遇到有 `child` 的节点时，递归把子链表扁平化得到子链表的头 `childHead` 与尾 `childTail`，将子链表插入到当前节点与下一节点之间：当前节点 `next` 指向 `childHead`，`childHead.prev` 指向当前节点；若原 `next` 存在，则 `childTail.next` 指向它、它 `.prev` 指向 `childTail`。注意继续遍历到 `childTail` 之后（因为子链表可能又含更深 child）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public Node flatten(Node head) {
        dfs(head);
        return head;
    }
    Node dfs(Node cur) {
        Node last = cur;
        while (cur != null) {
            Node nxt = cur.next;
            if (cur.child != null) {
                Node childHead = cur.child;
                Node childTail = dfs(cur.child);
                cur.next = childHead;
                childHead.prev = cur;
                cur.child = null;
                if (nxt != null) {
                    childTail.next = nxt;
                    nxt.prev = childTail;
                }
                cur = childTail;
            } else {
                cur = nxt;
            }
            if (cur != null) last = cur;
        }
        return last;
    }
}
```

```python [Python]
class Solution:
    def flatten(self, head: 'Optional[Node]') -> 'Optional[Node]':
        def dfs(cur):
            last = cur
            while cur:
                nxt = cur.next
                if cur.child:
                    child_head = cur.child
                    child_tail = dfs(cur.child)
                    cur.next = child_head
                    child_head.prev = cur
                    cur.child = None
                    if nxt:
                        child_tail.next = nxt
                        nxt.prev = child_tail
                    cur = child_tail
                else:
                    cur = nxt
                if cur:
                    last = cur
            return last
        dfs(head)
        return head
```

```cpp [C++]
class Solution {
public:
    Node* flatten(Node* head) {
        dfs(head);
        return head;
    }
    Node* dfs(Node* cur) {
        Node* last = cur;
        while (cur) {
            Node* nxt = cur->next;
            if (cur->child) {
                Node* ch = cur->child;
                Node* tail = dfs(ch);
                cur->next = ch; ch->prev = cur; cur->child = nullptr;
                if (nxt) { tail->next = nxt; nxt->prev = tail; }
                cur = tail;
            } else cur = nxt;
            if (cur) last = cur;
        }
        return last;
    }
};
```

```go [Go]
func flatten(head *Node) *Node {
	var dfs func(*Node) *Node
	dfs = func(cur *Node) *Node {
		last := cur
		for cur != nil {
			nxt := cur.Next
			if cur.Child != nil {
				ch := cur.Child
				tail := dfs(ch)
				cur.Next = ch
				ch.Prev = cur
				cur.Child = nil
				if nxt != nil {
					tail.Next = nxt
					nxt.Prev = tail
				}
				cur = tail
			} else {
				cur = nxt
			}
			if cur != nil {
				last = cur
			}
		}
		return last
	}
	dfs(head)
	return head
}
```

```javascript [JavaScript]
var flatten = function (head) {
    const dfs = (cur) => {
        let last = cur;
        while (cur) {
            const nxt = cur.next;
            if (cur.child) {
                const ch = cur.child;
                const tail = dfs(ch);
                cur.next = ch; ch.prev = cur; cur.child = null;
                if (nxt) { tail.next = nxt; nxt.prev = tail; }
                cur = tail;
            } else cur = nxt;
            if (cur) last = cur;
        }
        return last;
    };
    dfs(head);
    return head;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(d)$，递归深度（链表深度）。

## 三、总结

用「展开子链并插入缝隙」的 DFS 处理多级链表。相关题目：114 二叉树展开为链表、109 有序链表转 BST。
