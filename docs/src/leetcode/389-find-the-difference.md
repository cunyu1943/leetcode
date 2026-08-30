# [389. 找不同](https://leetcode.cn/problems/find-the-difference/)

## 一、题目描述

给定字符串 `s` 和 `t`，`t` 由 `s` 随机打乱后再 **在任意位置添加一个字符** 得到。找出被添加的字符。

**示例：**
```
输入：s = "abcd", t = "abcde"   输出：'e'
输入：s = "", t = "y"            输出：'y'
```

**提示：** `0 <= s.length <= 1000`，`t.length == s.length + 1`，均仅小写字母。

## 二、解答方法

### 方法一：异或（位运算）

**思路：** 把 `s` 和 `t` 所有字符异或起来，成对字符抵消，最后剩下的就是多出的那个字符（因 `x ^ x = 0`，`0 ^ y = y`）。

:::::: code-group

```java [Java]
class Solution {
    public char findTheDifference(String s, String t) {
        int xor = 0;
        for (char c : s.toCharArray()) xor ^= c;
        for (char c : t.toCharArray()) xor ^= c;
        return (char) xor;
    }
}
```

```python [Python]
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        xor = 0
        for c in s: xor ^= ord(c)
        for c in t: xor ^= ord(c)
        return chr(xor)
```

```cpp [C++]
class Solution {
public:
    char findTheDifference(string s, string t) {
        int xor = 0;
        for (char c : s) xor ^= c;
        for (char c : t) xor ^= c;
        return xor;
    }
};
```

```go [Go]
func findTheDifference(s string, t string) byte {
    var xor byte = 0
    for i := 0; i < len(s); i++ { xor ^= s[i] }
    for i := 0; i < len(t); i++ { xor ^= t[i] }
    return xor
}
```

```js [JavaScript]
var findTheDifference = function (s, t) {
    let xor = 0;
    for (const c of s) xor ^= c.charCodeAt(0);
    for (const c of t) xor ^= c.charCodeAt(0);
    return String.fromCharCode(xor);
};
```

::::::

### 方法二：计数（直观）

**思路：** 统计 `s` 各字符频次，遍历 `t` 每遇到一个字符频次 -1，频次变负即多出的字符。

:::::: code-group

```java [Java]
class Solution {
    public char findTheDifference(String s, String t) {
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c - 'a']++;
        for (char c : t.toCharArray()) if (--cnt[c - 'a'] < 0) return c;
        return ' ';
    }
}
```

```python [Python]
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        from collections import Counter
        c = Counter(s)
        for ch in t:
            c[ch] -= 1
            if c[ch] < 0: return ch
        return ' '
```

```cpp [C++]
class Solution {
public:
    char findTheDifference(string s, string t) {
        int cnt[26]={0};
        for(char c:s) cnt[c-'a']++;
        for(char c:t) if(--cnt[c-'a']<0) return c;
        return ' ';
    }
};
```

```go [Go]
func findTheDifference(s string, t string) byte {
    cnt := [26]int{}
    for _, c := range s { cnt[c-'a']++ }
    for _, c := range t { cnt[c-'a']--; if cnt[c-'a'] < 0 { return c } }
    return ' '
}
```

```js [JavaScript]
var findTheDifference = function (s, t) {
    const cnt = new Array(26).fill(0);
    for (const c of s) cnt[c.charCodeAt(0)-97]++;
    for (const c of t) { cnt[c.charCodeAt(0)-97]--; if (cnt[c.charCodeAt(0)-97] < 0) return c; }
};
```

::::::

**复杂度：** 异或/计数均 `O(n)`，空间 `O(1)`（`O(26)`）。

## 三、总结

异或是本题最优解（位运算抵消成对）。本质与 `136 只出现一次的数字` 相同（找唯一不成对元素）。注意统计法需逐字符减，减到负即答案。进阶：若添加可能不止一个字符或为 Unicode，计数法更通用。同类：`383 赎金信`（子集关系），`389` 是「恰好多一个」。
