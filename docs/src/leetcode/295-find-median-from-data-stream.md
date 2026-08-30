# [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)

## 一、题目描述

中位数是有序整数列表中的中间值。如果列表大小为偶数，中位数则是两个中间值的平均值。

例如：

-   `[2,3,4]` 的中位数是 `3`；
-   `[2,3]` 的中位数是 `(2 + 3) / 2 = 2.5`。

设计一个支持以下两种操作的数据结构：

-   `void addNum(int num)`：从数据流中增加一个整数；
-   `double findMedian()`：返回目前所有元素的中位数。

**示例：**

```
输入：["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
     [[],[1],[2],[],[3],[]]
输出：[null,null,null,1.5,null,2.0]
```

**提示：** 最多调用 `50000` 次 `addNum` 和 `findMedian`，`addNum` 数字范围 `[-10⁵, 10⁵]`。

## 二、解答方法

### 方法一：双堆（大顶堆 + 小顶堆）

**思路：** 用两个堆维护「较小一半」和「较大一半」：

- `maxHeap`（大顶堆）存 **较小一半**（堆顶是这一半的最大值）；
- `minHeap`（小顶堆）存 **较大一半**（堆顶是这一半的最小值）；
- 维持 `maxHeap.size() == minHeap.size()` 或 `maxHeap.size() == minHeap.size() + 1`（奇数时中位数在 maxHeap 顶）。

`addNum` 时先入 `maxHeap` 再「平衡」：`maxHeap.top()` 超过 `minHeap.top()` 时把元素搬到 `minHeap`，保证两堆有序且大小均衡。最终中位数 = `maxHeap.size() > minHeap.size() ? maxHeap.top() : (maxHeap.top()+minHeap.top())/2`。

:::::: code-group

```java [Java]
class MedianFinder {
    private PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());          // 保证 maxHeap.top <= minHeap.top
        if (minHeap.size() > maxHeap.size())
            maxHeap.offer(minHeap.poll());       // 维持 maxHeap 多 0 或 1
    }
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}
```

```python [Python]
import heapq
class MedianFinder:
    def __init__(self):
        self.maxHeap = []    # 存负数 → 大顶堆
        self.minHeap = []
    def addNum(self, num: int) -> None:
        heapq.heappush(self.maxHeap, -num)
        heapq.heappush(self.minHeap, -heapq.heappop(self.maxHeap))
        if len(self.minHeap) > len(self.maxHeap):
            heapq.heappush(self.maxHeap, -heapq.heappop(self.minHeap))
    def findMedian(self) -> float:
        if len(self.maxHeap) > len(self.minHeap):
            return -self.maxHeap[0]
        return (-self.maxHeap[0] + self.minHeap[0]) / 2
```

```cpp [C++]
class MedianFinder {
    priority_queue<int> maxHeap;                              // 大顶堆
    priority_queue<int, vector<int>, greater<int>> minHeap;  // 小顶堆
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top()); maxHeap.pop();
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top()); minHeap.pop();
        }
    }
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};
```

```go [Go]
type MedianFinder struct {
    maxHeap *IntHeapMax  // 大顶堆
    minHeap *IntHeapMin  // 小顶堆
}
// （Go 实现需自定义 maxheap/minheap，逻辑同上：先入 max，平衡到 min，再按需搬回）
func (m *MedianFinder) addNum(num int) {
    heap.Push(m.maxHeap, num)
    heap.Push(m.minHeap, heap.Pop(m.maxHeap))
    if m.minHeap.Len() > m.maxHeap.Len() {
        heap.Push(m.maxHeap, heap.Pop(m.minHeap))
    }
}
func (m *MedianFinder) findMedian() float64 {
    if m.maxHeap.Len() > m.minHeap.Len() {
        return float64(m.maxHeap.heap[0])
    }
    return float64(m.maxHeap.heap[0]+m.minHeap.heap[0]) / 2.0
}
```

```js [JavaScript]
var MedianFinder = function () {
    this.maxHeap = [];   // 负数存大顶
    this.minHeap = [];   // 小顶
};
MedianFinder.prototype._pushMax = function (x) {
    this.maxHeap.push(-x); this._upMax();
};
MedianFinder.prototype._popMax = function () {
    const top = this.maxHeap[0]; this.maxHeap[0] = this.maxHeap.pop();
    this._downMax(0); return -top;
};
MedianFinder.prototype._upMax = function () {
    let i = this.maxHeap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (this.maxHeap[p] <= this.maxHeap[i]) break; [this.maxHeap[p], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[p]]; i = p; }
};
MedianFinder.prototype._downMax = function (i) {
    const n = this.maxHeap.length;
    while (true) { let l = 2*i+1, r = l+1, s = i; if (l < n && this.maxHeap[l] < this.maxHeap[s]) s = l; if (r < n && this.maxHeap[r] < this.maxHeap[s]) s = r; if (s === i) break; [this.maxHeap[i], this.maxHeap[s]] = [this.maxHeap[s], this.maxHeap[i]]; i = s; }
};
MedianFinder.prototype._pushMin = function (x) {
    this.minHeap.push(x); this._upMin();
};
MedianFinder.prototype._popMin = function () {
    const top = this.minHeap[0]; this.minHeap[0] = this.minHeap.pop(); this._downMin(0); return top;
};
MedianFinder.prototype._upMin = function () {
    let i = this.minHeap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (this.minHeap[p] <= this.minHeap[i]) break; [this.minHeap[p], this.minHeap[i]] = [this.minHeap[i], this.minHeap[p]]; i = p; }
};
MedianFinder.prototype._downMin = function (i) {
    const n = this.minHeap.length;
    while (true) { let l = 2*i+1, r = l+1, s = i; if (l < n && this.minHeap[l] < this.minHeap[s]) s = l; if (r < n && this.minHeap[r] < this.minHeap[s]) s = r; if (s === i) break; [this.minHeap[i], this.minHeap[s]] = [this.minHeap[s], this.minHeap[i]]; i = s; }
};
MedianFinder.prototype.addNum = function (num) {
    this._pushMax(num);
    this._pushMin(this._popMax());
    if (this.minHeap.length > this.maxHeap.length) this._pushMax(this._popMin());
};
MedianFinder.prototype.findMedian = function () {
    if (this.maxHeap.length > this.minHeap.length) return -this.maxHeap[0];
    return (-this.maxHeap[0] + this.minHeap[0]) / 2;
};
```

::::::

**复杂度：** `addNum` `O(log n)`，`findMedian` `O(1)`，空间 `O(n)`。

## 三、总结

双堆法是「动态中位数的标准解法」：大顶堆管左半、小顶堆管右半，始终保持两堆有序且大小差 ≤ 1。插入时先保证新元素进对堆（先入大顶再「溢出」到小顶，能保证大顶顶 ≤ 小顶顶），最后调平衡。求中位数 `O(1)`。

进阶（LeetCode 480 滑动窗口中位数）需支持删除，可用「延迟删除 + 双堆」或 `multiset`。本题是高频面试题，务必掌握双堆平衡逻辑。
