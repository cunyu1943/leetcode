# [LCR 032. 有效的字母异位词](https://leetcode.cn/problems/dKk3P7/)



## 一、题目描述

给定两个字符串 `s` 和 `t` ，编写一个函数来判断它们是不是一组变位词（字母异位词）。

**注意：** 若 `s` 和 `t` 中每个字符出现的次数都相同，则称 `s` 和 `t` 互为变位词。



**示例 1：**

```
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2：**

```
输入: s = "rat", t = "car"
输出: false
```

**提示：**

- `1 <= s.length, t.length <= 5 * 10⁴`
- `s` 和 `t` 仅包含小写字母



## 二、解答方法

### 2.1 方法一：哈希计数

1. **思路**

- 先判断两字符串长度是否相等，不等直接返回 `false`；
- 用计数数组统计 `s` 中每个字符出现次数；
- 遍历 `t`，每遇到一个字符把计数减 1，若出现负数说明 `t` 中存在 `s` 没有的多余字符，返回 `false`。

时间 `O(n)`，空间 `O(1)`（26 个字母）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c - 'a']++;
        for (char c : t.toCharArray()) {
            cnt[c - 'a']--;
            if (cnt[c - 'a'] < 0) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        cnt = [0] * 26
        for c in s:
            cnt[ord(c) - ord('a')] += 1
        for c in t:
            cnt[ord(c) - ord('a')] -= 1
            if cnt[ord(c) - ord('a')] < 0:
                return False
        return True
```

```cpp [C++]
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int cnt[26] = {0};
        for (char c : s) cnt[c - 'a']++;
        for (char c : t) if (--cnt[c - 'a'] < 0) return false;
        return true;
    }
};
```

```go [Go]
func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }
    cnt := [26]int{}
    for i := 0; i < len(s); i++ {
        cnt[s[i]-'a']++
    }
    for i := 0; i < len(t); i++ {
        cnt[t[i]-'a']--
        if cnt[t[i]-'a'] < 0 {
            return false
        }
    }
    return true
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) return false;
    const cnt = new Array(26).fill(0);
    for (const c of s) cnt[c.charCodeAt(0) - 97]++;
    for (const c of t) {
        cnt[c.charCodeAt(0) - 97]--;
        if (cnt[c.charCodeAt(0) - 97] < 0) return false;
    }
    return true;
};
```

```c [C]
#include <string.h>

int isAnagram(char* s, char* t) {
    if (strlen(s) != strlen(t)) return 0;
    int cnt[26] = {0};
    for (int i = 0; s[i]; i++) cnt[s[i] - 'a']++;
    for (int i = 0; t[i]; i++) {
        cnt[t[i] - 'a']--;
        if (cnt[t[i] - 'a'] < 0) return 0;
    }
    return 1;
}
```

```ts [TypeScript]
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const cnt: number[] = new Array(26).fill(0);
    for (const c of s) cnt[c.charCodeAt(0) - 97]++;
    for (const c of t) {
        cnt[c.charCodeAt(0) - 97]--;
        if (cnt[c.charCodeAt(0) - 97] < 0) return false;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`，固定 26 个计数器。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哈希计数 | `O(n)` | `O(1)` | 最优，推荐 |

字母异位词的本质是「字符出现频次完全相同」，用长度预检 + 计数增减即可在 `O(n)` 内判定。

