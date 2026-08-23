# [119. 杨辉三角 II](https://leetcode.cn/problems/pascals-triangle-ii/)

## 一、题目描述

给定一个非负索引 `rowIndex`，返回「杨辉三角」的第 `rowIndex` 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

**示例 1：**

```
输入：rowIndex = 3
输出：[1,3,3,1]
```

**示例 2：**

```
输入：rowIndex = 0
输出：[1]
```

**示例 3：**

```
输入：rowIndex = 1
输出：[1,1]
```

**提示：**

- `0 <= rowIndex <= 33`

**进阶：**

- 你可以优化你的算法到 `O(rowIndex)` 空间复杂度吗？

## 二、解答方法

### 2.1 方法一：逐行计算（空间 O(n^2)）

1. **思路**

生成前 `rowIndex + 1` 行，返回最后一行。空间复杂度较高，但最直观。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<List<Integer>> rows = new ArrayList<>();
        for (int i = 0; i <= rowIndex; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(rows.get(i - 1).get(j - 1) + rows.get(i - 1).get(j));
            }
            rows.add(row);
        }
        return rows.get(rowIndex);
    }
}
```

```python [Python]
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        rows = []
        for i in range(rowIndex + 1):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = rows[i-1][j-1] + rows[i-1][j]
            rows.append(row)
        return rows[rowIndex]
