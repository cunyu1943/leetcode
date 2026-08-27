# [面试题 10.10. 数字流的秩](https://leetcode.cn/problems/rank-from-stream-lcci/)

## 一、题目描述

想象你正在读取一串整数流。每隔一段时间，你希望找出已读取的数字中 rank（排名）为 `x` 的数字个数（即小于或者等于 `x` 的元素个数）。请实现一个数据结构，支持以下两种操作：

- `track(int x)`：将整数 `x` 加入流中。
- `getRankOfNumber(int x)`：返回流中小于或等于 `x` 的元素个数。

**示例：**

```
输入:
track(1)
track(2)
getRankOfNumber(1)  // 输出 1
getRankOfNumber(2)  // 输出 2
track(3)
getRankOfNumber(2)  // 输出 2
```

**提示：**

- `x` 的值在 `[0, 100000]` 范围内。
- 操作次数不超过 `2000` 次。

---

## 二、解答方法

### 2.1 方法一：数组 + 排序二分

**1. 思路**

用一个数组保存所有加入的数字。每次 `track` 时插入并保持有序（或插入后排序），`getRankOfNumber(x)` 用二分查找返回小于等于 `x` 的个数（即 `bisect_right`）。

**2. 代码实现**

::::::: code-group

```java [Java]
class StreamRank {
    private List<Integer> list = new ArrayList<>();

    public StreamRank() {}

    public void track(int x) {
        int i = Collections.binarySearch(list, x);
        if (i < 0) i = -i - 1;
        list.add(i, x);
    }

    public int getRankOfNumber(int x) {
        int i = Collections.binarySearch(list, x);
        if (i < 0) i = -i - 1;
        else { while (i + 1 < list.size() && list.get(i + 1) == x) i++; }
        return i + 1;
    }
}
```

```python [Python]
class StreamRank:
    def __init__(self):
        self.nums = []

    def track(self, x: int) -> None:
        import bisect
        bisect.insort(self.nums, x)

    def getRankOfNumber(self, x: int) -> int:
        import bisect
        return bisect.bisect_right(self.nums, x)
```

```go [Go]
type StreamRank struct {
    nums []int
}

func Constructor() StreamRank { return StreamRank{} }

func (this *StreamRank) Track(x int) {
    idx := sort.SearchInts(this.nums, x)
    this.nums = append(this.nums, 0)
    copy(this.nums[idx+1:], this.nums[idx:])
    this.nums[idx] = x
}

func (this *StreamRank) GetRankOfNumber(x int) int {
    return sort.SearchInts(this.nums, x+1)
}
```

```cpp [C++]
class StreamRank {
    vector<int> nums;
public:
    StreamRank() {}
    void track(int x) {
        nums.insert(lower_bound(nums.begin(), nums.end(), x), x);
    }
    int getRankOfNumber(int x) {
        return upper_bound(nums.begin(), nums.end(), x) - nums.begin();
    }
};
```

```javascript [JavaScript]
var StreamRank = function() {
    this.nums = [];
};

StreamRank.prototype.track = function(x) {
    let i = 0;
    while (i < this.nums.length && this.nums[i] < x) i++;
    this.nums.splice(i, 0, x);
};

StreamRank.prototype.getRankOfNumber = function(x) {
    let cnt = 0;
    for (const v of this.nums) if (v <= x) cnt++;
    return cnt;
};
```

```typescript [TypeScript]
class StreamRank {
    private nums: number[] = [];
    track(x: number): void {
        let i = 0;
        while (i < this.nums.length && this.nums[i] < x) i++;
        this.nums.splice(i, 0, x);
    }
    getRankOfNumber(x: number): number {
        let cnt = 0;
        for (const v of this.nums) if (v <= x) cnt++;
        return cnt;
    }
}
```
```c [C]
#include <stdlib.h>

typedef struct {
    int* nums;
    int size;
    int capacity;
} StreamRank;

StreamRank* streamRankCreate() {
    StreamRank* obj = (StreamRank*)malloc(sizeof(StreamRank));
    obj->capacity = 2000;
    obj->nums = (int*)malloc(obj->capacity * sizeof(int));
    obj->size = 0;
    return obj;
}

void streamRankTrack(StreamRank* obj, int x) {
    int i = 0;
    while (i < obj->size && obj->nums[i] < x) i++;
    for (int j = obj->size; j > i; j--) {
        obj->nums[j] = obj->nums[j - 1];
    }
    obj->nums[i] = x;
    obj->size++;
}

int streamRankGetRankOfNumber(StreamRank* obj, int x) {
    int cnt = 0;
    for (int i = 0; i < obj->size; i++) {
        if (obj->nums[i] <= x) cnt++;
        else break;
    }
    return cnt;
}
```


