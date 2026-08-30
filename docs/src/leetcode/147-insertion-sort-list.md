# [147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list/)



## 一、题目描述

给定单个链表的头 `head` ，使用 **插入排序** 对链表进行排序，并返回 *排序后链表的头*。

插入排序算法的步骤：

1. 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
2. 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
3. 重复直到所有输入数据插入完为止。

下面是插入排序算法的一个图形示例。部分排序的列表（黑色）最初只包含列表中的第一个元素。每次迭代时，从输入数据中删除一个元素（红色），并就地插入已排序的列表中。

对链表进行插入排序。



**示例 1：**

```
输入: head = [4,2,1,3]
输出: [1,2,3,4]
```

**示例 2：**

```
输入: head = [-1,5,3,4,0]
输出: [-1,0,3,4,5]
```

**提示：**

-   列表中的节点数在 `[1, 5000]` 范围内
-   `-5000 <= Node.val <= 5000`



## 二、解答方法

### 2.1 方法一：插入排序

1. **思路**

维护一个已排序部分（初始为第一个节点），从原链表第二个节点起逐个取出，在已排序部分中找到合适位置插入。为方便在头部插入，引入哨兵节点 `dummy`。

2. **代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode insertionSortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode lastSorted = head, cur = head.next;
        while (cur != null) {
            if (lastSorted.val <= cur.val) {
                lastSorted = lastSorted.next;
            } else {
                ListNode prev = dummy;
                while (prev.next.val <= cur.val) {
                    prev = prev.next;
                }
                lastSorted.next = cur.next;
                cur.next = prev.next;
                prev.next = cur;
            }
            cur = lastSorted.next;
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
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        dummy = ListNode(0)
        dummy.next = head
        last_sorted = head
        cur = head.next
        while cur:
            if last_sorted.val <= cur.val:
                last_sorted = last_sorted.next
            else:
                prev = dummy
                while prev.next.val <= cur.val:
                    prev = prev.next
                last_sorted.next = cur.next
                cur.next = prev.next
                prev.next = cur
            cur = last_sorted.next
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
func insertionSortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    dummy := &ListNode{Next: head}
    lastSorted := head
    cur := head.Next
    for cur != nil {
        if lastSorted.Val <= cur.Val {
            lastSorted = lastSorted.Next
        } else {
            prev := dummy
            for prev.Next.Val <= cur.Val {
                prev = prev.Next
            }
            lastSorted.Next = cur.Next
            cur.Next = prev.Next
            prev.Next = cur
        }
        cur = lastSorted.Next
    }
    return dummy.Next
}
```

```cpp [C++]
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* lastSorted = head;
        ListNode* cur = head->next;
        while (cur) {
            if (lastSorted->val <= cur->val) {
                lastSorted = lastSorted->next;
            } else {
                ListNode* prev = dummy;
                while (prev->next->val <= cur->val) {
                    prev = prev->next;
                }
                lastSorted->next = cur->next;
                cur->next = prev->next;
                prev->next = cur;
            }
            cur = lastSorted->next;
        }
        return dummy->next;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
    if (!head || !head.next) return head;
    const dummy = new ListNode(0);
    dummy.next = head;
    let lastSorted = head, cur = head.next;
    while (cur) {
        if (lastSorted.val <= cur.val) {
            lastSorted = lastSorted.next;
        } else {
            let prev = dummy;
            while (prev.next.val <= cur.val) {
                prev = prev.next;
            }
            lastSorted.next = cur.next;
            cur.next = prev.next;
            prev.next = cur;
        }
        cur = lastSorted.next;
    }
    return dummy.next;
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
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function insertionSortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    const dummy = new ListNode(0);
    dummy.next = head;
    let lastSorted: ListNode | null = head;
    let cur: ListNode | null = head.next;
    while (cur) {
        if (lastSorted!.val <= cur.val) {
            lastSorted = lastSorted!.next;
        } else {
            let prev = dummy;
            while (prev.next!.val <= cur.val) {
                prev = prev.next!;
            }
            lastSorted!.next = cur.next;
            cur.next = prev.next;
            prev.next = cur;
        }
        cur = lastSorted!.next;
    }
    return dummy.next;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，最坏情况下每次都要遍历已排序部分。
- **空间复杂度**：`O(1)`。

## 三、总结

链表插入排序与数组版本思路一致，但无需移动元素，只需调整指针。引入 `dummy` 哨兵可统一头部插入逻辑。注意题目有进阶要求 `O(n log n)`，可用 148 题的归并排序实现。
