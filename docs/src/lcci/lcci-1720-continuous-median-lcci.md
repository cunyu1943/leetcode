# [面试题 17.20. 连续中值](https://leetcode.cn/problems/continuous-median-lcci/)

## 一、题目描述

随机产生数字并传入某个方法。每当接收到新数字时，找出当前所有已接收数字的中位数，并返回。中位数是指：有序数字列表中位于中间的数。若数字个数为偶数，则中位数为中间两个数的平均值。

**示例：**

```
输入: [5,2,3,4,1,6,0,7,8,9,10]
输出: [5,3,3,3,3,3,3,4,4,4,5]
```

**说明：** 依次在处理每个数时返回当前中位数。

---

## 二、解答方法

### 2.1 方法一：双堆（大顶堆 + 小顶堆）

**1. 思路**

维护两个堆：左半部分用大顶堆 `low`（存较小一半），右半部分用小顶堆 `high`（存较大一半），保证 `low.size() == high.size()` 或 `low.size() == high.size() + 1`。插入时根据大小平衡两堆；中位数即 `low.peek()`（奇数）或两堆顶均值（偶数）。

**2. 代码实现**

::::::: code-group

```java [Java]
class MedianFinder {
    PriorityQueue<Integer> low = new PriorityQueue<>((a, b) -> b - a);
    PriorityQueue<Integer> high = new PriorityQueue<>();
    public void addNum(int num) {
        low.offer(num);
        high.offer(low.poll());
        if (low.size() < high.size()) low.offer(high.poll());
    }
    public double findMedian() {
        return low.size() > high.size() ? low.peek() : (low.peek() + high.peek()) / 2.0;
    }
}
```

```python [Python]
class MedianFinder:
    def __init__(self):
        import heapq
        self.low = []   # 大顶堆（取负）
        self.high = []  # 小顶堆
    def addNum(self, num: int) -> None:
        import heapq
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.low) < len(self.high):
            heapq.heappush(self.low, -heapq.heappop(self.high))
    def findMedian(self) -> float:
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2.0
```

```go [Go]
type MedianFinder struct {
    low  []int // 大顶
    high []int // 小顶
}
func (m *MedianFinder) pushLow(x int) { m.low = append(m.low, x); i := len(m.low)-1; for i>0 { p:=(i-1)/2; if m.low[p]>=m.low[i]{break}; m.low[p],m.low[i]=m.low[i],m.low[p]; i=p } }
func (m *MedianFinder) popLow() int { top:=m.low[0]; m.low[0]=m.low[len(m.low)-1]; m.low=m.low[:len(m.low)-1]; i:=0; for { l,r,n:=2*i+1,2*i+2,i; if l<len(m.low)&&m.low[l]>m.low[n]{n=l}; if r<len(m.low)&&m.low[r]>m.low[n]{n=r}; if n==i{break}; m.low[n],m.low[i]=m.low[i],m.low[n]; i=n } ; return top }
func (m *MedianFinder) pushHigh(x int) { m.high = append(m.high, x); i := len(m.high)-1; for i>0 { p:=(i-1)/2; if m.high[p]<=m.high[i]{break}; m.high[p],m.high[i]=m.high[i],m.high[p]; i=p } }
func (m *MedianFinder) popHigh() int { top:=m.high[0]; m.high[0]=m.high[len(m.high)-1]; m.high=m.high[:len(m.high)-1]; i:=0; for { l,r,n:=2*i+1,2*i+2,i; if l<len(m.high)&&m.high[l]<m.high[n]{n=l}; if r<len(m.high)&&m.high[r]<m.high[n]{n=r}; if n==i{break}; m.high[n],m.high[i]=m.high[i],m.high[n]; i=n }; return top }
func (m *MedianFinder) AddNum(num int) {
    m.pushLow(num)
    m.pushHigh(m.popLow())
    if len(m.low) < len(m.high) { m.pushLow(m.popHigh()) }
}
func (m *MedianFinder) FindMedian() float64 {
    if len(m.low) > len(m.high) { return float64(m.low[0]) }
    return float64(m.low[0]+m.high[0]) / 2.0
}
```

```c [C]
// 双堆在 C 中实现较长，逻辑同上：大顶堆存较小半，小顶堆存较大半，实时平衡
```

```cpp [C++]
class MedianFinder {
    priority_queue<int> low;
    priority_queue<int, vector<int>, greater<int>> high;
public:
    void addNum(int num) {
        low.push(num);
        high.push(low.top()); low.pop();
        if (low.size() < high.size()) { low.push(high.top()); high.pop(); }
    }
    double findMedian() {
        return low.size() > high.size() ? low.top() : (low.top() + high.top()) / 2.0;
    }
};
```

