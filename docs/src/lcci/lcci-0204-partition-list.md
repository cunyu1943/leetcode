# [面试题 02.04. 分割链表](https://leetcode.cn/problems/partition-list-lcci/)

## 一、题目描述

给你一个链表的头节点 `head` 和一个特定值 `x`，请你对链表进行分隔，使得所有 **小于** `x` 的节点都出现在 **大于或等于** `x` 的节点之前。

你应当 **保留** 两个分区中每个节点的原始相对顺序。

**示例：**

```
输入：head = 1->4->3->2->5->2, x = 3
输出：1->2->2->4->3->5
```

**提示：**

- 链表中节点数目在范围 `[0, 200]` 内
- `-100 <= Node.val <= 100`
- `-200 <= x <= 200`

---

## 二、解答方法

### 2.1 方法一：双链表（虚拟头节点）

**1. 思路**

创建两个虚拟头节点 `lessHead` 和 `greaterHead`，分别用于连接小于 `x` 和大于等于 `x` 的节点。遍历原链表，根据节点值与 `x` 的比较，将其连接到对应的链表中。遍历结束后，将 `less` 链表的尾节点指向 `greaterHead.next`，并将 `greater` 链表的尾节点置为 `null`。最后返回 `lessHead.next`。

此方法保持两个分区中节点的原始顺序，且只需一次遍历。

