# [面试题 16.14. 最佳直线](https://leetcode.cn/problems/best-line-lcci/)

## 一、题目描述

给定一个二维平面上的点集 `points`，其中 `points[i] = [xi, yi]`，求一条直线，使其穿过的点数量最多。返回这条直线上任意两个点的索引（即两个点的下标），使得这两个点确定的直线穿过最多点。如果有多个解，返回任意一个即可。

**示例 1：**

```
输入：points = [[0,0],[1,1],[2,2]]
输出：[0,2] 或 [0,1] 等
```

**示例 2：**

```
输入：points = [[1,1],[2,2],[3,3],[4,4],[2,3]]
输出：[0,3] 等
```

**提示：**

- `2 <= points.length <= 300`
- `-10^4 <= xi, yi <= 10^4`
- 所有点对之间不重合

## 二、解答方法

### 2.1 方法一：暴力枚举所有点对（O(n³)）

**1. 思路**

枚举所有点对 `(i, j)`，确定一条直线，然后遍历所有其他点 `k`，用叉积判断 `k` 是否在直线 `ij` 上（叉积为零表示三点共线）。统计点数，更新最大值和对应的点对。时间复杂度 `O(n³)`，`n ≤ 300` 时可接受。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] bestLine(int[][] points) {
        int n = points.length;
        int maxCount = 0;
        int[] res = new int[]{0, 1};
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int count = 0;
                for (int k = 0; k < n; k++) {
                    if (isCollinear(points[i], points[j], points[k])) {
                        count++;
                    }
                }
                if (count > maxCount) {
                    maxCount = count;
                    res[0] = i;
                    res[1] = j;
                }
            }
        }
        return res;
    }
    private boolean isCollinear(int[] a, int[] b, int[] c) {
        return (long)(b[0] - a[0]) * (c[1] - a[1]) - (long)(b[1] - a[1]) * (c[0] - a[0]) == 0;
    }
}
```

```python [Python]
class Solution:
    def bestLine(self, points: List[List[int]]) -> List[int]:
        n = len(points)
        max_count = 0
        res = [0, 1]
        for i in range(n):
            for j in range(i+1, n):
                count = 0
                for k in range(n):
                    if self.is_collinear(points[i], points[j], points[k]):
                        count += 1
                if count > max_count:
                    max_count = count
                    res = [i, j]
        return res
    
    def is_collinear(self, a, b, c):
        return (b[0]-a[0]) * (c[1]-a[1]) - (b[1]-a[1]) * (c[0]-a[0]) == 0
