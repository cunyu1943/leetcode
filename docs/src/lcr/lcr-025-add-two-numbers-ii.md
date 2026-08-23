# [LCR 025. 两数相加 II](https://leetcode.cn/problems/lMSNwu/)



## 一、题目描述

给定两个 **非空** 链表 `l1` 和 `l2` 来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

可以假设除了数字 `0` 之外，这两个数字都不会以零开头。

**进阶：** 如果输入链表不能修改（如不能对节点进行翻转），如何处理？



**示例 1：**

```
输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
解释：7 2 4 3 + 5 6 4 = 7 8 0 7
```

**示例 2：**

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
```

**示例 3：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**提示：**

- 链表的长度范围为 `[1, 100]`
- `0 <= node.val <= 9`
- 输入数据保证链表代表的数字无前导 0



## 二、解答方法

### 2.1 方法一：反转链表后逐位相加

1. **思路**

由于最高位在链表头部，与「低位相加进位」的自然顺序相反。先把两条链表反转，从低位开始逐位相加并处理进位，得到结果链表后再反转回来。

- 反转 `l1`、`l2`；
- 用哨兵头 `dummy` 边加边建链，`carry` 记录进位；
- 结束后把结果反转返回。

时间 `O(m+n)`，空间 `O(1)`（不计输出）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        l1 = reverse(l1);
        l2 = reverse(l2);
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            cur.next = new ListNode(sum % 10);
            carry = sum / 10;
            cur = cur.next;
        }
        return reverse(dummy.next);
    }
    private ListNode reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
}
```

```python [Python]
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def reverse(head):
            prev, cur = None, head
            while cur:
                nxt = cur.next
                cur.next = prev
                prev = cur
                cur = nxt
            return prev

        l1, l2 = reverse(l1), reverse(l2)
        dummy = ListNode(0)
        cur, carry = dummy, 0
        while l1 or l2 or carry:
            s = carry
            if l1:
                s += l1.val
                l1 = l1.next
            if l2:
                s += l2.val
                l2 = l2.next
            cur.next = ListNode(s % 10)
            carry = s // 10
            cur = cur.next
        return reverse(dummy.next)
```

```cpp [C++]
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        l1 = reverseList(l1);
        l2 = reverseList(l2);
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }
            cur->next = new ListNode(sum % 10);
            carry = sum / 10;
            cur = cur->next;
        }
        return reverseList(dummy->next);
    }
private:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        while (head) {
            ListNode* nxt = head->next;
            head->next = prev;
            prev = head;
            head = nxt;
        }
        return prev;
    }
};
```

```go [Go]
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    l1 = reverse(l1)
    l2 = reverse(l2)
    dummy := &ListNode{}
    cur := dummy
    carry := 0
    for l1 != nil || l2 != nil || carry != 0 {
        sum := carry
        if l1 != nil {
            sum += l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            sum += l2.Val
            l2 = l2.Next
        }
        cur.Next = &ListNode{Val: sum % 10}
        carry = sum / 10
        cur = cur.Next
    }
    return reverse(dummy.Next)
}

func reverse(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        nxt := head.Next
        head.Next = prev
        prev = head
        head = nxt
    }
    return prev
}
```

```js [JavaScript]
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const reverse = (head) => {
        let prev = null, cur = head;
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
    let cur = dummy, carry = 0;
    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) { sum += l1.val; l1 = l1.next; }
        if (l2) { sum += l2.val; l2 = l2.next; }
        cur.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        cur = cur.next;
    }
    return reverse(dummy.next);
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

static struct ListNode* reverse(struct ListNode* head) {
    struct ListNode* prev = NULL;
    while (head) {
        struct ListNode* nxt = head->next;
        head->next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    l1 = reverse(l1);
    l2 = reverse(l2);
    struct ListNode* dummy = (struct ListNode*)calloc(1, sizeof(struct ListNode));
    struct ListNode* cur = dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        cur->next = (struct ListNode*)calloc(1, sizeof(struct ListNode));
        cur->next->val = sum % 10;
        carry = sum / 10;
        cur = cur->next;
    }
    struct ListNode* res = reverse(dummy->next);
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
    let cur: ListNode = dummy;
    let carry = 0;
    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) { sum += l1.val; l1 = l1.next; }
        if (l2) { sum += l2.val; l2 = l2.next; }
        cur.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        cur = cur.next;
    }
    return reverse(dummy.next);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(1)`（不计输出链表，反转在链表上原地进行）。

### 2.2 方法二：栈辅助（不修改原链表）

1. **思路**

