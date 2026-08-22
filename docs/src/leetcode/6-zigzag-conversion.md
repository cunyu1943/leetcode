# [6. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)



## 一、题目描述

将一个给定字符串 `s` 根据给定的行数 `numRows`，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 `"PAYPALISHIRING"` 行数为 `3` 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"PAHNAPLSIIGYIR"`。

请你实现这个将字符串进行指定行数变换的函数 `convert(s, numRows)`。



**示例 1：**

```
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```

**示例 2：**

```
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
```

**示例 3：**

```
输入：s = "A", numRows = 1
输出："A"
```

**提示：**

-   `1 <= s.length <= 1000`
-   `s` 由英文字母（小写和大写）、`','` 和 `'.'` 组成
-   `1 <= numRows <= 1000`



## 二、解答方法

### 2.1 方法一：按行模拟

1. **思路**

最直观的方法：用 `numRows` 个字符串（或列表）分别代表每一行，然后按照 Z 字形访问的规律把字符依次放入对应行：

-   维护当前行 `curRow` 和移动方向 `goingDown`；
-   遇到第 0 行或最后一行时改变方向；
-   遍历 `s`，把 `s[i]` 追加到 `rows[curRow]`，再更新 `curRow`；
-   最后把所有行拼接起来。

当 `numRows == 1` 时无需变换，直接返回原串。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
        int curRow = 0;
        boolean goingDown = false;
        for (char c : s.toCharArray()) {
            rows[curRow].append(c);
            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
            curRow += goingDown ? 1 : -1;
        }
        StringBuilder res = new StringBuilder();
        for (StringBuilder row : rows) res.append(row);
        return res.toString();
    }
}
```

```python [Python]
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s
        rows = [''] * numRows
        cur_row, going_down = 0, False
        for c in s:
            rows[cur_row] += c
            if cur_row == 0 or cur_row == numRows - 1:
                going_down = not going_down
            cur_row += 1 if going_down else -1
        return ''.join(rows)
```

```go [Go]
func convert(s string, numRows int) string {
    if numRows == 1 {
        return s
    }
    rows := make([]string, numRows)
    curRow, goingDown := 0, false
    for _, c := range s {
        rows[curRow] += string(c)
        if curRow == 0 || curRow == numRows-1 {
            goingDown = !goingDown
        }
        if goingDown {
            curRow++
        } else {
            curRow--
        }
    }
    res := ""
    for _, row := range rows {
        res += row
    }
    return res
}
```

```c [C]
#include <string.h>
#include <stdlib.h>

char* convert(char* s, int numRows) {
    int n = strlen(s);
    if (numRows == 1) return s;
    char** rows = (char**)malloc(sizeof(char*) * numRows);
    int* lens = (int*)calloc(numRows, sizeof(int));
    for (int i = 0; i < numRows; i++) rows[i] = (char*)malloc(sizeof(char) * (n + 1));
    int curRow = 0, goingDown = 0;
    for (int i = 0; i < n; i++) {
        rows[curRow][lens[curRow]++] = s[i];
        if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
        if (goingDown) curRow++; else curRow--;
    }
    char* res = (char*)malloc(sizeof(char) * (n + 1));
    int k = 0;
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < lens[i]; j++) res[k++] = rows[i][j];
        free(rows[i]);
    }
    res[k] = '\0';
    free(rows);
    free(lens);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s;
        vector<string> rows(numRows);
        int curRow = 0;
        bool goingDown = false;
        for (char c : s) {
            rows[curRow] += c;
            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
            curRow += goingDown ? 1 : -1;
        }
        string res;
        for (string& row : rows) res += row;
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if (numRows === 1) return s;
    const rows = Array.from({ length: numRows }, () => '');
    let curRow = 0, goingDown = false;
    for (const c of s) {
        rows[curRow] += c;
        if (curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;
        curRow += goingDown ? 1 : -1;
    }
    return rows.join('');
};
```

