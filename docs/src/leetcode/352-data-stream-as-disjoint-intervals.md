# [352. 将数据流变为多个不相交区间](https://leetcode.cn/problems/data-stream-as-disjoint-intervals/)

## 一、题目描述

给定一个整数数据流，依次 `addNum(val)` 添加，可随时 `getIntervals()` 返回当前所有已添加数字合并后的 **不相交闭区间列表**（按起点升序）。

**示例：**
```
addNum(1)         → [[1,1]]
addNum(3)         → [[1,1],[3,3]]
addNum(7)         → [[1,1],[3,3],[7,7]]
addNum(2)         → [[1,3],[7,7]]（1 与 2 合并，再连 3）
addNum(6)         → [[1,3],[6,7]]
```

**提示：** `0 <= val <= 10⁴`，最多 `3×10⁴` 次 `addNum`、`getIntervals`。

## 二、解答方法

### 方法一：有序集合（TreeMap/红黑树）

**思路：** 用有序结构存「区间起点 → 区间终点」。插入 `val` 时：找 `val-1` 所在/相邻区间（左）和 `val+1` 所在区间（右），合并三者。找到左边界 `L=min(左区间起点,val)`、右边界 `R=max(右区间终点,val)`，删除被覆盖的区间并插入 `[L,R]`。`TreeMap` 的 `floorKey/ceilingKey` 高效实现。

:::::: code-group

```java [Java]
class SummaryRanges {
    private TreeMap<Integer, Integer> map = new TreeMap<>();   // start -> end
    public void addNum(int val) {
        Integer left = map.floorKey(val), right = map.ceilingKey(val);
        // 与左区间相连？val == left.end+1；与右区间相连？val == right.start-1
        if (left != null && map.get(left) >= val - 1) {
            // 合并到左区间，但右端可能延伸到右区间
        }
        // 简化：检查左右是否需合并
        Integer lStart = map.floorKey(val), rStart = map.ceilingKey(val);
        int L = val, R = val;
        if (lStart != null && map.get(lStart) >= val - 1) { L = lStart; R = Math.max(R, map.get(lStart)); }
        if (rStart != null && rStart <= val + 1) { R = Math.max(R, map.get(rStart)); }
        // 删除 [L,R] 范围内的旧区间
        Integer it = map.floorKey(L);
        while (it != null && map.get(it) >= L) {
            Integer next = map.lowerKey(it);
            map.remove(it); it = next;
        }
        map.put(L, R);
    }
    public int[][] getIntervals() {
        int[][] res = new int[map.size()][2]; int i=0;
        for (var e : map.entrySet()) { res[i][0]=e.getKey(); res[i][1]=e.getValue(); i++; }
        return res;
    }
}
```

```python [Python]
class SummaryRanges:
    def __init__(self):
        self.map = {}
    def addNum(self, val: int) -> None:
        # Python 无原生有序 dict 的高效 floor/ceiling；简单用 list 维护（小规模可接受）
        starts = sorted(self.map.keys())
        L = R = val
        # 合并相邻
        toDel = []
        for s, e in list(self.map.items()):
            if e < val-1: continue
            if s > val+1: break
            if e >= val-1 and s <= val+1:   # 重叠或相邻
                L = min(L, s); R = max(R, e); toDel.append(s)
        for s in toDel: del self.map[s]
        self.map[L] = R
    def getIntervals(self) -> List[List[int]]:
        return [[s, self.map[s]] for s in sorted(self.map.keys())]
```

```cpp [C++]
class SummaryRanges {
    map<int,int> m;   // start -> end
public:
    void addNum(int val) {
        auto it = m.upper_bound(val);
        int L = val, R = val;
        // 左区间
        if (it != m.begin()) {
            auto left = prev(it);
            if (left->second >= val-1) { L = left->first; R = max(R, left->second); m.erase(left); }
        }
        // 合并与右侧相连的区间
        while (it != m.end() && it->first <= val+1) { R = max(R, it->second); it = m.erase(it); }
        m[L] = R;
    }
    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        for (auto& e : m) res.push_back({e.first, e.second});
        return res;
    }
};
```

```go [Go]
type SummaryRanges struct { m map[int]int }
func Constructor() SummaryRanges { return SummaryRanges{m: map[int]int{}} }
func (s *SummaryRanges) AddNum(val int) {
    L, R := val, val
    for st, en := range s.m {
        if en < val-1 { continue }
        if st > val+1 { break }
        if en >= val-1 && st <= val+1 { L=min(L,st); R=max(R,en); delete(s.m, st) }
    }
    s.m[L] = R
}
func (s *SummaryRanges) GetIntervals() [][]int {
    starts := make([]int, 0, len(s.m))
    for k := range s.m { starts = append(starts, k) }
    sort.Ints(starts)
    res := [][]int{}
    for _, st := range starts { res = append(res, []int{st, s.m[st]}) }
    return res
}
func min(a,b int) int { if a<b { return a }; return b }
func max(a,b int) int { if a>b { return a }; return b }
```

```js [JavaScript]
var SummaryRanges = function () { this.map = new Map(); };
SummaryRanges.prototype.addNum = function (val) {
    const keys = [...this.map.keys()].sort((a,b)=>a-b);
    let L = val, R = val;
    const toDel = [];
    for (const k of keys) {
        const e = this.map.get(k);
        if (e < val-1) continue;
        if (k > val+1) break;
        if (e >= val-1 && k <= val+1) { L = Math.min(L, k); R = Math.max(R, e); toDel.push(k); }
    }
    for (const k of toDel) this.map.delete(k);
    this.map.set(L, R);
};
SummaryRanges.prototype.getIntervals = function () {
    return [...this.map.keys()].sort((a,b)=>a-b).map(k => [k, this.map.get(k)]);
};
```

::::::

**复杂度：** `addNum` `O(log n)`（TreeMap）/ `O(n)`（无次序结构），`getIntervals` `O(n)`。

## 三、总结

区间合并流式版：核心是「插入值可能与左右区间合并」。用有序映射按起点存区间，定位相邻区间（左：`floor(val)` 且 `end >= val-1`；右：`ceiling(val)` 且 `start <= val+1`），删旧插新。本题与 `56 合并区间`（离线）、`57 插入区间` 同类。Java/CPP 用 TreeMap/map 最优；Python/JS 用排序 list 在小规模也可。
