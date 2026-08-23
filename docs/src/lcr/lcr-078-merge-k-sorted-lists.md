# [LCR 078. 合并 K 个升序链表](https://leetcode.cn/problems/vvXgOq/)



## 一、题目描述

给定一个链表数组，每个链表都已经按升序排列。

请将所有链表合并到一个升序链表中，返回合并后的链表。



**示例 1：**

```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```

**示例 2：**

```
输入：lists = []
输出：[]
```

**提示：**

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10⁴ <= lists[i][j] <= 10⁴`
- `lists[i]` 按 **升序** 排列
- `lists[i].length` 的总和不超过 `10⁴`



## 二、解答方法

### 2.1 方法一：优先队列（最小堆）

1. **思路**

把每条链表的头结点加入最小堆，堆按节点值排序。每次弹出最小节点接到结果尾部，并把它的后继入堆。重复直到堆空。

时间 `O(N log k)`（`N` 为总节点数），空间 `O(k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode node : lists) {
            if (node != null) heap.offer(node);
        }
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            cur.next = node;
            cur = cur.next;
            if (node.next != null) heap.offer(node.next);
        }
        return dummy.next;
    }
}
```

```python [Python]
import heapq


class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))
        dummy = ListNode(0)
        cur = dummy
        while heap:
            _, i, node = heapq.heappop(heap)
            cur.next = node
            cur = cur.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next
```

```cpp [C++]
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> heap(cmp);
        for (ListNode* node : lists)
            if (node) heap.push(node);
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        while (!heap.empty()) {
            ListNode* node = heap.top();
            heap.pop();
            cur->next = node;
            cur = cur->next;
            if (node->next) heap.push(node->next);
        }
        return dummy->next;
    }
};
```

```go [Go]
type ListNodeHeap []*ListNode

func (h ListNodeHeap) Len() int           { return len(h) }
func (h ListNodeHeap) Less(i, j int) bool { return h[i].Val < h[j].Val }
func (h ListNodeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *ListNodeHeap) Push(x interface{}) { *h = append(*h, x.(*ListNode)) }
func (h *ListNodeHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

func mergeKLists(lists []*ListNode) *ListNode {
    h := &ListNodeHeap{}
    for _, node := range lists {
        if node != nil {
            heap.Push(h, node)
        }
    }
    dummy := &ListNode{}
    cur := dummy
    for h.Len() > 0 {
        node := heap.Pop(h).(*ListNode)
        cur.Next = node
        cur = cur.Next
        if node.Next != nil {
            heap.Push(h, node.Next)
        }
    }
    return dummy.Next
}
```

```js [JavaScript]
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const heap = [];
    const push = (node) => {
        heap.push(node);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p].val <= heap[i].val) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < heap.length && heap[l].val < heap[m].val) m = l;
                if (r < heap.length && heap[r].val < heap[m].val) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const node of lists) if (node) push(node);
    const dummy = new ListNode(0);
    let cur = dummy;
    while (heap.length) {
        const node = pop();
        cur.next = node;
        cur = cur.next;
        if (node.next) push(node.next);
    }
    return dummy.next;
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

typedef struct { struct ListNode** data; int size; } Heap;

static void swap(struct ListNode** a, struct ListNode** b) {
    struct ListNode* t = *a; *a = *b; *b = t;
}

static void up(Heap* h, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (h->data[p]->val <= h->data[i]->val) break;
        swap(&h->data[p], &h->data[i]);
        i = p;
    }
}

static void down(Heap* h, int i) {
    int n = h->size;
    while (1) {
        int l = i * 2 + 1, r = i * 2 + 2, m = i;
        if (l < n && h->data[l]->val < h->data[m]->val) m = l;
        if (r < n && h->data[r]->val < h->data[m]->val) m = r;
        if (m == i) break;
        swap(&h->data[m], &h->data[i]);
        i = m;
    }
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    Heap h;
    h.data = (struct ListNode**)malloc((listsSize + 1) * sizeof(struct ListNode*));
    h.size = 0;
    for (int i = 0; i < listsSize; i++) {
        if (lists[i]) {
            h.data[h.size] = lists[i];
            up(&h, h.size);
            h.size++;
        }
    }
    struct ListNode dummy;
    dummy.next = NULL;
    struct ListNode* cur = &dummy;
    while (h.size > 0) {
        struct ListNode* node = h.data[0];
        h.data[0] = h.data[--h.size];
        if (h.size > 0) down(&h, 0);
        cur->next = node;
        cur = cur->next;
        if (node->next) {
            h.data[h.size] = node->next;
            up(&h, h.size);
            h.size++;
        }
    }
    free(h.data);
    return dummy.next;
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

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    const heap: ListNode[] = [];
    const push = (node: ListNode) => {
        heap.push(node);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p].val <= heap[i].val) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): ListNode => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < heap.length && heap[l].val < heap[m].val) m = l;
                if (r < heap.length && heap[r].val < heap[m].val) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const node of lists) if (node) push(node);
    const dummy = new ListNode(0);
    let cur: ListNode = dummy;
    while (heap.length) {
        const node = pop();
        cur.next = node;
        cur = cur.next;
        if (node.next) push(node.next);
    }
    return dummy.next;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(N log k)`，`N` 为总节点数。
- **空间复杂度**：`O(k)`，堆。

### 2.2 方法二：分治合并（两两归并）

1. **思路**

把 K 条链表两两配对合并（每轮合并后链表数减半），直到只剩一条。每一层合并总代价 `O(N)`，共 `log k` 层。时间 `O(N log k)`，空间 `O(log k)`（递归）或 `O(1)`（迭代）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0) return null;
        return mergeRange(lists, 0, lists.length - 1);
    }
    private ListNode mergeRange(ListNode[] lists, int l, int r) {
        if (l == r) return lists[l];
        int m = l + (r - l) / 2;
        return mergeTwo(mergeRange(lists, l, m), mergeRange(lists, m + 1, r));
    }
    private ListNode mergeTwo(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (a != null && b != null) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a != null ? a : b;
        return dummy.next;
    }
}
```

