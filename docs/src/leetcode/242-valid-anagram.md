# [242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)



## 一、题目描述

给定两个字符串 `s` 和 `t` ，编写一个函数来判断 `t` 是否是 `s` 的 字母异位词。

**注意：** 若 `s` 和 `t` 中每个字符出现的次数都相同（字符顺序可以不同），则称 `s` 和 `t` 互为字母异位词。

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

-   `1 <= s.length, t.length <= 5 * 10⁴`
-   `s` 和 `t` 仅包含小写字母

**进阶：** 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？



## 二、解答方法

### 2.1 方法一：排序后比较

1. **思路**

把两个字符串排序后比较是否相等。字母异位词排序后必然相同。

2. **代码实现（Python）**

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)
```

### 2.2 方法二：哈希表计数（最优）

1. **思路**

用一个长度为 26 的数组（或哈希表）统计字符频次：遍历 `s` 时对应位置 `+1`，遍历 `t` 时 `-1`。最后若所有计数都为 0 则互为异位词。

若长度不等可直接返回 `false`（提前剪枝）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
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
        count = [0] * 26
        for a, b in zip(s, t):
            count[ord(a) - ord('a')] += 1
            count[ord(b) - ord('a')] -= 1
        return all(c == 0 for c in count)
```

```go [Go]
func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }
    count := [26]int{}
    for i := 0; i < len(s); i++ {
        count[s[i]-'a']++
        count[t[i]-'a']--
    }
    for _, c := range count {
        if c != 0 {
            return false
        }
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        vector<int> count(26, 0);
        for (int i = 0; i < s.size(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
}
```

::::::

3. **复杂度分析**

- **排序法**：时间 `O(n log n)`，空间 `O(n)`（取决于语言字符串是否可变）。
- **计数法**：时间 `O(n)`，空间 `O(1)`（固定 26 长度数组）。

## 三、总结

| 方法 | 时间 | 空间 |
| ---- | ---- | ---- |
| 排序比较 | `O(n log n)` | `O(n)` |
| 哈希计数 | `O(n)` | `O(1)` |

**计数法** 是字母异位词问题的通用解法，可推广到 `49. 字母异位词分组`（把计数数组序列化后作为哈希表的 key）和 `438. 找到字符串中所有字母异位词`（滑动窗口 + 计数）。

**进阶（Unicode）**：字符集不固定时，把定长数组 `[26]` 换成 `Map<Character, Integer>` 哈希表即可，思路完全不变。