如果要求不能修改原链表（进阶要求），可以把两条链表的节点值分别压入两个栈，从栈顶（低位）开始逐位相加并处理进位，用头插法构造结果链表。这样无需反转原链表。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Deque<Integer> s1 = new ArrayDeque<>();
        Deque<Integer> s2 = new ArrayDeque<>();
        while (l1 != null) { s1.push(l1.val); l1 = l1.next; }
        while (l2 != null) { s2.push(l2.val); l2 = l2.next; }
        ListNode head = null;
        int carry = 0;
        while (!s1.isEmpty() || !s2.isEmpty() || carry != 0) {
            int sum = carry;
            if (!s1.isEmpty()) sum += s1.pop();
            if (!s2.isEmpty()) sum += s2.pop();
            ListNode node = new ListNode(sum % 10);
            node.next = head;
            head = node;
            carry = sum / 10;
        }
        return head;
    }
}
```

```python [Python]
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        s1, s2 = [], []
        while l1:
            s1.append(l1.val)
            l1 = l1.next
        while l2:
            s2.append(l2.val)
            l2 = l2.next
        head = None
        carry = 0
        while s1 or s2 or carry:
            s = carry
            if s1:
                s += s1.pop()
            if s2:
                s += s2.pop()
            node = ListNode(s % 10)
            node.next = head
            head = node
            carry = s // 10
        return head
```

```cpp [C++]
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        stack<int> s1, s2;
        while (l1) { s1.push(l1->val); l1 = l1->next; }
        while (l2) { s2.push(l2->val); l2 = l2->next; }
        ListNode* head = nullptr;
        int carry = 0;
        while (!s1.empty() || !s2.empty() || carry) {
            int sum = carry;
            if (!s1.empty()) { sum += s1.top(); s1.pop(); }
            if (!s2.empty()) { sum += s2.top(); s2.pop(); }
            ListNode* node = new ListNode(sum % 10);
            node->next = head;
            head = node;
            carry = sum / 10;
        }
        return head;
    }
};
```

```go [Go]
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    var s1, s2 []int
    for l1 != nil {
        s1 = append(s1, l1.Val)
        l1 = l1.Next
    }
    for l2 != nil {
        s2 = append(s2, l2.Val)
        l2 = l2.Next
    }
    var head *ListNode
    carry := 0
    for len(s1) > 0 || len(s2) > 0 || carry != 0 {
        sum := carry
        if len(s1) > 0 {
            sum += s1[len(s1)-1]
            s1 = s1[:len(s1)-1]
        }
        if len(s2) > 0 {
            sum += s2[len(s2)-1]
            s2 = s2[:len(s2)-1]
        }
        node := &ListNode{Val: sum % 10}
        node.Next = head
        head = node
        carry = sum / 10
    }
    return head
}
```

```js [JavaScript]
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const s1 = [], s2 = [];
    while (l1) { s1.push(l1.val); l1 = l1.next; }
    while (l2) { s2.push(l2.val); l2 = l2.next; }
    let head = null, carry = 0;
    while (s1.length || s2.length || carry) {
        let sum = carry;
        if (s1.length) sum += s1.pop();
        if (s2.length) sum += s2.pop();
        const node = new ListNode(sum % 10);
        node.next = head;
        head = node;
        carry = Math.floor(sum / 10);
    }
    return head;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    int s1[100], s2[100], t1 = 0, t2 = 0;
    while (l1) { s1[t1++] = l1->val; l1 = l1->next; }
    while (l2) { s2[t2++] = l2->val; l2 = l2->next; }
    struct ListNode* head = NULL;
    int carry = 0;
    while (t1 > 0 || t2 > 0 || carry) {
        int sum = carry;
        if (t1 > 0) sum += s1[--t1];
        if (t2 > 0) sum += s2[--t2];
        struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
        node->val = sum % 10;
        node->next = head;
        head = node;
        carry = sum / 10;
    }
    return head;
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const s1: number[] = [], s2: number[] = [];
    while (l1) { s1.push(l1.val); l1 = l1.next; }
    while (l2) { s2.push(l2.val); l2 = l2.next; }
    let head: ListNode | null = null;
    let carry = 0;
    while (s1.length || s2.length || carry) {
        let sum = carry;
        if (s1.length) sum += s1.pop()!;
        if (s2.length) sum += s2.pop()!;
        const node = new ListNode(sum % 10);
        node.next = head;
        head = node;
        carry = Math.floor(sum / 10);
    }
    return head;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(m + n)`，两个栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 反转链表 | `O(m+n)` | `O(1)` | 空间最优 |
| 栈辅助 | `O(m+n)` | `O(m+n)` | 不修改原链表，满足进阶要求 |

「两数相加」系列的通用套路是：低位对齐 + 进位。本题因高位在前，要么反转链表，要么用栈实现「后进先出」天然对齐低位。

