# [面试题 01.04. 回文排列](https://leetcode.cn/problems/palindrome-permutation-lcci/)

## 一、题目描述

给定一个字符串，编写一个函数，判断该字符串是否可以作为某个回文串的排列（即重排后能形成回文串）。

**示例 1：**

```
输入: "tactcoa"
输出: true（排列有 "tacocat"、"atcocta" 等）
```

**示例 2：**

```
输入: "abc"
输出: false
```

**提示：**

- `0 <= s.length <= 5000`
- `s` 由小写字母组成（可能包含空格，但题目实际多限定小写字母，此处按标准处理）

---

## 二、解答方法

### 2.1 方法一：字符计数（数组）

**1. 思路**

回文串的特点：最多只能有一个字符出现奇数次，其余字符必须出现偶数次。使用长度为 26 的数组统计每个字符出现次数，然后统计奇数次的字符个数，若 `oddCount <= 1` 则返回 `true`，否则 `false`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean canPermutePalindrome(String s) {
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) {
            cnt[c - 'a']++;
        }
        int odd = 0;
        for (int n : cnt) {
            if (n % 2 == 1) odd++;
        }
        return odd <= 1;
    }
}
```

```python [Python]
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        cnt = [0] * 26
        for ch in s:
            cnt[ord(ch) - ord('a')] += 1
        odd = sum(1 for n in cnt if n % 2 == 1)
        return odd <= 1
```

```go [Go]
func canPermutePalindrome(s string) bool {
    cnt := [26]int{}
    for _, ch := range s {
        cnt[ch-'a']++
    }
    odd := 0
    for _, n := range cnt {
        if n%2 == 1 {
            odd++
        }
    }
    return odd <= 1
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
bool canPermutePalindrome(char* s) {
    int cnt[26] = {0};
    int len = strlen(s);
    for (int i = 0; i < len; i++) {
        cnt[s[i] - 'a']++;
    }
    int odd = 0;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] % 2 == 1) odd++;
    }
    return odd <= 1;
}
```

```cpp [C++]
class Solution {
public:
    bool canPermutePalindrome(string s) {
        int cnt[26] = {0};
        for (char c : s) {
            cnt[c - 'a']++;
        }
        int odd = 0;
        for (int n : cnt) {
            if (n % 2 == 1) odd++;
        }
        return odd <= 1;
    }
};
```

```javascript [JavaScript]
var canPermutePalindrome = function(s) {
    const cnt = new Array(26).fill(0);
    for (const ch of s) {
        cnt[ch.charCodeAt(0) - 97]++;
    }
    let odd = 0;
    for (const n of cnt) {
        if (n % 2 === 1) odd++;
    }
    return odd <= 1;
};
```

```typescript [TypeScript]
function canPermutePalindrome(s: string): boolean {
    const cnt: number[] = new Array(26).fill(0);
    for (const ch of s) {
        cnt[ch.charCodeAt(0) - 97]++;
    }
    let odd = 0;
    for (const n of cnt) {
        if (n % 2 === 1) odd++;
    }
    return odd <= 1;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为字符串长度。
- **空间复杂度**：`O(1)`，固定数组。

---

### 2.2 方法二：位运算优化（只判断奇偶性）

**1. 思路**

使用一个整型变量 `mark` 的二进制位来记录每个字符出现次数的奇偶性。遍历字符时，将对应位取反（异或 1）。遍历结束后，检查 `mark` 的二进制表示中是否最多只有 1 个 `1`（即 `mark & (mark - 1) == 0`）。此方法避免了遍历 26 个计数，直接通过位运算判断。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean canPermutePalindrome(String s) {
        int mark = 0;
        for (char c : s.toCharArray()) {
            mark ^= 1 << (c - 'a');
        }
        return (mark & (mark - 1)) == 0;
    }
}
```

```python [Python]
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        mark = 0
        for ch in s:
            mark ^= 1 << (ord(ch) - ord('a'))
        return (mark & (mark - 1)) == 0
