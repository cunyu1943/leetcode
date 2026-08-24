# [面试题 16.13. 平分正方形](https://leetcode.cn/problems/bisect-squares-lcci/)

## 一、题目描述

给定两个正方形，每个正方形由一条线段表示（即其左下角坐标 `(x, y)` 和边长 `size`）。求一条直线，将两个正方形都分成面积相等的两半。返回这条直线的两个端点 `[x1, y1, x2, y2]`（需保证 `x1 <= x2`，若 `x1 == x2` 则 `y1 <= y2`）。

- 直线必须同时平分两个正方形，即必须经过两个正方形的中心。
- 如果存在多条这样的直线（即两个正方形中心重合），则返回斜率为 0 的直线（水平直线）。
- 直线只需要与两个正方形整体边界相交，且两端点必须在边界上。

**示例 1：**

```
输入：square1 = [-1, -1, 2], square2 = [0, -1, 2]
输出：[-1, -1.5, 1, 1.5]
```

**示例 2：**

```
输入：square1 = [-1, -1, 2], square2 = [1, 1, 2]
输出：[0.5, -2, 2.5, 1]
```

**提示：**

- `square1` 和 `square2` 均为 `[x, y, size]`，其中 `(x, y)` 为左下角坐标，`size` 为边长。
- 坐标和边长均为整数，结果在双精度范围内。

## 二、解答方法

### 2.1 方法一：几何计算（中心连线 + 边界交点枚举）

**1. 思路**

平分正方形的直线必须经过其中心。因此，直线必须同时经过两个正方形的中心，即直线是两个中心连线的延长线。

1. 计算两个正方形的中心点：`c1 = (x1 + size1/2, y1 + size1/2)`，`c2 = (x2 + size2/2, y2 + size2/2)`。
2. 如果两个中心重合，则返回一条水平直线（斜率为 0），其纵坐标为 `y = c1.y`，与两个正方形整体的外接矩形相交，取左右两个端点。
3. 否则，计算两个中心点确定的直线方程，求出该直线与两个正方形整体外接矩形的四个边界的交点，取距离最远的两个交点作为端点。
4. 整体外接矩形的范围为：
   - `left = min(x1, x2)`
   - `right = max(x1 + size1, x2 + size2)`
   - `bottom = min(y1, y2)`
   - `top = max(y1 + size1, y2 + size2)`
