# [218. 天际线问题](https://leetcode.cn/problems/the-skyline-problem/)



## 一、题目描述

城市的 **天际线** 是从远处观看该城市中所有建筑物形成的 **外部轮廓** 。给你一个由所有建筑物的位置和高度组成的列表 `buildings` ，其中 `buildings[i] = [lefti, righti, heighti]` 表示：

-   `lefti` 是第 `i` 座建筑物左边缘的 `x` 坐标。
-   `righti` 是第 `i` 座建筑物右边缘的 `x` 坐标。
-   `heighti` 是第 `i` 座建筑物的高度。

**天际线** 应该表示为 **由 “关键点” 组成的列表** ，其中关键点 `[[x1,y1],[x2,y2],...]` 按 `x` 坐标 **升序** 排列 。**关键点是水平线段的左端点** 。列表中最后一个点是最右侧建筑物的终点，`y` 坐标始终为 `0` ，用于标记天际线的终止。此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。

**注意：** 输出天际线中不得有连续的相同高度的水平线。例如 `[...[2 3], [4 5], [7 5], [11 5], [12 7]...]` 是不正确的答案；三条高度为 5 的线应该在最终输出中合并为一个：`[...[2 3], [4 5], [12 7], ...]`



**示例 1：**

```
输入：buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
输出：[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
```

**示例 2：**

```
输入：buildings = [[0,2,3],[2,5,3]]
输出：[[0,3],[5,3]]
```

**提示：**

-   `1 <= buildings.length <= 10⁴`
-   `0 <= lefti < righti <= 2³¹ - 1`
-   `1 <= heighti <= 2³¹ - 1`
-   `buildings` 按 `lefti` **非递减** 排序



## 二、解答方法

### 2.1 方法一：扫描线 + 最大堆（延迟删除）

1. **思路**

1. 把每栋楼拆成两个事件：`(left, -height)`（开始）和 `(right, height)`（结束）。用高度取负区分：排序后同 x 处，高度更高的「开始」事件优先，且「开始」在「结束」之前处理。
2. 按 x 升序扫描事件，用 **最大堆** 维护当前「活跃」的建筑高度（并加入高度 0 表示地面）。
3. 每次处理完同一 x 的所有事件后，若当前最大高度与上一次记录的高度不同，则产生一个关键点 `[x, maxHeight]`。
4. 堆中元素延迟删除：弹出堆顶时若该高度已被标记删除（对应的楼已结束），则持续弹出。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        // 事件：(x, -height, right) 开始；(x, 0, 0) 结束占位
        List<int[]> events = new ArrayList<>();
        for (int[] b : buildings) {
            events.add(new int[]{b[0], -b[2], b[1]});
            events.add(new int[]{b[1], 0, 0});
        }
        events.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

        // 最大堆：按高度降序，元素为 (height, right)
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        heap.offer(new int[]{0, Integer.MAX_VALUE});   // 地面，永不失效

        List<List<Integer>> res = new ArrayList<>();
        int prev = 0;
        for (int[] e : events) {
            int x = e[0], negH = e[1], right = e[2];
            if (negH != 0) {
                heap.offer(new int[]{-negH, right});    // 开始事件：入堆
            }
            // 延迟删除：堆顶建筑的右边界已越过当前扫描线
            while (heap.peek()[1] <= x) {
                heap.poll();
            }
            int cur = heap.peek()[0];
            if (cur != prev) {                          // 高度变化才记录关键点
                res.add(Arrays.asList(x, cur));
                prev = cur;
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        import heapq
        # 事件：(x, -height) 开始，(x, height) 结束
        events = []
        for left, right, height in buildings:
            events.append((left, -height, right))
            events.append((right, 0, 0))       # 结束事件用 0 高度占位
        events.sort()

        res = []
        # 堆中元素：(-height, right)，延迟删除
        heap = [(0, float('inf'))]
        prev = 0
        for x, neg_h, right in events:
            if neg_h != 0:                      # 开始事件
                heapq.heappush(heap, (neg_h, right))
            # 弹出已经结束（right <= x）的建筑
            while heap[0][1] <= x:
                heapq.heappop(heap)
            cur = -heap[0][0]
            if cur != prev:
                res.append([x, cur])
                prev = cur
        return res
```

```go [Go]
func getSkyline(buildings [][]int) [][]int {
    events := [][3]int{}
    for _, b := range buildings {
        events = append(events, [3]int{b[0], -b[2], b[1]}) // (x, -h, right)
        events = append(events, [3]int{b[1], 0, 0})        // (x, 0, 0)
    }
    sort.Slice(events, func(i, j int) bool {
        if events[i][0] != events[j][0] {
            return events[i][0] < events[j][0]
        }
        return events[i][1] < events[j][1]
    })

    // 最大堆：元素 (height, right)
    h := &MaxHeap{}
    heap.Init(h)
    heap.Push(h, [2]int{0, math.MaxInt32})
    res := [][]int{}
    prev := 0
    for _, e := range events {
        x, negH, right := e[0], e[1], e[2]
        if negH != 0 {
            heap.Push(h, [2]int{-negH, right})
        }
        for h.Len() > 0 && (*h)[0][1] <= x {
            heap.Pop(h)
        }
        cur := (*h)[0][0]
        if cur != prev {
            res = append(res, []int{x, cur})
            prev = cur
        }
    }
    return res
}

type MaxHeap [][2]int

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i][0] > h[j][0] }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *MaxHeap) Pop() interface{} {
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
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int, int>> events;   // (x, -height) 开始 / (x, height) 结束
        for (auto& b : buildings) {
            events.push_back({b[0], -b[2]});
            events.push_back({b[1], b[2]});
        }
        sort(events.begin(), events.end());

        // 最大堆 (height, right)
        priority_queue<pair<int, int>> pq;
        pq.push({0, INT_MAX});
        vector<vector<int>> res;
        int prev = 0;

        size_t i = 0;
        while (i < events.size()) {
            int x = events[i].first;
            while (i < events.size() && events[i].first == x) {
                int h = events[i].second;
                if (h < 0) {
                    pq.push({-h, findRight(buildings, x, -h)});
                } else {
                    removed[h]++;
                }
                i++;
            }
            while (!removed.empty() && removed[pq.top().first] > 0) {
                removed[pq.top().first]--;
                if (removed[pq.top().first] == 0) removed.erase(pq.top().first);
                pq.pop();
            }
            int cur = pq.top().first;
            if (cur != prev) {
                res.push_back({x, cur});
                prev = cur;
            }
        }
        return res;
    }
