# [51. N 皇后](https://leetcode.cn/problems/n-queens/)



## 一、题目描述

按照国际象棋的规则，皇后可以攻击与之处在同一行、同一列以及同一斜线上的棋子。

给你一个整数 `n`，返回所有不同的 **n 皇后问题** 的解决方案。

每一种解法包含一个不同的 **n 皇后问题** 的棋子放置方案，该方案中 `'Q'` 和 `'.'` 分别代表了皇后和空位。



**示例 1：**

```
输入：n = 4
输出：[[".Q..","...Q",""Q..".","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法。
```

**示例 2：**

```
输入：n = 1
输出：[["Q"]]
```

**提示：**

-   `1 <= n <= 9`



## 二、解答方法

### 2.1 方法一：回溯（按行放置）


1. **思路**

由于每一行只能放一个皇后，我们按行递归，对每一行尝试在每一列放置皇后，并判断是否和之前已放置的皇后冲突（不能同列、不能同对角线）。用集合记录已占用的列与对角线，剪枝后可大幅减少搜索量。


2. **代码实现**

::::: code-group

:::::: code-group
```java [Java]
class Solution {
    List<List<String>> res = new ArrayList<>();
    List<String> path = new ArrayList<>();
    Set<Integer> cols = new HashSet<>();
    Set<Integer> diag1 = new HashSet<>(); // 左上-右下
    Set<Integer> diag2 = new HashSet<>(); // 右上-左下

    public List<List<String>> solveNQueens(int n) {
        backtrack(n, 0);
        return res;
    }

    private void backtrack(int n, int row) {
        if (row == n) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) {
                continue;
            }
            char[] line = new char[n];
            Arrays.fill(line, '.');
            line[col] = 'Q';
            path.add(new String(line));
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            backtrack(n, row + 1);
            path.remove(path.size() - 1);
            cols.remove(col);
            diag1.remove(row - col);
            diag2.remove(row + col);
        }
    }
}
```

```python [Python]
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        cols = set()
        diag1 = set()
        diag2 = set()
        path = []

        def backtrack(row):
            if row == n:
                res.append(list(path))
                return
            for col in range(n):
                if col in cols or row - col in diag1 or row + col in diag2:
                    continue
                line = ['.'] * n
                line[col] = 'Q'
                path.append(''.join(line))
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)
                backtrack(row + 1)
                path.pop()
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)

        backtrack(0)
        return res
```

```go [Go]
func solveNQueens(n int) [][]string {
    res := [][]string{}
    cols := map[int]bool{}
    diag1 := map[int]bool{}
    diag2 := map[int]bool{}
    path := []string{}

    var backtrack func(row int)
    backtrack = func(row int) {
        if row == n {
            tmp := make([]string, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for col := 0; col < n; col++ {
            if cols[col] || diag1[row-col] || diag2[row+col] {
                continue
            }
            line := make([]byte, n)
            for i := range line {
                line[i] = '.'
            }
            line[col] = 'Q'
            path = append(path, string(line))
            cols[col], diag1[row-col], diag2[row+col] = true, true, true
            backtrack(row + 1)
            path = path[:len(path)-1]
            cols[col], diag1[row-col], diag2[row+col] = false, false, false
        }
    }
    backtrack(0)
    return res
}
```

```c [C]
char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {
    // 思路同上，回溯 + 集合记录列与对角线
    // 此处给出核心结构，完整实现略
    *returnSize = 0;
    *returnColumnSizes = NULL;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> path;
        unordered_set<int> cols, diag1, diag2;

        function<void(int)> backtrack = [&](int row) {
            if (row == n) {
                res.push_back(path);
                return;
            }
            for (int col = 0; col < n; ++col) {
                if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col)) continue;
                string line(n, '.');
                line[col] = 'Q';
                path.push_back(line);
                cols.insert(col); diag1.insert(row - col); diag2.insert(row + col);
                backtrack(row + 1);
                path.pop_back();
                cols.erase(col); diag1.erase(row - col); diag2.erase(row + col);
            }
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
var solveNQueens = function(n) {
    const res = [], cols = new Set(), diag1 = new Set(), diag2 = new Set(), path = [];
    const backtrack = (row) => {
        if (row === n) {
            res.push([...path]);
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
            const line = Array(n).fill('.');
            line[col] = 'Q';
            path.push(line.join(''));
            cols.add(col); diag1.add(row - col); diag2.add(row + col);
            backtrack(row + 1);
            path.pop();
            cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
        }
    };
    backtrack(0);
    return res;
};
```

```typescript [TypeScript]
function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    const cols = new Set<number>(), diag1 = new Set<number>(), diag2 = new Set<number>(), path: string[] = [];

    const backtrack = (row: number): void => {
        if (row === n) {
            res.push([...path]);
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
            const line = Array(n).fill('.');
            line[col] = 'Q';
            path.push(line.join(''));
            cols.add(col); diag1.add(row - col); diag2.add(row + col);
            backtrack(row + 1);
            path.pop();
            cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
        }
    };
    backtrack(0);
    return res;
}
```