5. 计算直线与矩形四条边的交点，保留在矩形边界上的点，然后按距离排序取最远的两个。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public double[] cutSquares(int[] square1, int[] square2) {
        double x1 = square1[0], y1 = square1[1], s1 = square1[2];
        double x2 = square2[0], y2 = square2[1], s2 = square2[2];
        double cx1 = x1 + s1/2, cy1 = y1 + s1/2;
        double cx2 = x2 + s2/2, cy2 = y2 + s2/2;
        double left = Math.min(x1, x2);
        double right = Math.max(x1 + s1, x2 + s2);
        double bottom = Math.min(y1, y2);
        double top = Math.max(y1 + s1, y2 + s2);
        double[] res;
        if (Math.abs(cx1 - cx2) < 1e-9 && Math.abs(cy1 - cy2) < 1e-9) {
            res = new double[]{left, cy1, right, cy1};
        } else {
            double dx = cx2 - cx1, dy = cy2 - cy1;
            double[][] candidates = new double[4][2];
            int count = 0;
            // 左边界 x = left
            double yLeft = cy1 + dy / dx * (left - cx1);
            if (yLeft >= bottom - 1e-9 && yLeft <= top + 1e-9) {
                candidates[count][0] = left; candidates[count][1] = yLeft; count++;
            }
            // 右边界 x = right
            double yRight = cy1 + dy / dx * (right - cx1);
            if (yRight >= bottom - 1e-9 && yRight <= top + 1e-9) {
                candidates[count][0] = right; candidates[count][1] = yRight; count++;
            }
            // 下边界 y = bottom
            if (Math.abs(dy) > 1e-9) {
                double xBottom = cx1 + dx / dy * (bottom - cy1);
                if (xBottom >= left - 1e-9 && xBottom <= right + 1e-9) {
                    candidates[count][0] = xBottom; candidates[count][1] = bottom; count++;
                }
            }
            // 上边界 y = top
            if (Math.abs(dy) > 1e-9) {
                double xTop = cx1 + dx / dy * (top - cy1);
                if (xTop >= left - 1e-9 && xTop <= right + 1e-9) {
                    candidates[count][0] = xTop; candidates[count][1] = top; count++;
                }
            }
            // 找最远的两个点
            double maxDist = -1;
            int idx1 = 0, idx2 = 0;
            for (int i = 0; i < count; i++) {
                for (int j = i + 1; j < count; j++) {
                    double d = Math.hypot(candidates[i][0] - candidates[j][0], candidates[i][1] - candidates[j][1]);
                    if (d > maxDist) {
                        maxDist = d;
                        idx1 = i; idx2 = j;
                    }
                }
            }
            res = new double[]{candidates[idx1][0], candidates[idx1][1], candidates[idx2][0], candidates[idx2][1]};
        }
        // 保证 x1 < x2 或 x1==x2 时 y1 <= y2
        if (res[0] > res[2] || (Math.abs(res[0] - res[2]) < 1e-9 && res[1] > res[3])) {
            double tmp;
            tmp = res[0]; res[0] = res[2]; res[2] = tmp;
            tmp = res[1]; res[1] = res[3]; res[3] = tmp;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def cutSquares(self, square1: List[int], square2: List[int]) -> List[float]:
        x1, y1, s1 = square1
        x2, y2, s2 = square2
        cx1, cy1 = x1 + s1/2, y1 + s1/2
        cx2, cy2 = x2 + s2/2, y2 + s2/2
        left = min(x1, x2)
        right = max(x1 + s1, x2 + s2)
        bottom = min(y1, y2)
        top = max(y1 + s1, y2 + s2)
        if abs(cx1 - cx2) < 1e-9 and abs(cy1 - cy2) < 1e-9:
            return [left, cy1, right, cy1]
        dx, dy = cx2 - cx1, cy2 - cy1
        candidates = []
        # 左边界
        y_left = cy1 + dy / dx * (left - cx1)
        if bottom - 1e-9 <= y_left <= top + 1e-9:
            candidates.append((left, y_left))
        # 右边界
        y_right = cy1 + dy / dx * (right - cx1)
        if bottom - 1e-9 <= y_right <= top + 1e-9:
            candidates.append((right, y_right))
        # 下边界
        if abs(dy) > 1e-9:
            x_bottom = cx1 + dx / dy * (bottom - cy1)
            if left - 1e-9 <= x_bottom <= right + 1e-9:
                candidates.append((x_bottom, bottom))
        # 上边界
        if abs(dy) > 1e-9:
            x_top = cx1 + dx / dy * (top - cy1)
            if left - 1e-9 <= x_top <= right + 1e-9:
                candidates.append((x_top, top))
        # 找最远两点
        max_dist = -1
        p1 = p2 = None
        for i in range(len(candidates)):
            for j in range(i+1, len(candidates)):
                d = ((candidates[i][0]-candidates[j][0])**2 + (candidates[i][1]-candidates[j][1])**2)**0.5
                if d > max_dist:
                    max_dist = d
                    p1, p2 = candidates[i], candidates[j]
        if p1[0] > p2[0] or (abs(p1[0]-p2[0]) < 1e-9 and p1[1] > p2[1]):
            p1, p2 = p2, p1
        return [p1[0], p1[1], p2[0], p2[1]]
```

```go [Go]
func cutSquares(square1 []int, square2 []int) []float64 {
    x1, y1, s1 := float64(square1[0]), float64(square1[1]), float64(square1[2])
    x2, y2, s2 := float64(square2[0]), float64(square2[1]), float64(square2[2])
    cx1, cy1 := x1+s1/2, y1+s1/2
    cx2, cy2 := x2+s2/2, y2+s2/2
    left := math.Min(x1, x2)
    right := math.Max(x1+s1, x2+s2)
    bottom := math.Min(y1, y2)
    top := math.Max(y1+s1, y2+s2)
    if math.Abs(cx1-cx2) < 1e-9 && math.Abs(cy1-cy2) < 1e-9 {
        return []float64{left, cy1, right, cy1}
    }
    dx, dy := cx2-cx1, cy2-cy1
    var candidates [][2]float64
    // left
    yLeft := cy1 + dy/dx*(left-cx1)
    if yLeft >= bottom-1e-9 && yLeft <= top+1e-9 {
        candidates = append(candidates, [2]float64{left, yLeft})
    }
    // right
    yRight := cy1 + dy/dx*(right-cx1)
    if yRight >= bottom-1e-9 && yRight <= top+1e-9 {
        candidates = append(candidates, [2]float64{right, yRight})
    }
    // bottom
    if math.Abs(dy) > 1e-9 {
        xBottom := cx1 + dx/dy*(bottom-cy1)
        if xBottom >= left-1e-9 && xBottom <= right+1e-9 {
            candidates = append(candidates, [2]float64{xBottom, bottom})
        }
    }
    // top
    if math.Abs(dy) > 1e-9 {
        xTop := cx1 + dx/dy*(top-cy1)
        if xTop >= left-1e-9 && xTop <= right+1e-9 {
            candidates = append(candidates, [2]float64{xTop, top})
        }
    }
    // 最远两点
    maxDist := -1.0
    var p1, p2 [2]float64
    for i := 0; i < len(candidates); i++ {
        for j := i+1; j < len(candidates); j++ {
            d := math.Hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1])
            if d > maxDist {
                maxDist = d
                p1, p2 = candidates[i], candidates[j]
            }
        }
    }
    if p1[0] > p2[0] || (math.Abs(p1[0]-p2[0]) < 1e-9 && p1[1] > p2[1]) {
        p1, p2 = p2, p1
    }
    return []float64{p1[0], p1[1], p2[0], p2[1]}
}
```

```c [C]
#include <math.h>
#include <stdlib.h>
double* cutSquares(int* square1, int square1Size, int* square2, int square2Size, int* returnSize) {
    double x1 = square1[0], y1 = square1[1], s1 = square1[2];
    double x2 = square2[0], y2 = square2[1], s2 = square2[2];
    double cx1 = x1 + s1/2, cy1 = y1 + s1/2;
    double cx2 = x2 + s2/2, cy2 = y2 + s2/2;
    double left = fmin(x1, x2), right = fmax(x1+s1, x2+s2);
    double bottom = fmin(y1, y2), top = fmax(y1+s1, y2+s2);
    double* res = (double*)malloc(4 * sizeof(double));
    *returnSize = 4;
    if (fabs(cx1-cx2) < 1e-9 && fabs(cy1-cy2) < 1e-9) {
        res[0] = left; res[1] = cy1; res[2] = right; res[3] = cy1;
        return res;
    }
    double dx = cx2-cx1, dy = cy2-cy1;
    double candidates[4][2];
    int count = 0;
    // left
    double yLeft = cy1 + dy/dx*(left-cx1);
    if (yLeft >= bottom-1e-9 && yLeft <= top+1e-9) {
        candidates[count][0] = left; candidates[count][1] = yLeft; count++;
    }
    // right
    double yRight = cy1 + dy/dx*(right-cx1);
    if (yRight >= bottom-1e-9 && yRight <= top+1e-9) {
        candidates[count][0] = right; candidates[count][1] = yRight; count++;
    }
    // bottom
    if (fabs(dy) > 1e-9) {
        double xBottom = cx1 + dx/dy*(bottom-cy1);
        if (xBottom >= left-1e-9 && xBottom <= right+1e-9) {
            candidates[count][0] = xBottom; candidates[count][1] = bottom; count++;
        }
    }
    // top
    if (fabs(dy) > 1e-9) {
        double xTop = cx1 + dx/dy*(top-cy1);
        if (xTop >= left-1e-9 && xTop <= right+1e-9) {
            candidates[count][0] = xTop; candidates[count][1] = top; count++;
        }
    }
    double maxDist = -1;
    int idx1=0, idx2=0;
    for (int i=0; i<count; i++) {
        for (int j=i+1; j<count; j++) {
            double d = hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1]);
            if (d > maxDist) { maxDist=d; idx1=i; idx2=j; }
        }
    }
    res[0] = candidates[idx1][0]; res[1] = candidates[idx1][1];
    res[2] = candidates[idx2][0]; res[3] = candidates[idx2][1];
    if (res[0] > res[2] || (fabs(res[0]-res[2])<1e-9 && res[1] > res[3])) {
        double tmp; tmp=res[0]; res[0]=res[2]; res[2]=tmp;
        tmp=res[1]; res[1]=res[3]; res[3]=tmp;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<double> cutSquares(vector<int>& square1, vector<int>& square2) {
        double x1 = square1[0], y1 = square1[1], s1 = square1[2];
        double x2 = square2[0], y2 = square2[1], s2 = square2[2];
        double cx1 = x1 + s1/2, cy1 = y1 + s1/2;
        double cx2 = x2 + s2/2, cy2 = y2 + s2/2;
        double left = min(x1, x2), right = max(x1+s1, x2+s2);
        double bottom = min(y1, y2), top = max(y1+s1, y2+s2);
        if (fabs(cx1-cx2) < 1e-9 && fabs(cy1-cy2) < 1e-9) {
            return {left, cy1, right, cy1};
        }
        double dx = cx2 - cx1, dy = cy2 - cy1;
        vector<pair<double,double>> candidates;
        double yLeft = cy1 + dy/dx * (left - cx1);
        if (yLeft >= bottom-1e-9 && yLeft <= top+1e-9) candidates.push_back({left, yLeft});
        double yRight = cy1 + dy/dx * (right - cx1);
        if (yRight >= bottom-1e-9 && yRight <= top+1e-9) candidates.push_back({right, yRight});
        if (fabs(dy) > 1e-9) {
            double xBottom = cx1 + dx/dy * (bottom - cy1);
            if (xBottom >= left-1e-9 && xBottom <= right+1e-9) candidates.push_back({xBottom, bottom});
            double xTop = cx1 + dx/dy * (top - cy1);
            if (xTop >= left-1e-9 && xTop <= right+1e-9) candidates.push_back({xTop, top});
        }
        double maxDist = -1;
        pair<double,double> p1, p2;
        for (int i = 0; i < candidates.size(); i++) {
            for (int j = i+1; j < candidates.size(); j++) {
                double d = hypot(candidates[i].first - candidates[j].first, candidates[i].second - candidates[j].second);
                if (d > maxDist) { maxDist = d; p1 = candidates[i]; p2 = candidates[j]; }
            }
        }
        if (p1.first > p2.first || (fabs(p1.first-p2.first) < 1e-9 && p1.second > p2.second)) {
            swap(p1, p2);
        }
        return {p1.first, p1.second, p2.first, p2.second};
    }
};
```

```javascript [JavaScript]
var cutSquares = function(square1, square2) {
    const [x1, y1, s1] = square1, [x2, y2, s2] = square2;
    const cx1 = x1 + s1/2, cy1 = y1 + s1/2;
    const cx2 = x2 + s2/2, cy2 = y2 + s2/2;
    const left = Math.min(x1, x2), right = Math.max(x1+s1, x2+s2);
    const bottom = Math.min(y1, y2), top = Math.max(y1+s1, y2+s2);
    if (Math.abs(cx1-cx2) < 1e-9 && Math.abs(cy1-cy2) < 1e-9) {
        return [left, cy1, right, cy1];
    }
    const dx = cx2 - cx1, dy = cy2 - cy1;
    const candidates = [];
    const yLeft = cy1 + dy/dx * (left - cx1);
    if (yLeft >= bottom-1e-9 && yLeft <= top+1e-9) candidates.push([left, yLeft]);
    const yRight = cy1 + dy/dx * (right - cx1);
    if (yRight >= bottom-1e-9 && yRight <= top+1e-9) candidates.push([right, yRight]);
    if (Math.abs(dy) > 1e-9) {
        const xBottom = cx1 + dx/dy * (bottom - cy1);
        if (xBottom >= left-1e-9 && xBottom <= right+1e-9) candidates.push([xBottom, bottom]);
        const xTop = cx1 + dx/dy * (top - cy1);
        if (xTop >= left-1e-9 && xTop <= right+1e-9) candidates.push([xTop, top]);
    }
    let maxDist = -1, p1, p2;
    for (let i = 0; i < candidates.length; i++) {
        for (let j = i+1; j < candidates.length; j++) {
            const d = Math.hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1]);
            if (d > maxDist) { maxDist = d; p1 = candidates[i]; p2 = candidates[j]; }
        }
    }
    if (p1[0] > p2[0] || (Math.abs(p1[0]-p2[0]) < 1e-9 && p1[1] > p2[1])) {
        [p1, p2] = [p2, p1];
    }
    return [p1[0], p1[1], p2[0], p2[1]];
};
```

```typescript [TypeScript]
function cutSquares(square1: number[], square2: number[]): number[] {
    const [x1, y1, s1] = square1, [x2, y2, s2] = square2;
    const cx1 = x1 + s1/2, cy1 = y1 + s1/2;
    const cx2 = x2 + s2/2, cy2 = y2 + s2/2;
    const left = Math.min(x1, x2), right = Math.max(x1+s1, x2+s2);
    const bottom = Math.min(y1, y2), top = Math.max(y1+s1, y2+s2);
    if (Math.abs(cx1-cx2) < 1e-9 && Math.abs(cy1-cy2) < 1e-9) {
        return [left, cy1, right, cy1];
    }
    const dx = cx2 - cx1, dy = cy2 - cy1;
    const candidates: number[][] = [];
    const yLeft = cy1 + dy/dx * (left - cx1);
    if (yLeft >= bottom-1e-9 && yLeft <= top+1e-9) candidates.push([left, yLeft]);
    const yRight = cy1 + dy/dx * (right - cx1);
    if (yRight >= bottom-1e-9 && yRight <= top+1e-9) candidates.push([right, yRight]);
    if (Math.abs(dy) > 1e-9) {
        const xBottom = cx1 + dx/dy * (bottom - cy1);
        if (xBottom >= left-1e-9 && xBottom <= right+1e-9) candidates.push([xBottom, bottom]);
        const xTop = cx1 + dx/dy * (top - cy1);
        if (xTop >= left-1e-9 && xTop <= right+1e-9) candidates.push([xTop, top]);
    }
    let maxDist = -1, p1: number[], p2: number[];
    for (let i = 0; i < candidates.length; i++) {
        for (let j = i+1; j < candidates.length; j++) {
            const d = Math.hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1]);
            if (d > maxDist) { maxDist = d; p1 = candidates[i]; p2 = candidates[j]; }
        }
    }
    if (p1![0] > p2![0] || (Math.abs(p1![0]-p2![0]) < 1e-9 && p1![1] > p2![1])) {
        [p1, p2] = [p2, p1];
    }
    return [p1![0], p1![1], p2![0], p2![1]];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，只有常数次计算和交点枚举。
