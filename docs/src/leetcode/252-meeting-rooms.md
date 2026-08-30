# [252. 会议室](https://leetcode.cn/problems/meeting-rooms/) [🔒 会员题]



## 一、题目描述

给定一个会议时间安排的数组 `intervals` ，每个会议时间都会包括开始和结束的时间 `intervals[i] = [starti, endi]` ，请你判断一个人是否能够参加 **所有会议** （即：同一时间只能参加一个会议，且会议之间不能有时间冲突）。

**示例 1：**

```
输入：intervals = [[0,30],[5,10],[15,20]]
输出：false
解释：[0,30] 与 [5,10] 冲突。
```

**示例 2：**

```
输入：intervals = [[7,10],[2,4]]
输出：true
解释：[2,4] 与 [7,10] 不冲突，可以全部参加。
```

**提示：**

-   `0 <= intervals.length <= 10⁴`
-   `intervals[i].length == 2`
-   `0 <= starti < endi <= 10⁶`



## 二、解答方法

### 2.1 方法一：排序后检查相邻区间

1. **思路**

按 **开始时间升序** 排序。若一个人能参加所有会议，则排序后 **任意相邻两个会议不能重叠**，即：前一个会议的结束时间 `<=` 后一个会议的开始时间。

```
若 intervals[i][1] > intervals[i+1][0]  →  冲突
```

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        // 按开始时间升序排序
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false;              // 后一个会议在前一个结束前就开始了
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        intervals.sort(key=lambda x: x[0])
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                return False
        return True
```

```go [Go]
func canAttendMeetings(intervals [][]int) bool {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    for i := 1; i < len(intervals); i++ {
        if intervals[i][0] < intervals[i-1][1] {
            return false
        }
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(),
             [](const vector<int>& a, const vector<int>& b) { return a[0] < b[0]; });
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
};
```

```ts [TypeScript]
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals: number[][]): boolean {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`（排序主导）。
- **空间复杂度**：`O(1)`（原地排序，取决于语言实现）。

### 2.2 方法二：扫描线（差分思想）

1. **思路**

把每个会议看作「+1 事件」（开始）和「-1 事件」（结束），按时间排序后累加计数。若任意时刻计数 `> 1`，说明有重叠。

注意：**同一时刻的结束应优先于开始**（`[0,5]` 和 `[5,10]` 不算冲突），所以排序时结束事件的优先级更高。

2. **代码实现（Python）**

```python
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        events = []
        for start, end in intervals:
            events.append((start, 1))    # 开始：+1
            events.append((end, -1))     # 结束：-1
        # 同一时间点，结束（-1）排在开始（+1）之前
        events.sort(key=lambda x: (x[0], x[1]))
        count = 0
        for _, delta in events:
            count += delta
            if count > 1:
                return False
        return True
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(n)`（事件数组）。

## 三、总结

| 方法 | 时间 | 空间 | 特点 |
| ---- | ---- | ---- | ---- |
| 排序 + 相邻比较 | `O(n log n)` | `O(1)` | 最简洁，推荐 |
| 扫描线差分 | `O(n log n)` | `O(n)` | 通用，可扩展到 253 题 |

核心结论：**判断区间是否重叠 = 排序后检查相邻区间**。

边界细节：`[0,5]` 与 `[5,10]` **不冲突**（前一个刚结束，后一个马上开始）。因此判断条件用 `intervals[i][0] < intervals[i-1][1]`（严格小于才冲突），不能写成 `<=`。

延伸：**253. 会议室 II** 要求「至少需要几个会议室」—— 这正是扫描线统计 **最大同时重叠数**，也是本题扫描线解法的直接推广。
