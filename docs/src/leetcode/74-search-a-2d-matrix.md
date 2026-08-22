# [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)



## 一、题目描述

给你一个满足下述两条属性的 `m x n` 整数矩阵：

-   每行中的整数从左到右按升序排列。
-   每行的第一个整数大于前一行的最后一个整数。

给你一个整数 `target`，如果 `target` 在矩阵中，返回 `true`；否则返回 `false`。



**示例 1：**

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```

**示例 2：**

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
```

**提示：**

-   `m == matrix.length`
-   `n == matrix[i].length`
-   `1 <= m, n <= 100`
-   `-10^4 <= matrix[i][j], target <= 10^4`



## 二、解答方法

### 2.1 方法一：两次二分


1. **思路**

先对第一列二分定位 `target` 所在行（最后一个 `matrix[i][0] <= target` 的行），再在该行二分查找。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int lo = 0, hi = m - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (matrix[mid][0] <= target) lo = mid;
            else hi = mid - 1;
        }
        if (matrix[lo][0] > target) return false;
        int[] row = matrix[lo];
        lo = 0; hi = n - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (row[mid] == target) return true;
            else if (row[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if matrix[mid][0] <= target: lo = mid
            else: hi = mid - 1
        if matrix[lo][0] > target: return False
        row = matrix[lo]
        lo, hi = 0, n - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if row[mid] == target: return True
            elif row[mid] < target: lo = mid + 1
            else: hi = mid - 1
        return False
```

```go [Go]
func searchMatrix(matrix [][]int, target int) bool {
    m, n := len(matrix), len(matrix[0])
    lo, hi := 0, m-1
    for lo < hi {
        mid := lo + (hi-lo+1)/2
        if matrix[mid][0] <= target { lo = mid } else { hi = mid - 1 }
    }
    if matrix[lo][0] > target { return false }
    row := matrix[lo]
    lo, hi = 0, n-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        if row[mid] == target { return true }
        if row[mid] < target { lo = mid + 1 } else { hi = mid - 1 }
    }
    return false
}
```

```c [C]
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    int m = matrixSize, n = matrixColSize[0];
    int lo = 0, hi = m - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;
        if (matrix[mid][0] <= target) lo = mid; else hi = mid - 1;
    }
    if (matrix[lo][0] > target) return false;
    int* row = matrix[lo];
    lo = 0; hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (row[mid] == target) return true;
        if (row[mid] < target) lo = mid + 1; else hi = mid - 1;
    }
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int lo = 0, hi = m - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (matrix[mid][0] <= target) lo = mid;
            else hi = mid - 1;
        }
        if (matrix[lo][0] > target) return false;
        int lo2 = 0, hi2 = n - 1;
        while (lo2 <= hi2) {
            int mid = lo2 + (hi2 - lo2) / 2;
            if (matrix[lo][mid] == target) return true;
            else if (matrix[lo][mid] < target) lo2 = mid + 1;
            else hi2 = mid - 1;
        }
        return false;
    }
};
```

```javascript [JavaScript]
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let lo = 0, hi = m - 1;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo + 1) / 2);
        if (matrix[mid][0] <= target) lo = mid; else hi = mid - 1;
    }
    if (matrix[lo][0] > target) return false;
    let l = 0, r = n - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (matrix[lo][mid] === target) return true;
        else if (matrix[lo][mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return false;
};
```

```typescript [TypeScript]
function searchMatrix(matrix: number[][], target: number): boolean {
    const m = matrix.length, n = matrix[0].length;
    let lo = 0, hi = m - 1;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo + 1) / 2);
        if (matrix[mid][0] <= target) lo = mid; else hi = mid - 1;
    }
    if (matrix[lo][0] > target) return false;
    let l = 0, r = n - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (matrix[lo][mid] === target) return true;
        else if (matrix[lo][mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log m + log n)`，两次二分。
- **空间复杂度**：`O(1)`，只用下标。

### 2.2 方法二：一次二分（展开为一维）


1. **思路**

把矩阵看作长度为 `m * n` 的有序数组，直接二分下标 `mid`，映射到 `matrix[mid / n][mid % n]`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int lo = 0, hi = m * n - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m * n - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            val = matrix[mid // n][mid % n]
            if val == target: return True
            elif val < target: lo = mid + 1
            else: hi = mid - 1
        return False
```

```go [Go]
func searchMatrix(matrix [][]int, target int) bool {
    m, n := len(matrix), len(matrix[0])
    lo, hi := 0, m*n-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        val := matrix[mid/n][mid%n]
        if val == target { return true }
        if val < target { lo = mid + 1 } else { hi = mid - 1 }
    }
    return false
}
```

```c [C]
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    int m = matrixSize, n = matrixColSize[0];
    int lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        if (val < target) lo = mid + 1; else hi = mid - 1;
    }
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int lo = 0, hi = m * n - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
};
```

```javascript [JavaScript]
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) return true;
        else if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
};
```

```typescript [TypeScript]
function searchMatrix(matrix: number[][], target: number): boolean {
    const m = matrix.length, n = matrix[0].length;
    let lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) return true;
        else if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log(m * n))`，一次二分。
- **空间复杂度**：`O(1)`，只用下标。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 两次二分 | `O(log m + log n)` | `O(1)` | 逻辑清晰，分两步 |
| 一次二分（展开一维） | `O(log(m*n))` | `O(1)` | 写法更简洁，推荐 |
