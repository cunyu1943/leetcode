# [214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/)



## 一、题目描述

给定一个字符串 `s`，你可以通过在字符串前面添加字符将其转换为 **回文串** 。找到并返回可以用这种方式转换得到的 **最短回文串** 。

**示例 1：**

```
输入：s = "aacecaaa"
输出："aaacecaaa"
解释：在前面添加 "aa" 得到回文串 "aaacecaaa"。
```

**示例 2：**

```
输入：s = "abcd"
输出："dcbabcd"
解释：在前面添加 "dcb" 得到回文串 "dcbabcd"。
```

**提示：**

-   `0 <= s.length <= 5 * 10⁴`
-   `s` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：KMP（next 数组）

1. **思路**

目标：找到 `s` 的 **最长回文前缀**，把剩余后缀反转后补到前面。

巧妙做法：构造新串 `t = s + "#" + reverse(s)`（`#` 为分隔符，避免跨界匹配）。求 `t` 的 KMP 前缀函数（next）值 `L`，即 `t` 的最长相同前后缀长度 —— 它恰好等于 `s` 的最长回文前缀长度。

答案 = `reverse(s[L:]) + s`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String shortestPalindrome(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        String t = s + "#" + rev;
        int[] next = new int[t.length()];
        for (int i = 1; i < t.length(); i++) {
            int j = next[i - 1];
            while (j > 0 && t.charAt(i) != t.charAt(j)) {
                j = next[j - 1];
            }
            if (t.charAt(i) == t.charAt(j)) j++;
            next[i] = j;
        }
        int L = next[t.length() - 1];
        return rev.substring(0, s.length() - L) + s;
    }
}
```

```python [Python]
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        rev = s[::-1]
        t = s + '#' + rev
        # KMP 前缀函数
        next_arr = [0] * len(t)
        for i in range(1, len(t)):
            j = next_arr[i - 1]
            while j > 0 and t[i] != t[j]:
                j = next_arr[j - 1]
            if t[i] == t[j]:
                j += 1
            next_arr[i] = j
        L = next_arr[-1]          # s 的最长回文前缀长度
        return rev[:len(s) - L] + s
```

```go [Go]
func shortestPalindrome(s string) string {
    rev := reverse(s)
    t := s + "#" + rev
    next := make([]int, len(t))
    for i := 1; i < len(t); i++ {
        j := next[i-1]
        for j > 0 && t[i] != t[j] {
            j = next[j-1]
        }
        if t[i] == t[j] {
            j++
        }
        next[i] = j
    }
    L := next[len(t)-1]
    return rev[:len(s)-L] + s
}

func reverse(s string) string {
    b := []rune(s)
    for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
        b[i], b[j] = b[j], b[i]
    }
    return string(b)
}
```

```cpp [C++]
class Solution {
public:
    string shortestPalindrome(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        string t = s + "#" + rev;
        vector<int> next(t.size(), 0);
        for (int i = 1; i < t.size(); i++) {
            int j = next[i - 1];
            while (j > 0 && t[i] != t[j]) j = next[j - 1];
            if (t[i] == t[j]) j++;
            next[i] = j;
        }
        int L = next[t.size() - 1];
        return rev.substr(0, s.size() - L) + s;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function (s) {
    const rev = s.split('').reverse().join('');
    const t = s + '#' + rev;
    const next = new Array(t.length).fill(0);
    for (let i = 1; i < t.length; i++) {
        let j = next[i - 1];
        while (j > 0 && t[i] !== t[j]) j = next[j - 1];
        if (t[i] === t[j]) j++;
        next[i] = j;
    }
    const L = next[t.length - 1];
    return rev.substring(0, s.length - L) + s;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {string}
 */
function shortestPalindrome(s: string): string {
    const rev = s.split('').reverse().join('');
    const t = s + '#' + rev;
    const next = new Array(t.length).fill(0);
    for (let i = 1; i < t.length; i++) {
        let j = next[i - 1];
        while (j > 0 && t[i] !== t[j]) j = next[j - 1];
        if (t[i] === t[j]) j++;
        next[i] = j;
    }
    const L = next[t.length - 1];
    return rev.substring(0, s.length - L) + s;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（KMP 前缀函数）。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：双指针从大到小（朴素+优化）

1. **思路**

从最长可能长度 `n` 开始递减，检查 `s[0..i]` 是否为回文；第一个满足的即为最长回文前缀。朴素检查最坏 `O(n²)`（如 `"aaaaa..."`），大数据会超时，仅适合理解思路。

2. **代码实现（Python）**

```python
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        n = len(s)
        for i in range(n, 0, -1):
            if s[:i] == s[:i][::-1]:
                return s[i:][::-1] + s
        return ""
```

3. **复杂度分析**

- **时间复杂度**：最坏 `O(n²)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间 | 评价 |
| ---- | ---- | ---- |
| KMP 前缀函数 | `O(n)` | 最优，推荐 |
| 双指针暴力 | `O(n²)` | 会超时 |

KMP 法的巧妙之处：`s + "#" + reverse(s)` 的 **最长相同前后缀** 恰好对应 `s` 的最长回文前缀。分隔符 `#` 保证前后缀不会跨越原串边界而误匹配。这是 KMP 在回文问题中的经典应用。
