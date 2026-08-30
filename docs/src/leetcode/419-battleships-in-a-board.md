# [419. 甲板上的战舰](https://leetcode.cn/problems/battleships-in-a-board/)

## 一、题目描述

给定一个二维字符矩阵 `board`，其中 `'X'` 表示战舰的单元格，`'.'` 表示空单元格。战舰只能水平或垂直放置，且彼此之间至少有一个空单元格分隔（即不会出现相邻的战舰，包括对角）。

请在不修改 `board` 的情况下，返回甲板上**战舰的数量**。

要求：你可以只用一次扫描、`O(1)` 额外空间解决。

**示例 1：**

```
输入：board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
输出：2
```

**示例 2：**

```
输入：board = [["."]]
输出：0
```

**提示：**

- `m == board.length`，`n == board[i].length`
- `1 <= m, n <= 200`
- `board[i][j]` 是 `'X'` 或 `'.'`

## 二、解答方法

### 2.1 方法一：计数战舰头（左上角）

1. 思路

由于战舰不相邻，每艘战舰有唯一的「最上/最左」单元格：其上方（若存在）不是 `'X'`，且左方（若存在）不是 `'X'`。扫描矩阵，凡满足 `(i==0 || board[i-1][j]!='X') && (j==0 || board[i][j-1]!='X')` 且当前为 `'X'` 的，即为一艘新战舰的头，计数 +1。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int countBattleships(char[][] board) {
        int m = board.length, n = board[0].length, ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (board[i][j] == 'X'
                    && (i == 0 || board[i - 1][j] != 'X')
                    && (j == 0 || board[i][j - 1] != 'X')) ans++;
        return ans;
    }
}
```

```python [Python]
class Solution:
    def countBattleships(self, board: List[List[str]]) -> int:
        m, n = len(board), len(board[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if board[i][j] == 'X' and (i == 0 or board[i-1][j] != 'X') and (j == 0 or board[i][j-1] != 'X'):
                    ans += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int countBattleships(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size(), ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (board[i][j] == 'X' && (i == 0 || board[i-1][j] != 'X') && (j == 0 || board[i][j-1] != 'X'))
                    ans++;
        return ans;
    }
};
```

```go [Go]
func countBattleships(board [][]byte) int {
	m, n := len(board), len(board[0])
	ans := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if board[i][j] == 'X' && (i == 0 || board[i-1][j] != 'X') && (j == 0 || board[i][j-1] != 'X') {
				ans++
			}
		}
	}
	return ans
}
```

```javascript [JavaScript]
var countBattleships = function (board) {
    const m = board.length, n = board[0].length;
    let ans = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (board[i][j] === 'X' && (i === 0 || board[i-1][j] !== 'X') && (j === 0 || board[i][j-1] !== 'X'))
                ans++;
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn)$。
- 空间复杂度：$O(1)$。

## 三、总结

利用「战舰互不相邻」的性质，把每艘舰归约到唯一的头部计数，避免访问整艘舰。相关题目：200 岛屿数量、130 被围绕的区域。
