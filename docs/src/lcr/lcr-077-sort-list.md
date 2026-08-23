# [LCR 077. 排序链表](https://leetcode.cn/problems/7WHec2/)



## 一、题目描述

给定链表的头结点 `head` ，请将其按 **升序** 排列并返回 **排序后的链表** 。



**示例 1：**

```
输入：head = [4,2,1,3]
输出：[1,2,3,4]
```

**示例 2：**

```
输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
```

**提示：**

- 链表中节点的数目在范围 `[0, 5 * 10⁴]` 内
- `-10⁵ <= Node.val <= 10⁵`



## 二、解答方法

### 2.1 方法一：归并排序（自顶向下）

1. **思路**

链表的归并排序（`O(n log n)`，`O(log n)` 栈空间）：

- **找中点**：快慢指针把链表一分为二；
- **递归排序**两半；
- **合并**两个有序链表。

时间 `O(n log n)`，空间 `O(log n)`（递归栈）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        // 1. 找中点
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode mid = slow.next;
        slow.next = null;
        // 2. 递归排序
        ListNode l = sortList(head);
        ListNode r = sortList(mid);
        // 3. 合并
        return merge(l, r);
    }
    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a != null ? a : b;
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        mid = slow.next
        slow.next = None
        l = self.sortList(head)
        r = self.sortList(mid)
        return self.merge(l, r)

    def merge(self, a, b):
        dummy = ListNode(0)
        cur = dummy
        while a and b:
            if a.val <= b.val:
                cur.next = a
                a = a.next
            else:
                cur.next = b
                b = b.next
            cur = cur.next
        cur.next = a or b
        return dummy.next
```

```cpp [C++]
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* slow = head;
        ListNode* fast = head->next;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* mid = slow->next;
        slow->next = nullptr;
        ListNode* l = sortList(head);
        ListNode* r = sortList(mid);
        return merge(l, r);
    }
private:
    ListNode* merge(ListNode* a, ListNode* b) {
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        while (a && b) {
            if (a->val <= b->val) { cur->next = a; a = a->next; }
            else { cur->next = b; b = b->next; }
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return dummy->next;
    }
};
```

```go [Go]
func sortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    slow, fast := head, head.Next
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    mid := slow.Next
    slow.Next = nil
    l := sortList(head)
    r := sortList(mid)
    return merge(l, r)
}

