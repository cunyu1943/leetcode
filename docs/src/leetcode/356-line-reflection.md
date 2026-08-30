# [356. 直线镜像](https://leetcode.cn/problems/line-reflection/) [🔒 会员题]

## 一、题目描述

给定一个二维平面上的点集 `points`，判断是否存在一条 **垂直直线**，使所有点关于该直线镜像对称（即每个点都有对应点关于直线对称）。存在返回 `true`。

**示例：**
```
输入：points = [[1,1],[-1,1]]   输出：true（关于 x=0 对称）
输入：points = [[1,1],[-1,-1]]  输出：false
```

**提示：** `1 <= points.length <= 10⁴`，`-10⁴ <= x, y <= 10⁴`。

## 二、解答方法

### 方法一：确定对称轴 + 哈希校验

**思路：** 镜像轴 `x = sum/2`，其中 `sum = minX + maxX`（所有点最小 x 与最大 x 之和，轴就是它们的中点）。用 `Set` 存所有点 `(x,y)`。对每点 `(x,y)` 检查其镜像点 `(sum-x, y)` 是否存在（且不能是自己，除非有重复点——用计数）。全部存在则对称。

:::::: code-group

```java [Java]
class Solution {
    public boolean isReflected(int[][] points) {
        int minX = Integer.MAX_VALUE, maxX = Integer.MIN_VALUE;
        Set<String> set = new HashSet<>();
        for (int[] p : points) {
            minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
            set.add(p[0] + "," + p[1]);
        }
        int sum = minX + maxX;
        for (int[] p : points) {
            String mirror = (sum - p[0]) + "," + p[1];
            if (!set.contains(mirror)) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isReflected(self, points: List[List[int]]) -> bool:
        minX = min(p[0] for p in points); maxX = max(p[0] for p in points)
        s = {(p[0], p[1]) for p in points}
        total = minX + maxX
        for x, y in points:
            if (total - x, y) not in s: return False
        return True
```

```cpp [C++]
class Solution {
public:
    bool isReflected(vector<vector<int>>& points) {
        int minX=INT_MAX, maxX=INT_MIN;
        set<pair<int,int>> s;
        for (auto& p : points) { minX=min(minX,p[0]); maxX=max(maxX,p[0]); s.insert({p[0],p[1]}); }
        int total=minX+maxX;
        for (auto& p : points) if (!s.count({total-p[0], p[1]})) return false;
        return true;
    }
};
```

```go [Go]
func isReflected(points [][]int) bool {
    minX, maxX := 1<<30, -(1<<30)
    s := map[[2]int]bool{}
    for _, p := range points {
        if p[0] < minX { minX = p[0] }
        if p[0] > maxX { maxX = p[0] }
        s[[2]int{p[0], p[1]}] = true
    }
    total := minX + maxX
    for _, p := range points {
        if !s[[2]int{total-p[0], p[1]}] { return false }
    }
    return true
}
```

```js [JavaScript]
var isReflected = function (points) {
    let minX = Infinity, maxX = -Infinity;
    const s = new Set();
    for (const [x,y] of points) { minX=Math.min(minX,x); maxX=Math.max(maxX,x); s.add(x+","+y); }
    const total = minX + maxX;
    for (const [x,y] of points) if (!s.has((total-x)+","+y)) return false;
    return true;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

镜像轴由「最小 x + 最大 x」唯一确定（若对称轴存在，必过这两点中点）。求出轴后逐点查镜像即可。注意「自身对称」的点（重复点也合法，因 set 含它）。本题是几何哈希校验，与 `270 最近 BST 值` 无关，考「对称性 + 哈希」。重复点不用计数（set 已含）。
