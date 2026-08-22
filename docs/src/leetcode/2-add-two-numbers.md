# [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)



## 一、题目描述

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。



**示例 1：**

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807 。
```

**示例 2：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**示例 3：**

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

**提示：**

-   每个链表中的节点数在范围 `[1, 100]` 内；
-   `0 <= Node.val <= 9`；
-   题目数据保证列表表示的数字不含前导零。



## 二、解答方法

### 2.1 方法一：模拟加法（迭代）

1. **思路**

由于两个链表都是逆序存储，最低位在表头，因此可以直接从表头开始同步遍历两个链表，模拟「小学列竖式」的加法过程：

-   用一个变量 `carry` 记录进位，初始为 `0`；
-   每次取两个链表当前节点的值（若某一链表已遍历完，则记为 `0`）；
-   计算 `sum = val1 + val2 + carry`，当前位为 `sum % 10`，新进位为 `sum / 10`；
-   把当前位挂到结果链表的末尾；
-   两个链表都遍历完且 `carry == 0` 时结束。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int v1 = l1 != null ? l1.val : 0;
            int v2 = l2 != null ? l2.val : 0;
            int sum = v1 + v2 + carry;
            carry = sum / 10;
            cur.next = new ListNode(sum % 10);
            cur = cur.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
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
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        cur = dummy
        carry = 0
        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            s = v1 + v2 + carry
            carry = s // 10
            cur.next = ListNode(s % 10)
            cur = cur.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
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
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    cur := dummy
    carry := 0
    for l1 != nil || l2 != nil || carry != 0 {
        v1, v2 := 0, 0
        if l1 != nil {
            v1 = l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            v2 = l2.Val
            l2 = l2.Next
        }
        sum := v1 + v2 + carry
        carry = sum / 10
        cur.Next = &ListNode{Val: sum % 10}
        cur = cur.Next
    }
    return dummy.Next
}
```

```c [C]
#include <stdlib.h>

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->val = 0;
    dummy->next = NULL;
    struct ListNode* cur = dummy;
    int carry = 0;
    while (l1 != NULL || l2 != NULL || carry != 0) {
        int v1 = l1 ? l1->val : 0;
        int v2 = l2 ? l2->val : 0;
        int sum = v1 + v2 + carry;
        carry = sum / 10;
        cur->next = (struct ListNode*)malloc(sizeof(struct ListNode));
        cur->next->val = sum % 10;
        cur->next->next = NULL;
        cur = cur->next;
        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }
    struct ListNode* head = dummy->next;
    free(dummy);
    return head;
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int v1 = l1 ? l1->val : 0;
            int v2 = l2 ? l2->val : 0;
            int sum = v1 + v2 + carry;
            carry = sum / 10;
            cur->next = new ListNode(sum % 10);
            cur = cur->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const dummy = new ListNode(0);
    let cur = dummy;
    let carry = 0;
    while (l1 !== null || l2 !== null || carry !== 0) {
        const v1 = l1 !== null ? l1.val : 0;
        const v2 = l2 !== null ? l2.val : 0;
        const sum = v1 + v2 + carry;
        carry = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
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
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let cur: ListNode | null = dummy;
    let carry = 0;
    while (l1 !== null || l2 !== null || carry !== 0) {
        const v1 = l1 !== null ? l1.val : 0;
        const v2 = l2 !== null ? l2.val : 0;
        const sum = v1 + v2 + carry;
        carry = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    return dummy.next;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(max(m, n))`**，其中 `m`、`n` 分别是两个链表的长度，只需遍历较长的链表一次。
- **空间复杂度**：`O(max(m, n))`**，结果链表的长度最多为 `max(m, n) + 1`（最高位可能产生进位）。

### 2.2 方法二：递归解法

1. **思路**

加法本质是「当前位相加 + 进位传递给下一位」。我们可以用递归来表达：每次处理两个链表的当前节点，算出当前位与新进位后，递归地去处理 `l1.next` 与 `l2.next`，并把进位作为参数向下传递。

