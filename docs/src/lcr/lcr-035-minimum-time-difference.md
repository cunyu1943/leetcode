# [LCR 035. 最小时间差](https://leetcode.cn/problems/569nqc/)



## 一、题目描述

给定一个 24 小时制（小时:分钟 `"HH:MM"`）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

**注意：** 时间可以被视为“循环”的，即 `23:59` 之后是 `00:00`。



**示例 1：**

```
输入：timePoints = ["23:59","00:00"]
输出：1
```

**示例 2：**

```
输入：timePoints = ["00:00","23:59","00:00"]
输出：0
```

**提示：**

- `2 <= timePoints.length <= 2 * 10⁴`
- `timePoints[i]` 格式为 `"HH:MM"`



## 二、解答方法

### 2.1 方法一：排序后比较相邻差值（含首尾循环）

1. **思路**

- 把所有时间转为「从 00:00 起的分钟数」（0~1439）；
- 排序后，相邻两个时间点的差就是候选答案；
- 由于时间循环，还要考虑最后一个与第一个跨 24 点的差：`1440 - last + first`。

注意：若存在重复时间，最小差为 0。时间 `O(n log n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findMinDifference(List<String> timePoints) {
        int n = timePoints.size();
        int[] t = new int[n];
        for (int i = 0; i < n; i++) {
            String s = timePoints.get(i);
            t[i] = Integer.parseInt(s.substring(0, 2)) * 60
                 + Integer.parseInt(s.substring(3));
        }
        Arrays.sort(t);
        int ans = Integer.MAX_VALUE;
        for (int i = 1; i < n; i++) ans = Math.min(ans, t[i] - t[i - 1]);
        ans = Math.min(ans, 1440 - t[n - 1] + t[0]);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        t = []
        for s in timePoints:
            h, m = map(int, s.split(':'))
            t.append(h * 60 + m)
        t.sort()
        ans = min(t[i] - t[i - 1] for i in range(1, len(t)))
        ans = min(ans, 1440 - t[-1] + t[0])
        return ans
```

```cpp [C++]
class Solution {
public:
    int findMinDifference(vector<string>& timePoints) {
        int n = timePoints.size();
        vector<int> t(n);
        for (int i = 0; i < n; i++) {
            t[i] = stoi(timePoints[i].substr(0, 2)) * 60
                 + stoi(timePoints[i].substr(3));
        }
        sort(t.begin(), t.end());
        int ans = INT_MAX;
        for (int i = 1; i < n; i++) ans = min(ans, t[i] - t[i - 1]);
        ans = min(ans, 1440 - t[n - 1] + t[0]);
        return ans;
    }
};
```

```go [Go]
func findMinDifference(timePoints []string) int {
    n := len(timePoints)
    t := make([]int, n)
    for i, s := range timePoints {
        h, _ := strconv.Atoi(s[:2])
        m, _ := strconv.Atoi(s[3:])
        t[i] = h*60 + m
    }
    sort.Ints(t)
    ans := 1 << 30
    for i := 1; i < n; i++ {
        if t[i]-t[i-1] < ans {
            ans = t[i] - t[i-1]
        }
    }
    if 1440-t[n-1]+t[0] < ans {
        ans = 1440 - t[n-1] + t[0]
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    const n = timePoints.length;
    const t = new Array(n);
    for (let i = 0; i < n; i++) {
        const s = timePoints[i];
        t[i] = parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3));
    }
    t.sort((a, b) => a - b);
    let ans = Infinity;
    for (let i = 1; i < n; i++) ans = Math.min(ans, t[i] - t[i - 1]);
    ans = Math.min(ans, 1440 - t[n - 1] + t[0]);
    return ans;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

static int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

int findMinDifference(char** timePoints, int timePointsSize) {
    int* t = (int*)malloc(timePointsSize * sizeof(int));
    for (int i = 0; i < timePointsSize; i++) {
        t[i] = atoi(timePoints[i]) * 60 + atoi(timePoints[i] + 3);
    }
    qsort(t, timePointsSize, sizeof(int), cmp);
    int ans = 1440;
    for (int i = 1; i < timePointsSize; i++)
        if (t[i] - t[i - 1] < ans) ans = t[i] - t[i - 1];
    if (1440 - t[timePointsSize - 1] + t[0] < ans)
        ans = 1440 - t[timePointsSize - 1] + t[0];
    free(t);
    return ans;
}
```

```ts [TypeScript]
function findMinDifference(timePoints: string[]): number {
    const n = timePoints.length;
    const t: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        const s = timePoints[i];
        t[i] = parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3));
    }
    t.sort((a, b) => a - b);
    let ans = Infinity;
    for (let i = 1; i < n; i++) ans = Math.min(ans, t[i] - t[i - 1]);
    ans = Math.min(ans, 1440 - t[n - 1] + t[0]);
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`，排序主导。
- **空间复杂度**：`O(n)`，或 `O(1)` 如果原地排序。

### 2.2 方法二：桶计数（鸽笼原理优化）

1. **思路**

