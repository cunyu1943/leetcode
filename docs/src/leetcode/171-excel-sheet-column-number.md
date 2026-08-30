# [171. Excel 表列序号](https://leetcode.cn/problems/excel-sheet-column-number/)



## 一、题目描述

给你一个字符串 `columnTitle` ，表示 Excel 表格中的列名称。返回 **该列名称对应的列序号** 。

例如：

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...
```



**示例 1：**

```
输入：columnTitle = "A"
输出：1
```

**示例 2：**

```
输入：columnTitle = "AB"
输出：28
```

**示例 3：**

```
输入：columnTitle = "ZY"
输出：701
```

**提示：**

-   `1 <= columnTitle.length <= 7`
-   `columnTitle` 仅由大写英文组成
-   `columnTitle` 在范围 `["A", "FXSHRXW"]` 内



## 二、解答方法

### 2.1 方法一：26 进制转十进制

1. **思路**

这是 168 题的逆运算，标准的 **1-based 26 进制** 转十进制。从左到右遍历，每读一位：`result = result * 26 + (字符 - 'A' + 1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int titleToNumber(String columnTitle) {
        int result = 0;
        for (char c : columnTitle.toCharArray()) {
            result = result * 26 + (c - 'A' + 1);
        }
        return result;
    }
}
```

```python [Python]
class Solution:
    def titleToNumber(self, columnTitle: str) -> int:
        result = 0
        for ch in columnTitle:
            result = result * 26 + (ord(ch) - ord('A') + 1)
        return result
```

```go [Go]
func titleToNumber(columnTitle string) int {
    result := 0
    for _, ch := range columnTitle {
        result = result*26 + (int(ch) - 'A' + 1)
    }
    return result
}
```

```cpp [C++]
class Solution {
public:
    int titleToNumber(string columnTitle) {
        int result = 0;
        for (char c : columnTitle) {
            result = result * 26 + (c - 'A' + 1);
        }
        return result;
    }
};
```

```js [JavaScript]
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
    let result = 0;
    for (const ch of columnTitle) {
        result = result * 26 + (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }
    return result;
};
```

```ts [TypeScript]
/**
 * @param {string} columnTitle
 * @return {number}
 */
function titleToNumber(columnTitle: string): number {
    let result = 0;
    for (const ch of columnTitle) {
        result = result * 26 + (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }
    return result;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，`n` 为字符串长度。
- **空间复杂度**：`O(1)`。

## 三、总结

与 168 题互为逆操作：本题是「列名 → 数字」，168 是「数字 → 列名」。本题是标准 26 进制求值（霍纳法则），注意每位权值 `+1`。
