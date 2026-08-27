# [面试题 16.06. 最小差](https://leetcode.cn/problems/smallest-difference-lcci/)

## 一、题目描述

给定两个整数数组 `a` 和 `b`，计算具有最小差绝对值的一对数值（每个数组中取一个值），并返回该最小差。

**示例：**

```
输入：{1, 3, 15, 11, 2}, {23, 127, 235, 19, 8}
输出：3，即数值对 (11, 8)
```

**提示：**

- `1 <= a.length, b.length <= 100000`
- `-2147483648 <= a[i], b[i] <= 2147483647`
- 结果区间在 `[0, 2147483647]` 之间，超出整数范围请用 `long` 存储差值

---

## 二、解答方法

### 2.1 方法一：排序 + 双指针

**1. 思路**

将两个数组排序，用双指针从头部开始：若 `a[i] < b[j]` 则 `i++`（差距可能缩小），否则 `j++`，过程中记录最小绝对差。时间复杂度 `O(n log n + m log m)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int smallestDifference(int[] a, int[] b) {
        Arrays.sort(a);
        Arrays.sort(b);
        int i = 0, j = 0;
        long ans = Long.MAX_VALUE;
        while (i < a.length && j < b.length) {
            ans = Math.min(ans, Math.abs((long)a[i] - (long)b[j]));
            if (a[i] < b[j]) i++; else j++;
        }
        return (int) ans;
    }
}
```

```python [Python]
class Solution:
    def smallestDifference(self, a: List[int], b: List[int]) -> int:
        a.sort(); b.sort()
        i = j = 0
        ans = float('inf')
        while i < len(a) and j < len(b):
            ans = min(ans, abs(a[i] - b[j]))
            if a[i] < b[j]: i += 1
            else: j += 1
        return ans
```

```go [Go]
import "sort"
func smallestDifference(a []int, b []int) int {
    sort.Ints(a); sort.Ints(b)
    i, j := 0, 0
    ans := int64(1<<62 - 1)
    for i < len(a) && j < len(b) {
        diff := int64(a[i]) - int64(b[j])
        if diff < 0 { diff = -diff }
        if diff < ans { ans = diff }
        if a[i] < b[j] { i++ } else { j++ }
    }
    return int(ans)
}
```

```c [C]
// C 中需自行实现排序（qsort）后双指针，逻辑同 Java
```

```cpp [C++]
class Solution {
public:
    int smallestDifference(vector<int>& a, vector<int>& b) {
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        int i = 0, j = 0;
        long long ans = LLONG_MAX;
        while (i < a.size() && j < b.size()) {
            ans = min(ans, abs((long long)a[i] - (long long)b[j]));
            if (a[i] < b[j]) i++; else j++;
        }
        return (int) ans;
    }
};
```

```javascript [JavaScript]
var smallestDifference = function(a, b) {
    a.sort((x, y) => x - y); b.sort((x, y) => x - y);
    let i = 0, j = 0, ans = Infinity;
    while (i < a.length && j < b.length) {
        ans = Math.min(ans, Math.abs(a[i] - b[j]));
        if (a[i] < b[j]) i++; else j++;
    }
    return ans;
};
```

```typescript [TypeScript]
function smallestDifference(a: number[], b: number[]): number {
    a.sort((x, y) => x - y); b.sort((x, y) => x - y);
    let i = 0, j = 0, ans = Infinity;
    while (i < a.length && j < b.length) {
        ans = Math.min(ans, Math.abs(a[i] - b[j]));
        if (a[i] < b[j]) i++; else j++;
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n + m log m)`。
- **空间复杂度**：`O(1)`（排序原地，不计排序栈）。

---

### 2.2 方法二：哈希集合（近似）

**1. 思路**

将较短数组放入集合，遍历较长数组查找最接近的已存在值。但整数范围极大，最坏仍接近暴力，不优于双指针，仅在特定分布下可用。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def smallestDifference(self, a: List[int], b: List[int]) -> int:
        set_b = set(b)
        arr = sorted(b)
        ans = float('inf')
        import bisect
        for x in a:
            idx = bisect.bisect_left(arr, x)
            if idx < len(arr): ans = min(ans, abs(arr[idx] - x))
            if idx > 0: ans = min(ans, abs(arr[idx-1] - x))
        return ans
```

```cpp [C++]
class Solution {
public:
    int smallestDifference(vector<int>& a, vector<int>& b) {
        sort(b.begin(), b.end());
        int ans = INT_MAX;
        for (int x : a) {
            auto it = lower_bound(b.begin(), b.end(), x);
            if (it != b.end()) ans = min(ans, abs(*it - x));
            if (it != b.begin()) ans = min(ans, abs(*(it-1) - x));
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var smallestDifference = function(a, b) {
    b.sort((x, y) => x - y);
    let ans = Infinity;
    for (const x of a) {
        let lo = 0, hi = b.length;
        while (lo < hi) { const m = (lo+hi)>>1; if (b[m] < x) lo = m+1; else hi = m; }
        if (lo < b.length) ans = Math.min(ans, Math.abs(b[lo] - x));
        if (lo > 0) ans = Math.min(ans, Math.abs(b[lo-1] - x));
    }
    return ans;
};
```

```typescript [TypeScript]
function smallestDifference(a: number[], b: number[]): number {
    b.sort((x, y) => x - y);
    let ans = Infinity;
    for (const x of a) {
        let lo = 0, hi = b.length;
        while (lo < hi) { const m = (lo+hi)>>1; if (b[m] < x) lo = m+1; else hi = m; }
        if (lo < b.length) ans = Math.min(ans, Math.abs(b[lo] - x));
        if (lo > 0) ans = Math.min(ans, Math.abs(b[lo-1] - x));
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m log m + n log m)`。
- **空间复杂度**：`O(1)`（不计排序）。

---

## 三、总结

| 方法       | 时间复杂度           | 空间复杂度 | 特点                       |
| ---------- | -------------------- | ---------- | -------------------------- |
| 排序+双指针| `O(n log n + m log m)` | `O(1)`   | 最优，推荐                 |
| 排序+二分  | `O(m log m + n log m)` | `O(1)`   | 思路等价，实现稍复杂       |

**推荐**：排序后双指针，一次线性扫描即得最小绝对差。
