

# [面试题 01.01. 判定字符是否唯一](https://leetcode.cn/problems/is-unique-lcci/)

## 一、题目描述

实现一个算法，确定一个字符串 `s` 的所有字符是否全都不同。

**示例 1：**
```
输入: s = "leetcode"
输出: false
```

**示例 2：**
```
输入: s = "abc"
输出: true
```

**限制：**
- `0 <= len(s) <= 100`
- `s[i]` 仅包含小写字母
- 如果你不使用额外的数据结构，会很加分。

---

## 二、解答方法

### 2.1 方法一：布尔数组（使用常数大小的额外空间）

**1. 思路**

由于字符串仅包含小写字母，我们可以使用一个长度为 26 的布尔数组（或整型数组）记录每个字符是否出现过。遍历字符串，若当前字符已出现过则返回 `false`，否则标记为已出现。该方法使用了固定大小的额外空间，可视为常数空间。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isUnique(String astr) {
        if (astr.length() > 26) return false;
        boolean[] seen = new boolean[26];
        for (char c : astr.toCharArray()) {
            int idx = c - 'a';
            if (seen[idx]) return false;
            seen[idx] = true;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isUnique(self, astr: str) -> bool:
        if len(astr) > 26:
            return False
        seen = [False] * 26
        for ch in astr:
            idx = ord(ch) - ord('a')
            if seen[idx]:
                return False
            seen[idx] = True
        return True
```

```go [Go]
func isUnique(astr string) bool {
    if len(astr) > 26 {
        return false
    }
    seen := [26]bool{}
    for _, ch := range astr {
        idx := ch - 'a'
        if seen[idx] {
            return false
        }
        seen[idx] = true
    }
    return true
}
```

```c [C]
#include <stdbool.h>
bool isUnique(char* astr) {
    int len = strlen(astr);
    if (len > 26) return false;
    bool seen[26] = {false};
    for (int i = 0; i < len; i++) {
        int idx = astr[i] - 'a';
        if (seen[idx]) return false;
        seen[idx] = true;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isUnique(string astr) {
        if (astr.size() > 26) return false;
        bool seen[26] = {false};
        for (char c : astr) {
            int idx = c - 'a';
            if (seen[idx]) return false;
            seen[idx] = true;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var isUnique = function(astr) {
    if (astr.length > 26) return false;
    const seen = new Array(26).fill(false);
    for (const ch of astr) {
        const idx = ch.charCodeAt(0) - 97;
        if (seen[idx]) return false;
        seen[idx] = true;
    }
    return true;
};
```

```typescript [TypeScript]
function isUnique(astr: string): boolean {
    if (astr.length > 26) return false;
    const seen: boolean[] = new Array(26).fill(false);
    for (const ch of astr) {
        const idx = ch.charCodeAt(0) - 97;
        if (seen[idx]) return false;
        seen[idx] = true;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为字符串长度，最多遍历 26 个字符（因为超过 26 直接返回 `false`）。
- **空间复杂度**：`O(1)`，固定大小的布尔数组，不随输入规模变化。

---

### 2.2 方法二：位运算（不使用额外数据结构）

**1. 思路**

利用一个整型变量 `mark` 的二进制位来标记字符是否出现过。由于只有 26 个小写字母，`int` 类型有 32 位，足够使用。对于每个字符，计算其对应的位掩码 `1 << (c - 'a')`，若 `mark` 与该掩码按位与不为 0，则说明该字符已出现过，返回 `false`；否则将 `mark` 与该掩码按位或，标记该字符。

此方法不借助数组或哈希表，仅使用一个整型变量，符合“不使用额外数据结构”的要求。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isUnique(String astr) {
        if (astr.length() > 26) return false;
        int mark = 0;
        for (char c : astr.toCharArray()) {
            int bit = 1 << (c - 'a');
            if ((mark & bit) != 0) return false;
            mark |= bit;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isUnique(self, astr: str) -> bool:
        if len(astr) > 26:
            return False
        mark = 0
        for ch in astr:
            bit = 1 << (ord(ch) - ord('a'))
            if mark & bit:
                return False
            mark |= bit
        return True
```

```go [Go]
func isUnique(astr string) bool {
    if len(astr) > 26 {
        return false
    }
    mark := 0
    for _, ch := range astr {
        bit := 1 << (ch - 'a')
        if mark & bit != 0 {
            return false
        }
        mark |= bit
    }
    return true
}
```

```c [C]
#include <stdbool.h>
bool isUnique(char* astr) {
    int len = strlen(astr);
    if (len > 26) return false;
    int mark = 0;
    for (int i = 0; i < len; i++) {
        int bit = 1 << (astr[i] - 'a');
        if (mark & bit) return false;
        mark |= bit;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isUnique(string astr) {
        if (astr.size() > 26) return false;
        int mark = 0;
        for (char c : astr) {
            int bit = 1 << (c - 'a');
            if (mark & bit) return false;
            mark |= bit;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var isUnique = function(astr) {
    if (astr.length > 26) return false;
    let mark = 0;
    for (const ch of astr) {
        const bit = 1 << (ch.charCodeAt(0) - 97);
        if (mark & bit) return false;
        mark |= bit;
    }
    return true;
};
```

```typescript [TypeScript]
function isUnique(astr: string): boolean {
    if (astr.length > 26) return false;
    let mark = 0;
    for (const ch of astr) {
        const bit = 1 << (ch.charCodeAt(0) - 97);
        if (mark & bit) return false;
        mark |= bit;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，最多遍历 26 个字符。
- **空间复杂度**：`O(1)`，仅使用一个整型变量。

---

### 2.3 方法三：排序后比较相邻字符

**1. 思路**

将字符串转换为字符数组并排序，然后遍历检查相邻字符是否相等。若存在相等则返回 `false`，否则返回 `true`。此方法需要修改原字符串（或需要额外空间复制），时间复杂度较高，但可以作为另一种思路的展示。注意，该方法虽然不额外使用哈希表或布尔数组，但排序本身通常需要递归栈或临时空间，不符合“不使用额外数据结构”的加分要求，但作为扩展解法仍然有效。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.Arrays;
class Solution {
    public boolean isUnique(String astr) {
        if (astr.length() > 26) return false;
        char[] arr = astr.toCharArray();
        Arrays.sort(arr);
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] == arr[i-1]) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isUnique(self, astr: str) -> bool:
        if len(astr) > 26:
            return False
        arr = sorted(astr)
        for i in range(1, len(arr)):
            if arr[i] == arr[i-1]:
                return False
        return True
```

```go [Go]
import "sort"
func isUnique(astr string) bool {
    if len(astr) > 26 {
        return false
    }
    arr := []rune(astr)
    sort.Slice(arr, func(i, j int) bool { return arr[i] < arr[j] })
    for i := 1; i < len(arr); i++ {
        if arr[i] == arr[i-1] {
            return false
        }
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
bool isUnique(char* astr) {
    int len = strlen(astr);
    if (len > 26) return false;
    qsort(astr, len, sizeof(char), cmp);
    for (int i = 1; i < len; i++) {
        if (astr[i] == astr[i-1]) return false;
    }
    return true;
}
```

```cpp [C++]
class Solution {
public:
    bool isUnique(string astr) {
        if (astr.size() > 26) return false;
        sort(astr.begin(), astr.end());
        for (int i = 1; i < astr.size(); i++) {
            if (astr[i] == astr[i-1]) return false;
        }
        return true;
    }
};
```

```javascript [JavaScript]
var isUnique = function(astr) {
    if (astr.length > 26) return false;
    const arr = astr.split('').sort();
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i-1]) return false;
    }
    return true;
};
```

```typescript [TypeScript]
function isUnique(astr: string): boolean {
    if (astr.length > 26) return false;
    const arr = astr.split('').sort();
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i-1]) return false;
    }
    return true;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，排序耗时。
- **空间复杂度**：`O(n)`（复制数组或递归栈）或 `O(1)`（原地排序，但通常需要额外空间），因语言实现而异。

---

## 三、总结

| 方法     | 时间复杂度   | 空间复杂度 | 特点                     |
| -------- | ------------ | ---------- | ------------------------ |
| 布尔数组 | `O(n)`       | `O(1)`     | 直观，常数空间           |
| 位运算   | `O(n)`       | `O(1)`     | 不使用额外数据结构，最优 |
| 排序比较 | `O(n log n)` | `O(n)`     | 思路扩展，但效率较低     |

**推荐**：面试中优先使用 **位运算方法（方法二）**，既满足“不使用额外数据结构”的要求，又简洁高效。若对位运算不熟悉，布尔数组（方法一）也是很好的选择。