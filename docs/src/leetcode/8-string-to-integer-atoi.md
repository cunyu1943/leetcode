# [8. 字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi/)



## 一、题目描述

请你来实现一个 `myAtoi(string s)` 函数，使其能将字符串转换成一个 32 位有符号整数。

函数 `myAtoi(string s)` 的算法如下：

1. **空格：**读入字符串并丢弃无用的前导空格（`" "`）；
2. **符号：**检查下一个字符（假设还未到字符末尾）为 `'-'` 还是 `'+'`。如果两者都不存在，则假定结果为正；
3. **转换：**通过跳过前置零来读取该整数，直到遇到非数字字符或到达字符串的结尾。如果没有读取数字，则结果为 0；
4. **舍入：**如果整数超过 32 位有符号整数范围 `[−2^31, 2^31 − 1]`，需要截断这个整数，使其保持在这个范围内。具体来说，小于 `−2^31` 的整数应该被舍入为 `−2^31`，大于 `2^31 − 1` 的整数应该被舍入为 `2^31 − 1`。

返回整数作为最终结果。



**示例 1：**

```
输入：s = "42"
输出：42
```

**示例 2：**

```
输入：s = " -042"
输出：-42
```

**示例 3：**

```
输入：s = "1337c0d3"
输出：1337
```

**示例 4：**

```
输入：s = "0-1"
输出：0
```

**示例 5：**

```
输入：s = "words and 987"
输出：0
```

**提示：**

-   `0 <= s.length <= 200`
-   `s` 由英文字母（大写和小写）、数字（`0-9`）、`' '`、`'+'`、`'-'` 和 `'.'` 组成



## 二、解答方法

### 2.1 方法一：按步骤状态机（模拟）

1. **思路**

严格按照题目描述的四个步骤逐字符处理，用一个状态记录当前阶段：`start`（起始/空格）→ `signed`（符号）→ `in_number`（数字）→ `end`（结束）。

-   跳过前导空格；
-   读取可选的符号位；
-   逐位读数字并累加 `rev = rev * 10 + digit`，每次累加前判断溢出并直接截断返回；
-   遇到非数字字符或字符串结束即停止。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = s.charAt(i++) == '-' ? -1 : 1;
        }
        int rev = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i++) - '0';
            if (rev > Integer.MAX_VALUE / 10 ||
                (rev == Integer.MAX_VALUE / 10 && digit > 7)) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            rev = rev * 10 + digit;
        }
        return sign * rev;
    }
}
```

```python [Python]
class Solution:
    def myAtoi(self, s: str) -> int:
        i, n = 0, len(s)
        while i < n and s[i] == ' ':
            i += 1
        sign = 1
        if i < n and s[i] in '+-':
            sign = -1 if s[i] == '-' else 1
            i += 1
        rev = 0
        while i < n and s[i].isdigit():
            digit = int(s[i])
            if rev > (2**31 - 1) // 10 or (rev == (2**31 - 1) // 10 and digit > 7):
                return 2**31 - 1 if sign == 1 else -(2**31)
            rev = rev * 10 + digit
            i += 1
        return sign * rev
