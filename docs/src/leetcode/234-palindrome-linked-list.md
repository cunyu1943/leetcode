# [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)



## 一、题目描述

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

**示例 1：**

```
输入：head = [1,2,2,1]
输出：true
```

**示例 2：**

```
输入：head = [1,2]
输出：false
```

**提示：**

-   链表中节点数目在范围 `[1, 10⁵]` 内
-   `0 <= Node.val <= 9`

**进阶：** 你能否用 `O(n)` 时间复杂度和 `O(1)` 空间复杂度解决此题？



## 二、解答方法

### 2.1 方法一：快慢指针找中点 + 反转后半段（O(1) 空间）

1. **思路**

1. 用 **快慢指针** 找到链表中点（慢指针走 1 步，快指针走 2 步）；
2. **反转后半段** 链表；
3. 逐一比较前半段与反转后的后半段的值；
4. （可选）恢复链表。

细节：快指针初始为 `head`，循环 `while (fast != null && fast.next != null)`。结束时若 `fast != null` 说明链表长度为奇数，慢指针需再走一步（跳过正中间节点）。

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
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        // 1. 快慢指针找中点
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        if (fast != null) {          // 奇数长度，跳过中间节点
            slow = slow.next;
        }
        // 2. 反转后半段
        ListNode secondHalf = reverse(slow);
        // 3. 比较
        ListNode p1 = head, p2 = secondHalf;
        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
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
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True
        # 1. 快慢指针找中点
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        if fast:                    # 奇数长度
            slow = slow.next
        # 2. 反转后半段
        prev = None
        cur = slow
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        # 3. 比较
        p1, p2 = head, prev
        while p2:
            if p1.val != p2.val:
                return False
            p1 = p1.next
            p2 = p2.next
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
func isPalindrome(head *ListNode) bool {
    if head == nil || head.Next == nil {
        return true
    }
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    if fast != nil { // 奇数长度
        slow = slow.Next
    }
    // 反转后半段
    var prev *ListNode
    cur := slow
    for cur != nil {
        next := cur.Next
        cur.Next = prev
        prev = cur
        cur = next
    }
    // 比较
    p1, p2 := head, prev
    for p2 != nil {
        if p1.Val != p2.Val {
            return false
        }
        p1 = p1.Next
        p2 = p2.Next
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
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        if (fast) slow = slow->next;      // 奇数长度
        ListNode* secondHalf = reverse(slow);
        ListNode *p1 = head, *p2 = secondHalf;
        while (p2) {
            if (p1->val != p2->val) return false;
            p1 = p1->next;
            p2 = p2->next;
        }
        return true;
    }
private:
    ListNode* reverse(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while (cur) {
            ListNode* next = cur->next;
            cur->next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    if (!head || !head.next) return true;
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    if (fast) slow = slow.next;         // 奇数长度
    // 反转后半段
    let prev = null, cur = slow;
    while (cur) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    // 比较
    let p1 = head, p2 = prev;
    while (p2) {
        if (p1.val !== p2.val) return false;
        p1 = p1.next;
        p2 = p2.next;
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
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
/**
 * @param {ListNode | null} head
 * @return {boolean}
 */
function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    let slow: ListNode | null = head, fast: ListNode | null = head;
    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }
    if (fast) slow = slow.next;         // 奇数长度
    // 反转后半段
    let prev: ListNode | null = null, cur = slow;
    while (cur) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    // 比较
    let p1: ListNode | null = head, p2 = prev;
    while (p2) {
        if (p1!.val !== p2.val) return false;
        p1 = p1!.next;
        p2 = p2.next;
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（原地反转，满足进阶要求）。

### 2.2 方法二：数组 + 双指针

1. **思路**

把链表值全部存入数组，再用双指针从头尾向中间比较。实现最简单，但需要 `O(n)` 额外空间。

2. **代码实现（Python）**

```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        vals = []
        cur = head
        while cur:
            vals.append(cur.val)
            cur = cur.next
        return vals == vals[::-1]
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 快慢指针 + 反转后半段 | `O(1)` | 满足进阶，推荐 |
| 数组 + 双指针 | `O(n)` | 代码最短 |
| 递归（后序比较） | `O(n)` | 利用递归栈逆序访问 |

三个关键子技巧的组合：
1. **快慢指针找中点**（876 题）；
2. **反转链表**（206 题）；
3. 奇数长度时用 `fast != null` 判断并跳过正中间节点。

注意：比较时以 **后半段 `p2` 为循环终止条件**（`while p2`），因为后半段长度 ≤ 前半段。