:::::::

**3. 复杂度分析**

- **时间复杂度**：`track` 插入 `O(n)`（数组位移）；`getRankOfNumber` 二分 `O(log n)`。
- **空间复杂度**：`O(n)`。

---

### 2.2 方法二：树状数组（Fenwick Tree）

**1. 思路**

`x` 范围有限（`[0, 100000]`），使用树状数组维护每个值的出现次数。`track(x)` 在位置 `x+1` 上加 1；`getRankOfNumber(x)` 求前缀和 `[0, x]`。所有操作 `O(log M)`，`M` 为值域上限。

**2. 代码实现**

::::::: code-group

```java [Java]
class StreamRank {
    private int[] bit = new int[100002];
    private int n = 100001;

    public StreamRank() {}

    private void add(int i, int v) {
        for (; i <= n; i += i & -i) bit[i] += v;
    }
    private int sum(int i) {
        int s = 0;
        for (; i > 0; i -= i & -i) s += bit[i];
        return s;
    }

    public void track(int x) { add(x + 1, 1); }
    public int getRankOfNumber(int x) { return sum(x + 1); }
}
```

```python [Python]
class StreamRank:
    def __init__(self):
        self.n = 100001
        self.bit = [0] * (self.n + 1)

    def _add(self, i, v):
        while i <= self.n:
            self.bit[i] += v
            i += i & -i

    def _sum(self, i):
        s = 0
        while i > 0:
            s += self.bit[i]
            i -= i & -i
        return s

    def track(self, x: int) -> None:
        self._add(x + 1, 1)

    def getRankOfNumber(self, x: int) -> int:
        return self._sum(x + 1)
```

```cpp [C++]
class StreamRank {
    vector<int> bit;
    int n = 100001;
public:
    StreamRank() : bit(n + 1, 0) {}
    void track(int x) {
        for (int i = x + 1; i <= n; i += i & -i) bit[i]++;
    }
    int getRankOfNumber(int x) {
        int s = 0;
        for (int i = x + 1; i > 0; i -= i & -i) s += bit[i];
        return s;
    }
};
```

```javascript [JavaScript]
var StreamRank = function() {
    this.n = 100001;
    this.bit = new Array(this.n + 1).fill(0);
};
StreamRank.prototype._add = function(i, v) {
    for (; i <= this.n; i += i & -i) this.bit[i] += v;
};
StreamRank.prototype._sum = function(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += this.bit[i];
    return s;
};
StreamRank.prototype.track = function(x) { this._add(x + 1, 1); };
StreamRank.prototype.getRankOfNumber = function(x) { return this._sum(x + 1); };
```

```typescript [TypeScript]
class StreamRank {
    private n = 100001;
    private bit = new Array(this.n + 1).fill(0);
    private add(i: number, v: number): void {
        for (; i <= this.n; i += i & -i) this.bit[i] += v;
    }
    private sum(i: number): number {
        let s = 0;
        for (; i > 0; i -= i & -i) s += this.bit[i];
        return s;
    }
    track(x: number): void { this.add(x + 1, 1); }
    getRankOfNumber(x: number): number { return this.sum(x + 1); }
}
```
```c [C]
#include <stdlib.h>

typedef struct {
    int* bit;
    int n;
} StreamRank;

StreamRank* streamRankCreate() {
    StreamRank* obj = (StreamRank*)malloc(sizeof(StreamRank));
    obj->n = 100001;
    obj->bit = (int*)calloc(obj->n + 1, sizeof(int));
    return obj;
}

void streamRankTrack(StreamRank* obj, int x) {
    for (int i = x + 1; i <= obj->n; i += i & -i) obj->bit[i]++;
}

int streamRankGetRankOfNumber(StreamRank* obj, int x) {
    int s = 0;
    for (int i = x + 1; i > 0; i -= i & -i) s += obj->bit[i];
    return s;
}
```


:::::::

**3. 复杂度分析**

- **时间复杂度**：`track` 与 `getRankOfNumber` 均为 `O(log M)`，`M = 100001`。
- **空间复杂度**：`O(M)`。

---

## 三、总结

| 方法           | 时间复杂度        | 空间复杂度 | 特点                         |
| -------------- | ----------------- | ---------- | ---------------------------- |
| 数组 + 二分    | `track O(n)`, `rank O(log n)` | `O(n)` | 实现简单，track 慢         |
| 树状数组       | `O(log M)`        | `O(M)`     | 全部操作高效，推荐           |

**推荐**：当操作频繁且值域有限（本题 ≤100000）时，使用树状数组可保证所有操作 `O(log M)`。
