# [面试题 01.09. 字符串轮转](https://leetcode.cn/problems/string-rotation-lcci/)

## 一、题目描述

字符串轮转。给定两个字符串 `s1` 和 `s2`，请编写代码检查 `s2` 是否为 `s1` 旋转而成（比如 `"waterbottle"` 是 `"erbottlewat"` 的旋转字符串）。

**示例 1：**

```
输入：s1 = "waterbottle", s2 = "erbottlewat"
输出：True
```

**示例 2：**

```
输入：s1 = "aa", s2 = "aba"
输出：False
```

**提示：**

- `0 <= s1.length, s2.length <= 100000`
- 字符串只包含小写字母

---

## 二、解答方法

### 2.1 方法一：拼接后包含判断

**1. 思路**

如果 `s2` 是 `s1` 的旋转字符串，那么将两个 `s1` 拼接起来，`s2` 必定是拼接后的子串。同时要求 `s1` 和 `s2` 长度相等。此方法利用语言内置的字符串包含函数（如 `contains`、`find` 等），时间复杂度取决于包含算法的实现，通常为 `O(n)` 到 `O(n*m)` 之间，但大多数语言使用高效算法（如 KMP）。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isFlipedString(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        String combined = s1 + s1;
        return combined.contains(s2);
    }
}
```

```python [Python]
class Solution:
    def isFlipedString(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        return s2 in s1 + s1
```

```go [Go]
import "strings"
func isFlipedString(s1 string, s2 string) bool {
    if len(s1) != len(s2) {
        return false
    }
    return strings.Contains(s1+s1, s2)
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
bool isFlipedString(char* s1, char* s2) {
    int len1 = strlen(s1), len2 = strlen(s2);
    if (len1 != len2) return false;
    // 构建 s1+s1，但 C 中需要动态分配
    char* combined = (char*)malloc((2*len1+1) * sizeof(char));
    strcpy(combined, s1);
    strcat(combined, s1);
    bool found = (strstr(combined, s2) != NULL);
    free(combined);
    return found;
}
```

```cpp [C++]
class Solution {
public:
    bool isFlipedString(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        return (s1 + s1).find(s2) != string::npos;
    }
};
```

```javascript [JavaScript]
var isFlipedString = function(s1, s2) {
    if (s1.length !== s2.length) return false;
    return (s1 + s1).includes(s2);
};
```

```typescript [TypeScript]
function isFlipedString(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    return (s1 + s1).includes(s2);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`（取决于 `contains`/`find` 的实现，通常为线性时间）。
- **空间复杂度**：`O(n)`，用于存储拼接后的字符串。

---

### 2.2 方法二：模拟旋转（暴力枚举）

**1. 思路**

遍历所有可能的旋转点，将 `s1` 从该点切开并重组成新字符串，与 `s2` 比较。时间复杂度 `O(n^2)`，在字符串长度较大时效率低，但可作为思路展示。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isFlipedString(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int n = s1.length();
        if (n == 0) return true;
        for (int i = 0; i < n; i++) {
            String rotated = s1.substring(i) + s1.substring(0, i);
            if (rotated.equals(s2)) return true;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def isFlipedString(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        n = len(s1)
        if n == 0:
            return True
        for i in range(n):
            if s1[i:] + s1[:i] == s2:
                return True
        return False
```

```go [Go]
func isFlipedString(s1 string, s2 string) bool {
    if len(s1) != len(s2) {
        return false
    }
    n := len(s1)
    if n == 0 {
        return true
    }
    for i := 0; i < n; i++ {
        if s1[i:]+s1[:i] == s2 {
            return true
        }
    }
    return false
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
bool isFlipedString(char* s1, char* s2) {
    int n = strlen(s1);
    if (n != strlen(s2)) return false;
    if (n == 0) return true;
    char* rotated = (char*)malloc((n+1) * sizeof(char));
    for (int i = 0; i < n; i++) {
        // 构建旋转字符串
        int idx = 0;
        for (int j = i; j < n; j++) rotated[idx++] = s1[j];
        for (int j = 0; j < i; j++) rotated[idx++] = s1[j];
        rotated[n] = '\0';
        if (strcmp(rotated, s2) == 0) {
            free(rotated);
            return true;
        }
    }
    free(rotated);
    return false;
}
```

```cpp [C++]
class Solution {
public:
    bool isFlipedString(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        int n = s1.size();
        if (n == 0) return true;
        for (int i = 0; i < n; i++) {
            if (s1.substr(i) + s1.substr(0, i) == s2) return true;
        }
        return false;
    }
};
```

```javascript [JavaScript]
var isFlipedString = function(s1, s2) {
    if (s1.length !== s2.length) return false;
    const n = s1.length;
    if (n === 0) return true;
    for (let i = 0; i < n; i++) {
        if (s1.slice(i) + s1.slice(0, i) === s2) return true;
    }
    return false;
};
```

```typescript [TypeScript]
function isFlipedString(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    const n = s1.length;
    if (n === 0) return true;
    for (let i = 0; i < n; i++) {
        if (s1.slice(i) + s1.slice(0, i) === s2) return true;
    }
    return false;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n^2)`，每个旋转点需要 `O(n)` 来构造字符串。
- **空间复杂度**：`O(n)`，存储旋转后的字符串。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 适用场景       |
| ------------ | ---------- | ---------- | -------------- |
| 拼接 + 包含  | `O(n)`     | `O(n)`     | 推荐，简单高效 |
| 暴力枚举旋转 | `O(n²)`    | `O(n)`     | 仅用于演示思路 |

**推荐**：面试中优先使用 **方法一（拼接 + 包含）**，代码简洁且性能优良。若需要避免额外空间，可考虑其他方法，但本题 `O(n)` 空间通常可接受。