private:
    unordered_map<int, int> removed;
    int findRight(vector<vector<int>>& buildings, int left, int height) {
        for (auto& b : buildings) {
            if (b[0] == left && b[2] == height) return b[1];
        }
        return INT_MAX;
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function (buildings) {
    const events = [];
    for (const [left, right, height] of buildings) {
        events.push([left, -height, right]);
        events.push([right, 0, 0]);
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    // 简易最大堆：存 [height, right]
    const heap = [[0, Infinity]];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] >= heap[i][0]) break;
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
                let big = i;
                if (l < heap.length && heap[l][0] > heap[big][0]) big = l;
                if (r < heap.length && heap[r][0] > heap[big][0]) big = r;
                if (big === i) break;
                [heap[i], heap[big]] = [heap[big], heap[i]];
                i = big;
            }
        }
        return top;
    };

    const res = [];
    let prev = 0;
    for (const [x, negH, right] of events) {
        if (negH !== 0) push([-negH, right]);
        while (heap[0][1] <= x) pop();
        const cur = heap[0][0];
        if (cur !== prev) {
            res.push([x, cur]);
            prev = cur;
        }
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
function getSkyline(buildings: number[][]): number[][] {
    const events: [number, number, number][] = [];
    for (const [left, right, height] of buildings) {
        events.push([left, -height, right]);
        events.push([right, 0, 0]);
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const heap: [number, number][] = [[0, Infinity]];
    const push = (item: [number, number]) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] >= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = l + 1;
                let big = i;
                if (l < heap.length && heap[l][0] > heap[big][0]) big = l;
                if (r < heap.length && heap[r][0] > heap[big][0]) big = r;
                if (big === i) break;
                [heap[i], heap[big]] = [heap[big], heap[i]];
                i = big;
            }
        }
        return top;
    };

    const res: number[][] = [];
    let prev = 0;
    for (const [x, negH, right] of events) {
        if (negH !== 0) push([-negH, right]);
        while (heap[0][1] <= x) pop();
        const cur = heap[0][0];
        if (cur !== prev) {
            res.push([x, cur]);
            prev = cur;
        }
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`（事件排序 `O(n log n)` + 每次堆操作 `O(log n)`）。
- **空间复杂度**：`O(n)`。

## 三、总结

天际线是 **扫描线（sweep line）** 的经典难题，核心技巧：

1. **事件拆分**：每栋楼拆成「开始」`(left, -h)` 与「结束」`(right, h)`，高度取负让同 x 时高建筑优先、开始优先于结束；
2. **最大堆维护当前最高**：堆顶即当前天际线高度；
3. **延迟删除**：结束事件不立即从堆中删除（堆不支持随机删除），而在堆顶元素已过期（`right <= x`）时弹出；
4. **去重**：只有高度 **发生变化** 时才记录关键点，避免连续相同高度。
