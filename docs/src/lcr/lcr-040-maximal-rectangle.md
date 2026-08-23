# [LCR 040. 最大矩形](https://leetcode.cn/problems/PLYXKQ/)



## 一、题目描述

给定一个由 `0` 和 `1` 组成的矩阵 `matrix` ，找出只包含 `1` 的最大矩形，并返回其面积。

**注意：** 此题 `matrix` 输入格式为一维 `01` 字符串数组。



**示例 1：**

```
输入: matrix = ["10100","10111","11111","10010"]
输出: 6
```

**示例 2：**

```
输入: matrix = []
输出: 0
```

**提示：**

- `rows == matrix.length`
- `cols == matrix[0].length`
- `0 <= row, cols <= 200`
- `matrix[i][j]` 为 `'0'` 或 `'1'`



## 二、解答方法

### 2.1 方法一：逐行累加高度 + 单调栈

1. **思路**

把二维问题转化为一维柱状图（LCR 039）：

- 从上到下逐行处理，维护 `heights[j]` 表示以当前行为底、第 `j` 列连续 `1` 的高度：若 `matrix[i][j] == '1'` 则 `heights[j]++`，否则清零；
- 对每一行得到的 `heights` 数组，用「单调栈求柱状图最大矩形」的方法（末尾补 0 哨兵）求出该行对应的最大矩形面积；
- 所有行中的最大值即为答案。

时间 `O(rows · cols)`，空间 `O(cols)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maximalRectangle(String[] matrix) {
        if (matrix.length == 0) return 0;
        int cols = matrix[0].length();
        int[] heights = new int[cols + 1];
        int ans = 0;
        for (String row : matrix) {
            for (int j = 0; j < cols; j++) {
                heights[j] = row.charAt(j) == '1' ? heights[j] + 1 : 0;
            }
            // 单调栈求柱状图最大矩形（heights[cols] = 0 作为哨兵）
            heights[cols] = 0;
            Deque<Integer> stk = new ArrayDeque<>();
            stk.push(-1);
            for (int j = 0; j <= cols; j++) {
                while (stk.peek() != -1 && heights[j] < heights[stk.peek()]) {
                    int h = heights[stk.pop()];
                    ans = Math.max(ans, h * (j - stk.peek() - 1));
                }
                stk.push(j);
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maximalRectangle(self, matrix: List[str]) -> int:
        if not matrix:
            return 0
        cols = len(matrix[0])
        heights = [0] * (cols + 1)
        ans = 0
        for row in matrix:
            for j in range(cols):
                heights[j] = heights[j] + 1 if row[j] == '1' else 0
            heights[cols] = 0
            stk = [-1]
            for j in range(cols + 1):
                while stk[-1] != -1 and heights[j] < heights[stk[-1]]:
                    h = heights[stk.pop()]
                    ans = max(ans, h * (j - stk[-1] - 1))
                stk.append(j)
        return ans
```

```cpp [C++]
class Solution {
public:
    int maximalRectangle(vector<string>& matrix) {
        if (matrix.empty()) return 0;
        int cols = matrix[0].size();
        vector<int> heights(cols + 1, 0);
        int ans = 0;
        for (string& row : matrix) {
            for (int j = 0; j < cols; j++)
                heights[j] = row[j] == '1' ? heights[j] + 1 : 0;
            heights[cols] = 0;
            vector<int> stk;
            stk.push_back(-1);
            for (int j = 0; j <= cols; j++) {
                while (stk.back() != -1 && heights[j] < heights[stk.back()]) {
                    int h = heights[stk.back()];
                    stk.pop_back();
                    ans = max(ans, h * (j - stk.back() - 1));
                }
                stk.push_back(j);
            }
        }
        return ans;
    }
};
```

