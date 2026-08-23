# [LCR 041. 数据流中的移动平均值](https://leetcode.cn/problems/qIsx9Y/)



## 一、题目描述

给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。

实现 `MovingAverage` 类：

- `MovingAverage(int size)` 用窗口大小 `size` 初始化对象。
- `double next(int val)` 返回滑动窗口里所有数字的平均值。



**示例 1：**

```
输入：
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
输出：
[null, 1.0, 5.5, 4.66667, 6.0]
解释：
MovingAverage movingAverage = new MovingAverage(3);
movingAverage.next(1);   // 返回 1.0 = 1 / 1
movingAverage.next(10);  // 返回 5.5 = (1 + 10) / 2
movingAverage.next(3);   // 返回 4.66667 = (1 + 10 + 3) / 3
movingAverage.next(5);   // 返回 6.0 = (10 + 3 + 5) / 3
```

**提示：**

- `1 <= size <= 1000`
- `-10⁵ <= val <= 10⁵`
- 最多调用 `next` 方法 `10⁴` 次



## 二、解答方法

### 2.1 方法一：队列 + 滑动和

1. **思路**

- 用队列保存窗口内的数字，维护窗口内数字之和 `sum`；
- `next(val)` 时：入队 `val`、`sum += val`；若队列长度超过 `size`，出队队首并 `sum -= 队首值`；
- 返回 `sum / 队列长度`。

时间 `O(1)`，空间 `O(size)`。

2. **代码实现**

::::::: code-group

```java [Java]
class MovingAverage {
    private Deque<Integer> q;
    private int size;
    private double sum;

    public MovingAverage(int size) {
        this.size = size;
        q = new ArrayDeque<>();
    }

    public double next(int val) {
        q.offer(val);
        sum += val;
        if (q.size() > size) sum -= q.poll();
        return sum / q.size();
    }
}
```

```python [Python]
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.q = []
        self.sum = 0

    def next(self, val: int) -> float:
        self.q.append(val)
        self.sum += val
        if len(self.q) > self.size:
            self.sum -= self.q.pop(0)
        return self.sum / len(self.q)
```

```cpp [C++]
class MovingAverage {
    queue<int> q;
    int size;
    int sum;
public:
    MovingAverage(int size) : size(size), sum(0) {}

    double next(int val) {
        q.push(val);
        sum += val;
        if (q.size() > size) {
            sum -= q.front();
            q.pop();
        }
        return (double)sum / q.size();
    }
};
```

```go [Go]
type MovingAverage struct {
    q    []int
    size int
    sum  int
}

func Constructor(size int) MovingAverage {
    return MovingAverage{size: size}
}

func (ma *MovingAverage) Next(val int) float64 {
    ma.q = append(ma.q, val)
    ma.sum += val
    if len(ma.q) > ma.size {
        ma.sum -= ma.q[0]
        ma.q = ma.q[1:]
    }
    return float64(ma.sum) / float64(len(ma.q))
}
```

```js [JavaScript]
/**
 * @param {number} size
 */
var MovingAverage = function (size) {
    this.size = size;
    this.q = [];
    this.sum = 0;
};

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
    this.q.push(val);
    this.sum += val;
    if (this.q.length > this.size) {
        this.sum -= this.q.shift();
    }
    return this.sum / this.q.length;
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int* q;
    int head, tail;
    int size;
    int sum;
} MovingAverage;

MovingAverage* movingAverageCreate(int size) {
    MovingAverage* obj = (MovingAverage*)calloc(1, sizeof(MovingAverage));
    obj->q = (int*)malloc((size + 1) * sizeof(int));
    obj->size = size;
    return obj;
}

double movingAverageNext(MovingAverage* obj, int val) {
    obj->q[obj->tail++] = val;
    obj->sum += val;
    if (obj->tail - obj->head > obj->size) obj->sum -= obj->q[obj->head++];
    return (double)obj->sum / (obj->tail - obj->head);
}

void movingAverageFree(MovingAverage* obj) {
    free(obj->q);
    free(obj);
}
```

```ts [TypeScript]
class MovingAverage {
    private q: number[] = [];
    private size: number;
    private sum = 0;

    constructor(size: number) {
        this.size = size;
    }

    next(val: number): number {
        this.q.push(val);
        this.sum += val;
        if (this.q.length > this.size) {
            this.sum -= this.q.shift()!;
        }
        return this.sum / this.q.length;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`next` 为 `O(1)`（Python/JS 用 `pop(0)`/`shift()` 实际为 `O(n)`，可改用 `deque`/环形队列）。
- **空间复杂度**：`O(size)`。

## 三、总结

| 方法 | next 复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 队列 + 滑动和 | `O(1)` | `O(size)` | 标准做法，避免每次重新求和 |

维护「窗口内和」让平均值计算降为 `O(1)`，是滑动窗口求和类问题的通用优化。

