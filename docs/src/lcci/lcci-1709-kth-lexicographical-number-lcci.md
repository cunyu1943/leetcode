# [面试题 17.09. 第 k 个数](https://leetcode.cn/problems/get-kth-magic-number-lcci/)

## 一、题目描述

有些数的素因子只有 3、5、7，请设计一个算法，找出其中第 `k` 个数。注意，不是必须有这三个因子，例如 1 也算作第一个数（即 1 是第一个符合条件的数）。

**示例：**

```
输入: k = 5
输出: 9
解释: 符合条件的数为 1, 3, 5, 7, 9, 15, 21, ... 第 5 个是 9。
```

---

## 二、解答方法

### 2.1 方法一：三指针（丑数变种）

**1. 思路**

这类数可由 3、5、7 相乘得到。维护三个指针 `p3, p5, p7` 指向已生成序列，下一个候选为 `min(arr[p3]*3, arr[p5]*5, arr[p7]*7)`。谁被选中就把对应指针后移。初始 `arr[0] = 1`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int getKthMagicNumber(int k) {
        int[] arr = new int[k];
        arr[0] = 1;
        int p3 = 0, p5 = 0, p7 = 0;
        for (int i = 1; i < k; i++) {
            int v3 = arr[p3] * 3, v5 = arr[p5] * 5, v7 = arr[p7] * 7;
            int min = Math.min(v3, Math.min(v5, v7));
            arr[i] = min;
            if (min == v3) p3++;
            if (min == v5) p5++;
            if (min == v7) p7++;
        }
        return arr[k - 1];
    }
}
```

```python [Python]
class Solution:
    def getKthMagicNumber(self, k: int) -> int:
        arr = [1] * k
        p3 = p5 = p7 = 0
        for i in range(1, k):
            v3, v5, v7 = arr[p3] * 3, arr[p5] * 5, arr[p7] * 7
            arr[i] = min(v3, v5, v7)
            if arr[i] == v3: p3 += 1
            if arr[i] == v5: p5 += 1
            if arr[i] == v7: p7 += 1
        return arr[k - 1]
