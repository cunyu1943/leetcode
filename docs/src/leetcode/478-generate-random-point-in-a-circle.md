# [478. 在圆内随机生成点](https://leetcode.cn/problems/generate-random-point-in-a-circle/)

## 一、题目描述

给定圆的半径 `radius` 和圆心 `(x_center, y_center)`，实现 `Solution` 类，其 `randPoint()` 在以圆心为中心、半径为 `radius` 的**圆面内**（含边界）均匀随机返回一个点坐标。

**示例 1：**

```
输入：radius = 1, x_center = 0, y_center = 0
多次调用 randPoint() 返回圆内均匀点，如 [0.5, -0.3]。
```

**提示：**

- `0 <= radius <= 10^8`
- `-10^7 <= x_center, y_center <= 10^7`

## 二、解答方法

### 2.1 方法一：拒绝采样（极坐标均匀）

1. 思路

方法 A（拒绝采样）：在 `[-r, r] x [-r, r]` 正方形内随机取点，若到圆心距离 $\le r$ 则接受。简单但接受率 $\pi/4$。

方法 B（正确均匀极坐标）：半径取 `R = r * sqrt(U)`（`U` 为 `[0,1)` 均匀随机数，开方保证面积均匀），角度 `θ` 均匀，坐标 `x = xc + R*cosθ, y = yc + R*sinθ`。

2. 代码实现（Python，极坐标法）

:::::: code-group

```python [Python]
import random, math
class Solution:
    def __init__(self, radius: float, x_center: float, y_center: float):
        self.r = radius
        self.x = x_center
        self.y = y_center
    def randPoint(self) -> List[float]:
        R = self.r * math.sqrt(random.random())
        theta = random.uniform(0, 2 * math.pi)
        return [self.x + R * math.cos(theta), self.y + R * math.sin(theta)]
```

```java [Java]
class Solution {
    double r, x, y;
    Random rand = new Random();
    public Solution(double radius, double x_center, double y_center) {
        r = radius; x = x_center; y = y_center;
    }
    public double[] randPoint() {
        double R = r * Math.sqrt(rand.nextDouble());
        double theta = rand.nextDouble() * 2 * Math.PI;
        return new double[]{x + R * Math.cos(theta), y + R * Math.sin(theta)};
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(1)$。
- 空间复杂度：$O(1)$。

## 三、总结

圆内均匀采样要点：**半径需开方**（`sqrt`），否则中心稠密。相关题目：470 Rand7→Rand10、497 矩形内随机点、398 随机数索引。
