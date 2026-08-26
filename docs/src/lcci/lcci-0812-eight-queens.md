# [面试题 08.12. 八皇后](https://leetcode.cn/problems/eight-queens-lcci/)

## 一、题目描述

设计一种算法，打印 N 皇后在 N × N 棋盘上的各种摆法，其中每个皇后不同行、不同列，也不在对角线上。这里的「对角线」指的是所有的对角线，不只是平分整个棋盘的主对角线。

**注意**：本题相对原题稍作改动，只需要返回输入 `n` 对应的结果，不需要输出具体内容。n 皇后摆法的顺序约定为从棋盘左上角开始，依次查看每一行，皇后所在列索引依次写出，索引从 1 开始。

**示例：**

```
输入：4
输出：[[2,4,1,3],[3,1,4,2]]（即两种摆法，列索引从 1 开始）
解释：4 皇后共有两种摆法，按字典序排列。
```

**说明**：n 的范围为 `[1, 9]`。

---

## 二、解答方法

### 2.1 方法一：回溯 + 位集合（推荐）

**1. 思路**

逐行放置皇后，每行尝试放在不与已放皇后「同列、同主对角线、同副对角线」的列上。用三个布尔数组（或位掩码）分别记录已被占用的列、主对角线（`row + col` 恒定）、副对角线（`row - col + n - 1` 恒定）。当放满 `n` 行时收集一种摆法（每行皇后所在列号 +1，转 1-indexed）。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    private List<List<String>> res = new ArrayList<>();
    private int n;
    private boolean[] cols, diag1, diag2;
    private int[] path;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        cols = new boolean[n];
        diag1 = new boolean[2 * n - 1];  // row + col
        diag2 = new boolean[2 * n - 1];  // row - col + n - 1
        path = new int[n];
        backtrack(0);
        return res;
    }
    private void backtrack(int row) {
        if (row == n) {
            List<String> board = new ArrayList<>();
            for (int c : path) {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < n; i++) sb.append(i == c ? 'Q' : '.');
                board.add(sb.toString());
            }
            res.add(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            int d1 = row + col, d2 = row - col + n - 1;
            if (cols[col] || diag1[d1] || diag2[d2]) continue;
            cols[col] = diag1[d1] = diag2[d2] = true;
            path[row] = col;
            backtrack(row + 1);
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    }
}
```

```python [Python]
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        cols = [False] * n
        diag1 = [False] * (2 * n - 1)
        diag2 = [False] * (2 * n - 1)
        path = [0] * n

        def backtrack(row):
            if row == n:
                board = []
                for c in path:
                    board.append('.' * c + 'Q' + '.' * (n - 1 - c))
                res.append(board)
                return
            for col in range(n):
                d1, d2 = row + col, row - col + n - 1
                if cols[col] or diag1[d1] or diag2[d2]:
                    continue
                cols[col] = diag1[d1] = diag2[d2] = True
                path[row] = col
                backtrack(row + 1)
                cols[col] = diag1[d1] = diag2[d2] = False

        backtrack(0)
        return res
