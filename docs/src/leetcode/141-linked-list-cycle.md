# [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)



## 一、题目描述

给你一个链表的头节点 `head` ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。**注意：`pos` 不作为参数传递**。仅仅是为了标识链表的实际情况。

*如果链表中存在环*，则返回 `true` ；否则，返回 `false` 。



**示例 1：**

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

**提示：**

-   链表中节点的数目范围是 `[0, 10⁴]`
-   `-10⁵ <= Node.val <= 10⁵`
-   `pos` 为 `-1` 或者链表中的有效索引



**进阶：** 你能用 `O(1)`（即，常量）内存解决此问题吗？



## 二、解答方法

### 2.1 方法一：哈希表（集合）

1. **思路**

最容易想到的方法是「记录已经走过的节点」：每访问一个节点，就把它存到一个集合（哈希表）中。当遇到一个已经存在于集合里的节点时，说明链表中有环，直接返回 `true`；如果遍历到链表末尾（`next` 为 `null`）仍未发现重复节点，说明无环，返回 `false`。

由于题目只要求判断是否成环，并不需要定位环的入口，因此只需记录「节点本身」即可（无需记录节点值，因为节点值可能重复）。

2. **代码实现**

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
    public boolean hasCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<>();
        while (head != null) {
            if (seen.contains(head)) {
                return true;
            }
            seen.add(head);
            head = head.next;
        }
        return false;
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
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        seen = set()
        while head:
            if head in seen:
                return True
            seen.add(head)
            head = head.next
        return False
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func hasCycle(head *ListNode) bool {
    seen := make(map[*ListNode]bool)
    for head != nil {
        if seen[head] {
            return true
        }
        seen[head] = true
        head = head.Next
    }
    return false
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
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode*> seen;
        while (head != nullptr) {
            if (seen.count(head)) {
                return true;
            }
            seen.insert(head);
            head = head->next;
        }
        return false;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    const seen = new Set();
    while (head) {
        if (seen.has(head)) {
            return true;
        }
        seen.add(head);
        head = head.next;
    }
    return false;
};
```

```ts [TypeScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.next = (next === undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    const seen = new Set<ListNode>();
    while (head) {
        if (seen.has(head)) {
            return true;
        }
        seen.add(head);
        head = head.next;
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 是链表节点数。最多遍历 `n` 个节点，哈希表的插入与查找均为 `O(1)`。
- **空间复杂度**：`O(n)`，哈希表最多存储 `n` 个节点的引用。

### 2.2 方法二：快慢指针（Floyd 判圈算法）

1. **思路**

用两个指针 `slow` 和 `fast` 同时从链表头出发：

- `slow` 每次走一步（`slow = slow.next`）；
- `fast` 每次走两步（`fast = fast.next.next`）。

如果链表中没有环，`fast` 会先到达 `null`（或 `fast.next` 为 `null`），此时可直接返回 `false`。

如果链表中有环，由于 `fast` 比 `slow` 走得快，两者终会在环内相遇：当 `slow` 进入环后，可以看成 `fast` 在环内「追」`slow`，每轮 `fast` 相对 `slow` 接近 1 步，因此必然在若干轮后相遇，此时返回 `true`。

该方法不需要额外的存储空间，满足进阶中 `O(1)` 内存的要求。

2. **代码实现**

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
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
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
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
        slow, fast = head, head.next
        while slow != fast:
            if not fast or not fast.next:
                return False
            slow = slow.next
            fast = fast.next.next
        return True
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func hasCycle(head *ListNode) bool {
    if head == nil || head.Next == nil {
        return false
    }
    slow, fast := head, head.Next
    for slow != fast {
        if fast == nil || fast.Next == nil {
            return false
        }
        slow = slow.Next
        fast = fast.Next.Next
    }
    return true
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
    bool hasCycle(ListNode *head) {
        if (head == nullptr || head->next == nullptr) {
            return false;
        }
        ListNode *slow = head;
        ListNode *fast = head->next;
        while (slow != fast) {
            if (fast == nullptr || fast->next == nullptr) {
                return false;
            }
            slow = slow->next;
            fast = fast->next->next;
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head || !head.next) {
        return false;
    }
    let slow = head;
    let fast = head.next;
    while (slow !== fast) {
        if (!fast || !fast.next) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
};
```

```ts [TypeScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.next = (next === undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) {
        return false;
    }
    let slow: ListNode | null = head;
    let fast: ListNode | null = head.next;
    while (slow !== fast) {
        if (!fast || !fast.next) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 是链表节点数。无环时 `fast` 最多走 `n/2` 步到达末尾；有环时两指针在环内相遇前，`slow` 至多走一圈，整体仍是 `O(n)`。
- **空间复杂度**：`O(1)`，只使用了两个指针的额外空间。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哈希表（集合） | `O(n)` | `O(n)` | 思路直观，借助额外存储空间记录已访问节点 |
| 快慢指针（Floyd） | `O(n)` | `O(1)` | 经典判圈算法，无需额外空间，满足进阶要求 |

实际面试与刷题推荐使用**快慢指针**，它在保证时间效率的同时将空间优化到常量级；哈希表法胜在易于理解和实现。
