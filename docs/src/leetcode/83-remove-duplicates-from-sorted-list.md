# [83. 删除排序链表中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)



## 一、题目描述

给定一个已排序的链表的头 `head`，删除所有重复的元素，使每个元素只出现一次。返回 **已排序的链表**。



**示例 1：**

```
输入：head = [1,1,2]
输出：[1,2]
```

**示例 2：**

```
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

**提示：**

-   链表中节点数目在范围 `[0, 300]` 内
-   `-100 <= Node.val <= 100`
-   题目数据保证链表已按升序排列



## 二、解答方法

### 2.1 方法一：单指针遍历


1. **思路**

指针 `cur` 从头遍历，若 `cur.next` 与 `cur` 值相同则跳过 `cur.next`，否则前移。空间 `O(1)`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.val == cur.next.val) cur.next = cur.next.next;
            else cur = cur.next;
        }
        return head;
    }
}
```

```python [Python]
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        cur = head
        while cur and cur.next:
            if cur.val == cur.next.val:
                cur.next = cur.next.next
            else:
                cur = cur.next
        return head
```

```go [Go]
func deleteDuplicates(head *ListNode) *ListNode {
    cur := head
    for cur != nil && cur.Next != nil {
        if cur.Val == cur.Next.Val { cur.Next = cur.Next.Next } else { cur = cur.Next }
    }
    return head
}
```

```c [C]
struct ListNode* deleteDuplicates(struct ListNode* head) {
    struct ListNode* cur = head;
    while (cur && cur->next) {
        if (cur->val == cur->next->val) cur->next = cur->next->next;
        else cur = cur->next;
    }
    return head;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* cur = head;
        while (cur && cur->next) {
            if (cur->val == cur->next->val) cur->next = cur->next->next;
            else cur = cur->next;
        }
        return head;
    }
};
```

```javascript [JavaScript]
var deleteDuplicates = function(head) {
    let cur = head;
    while (cur && cur.next) {
        if (cur.val === cur.next.val) cur.next = cur.next.next;
        else cur = cur.next;
    }
    return head;
};
```

```typescript [TypeScript]
function deleteDuplicates(head: ListNode | null): ListNode | null {
    let cur = head;
    while (cur && cur.next) {
        if (cur.val === cur.next.val) cur.next = cur.next.next;
        else cur = cur.next;
    }
    return head;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，遍历一次。
- **空间复杂度**：`O(1)`，只用指针。

### 2.2 方法二：递归


1. **思路**

若当前头与子链表头值相同则跳过当前，否则保留并递归处理后续。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) return head;
        if (head.val == head.next.val) return deleteDuplicates(head.next);
        head.next = deleteDuplicates(head.next);
        return head;
    }
}
```

```python [Python]
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        if head.val == head.next.val:
            return self.deleteDuplicates(head.next)
        head.next = self.deleteDuplicates(head.next)
        return head
```

```go [Go]
func deleteDuplicates(head *ListNode) *ListNode {
    if head == nil || head.Next == nil { return head }
    if head.Val == head.Next.Val { return deleteDuplicates(head.Next) }
    head.Next = deleteDuplicates(head.Next)
    return head
}
```

```c [C]
struct ListNode* deleteDuplicates(struct ListNode* head) {
    if (!head || !head->next) return head;
    if (head->val == head->next->val) return deleteDuplicates(head->next);
    head->next = deleteDuplicates(head->next);
    return head;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if (!head || !head->next) return head;
        if (head->val == head->next->val) return deleteDuplicates(head->next);
        head->next = deleteDuplicates(head->next);
        return head;
    }
};
```

```javascript [JavaScript]
var deleteDuplicates = function(head) {
    if (!head || !head.next) return head;
    if (head.val === head.next.val) return deleteDuplicates(head.next);
    head.next = deleteDuplicates(head.next);
    return head;
};
```

```typescript [TypeScript]
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    if (head.val === head.next.val) return deleteDuplicates(head.next);
    head.next = deleteDuplicates(head.next);
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
| 单指针遍历 | `O(n)` | `O(1)` | 迭代，空间最优，推荐 |
| 递归 | `O(n)` | `O(n)` | 代码简洁，耗栈空间 |
