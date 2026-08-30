# [480. 滑动窗口中位数](https://leetcode.cn/problems/sliding-window-median/)

## 一、题目描述

给定整数数组 `nums` 和窗口大小 `k`，窗口从最左滑到最右，返回每个窗口内的**中位数**（窗口长度为偶数时返回两数均值，用 `double`）。

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
```

**示例 2：**

```
输入：nums = [1,2,3,4,2,3,1,4,2], k = 3
输出：[2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
```

**提示：**

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## 二、解答方法

### 2.1 方法一：双堆（对顶堆）

1. 思路

维护「较大一半」的最小堆 `small`（堆顶为较大一半最小）与「较小一半」的最大堆 `large`（堆顶为较小一半最大），保持两堆大小差 $\le 1`。窗口滑动时：加入右端元素、移除左端元素（用延迟删除或哈希计数），再平衡。中位数由堆顶求得。

2. 代码实现（Python，`heapq` + 延迟删除）

:::::: code-group

```python [Python]
import heapq
class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        small, large = [], []  # small: max-heap (存负), large: min-heap
        delayed = {}
        to_add = 0
        def balance():
            while small and delayed.get(-small[0], 0) > 0:
                delayed[-small[0]] -= 1
                heapq.heappop(small)
            while large and delayed.get(large[0], 0) > 0:
                delayed[large[0]] -= 1
                heapq.heappop(large)
            while len(small) > len(large) + 1:
                heapq.heappush(large, -heapq.heappop(small))
            while len(large) > len(small):
                heapq.heappush(small, -heapq.heappop(large))
        res = []
        for i, x in enumerate(nums):
            if not small or x <= -small[0]:
                heapq.heappush(small, -x)
            else:
                heapq.heappush(large, x)
            if i >= k:
                out = nums[i - k]
                delayed[out] = delayed.get(out, 0) + 1
                if not small or out <= -small[0]:
                    if small and out == -small[0]: heapq.heappop(small)
                else:
                    if large and out == large[0]: heapq.heappop(large)
            if i >= k - 1:
                balance()
                if len(small) == len(large):
                    res.append((-small[0] + large[0]) / 2)
                else:
                    res.append(float(-small[0]))
        return res
```

```java [Java]
class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        // 使用两个 TreeSet 模拟双堆（延迟删除略复杂，此处给出结构思路）
        // 生产环境可直接用 PriorityQueue + HashMap 延迟删除实现，逻辑同 Python。
        double[] res = new double[nums.length - k + 1];
        // 略：核心与 Python 一致
        return res;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log k)$。
- 空间复杂度：$O(k)$。

## 三、总结

「对顶堆 + 延迟删除」是动态中位数的标准结构。相关题目：295 数据流的中位数、703 数据流中的第 K 大元素、346 数据流移动平均。
