# [LCR 021. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/SLw6W5/)



## 一、题目描述

给定一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。



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

- 链表中结点数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`



## 二、解答方法

### 2.1 方法一：双指针（快慢指针）

1. **思路**

使用虚拟头结点 `dummy` 简化删除头结点的情况。让快指针 `fast` 先走 `n` 步，然后快慢指针 `fast`、`slow` 同步前进，直到 `fast` 到达末尾。此时 `slow` 指向待删结点的前驱，执行删除即可。

时间 `O(sz)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i < n; i++) fast = fast.next;
        while (fast.next != null) { fast = fast.next; slow = slow.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```

```cpp [C++]
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        for (int i = 0; i < n; i++) fast = fast->next;
        while (fast->next) { fast = fast->next; slow = slow->next; }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```

```go [Go]
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

```js [JavaScript]
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const dummy = new ListNode(0, head);
    let fast = dummy, slow = dummy;
    for (let i = 0; i < n; i++) fast = fast.next;
    while (fast.next) { fast = fast.next; slow = slow.next; }
    slow.next = slow.next.next;
    return dummy.next;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* fast = dummy;
    struct ListNode* slow = dummy;
    for (int i = 0; i < n; i++) fast = fast->next;
    while (fast->next) { fast = fast->next; slow = slow->next; }
    struct ListNode* del = slow->next;
    slow->next = slow->next->next;
    free(del);
    struct ListNode* res = dummy->next;
    free(dummy);
    return res;
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let fast: ListNode | null = dummy, slow: ListNode | null = dummy;
    for (let i = 0; i < n; i++) fast = fast!.next;
    while (fast!.next) { fast = fast!.next; slow = slow!.next; }
    slow!.next = slow!.next!.next;
    return dummy.next;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(sz)`，只遍历一次链表。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：计算长度后删除

1. **思路**

先遍历一遍得到总长度 `L`，则倒数第 `n` 个即正数第 `L - n` 个（0 下标）。再走 `L - n - 1` 步找到前驱并删除。需要两次遍历，但更易理解。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int len = 0;
        for (ListNode p = head; p != null; p = p.next) len++;
        ListNode dummy = new ListNode(0, head);
        ListNode cur = dummy;
        for (int i = 0; i < len - n; i++) cur = cur.next;
        cur.next = cur.next.next;
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        length = 0
        p = head
        while p:
            length += 1
            p = p.next
        dummy = ListNode(0, head)
        cur = dummy
        for _ in range(length - n):
            cur = cur.next
        cur.next = cur.next.next
        return dummy.next
```

```cpp [C++]
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        int len = 0;
        for (ListNode* p = head; p; p = p->next) len++;
        ListNode* dummy = new ListNode(0, head);
        ListNode* cur = dummy;
        for (int i = 0; i < len - n; i++) cur = cur->next;
        cur->next = cur->next->next;
        return dummy->next;
    }
};
```

```go [Go]
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    length := 0
    for p := head; p != nil; p = p.Next {
        length++
    }
    dummy := &ListNode{Next: head}
    cur := dummy
    for i := 0; i < length-n; i++ {
        cur = cur.Next
    }
    cur.Next = cur.Next.Next
    return dummy.Next
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let len = 0;
    for (let p = head; p; p = p.next) len++;
    const dummy = new ListNode(0, head);
    let cur = dummy;
    for (let i = 0; i < len - n; i++) cur = cur.next;
    cur.next = cur.next.next;
    return dummy.next;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    int len = 0;
    for (struct ListNode* p = head; p; p = p->next) len++;
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* cur = dummy;
    for (int i = 0; i < len - n; i++) cur = cur->next;
    struct ListNode* del = cur->next;
    cur->next = cur->next->next;
    free(del);
    struct ListNode* res = dummy->next;
    free(dummy);
    return res;
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let len = 0;
    for (let p = head; p; p = p.next) len++;
    const dummy = new ListNode(0, head);
    let cur: ListNode | null = dummy;
    for (let i = 0; i < len - n; i++) cur = cur!.next;
    cur!.next = cur!.next!.next;
    return dummy.next;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(sz)`，两次遍历。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 快慢指针 | `O(sz)` | `O(1)` | 一次遍历，最优 |
| 长度计算 | `O(sz)` | `O(1)` | 两次遍历，易理解 |

快慢指针是删除倒数第 N 个结点的经典解法，借助虚拟头结点可统一处理「删除头结点」这一边界情况。

