# [208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)



## 一、题目描述

**[Trie](https://baike.baidu.com/item/字典树/9825209?fr=aladdin)**（发音类似 "try"）或者说 **前缀树** 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。

请你实现 `Trie` 类：

-   `Trie()` 初始化前缀树对象。
-   `void insert(String word)` 向前缀树中插入字符串 `word` 。
-   `boolean search(String word)` 如果字符串 `word` 在前缀树中，返回 `true`（即，在检索之前已经插入）；否则，返回 `false` 。
-   `boolean startsWith(String prefix)` 如果之前已经插入的字符串 `word` 的前缀之一为 `prefix` ，返回 `true` ；否则，返回 `false` 。



**示例：**

```
输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
```

**提示：**

-   `1 <= word.length, prefix.length <= 2000`
-   `word` 和 `prefix` 仅由小写英文字母组成
-   `insert`、`search` 和 `startsWith` 调用次数 **总计** 不超过 `3 * 10⁴` 次



## 二、解答方法

### 2.1 方法一：数组实现（26 个子节点指针）

1. **思路**

每个节点含 `children[26]`（指向 26 个小写字母子节点）和 `isEnd`（是否为单词结尾）。

- **插入**：逐字符创建/移动到子节点，末尾标记 `isEnd = true`。
- **查询**：逐字符移动，遇空返回 false；结束时需 `isEnd == true`。
- **前缀**：同上，但结束即返回 true，不检查 `isEnd`。

2. **代码实现**

:::::: code-group

```java [Java]
class Trie {
    private Trie[] children;
    private boolean isEnd;

    public Trie() {
        children = new Trie[26];
        isEnd = false;
    }

    public void insert(String word) {
        Trie node = this;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new Trie();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        Trie node = searchPrefix(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }

    private Trie searchPrefix(String prefix) {
        Trie node = this;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}
```

```python [Python]
class Trie:

    def __init__(self):
        self.children = [None] * 26
        self.is_end = False

    def insert(self, word: str) -> None:
        node = self
        for ch in word:
            idx = ord(ch) - ord('a')
            if not node.children[idx]:
                node.children[idx] = Trie()
            node = node.children[idx]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._search_prefix(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._search_prefix(prefix) is not None

    def _search_prefix(self, prefix: str):
        node = self
        for ch in prefix:
            idx = ord(ch) - ord('a')
            if not node.children[idx]:
                return None
            node = node.children[idx]
        return node
```

```go [Go]
type Trie struct {
    children [26]*Trie
    isEnd    bool
}

func Constructor() Trie {
    return Trie{}
}

func (t *Trie) Insert(word string) {
    node := t
    for _, ch := range word {
        idx := ch - 'a'
        if node.children[idx] == nil {
            node.children[idx] = &Trie{}
        }
        node = node.children[idx]
    }
    node.isEnd = true
}

func (t *Trie) Search(word string) bool {
    node := t.searchPrefix(word)
    return node != nil && node.isEnd
}

func (t *Trie) StartsWith(prefix string) bool {
    return t.searchPrefix(prefix) != nil
}

func (t *Trie) searchPrefix(prefix string) *Trie {
    node := t
    for _, ch := range prefix {
        idx := ch - 'a'
        if node.children[idx] == nil {
            return nil
        }
        node = node.children[idx]
    }
    return node
}
```

```cpp [C++]
class Trie {
private:
    vector<Trie*> children;
    bool isEnd;
    Trie* searchPrefix(string prefix) {
        Trie* node = this;
        for (char ch : prefix) {
            int idx = ch - 'a';
            if (node->children[idx] == nullptr) return nullptr;
            node = node->children[idx];
        }
        return node;
    }
public:
    Trie() : children(26, nullptr), isEnd(false) {}

    void insert(string word) {
        Trie* node = this;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!node->children[idx]) node->children[idx] = new Trie();
            node = node->children[idx];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        Trie* node = searchPrefix(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(string prefix) {
        return searchPrefix(prefix) != nullptr;
    }
};
```

```js [JavaScript]
/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
var Trie = function () {
    this.children = {};
    this.isEnd = false;
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let node = this;
    for (const ch of word) {
        if (!node.children[ch]) node.children[ch] = new Trie();
        node = node.children[ch];
    }
    node.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let node = this;
    for (const ch of word) {
        if (!node.children[ch]) return false;
        node = node.children[ch];
    }
    return node.isEnd;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    let node = this;
    for (const ch of prefix) {
        if (!node.children[ch]) return false;
        node = node.children[ch];
    }
    return true;
};
```

```ts [TypeScript]
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEnd: boolean = false;
}

class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;
        for (const ch of word) {
            if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
            node = node.children.get(ch)!;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const node = this.searchPrefix(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix: string): boolean {
        return this.searchPrefix(prefix) !== null;
    }

    private searchPrefix(prefix: string): TrieNode | null {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children.has(ch)) return null;
            node = node.children.get(ch)!;
        }
        return node;
    }
}
```

::::::

3. **复杂度分析**

- **初始化**：`O(1)`。
- **插入 / 查询**：`O(L)`，L 为字符串长度。
- **空间复杂度**：`O(T × 26)`，T 为节点总数。

## 三、总结

| 实现 | 优点 | 缺点 |
| ---- | ---- | ---- |
| 定长数组 `[26]` | 访问 `O(1)`，快 | 稀疏时浪费空间 |
| 哈希表 `Map` | 省空间，支持任意字符集 | 略慢 |

Trie 的核心价值是 **前缀共享**：多个字符串共享公共前缀路径，查找前缀为 `O(L)`。典型应用：自动补全、拼写检查、`212. 单词搜索 II`、`676. 实现一个魔法字典`。与哈希表相比，Trie 擅长前缀查询，哈希表擅长精确查找。
