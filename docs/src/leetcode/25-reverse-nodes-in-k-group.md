# [25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)



## 一、题目描述

给你链表的头节点 `head`，每 `k` 个节点一组进行翻转，请你返回修改后的链表。

`k` 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 `k` 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

**进阶：**你可以设计一个只用 `O(1)` 额外内存空间的算法解决此问题吗？



**示例 1：**

```
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
```

**示例 2：**

```
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
```

**提示：**

-   链表中的节点数目为 `n`
-   `1 <= k <= n <= 5000`
-   `0 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：迭代（分组翻转 + 哑结点）

1. **思路**

用哑结点 `dummy` 简化头结点处理，`prevTail` 指向「已翻转部分的尾节点」（初始为 dummy）。每轮：

-   从 `prevTail.next` 出发，走 `k` 步看剩余是否够 `k` 个；不够则结束；
-   够 `k` 个时，截取这 `k` 个节点进行区间翻转（头插法）；
-   翻转后把这段新头接到 `prevTail.next`，新尾接到后续链表，再更新 `prevTail` 为这段新尾。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prevTail = dummy;
        while (true) {
            ListNode p = prevTail;
            for (int i = 0; i < k; i++) {
                p = p.next;
                if (p == null) return dummy.next;
            }
            ListNode groupHead = prevTail.next;
            ListNode nextGroup = p.next;
            // 翻转 [groupHead, p]
            ListNode cur = groupHead, newHead = null;
            while (cur != nextGroup) {
                ListNode nxt = cur.next;
                cur.next = newHead;
                newHead = cur;
                cur = nxt;
            }
            prevTail.next = newHead;
            groupHead.next = nextGroup;
            prevTail = groupHead;
        }
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
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev_tail = dummy
        while True:
            p = prev_tail
            for _ in range(k):
                p = p.next
                if not p:
                    return dummy.next
            group_head = prev_tail.next
            next_group = p.next
            cur, new_head = group_head, None
            while cur is not next_group:
                nxt = cur.next
                cur.next = new_head
                new_head = cur
                cur = nxt
            prev_tail.next = new_head
            group_head.next = next_group
            prev_tail = group_head
```

```go [Go]
func reverseKGroup(head *ListNode, k int) *ListNode {
    dummy := &ListNode{Next: head}
    prevTail := dummy
    for {
        p := prevTail
        ok := true
        for i := 0; i < k; i++ {
            p = p.Next
            if p == nil {
                ok = false
                break
            }
        }
        if !ok {
            break
        }
        groupHead := prevTail.Next
        nextGroup := p.Next
        var newHead *ListNode = nil
        cur := groupHead
        for cur != nextGroup {
            nxt := cur.Next
            cur.Next = newHead
            newHead = cur
            cur = nxt
        }
        prevTail.Next = newHead
        groupHead.Next = nextGroup
        prevTail = groupHead
    }
    return dummy.Next
}
```

