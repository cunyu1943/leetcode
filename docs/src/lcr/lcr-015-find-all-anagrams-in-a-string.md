# [LCR 015. 找到字符串中所有字母异位词](https://leetcode.cn/problems/VabMRr/)



## 一、题目描述

给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的 **变位词（异位词）** 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

**变位词** 指字母相同，但排列不同的字符串。



**示例 1：**

```
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释: 起始索引等于 0 的子串是 "cba", 它是 "abc" 的变位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的变位词。
```

**示例 2：**

```
输入: s = "abab", p = "ab"
输出: [0,1,2]
解释: 起始索引等于 0 的子串是 "ab", 它是 "ab" 的变位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的变位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的变位词。
```

**提示：**

- `1 <= s.length, p.length <= 3 * 10⁴`
- `s` 和 `p` 仅包含小写字母



## 二、解答方法

### 2.1 方法一：滑动窗口 + 计数

1. **思路**

与 LCR 014 类似：在 `s` 上滑动长度等于 `len(p)` 的窗口，统计窗口内各字符出现次数是否与 `p` 完全一致。

- `need[26]` 记录需求，`cnt` 记录未满足的种类数；
- 窗口右进左出；当 `cnt == 0` 时当前窗口左端点即为一个答案起点。

时间 `O(len(s))`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        int n = s.length(), m = p.length();
        if (n < m) return res;
        int[] need = new int[26];
        int cnt = 0;
        for (char c : p.toCharArray()) {
            if (need[c - 'a']++ == 0) cnt++;
        }
        for (int i = 0; i < n; i++) {
            int in = s.charAt(i) - 'a';
            if (need[in]-- == 1) cnt--;
            if (i >= m) {
                int out = s.charAt(i - m) - 'a';
                if (need[out]++ == 0) cnt++;
            }
            if (cnt == 0) res.add(i - m + 1);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        res = []
        if n < m:
            return res
        need = [0] * 26
        cnt = 0
        for ch in p:
            idx = ord(ch) - ord('a')
            if need[idx] == 0:
                cnt += 1
            need[idx] += 1
        for i in range(n):
            idx = ord(s[i]) - ord('a')
            need[idx] -= 1
            if need[idx] == 0:
                cnt -= 1
            if i >= m:
                j = ord(s[i - m]) - ord('a')
                if need[j] == 0:
                    cnt += 1
                need[j] += 1
            if cnt == 0:
                res.append(i - m + 1)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> res;
        int n = s.size(), m = p.size();
        if (n < m) return res;
        int need[26] = {0};
        int cnt = 0;
        for (char c : p) if (need[c - 'a']++ == 0) cnt++;
        for (int i = 0; i < n; i++) {
            int in = s[i] - 'a';
            if (need[in]-- == 1) cnt--;
            if (i >= m) {
                int out = s[i - m] - 'a';
                if (need[out]++ == 0) cnt++;
            }
            if (cnt == 0) res.push_back(i - m + 1);
        }
        return res;
    }
};
```

```go [Go]
func findAnagrams(s string, p string) []int {
    n, m := len(s), len(p)
    var res []int
    if n < m {
        return res
    }
    need := [26]int{}
    cnt := 0
    for i := 0; i < m; i++ {
        if need[p[i]-'a'] == 0 {
            cnt++
        }
        need[p[i]-'a']++
    }
    for i := 0; i < n; i++ {
        in := s[i] - 'a'
        need[in]--
        if need[in] == 0 {
            cnt--
        }
        if i >= m {
            out := s[i-m] - 'a'
            if need[out] == 0 {
                cnt++
            }
            need[out]++
        }
        if cnt == 0 {
            res = append(res, i-m+1)
        }
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    const res = [];
    const n = s.length, m = p.length;
    if (n < m) return res;
    const need = new Array(26).fill(0);
    let cnt = 0;
    for (const ch of p) {
        if (need[ch.charCodeAt(0) - 97]++ === 0) cnt++;
    }
    for (let i = 0; i < n; i++) {
        const inIdx = s.charCodeAt(i) - 97;
        if (need[inIdx]-- === 1) cnt--;
        if (i >= m) {
            const outIdx = s.charCodeAt(i - m) - 97;
            if (need[outIdx]++ === 0) cnt++;
        }
        if (cnt === 0) res.push(i - m + 1);
    }
    return res;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int* findAnagrams(char* s, char* p, int* returnSize) {
    int n = (int)strlen(s), m = (int)strlen(p);
    int* res = (int*)malloc(n * sizeof(int));
    int rcnt = 0;
    if (n < m) { *returnSize = 0; return res; }
    int need[26] = {0};
    int cnt = 0;
    for (int i = 0; i < m; i++) if (need[p[i] - 'a']++ == 0) cnt++;
    for (int i = 0; i < n; i++) {
        int in = s[i] - 'a';
        if (need[in]-- == 1) cnt--;
        if (i >= m) {
            int out = s[i - m] - 'a';
            if (need[out]++ == 0) cnt++;
        }
        if (cnt == 0) res[rcnt++] = i - m + 1;
    }
    *returnSize = rcnt;
    return res;
}
```

```ts [TypeScript]
function findAnagrams(s: string, p: string): number[] {
    const res: number[] = [];
    const n = s.length, m = p.length;
    if (n < m) return res;
    const need: number[] = new Array(26).fill(0);
    let cnt = 0;
    for (const ch of p) {
        if (need[ch.charCodeAt(0) - 97]++ === 0) cnt++;
    }
    for (let i = 0; i < n; i++) {
        const inIdx = s.charCodeAt(i) - 97;
        if (need[inIdx]-- === 1) cnt--;
        if (i >= m) {
            const outIdx = s.charCodeAt(i - m) - 97;
            if (need[outIdx]++ === 0) cnt++;
        }
        if (cnt === 0) res.push(i - m + 1);
    }
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，线性扫描。
- **空间复杂度**：`O(1)`，固定 26 计数器。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑窗 + 计数 | `O(n)` | `O(1)` | 最优，推荐 |

固定窗口 + 需求计数，凡 `cnt == 0` 即窗口与 p 构成变位词，记录窗口起点。与 LCR 014 思路完全一致，是同一模板的「求全部位置」版本。

