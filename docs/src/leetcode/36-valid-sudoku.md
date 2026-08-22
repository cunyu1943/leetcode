# [36. 有效的数独](https://leetcode.cn/problems/valid-sudoku/)



## 一、题目描述

请你判断一个 `9 x 9` 的数独是否有效。只需要 **根据以下规则**，验证已经填入的数字是否有效即可。

1. 数字 `1-9` 在每一行只能出现一次。
2. 数字 `1-9` 在每一列只能出现一次。
3. 数字 `1-9` 在每一个 `3 x 3` 的宫内只能出现一次。

**注：**一个有效的数独（部分已被填充）不一定是可解的，只需根据上述规则验证已填入的数字是否合法即可。空白格用 `'.'` 表示。



**示例 1：**

```
输入：board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：true
```

**示例 2：**

```
输入：board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：false
解释：除了第一行的第一个数字从 5 改为 8 以外，其它数字与第一示例相同。但由于位于左上角宫内的行与列均为 8 的两个 8 重复，因此该数独是无效的。
```

**提示：**

-   `board.length == 9`
-   `board[i].length == 9`
-   `board[i][j]` 是一位数字（`1-9`）或者 `'.'`



## 二、解答方法

### 2.1 方法一：一次遍历 + 三个哈希集合

1. **思路**

用三个布尔数组（或集合）分别记录「每行、每列、每宫」已出现的数字。遍历 81 个格子，遇到数字 `c` 时：

-   计算宫编号 `box = (i / 3) * 3 + (j / 3)`；
-   若行、列、宫任一已含 `c`，则无效；
-   否则把 `c` 标记到行、列、宫中。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isValidSudoku(char[][] board) {
        boolean[][] row = new boolean[9][10];
        boolean[][] col = new boolean[9][10];
        boolean[][] box = new boolean[9][10];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char c = board[i][j];
                if (c == '.') continue;
                int num = c - '0';
                int b = (i / 3) * 3 + (j / 3);
                if (row[i][num] || col[j][num] || box[b][num]) return false;
                row[i][num] = col[j][num] = box[b][num] = true;
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        row = [set() for _ in range(9)]
        col = [set() for _ in range(9)]
        box = [set() for _ in range(9)]
        for i in range(9):
            for j in range(9):
                c = board[i][j]
                if c == '.':
                    continue
                b = (i // 3) * 3 + (j // 3)
                if c in row[i] or c in col[j] or c in box[b]:
                    return False
                row[i].add(c)
                col[j].add(c)
                box[b].add(c)
        return True
```

```go [Go]
func isValidSudoku(board [][]byte) bool {
    var row, col, box [9][10]bool
    for i := 0; i < 9; i++ {
        for j := 0; j < 9; j++ {
            c := board[i][j]
            if c == '.' {
                continue
            }
            num := int(c - '0')
            b := (i/3)*3 + (j / 3)
            if row[i][num] || col[j][num] || box[b][num] {
                return false
            }
            row[i][num] = true
            col[j][num] = true
            box[b][num] = true
        }
    }
    return true
}
```

```c [C]
int isValidSudoku(char** board, int boardSize, int* boardColSize) {
    int row[9][10] = {0}, col[9][10] = {0}, box[9][10] = {0};
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char c = board[i][j];
            if (c == '.') continue;
            int num = c - '0';
            int b = (i / 3) * 3 + (j / 3);
            if (row[i][num] || col[j][num] || box[b][num]) return 0;
            row[i][num] = col[j][num] = box[b][num] = 1;
        }
    }
    return 1;
}
```

```cpp [C++]
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        bool row[9][10] = {false};
        bool col[9][10] = {false};
        bool box[9][10] = {false};
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char c = board[i][j];
                if (c == '.') continue;
                int num = c - '0';
                int b = (i / 3) * 3 + (j / 3);
                if (row[i][num] || col[j][num] || box[b][num]) return false;
                row[i][num] = col[j][num] = box[b][num] = true;
            }
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const row = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const col = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const box = Array.from({ length: 9 }, () => new Array(10).fill(false));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const c = board[i][j];
            if (c === '.') continue;
            const num = Number(c);
            const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if (row[i][num] || col[j][num] || box[b][num]) return false;
            row[i][num] = col[j][num] = box[b][num] = true;
        }
    }
    return true;
};
```

```ts [TypeScript]
function isValidSudoku(board: string[][]): boolean {
    const row: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const col: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false));
    const box: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const c = board[i][j];
            if (c === '.') continue;
            const num = Number(c);
            const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if (row[i][num] || col[j][num] || box[b][num]) return false;
            row[i][num] = col[j][num] = box[b][num] = true;
        }
    }
    return true;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`，固定 81 个格子。广义为 `O(n²)`（n×n 数独）。
- **空间复杂度**：`O(1)`，三个固定大小数组。

### 2.2 方法二：位运算标记

1. **思路**

把每行/列/宫用一个整数（位掩码）表示已出现的数字，`1 << (num-1)` 标记。判断时用 `&` 检测是否已置位。空间更紧凑，逻辑等价。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isValidSudoku(char[][] board) {
        int[] row = new int[9], col = new int[9], box = new int[9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char c = board[i][j];
                if (c == '.') continue;
                int bit = 1 << (c - '1');
                int b = (i / 3) * 3 + (j / 3);
                if ((row[i] & bit) != 0 || (col[j] & bit) != 0 || (box[b] & bit) != 0) return false;
                row[i] |= bit; col[j] |= bit; box[b] |= bit;
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        row, col, box = [0] * 9, [0] * 9, [0] * 9
        for i in range(9):
            for j in range(9):
                c = board[i][j]
                if c == '.':
                    continue
                bit = 1 << (int(c) - 1)
                b = (i // 3) * 3 + (j // 3)
                if row[i] & bit or col[j] & bit or box[b] & bit:
                    return False
                row[i] |= bit
                col[j] |= bit
                box[b] |= bit
        return True
```