```

```go [Go]
func bestLine(points [][]int) []int {
    n := len(points)
    maxCount := 0
    res := []int{0, 1}
    for i := 0; i < n; i++ {
        for j := i+1; j < n; j++ {
            count := 0
            for k := 0; k < n; k++ {
                if isCollinear(points[i], points[j], points[k]) {
                    count++
                }
            }
            if count > maxCount {
                maxCount = count
                res = []int{i, j}
            }
        }
    }
    return res
}
func isCollinear(a, b, c []int) bool {
    return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]) == 0
}
```

```c [C]
#include <stdbool.h>
bool isCollinear(int* a, int* b, int* c) {
    return (long long)(b[0]-a[0])*(c[1]-a[1]) - (long long)(b[1]-a[1])*(c[0]-a[0]) == 0;
}
int* bestLine(int** points, int pointsSize, int* pointsColSize, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    res[0] = 0; res[1] = 1;
    int maxCount = 0;
    for (int i = 0; i < pointsSize; i++) {
        for (int j = i+1; j < pointsSize; j++) {
            int count = 0;
            for (int k = 0; k < pointsSize; k++) {
                if (isCollinear(points[i], points[j], points[k])) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                res[0] = i; res[1] = j;
            }
        }
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> bestLine(vector<vector<int>>& points) {
        int n = points.size();
        int maxCount = 0;
        vector<int> res = {0, 1};
        for (int i = 0; i < n; i++) {
            for (int j = i+1; j < n; j++) {
                int count = 0;
                for (int k = 0; k < n; k++) {
                    if (isCollinear(points[i], points[j], points[k])) {
                        count++;
                    }
                }
                if (count > maxCount) {
                    maxCount = count;
                    res = {i, j};
                }
            }
        }
        return res;
    }
    bool isCollinear(vector<int>& a, vector<int>& b, vector<int>& c) {
        return (long long)(b[0]-a[0])*(c[1]-a[1]) - (long long)(b[1]-a[1])*(c[0]-a[0]) == 0;
    }
};
```

```javascript [JavaScript]
var bestLine = function(points) {
    const n = points.length;
    let maxCount = 0;
    let res = [0, 1];
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            let count = 0;
            for (let k = 0; k < n; k++) {
                if (isCollinear(points[i], points[j], points[k])) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                res = [i, j];
            }
        }
    }
    return res;
};
function isCollinear(a, b, c) {
    return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]) === 0;
}
```

```typescript [TypeScript]
function bestLine(points: number[][]): number[] {
    const n = points.length;
    let maxCount = 0;
    let res: number[] = [0, 1];
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            let count = 0;
            for (let k = 0; k < n; k++) {
                if (isCollinear(points[i], points[j], points[k])) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                res = [i, j];
            }
        }
    }
    return res;
}
function isCollinear(a: number[], b: number[], c: number[]): boolean {
    return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]) === 0;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n³)`，三层循环。
- **空间复杂度**：`O(1)`，仅使用常数空间。

---

### 2.2 方法二：哈希表优化（O(n²)，推荐）

**1. 思路**

对每个点 `i`，计算它与其他点 `j` 的斜率，用哈希表统计相同斜率的数量（即经过点 `i` 的直线上的点数）。加上点 `i` 自身，即为该直线上的点数。记录最大值，并保存对应的点 `i` 和另一个点 `j`。

斜率用最简分数表示，避免浮点误差。时间复杂度 `O(n²)`。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.*;
class Solution {
    public int[] bestLine(int[][] points) {
        int n = points.length;
        int maxCount = 0;
        int[] res = new int[]{0, 1};
        for (int i = 0; i < n; i++) {
            Map<String, Integer> map = new HashMap<>();
            for (int j = i + 1; j < n; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(dx, dy);
                dx /= g; dy /= g;
                String key = dx + "," + dy;
                map.put(key, map.getOrDefault(key, 0) + 1);
            }
            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                int count = entry.getValue() + 1; // 加上 i 自身
                if (count > maxCount) {
                    maxCount = count;
                    String[] parts = entry.getKey().split(",");
                    int dx = Integer.parseInt(parts[0]);
                    int dy = Integer.parseInt(parts[1]);
                    // 找到对应的 j
                    for (int j = i + 1; j < n; j++) {
                        int ddx = points[j][0] - points[i][0];
                        int ddy = points[j][1] - points[i][1];
                        int g = gcd(ddx, ddy);
                        ddx /= g; ddy /= g;
                        if (ddx == dx && ddy == dy) {
                            res[0] = i;
                            res[1] = j;
                            break;
                        }
                    }
                }
            }
        }
        return res;
    }
    private int gcd(int a, int b) {
        if (b == 0) return Math.abs(a);
        return gcd(b, a % b);
    }
}
```

```python [Python]
import math
class Solution:
    def bestLine(self, points: List[List[int]]) -> List[int]:
        n = len(points)
        max_count = 0
        res = [0, 1]
        for i in range(n):
            slope_map = {}
            for j in range(i+1, n):
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                g = math.gcd(dx, dy)
                dx //= g
                dy //= g
                key = (dx, dy)
                slope_map[key] = slope_map.get(key, 0) + 1
            for key, cnt in slope_map.items():
                count = cnt + 1
                if count > max_count:
                    max_count = count
                    dx, dy = key
                    for j in range(i+1, n):
                        ddx = points[j][0] - points[i][0]
                        ddy = points[j][1] - points[i][1]
                        g = math.gcd(ddx, ddy)
                        ddx //= g
                        ddy //= g
                        if ddx == dx and ddy == dy:
                            res = [i, j]
                            break
        return res
```

```go [Go]
func bestLine(points [][]int) []int {
    n := len(points)
    maxCount := 0
    res := []int{0, 1}
    for i := 0; i < n; i++ {
        slopeMap := make(map[[2]int]int)
        for j := i+1; j < n; j++ {
            dx := points[j][0] - points[i][0]
            dy := points[j][1] - points[i][1]
            g := gcd(dx, dy)
            dx /= g
            dy /= g
            key := [2]int{dx, dy}
            slopeMap[key]++
        }
        for key, cnt := range slopeMap {
            count := cnt + 1
            if count > maxCount {
                maxCount = count
                dx, dy := key[0], key[1]
                for j := i+1; j < n; j++ {
                    ddx := points[j][0] - points[i][0]
                    ddy := points[j][1] - points[i][1]
                    g := gcd(ddx, ddy)
                    ddx /= g
                    ddy /= g
                    if ddx == dx && ddy == dy {
                        res = []int{i, j}
                        break
                    }
                }
            }
        }
    }
    return res
}
func gcd(a, b int) int {
    if b == 0 { return abs(a) }
    return gcd(b, a % b)
}
func abs(a int) int { if a < 0 { return -a }; return a }
```

