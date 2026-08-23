# [LCR 002. 二进制求和](https://leetcode.cn/problems/JFETK5/)



## 一、题目描述

给定两个 01 字符串 `a` 和 `b`，请计算它们的和，并以二进制字符串的形式输出。

输入为 **非空** 字符串且只包含数字 `1` 和 `0`。



**示例 1：**

```
输入: a = "11", b = "10"
输出: "101"
```

**示例 2：**

```
输入: a = "1010", b = "1011"
输出: "10101"
```

**提示：**

- 每个字符串仅由字符 `'0'` 或 `'1'` 组成。
- `1 <= a.length, b.length <= 10⁴`
- 字符串如果不是 `"0"`，就都不含前导零。



## 二、解答方法

### 2.1 方法一：模拟竖式加法

1. **思路**

从两个字符串的末尾（最低位）开始，逐位相加并维护进位 `carry`：

- 用双指针 `i`、`j` 分别指向 `a`、`b` 的末尾；
- 当前位的和 `sum = (i>=0 ? a[i]-'0' : 0) + (j>=0 ? b[j]-'0' : 0) + carry`；
- 该位结果 `sum % 2` 拼到答案，新进位 `carry = sum / 2`；
- 指针前移，直到两串都遍历完且 `carry == 0`；
- 最后把结果反转（因为是从低位往高位拼的）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int i = a.length() - 1, j = b.length() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int x = i >= 0 ? a.charAt(i--) - '0' : 0;
            int y = j >= 0 ? b.charAt(j--) - '0' : 0;
            int sum = x + y + carry;
            sb.append(sum % 2);
            carry = sum / 2;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        i, j, carry = len(a) - 1, len(b) - 1, 0
        res = []
        while i >= 0 or j >= 0 or carry:
            x = int(a[i]) if i >= 0 else 0
            y = int(b[j]) if j >= 0 else 0
            s = x + y + carry
            res.append(str(s % 2))
            carry = s // 2
            i -= 1
            j -= 1
        return "".join(reversed(res))
```

```cpp [C++]
class Solution {
public:
    string addBinary(string a, string b) {
        string res;
        int i = a.size() - 1, j = b.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry) {
            int x = i >= 0 ? a[i--] - '0' : 0;
            int y = j >= 0 ? b[j--] - '0' : 0;
            int sum = x + y + carry;
            res += to_string(sum % 2);
            carry = sum / 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```go [Go]
func addBinary(a string, b string) string {
    i, j, carry := len(a)-1, len(b)-1, 0
    var res []byte
    for i >= 0 || j >= 0 || carry > 0 {
        x, y := 0, 0
        if i >= 0 {
            x = int(a[i] - '0')
            i--
        }
        if j >= 0 {
            y = int(b[j] - '0')
            j--
        }
        s := x + y + carry
        res = append(res, byte('0'+s%2))
        carry = s / 2
    }
    for l, r := 0, len(res)-1; l < r; l, r = l+1, r-1 {
        res[l], res[r] = res[r], res[l]
    }
    return string(res)
}
```

```js [JavaScript]
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    let res = "";
    while (i >= 0 || j >= 0 || carry > 0) {
        const x = i >= 0 ? a[i--] - '0' : 0;
        const y = j >= 0 ? b[j--] - '0' : 0;
        const s = x + y + carry;
        res = (s % 2) + res;
        carry = Math.floor(s / 2);
    }
    return res;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

char* addBinary(char* a, char* b) {
    int i = strlen(a) - 1, j = strlen(b) - 1, carry = 0;
    char* res = (char*)malloc((i + j + 3) * sizeof(char));
    int k = 0;
    while (i >= 0 || j >= 0 || carry > 0) {
        int x = i >= 0 ? a[i--] - '0' : 0;
        int y = j >= 0 ? b[j--] - '0' : 0;
        int s = x + y + carry;
        res[k++] = (s % 2) + '0';
        carry = s / 2;
    }
    for (int l = 0, r = k - 1; l < r; l++, r--) {
        char t = res[l]; res[l] = res[r]; res[r] = t;
    }
    res[k] = '\0';
    return res;
}
```

```ts [TypeScript]
function addBinary(a: string, b: string): string {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    let res = "";
    while (i >= 0 || j >= 0 || carry > 0) {
        const x = i >= 0 ? +a[i--] : 0;
        const y = j >= 0 ? +b[j--] : 0;
        const s = x + y + carry;
        res = (s % 2) + res;
        carry = Math.floor(s / 2);
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(max(|a|, |b|))`，遍历较长串一次。
- **空间复杂度**：`O(max(|a|, |b|))`，存储结果字符串。

### 2.2 方法二：转整数相加（仅限小额）

1. **思路**

把两个二进制串用语言内置的「二进制解析」转成整数后相加，再转回二进制串。代码极短，但 **仅适用于长度较小的输入**（如 `a`、`b` 不超过 32/53 位），本题长度可达 `10⁴`，会溢出，仅作思路对比，不推荐用于本题。

2. **代码实现**

:::::: code-group

```python [Python]
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return bin(int(a, 2) + int(b, 2))[2:]
```

```javascript [JavaScript]
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    // 仅适用于较短输入，长串会丢失精度
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(max(|a|, |b|))`，但受整数精度限制。
- **空间复杂度**：`O(max(|a|, |b|))`。
- **局限**：`a.length`、`b.length` 达 `10⁴` 时，普通整数无法表示，故不适用本题。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 模拟竖式加法 | `O(max(n,m))` | `O(max(n,m))` | 通用，推荐 |
| 转整数相加 | `O(max(n,m))` | `O(max(n,m))` | 代码短但受精度限制 |

实际解题务必使用模拟竖式加法，逐位处理进位，避免依赖大整数精度。
