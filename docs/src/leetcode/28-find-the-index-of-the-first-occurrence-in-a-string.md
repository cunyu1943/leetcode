# [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)



## 一、题目描述

给你两个字符串 `haystack` 和 `needle`，请你在 `haystack` 字符串中找出 `needle` 字符串的第一个匹配项的下标（下标从 0 开始）。如果 `needle` 不是 `haystack` 的一部分，则返回 `-1`。



**示例 1：**

```
输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。第一个匹配项的下标是 0，所以返回 0。
```

**示例 2：**

```
输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1。
```

**提示：**

-   `1 <= haystack.length, needle.length <= 10^4`
-   `haystack` 和 `needle` 仅由小写英文字符组成



## 二、解答方法

### 2.1 方法一：朴素匹配（逐位比较）

1. **思路**

枚举 `haystack` 中每个可能的起始位置 `i`（`0 <= i <= len(h) - len(n)`），逐个字符比较 `needle`：

-   若全部匹配则返回 `i`；
-   否则继续下一个 `i`；
-   若全部枚举完仍未匹配，返回 `-1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int strStr(String haystack, String needle) {
        int m = haystack.length(), n = needle.length();
        for (int i = 0; i <= m - n; i++) {
            int j = 0;
            while (j < n && haystack.charAt(i + j) == needle.charAt(j)) j++;
            if (j == n) return i;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        m, n = len(haystack), len(needle)
        for i in range(m - n + 1):
            if haystack[i:i + n] == needle:
                return i
        return -1
```

```go [Go]
func strStr(haystack string, needle string) int {
    m, n := len(haystack), len(needle)
    for i := 0; i <= m-n; i++ {
        j := 0
        for j < n && haystack[i+j] == needle[j] {
            j++
        }
        if j == n {
            return i
        }
    }
    return -1
}
```

```c [C]
int strStr(char* haystack, char* needle) {
    int m = 0, n = 0;
    while (haystack[m]) m++;
    while (needle[n]) n++;
    if (n == 0) return 0;
    for (int i = 0; i <= m - n; i++) {
        int j = 0;
        while (j < n && haystack[i + j] == needle[j]) j++;
        if (j == n) return i;
    }
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.size(), n = needle.size();
        for (int i = 0; i <= m - n; i++) {
            int j = 0;
            while (j < n && haystack[i + j] == needle[j]) j++;
            if (j == n) return i;
        }
        return -1;
    }
};
```

```js [JavaScript]
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    const m = haystack.length, n = needle.length;
    for (let i = 0; i <= m - n; i++) {
        let j = 0;
        while (j < n && haystack[i + j] === needle[j]) j++;
        if (j === n) return i;
    }
    return -1;
};
```

