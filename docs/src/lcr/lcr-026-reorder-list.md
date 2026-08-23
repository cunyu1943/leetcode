# [LCR 026. 重排链表](https://leetcode.cn/problems/LGjMqU/)



## 一、题目描述

给定一个单链表 `L` 的头节点 `head` ，单链表 `L` 表示为：

```
L0 → L1 → … → Ln-1 → Ln
```

请将其重新排列后变为：

```
L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …
```

不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。



**示例 1：**

```
输入: head = [1,2,3,4]
输出: [1,4,2,3]
```

**示例 2：**

```
输入: head = [1,2,3,4,5]
输出: [1,5,2,4,3]
```

**提示：**

- 链表的长度范围为 `[1, 5 * 10⁴]`
- `0 <= node.val <= 1000`



## 二、解答方法

### 2.1 方法一：三步走（快慢指针 + 反转 + 合并）

1. **思路**

把链表拆成两半，反转后半段，再交叉合并：

1. **找中点**：快慢指针，`slow` 每次走一步、`fast` 走两步，`slow` 即前半段尾（偶数长度时取前一半末尾）；
2. **反转后半段**：把 `slow.next` 到末尾反转；
3. **交叉合并**：依次从两段各取一个节点交替连接。

时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        // 1. 找中点
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 2. 反转后半段
        ListNode l2 = reverse(slow.next);
        slow.next = null;
        // 3. 交叉合并
        ListNode l1 = head;
        while (l2 != null) {
            ListNode t1 = l1.next, t2 = l2.next;
            l1.next = l2;
            l2.next = t1;
            l1 = t1;
            l2 = t2;
        }
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
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next:
            return
        # 1. 找中点
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        # 2. 反转后半段
        def reverse(h):
            prev, cur = None, h
            while cur:
                nxt = cur.next
                cur.next = prev
                prev = cur
                cur = nxt
            return prev
        l2 = reverse(slow.next)
        slow.next = None
        # 3. 交叉合并
        l1 = head
        while l2:
            t1, t2 = l1.next, l2.next
            l1.next = l2
            l2.next = t1
            l1 = t1
            l2 = t2
