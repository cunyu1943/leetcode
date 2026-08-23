# [LCR 014. 字符串的排列](https://leetcode.cn/problems/MPnai9/)



## 一、题目描述

给定两个字符串 `s1` 和 `s2`，写一个函数来判断 `s2` 是否包含 `s1` 的某个变位词（排列）。

换句话说，第一个字符串的排列之一是第二个字符串的 **子串** 。



**示例 1：**

```
输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
```

**示例 2：**

```
输入: s1= "ab" s2 = "eidboaoo"
输出: False
```

**提示：**

- `1 <= s1.length, s2.length <= 10⁴`
- `s1` 和 `s2` 仅包含小写字母



## 二、解答方法

### 2.1 方法一：滑动窗口 + 计数

1. **思路**

`s1` 的排列是 `s2` 的子串，等价于：`s2` 中存在一个长度与 `s1` 相同的窗口，窗口内各字符出现次数与 `s1` 完全一致。

- 用 `need[26]` 记录 `s1` 中每个字符的需求数，`cnt` 记录「字符种类数」中已满足需求的种类数；
- 在 `s2` 上滑动长度为 `len(s1)` 的窗口：右进左出更新计数；
- 当 `cnt == 0` 时说明窗口与 `s1` 是变位词，返回 `true`。

时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        int n1 = s1.length(), n2 = s2.length();
        if (n1 > n2) return false;
        int[] need = new int[26];
        int cnt = 0;
        for (char c : s1.toCharArray()) {
            if (need[c - 'a']++ == 0) cnt++;
        }
        for (int i = 0; i < n2; i++) {
            int in = s2.charAt(i) - 'a';
            if (need[in]-- == 1) cnt--;
            if (i >= n1) {
                int out = s2.charAt(i - n1) - 'a';
                if (need[out]++ == 0) cnt++;
            }
            if (cnt == 0) return true;
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        n1, n2 = len(s1), len(s2)
        if n1 > n2:
            return False
        need = [0] * 26
        cnt = 0
        for ch in s1:
            idx = ord(ch) - ord('a')
            if need[idx] == 0:
                cnt += 1
            need[idx] += 1
        for i in range(n2):
            idx = ord(s2[i]) - ord('a')
            need[idx] -= 1
            if need[idx] == 0:
                cnt -= 1
            if i >= n1:
                j = ord(s2[i - n1]) - ord('a')
                if need[j] == 0:
                    cnt += 1
                need[j] += 1
            if cnt == 0:
                return True
        return False
```

```cpp [C++]
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int n1 = s1.size(), n2 = s2.size();
        if (n1 > n2) return false;
        int need[26] = {0};
        int cnt = 0;
        for (char c : s1) if (need[c - 'a']++ == 0) cnt++;
        for (int i = 0; i < n2; i++) {
            int in = s2[i] - 'a';
            if (need[in]-- == 1) cnt--;
            if (i >= n1) {
                int out = s2[i - n1] - 'a';
                if (need[out]++ == 0) cnt++;
            }
            if (cnt == 0) return true;
        }
        return false;
    }
};
```

```go [Go]
func checkInclusion(s1 string, s2 string) bool {
    n1, n2 := len(s1), len(s2)
    if n1 > n2 {
        return false
    }
    need := [26]int{}
    cnt := 0
    for i := 0; i < n1; i++ {
        if need[s1[i]-'a'] == 0 {
            cnt++
        }
        need[s1[i]-'a']++
    }
    for i := 0; i < n2; i++ {
        in := s2[i] - 'a'
        need[in]--
        if need[in] == 0 {
            cnt--
        }
        if i >= n1 {
            out := s2[i-n1] - 'a'
            if need[out] == 0 {
                cnt++
            }
            need[out]++
        }
        if cnt == 0 {
            return true
        }
    }
    return false
}
```

```js [JavaScript]
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    const n1 = s1.length, n2 = s2.length;
    if (n1 > n2) return false;
    const need = new Array(26).fill(0);
    let cnt = 0;
    for (const ch of s1) {
        if (need[ch.charCodeAt(0) - 97]++ === 0) cnt++;
    }
    for (let i = 0; i < n2; i++) {
        const inIdx = s2.charCodeAt(i) - 97;
        if (need[inIdx]-- === 1) cnt--;
        if (i >= n1) {
            const outIdx = s2.charCodeAt(i - n1) - 97;
            if (need[outIdx]++ === 0) cnt++;
        }
        if (cnt === 0) return true;
    }
    return false;
};
```

```c [C]
#include <string.h>

int checkInclusion(char* s1, char* s2) {
    int n1 = (int)strlen(s1), n2 = (int)strlen(s2);
    if (n1 > n2) return 0;
    int need[26] = {0};
    int cnt = 0;
    for (int i = 0; i < n1; i++) if (need[s1[i] - 'a']++ == 0) cnt++;
    for (int i = 0; i < n2; i++) {
        int in = s2[i] - 'a';
        if (need[in]-- == 1) cnt--;
        if (i >= n1) {
            int out = s2[i - n1] - 'a';
            if (need[out]++ == 0) cnt++;
        }
        if (cnt == 0) return 1;
    }
    return 0;
}
```

```ts [TypeScript]
function checkInclusion(s1: string, s2: string): boolean {
    const n1 = s1.length, n2 = s2.length;
    if (n1 > n2) return false;
    const need: number[] = new Array(26).fill(0);
    let cnt = 0;
    for (const ch of s1) {
        if (need[ch.charCodeAt(0) - 97]++ === 0) cnt++;
    }
    for (let i = 0; i < n2; i++) {
        const inIdx = s2.charCodeAt(i) - 97;
        if (need[inIdx]-- === 1) cnt--;
        if (i >= n1) {
            const outIdx = s2.charCodeAt(i - n1) - 97;
            if (need[outIdx]++ === 0) cnt++;
        }
        if (cnt === 0) return true;
    }
    return false;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n2)`，滑动窗口线性扫描。
- **空间复杂度**：`O(1)`，固定 26 计数器。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑窗 + 计数 | `O(n)` | `O(1)` | 最优，推荐 |

判断「固定长度窗口是否与 s1 构成变位词」用计数数组 + 满足种类数 `cnt`，在 `O(n)` 内完成，是滑动窗口计数法的经典应用。

