# [面试题 02.05. 链表求和](https://leetcode.cn/problems/sum-lists-lcci/)

## 一、题目描述

给定两个用链表表示的整数，每个节点包含一个数位。这些数位是反向存放的，也就是个位排在链表首部。编写函数对这两个整数求和，并用链表形式返回结果。

**示例：**

```
输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即 617 + 295
输出：2 -> 1 -> 9，即 912
```

**进阶：** 假设这些数位是正向存放的，请再做一遍。

**示例（正向）：**

```
输入：(6 -> 1 -> 7) + (2 -> 9 -> 5)，即 617 + 295
输出：9 -> 1 -> 2，即 912
```

**提示：**

- 链表长度在 `[0, 100]` 范围内
- 每个节点的值在 `[0, 9]` 范围内
- 题目数据保证结果链表不含前导零（除非结果为 0）

---

## 二、解答方法

### 2.1 方法一：模拟加法（反向存储）——（7种语言代码见上一轮回答，此处略）

### 2.2 方法二：递归（反向存储）——（7种语言代码见上一轮回答，此处略）

---

### 2.3 方法三：处理正向存储（先反转链表）

**1. 思路**

如果链表是正向存储（即高位在头节点），则不能直接相加。可以先将两个链表分别反转，变成反向存储，然后按照方法一的逐位加法计算，最后将结果链表再反转回去，恢复正向顺序。这样即可得到正向存储的结果。

- 反转链表函数 `reverse(head)` 返回新头节点。
- 主函数中先反转 `l1` 和 `l2`，调用加法函数，再反转结果。

**2. 代码实现**

以下为完整实现，包含反转辅助函数和主函数。

:::::: code-group

```java [Java]
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // 对于正向存储，先反转两个链表
        l1 = reverse(l1);
        l2 = reverse(l2);
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = x + y + carry;
            carry = sum / 10;
            cur.next = new ListNode(sum % 10);
            cur = cur.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        // 将结果反转回正向
        return reverse(dummy.next);
    }
    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode cur = head;
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
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        def reverse(head):
            prev = None
            cur = head
            while cur:
                nxt = cur.next
                cur.next = prev
                prev = cur
                cur = nxt
            return prev

        # 正向存储 -> 反转
        l1 = reverse(l1)
        l2 = reverse(l2)
        dummy = ListNode(0)
        cur = dummy
        carry = 0
        while l1 or l2 or carry:
            x = l1.val if l1 else 0
            y = l2.val if l2 else 0
            s = x + y + carry
            carry = s // 10
            cur.next = ListNode(s % 10)
            cur = cur.next
            if l1: l1 = l1.next
            if l2: l2 = l2.next
        # 结果反转回正向
        return reverse(dummy.next)
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    reverse := func(head *ListNode) *ListNode {
        var prev *ListNode
        cur := head
        for cur != nil {
            nxt := cur.Next
            cur.Next = prev
            prev = cur
            cur = nxt
        }
        return prev
    }
    l1 = reverse(l1)
    l2 = reverse(l2)
    dummy := &ListNode{}
    cur := dummy
    carry := 0
    for l1 != nil || l2 != nil || carry != 0 {
        x, y := 0, 0
        if l1 != nil {
            x = l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            y = l2.Val
            l2 = l2.Next
        }
        sum := x + y + carry
        carry = sum / 10
        cur.Next = &ListNode{Val: sum % 10}
        cur = cur.Next
    }
    return reverse(dummy.Next)
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
struct ListNode* reverse(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* cur = head;
    while (cur) {
        struct ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    l1 = reverse(l1);
    l2 = reverse(l2);
    struct ListNode dummy;
    dummy.next = NULL;
    struct ListNode* cur = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int x = l1 ? l1->val : 0;
        int y = l2 ? l2->val : 0;
        int sum = x + y + carry;
        carry = sum / 10;
        cur->next = (struct ListNode*)malloc(sizeof(struct ListNode));
        cur = cur->next;
        cur->val = sum % 10;
        cur->next = NULL;
        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }
    return reverse(dummy.next);
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        l1 = reverse(l1);
        l2 = reverse(l2);
        ListNode dummy(0);
        ListNode* cur = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int x = l1 ? l1->val : 0;
            int y = l2 ? l2->val : 0;
            int sum = x + y + carry;
            carry = sum / 10;
            cur->next = new ListNode(sum % 10);
            cur = cur->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
        }
        return reverse(dummy.next);
    }
private:
    ListNode* reverse(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while (cur) {
            ListNode* nxt = cur->next;
            cur->next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
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
var addTwoNumbers = function(l1, l2) {
    const reverse = (head) => {
        let prev = null;
        let cur = head;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    l1 = reverse(l1);
    l2 = reverse(l2);
    const dummy = new ListNode(0);
    let cur = dummy;
    let carry = 0;
    while (l1 || l2 || carry) {
        const x = l1 ? l1.val : 0;
        const y = l2 ? l2.val : 0;
        const sum = x + y + carry;
        carry = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return reverse(dummy.next);
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
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const reverse = (head: ListNode | null): ListNode | null => {
        let prev: ListNode | null = null;
        let cur = head;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    l1 = reverse(l1);
    l2 = reverse(l2);
    const dummy = new ListNode(0);
    let cur = dummy;
    let carry = 0;
    while (l1 || l2 || carry) {
        const x = l1 ? l1.val : 0;
        const y = l2 ? l2.val : 0;
        const sum = x + y + carry;
        carry = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return reverse(dummy.next);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m+n)`，反转两次和一次加法，均为线性。
- **空间复杂度**：`O(1)`（除结果链表外，只使用常数空间）。

---

## 三、总结

| 方法             | 时间复杂度    | 空间复杂度    | 适用场景               |
| ---------------- | ------------- | ------------- | ---------------------- |
| 模拟加法（反向） | `O(max(m,n))` | `O(max(m,n))` | 默认反向存储，推荐     |
| 递归（反向）     | `O(max(m,n))` | `O(max(m,n))` | 代码简洁，但递归栈开销 |
| 反转链表（正向） | `O(m+n)`      | `O(1)`        | 处理正向存储的进阶要求 |

**推荐**：对于默认反向存储，**方法一（模拟加法）** 是最直接高效的解法。若遇到正向存储，则使用 **方法三（先反转）**。现在所有方法均已提供完整的 7 种语言代码。