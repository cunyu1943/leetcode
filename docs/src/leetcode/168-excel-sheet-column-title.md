# [168. Excel 表列名称](https://leetcode.cn/problems/excel-sheet-column-title/)



## 一、题目描述

给你一个整数 `columnNumber` ，返回它在 Excel 表中相对应的列名称。

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
输入：columnNumber = 1
输出："A"
```

**示例 2：**

```
输入：columnNumber = 28
输出："AB"
```

**示例 3：**

```
输入：columnNumber = 701
输出："ZY"
```

**提示：**

-   `1 <= columnNumber <= 2³¹ - 1`



## 二、解答方法

### 2.1 方法一：进制转换（26 进制，无 0）

1. **思路**

这是 **1-based 的 26 进制** 转换。难点在于没有 `0` 这个数字：`Z` 代表 26 而非 0。因此每次取模前需先 `columnNumber--`，再取 `columnNumber % 26` 作为当前位（对应 `'A'+rem`），再 `columnNumber /= 26`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String convertToTitle(int columnNumber) {
        StringBuilder sb = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--; // 关键：转化为 0-based
            sb.append((char) ('A' + columnNumber % 26));
            columnNumber /= 26;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        res = []
        while columnNumber > 0:
            columnNumber -= 1
            res.append(chr(ord('A') + columnNumber % 26))
            columnNumber //= 26
        return ''.join(reversed(res))
```

```go [Go]
func convertToTitle(columnNumber int) string {
    var res []byte
    for columnNumber > 0 {
        columnNumber--
        res = append([]byte{byte('A' + columnNumber%26)}, res...)
        columnNumber /= 26
    }
    return string(res)
}
```

```cpp [C++]
class Solution {
public:
    string convertToTitle(int columnNumber) {
        string res;
        while (columnNumber > 0) {
            columnNumber--;
            res = char('A' + columnNumber % 26) + res;
            columnNumber /= 26;
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
    let res = '';
    while (columnNumber > 0) {
        columnNumber--;
        res = String.fromCharCode('A'.charCodeAt(0) + (columnNumber % 26)) + res;
        columnNumber = Math.floor(columnNumber / 26);
    }
    return res;
};
```

```ts [TypeScript]
/**
 * @param {number} columnNumber
 * @return {string}
 */
function convertToTitle(columnNumber: number): string {
    let res = '';
    while (columnNumber > 0) {
        columnNumber--;
        res = String.fromCharCode('A'.charCodeAt(0) + (columnNumber % 26)) + res;
        columnNumber = Math.floor(columnNumber / 26);
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(log₂₆ n)`。
- **空间复杂度**：`O(log₂₆ n)`。

## 三、总结

本质是 26 进制但没有 0，所以每轮先减 1 再取模。对应逆操作是 171 题（列名称转数字），同样注意无 0 进制的处理。
