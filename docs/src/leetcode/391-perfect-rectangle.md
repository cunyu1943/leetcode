# [391. 完美矩形](https://leetcode.cn/problems/perfect-rectangle/)

## 一、题目描述

给你一个数组 `rectangles`，其中 `rectangles[i] = [x_i, y_i, a_i, b_i]` 表示一个坐标轴平行的矩形。这个矩形的左下角在 `(x_i, y_i)`，右上角在 `(a_i, b_i)`。

如果所有矩形拼成的图形严格等于一个矩形（即没有任何重叠或缝隙），则返回 `true`，否则返回 `false`。

**示例 1：**

```
输入：rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
输出：true
解释：5 个矩形恰好拼成了一个完美的矩形而无重叠和缝隙。
```

**示例 2：**

```
输入：rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
输出：false
解释：因为中间有相交区域，所以图中存在重叠。
```

**提示：**

- `1 <= rectangles.length <= 2 * 10^4`
- `rectangles[i].length == 4`
- `-10^5 <= x_i, y_i, a_i, b_i <= 10^5`
- `x_i < a_i`，`y_i < b_i`

## 二、解答方法

### 2.1 方法一：面积 + 顶点法

1. 思路

完美矩形需同时满足两个条件：

- 所有小矩形面积之和等于大矩形面积；
- 所有小矩形的顶点中，只有最外围的 4 个角落顶点出现奇数次（各 1 次），其余内部顶点必须成对出现（偶数次，2 次或 4 次）。

用一个集合记录所有顶点出现情况：遇到顶点就翻转（有则删、无则加），最后集合应恰好剩下 4 个最外顶点，且其面积等于总面积。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean isRectangleCover(int[][] rectangles) {
        int area = 0;
        int minX = Integer.MAX_VALUE, minY = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE, maxY = Integer.MIN_VALUE;
        Set<Long> corners = new HashSet<>();
        for (int[] r : rectangles) {
            int x1 = r[0], y1 = r[1], x2 = r[2], y2 = r[3];
            area += (x2 - x1) * (y2 - y1);
            minX = Math.min(minX, x1);
            minY = Math.min(minY, y1);
            maxX = Math.max(maxX, x2);
            maxY = Math.max(maxY, y2);
            long a = hash(x1, y1), b = hash(x1, y2);
            long c = hash(x2, y1), d = hash(x2, y2);
            toggle(corners, a); toggle(corners, b);
            toggle(corners, c); toggle(corners, d);
        }
        long p1 = hash(minX, minY), p2 = hash(minX, maxY);
        long p3 = hash(maxX, minY), p4 = hash(maxX, maxY);
        if (corners.size() != 4) return false;
        if (!corners.contains(p1) || !corners.contains(p2)
            || !corners.contains(p3) || !corners.contains(p4)) return false;
        return area == (maxX - minX) * (maxY - minY);
    }
    private void toggle(Set<Long> s, long x) {
        if (s.contains(x)) s.remove(x); else s.add(x);
    }
    private long hash(int x, int y) {
        return ((long) x << 32) | (y + 60000L);
    }
}
```

```python [Python]
class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        area = 0
        min_x = min_y = float('inf')
        max_x = max_y = float('-inf')
        corners = set()
        for x1, y1, x2, y2 in rectangles:
            area += (x2 - x1) * (y2 - y1)
            min_x, min_y = min(min_x, x1), min(min_y, y1)
            max_x, max_y = max(max_x, x2), max(max_y, y2)
            for p in ((x1, y1), (x1, y2), (x2, y1), (x2, y2)):
                if p in corners:
                    corners.remove(p)
                else:
                    corners.add(p)
        if len(corners) != 4:
            return False
        for p in ((min_x, min_y), (min_x, max_y), (max_x, min_y), (max_x, max_y)):
            if p not in corners:
                return False
        return area == (max_x - min_x) * (max_y - min_y)
```

```cpp [C++]
class Solution {
public:
    bool isRectangleCover(vector<vector<int>>& rectangles) {
        long long area = 0;
        int minX = INT_MAX, minY = INT_MAX, maxX = INT_MIN, maxY = INT_MIN;
        set<pair<int, int>> corners;
        for (auto& r : rectangles) {
            int x1 = r[0], y1 = r[1], x2 = r[2], y2 = r[3];
            area += (long long)(x2 - x1) * (y2 - y1);
            minX = min(minX, x1); minY = min(minY, y1);
            maxX = max(maxX, x2); maxY = max(maxY, y2);
            for (auto p : {make_pair(x1, y1), make_pair(x1, y2), make_pair(x2, y1), make_pair(x2, y2)}) {
                if (corners.count(p)) corners.erase(p);
                else corners.insert(p);
            }
        }
        if (corners.size() != 4) return false;
        vector<pair<int,int>> es = {{minX,minY},{minX,maxY},{maxX,minY},{maxX,maxY}};
        for (auto& p : es) if (!corners.count(p)) return false;
        return area == (long long)(maxX - minX) * (maxY - minY);
    }
};
```

```go [Go]
func isRectangleCover(rectangles [][]int) bool {
	area := 0
	minX, minY, maxX, maxY := math.MaxInt32, math.MaxInt32, math.MinInt32, math.MinInt32
	corners := map[[2]int]bool{}
	for _, r := range rectangles {
		x1, y1, x2, y2 := r[0], r[1], r[2], r[3]
		area += (x2 - x1) * (y2 - y1)
		if x1 < minX { minX = x1 }
		if y1 < minY { minY = y1 }
		if x2 > maxX { maxX = x2 }
		if y2 > maxY { maxY = y2 }
		for _, p := range [][2]int{{x1, y1}, {x1, y2}, {x2, y1}, {x2, y2}} {
			if corners[p] { delete(corners, p) } else { corners[p] = true }
		}
	}
	if len(corners) != 4 { return false }
	for _, p := range [][2]int{{minX, minY}, {minX, maxY}, {maxX, minY}, {maxX, maxY}} {
		if !corners[p] { return false }
	}
	return area == (maxX-minX)*(maxY-minY)
}
```

```javascript [JavaScript]
var isRectangleCover = function (rectangles) {
    let area = 0;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const corners = new Set();
    const key = (x, y) => x + ',' + y;
    for (const [x1, y1, x2, y2] of rectangles) {
        area += (x2 - x1) * (y2 - y1);
        minX = Math.min(minX, x1); minY = Math.min(minY, y1);
        maxX = Math.max(maxX, x2); maxY = Math.max(maxY, y2);
        for (const p of [[x1, y1], [x1, y2], [x2, y1], [x2, y2]]) {
            const k = key(p[0], p[1]);
            if (corners.has(k)) corners.delete(k); else corners.add(k);
        }
    }
    if (corners.size !== 4) return false;
    for (const p of [[minX, minY], [minX, maxY], [maxX, minY], [maxX, maxY]]) {
        if (!corners.has(key(p[0], p[1]))) return false;
    }
    return area === (maxX - minX) * (maxY - minY);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$，其中 $n$ 为矩形个数。
- 空间复杂度：$O(n)$，集合存储顶点。

## 三、总结

本题是经典的「拼图校验」问题，核心是**面积 + 顶点奇偶性**双重校验，缺一不可（仅有面积相等无法排除内部十字重叠）。类似技巧还出现在 223 矩形面积、240 搜索二维矩阵 II 等几何类题目中。
