# [288. 单词的唯一缩写](https://leetcode.cn/problems/unique-word-abbreviation/) [🔒 会员题]

## 一、题目描述

一个单词的 **缩写** 由 **首字母 + 中间字母数 + 尾字母** 组成。例如 `"internationalization"` 缩写为 `"i18n"`（`i` + 18 + `n`）。

给定一个字典 `dictionary`（单词数组），实现 `ValidWordAbbr` 类：

-   `ValidWordAbbr(dictionary)` 用字典初始化对象；
-   `boolean isUnique(String word)`：如果字典中 **没有任何** 与 `word` **缩写相同但单词本身不同** 的词，则返回 `true`（即：`word` 的缩写是「唯一」的，包括字典为空、或只有 `word` 自己用这个缩写的情况）。

**示例：**

```
输入：["ValidWordAbbr","isUnique","isUnique","isUnique","isUnique"]
     [["deer","door","cake","card"]],["dear"],["cart"],["cane"],["make"]
输出：[null,false,true,false,true]
解释：deer/door 缩写都是 "d2r" → "dear" 缩写 d2r 不唯一(false)；
     cart 缩写 c2t 字典无 → true；cane c2e 字典只有 cake(c2e)≠cane → false；
     make m2e 字典无 → true
```

**提示：** `0 <= dictionary.length <= 100000`，`1 <= dictionary[i].length <= 20`。

## 二、解答方法

### 方法一：哈希表记录「缩写 → 其对应的不同原词集合」

**思路：** 预处理：对每个字典单词计算缩写，用 `Map<缩写, Set<原词>>` 记录。查询 `word` 时，若缩写不存在于 map（说明字典无此缩写），或该缩写对应的原词集合 **只包含 `word` 自己**（字典里也只有这一个词且就是它），则 `word` 唯一（返回 true）；否则有别的词占用了这个缩写 → false。

:::::: code-group

```java [Java]
class ValidWordAbbr {
    private Map<String, Set<String>> map = new HashMap<>();
    public ValidWordAbbr(String[] dictionary) {
        for (String w : dictionary) {
            String abbr = abbr(w);
            map.computeIfAbsent(abbr, k -> new HashSet<>()).add(w);
        }
    }
    public boolean isUnique(String word) {
        String abbr = abbr(word);
        if (!map.containsKey(abbr)) return true;
        Set<String> set = map.get(abbr);
        // 唯一情况：集合里只有 word 自己
        return set.size() == 1 && set.contains(word);
    }
    private String abbr(String w) {
        if (w.length() <= 2) return w;
        return w.charAt(0) + (w.length() - 2) + w.charAt(w.length() - 1);
    }
}
```

```python [Python]
class ValidWordAbbr:
    def __init__(self, dictionary: List[str]):
        self.map = {}
        for w in dictionary:
            a = self._abbr(w)
            self.map.setdefault(a, set()).add(w)

    def isUnique(self, word: str) -> bool:
        a = self._abbr(word)
        if a not in self.map:
            return True
        s = self.map[a]
        return len(s) == 1 and word in s

    def _abbr(self, w):
        if len(w) <= 2:
            return w
        return w[0] + str(len(w) - 2) + w[-1]
```

```cpp [C++]
class ValidWordAbbr {
    unordered_map<string, unordered_set<string>> map;
    string abbr(const string& w) {
        if (w.size() <= 2) return w;
        return w[0] + to_string(w.size() - 2) + w.back();
    }
public:
    ValidWordAbbr(vector<string>& dictionary) {
        for (auto& w : dictionary) map[abbr(w)].insert(w);
    }
    bool isUnique(string word) {
        string a = abbr(word);
        if (!map.count(a)) return true;
        auto& s = map[a];
        return s.size() == 1 && s.count(word);
    }
};
```

```go [Go]
type ValidWordAbbr struct {
    m map[string]map[string]bool
}
func abbrOf(w string) string {
    if len(w) <= 2 { return w }
    return string(w[0]) + strconv.Itoa(len(w)-2) + string(w[len(w)-1])
}
func Constructor(dictionary []string) ValidWordAbbr {
    m := map[string]map[string]bool{}
    for _, w := range dictionary {
        a := abbrOf(w)
        if m[a] == nil { m[a] = map[string]bool{} }
        m[a][w] = true
    }
    return ValidWordAbbr{m: m}
}
func (v *ValidWordAbbr) IsUnique(word string) bool {
    a := abbrOf(word)
    if v.m[a] == nil { return true }
    if len(v.m[a]) == 1 && v.m[a][word] { return true }
    return false
}
```

```js [JavaScript]
var ValidWordAbbr = function (dictionary) {
    this.map = new Map();
    for (const w of dictionary) {
        const a = this._abbr(w);
        if (!this.map.has(a)) this.map.set(a, new Set());
        this.map.get(a).add(w);
    }
};
ValidWordAbbr.prototype._abbr = function (w) {
    if (w.length <= 2) return w;
    return w[0] + (w.length - 2) + w[w.length - 1];
};
ValidWordAbbr.prototype.isUnique = function (word) {
    const a = this._abbr(word);
    if (!this.map.has(a)) return true;
    const set = this.map.get(a);
    return set.size === 1 && set.has(word);
};
```

::::::

**复杂度：** 构造 `O(L)`（L 为所有单词总长），查询 `O(1)`。

## 三、总结

易错点在于 `isUnique` 的判定：不是「字典里没有这个缩写就唯一」那么简单——若字典中只有 `word` 本身占用该缩写，也应返回 `true`。因此必须记录 **每个缩写对应的原词集合**，查询时检查集合是否仅含 `word`。注意缩写函数对长度 ≤2 的单词直接返回原词（如 `"a"`、`"ab"` 无法缩成 `a0a`）。同类设计题还有 `288/291` 等。
