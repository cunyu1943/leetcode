# [LCR 042. 最近的请求次数](https://leetcode.cn/problems/H8086Q/)



## 一、题目描述

写一个 `RecentCounter` 类来计算特定时间范围内最近的请求。

请你实现 `RecentCounter` 类：

- `RecentCounter()` 初始化计数器，请求数为 0 。
- `int ping(int t)` 在时间 `t` 添加一个新请求，其中 `t` 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 `[t-3000, t]` 内发生的请求数。

**保证** 每次调用 `ping` 所使用的时间 `t` 都 **严格递增** 且大于之前所有的 `t`。



**示例 1：**

```
输入：
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
输出：
[null, 1, 2, 3, 3]
解释：
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3
```

**提示：**

- `1 <= t <= 10⁹`
- 保证每次 `ping` 调用所使用的 `t` 值都 **严格递增**
- 至多调用 `ping` 方法 `10⁴` 次



## 二、解答方法

### 2.1 方法一：单调队列（滑动窗口）

1. **思路**

因为时间 `t` 严格递增，队列天然有序。每次 `ping(t)`：

- 把 `t` 入队；
- 从队首弹出所有 `< t - 3000` 的过期请求；
- 返回队列长度。

每次入队、出队各一次，均摊 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class RecentCounter {
    private Deque<Integer> q;

    public RecentCounter() {
        q = new ArrayDeque<>();
    }

    public int ping(int t) {
        q.offer(t);
        while (q.peek() < t - 3000) q.poll();
        return q.size();
    }
}
```

```python [Python]
class RecentCounter:
    def __init__(self):
        self.q = []

    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q and self.q[0] < t - 3000:
            self.q.pop(0)
        return len(self.q)
```

```cpp [C++]
class RecentCounter {
    queue<int> q;
public:
    RecentCounter() {}

    int ping(int t) {
        q.push(t);
        while (q.front() < t - 3000) q.pop();
        return q.size();
    }
};
```

```go [Go]
type RecentCounter struct {
    q []int
}

func Constructor() RecentCounter {
    return RecentCounter{}
}

func (rc *RecentCounter) Ping(t int) int {
    rc.q = append(rc.q, t)
    for len(rc.q) > 0 && rc.q[0] < t-3000 {
        rc.q = rc.q[1:]
    }
    return len(rc.q)
}
```

```js [JavaScript]
var RecentCounter = function () {
    this.q = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    this.q.push(t);
    while (this.q[0] < t - 3000) this.q.shift();
    return this.q.length;
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int* q;
    int head, tail;
} RecentCounter;

RecentCounter* recentCounterCreate() {
    RecentCounter* obj = (RecentCounter*)calloc(1, sizeof(RecentCounter));
    obj->q = (int*)malloc(10005 * sizeof(int));
    return obj;
}

int recentCounterPing(RecentCounter* obj, int t) {
    obj->q[obj->tail++] = t;
    while (obj->q[obj->head] < t - 3000) obj->head++;
    return obj->tail - obj->head;
}

void recentCounterFree(RecentCounter* obj) {
    free(obj->q);
    free(obj);
}
```

```ts [TypeScript]
class RecentCounter {
    private q: number[] = [];

    ping(t: number): number {
        this.q.push(t);
        while (this.q[0] < t - 3000) this.q.shift();
        return this.q.length;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`ping` 均摊 `O(1)`，每个请求进出队列一次。
- **空间复杂度**：`O(1)` 均摊，队列最多保留 3000ms 窗口内的请求。

## 三、总结

| 方法 | ping 复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 单调队列 | `O(1)` 均摊 | `O(窗口内)` | 标准做法 |

利用「时间严格递增」保证队列有序，队首弹出过期请求即可维护 3000ms 滑动窗口，是队列应用的经典例题。

