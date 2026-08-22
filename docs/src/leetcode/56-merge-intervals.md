# [56. 合并区间](https://leetcode.cn/problems/merge-intervals/)



## 一、题目描述

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [start_i, end_i]`。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。



**示例 1：**

```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 与 [2,6] 重叠，合并为 [1,6]。
```

**示例 2：**

```
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 与 [4,5] 可被视为重叠区间。
```

**提示：**

-   `1 <= intervals.length <= 10^4`
-   `intervals[i].length == 2`
-   `0 <= start_i <= end_i <= 10^4`



## 二、解答方法

### 2.1 方法一：排序后贪心合并


1. **思路**

先按区间起点排序，然后顺序遍历，若当前区间的起点不大于结果中最后一个区间的终点则合并，否则直接加入。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> res = new ArrayList<>();
        for (int[] it : intervals) {
            if (res.isEmpty() || res.get(res.size() - 1)[1] < it[0]) {
                res.add(it);
            } else {
                res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], it[1]);
            }
        }
        return res.toArray(new int[0][]);
    }
}
```

```python [Python]
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])
        res = []
        for it in intervals:
            if not res or res[-1][1] < it[0]:
                res.append(it)
            else:
                res[-1][1] = max(res[-1][1], it[1])
        return res
```

```go [Go]
func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })
    res := [][]int{}
    for _, it := range intervals {
        if len(res) == 0 || res[len(res)-1][1] < it[0] {
            res = append(res, it)
        } else {
            if it[1] > res[len(res)-1][1] {
                res[len(res)-1][1] = it[1]
            }
        }
    }
    return res
}
```

```c [C]
int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    // 排序后贪心合并核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (auto& it : intervals) {
            if (res.empty() || res.back()[1] < it[0]) {
                res.push_back(it);
            } else {
                res.back()[1] = max(res.back()[1], it[1]);
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [];
    for (const it of intervals) {
        if (!res.length || res[res.length - 1][1] < it[0]) {
            res.push(it);
        } else {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], it[1]);
        }
    }
    return res;
};
```

```typescript [TypeScript]
function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    const res: number[][] = [];
    for (const it of intervals) {
        if (!res.length || res[res.length - 1][1] < it[0]) {
            res.push(it);
        } else {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], it[1]);
        }
    }
    return res;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n log n)`**，瓶颈在排序。
- **空间复杂度**：`O(log n)`（不计返回结果），排序递归栈开销。

### 2.2 方法二：统计覆盖法


1. **思路**

开辟长度为最大坐标的数组，标记每个点被哪些区间覆盖，再扫描连续被覆盖的段作为合并结果。仅适用于坐标范围较小的情况。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int[][] merge(int[][] intervals) {
        int max = 0;
        for (int[] it : intervals) max = Math.max(max, it[1]);
        boolean[] covered = new boolean[max + 1];
        for (int[] it : intervals) {
            for (int i = it[0]; i <= it[1]; i++) covered[i] = true;
        }
        List<int[]> res = new ArrayList<>();
        int start = -1;
        for (int i = 0; i <= max; i++) {
            if (covered[i] && start == -1) start = i;
            if (!covered[i] && start != -1) { res.add(new int[]{start, i - 1}); start = -1; }
        }
        if (start != -1) res.add(new int[]{start, max});
        return res.toArray(new int[0][]);
    }
}
```

```python [Python]
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        maxv = max(it[1] for it in intervals)
        covered = [False] * (maxv + 1)
        for s, e in intervals:
            for i in range(s, e + 1):
                covered[i] = True
        res = []
        start = -1
        for i in range(maxv + 1):
            if covered[i] and start == -1:
                start = i
            elif not covered[i] and start != -1:
                res.append([start, i - 1]); start = -1
        if start != -1:
            res.append([start, maxv])
        return res
```

```go [Go]
func merge(intervals [][]int) [][]int {
    maxv := 0
    for _, it := range intervals { if it[1] > maxv { maxv = it[1] } }
    covered := make([]bool, maxv+1)
    for _, it := range intervals {
        for i := it[0]; i <= it[1]; i++ { covered[i] = true }
    }
    res := [][]int{}
    start := -1
    for i := 0; i <= maxv; i++ {
        if covered[i] && start == -1 { start = i }
        if !covered[i] && start != -1 { res = append(res, []int{start, i - 1}); start = -1 }
    }
    if start != -1 { res = append(res, []int{start, maxv}) }
    return res
}
```

```c [C]
int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    // 统计覆盖法核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        int maxv = 0;
        for (auto& it : intervals) maxv = max(maxv, it[1]);
        vector<bool> covered(maxv + 1, false);
        for (auto& it : intervals)
            for (int i = it[0]; i <= it[1]; i++) covered[i] = true;
        vector<vector<int>> res;
        int start = -1;
        for (int i = 0; i <= maxv; i++) {
            if (covered[i] && start == -1) start = i;
            if (!covered[i] && start != -1) { res.push_back({start, i - 1}); start = -1; }
        }
        if (start != -1) res.push_back({start, maxv});
        return res;
    }
};
```

```javascript [JavaScript]
var merge = function(intervals) {
    let maxv = 0;
    for (const it of intervals) maxv = Math.max(maxv, it[1]);
    const covered = new Array(maxv + 1).fill(false);
    for (const [s, e] of intervals)
        for (let i = s; i <= e; i++) covered[i] = true;
    const res = [];
    let start = -1;
    for (let i = 0; i <= maxv; i++) {
        if (covered[i] && start === -1) start = i;
        if (!covered[i] && start !== -1) { res.push([start, i - 1]); start = -1; }
    }
    if (start !== -1) res.push([start, maxv]);
    return res;
};
```

```typescript [TypeScript]
function merge(intervals: number[][]): number[][] {
    let maxv = 0;
    for (const it of intervals) maxv = Math.max(maxv, it[1]);
    const covered = new Array(maxv + 1).fill(false);
    for (const [s, e] of intervals)
        for (let i = s; i <= e; i++) covered[i] = true;
    const res: number[][] = [];
    let start = -1;
    for (let i = 0; i <= maxv; i++) {
        if (covered[i] && start === -1) start = i;
        if (!covered[i] && start !== -1) { res.push([start, i - 1]); start = -1; }
    }
    if (start !== -1) res.push([start, maxv]);
    return res;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n + M)`**，`M` 为坐标最大值。
- **空间复杂度**：`O(M)`**，标记数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序后贪心合并 | `O(n log n)` | `O(log n)` | 通用，面试首选 |
| 统计覆盖法 | `O(n + M)` | `O(M)` | 仅适用于坐标范围小 |
