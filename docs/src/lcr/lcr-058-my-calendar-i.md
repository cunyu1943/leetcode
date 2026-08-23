# [LCR 058. 我的日程安排表 I](https://leetcode.cn/problems/fi9suh/)



## 一、题目描述

请实现一个 `MyCalendar` 类来存放你的日程安排。如果要添加的时间内没有其他安排，则可以存储这个新的日程安排。

`MyCalendar` 有一个 `book(int start, int end)` 方法。它意味着在 `start` 到 `end` 时间内增加一个日程安排，注意，这里的时间是半开区间，即 `[start, end)`，实数 `x` 的范围为 `start <= x < end` 。

当两个日程安排有一些时间上的交叉时（例如两个日程安排都在同一时间内），就会产生冲突，返回 `false`。

如果没有冲突，则添加日程安排并返回 `true`。请保持该日历内部有序。



**示例 1：**

```
输入:
["MyCalendar","book","book","book"]
[[],[10,20],[15,25],[20,30]]
输出:
[null,true,false,true]
解释:
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // returns true
myCalendar.book(15, 25); // returns false ，两个日程安排不能同时安排在同一时间内
myCalendar.book(20, 30); // returns true ，时间 [20,30) 与 [10,20) 不相交
```

**提示：**

- 每个测试用例，`book` 函数的调用次数在 `[0, 1000]` 范围内
- `0 <= start < end <= 10⁹`



## 二、解答方法

### 2.1 方法一：有序集合（TreeMap 二分找相邻区间）

1. **思路**

维护按开始时间排序的区间集合。对 `[start, end)`：

- 找「开始时间 `< start` 的最大区间」（前驱），若它的结束时间 `> start` 则冲突；
- 找「开始时间 `>= start` 的最小区间」（后继），若它的开始时间 `< end` 则冲突；
- 均不冲突则插入 `[start, end)`。

Java 用 `TreeMap.floorEntry` / `ceilingEntry`，C++ 用 `map.lower_bound`。时间 `O(log n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class MyCalendar {
    private TreeMap<Integer, Integer> map;

    public MyCalendar() {
        map = new TreeMap<>();
    }

    public boolean book(int start, int end) {
        Map.Entry<Integer, Integer> prev = map.floorEntry(start);
        if (prev != null && prev.getValue() > start) return false;
        Map.Entry<Integer, Integer> next = map.ceilingEntry(start);
        if (next != null && next.getKey() < end) return false;
        map.put(start, end);
        return true;
    }
}
```

```python [Python]
from sortedcontainers import SortedDict  # 非标准库，LeetCode 支持


class MyCalendar:
    def __init__(self):
        self.map = SortedDict()

    def book(self, start: int, end: int) -> bool:
        i = self.map.bisect_right(start) - 1
        if i >= 0 and self.map.peekitem(i)[1] > start:
            return False
        if i + 1 < len(self.map) and self.map.peekitem(i + 1)[0] < end:
            return False
        self.map[start] = end
        return True
```

```cpp [C++]
class MyCalendar {
    map<int, int> mp;
public:
    MyCalendar() {}

    bool book(int start, int end) {
        auto it = mp.upper_bound(start);
        if (it != mp.end() && it->first < end) return false;
        if (it != mp.begin()) {
            auto prev = std::prev(it);
            if (prev->second > start) return false;
        }
        mp[start] = end;
        return true;
    }
};
```

```go [Go]
// Go 标准库无有序 Map，这里用「排序 + 二分」手动维护区间数组。
type MyCalendar struct {
    starts []int
    ends   []int
}

func Constructor() MyCalendar {
    return MyCalendar{}
}

func (mc *MyCalendar) Book(start int, end int) bool {
    // 二分找到第一个 start >= 当前 start 的位置
    idx := sort.SearchInts(mc.starts, start)
    if idx < len(mc.starts) && mc.starts[idx] < end {
        return false
    }
    if idx > 0 && mc.ends[idx-1] > start {
        return false
    }
    mc.starts = append(mc.starts, 0)
    mc.ends = append(mc.ends, 0)
    copy(mc.starts[idx+1:], mc.starts[idx:])
    copy(mc.ends[idx+1:], mc.ends[idx:])
    mc.starts[idx] = start
    mc.ends[idx] = end
    return true
}
```

```js [JavaScript]
// JavaScript 无内置有序集合，这里用数组 + 二分维护有序区间。
var MyCalendar = function () {
    this.starts = [];
    this.ends = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
    // 二分找第一个 starts >= start 的位置
    let l = 0, r = this.starts.length;
    while (l < r) {
        const m = (l + r) >> 1;
        if (this.starts[m] < start) l = m + 1;
        else r = m;
    }
    if (l < this.starts.length && this.starts[l] < end) return false;
    if (l > 0 && this.ends[l - 1] > start) return false;
    this.starts.splice(l, 0, start);
    this.ends.splice(l, 0, end);
    return true;
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int* starts;
    int* ends;
    int size;
    int cap;
} MyCalendar;

MyCalendar* myCalendarCreate() {
    MyCalendar* obj = (MyCalendar*)calloc(1, sizeof(MyCalendar));
    obj->cap = 16;
    obj->starts = (int*)malloc(obj->cap * sizeof(int));
    obj->ends = (int*)malloc(obj->cap * sizeof(int));
    return obj;
}

bool myCalendarBook(MyCalendar* obj, int start, int end) {
    int l = 0, r = obj->size;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (obj->starts[m] < start) l = m + 1;
        else r = m;
    }
    if (l < obj->size && obj->starts[l] < end) return false;
    if (l > 0 && obj->ends[l - 1] > start) return false;
    if (obj->size == obj->cap) {
        obj->cap *= 2;
        obj->starts = (int*)realloc(obj->starts, obj->cap * sizeof(int));
        obj->ends = (int*)realloc(obj->ends, obj->cap * sizeof(int));
    }
    for (int i = obj->size; i > l; i--) {
        obj->starts[i] = obj->starts[i - 1];
        obj->ends[i] = obj->ends[i - 1];
    }
    obj->starts[l] = start;
    obj->ends[l] = end;
    obj->size++;
    return true;
}

void myCalendarFree(MyCalendar* obj) {
    free(obj->starts);
    free(obj->ends);
    free(obj);
}
```