```javascript [JavaScript]
var MedianFinder = function() {
    this.low = []; this.high = [];
};
MedianFinder.prototype.pushLow = function(x){ this.low.push(x); let i=this.low.length-1; while(i>0){const p=(i-1)>>1; if(this.low[p]>=this.low[i])break; [this.low[p],this.low[i]]=[this.low[i],this.low[p]]; i=p;} };
MedianFinder.prototype.popLow = function(){ const top=this.low[0]; this.low[0]=this.low.pop(); let i=0; while(true){let l=2*i+1,r=2*i+2,n=i; if(l<this.low.length&&this.low[l]>this.low[n])n=l; if(r<this.low.length&&this.low[r]>this.low[n])n=r; if(n===i)break; [this.low[n],this.low[i]]=[this.low[i],this.low[n]]; i=n;} return top; };
MedianFinder.prototype.pushHigh = function(x){ this.high.push(x); let i=this.high.length-1; while(i>0){const p=(i-1)>>1; if(this.high[p]<=this.high[i])break; [this.high[p],this.high[i]]=[this.high[i],this.high[p]]; i=p;} };
MedianFinder.prototype.popHigh = function(){ const top=this.high[0]; this.high[0]=this.high.pop(); let i=0; while(true){let l=2*i+1,r=2*i+2,n=i; if(l<this.high.length&&this.high[l]<this.high[n])n=l; if(r<this.high.length&&this.high[r]<this.high[n])n=r; if(n===i)break; [this.high[n],this.high[i]]=[this.high[i],this.high[n]]; i=n;} return top; };
MedianFinder.prototype.addNum = function(num){ this.pushLow(num); this.pushHigh(this.popLow()); if(this.low.length<this.high.length){ this.pushLow(this.popHigh()); } };
MedianFinder.prototype.findMedian = function(){ return this.low.length>this.high.length ? this.low[0] : (this.low[0]+this.high[0])/2; };
```

```typescript [TypeScript]
class MedianFinder {
    private low: number[] = []; private high: number[] = [];
    private pushLow(x: number){ this.low.push(x); let i=this.low.length-1; while(i>0){const p=(i-1)>>1; if(this.low[p]>=this.low[i])break; [this.low[p],this.low[i]]=[this.low[i],this.low[p]]; i=p;} }
    private popLow(){ const top=this.low[0]; this.low[0]=this.low.pop()!; let i=0; while(true){let l=2*i+1,r=2*i+2,n=i; if(l<this.low.length&&this.low[l]>this.low[n])n=l; if(r<this.low.length&&this.low[r]>this.low[n])n=r; if(n===i)break; [this.low[n],this.low[i]]=[this.low[i],this.low[n]]; i=n;} return top; }
    private pushHigh(x: number){ this.high.push(x); let i=this.high.length-1; while(i>0){const p=(i-1)>>1; if(this.high[p]<=this.high[i])break; [this.high[p],this.high[i]]=[this.high[i],this.high[p]]; i=p;} }
    private popHigh(){ const top=this.high[0]; this.high[0]=this.high.pop()!; let i=0; while(true){let l=2*i+1,r=2*i+2,n=i; if(l<this.high.length&&this.high[l]<this.high[n])n=l; if(r<this.high.length&&this.high[r]<this.high[n])n=r; if(n===i)break; [this.high[n],this.high[i]]=[this.high[i],this.high[n]]; i=n;} return top; }
    addNum(num: number){ this.pushLow(num); this.pushHigh(this.popLow()); if(this.low.length<this.high.length){ this.pushLow(this.popHigh()); } }
    findMedian(): number { return this.low.length>this.high.length ? this.low[0] : (this.low[0]+this.high[0])/2; }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`addNum` `O(log n)`，`findMedian` `O(1)`。
- **空间复杂度**：`O(n)`。

---

### 2.2 方法二：有序数组插入（简单）

**1. 思路**

用有序列表保存所有数字，插入时二分定位保持有序，查询时直接取下标中点。实现最简单，插入为 `O(n)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class MedianFinder {
    List<Integer> list = new ArrayList<>();
    public void addNum(int num) {
        int i = Collections.binarySearch(list, num);
        if (i < 0) i = -i - 1;
        list.add(i, num);
    }
    public double findMedian() {
        int n = list.size();
        return n % 2 == 1 ? list.get(n / 2) : (list.get(n / 2 - 1) + list.get(n / 2)) / 2.0;
    }
}
```

```python [Python]
class MedianFinder:
    def __init__(self):
        self.nums = []
    def addNum(self, num: int) -> None:
        import bisect
        bisect.insort(self.nums, num)
    def findMedian(self) -> float:
        n = len(self.nums)
        return self.nums[n // 2] if n % 2 else (self.nums[n//2-1] + self.nums[n//2]) / 2.0
```

```cpp [C++]
class MedianFinder {
    vector<int> nums;
public:
    void addNum(int num) {
        nums.insert(lower_bound(nums.begin(), nums.end(), num), num);
    }
    double findMedian() {
        int n = nums.size();
        return n % 2 ? nums[n/2] : (nums[n/2-1] + nums[n/2]) / 2.0;
    }
};
```

```javascript [JavaScript]
var MedianFinder = function() { this.nums = []; };
MedianFinder.prototype.addNum = function(num) {
    let i = 0; while (i < this.nums.length && this.nums[i] < num) i++;
    this.nums.splice(i, 0, num);
};
MedianFinder.prototype.findMedian = function() {
    const n = this.nums.length;
    return n % 2 ? this.nums[(n-1)/2] : (this.nums[n/2-1] + this.nums[n/2]) / 2;
};
```

```typescript [TypeScript]
class MedianFinder {
    private nums: number[] = [];
    addNum(num: number): void {
        let i = 0; while (i < this.nums.length && this.nums[i] < num) i++;
        this.nums.splice(i, 0, num);
    }
    findMedian(): number {
        const n = this.nums.length;
        return n % 2 ? this.nums[(n-1)/2] : (this.nums[n/2-1] + this.nums[n/2]) / 2;
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`addNum` `O(n)`，`findMedian` `O(1)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度 (add) | 空间复杂度 | 特点                       |
| -------------- | ---------------- | ---------- | -------------------------- |
| 双堆           | `O(log n)`       | `O(n)`     | 最优，推荐                 |
| 有序数组插入   | `O(n)`           | `O(n)`     | 简单，数据少可用           |

**推荐**：连续数据流求中位数使用「大顶堆 + 小顶堆」双堆方案，插入 `O(log n)`。
