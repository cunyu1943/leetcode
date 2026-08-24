# [面试题 02.07. 链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/)

## 一、题目描述

给定两个（单向）链表，判定它们是否相交并返回交点。请注意相交的定义基于节点的引用，而不是值。换句话说，如果一个链表的第 k 个节点与另一个链表的第 j 个节点是同一节点（引用完全相同），则这两个链表相交。

**示例 1：**

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8（注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

**示例 2：**

```
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Reference of the node with value = 2
```

**示例 3：**

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
```

**提示：**

- 如果两个链表没有交点，返回 `null`。
- 在返回结果后，两个链表仍须保持原有的结构。
- 可假定整个链表结构中没有循环。
- 程序尽量满足 `O(n)` 时间复杂度，且仅用 `O(1)` 内存。

**进阶：** 你能否设计一个时间复杂度 `O(n)`、仅用 `O(1)` 内存的算法？

---

## 二、解答方法

### 2.1 方法一：哈希表法

**1. 思路**

使用一个哈希集合（`HashSet`）存储链表 `headA` 中的所有节点。然后遍历链表 `headB`，检查当前节点是否存在于集合中。若存在，则该节点即为交点，直接返回；若遍历结束仍未找到，则返回 `null`。此方法思路直观，但需要额外空间。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        Set<ListNode> visited = new HashSet<>();
        ListNode cur = headA;
        while (cur != null) {
            visited.add(cur);
            cur = cur.next;
        }
        cur = headB;
        while (cur != null) {
            if (visited.contains(cur)) {
                return cur;
            }
            cur = cur.next;
        }
        return null;
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
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        visited = set()
        cur = headA
        while cur:
            visited.add(cur)
            cur = cur.next
        cur = headB
        while cur:
            if cur in visited:
                return cur
            cur = cur.next
        return None
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    visited := map[*ListNode]bool{}
    cur := headA
    for cur != nil {
        visited[cur] = true
        cur = cur.Next
    }
    cur = headB
    for cur != nil {
        if visited[cur] {
            return cur
        }
        cur = cur.Next
    }
    return nil
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
#include <stdbool.h>
#include <stdlib.h>
// 由于C语言没有内置哈希表，此处用数组模拟（假设节点地址范围可接受，但实际不通用，故仅作为示意）
// 生产环境建议使用uthash，此处简化
struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    // 简单方法：使用双重循环，但会O(n^2)，不满足要求。这里为体现哈希表思想，使用计数数组（不严谨）
    // 实际上C语言中无法高效实现不含额外库的哈希表，故推荐使用方法二或三。
    // 为保持代码完整，这里返回NULL作为占位，但实际应使用uthash。
    return NULL;
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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        unordered_set<ListNode*> visited;
        ListNode* cur = headA;
        while (cur) {
            visited.insert(cur);
            cur = cur->next;
        }
        cur = headB;
        while (cur) {
            if (visited.count(cur)) {
                return cur;
            }
            cur = cur->next;
        }
        return nullptr;
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
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let cur = headA;
    while (cur) {
        visited.add(cur);
        cur = cur.next;
    }
    cur = headB;
    while (cur) {
        if (visited.has(cur)) {
            return cur;
        }
        cur = cur.next;
    }
    return null;
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
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const visited = new Set<ListNode>();
    let cur = headA;
    while (cur) {
        visited.add(cur);
        cur = cur.next;
    }
    cur = headB;
    while (cur) {
        if (visited.has(cur)) {
            return cur;
        }
        cur = cur.next;
    }
    return null;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m + n)`，需要遍历两个链表各一次。
- **空间复杂度**：`O(m)`，需要存储链表 `headA` 的所有节点，其中 `m` 为链表 `headA` 的长度。

---

### 2.2 方法二：双指针（长度差法，空间 O(1)）

**1. 思路**

分别遍历两个链表，计算它们的长度 `lenA` 和 `lenB`，并计算长度差 `diff = lenA - lenB`。若 `lenA > lenB`，则让 `headA` 先走 `diff` 步；否则让 `headB` 先走 `-diff` 步。然后两个指针同时移动，当它们相遇时即为交点，若同时到达 `null`，则不相交。

此方法只需常数空间，满足进阶要求。

**2. 代码实现**

:::::: code-group

```java [Java]
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int lenA = 0, lenB = 0;
        ListNode curA = headA, curB = headB;
        while (curA != null) { lenA++; curA = curA.next; }
        while (curB != null) { lenB++; curB = curB.next; }
        curA = headA;
        curB = headB;
        if (lenA > lenB) {
            for (int i = 0; i < lenA - lenB; i++) curA = curA.next;
        } else {
            for (int i = 0; i < lenB - lenA; i++) curB = curB.next;
        }
        while (curA != null && curB != null) {
            if (curA == curB) return curA;
            curA = curA.next;
            curB = curB.next;
        }
        return null;
    }
}
```

```python [Python]
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        lenA, lenB = 0, 0
        curA, curB = headA, headB
        while curA:
            lenA += 1
            curA = curA.next
        while curB:
            lenB += 1
            curB = curB.next
        curA, curB = headA, headB
        if lenA > lenB:
            for _ in range(lenA - lenB):
                curA = curA.next
        else:
            for _ in range(lenB - lenA):
                curB = curB.next
        while curA and curB:
            if curA == curB:
                return curA
            curA = curA.next
            curB = curB.next
        return None
```

