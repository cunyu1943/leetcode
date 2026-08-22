# [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)



## 一、题目描述

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。



**示例 1：**

```
输入：s = "abcabcbb"
输出：3
解释：因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2：**

```
输入：s = "bbbbb"
输出：1
解释：因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3：**

```
输入：s = "pwwkew"
输出：3
解释：因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是子串的长度，"pwke" 是一个子序列，不是子串。
```

**提示：**

-   `0 <= s.length <= 10^5`；
-   `s` 由英文字母、数字、符号和空格组成。



## 二、解答方法

### 2.1 方法一：滑动窗口（哈希表）

1. **思路**

用「滑动窗口」维护一个不含重复字符的区间 `[left, right]`：

-   右指针 `right` 不断向右扩展，把 `s[right]` 加入窗口；
-   若 `s[right]` 已在窗口内（即上次出现位置 `>= left`），说明出现重复，将 `left` 跳到「重复字符上次出现位置的下一个位置」；
-   每次更新窗口最大长度 `right - left + 1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        int[] last = new int[128];
        java.util.Arrays.fill(last, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < n; right++) {
            char c = s.charAt(right);
            if (last[c] >= left) {
                left = last[c] + 1;
            }
            last[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last = {}
        left = 0
        max_len = 0
        for right, c in enumerate(s):
            if c in last and last[c] >= left:
                left = last[c] + 1
            last[c] = right
            max_len = max(max_len, right - left + 1)
        return max_len
```

```go [Go]
func lengthOfLongestSubstring(s string) int {
    last := make([]int, 128)
    for i := range last {
        last[i] = -1
    }
    left, maxLen := 0, 0
    for right := 0; right < len(s); right++ {
        c := s[right]
        if last[c] >= left {
            left = last[c] + 1
        }
        last[c] = right
        if right-left+1 > maxLen {
            maxLen = right - left + 1
        }
    }
    return maxLen
}
```

```c [C]
#include <string.h>

int max(int a, int b) { return a > b ? a : b; }

int lengthOfLongestSubstring(char* s) {
    int last[128];
    for (int i = 0; i < 128; i++) last[i] = -1;
    int left = 0, maxLen = 0;
    int n = (int)strlen(s);
    for (int right = 0; right < n; right++) {
        char c = s[right];
        if (last[(int)c] >= left) {
            left = last[(int)c] + 1;
        }
        last[(int)c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

```cpp [C++]
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.size();
        vector<int> last(128, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < n; right++) {
            char c = s[right];
            if (last[c] >= left) {
                left = last[c] + 1;
            }
            last[c] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const last = new Array(128).fill(-1);
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s.charCodeAt(right);
        if (last[c] >= left) {
            left = last[c] + 1;
        }
        last[c] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

```ts [TypeScript]
function lengthOfLongestSubstring(s: string): number {
    const last: number[] = new Array(128).fill(-1);
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s.charCodeAt(right);
        if (last[c] >= left) {
            left = last[c] + 1;
        }
        last[c] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，其中 `n` 是字符串长度，左右指针各自最多遍历一次字符串。
- **空间复杂度**：`O(min(m, n))`**，其中 `m` 是字符集大小（用定长数组时为 `O(128)`），哈希表最多存储窗口内不重复的字符。

### 2.2 方法二：滑动窗口（双指针 + 布尔数组）

1. **思路**

当字符集较小（如仅 ASCII）时，可以用一个布尔数组 `exist` 记录窗口内「当前是否存在某字符」，配合左右指针直接维护窗口：

-   右指针 `right` 每扩展一个字符 `s[right]`；
-   若 `s[right]` 已在窗口中，则不断右移 `left` 并清除 `s[left]`，直到把重复的 `s[right]` 移出窗口；
-   将 `s[right]` 标记为存在，并更新最大长度。

本质与方法一相同，只是用「移动左指针」替代了「直接跳左指针」，逻辑同样正确（因为每次只移除必要的最少字符）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int lengthOfLongestSubstring(String s) {
        boolean[] exist = new boolean[128];
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            while (exist[c]) {
                exist[s.charAt(left)] = false;
                left++;
            }
            exist[c] = true;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        exist = set()
        left = 0
        max_len = 0
        for right, c in enumerate(s):
            while c in exist:
                exist.remove(s[left])
                left += 1
            exist.add(c)
            max_len = max(max_len, right - left + 1)
        return max_len
```

```go [Go]
func lengthOfLongestSubstring(s string) int {
    exist := [128]bool{}
    left, maxLen := 0, 0
    for right := 0; right < len(s); right++ {
        c := s[right]
        for exist[c] {
            exist[s[left]] = false
            left++
        }
        exist[c] = true
        if right-left+1 > maxLen {
            maxLen = right - left + 1
        }
    }
    return maxLen
}
```

```c [C]
#include <string.h>

int max(int a, int b) { return a > b ? a : b; }

int lengthOfLongestSubstring(char* s) {
    bool exist[128] = {false};
    int left = 0, maxLen = 0;
    int n = (int)strlen(s);
    for (int right = 0; right < n; right++) {
        char c = s[right];
        while (exist[(int)c]) {
            exist[(int)s[left]] = false;
            left++;
        }
        exist[(int)c] = true;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

```cpp [C++]
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        bool exist[128] = {false};
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            char c = s[right];
            while (exist[c]) {
                exist[s[left]] = false;
                left++;
            }
            exist[c] = true;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const exist = new Array(128).fill(false);
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const code = s.charCodeAt(right);
        while (exist[code]) {
            exist[s.charCodeAt(left)] = false;
            left++;
        }
        exist[code] = true;
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

```ts [TypeScript]
function lengthOfLongestSubstring(s: string): number {
    const exist: boolean[] = new Array(128).fill(false);
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const code = s.charCodeAt(right);
        while (exist[code]) {
            exist[s.charCodeAt(left)] = false;
            left++;
        }
        exist[code] = true;
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，左右指针各自最多移动 `n` 次，虽然内层有 `while` 但整体仍线性。
- **空间复杂度**：`O(m)`，其中 `m` 为字符集大小（定长数组时为 `O(128)`）。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑动窗口（哈希表） | `O(n)` | `O(min(m, n))` | 查找/聚合高效 |
| 滑动窗口（双指针 + 布尔数组） | `O(n)` | `O(m)` | 空间紧凑，常为常数级 |