```

```go [Go]
func getRow(rowIndex int) []int {
    rows := make([][]int, rowIndex+1)
    for i := 0; i <= rowIndex; i++ {
        rows[i] = make([]int, i+1)
        rows[i][0], rows[i][i] = 1, 1
        for j := 1; j < i; j++ {
            rows[i][j] = rows[i-1][j-1] + rows[i-1][j]
        }
    }
    return rows[rowIndex]
}
```

```c [C]
int* getRow(int rowIndex, int* returnSize) {
    *returnSize = rowIndex + 1;
    int** rows = (int**)malloc((rowIndex+1) * sizeof(int*));
    for (int i = 0; i <= rowIndex; i++) {
        rows[i] = (int*)malloc((i+1) * sizeof(int));
        rows[i][0] = rows[i][i] = 1;
        for (int j = 1; j < i; j++) {
            rows[i][j] = rows[i-1][j-1] + rows[i-1][j];
        }
    }
    int* res = (int*)malloc((rowIndex+1) * sizeof(int));
    for (int i = 0; i <= rowIndex; i++) res[i] = rows[rowIndex][i];
    for (int i = 0; i <= rowIndex; i++) free(rows[i]);
    free(rows);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<vector<int>> rows;
        for (int i = 0; i <= rowIndex; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++) {
                row[j] = rows[i-1][j-1] + rows[i-1][j];
            }
            rows.push_back(row);
        }
        return rows[rowIndex];
    }
};
```

```js [JavaScript]
var getRow = function(rowIndex) {
    const rows = [];
    for (let i = 0; i <= rowIndex; i++) {
        const row = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            row[j] = rows[i-1][j-1] + rows[i-1][j];
        }
        rows.push(row);
    }
    return rows[rowIndex];
};
```

```ts [TypeScript]
function getRow(rowIndex: number): number[] {
    const rows: number[][] = [];
    for (let i = 0; i <= rowIndex; i++) {
        const row: number[] = new Array(i + 1).fill(1);
        for (let j = 1; j < i; j++) {
            row[j] = rows[i-1][j-1] + rows[i-1][j];
        }
        rows.push(row);
    }
    return rows[rowIndex];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(rowIndex^2)`。
- **空间复杂度**：`O(rowIndex^2)`。

---

### 2.2 方法二：一维 DP（空间优化 O(n)）

1. **思路**

使用一维数组 `dp` 表示当前行的值，从后向前更新，避免覆盖上一行的值。初始 `dp[0] = 1`，每行从后往前计算：`dp[j] = dp[j] + dp[j-1]`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> dp = new ArrayList<>();
        dp.add(1);
        for (int i = 1; i <= rowIndex; i++) {
            dp.add(1);
            for (int j = i - 1; j > 0; j--) {
                dp.set(j, dp.get(j) + dp.get(j - 1));
            }
        }
        return dp;
    }
}
```

```python [Python]
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        dp = [1]
        for i in range(1, rowIndex + 1):
            dp.append(1)
            for j in range(i - 1, 0, -1):
                dp[j] = dp[j] + dp[j-1]
        return dp
```

```go [Go]
func getRow(rowIndex int) []int {
    dp := make([]int, 1, rowIndex+1)
    dp[0] = 1
    for i := 1; i <= rowIndex; i++ {
        dp = append(dp, 1)
        for j := i - 1; j > 0; j-- {
            dp[j] = dp[j] + dp[j-1]
        }
    }
    return dp
}
```

```c [C]
int* getRow(int rowIndex, int* returnSize) {
    *returnSize = rowIndex + 1;
    int* dp = (int*)malloc((rowIndex+1) * sizeof(int));
    dp[0] = 1;
    for (int i = 1; i <= rowIndex; i++) {
        dp[i] = 1;
        for (int j = i - 1; j > 0; j--) {
            dp[j] = dp[j] + dp[j-1];
        }
    }
    return dp;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> dp;
        dp.push_back(1);
        for (int i = 1; i <= rowIndex; i++) {
            dp.push_back(1);
            for (int j = i - 1; j > 0; j--) {
                dp[j] = dp[j] + dp[j-1];
            }
        }
        return dp;
    }
};
```

```js [JavaScript]
var getRow = function(rowIndex) {
    const dp = [1];
    for (let i = 1; i <= rowIndex; i++) {
        dp.push(1);
        for (let j = i - 1; j > 0; j--) {
            dp[j] = dp[j] + dp[j-1];
        }
    }
    return dp;
};
```

```ts [TypeScript]
function getRow(rowIndex: number): number[] {
    const dp: number[] = [1];
    for (let i = 1; i <= rowIndex; i++) {
        dp.push(1);
        for (let j = i - 1; j > 0; j--) {
            dp[j] = dp[j] + dp[j-1];
        }
    }
    return dp;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(rowIndex^2)`。
- **空间复杂度**：`O(rowIndex)`，满足进阶要求。

---

### 2.3 方法三：组合数公式（数学方法）

1. **思路**

杨辉三角第 `rowIndex` 行第 `j` 个元素（从 0 开始）为组合数 `C(rowIndex, j)`。可以通过递推计算每个元素，避免重复计算：`C(n, 0)=1`，`C(n, j) = C(n, j-1) * (n - j + 1) / j`。

注意使用 `long` 防止溢出，但题目保证在 32 位整数范围内。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> res = new ArrayList<>();
        long val = 1;
        for (int j = 0; j <= rowIndex; j++) {
            res.add((int)val);
            val = val * (rowIndex - j) / (j + 1);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        res = []
        val = 1
        for j in range(rowIndex + 1):
            res.append(val)
            val = val * (rowIndex - j) // (j + 1)
        return res
```

```go [Go]
func getRow(rowIndex int) []int {
    res := make([]int, rowIndex+1)
    val := 1
    for j := 0; j <= rowIndex; j++ {
        res[j] = val
        val = val * (rowIndex - j) / (j + 1)
    }
    return res
}
```

```c [C]
int* getRow(int rowIndex, int* returnSize) {
    *returnSize = rowIndex + 1;
    int* res = (int*)malloc((rowIndex+1) * sizeof(int));
    long val = 1;
    for (int j = 0; j <= rowIndex; j++) {
        res[j] = (int)val;
        val = val * (rowIndex - j) / (j + 1);
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> res;
        long val = 1;
        for (int j = 0; j <= rowIndex; j++) {
            res.push_back((int)val);
            val = val * (rowIndex - j) / (j + 1);
        }
        return res;
    }
};
```

```js [JavaScript]
var getRow = function(rowIndex) {
    const res = [];
    let val = 1;
    for (let j = 0; j <= rowIndex; j++) {
        res.push(val);
        val = val * (rowIndex - j) / (j + 1);
    }
    return res;
};
```

```ts [TypeScript]
function getRow(rowIndex: number): number[] {
    const res: number[] = [];
    let val = 1;
    for (let j = 0; j <= rowIndex; j++) {
        res.push(val);
        val = val * (rowIndex - j) / (j + 1);
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(rowIndex)`。
- **空间复杂度**：`O(rowIndex)`，仅存储结果。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                     |
| ---------- | ---------- | ---------- | ------------------------ |
| 逐行计算   | `O(n^2)`   | `O(n^2)`   | 直观但空间大             |
| 一维 DP    | `O(n^2)`   | `O(n)`     | **推荐**，空间优化       |
| 组合数公式 | `O(n)`     | `O(n)`     | 时间最优，需注意整数溢出 |

**推荐**：面试中首选 **方法二（一维 DP）**，空间 `O(n)` 且逻辑清晰。若追求极致性能，可选用 **方法三（组合数）**，时间复杂度 `O(n)`，但需小心使用 `long` 处理中间值。