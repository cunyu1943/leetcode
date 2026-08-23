# [LCR 076. 数组中的第 K 个最大元素](https://leetcode.cn/problems/xx4gT2/)



## 一、题目描述

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。



**示例 1：**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2：**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 3
输出: 5
```

**提示：**

- `1 <= k <= nums.length <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`



## 二、解答方法

### 2.1 方法一：快速选择（Quick Select）

1. **思路**

利用快速排序的 partition 思想：随机选枢轴，把数组分成「大于枢轴」与「小于枢轴」两部分。设枢轴最终位置为 `p`：

- 若 `p == k-1`，返回 `nums[p]`；
- 若 `p > k-1`，只递归左半；
- 否则只递归右半。

期望时间 `O(n)`，最坏 `O(n²)`（随机化枢轴规避）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private Random rand = new Random();
    public int findKthLargest(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length - 1, k - 1);
    }
    private int quickSelect(int[] nums, int l, int r, int idx) {
        int pivot = nums[l + rand.nextInt(r - l + 1)];
        int i = l, j = r;
        while (i <= j) {
            while (nums[i] > pivot) i++;
            while (nums[j] < pivot) j--;
            if (i <= j) {
                int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
                i++; j--;
            }
        }
        if (l <= j && idx <= j) return quickSelect(nums, l, j, idx);
        if (i <= r && idx >= i) return quickSelect(nums, i, r, idx);
        return nums[idx];
    }
}
```

```python [Python]
import random


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def quick_select(l, r, idx):
            pivot = nums[random.randint(l, r)]
            i, j = l, r
            while i <= j:
                while nums[i] > pivot:
                    i += 1
                while nums[j] < pivot:
                    j -= 1
                if i <= j:
                    nums[i], nums[j] = nums[j], nums[i]
                    i += 1
                    j -= 1
            if l <= j and idx <= j:
                return quick_select(l, j, idx)
            if i <= r and idx >= i:
                return quick_select(i, r, idx)
            return nums[idx]

        return quick_select(0, len(nums) - 1, k - 1)
```

```cpp [C++]
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        return quickSelect(nums, 0, nums.size() - 1, k - 1);
    }
private:
    int quickSelect(vector<int>& nums, int l, int r, int idx) {
        int pivot = nums[l + rand() % (r - l + 1)];
        int i = l, j = r;
        while (i <= j) {
            while (nums[i] > pivot) i++;
            while (nums[j] < pivot) j--;
            if (i <= j) swap(nums[i++], nums[j--]);
        }
        if (l <= j && idx <= j) return quickSelect(nums, l, j, idx);
        if (i <= r && idx >= i) return quickSelect(nums, i, r, idx);
        return nums[idx];
    }
};
```

```go [Go]
func findKthLargest(nums []int, k int) int {
    var quickSelect func(l, r, idx int) int
    quickSelect = func(l, r, idx int) int {
        pivot := nums[l+rand.Intn(r-l+1)]
        i, j := l, r
        for i <= j {
            for nums[i] > pivot {
                i++
            }
            for nums[j] < pivot {
                j--
            }
            if i <= j {
                nums[i], nums[j] = nums[j], nums[i]
                i++
                j--
            }
        }
        if l <= j && idx <= j {
            return quickSelect(l, j, idx)
        }
        if i <= r && idx >= i {
            return quickSelect(i, r, idx)
        }
        return nums[idx]
    }
    return quickSelect(0, len(nums)-1, k-1)
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    const quickSelect = (l, r, idx) => {
        const pivot = nums[l + Math.floor(Math.random() * (r - l + 1))];
        let i = l, j = r;
        while (i <= j) {
            while (nums[i] > pivot) i++;
            while (nums[j] < pivot) j--;
            if (i <= j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++; j--;
            }
        }
        if (l <= j && idx <= j) return quickSelect(l, j, idx);
        if (i <= r && idx >= i) return quickSelect(i, r, idx);
        return nums[idx];
    };
    return quickSelect(0, nums.length - 1, k - 1);
};
```

