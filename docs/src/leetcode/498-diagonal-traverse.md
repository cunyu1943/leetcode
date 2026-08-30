# [498. 对角线遍历](https://leetcode.cn/problems/diagonal-traverse/)

## 一、题目描述

给定 `m x n` 矩阵，按**对角线**遍历：第 0 条对角线向右上，第 1 条向左下，交替方向，直到遍历完所有元素。

**示例 1：**

```
输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,4,7,5,3,6,8,9]
解释：对角线交替：↗ ↘ ↗ ↘ ...
```

**示例 2：**

```
输入：mat = [[1,2],[3,4]]
输出：[1,2,3,4]
```

**提示：**

- `m == mat.length`，`n == mat[i].length`
- `1 <= m, n <= 10^4`
- `1 <= m * n <= 10^4`

## 二、解答方法

### 2.1 方法一：按对角线和枚举 + 方向翻转

1. 思路

每条对角线满足 `i + j = d` 为常数。枚举 `d` 从 0 到 `m+n-2`：若 `d` 为偶数则自下而上（i 从大到小），否则自上而下（i 从小到大）。注意边界限制 `0 <= i < m`、`0 <= d-i < n`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int[] findDiagonalOrder(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[] res = new int[m * n];
        int idx = 0;
        for (int d = 0; d < m + n; d++) {
            if (d % 2 == 1) {
                for (int i = Math.max(0, d - n + 1); i <= Math.min(m - 1, d); i++)
                    res[idx++] = mat[i][d - i];
            } else {
                for (int i = Math.min(m - 1, d); i >= Math.max(0, d - n + 1); i--)
                    res[idx++] = mat[i][d - i];
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        m, n = len(mat), len(mat[0])
        res = []
        for d in range(m + n - 1):
            if d % 2 == 1:
                for i in range(max(0, d - n + 1), min(m - 1, d) + 1):
                    res.append(mat[i][d - i])
            else:
                for i in range(min(m - 1, d), max(0, d - n + 1) - 1, -1):
                    res.append(mat[i][d - i])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<int> res;
        for (int d = 0; d < m + n - 1; d++) {
            if (d % 2 == 1) {
                for (int i = max(0, d - n + 1); i <= min(m - 1, d); i++)
                    res.push_back(mat[i][d - i]);
            } else {
                for (int i = min(m - 1, d); i >= max(0, d - n + 1); i--)
                    res.push_back(mat[i][d - i]);
            }
        }
        return res;
    }
};
```

```go [Go]
func findDiagonalOrder(mat [][]int) []int {
	m, n := len(mat), len(mat[0])
	res := []int{}
	for d := 0; d < m+n-1; d++ {
		if d%2 == 1 {
			for i := max(0, d-n+1); i <= min(m-1, d); i++ {
				res = append(res, mat[i][d-i])
			}
		} else {
			for i := min(m-1, d); i >= max(0, d-n+1); i-- {
				res = append(res, mat[i][d-i])
			}
		}
	}
	return res
}
func max(a, b int) int { if a > b { return a }; return b }
func min(a, b int) int { if a < b { return a }; return b }
```

```javascript [JavaScript]
var findDiagonalOrder = function (mat) {
    const m = mat.length, n = mat[0].length;
    const res = [];
    for (let d = 0; d < m + n - 1; d++) {
        if (d % 2 === 1) {
            for (let i = Math.max(0, d - n + 1); i <= Math.min(m - 1, d); i++)
                res.push(mat[i][d - i]);
        } else {
            for (let i = Math.min(m - 1, d); i >= Math.max(0, d - n + 1); i--)
                res.push(mat[i][d - i]);
        }
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn)$。
- 空间复杂度：$O(1)$（不计输出）。

## 三、总结

按对角线和 `d` 枚举 + 方向判定是矩阵对角线遍历的标准做法。相关题目：54 螺旋矩阵、59 螺旋矩阵 II、1424 对角线遍历 II。
