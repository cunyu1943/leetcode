# [348. 设计井字棋](https://leetcode.cn/problems/design-tic-tac-toe/) [🔒 会员题]

## 一、题目描述

设计一个井字棋（Tic-Tac-Toe）游戏，在 `n × n` 棋盘上。实现：
- `TicTacToe(int n)` 初始化；
- `int move(int row, int col, int player)`：玩家 `player`（1 或 2）在 `(row,col)` 落子，返回：该步后 `player` 赢则 `player`，否则 `0`（平局/未结束后续继续）。

要求 `move` 为 `O(1)`。

**示例：**
```
输入：n = 3，依次 move(0,0,1),move(0,2,2),move(1,1,1),move(1,2,2),move(2,2,1) → 最后一步 1 对角线获胜，返回 1
```

**提示：** `2 <= n <= 100`，假设落子合法、无重复、无胜负后继续（或你自行忽略）。

## 二、解答方法

### 方法一：行/列/对角线计数

**思路：** 维护每行、每列、两条对角线（主、副）的得分。玩家 1 落子 +1，玩家 2 落子 -1。某行/列/对角线的累计绝对值等于 `n` 即该玩家占满，判胜。仅更新受影响的行、列、两条对角线（均 `O(1)`）。

:::::: code-group

```java [Java]
class TicTacToe {
    private int n;
    private int[] rows, cols;
    private int diag, anti;
    public TicTacToe(int n) {
        this.n = n; rows = new int[n]; cols = new int[n];
    }
    public int move(int row, int col, int player) {
        int add = player == 1 ? 1 : -1;
        rows[row] += add; cols[col] += add;
        if (row == col) diag += add;
        if (row + col == n - 1) anti += add;
        if (Math.abs(rows[row]) == n || Math.abs(cols[col]) == n
            || Math.abs(diag) == n || Math.abs(anti) == n) return player;
        return 0;
    }
}
```

```python [Python]
class TicTacToe:
    def __init__(self, n: int):
        self.n = n; self.rows = [0]*n; self.cols = [0]*n; self.diag = self.anti = 0
    def move(self, row: int, col: int, player: int) -> int:
        add = 1 if player == 1 else -1
        self.rows[row] += add; self.cols[col] += add
        if row == col: self.diag += add
        if row + col == self.n - 1: self.anti += add
        if abs(self.rows[row])==self.n or abs(self.cols[col])==self.n or abs(self.diag)==self.n or abs(self.anti)==self.n:
            return player
        return 0
```

```cpp [C++]
class TicTacToe {
    int n; vector<int> rows, cols; int diag=0, anti=0;
public:
    TicTacToe(int n): n(n), rows(n,0), cols(n,0) {}
    int move(int row, int col, int player) {
        int add = player==1?1:-1;
        rows[row]+=add; cols[col]+=add;
        if(row==col) diag+=add;
        if(row+col==n-1) anti+=add;
        if(abs(rows[row])==n||abs(cols[col])==n||abs(diag)==n||abs(anti)==n) return player;
        return 0;
    }
};
```

```go [Go]
type TicTacToe struct { n int; rows, cols []int; diag, anti int }
func Constructor(n int) TicTacToe { return TicTacToe{n:n, rows:make([]int,n), cols:make([]int,n)} }
func (t *TicTacToe) Move(row, col, player int) int {
    add := 1; if player == 2 { add = -1 }
    t.rows[row]+=add; t.cols[col]+=add
    if row==col { t.diag+=add }
    if row+col==t.n-1 { t.anti+=add }
    if abs(t.rows[row])==t.n || abs(t.cols[col])==t.n || abs(t.diag)==t.n || abs(t.anti)==t.n { return player }
    return 0
}
func abs(a int) int { if a<0 { return -a }; return a }
```

```js [JavaScript]
var TicTacToe = function (n) {
    this.n = n; this.rows = new Array(n).fill(0); this.cols = new Array(n).fill(0); this.diag = 0; this.anti = 0;
};
TicTacToe.prototype.move = function (row, col, player) {
    const add = player === 1 ? 1 : -1;
    this.rows[row] += add; this.cols[col] += add;
    if (row === col) this.diag += add;
    if (row + col === this.n - 1) this.anti += add;
    if (Math.abs(this.rows[row])===this.n || Math.abs(this.cols[col])===this.n || Math.abs(this.diag)===this.n || Math.abs(this.anti)===this.n) return player;
    return 0;
};
```

::::::

**复杂度：** `move` `O(1)`，空间 `O(n)`。

## 三、总结

设计题经典：用行/列/两对角线累加和判胜，玩家 1 加、玩家 2 减，和为 ±n 即胜。避免每次扫描全盘（`O(n²)`）。本题体现「状态压缩 + 增量更新」的设计思想。进阶：`794 有效的井字游戏`（验证合法局面）。
