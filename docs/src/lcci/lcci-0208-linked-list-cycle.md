# [面试题 02.08. 环路检测](https://leetcode.cn/problems/linked-list-cycle-lcci/)

## 一、题目描述

给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。如果链表无环，则返回 `null`。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 `pos` 是 `-1`，则在该链表中没有环。注意：`pos` 不作为参数传递，仅仅是为了标识链表的实际情况。

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
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

```
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
```

**提示：**

- 链表中节点数目范围 `[0, 10^5]`
- `-10^5 <= Node.val <= 10^5`
- `pos` 为 `-1` 或者链表中的一个有效索引

**进阶：** 你是否可以不用额外空间解决此题？

---

## 二、解答方法

### 2.1 方法一：哈希表法

**1. 思路**

使用一个哈希集合（`HashSet`）存储已经访问过的节点。遍历链表，每到一个节点，检查它是否已经在集合中。如果已经存在，则该节点就是环的入口，直接返回；如果遍历到 `null`，则说明链表无环，返回 `null`。

此方法思路简单，但需要额外空间。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        ListNode cur = head;
        while (cur != null) {
            if (visited.contains(cur)) {
                return cur;
            }
            visited.add(cur);
            cur = cur.next;
        }
        return null;
    }
}
```

```python [Python]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        visited = set()
        cur = head
        while cur:
            if cur in visited:
                return cur
            visited.add(cur)
            cur = cur.next
        return None
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func detectCycle(head *ListNode) *ListNode {
    visited := map[*ListNode]bool{}
    cur := head
    for cur != nil {
        if visited[cur] {
            return cur
        }
        visited[cur] = true
        cur = cur.Next
    }
    return nil
}
```

```c [C]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
#include <stdbool.h>
#include <stdlib.h>
// C语言没有内置哈希表，这里使用数组模拟节点地址（不严谨，实际生产需使用uthash）
// 以下为简略示意，实际不可用。推荐使用方法二。
struct ListNode *detectCycle(struct ListNode *head) {
    // 生产环境请使用uthash或其它哈希库
    return NULL;
}
```

```cpp [C++]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        unordered_set<ListNode*> visited;
        ListNode* cur = head;
        while (cur) {
            if (visited.count(cur)) return cur;
            visited.insert(cur);
            cur = cur->next;
        }
        return nullptr;
    }
};
```

```javascript [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var detectCycle = function(head) {
    const visited = new Set();
    let cur = head;
    while (cur) {
        if (visited.has(cur)) return cur;
        visited.add(cur);
        cur = cur.next;
    }
    return null;
};
```

```typescript [TypeScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function detectCycle(head: ListNode | null): ListNode | null {
    const visited = new Set<ListNode>();
    let cur = head;
    while (cur) {
        if (visited.has(cur)) return cur;
        visited.add(cur);
        cur = cur.next;
    }
    return null;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，遍历链表一次。
- **空间复杂度**：`O(n)`，需要存储所有节点。

---

### 2.2 方法二：快慢指针（Floyd判圈算法）

**1. 思路**

使用两个指针 `slow` 和 `fast`，初始都指向头节点。`slow` 每次走一步，`fast` 每次走两步。如果链表有环，它们最终会在环中相遇。相遇后，将其中一个指针（如 `slow`）重新指向头节点，然后两个指针都每次走一步。当它们再次相遇时，相遇点即为环的入口。

此方法不需要额外空间，满足进阶要求。数学原理：设头节点到环入口距离为 `a`，环入口到相遇点距离为 `b`，相遇点到环入口（沿环方向）距离为 `c`，则有 `a = c`（推导过程略）。

**2. 代码实现**

:::::: code-group

```java [Java]
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head;
        // 判断是否有环
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) break;
        }
        // 无环
        if (fast == null || fast.next == null) return null;
        // 有环，找入口
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }
}
```

```python [Python]
class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return None
        slow = fast = head
        # 判断是否有环
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                break
        # 无环
        if not fast or not fast.next:
            return None
        # 有环，找入口
        slow = head
        while slow != fast:
            slow = slow.next
            fast = fast.next
        return slow
```

```go [Go]
func detectCycle(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return nil
    }
    slow, fast := head, head
    // 判断是否有环
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            break
        }
    }
    // 无环
    if fast == nil || fast.Next == nil {
        return nil
    }
    // 有环，找入口
    slow = head
    for slow != fast {
        slow = slow.Next
        fast = fast.Next
    }
    return slow
}
```

```c [C]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode *detectCycle(struct ListNode *head) {
    if (!head || !head->next) return NULL;
    struct ListNode *slow = head, *fast = head;
    // 判断是否有环
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }
    // 无环
    if (!fast || !fast->next) return NULL;
    // 有环，找入口
    slow = head;
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
}
```

```cpp [C++]
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;
        ListNode *slow = head, *fast = head;
        // 判断是否有环
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) break;
        }
        // 无环
        if (!fast || !fast->next) return nullptr;
        // 有环，找入口
        slow = head;
        while (slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        return slow;
    }
};
```

```javascript [JavaScript]
var detectCycle = function(head) {
    if (!head || !head.next) return null;
    let slow = head, fast = head;
    // 判断是否有环
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    // 无环
    if (!fast || !fast.next) return null;
    // 有环，找入口
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
};
```

```typescript [TypeScript]
function detectCycle(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return null;
    let slow: ListNode | null = head, fast: ListNode | null = head;
    // 判断是否有环
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    // 无环
    if (!fast || !fast.next) return null;
    // 有环，找入口
    slow = head;
    while (slow !== fast) {
        slow = slow!.next;
        fast = fast!.next;
    }
    return slow;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为链表节点数，快慢指针相遇和找入口各需 O(n)。
- **空间复杂度**：`O(1)`，只使用了两个指针变量。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                             |
| -------- | ---------- | ---------- | -------------------------------- |
| 哈希表法 | `O(n)`     | `O(n)`     | 直观，但需要额外空间             |
| 快慢指针 | `O(n)`     | `O(1)`     | **推荐**，满足进阶要求，空间最优 |

**推荐**：在实际生产环境中，**方法二（快慢指针）** 是最佳选择，它无需额外空间，且性能良好。哈希表法仅在空间充裕且逻辑简单时作为备选。务必牢记快慢指针的推导过程，面试中常考。