```

```go [Go]
func solveNQueens(n int) [][]string {
	res := [][]string{}
	cols := make([]bool, n)
	diag1 := make([]bool, 2*n-1)
	diag2 := make([]bool, 2*n-1)
	path := make([]int, n)
	var backtrack func(int)
	backtrack = func(row int) {
		if row == n {
			board := []string{}
			for _, c := range path {
				rowStr := make([]byte, n)
				for i := 0; i < n; i++ {
					if i == c {
						rowStr[i] = 'Q'
					} else {
						rowStr[i] = '.'
					}
				}
				board = append(board, string(rowStr))
			}
			res = append(res, board)
			return
		}
		for col := 0; col < n; col++ {
			d1, d2 := row+col, row-col+n-1
			if cols[col] || diag1[d1] || diag2[d2] {
				continue
			}
			cols[col], diag1[d1], diag2[d2] = true, true, true
			path[row] = col
			backtrack(row + 1)
			cols[col], diag1[d1], diag2[d2] = false, false, false
		}
	}
	backtrack(0)
	return res
}
```

```c [C]
// 返回棋盘列表，这里以字符串数组的数组表示；调用者负责释放
char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {
    // C 语言实现需自行管理动态内存，较繁琐，思路与 Java/Python 一致：回溯 + 三布尔数组
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
        vector<bool> cols(n, false), diag1(2 * n - 1, false), diag2(2 * n - 1, false);
        vector<int> path(n, 0);
        function<void(int)> backtrack = [&](int row) {
            if (row == n) {
                vector<string> board;
                for (int c : path) {
                    string s(n, '.');
                    s[c] = 'Q';
                    board.push_back(s);
                }
                res.push_back(board);
                return;
            }
            for (int col = 0; col < n; col++) {
                int d1 = row + col, d2 = row - col + n - 1;
                if (cols[col] || diag1[d1] || diag2[d2]) continue;
                cols[col] = diag1[d1] = diag2[d2] = true;
                path[row] = col;
                backtrack(row + 1);
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const res = [];
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false);
    const diag2 = new Array(2 * n - 1).fill(false);
    const path = new Array(n).fill(0);
    const backtrack = (row) => {
        if (row === n) {
            const board = [];
            for (const c of path) {
                const rowStr = new Array(n).fill('.');
                rowStr[c] = 'Q';
                board.push(rowStr.join(''));
            }
            res.push(board);
            return;
        }
        for (let col = 0; col < n; col++) {
            const d1 = row + col, d2 = row - col + n - 1;
            if (cols[col] || diag1[d1] || diag2[d2]) continue;
            cols[col] = diag1[d1] = diag2[d2] = true;
            path[row] = col;
            backtrack(row + 1);
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    };
    backtrack(0);
    return res;
};
```

```typescript [TypeScript]
function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    const cols: boolean[] = new Array(n).fill(false);
    const diag1: boolean[] = new Array(2 * n - 1).fill(false);
    const diag2: boolean[] = new Array(2 * n - 1).fill(false);
    const path: number[] = new Array(n).fill(0);
    const backtrack = (row: number): void => {
        if (row === n) {
            const board: string[] = [];
            for (const c of path) {
                const rowStr: string[] = new Array(n).fill('.');
                rowStr[c] = 'Q';
                board.push(rowStr.join(''));
            }
            res.push(board);
            return;
        }
        for (let col = 0; col < n; col++) {
            const d1 = row + col, d2 = row - col + n - 1;
            if (cols[col] || diag1[d1] || diag2[d2]) continue;
            cols[col] = diag1[d1] = diag2[d2] = true;
            path[row] = col;
            backtrack(row + 1);
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    };
    backtrack(0);
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n!)`，回溯剪枝后实际远低于全排列。
- **空间复杂度**：`O(n)` 递归栈与辅助数组。

---

### 2.2 方法二：位运算优化（进阶）

**1. 思路**

用整数的位表示「列、主对角线、副对角线」的占用情况（位为 1 表示该位置不可用）。每次递归把三种限制按位或得到 `available`，取最低可用位（`available & -available`）尝试放置，再右移对齐到列号。把搜索空间从 `O(n!)` 进一步压到极少分支，且 `n ≤ 9` 时整数位运算极快。此处给出位运算版核心循环，输出与上一致。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    private List<List<String>> res = new ArrayList<>();
    private int n, full;
    private int[] path;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        this.full = (1 << n) - 1;
        this.path = new int[n];
        backtrack(0, 0, 0, 0);
        return res;
    }
    private void backtrack(int row, int cols, int d1, int d2) {
        if (row == n) {
            List<String> board = new ArrayList<>();
            for (int c : path) {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < n; i++) sb.append(i == c ? 'Q' : '.');
                board.add(sb.toString());
            }
            res.add(board);
            return;
        }
        int available = full & ~(cols | d1 | d2);
        while (available != 0) {
            int pick = available & -available;       // 取最低可用位
            int col = Integer.numberOfTrailingZeros(pick);
            path[row] = col;
            backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
            available ^= pick;
        }
    }
}
```

```python [Python]
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        full = (1 << n) - 1
        path = [0] * n

        def backtrack(row, cols, d1, d2):
            if row == n:
                board = ['.' * c + 'Q' + '.' * (n - 1 - c) for c in path]
                res.append(board)
                return
            available = full & ~(cols | d1 | d2)
            while available:
                pick = available & -available
                col = (pick.bit_length() - 1)
                path[row] = col
                backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1)
                available ^= pick

        backtrack(0, 0, 0, 0)
        return res
```

```go [Go]
func solveNQueens(n int) [][]string {
	res := [][]string{}
	full := (1 << n) - 1
	path := make([]int, n)
	var backtrack func(int, int, int, int)
	backtrack = func(row, cols, d1, d2 int) {
		if row == n {
			board := []string{}
			for _, c := range path {
				rowStr := make([]byte, n)
				for i := 0; i < n; i++ {
					if i == c {
						rowStr[i] = 'Q'
					} else {
						rowStr[i] = '.'
					}
				}
				board = append(board, string(rowStr))
			}
			res = append(res, board)
			return
		}
		available := full & ^(cols | d1 | d2)
		for available != 0 {
			pick := available & -available
			col := bits.TrailingZeros(uint(pick))
			path[row] = col
			backtrack(row+1, cols|pick, (d1|pick)<<1, (d2|pick)>>1)
			available ^= pick
		}
	}
	backtrack(0, 0, 0, 0)
	return res
}
```

```c [C]
// 位运算版在 C 中同样需要位运算与动态内存管理，思路同 Java，此处省略完整实现
char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {
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
        int full = (1 << n) - 1;
        vector<int> path(n, 0);
        function<void(int, int, int, int)> backtrack = [&](int row, int cols, int d1, int d2) {
            if (row == n) {
                vector<string> board;
                for (int c : path) {
                    string s(n, '.');
                    s[c] = 'Q';
                    board.push_back(s);
                }
                res.push_back(board);
                return;
            }
            int available = full & ~(cols | d1 | d2);
            while (available) {
                int pick = available & -available;
                int col = __builtin_ctz(pick);
                path[row] = col;
                backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
                available ^= pick;
            }
        };
        backtrack(0, 0, 0, 0);
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const res = [];
    const full = (1 << n) - 1;
    const path = new Array(n).fill(0);
    const backtrack = (row, cols, d1, d2) => {
        if (row === n) {
            const board = [];
            for (const c of path) {
                const rowStr = new Array(n).fill('.');
                rowStr[c] = 'Q';
                board.push(rowStr.join(''));
            }
            res.push(board);
            return;
        }
        let available = full & ~(cols | d1 | d2);
        while (available) {
            const pick = available & -available;
            const col = Math.log2(pick);
            path[row] = col;
            backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
            available ^= pick;
        }
    };
    backtrack(0, 0, 0, 0);
    return res;
};
```

```typescript [TypeScript]
function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    const full = (1 << n) - 1;
    const path: number[] = new Array(n).fill(0);
    const backtrack = (row: number, cols: number, d1: number, d2: number): void => {
        if (row === n) {
            const board: string[] = [];
            for (const c of path) {
                const rowStr: string[] = new Array(n).fill('.');
                rowStr[c] = 'Q';
                board.push(rowStr.join(''));
            }
            res.push(board);
            return;
        }
        let available = full & ~(cols | d1 | d2);
        while (available) {
            const pick = available & -available;
            const col = Math.log2(pick);
            path[row] = col;
            backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
            available ^= pick;
        }
    };
    backtrack(0, 0, 0, 0);
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n!)`（位运算常数更小）。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                             |
| -------- | ---------- | ---------- | -------------------------------- |
| 回溯+位集合 | `O(n!)`   | `O(n)`     | 直观易写，面试首选，推荐         |
| 位运算优化 | `O(n!)`   | `O(n)`     | 常数极小，适合更大 n             |

**推荐解法**：方法一（回溯 + 三布尔数组）。核心是用 `cols / diag1(row+col) / diag2(row-col+n-1)` 三个数组标记冲突，每行只尝试合法列。注意题意输出的是「每行皇后所在列号（从 1 开始）对应的棋盘字符串」，且 n 皇后结果需按字典序排列（回溯时列从 0 递增天然满足）。
