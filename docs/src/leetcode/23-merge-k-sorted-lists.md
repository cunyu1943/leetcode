# [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)



## 一、题目描述

给你一个链表数组 `lists`，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。



**示例 1：**

```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
  1->4->5,
  1->3->4,
  2->6
将它们合并到一个有序链表中得到：1->1->2->3->4->4->5->6
```

**示例 2：**

```
输入：lists = []
输出：[]
```

**示例 3：**

```
输入：lists = [[]]
输出：[]
```

**提示：**

-   `k == lists.length`
-   `0 <= k <= 10^4`
-   `0 <= lists[i].length <= 500`
-   `-10^4 <= lists[i][j] <= 10^4`
-   `lists[i]` 按 **升序** 排列
-   `lists[i].length` 的总和不超过 `10^4`



## 二、解答方法

### 2.1 方法一：优先队列（最小堆）

1. **思路**

用一个最小堆（优先队列）维护「每个链表当前最小的节点」：

-   把所有非空链表的头结点入堆；
-   每次弹出堆顶（全局最小），把它接入结果，并将其 `next` 节点入堆；
-   重复到堆空。

Java 用 `PriorityQueue`，Python 用 `heapq`，Go/C 需手写最小堆，C++ 用 `priority_queue`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode head : lists) {
            if (head != null) pq.offer(head);
        }
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            cur.next = node;
            cur = cur.next;
            if (node.next != null) pq.offer(node.next);
        }
        return dummy.next;
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
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        import heapq
        pq = []
        for i, head in enumerate(lists):
            if head:
                heapq.heappush(pq, (head.val, i, head))
        dummy = ListNode(0)
        cur = dummy
        while pq:
            val, i, node = heapq.heappop(pq)
            cur.next = node
            cur = cur.next
            if node.next:
                heapq.heappush(pq, (node.next.val, i, node.next))
        return dummy.next
```

```go [Go]
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeKLists(lists []*ListNode) *ListNode {
    dummy := &ListNode{}
    cur := dummy
    // 用容器堆：简单起见每次线性找最小（非最优，仅示意）
    for {
        var minNode *ListNode
        minIdx := -1
        for i, l := range lists {
            if l != nil {
                if minNode == nil || l.Val < minNode.Val {
                    minNode = l
                    minIdx = i
                }
            }
        }
        if minNode == nil {
            break
        }
        cur.Next = minNode
        cur = cur.Next
        lists[minIdx] = minNode.Next
    }
    return dummy.Next
}
```

```c [C]
/* C 需手写最小堆，实现较长，推荐库函数或改用分治法 */
```

```cpp [C++]
class Solution {
public:
    struct Cmp {
        bool operator()(ListNode* a, ListNode* b) { return a->val > b->val; }
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Cmp> pq;
        for (ListNode* head : lists) {
            if (head) pq.push(head);
        }
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        while (!pq.empty()) {
            ListNode* node = pq.top(); pq.pop();
            cur->next = node;
            cur = cur->next;
            if (node->next) pq.push(node->next);
        }
        return dummy->next;
    }
};
```

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const dummy = new ListNode(0);
    let cur = dummy;
    const pq = [];
    for (const head of lists) {
        if (head) pq.push(head);
    }
    pq.sort((a, b) => a.val - b.val);
    while (pq.length) {
        const node = pq.shift();
        cur.next = node;
        cur = cur.next;
        if (node.next) {
            pq.push(node.next);
            pq.sort((a, b) => a.val - b.val);
        }
    }
    return dummy.next;
};
```

```ts [TypeScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number;
 *     next: ListNode | null;
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.next = (next === undefined ? null : next);
 *     }
 * }
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const dummy = new ListNode(0);
    let cur: ListNode | null = dummy;
    const pq: ListNode[] = [];
    for (const head of lists) {
        if (head) pq.push(head);
    }
    pq.sort((a, b) => a.val - b.val);
    while (pq.length) {
        const node = pq.shift()!;
        cur.next = node;
        cur = cur.next;
        if (node.next) {
            pq.push(node.next);
            pq.sort((a, b) => a.val - b.val);
        }
    }
    return dummy.next;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(N log k)`，其中 `N` 为所有节点总数，`k` 为链表个数，每次堆操作 `O(log k)`。
- **空间复杂度**：`O(k)`，堆中最多存放 `k` 个节点。

### 2.2 方法二：分治归并（两两合并）

1. **思路**