```go [Go]
func maximalRectangle(matrix []string) int {
    if len(matrix) == 0 {
        return 0
    }
    cols := len(matrix[0])
    heights := make([]int, cols+1)
    ans := 0
    for _, row := range matrix {
        for j := 0; j < cols; j++ {
            if row[j] == '1' {
                heights[j]++
            } else {
                heights[j] = 0
            }
        }
        heights[cols] = 0
        stk := []int{-1}
        for j := 0; j <= cols; j++ {
            for stk[len(stk)-1] != -1 && heights[j] < heights[stk[len(stk)-1]] {
                h := heights[stk[len(stk)-1]]
                stk = stk[:len(stk)-1]
                if area := h * (j - stk[len(stk)-1] - 1); area > ans {
                    ans = area
                }
            }
            stk = append(stk, j)
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    if (matrix.length === 0) return 0;
    const cols = matrix[0].length;
    const heights = new Array(cols + 1).fill(0);
    let ans = 0;
    for (const row of matrix) {
        for (let j = 0; j < cols; j++) {
            heights[j] = row[j] === '1' ? heights[j] + 1 : 0;
        }
        heights[cols] = 0;
        const stk = [-1];
        for (let j = 0; j <= cols; j++) {
            while (stk[stk.length - 1] !== -1 && heights[j] < heights[stk[stk.length - 1]]) {
                const h = heights[stk.pop()];
                ans = Math.max(ans, h * (j - stk[stk.length - 1] - 1));
            }
            stk.push(j);
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int maximalRectangle(char** matrix, int matrixSize, int* matrixColSize) {
    if (matrixSize == 0) return 0;
    int cols = matrixColSize[0];
    int* heights = (int*)calloc(cols + 1, sizeof(int));
    int* stk = (int*)malloc((cols + 2) * sizeof(int));
    int ans = 0;
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j < cols; j++)
            heights[j] = matrix[i][j] == '1' ? heights[j] + 1 : 0;
        heights[cols] = 0;
        int top = 0;
        stk[top++] = -1;
        for (int j = 0; j <= cols; j++) {
            while (stk[top - 1] != -1 && heights[j] < heights[stk[top - 1]]) {
                int h = heights[stk[--top]];
                int area = h * (j - stk[top - 1] - 1);
                if (area > ans) ans = area;
            }
            stk[top++] = j;
        }
    }
    free(heights);
    free(stk);
    return ans;
}
```

```ts [TypeScript]
function maximalRectangle(matrix: string[]): number {
    if (matrix.length === 0) return 0;
    const cols = matrix[0].length;
    const heights: number[] = new Array(cols + 1).fill(0);
    let ans = 0;
    for (const row of matrix) {
        for (let j = 0; j < cols; j++) {
            heights[j] = row[j] === '1' ? heights[j] + 1 : 0;
        }
        heights[cols] = 0;
        const stk: number[] = [-1];
        for (let j = 0; j <= cols; j++) {
            while (stk[stk.length - 1] !== -1 && heights[j] < heights[stk[stk.length - 1]]) {
                const h = heights[stk.pop()!];
                ans = Math.max(ans, h * (j - stk[stk.length - 1] - 1));
            }
            stk.push(j);
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(rows · cols)`，每行做一次单调栈。
- **空间复杂度**：`O(cols)`，高度数组与栈。

### 2.2 方法二：动态规划求宽度

1. **思路**

对每个格子 `(i, j)` 统计 `left`、`right`、`height`，三者围成的矩形即「以该格为底边右端点、以当前行下界为高的最大矩形」：

- `height[j]`：当前列连续 1 的高度；
- `left[j]`：当前行内，从 `j` 向左到第一个 `0` 的边界（并与上一行取交集）；
- `right[j]`：向右的类似边界；
- 面积 = `height[j] * (right[j] - left[j])`。

时间 `O(rows · cols)`，空间 `O(cols)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maximalRectangle(String[] matrix) {
        if (matrix.length == 0) return 0;
        int cols = matrix[0].length();
        int[] height = new int[cols];
        int[] left = new int[cols];
        int[] right = new int[cols];
        java.util.Arrays.fill(right, cols);
        int ans = 0;
        for (String row : matrix) {
            int curLeft = 0;
            for (int j = 0; j < cols; j++) {
                if (row.charAt(j) == '1') {
                    height[j]++;
                    left[j] = Math.max(left[j], curLeft);
                } else {
                    height[j] = 0;
                    left[j] = 0;
                    curLeft = j + 1;
                }
            }
            int curRight = cols;
            for (int j = cols - 1; j >= 0; j--) {
                if (row.charAt(j) == '1') {
                    right[j] = Math.min(right[j], curRight);
                    ans = Math.max(ans, height[j] * (right[j] - left[j]));
                } else {
                    right[j] = cols;
                    curRight = j;
                }
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maximalRectangle(self, matrix: List[str]) -> int:
        if not matrix:
            return 0
        cols = len(matrix[0])
        height = [0] * cols
        left = [0] * cols
        right = [cols] * cols
        ans = 0
        for row in matrix:
            cur_left = 0
            for j in range(cols):
                if row[j] == '1':
                    height[j] += 1
                    left[j] = max(left[j], cur_left)
                else:
                    height[j] = 0
                    left[j] = 0
                    cur_left = j + 1
            cur_right = cols
            for j in range(cols - 1, -1, -1):
                if row[j] == '1':
                    right[j] = min(right[j], cur_right)
                    ans = max(ans, height[j] * (right[j] - left[j]))
                else:
                    right[j] = cols
                    cur_right = j
        return ans
```

```cpp [C++]
class Solution {
public:
    int maximalRectangle(vector<string>& matrix) {
        if (matrix.empty()) return 0;
        int cols = matrix[0].size();
        vector<int> height(cols, 0), left(cols, 0), right(cols, cols);
        int ans = 0;
        for (string& row : matrix) {
            int curLeft = 0;
            for (int j = 0; j < cols; j++) {
                if (row[j] == '1') {
                    height[j]++;
                    left[j] = max(left[j], curLeft);
                } else {
                    height[j] = 0;
                    left[j] = 0;
                    curLeft = j + 1;
                }
            }
            int curRight = cols;
            for (int j = cols - 1; j >= 0; j--) {
                if (row[j] == '1') {
                    right[j] = min(right[j], curRight);
                    ans = max(ans, height[j] * (right[j] - left[j]));
                } else {
                    right[j] = cols;
                    curRight = j;
                }
            }
        }
        return ans;
    }
};
```

