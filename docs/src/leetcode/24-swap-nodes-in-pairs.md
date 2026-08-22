# [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)



## 一、题目描述

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。



**示例 1：**

```
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

**示例 2：**

```
输入：head = []
输出：[]
```

**示例 3：**

```
输入：head = [1]
输出：[1]
```

**提示：**

-   链表中节点的数目在范围 `[0, 100]` 内
-   `0 <= Node.val <= 100`



## 二、解答方法

### 2.1 方法一：递归

1. **思路**

把链表看作「头两个节点 + 剩余链表」。递归处理「剩余链表」得到已两两交换好的子结果，再把前两个节点交换并接上：

-   若头结点或其后继为空，无需交换，直接返回 `head`；
-   令 `first = head`、`second = head.next`；
-   递归交换 `second.next` 之后的部分，记为 `rest`；
-   `second.next = first`，`first.next = rest`，返回 `second` 作为新头。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode first = head;
        ListNode second = head.next;
        first.next = swapPairs(second.next);
        second.next = first;
        return second;
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
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        first, second = head, head.next
        first.next = self.swapPairs(second.next)
        second.next = first
        return second
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapPairs(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    first, second := head, head.Next
    first.Next = swapPairs(second.Next)
    second.Next = first
    return second
}
```

```c [C]
#include <stdlib.h>

struct ListNode* swapPairs(struct ListNode* head) {
    if (head == NULL || head->next == NULL) return head;
    struct ListNode* first = head;
    struct ListNode* second = head->next;
    first->next = swapPairs(second->next);
    second->next = first;
    return second;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (head == nullptr || head->next == nullptr) return head;
        ListNode* first = head;
        ListNode* second = head->next;
        first->next = swapPairs(second->next);
        second->next = first;
        return second;
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
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (head === null || head.next === null) return head;
    const first = head;
    const second = head.next;
    first.next = swapPairs(second.next);
    second.next = first;
    return second;
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
function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head;
    const first = head;
    const second = head.next;
    first.next = swapPairs(second.next);
    second.next = first;
    return second;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点被访问一次，共 `n/2` 次交换。
- **空间复杂度**：`O(n)`，递归调用栈深度为 `n/2`。

### 2.2 方法二：迭代（哑结点 + 三指针）

1. **思路**

用哑结点 `dummy` 简化头结点处理，`prev` 指向待交换对的前驱。每次取出 `first = prev.next`、`second = first.next`，执行交换：

-   `prev.next = second`
-   `first.next = second.next`
-   `second.next = first`
-   推进 `prev = first`，准备下一组。

循环条件为 `prev.next` 与 `prev.next.next` 均非空。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;
            prev.next = second;
            first.next = second.next;
            second.next = first;
            prev = first;
        }
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
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy
        while prev.next and prev.next.next:
            first, second = prev.next, prev.next.next
            prev.next = second
            first.next = second.next
            second.next = first
            prev = first
        return dummy.next
```

```go [Go]
func swapPairs(head *ListNode) *ListNode {
    dummy := &ListNode{Next: head}
    prev := dummy
    for prev.Next != nil && prev.Next.Next != nil {
        first, second := prev.Next, prev.Next.Next
        prev.Next = second
        first.Next = second.Next
        second.Next = first
        prev = first
    }
    return dummy.Next
}
```

```c [C]
#include <stdlib.h>

struct ListNode* swapPairs(struct ListNode* head) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* prev = dummy;
    while (prev->next != NULL && prev->next->next != NULL) {
        struct ListNode* first = prev->next;
        struct ListNode* second = first->next;
        prev->next = second;
        first->next = second->next;
        second->next = first;
        prev = first;
    }
    struct ListNode* newHead = dummy->next;
    free(dummy);
    return newHead;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* prev = dummy;
        while (prev->next != nullptr && prev->next->next != nullptr) {
            ListNode* first = prev->next;
            ListNode* second = first->next;
            prev->next = second;
            first->next = second->next;
            second->next = first;
            prev = first;
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
 * @return {ListNode}
 */
var swapPairs = function (head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    while (prev.next !== null && prev.next.next !== null) {
        const first = prev.next;
        const second = prev.next.next;
        prev.next = second;
        first.next = second.next;
        second.next = first;
        prev = first;
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
function swapPairs(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev: ListNode = dummy;
    while (prev.next !== null && prev.next.next !== null) {
        const first = prev.next;
        const second = prev.next.next;
        prev.next = second;
        first.next = second.next;
        second.next = first;
        prev = first;
    }
    return dummy.next;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点访问一次。
- **空间复杂度**：`O(1)`，只使用常数个指针。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归 | `O(n)` | `O(n)` | 代码简洁，有递归开销 |
| 迭代（哑结点 + 三指针） | `O(n)` | `O(1)` | 空间紧凑，常为常数级 |