```ts [TypeScript]
function convert(s: string, numRows: number): string {
    if (numRows === 1) return s;
    const rows: string[] = Array.from({ length: numRows }, () => '');
    let curRow = 0, goingDown = false;
    for (const c of s) {
        rows[curRow] += c;
        if (curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;
        curRow += goingDown ? 1 : -1;
    }
    return rows.join('');
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 是字符串长度，每个字符只访问一次。
- **空间复杂度**：`O(n)`，需要存储所有字符到各行中。

### 2.2 方法二：按行直接定位（找周期规律）

1. **思路**

Z 字形排列中，每 `cycle = 2 * numRows - 2` 个字符构成一个完整周期。对于任意一行 `r`：

-   第 0 行和最后一行：字符下标为 `k * cycle + r`；
-   中间行 `r`：除了上述位置，还在 `k * cycle + cycle - r` 处多一个字符（斜线部分）。

直接按行、按周期把对应下标的字符拼接即可，无需中间数组逐字符模拟。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        StringBuilder res = new StringBuilder();
        int n = s.length();
        int cycle = 2 * numRows - 2;
        for (int r = 0; r < numRows; r++) {
            for (int i = 0; i + r < n; i += cycle) {
                res.append(s.charAt(i + r));
                if (r != 0 && r != numRows - 1 && i + cycle - r < n) {
                    res.append(s.charAt(i + cycle - r));
                }
            }
        }
        return res.toString();
    }
}
```

```python [Python]
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s
        res = []
        n = len(s)
        cycle = 2 * numRows - 2
        for r in range(numRows):
            i = 0
            while i + r < n:
                res.append(s[i + r])
                if r != 0 and r != numRows - 1 and i + cycle - r < n:
                    res.append(s[i + cycle - r])
                i += cycle
        return ''.join(res)
```

```go [Go]
func convert(s string, numRows int) string {
    if numRows == 1 {
        return s
    }
    res := ""
    n := len(s)
    cycle := 2*numRows - 2
    for r := 0; r < numRows; r++ {
        for i := 0; i+r < n; i += cycle {
            res += string(s[i+r])
            if r != 0 && r != numRows-1 && i+cycle-r < n {
                res += string(s[i+cycle-r])
            }
        }
    }
    return res
}
```

```c [C]
#include <string.h>
#include <stdlib.h>

char* convert(char* s, int numRows) {
    int n = strlen(s);
    if (numRows == 1) return s;
    char* res = (char*)malloc(sizeof(char) * (n + 1));
    int k = 0;
    int cycle = 2 * numRows - 2;
    for (int r = 0; r < numRows; r++) {
        for (int i = 0; i + r < n; i += cycle) {
            res[k++] = s[i + r];
            if (r != 0 && r != numRows - 1 && i + cycle - r < n) {
                res[k++] = s[i + cycle - r];
            }
        }
    }
    res[k] = '\0';
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s;
        string res;
        int n = s.size();
        int cycle = 2 * numRows - 2;
        for (int r = 0; r < numRows; r++) {
            for (int i = 0; i + r < n; i += cycle) {
                res += s[i + r];
                if (r != 0 && r != numRows - 1 && i + cycle - r < n) {
                    res += s[i + cycle - r];
                }
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if (numRows === 1) return s;
    let res = '';
    const n = s.length;
    const cycle = 2 * numRows - 2;
    for (let r = 0; r < numRows; r++) {
        for (let i = 0; i + r < n; i += cycle) {
            res += s[i + r];
            if (r !== 0 && r !== numRows - 1 && i + cycle - r < n) {
                res += s[i + cycle - r];
            }
        }
    }
    return res;
};
```

```ts [TypeScript]
function convert(s: string, numRows: number): string {
    if (numRows === 1) return s;
    let res = '';
    const n = s.length;
    const cycle = 2 * numRows - 2;
    for (let r = 0; r < numRows; r++) {
        for (let i = 0; i + r < n; i += cycle) {
            res += s[i + r];
            if (r !== 0 && r !== numRows - 1 && i + cycle - r < n) {
                res += s[i + cycle - r];
            }
        }
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个字符被访问一次。
- **空间复杂度**：`O(n)`，结果字符串占用 `O(n)`（不计返回值则为 `O(1)` 额外空间）。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 按行模拟 | `O(n)` | `O(n)` | 常规实现 |
| 按行直接定位（找周期规律） | `O(n)` | `O(n)` | 常规实现 |

