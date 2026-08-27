# [面试题 17.08. 马戏团人塔](https://leetcode.cn/problems/circus-tower-lcci/)

## 一、题目描述

有个马戏团正在设计叠罗汉的表演方案，一个人要站在另一人的肩膀上。出于实际和美观的考虑，上面的人要比下面的人矮且轻。已知马戏团每个人的身高和体重，请编写代码计算叠罗汉最多能叠几个人。

**示例：**

```
输入: height = [65,70,56,75,60,68], weight = [100,150,90,190,95,110]
输出: 6
解释: 从上往下数，可叠 6 层：(56,90), (60,95), (65,100), (68,110), (70,150), (75,190)
```

---

## 二、解答方法

### 2.1 方法一：排序 + 最长递增子序列（LIS）

**1. 思路**

先按身高升序排序，身高相同则按体重降序（保证同身高的人不会被错误计入 LIS）。然后问题转化为在体重序列上求最长严格递增子序列的长度，可用二分法优化到 `O(n log n)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int bestSeqAtIndex(int[] height, int[] weight) {
        int n = height.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> height[a] != height[b] ? height[a] - height[b] : weight[b] - weight[a]);
        List<Integer> tails = new ArrayList<>();
        for (int i : idx) {
            int w = weight[i];
            int pos = Collections.binarySearch(tails, w);
            if (pos < 0) pos = -pos - 1;
            if (pos == tails.size()) tails.add(w);
            else tails.set(pos, w);
        }
        return tails.size();
    }
}
```

```python [Python]
class Solution:
    def bestSeqAtIndex(self, height: List[int], weight: List[int]) -> int:
        people = sorted(zip(height, weight), key=lambda x: (x[0], -x[1]))
        import bisect
        tails = []
        for h, w in people:
            pos = bisect.bisect_left(tails, w)
            if pos == len(tails):
                tails.append(w)
            else:
                tails[pos] = w
        return len(tails)
```

```go [Go]
func bestSeqAtIndex(height []int, weight []int) int {
    n := len(height)
    type pair struct{ h, w int }
    p := make([]pair, n)
    for i := range height {
        p[i] = pair{height[i], weight[i]}
    }
    sort.Slice(p, func(i, j int) bool {
        if p[i].h != p[j].h { return p[i].h < p[j].h }
        return p[i].w > p[j].w
    })
    tails := []int{}
    for _, x := range p {
        pos := sort.SearchInts(tails, x.w)
        if pos == len(tails) { tails = append(tails, x.w) } else { tails[pos] = x.w }
    }
    return len(tails)
}
```

```c [C]
// C 版本较长，思路同上：按身高排序(同身高体重降序)后求体重 LIS
```

```cpp [C++]
class Solution {
public:
    int bestSeqAtIndex(vector<int>& height, vector<int>& weight) {
        int n = height.size();
        vector<pair<int, int>> people(n);
        for (int i = 0; i < n; i++) people[i] = {height[i], weight[i]};
        sort(people.begin(), people.end(), [](auto& a, auto& b) {
            return a.first != b.first ? a.first < b.first : a.second > b.second;
        });
        vector<int> tails;
        for (auto& p : people) {
            auto it = lower_bound(tails.begin(), tails.end(), p.second);
            if (it == tails.end()) tails.push_back(p.second);
            else *it = p.second;
        }
        return tails.size();
    }
};
```

```javascript [JavaScript]
var bestSeqAtIndex = function(height, weight) {
    const n = height.length;
    const people = [];
    for (let i = 0; i < n; i++) people.push([height[i], weight[i]]);
    people.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
    const tails = [];
    for (const [h, w] of people) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (tails[mid] < w) left = mid + 1; else right = mid;
        }
        if (left === tails.length) tails.push(w); else tails[left] = w;
    }
    return tails.length;
};
```

```typescript [TypeScript]
function bestSeqAtIndex(height: number[], weight: number[]): number {
    const n = height.length;
    const people: [number, number][] = [];
    for (let i = 0; i < n; i++) people.push([height[i], weight[i]]);
    people.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
    const tails: number[] = [];
    for (const [h, w] of people) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (tails[mid] < w) left = mid + 1; else right = mid;
        }
        if (left === tails.length) tails.push(w); else tails[left] = w;
    }
    return tails.length;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，排序 + LIS。
- **空间复杂度**：`O(n)`。

---

### 2.2 方法二：动态规划（O(n²) LIS）

**1. 思路**

排序后使用经典 `O(n²)` 的 LIS 动态规划：对每个位置 `i`，找前面体重更小的 `j` 转移 `dp[i] = max(dp[j] + 1)`。实现直观但较慢。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int bestSeqAtIndex(int[] height, int[] weight) {
        int n = height.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> height[a] - height[b]);
        int[] dp = new int[n];
        int ans = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (height[idx[j]] < height[idx[i]] && weight[idx[j]] < weight[idx[i]])
                    dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def bestSeqAtIndex(self, height: List[int], weight: List[int]) -> int:
        people = sorted(zip(height, weight))
        n = len(people)
        dp = [1] * n
        ans = 1
        for i in range(n):
            for j in range(i):
                if people[j][0] < people[i][0] and people[j][1] < people[i][1]:
                    dp[i] = max(dp[i], dp[j] + 1)
            ans = max(ans, dp[i])
        return ans
```

```cpp [C++]
class Solution {
public:
    int bestSeqAtIndex(vector<int>& height, vector<int>& weight) {
        int n = height.size();
        vector<pair<int, int>> p(n);
        for (int i = 0; i < n; i++) p[i] = {height[i], weight[i]};
        sort(p.begin(), p.end());
        vector<int> dp(n, 1);
        int ans = 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (p[j].first < p[i].first && p[j].second < p[i].second)
                    dp[i] = max(dp[i], dp[j] + 1);
            }
            ans = max(ans, dp[i]);
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var bestSeqAtIndex = function(height, weight) {
    const n = height.length;
    const p = [];
    for (let i = 0; i < n; i++) p.push([height[i], weight[i]]);
    p.sort((a, b) => a[0] - b[0]);
    const dp = new Array(n).fill(1);
    let ans = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (p[j][0] < p[i][0] && p[j][1] < p[i][1]) dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        ans = Math.max(ans, dp[i]);
    }
    return ans;
};
```

```typescript [TypeScript]
function bestSeqAtIndex(height: number[], weight: number[]): number {
    const n = height.length;
    const p: [number, number][] = [];
    for (let i = 0; i < n; i++) p.push([height[i], weight[i]]);
    p.sort((a, b) => a[0] - b[0]);
    const dp = new Array(n).fill(1);
    let ans = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (p[j][0] < p[i][0] && p[j][1] < p[i][1]) dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        ans = Math.max(ans, dp[i]);
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 排序 + LIS    | `O(n log n)` | `O(n)`     | 最优，推荐                 |
| 动态规划 LIS  | `O(n²)`    | `O(n)`     | 直观，数据大时超时         |

**推荐**：使用排序 + 二分 LIS。注意同身高时体重必须降序，避免把同一身高的人叠在一起。
