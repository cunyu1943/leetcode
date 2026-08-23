# [LCR 057. 存在重复元素 III](https://leetcode.cn/problems/7WqeDu/)



## 一、题目描述

给你一个整数数组 `nums` 和两个整数 `k` 和 `t` 。请你判断是否存在 **两个不同下标** `i` 和 `j`，使得 `abs(nums[i] - nums[j]) <= t` ，同时又满足 `abs(i - j) <= k` 。

如果存在则返回 `true`，不存在返回 `false`。



**示例 1：**

```
输入：nums = [1,2,3,1], k = 3, t = 0
输出：true
```

**示例 2：**

```
输入：nums = [1,0,1,1], k = 1, t = 2
输出：true
```

**示例 3：**

```
输入：nums = [1,5,9,1,5,9], k = 2, t = 3
输出：false
```

**提示：**

- `0 <= nums.length <= 2 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `0 <= k <= 10⁴`
- `0 <= t <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：桶分组（O(n)）

1. **思路**

把数值按「桶大小 `w = t + 1`」分组。同一桶内的任意两个数之差必然 `<= t`；同时只需检查相邻桶。

- 对 `nums[i]` 计算桶号 `id = floorDiv(num, w)`（注意负数向下取整）；
- 维护大小为 `k` 的滑动窗口：
  - 若当前数的桶已存在元素 → 返回 `true`；
  - 检查前一个桶 `id - 1` 与后一个桶 `id + 1` 中是否有元素与 `num` 之差 `<= t`；
  - 窗口满 `k` 时移除最左元素 `nums[i-k]` 所在的桶。

时间 `O(n)`，空间 `O(k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        if (nums.length == 0 || t < 0) return false;
        long w = (long) t + 1;
        Map<Long, Long> bucket = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            long id = Math.floorDiv((long) nums[i], w);
            if (bucket.containsKey(id)) return true;
            if (bucket.containsKey(id - 1) && Math.abs(nums[i] - bucket.get(id - 1)) <= t) return true;
            if (bucket.containsKey(id + 1) && Math.abs(nums[i] - bucket.get(id + 1)) <= t) return true;
            bucket.put(id, (long) nums[i]);
            if (i >= k) bucket.remove(Math.floorDiv((long) nums[i - k], w));
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        if t < 0:
            return False
        w = t + 1
        bucket = {}
        for i, x in enumerate(nums):
            b = x // w
            if b in bucket:
                return True
            if b - 1 in bucket and abs(x - bucket[b - 1]) <= t:
                return True
            if b + 1 in bucket and abs(x - bucket[b + 1]) <= t:
                return True
            bucket[b] = x
            if i >= k:
                del bucket[nums[i - k] // w]
        return False
```

```cpp [C++]
class Solution {
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
        if (nums.empty() || t < 0) return false;
        long long w = (long long)t + 1;
        unordered_map<long long, long long> bucket;
        for (int i = 0; i < nums.size(); i++) {
            long long id = floorDiv(nums[i], w);
            if (bucket.count(id)) return true;
            if (bucket.count(id - 1) && llabs((long long)nums[i] - bucket[id - 1]) <= t) return true;
            if (bucket.count(id + 1) && llabs((long long)nums[i] - bucket[id + 1]) <= t) return true;
            bucket[id] = nums[i];
            if (i >= k) bucket.erase(floorDiv(nums[i - k], w));
        }
        return false;
    }
private:
    long long floorDiv(long long a, long long b) {
        long long q = a / b;
        if (a % b != 0 && a < 0) q--;
        return q;
    }
};
```

