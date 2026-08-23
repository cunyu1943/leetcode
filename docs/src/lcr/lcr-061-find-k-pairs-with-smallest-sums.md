# [LCR 061. 查找和最小的 K 对数字](https://leetcode.cn/problems/qn8gGX/)



## 一、题目描述

给定两个以 **升序排列** 的整数数组 `nums1` 和 `nums2`，以及一个整数 `k` 。

定义一对值 `(u, v)`，其中第一个元素来自 `nums1`，第二个元素来自 `nums2`。

请找到和最小的 `k` 个数对 `(u1, v1), (u2, v2) ... (uk, vk)` 。



**示例 1：**

```
输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出: [1,2],[1,4],[1,6]
```

**示例 2：**

```
输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
输出: [1,1],[1,1]
```

**示例 3：**

```
输入: nums1 = [1,2], nums2 = [3], k = 3
输出: [1,3],[2,3]
```

**提示：**

- `1 <= nums1.length, nums2.length <= 10⁴`
- `-10⁹ <= nums1[i], nums2[i] <= 10⁹`
- `nums1`、`nums2` 均为升序排列
- `1 <= k <= 1000`



## 二、解答方法

### 2.1 方法一：最小堆

1. **思路**

把 `(i, 0)`（`i` 从 `0` 到 `min(k, n1)-1`）加入最小堆，堆按「`nums1[i] + nums2[j]` 的和」排序。每次弹出堆顶 `(i, j)` 即当前最小数对，然后把它「向右扩展」的一对 `(i, j+1)` 加入堆（前提 `j+1 < n2`）。

由于数组升序，每对数对恰好从一个「祖先」扩展而来，保证不重不漏。时间 `O(k log k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<List<Integer>> res = new ArrayList<>();
        int n1 = nums1.length, n2 = nums2.length;
        // 堆按和排序，存 (i, j)
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
            (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]));
        for (int i = 0; i < Math.min(k, n1); i++) heap.offer(new int[]{i, 0});
        while (!heap.isEmpty() && res.size() < k) {
            int[] cur = heap.poll();
            int i = cur[0], j = cur[1];
            res.add(List.of(nums1[i], nums2[j]));
            if (j + 1 < n2) heap.offer(new int[]{i, j + 1});
        }
        return res;
    }
}
```

```python [Python]
import heapq


class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        res = []
        n1, n2 = len(nums1), len(nums2)
        heap = []
        for i in range(min(k, n1)):
            heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
        while heap and len(res) < k:
            _, i, j = heapq.heappop(heap)
            res.append([nums1[i], nums2[j]])
            if j + 1 < n2:
                heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        vector<vector<int>> res;
        int n1 = nums1.size(), n2 = nums2.size();
        auto cmp = [&](pair<int, int>& a, pair<int, int>& b) {
            return nums1[a.first] + nums2[a.second] > nums1[b.first] + nums2[b.second];
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> heap(cmp);
        for (int i = 0; i < min(k, n1); i++) heap.push({i, 0});
        while (!heap.empty() && res.size() < k) {
            auto [i, j] = heap.top();
            heap.pop();
            res.push_back({nums1[i], nums2[j]});
            if (j + 1 < n2) heap.push({i, j + 1});
        }
        return res;
    }
};
```

