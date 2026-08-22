# [65. 有效数字](https://leetcode.cn/problems/valid-number/)



## 一、题目描述

有效数字（按顺序）可以分成以下几个部分：

1. 一个 **小数** 或者 **整数**
2. （可选）一个 `'e'` 或 `'E'`，后面跟着一个 **整数**

小数（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（`'+'` 或 `'-'`）
2. 下述格式之一：
   - 至少一个数字，后面跟着一个点 `'.'`
   - 至少一个数字，后面跟着一个点 `'.'`，后面再跟着至少一个数字
   - 一个点 `'.'`，后面跟着至少一个数字

整数（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（`'+'` 或 `'-'`）
2. 至少一位数字

部分有效数字列举如下：`["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7"]`。

部分无效数字列举如下：`["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]`。

给你一个字符串 `s`，如果 `s` 是一个 **有效数字** 返回 `true`，否则返回 `false`。



**示例 1：**

```
输入：s = "0"
输出：true
```

**示例 2：**

```
输入：s = "e"
输出：false
```

**示例 3：**

```
输入：s = "."
输出：false
```

**提示：**

-   `1 <= s.length <= 20`
-   `s` 仅含英文字母（大写和小写）、数字（`0-9`）、加号 `'+'`、减号 `'-'`、空格 `' '` 或者点 `'.'`。



## 二、解答方法

### 2.1 方法一：有限状态机（DFA）


1. **思路**

定义状态：起始、符号、整数部分、小数点（前无数字）、小数部分、指数 e、指数符号、指数数字、结尾空格。按字符类型转移，非法转移即返回 false，最终需在合法结束态。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isNumber(String s) {
        int state = 0;
        for (char c : s.toCharArray()) {
            if (c == ' ') {
                if (state == 0 || state == 3 || state == 5 || state == 8) {}
                else if (state == 1 || state == 2 || state == 4 || state == 6 || state == 7) state = 8;
                else return false;
            } else if (c == '+' || c == '-') {
                if (state == 0 || state == 5) state = 1;
                else return false;
            } else if (c >= '0' && c <= '9') {
                if (state == 0 || state == 1 || state == 2) state = 2;
                else if (state == 3 || state == 4) state = 4;
                else if (state == 5 || state == 6) state = 7;
                else if (state == 7) state = 7;
                else if (state == 8) state = 8;
                else return false;
            } else if (c == '.') {
                if (state == 0 || state == 1 || state == 2) state = 3;
                else return false;
            } else if (c == 'e' || c == 'E') {
                if (state == 2 || state == 4 || state == 3) state = 5;
                else return false;
            } else return false;
        }
        return state == 2 || state == 3 || state == 4 || state == 7 || state == 8;
    }
}
```

```python [Python]
class Solution:
    def isNumber(self, s: str) -> bool:
        state = 0
        for c in s:
            if c == ' ':
                if state in (1, 2, 4, 6, 7): state = 8
                elif state not in (0, 3, 5, 8): return False
            elif c in '+-':
                if state in (0, 5): state = 1
                else: return False
            elif c.isdigit():
                if state in (0, 1, 2): state = 2
                elif state in (3, 4): state = 4
                elif state in (5, 6, 7): state = 7
                elif state == 8: state = 8
                else: return False
            elif c == '.':
                if state in (0, 1, 2): state = 3
                else: return False
            elif c in 'eE':
                if state in (2, 3, 4): state = 5
                else: return False
            else:
                return False
        return state in (2, 3, 4, 7, 8)
