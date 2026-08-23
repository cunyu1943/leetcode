# [LCR 060. 前 K 个高频元素](https://leetcode.cn/problems/g5c51o/)



## 一、题目描述

给定一个整数数组 `nums` 和一个整数 `k` ，请返回其中出现频率前 `k` 高的元素。可以按 **任意顺序** 返回答案。



**示例 1：**

```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

**示例 2：**

```
输入: nums = [1], k = 1
输出: [1]
```

**提示：**

- `1 <= nums.length <= 10⁵`
- `k` 的取值范围是 `[1, 数组中不相同的元素的个数]`
- 题目数据保证答案唯一，换句话说，数组中前 `k` 个高频元素的集合是唯一的



## 二、解答方法

### 2.1 方法一：哈希计数 + 小顶堆

1. **思路**

- 先统计每个元素出现次数（哈希表）；
- 用小顶堆维护「出现次数最多的 k 个元素」：遍历哈希表，堆未满则入堆；否则若当前频率大于堆顶频率，替换堆顶；
- 堆中元素即答案。

时间 `O(n log k)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) freq.put(x, freq.getOrDefault(x, 0) + 1);
        // 小顶堆：按频率升序
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> freq.get(a) - freq.get(b));
        for (int key : freq.keySet()) {
            heap.offer(key);
            if (heap.size() > k) heap.poll();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = heap.poll();
        return res;
    }
}
```

```python [Python]
import heapq


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = {}
        for x in nums:
            freq[x] = freq.get(x, 0) + 1
        heap = []
        for key, cnt in freq.items():
            heapq.heappush(heap, (cnt, key))
            if len(heap) > k:
                heapq.heappop(heap)
        return [key for _, key in heap]
```

```cpp [C++]
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> freq;
        for (int x : nums) freq[x]++;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> heap;
        for (auto& p : freq) {
            heap.push({p.second, p.first});
            if ((int)heap.size() > k) heap.pop();
        }
        vector<int> res;
        while (!heap.empty()) {
            res.push_back(heap.top().second);
            heap.pop();
        }
        return res;
    }
};
```

```go [Go]
func topKFrequent(nums []int, k int) []int {
    freq := map[int]int{}
    for _, x := range nums {
        freq[x]++
    }
    h := &pairHeap{}
    for key, cnt := range freq {
        heap.Push(h, pair{cnt, key})
        if h.Len() > k {
            heap.Pop(h)
        }
    }
    res := make([]int, 0, k)
    for h.Len() > 0 {
        res = append(res, heap.Pop(h).(pair).key)
    }
    return res
}

type pair struct {
    cnt int
    key int
}
type pairHeap []pair

func (h pairHeap) Len() int            { return len(h) }
func (h pairHeap) Less(i, j int) bool  { return h[i].cnt < h[j].cnt }
func (h pairHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *pairHeap) Push(x interface{}) { *h = append(*h, x.(pair)) }
func (h *pairHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const freq = new Map();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    // 小顶堆（按频率）
    const heap = [];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const [key, cnt] of freq) {
        push([cnt, key]);
        if (heap.length > k) pop();
    }
    return heap.map(([, key]) => key);
};
```

```c [C]
#include <stdlib.h>

typedef struct { int key; int cnt; } Pair;

// 小顶堆（按 cnt）
static void swap(Pair* a, Pair* b) { Pair t = *a; *a = *b; *b = t; }

static void up(Pair* heap, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (heap[p].cnt <= heap[i].cnt) break;
        swap(&heap[p], &heap[i]);
        i = p;
    }
}

static void down(Pair* heap, int n, int i) {
    while (1) {
        int l = i * 2 + 1, r = i * 2 + 2, m = i;
        if (l < n && heap[l].cnt < heap[m].cnt) m = l;
        if (r < n && heap[r].cnt < heap[m].cnt) m = r;
        if (m == i) break;
        swap(&heap[m], &heap[i]);
        i = m;
    }
}

int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    // 简易哈希统计频率（值范围 -10^4..10^4，偏移处理）
    int* freq = (int*)calloc(20005, sizeof(int));
    for (int i = 0; i < numsSize; i++) freq[nums[i] + 10000]++;
    Pair* heap = (Pair*)malloc((k + 1) * sizeof(Pair));
    int size = 0;
    for (int v = 0; v < 20005; v++) {
        if (freq[v] == 0) continue;
        if (size < k) {
            heap[size].key = v - 10000;
            heap[size].cnt = freq[v];
            up(heap, size);
            size++;
        } else if (freq[v] > heap[0].cnt) {
            heap[0].key = v - 10000;
            heap[0].cnt = freq[v];
            down(heap, size, 0);
        }
    }
    int* res = (int*)malloc(k * sizeof(int));
    for (int i = 0; i < k; i++) res[i] = heap[i].key;
    free(freq);
    free(heap);
    *returnSize = k;
    return res;
}
```

```ts [TypeScript]
function topKFrequent(nums: number[], k: number): number[] {
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    const heap: [number, number][] = [];
    const push = (item: [number, number]) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): [number, number] => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const [key, cnt] of freq) {
        push([cnt, key]);
        if (heap.length > k) pop();
    }
    return heap.map(([, key]) => key);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log k)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：桶排序（频率桶）