```c [C]
#include <stdlib.h>

struct ListNode* reverseKGroup(struct ListNode* head, int k) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* prevTail = dummy;
    while (1) {
        struct ListNode* p = prevTail;
        int ok = 1;
        for (int i = 0; i < k; i++) {
            p = p->next;
            if (p == NULL) { ok = 0; break; }
        }
        if (!ok) break;
        struct ListNode* groupHead = prevTail->next;
        struct ListNode* nextGroup = p->next;
        struct ListNode* cur = groupHead;
        struct ListNode* newHead = NULL;
        while (cur != nextGroup) {
            struct ListNode* nxt = cur->next;
            cur->next = newHead;
            newHead = cur;
            cur = nxt;
        }
        prevTail->next = newHead;
        groupHead->next = nextGroup;
        prevTail = groupHead;
    }
    struct ListNode* newHead = dummy->next;
    free(dummy);
    return newHead;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* prevTail = dummy;
        while (true) {
            ListNode* p = prevTail;
            bool ok = true;
            for (int i = 0; i < k; i++) {
                p = p->next;
                if (p == nullptr) { ok = false; break; }
            }
            if (!ok) break;
            ListNode* groupHead = prevTail->next;
            ListNode* nextGroup = p->next;
            ListNode* cur = groupHead;
            ListNode* newHead = nullptr;
            while (cur != nextGroup) {
                ListNode* nxt = cur->next;
                cur->next = newHead;
                newHead = cur;
                cur = nxt;
            }
            prevTail->next = newHead;
            groupHead->next = nextGroup;
            prevTail = groupHead;
        }
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevTail = dummy;
    while (true) {
        let p = prevTail;
        let ok = true;
        for (let i = 0; i < k; i++) {
            p = p.next;
            if (p === null) { ok = false; break; }
        }
        if (!ok) break;
        const groupHead = prevTail.next;
        const nextGroup = p.next;
        let cur = groupHead, newHead = null;
        while (cur !== nextGroup) {
            const nxt = cur.next;
            cur.next = newHead;
            newHead = cur;
            cur = nxt;
        }
        prevTail.next = newHead;
        groupHead.next = nextGroup;
        prevTail = groupHead;
    }
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
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevTail: ListNode = dummy;
    while (true) {
        let p: ListNode | null = prevTail;
        let ok = true;
        for (let i = 0; i < k; i++) {
            p = p!.next;
            if (p === null) { ok = false; break; }
        }
        if (!ok) break;
        const groupHead = prevTail.next;
        const nextGroup = p!.next;
        let cur: ListNode | null = groupHead;
        let newHead: ListNode | null = null;
        while (cur !== nextGroup) {
            const nxt = cur!.next;
            cur!.next = newHead;
            newHead = cur;
            cur = nxt;
        }
        prevTail.next = newHead;
        groupHead!.next = nextGroup;
        prevTail = groupHead!;
    }
    return dummy.next;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点被访问常数次（走 `k` 步探测 + 翻转 `k` 步）。
- **空间复杂度**：`O(1)`，只使用常数个指针，满足进阶的 `O(1)` 额外空间要求。

### 2.2 方法二：递归

1. **思路**

先判断剩余是否够 `k` 个，不够直接返回 `head`；否则翻转前 `k` 个，再递归处理后续并接上。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode p = head;
        for (int i = 0; i < k; i++) {
            if (p == null) return head;
            p = p.next;
        }
        ListNode cur = head, newHead = null;
        for (int i = 0; i < k; i++) {
            ListNode nxt = cur.next;
            cur.next = newHead;
            newHead = cur;
            cur = nxt;
        }
        head.next = reverseKGroup(cur, k);
        return newHead;
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
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        p = head
        for _ in range(k):
            if not p:
                return head
            p = p.next
        cur, new_head = head, None
        for _ in range(k):
            nxt = cur.next
            cur.next = new_head
            new_head = cur
            cur = nxt
        head.next = self.reverseKGroup(cur, k)
        return new_head
```

```go [Go]
func reverseKGroup(head *ListNode, k int) *ListNode {
    p := head
    for i := 0; i < k; i++ {
        if p == nil {
            return head
        }
        p = p.Next
    }
    cur, newHead := head, (*ListNode)(nil)
    for i := 0; i < k; i++ {
        nxt := cur.Next
        cur.Next = newHead
        newHead = cur
        cur = nxt
    }
    head.Next = reverseKGroup(cur, k)
    return newHead
}
```

```c [C]
struct ListNode* reverseKGroup(struct ListNode* head, int k) {
    struct ListNode* p = head;
    for (int i = 0; i < k; i++) {
        if (p == NULL) return head;
        p = p->next;
    }
    struct ListNode* cur = head;
    struct ListNode* newHead = NULL;
    for (int i = 0; i < k; i++) {
        struct ListNode* nxt = cur->next;
        cur->next = newHead;
        newHead = cur;
        cur = nxt;
    }
    head->next = reverseKGroup(cur, k);
    return newHead;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* p = head;
        for (int i = 0; i < k; i++) {
            if (p == nullptr) return head;
            p = p->next;
        }
        ListNode* cur = head;
        ListNode* newHead = nullptr;
        for (int i = 0; i < k; i++) {
            ListNode* nxt = cur->next;
            cur->next = newHead;
            newHead = cur;
            cur = nxt;
        }
        head->next = reverseKGroup(cur, k);
        return newHead;
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    let p = head;
    for (let i = 0; i < k; i++) {
        if (p === null) return head;
        p = p.next;
    }
    let cur = head, newHead = null;
    for (let i = 0; i < k; i++) {
        const nxt = cur.next;
        cur.next = newHead;
        newHead = cur;
        cur = nxt;
    }
    head.next = reverseKGroup(cur, k);
    return newHead;
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
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let p: ListNode | null = head;
    for (let i = 0; i < k; i++) {
        if (p === null) return head;
        p = p.next;
    }
    let cur: ListNode | null = head;
    let newHead: ListNode | null = null;
    for (let i = 0; i < k; i++) {
        const nxt = cur!.next;
        cur!.next = newHead;
        newHead = cur;
        cur = nxt;
    }
    head!.next = reverseKGroup(cur, k);
    return newHead;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点翻转一次。
- **空间复杂度**：`O(n / k)`，递归栈深度为组数。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 迭代（分组翻转 + 哑结点） | `O(n)` | `O(1)` | 无递归栈，空间更优 |
| 递归 | `O(n)` | `O(n / k)` | 代码简洁，有递归开销 |