```python [Python]
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        def merge_two(a, b):
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

        def merge_range(l, r):
            if l == r:
                return lists[l]
            m = (l + r) // 2
            return merge_two(merge_range(l, m), merge_range(m + 1, r))

        if not lists:
            return None
        return merge_range(0, len(lists) - 1)
```

```cpp [C++]
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if (lists.empty()) return nullptr;
        return mergeRange(lists, 0, lists.size() - 1);
    }
private:
    ListNode* mergeRange(vector<ListNode*>& lists, int l, int r) {
        if (l == r) return lists[l];
        int m = l + (r - l) / 2;
        return mergeTwo(mergeRange(lists, l, m), mergeRange(lists, m + 1, r));
    }
    ListNode* mergeTwo(ListNode* a, ListNode* b) {
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;
        while (a && b) {
            if (a->val <= b->val) { cur->next = a; a = a->next; }
            else { cur->next = b; b = b->next; }
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return dummy->next;
    }
};
```

```go [Go]
func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists) == 0 {
        return nil
    }
    var mergeRange func(l, r int) *ListNode
    mergeRange = func(l, r int) *ListNode {
        if l == r {
            return lists[l]
        }
        m := (l + r) / 2
        return mergeTwo(mergeRange(l, m), mergeRange(m+1, r))
    }
    return mergeRange(0, len(lists)-1)
}

func mergeTwo(a, b *ListNode) *ListNode {
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
```

```js [JavaScript]
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const mergeTwo = (a, b) => {
        const dummy = new ListNode(0);
        let cur = dummy;
        while (a && b) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a || b;
        return dummy.next;
    };
    const mergeRange = (l, r) => {
        if (l === r) return lists[l];
        const m = (l + r) >> 1;
        return mergeTwo(mergeRange(l, m), mergeRange(m + 1, r));
    };
    if (lists.length === 0) return null;
    return mergeRange(0, lists.length - 1);
};
```

```c [C]
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

static struct ListNode* mergeTwo(struct ListNode* a, struct ListNode* b) {
    struct ListNode dummy;
    struct ListNode* cur = &dummy;
    while (a && b) {
        if (a->val <= b->val) { cur->next = a; a = a->next; }
        else { cur->next = b; b = b->next; }
        cur = cur->next;
    }
    cur->next = a ? a : b;
    return dummy.next;
}

static struct ListNode* mergeRange(struct ListNode** lists, int l, int r) {
    if (l == r) return lists[l];
    int m = l + (r - l) / 2;
    return mergeTwo(mergeRange(lists, l, m), mergeRange(lists, m + 1, r));
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    return mergeRange(lists, 0, listsSize - 1);
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

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    const mergeTwo = (a: ListNode | null, b: ListNode | null): ListNode | null => {
        const dummy = new ListNode(0);
        let cur: ListNode = dummy;
        while (a && b) {
            if (a.val <= b.val) { cur.next = a; a = a.next; }
            else { cur.next = b; b = b.next; }
            cur = cur.next;
        }
        cur.next = a || b;
        return dummy.next;
    };
    const mergeRange = (l: number, r: number): ListNode | null => {
        if (l === r) return lists[l];
        const m = (l + r) >> 1;
        return mergeTwo(mergeRange(l, m), mergeRange(m + 1, r));
    };
    if (lists.length === 0) return null;
    return mergeRange(0, lists.length - 1);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(N log k)`。
- **空间复杂度**：`O(log k)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 优先队列 | `O(N log k)` | `O(k)` | 直观，推荐 |
| 分治两两合并 | `O(N log k)` | `O(log k)` | 无需额外堆结构 |

合并 K 个有序链表，优先队列每次取全局最小头节点；分治法把问题递归拆成两两合并，两者都达到 `O(N log k)`。

