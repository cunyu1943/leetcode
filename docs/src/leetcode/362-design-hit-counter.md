# [362. 敲击计数器](https://leetcode.cn/problems/design-hit-counter/) [🔒 会员题]

## 一、题目描述

设计一个敲击计数器 `HitCounter`，支持：
- `hit(timestamp)`：在 `timestamp` 时刻记录一次点击；
- `getHits(timestamp)`：返回 **过去 5 分钟（300 秒）内** 的点击数（即 `timestamp-300 < t <= timestamp`）。

**示例：**
```
hit(1);hit(2);hit(3);getHits(4) → 3
getHits(300) → 3
hit(301); getHits(301) → 4（1,2,3 仍在 300 秒内？301-300=1，1 仍 >=1 保留 → 实际 [1,2,3,301] 都算）
getHits(302) → 3（时刻1过期）
```

**提示：** `1 <= timestamp <= 10⁹`，调用按时间非递减，最多 `3×10⁴` 次。

## 二、解答方法

### 方法一：队列存时间戳

**思路：** 用队列存每次 `hit` 的时间戳。`getHits(t)` 时，从队首弹出所有 `< t-300` 的过期时间戳（窗口 `>= 300` 即 `> t-300` 才保留，等价 `t - ts <= 300`），返回队列长度。

:::::: code-group

```java [Java]
class HitCounter {
    private Queue<Integer> q = new LinkedList<>();
    public void hit(int timestamp) { q.offer(timestamp); }
    public int getHits(int timestamp) {
        while (!q.isEmpty() && q.peek() <= timestamp - 300) q.poll();
        return q.size();
    }
}
```

```python [Python]
class HitCounter:
    def __init__(self):
        self.q = deque()
    def hit(self, timestamp: int) -> None:
        self.q.append(timestamp)
    def getHits(self, timestamp: int) -> int:
        while self.q and self.q[0] <= timestamp - 300: self.q.popleft()
        return len(self.q)
```

```cpp [C++]
class HitCounter {
    queue<int> q;
public:
    void hit(int timestamp) { q.push(timestamp); }
    int getHits(int timestamp) {
        while(!q.empty() && q.front() <= timestamp - 300) q.pop();
        return q.size();
    }
};
```

```go [Go]
type HitCounter struct { q []int }
func Constructor() HitCounter { return HitCounter{} }
func (h *HitCounter) Hit(timestamp int) { h.q = append(h.q, timestamp) }
func (h *HitCounter) GetHits(timestamp int) int {
    for len(h.q) > 0 && h.q[0] <= timestamp-300 { h.q = h.q[1:] }
    return len(h.q)
}
```

```js [JavaScript]
var HitCounter = function () { this.q = []; };
HitCounter.prototype.hit = function (timestamp) { this.q.push(timestamp); };
HitCounter.prototype.getHits = function (timestamp) {
    while (this.q.length && this.q[0] <= timestamp - 300) this.q.shift();
    return this.q.length;
};
```

::::::

### 方法二：循环数组（O(1) 均摊，省空间）

**思路：** 用长度 300 的环形数组 `times[300]`、`hits[300]` 分别存某秒的命中数与时间戳。`hit(t)`：槽 `i=t%300`，若 `times[i]!=t` 则清零重记；`hits[i]++`、`times[i]=t`。`getHits(t)`：累加所有 `t-times[i] < 300` 的 `hits[i]`。

:::::: code-group

```java [Java]
class HitCounter {
    private int[] times = new int[300], hits = new int[300];
    public void hit(int timestamp) {
        int i = timestamp % 300;
        if (times[i] != timestamp) { times[i] = timestamp; hits[i] = 0; }
        hits[i]++;
    }
    public int getHits(int timestamp) {
        int total = 0;
        for (int i = 0; i < 300; i++)
            if (times[i] > timestamp - 300) total += hits[i];
        return total;
    }
}
```

```python [Python]
class HitCounter:
    def __init__(self):
        self.times = [0]*300; self.hits = [0]*300
    def hit(self, timestamp: int) -> None:
        i = timestamp % 300
        if self.times[i] != timestamp: self.times[i] = timestamp; self.hits[i] = 0
        self.hits[i] += 1
    def getHits(self, timestamp: int) -> int:
        return sum(self.hits[i] for i in range(300) if self.times[i] > timestamp-300)
```

```cpp [C++]
class HitCounter {
    int times[300]={0}, hits[300]={0};
public:
    void hit(int timestamp) {
        int i = timestamp % 300;
        if (times[i] != timestamp) { times[i]=timestamp; hits[i]=0; }
        hits[i]++;
    }
    int getHits(int timestamp) {
        int total=0;
        for(int i=0;i<300;i++) if(times[i]>timestamp-300) total+=hits[i];
        return total;
    }
};
```

```go [Go]
type HitCounter struct { times, hits [300]int }
func Constructor() HitCounter { return HitCounter{} }
func (h *HitCounter) Hit(timestamp int) {
    i := timestamp % 300
    if h.times[i] != timestamp { h.times[i] = timestamp; h.hits[i] = 0 }
    h.hits[i]++
}
func (h *HitCounter) GetHits(timestamp int) int {
    total := 0
    for i := 0; i < 300; i++ { if h.times[i] > timestamp-300 { total += h.hits[i] } }
    return total
}
```

```js [JavaScript]
var HitCounter = function () { this.times = new Array(300).fill(0); this.hits = new Array(300).fill(0); };
HitCounter.prototype.hit = function (timestamp) {
    const i = timestamp % 300;
    if (this.times[i] !== timestamp) { this.times[i] = timestamp; this.hits[i] = 0; }
    this.hits[i]++;
};
HitCounter.prototype.getHits = function (timestamp) {
    let total = 0;
    for (let i=0;i<300;i++) if (this.times[i] > timestamp-300) total += this.hits[i];
    return total;
};
```

::::::

**复杂度：** 队列法 `O(1)` 均摊（每个时间戳进出一次），空间 `O(N)`；环形数组 `O(1)`、空间 `O(300)`。

## 三、总结

滑动窗口计数 `O(1)` 两种实现：①队列（直观，自动过期）；②环形数组（固定 300 槽，时间戳取模，getHits 扫描全槽）。环形数组空间常数、适合高频。与 `359 日志限流`、`346 移动平均` 同属「流式时间窗口」。注意窗口判定 `> timestamp-300`（即间隔 ≤300 保留）。