- **空间复杂度**：`O(1)`，使用固定大小的存储。

---

### 2.2 方法二：向量参数化（避免除零）

**1. 思路**

与方法一类似，但使用参数化方程 `P = C1 + t * (C2 - C1)`，分别求与矩形四条边的交点参数 `t`，然后取有效交点。该方法可以避免斜率除零问题，代码更统一。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public double[] cutSquares(int[] square1, int[] square2) {
        double x1 = square1[0], y1 = square1[1], s1 = square1[2];
        double x2 = square2[0], y2 = square2[1], s2 = square2[2];
        double cx1 = x1 + s1/2, cy1 = y1 + s1/2;
        double cx2 = x2 + s2/2, cy2 = y2 + s2/2;
        double left = Math.min(x1, x2);
        double right = Math.max(x1 + s1, x2 + s2);
        double bottom = Math.min(y1, y2);
        double top = Math.max(y1 + s1, y2 + s2);
        if (Math.abs(cx1 - cx2) < 1e-9 && Math.abs(cy1 - cy2) < 1e-9) {
            return new double[]{left, cy1, right, cy1};
        }
        double dx = cx2 - cx1, dy = cy2 - cy1;
        double[][] candidates = new double[4][2];
        int count = 0;
        // 与左边界 x = left 的交点
        double t = (left - cx1) / dx;
        double y = cy1 + dy * t;
        if (t >= 0 && t <= 1 && y >= bottom - 1e-9 && y <= top + 1e-9) {
            candidates[count][0] = left; candidates[count][1] = y; count++;
        }
        // 与右边界 x = right
        t = (right - cx1) / dx;
        y = cy1 + dy * t;
        if (t >= 0 && t <= 1 && y >= bottom - 1e-9 && y <= top + 1e-9) {
            candidates[count][0] = right; candidates[count][1] = y; count++;
        }
        // 与下边界 y = bottom
        t = (bottom - cy1) / dy;
        double x = cx1 + dx * t;
        if (t >= 0 && t <= 1 && x >= left - 1e-9 && x <= right + 1e-9) {
            candidates[count][0] = x; candidates[count][1] = bottom; count++;
        }
        // 与上边界 y = top
        t = (top - cy1) / dy;
        x = cx1 + dx * t;
        if (t >= 0 && t <= 1 && x >= left - 1e-9 && x <= right + 1e-9) {
            candidates[count][0] = x; candidates[count][1] = top; count++;
        }
        // 找最远两点
        double maxDist = -1;
        int idx1 = 0, idx2 = 0;
        for (int i = 0; i < count; i++) {
            for (int j = i+1; j < count; j++) {
                double d = Math.hypot(candidates[i][0] - candidates[j][0], candidates[i][1] - candidates[j][1]);
                if (d > maxDist) {
                    maxDist = d;
                    idx1 = i; idx2 = j;
                }
            }
        }
        double[] res = new double[]{candidates[idx1][0], candidates[idx1][1], candidates[idx2][0], candidates[idx2][1]};
        if (res[0] > res[2] || (Math.abs(res[0] - res[2]) < 1e-9 && res[1] > res[3])) {
            double tmp;
            tmp = res[0]; res[0] = res[2]; res[2] = tmp;
            tmp = res[1]; res[1] = res[3]; res[3] = tmp;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def cutSquares(self, square1: List[int], square2: List[int]) -> List[float]:
        x1, y1, s1 = square1
        x2, y2, s2 = square2
        cx1, cy1 = x1 + s1/2, y1 + s1/2
        cx2, cy2 = x2 + s2/2, y2 + s2/2
        left = min(x1, x2)
        right = max(x1 + s1, x2 + s2)
        bottom = min(y1, y2)
        top = max(y1 + s1, y2 + s2)
        if abs(cx1 - cx2) < 1e-9 and abs(cy1 - cy2) < 1e-9:
            return [left, cy1, right, cy1]
        dx, dy = cx2 - cx1, cy2 - cy1
        candidates = []
        # 左边界
        if abs(dx) > 1e-9:
            t = (left - cx1) / dx
            y = cy1 + dy * t
            if 0 <= t <= 1 and bottom - 1e-9 <= y <= top + 1e-9:
                candidates.append((left, y))
        # 右边界
        t = (right - cx1) / dx
        y = cy1 + dy * t
        if 0 <= t <= 1 and bottom - 1e-9 <= y <= top + 1e-9:
            candidates.append((right, y))
        # 下边界
        if abs(dy) > 1e-9:
            t = (bottom - cy1) / dy
            x = cx1 + dx * t
            if 0 <= t <= 1 and left - 1e-9 <= x <= right + 1e-9:
                candidates.append((x, bottom))
        # 上边界
        t = (top - cy1) / dy
        x = cx1 + dx * t
        if 0 <= t <= 1 and left - 1e-9 <= x <= right + 1e-9:
            candidates.append((x, top))
        # 找最远两点
        max_dist = -1
        p1 = p2 = None
        for i in range(len(candidates)):
            for j in range(i+1, len(candidates)):
                d = ((candidates[i][0]-candidates[j][0])**2 + (candidates[i][1]-candidates[j][1])**2)**0.5
                if d > max_dist:
                    max_dist = d
                    p1, p2 = candidates[i], candidates[j]
        if p1[0] > p2[0] or (abs(p1[0]-p2[0]) < 1e-9 and p1[1] > p2[1]):
            p1, p2 = p2, p1
        return [p1[0], p1[1], p2[0], p2[1]]
```

```go [Go]
func cutSquares(square1 []int, square2 []int) []float64 {
    x1, y1, s1 := float64(square1[0]), float64(square1[1]), float64(square1[2])
    x2, y2, s2 := float64(square2[0]), float64(square2[1]), float64(square2[2])
    cx1, cy1 := x1+s1/2, y1+s1/2
    cx2, cy2 := x2+s2/2, y2+s2/2
    left := math.Min(x1, x2)
    right := math.Max(x1+s1, x2+s2)
    bottom := math.Min(y1, y2)
    top := math.Max(y1+s1, y2+s2)
    if math.Abs(cx1-cx2) < 1e-9 && math.Abs(cy1-cy2) < 1e-9 {
        return []float64{left, cy1, right, cy1}
    }
    dx, dy := cx2-cx1, cy2-cy1
    var candidates [][2]float64
    // 左边界
    if math.Abs(dx) > 1e-9 {
        t := (left - cx1) / dx
        y := cy1 + dy*t
        if t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9 {
            candidates = append(candidates, [2]float64{left, y})
        }
    }
    // 右边界
    t := (right - cx1) / dx
    y := cy1 + dy*t
    if t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9 {
        candidates = append(candidates, [2]float64{right, y})
    }
    // 下边界
    if math.Abs(dy) > 1e-9 {
        t = (bottom - cy1) / dy
        x := cx1 + dx*t
        if t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9 {
            candidates = append(candidates, [2]float64{x, bottom})
        }
    }
    // 上边界
    t = (top - cy1) / dy
    x := cx1 + dx*t
    if t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9 {
        candidates = append(candidates, [2]float64{x, top})
    }
    // 最远两点
    maxDist := -1.0
    var p1, p2 [2]float64
    for i := 0; i < len(candidates); i++ {
        for j := i+1; j < len(candidates); j++ {
            d := math.Hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1])
            if d > maxDist {
                maxDist = d
                p1, p2 = candidates[i], candidates[j]
            }
        }
    }
    if p1[0] > p2[0] || (math.Abs(p1[0]-p2[0]) < 1e-9 && p1[1] > p2[1]) {
        p1, p2 = p2, p1
    }
    return []float64{p1[0], p1[1], p2[0], p2[1]}
}
```

```c [C]
#include <math.h>
#include <stdlib.h>
double* cutSquares(int* square1, int square1Size, int* square2, int square2Size, int* returnSize) {
    double x1 = square1[0], y1 = square1[1], s1 = square1[2];
    double x2 = square2[0], y2 = square2[1], s2 = square2[2];
    double cx1 = x1 + s1/2, cy1 = y1 + s1/2;
    double cx2 = x2 + s2/2, cy2 = y2 + s2/2;
    double left = fmin(x1, x2), right = fmax(x1+s1, x2+s2);
    double bottom = fmin(y1, y2), top = fmax(y1+s1, y2+s2);
    double* res = (double*)malloc(4 * sizeof(double));
    *returnSize = 4;
    if (fabs(cx1-cx2) < 1e-9 && fabs(cy1-cy2) < 1e-9) {
        res[0] = left; res[1] = cy1; res[2] = right; res[3] = cy1;
        return res;
    }
    double dx = cx2-cx1, dy = cy2-cy1;
    double candidates[4][2];
    int count = 0;
    // 左边界
    if (fabs(dx) > 1e-9) {
        double t = (left - cx1) / dx;
        double y = cy1 + dy * t;
        if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) {
            candidates[count][0] = left; candidates[count][1] = y; count++;
        }
    }
    // 右边界
    double t = (right - cx1) / dx;
    double y = cy1 + dy * t;
    if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) {
        candidates[count][0] = right; candidates[count][1] = y; count++;
    }
    // 下边界
    if (fabs(dy) > 1e-9) {
        t = (bottom - cy1) / dy;
        double x = cx1 + dx * t;
        if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) {
            candidates[count][0] = x; candidates[count][1] = bottom; count++;
        }
    }
    // 上边界
    t = (top - cy1) / dy;
    double x = cx1 + dx * t;
    if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) {
        candidates[count][0] = x; candidates[count][1] = top; count++;
    }
    double maxDist = -1;
    int idx1=0, idx2=0;
    for (int i=0; i<count; i++) {
        for (int j=i+1; j<count; j++) {
            double d = hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1]);
            if (d > maxDist) { maxDist=d; idx1=i; idx2=j; }
        }
    }
    res[0] = candidates[idx1][0]; res[1] = candidates[idx1][1];
    res[2] = candidates[idx2][0]; res[3] = candidates[idx2][1];
    if (res[0] > res[2] || (fabs(res[0]-res[2])<1e-9 && res[1] > res[3])) {
        double tmp; tmp=res[0]; res[0]=res[2]; res[2]=tmp;
        tmp=res[1]; res[1]=res[3]; res[3]=tmp;
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<double> cutSquares(vector<int>& square1, vector<int>& square2) {
        double x1 = square1[0], y1 = square1[1], s1 = square1[2];
        double x2 = square2[0], y2 = square2[1], s2 = square2[2];
        double cx1 = x1 + s1/2, cy1 = y1 + s1/2;
        double cx2 = x2 + s2/2, cy2 = y2 + s2/2;
        double left = min(x1, x2), right = max(x1+s1, x2+s2);
        double bottom = min(y1, y2), top = max(y1+s1, y2+s2);
        if (fabs(cx1-cx2) < 1e-9 && fabs(cy1-cy2) < 1e-9) {
            return {left, cy1, right, cy1};
        }
        double dx = cx2 - cx1, dy = cy2 - cy1;
        vector<pair<double,double>> candidates;
        // 左边界
        if (fabs(dx) > 1e-9) {
            double t = (left - cx1) / dx;
            double y = cy1 + dy * t;
            if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) {
                candidates.push_back({left, y});
            }
        }
        // 右边界
        double t = (right - cx1) / dx;
        double y = cy1 + dy * t;
        if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) {
            candidates.push_back({right, y});
        }
        // 下边界
        if (fabs(dy) > 1e-9) {
            t = (bottom - cy1) / dy;
            double x = cx1 + dx * t;
            if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) {
                candidates.push_back({x, bottom});
            }
        }
        // 上边界
        t = (top - cy1) / dy;
        double x = cx1 + dx * t;
        if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) {
            candidates.push_back({x, top});
        }
        double maxDist = -1;
        pair<double,double> p1, p2;
        for (int i = 0; i < candidates.size(); i++) {
            for (int j = i+1; j < candidates.size(); j++) {
                double d = hypot(candidates[i].first - candidates[j].first, candidates[i].second - candidates[j].second);
                if (d > maxDist) { maxDist = d; p1 = candidates[i]; p2 = candidates[j]; }
            }
        }
        if (p1.first > p2.first || (fabs(p1.first-p2.first) < 1e-9 && p1.second > p2.second)) {
            swap(p1, p2);
        }
        return {p1.first, p1.second, p2.first, p2.second};
    }
};
```

```javascript [JavaScript]
var cutSquares = function(square1, square2) {
    const [x1, y1, s1] = square1, [x2, y2, s2] = square2;
    const cx1 = x1 + s1/2, cy1 = y1 + s1/2;
    const cx2 = x2 + s2/2, cy2 = y2 + s2/2;
    const left = Math.min(x1, x2), right = Math.max(x1+s1, x2+s2);
    const bottom = Math.min(y1, y2), top = Math.max(y1+s1, y2+s2);
    if (Math.abs(cx1-cx2) < 1e-9 && Math.abs(cy1-cy2) < 1e-9) {
        return [left, cy1, right, cy1];
    }
    const dx = cx2 - cx1, dy = cy2 - cy1;
    const candidates = [];
    // 左边界
    if (Math.abs(dx) > 1e-9) {
        let t = (left - cx1) / dx;
        let y = cy1 + dy * t;
        if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) candidates.push([left, y]);
    }
    // 右边界
    let t = (right - cx1) / dx;
    let y = cy1 + dy * t;
    if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) candidates.push([right, y]);
    // 下边界
    if (Math.abs(dy) > 1e-9) {
        t = (bottom - cy1) / dy;
        let x = cx1 + dx * t;
        if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) candidates.push([x, bottom]);
    }
    // 上边界
    t = (top - cy1) / dy;
    let x = cx1 + dx * t;
    if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) candidates.push([x, top]);
    // 最远两点
    let maxDist = -1, p1, p2;
    for (let i = 0; i < candidates.length; i++) {
        for (let j = i+1; j < candidates.length; j++) {
            const d = Math.hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1]);
            if (d > maxDist) { maxDist = d; p1 = candidates[i]; p2 = candidates[j]; }
        }
    }
    if (p1[0] > p2[0] || (Math.abs(p1[0]-p2[0]) < 1e-9 && p1[1] > p2[1])) {
        [p1, p2] = [p2, p1];
    }
    return [p1[0], p1[1], p2[0], p2[1]];
};
```

```typescript [TypeScript]
function cutSquares(square1: number[], square2: number[]): number[] {
    const [x1, y1, s1] = square1, [x2, y2, s2] = square2;
    const cx1 = x1 + s1/2, cy1 = y1 + s1/2;
    const cx2 = x2 + s2/2, cy2 = y2 + s2/2;
    const left = Math.min(x1, x2), right = Math.max(x1+s1, x2+s2);
    const bottom = Math.min(y1, y2), top = Math.max(y1+s1, y2+s2);
    if (Math.abs(cx1-cx2) < 1e-9 && Math.abs(cy1-cy2) < 1e-9) {
        return [left, cy1, right, cy1];
    }
    const dx = cx2 - cx1, dy = cy2 - cy1;
    const candidates: number[][] = [];
    // 左边界
    if (Math.abs(dx) > 1e-9) {
        let t = (left - cx1) / dx;
        let y = cy1 + dy * t;
        if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) candidates.push([left, y]);
    }
    // 右边界
    let t = (right - cx1) / dx;
    let y = cy1 + dy * t;
    if (t >= 0 && t <= 1 && y >= bottom-1e-9 && y <= top+1e-9) candidates.push([right, y]);
    // 下边界
    if (Math.abs(dy) > 1e-9) {
        t = (bottom - cy1) / dy;
        let x = cx1 + dx * t;
        if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) candidates.push([x, bottom]);
    }
    // 上边界
    t = (top - cy1) / dy;
    let x = cx1 + dx * t;
    if (t >= 0 && t <= 1 && x >= left-1e-9 && x <= right+1e-9) candidates.push([x, top]);
    // 最远两点
    let maxDist = -1, p1: number[], p2: number[];
    for (let i = 0; i < candidates.length; i++) {
        for (let j = i+1; j < candidates.length; j++) {
            const d = Math.hypot(candidates[i][0]-candidates[j][0], candidates[i][1]-candidates[j][1]);
            if (d > maxDist) { maxDist = d; p1 = candidates[i]; p2 = candidates[j]; }
        }
    }
    if (p1![0] > p2![0] || (Math.abs(p1![0]-p2![0]) < 1e-9 && p1![1] > p2![1])) {
        [p1, p2] = [p2, p1];
    }
    return [p1![0], p1![1], p2![0], p2![1]];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法                     | 时间复杂度 | 空间复杂度 | 特点                 |
| ------------------------ | ---------- | ---------- | -------------------- |
| 几何计算（枚举边界交点） | `O(1)`     | `O(1)`     | 直观，需处理除零     |
| 向量参数化               | `O(1)`     | `O(1)`     | 避免除零，代码更统一 |

**推荐**：面试中首选 **方法二（向量参数化）**，逻辑更健壮，避免斜率除零问题。
