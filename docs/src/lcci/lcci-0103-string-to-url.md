# [面试题 01.03. URL化](https://leetcode.cn/problems/string-to-url-lcci/)

## 一、题目描述

URL化。编写一种方法，将字符串中的空格全部替换为 `%20`。假定该字符串尾部有足够的空间存放新增字符，并且知道字符串的“真实”长度（即原字符串长度，不包含尾部填充）。使用 Java 实现的话，请使用字符数组实现，以便直接在数组上操作。

**示例 1：**

```
输入：s = "Mr John Smith    ", length = 13
输出："Mr%20John%20Smith"
```

**示例 2：**

```
输入：s = "               ", length = 5
输出："%20%20%20%20%20"
```

**提示：**

- `0 <= length <= s.length <= 50000`
- `s` 由英文字母、空格和尾部填充组成（尾部填充为多余空格）

---

## 二、解答方法

### 2.1 方法一：使用语言内置字符串替换（简洁）

**1. 思路**

直接截取前 `length` 个字符，然后使用语言提供的字符串替换方法（如 `replace` 或 `replaceAll`）将空格替换为 `%20`。此方法代码简洁，但内部仍会创建新字符串，适用于绝大多数语言。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String replaceSpaces(String s, int length) {
        return s.substring(0, length).replace(" ", "%20");
    }
}
```

```python [Python]
class Solution:
    def replaceSpaces(self, s: str, length: int) -> str:
        return s[:length].replace(" ", "%20")
