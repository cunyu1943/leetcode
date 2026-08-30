# [149. 直线上最多的点数](https://leetcode.cn/problems/max-points-on-a-line/)



## 一、题目描述

给你一个数组 `points` ，其中 `points[i] = [xi, yi]` 表示 **X-Y** 平面上的一个点。求最多有多少个点在同一条直线上。



**示例 1：**

```
输入：points = [[1,1],[2,2],[3,3]]
输出：3
```

**示例 2：**

```
输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出：4
```

**提示：**

-   `1 <= points.length <= 300`
-   `points[i].length == 2`
-   `-10⁴ <= xi, yi <= 10⁴`
-   `points` 中的所有点 **互不相同**



## 二、解答方法

### 2.1 方法一：枚举每个点 + 斜率哈希

1. **思路**

固定一个点 `i`，计算它与其他所有点的斜率（用最简分数表示，避免浮点误差），相同斜率的点共线。用哈希表统计每种斜率出现次数，取最大值。注意重合点需单独计数（任意直线都包含它们）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maxPoints(int[][] points) {
        int n = points.length;
        if (n <= 2) return n;
        int ans = 0;
        for (int i = 0; i < n; i++) {
            Map<String, Integer> map = new HashMap<>();
            int duplicate = 0, max = 0;
            for (int j = i + 1; j < n; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                if (dx == 0 && dy == 0) {
                    duplicate++;
                    continue;
                }
                int g = gcd(dx, dy);
                String key = (dx / g) + "," + (dy / g);
                map.put(key, map.getOrDefault(key, 0) + 1);
                max = Math.max(max, map.get(key));
            }
            ans = Math.max(ans, max + duplicate + 1);
        }
        return ans;
    }

    private int gcd(int a, int b) {
        return b == 0 ? Math.abs(a) : gcd(b, a % b);
    }
}
```

```python [Python]
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        from math import gcd
        from collections import defaultdict
        n = len(points)
        if n <= 2:
            return n
        ans = 0
        for i in range(n):
            cnt = defaultdict(int)
            duplicate = 0
            max_cnt = 0
            for j in range(i + 1, n):
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                if dx == 0 and dy == 0:
                    duplicate += 1
                    continue
                g = gcd(dx, dy)
                key = (dx // g, dy // g)
                cnt[key] += 1
                max_cnt = max(max_cnt, cnt[key])
            ans = max(ans, max_cnt + duplicate + 1)
        return ans
```

```go [Go]
func maxPoints(points [][]int) int {
    n := len(points)
    if n <= 2 {
        return n
    }
    gcd := func(a, b int) int {
        for b != 0 {
            a, b = b, a%b
        }
        return a
    }
    ans := 0
    for i := 0; i < n; i++ {
        cnt := make(map[[2]int]int)
        duplicate, maxCnt := 0, 0
        for j := i + 1; j < n; j++ {
            dx := points[j][0] - points[i][0]
            dy := points[j][1] - points[i][1]
            if dx == 0 && dy == 0 {
                duplicate++
                continue
            }
            g := gcd(dx, dy)
            if g != 0 {
                dx /= g
                dy /= g
            }
            key := [2]int{dx, dy}
            cnt[key]++
            if cnt[key] > maxCnt {
                maxCnt = cnt[key]
            }
        }
        if maxCnt+duplicate+1 > ans {
            ans = maxCnt + duplicate + 1
        }
    }
    return ans
}
```

```cpp [C++]
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        int n = points.size();
        if (n <= 2) return n;
        int ans = 0;
        auto gcd = [](int a, int b) -> int {
            return b == 0 ? abs(a) : gcd(b, a % b);
        };
        for (int i = 0; i < n; i++) {
            unordered_map<string, int> cnt;
            int duplicate = 0, maxCnt = 0;
            for (int j = i + 1; j < n; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                if (dx == 0 && dy == 0) {
                    duplicate++;
                    continue;
                }
                int g = gcd(dx, dy);
                string key = to_string(dx / g) + "," + to_string(dy / g);
                cnt[key]++;
                maxCnt = max(maxCnt, cnt[key]);
            }
            ans = max(ans, maxCnt + duplicate + 1);
        }
        return ans;
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
    const n = points.length;
    if (n <= 2) return n;
    const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const cnt = new Map();
        let duplicate = 0, maxCnt = 0;
        for (let j = i + 1; j < n; j++) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            if (dx === 0 && dy === 0) {
                duplicate++;
                continue;
            }
            const g = gcd(dx, dy);
            if (g !== 0) {
                dx /= g;
                dy /= g;
            }
            const key = dx + ',' + dy;
            cnt.set(key, (cnt.get(key) || 0) + 1);
            maxCnt = Math.max(maxCnt, cnt.get(key));
        }
        ans = Math.max(ans, maxCnt + duplicate + 1);
    }
    return ans;
};
```

```ts [TypeScript]
/**
 * @param {number[][]} points
 * @return {number}
 */
function maxPoints(points: number[][]): number {
    const n = points.length;
    if (n <= 2) return n;
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const cnt = new Map<string, number>();
        let duplicate = 0, maxCnt = 0;
        for (let j = i + 1; j < n; j++) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            if (dx === 0 && dy === 0) {
                duplicate++;
                continue;
            }
            const g = gcd(dx, dy);
            if (g !== 0) {
                dx /= g;
                dy /= g;
            }
            const key = `${dx},${dy}`;
            cnt.set(key, (cnt.get(key) || 0) + 1);
            maxCnt = Math.max(maxCnt, cnt.get(key)!);
        }
        ans = Math.max(ans, maxCnt + duplicate + 1);
    }
    return ans;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n² log m)`，其中 `n` 为点数，`m` 为坐标范围（gcd 近似常数）。
- **空间复杂度**：`O(n)`。

## 三、总结

本题关键是**用最简分数表示斜率**避免浮点误差，并**单独处理重合点**。固定一个点统计其余点斜率是最直接的思路。也可枚举所有点对、用直线一般式判断，但复杂度更高。
