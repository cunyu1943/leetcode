# [211. 添加与搜索单词 - 数据结构设计](https://leetcode.cn/problems/design-add-and-search-words-data-structure/)



## 一、题目描述

请你设计一个数据结构，支持 **添加新单词** 和 **查找字符串是否与任何先前添加的字符串匹配** 。

实现词典类 `WordDictionary` ：

-   `WordDictionary()` 初始化词典对象
-   `void addWord(word)` 将 `word` 添加到数据结构中，之后可以对它进行匹配
-   `bool search(word)` 如果数据结构中存在字符串与 `word` 匹配，则返回 `true` ；否则，返回  `false` 。`word` 中可能包含一些 `'.'` ，每个 `.` 都可以表示任何一个字母。



**示例：**

```
输入：
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
输出：
[null,null,null,null,false,true,true,true]

解释：
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // 返回 False
wordDictionary.search("bad"); // 返回 True
wordDictionary.search(".ad"); // 返回 True
wordDictionary.search("b.."); // 返回 True
```

**提示：**

-   `1 <= word.length <= 500`
-   `addWord` 中的 `word` 由小写英文字母组成
-   `search` 中的 `word` 由 `'.'` 或小写英文字母组成
-   最多调用 `50000` 次 `addWord` 和 `search`



## 二、解答方法

### 2.1 方法一：Trie + DFS 回溯

1. **思路**

用前缀树（Trie）存储单词。搜索时：

- 遇到普通字符：沿对应子节点走；
- 遇到 `'.'`：需要 **遍历当前节点的所有子节点**（DFS 回溯）；
- 走到末尾时判断 `isEnd`。

2. **代码实现**

:::::: code-group

```java [Java]
class WordDictionary {
    private WordDictionary[] children;
    private boolean isEnd;

    public WordDictionary() {
        children = new WordDictionary[26];
        isEnd = false;
    }

    public void addWord(String word) {
        WordDictionary node = this;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new WordDictionary();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        return dfs(word, 0, this);
    }

    private boolean dfs(String word, int index, WordDictionary node) {
        if (index == word.length()) return node.isEnd;
        char c = word.charAt(index);
        if (c == '.') {
            for (WordDictionary child : node.children) {
                if (child != null && dfs(word, index + 1, child)) return true;
            }
            return false;
        } else {
            WordDictionary child = node.children[c - 'a'];
            return child != null && dfs(word, index + 1, child);
        }
    }
}
```

```python [Python]
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


class WordDictionary:

    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        def dfs(index, node):
            if index == len(word):
                return node.is_end
            ch = word[index]
            if ch == '.':
                return any(dfs(index + 1, child) for child in node.children.values())
            if ch not in node.children:
                return False
            return dfs(index + 1, node.children[ch])
        return dfs(0, self.root)
```

```go [Go]
type WordDictionary struct {
    children [26]*WordDictionary
    isEnd    bool
}

func Constructor() WordDictionary {
    return WordDictionary{}
}

func (w *WordDictionary) AddWord(word string) {
    node := w
    for _, ch := range word {
        idx := ch - 'a'
        if node.children[idx] == nil {
            node.children[idx] = &WordDictionary{}
        }
        node = node.children[idx]
    }
    node.isEnd = true
}

func (w *WordDictionary) Search(word string) bool {
    return dfs(word, 0, w)
}

func dfs(word string, index int, node *WordDictionary) bool {
    if index == len(word) {
        return node.isEnd
    }
    ch := word[index]
    if ch == '.' {
        for _, child := range node.children {
            if child != nil && dfs(word, index+1, child) {
                return true
            }
        }
        return false
    }
    child := node.children[ch-'a']
    return child != nil && dfs(word, index+1, child)
}
```

```cpp [C++]
class WordDictionary {
private:
    vector<WordDictionary*> children;
    bool isEnd;

    bool dfs(const string& word, int index, WordDictionary* node) {
        if (index == word.size()) return node->isEnd;
        char c = word[index];
        if (c == '.') {
            for (WordDictionary* child : node->children) {
                if (child && dfs(word, index + 1, child)) return true;
            }
            return false;
        }
        WordDictionary* child = node->children[c - 'a'];
        return child && dfs(word, index + 1, child);
    }
public:
    WordDictionary() : children(26, nullptr), isEnd(false) {}

    void addWord(string word) {
        WordDictionary* node = this;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) node->children[idx] = new WordDictionary();
            node = node->children[idx];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        return dfs(word, 0, this);
    }
};
```

```js [JavaScript]
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
var WordDictionary = function () {
    this.children = {};
    this.isEnd = false;
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
    let node = this;
    for (const ch of word) {
        if (!node.children[ch]) node.children[ch] = new WordDictionary();
        node = node.children[ch];
    }
    node.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
    const dfs = (index, node) => {
        if (index === word.length) return node.isEnd;
        const ch = word[index];
        if (ch === '.') {
            return Object.values(node.children).some(child => dfs(index + 1, child));
        }
        if (!node.children[ch]) return false;
        return dfs(index + 1, node.children[ch]);
    };
    return dfs(0, this);
};
```

```ts [TypeScript]
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEnd: boolean = false;
}

class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let node = this.root;
        for (const ch of word) {
            if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
            node = node.children.get(ch)!;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const dfs = (index: number, node: TrieNode): boolean => {
            if (index === word.length) return node.isEnd;
            const ch = word[index];
            if (ch === '.') {
                for (const child of node.children.values()) {
                    if (dfs(index + 1, child)) return true;
                }
                return false;
            }
            if (!node.children.has(ch)) return false;
            return dfs(index + 1, node.children.get(ch)!);
        };
        return dfs(0, this.root);
    }
}
```

::::::

3. **复杂度分析**

- **addWord**：`O(L)`，L 为单词长度。
- **search**：无 `.` 时 `O(L)`；有 `.` 时最坏 `O(26^L)`（实际受 Trie 规模限制）。
- **空间复杂度**：`O(T)`，T 为插入字符总数。

### 2.2 方法二：按长度分组 + 正则匹配

1. **思路**

把单词按长度存进哈希表 `Map<长度, Set<单词>>`。搜索时对同长度集合逐个正则匹配（`.` 天然支持）。实现简单，但在单词量大时较慢。

2. **代码实现（Python）**

```python
class WordDictionary:

    def __init__(self):
        self.words = {}

    def addWord(self, word: str) -> None:
        self.words.setdefault(len(word), set()).add(word)

    def search(self, word: str) -> bool:
        import re
        pattern = re.compile(word.replace('.', '[a-z]') + '$')
        return any(pattern.match(w) for w in self.words.get(len(word), []))
```

3. **复杂度分析**

- addWord `O(1)`，search `O(n × L)`，n 为同长度单词数。

## 三、总结

| 方法 | 优点 |
| ---- | ---- |
| Trie + DFS | 高效，标准解法，推荐 |
| 按长度分组 + 正则 | 实现简单，适合小数据 |

通配符 `.` 的搜索本质是 **树上的回溯（DFS）**：普通字符走唯一分支，`.` 走所有分支。这也为 `212. 单词搜索 II`（二维网格 + Trie）打下基础。
