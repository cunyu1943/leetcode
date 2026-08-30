# [220. 存在重复元素 III](https://leetcode.cn/problems/contains-duplicate-iii/) [🔒 会员题]



## 一、题目描述

给你一个整数数组 `nums` 和两个整数 `k` 和 `t` 。请你判断是否存在 **两个不同下标** `i` 和 `j`，使得 `abs(nums[i] - nums[j]) <= t` ，同时又满足 `abs(i - j) <= k` 。

如果存在则返回 `true`，不存在返回 `false`。



**示例 1：**

```
输入：nums = [1,2,3,1], k = 3, t = 0
输出：true
解释：nums[0] == nums[3]，值差 0 ≤ t，下标差 3 ≤ k。
```

**示例 2：**

```
输入：nums = [1,0,1,1], k = 1, t = 2
输出：true
解释：nums[0] == 1 与 nums[1] == 0，值差 1 ≤ t，下标差 1 ≤ k。
```

**示例 3：**

```
输入：nums = [1,5,9,1,5,9], k = 2, t = 3
输出：false
```

**提示：**

-   `0 <= nums.length <= 2 * 10⁴`
-   `-2³¹ <= nums[i] <= 2³¹ - 1`
-   `0 <= k <= 10⁴`
-   `0 <= t <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：桶排序（最优 O(n)）

1. **思路**

把数值按大小 `t + 1` 分桶：`bucketId = x // (t + 1)`（需处理负数，用地板除）。这样：

- **同一个桶内**的任意两数差必然 `≤ t`；
- **相邻桶**的数可能差 `≤ t`，需额外检查。

维护一个大小不超过 `k` 的滑动窗口（只保留最近 k 个元素的桶）。遍历时：

