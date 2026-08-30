# [497. 非重叠矩形中的随机点](https://leetcode.cn/problems/random-point-in-non-overlapping-rectangles/)

## 一、题目描述

给定一个非重叠的轴对齐矩形列表 `rects`（每个 `[x1, y1, x2, y2]`），实现 `pick()` 方法：以**均匀**概率返回一个落在某个矩形内的点（整数坐标）。矩形内点数越多被选中的概率越大。

**示例 1：**

```
输入：rects = [[[-2,-2,1,1],[2,2,4,6]]]
多次 pick() 返回点，第二个矩形（面积大）被选中的概率更高。
```

**提示：**

- `1 <= rects.length <= 100`
- `rects[i].length == 4`
- 坐标范围 `[-10^9, 10^9]`
- 每个矩形至少含 1 个点（`(x2-x1+1)*(y2-y1+1)` 个整数点）

## 二、解答方法

### 2.1 方法一：前缀点数 + 二分

1. 思路

计算每个矩形包含的整数点数量 `cnt = (x2-x1+1)*(y2-y1+1)`，维护前缀和数组。随机生成一个 `[1, 总点数]` 的数，二分定位落在哪个矩形，再在该矩形内随机取行列偏移。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
import random, bisect
class Solution:
    def __init__(self, rects: List[List[int]]):
        self.rects = rects
        self.pre = [0]
        for x1, y1, x2, y2 in rects:
            self.pre.append(self.pre[-1] + (x2 - x1 + 1) * (y2 - y1 + 1))
    def pick(self) -> List[int]:
        total = self.pre[-1]
        r = random.randint(1, total)
        i = bisect.bisect_left(self.pre, r) - 1
        x1, y1, x2, y2 = self.rects[i]
        # 第 i 个矩形内第 (r - pre[i]) 个点
        offset = r - self.pre[i] - 1
        dx = x2 - x1 + 1
        return [x1 + offset % dx, y1 + offset // dx]
```

```java [Java]
class Solution {
    int[][] rects;
    int[] pre;
    Random rand = new Random();
    public Solution(int[][] rects) {
        this.rects = rects;
        pre = new int[rects.length + 1];
        for (int i = 0; i < rects.length; i++) {
            int[] r = rects[i];
            long cnt = (long)(r[2] - r[0] + 1) * (r[3] - r[1] + 1);
            pre[i + 1] = pre[i] + (int) cnt;
        }
    }
    public int[] pick() {
        int r = rand.nextInt(pre[pre.length - 1]) + 1;
        int i = 0;
        while (pre[i + 1] < r) i++;
        int[] rc = rects[i];
        int dx = rc[2] - rc[0] + 1;
        int offset = r - pre[i] - 1;
        return new int[]{rc[0] + offset % dx, rc[1] + offset / dx};
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：`pick()` 为 $O(\log n)$。
- 空间复杂度：$O(n)$。

## 三、总结

「按面积/点数加权 + 前缀和二分」是几何随机采样的通用做法。相关题目：478 圆内随机点、470 Rand7→Rand10、398 随机数索引。
