# [253. 会议室 II](https://leetcode.cn/problems/meeting-rooms-ii/)



## 一、题目描述

给你一个会议时间安排的数组 `intervals` ，每个会议时间都会包括开始和结束的时间 `intervals[i] = [starti, endi]` ，返回 **所需会议室的最小数量** 。

**示例 1：**

```
输入：intervals = [[0,30],[5,10],[15,20]]
输出：2
解释：[5,10] 与 [0,30] 同时进行，需要 2 个会议室。
```

**示例 2：**

```
输入：intervals = [[7,10],[2,4]]
输出：1
解释：两个会议不冲突，1 个会议室足够。
```

**提示：**

-   `1 <= intervals.length <= 10⁴`
-   `0 <= starti < endi <= 10⁶`



## 二、解答方法

### 2.1 方法一：最小堆（按开始时间排序）

1. **思路**

按 **开始时间升序** 排序，用一个 **小顶堆** 维护「当前正在进行的会议的结束时间」：

- 遍历每个会议，若堆顶（最早结束的会议）的结束时间 `<=` 当前会议的开始时间，说明该会议室已空闲，弹出；
- 把当前会议的结束时间入堆；
- 遍历过程中（或结束后）**堆的最大大小** 即所需最少会议室数。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        // 按开始时间升序
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        // 小顶堆：存正在进行会议的结束时间
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int[] interval : intervals) {
            if (!heap.isEmpty() && heap.peek() <= interval[0]) {
                heap.poll();                    // 有空闲会议室，复用
            }
            heap.offer(interval[1]);
        }
        return heap.size();
    }
}
```

```python [Python]
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        import heapq
        if not intervals:
            return 0
        intervals.sort(key=lambda x: x[0])
        heap = []                               # 小顶堆，存结束时间
        for start, end in intervals:
            if heap and heap[0] <= start:
                heapq.heapreplace(heap, end)    # 复用会议室
            else:
                heapq.heappush(heap, end)
        return len(heap)
```

```go [Go]
func minMeetingRooms(intervals [][]int) int {
    if len(intervals) == 0 {
        return 0
    }
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    // 小顶堆
    h := &IntHeap{}
    heap.Init(h)
    for _, iv := range intervals {
        if h.Len() > 0 && (*h)[0] <= iv[0] {
            heap.Pop(h)
        }
        heap.Push(h, iv[1])
    }
    return h.Len()
}

type IntHeap []int

func (h IntHeap) Len() int            { return len(h) }
func (h IntHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}
```

```cpp [C++]
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(),
             [](const vector<int>& a, const vector<int>& b) { return a[0] < b[0]; });
        priority_queue<int, vector<int>, greater<int>> minHeap;  // 小顶堆存结束时间
        for (auto& iv : intervals) {
            if (!minHeap.empty() && minHeap.top() <= iv[0]) {
                minHeap.pop();
            }
            minHeap.push(iv[1]);
        }
        return minHeap.size();
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
    if (!intervals.length) return 0;
    intervals.sort((a, b) => a[0] - b[0]);
    // 简易小顶堆：存结束时间
    const heap = [];
    const push = (x) => {
        heap.push(x);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
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
                const l = 2 * i + 1, r = l + 1;
                let small = i;
                if (l < heap.length && heap[l] < heap[small]) small = l;
                if (r < heap.length && heap[r] < heap[small]) small = r;
                if (small === i) break;
                [heap[i], heap[small]] = [heap[small], heap[i]];
                i = small;
            }
        }
        return top;
    };
    for (const [start, end] of intervals) {
        if (heap.length && heap[0] <= start) pop();
        push(end);
    }
    return heap.length;
};
```

```ts [TypeScript]
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals: number[][]): number {
    if (!intervals.length) return 0;
    intervals.sort((a, b) => a[0] - b[0]);
    const heap: number[] = [];
    const push = (x: number) => {
        heap.push(x);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = l + 1;
                let small = i;
                if (l < heap.length && heap[l] < heap[small]) small = l;
                if (r < heap.length && heap[r] < heap[small]) small = r;
                if (small === i) break;
                [heap[i], heap[small]] = [heap[small], heap[i]];
                i = small;
            }
        }
        return top;
    };
    for (const [start, end] of intervals) {
        if (heap.length && heap[0] <= start) pop();
        push(end);
    }
    return heap.length;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`（排序 + 堆操作）。
- **空间复杂度**：`O(n)`（堆）。

### 2.2 方法二：扫描线（拆分起点与终点）

1. **思路**

把所有「开始时间」和「结束时间」分别取出并排序，用双指针扫描，统计 **同时进行的最大会议数**：

- `starts[i] < ends[j]` → 有新会议开始，需要新会议室，`count++`，`i++`；
- 否则 → 有会议结束，释放会议室，`count--`，`j++`；
- 过程中记录 `count` 的最大值。

2. **代码实现（Python）**

```python
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        starts = sorted(i[0] for i in intervals)
        ends = sorted(i[1] for i in intervals)
        i = j = 0
        count = max_count = 0
        while i < len(starts):
            if starts[i] < ends[j]:
                count += 1
                max_count = max(max_count, count)
                i += 1
            else:
                count -= 1
                j += 1
        return max_count
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`（两次排序）。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间 | 空间 | 思路 |
| ---- | ---- | ---- | ---- |
| 最小堆 | `O(n log n)` | `O(n)` | 维护「进行中会议的结束时间」，堆顶最早空闲 |
| 扫描线 | `O(n log n)` | `O(n)` | 拆分起点/终点排序，统计最大并发数 |

核心洞察：**所需最少会议室数 = 任意时刻同时进行的最大会议数**。

边界细节：`starts[i] < ends[j]` 用严格小于 —— 若某会议在时刻 5 结束、另一会议在时刻 5 开始，可以复用同一间会议室，不算并发。

对比 `252. 会议室`（判断能否全部参加）：只需检查最大并发数是否 `> 1`。