1. **思路**

- 统计频率后，按「频率」建桶：`bucket[i]` 存放出现次数为 `i` 的所有元素；
- 从最高频向下取，直到取满 k 个。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) freq.put(x, freq.getOrDefault(x, 0) + 1);
        List<Integer>[] bucket = new List[nums.length + 1];
        for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
            int cnt = e.getValue();
            if (bucket[cnt] == null) bucket[cnt] = new ArrayList<>();
            bucket[cnt].add(e.getKey());
        }
        int[] res = new int[k];
        int idx = 0;
        for (int i = nums.length; i >= 1 && idx < k; i--) {
            if (bucket[i] == null) continue;
            for (int key : bucket[i]) {
                res[idx++] = key;
                if (idx == k) break;
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = {}
        for x in nums:
            freq[x] = freq.get(x, 0) + 1
        bucket = [[] for _ in range(len(nums) + 1)]
        for key, cnt in freq.items():
            bucket[cnt].append(key)
        res = []
        for i in range(len(nums), 0, -1):
            res.extend(bucket[i])
            if len(res) >= k:
                return res[:k]
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> freq;
        for (int x : nums) freq[x]++;
        vector<vector<int>> bucket(nums.size() + 1);
        for (auto& p : freq) bucket[p.second].push_back(p.first);
        vector<int> res;
        for (int i = nums.size(); i >= 1 && res.size() < k; i--)
            for (int key : bucket[i]) {
                res.push_back(key);
                if ((int)res.size() == k) break;
            }
        return res;
    }
};
```

```go [Go]
func topKFrequent(nums []int, k int) []int {
    freq := map[int]int{}
    for _, x := range nums {
        freq[x]++
    }
    bucket := make([][]int, len(nums)+1)
    for key, cnt := range freq {
        bucket[cnt] = append(bucket[cnt], key)
    }
    res := make([]int, 0, k)
    for i := len(nums); i >= 1 && len(res) < k; i-- {
        for _, key := range bucket[i] {
            res = append(res, key)
            if len(res) == k {
                break
            }
        }
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const freq = new Map();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    const bucket = new Array(nums.length + 1).fill(null);
    for (const [key, cnt] of freq) {
        (bucket[cnt] || (bucket[cnt] = [])).push(key);
    }
    const res = [];
    for (let i = nums.length; i >= 1 && res.length < k; i--) {
        if (bucket[i]) {
            for (const key of bucket[i]) {
                res.push(key);
                if (res.length === k) break;
            }
        }
    }
    return res;
};
```

```c [C]
#include <stdlib.h>

int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    // 简易哈希统计频率
    int* freq = (int*)calloc(20005, sizeof(int));
    for (int i = 0; i < numsSize; i++) freq[nums[i] + 10000]++;
    // 频率桶（每个桶是链表，简单起见用数组存值，最多 100000 个元素）
    int** bucket = (int**)calloc(numsSize + 1, sizeof(int*));
    int* bucketCnt = (int*)calloc(numsSize + 1, sizeof(int));
    for (int v = 0; v < 20005; v++) {
        int c = freq[v];
        if (c == 0) continue;
        if (!bucket[c]) bucket[c] = (int*)malloc(100 * sizeof(int));
        bucket[c][bucketCnt[c]++] = v - 10000;
    }
    int* res = (int*)malloc(k * sizeof(int));
    int idx = 0;
    for (int i = numsSize; i >= 1 && idx < k; i--) {
        if (!bucket[i]) continue;
        for (int j = 0; j < bucketCnt[i] && idx < k; j++) res[idx++] = bucket[i][j];
    }
    free(freq);
    for (int i = 0; i <= numsSize; i++) if (bucket[i]) free(bucket[i]);
    free(bucket);
    free(bucketCnt);
    *returnSize = k;
    return res;
}
```

```ts [TypeScript]
function topKFrequent(nums: number[], k: number): number[] {
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    const bucket: number[][] = new Array(nums.length + 1).fill(null);
    for (const [key, cnt] of freq) {
        (bucket[cnt] || (bucket[cnt] = [])).push(key);
    }
    const res: number[] = [];
    for (let i = nums.length; i >= 1 && res.length < k; i--) {
        if (bucket[i]) {
            for (const key of bucket[i]) {
                res.push(key);
                if (res.length === k) break;
            }
        }
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，频率桶。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哈希 + 小顶堆 | `O(n log k)` | `O(n)` | 通用，适合任意 k |
| 频率桶 | `O(n)` | `O(n)` | 最优，频率有界时更快 |

「Top-K 频率」两种经典做法：小顶堆只保留前 k 个最高频；频率桶则利用「频率最大为 n」直接按频次收集，达到线性时间。

