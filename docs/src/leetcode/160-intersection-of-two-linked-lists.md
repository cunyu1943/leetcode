# [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)



## 一、题目描述

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 `null` 。

图示两个链表在节点 `c1` 开始相交：

```
A:          a1 → a2 ↘
                       c1 → c2 → c3 → null
B:    b1 → b2 → b3 ↗
```

题目数据 **保证** 整个链式结构中不存在环。

注意，函数返回结果后，链表必须 **保持其原始结构** 。



**示例 1：**

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8。
```

**示例 2：**

```
输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
```

**示例 3：**

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：No intersection
```

**提示：**

-   `listA` 中节点数目为 `m`
-   `listB` 中节点数目为 `n`
-   `1 <= m, n <= 3 * 10⁴`
-   `1 <= Node.val <= 10⁵`
-   `0 <= skipA <= m` 且 `0 <= skipB <= n`
-   如果 `listA` 和 `listB` 没有交点，`intersectVal` 为 `0`
-   如果 `listA` 和 `listB` 有交点，`intersectVal == listA[skipA] == listB[skipB]`



**进阶：** 你能否设计一个时间复杂度 `O(m + n)` 、仅用 `O(1)` 内存的解决方案？



## 二、解答方法

### 2.1 方法一：双指针（浪漫相遇法）

1. **思路**

设 `A` 长度 `a + c`，`B` 长度 `b + c`（`c` 为公共尾部）。指针 `pA` 从 `headA` 出发，走到尾后跳到 `headB`；`pB` 从 `headB` 出发，走到尾后跳到 `headA`。两者各走 `a + b + c` 步必在交点相遇（无交点则同时到达 `null`）。

2. **代码实现**

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
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        pA, pB = headA, headB
        while pA != pB:
            pA = headB if not pA else pA.next
            pB = headA if not pB else pB.next
        return pA
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
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = (pA == nullptr) ? headB : pA->next;
            pB = (pB == nullptr) ? headA : pB->next;
        }
        return pA;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let pA: ListNode | null = headA, pB: ListNode | null = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：哈希表

1. **思路**

遍历 `A` 将所有节点存入集合，再遍历 `B`，第一个出现在集合中的节点即交点。

2. **代码实现（Java）**

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        Set<ListNode> set = new HashSet<>();
        while (headA != null) {
            set.add(headA);
            headA = headA.next;
        }
        while (headB != null) {
            if (set.contains(headB)) return headB;
            headB = headB.next;
        }
        return null;
    }
}
```

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(m)` 或 `O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针相遇 | `O(m+n)` | `O(1)` | 满足进阶，最优雅 |
| 哈希表 | `O(m+n)` | `O(n)` | 直观 |

双指针「你走完我的路，我走完你的路，终会相遇于交点」是本 interfsection 问题最经典的解法。