```

```go [Go]
import "strings"
func replaceSpaces(s string, length int) string {
    return strings.ReplaceAll(s[:length], " ", "%20")
}
```

```c [C]
#include <stdlib.h>
#include <string.h>
char* replaceSpaces(char* s, int length) {
    char* sub = (char*)malloc((length+1) * sizeof(char));
    strncpy(sub, s, length);
    sub[length] = '\0';
    // 计算所需空间
    int spaceCount = 0;
    for (int i = 0; i < length; i++) if (sub[i] == ' ') spaceCount++;
    int newLen = length + spaceCount * 2;
    char* res = (char*)malloc((newLen+1) * sizeof(char));
    int idx = 0;
    for (int i = 0; i < length; i++) {
        if (sub[i] == ' ') {
            res[idx++] = '%';
            res[idx++] = '2';
            res[idx++] = '0';
        } else {
            res[idx++] = sub[i];
        }
    }
    res[newLen] = '\0';
    free(sub);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string replaceSpaces(string s, int length) {
        string sub = s.substr(0, length);
        size_t pos = 0;
        while ((pos = sub.find(" ", pos)) != string::npos) {
            sub.replace(pos, 1, "%20");
            pos += 3;
        }
        return sub;
    }
};
```

```javascript [JavaScript]
var replaceSpaces = function(s, length) {
    return s.slice(0, length).replace(/ /g, '%20');
};
```

```typescript [TypeScript]
function replaceSpaces(s: string, length: number): string {
    return s.slice(0, length).replace(/ /g, '%20');
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(length)`，替换操作需遍历一次。
- **空间复杂度**：`O(length)`（结果字符串）。

---

### 2.2 方法二：双指针原地替换（模拟字符数组）

**1. 思路**

先统计真实长度内空格的数量，计算出新字符串长度 `newLen = length + spaceCount * 2`。然后从后向前遍历原字符串（真实部分），将字符移动到新位置，遇到空格则填入 `%20`。此方法模拟了 Java 字符数组的操作，避免额外的字符串拼接开销。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String replaceSpaces(String s, int length) {
        char[] arr = s.toCharArray();
        int spaceCount = 0;
        for (int i = 0; i < length; i++) {
            if (arr[i] == ' ') spaceCount++;
        }
        int newLen = length + spaceCount * 2;
        char[] res = new char[newLen];
        int idx = newLen - 1;
        for (int i = length - 1; i >= 0; i--) {
            if (arr[i] == ' ') {
                res[idx--] = '0';
                res[idx--] = '2';
                res[idx--] = '%';
            } else {
                res[idx--] = arr[i];
            }
        }
        return new String(res);
    }
}
```

```python [Python]
class Solution:
    def replaceSpaces(self, s: str, length: int) -> str:
        chars = list(s[:length])
        space_count = chars.count(' ')
        new_len = length + space_count * 2
        res = [''] * new_len
        idx = new_len - 1
        for i in range(length - 1, -1, -1):
            if chars[i] == ' ':
                res[idx-2:idx+1] = ['%', '2', '0']
                idx -= 3
            else:
                res[idx] = chars[i]
                idx -= 1
        return ''.join(res)
```

```go [Go]
func replaceSpaces(s string, length int) string {
    arr := []byte(s[:length])
    spaceCount := 0
    for _, c := range arr {
        if c == ' ' { spaceCount++ }
    }
    newLen := length + spaceCount*2
    res := make([]byte, newLen)
    idx := newLen - 1
    for i := length - 1; i >= 0; i-- {
        if arr[i] == ' ' {
            res[idx] = '0'
            res[idx-1] = '2'
            res[idx-2] = '%'
            idx -= 3
        } else {
            res[idx] = arr[i]
            idx--
        }
    }
    return string(res)
}
```

```c [C]
#include <stdlib.h>
#include <string.h>
char* replaceSpaces(char* s, int length) {
    int spaceCount = 0;
    for (int i = 0; i < length; i++) {
        if (s[i] == ' ') spaceCount++;
    }
    int newLen = length + spaceCount * 2;
    char* res = (char*)malloc((newLen+1) * sizeof(char));
    int idx = newLen - 1;
    for (int i = length - 1; i >= 0; i--) {
        if (s[i] == ' ') {
            res[idx--] = '0';
            res[idx--] = '2';
            res[idx--] = '%';
        } else {
            res[idx--] = s[i];
        }
    }
    res[newLen] = '\0';
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string replaceSpaces(string s, int length) {
        int spaceCount = 0;
        for (int i = 0; i < length; i++) {
            if (s[i] == ' ') spaceCount++;
        }
        int newLen = length + spaceCount * 2;
        string res(newLen, ' ');
        int idx = newLen - 1;
        for (int i = length - 1; i >= 0; i--) {
            if (s[i] == ' ') {
                res[idx--] = '0';
                res[idx--] = '2';
                res[idx--] = '%';
            } else {
                res[idx--] = s[i];
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var replaceSpaces = function(s, length) {
    const arr = s.slice(0, length).split('');
    const spaceCount = arr.filter(c => c === ' ').length;
    const newLen = length + spaceCount * 2;
    const res = new Array(newLen);
    let idx = newLen - 1;
    for (let i = length - 1; i >= 0; i--) {
        if (arr[i] === ' ') {
            res[idx--] = '0';
            res[idx--] = '2';
            res[idx--] = '%';
        } else {
            res[idx--] = arr[i];
        }
    }
    return res.join('');
};
```

```typescript [TypeScript]
function replaceSpaces(s: string, length: number): string {
    const arr = s.slice(0, length).split('');
    const spaceCount = arr.filter(c => c === ' ').length;
    const newLen = length + spaceCount * 2;
    const res: string[] = new Array(newLen);
    let idx = newLen - 1;
    for (let i = length - 1; i >= 0; i--) {
        if (arr[i] === ' ') {
            res[idx--] = '0';
            res[idx--] = '2';
            res[idx--] = '%';
        } else {
            res[idx--] = arr[i];
        }
    }
    return res.join('');
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(length)`，两次遍历（统计空格 + 填充）。
- **空间复杂度**：`O(length)`，存储结果字符串（若原地操作则 `O(1)`，但大多数语言字符串不可变）。

---

## 三、总结

| 方法       | 时间复杂度  | 空间复杂度  | 适用场景                   |
| ---------- | ----------- | ----------- | -------------------------- |
| 内置替换   | `O(length)` | `O(length)` | 代码最简洁，推荐日常使用   |
| 双指针模拟 | `O(length)` | `O(length)` | 模拟原题要求，体现算法思想 |

**推荐**：面试中，如果题目要求使用字符数组原地操作，则使用 **方法二（双指针模拟）**；否则使用 **方法一（内置替换）** 更为简洁。两种方法均通过测试。