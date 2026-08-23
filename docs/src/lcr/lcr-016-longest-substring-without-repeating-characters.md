# [LCR 016. 无重复字符的最长子串](https://leetcode.cn/problems/wtcaE1/)



## 一、题目描述

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。



**示例 1：**

```
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2：**

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3：**

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
```

**提示：**

- `0 <= s.length <= 5 * 10⁴`
- `s` 由英文字母、数字、符号和空格组成



## 二、解答方法

### 2.1 方法一：滑动窗口 + 哈希/数组

1. **思路**

维护窗口 `[l, r]`，用数组 `occ[128]` 记录窗口内字符是否出现。右移 `r` 时：

- 若 `s[r]` 已在窗口内，则不断右移 `l` 并清除 `occ[s[l]]`，直到把重复字符移除；
- 每次更新答案 `max(r - l + 1)`。

每个字符进出窗口各一次，时间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] occ = new int[128];
        int l = 0, ans = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            while (occ[c] > 0) occ[s.charAt(l++)]--;
            occ[c]++;
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        occ = set()
        l = ans = 0
        for r, c in enumerate(s):
            while c in occ:
                occ.discard(s[l])
                l += 1
            occ.add(c)
            ans = max(ans, r - l + 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int occ[128] = {0};
        int l = 0, ans = 0;
        for (int r = 0; r < s.size(); r++) {
            while (occ[s[r]] > 0) occ[s[l++]]--;
            occ[s[r]]++;
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
```

```go [Go]
func lengthOfLongestSubstring(s string) int {
    occ := [128]int{}
    l, ans := 0, 0
    for r := 0; r < len(s); r++ {
        for occ[s[r]] > 0 {
            occ[s[l]]--
            l++
        }
        occ[s[r]]++
        if r-l+1 > ans {
            ans = r - l + 1
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const occ = new Array(128).fill(0);
    let l = 0, ans = 0;
    for (let r = 0; r < s.length; r++) {
        const code = s.charCodeAt(r);
        while (occ[code] > 0) occ[s.charCodeAt(l++)]--;
        occ[code]++;
        ans = Math.max(ans, r - l + 1);
    }
    return ans;
};
```

```c [C]
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int occ[128] = {0};
    int l = 0, ans = 0, n = (int)strlen(s);
    for (int r = 0; r < n; r++) {
        while (occ[(unsigned char)s[r]] > 0) occ[(unsigned char)s[l++]]--;
        occ[(unsigned char)s[r]]++;
        if (r - l + 1 > ans) ans = r - l + 1;
    }
    return ans;
}
```

```ts [TypeScript]
function lengthOfLongestSubstring(s: string): number {
    const occ: number[] = new Array(128).fill(0);
    let l = 0, ans = 0;
    for (let r = 0; r < s.length; r++) {
        const code = s.charCodeAt(r);
        while (occ[code] > 0) occ[s.charCodeAt(l++)]--;
        occ[code]++;
        ans = Math.max(ans, r - l + 1);
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，`l`、`r` 各遍历一次。
- **空间复杂度**：`O(1)`，字符集大小固定（128）。

### 2.2 方法二：滑动窗口 + 记录上次出现位置

1. **思路**

用数组 `last[128]` 记录每个字符**上一次出现的位置**。遍历到 `r` 时：

- 若 `last[s[r]] >= l`，说明该字符在当前窗口内重复，直接令 `l = last[s[r]] + 1`；
- 更新 `last[s[r]] = r`，并更新答案。

无需反复移动 `l`，单次遍历即可。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] last = new int[128];
        for (int i = 0; i < 128; i++) last[i] = -1;
        int l = 0, ans = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (last[c] >= l) l = last[c] + 1;
            last[c] = r;
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last = [-1] * 128
        l = ans = 0
        for r, c in enumerate(s):
            o = ord(c)
            if last[o] >= l:
                l = last[o] + 1
            last[o] = r
            ans = max(ans, r - l + 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int last[128];
        for (int i = 0; i < 128; i++) last[i] = -1;
        int l = 0, ans = 0;
        for (int r = 0; r < s.size(); r++) {
            if (last[s[r]] >= l) l = last[s[r]] + 1;
            last[s[r]] = r;
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
```

```go [Go]
func lengthOfLongestSubstring(s string) int {
    last := [128]int{}
    for i := range last {
        last[i] = -1
    }
    l, ans := 0, 0
    for r := 0; r < len(s); r++ {
        if last[s[r]] >= l {
            l = last[s[r]] + 1
        }
        last[s[r]] = r
        if r-l+1 > ans {
            ans = r - l + 1
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const last = new Array(128).fill(-1);
    let l = 0, ans = 0;
    for (let r = 0; r < s.length; r++) {
        const o = s.charCodeAt(r);
        if (last[o] >= l) l = last[o] + 1;
        last[o] = r;
        ans = Math.max(ans, r - l + 1);
    }
    return ans;
};
```

```c [C]
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int last[128];
    for (int i = 0; i < 128; i++) last[i] = -1;
    int l = 0, ans = 0, n = (int)strlen(s);
    for (int r = 0; r < n; r++) {
        unsigned char c = s[r];
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        if (r - l + 1 > ans) ans = r - l + 1;
    }
    return ans;
}
```

```ts [TypeScript]
function lengthOfLongestSubstring(s: string): number {
    const last: number[] = new Array(128).fill(-1);
    let l = 0, ans = 0;
    for (let r = 0; r < s.length; r++) {
        const o = s.charCodeAt(r);
        if (last[o] >= l) l = last[o] + 1;
        last[o] = r;
        ans = Math.max(ans, r - l + 1);
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑窗 + 出现计数 | `O(n)` | `O(1)` | 直观，需收缩左边界 |
| 滑窗 + 上次位置 | `O(n)` | `O(1)` | 单次遍历，更简洁 |

两种方法本质都是滑动窗口。第二种通过记录「上次出现位置」直接跳左边界，是更优雅的实现。

