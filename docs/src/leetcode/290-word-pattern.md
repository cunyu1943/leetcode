# [290. 单词规律](https://leetcode.cn/problems/word-pattern/)

## 一、题目描述

给定一种 `pattern(模式)` 和一个字符串 `s`，请你判断 `s` 是否符合 `pattern`。

`pattern` 中的字母对应字符串 `s` 中的单词，二者需满足 **双射（一一对应）** 关系。`s` 中的单词用单个空格分隔。

**示例：**

```
输入：pattern = "abba", s = "dog cat cat dog"   输出：true
输入：pattern = "abba", s = "dog cat cat fish"  输出：false
输入：pattern = "aaaa", s = "dog cat cat dog"   输出：false
```

**提示：** `1 <= pattern.length <= 300`，`1 <= s.length <= 3000`，`s` 仅由小写英文字母和空格组成，`s` 不含前导/尾随空格且单词用单空格分隔。

## 二、解答方法

### 方法一：双向哈希（双射校验）

**思路：** 用两个 `Map`：`p2w`（模式字符 → 单词）、`w2p`（单词 → 模式字符）。遍历每个 `(模式字符, 单词)` 对：

- 若 `p` 已映射到另一个单词，或 `w` 已映射到另一个字符 → 冲突，返回 `false`；
- 否则建立双向映射。

最后还要确保单词数量与模式长度相等。

:::::: code-group

```java [Java]
class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (words.length != pattern.length()) return false;
        Map<Character, String> p2w = new HashMap<>();
        Map<String, Character> w2p = new HashMap<>();
        for (int i = 0; i < pattern.length(); i++) {
            char p = pattern.charAt(i);
            String w = words[i];
            if (p2w.containsKey(p) && !p2w.get(p).equals(w)) return false;
            if (w2p.containsKey(w) && w2p.get(w) != p) return false;
            p2w.put(p, w);
            w2p.put(w, p);
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(words) != len(pattern):
            return False
        p2w, w2p = {}, {}
        for p, w in zip(pattern, words):
            if p in p2w and p2w[p] != w: return False
            if w in w2p and w2p[w] != p: return False
            p2w[p] = w
            w2p[w] = p
        return True
```

```cpp [C++]
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> words;
        stringstream ss(s); string w;
        while (ss >> w) words.push_back(w);
        if (words.size() != pattern.size()) return false;
        unordered_map<char, string> p2w;
        unordered_map<string, char> w2p;
        for (int i = 0; i < pattern.size(); i++) {
            char p = pattern[i]; string w = words[i];
            if (p2w.count(p) && p2w[p] != w) return false;
            if (w2p.count(w) && w2p[w] != p) return false;
            p2w[p] = w; w2p[w] = p;
        }
        return true;
    }
};
```

```go [Go]
func wordPattern(pattern string, s string) bool {
    words := strings.Split(s, " ")
    if len(words) != len(pattern) { return false }
    p2w := map[rune]string{}
    w2p := map[string]rune{}
    for i, p := range pattern {
        w := words[i]
        if v, ok := p2w[p]; ok && v != w { return false }
        if c, ok := w2p[w]; ok && c != p { return false }
        p2w[p] = w
        w2p[w] = p
    }
    return true
}
```

```js [JavaScript]
var wordPattern = function (pattern, s) {
    const words = s.split(' ');
    if (words.length !== pattern.length) return false;
    const p2w = new Map(), w2p = new Map();
    for (let i = 0; i < pattern.length; i++) {
        const p = pattern[i], w = words[i];
        if (p2w.has(p) && p2w.get(p) !== w) return false;
        if (w2p.has(w) && w2p.get(w) !== p) return false;
        p2w.set(p, w);
        w2p.set(w, p);
    }
    return true;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

本题与 `205 同构字符串` 完全同构，只是「模式」从字符串变成「字符 pattern」对应「单词」。核心都是 **双射校验**——必须同时检查 `a→b` 和 `b→a` 两个方向，单方向映射会漏掉「多对一 / 一对多」错误（如 `pattern="abba", s="dog dog dog dog"` 单方向会误判 true）。注意先比长度，再逐对校验。