```ts [TypeScript]
function strStr(haystack: string, needle: string): number {
    const m = haystack.length, n = needle.length;
    for (let i = 0; i <= m - n; i++) {
        let j = 0;
        while (j < n && haystack[i + j] === needle[j]) j++;
        if (j === n) return i;
    }
    return -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，最坏每轮比较 `n` 个字符。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：KMP 算法

1. **思路**

朴素匹配在失配时会回退 `i`，效率低。KMP 通过预处理 `needle` 得到「部分匹配表 `next`」（前缀函数），使主串指针 `i` 不回退、模式串指针 `j` 跳到 `next[j]`，从而在 `O(m + n)` 内完成。

-   先求 `next` 数组：`next[j]` 表示 `needle[0..j-1]` 的最长相等前后缀长度；
-   匹配时若失配则 `j = next[j]`，匹配成功则继续；
-   当 `j == n` 时返回 `i - n + 1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int strStr(String haystack, String needle) {
        int m = haystack.length(), n = needle.length();
        if (n == 0) return 0;
        int[] next = new int[n];
        for (int i = 1, len = 0; i < n; i++) {
            while (len > 0 && needle.charAt(i) != needle.charAt(len)) len = next[len - 1];
            if (needle.charAt(i) == needle.charAt(len)) len++;
            next[i] = len;
        }
        for (int i = 0, j = 0; i < m; i++) {
            while (j > 0 && haystack.charAt(i) != needle.charAt(j)) j = next[j - 1];
            if (haystack.charAt(i) == needle.charAt(j)) j++;
            if (j == n) return i - n + 1;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        m, n = len(haystack), len(needle)
        if n == 0:
            return 0
        nxt = [0] * n
        for i in range(1, n):
            j = nxt[i - 1]
            while j > 0 and needle[i] != needle[j]:
                j = nxt[j - 1]
            if needle[i] == needle[j]:
                j += 1
            nxt[i] = j
        j = 0
        for i in range(m):
            while j > 0 and haystack[i] != needle[j]:
                j = nxt[j - 1]
            if haystack[i] == needle[j]:
                j += 1
            if j == n:
                return i - n + 1
        return -1
```

```go [Go]
func strStr(haystack string, needle string) int {
    m, n := len(haystack), len(needle)
    if n == 0 {
        return 0
    }
    nxt := make([]int, n)
    for i, j := 1, 0; i < n; i++ {
        for j > 0 && needle[i] != needle[j] {
            j = nxt[j-1]
        }
        if needle[i] == needle[j] {
            j++
        }
        nxt[i] = j
    }
    for i, j := 0, 0; i < m; i++ {
        for j > 0 && haystack[i] != needle[j] {
            j = nxt[j-1]
        }
        if haystack[i] == needle[j] {
            j++
        }
        if j == n {
            return i - n + 1
        }
    }
    return -1
}
```

```c [C]
int strStr(char* haystack, char* needle) {
    int m = 0, n = 0;
    while (haystack[m]) m++;
    while (needle[n]) n++;
    if (n == 0) return 0;
    int* nxt = (int*)malloc(sizeof(int) * n);
    for (int i = 1, j = 0; i < n; i++) {
        while (j > 0 && needle[i] != needle[j]) j = nxt[j - 1];
        if (needle[i] == needle[j]) j++;
        nxt[i] = j;
    }
    for (int i = 0, j = 0; i < m; i++) {
        while (j > 0 && haystack[i] != needle[j]) j = nxt[j - 1];
        if (haystack[i] == needle[j]) j++;
        if (j == n) { free(nxt); return i - n + 1; }
    }
    free(nxt);
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.size(), n = needle.size();
        if (n == 0) return 0;
        vector<int> next(n, 0);
        for (int i = 1, len = 0; i < n; i++) {
            while (len > 0 && needle[i] != needle[len]) len = next[len - 1];
            if (needle[i] == needle[len]) len++;
            next[i] = len;
        }
        for (int i = 0, j = 0; i < m; i++) {
            while (j > 0 && haystack[i] != needle[j]) j = next[j - 1];
            if (haystack[i] == needle[j]) j++;
            if (j == n) return i - n + 1;
        }
        return -1;
    }
};
```

```js [JavaScript]
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    const m = haystack.length, n = needle.length;
    if (n === 0) return 0;
    const next = new Array(n).fill(0);
    for (let i = 1, j = 0; i < n; i++) {
        while (j > 0 && needle[i] !== needle[j]) j = next[j - 1];
        if (needle[i] === needle[j]) j++;
        next[i] = j;
    }
    for (let i = 0, j = 0; i < m; i++) {
        while (j > 0 && haystack[i] !== needle[j]) j = next[j - 1];
        if (haystack[i] === needle[j]) j++;
        if (j === n) return i - n + 1;
    }
    return -1;
};
```

```ts [TypeScript]
function strStr(haystack: string, needle: string): number {
    const m = haystack.length, n = needle.length;
    if (n === 0) return 0;
    const next: number[] = new Array(n).fill(0);
    for (let i = 1, j = 0; i < n; i++) {
        while (j > 0 && needle[i] !== needle[j]) j = next[j - 1];
        if (needle[i] === needle[j]) j++;
        next[i] = j;
    }
    for (let i = 0, j = 0; i < m; i++) {
        while (j > 0 && haystack[i] !== needle[j]) j = next[j - 1];
        if (haystack[i] === needle[j]) j++;
        if (j === n) return i - n + 1;
    }
    return -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`，预处理 `O(n)` + 匹配 `O(m)`。
- **空间复杂度**：`O(n)`，存储 `next` 数组。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 朴素匹配（逐位比较） | `O(m * n)` | `O(1)` | 常规实现 |
| KMP 算法 | `O(m + n)` | `O(n)` | 常规实现 |