```

```go [Go]
func myAtoi(s string) int {
    const INT_MAX = 1<<31 - 1
    const INT_MIN = -1 << 31
    i, n := 0, len(s)
    for i < n && s[i] == ' ' {
        i++
    }
    sign := 1
    if i < n && (s[i] == '+' || s[i] == '-') {
        if s[i] == '-' {
            sign = -1
        }
        i++
    }
    rev := 0
    for i < n && s[i] >= '0' && s[i] <= '9' {
        digit := int(s[i] - '0')
        if rev > INT_MAX/10 || (rev == INT_MAX/10 && digit > 7) {
            if sign == 1 {
                return INT_MAX
            }
            return INT_MIN
        }
        rev = rev*10 + digit
        i++
    }
    return sign * rev
}
```

```c [C]
int myAtoi(char* s) {
    int i = 0, n = 0;
    while (s[n]) n++;
    while (i < n && s[i] == ' ') i++;
    int sign = 1;
    if (i < n && (s[i] == '+' || s[i] == '-')) {
        if (s[i] == '-') sign = -1;
        i++;
    }
    int rev = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        int digit = s[i] - '0';
        if (rev > INT_MAX / 10 || (rev == INT_MAX / 10 && digit > 7)) {
            return sign == 1 ? INT_MAX : INT_MIN;
        }
        rev = rev * 10 + digit;
        i++;
    }
    return sign * rev;
}
```

```cpp [C++]
class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.size();
        while (i < n && s[i] == ' ') i++;
        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            sign = s[i++] == '-' ? -1 : 1;
        }
        int rev = 0;
        while (i < n && isdigit(s[i])) {
            int digit = s[i++] - '0';
            if (rev > INT_MAX / 10 || (rev == INT_MAX / 10 && digit > 7)) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            rev = rev * 10 + digit;
        }
        return sign * rev;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    const INT_MAX = 2 ** 31 - 1, INT_MIN = -(2 ** 31);
    let i = 0, n = s.length;
    while (i < n && s[i] === ' ') i++;
    let sign = 1;
    if (i < n && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    let rev = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = s[i] - '0';
        if (rev > INT_MAX / 10 || (rev === INT_MAX / 10 && digit > 7)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }
        rev = rev * 10 + digit;
        i++;
    }
    return sign * rev;
};
```

```ts [TypeScript]
function myAtoi(s: string): number {
    const INT_MAX = 2 ** 31 - 1, INT_MIN = -(2 ** 31);
    let i = 0, n = s.length;
    while (i < n && s[i] === ' ') i++;
    let sign = 1;
    if (i < n && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    let rev = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = s[i] - '0';
        if (rev > INT_MAX / 10 || (rev === INT_MAX / 10 && digit > 7)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }
        rev = rev * 10 + digit;
        i++;
    }
    return sign * rev;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，只需线性扫描字符串一次。
- **空间复杂度**：`O(1)`，只使用常数个变量。

### 2.2 方法二：正则表达式（简洁版）

1. **思路**

利用正则直接提取「可选符号 + 数字串」的模式，代码更短。注意提取出数字后仍需做溢出截断判断。

2. **代码实现**

::::: code-group

```java [Java]
import java.util.regex.*;

class Solution {
    public int myAtoi(String s) {
        String t = s.strip();
        Matcher m = Pattern.compile("^[+-]?\\d+").matcher(t);
        if (!m.find()) return 0;
        String num = m.group();
        int sign = 1;
        if (num.charAt(0) == '+' || num.charAt(0) == '-') {
            sign = num.charAt(0) == '-' ? -1 : 1;
            num = num.substring(1);
        }
        long val = 0;
        for (char c : num.toCharArray()) {
            val = val * 10 + (c - '0');
            if (sign == 1 && val > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (sign == -1 && -val < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        }
        return (int)(sign * val);
    }
}
```

```python [Python]
import re

class Solution:
    def myAtoi(self, s: str) -> int:
        m = re.match(r"^\s*[+-]?\d+", s)
        if not m:
            return 0
        num = m.group().strip()
        try:
            return max(-2**31, min(2**31 - 1, int(num)))
        except ValueError:
            return 0
```

```go [Go]
package main

import (
    "regexp"
    "strconv"
)

func myAtoi(s string) int {
    re := regexp.MustCompile(`^[+-]?\d+`)
    m := re.FindString(s)
    if m == "" {
        return 0
    }
    v, err := strconv.Atoi(m)
    if err != nil {
        if m[0] == '-' {
            return -1 << 31
        }
        return 1<<31 - 1
    }
    if v > 1<<31-1 {
        return 1<<31 - 1
    }
    if v < -1<<31 {
        return -1 << 31
    }
    return v
}
```

```c [C]
/* C 语言标准库不含正则，正则表达式法不直观，推荐使用方法一 */
```

```cpp [C++]
#include <regex>

class Solution {
public:
    int myAtoi(string s) {
        regex re("^[+-]?\\d+");
        smatch m;
        if (!regex_search(s, m, re)) return 0;
        string num = m.str();
        try {
            long long v = stoll(num);
            if (v > INT_MAX) return INT_MAX;
            if (v < INT_MIN) return INT_MIN;
            return (int)v;
        } catch (...) {
            return num[0] == '-' ? INT_MIN : INT_MAX;
        }
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    const m = s.match(/^\s*[+-]?\d+/);
    if (!m) return 0;
    const num = parseInt(m[0], 10);
    if (num > 2 ** 31 - 1) return 2 ** 31 - 1;
    if (num < -(2 ** 31)) return -(2 ** 31);
    return num;
};
```

```ts [TypeScript]
function myAtoi(s: string): number {
    const m = s.match(/^\s*[+-]?\d+/);
    if (!m) return 0;
    const num = parseInt(m[0], 10);
    if (num > 2 ** 31 - 1) return 2 ** 31 - 1;
    if (num < -(2 ** 31)) return -(2 ** 31);
    return num;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，正则匹配与字符串扫描均为线性。
- **空间复杂度**：`O(1)`（不计正则引擎开销）。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 按步骤状态机（模拟） | `O(n)` | `O(1)` | 常规实现 |
| 正则表达式（简洁版） | `O(n)` | `O(1)` | 常规实现 |

