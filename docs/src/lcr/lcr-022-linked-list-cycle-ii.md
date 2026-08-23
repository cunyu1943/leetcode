# [LCR 022. 环形链表 II](https://leetcode.cn/problems/4UYwWY/)



## 一、题目描述

给定一个链表的头节点 `head` ，判断链表中是否有环，并返回**环的起始节点**。如果链表无环，则返回 `null` 。

为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 `0` 开始）。如果 `pos == -1` 表示链表中没有环。

注意：`pos` 仅仅是用于标识环的，**不会作为参数传递到函数中**。



**示例 1：**

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

```
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
```

**示例 3：**

```
输入：head = [1], pos = -1
输出：返回 null
```

**提示：**

- 链表中节点的数目范围在 `[0, 10⁴]` 内
- `-10⁵ <= Node.val <= 10⁵`
- `pos` 的值为 `-1` 或链表中的有效索引



## 二、解答方法

### 2.1 方法一：快慢指针（Floyd 判圈）

1. **思路**

- 用快慢指针，`fast` 走两步、`slow` 走一步。若相遇说明有环；
- 相遇后，令其中一个指针回到头结点，两个指针都改为每次走一步，再次相遇的点就是环的入口。

数学证明：设头到环口距离为 `a`，环口到相遇点为 `b`，相遇点绕回环口为 `c`。相遇时 `fast = 2·slow` 且 `fast = slow + k(a+b+c)` 的整数倍，推得 `a = c + 整数圈`，故头与相遇点同步走必在环口汇合。

时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode p = head;
                while (p != slow) { p = p.next; slow = slow.next; }
                return p;
            }
        }
        return null;
    }
}
```

```python [Python]
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                p = head
                while p != slow:
                    p = p.next
                    slow = slow.next
                return p
        return None
```

```cpp [C++]
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                ListNode *p = head;
                while (p != slow) { p = p->next; slow = slow->next; }
                return p;
            }
        }
        return nullptr;
    }
};
```

```go [Go]
func detectCycle(head *ListNode) *ListNode {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            p := head
            for p != slow {
                p = p.Next
                slow = slow.Next
            }
            return p
        }
    }
    return nil
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            let p = head;
            while (p !== slow) { p = p.next; slow = slow.next; }
            return p;
        }
    }
    return null;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode *detectCycle(struct ListNode *head) {
    struct ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            struct ListNode *p = head;
            while (p != slow) { p = p->next; slow = slow->next; }
            return p;
        }
    }
    return NULL;
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

function detectCycle(head: ListNode | null): ListNode | null {
    let slow: ListNode | null = head, fast: ListNode | null = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            let p: ListNode | null = head;
            while (p !== slow) { p = p!.next; slow = slow!.next; }
            return p;
        }
    }
    return null;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：哈希表

1. **思路**

遍历链表，用哈希表（集合）记录访问过的结点。每到一个结点，若已在集合中说明它就是环的入口，直接返回；否则放入集合。无环则返回 `null`。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode detectCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<>();
        while (head != null) {
            if (seen.contains(head)) return head;
            seen.add(head);
            head = head.next;
        }
        return null;
    }
}
```

```python [Python]
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        seen = set()
        while head:
            if head in seen:
                return head
            seen.add(head)
            head = head.next
        return None
```

```cpp [C++]
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        unordered_set<ListNode*> seen;
        while (head) {
            if (seen.count(head)) return head;
            seen.insert(head);
            head = head->next;
        }
        return nullptr;
    }
};
```

```go [Go]
func detectCycle(head *ListNode) *ListNode {
    seen := map[*ListNode]bool{}
    for head != nil {
        if seen[head] {
            return head
        }
        seen[head] = true
        head = head.Next
    }
    return nil
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    const seen = new Set();
    while (head) {
        if (seen.has(head)) return head;
        seen.add(head);
        head = head.next;
    }
    return null;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

// C 无内置哈希，这里用线性标记数组（借助结点地址可被标记的前提不通用），
// 以下改用「遍历法」：每访问一个结点把 next 指向一个哨兵，若再次遇到则返回。
struct ListNode *detectCycle(struct ListNode *head) {
    struct ListNode sentinel;
    while (head) {
        if (head->next == &sentinel) return head;
        struct ListNode *nxt = head->next;
        head->next = &sentinel;
        head = nxt;
    }
    return NULL;
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

function detectCycle(head: ListNode | null): ListNode | null {
    const seen: Set<ListNode> = new Set();
    while (head) {
        if (seen.has(head)) return head;
        seen.add(head);
        head = head.next;
    }
    return null;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（指针集合）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| Floyd 快慢指针 | `O(n)` | `O(1)` | 最优，无需额外空间 |
| 哈希表 | `O(n)` | `O(n)` | 直观，但需要额外空间 |

Floyd 算法利用「相遇后头与相遇点同步前进必在环口汇合」的数学性质，在常数空间内解决「找环入口」问题。

