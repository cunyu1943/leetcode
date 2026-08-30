# [452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

## 一、题目描述

在二维平面有若干气球，用区间 `points[i] = [x_start, x_end]` 表示气球在 x 轴的水平直径（y 任意，竖直射击可同时击中所有 x 重叠的气球）。一支竖直箭可在某 x 坐标射穿所有与该 x 坐标相交的气球。求引爆所有气球所需的**最少箭数**。

**示例 1：**

```
输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：在 x=6 射一箭命中 [2,8],[1,6]，在 x=11 射一箭命中 [10,16],[7,12]。
```

**示例 2：**

```
输入：points = [[1,2],[3,4],[5,6],[7,8]]
输出：4
```

**提示：**

- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= x_start < x_end <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：贪心（按结束点排序）

1. 思路

与区间调度相似：按**结束位置**升序排序。第一支箭尽量「靠后」射在第一个区间的终点，这样能覆盖尽量多与它重叠的区间；遇到不重叠（起点 > 当前箭位置）的区间时，需新加一支箭，箭位置更新为该新区间终点。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
        int arrows = 0;
        long pos = Long.MIN_VALUE;
        for (int[] p : points) {
            if (p[0] > pos) {
                arrows++;
                pos = p[1];
            }
        }
        return arrows;
    }
}
```

```python [Python]
class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        points.sort(key=lambda x: x[1])
        arrows = 0
        pos = None
        for s, e in points:
            if pos is None or s > pos:
                arrows += 1
                pos = e
        return arrows
```

```cpp [C++]
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int arrows = 0;
        long long pos = LLONG_MIN;
        for (auto& p : points) {
            if (p[0] > pos) { arrows++; pos = p[1]; }
        }
        return arrows;
    }
};
```

```go [Go]
func findMinArrowShots(points [][]int) int {
	sort.Slice(points, func(i, j int) bool { return points[i][1] < points[j][1] })
	arrows := 0
	var pos int64 = -1 << 62
	for _, p := range points {
		if int64(p[0]) > pos {
			arrows++
			pos = int64(p[1])
		}
	}
	return arrows
}
```

```javascript [JavaScript]
var findMinArrowShots = function (points) {
    points.sort((a, b) => a[1] - b[1]);
    let arrows = 0, pos = null;
    for (const [s, e] of points) {
        if (pos === null || s > pos) { arrows++; pos = e; }
    }
    return arrows;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n)$。
- 空间复杂度：$O(1)$。

## 三、总结

「按结束位置贪心 + 合并重叠区间」是区间重叠计数（最小箭 / 会议室）的核心。相关题目：435 无重叠区间、253 会议室 II、1024 视频拼接。