func merge(a, b *ListNode) *ListNode {
    dummy := &ListNode{}
    cur := dummy
    for a != nil && b != nil {
        if a.Val <= b.Val {
            cur.Next = a
            a = a.Next
        } else {
            cur.Next = b
            b = b.Next
        }
        cur = cur.Next
    }
    if a != nil {
        cur.Next = a
    } else {
        cur.Next = b
    }
    return dummy.Next
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    if (!head || !head.next) return head;
    let slow = head, fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    const mid = slow.next;
    slow.next = null;
    const l = sortList(head);
    const r = sortList(mid);
    const dummy = new ListNode(0);
    let cur = dummy;
    while (l && r) {
        if (l.val <= r.val) { cur.next = l; l = l.next; }
        else { cur.next = r; r = r.next; }
        cur = cur.next;
    }
    cur.next = l || r;
    return dummy.next;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

static struct ListNode* merge(struct ListNode* a, struct ListNode* b) {
    struct ListNode dummy;
    dummy.next = NULL;
    struct ListNode* cur = &dummy;
    while (a && b) {
        if (a->val <= b->val) { cur->next = a; a = a->next; }
        else { cur->next = b; b = b->next; }
        cur = cur->next;
    }
    cur->next = a ? a : b;
    return dummy.next;
}

struct ListNode* sortList(struct ListNode* head) {
    if (!head || !head->next) return head;
    struct ListNode* slow = head;
    struct ListNode* fast = head->next;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    struct ListNode* mid = slow->next;
    slow->next = NULL;
    struct ListNode* l = sortList(head);
    struct ListNode* r = sortList(mid);
    return merge(l, r);
}
```

```ts [TypeScript]
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    let slow: ListNode | null = head, fast: ListNode | null = head.next;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    const mid = slow!.next;
    slow!.next = null;
    const l = sortList(head);
    const r = sortList(mid);
    const dummy = new ListNode(0);
    let cur: ListNode = dummy;
    let a = l, b = r;
    while (a && b) {
        if (a.val <= b.val) { cur.next = a; a = a.next; }
        else { cur.next = b; b = b.next; }
        cur = cur.next;
    }
    cur.next = a || b;
    return dummy.next;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(log n)`，递归栈。

### 2.2 方法二：自底向上归并（O(1) 空间）

1. **思路**

不递归，从长度为 1 的子链表开始，逐轮「两两合并」相邻子链表，长度翻倍直到整个链表有序。需要额外空间 `O(1)`，代码略复杂，适合严格要求常数空间的场景。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        int len = 0;
        for (ListNode p = head; p != null; p = p.next) len++;
        ListNode dummy = new ListNode(0, head);
        for (int size = 1; size < len; size <<= 1) {
            ListNode prev = dummy, cur = dummy.next;
            while (cur != null) {
                ListNode left = cur;
                ListNode right = split(left, size);
                cur = split(right, size);
                prev.next = merge(left, right);
                while (prev.next != null) prev = prev.next;
            }
        }
        return dummy.next;
    }
    private ListNode split(ListNode head, int size) {
        if (head == null) return null;
        for (int i = 1; head.next != null && i < size; i++) head = head.next;
        ListNode next = head.next;
        head.next = null;
        return next;
    }
    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a != null ? a : b;
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        length = 0
        p = head
        while p:
            length += 1
            p = p.next

        def split(node, size):
            if not node:
                return None
            for _ in range(size - 1):
                if not node.next:
                    break
                node = node.next
            nxt = node.next
            node.next = None
            return nxt

        def merge(a, b):
            dummy = ListNode(0)
            cur = dummy
            while a and b:
                if a.val <= b.val:
                    cur.next = a
                    a = a.next
                else:
                    cur.next = b
                    b = b.next
                cur = cur.next
            cur.next = a or b
            return dummy.next

        dummy = ListNode(0, head)
        size = 1
        while size < length:
            prev = dummy
            cur = dummy.next
            while cur:
                left = cur
                right = split(left, size)
                cur = split(right, size)
                prev.next = merge(left, right)
                while prev.next:
                    prev = prev.next
            size <<= 1
        return dummy.next
```

```cpp [C++]
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        int len = 0;
        for (ListNode* p = head; p; p = p->next) len++;
        ListNode* dummy = new ListNode(0, head);
        for (int size = 1; size < len; size <<= 1) {
            ListNode* prev = dummy;
            ListNode* cur = dummy->next;
            while (cur) {
                ListNode* left = cur;
                ListNode* right = split(left, size);
                cur = split(right, size);
                prev->next = merge(left, right);
                while (prev->next) prev = prev->next;
            }
        }
        return dummy->next;
    }
private:
    ListNode* split(ListNode* head, int size) {
        if (!head) return nullptr;
        for (int i = 1; head->next && i < size; i++) head = head->next;
        ListNode* nxt = head->next;
        head->next = nullptr;
        return nxt;
    }
    ListNode* merge(ListNode* a, ListNode* b) {
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        while (a && b) {
            if (a->val <= b->val) { cur->next = a; a = a->next; }
            else { cur->next = b; b = b->next; }
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return dummy->next;
    }
};
```

```go [Go]
func sortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    length := 0
    for p := head; p != nil; p = p.Next {
        length++
    }
    split := func(node *ListNode, size int) *ListNode {
        if node == nil {
            return nil
        }
        for i := 1; node.Next != nil && i < size; i++ {
            node = node.Next
        }
        nxt := node.Next
        node.Next = nil
        return nxt
    }
    dummy := &ListNode{Next: head}
    for size := 1; size < length; size <<= 1 {
        prev := dummy
        cur := dummy.Next
        for cur != nil {
            left := cur
            right := split(left, size)
            cur = split(right, size)
            prev.Next = merge(left, right)
            for prev.Next != nil {
                prev = prev.Next
            }
        }
    }
    return dummy.Next
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    if (!head || !head.next) return head;
    let len = 0;
    for (let p = head; p; p = p.next) len++;
    const split = (node, size) => {
        if (!node) return null;
        for (let i = 1; node.next && i < size; i++) node = node.next;
        const nxt = node.next;
        node.next = null;
        return nxt;
    };
    const merge = (a, b) => {
        const dummy = new ListNode(0);
        let cur = dummy;
        while (a && b) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a || b;
        return dummy.next;
    };
    const dummy = new ListNode(0, head);
    for (let size = 1; size < len; size <<= 1) {
        let prev = dummy, cur = dummy.next;
        while (cur) {
            const left = cur;
            const right = split(left, size);
            cur = split(right, size);
            prev.next = merge(left, right);
            while (prev.next) prev = prev.next;
        }
    }
    return dummy.next;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

static struct ListNode* merge(struct ListNode* a, struct ListNode* b) {
    struct ListNode dummy;
    struct ListNode* cur = &dummy;
    while (a && b) {
        if (a->val <= b->val) { cur->next = a; a = a->next; }
        else { cur->next = b; b = b->next; }
        cur = cur->next;
    }
    cur->next = a ? a : b;
    return dummy.next;
}

static struct ListNode* split(struct ListNode* head, int size) {
    if (!head) return NULL;
    for (int i = 1; head->next && i < size; i++) head = head->next;
    struct ListNode* nxt = head->next;
    head->next = NULL;
    return nxt;
}

struct ListNode* sortList(struct ListNode* head) {
    if (!head || !head->next) return head;
    int len = 0;
    for (struct ListNode* p = head; p; p = p->next) len++;
    struct ListNode dummy;
    dummy.next = head;
    for (int size = 1; size < len; size <<= 1) {
        struct ListNode* prev = &dummy;
        struct ListNode* cur = dummy.next;
        while (cur) {
            struct ListNode* left = cur;
            struct ListNode* right = split(left, size);
            cur = split(right, size);
            prev->next = merge(left, right);
            while (prev->next) prev = prev->next;
        }
    }
    return dummy.next;
}
```

```ts [TypeScript]
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    let len = 0;
    for (let p = head; p; p = p.next) len++;
    const split = (node: ListNode | null, size: number): ListNode | null => {
        if (!node) return null;
        for (let i = 1; node.next && i < size; i++) node = node.next;
        const nxt = node.next;
        node.next = null;
        return nxt;
    };
    const merge = (a: ListNode | null, b: ListNode | null): ListNode | null => {
        const dummy = new ListNode(0);
        let cur: ListNode = dummy;
        while (a && b) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a || b;
        return dummy.next;
    };
    const dummy = new ListNode(0, head);
    for (let size = 1; size < len; size <<= 1) {
        let prev: ListNode = dummy;
        let cur: ListNode | null = dummy.next;
        while (cur) {
            const left = cur;
            const right = split(left, size);
            cur = split(right, size);
            prev.next = merge(left, right);
            while (prev.next) prev = prev.next;
        }
    }
    return dummy.next;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(1)`（不使用递归栈）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 自顶向下归并 | `O(n log n)` | `O(log n)` | 实现简洁，推荐 |
| 自底向上归并 | `O(n log n)` | `O(1)` | 满足常数空间进阶要求 |

链表无法随机访问，归并排序（利用「找中点 + 合并有序链表」）是链表排序的标配；自底向上版本用迭代替代递归实现常数空间。

