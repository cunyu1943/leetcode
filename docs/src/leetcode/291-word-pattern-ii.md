# [291. 单词规律 II](https://leetcode.cn/problems/word-pattern-ii/) [🔒 会员题]

## 一、题目描述

给你一个 **模式** `pattern` 和一个字符串 `s`，请你判断 `s` 和 `pattern` 是否 **匹配**，即 `s` 是否可以按照模式映射到 `pattern`（**模式中的一个字母对应一个非空子串**，且不同字母对应 **不同** 子串）。注意这次不是用空格切分 `s`，而是要把 `s` **划分** 成与模式等长的若干段。

**示例：**

```
输入：pattern = "abab", s = "redblueredblue"   输出：true
解释：a="red", b="blue" 可完美映射
输入：pattern = "aaaa", s = "asdasdasdasd"     输出：true
输入：pattern = "aabb", s = "xyzabcxzyabc"     输出：false
```

**提示：** `1 <= pattern.length <= 20`，`1 <= s.length <= 50`，`pattern` 与 `s` 仅含小写字母。

## 二、解答方法

### 方法一：回溯 + 双向映射（DFS 划分）

**思路：** 由于 `s` 没有分隔符，需枚举划分。DFS 同时推进模式指针 `pi` 和字符串指针 `si`：

- 若 `pi == pattern.length`：`si` 必须也到末尾才算完全匹配；
- 取当前模式字符 `c = pattern[pi]`：
  - 若 `c` 已映射过某子串 `w`：检查 `s[si:si+len(w)]` 是否等于 `w`，是则匹配该段继续递归；
  - 否则：枚举 `s` 中以 `si` 起的所有可能子串 `w`（长度 1 ~ 剩余足够），在双向映射中加入 `c↔w`，递归，`si` 前进 `len(w)`；
  - 回溯撤销映射。

:::::: code-group

```java [Java]
class Solution {
    private Map<Character, String> p2w = new HashMap<>();
    private Map<String, Character> w2p = new HashMap<>();

    public boolean wordPatternMatch(String pattern, String s) {
        return dfs(pattern, 0, s, 0);
    }
    private boolean dfs(String pattern, int pi, String s, int si) {
        if (pi == pattern.length() && si == s.length()) return true;
        if (pi == pattern.length() || si == s.length()) return false;
        char c = pattern.charAt(pi);
        if (p2w.containsKey(c)) {
            String w = p2w.get(c);
            if (!s.startsWith(w, si)) return false;
            return dfs(pattern, pi + 1, s, si + w.length());
        }
        for (int end = si + 1; end <= s.length(); end++) {    // 枚举子串长度
            String w = s.substring(si, end);
            if (w2p.containsKey(w)) continue;                 // 子串已被别的字符占用
            p2w.put(c, w); w2p.put(w, c);
            if (dfs(pattern, pi + 1, s, end)) return true;
            p2w.remove(c); w2p.remove(w);                      // 回溯
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def wordPatternMatch(self, pattern: str, s: str) -> bool:
        p2w, w2p = {}, {}
        def dfs(pi, si):
            if pi == len(pattern) and si == len(s):
                return True
            if pi == len(pattern) or si == len(s):
                return False
            c = pattern[pi]
            if c in p2w:
                w = p2w[c]
                if not s.startswith(w, si):
                    return False
                return dfs(pi + 1, si + len(w))
            for end in range(si + 1, len(s) + 1):
                w = s[si:end]
                if w in w2p:
                    continue
                p2w[c] = w; w2p[w] = c
                if dfs(pi + 1, end):
                    return True
                del p2w[c]; del w2p[w]
            return False
        return dfs(0, 0)
```

```cpp [C++]
class Solution {
    unordered_map<char, string> p2w;
    unordered_map<string, char> w2p;
public:
    bool wordPatternMatch(string pattern, string s) {
        return dfs(pattern, 0, s, 0);
    }
    bool dfs(string& pattern, int pi, string& s, int si) {
        if (pi == pattern.size() && si == s.size()) return true;
        if (pi == pattern.size() || si == s.size()) return false;
        char c = pattern[pi];
        if (p2w.count(c)) {
            string w = p2w[c];
            if (s.compare(si, w.size(), w) != 0) return false;
            return dfs(pattern, pi + 1, s, si + w.size());
        }
        for (int end = si + 1; end <= s.size(); end++) {
            string w = s.substr(si, end - si);
            if (w2p.count(w)) continue;
            p2w[c] = w; w2p[w] = c;
            if (dfs(pattern, pi + 1, s, end)) return true;
            p2w.erase(c); w2p.erase(w);
        }
        return false;
    }
};
```

```go [Go]
func wordPatternMatch(pattern string, s string) bool {
    p2w := map[rune]string{}
    w2p := map[string]rune{}
    var dfs func(pi, si int) bool
    dfs = func(pi, si int) bool {
        if pi == len(pattern) && si == len(s) { return true }
        if pi == len(pattern) || si == len(s) { return false }
        c := rune(pattern[pi])
        if w, ok := p2w[c]; ok {
            if !strings.HasPrefix(s[si:], w) { return false }
            return dfs(pi+1, si+len(w))
        }
        for end := si + 1; end <= len(s); end++ {
            w := s[si:end]
            if _, ok := w2p[w]; ok { continue }
            p2w[c] = w; w2p[w] = c
            if dfs(pi+1, end) { return true }
            delete(p2w, c); delete(w2p, w)
        }
        return false
    }
    return dfs(0, 0)
}
```

```js [JavaScript]
var wordPatternMatch = function (pattern, s) {
    const p2w = new Map(), w2p = new Map();
    const dfs = (pi, si) => {
        if (pi === pattern.length && si === s.length) return true;
        if (pi === pattern.length || si === s.length) return false;
        const c = pattern[pi];
        if (p2w.has(c)) {
            const w = p2w.get(c);
            if (!s.startsWith(w, si)) return false;
            return dfs(pi + 1, si + w.length);
        }
        for (let end = si + 1; end <= s.length; end++) {
            const w = s.slice(si, end);
            if (w2p.has(w)) continue;
            p2w.set(c, w); w2p.set(w, c);
            if (dfs(pi + 1, end)) return true;
            p2w.delete(c); w2p.delete(w);
        }
        return false;
    };
    return dfs(0, 0);
};
```

::::::

**复杂度：** 最坏时间 `O(nᵐ)`（回溯枚举划分），空间 `O(m)`（递归栈）。

## 三、总结

相较于 `290 单词规律`（已用空格分好，`O(n)` 双射校验），本题要求 **自己划分** `s`，必须用回溯枚举子串。仍是双向映射保证双射，只是多了一层「枚举子串长度」的循环和回溯。剪枝点：`w2p` 已含该子串则跳过（避免重复映射）。这与 `87 扰乱字符串`、`131 分割回文串` 同属「枚举划分 + 回溯」家族。