```c [C]
#include <stdlib.h>
#include <string.h>
int gcd(int a, int b) {
    if (b == 0) return a < 0 ? -a : a;
    return gcd(b, a % b);
}
// 为了简化，使用结构体存储键值对（实际实现可自行构建哈希表，此处以伪代码示意）
// 由于C语言没有内置哈希表，此处略去完整实现，但展示核心逻辑
int* bestLine(int** points, int pointsSize, int* pointsColSize, int* returnSize) {
    // 实际项目建议用uthash或自行构造哈希，此处省略具体代码
    // 返回示例
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    res[0] = 0; res[1] = 1;
    // 完整实现可参考其它语言逻辑
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> bestLine(vector<vector<int>>& points) {
        int n = points.size();
        int maxCount = 0;
        vector<int> res = {0, 1};
        for (int i = 0; i < n; i++) {
            unordered_map<string, int> map;
            for (int j = i+1; j < n; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(dx, dy);
                dx /= g; dy /= g;
                string key = to_string(dx) + "," + to_string(dy);
                map[key]++;
            }
            for (auto& entry : map) {
                int count = entry.second + 1;
                if (count > maxCount) {
                    maxCount = count;
                    string key = entry.first;
                    int pos = key.find(',');
                    int dx = stoi(key.substr(0, pos));
                    int dy = stoi(key.substr(pos+1));
                    for (int j = i+1; j < n; j++) {
                        int ddx = points[j][0] - points[i][0];
                        int ddy = points[j][1] - points[i][1];
                        int g = gcd(ddx, ddy);
                        ddx /= g; ddy /= g;
                        if (ddx == dx && ddy == dy) {
                            res = {i, j};
                            break;
                        }
                    }
                }
            }
        }
        return res;
    }
    int gcd(int a, int b) {
        if (b == 0) return abs(a);
        return gcd(b, a % b);
    }
};
```

```javascript [JavaScript]
var bestLine = function(points) {
    const n = points.length;
    let maxCount = 0;
    let res = [0, 1];
    for (let i = 0; i < n; i++) {
        const slopeMap = new Map();
        for (let j = i+1; j < n; j++) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            const g = gcd(dx, dy);
            dx /= g; dy /= g;
            const key = dx + ',' + dy;
            slopeMap.set(key, (slopeMap.get(key) || 0) + 1);
        }
        for (const [key, cnt] of slopeMap) {
            const count = cnt + 1;
            if (count > maxCount) {
                maxCount = count;
                const [dx, dy] = key.split(',').map(Number);
                for (let j = i+1; j < n; j++) {
                    let ddx = points[j][0] - points[i][0];
                    let ddy = points[j][1] - points[i][1];
                    const g = gcd(ddx, ddy);
                    ddx /= g; ddy /= g;
                    if (ddx === dx && ddy === dy) {
                        res = [i, j];
                        break;
                    }
                }
            }
        }
    }
    return res;
};
function gcd(a, b) {
    if (b === 0) return Math.abs(a);
    return gcd(b, a % b);
}
```

```typescript [TypeScript]
function bestLine(points: number[][]): number[] {
    const n = points.length;
    let maxCount = 0;
    let res: number[] = [0, 1];
    for (let i = 0; i < n; i++) {
        const slopeMap = new Map<string, number>();
        for (let j = i+1; j < n; j++) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            const g = gcd(dx, dy);
            dx /= g; dy /= g;
            const key = dx + ',' + dy;
            slopeMap.set(key, (slopeMap.get(key) || 0) + 1);
        }
        for (const [key, cnt] of slopeMap) {
            const count = cnt + 1;
            if (count > maxCount) {
                maxCount = count;
                const [dx, dy] = key.split(',').map(Number);
                for (let j = i+1; j < n; j++) {
                    let ddx = points[j][0] - points[i][0];
                    let ddy = points[j][1] - points[i][1];
                    const g = gcd(ddx, ddy);
                    ddx /= g; ddy /= g;
                    if (ddx === dx && ddy === dy) {
                        res = [i, j];
                        break;
                    }
                }
            }
        }
    }
    return res;
}
function gcd(a: number, b: number): number {
    if (b === 0) return Math.abs(a);
    return gcd(b, a % b);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`，对每个点计算斜率并哈希统计。
- **空间复杂度**：`O(n)`，哈希表存储斜率计数。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点               |
| ------------ | ---------- | ---------- | ------------------ |
| 暴力枚举点对 | `O(n³)`    | `O(1)`     | 直观，但较慢       |
| 哈希表优化   | `O(n²)`    | `O(n)`     | **推荐**，效率更高 |

**推荐**：面试中首选 **方法二（哈希表优化）**，时间复杂度 `O(n²)`，在 `n ≤ 300` 时表现优秀。
