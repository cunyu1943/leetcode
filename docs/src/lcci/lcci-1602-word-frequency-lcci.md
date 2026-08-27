# [面试题 16.02. 单词频率](https://leetcode.cn/problems/words-frequency-lcci/)

## 一、题目描述

设计一个方法，找出任意给定单词在一本书中的出现频率。

你的实现应该支持如下操作：

- `WordsFrequency(book)` 构造函数，参数为字符串数组（表示书中若干单词）。
- `get(word)` 查询指定单词在书中出现的次数，若未出现返回 0。

**示例：**

```
WordsFrequency wordsFrequency = new WordsFrequency(["i", "have", "an", "apple", "apple"]);
wordsFrequency.get("apple"); // 返回 2
wordsFrequency.get("pineapple"); // 返回 0
```

**提示：**

- `1 <= book.length <= 100000`
- `book[i]` 仅由小写字母组成
- `1 <= book[i].length <= 10`
- `get` 方法调用次数不会超过 100000

---

## 二、解答方法

### 2.1 方法一：哈希表计数

**1. 思路**

构造函数中将数组中所有单词放入哈希表统计词频；`get` 时直接查表。构造 `O(N)`，查询 `O(1)`。

**2. 代码实现**

::::::: code-group

```java [Java]
class WordsFrequency {
    Map<String, Integer> map = new HashMap<>();
    public WordsFrequency(String[] book) {
        for (String w : book) map.put(w, map.getOrDefault(w, 0) + 1);
    }
    public int get(String word) {
        return map.getOrDefault(word, 0);
    }
}
```

```python [Python]
class WordsFrequency:
    def __init__(self, book: List[str]):
        from collections import Counter
        self.cnt = Counter(book)
    def get(self, word: str) -> int:
        return self.cnt.get(word, 0)
```

```go [Go]
type WordsFrequency struct {
    cnt map[string]int
}
func Constructor(book []string) WordsFrequency {
    m := map[string]int{}
    for _, w := range book { m[w]++ }
    return WordsFrequency{cnt: m}
}
func (w *WordsFrequency) Get(word string) int {
    return w.cnt[word]
}
```

```c [C]
// C 中可用哈希表（如 uthash）统计，逻辑同 Java：构造时建表，查询时 O(1) 取词频
```

```cpp [C++]
class WordsFrequency {
    unordered_map<string, int> cnt;
public:
    WordsFrequency(vector<string>& book) {
        for (auto& w : book) cnt[w]++;
    }
    int get(string word) {
        return cnt.count(word) ? cnt[word] : 0;
    }
};
```

```javascript [JavaScript]
var WordsFrequency = function(book) {
    this.cnt = {};
    for (const w of book) this.cnt[w] = (this.cnt[w] || 0) + 1;
};
WordsFrequency.prototype.get = function(word) {
    return this.cnt[word] || 0;
};
```

```typescript [TypeScript]
class WordsFrequency {
    private cnt: Record<string, number> = {};
    constructor(book: string[]) {
        for (const w of book) this.cnt[w] = (this.cnt[w] || 0) + 1;
    }
    get(word: string): number {
        return this.cnt[word] || 0;
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：构造 `O(N)`，查询 `O(1)`。
- **空间复杂度**：`O(N)`（哈希表）。

---

### 2.2 方法二：前缀树（Trie）计数

**1. 思路**

用 Trie 记录每个单词末尾节点的出现次数，适合超长单词或需要前缀相关扩展的场景。对纯词频统计，效率略低于哈希表。

**2. 代码实现**

::::::: code-group

```java [Java]
class WordsFrequency {
    class Node { Node[] children = new Node[26]; int end = 0; }
    Node root = new Node();
    public WordsFrequency(String[] book) {
        for (String w : book) {
            Node cur = root;
            for (char c : w.toCharArray()) {
                int k = c - 'a';
                if (cur.children[k] == null) cur.children[k] = new Node();
                cur = cur.children[k];
            }
            cur.end++;
        }
    }
    public int get(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int k = c - 'a';
            if (cur.children[k] == null) return 0;
            cur = cur.children[k];
        }
        return cur.end;
    }
}
```

```python [Python]
class WordsFrequency:
    def __init__(self, book):
        self.root = {}
        for w in book:
            cur = self.root
            for ch in w:
                cur = cur.setdefault(ch, {})
            cur['#'] = cur.get('#', 0) + 1
    def get(self, word):
        cur = self.root
        for ch in word:
            if ch not in cur: return 0
            cur = cur[ch]
        return cur.get('#', 0)
```

```cpp [C++]
class WordsFrequency {
    struct Node { Node* children[26] = {nullptr}; int end = 0; };
    Node* root = new Node();
public:
    WordsFrequency(vector<string>& book) {
        for (auto& w : book) {
            Node* cur = root;
            for (char c : w) {
                int k = c - 'a';
                if (!cur->children[k]) cur->children[k] = new Node();
                cur = cur->children[k];
            }
            cur->end++;
        }
    }
    int get(string word) {
        Node* cur = root;
        for (char c : word) {
            int k = c - 'a';
            if (!cur->children[k]) return 0;
            cur = cur->children[k];
        }
        return cur->end;
    }
};
```

```javascript [JavaScript]
var WordsFrequency = function(book) {
    this.root = {};
    for (const w of book) {
        let cur = this.root;
        for (const ch of w) cur = cur[ch] = cur[ch] || {};
        cur['#'] = (cur['#'] || 0) + 1;
    }
};
WordsFrequency.prototype.get = function(word) {
    let cur = this.root;
    for (const ch of word) {
        if (!(ch in cur)) return 0;
        cur = cur[ch];
    }
    return cur['#'] || 0;
};
```

```typescript [TypeScript]
class WordsFrequency {
    private root: Record<string, any> = {};
    constructor(book: string[]) {
        for (const w of book) {
            let cur = this.root;
            for (const ch of w) cur = cur[ch] = cur[ch] || {};
            cur['#'] = (cur['#'] || 0) + 1;
        }
    }
    get(word: string): number {
        let cur = this.root;
        for (const ch of word) {
            if (!(ch in cur)) return 0;
            cur = cur[ch];
        }
        return cur['#'] || 0;
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：构造 `O(N·L)`，查询 `O(L)`。
- **空间复杂度**：`O(N·L)`。

---

## 三、总结

| 方法     | 时间复杂度（构造/查询） | 空间复杂度 | 特点                       |
| -------- | ----------------------- | ---------- | -------------------------- |
| 哈希表   | `O(N)` / `O(1)`        | `O(N)`     | 实现简单，推荐             |
| Trie     | `O(N·L)` / `O(L)`      | `O(N·L)`   | 适合前缀扩展场景           |

**推荐**：使用哈希表统计词频，查询效率最高。
