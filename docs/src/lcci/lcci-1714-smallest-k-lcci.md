# [面试题 17.14. 最小 K 个数](https://leetcode.cn/problems/smallest-k-lcci/)

## 一、题目描述

设计一个算法，找出数组中最小的 `k` 个数。以任意顺序返回这 `k` 个数均可。

**示例：**

```
输入: arr = [1,3,5,7,2,4,6,8], k = 4
输出: [1,2,3,4]
```

**提示：**

- `0 <= len(arr) <= 100000`
- `0 <= k <= min(100000, len(arr))`

---

## 二、解答方法

### 2.1 方法一：大顶堆（大小为 k）

**1. 思路**

维护一个大小为 `k` 的大顶堆。遍历数组，当堆未满时直接入堆；堆满时，若当前元素小于堆顶则弹出堆顶并入堆。遍历结束后堆中即为最小的 `k` 个数。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] smallestK(int[] arr, int k) {
        if (k == 0) return new int[0];
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        for (int x : arr) {
            if (pq.size() < k) pq.offer(x);
            else if (x < pq.peek()) { pq.poll(); pq.offer(x); }
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = pq.poll();
        return res;
    }
}
```

```python [Python]
class Solution:
    def smallestK(self, arr: List[int], k: int) -> List[int]:
        if k == 0:
            return []
        import heapq
        heap = []
        for x in arr:
            if len(heap) < k:
                heapq.heappush(heap, -x)
            elif x < -heap[0]:
                heapq.heapreplace(heap, -x)
        return [-x for x in heap]
```

```go [Go]
func smallestK(arr []int, k int) []int {
    if k == 0 { return []int{} }
    pq := make([]int, 0, k)
    for _, x := range arr {
        if len(pq) < k {
            pq = append(pq, x)
            up(pq, len(pq)-1)
        } else if x < pq[0] {
            pq[0] = x
            down(pq, 0)
        }
    }
    res := make([]int, k)
    copy(res, pq)
    return res
}
func up(h []int, i int) {
    for i > 0 {
        p := (i - 1) / 2
        if h[p] >= h[i] { break }
        h[p], h[i] = h[i], h[p]; i = p
    }
}
func down(h []int, i int) {
    n := len(h)
    for {
        l, r, m := 2*i+1, 2*i+2, i
        if l < n && h[l] > h[m] { m = l }
        if r < n && h[r] > h[m] { m = r }
        if m == i { break }
        h[m], h[i] = h[i], h[m]; i = m
    }
}
```

```c [C]
// 大顶堆在 C 中实现较长，逻辑同 Java：维护 k 大小大顶堆保留最小 k 个数
```

```cpp [C++]
class Solution {
public:
    vector<int> smallestK(vector<int>& arr, int k) {
        if (k == 0) return {};
        priority_queue<int> pq;
        for (int x : arr) {
            if (pq.size() < k) pq.push(x);
            else if (x < pq.top()) { pq.pop(); pq.push(x); }
        }
        vector<int> res;
        while (!pq.empty()) { res.push_back(pq.top()); pq.pop(); }
        return res;
    }
};
```

```javascript [JavaScript]
var smallestK = function(arr, k) {
    if (k === 0) return [];
    const pq = [];
    const push = (x) => {
        pq.push(x); let i = pq.length - 1;
        while (i > 0) { const p = (i-1)>>1; if (pq[p] >= pq[i]) break; [pq[p],pq[i]]=[pq[i],pq[p]]; i=p; }
    };
    const pop = () => {
        const top = pq[0]; pq[0] = pq.pop();
        let i = 0;
        while (true) {
            let l=2*i+1,r=2*i+2,m=i;
            if (l<pq.length&&pq[l]>pq[m]) m=l;
            if (r<pq.length&&pq[r]>pq[m]) m=r;
            if (m===i) break; [pq[m],pq[i]]=[pq[i],pq[m]]; i=m;
        }
        return top;
    };
    for (const x of arr) {
        if (pq.length < k) push(x);
        else if (x < pq[0]) { pop(); push(x); }
    }
    return pq;
};
```

```typescript [TypeScript]
function smallestK(arr: number[], k: number): number[] {
    if (k === 0) return [];
    const pq: number[] = [];
    const push = (x: number) => {
        pq.push(x); let i = pq.length - 1;
        while (i > 0) { const p = (i-1)>>1; if (pq[p] >= pq[i]) break; [pq[p],pq[i]]=[pq[i],pq[p]]; i=p; }
    };
    const pop = (): number => {
        const top = pq[0]; pq[0] = pq.pop()!;
        let i = 0;
        while (true) {
            let l=2*i+1,r=2*i+2,m=i;
            if (l<pq.length&&pq[l]>pq[m]) m=l;
            if (r<pq.length&&pq[r]>pq[m]) m=r;
            if (m===i) break; [pq[m],pq[i]]=[pq[i],pq[m]]; i=m;
        }
        return top;
    };
    for (const x of arr) {
        if (pq.length < k) push(x);
        else if (x < pq[0]) { pop(); push(x); }
    }
    return pq;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log k)`。
- **空间复杂度**：`O(k)`。

---

### 2.2 方法二：快速选择（QuickSelect）

**1. 思路**

利用快排 partition 思想，找到第 `k` 小的分界点，其左侧即为最小的 `k` 个数，平均 `O(n)`。注意需处理重复元素。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] smallestK(int[] arr, int k) {
        if (k == 0) return new int[0];
        quickSelect(arr, 0, arr.length - 1, k);
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = arr[i];
        return res;
    }
    private void quickSelect(int[] a, int l, int r, int k) {
        if (l >= r) return;
        int pivot = a[l + (r - l) / 2], i = l, j = r;
        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;
            if (i <= j) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }
        }
        if (k <= j - l + 1) quickSelect(a, l, j, k);
        else if (k > i - l) quickSelect(a, i, r, k - (i - l));
    }
}
```

