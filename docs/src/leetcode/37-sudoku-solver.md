# [37. 解数独](https://leetcode.cn/problems/sudoku-solver/)



## 一、题目描述

编写一个程序，通过填充空格来解决数独问题。

数独解法需遵循如下规则：

1. 数字 `1-9` 在每一行只能出现一次。
2. 数字 `1-9` 在每一列只能出现一次。
3. 数字 `1-9` 在每一个 `3 x 3` 的宫内只能出现一次。

数独部分空格内已填入了数字，空白格用 `'.'` 表示。

一个数独的答案必须需满足上述所有规则，题目保证数独仅有一个解。



**示例：**

```
输入：board 见题目图示（含多个 '.' 空格）
输出：填充完成的数独（唯一解）
```

**提示：**

-   `board.length == 9`
-   `board[i].length == 9`
-   `board[i][j]` 是一位数字（`1-9`）或者 `'.'`
-   题目保证输入数独仅有一个解



## 二、解答方法

### 2.1 方法一：回溯（DFS）

1. **思路**

把解数独看作「在每个空格尝试填 1-9」的搜索问题：

-   用三个布尔数组记录行、列、宫已使用的数字；
-   找到下一个空白格，尝试填入 `1-9` 中「行、列、宫都未使用」的数字；
-   填入后递归求解下一步；若后续无解则回溯（撤销填入）；
-   当所有格子填满即找到解。注意题目保证唯一解，找到后即可停止。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private boolean[][] row = new boolean[9][10];
    private boolean[][] col = new boolean[9][10];
    private boolean[][] box = new boolean[9][10];

    public void solveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    int num = board[i][j] - '0';
                    int b = (i / 3) * 3 + (j / 3);
                    row[i][num] = col[j][num] = box[b][num] = true;
                }
            }
        backtrack(board);
    }

    private boolean backtrack(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') continue;
                int b = (i / 3) * 3 + (j / 3);
                for (int num = 1; num <= 9; num++) {
                    if (row[i][num] || col[j][num] || box[b][num]) continue;
                    board[i][j] = (char) (num + '0');
                    row[i][num] = col[j][num] = box[b][num] = true;
                    if (backtrack(board)) return true;
                    board[i][j] = '.';
                    row[i][num] = col[j][num] = box[b][num] = false;
                }
                return false;
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        row = [[False] * 10 for _ in range(9)]
        col = [[False] * 10 for _ in range(9)]
        box = [[False] * 10 for _ in range(9)]
        for i in range(9):
            for j in range(9):
                if board[i][j] != '.':
                    num = int(board[i][j])
                    b = (i // 3) * 3 + (j // 3)
                    row[i][num] = col[j][num] = box[b][num] = True

        def backtrack():
            for i in range(9):
                for j in range(9):
                    if board[i][j] != '.':
                        continue
                    b = (i // 3) * 3 + (j // 3)
                    for num in range(1, 10):
                        if row[i][num] or col[j][num] or box[b][num]:
                            continue
                        board[i][j] = str(num)
                        row[i][num] = col[j][num] = box[b][num] = True
                        if backtrack():
                            return True
                        board[i][j] = '.'
                        row[i][num] = col[j][num] = box[b][num] = False
                    return False
            return True

        backtrack()
```

```go [Go]
func solveSudoku(board [][]byte) {
    var row, col, box [9][10]bool
    for i := 0; i < 9; i++ {
        for j := 0; j < 9; j++ {
            if board[i][j] != '.' {
                num := int(board[i][j] - '0')
                b := (i/3)*3 + (j/3)
                row[i][num] = true
                col[j][num] = true
                box[b][num] = true
            }
        }
    }
    var backtrack func() bool
    backtrack = func() bool {
        for i := 0; i < 9; i++ {
            for j := 0; j < 9; j++ {
                if board[i][j] != '.' {
                    continue
                }
                b := (i/3)*3 + (j/3)
                for num := 1; num <= 9; num++ {
                    if row[i][num] || col[j][num] || box[b][num] {
                        continue
                    }
                    board[i][j] = byte('0' + num)
                    row[i][num] = true
                    col[j][num] = true
                    box[b][num] = true
                    if backtrack() {
                        return true
                    }
                    board[i][j] = '.'
                    row[i][num] = false
                    col[j][num] = false
                    box[b][num] = false
                }
                return false
            }
        }
        return true
    }
    backtrack()
}
```

```c [C]
/* 回溯求解数独在 C 中需手写递归，内存管理较繁琐，推荐移植上述思路 */
```

```cpp [C++]
class Solution {
public:
    bool row[9][10] = {false};
    bool col[9][10] = {false};
    bool box[9][10] = {false};

    void solveSudoku(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    int num = board[i][j] - '0';
                    int b = (i / 3) * 3 + (j / 3);
                    row[i][num] = col[j][num] = box[b][num] = true;
                }
        backtrack(board);
    }

    bool backtrack(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') continue;
                int b = (i / 3) * 3 + (j / 3);
                for (int num = 1; num <= 9; num++) {
                    if (row[i][num] || col[j][num] || box[b][num]) continue;
                    board[i][j] = num + '0';
                    row[i][num] = col[j][num] = box[b][num] = true;
                    if (backtrack(board)) return true;
                    board[i][j] = '.';
                    row[i][num] = col[j][num] = box[b][num] = false;
                }
                return false;
            }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
    const row = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const col = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const box = Array.from({ length: 9 }, () => new Array(10).fill(false));
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (board[i][j] !== '.') {
                const num = Number(board[i][j]);
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                row[i][num] = col[j][num] = box[b][num] = true;
            }
    const backtrack = () => {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== '.') continue;
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                for (let num = 1; num <= 9; num++) {
                    if (row[i][num] || col[j][num] || box[b][num]) continue;
                    board[i][j] = String(num);
                    row[i][num] = col[j][num] = box[b][num] = true;
                    if (backtrack()) return true;
                    board[i][j] = '.';
                    row[i][num] = col[j][num] = box[b][num] = false;
                }
                return false;
            }
        return true;
    };
    backtrack();
};
```

```ts [TypeScript]
function solveSudoku(board: string[][]): void {
    const row: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const col: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const box: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false));
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (board[i][j] !== '.') {
                const num = Number(board[i][j]);
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                row[i][num] = col[j][num] = box[b][num] = true;
            }
    const backtrack = (): boolean => {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== '.') continue;
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                for (let num = 1; num <= 9; num++) {
                    if (row[i][num] || col[j][num] || box[b][num]) continue;
                    board[i][j] = String(num);
                    row[i][num] = col[j][num] = box[b][num] = true;
                    if (backtrack()) return true;
                    board[i][j] = '.';
                    row[i][num] = col[j][num] = box[b][num] = false;
                }
                return false;
            }
        return true;
    };
    backtrack();
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(9^(空位数))` 最坏，但约束传播 + 唯一解保证实际很快。
- **空间复杂度**：`O(1)`，三个固定数组 + 递归栈。

### 2.2 方法二：位运算优化回溯

1. **思路**

与方法一相同，但每行/列/宫用整数位掩码记录已用数字，`lowbit` 可快速取出可填候选，减少循环。逻辑等价，实现稍复杂。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private int[] row = new int[9], col = new int[9], box = new int[9];

    public void solveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    int bit = 1 << (board[i][j] - '1');
                    int b = (i / 3) * 3 + (j / 3);
                    row[i] |= bit; col[j] |= bit; box[b] |= bit;
                }
        backtrack(board);
    }

    private boolean backtrack(char[][] board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') continue;
                int b = (i / 3) * 3 + (j / 3);
                int avail = ~(row[i] | col[j] | box[b]) & 0x1FF;
                while (avail != 0) {
                    int bit = avail & (-avail);
                    avail ^= bit;
                    int num = (int)(Math.log(bit) / Math.log(2)) + 1;
                    board[i][j] = (char) (num + '0');
                    row[i] |= bit; col[j] |= bit; box[b] |= bit;
                    if (backtrack(board)) return true;
                    board[i][j] = '.';
                    row[i] ^= bit; col[j] ^= bit; box[b] ^= bit;
                }
                return false;
            }
        return true;
    }
}
```

