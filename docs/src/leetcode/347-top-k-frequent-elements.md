# [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

## 一、题目描述

给定整数数组 `nums` 和整数 `k`，返回其中出现频率 **前 k 高** 的元素。答案顺序不限。

**示例：**
```
输入：nums = [1,1,1,2,2,3], k = 2   输出：[1,2]（1 出现3次，2 出现2次）
输入：nums = [1], k = 1              输出：[1]
```

**提示：** `1 <= nums.length <= 10⁵`，`k` 在 `[1, 不同元素个数]` 内。

## 二、解答方法

### 方法一：哈希计数 + 最小堆

**思路：** 先统计频率 `freq`。维护一个大小为 k 的最小堆，遍历频率：堆满且当前频率 > 堆顶频率则替换。最后堆中即前 k 高。或更简单：桶排序（按频率分桶）从高频到低频取满 k 个。

:::::: code-group

```java [Java]
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) freq.put(x, freq.getOrDefault(x, 0) + 1);
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);  // 频率最小堆
        for (var e : freq.entrySet()) {
            pq.offer(new int[]{e.getKey(), e.getValue()});
            if (pq.size() > k) pq.poll();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = pq.poll()[0];
        return res;
    }
}
```

```python [Python]
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        from collections import Counter
        import heapq
        freq = Counter(nums)
        return [x for x, _ in heapq.nlargest(k, freq.items(), key=lambda kv: kv[1])]
```

```cpp [C++]
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> freq;
        for (int x : nums) freq[x]++;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
        for (auto& e : freq) {
            pq.push({e.second, e.first});
            if (pq.size() > k) pq.pop();
        }
        vector<int> res;
        while (!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }
        return res;
    }
};
```

```go [Go]
func topKFrequent(nums []int, k int) []int {
    freq := map[int]int{}
    for _, x := range nums { freq[x]++ }
    pq := make([]pair, 0, k)  // 简单：用切片 + 排序即可
    type pair struct{ v, c int }
    var pairs []pair
    for v, c := range freq { pairs = append(pairs, pair{v, c}) }
    sort.Slice(pairs, func(i, j int) bool { return pairs[i].c > pairs[j].c })
    res := []int{}
    for i := 0; i < k; i++ { res = append(res, pairs[i].v) }
    return res
}
```

```js [JavaScript]
var topKFrequent = function (nums, k) {
    const freq = new Map();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(e => e[0]);
};
```

::::::

**复杂度：** 哈希 + 堆 `O(n log k)`，桶排序 `O(n)`。

## 三、总结

Top-K 频率经典三法：①最小堆（size k）；②桶排序（频率→下标，取高频）；③快速选择（平均 `O(n)`，最坏 `O(n²)`）。本题要求 `O(n log k)` 即可。注意堆用「最小堆」保留最大的 k 个。同类：`692 前 K 个高频单词`（按词频+字典序）。
