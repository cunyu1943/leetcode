# [469. 凸多边形 🔒 会员题](https://leetcode.cn/problems/convex-polygon/)

## 一、题目描述

给定按顺序（顺时针或逆时针）给出多边形顶点的数组 `points`，判断该多边形是否为**凸多边形**。

凸多边形：任意连续三条边转向一致（叉积符号相同）。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：points = [[0,0],[0,1],[1,1],[1,0]]
输出：true
```

**示例 2：**

```
输入：points = [[0,0],[0,10],[10,10],[10,0],[5,5]]
输出：false
```

**提示：**

- `3 <= points.length <= 10^4`
- `points[i].length == 2`
- `-10^4 <= x_i, y_i <= 10^4`
- 顶点按边界顺序给出

## 二、解答方法

### 2.1 方法一：叉积符号一致性

1. 思路

对连续三点 `A, B, C`，计算向量 `AB` 与 `BC` 的叉积 `cross = (B.x-A.x)*(C.y-B.y) - (B.y-A.y)*(C.x-B.x)`。凸多边形所有 `cross` 应同号（全 $\ge 0$ 或全 $\le 0$）；一旦出现异号即为凹。注意允许共线（叉积为 0）不算凹。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def isConvex(self, points: List[List[int]]) -> bool:
        n = len(points)
        sign = 0
        for i in range(n):
            x1, y1 = points[i]
            x2, y2 = points[(i + 1) % n]
            x3, y3 = points[(i + 2) % n]
            cross = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2)
            if cross != 0:
                if sign == 0:
                    sign = 1 if cross > 0 else -1
                elif (cross > 0) != (sign > 0):
                    return False
        return True
```

```java [Java]
class Solution {
    public boolean isConvex(List<List<Integer>> points) {
        int n = points.size(), sign = 0;
        for (int i = 0; i < n; i++) {
            int[] a = points.get(i), b = points.get((i + 1) % n), c = points.get((i + 2) % n);
            int cross = (b.get(0) - a.get(0)) * (c.get(1) - b.get(1)) - (b.get(1) - a.get(1)) * (c.get(0) - b.get(0));
            if (cross != 0) {
                if (sign == 0) sign = cross > 0 ? 1 : -1;
                else if ((cross > 0) != (sign > 0)) return false;
            }
        }
        return true;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

会员题。叉积符号一致性是判断凸性的几何标准方法。相关题目：587 安装栅栏（凸包）、96 不同的二叉搜索树（无关，仅列于几何类）。