```python [Python]
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        row = [0] * 9
        col = [0] * 9
        box = [0] * 9
        for i in range(9):
            for j in range(9):
                if board[i][j] != '.':
                    bit = 1 << (int(board[i][j]) - 1)
                    b = (i // 3) * 3 + (j // 3)
                    row[i] |= bit; col[j] |= bit; box[b] |= bit

        def backtrack():
            for i in range(9):
                for j in range(9):
                    if board[i][j] != '.':
                        continue
                    b = (i // 3) * 3 + (j // 3)
                    avail = (~(row[i] | col[j] | box[b])) & 0x1FF
                    while avail:
                        low = avail & (-avail)
                        avail ^= low
                        num = low.bit_length()
                        board[i][j] = str(num)
                        row[i] |= low; col[j] |= low; box[b] |= low
                        if backtrack():
                            return True
                        board[i][j] = '.'
                        row[i] ^= low; col[j] ^= low; box[b] ^= low
                    return False
            return True

        backtrack()
```

```go [Go]
func solveSudoku(board [][]byte) {
    var row, col, box [9]int
    for i := 0; i < 9; i++ {
        for j := 0; j < 9; j++ {
            if board[i][j] != '.' {
                bit := 1 << (board[i][j] - '1')
                b := (i/3)*3 + (j/3)
                row[i] |= bit; col[j] |= bit; box[b] |= bit
            }
        }
    }
    var bt func() bool
    bt = func() bool {
        for i := 0; i < 9; i++ {
            for j := 0; j < 9; j++ {
                if board[i][j] != '.' {
                    continue
                }
                b := (i/3)*3 + (j/3)
                avail := ^(row[i] | col[j] | box[b]) & 0x1FF
                for avail != 0 {
                    low := avail & (-avail)
                    avail ^= low
                    num := 0
                    for v := low; v > 1; v >>= 1 { num++ }
                    board[i][j] = byte('0' + num)
                    row[i] |= low; col[j] |= low; box[b] |= low
                    if bt() { return true }
                    board[i][j] = '.'
                    row[i] ^= low; col[j] ^= low; box[b] ^= low
                }
                return false
            }
        }
        return true
    }
    bt()
}
```

