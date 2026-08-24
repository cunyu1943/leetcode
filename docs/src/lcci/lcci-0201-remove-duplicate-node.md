# [面试题 02.01. 移除重复节点](https://leetcode.cn/problems/remove-duplicate-node-lcci/)

## 一、题目描述

编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

**示例 1：**

```
输入：[1, 2, 3, 3, 2, 1]
输出：[1, 2, 3]
```

**示例 2：**

```
输入：[1, 1, 1, 1, 2]
输出：[1, 2]
```

**提示：**

- 链表长度在 `[0, 20000]` 范围内。
- 链表元素在 `[0, 20000]` 范围内。

**进阶：** 如果不得使用临时缓冲区，该怎么解决？

---

## 二、解答方法

### 2.1 方法一：哈希表（使用额外空间）

**1. 思路**

遍历链表，使用哈希表（Set）记录已经出现过的节点值。对于当前节点 `cur`，若其值已在 Set 中，则将其从链表中移除；否则将其值加入 Set 并继续遍历。此方法需要 `O(n)` 的额外空间，但时间复杂度为 `O(n)`。

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
    public ListNode removeDuplicateNodes(ListNode head) {
        if (head == null) return null;
        Set<Integer> seen = new HashSet<>();
        ListNode cur = head;
        seen.add(cur.val);
        while (cur.next != null) {
            if (seen.contains(cur.next.val)) {
                cur.next = cur.next.next;
            } else {
                seen.add(cur.next.val);
                cur = cur.next;
            }
        }
        return head;
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
    def removeDuplicateNodes(self, head: ListNode) -> ListNode:
        if not head:
            return None
        seen = {head.val}
        cur = head
        while cur.next:
            if cur.next.val in seen:
                cur.next = cur.next.next
            else:
                seen.add(cur.next.val)
                cur = cur.next
        return head
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeDuplicateNodes(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }
    seen := make(map[int]bool)
    seen[head.Val] = true
    cur := head
    for cur.Next != nil {
        if seen[cur.Next.Val] {
            cur.Next = cur.Next.Next
        } else {
            seen[cur.Next.Val] = true
            cur = cur.Next
        }
    }
    return head
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
struct ListNode* removeDuplicateNodes(struct ListNode* head) {
    if (head == NULL) return NULL;
    bool seen[20001] = {false};
    seen[head->val] = true;
    struct ListNode* cur = head;
    while (cur->next) {
        if (seen[cur->next->val]) {
            cur->next = cur->next->next;
        } else {
            seen[cur->next->val] = true;
            cur = cur->next;
        }
    }
    return head;
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
    ListNode* removeDuplicateNodes(ListNode* head) {
        if (!head) return nullptr;
        unordered_set<int> seen;
        seen.insert(head->val);
        ListNode* cur = head;
        while (cur->next) {
            if (seen.count(cur->next->val)) {
                cur->next = cur->next->next;
            } else {
                seen.insert(cur->next->val);
                cur = cur->next;
            }
        }
        return head;
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
var removeDuplicateNodes = function(head) {
    if (!head) return null;
    const seen = new Set();
    seen.add(head.val);
    let cur = head;
    while (cur.next) {
        if (seen.has(cur.next.val)) {
            cur.next = cur.next.next;
        } else {
            seen.add(cur.next.val);
            cur = cur.next;
        }
    }
    return head;
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
function removeDuplicateNodes(head: ListNode | null): ListNode | null {
    if (!head) return null;
    const seen = new Set<number>();
    seen.add(head.val);
    let cur = head;
    while (cur.next) {
        if (seen.has(cur.next.val)) {
            cur.next = cur.next.next;
        } else {
            seen.add(cur.next.val);
            cur = cur.next;
        }
    }
    return head;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为链表节点数，只需遍历一次。
- **空间复杂度**：`O(n)`，哈希表存储最多 `n` 个不同值。

---

### 2.2 方法二：双指针（不使用额外空间）

**1. 思路**

如果不允许使用额外空间，可以采用双重循环。对于每个节点 `cur`，使用另一个指针 `runner` 从 `cur` 的下一个节点开始，向后遍历并删除所有与 `cur` 值相同的节点。时间复杂度 `O(n²)`，空间复杂度 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public ListNode removeDuplicateNodes(ListNode head) {
        ListNode cur = head;
        while (cur != null) {
            ListNode runner = cur;
            while (runner.next != null) {
                if (runner.next.val == cur.val) {
                    runner.next = runner.next.next;
                } else {
                    runner = runner.next;
                }
            }
            cur = cur.next;
        }
        return head;
    }
}
```

```python [Python]
class Solution:
    def removeDuplicateNodes(self, head: ListNode) -> ListNode:
        cur = head
        while cur:
            runner = cur
            while runner.next:
                if runner.next.val == cur.val:
                    runner.next = runner.next.next
                else:
                    runner = runner.next
            cur = cur.next
        return head
```

```go [Go]
func removeDuplicateNodes(head *ListNode) *ListNode {
    cur := head
    for cur != nil {
        runner := cur
        for runner.Next != nil {
            if runner.Next.Val == cur.Val {
                runner.Next = runner.Next.Next
            } else {
                runner = runner.Next
            }
        }
        cur = cur.Next
    }
    return head
}
```

```c [C]
struct ListNode* removeDuplicateNodes(struct ListNode* head) {
    struct ListNode* cur = head;
    while (cur) {
        struct ListNode* runner = cur;
        while (runner->next) {
            if (runner->next->val == cur->val) {
                runner->next = runner->next->next;
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
    return head;
}
```

```cpp [C++]
class Solution {
public:
    ListNode* removeDuplicateNodes(ListNode* head) {
        ListNode* cur = head;
        while (cur) {
            ListNode* runner = cur;
            while (runner->next) {
                if (runner->next->val == cur->val) {
                    runner->next = runner->next->next;
                } else {
                    runner = runner->next;
                }
            }
            cur = cur->next;
        }
        return head;
    }
};
```

```javascript [JavaScript]
var removeDuplicateNodes = function(head) {
    let cur = head;
    while (cur) {
        let runner = cur;
        while (runner.next) {
            if (runner.next.val === cur.val) {
                runner.next = runner.next.next;
            } else {
                runner = runner.next;
            }
        }
        cur = cur.next;
    }
    return head;
};
```

```typescript [TypeScript]
function removeDuplicateNodes(head: ListNode | null): ListNode | null {
    let cur = head;
    while (cur) {
        let runner: ListNode | null = cur;
        while (runner.next) {
            if (runner.next.val === cur.val) {
                runner.next = runner.next.next;
            } else {
                runner = runner.next;
            }
        }
        cur = cur.next;
    }
    return head;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`，最坏情况下每个节点都要扫描其后所有节点。
- **空间复杂度**：`O(1)`，只使用常数级指针变量。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                 |
| -------------- | ---------- | ---------- | -------------------- |
| 哈希表（Set）  | `O(n)`     | `O(n)`     | 快速，但需要额外空间 |
| 双指针（暴力） | `O(n²)`    | `O(1)`     | 空间最优，但速度较慢 |

**推荐**：在面试中，如果允许使用额外空间，优先选择 **方法一（哈希表）**，时间效率高，代码简洁。若要求空间复杂度为 `O(1)`，则使用 **方法二（双指针）**，但需注意 `n` 较大时可能超时。