一天只有 1440 分钟，可开长度为 1440 的布尔数组，对每个时间打标记。若某分钟被标记两次说明有重复，直接返回 0。遍历桶，用「上一个被标记的位置」计算相邻差，同时处理首尾循环。时间 `O(1440 + n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findMinDifference(List<String> timePoints) {
        if (timePoints.size() > 1440) return 0; // 鸽笼原理
        boolean[] seen = new boolean[1440];
        for (String s : timePoints) {
            int t = Integer.parseInt(s.substring(0, 2)) * 60
                  + Integer.parseInt(s.substring(3));
            if (seen[t]) return 0;
            seen[t] = true;
        }
        int first = -1, prev = -1, ans = 1440;
        for (int i = 0; i < 1440; i++) {
            if (seen[i]) {
                if (first == -1) first = i;
                else ans = Math.min(ans, i - prev);
                prev = i;
            }
        }
        ans = Math.min(ans, 1440 - prev + first);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        if len(timePoints) > 1440:
            return 0
        seen = [False] * 1440
        for s in timePoints:
            h, m = map(int, s.split(':'))
            t = h * 60 + m
            if seen[t]:
                return 0
            seen[t] = True
        first = prev = -1
        ans = 1440
        for i in range(1440):
            if seen[i]:
                if first == -1:
                    first = i
                else:
                    ans = min(ans, i - prev)
                prev = i
        ans = min(ans, 1440 - prev + first)
        return ans
```

```cpp [C++]
class Solution {
public:
    int findMinDifference(vector<string>& timePoints) {
        if (timePoints.size() > 1440) return 0;
        vector<bool> seen(1440, false);
        for (string& s : timePoints) {
            int t = stoi(s.substr(0, 2)) * 60 + stoi(s.substr(3));
            if (seen[t]) return 0;
            seen[t] = true;
        }
        int first = -1, prev = -1, ans = 1440;
        for (int i = 0; i < 1440; i++) {
            if (seen[i]) {
                if (first == -1) first = i;
                else ans = min(ans, i - prev);
                prev = i;
            }
        }
        ans = min(ans, 1440 - prev + first);
        return ans;
    }
};
```

```go [Go]
func findMinDifference(timePoints []string) int {
    if len(timePoints) > 1440 {
        return 0
    }
    seen := make([]bool, 1440)
    for _, s := range timePoints {
        h, _ := strconv.Atoi(s[:2])
        m, _ := strconv.Atoi(s[3:])
        t := h*60 + m
        if seen[t] {
            return 0
        }
        seen[t] = true
    }
    first, prev, ans := -1, -1, 1440
    for i := 0; i < 1440; i++ {
        if seen[i] {
            if first == -1 {
                first = i
            } else if i-prev < ans {
                ans = i - prev
            }
            prev = i
        }
    }
    if 1440-prev+first < ans {
        ans = 1440 - prev + first
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    if (timePoints.length > 1440) return 0;
    const seen = new Array(1440).fill(false);
    for (const s of timePoints) {
        const t = parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3));
        if (seen[t]) return 0;
        seen[t] = true;
    }
    let first = -1, prev = -1, ans = 1440;
    for (let i = 0; i < 1440; i++) {
        if (seen[i]) {
            if (first === -1) first = i;
            else ans = Math.min(ans, i - prev);
            prev = i;
        }
    }
    ans = Math.min(ans, 1440 - prev + first);
    return ans;
};
```

```c [C]
#include <string.h>
#include <stdlib.h>

int findMinDifference(char** timePoints, int timePointsSize) {
    if (timePointsSize > 1440) return 0;
    unsigned char seen[1440] = {0};
    for (int i = 0; i < timePointsSize; i++) {
        int t = atoi(timePoints[i]) * 60 + atoi(timePoints[i] + 3);
        if (seen[t]) return 0;
        seen[t] = 1;
    }
    int first = -1, prev = -1, ans = 1440;
    for (int i = 0; i < 1440; i++) {
        if (seen[i]) {
            if (first == -1) first = i;
            else if (i - prev < ans) ans = i - prev;
            prev = i;
        }
    }
    if (1440 - prev + first < ans) ans = 1440 - prev + first;
    return ans;
}
```

```ts [TypeScript]
function findMinDifference(timePoints: string[]): number {
    if (timePoints.length > 1440) return 0;
    const seen: boolean[] = new Array(1440).fill(false);
    for (const s of timePoints) {
        const t = parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3));
        if (seen[t]) return 0;
        seen[t] = true;
    }
    let first = -1, prev = -1, ans = 1440;
    for (let i = 0; i < 1440; i++) {
        if (seen[i]) {
            if (first === -1) first = i;
            else ans = Math.min(ans, i - prev);
            prev = i;
        }
    }
    ans = Math.min(ans, 1440 - prev + first);
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(1440 + n)`，可视为线性。
- **空间复杂度**：`O(1440)`，桶数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 相邻差 | `O(n log n)` | `O(n)` | 通用，直观 |
| 桶计数 | `O(1440 + n)` | `O(1440)` | 数据量接近 1440 时更快，能直接判重 |

时间只有 1440 种可能，桶计数可在线性时间内完成，并利用鸽笼原理快速判重；无论哪种方法都要记得处理「23:59 与 00:00」之间的循环差。

