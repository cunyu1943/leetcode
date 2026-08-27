# [面试题 16.04. 井字游戏](https://leetcode.cn/problems/tic-tac-toe-lcci/)

## 一、题目描述

设计一个算法，判断玩家是否赢了井字游戏。输入是一个 `N x N` 的字符数组 `board`，其中字符 `'X'` 和 `'O'` 代表玩家的落子，空格用 `' '` 表示。

返回获胜的玩家（`'X'`、`'O'` 或 `' '` 表示无人获胜）。若同时有多人获胜（非法局面），返回 `' '`。

**示例 1：**

```
输入: board = ["O X","XXO","X O"]
输出: "X"
```

**示例 2：**

```
输入: board = ["OOX","XXO","OXO"]
输出: " "
```

---

## 二、解答方法

### 2.1 方法一：逐行逐列及对角线检查

**1. 思路**

对于 `'X'` 和 `'O'` 分别检查：是否存在整行、整列或两条对角线全部为该字符。若两者都赢则返回 `' '`；否则返回赢家或 `' '`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public char tictactoe(String[] board) {
        int n = board.length;
        char win = ' ';
        for (char c : new char[]{'X', 'O'}) {
            boolean rowWin = false, colWin = false;
            boolean diag1 = true, diag2 = true;
            for (int i = 0; i < n; i++) {
                boolean rowOk = true, colOk = true;
                for (int j = 0; j < n; j++) {
                    if (board[i].charAt(j) != c) rowOk = false;
                    if (board[j].charAt(i) != c) colOk = false;
                }
                if (rowOk) rowWin = true;
                if (colOk) colWin = true;
                if (board[i].charAt(i) != c) diag1 = false;
                if (board[i].charAt(n - 1 - i) != c) diag2 = false;
            }
            if (rowWin || colWin || diag1 || diag2) {
                if (win != ' ') return ' ';  // 双方都赢，非法
                win = c;
            }
        }
        return win;
    }
}
```

```python [Python]
class Solution:
    def tictactoe(self, board: List[str]) -> str:
        n = len(board)
        win = ' '
        for c in ('X', 'O'):
            row_win = col_win = False
            diag1 = diag2 = True
            for i in range(n):
                if all(board[i][j] == c for j in range(n)): row_win = True
                if all(board[j][i] == c for j in range(n)): col_win = True
                if board[i][i] != c: diag1 = False
                if board[i][n-1-i] != c: diag2 = False
            if row_win or col_win or diag1 or diag2:
                if win != ' ': return ' '
                win = c
        return win
