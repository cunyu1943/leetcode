# [LCR 100. 三角形最小路径和](https://leetcode.cn/problems/IlPe0q/)



## 一、题目描述

给定一个三角形 `triangle` ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。**相邻的结点** 在这里指的是 **下标** 与 **上一层结点下标** 相同或者等于 **上一层结点下标 + 1** 的两个结点。也就是说，如果正位于当前行的下标 `i` ，那么下一步可以移动到下一行的下标 `i` 或 `i + 1` 。



**示例 1：**

```
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```

**示例 2：**

```
输入：triangle = [[-10]]
输出：-10
```

**提示：**

- `1 <= triangle.length <= 200`
- `triangle[0].length == 1`
- `triangle[i].length == triangle[i - 1].length + 1`
- `-10⁴ <= triangle[i][j] <= 10⁴`



## 二、解答方法

### 2.1 方法一：自底向上动态规划

1. **思路**

自底向上递推：设 `dp[j]` 为「从第 `i` 行的第 `j` 个元素出发到最底端的最小路径和」。

- 从倒数第二行向上处理，`dp[j] = triangle[i][j] + min(dp[j], dp[j+1])`；
- 最终 `dp[0]` 即答案。

这样避免了自顶向下时的边界判断，时间 `O(n²)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n + 1]; // 初始 0，表示底部的虚拟行
        for (int i = n - 1; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
            }
        }
        return dp[0];
    }
}
```

```python [Python]
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = [0] * (len(triangle) + 1)
        for row in reversed(triangle):
            for j in range(len(row)):
                dp[j] = row[j] + min(dp[j], dp[j + 1])
        return dp[0]
```

```cpp [C++]
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp(n + 1, 0);
        for (int i = n - 1; i >= 0; i--)
            for (int j = 0; j <= i; j++)
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
        return dp[0];
    }
};
```

```go [Go]
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([]int, n+1)
    for i := n - 1; i >= 0; i-- {
        for j := 0; j <= i; j++ {
            if dp[j] < dp[j+1] {
                dp[j] = triangle[i][j] + dp[j]
            } else {
                dp[j] = triangle[i][j] + dp[j+1]
            }
        }
    }
    return dp[0]
}
```

```js [JavaScript]
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    const n = triangle.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    return dp[0];
};
```

```c [C]
#include <stdlib.h>

int minimumTotal(int** triangle, int triangleSize, int* triangleColSize) {
    int* dp = (int*)calloc(triangleSize + 1, sizeof(int));
    for (int i = triangleSize - 1; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            int t = dp[j] < dp[j + 1] ? dp[j] : dp[j + 1];
            dp[j] = triangle[i][j] + t;
        }
    }
    int res = dp[0];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function minimumTotal(triangle: number[][]): number {
    const n = triangle.length;
    const dp: number[] = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    return dp[0];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n)`，滚动数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 自底向上 DP | `O(n²)` | `O(n)` | 标准解法，无边界特判 |

自底向上递推让每个位置只需在「下方两个相邻位置」取最小，`dp[n]` 补零作为底部虚拟行，最后 `dp[0]` 即从顶点出发的最小路径和。

