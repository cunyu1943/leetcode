# [223. 矩形面积](https://leetcode.cn/problems/rectangle-area/)



## 一、题目描述

给你 **二维** 平面上两个 **由直线构成且边与坐标轴平行/垂直** 的矩形，请你计算并返回两个矩形覆盖的总面积。

每个矩形由其 **左下** 顶点和 **右上** 顶点坐标表示：

-   第一个矩形由其左下顶点 `(ax1, ay1)` 和右上顶点 `(ax2, ay2)` 定义。
-   第二个矩形由其左下顶点 `(bx1, by1)` 和右上顶点 `(bx2, by2)` 定义。

**示例 1：**

```
输入：ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
输出：45
```

**示例 2：**

```
输入：ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
输出：16
解释：两矩形完全重合。
```

**提示：**

-   `-10⁴ <= ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 <= 10⁴`



## 二、解答方法

### 2.1 方法一：容斥原理（计算重叠面积）

1. **思路**

总面积 = 矩形 A 面积 + 矩形 B 面积 - **重叠部分面积**。

重叠部分仍是一个矩形：

- 重叠宽度：`max(0, min(ax2, bx2) - max(ax1, bx1))`
- 重叠高度：`max(0, min(ay2, by2) - max(ay1, by1))`

若两矩形不相交，宽度或高度为负，用 `max(0, ...)` 归零即可。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int computeArea(int ax1, int ay1, int ax2, int ay2,
                           int bx1, int by1, int bx2, int by2) {
        int areaA = (ax2 - ax1) * (ay2 - ay1);
        int areaB = (bx2 - bx1) * (by2 - by1);
        int overlapW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
        int overlapH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
        return areaA + areaB - overlapW * overlapH;
    }
}
```

```python [Python]
class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int,
                    bx1: int, by1: int, bx2: int, by2: int) -> int:
        area_a = (ax2 - ax1) * (ay2 - ay1)
        area_b = (bx2 - bx1) * (by2 - by1)
        overlap_w = max(0, min(ax2, bx2) - max(ax1, bx1))
        overlap_h = max(0, min(ay2, by2) - max(ay1, by1))
        return area_a + area_b - overlap_w * overlap_h
```

```go [Go]
func computeArea(ax1 int, ay1 int, ax2 int, ay2 int,
                 bx1 int, by1 int, bx2 int, by2 int) int {
    areaA := (ax2 - ax1) * (ay2 - ay1)
    areaB := (bx2 - bx1) * (by2 - by1)
    overlapW := max(0, min(ax2, bx2)-max(ax1, bx1))
    overlapH := max(0, min(ay2, by2)-max(ay1, by1))
    return areaA + areaB - overlapW*overlapH
}

func max(a, b int) int { if a > b { return a }; return b }
func min(a, b int) int { if a < b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int computeArea(int ax1, int ay1, int ax2, int ay2,
                    int bx1, int by1, int bx2, int by2) {
        int areaA = (ax2 - ax1) * (ay2 - ay1);
        int areaB = (bx2 - bx1) * (by2 - by1);
        int overlapW = max(0, min(ax2, bx2) - max(ax1, bx1));
        int overlapH = max(0, min(ay2, by2) - max(ay1, by1));
        return areaA + areaB - overlapW * overlapH;
    }
};
```

```js [JavaScript]
/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    const areaA = (ax2 - ax1) * (ay2 - ay1);
    const areaB = (bx2 - bx1) * (by2 - by1);
    const overlapW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
    const overlapH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
    return areaA + areaB - overlapW * overlapH;
};
```

```ts [TypeScript]
/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
function computeArea(ax1: number, ay1: number, ax2: number, ay2: number,
                     bx1: number, by1: number, bx2: number, by2: number): number {
    const areaA = (ax2 - ax1) * (ay2 - ay1);
    const areaB = (bx2 - bx1) * (by2 - by1);
    const overlapW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
    const overlapH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
    return areaA + areaB - overlapW * overlapH;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

## 三、总结

矩形面积覆盖的标准做法是 **容斥原理**：`A + B - A∩B`。

关键点在于重叠区的计算 —— 一维区间 `[a1, a2]` 与 `[b1, b2]` 的重叠长度为 `max(0, min(a2, b2) - max(a1, b1))`，这一公式在几何问题中极为常用（两个维度分别计算后相乘即得重叠矩形面积）。注意坐标可能为负，面积计算需保证非负。