```

```go [Go]
func tictactoe(board []string) byte {
    n := len(board)
    win := byte(' ')
    for _, c := range []byte{'X', 'O'} {
        rowWin, colWin, diag1, diag2 := false, false, true, true
        for i := 0; i < n; i++ {
            rOk, cOk := true, true
            for j := 0; j < n; j++ {
                if board[i][j] != c { rOk = false }
                if board[j][i] != c { cOk = false }
            }
            if rOk { rowWin = true }
            if cOk { colWin = true }
            if board[i][i] != c { diag1 = false }
            if board[i][n-1-i] != c { diag2 = false }
        }
        if rowWin || colWin || diag1 || diag2 {
            if win != ' ' { return ' ' }
            win = c
        }
    }
    return win
}
```

```c [C]
// C 中实现逻辑同 Java：两层循环检查行列与对角线，双方均胜返回 ' '
```

```cpp [C++]
class Solution {
public:
    char tictactoe(vector<string>& board) {
        int n = board.size();
        char win = ' ';
        for (char c : {'X', 'O'}) {
            bool rowWin = false, colWin = false, diag1 = true, diag2 = true;
            for (int i = 0; i < n; i++) {
                bool rOk = true, cOk = true;
                for (int j = 0; j < n; j++) {
                    if (board[i][j] != c) rOk = false;
                    if (board[j][i] != c) cOk = false;
                }
                if (rOk) rowWin = true;
                if (cOk) colWin = true;
                if (board[i][i] != c) diag1 = false;
                if (board[i][n-1-i] != c) diag2 = false;
            }
            if (rowWin || colWin || diag1 || diag2) {
                if (win != ' ') return ' ';
                win = c;
            }
        }
        return win;
    }
};
```

```javascript [JavaScript]
var tictactoe = function(board) {
    const n = board.length;
    let win = ' ';
    for (const c of ['X', 'O']) {
        let rowWin = false, colWin = false, diag1 = true, diag2 = true;
        for (let i = 0; i < n; i++) {
            let rOk = true, cOk = true;
            for (let j = 0; j < n; j++) {
                if (board[i][j] !== c) rOk = false;
                if (board[j][i] !== c) cOk = false;
            }
            if (rOk) rowWin = true;
            if (cOk) colWin = true;
            if (board[i][i] !== c) diag1 = false;
            if (board[i][n-1-i] !== c) diag2 = false;
        }
        if (rowWin || colWin || diag1 || diag2) {
            if (win !== ' ') return ' ';
            win = c;
        }
    }
    return win;
};
```

```typescript [TypeScript]
function tictactoe(board: string[]): string {
    const n = board.length;
    let win = ' ';
    for (const c of ['X', 'O']) {
        let rowWin = false, colWin = false, diag1 = true, diag2 = true;
        for (let i = 0; i < n; i++) {
            let rOk = true, cOk = true;
            for (let j = 0; j < n; j++) {
                if (board[i][j] !== c) rOk = false;
                if (board[j][i] !== c) cOk = false;
            }
            if (rOk) rowWin = true;
            if (cOk) colWin = true;
            if (board[i][i] !== c) diag1 = false;
            if (board[i][n-1-i] !== c) diag2 = false;
        }
        if (rowWin || colWin || diag1 || diag2) {
            if (win !== ' ') return ' ';
            win = c;
        }
    }
    return win;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：数组计数法

**1. 思路**

对每个字符维护每行、每列、两条对角线的计数数组。落子时对应行/列/对角线计数 +1（对 `'O'` 则 -1 或单独处理）。当某计数达到 `n` 即获胜。比方法一更简洁且可流式处理增量落子。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public char tictactoe(String[] board) {
        int n = board.length;
        int[][] row = new int[2][n], col = new int[2][n];
        int[] diag = new int[2], anti = new int[2];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                char c = board[i].charAt(j);
                if (c == ' ') continue;
                int p = c == 'X' ? 0 : 1;
                if (++row[p][i] == n || ++col[p][j] == n ||
                    (i == j && ++diag[p] == n) || (i + j == n - 1 && ++anti[p] == n))
                    return c;
            }
        }
        return ' ';
    }
}
```

```python [Python]
class Solution:
    def tictactoe(self, board: List[str]) -> str:
        n = len(board)
        row = [[0]*n, [0]*n]; col = [[0]*n, [0]*n]
        diag = [0, 0]; anti = [0, 0]
        for i in range(n):
            for j in range(n):
                c = board[i][j]
                if c == ' ': continue
                p = 0 if c == 'X' else 1
                row[p][i] += 1; col[p][j] += 1
                if i == j: diag[p] += 1
                if i + j == n - 1: anti[p] += 1
                if n in (row[p][i], col[p][j], diag[p], anti[p]):
                    return c
        return ' '
```

```cpp [C++]
class Solution {
public:
    char tictactoe(vector<string>& board) {
        int n = board.size();
        vector<vector<int>> row(2, vector<int>(n)), col(2, vector<int>(n));
        vector<int> diag(2), anti(2);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                char c = board[i][j];
                if (c == ' ') continue;
                int p = c == 'X' ? 0 : 1;
                if (++row[p][i] == n || ++col[p][j] == n ||
                    (i == j && ++diag[p] == n) || (i + j == n - 1 && ++anti[p] == n))
                    return c;
            }
        return ' ';
    }
};
```

```javascript [JavaScript]
var tictactoe = function(board) {
    const n = board.length;
    const row = [[0,0],[0,0]].map(() => new Array(n).fill(0));
    const col = [[0,0],[0,0]].map(() => new Array(n).fill(0));
    const diag = [0,0], anti = [0,0];
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
            const c = board[i][j];
            if (c === ' ') continue;
            const p = c === 'X' ? 0 : 1;
            if (++row[p][i] === n || ++col[p][j] === n ||
                (i === j && ++diag[p] === n) || (i + j === n - 1 && ++anti[p] === n))
                return c;
        }
    return ' ';
};
```

```typescript [TypeScript]
function tictactoe(board: string[]): string {
    const n = board.length;
    const row = [new Array(n).fill(0), new Array(n).fill(0)];
    const col = [new Array(n).fill(0), new Array(n).fill(0)];
    const diag = [0,0], anti = [0,0];
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
            const c = board[i][j];
            if (c === ' ') continue;
            const p = c === 'X' ? 0 : 1;
            if (++row[p][i] === n || ++col[p][j] === n ||
                (i === j && ++diag[p] === n) || (i + j === n - 1 && ++anti[p] === n))
                return c;
        }
    return ' ';
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                       |
| ---------- | ---------- | ---------- | -------------------------- |
| 行列扫描   | `O(n²)`    | `O(1)`     | 直观，实现简单             |
| 计数数组   | `O(n²)`    | `O(n)`     | 支持增量落子，推荐         |

**推荐**：计数数组法在一次遍历中即可判定，且易于扩展为流式棋局判断。
