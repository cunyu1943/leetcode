# [LCR 074. 合并区间](https://leetcode.cn/problems/SsGoHC/)



## 一、题目描述

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。



**示例 1：**

```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2：**

```
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

**提示：**

- `1 <= intervals.length <= 10⁴`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10⁴`



## 二、解答方法

### 2.1 方法一：排序后贪心合并

1. **思路**

- 按区间起点排序；
- 依次遍历，若当前区间起点 `<=` 上一个区间的终点，则合并（终点取较大值）；否则把上一个区间加入结果并开启新区间。

时间 `O(n log n)`（排序），空间 `O(n)`（结果）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> res = new ArrayList<>();
        int l = intervals[0][0], r = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] <= r) {
                r = Math.max(r, intervals[i][1]);
            } else {
                res.add(new int[]{l, r});
                l = intervals[i][0];
                r = intervals[i][1];
            }
        }
        res.add(new int[]{l, r});
        return res.toArray(new int[res.size()][]);
    }
}
```

```python [Python]
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort()
        res = []
        l, r = intervals[0]
        for s, e in intervals[1:]:
            if s <= r:
                r = max(r, e)
            else:
                res.append([l, r])
                l, r = s, e
        res.append([l, r])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        int l = intervals[0][0], r = intervals[0][1];
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= r) r = max(r, intervals[i][1]);
            else { res.push_back({l, r}); l = intervals[i][0]; r = intervals[i][1]; }
        }
        res.push_back({l, r});
        return res;
    }
};
```

```go [Go]
func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    res := make([][]int, 0, len(intervals))
    l, r := intervals[0][0], intervals[0][1]
    for _, iv := range intervals[1:] {
        if iv[0] <= r {
            if iv[1] > r {
                r = iv[1]
            }
        } else {
            res = append(res, []int{l, r})
            l, r = iv[0], iv[1]
        }
    }
    res = append(res, []int{l, r})
    return res
}
```

```js [JavaScript]
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [];
    let [l, r] = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= r) r = Math.max(r, intervals[i][1]);
        else { res.push([l, r]); [l, r] = intervals[i]; }
    }
    res.push([l, r]);
    return res;
};
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) {
    int* x = *(int**)a;
    int* y = *(int**)b;
    return x[0] - y[0];
}

int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    qsort(intervals, intervalsSize, sizeof(int*), cmp);
    int** res = (int**)malloc(intervalsSize * sizeof(int*));
    int* cols = (int*)malloc(intervalsSize * sizeof(int));
    int cnt = 0;
    int l = intervals[0][0], r = intervals[0][1];
    for (int i = 1; i < intervalsSize; i++) {
        if (intervals[i][0] <= r) {
            if (intervals[i][1] > r) r = intervals[i][1];
        } else {
            res[cnt] = (int*)malloc(2 * sizeof(int));
            res[cnt][0] = l; res[cnt][1] = r;
            cols[cnt] = 2; cnt++;
            l = intervals[i][0]; r = intervals[i][1];
        }
    }
    res[cnt] = (int*)malloc(2 * sizeof(int));
    res[cnt][0] = l; res[cnt][1] = r;
    cols[cnt] = 2; cnt++;
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    const res: number[][] = [];
    let [l, r] = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= r) r = Math.max(r, intervals[i][1]);
        else { res.push([l, r]); [l, r] = intervals[i]; }
    }
    res.push([l, r]);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`，排序主导。
- **空间复杂度**：`O(n)`，结果数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 贪心 | `O(n log n)` | `O(n)` | 标准解法 |

先按起点排序使重叠区间相邻，再线性扫描合并：`s <= r` 则扩展右边界，否则封存当前区间。注意 `[1,4]` 与 `[4,5]` 首尾相接也算重叠（`s <= r`）。