```

```go [Go]
func canPermutePalindrome(s string) bool {
    mark := 0
    for _, ch := range s {
        mark ^= 1 << (ch - 'a')
    }
    return (mark & (mark - 1)) == 0
}
```

```c [C]
#include <stdbool.h>
bool canPermutePalindrome(char* s) {
    int mark = 0;
    for (int i = 0; s[i]; i++) {
        mark ^= 1 << (s[i] - 'a');
    }
    return (mark & (mark - 1)) == 0;
}
```

```cpp [C++]
class Solution {
public:
    bool canPermutePalindrome(string s) {
        int mark = 0;
        for (char c : s) {
            mark ^= 1 << (c - 'a');
        }
        return (mark & (mark - 1)) == 0;
    }
};
```

```javascript [JavaScript]
var canPermutePalindrome = function(s) {
    let mark = 0;
    for (const ch of s) {
        mark ^= 1 << (ch.charCodeAt(0) - 97);
    }
    return (mark & (mark - 1)) === 0;
};
```

```typescript [TypeScript]
function canPermutePalindrome(s: string): boolean {
    let mark = 0;
    for (const ch of s) {
        mark ^= 1 << (ch.charCodeAt(0) - 97);
    }
    return (mark & (mark - 1)) === 0;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.3 方法三：使用集合（Set）动态记录奇数字符

**1. 思路**

遍历字符串，若当前字符已在集合中，则移除（表示变为偶数）；否则加入集合（表示变为奇数）。最后集合的大小即为奇数字符的种类数，若集合大小不超过 1，则返回 `true`。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.HashSet;
import java.util.Set;
class Solution {
    public boolean canPermutePalindrome(String s) {
        Set<Character> set = new HashSet<>();
        for (char c : s.toCharArray()) {
            if (set.contains(c)) set.remove(c);
            else set.add(c);
        }
        return set.size() <= 1;
    }
}
```

```python [Python]
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        odd = set()
        for ch in s:
            if ch in odd:
                odd.remove(ch)
            else:
                odd.add(ch)
        return len(odd) <= 1
```

```go [Go]
func canPermutePalindrome(s string) bool {
    set := make(map[rune]bool)
    for _, ch := range s {
        if set[ch] {
            delete(set, ch)
        } else {
            set[ch] = true
        }
    }
    return len(set) <= 1
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
// C语言没有内置Set，此处用数组模拟（仅针对小写字母）
bool canPermutePalindrome(char* s) {
    bool odd[26] = {false};
    for (int i = 0; s[i]; i++) {
        int idx = s[i] - 'a';
        odd[idx] = !odd[idx];
    }
    int count = 0;
    for (int i = 0; i < 26; i++) {
        if (odd[i]) count++;
    }
    return count <= 1;
}
```

```cpp [C++]
class Solution {
public:
    bool canPermutePalindrome(string s) {
        unordered_set<char> odd;
        for (char c : s) {
            if (odd.count(c)) odd.erase(c);
            else odd.insert(c);
        }
        return odd.size() <= 1;
    }
};
```

```javascript [JavaScript]
var canPermutePalindrome = function(s) {
    const odd = new Set();
    for (const ch of s) {
        if (odd.has(ch)) odd.delete(ch);
        else odd.add(ch);
    }
    return odd.size <= 1;
};
```

```typescript [TypeScript]
function canPermutePalindrome(s: string): boolean {
    const odd = new Set<string>();
    for (const ch of s) {
        if (odd.has(ch)) odd.delete(ch);
        else odd.add(ch);
    }
    return odd.size <= 1;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(k)`，其中 `k` 为不同字符数，最坏 `O(n)`。

---

## 三、总结

| 方法        | 时间复杂度 | 空间复杂度 | 特点               |
| ----------- | ---------- | ---------- | ------------------ |
| 数组计数    | `O(n)`     | `O(1)`     | 简单直观           |
| 位运算      | `O(n)`     | `O(1)`     | 空间最优，且简洁   |
| 集合（Set） | `O(n)`     | `O(k)`     | 动态维护奇偶，通用 |

**推荐**：面试中优先使用 **位运算（方法二）**，时间 `O(n)`，空间 `O(1)`，且代码简洁。若对位运算不熟悉，数组计数（方法一）同样优秀。集合方法（方法三）适合更通用的场景，但空间稍大。