# [436. 寻找右区间](https://leetcode.cn/problems/find-right-interval/)

## 一、题目描述

给定一组区间 `intervals`，其中 `intervals[i] = [start_i, end_i]`。对第 `i` 个区间，找一个**最靠左**的区间 `j` 使得 `start_j >= end_i`（即 `j` 的起点不小于 `i` 的终点），返回其下标 `j`；若不存在返回 -1。

**示例 1：**

```
输入：intervals = [[1,2],[3,4],[2,3]]
输出：[-1,2,1]
解释：区间 0 终点 2，无起点>=2 且更靠左？起点集合 {1,3,2}，>=2 的有起点 3(j=1) 和 2(j=2)，最靠左即起点最小的，选起点 2 的 j=2？实际输出为 [-1,2,1]（按起点最小、索引最小）。
```

**示例 2：**

```
输入：intervals = [[3,4]]
输出：[-1]
```

**提示：**

- `1 <= intervals.length <= 2 * 10^4`
- `intervals[i].length == 2`
- `-10^6 <= start_i < end_i <= 10^6`

## 二、解答方法

### 2.1 方法一：排序起点 + 二分查找

1. 思路

把每个区间的「起点 + 原下标」按起点升序排序。对每个区间 `i` 的终点 `end_i`，在排序后的起点数组里二分找「第一个 $\ge end_i$」的起点，其对应原下标即为答案；找不到返回 -1。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int[] findRightInterval(int[][] intervals) {
        int n = intervals.length;
        int[][] starts = new int[n][2];
        for (int i = 0; i < n; i++) { starts[i][0] = intervals[i][0]; starts[i][1] = i; }
        Arrays.sort(starts, (a, b) -> a[0] - b[0]);
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int end = intervals[i][1];
            int lo = 0, hi = n, ans = -1;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (starts[mid][0] >= end) { ans = starts[mid][1]; hi = mid; }
                else lo = mid + 1;
            }
            res[i] = ans;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        import bisect
        starts = sorted((s, i) for i, (s, e) in enumerate(intervals))
        res = []
        for s, e in intervals:
            j = bisect.bisect_left(starts, (e, 0))
            res.append(starts[j][1] if j < len(starts) else -1)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> findRightInterval(vector<vector<int>>& intervals) {
        int n = intervals.size();
        vector<pair<int, int>> starts;
        for (int i = 0; i < n; i++) starts.push_back({intervals[i][0], i});
        sort(starts.begin(), starts.end());
        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            int end = intervals[i][1];
            auto it = lower_bound(starts.begin(), starts.end(), make_pair(end, -1));
            res[i] = it == starts.end() ? -1 : it->second;
        }
        return res;
    }
};
```

```go [Go]
func findRightInterval(intervals [][]int) []int {
	n := len(intervals)
	type pair struct{ s, i int }
	starts := make([]pair, n)
	for i, it := range intervals {
		starts[i] = pair{it[0], i}
	}
	sort.Slice(starts, func(i, j int) bool { return starts[i].s < starts[j].s })
	res := make([]int, n)
	for i, it := range intervals {
		end := it[1]
		lo, hi, ans := 0, n, -1
		for lo < hi {
			mid := (lo + hi) / 2
			if starts[mid].s >= end {
				ans = starts[mid].i
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		res[i] = ans
	}
	return res
}
```

```javascript [JavaScript]
var findRightInterval = function (intervals) {
    const n = intervals.length;
    const starts = intervals.map((it, i) => [it[0], i]).sort((a, b) => a[0] - b[0]);
    const res = [];
    for (const [, e] of intervals) {
        let lo = 0, hi = n, ans = -1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (starts[mid][0] >= e) { ans = starts[mid][1]; hi = mid; }
            else lo = mid + 1;
        }
        res.push(ans);
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n)$。
- 空间复杂度：$O(n)$。

## 三、总结

「对起点排序 + 二分」是「找首个不小于 X 的区间」的标准做法。相关题目：435 无重叠区间、452、57 插入区间、686。
