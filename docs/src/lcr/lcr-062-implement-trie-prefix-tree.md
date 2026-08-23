# [LCR 062. 实现 Trie (前缀树)](https://leetcode.cn/problems/QC3m1A/)



## 一、题目描述

**[Trie](https://baike.baidu.com/item/字典树/9825209)**（发音类似 "try"）或者说 **前缀树** 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

- `Trie()` 初始化前缀树对象。
- `void insert(String word)` 向前缀树中插入字符串 `word` 。
- `boolean search(String word)` 如果字符串 `word` 在前缀树中，返回 `true`（即，在检索之前已经插入）；否则，返回 `false` 。
- `boolean startsWith(String prefix)` 如果之前已经插入的字符串 `word` 的前缀之一为 `prefix` ，返回 `true`；否则，返回 `false` 。



**示例 1：**

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

- `1 <= word.length, prefix.length <= 2000`
- `word` 和 `prefix` 仅由小写英文字母组成
- `insert`、`search` 和 `startsWith` 调用次数 **总计** 不超过 `3 * 10⁴` 次



## 二、解答方法

### 2.1 方法一：多叉树（子节点数组）

1. **思路**

每个 Trie 节点包含 26 个子节点指针和一个「是否是单词结尾」标记：

- `insert`：逐字符沿树向下，缺节点则创建，末尾打上结束标记；
- `search`：逐字符查找，最后检查结束标记；
- `startsWith`：逐字符查找，只要路径存在即可。

各操作时间 `O(len(word))`。

2. **代码实现**

::::::: code-group

```java [Java]
class Trie {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd;
    }
    private Node root;

    public Trie() {
        root = new Node();
    }

    public void insert(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) cur.children[idx] = new Node();
            cur = cur.children[idx];
        }
        cur.isEnd = true;
    }

    public boolean search(String word) {
        Node node = find(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private Node find(String s) {
        Node cur = root;
        for (char c : s.toCharArray()) {
            cur = cur.children[c - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }
}
```

```python [Python]
class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word: str) -> None:
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Trie()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, s: str):
        node = self
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node
```

```cpp [C++]
class Trie {
private:
    Trie* children[26];
    bool isEnd;

public:
    Trie() {
        memset(children, 0, sizeof(children));
        isEnd = false;
    }

    void insert(string word) {
        Trie* cur = this;
        for (char c : word) {
            int idx = c - 'a';
            if (!cur->children[idx]) cur->children[idx] = new Trie();
            cur = cur->children[idx];
        }
        cur->isEnd = true;
    }

    bool search(string word) {
        Trie* node = find(word);
        return node && node->isEnd;
    }

    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }

private:
    Trie* find(string& s) {
        Trie* cur = this;
        for (char c : s) {
            cur = cur->children[c - 'a'];
            if (!cur) return nullptr;
        }
        return cur;
    }
};
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
    cur := t
    for i := 0; i < len(word); i++ {
        idx := word[i] - 'a'
        if cur.children[idx] == nil {
            cur.children[idx] = &Trie{}
        }
        cur = cur.children[idx]
    }
    cur.isEnd = true
}

func (t *Trie) Search(word string) bool {
    node := t.find(word)
    return node != nil && node.isEnd
}

func (t *Trie) StartsWith(prefix string) bool {
    return t.find(prefix) != nil
}

func (t *Trie) find(s string) *Trie {
    cur := t
    for i := 0; i < len(s); i++ {
        cur = cur.children[s[i]-'a']
        if cur == nil {
            return nil
        }
    }
    return cur
}
```

```js [JavaScript]
var Trie = function () {
    this.children = new Array(26).fill(null);
    this.isEnd = false;
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let cur = this;
    for (const ch of word) {
        const idx = ch.charCodeAt(0) - 97;
        if (!cur.children[idx]) cur.children[idx] = new Trie();
        cur = cur.children[idx];
    }
    cur.isEnd = true;
};

Trie.prototype.find = function (s) {
    let cur = this;
    for (const ch of s) {
        cur = cur.children[ch.charCodeAt(0) - 97];
        if (!cur) return null;
    }
    return cur;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    const node = this.find(word);
    return !!node && node.isEnd;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    return this.find(prefix) !== null;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

typedef struct Trie {
    struct Trie* children[26];
    int isEnd;
} Trie;

Trie* trieCreate() {
    Trie* node = (Trie*)calloc(1, sizeof(Trie));
    return node;
}

void trieInsert(Trie* obj, char* word) {
    Trie* cur = obj;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!cur->children[idx]) cur->children[idx] = trieCreate();
        cur = cur->children[idx];
    }
    cur->isEnd = 1;
}

static Trie* find(Trie* cur, char* s) {
    for (int i = 0; s[i]; i++) {
        cur = cur->children[s[i] - 'a'];
        if (!cur) return NULL;
    }
    return cur;
}

bool trieSearch(Trie* obj, char* word) {
    Trie* node = find(obj, word);
    return node && node->isEnd;
}

bool trieStartsWith(Trie* obj, char* prefix) {
    return find(obj, prefix) != NULL;
}

void trieFree(Trie* obj) {
    if (!obj) return;
    for (int i = 0; i < 26; i++) trieFree(obj->children[i]);
    free(obj);
}
```

```ts [TypeScript]
class Trie {
    private children: (Trie | null)[] = new Array(26).fill(null);
    private isEnd = false;

    insert(word: string): void {
        let cur: Trie = this;
        for (const ch of word) {
            const idx = ch.charCodeAt(0) - 97;
            if (!cur.children[idx]) cur.children[idx] = new Trie();
            cur = cur.children[idx]!;
        }
        cur.isEnd = true;
    }

    search(word: string): boolean {
        const node = this.find(word);
        return !!node && node.isEnd;
    }

    startsWith(prefix: string): boolean {
        return this.find(prefix) !== null;
    }

    private find(s: string): Trie | null {
        let cur: Trie = this;
        for (const ch of s) {
            const node = cur.children[ch.charCodeAt(0) - 97];
            if (!node) return null;
            cur = node;
        }
        return cur;
    }
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`insert` / `search` / `startsWith` 均为 `O(len(s))`。
- **空间复杂度**：插入所有单词的总节点数。

## 三、总结

| 方法 | 时间 | 空间 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 多叉树 | `O(len)` | `O(节点数)` | 标准 Trie 实现 |

Trie 用「共享前缀」的树结构把字符串检索降到与长度成正比，支持高效的「是否存在」「是否以某前缀开头」查询，是字典类问题的基石。

