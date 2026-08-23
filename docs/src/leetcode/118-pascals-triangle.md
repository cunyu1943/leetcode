# [118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle/)

## 一、题目描述

给定一个非负整数 `numRows`，生成「杨辉三角」的前 `numRows` 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

**示例 1：**

```
输入：numRows = 5
输出：[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

**示例 2：**

```
输入：numRows = 1
输出：[[1]]
```

**提示：**

- `1 <= numRows <= 30`

## 二、解答方法

### 2.1 方法一：动态规划（逐行计算）

1. **思路**

每一行的第一个和最后一个元素为 1，中间元素等于上一行相邻两个元素之和。使用列表存储每一行，逐行构建。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
            }
            res.add(row);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = res[i-1][j-1] + res[i-1][j]
            res.append(row)
        return res
```

```go [Go]
func generate(numRows int) [][]int {
    res := make([][]int, numRows)
    for i := 0; i < numRows; i++ {
        res[i] = make([]int, i+1)
        res[i][0], res[i][i] = 1, 1
        for j := 1; j < i; j++ {
            res[i][j] = res[i-1][j-1] + res[i-1][j]
        }
    }
    return res
}
```

```c [C]
int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    int** res = (int**)malloc(numRows * sizeof(int*));
    *returnColumnSizes = (int*)malloc(numRows * sizeof(int));
    *returnSize = numRows;
    for (int i = 0; i < numRows; i++) {
        res[i] = (int*)malloc((i+1) * sizeof(int));
        (*returnColumnSizes)[i] = i + 1;
        res[i][0] = res[i][i] = 1;
        for (int j = 1; j < i; j++) {
            res[i][j] = res[i-1][j-1] + res[i-1][j];
        }
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++) {
                row[j] = res[i-1][j-1] + res[i-1][j];
            }
            res.push_back(row);
        }
        return res;
    }
};
```

```js [JavaScript]
var generate = function(numRows) {
    const res = [];
    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            row[j] = res[i-1][j-1] + res[i-1][j];
        }
        res.push(row);
    }
    return res;
};
```

```ts [TypeScript]
function generate(numRows: number): number[][] {
    const res: number[][] = [];
    for (let i = 0; i < numRows; i++) {
        const row: number[] = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            row[j] = res[i-1][j-1] + res[i-1][j];
        }
        res.push(row);
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(numRows^2)`，总共有 `numRows*(numRows+1)/2` 个元素。
- **空间复杂度**：`O(numRows^2)`，存储所有行。

---

### 2.2 方法二：组合数公式（单行计算）

1. **思路**

杨辉三角第 `i` 行第 `j` 个元素（从 0 开始）为组合数 `C(i, j)`。可以递推计算：`C(i, 0)=1`，`C(i, j) = C(i, j-1) * (i - j + 1) / j`。但为了保持与题目要求（生成所有行）一致，仍逐行生成，但计算方式改用组合数。

这种方法在需要生成所有行时并无性能优势，但展示了数学公式。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            long val = 1;
            for (int j = 0; j <= i; j++) {
                row.add((int) val);
                val = val * (i - j) / (j + 1);
            }
            res.add(row);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            row = []
            val = 1
            for j in range(i + 1):
                row.append(val)
                val = val * (i - j) // (j + 1)
            res.append(row)
        return res
```

```go [Go]
func generate(numRows int) [][]int {
    res := make([][]int, numRows)
    for i := 0; i < numRows; i++ {
        row := make([]int, i+1)
        val := 1
        for j := 0; j <= i; j++ {
            row[j] = val
            val = val * (i - j) / (j + 1)
        }
        res[i] = row
    }
    return res
}
```

```c [C]
int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    int** res = (int**)malloc(numRows * sizeof(int*));
    *returnColumnSizes = (int*)malloc(numRows * sizeof(int));
    *returnSize = numRows;
    for (int i = 0; i < numRows; i++) {
        res[i] = (int*)malloc((i + 1) * sizeof(int));
        (*returnColumnSizes)[i] = i + 1;
        long val = 1;
        for (int j = 0; j <= i; j++) {
            res[i][j] = (int)val;
            val = val * (i - j) / (j + 1);
        }
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1);
            long val = 1;
            for (int j = 0; j <= i; j++) {
                row[j] = (int)val;
                val = val * (i - j) / (j + 1);
            }
            res.push_back(row);
        }
        return res;
    }
};
```

```js [JavaScript]
var generate = function(numRows) {
    const res = [];
    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1);
        let val = 1;
        for (let j = 0; j <= i; j++) {
            row[j] = val;
            val = val * (i - j) / (j + 1);
        }
        res.push(row);
    }
    return res;
};
```

```ts [TypeScript]
function generate(numRows: number): number[][] {
    const res: number[][] = [];
    for (let i = 0; i < numRows; i++) {
        const row: number[] = new Array(i + 1);
        let val = 1;
        for (let j = 0; j <= i; j++) {
            row[j] = val;
            val = val * (i - j) / (j + 1);
        }
        res.push(row);
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(numRows^2)`。
- **空间复杂度**：`O(numRows^2)`。

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                   |
| ---------- | ---------- | ---------- | ---------------------- |
| 动态规划   | `O(n^2)`   | `O(n^2)`   | 直观，推荐             |
| 组合数公式 | `O(n^2)`   | `O(n^2)`   | 数学方法，但实现略复杂 |

**推荐**：面试中首选 **方法一（动态规划）**，代码简洁，易于理解和实现。
