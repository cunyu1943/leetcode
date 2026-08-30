# [274. H 指数](https://leetcode.cn/problems/h-index/)

## 一、题目描述

给你一个整数数组 `citations`，其中 `citations[i]` 表示研究者的第 `i` 篇论文被引用的次数。计算并返回该研究者的 **H 指数**。

H 指数的定义：h 代表「高引用次数」，一名科研人员的 h 指数是指他（她）的 （`n` 篇论文中）**总共有 h 篇论文分别被引用了至少 h 次**。且其余的 n - h 篇论文每篇被引用次数 **不超过 h 次**。

如果 h 有多种可能的值，h 指数 是其中的最大值。

**示例：**

```
输入：citations = [3,0,6,1,5]   输出：3
解释：5 篇论文中，3 篇被引用至少 3 次，其余 2 篇不超过 3 次 → h=3
```

**提示：** `n == citations.length`，`1 <= n <= 5000`，`0 <= citations[i] <= 1000`

## 二、解答方法

### 方法一：排序（O(n log n)）

**思路：** 将引用数降序排序。对于排序后第 `i` 篇（从 0 起），其引用数为 `citations[i]`，若有 `i+1` 篇论文引用数 `>= citations[i]`，则候选 h = `min(citations[i], i+1)`。遍历取最大候选即可。等价地：h 是第一个满足 `citations[i] <= i` 的下标 i。

:::::: code-group

```java [Java]
class Solution {
    public int hIndex(int[] citations) {
        Arrays.sort(citations);
        int n = citations.length, h = 0;
        for (int i = 0; i < n; i++) {
            int cur = Math.min(citations[i], n - i);  // 至少被引用 citations[i] 次的论文数
            h = Math.max(h, cur);
        }
        return h;
    }
}
```

```python [Python]
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        citations.sort()
        n = len(citations)
        for i, c in enumerate(citations):
            if c >= n - i:           # 从右往左找第一个满足的
                return n - i
        return 0
```

```cpp [C++]
class Solution {
public:
    int hIndex(vector<int>& citations) {
        sort(citations.begin(), citations.end());
        int n = citations.size();
        for (int i = 0; i < n; i++)
            if (citations[i] >= n - i) return n - i;
        return 0;
    }
};
```

```go [Go]
func hIndex(citations []int) int {
    sort.Ints(citations)
    n := len(citations)
    for i := 0; i < n; i++ {
        if citations[i] >= n-i {
            return n - i
        }
    }
    return 0
}
```

```js [JavaScript]
var hIndex = function (citations) {
    citations.sort((a, b) => a - b);
    const n = citations.length;
    for (let i = 0; i < n; i++) {
        if (citations[i] >= n - i) return n - i;
    }
    return 0;
};
```

::::::

**复杂度：** 时间 `O(n log n)`，空间 `O(1)`。

### 方法二：计数排序（桶 / 进阶 O(n)）

**思路：** 引用数可能很大（>n 时按 n 计即可）。用数组 `cnt[n+1]`，`cnt[i]` 表示引用数恰好为 `i` 的论文数（引用 > n 的归到 `cnt[n]`）。从后往前累加，找到第一个 `sum >= i` 的 i 即为 h。

```python [Python]
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        cnt = [0] * (n + 1)
        for c in citations:
            cnt[min(c, n)] += 1
        s = 0
        for i in range(n, -1, -1):
            s += cnt[i]
            if s >= i:
                return i
        return 0
```

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

H 指数本质是找最大的 h 使「被引用 >= h 的论文数 >= h」。排序法最直观；当 `citations[i] >= n - i` 时 h = n - i。计数排序法在引用数上限已知时可优化到线性时间（对应 275 题要求）。注意 `citations[i] > n` 时视为 n（最多也就 n 篇论文）。
