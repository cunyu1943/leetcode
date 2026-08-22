# [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)



## 一、题目描述

给你一个链表的头节点 `head`，旋转链表，将链表每个节点向右移动 `k` 个位置。



**示例 1：**

```
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
```

**示例 2：**

```
输入：head = [0,1,2], k = 4
输出：[2,0,1]
```

**提示：**

-   链表中节点的数目在范围 `[0, 500]` 内
-   `-100 <= Node.val <= 100`
-   `0 <= k <= 2 * 10^9`



## 二、解答方法

### 2.1 方法一：闭合为环


1. **思路**

先遍历得到链表长度 `len` 与尾节点，将尾节点指向头节点形成环；再从新的断点（第 `len - k % len` 个节点后）断开，返回新头节点。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        int len = 1;
        ListNode tail = head;
        while (tail.next != null) { tail = tail.next; len++; }
        tail.next = head;
        int cut = len - k % len;
        ListNode newTail = head;
        for (int i = 1; i < cut; i++) newTail = newTail.next;
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }
}
```

```python [Python]
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head
        length, tail = 1, head
        while tail.next:
            tail = tail.next
            length += 1
        tail.next = head
        cut = length - k % length
        new_tail = head
        for _ in range(cut - 1):
            new_tail = new_tail.next
        new_head = new_tail.next
        new_tail.next = None
        return new_head
```

```go [Go]
func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil || head.Next == nil || k == 0 { return head }
    length, tail := 1, head
    for tail.Next != nil { tail = tail.Next; length++ }
    tail.Next = head
    cut := length - k % length
    newTail := head
    for i := 1; i < cut; i++ { newTail = newTail.Next }
    newHead := newTail.Next
    newTail.Next = nil
    return newHead
}
```

```c [C]
struct ListNode* rotateRight(struct ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;
    int len = 1;
    struct ListNode* tail = head;
    while (tail->next) { tail = tail->next; len++; }
    tail->next = head;
    int cut = len - k % len;
    struct ListNode* newTail = head;
    for (int i = 1; i < cut; i++) newTail = newTail->next;
    struct ListNode* newHead = newTail->next;
    newTail->next = NULL;
    return newHead;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int len = 1;
        ListNode* tail = head;
        while (tail->next) { tail = tail->next; len++; }
        tail->next = head;
        int cut = len - k % len;
        ListNode* newTail = head;
        for (int i = 1; i < cut; i++) newTail = newTail->next;
        ListNode* newHead = newTail->next;
        newTail->next = nullptr;
        return newHead;
    }
};
```

```javascript [JavaScript]
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;
    let len = 1, tail = head;
    while (tail.next) { tail = tail.next; len++; }
    tail.next = head;
    const cut = len - k % len;
    let newTail = head;
    for (let i = 1; i < cut; i++) newTail = newTail.next;
    const newHead = newTail.next;
    newTail.next = null;
    return newHead;
};
```

```typescript [TypeScript]
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) return head;
    let len = 1, tail = head;
    while (tail.next) { tail = tail.next; len++; }
    tail.next = head;
    const cut = len - k % len;
    let newTail = head;
    for (let i = 1; i < cut; i++) newTail = newTail.next;
    const newHead = newTail.next;
    newTail.next = null;
    return newHead;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，遍历两次链表。
- **空间复杂度**：`O(1)`**，只用到常数指针。

### 2.2 方法二：快慢指针


1. **思路**

先求长度并对 `k` 取模，用快慢指针（快指针先走 `k` 步）找到新尾节点，断开重连。思路与闭环节类似，但无需显式成环。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        int len = 1;
        ListNode p = head;
        while (p.next != null) { p = p.next; len++; }
        k %= len;
        if (k == 0) return head;
        ListNode slow = head, fast = head;
        for (int i = 0; i < k; i++) fast = fast.next;
        while (fast.next != null) { slow = slow.next; fast = fast.next; }
        ListNode newHead = slow.next;
        slow.next = null;
        fast.next = head;
        return newHead;
    }
}
```

```python [Python]
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head
        length, p = 1, head
        while p.next:
            p = p.next
            length += 1
        k %= length
        if k == 0:
            return head
        slow = fast = head
        for _ in range(k):
            fast = fast.next
        while fast.next:
            slow = slow.next
            fast = fast.next
        new_head = slow.next
        slow.next = None
        fast.next = head
        return new_head
```

```go [Go]
func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil || head.Next == nil || k == 0 { return head }
    length, p := 1, head
    for p.Next != nil { p = p.Next; length++ }
    k %= length
    if k == 0 { return head }
    slow, fast := head, head
    for i := 0; i < k; i++ { fast = fast.Next }
    for fast.Next != nil { slow = slow.Next; fast = fast.Next }
    newHead := slow.Next
    slow.Next = nil
    fast.Next = head
    return newHead
}
```

```c [C]
struct ListNode* rotateRight(struct ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;
    int len = 1;
    struct ListNode* p = head;
    while (p->next) { p = p->next; len++; }
    k %= len;
    if (k == 0) return head;
    struct ListNode *slow = head, *fast = head;
    for (int i = 0; i < k; i++) fast = fast->next;
    while (fast->next) { slow = slow->next; fast = fast->next; }
    struct ListNode* newHead = slow->next;
    slow->next = NULL;
    fast->next = head;
    return newHead;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int len = 1;
        ListNode* p = head;
        while (p->next) { p = p->next; len++; }
        k %= len;
        if (k == 0) return head;
        ListNode *slow = head, *fast = head;
        for (int i = 0; i < k; i++) fast = fast->next;
        while (fast->next) { slow = slow->next; fast = fast->next; }
        ListNode* newHead = slow->next;
        slow->next = nullptr;
        fast->next = head;
        return newHead;
    }
};
```

```javascript [JavaScript]
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;
    let len = 1, p = head;
    while (p.next) { p = p.next; len++; }
    k %= len;
    if (k === 0) return head;
    let slow = head, fast = head;
    for (let i = 0; i < k; i++) fast = fast.next;
    while (fast.next) { slow = slow.next; fast = fast.next; }
    const newHead = slow.next;
    slow.next = null;
    fast.next = head;
    return newHead;
};
```

```typescript [TypeScript]
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) return head;
    let len = 1, p = head;
    while (p.next) { p = p.next; len++; }
    k %= len;
    if (k === 0) return head;
    let slow = head, fast = head;
    for (let i = 0; i < k; i++) fast = fast.next;
    while (fast.next) { slow = slow.next; fast = fast.next; }
    const newHead = slow.next;
    slow.next = null;
    fast.next = head;
    return newHead;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，遍历两次。
- **空间复杂度**：`O(1)`**，常数指针。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 闭合为环 | `O(n)` | `O(1)` | 思路清晰，推荐 |
| 快慢指针 | `O(n)` | `O(1)` | 无需显式成环 |