-   递归函数接收 `l1`、`l2` 和来自上一位的进位 `carry`；
-   若三者都为空（链表到头且进位为 0），返回 `null`；
-   否则计算当前位并创建节点，其 `next` 指向下一次递归的结果。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return dfs(l1, l2, 0);
    }

    private ListNode dfs(ListNode l1, ListNode l2, int carry) {
        if (l1 == null && l2 == null && carry == 0) return null;
        int v1 = l1 != null ? l1.val : 0;
        int v2 = l2 != null ? l2.val : 0;
        int sum = v1 + v2 + carry;
        ListNode node = new ListNode(sum % 10);
        node.next = dfs(l1 != null ? l1.next : null,
                        l2 != null ? l2.next : null,
                        sum / 10);
        return node;
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
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def dfs(l1, l2, carry):
            if not l1 and not l2 and not carry:
                return None
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            s = v1 + v2 + carry
            node = ListNode(s % 10)
            node.next = dfs(l1.next if l1 else None,
                            l2.next if l2 else None,
                            s // 10)
            return node
        return dfs(l1, l2, 0)
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func dfs(l1 *ListNode, l2 *ListNode, carry int) *ListNode {
    if l1 == nil && l2 == nil && carry == 0 {
        return nil
    }
    v1, v2 := 0, 0
    if l1 != nil {
        v1 = l1.Val
    }
    if l2 != nil {
        v2 = l2.Val
    }
    sum := v1 + v2 + carry
    node := &ListNode{Val: sum % 10}
    var next1, next2 *ListNode
    if l1 != nil {
        next1 = l1.Next
    }
    if l2 != nil {
        next2 = l2.Next
    }
    node.Next = dfs(next1, next2, sum/10)
    return node
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    return dfs(l1, l2, 0)
}
```

```c [C]
#include <stdlib.h>

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* dfs(struct ListNode* l1, struct ListNode* l2, int carry) {
    if (l1 == NULL && l2 == NULL && carry == 0) return NULL;
    int v1 = l1 ? l1->val : 0;
    int v2 = l2 ? l2->val : 0;
    int sum = v1 + v2 + carry;
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = sum % 10;
    struct ListNode* n1 = l1 ? l1->next : NULL;
    struct ListNode* n2 = l2 ? l2->next : NULL;
    node->next = dfs(n1, n2, sum / 10);
    return node;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    return dfs(l1, l2, 0);
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        return dfs(l1, l2, 0);
    }

private:
    ListNode* dfs(ListNode* l1, ListNode* l2, int carry) {
        if (l1 == nullptr && l2 == nullptr && carry == 0) return nullptr;
        int v1 = l1 ? l1->val : 0;
        int v2 = l2 ? l2->val : 0;
        int sum = v1 + v2 + carry;
        ListNode* node = new ListNode(sum % 10);
        node->next = dfs(l1 ? l1->next : nullptr,
                         l2 ? l2->next : nullptr,
                         sum / 10);
        return node;
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    function dfs(l1, l2, carry) {
        if (l1 === null && l2 === null && carry === 0) return null;
        const v1 = l1 !== null ? l1.val : 0;
        const v2 = l2 !== null ? l2.val : 0;
        const sum = v1 + v2 + carry;
        const node = new ListNode(sum % 10);
        node.next = dfs(l1 !== null ? l1.next : null,
                        l2 !== null ? l2.next : null,
                        Math.floor(sum / 10));
        return node;
    }
    return dfs(l1, l2, 0);
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
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    function dfs(l1: ListNode | null, l2: ListNode | null, carry: number): ListNode | null {
        if (l1 === null && l2 === null && carry === 0) return null;
        const v1 = l1 !== null ? l1.val : 0;
        const v2 = l2 !== null ? l2.val : 0;
        const sum = v1 + v2 + carry;
        const node = new ListNode(sum % 10);
        node.next = dfs(l1 !== null ? l1.next : null,
                        l2 !== null ? l2.next : null,
                        Math.floor(sum / 10));
        return node;
    }
    return dfs(l1, l2, 0);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(max(m, n))`，递归深度等于较长链表的长度。
- **空间复杂度**：`O(max(m, n))`，递归调用栈的深度最多为 `max(m, n) + 1`；结果链表本身也占用 `O(max(m, n))` 空间。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 模拟加法（迭代） | `O(max(m, n))` | `O(max(m, n))` | 无递归栈，空间更优 |
| 递归解法 | `O(max(m, n))` | `O(max(m, n))` | 代码简洁，有递归开销 |