**2. 代码实现**

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
    public ListNode partition(ListNode head, int x) {
        ListNode lessHead = new ListNode(0);
        ListNode greaterHead = new ListNode(0);
        ListNode less = lessHead, greater = greaterHead;
        while (head != null) {
            if (head.val < x) {
                less.next = head;
                less = less.next;
            } else {
                greater.next = head;
                greater = greater.next;
            }
            head = head.next;
        }
        less.next = greaterHead.next;
        greater.next = null;
        return lessHead.next;
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
    def partition(self, head: ListNode, x: int) -> ListNode:
        less_head = ListNode(0)
        greater_head = ListNode(0)
        less = less_head
        greater = greater_head
        while head:
            if head.val < x:
                less.next = head
                less = less.next
            else:
                greater.next = head
                greater = greater.next
            head = head.next
        less.next = greater_head.next
        greater.next = None
        return less_head.next
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func partition(head *ListNode, x int) *ListNode {
    lessHead := &ListNode{}
    greaterHead := &ListNode{}
    less, greater := lessHead, greaterHead
    for head != nil {
        if head.Val < x {
            less.Next = head
            less = less.Next
        } else {
            greater.Next = head
            greater = greater.Next
        }
        head = head.Next
    }
    less.Next = greaterHead.Next
    greater.Next = nil
    return lessHead.Next
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
struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode lessHead, greaterHead;
    struct ListNode *less = &lessHead, *greater = &greaterHead;
    lessHead.next = NULL;
    greaterHead.next = NULL;
    while (head) {
        if (head->val < x) {
            less->next = head;
            less = less->next;
        } else {
            greater->next = head;
            greater = greater->next;
        }
        head = head->next;
    }
    less->next = greaterHead.next;
    greater->next = NULL;
    return lessHead.next;
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
    ListNode* partition(ListNode* head, int x) {
        ListNode* lessHead = new ListNode(0);
        ListNode* greaterHead = new ListNode(0);
        ListNode* less = lessHead;
        ListNode* greater = greaterHead;
        while (head) {
            if (head->val < x) {
                less->next = head;
                less = less->next;
            } else {
                greater->next = head;
                greater = greater->next;
            }
            head = head->next;
        }
        less->next = greaterHead->next;
        greater->next = nullptr;
        return lessHead->next;
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
var partition = function(head, x) {
    const lessHead = new ListNode(0);
    const greaterHead = new ListNode(0);
    let less = lessHead, greater = greaterHead;
    while (head) {
        if (head.val < x) {
            less.next = head;
            less = less.next;
        } else {
            greater.next = head;
            greater = greater.next;
        }
        head = head.next;
    }
    less.next = greaterHead.next;
    greater.next = null;
    return lessHead.next;
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
function partition(head: ListNode | null, x: number): ListNode | null {
    const lessHead = new ListNode(0);
    const greaterHead = new ListNode(0);
    let less = lessHead, greater = greaterHead;
    while (head) {
        if (head.val < x) {
            less.next = head;
            less = less.next;
        } else {
            greater.next = head;
            greater = greater.next;
        }
        head = head.next;
    }
    less.next = greaterHead.next;
    greater.next = null;
    return lessHead.next;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为链表节点数，只需一次遍历。
- **空间复杂度**：`O(1)`，只使用了常数个额外指针，没有新建节点。

---

### 2.2 方法二：使用辅助数组（临时存储）

**1. 思路**

将链表节点存储到数组中，按照值的大小分成两个列表，然后重新连接链表。此方法需要额外空间，但代码直观，且同样保持顺序。

1. 遍历链表，将节点引用存入数组。
2. 遍历数组，将值小于 `x` 的节点按顺序加入 `less` 列表，其余加入 `greater` 列表。
3. 将两个列表拼接，并设置尾节点的 `next` 为 `null`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode partition(ListNode head, int x) {
        if (head == null) return null;
        List<ListNode> list = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            list.add(cur);
            cur = cur.next;
        }
        List<ListNode> less = new ArrayList<>();
        List<ListNode> greater = new ArrayList<>();
        for (ListNode node : list) {
            if (node.val < x) less.add(node);
            else greater.add(node);
        }
        if (less.isEmpty()) return greater.isEmpty() ? null : greater.get(0);
        // 连接
        for (int i = 0; i < less.size() - 1; i++) {
            less.get(i).next = less.get(i+1);
        }
        if (!greater.isEmpty()) {
            less.get(less.size()-1).next = greater.get(0);
            for (int i = 0; i < greater.size() - 1; i++) {
                greater.get(i).next = greater.get(i+1);
            }
            greater.get(greater.size()-1).next = null;
        } else {
            less.get(less.size()-1).next = null;
        }
        return less.get(0);
    }
}
```

```python [Python]
class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        if not head:
            return None
        nodes = []
        cur = head
        while cur:
            nodes.append(cur)
            cur = cur.next
        less = [node for node in nodes if node.val < x]
        greater = [node for node in nodes if node.val >= x]
        if not less:
            return greater[0] if greater else None
        for i in range(len(less)-1):
            less[i].next = less[i+1]
        if greater:
            less[-1].next = greater[0]
            for i in range(len(greater)-1):
                greater[i].next = greater[i+1]
            greater[-1].next = None
        else:
            less[-1].next = None
        return less[0]
```

```go [Go]
func partition(head *ListNode, x int) *ListNode {
    if head == nil {
        return nil
    }
    var nodes []*ListNode
    cur := head
    for cur != nil {
        nodes = append(nodes, cur)
        cur = cur.Next
    }
    var less, greater []*ListNode
    for _, node := range nodes {
        if node.Val < x {
            less = append(less, node)
        } else {
            greater = append(greater, node)
        }
    }
    if len(less) == 0 {
        if len(greater) == 0 {
            return nil
        }
        return greater[0]
    }
    for i := 0; i < len(less)-1; i++ {
        less[i].Next = less[i+1]
    }
    if len(greater) > 0 {
        less[len(less)-1].Next = greater[0]
        for i := 0; i < len(greater)-1; i++ {
            greater[i].Next = greater[i+1]
        }
        greater[len(greater)-1].Next = nil
    } else {
        less[len(less)-1].Next = nil
    }
    return less[0]
}
```

```c [C]
#include <stdlib.h>
struct ListNode* partition(struct ListNode* head, int x) {
    if (!head) return NULL;
    // 先计算节点数
    int count = 0;
    struct ListNode* cur = head;
    while (cur) { count++; cur = cur->next; }
    struct ListNode** nodes = (struct ListNode**)malloc(count * sizeof(struct ListNode*));
    cur = head;
    for (int i = 0; i < count; i++) {
        nodes[i] = cur;
        cur = cur->next;
    }
    struct ListNode** less = (struct ListNode**)malloc(count * sizeof(struct ListNode*));
    struct ListNode** greater = (struct ListNode**)malloc(count * sizeof(struct ListNode*));
    int l = 0, g = 0;
    for (int i = 0; i < count; i++) {
        if (nodes[i]->val < x) less[l++] = nodes[i];
        else greater[g++] = nodes[i];
    }
    if (l == 0) {
        free(nodes); free(less); free(greater);
        return g ? greater[0] : NULL;
    }
    for (int i = 0; i < l-1; i++) less[i]->next = less[i+1];
    if (g > 0) {
        less[l-1]->next = greater[0];
        for (int i = 0; i < g-1; i++) greater[i]->next = greater[i+1];
        greater[g-1]->next = NULL;
    } else {
        less[l-1]->next = NULL;
    }
    struct ListNode* result = less[0];
    free(nodes); free(less); free(greater);
    return result;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        if (!head) return nullptr;
        vector<ListNode*> nodes;
        ListNode* cur = head;
        while (cur) {
            nodes.push_back(cur);
            cur = cur->next;
        }
        vector<ListNode*> less, greater;
        for (ListNode* node : nodes) {
            if (node->val < x) less.push_back(node);
            else greater.push_back(node);
        }
        if (less.empty()) return greater.empty() ? nullptr : greater[0];
        for (int i = 0; i < (int)less.size()-1; i++) {
            less[i]->next = less[i+1];
        }
        if (!greater.empty()) {
            less.back()->next = greater[0];
            for (int i = 0; i < (int)greater.size()-1; i++) {
                greater[i]->next = greater[i+1];
            }
            greater.back()->next = nullptr;
        } else {
            less.back()->next = nullptr;
        }
        return less[0];
    }
};
```

```javascript [JavaScript]
var partition = function(head, x) {
    if (!head) return null;
    const nodes = [];
    let cur = head;
    while (cur) {
        nodes.push(cur);
        cur = cur.next;
    }
    const less = [], greater = [];
    for (const node of nodes) {
        if (node.val < x) less.push(node);
        else greater.push(node);
    }
    if (less.length === 0) return greater.length ? greater[0] : null;
    for (let i = 0; i < less.length-1; i++) less[i].next = less[i+1];
    if (greater.length) {
        less[less.length-1].next = greater[0];
        for (let i = 0; i < greater.length-1; i++) greater[i].next = greater[i+1];
        greater[greater.length-1].next = null;
    } else {
        less[less.length-1].next = null;
    }
    return less[0];
};
```

```typescript [TypeScript]
function partition(head: ListNode | null, x: number): ListNode | null {
    if (!head) return null;
    const nodes: ListNode[] = [];
    let cur = head;
    while (cur) {
        nodes.push(cur);
        cur = cur.next;
    }
    const less: ListNode[] = [], greater: ListNode[] = [];
    for (const node of nodes) {
        if (node.val < x) less.push(node);
        else greater.push(node);
    }
    if (less.length === 0) return greater.length ? greater[0] : null;
    for (let i = 0; i < less.length-1; i++) less[i].next = less[i+1];
    if (greater.length) {
        less[less.length-1].next = greater[0];
        for (let i = 0; i < greater.length-1; i++) greater[i].next = greater[i+1];
        greater[greater.length-1].next = null;
    } else {
        less[less.length-1].next = null;
    }
    return less[0];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，两次遍历（一次收集节点，一次分类）。
- **空间复杂度**：`O(n)`，使用数组存储所有节点引用。

---

## 三、总结

| 方法                 | 时间复杂度 | 空间复杂度 | 特点                         |
| -------------------- | ---------- | ---------- | ---------------------------- |
| 双链表（虚拟头节点） | `O(n)`     | `O(1)`     | **推荐**，原地修改，空间最优 |
| 辅助数组             | `O(n)`     | `O(n)`     | 直观，但需额外空间           |

**推荐**：面试中优先使用 **方法一（双链表）**，时间复杂度 `O(n)`，空间复杂度 `O(1)`，且能保持节点原始顺序，是本题的标准解法。