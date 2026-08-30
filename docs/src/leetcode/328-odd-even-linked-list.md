# [328. 奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/)

## 一、题目描述

给定单链表，将节点按 **奇偶索引（1-based）** 重排：所有奇数位节点排在前面，偶数位节点排在后面，保持相对顺序。请 **原地** 重排，返回重排后的头节点。

**示例：**
```
输入：1->2->3->4->5     输出：1->3->5->2->4
输入：2->1->3->5->6->4->7  输出：2->3->6->7->1->5->4
```

**提示：** 节点数 `[0, 10⁴]`，`1 <= Node.val <= 1000`。

## 二、解答方法

### 方法一：双指针分离奇偶链

**思路：** 用 `odd` 指向奇数位尾、`even` 指向偶数位尾、`evenHead` 记录偶数链头。遍历：`odd.next = even.next`（接下个奇数），`odd` 前移；`even.next = odd.next`（接下个偶数），`even` 前移。最后 `odd.next = evenHead` 拼接。

:::::: code-group

```java [Java]
class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null) return null;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next; odd = odd.next;
            even.next = odd.next; even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
}
```

```python [Python]
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head: return None
        odd, even, evenHead = head, head.next, head.next
        while even and even.next:
            odd.next = even.next; odd = odd.next
            even.next = odd.next; even = even.next
        odd.next = evenHead
        return head
```

```cpp [C++]
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head) return nullptr;
        ListNode *odd=head, *even=head->next, *evenHead=even;
        while (even && even->next) {
            odd->next = even->next; odd = odd->next;
            even->next = odd->next; even = even->next;
        }
        odd->next = evenHead;
        return head;
    }
};
```

```go [Go]
func oddEvenList(head *ListNode) *ListNode {
    if head == nil { return nil }
    odd, even, evenHead := head, head.Next, head.Next
    for even != nil && even.Next != nil {
        odd.Next = even.Next; odd = odd.Next
        even.Next = odd.Next; even = even.Next
    }
    odd.Next = evenHead
    return head
}
```

```js [JavaScript]
var oddEvenList = function (head) {
    if (!head) return null;
    let odd = head, even = head.next, evenHead = even;
    while (even && even.next) {
        odd.next = even.next; odd = odd.next;
        even.next = odd.next; even = even.next;
    }
    odd.next = evenHead;
    return head;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

经典原地链表拆分：奇偶两条链并行推进，最后接起来。注意循环条件是 `even && even.next`（基于偶数位推导奇数位）。`evenHead` 必须保留，否则偶数链丢失。与 `86 分隔链表`（按值）、`143 重排链表` 同类，都是「拆链再拼」。
