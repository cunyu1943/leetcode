# [LCR 023. 相交链表](https://leetcode.cn/problems/3u1WK4/)



## 一、题目描述

给定两个单链表的头节点 `headA` 和 `headB` ，请找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 `null` 。

题目数据 **保证** 整个链式结构中不存在环。注意：函数返回结果后，链表必须 **保持其原始结构** 。



**示例 1：**

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8。
```

**示例 2：**

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：No intersection
```

**提示：**

- `listA` 中节点数目为 `m`
- `listB` 中节点数目为 `n`
- `1 <= m, n <= 3 * 10⁴`
- `1 <= Node.val <= 10⁵`
- `0 <= skipA <= m` 且 `0 <= skipB <= n`



## 二、解答方法

### 2.1 方法一：双指针（走两段路）

1. **思路**

设 `pA` 从 `headA` 出发，`pB` 从 `headB` 出发，走到末尾后切换到另一条链表的头部继续走。因为：

```
lenA + lenB = lenB + lenA
```

两个指针走过的路程相同，若存在交点，它们必在交点处相遇；若不存在，则同时走到 `null` 结束。

时间 `O(m+n)`，空间 `O(1)`，且无需计算长度。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
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
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        pA, pB = headA, headB
        while pA is not pB:
            pA = pA.next if pA else headB
            pB = pB.next if pB else headA
        return pA
```

```cpp [C++]
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = pA ? pA->next : headB;
            pB = pB ? pB->next : headA;
        }
        return pA;
    }
};
```

```go [Go]
func getIntersectionNode(headA *ListNode, headB *ListNode) *ListNode {
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

```js [JavaScript]
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    return pA;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    struct ListNode *pA = headA, *pB = headB;
    while (pA != pB) {
        pA = pA ? pA->next : headB;
        pB = pB ? pB->next : headA;
    }
    return pA;
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

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let pA: ListNode | null = headA, pB: ListNode | null = headB;
    while (pA !== pB) {
        pA = pA ? pA.next : headA ? headB : null;
        pB = pB ? pB.next : headB ? headA : null;
    }
    return pA;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：计算长度后对齐

1. **思路**

- 分别求两链表长度 `la`、`lb`；
- 令长链表指针先走 `|la - lb|` 步，使两指针到末尾距离相等；
- 同步前进，首次相遇即为交点，到末尾都不遇则返回 `null`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int la = len(headA), lb = len(headB);
        while (la > lb) { headA = headA.next; la--; }
        while (lb > la) { headB = headB.next; lb--; }
        while (headA != headB) { headA = headA.next; headB = headB.next; }
        return headA;
    }
    private int len(ListNode h) {
        int c = 0;
        while (h != null) { c++; h = h.next; }
        return c;
    }
}
```

```python [Python]
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        def length(h):
            c = 0
            while h:
                c += 1
                h = h.next
            return c
        la, lb = length(headA), length(headB)
        while la > lb:
            headA = headA.next
            la -= 1
        while lb > la:
            headB = headB.next
            lb -= 1
        while headA is not headB:
            headA = headA.next
            headB = headB.next
        return headA
```

```cpp [C++]
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        auto len = [](ListNode* h) {
            int c = 0;
            while (h) { c++; h = h->next; }
            return c;
        };
        int la = len(headA), lb = len(headB);
        while (la > lb) { headA = headA->next; la--; }
        while (lb > la) { headB = headB->next; lb--; }
        while (headA != headB) { headA = headA->next; headB = headB->next; }
        return headA;
    }
};
```

```go [Go]
func getIntersectionNode(headA *ListNode, headB *ListNode) *ListNode {
    length := func(h *ListNode) int {
        c := 0
        for h != nil {
            c++
            h = h.Next
        }
        return c
    }
    la, lb := length(headA), length(headB)
    for la > lb {
        headA = headA.Next
        la--
    }
    for lb > la {
        headB = headB.Next
        lb--
    }
    for headA != headB {
        headA = headA.Next
        headB = headB.Next
    }
    return headA
}
```

```js [JavaScript]
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    const len = (h) => { let c = 0; while (h) { c++; h = h.next; } return c; };
    let la = len(headA), lb = len(headB);
    while (la > lb) { headA = headA.next; la--; }
    while (lb > la) { headB = headB.next; lb--; }
    while (headA !== headB) { headA = headA.next; headB = headB.next; }
    return headA;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    int la = 0, lb = 0;
    for (struct ListNode* p = headA; p; p = p->next) la++;
    for (struct ListNode* p = headB; p; p = p->next) lb++;
    while (la > lb) { headA = headA->next; la--; }
    while (lb > la) { headB = headB->next; lb--; }
    while (headA != headB) { headA = headA->next; headB = headB->next; }
    return headA;
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

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const len = (h: ListNode | null): number => { let c = 0; while (h) { c++; h = h.next; } return c; };
    let la = len(headA), lb = len(headB);
    while (la > lb) { headA = headA!.next; la--; }
    while (lb > la) { headB = headB!.next; lb--; }
    while (headA !== headB) { headA = headA!.next; headB = headB!.next; }
    return headA;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针走两段路 | `O(m+n)` | `O(1)` | 巧妙，无需算长度 |
| 长度对齐 | `O(m+n)` | `O(1)` | 直观易懂 |

「双指针互换头结点」利用路程相等这一对称性，是本题中空间最优且最优雅的解法。

