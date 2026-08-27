# [面试题 17.18. 最短超串](https://leetcode.cn/problems/shortest-supersequence-lcci/)

## 一、题目描述

假设你有两个数组，一个 `big` 和一个 `small`。请实现一个算法，找出 `big` 中包含 `small` 中所有元素的最短子数组，并返回该最短子数组的长度。若无解返回 0。

**示例：**

```
输入:
big = [7,5,9,0,2,1,3,5,7,9,1,1,5,8,8,1,2]
small = [1,5,9]
输出: 6
解释: 包含 1、5、9 的最短子数组为 [5,9,0,2,1,3]，长度为 6。
```

---

## 二、解答方法

### 2.1 方法一：滑动窗口 + 计数

**1. 思路**

用哈希表记录 `small` 各元素所需出现次数，滑动窗口 `[l, r]` 在 `big` 上推进：右移 `r` 扩展窗口，当窗口已包含 `small` 全部元素时尝试右移 `l` 收缩，更新最小长度。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int shortestSeq(int[] big, int[] small) {
        if (big.length == 0 || small.length == 0) return 0;
        Map<Integer, Integer> need = new HashMap<>();
        for (int x : small) need.put(x, need.getOrDefault(x, 0) + 1);
        int needCnt = need.size();
        Map<Integer, Integer> win = new HashMap<>();
        int matched = 0, minLen = Integer.MAX_VALUE, start = 0;
        int l = 0;
        for (int r = 0; r < big.length; r++) {
            int x = big[r];
            if (need.containsKey(x)) {
                win.put(x, win.getOrDefault(x, 0) + 1);
                if (win.get(x).intValue() == need.get(x).intValue()) matched++;
            }
            while (matched == needCnt) {
                if (r - l + 1 < minLen) { minLen = r - l + 1; start = l; }
                int y = big[l];
                if (need.containsKey(y)) {
                    win.put(y, win.get(y) - 1);
                    if (win.get(y) < need.get(y)) matched--;
                }
                l++;
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}
```

```python [Python]
class Solution:
    def shortestSeq(self, big: List[int], small: List[int]) -> int:
        from collections import Counter
        if not big or not small:
            return 0
        need = Counter(small)
        need_cnt = len(need)
        win = {}
        matched = 0
        min_len = float('inf')
        l = 0
        for r, x in enumerate(big):
            if x in need:
                win[x] = win.get(x, 0) + 1
                if win[x] == need[x]:
                    matched += 1
            while matched == need_cnt:
                min_len = min(min_len, r - l + 1)
                y = big[l]
                if y in need:
                    win[y] -= 1
                    if win[y] < need[y]:
                        matched -= 1
                l += 1
        return 0 if min_len == float('inf') else min_len
```

```go [Go]
func shortestSeq(big []int, small []int) int {
    if len(big) == 0 || len(small) == 0 { return 0 }
    need := map[int]int{}
    for _, x := range small { need[x]++ }
    needCnt := len(need)
    win := map[int]int{}
    matched, minLen, l := 0, len(big)+1, 0
    for r, x := range big {
        if _, ok := need[x]; ok {
            win[x]++
            if win[x] == need[x] { matched++ }
        }
        for matched == needCnt {
            if r-l+1 < minLen { minLen = r - l + 1 }
            y := big[l]
            if _, ok := need[y]; ok {
                win[y]--
                if win[y] < need[y] { matched-- }
            }
            l++
        }
    }
    if minLen == len(big)+1 { return 0 }
    return minLen
}
```

```c [C]
// 滑动窗口在 C 中需手动建哈希表，逻辑同 Java
```

```cpp [C++]
class Solution {
public:
    int shortestSeq(vector<int>& big, vector<int>& small) {
        if (big.empty() || small.empty()) return 0;
        unordered_map<int, int> need;
        for (int x : small) need[x]++;
        int needCnt = need.size();
        unordered_map<int, int> win;
        int matched = 0, minLen = INT_MAX, l = 0;
        for (int r = 0; r < big.size(); r++) {
            int x = big[r];
            if (need.count(x)) {
                if (++win[x] == need[x]) matched++;
            }
            while (matched == needCnt) {
                minLen = min(minLen, r - l + 1);
                int y = big[l];
                if (need.count(y)) {
                    if (--win[y] < need[y]) matched--;
                }
                l++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

```javascript [JavaScript]
var shortestSeq = function(big, small) {
    if (!big.length || !small.length) return 0;
    const need = new Map();
    for (const x of small) need.set(x, (need.get(x) || 0) + 1);
    const needCnt = need.size;
    const win = new Map();
    let matched = 0, minLen = Infinity, l = 0;
    for (let r = 0; r < big.length; r++) {
        const x = big[r];
        if (need.has(x)) {
            win.set(x, (win.get(x) || 0) + 1);
            if (win.get(x) === need.get(x)) matched++;
        }
        while (matched === needCnt) {
            minLen = Math.min(minLen, r - l + 1);
            const y = big[l];
            if (need.has(y)) {
                win.set(y, win.get(y) - 1);
                if (win.get(y) < need.get(y)) matched--;
            }
            l++;
        }
    }
    return minLen === Infinity ? 0 : minLen;
};
```

```typescript [TypeScript]
function shortestSeq(big: number[], small: number[]): number {
    if (!big.length || !small.length) return 0;
    const need = new Map<number, number>();
    for (const x of small) need.set(x, (need.get(x) || 0) + 1);
    const needCnt = need.size;
    const win = new Map<number, number>();
    let matched = 0, minLen = Infinity, l = 0;
    for (let r = 0; r < big.length; r++) {
        const x = big[r];
        if (need.has(x)) {
            win.set(x, (win.get(x) || 0) + 1);
            if (win.get(x) === need.get(x)) matched++;
        }
        while (matched === needCnt) {
            minLen = Math.min(minLen, r - l + 1);
            const y = big[l];
            if (need.has(y)) {
                win.set(y, win.get(y)! - 1);
                if (win.get(y)! < need.get(y)!) matched--;
            }
            l++;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(len(big) + len(small))`。
- **空间复杂度**：`O(len(small))`。

---

### 2.2 方法二：记录位置后枚举（仅适用 small 很小）

**1. 思路**

记录 `small` 中每个元素在 `big` 中出现的所有下标，然后枚举某个元素的一个位置作为起点，寻找其它元素的最小「不小于该起点」的位置，求最大跨度。适合 `small` 极短的情况。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def shortestSeq(self, big: List[int], small: List[int]) -> int:
        import bisect
        pos = {}
        for i, x in enumerate(big):
            pos.setdefault(x, []).append(i)
        if any(s not in pos for s in small):
            return 0
        # 以每个元素的位置为起点枚举
        candidates = [p for s in small for p in pos[s]]
        candidates.sort()
        ans = float('inf')
        for start in candidates:
            mx = start
            ok = True
            for s in small:
                idx = bisect.bisect_left(pos[s], start)
                if idx == len(pos[s]): ok = False; break
                mx = max(mx, pos[s][idx])
            if ok:
                ans = min(ans, mx - start + 1)
        return 0 if ans == float('inf') else ans
```

```cpp [C++]
class Solution {
public:
    int shortestSeq(vector<int>& big, vector<int>& small) {
        unordered_map<int, vector<int>> pos;
        for (int i = 0; i < big.size(); i++) pos[big[i]].push_back(i);
        for (int s : small) if (!pos.count(s)) return 0;
        int ans = INT_MAX;
        for (int s : small) {
            for (int start : pos[s]) {
                int mx = start;
                bool ok = true;
                for (int t : small) {
                    auto& v = pos[t];
                    auto it = lower_bound(v.begin(), v.end(), start);
                    if (it == v.end()) { ok = false; break; }
                    mx = max(mx, *it);
                }
                if (ok) ans = min(ans, mx - start + 1);
            }
        }
        return ans == INT_MAX ? 0 : ans;
    }
};
```

```javascript [JavaScript]
var shortestSeq = function(big, small) {
    const pos = {};
    big.forEach((x, i) => (pos[x] = pos[x] || []).push(i));
    if (small.some(s => !pos[s])) return 0;
    let ans = Infinity;
    for (const s of small) {
        for (const start of pos[s]) {
            let mx = start, ok = true;
            for (const t of small) {
                const arr = pos[t];
                let lo = 0, hi = arr.length;
                while (lo < hi) { const m = (lo+hi)>>1; if (arr[m] < start) lo = m+1; else hi = m; }
                if (lo === arr.length) { ok = false; break; }
                mx = Math.max(mx, arr[lo]);
            }
            if (ok) ans = Math.min(ans, mx - start + 1);
        }
    }
    return ans === Infinity ? 0 : ans;
};
```

```typescript [TypeScript]
function shortestSeq(big: number[], small: number[]): number {
    const pos: Record<number, number[]> = {};
    big.forEach((x, i) => (pos[x] = pos[x] || []).push(i));
    if (small.some(s => !pos[s])) return 0;
    let ans = Infinity;
    for (const s of small) {
        for (const start of pos[s]) {
            let mx = start, ok = true;
            for (const t of small) {
                const arr = pos[t];
                let lo = 0, hi = arr.length;
                while (lo < hi) { const m = (lo+hi)>>1; if (arr[m] < start) lo = m+1; else hi = m; }
                if (lo === arr.length) { ok = false; break; }
                mx = Math.max(mx, arr[lo]);
            }
            if (ok) ans = Math.min(ans, mx - start + 1);
        }
    }
    return ans === Infinity ? 0 : ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(len(big) + len(small)² · log n)`。
- **空间复杂度**：`O(len(big))`。

---

## 三、总结

| 方法           | 时间复杂度              | 空间复杂度     | 特点                       |
| -------------- | ----------------------- | -------------- | -------------------------- |
| 滑动窗口       | `O(len(big)+len(small))`| `O(len(small))`| 最优，推荐                 |
| 位置枚举       | `O(len(big)+k²·log n)`  | `O(len(big))`  | 仅 small 极短时可用        |

**推荐**：使用滑动窗口，一次线性扫描即可得到最短包含子数组。