```

```go [Go]
func getKthMagicNumber(k int) int {
    arr := make([]int, k)
    arr[0] = 1
    p3, p5, p7 := 0, 0, 0
    for i := 1; i < k; i++ {
        v3, v5, v7 := arr[p3]*3, arr[p5]*5, arr[p7]*7
        m := v3
        if v5 < m { m = v5 }
        if v7 < m { m = v7 }
        arr[i] = m
        if m == v3 { p3++ }
        if m == v5 { p5++ }
        if m == v7 { p7++ }
    }
    return arr[k-1]
}
```

```c [C]
int getKthMagicNumber(int k) {
    int* arr = (int*)malloc(k * sizeof(int));
    arr[0] = 1;
    int p3 = 0, p5 = 0, p7 = 0;
    for (int i = 1; i < k; i++) {
        int v3 = arr[p3] * 3, v5 = arr[p5] * 5, v7 = arr[p7] * 7;
        int m = v3 < v5 ? (v3 < v7 ? v3 : v7) : (v5 < v7 ? v5 : v7);
        arr[i] = m;
        if (m == v3) p3++;
        if (m == v5) p5++;
        if (m == v7) p7++;
    }
    int res = arr[k - 1];
    free(arr);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    int getKthMagicNumber(int k) {
        vector<int> arr(k, 1);
        int p3 = 0, p5 = 0, p7 = 0;
        for (int i = 1; i < k; i++) {
            int v3 = arr[p3] * 3, v5 = arr[p5] * 5, v7 = arr[p7] * 7;
            int m = min({v3, v5, v7});
            arr[i] = m;
            if (m == v3) p3++;
            if (m == v5) p5++;
            if (m == v7) p7++;
        }
        return arr[k - 1];
    }
};
```

```javascript [JavaScript]
var getKthMagicNumber = function(k) {
    const arr = new Array(k).fill(1);
    let p3 = 0, p5 = 0, p7 = 0;
    for (let i = 1; i < k; i++) {
        const v3 = arr[p3] * 3, v5 = arr[p5] * 5, v7 = arr[p7] * 7;
        const m = Math.min(v3, v5, v7);
        arr[i] = m;
        if (m === v3) p3++;
        if (m === v5) p5++;
        if (m === v7) p7++;
    }
    return arr[k - 1];
};
```

```typescript [TypeScript]
function getKthMagicNumber(k: number): number {
    const arr = new Array(k).fill(1);
    let p3 = 0, p5 = 0, p7 = 0;
    for (let i = 1; i < k; i++) {
        const v3 = arr[p3] * 3, v5 = arr[p5] * 5, v7 = arr[p7] * 7;
        const m = Math.min(v3, v5, v7);
        arr[i] = m;
        if (m === v3) p3++;
        if (m === v5) p5++;
        if (m === v7) p7++;
    }
    return arr[k - 1];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(k)`。
- **空间复杂度**：`O(k)`。

---

### 2.2 方法二：最小堆（优先队列）

**1. 思路**

用最小堆维护候选数，每次弹出最小元素，并生成 `*3`、`*5`、`*7` 三个新候选入堆。用集合去重。弹出第 `k` 个即为答案。直观但常数较大。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int getKthMagicNumber(int k) {
        PriorityQueue<Long> pq = new PriorityQueue<>();
        Set<Long> seen = new HashSet<>();
        pq.offer(1L); seen.add(1L);
        long res = 1;
        int[] factors = {3, 5, 7};
        for (int i = 0; i < k; i++) {
            res = pq.poll();
            for (int f : factors) {
                long nxt = res * f;
                if (!seen.contains(nxt)) { seen.add(nxt); pq.offer(nxt); }
            }
        }
        return (int) res;
    }
}
```

```python [Python]
class Solution:
    def getKthMagicNumber(self, k: int) -> int:
        import heapq
        heap = [1]
        seen = {1}
        res = 1
        for _ in range(k):
            res = heapq.heappop(heap)
            for f in (3, 5, 7):
                nxt = res * f
                if nxt not in seen:
                    seen.add(nxt)
                    heapq.heappush(heap, nxt)
        return res
```

```cpp [C++]
class Solution {
public:
    int getKthMagicNumber(int k) {
        priority_queue<long, vector<long>, greater<long>> pq;
        unordered_set<long> seen;
        pq.push(1); seen.insert(1);
        long res = 1;
        int factors[] = {3, 5, 7};
        for (int i = 0; i < k; i++) {
            res = pq.top(); pq.pop();
            for (int f : factors) {
                long nxt = res * f;
                if (!seen.count(nxt)) { seen.insert(nxt); pq.push(nxt); }
            }
        }
        return (int) res;
    }
};
```

```javascript [JavaScript]
var getKthMagicNumber = function(k) {
    const heap = [1];
    const seen = new Set([1]);
    let res = 1;
    const push = (x) => {
        heap.push(x); let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        heap[0] = heap.pop();
        let i = 0;
        while (true) {
            let l = 2*i+1, r = 2*i+2, s = i;
            if (l < heap.length && heap[l] < heap[s]) s = l;
            if (r < heap.length && heap[r] < heap[s]) s = r;
            if (s === i) break;
            [heap[s], heap[i]] = [heap[i], heap[s]]; i = s;
        }
        return top;
    };
    for (let i = 0; i < k; i++) {
        res = pop();
        for (const f of [3, 5, 7]) {
            const nxt = res * f;
            if (!seen.has(nxt)) { seen.add(nxt); push(nxt); }
        }
    }
    return res;
};
```

```typescript [TypeScript]
function getKthMagicNumber(k: number): number {
    const heap: number[] = [1];
    const seen = new Set([1]);
    let res = 1;
    const push = (x: number) => {
        heap.push(x); let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        heap[0] = heap.pop()!;
        let i = 0;
        while (true) {
            let l = 2*i+1, r = 2*i+2, s = i;
            if (l < heap.length && heap[l] < heap[s]) s = l;
            if (r < heap.length && heap[r] < heap[s]) s = r;
            if (s === i) break;
            [heap[s], heap[i]] = [heap[i], heap[s]]; i = s;
        }
        return top;
    };
    for (let i = 0; i < k; i++) {
        res = pop();
        for (const f of [3, 5, 7]) {
            const nxt = res * f;
            if (!seen.has(nxt)) { seen.add(nxt); push(nxt); }
        }
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(k log k)`。
- **空间复杂度**：`O(k)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 三指针         | `O(k)`     | `O(k)`     | 最优，推荐                 |
| 最小堆         | `O(k log k)` | `O(k)`     | 直观，去重麻烦             |

**推荐**：使用三指针（丑数法），注意三个 `if` 都要判断以避免重复元素。