```ts [TypeScript]
class MyCalendar {
    private starts: number[] = [];
    private ends: number[] = [];

    book(start: number, end: number): boolean {
        let l = 0, r = this.starts.length;
        while (l < r) {
            const m = (l + r) >> 1;
            if (this.starts[m] < start) l = m + 1;
            else r = m;
        }
        if (l < this.starts.length && this.starts[l] < end) return false;
        if (l > 0 && this.ends[l - 1] > start) return false;
        this.starts.splice(l, 0, start);
        this.ends.splice(l, 0, end);
        return true;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`book` 为 `O(log n)`（有序集合/二分），插入有序数组最坏 `O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：线性扫描（朴素）

1. **思路**

用一个列表保存所有已预约区间。每次 `book` 遍历列表，检查 `[start, end)` 是否与某个区间相交：

```
不冲突条件：interval.end <= start 或 interval.start >= end
```

简单直观，`book` 为 `O(n)`，适合调用次数少的场景。

2. **代码实现**

::::::: code-group

```java [Java]
class MyCalendar {
    private List<int[]> books;

    public MyCalendar() {
        books = new ArrayList<>();
    }

    public boolean book(int start, int end) {
        for (int[] b : books) {
            if (b[0] < end && b[1] > start) return false;
        }
        books.add(new int[]{start, end});
        return true;
    }
}
```

```python [Python]
class MyCalendar:
    def __init__(self):
        self.books = []

    def book(self, start: int, end: int) -> bool:
        for s, e in self.books:
            if s < end and e > start:
                return False
        self.books.append((start, end))
        return True
```

```cpp [C++]
class MyCalendar {
    vector<pair<int, int>> books;
public:
    MyCalendar() {}

    bool book(int start, int end) {
        for (auto& b : books) {
            if (b.first < end && b.second > start) return false;
        }
        books.push_back({start, end});
        return true;
    }
};
```

```go [Go]
type MyCalendar struct {
    books [][]int
}

func Constructor() MyCalendar {
    return MyCalendar{}
}

func (mc *MyCalendar) Book(start int, end int) bool {
    for _, b := range mc.books {
        if b[0] < end && b[1] > start {
            return false
        }
    }
    mc.books = append(mc.books, []int{start, end})
    return true
}
```

```js [JavaScript]
var MyCalendar = function () {
    this.books = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
    for (const b of this.books) {
        if (b[0] < end && b[1] > start) return false;
    }
    this.books.push([start, end]);
    return true;
};
```

```c [C]
#include <stdlib.h>

typedef struct {
    int* starts;
    int* ends;
    int size;
    int cap;
} MyCalendar;

MyCalendar* myCalendarCreate() {
    MyCalendar* obj = (MyCalendar*)calloc(1, sizeof(MyCalendar));
    obj->cap = 16;
    obj->starts = (int*)malloc(obj->cap * sizeof(int));
    obj->ends = (int*)malloc(obj->cap * sizeof(int));
    return obj;
}

bool myCalendarBook(MyCalendar* obj, int start, int end) {
    for (int i = 0; i < obj->size; i++) {
        if (obj->starts[i] < end && obj->ends[i] > start) return false;
    }
    if (obj->size == obj->cap) {
        obj->cap *= 2;
        obj->starts = (int*)realloc(obj->starts, obj->cap * sizeof(int));
        obj->ends = (int*)realloc(obj->ends, obj->cap * sizeof(int));
    }
    obj->starts[obj->size] = start;
    obj->ends[obj->size] = end;
    obj->size++;
    return true;
}

void myCalendarFree(MyCalendar* obj) {
    free(obj->starts);
    free(obj->ends);
    free(obj);
}
```

```ts [TypeScript]
class MyCalendar {
    private books: number[][] = [];

    book(start: number, end: number): boolean {
        for (const b of this.books) {
            if (b[0] < end && b[1] > start) return false;
        }
        this.books.push([start, end]);
        return true;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`book` 为 `O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | book 复杂度 | 空间 | 特点 |
| ---- | ---------- | ---------- | ---------- |
| 有序集合二分 | `O(log n)` | `O(n)` | 高效，推荐 |
| 线性扫描 | `O(n)` | `O(n)` | 简单直观 |

判断区间重叠的核心条件：`两个区间相交 ⟺ b.start < end && b.end > start`。有序集合利用「前驱/后继」只检查两个最相关的区间即可判定冲突。

