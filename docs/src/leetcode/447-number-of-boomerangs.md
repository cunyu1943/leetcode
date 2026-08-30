# [447. 回旋镖的数量](https://leetcode.cn/problems/number-of-boomerangs/)

## 一、题目描述

给定平面上 `n` 个点（坐标为整数），「回旋镖」是三元组 `(i, j, k)`，满足点 `i` 到点 `j` 和点 `i` 到点 `k` 的距离**相等**（即 `i` 是「顶点」，j、k 在以 i 为心、同半径的圆上）。求所有可能的回旋镖数量。

注意 `(i, j, k)` 与 `(i, k, j)` 视为不同（顺序敏感）。

**示例 1：**

```
输入：points = [[0,0],[1,0],[2,0]]
输出：2
解释：(0,1,2) 和 (0,2,1)：以 [0,0] 为顶点，到 [1,0]、[2,0] 距离相等。
```

**示例 2：**

```
输入：points = [[0,0],[1,0],[-1,0],[0,1],[0,-1]]
输出：20
```

**提示：**

- `n == points.length`
- `1 <= n <= 500`
- `-10^4 <= x_i, y_i <= 10^4`
- 所有点互不相同

## 二、解答方法

### 2.1 方法一：枚举顶点 + 距离计数

1. 思路

对每个点 `i` 作顶点，统计其余各点到 `i` 的距离（用平方避免开方）频次。若有 `c` 个点到 `i` 距离相同，则它们可排列成 `c * (c-1)` 个有序对 `(j, k)`。对每个顶点累加所有距离的 `c*(c-1)`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int numberOfBoomerangs(int[][] points) {
        int ans = 0;
        for (int[] p : points) {
            Map<Integer, Integer> dist = new HashMap<>();
            for (int[] q : points) {
                int d = (p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1]);
                dist.put(d, dist.getOrDefault(d, 0) + 1);
            }
            for (int c : dist.values()) ans += c * (c - 1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        ans = 0
        for x1, y1 in points:
            dist = {}
            for x2, y2 in points:
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2
                dist[d] = dist.get(d, 0) + 1
            for c in dist.values():
                ans += c * (c - 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int numberOfBoomerangs(vector<vector<int>>& points) {
        int ans = 0;
        for (auto& p : points) {
            unordered_map<int, int> dist;
            for (auto& q : points) {
                int d = (p[0]-q[0])*(p[0]-q[0]) + (p[1]-q[1])*(p[1]-q[1]);
                dist[d]++;
            }
            for (auto& kv : dist) ans += kv.second * (kv.second - 1);
        }
        return ans;
    }
};
```

```go [Go]
func numberOfBoomerangs(points [][]int) int {
	ans := 0
	for _, p := range points {
		dist := map[int]int{}
		for _, q := range points {
			d := (p[0]-q[0])*(p[0]-q[0]) + (p[1]-q[1])*(p[1]-q[1])
			dist[d]++
		}
		for _, c := range dist {
			ans += c * (c - 1)
		}
	}
	return ans
}
```

```javascript [JavaScript]
var numberOfBoomerangs = function (points) {
    let ans = 0;
    for (const [x1, y1] of points) {
        const dist = {};
        for (const [x2, y2] of points) {
            const d = (x1 - x2) ** 2 + (y1 - y2) ** 2;
            dist[d] = (dist[d] || 0) + 1;
        }
        for (const c of Object.values(dist)) ans += c * (c - 1);
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n^2)$。
- 空间复杂度：$O(n)$。

## 三、总结

「顶点固定 + 同距离点排列计数」是纯几何组合题。相关题目：149 直线上最多的点数、223 矩形面积。
