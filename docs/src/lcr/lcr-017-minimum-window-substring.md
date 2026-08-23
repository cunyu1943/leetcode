# [LCR 017. 最小覆盖子串](https://leetcode.cn/problems/M1oyTv/)



## 一、题目描述

给定字符串 `s` 和 `t` ，返回 `s` 中涵盖 `t` 所有字符的最小子串。如果 `s` 中不存在涵盖 `t` 所有字符的子串，则返回空字符串 `""` 。

**注意：**

- 对于 `t` 中重复字符，我们寻找的子字符串中该字符数量必须不少于 `t` 中该字符数量。
- 如果 `s` 中存在这样的子串，我们保证它是唯一的答案。



**示例 1：**

```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```

**示例 2：**

```
输入：s = "a", t = "a"
输出："a"
```

**示例 3：**

```
输入：s = "a", t = "aa"
输出：""
```

**提示：**

- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10⁵`
- `s` 和 `t` 由英文字母组成



## 二、解答方法

### 2.1 方法一：滑动窗口 + 双哈希表

1. **思路**

- 用 `need[128]` 统计 `t` 中每个字符的需求数量，`cnt` 记录还需匹配的字符种类数；
- 右指针 `r` 扩张，把 `s[r]` 纳入窗口，若某字符在窗口中的数量达到需求，则 `cnt--`；
- 当 `cnt == 0`（窗口已覆盖 `t`），尝试收缩左指针 `l`：只要移出 `s[l]` 后窗口仍满足，就 `l++`，并持续更新最小覆盖子串；
- 移出字符时若数量低于需求则 `cnt++`。

时间 `O(m + n)`，每个字符进出窗口一次。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128];
        int cnt = 0;
        for (char c : t.toCharArray()) {
            if (need[c]++ == 0) cnt++;
        }
        int l = 0, ansL = -1, ansLen = Integer.MAX_VALUE;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (need[c] > 0) cnt--;
            need[c]--;
            while (cnt == 0) {
                if (r - l + 1 < ansLen) { ansLen = r - l + 1; ansL = l; }
                char d = s.charAt(l);
                need[d]++;
                if (need[d] > 0) cnt++;
                l++;
            }
        }
        return ansL == -1 ? "" : s.substring(ansL, ansL + ansLen);
    }
}
```

```python [Python]
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        from collections import Counter
        need = Counter(t)
        cnt = len(need)
        l, ans_l, ans_len = 0, -1, float('inf')
        for r, c in enumerate(s):
            if need[c] > 0:
                cnt -= 1
            need[c] -= 1
            while cnt == 0:
                if r - l + 1 < ans_len:
                    ans_len = r - l + 1
                    ans_l = l
                d = s[l]
                need[d] += 1
                if need[d] > 0:
                    cnt += 1
                l += 1
        return "" if ans_l == -1 else s[ans_l:ans_l + ans_len]
```

```cpp [C++]
class Solution {
public:
    string minWindow(string s, string t) {
        int need[128] = {0};
        int cnt = 0;
        for (char c : t) if (need[c]++ == 0) cnt++;
        int l = 0, ansL = -1, ansLen = INT_MAX;
        for (int r = 0; r < s.size(); r++) {
            if (need[s[r]] > 0) cnt--;
            need[s[r]]--;
            while (cnt == 0) {
                if (r - l + 1 < ansLen) { ansLen = r - l + 1; ansL = l; }
                char d = s[l++];
                need[d]++;
                if (need[d] > 0) cnt++;
            }
        }
        return ansL == -1 ? "" : s.substr(ansL, ansLen);
    }
};
```

```go [Go]
func minWindow(s string, t string) string {
    need := [128]int{}
    cnt := 0
    for i := 0; i < len(t); i++ {
        if need[t[i]] == 0 {
            cnt++
        }
        need[t[i]]++
    }
    l, ansL, ansLen := 0, -1, len(s)+1
    for r := 0; r < len(s); r++ {
        if need[s[r]] == 1 {
            cnt--
        }
        need[s[r]]--
        for cnt == 0 {
            if r-l+1 < ansLen {
                ansLen = r - l + 1
                ansL = l
            }
            d := s[l]
            need[d]++
            if need[d] == 1 {
                cnt++
            }
            l++
        }
    }
    if ansL == -1 {
        return ""
    }
    return s[ansL : ansL+ansLen]
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    const need = new Array(128).fill(0);
    let cnt = 0;
    for (const ch of t) {
        if (need[ch.charCodeAt(0)]++ === 0) cnt++;
    }
    let l = 0, ansL = -1, ansLen = Infinity;
    for (let r = 0; r < s.length; r++) {
        const code = s.charCodeAt(r);
        if (need[code] > 0) cnt--;
        need[code]--;
        while (cnt === 0) {
            if (r - l + 1 < ansLen) { ansLen = r - l + 1; ansL = l; }
            const d = s.charCodeAt(l);
            need[d]++;
            if (need[d] > 0) cnt++;
            l++;
        }
    }
    return ansL === -1 ? "" : s.substring(ansL, ansL + ansLen);
};
```

```c [C]
#include <string.h>

char* minWindow(char* s, char* t) {
    int need[128] = {0};
    int cnt = 0;
    for (int i = 0; t[i]; i++) if (need[(unsigned char)t[i]]++ == 0) cnt++;
    int l = 0, ansL = -1, ansLen = (int)strlen(s) + 1;
    int n = (int)strlen(s);
    for (int r = 0; r < n; r++) {
        if (need[(unsigned char)s[r]] > 0) cnt--;
        need[(unsigned char)s[r]]--;
        while (cnt == 0) {
            if (r - l + 1 < ansLen) { ansLen = r - l + 1; ansL = l; }
            unsigned char d = s[l++];
            need[d]++;
            if (need[d] > 0) cnt++;
        }
    }
    if (ansL == -1) { char* e = (char*)malloc(1); e[0] = '\0'; return e; }
    char* res = (char*)malloc((ansLen + 1) * sizeof(char));
    strncpy(res, s + ansL, ansLen);
    res[ansLen] = '\0';
    return res;
}
```

```ts [TypeScript]
function minWindow(s: string, t: string): string {
    const need: number[] = new Array(128).fill(0);
    let cnt = 0;
    for (const ch of t) {
        if (need[ch.charCodeAt(0)]++ === 0) cnt++;
    }
    let l = 0, ansL = -1, ansLen = Infinity;
    for (let r = 0; r < s.length; r++) {
        const code = s.charCodeAt(r);
        if (need[code] > 0) cnt--;
        need[code]--;
        while (cnt === 0) {
            if (r - l + 1 < ansLen) { ansLen = r - l + 1; ansL = l; }
            const d = s.charCodeAt(l);
            need[d]++;
            if (need[d] > 0) cnt++;
            l++;
        }
    }
    return ansL === -1 ? "" : s.substring(ansL, ansL + ansLen);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`，`m`、`n` 分别为 `s`、`t` 长度。
- **空间复杂度**：`O(1)`，字符集固定（128）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑窗 + 双计数 | `O(m + n)` | `O(1)` | 经典最小覆盖子串解法 |

核心是用「需求计数 + 已匹配种类数 `cnt`」判断窗口是否覆盖 `t`，并在满足条件时尽量收缩左边界以获得最小长度。

