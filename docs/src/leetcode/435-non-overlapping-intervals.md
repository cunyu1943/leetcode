# [435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/)

## 一、题目描述

给定一个区间集合 `intervals`，其中 `intervals[i] = [start_i, end_i]`。返回**移除最少数量**的区间，使剩余区间互不重叠。

**示例 1：**

```
输入：intervals = [[1,2],[2,3],[3,4],[1,3]]
输出：1
解释：移除 [1,3] 后，其余互不重叠。
```

**示例 2：**

```
输入：intervals = [[1,2],[1,2],[1,2]]
输出：2
```

**提示：**

- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= start_i < end_i <= 5 * 10^4`

## 二、解答方法

### 2.1 方法一：贪心（按结束时间排序）

1. 思路

等价于「最多能选多少个互不重叠区间」。按**结束时间**升序排序，依次选结束最早、且与上一个选中区间不重叠（起点 $\ge$ 上一个结束）的区间。最少移除数 = 总数 - 最多可选数。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
        int end = Integer.MIN_VALUE, keep = 0;
        for (int[] it : intervals) {
            if (it[0] >= end) { keep++; end = it[1]; }
        }
        return intervals.length - keep;
    }
}
```

```python [Python]
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        end = keep = 0
        first = True
        for s, e in intervals:
            if first or s >= end:
                keep += 1
                end = e
                first = False
        return len(intervals) - keep
```

```cpp [C++]
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
        int end = INT_MIN, keep = 0;
        for (auto& it : intervals) {
            if (it[0] >= end) { keep++; end = it[1]; }
        }
        return intervals.size() - keep;
    }
};
```

```go [Go]
func eraseOverlapIntervals(intervals [][]int) int {
	sort.Slice(intervals, func(i, j int) bool { return intervals[i][1] < intervals[j][1] })
	end, keep := -1<<31, 0
	for _, it := range intervals {
		if it[0] >= end {
			keep++
			end = it[1]
		}
	}
	return len(intervals) - keep
}
```

```javascript [JavaScript]
var eraseOverlapIntervals = function (intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    let end = -Infinity, keep = 0;
    for (const [s, e] of intervals) {
        if (s >= end) { keep++; end = e; }
    }
    return intervals.length - keep;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n)$，排序。
- 空间复杂度：$O(1)$（忽略排序栈）。

## 三、总结

「按结束时间贪心」是区间调度（活动选择）的经典结论。相关题目：452 用最少箭引爆气球、56 合并区间、253 会议室 II、1024 视频拼接。