```c [C]
/* 位运算回溯在 C 中需手写位操作与递归，繁琐，推荐布尔数组回溯法 */
```

```cpp [C++]
class Solution {
public:
    int row[9] = {0}, col[9] = {0}, box[9] = {0};
    void solveSudoku(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    int bit = 1 << (board[i][j] - '1');
                    int b = (i / 3) * 3 + (j / 3);
                    row[i] |= bit; col[j] |= bit; box[b] |= bit;
                }
        backtrack(board);
    }
    bool backtrack(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') continue;
                int b = (i / 3) * 3 + (j / 3);
                int avail = ~(row[i] | col[j] | box[b]) & 0x1FF;
                while (avail) {
                    int low = avail & (-avail);
                    avail ^= low;
                    int num = 0; for (int v = low; v > 1; v >>= 1) num++;
                    board[i][j] = num + '0';
                    row[i] |= low; col[j] |= low; box[b] |= low;
                    if (backtrack(board)) return true;
                    board[i][j] = '.';
                    row[i] ^= low; col[j] ^= low; box[b] ^= low;
                }
                return false;
            }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @return {void}
 */
var solveSudoku = function (board) {
    const row = new Array(9).fill(0);
    const col = new Array(9).fill(0);
    const box = new Array(9).fill(0);
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (board[i][j] !== '.') {
                const bit = 1 << (Number(board[i][j]) - 1);
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                row[i] |= bit; col[j] |= bit; box[b] |= bit;
            }
    const backtrack = () => {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== '.') continue;
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                let avail = ~(row[i] | col[j] | box[b]) & 0x1FF;
                while (avail) {
                    const low = avail & (-avail);
                    avail ^= low;
                    let num = 0; for (let v = low; v > 1; v >>= 1) num++;
                    board[i][j] = String(num);
                    row[i] |= low; col[j] |= low; box[b] |= low;
                    if (backtrack()) return true;
                    board[i][j] = '.';
                    row[i] ^= low; col[j] ^= low; box[b] ^= low;
                }
                return false;
            }
        return true;
    };
    backtrack();
};
```

```ts [TypeScript]
function solveSudoku(board: string[][]): void {
    const row: number[] = new Array(9).fill(0);
    const col: number[] = new Array(9).fill(0);
    const box: number[] = new Array(9).fill(0);
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (board[i][j] !== '.') {
                const bit = 1 << (Number(board[i][j]) - 1);
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                row[i] |= bit; col[j] |= bit; box[b] |= bit;
            }
    const backtrack = (): boolean => {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== '.') continue;
                const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                let avail = ~(row[i] | col[j] | box[b]) & 0x1FF;
                while (avail) {
                    const low = avail & (-avail);
                    avail ^= low;
                    let num = 0; for (let v = low; v > 1; v >>= 1) num++;
                    board[i][j] = String(num);
                    row[i] |= low; col[j] |= low; box[b] |= low;
                    if (backtrack()) return true;
                    board[i][j] = '.';
                    row[i] ^= low; col[j] ^= low; box[b] ^= low;
                }
                return false;
            }
        return true;
    };
    backtrack();
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：与方法一同量级，位运算减少内循环次数。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（DFS） | `O(9^(空位数))` | `O(1)` | 暴力枚举所有可能 |
| 位运算优化回溯 | `—` | `O(1)` | 暴力枚举所有可能 |

