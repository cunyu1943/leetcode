# [275. H 指数 II](https://leetcode.cn/problems/h-index-ii/)

## 一、题目描述

给你一个整数数组 `citations`，其中 `citations[i]` 是研究者第 `i` 篇论文被引用的次数。数组已经按照 **升序排列**。计算并返回该研究者的 **H 指数**。

请你设计并实现 **时间复杂度为 `O(log n)`** 的算法解决此问题。

**示例：**

```
输入：citations = [0,1,3,5,6]   输出：3
解释：5 篇论文中，3 篇被引用至少 3 次 → h=3
```

**提示：** `n == citations.length`，`1 <= n <= 10⁵`，`0 <= citations[i] <= 1000`，`citations` 升序。

## 二、解答方法

### 方法一：二分查找（O(log n)）

**思路：** 在升序数组上二分找「最大的 h」。观察到：若论文数 `i`（从 0 开始）处 `citations[i] >= n - i`，则 h 至少为 `n - i`（因为右侧所有论文引用数 >= citations[i] >= n-i，共 n-i 篇）。反之 h 应更小。二分找最左满足 `citations[i] >= n - i` 的位置，h = n - i。

:::::: code-group

```java [Java]
class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length, lo = 0, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (citations[mid] >= n - mid) hi = mid;
            else lo = mid + 1;
        }
        return n - lo;
    }
}
```

```python [Python]
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if citations[mid] >= n - mid:
                hi = mid
            else:
                lo = mid + 1
        return n - lo
```

```cpp [C++]
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size(), lo = 0, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (citations[mid] >= n - mid) hi = mid;
            else lo = mid + 1;
        }
        return n - lo;
    }
};
```

```go [Go]
func hIndex(citations []int) int {
    n := len(citations)
    lo, hi := 0, n
    for lo < hi {
        mid := lo + (hi-lo)/2
        if citations[mid] >= n-mid {
            hi = mid
        } else {
            lo = mid + 1
        }
    }
    return n - lo
}
```

```js [JavaScript]
var hIndex = function (citations) {
    const n = citations.length;
    let lo = 0, hi = n;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (citations[mid] >= n - mid) hi = mid;
        else lo = mid + 1;
    }
    return n - lo;
};
```

::::::

**复杂度：** 时间 `O(log n)`，空间 `O(1)`。

## 三、总结

本题是 `274. H 指数` 的进阶（已排序 + 要求 O(log n)）。二分查找关键：在升序数组上搜索 **最左满足 `citations[mid] >= n - mid` 的位置**，h = n - 该位置。若全部不满足则返回 0（循环结束时 lo == n，`n - n = 0`）。这与「二分搜索第一个 >= 目标值的元素」同构。
