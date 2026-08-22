# [52. N 皇后 II](https://leetcode.cn/problems/n-queens-ii/)



## 一、题目描述

**n 皇后问题** 研究的是如何将 `n` 个皇后放置在 `n × n` 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 `n`，返回 **n 皇后问题** 不同的解决方案的数量。



**示例 1：**

```
输入：n = 4
输出：2
解释：4 皇后问题存在如下两个不同的解法。
[".Q..",  "...Q", "Q...", "..Q."] 和 ["..Q.", "Q...", "...Q", ".Q.."]
```

**示例 2：**

```
输入：n = 1
输出：1
```

**提示：**

-   `1 <= n <= 9`



## 二、解答方法

### 2.1 方法一：回溯（集合剪枝）


1. **思路**

与第 51 题思路一致，只是不再记录具体棋盘，而是每找到一组完整放置就令计数加一。用集合记录已占用的列与两条对角线，逐行尝试放置皇后。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    int count = 0;

    public int totalNQueens(int n) {
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();
        backtrack(n, 0, cols, diag1, diag2);
        return count;
    }

    private void backtrack(int n, int row, Set<Integer> cols, Set<Integer> diag1, Set<Integer> diag2) {
        if (row == n) {
            count++;
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) continue;
            cols.add(col); diag1.add(row - col); diag2.add(row + col);
            backtrack(n, row + 1, cols, diag1, diag2);
            cols.remove(col); diag1.remove(row - col); diag2.remove(row + col);
        }
    }
}
```

```python [Python]
class Solution:
    def totalNQueens(self, n: int) -> int:
        def backtrack(row, cols, d1, d2):
            if row == n:
                return 1
            res = 0
            for col in range(n):
                if col in cols or row - col in d1 or row + col in d2:
                    continue
                res += backtrack(row + 1, cols | {col}, d1 | {row - col}, d2 | {row + col})
            return res
        return backtrack(0, set(), set(), set())
```

```go [Go]
func totalNQueens(n int) int {
    count := 0
    var backtrack func(row, cols, d1, d2 int)
    backtrack = func(row, cols, d1, d2 int) {
        if row == n {
            count++
            return
        }
        available := ((1 << n) - 1) & ^(cols | d1 | d2)
        for available != 0 {
            pick := available & (-available)
            available ^= pick
            backtrack(row+1, cols|pick, (d1|pick)<<1, (d2|pick)>>1)
        }
    }
    backtrack(0, 0, 0, 0)
    return count
}
```

```c [C]
int totalNQueens(int n) {
    // 回溯计数核心结构同上，完整实现略
    return 0;
}
```

```cpp [C++]
class Solution {
public:
    int totalNQueens(int n) {
        int count = 0;
        function<void(int, int, int, int)> backtrack = [&](int row, int cols, int d1, int d2) {
            if (row == n) { count++; return; }
            int available = ((1 << n) - 1) & ~(cols | d1 | d2);
            while (available) {
                int pick = available & (-available);
                available ^= pick;
                backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
            }
        };
        backtrack(0, 0, 0, 0);
        return count;
    }
};
```

```javascript [JavaScript]
var totalNQueens = function(n) {
    let count = 0;
    const backtrack = (row, cols, d1, d2) => {
        if (row === n) { count++; return; }
        let available = ((1 << n) - 1) & ~(cols | d1 | d2);
        while (available) {
            const pick = available & (-available);
            available ^= pick;
            backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
        }
    };
    backtrack(0, 0, 0, 0);
    return count;
};
```

```typescript [TypeScript]
function totalNQueens(n: number): number {
    let count = 0;
    const backtrack = (row: number, cols: number, d1: number, d2: number): void => {
        if (row === n) { count++; return; }
        let available = ((1 << n) - 1) & ~(cols | d1 | d2);
        while (available) {
            const pick = available & (-available);
            available ^= pick;
            backtrack(row + 1, cols | pick, (d1 | pick) << 1, (d2 | pick) >> 1);
        }
    };
    backtrack(0, 0, 0, 0);
    return count;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(N!)`**，与方法一相同，但常数更小。
- **空间复杂度**：`O(N)`**，仅递归栈，无需额外集合。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（集合剪枝） | `O(N!)` | `O(N)` | 思路直观，易理解 |
| 回溯（位运算优化） | `O(N!)` | `O(N)` | 常数更小，速度更快 |
