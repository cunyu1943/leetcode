# [205. 同构字符串](https://leetcode.cn/problems/isomorphic-strings/)



## 一、题目描述

给定两个字符串 `s` 和 `t` ，判断它们是否是 **同构** 的。

如果 `s` 中的字符可以按某种映射关系替换得到 `t` ，那么这两个字符串就是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上（即映射必须是 **双射**），相同字符只能映射到同一个字符上，但一个字符可以同时被映射到自身。

**示例 1：**

```
输入：s = "egg", t = "add"
输出：true
解释：e → a，g → d。
```

**示例 2：**

```
输入：s = "foo", t = "bar"
输出：false
解释：o 既要映射到 a 又要映射到 r，冲突。
```

**示例 3：**

```
输入：s = "paper", t = "title"
输出：true
```

**提示：**

-   `1 <= s.length <= 5 * 10⁴`
-   `t.length == s.length`
-   `s` 和 `t` 由任意有效的 ASCII 字符组成

**进阶：** 如果字符集是 Unicode（可能很大），该如何优化？



## 二、解答方法

### 2.1 方法一：双向哈希映射

1. **思路**

同时维护两个哈希表：`s2t`（s 字符 → t 字符）和 `t2s`（t 字符 → s 字符）。遍历每个位置，若 `s[i]` 已映射但目标不同 → false；若 `t[i]` 已被别的 `s` 字符映射 → false。双向检查保证双射。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isIsomorphic(String s, String t) {
        Map<Character, Character> s2t = new HashMap<>();
        Map<Character, Character> t2s = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i), b = t.charAt(i);
            if (s2t.containsKey(a) && s2t.get(a) != b) return false;
            if (t2s.containsKey(b) && t2s.get(b) != a) return false;
            s2t.put(a, b);
            t2s.put(b, a);
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        s2t, t2s = {}, {}
        for a, b in zip(s, t):
            if a in s2t and s2t[a] != b:
                return False
            if b in t2s and t2s[b] != a:
                return False
            s2t[a] = b
            t2s[b] = a
        return True
```

```go [Go]
func isIsomorphic(s string, t string) bool {
    s2t := make(map[byte]byte)
    t2s := make(map[byte]byte)
    for i := 0; i < len(s); i++ {
        a, b := s[i], t[i]
        if v, ok := s2t[a]; ok && v != b {
            return false
        }
        if v, ok := t2s[b]; ok && v != a {
            return false
        }
        s2t[a] = b
        t2s[b] = a
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> s2t, t2s;
        for (int i = 0; i < s.size(); i++) {
            char a = s[i], b = t[i];
            if (s2t.count(a) && s2t[a] != b) return false;
            if (t2s.count(b) && t2s[b] != a) return false;
            s2t[a] = b;
            t2s[b] = a;
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
var isIsomorphic = function (s, t) {
    const s2t = new Map(), t2s = new Map();
    for (let i = 0; i < s.length; i++) {
        const a = s[i], b = t[i];
        if (s2t.has(a) && s2t.get(a) !== b) return false;
        if (t2s.has(b) && t2s.get(b) !== a) return false;
        s2t.set(a, b);
        t2s.set(b, a);
    }
    return true;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s: string, t: string): boolean {
    const s2t = new Map<string, string>(), t2s = new Map<string, string>();
    for (let i = 0; i < s.length; i++) {
        const a = s[i], b = t[i];
        if (s2t.has(a) && s2t.get(a) !== b) return false;
        if (t2s.has(b) && t2s.get(b) !== a) return false;
        s2t.set(a, b);
        t2s.set(b, a);
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(k)`，k 为字符集大小。

### 2.2 方法二：首次出现位置模式（更简洁）

1. **思路**

同构的本质是 **字符首次出现的模式一致**。把每个字符替换成它在本串中第一次出现的下标，若两串得到的模式数组相同则同构。例如 `foo` → `[0,1,1]`，`bar` → `[0,1,2]`，不等故不同构。

2. **代码实现（Python）**

```python
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        def pattern(x):
            first = {}
            return [first.setdefault(c, i) for i, c in enumerate(x)]
        return pattern(s) == pattern(t)
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（模式数组）。

## 三、总结

| 方法 | 特点 |
| ---- | ---- |
| 双向哈希 | 边遍历边判冲突，空间 `O(k)`，推荐 |
| 首次出现模式 | 一行式，表达同构本质 |

关键陷阱：只做 **单向** 映射会导致 `s="ab", t="aa"` 误判为 true（因为 `b→a` 与 `a→a` 冲突未被检测），必须 **双向校验** 保证双射。