```python [Python]
class Solution:
    def smallestK(self, arr: List[int], k: int) -> List[int]:
        if k == 0:
            return []
        def quick_select(a, l, r, k):
            if l >= r:
                return
            pivot = a[l + (r - l) // 2]
            i, j = l, r
            while i <= j:
                while a[i] < pivot: i += 1
                while a[j] > pivot: j -= 1
                if i <= j:
                    a[i], a[j] = a[j], a[i]; i += 1; j -= 1
            if k <= j - l + 1:
                quick_select(a, l, j, k)
            elif k > i - l:
                quick_select(a, i, r, k - (i - l))
        quick_select(arr, 0, len(arr) - 1, k)
        return arr[:k]
```

```cpp [C++]
class Solution {
public:
    vector<int> smallestK(vector<int>& arr, int k) {
        if (k == 0) return {};
        quickSelect(arr, 0, arr.size() - 1, k);
        return vector<int>(arr.begin(), arr.begin() + k);
    }
    void quickSelect(vector<int>& a, int l, int r, int k) {
        if (l >= r) return;
        int pivot = a[l + (r - l) / 2], i = l, j = r;
        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;
            if (i <= j) { swap(a[i], a[j]); i++; j--; }
        }
        if (k <= j - l + 1) quickSelect(a, l, j, k);
        else if (k > i - l) quickSelect(a, i, r, k - (i - l));
    }
};
```

```javascript [JavaScript]
var smallestK = function(arr, k) {
    if (k === 0) return [];
    const quickSelect = (a, l, r, k) => {
        if (l >= r) return;
        const pivot = a[l + ((r - l) >> 1)];
        let i = l, j = r;
        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;
            if (i <= j) { [a[i], a[j]] = [a[j], a[i]]; i++; j--; }
        }
        if (k <= j - l + 1) quickSelect(a, l, j, k);
        else if (k > i - l) quickSelect(a, i, r, k - (i - l));
    };
    quickSelect(arr, 0, arr.length - 1, k);
    return arr.slice(0, k);
};
```

```typescript [TypeScript]
function smallestK(arr: number[], k: number): number[] {
    if (k === 0) return [];
    const quickSelect = (a: number[], l: number, r: number, k: number): void => {
        if (l >= r) return;
        const pivot = a[l + ((r - l) >> 1)];
        let i = l, j = r;
        while (i <= j) {
            while (a[i] < pivot) i++;
            while (a[j] > pivot) j--;
            if (i <= j) { [a[i], a[j]] = [a[j], a[i]]; i++; j--; }
        }
        if (k <= j - l + 1) quickSelect(a, l, j, k);
        else if (k > i - l) quickSelect(a, i, r, k - (i - l));
    };
    quickSelect(arr, 0, arr.length - 1, k);
    return arr.slice(0, k);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：平均 `O(n)`，最坏 `O(n²)`。
- **空间复杂度**：`O(1)`（递归栈 `O(log n)`）。

---

## 三、总结

| 方法           | 时间复杂度    | 空间复杂度 | 特点                       |
| -------------- | ------------- | ---------- | -------------------------- |
| 大顶堆         | `O(n log k)`  | `O(k)`     | 稳定，推荐                 |
| 快速选择       | `O(n)`~`O(n²)`| `O(1)`     | 平均最快，最坏退化         |

**推荐**：使用大顶堆，实现稳定且适合数据流场景；对静态大数组可用快速选择。
