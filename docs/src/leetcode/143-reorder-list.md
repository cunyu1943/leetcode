# [143. 重排链表](https://leetcode.cn/problems/reorder-list/)



## 一、题目描述

给定一个单链表 `L` 的头节点 `head` ，单链表 `L` 表示为：

```
L0 → L1 → … → Ln - 1 → Ln
```

请将其重新排列后变为：

```
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

不能只是单纯地改变节点内部的值，而是需要实际进行节点交换。



**示例 1：**

```
输入：head = [1,2,3,4]
输出：[1,4,2,3]
```

**示例 2：**

```
输入：head = [1,2,3,4,5]
输出：[1,5,2,4,3]
```

**提示：**

-   链表的长度范围为 `[1, 5 * 10⁴]`
-   `1 <= Node.val <= 1000`



## 二、解答方法

### 2.1 方法一：线性表（数组）

1. **思路**

将链表节点依次存入数组，利用数组下标从两端向中间交替取节点重新连接。

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
    public void reorderList(ListNode head) {
        if (head == null) return;
        List<ListNode> list = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            list.add(cur);
            cur = cur.next;
        }
        int i = 0, j = list.size() - 1;
        while (i < j) {
            list.get(i).next = list.get(j);
            i++;
            if (i == j) break;
            list.get(j).next = list.get(i);
            j--;
        }
        list.get(i).next = null;
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
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head:
            return
        nodes = []
        cur = head
        while cur:
            nodes.append(cur)
            cur = cur.next
        i, j = 0, len(nodes) - 1
        while i < j:
            nodes[i].next = nodes[j]
            i += 1
            if i == j:
                break
            nodes[j].next = nodes[i]
            j -= 1
        nodes[i].next = None
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reorderList(head *ListNode)  {
    if head == nil {
        return
    }
    var nodes []*ListNode
    for cur := head; cur != nil; cur = cur.Next {
        nodes = append(nodes, cur)
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
    nodes[i].Next = nil
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
    void reorderList(ListNode* head) {
        if (!head) return;
        vector<ListNode*> nodes;
        for (ListNode* cur = head; cur; cur = cur->next) {
            nodes.push_back(cur);
        }
        int i = 0, j = (int)nodes.size() - 1;
        while (i < j) {
            nodes[i]->next = nodes[j];
            i++;
            if (i == j) break;
            nodes[j]->next = nodes[i];
            j--;
        }
        nodes[i]->next = nullptr;
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    if (!head) return;
    const nodes = [];
    for (let cur = head; cur; cur = cur.next) nodes.push(cur);
    let i = 0, j = nodes.length - 1;
    while (i < j) {
        nodes[i].next = nodes[j];
        i++;
        if (i === j) break;
        nodes[j].next = nodes[i];
        j--;
    }
    nodes[i].next = null;
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
    if (!head) return;
    const nodes: ListNode[] = [];
    for (let cur = head; cur; cur = cur.next) nodes.push(cur);
    let i = 0, j = nodes.length - 1;
    while (i < j) {
        nodes[i].next = nodes[j];
        i++;
        if (i === j) break;
        nodes[j].next = nodes[i];
        j--;
    }
    nodes[i].next = null;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：快慢指针 + 反转 + 合并

1. **思路**

1. 找到中点（慢指针）；2. 将后半段反转；3. 将前半段与反转后的后半段交替合并。无需额外数组。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = reverse(slow.next);
        slow.next = null;
        ListNode first = head;
        while (second != null) {
            ListNode t1 = first.next, t2 = second.next;
            first.next = second;
            second.next = t1;
            first = t1;
            second = t2;
        }
    }

    private ListNode reverse(ListNode node) {
        ListNode prev = null;
        while (node != null) {
            ListNode next = node.next;
            node.next = prev;
            prev = node;
            node = next;
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

        def reverse(node):
            prev = None
            while node:
                nxt = node.next
                node.next = prev
                prev = node
                node = nxt
            return prev

        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        second = reverse(slow.next)
        slow.next = None
        first = head
        while second:
            t1, t2 = first.next, second.next
            first.next = second
            second.next = t1
            first, second = t1, t2
```

```go [Go]
func reorderList(head *ListNode) {
    if head == nil || head.Next == nil {
        return
    }
    reverse := func(node *ListNode) *ListNode {
        var prev *ListNode
        for node != nil {
            nxt := node.Next
            node.Next = prev
            prev = node
            node = nxt
        }
        return prev
    }
    slow, fast := head, head
    for fast.Next != nil && fast.Next.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    second := reverse(slow.Next)
    slow.Next = nil
    first := head
    for second != nil {
        t1, t2 := first.Next, second.Next
        first.Next = second
        second.Next = t1
        first, second = t1, t2
    }
}
```

```cpp [C++]
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        auto reverse = [](ListNode* node) -> ListNode* {
            ListNode* prev = nullptr;
            while (node) {
                ListNode* nxt = node->next;
                node->next = prev;
                prev = node;
                node = nxt;
            }
            return prev;
        };
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* second = reverse(slow->next);
        slow->next = nullptr;
        ListNode* first = head;
        while (second) {
            ListNode* t1 = first->next;
            ListNode* t2 = second->next;
            first->next = second;
            second->next = t1;
            first = t1;
            second = t2;
        }
    }
};
```

```js [JavaScript]
/**
 * @param {ListNode} head
 * @return {void}
 */
var reorderList = function (head) {
    if (!head || !head.next) return;
    const reverse = (node) => {
        let prev = null;
        while (node) {
            const nxt = node.next;
            node.next = prev;
            prev = node;
            node = nxt;
        }
        return prev;
    };
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let second = reverse(slow.next);
    slow.next = null;
    let first = head;
    while (second) {
        const t1 = first.next, t2 = second.next;
        first.next = second;
        second.next = t1;
        first = t1;
        second = t2;
    }
};
```

```ts [TypeScript]
/**
 * @param {ListNode} head
 * @return {void}
 */
function reorderList(head: ListNode | null): void {
    if (!head || !head.next) return;
    const reverse = (node: ListNode | null): ListNode | null => {
        let prev: ListNode | null = null;
        while (node) {
            const nxt = node.next;
            node.next = prev;
            prev = node;
            node = nxt;
        }
        return prev;
    };
    let slow: ListNode | null = head, fast: ListNode | null = head;
    while (fast!.next && fast!.next.next) {
        slow = slow!.next;
        fast = fast!.next.next;
    }
    let second = reverse(slow!.next);
    slow!.next = null;
    let first: ListNode | null = head;
    while (second) {
        const t1 = first!.next;
        const t2 = second.next;
        first!.next = second;
        second.next = t1;
        first = t1;
        second = t2;
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 线性表 | `O(n)` | `O(n)` | 实现简单 |
| 快慢指针 + 反转 | `O(n)` | `O(1)` | 原地操作，推荐 |

方法二避免了额外数组，是面试中的最优解。