```go [Go]
func isValidSudoku(board [][]byte) bool {
    var row, col, box [9]int
    for i := 0; i < 9; i++ {
        for j := 0; j < 9; j++ {
            c := board[i][j]
            if c == '.' {
                continue
            }
            bit := 1 << (c - '1')
            b := (i/3)*3 + (j/3)
            if row[i]&bit != 0 || col[j]&bit != 0 || box[b]&bit != 0 {
                return false
            }
            row[i] |= bit
            col[j] |= bit
            box[b] |= bit
        }
    }
    return true
}
```

```c [C]
int isValidSudoku(char** board, int boardSize, int* boardColSize) {
    int row[9] = {0}, col[9] = {0}, box[9] = {0};
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char c = board[i][j];
            if (c == '.') continue;
            int bit = 1 << (c - '1');
            int b = (i / 3) * 3 + (j / 3);
            if ((row[i] & bit) || (col[j] & bit) || (box[b] & bit)) return 0;
            row[i] |= bit; col[j] |= bit; box[b] |= bit;
        }
    }
    return 1;
}
```

```cpp [C++]
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int row[9] = {0}, col[9] = {0}, box[9] = {0};
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char c = board[i][j];
                if (c == '.') continue;
                int bit = 1 << (c - '1');
                int b = (i / 3) * 3 + (j / 3);
                if ((row[i] & bit) || (col[j] & bit) || (box[b] & bit)) return false;
                row[i] |= bit; col[j] |= bit; box[b] |= bit;
            }
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const row = new Array(9).fill(0);
    const col = new Array(9).fill(0);
    const box = new Array(9).fill(0);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const c = board[i][j];
            if (c === '.') continue;
            const bit = 1 << (Number(c) - 1);
            const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if ((row[i] & bit) || (col[j] & bit) || (box[b] & bit)) return false;
            row[i] |= bit; col[j] |= bit; box[b] |= bit;
        }
    }
    return true;
};
```

```ts [TypeScript]
function isValidSudoku(board: string[][]): boolean {
    const row: number[] = new Array(9).fill(0);
    const col: number[] = new Array(9).fill(0);
    const box: number[] = new Array(9).fill(0);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const c = board[i][j];
            if (c === '.') continue;
            const bit = 1 << (Number(c) - 1);
            const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if ((row[i] & bit) || (col[j] & bit) || (box[b] & bit)) return false;
            row[i] |= bit; col[j] |= bit; box[b] |= bit;
        }
    }
    return true;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`（81 格）。
- **空间复杂度**：`O(1)`，用整数位掩码代替布尔数组。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 一次遍历 + 三个哈希集合 | `O(1)` | `O(1)` | 查找/聚合高效 |
| 位运算标记 | `O(1)` | `O(1)` | 常规实现 |

