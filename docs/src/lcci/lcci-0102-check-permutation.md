# [面试题 01.02. 判定是否互为字符重排](https://leetcode.cn/problems/check-permutation-lcci/)

## 一、题目描述

给定两个字符串 `s1` 和 `s2`，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

**示例 1：**

```
输入: s1 = "abc", s2 = "bca"
输出: true
```

**示例 2：**

```
输入: s1 = "abc", s2 = "bad"
输出: false
```

**说明：**

- `0 <= len(s1) <= 100`
- `0 <= len(s2) <= 100`
- 字符串仅包含小写字母

---

## 二、解答方法

### 2.1 方法一：排序后比较

**1. 思路**

将两个字符串分别转换为字符数组并排序，然后比较排序后的数组是否相等。若长度不等，直接返回 `false`。该方法直观易懂，时间复杂度为 `O(n log n)`。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.Arrays;
class Solution {
    public boolean CheckPermutation(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        char[] a = s1.toCharArray();
        char[] b = s2.toCharArray();
        Arrays.sort(a);
        Arrays.sort(b);
        return Arrays.equals(a, b);
    }
}
```

```python [Python]
class Solution:
    def CheckPermutation(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        return sorted(s1) == sorted(s2)
```

```go [Go]
import "sort"
func CheckPermutation(s1 string, s2 string) bool {
    if len(s1) != len(s2) { return false }
    a, b := []byte(s1), []byte(s2)
    sort.Slice(a, func(i, j int) bool { return a[i] < a[j] })
    sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
    for i := range a {
        if a[i] != b[i] { return false }
    }
    return true
}
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>
int cmp(const void* a, const void* b) {
    return *(char*)a - *(char*)b;
}
bool CheckPermutation(char* s1, char* s2) {
    int len1 = strlen(s1), len2 = strlen(s2);
    if (len1 != len2) return false;
    qsort(s1, len1, sizeof(char), cmp);
    qsort(s2, len2, sizeof(char), cmp);
    return strcmp(s1, s2) == 0;
}
```

```cpp [C++]
class Solution {
public:
    bool CheckPermutation(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        sort(s1.begin(), s1.end());
        sort(s2.begin(), s2.end());
        return s1 == s2;
    }
};
```

```javascript [JavaScript]
var CheckPermutation = function(s1, s2) {
    if (s1.length !== s2.length) return false;
    return s1.split('').sort().join('') === s2.split('').sort().join('');
};
```

```typescript [TypeScript]
function CheckPermutation(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    return s1.split('').sort().join('') === s2.split('').sort().join('');
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，排序的时间复杂度。
- **空间复杂度**：`O(n)`，存储字符数组（或递归栈）。

---

### 2.2 方法二：数组计数（小写字母专用）

**1. 思路**

由于字符串仅包含小写字母，可以使用长度为 26 的计数数组统计每个字符出现次数。先遍历 `s1` 增加计数，再遍历 `s2` 减少计数，最后检查所有计数是否为 0。若长度不等直接返回 `false`。时间复杂度 `O(n)`，空间复杂度 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean CheckPermutation(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int[] cnt = new int[26];
        for (char c : s1.toCharArray()) cnt[c - 'a']++;
        for (char c : s2.toCharArray()) {
            cnt[c - 'a']--;
            if (cnt[c - 'a'] < 0) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def CheckPermutation(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        cnt = [0] * 26
        for ch in s1:
            cnt[ord(ch) - ord('a')] += 1
        for ch in s2:
            idx = ord(ch) - ord('a')
            cnt[idx] -= 1
            if cnt[idx] < 0:
                return False
        return True
```

```go [Go]
func CheckPermutation(s1 string, s2 string) bool {
    if len(s1) != len(s2) { return false }
    cnt := [26]int{}
    for _, ch := range s1 {
        cnt[ch-'a']++
    }
    for _, ch := range s2 {
        cnt[ch-'a']--
        if cnt[ch-'a'] < 0 {
            return false
        }
    }
    return true
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
bool CheckPermutation(char* s1, char* s2) {
    int len1 = strlen(s1), len2 = strlen(s2);
    if (len1 != len2) return false;
    int cnt[26] = {0};
    for (int i = 0; i < len1; i++) {
        cnt[s1[i] - 'a']++;
    }
    for (int i = 0; i < len2; i++) {
        cnt[s2[i] - 'a']--;
        if (cnt[s2[i] - 'a'] < 0) return false;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool CheckPermutation(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        int cnt[26] = {0};
        for (char c : s1) cnt[c - 'a']++;
        for (char c : s2) {
            cnt[c - 'a']--;
            if (cnt[c - 'a'] < 0) return false;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var CheckPermutation = function(s1, s2) {
    if (s1.length !== s2.length) return false;
    const cnt = new Array(26).fill(0);
    for (const ch of s1) cnt[ch.charCodeAt(0) - 97]++;
    for (const ch of s2) {
        const idx = ch.charCodeAt(0) - 97;
        cnt[idx]--;
        if (cnt[idx] < 0) return false;
    }
    return true;
};
```

```typescript [TypeScript]
function CheckPermutation(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    const cnt: number[] = new Array(26).fill(0);
    for (const ch of s1) cnt[ch.charCodeAt(0) - 97]++;
    for (const ch of s2) {
        const idx = ch.charCodeAt(0) - 97;
        cnt[idx]--;
        if (cnt[idx] < 0) return false;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为字符串长度。
- **空间复杂度**：`O(1)`，固定大小的计数数组。

---

### 2.3 方法三：哈希表（通用字符集）

**1. 思路**

若字符集不限于小写字母，可以使用哈希表（如 `HashMap`、`Counter` 等）统计字符频次。逻辑与计数数组相同，但适用于任意字符（包括 Unicode）。先统计 `s1` 每个字符的出现次数，再遍历 `s2` 并逐个减少计数，若出现负数或最终所有计数为 0 则判定为字符重排。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.HashMap;
import java.util.Map;
class Solution {
    public boolean CheckPermutation(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        Map<Character, Integer> map = new HashMap<>();
        for (char c : s1.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        for (char c : s2.toCharArray()) {
            if (!map.containsKey(c) || map.get(c) == 0) return false;
            map.put(c, map.get(c) - 1);
        }
        return true;
    }
}
```

```python [Python]
from collections import Counter
class Solution:
    def CheckPermutation(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        return Counter(s1) == Counter(s2)
```

```go [Go]
func CheckPermutation(s1 string, s2 string) bool {
    if len(s1) != len(s2) { return false }
    cnt := make(map[rune]int)
    for _, ch := range s1 {
        cnt[ch]++
    }
    for _, ch := range s2 {
        if cnt[ch] == 0 { return false }
        cnt[ch]--
    }
    return true
}
```

```c [C]
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
// C语言没有内置哈希表，此处使用简单数组模拟（针对ASCII 128字符）
bool CheckPermutation(char* s1, char* s2) {
    int len1 = strlen(s1), len2 = strlen(s2);
    if (len1 != len2) return false;
    int cnt[128] = {0}; // 覆盖ASCII
    for (int i = 0; i < len1; i++) {
        cnt[(unsigned char)s1[i]]++;
    }
    for (int i = 0; i < len2; i++) {
        unsigned char c = (unsigned char)s2[i];
        cnt[c]--;
        if (cnt[c] < 0) return false;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool CheckPermutation(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        unordered_map<char, int> cnt;
        for (char c : s1) cnt[c]++;
        for (char c : s2) {
            if (cnt[c] == 0) return false;
            cnt[c]--;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var CheckPermutation = function(s1, s2) {
    if (s1.length !== s2.length) return false;
    const map = new Map();
    for (const ch of s1) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }
    for (const ch of s2) {
        if (!map.has(ch) || map.get(ch) === 0) return false;
        map.set(ch, map.get(ch) - 1);
    }
    return true;
};
```

```typescript [TypeScript]
function CheckPermutation(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    const map = new Map<string, number>();
    for (const ch of s1) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }
    for (const ch of s2) {
        if (!map.has(ch) || map.get(ch) === 0) return false;
        map.set(ch, map.get(ch)! - 1);
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为字符串长度。
- **空间复杂度**：`O(k)`，`k` 为不同字符的个数，最坏情况下为 `O(n)`。

---

## 三、总结

| 方法     | 时间复杂度   | 空间复杂度 | 适用场景           |
| -------- | ------------ | ---------- | ------------------ |
| 排序比较 | `O(n log n)` | `O(n)`     | 通用，代码简洁     |
| 计数数组 | `O(n)`       | `O(1)`     | 仅限小写字母，最优 |
| 哈希表   | `O(n)`       | `O(k)`     | 通用字符集，灵活   |

**推荐**：如果题目限定小写字母，优先使用 **方法二（计数数组）**，时间 `O(n)`，空间 `O(1)`。若字符集不固定，使用 **方法三（哈希表）** 保证通用性。排序法（方法一）虽然简单，但效率较低，一般作为备选。