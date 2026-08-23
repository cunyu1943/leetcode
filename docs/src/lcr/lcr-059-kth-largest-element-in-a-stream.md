# [LCR 059. 数据流中的第 K 大元素](https://leetcode.cn/problems/jBjn9C/)



## 一、题目描述

设计一个找到数据流中第 `k` 大元素的类（class）。注意是排序后的第 `k` 大元素，不是第 `k` 个不同的元素。

请实现 `KthLargest` 类：

- `KthLargest(int k, int[] nums)` 使用整数 `k` 和整数流 `nums` 初始化对象。
- `int add(int val)` 将 `val` 插入数据流 `nums` 后，返回当前数据流中第 `k` 大的元素。



**示例 1：**

```
输入：
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
输出：
[null, 4, 5, 5, 8, 8]
解释：
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
```

**提示：**

- `1 <= k <= nums.length <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`
- `-10⁴ <= val <= 10⁴`
- 最多调用 `add` 方法 `10⁴` 次
- 题目数据保证，在查找第 `k` 大元素时，数组中至少有 `k` 个元素



## 二、解答方法

### 2.1 方法一：小顶堆（固定大小 k）

1. **思路**

维护一个大小为 `k` 的小顶堆，堆顶就是第 `k` 大元素：

- 构造时把 `nums` 逐个加入堆，超过 `k` 则弹出堆顶（最小元素）；
- `add(val)`：若堆未满直接加入；否则若 `val > 堆顶`，弹出堆顶并加入 `val`；
- 返回堆顶。

`add` 复杂度 `O(log k)`，构造 `O(n log k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class KthLargest {
    private PriorityQueue<Integer> heap;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        heap = new PriorityQueue<>();
        for (int x : nums) add(x);
    }

    public int add(int val) {
        if (heap.size() < k) {
            heap.offer(val);
        } else if (val > heap.peek()) {
            heap.poll();
            heap.offer(val);
        }
        return heap.peek();
    }
}
```

```python [Python]
import heapq


class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.heap = []
        for x in nums:
            self.add(x)

    def add(self, val: int) -> int:
        if len(self.heap) < self.k:
            heapq.heappush(self.heap, val)
        elif val > self.heap[0]:
            heapq.heapreplace(self.heap, val)
        return self.heap[0]
```

```cpp [C++]
class KthLargest {
    priority_queue<int, vector<int>, greater<int>> heap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int x : nums) add(x);
    }

    int add(int val) {
        if ((int)heap.size() < k) {
            heap.push(val);
        } else if (val > heap.top()) {
            heap.pop();
            heap.push(val);
        }
        return heap.top();
    }
};
```

```go [Go]
import "container/heap"

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

type KthLargest struct {
    heap *IntHeap
    k    int
}

func Constructor(k int, nums []int) KthLargest {
    h := &IntHeap{}
    kth := KthLargest{heap: h, k: k}
    for _, x := range nums {
        kth.Add(x)
    }
    return kth
}

func (kth *KthLargest) Add(val int) int {
    if kth.heap.Len() < kth.k {
        heap.Push(kth.heap, val)
    } else if val > (*kth.heap)[0] {
        heap.Pop(kth.heap)
        heap.Push(kth.heap, val)
    }
    return (*kth.heap)[0]
}
```

```js [JavaScript]
// JavaScript 无内置堆，用数组 + 上浮/下沉实现小顶堆。
var KthLargest = function (k, nums) {
    this.k = k;
    this.heap = [];
    for (const x of nums) this.add(x);
};

KthLargest.prototype.add = function (val) {
    const h = this.heap;
    if (h.length < this.k) {
        h.push(val);
        let i = h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (h[p] <= h[i]) break;
            [h[p], h[i]] = [h[i], h[p]];
            i = p;
        }
    } else if (val > h[0]) {
        h[0] = val;
        let i = 0;
        while (true) {
            const l = i * 2 + 1, r = i * 2 + 2;
            let m = i;
            if (l < h.length && h[l] < h[m]) m = l;
            if (r < h.length && h[r] < h[m]) m = r;
            if (m === i) break;
            [h[m], h[i]] = [h[i], h[m]];
            i = m;
        }
    }
    return h[0];
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int* data;
    int size;
    int k;
    int cap;
} KthLargest;

static void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

static void up(KthLargest* obj, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (obj->data[p] <= obj->data[i]) break;
        swap(&obj->data[p], &obj->data[i]);
        i = p;
    }
}

static void down(KthLargest* obj, int i) {
    int n = obj->size;
    while (1) {
        int l = i * 2 + 1, r = i * 2 + 2, m = i;
        if (l < n && obj->data[l] < obj->data[m]) m = l;
        if (r < n && obj->data[r] < obj->data[m]) m = r;
        if (m == i) break;
        swap(&obj->data[m], &obj->data[i]);
        i = m;
    }
}

KthLargest* kthLargestCreate(int k, int* nums, int numsSize) {
    KthLargest* obj = (KthLargest*)calloc(1, sizeof(KthLargest));
    obj->k = k;
    obj->cap = k + 1;
    obj->data = (int*)malloc(obj->cap * sizeof(int));
    for (int i = 0; i < numsSize; i++) kthLargestAdd(obj, nums[i]);
    return obj;
}

int kthLargestAdd(KthLargest* obj, int val) {
    if (obj->size < obj->k) {
        obj->data[obj->size] = val;
        up(obj, obj->size);
        obj->size++;
    } else if (val > obj->data[0]) {
        obj->data[0] = val;
        down(obj, 0);
    }
    return obj->data[0];
}

void kthLargestFree(KthLargest* obj) {
    free(obj->data);
    free(obj);
}
```

```ts [TypeScript]
class KthLargest {
    private heap: number[] = [];
    private k: number;

    constructor(k: number, nums: number[]) {
        this.k = k;
        for (const x of nums) this.add(x);
    }

    add(val: number): number {
        const h = this.heap;
        if (h.length < this.k) {
            h.push(val);
            let i = h.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (h[p] <= h[i]) break;
                [h[p], h[i]] = [h[i], h[p]];
                i = p;
            }
        } else if (val > h[0]) {
            h[0] = val;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < h.length && h[l] < h[m]) m = l;
                if (r < h.length && h[r] < h[m]) m = r;
                if (m === i) break;
                [h[m], h[i]] = [h[i], h[m]];
                i = m;
            }
        }
        return h[0];
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`add` 为 `O(log k)`；构造 `O(n log k)`。
- **空间复杂度**：`O(k)`，小顶堆。

## 三、总结

| 方法 | add 复杂度 | 空间 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 固定大小小顶堆 | `O(log k)` | `O(k)` | 标准解法 |

维护一个「只保留前 k 大元素」的小顶堆：堆顶即第 k 大，新元素更大时替换堆顶。这是流式 Top-K 问题的通用模型。

