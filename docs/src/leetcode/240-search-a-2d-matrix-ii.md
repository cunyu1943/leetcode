# [240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)



## 一、题目描述

编写一个高效的算法来搜索 `m x n` 矩阵 `matrix` 中的一个目标值 `target` 。该矩阵具有以下特性：

-   每行的元素从左到右升序排列。
-   每列的元素从上到下升序排列。



**示例 1：**

```
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
```

**示例 2：**

```
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false
```

**提示：**

-   `m == matrix.length`
-   `n == matrix[i].length`
-   `1 <= n, m <= 300`
-   `-10⁹ <= matrix[i][j] <= 10⁹`
-   每行的所有元素从左到右升序排列。
-   每列的所有元素从上到下升序排列。
-   `-10⁹ <= target <= 10⁹`



## 二、解答方法

### 2.1 方法一：从右上角开始的「Z 字形」搜索（最优）

1. **思路**

利用行列双升序特性，从 **右上角** `(0, n-1)` 出发：

- 若 `matrix[i][j] == target` → 找到，返回 true；
- 若 `matrix[i][j] > target` → 当前列下面都更大，**排除当前列**，`j--`；
- 若 `matrix[i][j] < target` → 当前行左边都更小，**排除当前行**，`i++`。

每步排除一整行或一整列，最多走 `m + n` 步。

（同理也可从左下角出发。）

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int i = 0, j = n - 1;               // 从右上角出发
        while (i < m && j >= 0) {
            if (matrix[i][j] == target) {
                return true;
            } else if (matrix[i][j] > target) {
                j--;                        // 排除当前列
            } else {
                i++;                        // 排除当前行
            }
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        m, n = len(matrix), len(matrix[0])
        i, j = 0, n - 1                     # 右上角
        while i < m and j >= 0:
            if matrix[i][j] == target:
                return True
            elif matrix[i][j] > target:
                j -= 1
            else:
                i += 1
        return False
```

```go [Go]
func searchMatrix(matrix [][]int, target int) bool {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return false
    }
    m, n := len(matrix), len(matrix[0])
    i, j := 0, n-1
    for i < m && j >= 0 {
        if matrix[i][j] == target {
            return true
        } else if matrix[i][j] > target {
            j--
        } else {
            i++
        }
    }
    return false
}
```

```cpp [C++]
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int m = matrix.size(), n = matrix[0].size();
        int i = 0, j = n - 1;
        while (i < m && j >= 0) {
            if (matrix[i][j] == target) return true;
            else if (matrix[i][j] > target) j--;
            else i++;
        }
        return false;
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;
    const m = matrix.length, n = matrix[0].length;
    let i = 0, j = n - 1;
    while (i < m && j >= 0) {
        if (matrix[i][j] === target) return true;
        else if (matrix[i][j] > target) j--;
        else i++;
    }
    return false;
};
```

```ts [TypeScript]
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix.length || !matrix[0].length) return false;
    const m = matrix.length, n = matrix[0].length;
    let i = 0, j = n - 1;
    while (i < m && j >= 0) {
        if (matrix[i][j] === target) return true;
        else if (matrix[i][j] > target) j--;
        else i++;
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：逐行二分查找

1. **思路**

每行都是升序数组，对每行做一次二分查找。

2. **代码实现（Python）**

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        import bisect
        for row in matrix:
            idx = bisect.bisect_left(row, target)
            if idx < len(row) and row[idx] == target:
                return True
        return False
```

3. **复杂度分析**

- **时间复杂度**：`O(m log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间 | 特点 |
| ---- | ---- | ---- |
| Z 字形搜索（右上角） | `O(m + n)` | 最优，推荐 |
| 逐行二分 | `O(m log n)` | 通用但略慢 |
| 全矩阵遍历 | `O(m × n)` | 未利用有序性 |

「Z 字形」搜索的精髓在于选择 **右上角（或左下角）** 作为起点 —— 这个位置恰好是「行最大、列最小」的 **分岔点**，使得每次比较都能 **确定性地排除一行或一列**。若从左下角出发则为「行最小、列最大」，逻辑对称。

对比 `74. 搜索二维矩阵`：那题整个矩阵拉平后是全局升序，可直接做一次二分（`O(log(mn))`）；本题只保证行列各自升序，无法整体二分。
