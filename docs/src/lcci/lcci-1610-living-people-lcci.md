# [面试题 16.10. 生存人数](https://leetcode.cn/problems/living-people-lcci/)

## 一、题目描述

给定 `N` 个人的出生年份 `birth` 和死亡年份 `death`，实现一个方法以计算生存人数最多的年份。

你可以假设所有人都出生于 1900 年至 2000 年（含 1900 和 2000）之间。如果一个人在某一年的任意时期都处于生存状态，那么他们应该被纳入那一年的统计中。例如，生于 1908 年、死于 1909 年的人应当被列入 1908 年和 1909 年的计数。

如果有多个年份生存人数相同且均为最大值，输出其中最小的年份。

**示例：**

```
输入：
birth = [1900, 1901, 1970]
death = [1948, 1951, 2000]
输出： 1970
解释： 1970 年是生存人数最多的一年（2 人）。
```

**提示：**

- `birth.length == death.length <= 10000`
- `1900 <= birth[i] <= death[i] <= 2000`

---

## 二、解答方法

### 2.1 方法一：差分数组

**1. 思路**

用长度 102 的数组（年份 1900~2001 映射到 0~101）做差分：每人在 `birth` 年份 +1，在 `death+1` 年份 −1，最后前缀和求每年人数，取最大值对应最小年份。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maxAliveYear(int[] birth, int[] death) {
        int[] diff = new int[102]; // 1900..2001
        for (int i = 0; i < birth.length; i++) {
            diff[birth[i] - 1900]++;
            diff[death[i] - 1900 + 1]--;
        }
        int cur = 0, max = 0, ans = 1900;
        for (int y = 0; y < 101; y++) {
            cur += diff[y];
            if (cur > max) { max = cur; ans = 1900 + y; }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxAliveYear(self, birth: List[int], death: List[int]) -> int:
        diff = [0] * 102
        for b, d in zip(birth, death):
            diff[b - 1900] += 1
            diff[d - 1900 + 1] -= 1
        cur = maxc = 0; ans = 1900
        for y in range(101):
            cur += diff[y]
            if cur > maxc:
                maxc = cur; ans = 1900 + y
        return ans
```

```go [Go]
func maxAliveYear(birth []int, death []int) int {
    diff := make([]int, 102)
    for i := range birth {
        diff[birth[i]-1900]++
        diff[death[i]-1900+1]--
    }
    cur, maxc, ans := 0, 0, 1900
    for y := 0; y < 101; y++ {
        cur += diff[y]
        if cur > maxc { maxc = cur; ans = 1900 + y }
    }
    return ans
}
```

```c [C]
int maxAliveYear(int* birth, int birthSize, int* death, int deathSize) {
    int diff[102] = {0};
    for (int i = 0; i < birthSize; i++) {
        diff[birth[i]-1900]++;
        diff[death[i]-1900+1]--;
    }
    int cur = 0, maxc = 0, ans = 1900;
    for (int y = 0; y < 101; y++) {
        cur += diff[y];
        if (cur > maxc) { maxc = cur; ans = 1900 + y; }
    }
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int maxAliveYear(vector<int>& birth, vector<int>& death) {
        int diff[102] = {0};
        for (int i = 0; i < birth.size(); i++) {
            diff[birth[i]-1900]++;
            diff[death[i]-1900+1]--;
        }
        int cur = 0, maxc = 0, ans = 1900;
        for (int y = 0; y < 101; y++) {
            cur += diff[y];
            if (cur > maxc) { maxc = cur; ans = 1900 + y; }
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var maxAliveYear = function(birth, death) {
    const diff = new Array(102).fill(0);
    for (let i = 0; i < birth.length; i++) {
        diff[birth[i]-1900]++;
        diff[death[i]-1900+1]--;
    }
    let cur = 0, maxc = 0, ans = 1900;
    for (let y = 0; y < 101; y++) {
        cur += diff[y];
        if (cur > maxc) { maxc = cur; ans = 1900 + y; }
    }
    return ans;
};
```

```typescript [TypeScript]
function maxAliveYear(birth: number[], death: number[]): number {
    const diff = new Array(102).fill(0);
    for (let i = 0; i < birth.length; i++) {
        diff[birth[i]-1900]++;
        diff[death[i]-1900+1]--;
    }
    let cur = 0, maxc = 0, ans = 1900;
    for (let y = 0; y < 101; y++) {
        cur += diff[y];
        if (cur > maxc) { maxc = cur; ans = 1900 + y; }
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(N + 年份范围)`，年份范围固定 101，故 `O(N)`。
- **空间复杂度**：`O(1)`（固定长度数组）。

---

### 2.2 方法二：事件排序

**1. 思路**

将每个出生记为 `+1` 事件、死亡记为 `−1` 事件（死亡事件放在死亡年份的下一年），按年份排序后扫描，维护当前人数与最大值。本质与差分数组等价，但使用事件列表。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maxAliveYear(int[] birth, int[] death) {
        List<int[]> events = new ArrayList<>();
        for (int b : birth) events.add(new int[]{b, 1});
        for (int d : death) events.add(new int[]{d + 1, -1});
        events.sort((a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        int cur = 0, max = 0, ans = 1900;
        for (int[] e : events) {
            cur += e[1];
            if (e[1] == 1 && cur > max) { max = cur; ans = e[0]; }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxAliveYear(self, birth: List[int], death: List[int]) -> int:
        events = [(b, 1) for b in birth] + [(d + 1, -1) for d in death]
        events.sort()
        cur = maxc = 0; ans = 1900
        for y, d in events:
            cur += d
            if d == 1 and cur > maxc:
                maxc = cur; ans = y
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxAliveYear(vector<int>& birth, vector<int>& death) {
        vector<pair<int,int>> ev;
        for (int b : birth) ev.push_back({b, 1});
        for (int d : death) ev.push_back({d + 1, -1});
        sort(ev.begin(), ev.end());
        int cur = 0, maxc = 0, ans = 1900;
        for (auto& e : ev) {
            cur += e.second;
            if (e.second == 1 && cur > maxc) { maxc = cur; ans = e.first; }
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var maxAliveYear = function(birth, death) {
    const events = [];
    for (const b of birth) events.push([b, 1]);
    for (const d of death) events.push([d + 1, -1]);
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let cur = 0, maxc = 0, ans = 1900;
    for (const [y, d] of events) {
        cur += d;
        if (d === 1 && cur > maxc) { maxc = cur; ans = y; }
    }
    return ans;
};
```

```typescript [TypeScript]
function maxAliveYear(birth: number[], death: number[]): number {
    const events: [number, number][] = [];
    for (const b of birth) events.push([b, 1]);
    for (const d of death) events.push([d + 1, -1]);
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let cur = 0, maxc = 0, ans = 1900;
    for (const [y, d] of events) {
        cur += d;
        if (d === 1 && cur > maxc) { maxc = cur; ans = y; }
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(N log N)`（排序）。
- **空间复杂度**：`O(N)`。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                       |
| ---------- | ---------- | ---------- | -------------------------- |
| 差分数组   | `O(N)`     | `O(1)`     | 最优，推荐                 |
| 事件排序   | `O(N log N)` | `O(N)`   | 思路直观，等价实现         |

**推荐**：使用差分数组（出生 +1、死亡次年 −1），前缀和即得每年人数，取最大值最小年份。