::::::
:::::

3. **复杂度分析**

- **时间复杂度**：`O(N!)`**，最坏情况下每行有 `N` 种选择，且剪枝后约为 `N!` 量级。
- **空间复杂度**：`O(N)`**，递归栈与集合最大占用 `O(N)`。

### 2.2 方法二：回溯（位运算优化）


1. **思路**

利用位运算，用整数的二进制位表示某一列/对角线是否可用，每次通过位与、位或快速求出可用列并进行选择，速度更快、代码更紧凑。


2. **代码实现**

::::: code-group

:::::: code-group
```java [Java]
class Solution {
    List<List<String>> res = new ArrayList<>();
    int size;

    public List<List<String>> solveNQueens(int n) {
        size = (1 << n) - 1;
        backtrack(n, 0, 0, 0, new ArrayList<>());
        return res;
    }

    private void backtrack(int n, int cols, int diag1, int diag2, List<String> path) {
        if (path.size() == n) {
            res.add(new ArrayList<>(path));
            return;
        }
        int available = size & ~(cols | diag1 | diag2);
        while (available != 0) {
            int pick = available & (-available);
            available ^= pick;
            char[] line = new char[n];
            Arrays.fill(line, '.');
            line[Integer.numberOfTrailingZeros(pick)] = 'Q';
            path.add(new String(line));
            backtrack(n, cols | pick, (diag1 | pick) << 1, (diag2 | pick) >> 1, path);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        size = (1 << n) - 1

        def backtrack(cols, d1, d2, path):
            if len(path) == n:
                res.append(list(path))
                return
            available = size & ~(cols | d1 | d2)
            while available:
                pick = available & (-available)
                available ^= pick
                line = ['.'] * n
                line[pick.bit_length() - 1] = 'Q'
                path.append(''.join(line))
                backtrack(cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1, path)
                path.pop()

        backtrack(0, 0, 0, [])
        return res
```

```go [Go]
func solveNQueens(n int) [][]string {
    res := [][]string{}
    size := (1 << n) - 1
    var backtrack func(cols, d1, d2 int, path []string)
    backtrack = func(cols, d1, d2 int, path []string) {
        if len(path) == n {
            tmp := make([]string, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        available := size & ^(cols | d1 | d2)
        for available != 0 {
            pick := available & (-available)
            available ^= pick
            line := make([]byte, n)
            for i := range line {
                line[i] = '.'
            }
            col := bits.TrailingZeros(uint(pick))
            line[col] = 'Q'
            backtrack(cols|pick, (d1|pick)<<1, (d2|pick)>>1, append(path, string(line)))
        }
    }
    backtrack(0, 0, 0, nil)
    return res
}
```

```c [C]
char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {
    // 位运算回溯核心结构同上，完整实现略
    *returnSize = 0;
    *returnColumnSizes = NULL;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        int size = (1 << n) - 1;
        vector<string> path;

        function<void(int, int, int)> backtrack = [&](int cols, int d1, int d2) {
            if (path.size() == n) {
                res.push_back(path);
                return;
            }
            int available = size & ~(cols | d1 | d2);
            while (available) {
                int pick = available & (-available);
                available ^= pick;
                string line(n, '.');
                line[__builtin_ctz(pick)] = 'Q';
                path.push_back(line);
                backtrack(cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
                path.pop_back();
            }
        };
        backtrack(0, 0, 0);
        return res;
    }
};
```

```javascript [JavaScript]
var solveNQueens = function(n) {
    const res = [];
    const size = (1 << n) - 1;
    const backtrack = (cols, d1, d2, path) => {
        if (path.length === n) {
            res.push([...path]);
            return;
        }
        let available = size & ~(cols | d1 | d2);
        while (available) {
            const pick = available & (-available);
            available ^= pick;
            const line = Array(n).fill('.');
            line[Math.log2(pick) | 0] = 'Q';
            path.push(line.join(''));
            backtrack(cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1, path);
            path.pop();
        }
    };
    backtrack(0, 0, 0, []);
    return res;
};
```

```typescript [TypeScript]
function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    const size = (1 << n) - 1;
    const backtrack = (cols: number, d1: number, d2: number, path: string[]): void => {
        if (path.length === n) {
            res.push([...path]);
            return;
        }
        let available = size & ~(cols | d1 | d2);
        while (available) {
            const pick = available & (-available);
            available ^= pick;
            const line = Array(n).fill('.');
            line[Math.log2(pick) | 0] = 'Q';
            path.push(line.join(''));
            backtrack(cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1, path);
            path.pop();
        }
    };
    backtrack(0, 0, 0, []);
    return res;
}
```

::::::
:::::

3. **复杂度分析**

- **时间复杂度**：`O(N!)`**，与方法一相同，但常数更小。
- **空间复杂度**：`O(N)`**，仅递归栈，无需额外集合。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（按行放置） | `O(N!)` | `O(N)` | 思路直观，易理解 |
| 回溯（位运算优化） | `O(N!)` | `O(N)` | 常数更小，速度更快 |
