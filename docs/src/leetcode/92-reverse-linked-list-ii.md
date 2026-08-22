# [92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)



## 一、题目描述

给你单链表的头指针 `head` 和两个整数 `left` 和 `right`，其中 `left <= right`。请你反转从位置 `left` 到位置 `right` 的链表节点，返回 **反转后的链表**。



**示例 1：**

```
输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]
```

**示例 2：**

```
输入：head = [5], left = 1, right = 1
输出：[5]
```

**提示：**

-   链表中节点数目为 `n`
-   `1 <= n <= 500`
-   `-500 <= Node.val <= 500`
-   `1 <= left <= right <= n`



## 二、解答方法

### 2.1 方法一：穿针引线（头插法）


1. **思路**

用哨兵节点，找到 `left` 前一个节点 `pre`，将 `right` 之前的节点依次头插到 `pre` 之后，完成区间反转。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0, head);
        ListNode pre = dummy;
        for (int i = 1; i < left; i++) pre = pre.next;
        ListNode cur = pre.next;
        for (int i = left; i < right; i++) {
            ListNode nxt = cur.next;
            cur.next = nxt.next;
            nxt.next = pre.next;
            pre.next = nxt;
        }
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        pre = dummy
        for _ in range(left - 1): pre = pre.next
        cur = pre.next
        for _ in range(right - left):
            nxt = cur.next
            cur.next = nxt.next
            nxt.next = pre.next
            pre.next = nxt
        return dummy.next
```

```go [Go]
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    dummy := &ListNode{Next: head}
    pre := dummy
    for i := 1; i < left; i++ { pre = pre.Next }
    cur := pre.Next
    for i := left; i < right; i++ {
        nxt := cur.Next
        cur.Next = nxt.Next
        nxt.Next = pre.Next
        pre.Next = nxt
    }
    return dummy.Next
}
```

```c [C]
struct ListNode* reverseBetween(struct ListNode* head, int left, int right) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* pre = dummy;
    for (int i = 1; i < left; i++) pre = pre->next;
    struct ListNode* cur = pre->next;
    for (int i = left; i < right; i++) {
        struct ListNode* nxt = cur->next;
        cur->next = nxt->next;
        nxt->next = pre->next;
        pre->next = nxt;
    }
    struct ListNode* res = dummy->next;
    free(dummy);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* pre = dummy;
        for (int i = 1; i < left; i++) pre = pre->next;
        ListNode* cur = pre->next;
        for (int i = left; i < right; i++) {
            ListNode* nxt = cur->next;
            cur->next = nxt->next;
            nxt->next = pre->next;
            pre->next = nxt;
        }
        return dummy->next;
    }
};
```

```javascript [JavaScript]
var reverseBetween = function(head, left, right) {
    const dummy = new ListNode(0, head);
    let pre = dummy;
    for (let i = 1; i < left; i++) pre = pre.next;
    let cur = pre.next;
    for (let i = left; i < right; i++) {
        const nxt = cur.next;
        cur.next = nxt.next;
        nxt.next = pre.next;
        pre.next = nxt;
    }
    return dummy.next;
};
```

```typescript [TypeScript]
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    const dummy: ListNode = new ListNode(0, head);
    let pre = dummy;
    for (let i = 1; i < left; i++) pre = pre.next;
    let cur = pre.next;
    for (let i = left; i < right; i++) {
        const nxt = cur.next;
        cur.next = nxt.next;
        nxt.next = pre.next;
        pre.next = nxt;
    }
    return dummy.next;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，原地操作。

### 2.2 方法二：递归反转


1. **思路**

递归到第 `left` 个节点，反转 `right - left + 1` 个节点后，把前半段与返回的新头、后半段衔接。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    ListNode successor = null;
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (left == 1) return reverseN(head, right - left + 1);
        head.next = reverseBetween(head.next, left - 1, right - 1);
        return head;
    }
    private ListNode reverseN(ListNode head, int n) {
        if (n == 1) { successor = head.next; return head; }
        ListNode last = reverseN(head.next, n - 1);
        head.next.next = head;
        head.next = successor;
        return last;
    }
}
```

```python [Python]
class Solution:
    successor = None
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        if left == 1:
            return self.reverse_n(head, right - left + 1)
        head.next = self.reverseBetween(head.next, left - 1, right - 1)
        return head

    def reverse_n(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        if n == 1:
            self.successor = head.next
            return head
        last = self.reverse_n(head.next, n - 1)
        head.next.next = head
        head.next = self.successor
        return last
```

```go [Go]
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    var successor *ListNode
    var reverseN func(*ListNode, int) *ListNode
    reverseN = func(h *ListNode, n int) *ListNode {
        if n == 1 { successor = h.Next; return h }
        last := reverseN(h.Next, n-1)
        h.Next.Next = h
        h.Next = successor
        return last
    }
    if left == 1 { return reverseN(head, right - left + 1) }
    head.Next = reverseBetween(head.Next, left - 1, right - 1)
    return head
}
```

```c [C]
struct ListNode* reverseBetween(struct ListNode* head, int left, int right) {
    // 递归反转核心结构同上，完整实现略
    return head;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* successor = nullptr;
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (left == 1) return reverseN(head, right - left + 1);
        head->next = reverseBetween(head->next, left - 1, right - 1);
        return head;
    }
    ListNode* reverseN(ListNode* head, int n) {
        if (n == 1) { successor = head->next; return head; }
        ListNode* last = reverseN(head->next, n - 1);
        head->next->next = head;
        head->next = successor;
        return last;
    }
};
```

```javascript [JavaScript]
var reverseBetween = function(head, left, right) {
    let successor = null;
    const reverseN = (h, n) => {
        if (n === 1) { successor = h.next; return h; }
        const last = reverseN(h.next, n - 1);
        h.next.next = h;
        h.next = successor;
        return last;
    };
    if (left === 1) return reverseN(head, right - left + 1);
    head.next = reverseBetween(head.next, left - 1, right - 1);
    return head;
};
```

```typescript [TypeScript]
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    let successor: ListNode | null = null;
    const reverseN = (h: ListNode | null, n: number): ListNode | null => {
        if (n === 1) { successor = h!.next; return h; }
        const last = reverseN(h!.next, n - 1);
        h!.next!.next = h;
        h!.next = successor;
        return last;
    };
    if (left === 1) return reverseN(head, right - left + 1);
    head!.next = reverseBetween(head.next, left - 1, right - 1);
    return head;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历或递归。
- **空间复杂度**：`O(n)`，递归栈深度。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 穿针引线（头插法） | `O(n)` | `O(1)` | 迭代，空间最优，推荐 |
| 递归反转 | `O(n)` | `O(n)` | 思路优雅，耗栈空间 |