1. 若当前元素的桶已存在 → 找到，返回 true；
2. 检查左右相邻桶中的数与当前数的差是否 `≤ t`；
3. 把当前数放入桶，并移除下标 `i - k` 处的旧元素（保持窗口大小 k）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private long getBucketId(long x, long w) {
        return x >= 0 ? x / w : (x + 1) / w - 1;   // 地板除，兼容负数
    }

    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        if (t < 0 || k <= 0) return false;
        Map<Long, Long> buckets = new HashMap<>();
        long w = (long) t + 1;
        for (int i = 0; i < nums.length; i++) {
            long x = nums[i];
            long id = getBucketId(x, w);
            if (buckets.containsKey(id)) return true;              // 同桶必满足
            if (buckets.containsKey(id - 1) && x - buckets.get(id - 1) <= t) return true;
            if (buckets.containsKey(id + 1) && buckets.get(id + 1) - x <= t) return true;
            buckets.put(id, x);
            if (i >= k) {                                          // 维持窗口大小 k
                buckets.remove(getBucketId(nums[i - k], w));
            }
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        if t < 0 or k <= 0:
            return False
        w = t + 1
        buckets = {}
        def bucket_id(x):
            return x // w          # Python 的 // 对负数已是地板除

        for i, x in enumerate(nums):
            bid = bucket_id(x)
            if bid in buckets:
                return True
            if bid - 1 in buckets and x - buckets[bid - 1] <= t:
                return True
            if bid + 1 in buckets and buckets[bid + 1] - x <= t:
                return True
            buckets[bid] = x
            if i >= k:
                buckets.pop(bucket_id(nums[i - k]), None)
        return False
```

```go [Go]
func containsNearbyAlmostDuplicate(nums []int, k int, t int) bool {
    if t < 0 || k <= 0 {
        return false
    }
    w := int64(t) + 1
    buckets := make(map[int64]int64)
    bucketID := func(x int64) int64 {
        if x >= 0 {
            return x / w
        }
        return (x+1)/w - 1
    }
    for i, num := range nums {
        x := int64(num)
        id := bucketID(x)
        if _, ok := buckets[id]; ok {
            return true
        }
        if v, ok := buckets[id-1]; ok && x-v <= int64(t) {
            return true
        }
        if v, ok := buckets[id+1]; ok && v-x <= int64(t) {
            return true
        }
        buckets[id] = x
        if i >= k {
            delete(buckets, bucketID(int64(nums[i-k])))
        }
    }
    return false
}
```

```cpp [C++]
class Solution {
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
        if (t < 0 || k <= 0) return false;
        long long w = (long long)t + 1;
        unordered_map<long long, long long> buckets;
        auto bucketId = [&](long long x) {
            return x >= 0 ? x / w : (x + 1) / w - 1;
        };
        for (int i = 0; i < nums.size(); i++) {
            long long x = nums[i];
            long long id = bucketId(x);
            if (buckets.count(id)) return true;
            if (buckets.count(id - 1) && x - buckets[id - 1] <= t) return true;
            if (buckets.count(id + 1) && buckets[id + 1] - x <= t) return true;
            buckets[id] = x;
            if (i >= k) buckets.erase(bucketId(nums[i - k]));
        }
        return false;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
    if (t < 0 || k <= 0) return false;
    const w = BigInt(t) + 1n;
    const buckets = new Map();
    const bucketId = (x) => (x >= 0n ? x / w : (x + 1n) / w - 1n);
    const tt = BigInt(t);
    for (let i = 0; i < nums.length; i++) {
        const x = BigInt(nums[i]);
        const id = bucketId(x);
        if (buckets.has(id)) return true;
        if (buckets.has(id - 1n) && x - buckets.get(id - 1n) <= tt) return true;
        if (buckets.has(id + 1n) && buckets.get(id + 1n) - x <= tt) return true;
        buckets.set(id, x);
        if (i >= k) buckets.delete(bucketId(BigInt(nums[i - k])));
    }
    return false;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
    if (t < 0 || k <= 0) return false;
    const w = BigInt(t) + 1n;
    const buckets = new Map<bigint, bigint>();
    const bucketId = (x: bigint): bigint => (x >= 0n ? x / w : (x + 1n) / w - 1n);
    const tt = BigInt(t);
    for (let i = 0; i < nums.length; i++) {
        const x = BigInt(nums[i]);
        const id = bucketId(x);
        if (buckets.has(id)) return true;
        const left = buckets.get(id - 1n);
        if (left !== undefined && x - left <= tt) return true;
        const right = buckets.get(id + 1n);
        if (right !== undefined && right - x <= tt) return true;
        buckets.set(id, x);
        if (i >= k) buckets.delete(bucketId(BigInt(nums[i - k])));
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(k)`（桶中最多 k 个元素）。

### 2.2 方法二：滑动窗口 + 有序集合（TreeSet）

1. **思路**

维护大小为 `k` 的有序集合。对每个 `x`，在有序集合中查找 **大于等于 `x - t` 的最小值**（`ceiling`），若它 `≤ x + t` 则满足条件。窗口滑动时删除过期元素。

2. **代码实现（Python，用 sortedcontainers 或 bisect）**

```python
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        import bisect
        if t < 0 or k <= 0:
            return False
        window = []                       # 有序列表模拟 TreeSet
        for i, x in enumerate(nums):
            idx = bisect.bisect_left(window, x - t)
            if idx < len(window) and window[idx] <= x + t:
                return True
            bisect.insort(window, x)
            if i >= k:
                window.pop(bisect.bisect_left(window, nums[i - k]))
        return False
```

3. **复杂度分析**

- **时间复杂度**：`O(n log k)`（插入删除 `O(k)`，可接受）。
- **空间复杂度**：`O(k)`。

## 三、总结

| 方法 | 时间 | 特点 |
| ---- | ---- | ---- |
| 桶排序 | `O(n)` | 最优，推荐 |
| 有序集合 + 二分 | `O(n log k)` | 思路直观 |

桶排序法的精髓：桶宽设为 `t + 1`，保证 **同桶内任意两数差 ≤ t**，因此只需检查「同桶」与「相邻两桶」共 3 个位置即可。注意负数地板除的处理（Python `//` 天然地板除，Java/C++ 需 `(x+1)/w - 1`），以及用 `long`/`BigInt` 防止 `nums[i] + t` 溢出 int。