```c [C]
#include <stdlib.h>

static void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

static int quickSelect(int* nums, int l, int r, int idx) {
    int pivot = nums[l + rand() % (r - l + 1)];
    int i = l, j = r;
    while (i <= j) {
        while (nums[i] > pivot) i++;
        while (nums[j] < pivot) j--;
        if (i <= j) { swap(&nums[i++], &nums[j--]); }
    }
    if (l <= j && idx <= j) return quickSelect(nums, l, j, idx);
    if (i <= r && idx >= i) return quickSelect(nums, i, r, idx);
    return nums[idx];
}

int findKthLargest(int* nums, int numsSize, int k) {
    return quickSelect(nums, 0, numsSize - 1, k - 1);
}
```

```ts [TypeScript]
function findKthLargest(nums: number[], k: number): number {
    const quickSelect = (l: number, r: number, idx: number): number => {
        const pivot = nums[l + Math.floor(Math.random() * (r - l + 1))];
        let i = l, j = r;
        while (i <= j) {
            while (nums[i] > pivot) i++;
            while (nums[j] < pivot) j--;
            if (i <= j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++; j--;
            }
        }
        if (l <= j && idx <= j) return quickSelect(l, j, idx);
        if (i <= r && idx >= i) return quickSelect(i, r, idx);
        return nums[idx];
    };
    return quickSelect(0, nums.length - 1, k - 1);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：期望 `O(n)`，最坏 `O(n²)`。
- **空间复杂度**：`O(log n)`，递归栈。

### 2.2 方法二：小顶堆

1. **思路**

维护大小为 `k` 的小顶堆，堆顶即第 `k` 大：遍历数组，堆未满入堆，否则比堆顶大则替换。时间 `O(n log k)`，空间 `O(k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int x : nums) {
            heap.offer(x);
            if (heap.size() > k) heap.poll();
        }
        return heap.peek();
    }
}
```

```python [Python]
import heapq


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        for x in nums:
            heapq.heappush(heap, x)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]
```

```cpp [C++]
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> heap;
        for (int x : nums) {
            heap.push(x);
            if ((int)heap.size() > k) heap.pop();
        }
        return heap.top();
    }
};
```

```go [Go]
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

func findKthLargest(nums []int, k int) int {
    h := &IntHeap{}
    for _, x := range nums {
        heap.Push(h, x)
        if h.Len() > k {
            heap.Pop(h)
        }
    }
    return (*h)[0]
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    const heap = [];
    const push = (v) => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
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
                if (l < heap.length && heap[l] < heap[m]) m = l;
                if (r < heap.length && heap[r] < heap[m]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const x of nums) {
        push(x);
        if (heap.length > k) pop();
    }
    return heap[0];
};
```

```c [C]
#include <stdlib.h>

typedef struct { int* data; int size; } Heap;

static void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

static void up(Heap* h, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (h->data[p] <= h->data[i]) break;
        swap(&h->data[p], &h->data[i]);
        i = p;
    }
}

static void down(Heap* h, int i) {
    int n = h->size;
    while (1) {
        int l = i * 2 + 1, r = i * 2 + 2, m = i;
        if (l < n && h->data[l] < h->data[m]) m = l;
        if (r < n && h->data[r] < h->data[m]) m = r;
        if (m == i) break;
        swap(&h->data[m], &h->data[i]);
        i = m;
    }
}

int findKthLargest(int* nums, int numsSize, int k) {
    Heap h;
    h.data = (int*)malloc((k + 1) * sizeof(int));
    h.size = 0;
    for (int i = 0; i < numsSize; i++) {
        if (h.size < k) {
            h.data[h.size] = nums[i];
            up(&h, h.size);
            h.size++;
        } else if (nums[i] > h.data[0]) {
            h.data[0] = nums[i];
            down(&h, 0);
        }
    }
    int res = h.data[0];
    free(h.data);
    return res;
}
```

```ts [TypeScript]
function findKthLargest(nums: number[], k: number): number {
    const heap: number[] = [];
    const push = (v: number) => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = i * 2 + 1, r = i * 2 + 2;
                let m = i;
                if (l < heap.length && heap[l] < heap[m]) m = l;
                if (r < heap.length && heap[r] < heap[m]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const x of nums) {
        push(x);
        if (heap.length > k) pop();
    }
    return heap[0];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log k)`。
- **空间复杂度**：`O(k)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 快速选择 | 期望 `O(n)` | `O(log n)` | 最优，推荐 |
| 小顶堆 | `O(n log k)` | `O(k)` | 实现简单 |

求第 k 大元素，快速选择通过只递归一侧达到期望线性时间；小顶堆则始终维护「前 k 大」，堆顶即答案，二者都是高频解法。