```go [Go]
func maximalRectangle(matrix []string) int {
    if len(matrix) == 0 {
        return 0
    }
    cols := len(matrix[0])
    height := make([]int, cols)
    left := make([]int, cols)
    right := make([]int, cols)
    for j := range right {
        right[j] = cols
    }
    ans := 0
    for _, row := range matrix {
        curLeft := 0
        for j := 0; j < cols; j++ {
            if row[j] == '1' {
                height[j]++
                if curLeft > left[j] {
                    left[j] = curLeft
                }
            } else {
                height[j] = 0
                left[j] = 0
                curLeft = j + 1
            }
        }
        curRight := cols
        for j := cols - 1; j >= 0; j-- {
            if row[j] == '1' {
                if curRight < right[j] {
                    right[j] = curRight
                }
                if area := height[j] * (right[j] - left[j]); area > ans {
                    ans = area
                }
            } else {
                right[j] = cols
                curRight = j
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    if (matrix.length === 0) return 0;
    const cols = matrix[0].length;
    const height = new Array(cols).fill(0);
    const left = new Array(cols).fill(0);
    const right = new Array(cols).fill(cols);
    let ans = 0;
    for (const row of matrix) {
        let curLeft = 0;
        for (let j = 0; j < cols; j++) {
            if (row[j] === '1') {
                height[j]++;
                left[j] = Math.max(left[j], curLeft);
            } else {
                height[j] = 0;
                left[j] = 0;
                curLeft = j + 1;
            }
        }
        let curRight = cols;
        for (let j = cols - 1; j >= 0; j--) {
            if (row[j] === '1') {
                right[j] = Math.min(right[j], curRight);
                ans = Math.max(ans, height[j] * (right[j] - left[j]));
            } else {
                right[j] = cols;
                curRight = j;
            }
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int maximalRectangle(char** matrix, int matrixSize, int* matrixColSize) {
    if (matrixSize == 0) return 0;
    int cols = matrixColSize[0];
    int* height = (int*)calloc(cols, sizeof(int));
    int* left = (int*)calloc(cols, sizeof(int));
    int* right = (int*)malloc(cols * sizeof(int));
    for (int j = 0; j < cols; j++) right[j] = cols;
    int ans = 0;
    for (int i = 0; i < matrixSize; i++) {
        int curLeft = 0;
        for (int j = 0; j < cols; j++) {
            if (matrix[i][j] == '1') {
                height[j]++;
                if (curLeft > left[j]) left[j] = curLeft;
            } else {
                height[j] = 0;
                left[j] = 0;
                curLeft = j + 1;
            }
        }
        int curRight = cols;
        for (int j = cols - 1; j >= 0; j--) {
            if (matrix[i][j] == '1') {
                if (curRight < right[j]) right[j] = curRight;
                int area = height[j] * (right[j] - left[j]);
                if (area > ans) ans = area;
            } else {
                right[j] = cols;
                curRight = j;
            }
        }
    }
    free(height); free(left); free(right);
    return ans;
}
```

```ts [TypeScript]
function maximalRectangle(matrix: string[]): number {
    if (matrix.length === 0) return 0;
    const cols = matrix[0].length;
    const height: number[] = new Array(cols).fill(0);
    const left: number[] = new Array(cols).fill(0);
    const right: number[] = new Array(cols).fill(cols);
    let ans = 0;
    for (const row of matrix) {
        let curLeft = 0;
        for (let j = 0; j < cols; j++) {
            if (row[j] === '1') {
                height[j]++;
                left[j] = Math.max(left[j], curLeft);
            } else {
                height[j] = 0;
                left[j] = 0;
                curLeft = j + 1;
            }
        }
        let curRight = cols;
        for (let j = cols - 1; j >= 0; j--) {
            if (row[j] === '1') {
                right[j] = Math.min(right[j], curRight);
                ans = Math.max(ans, height[j] * (right[j] - left[j]));
            } else {
                right[j] = cols;
                curRight = j;
            }
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(rows · cols)`。
- **空间复杂度**：`O(cols)`，三个数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 逐行高度 + 单调栈 | `O(rows·cols)` | `O(cols)` | 复用柱状图，推荐 |
| DP 维护 left/right/height | `O(rows·cols)` | `O(cols)` | 一次扫描求解 |

二维最大矩形可转化为「每一行的柱状图最大矩形」（LCR 039），或用 left/right/height 三个数组在一次遍历中递推求解，两种方式均为 `O(rows·cols)`。