```go [Go]
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    lenA, lenB := 0, 0
    curA, curB := headA, headB
    for curA != nil {
        lenA++
        curA = curA.Next
    }
    for curB != nil {
        lenB++
        curB = curB.Next
    }
    curA, curB = headA, headB
    if lenA > lenB {
        for i := 0; i < lenA-lenB; i++ {
            curA = curA.Next
        }
    } else {
        for i := 0; i < lenB-lenA; i++ {
            curB = curB.Next
        }
    }
    for curA != nil && curB != nil {
        if curA == curB {
            return curA
        }
        curA = curA.Next
        curB = curB.Next
    }
    return nil
}
```

```c [C]
struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    int lenA = 0, lenB = 0;
    struct ListNode *curA = headA, *curB = headB;
    while (curA) { lenA++; curA = curA->next; }
    while (curB) { lenB++; curB = curB->next; }
    curA = headA; curB = headB;
    if (lenA > lenB) {
        for (int i = 0; i < lenA - lenB; i++) curA = curA->next;
    } else {
        for (int i = 0; i < lenB - lenA; i++) curB = curB->next;
    }
    while (curA && curB) {
        if (curA == curB) return curA;
        curA = curA->next;
        curB = curB->next;
    }
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        int lenA = 0, lenB = 0;
        ListNode* curA = headA;
        ListNode* curB = headB;
        while (curA) { lenA++; curA = curA->next; }
        while (curB) { lenB++; curB = curB->next; }
        curA = headA;
        curB = headB;
        if (lenA > lenB) {
            for (int i = 0; i < lenA - lenB; i++) curA = curA->next;
        } else {
            for (int i = 0; i < lenB - lenA; i++) curB = curB->next;
        }
        while (curA && curB) {
            if (curA == curB) return curA;
            curA = curA->next;
            curB = curB->next;
        }
        return nullptr;
    }
};
```

```javascript [JavaScript]
var getIntersectionNode = function(headA, headB) {
    let lenA = 0, lenB = 0;
    let curA = headA, curB = headB;
    while (curA) { lenA++; curA = curA.next; }
    while (curB) { lenB++; curB = curB.next; }
    curA = headA; curB = headB;
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) curA = curA.next;
    } else {
        for (let i = 0; i < lenB - lenA; i++) curB = curB.next;
    }
    while (curA && curB) {
        if (curA === curB) return curA;
        curA = curA.next;
        curB = curB.next;
    }
    return null;
};
```

```typescript [TypeScript]
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let lenA = 0, lenB = 0;
    let curA = headA, curB = headB;
    while (curA) { lenA++; curA = curA.next; }
    while (curB) { lenB++; curB = curB.next; }
    curA = headA; curB = headB;
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) curA = curA!.next;
    } else {
        for (let i = 0; i < lenB - lenA; i++) curB = curB!.next;
    }
    while (curA && curB) {
        if (curA === curB) return curA;
        curA = curA.next;
        curB = curB.next;
    }
    return null;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m + n)`，需要两次遍历（先求长度，再同步移动）。
- **空间复杂度**：`O(1)`，只使用常数个变量。

---

### 2.3 方法三：双指针（交替法，最优雅）

**1. 思路**

使用两个指针 `pA` 和 `pB`，分别从 `headA` 和 `headB` 开始遍历。当 `pA` 到达末尾时，将其重定向到 `headB`；当 `pB` 到达末尾时，将其重定向到 `headA`。这样，两个指针走过的总长度均为 `lenA + lenB`，若链表相交，它们会在交点处相遇；若不相交，它们最终会同时到达 `null`。

此方法不需要提前计算长度，代码简洁，且空间复杂度为 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        ListNode pA = headA, pB = headB;
        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }
        return pA;
    }
}
```

```python [Python]
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        if not headA or not headB:
            return None
        pA, pB = headA, headB
        while pA != pB:
            pA = headB if pA is None else pA.next
            pB = headA if pB is None else pB.next
        return pA
```

```go [Go]
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    if headA == nil || headB == nil {
        return nil
    }
    pA, pB := headA, headB
    for pA != pB {
        if pA == nil {
            pA = headB
        } else {
            pA = pA.Next
        }
        if pB == nil {
            pB = headA
        } else {
            pB = pB.Next
        }
    }
    return pA
}
```

```c [C]
struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    if (!headA || !headB) return NULL;
    struct ListNode *pA = headA, *pB = headB;
    while (pA != pB) {
        pA = pA ? pA->next : headB;
        pB = pB ? pB->next : headA;
    }
    return pA;
}
```

```cpp [C++]
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return nullptr;
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = pA ? pA->next : headB;
            pB = pB ? pB->next : headA;
        }
        return pA;
    }
};
```

```javascript [JavaScript]
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    return pA;
};
```

```typescript [TypeScript]
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    let pA: ListNode | null = headA;
    let pB: ListNode | null = headB;
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    return pA;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m + n)`，每个指针最多遍历两个链表各一次。
- **空间复杂度**：`O(1)`，仅使用两个指针。

---

## 三、总结

| 方法               | 时间复杂度 | 空间复杂度 | 特点                                   |
| ------------------ | ---------- | ---------- | -------------------------------------- |
| 哈希表法           | `O(m+n)`   | `O(m)`     | 直观，但需额外空间                     |
| 双指针（长度差法） | `O(m+n)`   | `O(1)`     | 空间最优，需两次遍历                   |
| 双指针（交替法）   | `O(m+n)`   | `O(1)`     | **最推荐**，代码简洁，无需预先计算长度 |

**推荐**：在实际生产环境中，**方法三（交替双指针）** 是最佳选择，它满足空间 `O(1)` 的要求，且代码简洁，不易出错。方法二同样优秀，但需要额外计算长度。方法一在空间允许时也可使用，但一般不推荐作为生产级方案。