```

```go [Go]
func isNumber(s string) bool {
    state := 0
    for _, c := range s {
        switch {
        case c == ' ':
            if state == 1 || state == 2 || state == 4 || state == 6 || state == 7 { state = 8 }
            if state != 0 && state != 3 && state != 5 && state != 8 { return false }
        case c == '+' || c == '-':
            if state == 0 || state == 5 { state = 1 } else { return false }
        case c >= '0' && c <= '9':
            if state == 0 || state == 1 || state == 2 { state = 2 }
            if state == 3 || state == 4 { state = 4 }
            if state == 5 || state == 6 { state = 7 }
            if state == 7 { state = 7 }
            if state == 8 { state = 8 }
        case c == '.':
            if state == 0 || state == 1 || state == 2 { state = 3 } else { return false }
        case c == 'e' || c == 'E':
            if state == 2 || state == 3 || state == 4 { state = 5 } else { return false }
        default:
            return false
        }
    }
    return state == 2 || state == 3 || state == 4 || state == 7 || state == 8
}
```

```c [C]
bool isNumber(char* s) {
    int state = 0;
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == ' ') {
            if (state == 1 || state == 2 || state == 4 || state == 6 || state == 7) state = 8;
            else if (state != 0 && state != 3 && state != 5 && state != 8) return false;
        } else if (c == '+' || c == '-') {
            if (state == 0 || state == 5) state = 1; else return false;
        } else if (c >= '0' && c <= '9') {
            if (state == 0 || state == 1 || state == 2) state = 2;
            else if (state == 3 || state == 4) state = 4;
            else if (state == 5 || state == 6) state = 7;
            else if (state == 7) state = 7;
            else if (state == 8) state = 8;
            else return false;
        } else if (c == '.') {
            if (state == 0 || state == 1 || state == 2) state = 3; else return false;
        } else if (c == 'e' || c == 'E') {
            if (state == 2 || state == 3 || state == 4) state = 5; else return false;
        } else return false;
    }
    return state == 2 || state == 3 || state == 4 || state == 7 || state == 8;
}
```

```cpp [C++]
class Solution {
public:
    bool isNumber(string s) {
        int state = 0;
        for (char c : s) {
            if (c == ' ') {
                if (state == 1 || state == 2 || state == 4 || state == 6 || state == 7) state = 8;
                else if (state != 0 && state != 3 && state != 5 && state != 8) return false;
            } else if (c == '+' || c == '-') {
                if (state == 0 || state == 5) state = 1; else return false;
            } else if (c >= '0' && c <= '9') {
                if (state == 0 || state == 1 || state == 2) state = 2;
                else if (state == 3 || state == 4) state = 4;
                else if (state == 5 || state == 6) state = 7;
                else if (state == 7) state = 7;
                else if (state == 8) state = 8;
                else return false;
            } else if (c == '.') {
                if (state == 0 || state == 1 || state == 2) state = 3; else return false;
            } else if (c == 'e' || c == 'E') {
                if (state == 2 || state == 3 || state == 4) state = 5; else return false;
            } else return false;
        }
        return state == 2 || state == 3 || state == 4 || state == 7 || state == 8;
    }
};
```

```javascript [JavaScript]
var isNumber = function(s) {
    let state = 0;
    for (const c of s) {
        if (c === ' ') {
            if (state === 1 || state === 2 || state === 4 || state === 6 || state === 7) state = 8;
            else if (state !== 0 && state !== 3 && state !== 5 && state !== 8) return false;
        } else if (c === '+' || c === '-') {
            if (state === 0 || state === 5) state = 1; else return false;
        } else if (c >= '0' && c <= '9') {
            if (state === 0 || state === 1 || state === 2) state = 2;
            else if (state === 3 || state === 4) state = 4;
            else if (state === 5 || state === 6) state = 7;
            else if (state === 7) state = 7;
            else if (state === 8) state = 8;
            else return false;
        } else if (c === '.') {
            if (state === 0 || state === 1 || state === 2) state = 3; else return false;
        } else if (c === 'e' || c === 'E') {
            if (state === 2 || state === 3 || state === 4) state = 5; else return false;
        } else return false;
    }
    return state === 2 || state === 3 || state === 4 || state === 7 || state === 8;
};
```

```typescript [TypeScript]
function isNumber(s: string): boolean {
    let state = 0;
    for (const c of s) {
        if (c === ' ') {
            if (state === 1 || state === 2 || state === 4 || state === 6 || state === 7) state = 8;
            else if (state !== 0 && state !== 3 && state !== 5 && state !== 8) return false;
        } else if (c === '+' || c === '-') {
            if (state === 0 || state === 5) state = 1; else return false;
        } else if (c >= '0' && c <= '9') {
            if (state === 0 || state === 1 || state === 2) state = 2;
            else if (state === 3 || state === 4) state = 4;
            else if (state === 5 || state === 6) state = 7;
            else if (state === 7) state = 7;
            else if (state === 8) state = 8;
            else return false;
        } else if (c === '.') {
            if (state === 0 || state === 1 || state === 2) state = 3; else return false;
        } else if (c === 'e' || c === 'E') {
            if (state === 2 || state === 3 || state === 4) state = 5; else return false;
        } else return false;
    }
    return state === 2 || state === 3 || state === 4 || state === 7 || state === 8;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，只遍历一次字符串。
- **空间复杂度**：`O(1)`**，只用状态变量。

### 2.2 方法二：正则表达式


1. **思路**

利用正则匹配「可能带符号的整数/小数，可选 e/E + 整数」的完整模式，并去除首尾空格后整体匹配。代码最短但可读性略差。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isNumber(String s) {
        return s.trim().matches("^[+-]?(\\d+\\.?\\d*|\\.\\d+)([eE][+-]?\\d+)?$");
    }
}
```

```python [Python]
import re
class Solution:
    def isNumber(self, s: str) -> bool:
        return bool(re.fullmatch(r'[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?', s.strip()))
```

```go [Go]
import "regexp"
func isNumber(s string) bool {
    re := regexp.MustCompile(`^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$`)
    for len(s) > 0 && (s[0] == ' ' || s[len(s)-1] == ' ') {
        s = s[1 : len(s)-1]
    }
    return re.MatchString(s)
}
```

```c [C]
bool isNumber(char* s) {
    // 正则方案在 C 中需借助库，完整实现略
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool isNumber(string s) {
        regex re("^[+-]?(\\d+\\.?\\d*|\\.\\d+)([eE][+-]?\\d+)?$");
        s = regex_replace(s, regex("^\\s+|\\s+$"), "");
        return regex_match(s, re);
    }
};
```

```javascript [JavaScript]
var isNumber = function(s) {
    return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s.trim());
};
```

```typescript [TypeScript]
function isNumber(s: string): boolean {
    return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s.trim());
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，正则匹配一次（含去空格）。
- **空间复杂度**：`O(1)`**，不计正则引擎开销。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 有限状态机（DFA） | `O(n)` | `O(1)` | 逻辑严谨，无依赖 |
| 正则表达式 | `O(n)` | `O(1)` | 代码最简，可读性差 |