```

```cpp [C++]
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        // 1. 找中点
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        // 2. 反转后半段
        ListNode* l2 = reverseList(slow->next);
        slow->next = nullptr;
        // 3. 交叉合并
        ListNode* l1 = head;
        while (l2) {
            ListNode* t1 = l1->next;
            ListNode* t2 = l2->next;
            l1->next = l2;
            l2->next = t1;
            l1 = t1;
            l2 = t2;
        }
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
func reorderList(head *ListNode) {
    if head == nil || head.Next == nil {
        return
    }
    // 1. 找中点
    slow, fast := head, head
    for fast.Next != nil && fast.Next.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    // 2. 反转后半段
    l2 := reverse(slow.Next)
    slow.Next = nil
    // 3. 交叉合并
    l1 := head
    for l2 != nil {
        t1, t2 := l1.Next, l2.Next
        l1.Next = l2
        l2.Next = t1
        l1 = t1
        l2 = t2
    }
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
 * @param {ListNode} head
 * @return {void}
 */
var reorderList = function (head) {
    if (!head || !head.next) return;
    // 1. 找中点
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 2. 反转后半段
    const reverse = (h) => {
        let prev = null, cur = h;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    let l2 = reverse(slow.next);
    slow.next = null;
    // 3. 交叉合并
    let l1 = head;
    while (l2) {
        const t1 = l1.next, t2 = l2.next;
        l1.next = l2;
        l2.next = t1;
        l1 = t1;
        l2 = t2;
    }
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

void reorderList(struct ListNode* head) {
    if (!head || !head->next) return;
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    struct ListNode* l2 = reverse(slow->next);
    slow->next = NULL;
    struct ListNode* l1 = head;
    while (l2) {
        struct ListNode* t1 = l1->next;
        struct ListNode* t2 = l2->next;
        l1->next = l2;
        l2->next = t1;
        l1 = t1;
        l2 = t2;
    }
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

function reorderList(head: ListNode | null): void {
    if (!head || !head.next) return;
    let slow: ListNode | null = head, fast: ListNode | null = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    const reverse = (h: ListNode | null): ListNode | null => {
        let prev: ListNode | null = null;
        let cur = h;
        while (cur) {
            const nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    };
    let l2 = reverse(slow.next);
    slow.next = null;
    let l1: ListNode | null = head;
    while (l2) {
        const t1 = l1!.next, t2 = l2.next;
        l1!.next = l2;
        l2.next = t1;
        l1 = t1;
        l2 = t2;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：线性表辅助

1. **思路**

把链表节点依次存入线性表（如数组/列表），利用下标重排：下标 `0, n-1, 1, n-2, ...` 交替取节点并串联成新链表。实现直观，但需要 `O(n)` 额外空间。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void reorderList(ListNode head) {
        List<ListNode> list = new ArrayList<>();
        for (ListNode p = head; p != null; p = p.next) list.add(p);
        int i = 0, j = list.size() - 1;
        while (i < j) {
            list.get(i).next = list.get(j);
            i++;
            if (i == j) break;
            list.get(j).next = list.get(i);
            j--;
        }
        list.get(j).next = null;
    }
}
```

```python [Python]
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        nodes = []
        p = head
        while p:
            nodes.append(p)
            p = p.next
        i, j = 0, len(nodes) - 1
        while i < j:
            nodes[i].next = nodes[j]
            i += 1
            if i == j:
                break
            nodes[j].next = nodes[i]
            j -= 1
        nodes[j].next = None
```

```cpp [C++]
class Solution {
public:
    void reorderList(ListNode* head) {
        vector<ListNode*> nodes;
        for (ListNode* p = head; p; p = p->next) nodes.push_back(p);
        int i = 0, j = nodes.size() - 1;
        while (i < j) {
            nodes[i]->next = nodes[j];
            i++;
            if (i == j) break;
            nodes[j]->next = nodes[i];
            j--;
        }
        nodes[j]->next = nullptr;
    }
};
```

```go [Go]
func reorderList(head *ListNode) {
    var nodes []*ListNode
    for p := head; p != nil; p = p.Next {
        nodes = append(nodes, p)
    }
    i, j := 0, len(nodes)-1
    for i < j {
        nodes[i].Next = nodes[j]
        i++
        if i == j {
            break
        }
        nodes[j].Next = nodes[i]
        j--
    }
    nodes[j].Next = nil
}
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {void}
 */
var reorderList = function (head) {
    const nodes = [];
    for (let p = head; p; p = p.next) nodes.push(p);
    let i = 0, j = nodes.length - 1;
    while (i < j) {
        nodes[i].next = nodes[j];
        i++;
        if (i === j) break;
        nodes[j].next = nodes[i];
        j--;
    }
    nodes[j].next = null;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

void reorderList(struct ListNode* head) {
    if (!head) return;
    struct ListNode* nodes[50000];
    int cnt = 0;
    for (struct ListNode* p = head; p; p = p->next) nodes[cnt++] = p;
    int i = 0, j = cnt - 1;
    while (i < j) {
        nodes[i]->next = nodes[j];
        i++;
        if (i == j) break;
        nodes[j]->next = nodes[i];
        j--;
    }
    nodes[j]->next = NULL;
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

function reorderList(head: ListNode | null): void {
    const nodes: ListNode[] = [];
    for (let p = head; p; p = p.next) nodes.push(p);
    let i = 0, j = nodes.length - 1;
    while (i < j) {
        nodes[i].next = nodes[j];
        i++;
        if (i === j) break;
        nodes[j].next = nodes[i];
        j--;
    }
    nodes[j].next = null;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，线性表。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 找中点 + 反转 + 合并 | `O(n)` | `O(1)` | 最优，综合考察链表基本功 |
| 线性表辅助 | `O(n)` | `O(n)` | 实现简单，易理解 |

本题把「快慢指针找中点」「反转链表」「链表合并」三个基础操作串起来，是链表综合题的代表。