```go [Go]
func kSmallestPairs(nums1 []int, nums2 []int, k int) [][]int {
    n1, n2 := len(nums1), len(nums2)
    h := &pairHeap{nums1: nums1, nums2: nums2}
    heap.Init(h)
    for i := 0; i < min(k, n1); i++ {
        heap.Push(h, pair{i, 0})
    }
    res := make([][]int, 0, k)
    for h.Len() > 0 && len(res) < k {
        p := heap.Pop(h).(pair)
        res = append(res, []int{nums1[p.i], nums2[p.j]})
        if p.j+1 < n2 {
            heap.Push(h, pair{p.i, p.j + 1})
        }
    }
    return res
}

type pair struct{ i, j int }

type pairHeap struct {
    nums1, nums2 []int
    data         []pair
}

func (h *pairHeap) Len() int { return len(h.data) }
func (h *pairHeap) Less(i, j int) bool {
    return h.nums1[h.data[i].i]+h.nums2[h.data[i].j] < h.nums1[h.data[j].i]+h.nums2[h.data[j].j]
}
func (h *pairHeap) Swap(i, j int) { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *pairHeap) Push(x interface{}) { h.data = append(h.data, x.(pair)) }
func (h *pairHeap) Pop() interface{} {
    old := h.data
    n := len(old)
    x := old[n-1]
    h.data = old[:n-1]
    return x
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```js [JavaScript]
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
    const res = [];
    const n1 = nums1.length, n2 = nums2.length;
    // 手写小顶堆（按和排序）
    const heap = [];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
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
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (let i = 0; i < Math.min(k, n1); i++) {
        push([nums1[i] + nums2[0], i, 0]);
    }
    while (heap.length && res.length < k) {
        const [, i, j] = pop();
        res.push([nums1[i], nums2[j]]);
        if (j + 1 < n2) push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
    return res;
};
```

```c [C]
#include <stdlib.h>

typedef struct { long long sum; int i; int j; } Elem;

// 最小堆
static void swap(Elem* a, Elem* b) { Elem t = *a; *a = *b; *b = t; }

static void up(Elem* heap, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (heap[p].sum <= heap[i].sum) break;
        swap(&heap[p], &heap[i]);
        i = p;
    }
}

static void down(Elem* heap, int n, int i) {
    while (1) {
        int l = i * 2 + 1, r = i * 2 + 2, m = i;
        if (l < n && heap[l].sum < heap[m].sum) m = l;
        if (r < n && heap[r].sum < heap[m].sum) m = r;
        if (m == i) break;
        swap(&heap[m], &heap[i]);
        i = m;
    }
}

int** kSmallestPairs(int* nums1, int nums1Size, int* nums2, int nums2Size, int k, int* returnSize, int** returnColumnSizes) {
    int cap = k < nums1Size ? k : nums1Size;
    Elem* heap = (Elem*)malloc((cap + k + 1) * sizeof(Elem));
    int size = 0;
    for (int i = 0; i < cap; i++) {
        heap[size].sum = (long long)nums1[i] + nums2[0];
        heap[size].i = i;
        heap[size].j = 0;
        up(heap, size);
        size++;
    }
    int** res = (int**)malloc(k * sizeof(int*));
    int* cols = (int*)malloc(k * sizeof(int));
    int cnt = 0;
    while (size > 0 && cnt < k) {
        Elem top = heap[0];
        heap[0] = heap[--size];
        if (size > 0) down(heap, size, 0);
        res[cnt] = (int*)malloc(2 * sizeof(int));
        res[cnt][0] = nums1[top.i];
        res[cnt][1] = nums2[top.j];
        cols[cnt] = 2;
        cnt++;
        if (top.j + 1 < nums2Size) {
            heap[size].sum = (long long)nums1[top.i] + nums2[top.j + 1];
            heap[size].i = top.i;
            heap[size].j = top.j + 1;
            up(heap, size);
            size++;
        }
    }
    free(heap);
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    const res: number[][] = [];
    const n1 = nums1.length, n2 = nums2.length;
    const heap: [number, number, number][] = [];
    const push = (item: [number, number, number]) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): [number, number, number] => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (let i = 0; i < Math.min(k, n1); i++) {
        push([nums1[i] + nums2[0], i, 0]);
    }
    while (heap.length && res.length < k) {
        const [, i, j] = pop();
        res.push([nums1[i], nums2[j]]);
        if (j + 1 < n2) push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(k log k)`，堆大小不超过 `min(k, n1) + 1`。
- **空间复杂度**：`O(k)`，堆。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 最小堆 | `O(k log k)` | `O(k)` | 标准解法，推荐 |

核心是把「每一行只取最小列」作为堆的初始种子，弹出一个再扩展同行的下一列，利用两个数组的升序性保证生成的数对按和递增且无遗漏。

