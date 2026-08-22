# [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)



## 一、题目描述

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**进阶：**你能尝试使用一趟扫描实现吗？



**示例 1：**

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

**提示：**

-   链表中结点的数目为 `sz`
-   `1 <= sz <= 30`
-   `0 <= Node.val <= 100`
-   `1 <= n <= sz`



## 二、解答方法

### 2.1 方法一：双指针（快慢指针，一趟扫描）

1. **思路**

用两个指针 `fast`、`slow` 间隔 `n` 个结点：

-   先让 `fast` 向前走 `n` 步；
-   然后 `fast`、`slow` 同时前进，直到 `fast` 到达末尾（即 `fast.next == null`）；
-   此时 `slow` 指向「待删除结点的前一个结点」，执行 `slow.next = slow.next.next` 即可；
-   为统一删除头结点的情况，引入 **哑结点（dummy）**，让 `slow` 从 dummy 出发。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i < n; i++) fast = fast.next;
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
```

```python [Python]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    dummy := &ListNode{Next: head}
    fast, slow := dummy, dummy
    for i := 0; i < n; i++ {
        fast = fast.Next
    }
    for fast.Next != nil {
        fast = fast.Next
        slow = slow.Next
    }
    slow.Next = slow.Next.Next
    return dummy.Next
}
```

```c [C]
#include <stdlib.h>

struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* fast = dummy;
    struct ListNode* slow = dummy;
    for (int i = 0; i < n; i++) fast = fast->next;
    while (fast->next != NULL) {
        fast = fast->next;
        slow = slow->next;
    }
    struct ListNode* toFree = slow->next;
    slow->next = slow->next->next;
    free(toFree);
    struct ListNode* newHead = dummy->next;
    free(dummy);
    return newHead;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        for (int i = 0; i < n; i++) fast = fast->next;
        while (fast->next != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy, slow = dummy;
    for (let i = 0; i < n; i++) fast = fast.next;
    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};
```

```ts [TypeScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number;
 *     next: ListNode | null;
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.next = (next === undefined ? null : next);
 *     }
 * }
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let fast: ListNode | null = dummy;
    let slow: ListNode = dummy;
    for (let i = 0; i < n; i++) fast = fast!.next;
    while (fast!.next !== null) {
        fast = fast!.next;
        slow = slow.next!;
    }
    slow.next = slow.next!.next;
    return dummy.next;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(sz)`，一趟扫描遍历链表，其中 `sz` 为链表长度。
- **空间复杂度**：`O(1)`，只使用常数个指针（哑结点不计额外规模）。

### 2.2 方法二：两次遍历（先求长度）

1. **思路**

先遍历一次得到链表长度 `sz`，则倒数第 `n` 个就是正数第 `sz - n + 1` 个，再从头部走 `sz - n` 步到达其前驱，执行删除。简单直观但需两次扫描。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int sz = 0;
        for (ListNode p = head; p != null; p = p.next) sz++;
        if (sz == n) return head.next; // 删除头结点
        ListNode cur = head;
        for (int i = 0; i < sz - n - 1; i++) cur = cur.next;
        cur.next = cur.next.next;
        return head;
    }
}
```

```python [Python]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        sz = 0
        cur = head
        while cur:
            sz += 1
            cur = cur.next
        if sz == n:
            return head.next
        cur = head
        for _ in range(sz - n - 1):
            cur = cur.next
        cur.next = cur.next.next
        return head
```

```go [Go]
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    sz := 0
    for p := head; p != nil; p = p.Next {
        sz++
    }
    if sz == n {
        return head.Next
    }
    cur := head
    for i := 0; i < sz-n-1; i++ {
        cur = cur.Next
    }
    cur.Next = cur.Next.Next
    return head
}
```

```c [C]
#include <stdlib.h>

struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    int sz = 0;
    for (struct ListNode* p = head; p != NULL; p = p->next) sz++;
    if (sz == n) return head->next;
    struct ListNode* cur = head;
    for (int i = 0; i < sz - n - 1; i++) cur = cur->next;
    struct ListNode* toFree = cur->next;
    cur->next = cur->next->next;
    free(toFree);
    return head;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        int sz = 0;
        for (ListNode* p = head; p != nullptr; p = p->next) sz++;
        if (sz == n) return head->next;
        ListNode* cur = head;
        for (int i = 0; i < sz - n - 1; i++) cur = cur->next;
        cur->next = cur->next->next;
        return head;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let sz = 0;
    for (let p = head; p !== null; p = p.next) sz++;
    if (sz === n) return head.next;
    let cur = head;
    for (let i = 0; i < sz - n - 1; i++) cur = cur.next;
    cur.next = cur.next.next;
    return head;
};
```

```ts [TypeScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number;
 *     next: ListNode | null;
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.next = (next === undefined ? null : next);
 *     }
 * }
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let sz = 0;
    for (let p = head; p !== null; p = p.next) sz++;
    if (sz === n) return head!.next;
    let cur: ListNode = head!;
    for (let i = 0; i < sz - n - 1; i++) cur = cur.next!;
    cur.next = cur.next!.next;
    return head;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(sz)`，两次遍历，共约 `2 * sz` 步。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（快慢指针，一趟扫描） | `O(sz)` | `O(1)` | 空间紧凑，常为常数级 |
| 两次遍历（先求长度） | `O(sz)` | `O(1)` | 常规实现 |

