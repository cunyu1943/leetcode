# [57. 插入区间](https://leetcode.cn/problems/insert-interval/)



## 一、题目描述

给你一个 **无重叠的** 按照区间起始端点排序的区间列表 `intervals`。

在 `intervals` 中插入一个新的区间 `newInterval`（必要时可合并区间），返回插入后的区间列表（同样无重叠且已排序）。



**示例 1：**

```
输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
```

**示例 2：**

```
输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：区间 [3,5] 与 [6,7] 和 [8,10] 与 [4,8] 重叠，合并为 [3,10]。
```

**提示：**

-   `0 <= intervals.length <= 10^4`
-   `intervals[i].length == 2`
-   `0 <= start_i <= end_i <= 10^5`



## 二、解答方法

### 2.1 方法一：一次遍历合并


1. **思路**

把原区间分成三部分：在 `newInterval` 左侧不重叠的、与 `newInterval` 重叠需合并的、在右侧不重叠的。合并时不断扩展 `newInterval` 的端点，最后拼回结果。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;
        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        while (i < n) res.add(intervals[i++]);
        return res.toArray(new int[0][]);
    }
}
```

```python [Python]
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res, i, n = [], 0, len(intervals)
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i]); i += 1
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)
        while i < n:
            res.append(intervals[i]); i += 1
        return res
```

```go [Go]
func insert(intervals [][]int, newInterval []int) [][]int {
    res := [][]int{}
    i, n := 0, len(intervals)
    for i < n && intervals[i][1] < newInterval[0] {
        res = append(res, intervals[i]); i++
    }
    for i < n && intervals[i][0] <= newInterval[1] {
        if intervals[i][0] < newInterval[0] { newInterval[0] = intervals[i][0] }
        if intervals[i][1] > newInterval[1] { newInterval[1] = intervals[i][1] }
        i++
    }
    res = append(res, newInterval)
    for i < n {
        res = append(res, intervals[i]); i++
    }
    return res
}
```

```c [C]
int** insert(int** intervals, int intervalsSize, int* intervalsColSize, int* newInterval, int newIntervalSize, int* returnSize, int** returnColumnSizes) {
    // 一次遍历合并核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        while (i < n) res.push_back(intervals[i++]);
        return res;
    }
};
```

```javascript [JavaScript]
var insert = function(intervals, newInterval) {
    const res = [];
    let i = 0, n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);
    while (i < n) res.push(intervals[i++]);
    return res;
};
```

```typescript [TypeScript]
function insert(intervals: number[][], newInterval: number[]): number[][] {
    const res: number[][] = [];
    let i = 0, n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);
    while (i < n) res.push(intervals[i++]);
    return res;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，只需遍历一次。
- **空间复杂度**：`O(n)`（不计返回结果），结果数组开销。

### 2.2 方法二：先插入再合并


1. **思路**

将 `newInterval` 直接插入到合适位置（保持按起点有序），然后复用第 56 题的「排序后合并」逻辑统一处理。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> list = new ArrayList<>(Arrays.asList(intervals));
        int i = 0;
        while (i < list.size() && list.get(i)[0] < newInterval[0]) i++;
        list.add(i, newInterval);
        List<int[]> res = new ArrayList<>();
        for (int[] it : list) {
            if (res.isEmpty() || res.get(res.size() - 1)[1] < it[0]) res.add(it);
            else res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], it[1]);
        }
        return res.toArray(new int[0][]);
    }
}
```

```python [Python]
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        placed = False
        for it in intervals:
            if not placed and it[0] > newInterval[1]:
                res.append(newInterval); placed = True
            if it[1] < newInterval[0] or it[0] > newInterval[1]:
                res.append(it)
            else:
                newInterval[0] = min(newInterval[0], it[0])
                newInterval[1] = max(newInterval[1], it[1])
        if not placed:
            res.append(newInterval)
        return res
```

```go [Go]
func insert(intervals [][]int, newInterval []int) [][]int {
    res := [][]int{}
    placed := false
    for _, it := range intervals {
        if !placed && it[0] > newInterval[1] {
            res = append(res, newInterval); placed = true
        }
        if it[1] < newInterval[0] || it[0] > newInterval[1] {
            res = append(res, it)
        } else {
            if it[0] < newInterval[0] { newInterval[0] = it[0] }
            if it[1] > newInterval[1] { newInterval[1] = it[1] }
        }
    }
    if !placed { res = append(res, newInterval) }
    return res
}
```

```c [C]
int** insert(int** intervals, int intervalsSize, int* intervalsColSize, int* newInterval, int newIntervalSize, int* returnSize, int** returnColumnSizes) {
    // 先插入再合并核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        bool placed = false;
        for (auto& it : intervals) {
            if (!placed && it[0] > newInterval[1]) { res.push_back(newInterval); placed = true; }
            if (it[1] < newInterval[0] || it[0] > newInterval[1]) res.push_back(it);
            else {
                newInterval[0] = min(newInterval[0], it[0]);
                newInterval[1] = max(newInterval[1], it[1]);
            }
        }
        if (!placed) res.push_back(newInterval);
        return res;
    }
};
```

```javascript [JavaScript]
var insert = function(intervals, newInterval) {
    const res = [];
    let placed = false;
    for (const it of intervals) {
        if (!placed && it[0] > newInterval[1]) { res.push(newInterval); placed = true; }
        if (it[1] < newInterval[0] || it[0] > newInterval[1]) res.push(it);
        else {
            newInterval[0] = Math.min(newInterval[0], it[0]);
            newInterval[1] = Math.max(newInterval[1], it[1]);
        }
    }
    if (!placed) res.push(newInterval);
    return res;
};
```

```typescript [TypeScript]
function insert(intervals: number[][], newInterval: number[]): number[][] {
    const res: number[][] = [];
    let placed = false;
    for (const it of intervals) {
        if (!placed && it[0] > newInterval[1]) { res.push(newInterval); placed = true; }
        if (it[1] < newInterval[0] || it[0] > newInterval[1]) res.push(it);
        else {
            newInterval[0] = Math.min(newInterval[0], it[0]);
            newInterval[1] = Math.max(newInterval[1], it[1]);
        }
    }
    if (!placed) res.push(newInterval);
    return res;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，遍历一次（或插入 + 合并各一次）。
- **空间复杂度**：`O(n)`**，结果数组开销。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 一次遍历合并 | `O(n)` | `O(n)` | 直观高效，面试首选 |
| 先插入再合并 | `O(n)` | `O(n)` | 复用合并逻辑，代码简洁 |
