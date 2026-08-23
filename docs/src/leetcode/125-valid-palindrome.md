# [125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)



## 一、题目描述

如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样，则可以认为该短语是一个 **回文串**。

字母和数字都属于字母数字字符。

给你一个字符串 `s`，如果它是 **回文串**，返回 `true`；否则，返回 `false`。

**示例 1：**

```
输入：s = "A man, a plan, a canal: Panama"
输出：true
解释："amanaplanacanalpanama" 是回文串。
```

**示例 2：**

```
输入：s = "race a car"
输出：false
解释："raceacar" 不是回文串。
```

**提示：**

-   `1 <= s.length <= 2 * 10^5`
-   字符串 `s` 由 ASCII 字符组成



## 二、解答方法

### 2.1 方法一：双指针

1. **思路**

左右两个指针向中间逼近，跳过非字母数字字符，比较两端字符（统一转小写）。若发现不相等则不是回文。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++; right--;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True
```

```go [Go]
func isPalindrome(s string) bool {
    isAlnum := func(c byte) bool {
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9'
    }
    toLower := func(c byte) byte {
        if c >= 'A' && c <= 'Z' { return c + 32 }
        return c
    }
    left, right := 0, len(s)-1
    for left < right {
        for left < right && !isAlnum(s[left]) { left++ }
        for left < right && !isAlnum(s[right]) { right-- }
        if toLower(s[left]) != toLower(s[right]) { return false }
        left++; right--
    }
    return true
}
```

```c [C]
bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++; right--;
        }
        return true;
    }
};
```

```js [JavaScript]
var isPalindrome = function (s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !/[a-z0-9]/i.test(s[left])) left++;
        while (left < right && !/[a-z0-9]/i.test(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++; right--;
    }
    return true;
};
```

```ts [TypeScript]
function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !/[a-z0-9]/i.test(s[left])) left++;
        while (left < right && !/[a-z0-9]/i.test(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++; right--;
    }
    return true;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，双指针各遍历一次。
- **空间复杂度**：`O(1)`，仅用常数指针（Java/Python 的 `charAt`/`lower` 不计额外空间）。

### 2.2 方法二：预处理 + 反转比较

1. **思路**

先过滤出所有字母数字字符并统一转小写，得到纯字符串，再判断是否等于其反转。代码更短，但多占用 `O(n)` 空间。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) sb.append(Character.toLowerCase(c));
        }
        String t = sb.toString();
        return t.equals(sb.reverse().toString());
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, s: str) -> bool:
        t = ''.join(ch.lower() for ch in s if ch.isalnum())
        return t == t[::-1]
```

```go [Go]
func isPalindrome(s string) bool {
    var t []byte
    for i := 0; i < len(s); i++ {
        c := s[i]
        if c >= 'A' && c <= 'Z' { c += 32 }
        if c >= 'a' && c <= 'z' || c >= '0' && c <= '9' { t = append(t, c) }
    }
    for i := 0; i < len(t)/2; i++ {
        if t[i] != t[len(t)-1-i] { return false }
    }
    return true
}
```

```c [C]
bool isPalindrome(char* s) {
    int n = strlen(s), k = 0;
    char* t = (char*)malloc(n + 1);
    for (int i = 0; i < n; i++) {
        char c = s[i];
        if (isalnum(c)) { if (isupper(c)) c = tolower(c); t[k++] = c; }
    }
    t[k] = '\0';
    for (int i = 0; i < k / 2; i++) if (t[i] != t[k - 1 - i]) { free(t); return false; }
    free(t);
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(string s) {
        string t;
        for (char c : s) if (isalnum(c)) t += tolower(c);
        int left = 0, right = t.size() - 1;
        while (left < right) {
            if (t[left++] != t[right--]) return false;
        }
        return true;
    }
};
```

```js [JavaScript]
var isPalindrome = function (s) {
    const t = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return t === t.split('').reverse().join('');
};
```

```ts [TypeScript]
function isPalindrome(s: string): boolean {
    const t = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return t === t.split('').reverse().join('');
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，新建过滤后的字符串。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针 | `O(n)` | `O(1)` | 空间最优，推荐 |
| 预处理 + 反转比较 | `O(n)` | `O(n)` | 代码简洁 |
