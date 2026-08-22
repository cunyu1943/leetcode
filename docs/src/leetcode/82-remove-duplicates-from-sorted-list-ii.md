# [82. 删除排序链表中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)



## 一、题目描述

给定一个已排序的链表的头 `head`，删除原始链表中所有重复数字的节点，只留下不同的数字。返回 **已排序的链表**。



**示例 1：**

```
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]
```

**示例 2：**

```
输入：head = [1,1,1,2,3]
输出：[2,3]
```

**提示：**

-   链表中节点数目在范围 `[0, 300]` 内
-   `-100 <= Node.val <= 100`
-   题目数据保证链表已按升序排列



## 二、解答方法

### 2.1 方法一：哨兵节点 + 双指针


1. **思路**

引入哨兵节点简化头节点可能被删除的情况。用 `prev` 指向上一段已确认不重复的末尾，`cur` 探测重复，遇重复则跳过整段。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            if (prev.next.val == prev.next.next.val) {
                int dup = prev.next.val;
                while (prev.next != null && prev.next.val == dup) prev.next = prev.next.next;
            } else {
                prev = prev.next;
            }
        }
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev = dummy
        while prev.next and prev.next.next:
            if prev.next.val == prev.next.next.val:
                dup = prev.next.val
                while prev.next and prev.next.val == dup:
                    prev.next = prev.next.next
            else:
                prev = prev.next
        return dummy.next
```

```go [Go]
func deleteDuplicates(head *ListNode) *ListNode {
    dummy := &ListNode{Next: head}
    prev := dummy
    for prev.Next != nil && prev.Next.Next != nil {
        if prev.Next.Val == prev.Next.Next.Val {
            dup := prev.Next.Val
            for prev.Next != nil && prev.Next.Val == dup { prev.Next = prev.Next.Next }
        } else {
            prev = prev.Next
        }
    }
    return dummy.Next
}
```

```c [C]
struct ListNode* deleteDuplicates(struct ListNode* head) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* prev = dummy;
    while (prev->next && prev->next->next) {
        if (prev->next->val == prev->next->next->val) {
            int dup = prev->next->val;
            while (prev->next && prev->next->val == dup) prev->next = prev->next->next;
        } else {
            prev = prev->next;
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
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        while (prev->next && prev->next->next) {
            if (prev->next->val == prev->next->next->val) {
                int dup = prev->next->val;
                while (prev->next && prev->next->val == dup) prev->next = prev->next->next;
            } else {
                prev = prev->next;
            }
        }
        return dummy->next;
    }
};
```

```javascript [JavaScript]
var deleteDuplicates = function(head) {
    const dummy = new ListNode(0, head);
    let prev = dummy;
    while (prev.next && prev.next.next) {
        if (prev.next.val === prev.next.next.val) {
            const dup = prev.next.val;
            while (prev.next && prev.next.val === dup) prev.next = prev.next.next;
        } else {
            prev = prev.next;
        }
    }
    return dummy.next;
};
```

```typescript [TypeScript]
function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummy: ListNode = new ListNode(0, head);
    let prev = dummy;
    while (prev.next && prev.next.next) {
        if (prev.next.val === prev.next.next.val) {
            const dup = prev.next.val;
            while (prev.next && prev.next.val === dup) prev.next = prev.next.next;
        } else {
            prev = prev.next;
        }
    }
    return dummy.next;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个节点最多访问两次。
- **空间复杂度**：`O(1)`，只用指针（哨兵为常量）。

### 2.2 方法二：递归


1. **思路**

递归处理 `head.next` 得到去重后的子链表，再判断当前 `head` 是否与子链表头重复，决定是否保留。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode next = deleteDuplicates(head.next);
        if (next != null && head.val == next.val) return next.next;
        head.next = next;
        return head;
    }
}
```

```python [Python]
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        nxt = self.deleteDuplicates(head.next)
        if nxt and head.val == nxt.val:
            return nxt.next
        head.next = nxt
        return head
```

```go [Go]
func deleteDuplicates(head *ListNode) *ListNode {
    if head == nil || head.Next == nil { return head }
    nxt := deleteDuplicates(head.Next)
    if nxt != nil && head.Val == nxt.Val { return nxt.Next }
    head.Next = nxt
    return head
}
```

```c [C]
struct ListNode* deleteDuplicates(struct ListNode* head) {
    if (!head || !head->next) return head;
    struct ListNode* nxt = deleteDuplicates(head->next);
    if (nxt && head->val == nxt->val) return nxt->next;
    head->next = nxt;
    return head;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* nxt = deleteDuplicates(head->next);
        if (nxt && head->val == nxt->val) return nxt->next;
        head->next = nxt;
        return head;
    }
};
```

```javascript [JavaScript]
var deleteDuplicates = function(head) {
    if (!head || !head.next) return head;
    const nxt = deleteDuplicates(head.next);
    if (nxt && head.val === nxt.val) return nxt.next;
    head.next = nxt;
    return head;
};
```

```typescript [TypeScript]
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    const nxt = deleteDuplicates(head.next);
    if (nxt && head.val === nxt.val) return nxt.next;
    head.next = nxt;
    return head;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，递归遍历一次。
- **空间复杂度**：`O(n)`，递归栈深度。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哨兵节点 + 双指针 | `O(n)` | `O(1)` | 迭代，空间最优，推荐 |
| 递归 | `O(n)` | `O(n)` | 思路优雅，耗栈空间 |
