# [LCR 018. 验证回文串](https://leetcode.cn/problems/dwk0au/)



## 一、题目描述

给定一个字符串 `s` ，验证 `s` 是否是 **回文串** ，只考虑字母和数字字符，可以忽略字母的大小写。

本题中，将空字符串定义为有效的回文串。



**示例 1：**

```
输入: s = "A man, a plan, a canal: Panama"
输出: true
解释："amanaplanacanalpanama" 是回文串。
```

**示例 2：**

```
输入: s = "race a car"
输出: false
解释："raceacar" 不是回文串。
```

**示例 3：**

```
输入: s = " "
输出: true
```

**提示：**

- `1 <= s.length <= 2 * 10⁵`
- `s` 仅由可打印的 ASCII 字符组成



## 二、解答方法

### 2.1 方法一：双指针（原地判断）

1. **思路**

左右两个指针 `l`、`r` 向中间靠拢：

- 跳过非字母数字字符（用 `isalnum` 或手动判断）；
- 比较时统一转小写（或大写）；
- 若不相等直接返回 `false`，全部相等则为真。

时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
                return false;
            l++; r--;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, s: str) -> bool:
        import re
        t = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
        return t == t[::-1]
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};
```

```go [Go]
func isPalindrome(s string) bool {
    l, r := 0, len(s)-1
    for l < r {
        for l < r && !isAlnum(s[l]) {
            l++
        }
        for l < r && !isAlnum(s[r]) {
            r--
        }
        if lower(s[l]) != lower(s[r]) {
            return false
        }
        l++
        r--
    }
    return true
}

func isAlnum(c byte) bool {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
}
func lower(c byte) byte {
    if c >= 'A' && c <= 'Z' {
        return c + 32
    }
    return c
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
        while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++; r--;
    }
    return true;
};
```

```c [C]
#include <ctype.h>
#include <string.h>

int isPalindrome(char* s) {
    int l = 0, r = (int)strlen(s) - 1;
    while (l < r) {
        while (l < r && !isalnum((unsigned char)s[l])) l++;
        while (l < r && !isalnum((unsigned char)s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return 0;
        l++; r--;
    }
    return 1;
}
```

```ts [TypeScript]
function isPalindrome(s: string): boolean {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
        while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++; r--;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（Python 的 `re` 写法为 `O(n)` 额外空间，可改用双指针达到 `O(1)`）。

### 2.2 方法二：清洗后反转比较

1. **思路**

先提取所有字母数字并统一小写，得到新字符串 `t`，然后判断 `t == t[::-1]`。实现最直观，但需额外 `O(n)` 空间。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray())
            if (Character.isLetterOrDigit(c))
                sb.append(Character.toLowerCase(c));
        int l = 0, r = sb.length() - 1;
        while (l < r) {
            if (sb.charAt(l++) != sb.charAt(r--)) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, s: str) -> bool:
        t = ''.join(ch.lower() for ch in s if ch.isalnum())
        return t == t[::-1]
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(string s) {
        string t;
        for (char c : s)
            if (isalnum(c)) t += tolower(c);
        int l = 0, r = t.size() - 1;
        while (l < r) if (t[l++] != t[r--]) return false;
        return true;
    }
};
```

```go [Go]
func isPalindrome(s string) bool {
    var t []byte
    for _, c := range s {
        if (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') {
            if c >= 'A' && c <= 'Z' {
                c += 32
            }
            t = append(t, byte(c))
        }
    }
    for i, j := 0, len(t)-1; i < j; i, j = i+1, j-1 {
        if t[i] != t[j] {
            return false
        }
    }
    return true
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    const t = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let l = 0, r = t.length - 1;
    while (l < r) {
        if (t[l++] !== t[r--]) return false;
    }
    return true;
};
```

```c [C]
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

int isPalindrome(char* s) {
    int n = (int)strlen(s);
    char* t = (char*)malloc((n + 1) * sizeof(char));
    int k = 0;
    for (int i = 0; i < n; i++)
        if (isalnum((unsigned char)s[i])) t[k++] = tolower(s[i]);
    t[k] = '\0';
    int l = 0, r = k - 1;
    while (l < r) if (t[l++] != t[r--]) { free(t); return 0; }
    free(t);
    return 1;
}
```

```ts [TypeScript]
function isPalindrome(s: string): boolean {
    const t = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let l = 0, r = t.length - 1;
    while (l < r) {
        if (t[l++] !== t[r--]) return false;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（清洗后的字符串）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（原地） | `O(n)` | `O(1)` | 最优，推荐 |
| 清洗 + 反转比较 | `O(n)` | `O(n)` | 实现简单 |

验证回文串的关键是把「过滤非字母数字 + 忽略大小写」封装好，然后用双指针从两端向中间比较。

