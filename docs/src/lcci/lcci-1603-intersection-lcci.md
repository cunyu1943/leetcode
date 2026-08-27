# [面试题 16.03. 交点](https://leetcode.cn/problems/intersection-lcci/)

## 一、题目描述

给定两条线段（表示为起点 `start = {x1, y1}` 和终点 `end = {x2, y2}`），如果它们有交点，请计算其交点。若没有交点（平行或共线不重叠），返回空值。

要求浮点型误差不超过 `10^-6`。若有多个交点（线段重叠），返回 X 值最小的点，若 X 相同则返回 Y 值最小的点。

**示例 1：**

```
输入：
line1 = {0, 0}, {1, 0}
line2 = {1, 1}, {0, -1}
输出： {0.5, 0.0}
```

**示例 2：**

```
输入：
line1 = {0, 0}, {1, 0}
line2 = {2, 0}, {3, 0}
输出： {} （无交点）
```

---

## 二、解答方法

### 2.1 方法一：解析几何求直线交点

**1. 思路**

两条线段所在直线参数方程：

- L1: p = s1 + t·(e1−s1)
- L2: p = s2 + u·(e2−s2)

联立解得 t、u。若 t、u 均在 `[0,1]` 内则交点在线段上；否则无交点。注意平行（分母 ≈ 0）的情况返回空。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public double[] intersection(int[] start1, int[] end1, int[] start2, int[] end2) {
        int x1 = start1[0], y1 = start1[1], x2 = end1[0], y2 = end1[1];
        int x3 = start2[0], y3 = start2[1], x4 = end2[0], y4 = end2[1];
        int d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (d == 0) return new double[]{};
        double t = (double)((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
        double u = (double)((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return new double[]{x1 + t * (x2 - x1), y1 + t * (y2 - y1)};
        }
        return new double[]{};
    }
}
```

```python [Python]
class Solution:
    def intersection(self, start1: List[int], end1: List[int], start2: List[int], end2: List[int]) -> List[float]:
        x1, y1, x2, y2 = start1[0], start1[1], end1[0], end1[1]
        x3, y3, x4, y4 = start2[0], start2[1], end2[0], end2[1]
        d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        if d == 0:
            return []
        t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d
        u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d
        if 0 <= t <= 1 and 0 <= u <= 1:
            return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]
        return []
```

```go [Go]
func intersection(start1 []int, end1 []int, start2 []int, end2 []int) []float64 {
    x1, y1, x2, y2 := start1[0], start1[1], end1[0], end1[1]
    x3, y3, x4, y4 := start2[0], start2[1], end2[0], end2[1]
    d := float64((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4))
    if d == 0 { return []float64{} }
    t := float64((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / d
    u := float64((x1-x3)*(y1-y2)-(y1-y3)*(x1-x2)) / d
    if t >= 0 && t <= 1 && u >= 0 && u <= 1 {
        return []float64{float64(x1) + t*float64(x2-x1), float64(y1) + t*float64(y2-y1)}
    }
    return []float64{}
}
```

```c [C]
// C 实现需返回动态数组，逻辑同 Java：解参数方程求 t、u 并判断区间
```

```cpp [C++]
class Solution {
public:
    vector<double> intersection(vector<int>& start1, vector<int>& end1, vector<int>& start2, vector<int>& end2) {
        int x1 = start1[0], y1 = start1[1], x2 = end1[0], y2 = end1[1];
        int x3 = start2[0], y3 = start2[1], x4 = end2[0], y4 = end2[1];
        int d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (d == 0) return {};
        double t = (double)((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
        double u = (double)((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1)
            return {x1 + t * (x2 - x1), y1 + t * (y2 - y1)};
        return {};
    }
};
```

```javascript [JavaScript]
var intersection = function(start1, end1, start2, end2) {
    const [x1, y1] = start1, [x2, y2] = end1;
    const [x3, y3] = start2, [x4, y4] = end2;
    const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d === 0) return [];
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
    return [];
};
```

```typescript [TypeScript]
function intersection(start1: number[], end1: number[], start2: number[], end2: number[]): number[] {
    const [x1, y1] = start1, [x2, y2] = end1;
    const [x3, y3] = start2, [x4, y4] = end2;
    const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d === 0) return [];
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
    return [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：快速排斥 + 跨立实验

**1. 思路**

先判断两线段包围盒是否相交（快速排斥），再用叉积判断线段是否跨越对方直线（跨立实验）。此法更适合处理「端点接触」「共线重叠」等边界情形，但求具体坐标仍需参数方程。对本题返回坐标的需求，方法一更直接。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    // 叉积 (b-a) x (c-a)
    static int cross(int[] a, int[] b, int[] c) {
        return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
    }
    public double[] intersection(int[] start1, int[] end1, int[] start2, int[] end2) {
        int c1 = cross(start2, end2, start1);
        int c2 = cross(start2, end2, end1);
        int c3 = cross(start1, end1, start2);
        int c4 = cross(start1, end1, end2);
        if (((c1 > 0 && c2 < 0) || (c1 < 0 && c2 > 0)) &&
            ((c3 > 0 && c4 < 0) || (c3 < 0 && c4 > 0))) {
            // 严格相交，转参数方程求坐标（同方法一）
        }
        return new double[]{};
    }
}
```

```cpp [C++]
class Solution {
    int cross(vector<int>& a, vector<int>& b, vector<int>& c) {
        return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
    }
public:
    vector<double> intersection(vector<int>& s1, vector<int>& e1, vector<int>& s2, vector<int>& e2) {
        int c1 = cross(s2, e2, s1), c2 = cross(s2, e2, e1);
        int c3 = cross(s1, e1, s2), c4 = cross(s1, e1, e2);
        if (((c1>0&&c2<0)||(c1<0&&c2>0)) && ((c3>0&&c4<0)||(c3<0&&c4>0))) {
            // 严格相交，转参数方程求坐标
        }
        return {};
    }
};
```

```python [Python]
class Solution:
    def cross(self, a, b, c):
        return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])
    def intersection(self, start1, end1, start2, end2):
        c1 = self.cross(start2, end2, start1)
        c2 = self.cross(start2, end2, end1)
        c3 = self.cross(start1, end1, start2)
        c4 = self.cross(start1, end1, end2)
        if ((c1>0 and c2<0) or (c1<0 and c2>0)) and ((c3>0 and c4<0) or (c3<0 and c4>0)):
            pass  # 转参数方程求坐标
        return []
```

```javascript [JavaScript]
var intersection = function(start1, end1, start2, end2) {
    const cross = (a, b, c) => (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
    const c1 = cross(start2, end2, start1), c2 = cross(start2, end2, end1);
    const c3 = cross(start1, end1, start2), c4 = cross(start1, end1, end2);
    if (((c1>0&&c2<0)||(c1<0&&c2>0)) && ((c3>0&&c4<0)||(c3<0&&c4>0))) {
        // 转参数方程求坐标
    }
    return [];
};
```

```typescript [TypeScript]
function intersection(start1: number[], end1: number[], start2: number[], end2: number[]): number[] {
    const cross = (a: number[], b: number[], c: number[]) =>
        (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
    const c1 = cross(start2, end2, start1), c2 = cross(start2, end2, end1);
    const c3 = cross(start1, end1, start2), c4 = cross(start1, end1, end2);
    if (((c1>0&&c2<0)||(c1<0&&c2>0)) && ((c3>0&&c4<0)||(c3<0&&c4>0))) {
        // 转参数方程求坐标
    }
    return [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                       |
| ------------ | ---------- | ---------- | -------------------------- |
| 参数方程     | `O(1)`     | `O(1)`     | 直接求坐标，推荐           |
| 跨立实验     | `O(1)`     | `O(1)`     | 适合判定相交，求坐标需配合 |

**推荐**：用参数方程直接解出交点坐标并校验参数区间 `[0,1]`。
