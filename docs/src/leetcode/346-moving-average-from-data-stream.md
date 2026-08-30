# [346. 数据流中的移动平均值](https://leetcode.cn/problems/moving-average-from-data-stream/) [🔒 会员题]

## 一、题目描述

给定一个整数 `k`，设计数据结构 `MovingAverage`，支持 `next(val)`：把新元素加入流并返回 **最近 `k` 个元素的平均值**（不足 k 个时返回已加入元素的均值）。

**示例：**
```
输入：k = 3，调用 next(1),next(10),next(3),next(5)
输出：1.0, 5.5, 4.66667, 6.0
解释：最近3个：[1]→1, [1,10]→5.5, [1,10,3]→4.667, [10,3,5]→6.0
```

**提示：** `1 <= k <= 10⁴`，`0 <= val <= 10⁵`，最多 `10⁴` 次 `next`。

## 二、解答方法

### 方法一：队列 + 维护当前和

**思路：** 用队列存最近元素，维护 `sum`（窗口总和）。`next(val)`：`sum += val`，入队；若队列长度 > k，弹出队首并 `sum -= 队首`。平均值 = `sum / 队列长度`。避免每次重新求和平滑 `O(1)`。

:::::: code-group

```java [Java]
class MovingAverage {
    private Queue<Integer> q = new LinkedList<>();
    private int size, sum = 0;
    public MovingAverage(int size) { this.size = size; }
    public double next(int val) {
        sum += val; q.offer(val);
        if (q.size() > size) sum -= q.poll();
        return (double) sum / q.size();
    }
}
```

```python [Python]
class MovingAverage:
    def __init__(self, size: int):
        self.size = size; self.q = deque(); self.sum = 0
    def next(self, val: int) -> float:
        self.sum += val; self.q.append(val)
        if len(self.q) > self.size: self.sum -= self.q.popleft()
        return self.sum / len(self.q)
```

```cpp [C++]
class MovingAverage {
    queue<int> q; int size; long sum=0;
public:
    MovingAverage(int size): size(size) {}
    double next(int val) {
        sum += val; q.push(val);
        if (q.size() > size) { sum -= q.front(); q.pop(); }
        return (double) sum / q.size();
    }
};
```

```go [Go]
type MovingAverage struct { q []int; size, sum int }
func Constructor(size int) MovingAverage { return MovingAverage{size: size} }
func (m *MovingAverage) Next(val int) float64 {
    m.sum += val; m.q = append(m.q, val)
    if len(m.q) > m.size { m.sum -= m.q[0]; m.q = m.q[1:] }
    return float64(m.sum) / float64(len(m.q))
}
```

```js [JavaScript]
var MovingAverage = function (size) {
    this.size = size; this.q = []; this.sum = 0;
};
MovingAverage.prototype.next = function (val) {
    this.sum += val; this.q.push(val);
    if (this.q.length > this.size) this.sum -= this.q.shift();
    return this.sum / this.q.length;
};
```

::::::

**复杂度：** 每次 `next` `O(1)`，空间 `O(k)`。

## 三、总结

滑动窗口均值 = 队列 + 滚动和。核心是「进则加、出则减」，避免重复求和。`sum` 用 `long` 防溢出。是 `295 数据流中位数` 的兄弟题，都属于「流式数据结构」系列。注意不足 k 个时按实际长度算均值（题目要求）。