借鉴归并排序：把 `k` 个链表两两配对合并，再对合并结果继续两两合并，直到剩下一个链表。每次合并两个有序链表（复用第 21 题逻辑），共 `log k` 轮。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0) return null;
        int interval = 1;
        while (interval < lists.length) {
            for (int i = 0; i + interval < lists.length; i += interval * 2) {
                lists[i] = mergeTwo(lists[i], lists[i + interval]);
            }
            interval *= 2;
        }
        return lists[0];
    }

    private ListNode mergeTwo(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0), cur = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = (a != null) ? a : b;
        return dummy.next;
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
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None
        interval = 1
        while interval < len(lists):
            for i in range(0, len(lists) - interval, interval * 2):
                lists[i] = self.mergeTwo(lists[i], lists[i + interval])
            interval *= 2
        return lists[0]

    def mergeTwo(self, a, b):
        dummy = ListNode(0)
        cur = dummy
        while a and b:
            if a.val <= b.val:
                cur.next = a
                a = a.next
            else:
                cur.next = b
                b = b.next
            cur = cur.next
        cur.next = a or b
        return dummy.next
```

```go [Go]
func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists) == 0 {
        return nil
    }
    mergeTwo := func(a, b *ListNode) *ListNode {
        dummy := &ListNode{}
        cur := dummy
        for a != nil && b != nil {
            if a.Val <= b.Val {
                cur.Next = a
                a = a.Next
            } else {
                cur.Next = b
                b = b.Next
            }
            cur = cur.Next
        }
        if a != nil {
            cur.Next = a
        } else {
            cur.Next = b
        }
        return dummy.Next
    }
    interval := 1
    for interval < len(lists) {
        for i := 0; i+interval < len(lists); i += interval * 2 {
            lists[i] = mergeTwo(lists[i], lists[i+interval])
        }
        interval *= 2
    }
    return lists[0]
}
```

```c [C]
struct ListNode* mergeTwo(struct ListNode* a, struct ListNode* b) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* cur = dummy;
    while (a != NULL && b != NULL) {
        if (a->val <= b->val) { cur->next = a; a = a->next; }
        else { cur->next = b; b = b->next; }
        cur = cur->next;
    }
    cur->next = (a != NULL) ? a : b;
    struct ListNode* head = dummy->next;
    free(dummy);
    return head;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    int interval = 1;
    while (interval < listsSize) {
        for (int i = 0; i + interval < listsSize; i += interval * 2) {
            lists[i] = mergeTwo(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
}
```

```cpp [C++]
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if (lists.empty()) return nullptr;
        int interval = 1;
        while (interval < lists.size()) {
            for (int i = 0; i + interval < lists.size(); i += interval * 2) {
                lists[i] = mergeTwo(lists[i], lists[i + interval]);
            }
            interval *= 2;
        }
        return lists[0];
    }

private:
    ListNode* mergeTwo(ListNode* a, ListNode* b) {
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        while (a != nullptr && b != nullptr) {
            if (a->val <= b->val) { cur->next = a; a = a->next; }
            else { cur->next = b; b = b->next; }
            cur = cur->next;
        }
        cur->next = (a != nullptr) ? a : b;
        return dummy->next;
    }
};
```

```js [JavaScript]
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    if (lists.length === 0) return null;
    const mergeTwo = (a, b) => {
        const dummy = new ListNode(0);
        let cur = dummy;
        while (a !== null && b !== null) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a !== null ? a : b;
        return dummy.next;
    };
    let interval = 1;
    while (interval < lists.length) {
        for (let i = 0; i + interval < lists.length; i += interval * 2) {
            lists[i] = mergeTwo(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
};
```

```ts [TypeScript]
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.length === 0) return null;
    const mergeTwo = (a: ListNode | null, b: ListNode | null): ListNode | null => {
        const dummy = new ListNode(0);
        let cur: ListNode | null = dummy;
        while (a !== null && b !== null) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a !== null ? a : b;
        return dummy.next;
    };
    let interval = 1;
    while (interval < lists.length) {
        for (let i = 0; i + interval < lists.length; i += interval * 2) {
            lists[i] = mergeTwo(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(N log k)`，分治共 `log k` 轮，每轮遍历全部 `N` 个节点。
- **空间复杂度**：`O(1)`，原地合并（递归版有 `O(log k)` 栈开销）。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 优先队列（最小堆） | `O(N log k)` | `O(k)` | 常规实现 |
| 分治归并（两两合并） | `O(N log k)` | `O(1)` | 常规实现 |

