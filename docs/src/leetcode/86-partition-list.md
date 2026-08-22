# [86. 分隔链表](https://leetcode.cn/problems/partition-list/)



## 一、题目描述

给你一个链表的头节点 `head` 和一个特定值 `x`，请你对链表进行分隔，使得所有 **小于** `x` 的节点都出现在 **大于或等于** `x` 的节点之前。

你应当 **保留** 两个分区中每个节点的初始相对位置。



**示例 1：**

```
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
```

**示例 2：**

```
输入：head = [2,1], x = 2
输出：[1,2]
```

**提示：**

-   链表中节点的数目在范围 `[0, 200]` 内
-   `-100 <= Node.val <= 100`
-   `-200 <= x <= 200`



## 二、解答方法

### 2.1 方法一：拆分两个子链表


1. **思路**

遍历原链表，将小于 `x` 的节点接到 `small` 链表尾，其余接到 `large` 链表尾，最后把 `small` 尾连到 `large` 头。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode small = new ListNode(0), large = new ListNode(0);
        ListNode s = small, l = large;
        while (head != null) {
            if (head.val < x) { s.next = head; s = s.next; }
            else { l.next = head; l = l.next; }
            head = head.next;
        }
        l.next = null;
        s.next = large.next;
        return small.next;
    }
}
```

```python [Python]
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        small = ListNode(0)
        large = ListNode(0)
        s, l = small, large
        while head:
            if head.val < x:
                s.next = head; s = s.next
            else:
                l.next = head; l = l.next
            head = head.next
        l.next = None
        s.next = large.next
        return small.next
```

```go [Go]
func partition(head *ListNode, x int) *ListNode {
    small := &ListNode{}
    large := &ListNode{}
    s, l := small, large
    for head != nil {
        if head.Val < x { s.Next = head; s = s.Next } else { l.Next = head; l = l.Next }
        head = head.Next
    }
    l.Next = nil
    s.Next = large.Next
    return small.Next
}
```

```c [C]
struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode* small = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* large = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* s = small, * l = large;
    while (head) {
        if (head->val < x) { s->next = head; s = s->next; }
        else { l->next = head; l = l->next; }
        head = head->next;
    }
    l->next = NULL;
    s->next = large->next;
    struct ListNode* res = small->next;
    free(small); free(large);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode* small = new ListNode(0);
        ListNode* large = new ListNode(0);
        ListNode* s = small, * l = large;
        while (head) {
            if (head->val < x) { s->next = head; s = s->next; }
            else { l->next = head; l = l->next; }
            head = head->next;
        }
        l->next = nullptr;
        s->next = large->next;
        return small->next;
    }
};
```

```javascript [JavaScript]
var partition = function(head, x) {
    const small = new ListNode(0), large = new ListNode(0);
    let s = small, l = large;
    while (head) {
        if (head.val < x) { s.next = head; s = s.next; }
        else { l.next = head; l = l.next; }
        head = head.next;
    }
    l.next = null;
    s.next = large.next;
    return small.next;
};
```

```typescript [TypeScript]
function partition(head: ListNode | null, x: number): ListNode | null {
    const small = new ListNode(0), large = new ListNode(0);
    let s = small, l = large;
    while (head) {
        if (head.val < x) { s.next = head; s = s.next; }
        else { l.next = head; l = l.next; }
        head = head.next;
    }
    l.next = null;
    s.next = large.next;
    return small.next;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，遍历一次。
- **空间复杂度**：`O(1)`，只重建指针（两个哨兵为常量）。

### 2.2 方法二：原地插入（单指针）


1. **思路**

用一个指针 `prev` 指向已分隔区（小于 x 部分）的末尾，遍历时在遇到小于 `x` 的节点时将其插入到 `prev` 之后。无额外链表但操作较绕。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy, cur = head;
        while (cur != null && cur.next != null) {
            if (cur.next.val < x) {
                ListNode node = cur.next;
                cur.next = node.next;
                node.next = prev.next;
                prev.next = node;
                prev = prev.next;
            } else {
                cur = cur.next;
            }
        }
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev, cur = dummy, head
        while cur and cur.next:
            if cur.next.val < x:
                node = cur.next
                cur.next = node.next
                node.next = prev.next
                prev.next = node
                prev = prev.next
            else:
                cur = cur.next
        return dummy.next
```

```go [Go]
func partition(head *ListNode, x int) *ListNode {
    dummy := &ListNode{Next: head}
    prev, cur := dummy, head
    for cur != nil && cur.Next != nil {
        if cur.Next.Val < x {
            node := cur.Next
            cur.Next = node.Next
            node.Next = prev.Next
            prev.Next = node
            prev = prev.Next
        } else {
            cur = cur.Next
        }
    }
    return dummy.Next
}
```

```c [C]
struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* prev = dummy;
    struct ListNode* cur = head;
    while (cur && cur->next) {
        if (cur->next->val < x) {
            struct ListNode* node = cur->next;
            cur->next = node->next;
            node->next = prev->next;
            prev->next = node;
            prev = prev->next;
        } else {
            cur = cur->next;
        }
    }
    struct ListNode* res = dummy->next;
    free(dummy);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy, * cur = head;
        while (cur && cur->next) {
            if (cur->next->val < x) {
                ListNode* node = cur->next;
                cur->next = node->next;
                node->next = prev->next;
                prev->next = node;
                prev = prev->next;
            } else {
                cur = cur->next;
            }
        }
        return dummy->next;
    }
};
```

```javascript [JavaScript]
var partition = function(head, x) {
    const dummy = new ListNode(0, head);
    let prev = dummy, cur = head;
    while (cur && cur.next) {
        if (cur.next.val < x) {
            const node = cur.next;
            cur.next = node.next;
            node.next = prev.next;
            prev.next = node;
            prev = prev.next;
        } else {
            cur = cur.next;
        }
    }
    return dummy.next;
};
```

```typescript [TypeScript]
function partition(head: ListNode | null, x: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let prev = dummy, cur = head;
    while (cur && cur.next) {
        if (cur.next.val < x) {
            const node = cur.next;
            cur.next = node.next;
            node.next = prev.next;
            prev.next = node;
            prev = prev.next;
        } else {
            cur = cur.next;
        }
    }
    return dummy.next;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，原地调整指针。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 拆分两个子链表 | `O(n)` | `O(1)` | 思路清晰，推荐 |
| 原地插入 | `O(n)` | `O(1)` | 无额外链表，操作较绕 |