```go [Go]
func containsNearbyAlmostDuplicate(nums []int, k int, t int) bool {
    if len(nums) == 0 || t < 0 {
        return false
    }
    w := int64(t) + 1
    bucket := map[int64]int64{}
    floorDiv := func(a int64) int64 {
        q := a / w
        if a%w != 0 && a < 0 {
            q--
        }
        return q
    }
    abs := func(x int64) int64 {
        if x < 0 {
            return -x
        }
        return x
    }
    for i, x := range nums {
        id := floorDiv(int64(x))
        if _, ok := bucket[id]; ok {
            return true
        }
        if v, ok := bucket[id-1]; ok && abs(int64(x)-v) <= int64(t) {
            return true
        }
        if v, ok := bucket[id+1]; ok && abs(int64(x)-v) <= int64(t) {
            return true
        }
        bucket[id] = int64(x)
        if i >= k {
            delete(bucket, floorDiv(int64(nums[i-k])))
        }
    }
    return false
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
    if (nums.length === 0 || t < 0) return false;
    const w = BigInt(t) + 1n;
    const bucket = new Map();
    const abs = (x) => (x < 0n ? -x : x);
    const floorDiv = (x) => {
        let q = x / w;
        if (x % w !== 0n && x < 0n) q--;
        return q;
    };
    for (let i = 0; i < nums.length; i++) {
        const x = BigInt(nums[i]);
        const id = floorDiv(x);
        if (bucket.has(id)) return true;
        const v1 = bucket.get(id - 1n);
        if (v1 !== undefined && abs(x - v1) <= BigInt(t)) return true;
        const v2 = bucket.get(id + 1n);
        if (v2 !== undefined && abs(x - v2) <= BigInt(t)) return true;
        bucket.set(id, x);
        if (i >= k) bucket.delete(floorDiv(BigInt(nums[i - k])));
    }
    return false;
};
```

```c [C]
#include <stdlib.h>

#define HSIZE 40003

typedef struct { long long key; long long val; int used; } Bucket;

static long long floorDivLL(long long a, long long w) {
    long long q = a / w;
    if (a % w != 0 && a < 0) q--;
    return q;
}

static long long absLL(long long x) {
    return x < 0 ? -x : x;
}

int containsNearbyAlmostDuplicate(int* nums, int numsSize, int k, int t) {
    if (numsSize == 0 || t < 0) return 0;
    long long w = (long long)t + 1;
    Bucket* ht = (Bucket*)calloc(HSIZE, sizeof(Bucket));
    for (int i = 0; i < numsSize; i++) {
        long long x = (long long)nums[i];
        long long id = floorDivLL(x, w);
        for (long long d = -1; d <= 1; d++) {
            long long cur = id + d;
            long long h = ((cur % HSIZE) + HSIZE) % HSIZE;
            while (ht[h].used && ht[h].key != cur) h = (h + 1) % HSIZE;
            if (ht[h].used && ht[h].key == cur) {
                if (d == 0 || absLL(x - ht[h].val) <= (long long)t) { free(ht); return 1; }
            }
        }
        long long h = ((id % HSIZE) + HSIZE) % HSIZE;
        while (ht[h].used && ht[h].key != id) h = (h + 1) % HSIZE;
        ht[h].used = 1; ht[h].key = id; ht[h].val = x;
        if (i >= k) {
            long long rid = floorDivLL((long long)nums[i - k], w);
            long long rh = ((rid % HSIZE) + HSIZE) % HSIZE;
            while (ht[rh].used && ht[rh].key != rid) rh = (rh + 1) % HSIZE;
            ht[rh].used = 0;
        }
    }
    free(ht);
    return 0;
}
```

```ts [TypeScript]
function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
    if (nums.length === 0 || t < 0) return false;
    const w = BigInt(t) + 1n;
    const bucket = new Map<bigint, bigint>();
    const floorDiv = (x: bigint): bigint => {
        let q = x / w;
        if (x % w !== 0n && x < 0n) q--;
        return q;
    };
    for (let i = 0; i < nums.length; i++) {
        const x = BigInt(nums[i]);
        const id = floorDiv(x);
        if (bucket.has(id)) return true;
        const v1 = bucket.get(id - 1n);
        if (v1 !== undefined && (x - v1 < 0n ? -(x - v1) : x - v1) <= BigInt(t)) return true;
        const v2 = bucket.get(id + 1n);
        if (v2 !== undefined && (x - v2 < 0n ? -(x - v2) : x - v2) <= BigInt(t)) return true;
        bucket.set(id, x);
        if (i >= k) bucket.delete(floorDiv(BigInt(nums[i - k])));
    }
    return false;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素常数次哈希操作。
- **空间复杂度**：`O(k)`，窗口内最多 k 个桶。

### 2.2 方法二：滑动窗口 + 有序集合（TreeSet）

1. **思路**

维护窗口内元素的有序集合，对每个新元素 `x`，用有序集合的 `ceiling(x - t)` 找到最小的 `>= x - t` 的元素，若它 `<= x + t` 则存在一对。窗口超过 `k` 时移除最左元素。时间 `O(n log k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        TreeSet<Long> set = new TreeSet<>();
        for (int i = 0; i < nums.length; i++) {
            Long ceil = set.ceiling((long) nums[i] - t);
            if (ceil != null && ceil <= (long) nums[i] + t) return true;
            set.add((long) nums[i]);
            if (i >= k) set.remove((long) nums[i - k]);
        }
        return false;
    }
}
```

```python [Python]
# Python 的 sortedcontainers 非标准库，这里用桶法为主。
# 若使用有序容器可参照 Java 思路；为便于运行，此处给出二分插入的 O(n^2) 朴素版。
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, min(i + k + 1, n)):
                if abs(nums[i] - nums[j]) <= t:
                    return True
        return False
```

```cpp [C++]
class Solution {
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
        set<long long> st;
        for (int i = 0; i < nums.size(); i++) {
            auto it = st.lower_bound((long long)nums[i] - t);
            if (it != st.end() && *it <= (long long)nums[i] + t) return true;
            st.insert(nums[i]);
            if (i >= k) st.erase(nums[i - k]);
        }
        return false;
    }
};
```

```go [Go]
// Go 标准库无有序集合，采用桶法（方法一）作为主解法。
func containsNearbyAlmostDuplicate(nums []int, k int, t int) bool {
    if len(nums) == 0 || t < 0 {
        return false
    }
    w := int64(t) + 1
    bucket := map[int64]int64{}
    floorDiv := func(a int64) int64 {
        q := a / w
        if a%w != 0 && a < 0 {
            q--
        }
        return q
    }
    abs := func(x int64) int64 {
        if x < 0 {
            return -x
        }
        return x
    }
    for i, x := range nums {
        id := floorDiv(int64(x))
        if _, ok := bucket[id]; ok {
            return true
        }
        if v, ok := bucket[id-1]; ok && abs(int64(x)-v) <= int64(t) {
            return true
        }
        if v, ok := bucket[id+1]; ok && abs(int64(x)-v) <= int64(t) {
            return true
        }
        bucket[id] = int64(x)
        if i >= k {
            delete(bucket, floorDiv(int64(nums[i-k])))
        }
    }
    return false
}
```

```js [JavaScript]
// JavaScript 无内置有序集合，采用桶法（方法一）为主解法。
// 方法二思路（有序集合 + ceiling）可参考 Java 实现。
var containsNearbyAlmostDuplicate = function (nums, k, t) {
    // 朴素 O(n^2) 版，便于理解
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n && j <= i + k; j++) {
            if (Math.abs(nums[i] - nums[j]) <= t) return true;
        }
    }
    return false;
};
```

```c [C]
// C 语言沿用桶法（方法一）。
int containsNearbyAlmostDuplicate(int* nums, int numsSize, int k, int t);
```

```ts [TypeScript]
// TypeScript 无内置有序集合，采用桶法（方法一）为主解法。
// 方法二思路可参照 Java 的 TreeSet 实现。
function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n && j <= i + k; j++) {
            if (Math.abs(nums[i] - nums[j]) <= t) return true;
        }
    }
    return false;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log k)`，有序集合插入/查询 `O(log k)`。
- **空间复杂度**：`O(k)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 桶分组 | `O(n)` | `O(k)` | 最优，推荐 |
| 有序集合 | `O(n log k)` | `O(k)` | 思路直接，语言依赖 |

本题综合了「滑动窗口 + 值域约束」：桶法利用同桶必然满足 `<= t` 的性质在 `O(n)` 内求解；有序集合法则通过 `ceiling(x - t)` 快速查询候选。注意负数取整与 `t+1` 溢出需用 `long`/`BigInt`。

