# [LCR 063. 单词替换](https://leetcode.cn/problems/UhWRSj/)



## 一、题目描述

在英语中，有一个叫做 **词根(root)** 的概念，它可以和其他单词组合成另一个 **新词**。我们称这个词根为这个新词的 **前缀**。

例如，`"un"` 是 `"unhappy"` 的前缀，`"unhappy"` 就是由根 `"un"` 组成的新词。

现在给定一个由许多 **词根** 组成的词典 `dictionary` 和一个用空格分隔单词形成的句子 `sentence`。你需要将句子中的所有 **继承词** 用 **词根** 替换掉。如果 **继承词** 有许多可以形成它的 **词根**，则用 **最短** 的词根替换它。

你需要输出替换之后的句子。



**示例 1：**

```
输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
输出："the cat was rat by the bat"
```

**示例 2：**

```
输入：dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
输出："a a b c"
```

**提示：**

- `1 <= dictionary.length <= 1000`
- `1 <= dictionary[i].length <= 100`
- `dictionary[i]` 仅由小写字母组成
- `1 <= sentence.length <= 10⁶`
- `sentence` 仅由小写字母和空格组成，句子中的单词数量不超过 1000



## 二、解答方法

### 2.1 方法一：前缀集合 + 枚举

1. **思路**

把词典放入哈希集合。对句子中每个单词，从长度 1 开始依次尝试前缀，若前缀在集合中，则用该前缀替换单词；若所有前缀都不在集合中，保留原词。

时间 `O(单词数 × 词长²)`，空间 `O(词典总长度)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        Set<String> dict = new HashSet<>(dictionary);
        StringBuilder sb = new StringBuilder();
        for (String w : sentence.split(" ")) {
            String prefix = w;
            for (int i = 1; i <= w.length(); i++) {
                if (dict.contains(w.substring(0, i))) {
                    prefix = w.substring(0, i);
                    break;
                }
            }
            if (sb.length() > 0) sb.append(' ');
            sb.append(prefix);
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        roots = set(dictionary)
        res = []
        for w in sentence.split():
            prefix = w
            for i in range(1, len(w) + 1):
                if w[:i] in roots:
                    prefix = w[:i]
                    break
            res.append(prefix)
        return ' '.join(res)
```

```cpp [C++]
class Solution {
public:
    string replaceWords(vector<string>& dictionary, string sentence) {
        unordered_set<string> roots(dictionary.begin(), dictionary.end());
        string res;
        int n = sentence.size(), i = 0;
        while (i < n) {
            int j = i;
            while (j < n && sentence[j] != ' ') j++;
            string w = sentence.substr(i, j - i);
            string prefix = w;
            for (int len = 1; len <= w.size(); len++) {
                if (roots.count(w.substr(0, len))) {
                    prefix = w.substr(0, len);
                    break;
                }
            }
            if (!res.empty()) res += ' ';
            res += prefix;
            i = j + 1;
        }
        return res;
    }
};
```

```go [Go]
func replaceWords(dictionary []string, sentence string) string {
    roots := map[string]bool{}
    for _, r := range dictionary {
        roots[r] = true
    }
    words := strings.Split(sentence, " ")
    for idx, w := range words {
        prefix := w
        for i := 1; i <= len(w); i++ {
            if roots[w[:i]] {
                prefix = w[:i]
                break
            }
        }
        words[idx] = prefix
    }
    return strings.Join(words, " ")
}
```

```js [JavaScript]
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
    const roots = new Set(dictionary);
    return sentence.split(' ').map((w) => {
        for (let i = 1; i <= w.length; i++) {
            if (roots.has(w.slice(0, i))) return w.slice(0, i);
        }
        return w;
    }).join(' ');
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

char* replaceWords(char** dictionary, int dictionarySize, char* sentence) {
    // 为简洁用「逐前缀 strncmp」判断词根是否存在
    char* res = (char*)malloc(1000005 * sizeof(char));
    res[0] = '\0';
    int n = (int)strlen(sentence), i = 0;
    while (i < n) {
        int j = i;
        while (j < n && sentence[j] != ' ') j++;
        // 提取单词
        char w[101];
        memcpy(w, sentence + i, j - i);
        w[j - i] = '\0';
        // 找最短词根
        char prefix[101];
        int found = 0;
        for (int len = 1; len <= (int)strlen(w); len++) {
            for (int d = 0; d < dictionarySize; d++) {
                if (strlen(dictionary[d]) == len &&
                    strncmp(dictionary[d], w, len) == 0) {
                    memcpy(prefix, w, len);
                    prefix[len] = '\0';
                    found = 1;
                    break;
                }
            }
            if (found) break;
        }
        if (!found) strcpy(prefix, w);
        if (strlen(res) > 0) strcat(res, " ");
        strcat(res, prefix);
        i = j + 1;
    }
    return res;
}
```

```ts [TypeScript]
function replaceWords(dictionary: string[], sentence: string): string {
    const roots = new Set(dictionary);
    return sentence.split(' ').map((w) => {
        for (let i = 1; i <= w.length; i++) {
            if (roots.has(w.slice(0, i))) return w.slice(0, i);
        }
        return w;
    }).join(' ');
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(单词数 × 词长²)`，最坏枚举每个单词的所有前缀。
- **空间复杂度**：`O(词典总长)`，哈希集合。

### 2.2 方法二：前缀树（Trie）

1. **思路**

把词典插入 Trie。对句子中每个单词沿 Trie 逐字符走，遇到「是词根的节点」即得到最短词根并停止；若走完整棵树都不是词根，保留原词。省去逐前缀的重复比较，时间更优。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    private static class Node {
        Node[] children = new Node[26];
        boolean isRoot;
    }
    public String replaceWords(List<String> dictionary, String sentence) {
        Node root = new Node();
        for (String r : dictionary) {
            Node cur = root;
            for (char c : r.toCharArray()) {
                if (cur.children[c - 'a'] == null) cur.children[c - 'a'] = new Node();
                cur = cur.children[c - 'a'];
            }
            cur.isRoot = true;
        }
        StringBuilder sb = new StringBuilder();
        for (String w : sentence.split(" ")) {
            String replace = w;
            Node cur = root;
            for (int i = 0; i < w.length(); i++) {
                cur = cur.children[w.charAt(i) - 'a'];
                if (cur == null) break;
                if (cur.isRoot) {
                    replace = w.substring(0, i + 1);
                    break;
                }
            }
            if (sb.length() > 0) sb.append(' ');
            sb.append(replace);
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        root = {}
        for r in dictionary:
            node = root
            for ch in r:
                node = node.setdefault(ch, {})
            node['#'] = True

        res = []
        for w in sentence.split():
            replace = w
            node = root
            for i, ch in enumerate(w):
                if ch not in node:
                    break
                node = node[ch]
                if '#' in node:
                    replace = w[:i + 1]
                    break
            res.append(replace)
        return ' '.join(res)
```

```cpp [C++]
class Solution {
public:
    string replaceWords(vector<string>& dictionary, string sentence) {
        TrieNode* root = new TrieNode();
        for (string& r : dictionary) {
            TrieNode* cur = root;
            for (char c : r) {
                if (!cur->next[c - 'a']) cur->next[c - 'a'] = new TrieNode();
                cur = cur->next[c - 'a'];
            }
            cur->isRoot = true;
        }
        string res;
        int n = sentence.size(), i = 0;
        while (i < n) {
            int j = i;
            while (j < n && sentence[j] != ' ') j++;
            string w = sentence.substr(i, j - i);
            string replace = w;
            TrieNode* cur = root;
            for (int k = 0; k < w.size(); k++) {
                cur = cur->next[w[k] - 'a'];
                if (!cur) break;
                if (cur->isRoot) { replace = w.substr(0, k + 1); break; }
            }
            if (!res.empty()) res += ' ';
            res += replace;
            i = j + 1;
        }
        return res;
    }
private:
    struct TrieNode {
        TrieNode* next[26];
        bool isRoot;
        TrieNode() : isRoot(false) {
            for (int i = 0; i < 26; i++) next[i] = nullptr;
        }
    };
};
```

```go [Go]
func replaceWords(dictionary []string, sentence string) string {
    root := &node{}
    for _, r := range dictionary {
        cur := root
        for i := 0; i < len(r); i++ {
            idx := r[i] - 'a'
            if cur.children[idx] == nil {
                cur.children[idx] = &node{}
            }
            cur = cur.children[idx]
        }
        cur.isRoot = true
    }
    words := strings.Split(sentence, " ")
    for wIdx, w := range words {
        replace := w
        cur := root
        for i := 0; i < len(w); i++ {
            cur = cur.children[w[i]-'a']
            if cur == nil {
                break
            }
            if cur.isRoot {
                replace = w[:i+1]
                break
            }
        }
        words[wIdx] = replace
    }
    return strings.Join(words, " ")
}

type node struct {
    children [26]*node
    isRoot   bool
}
```

```js [JavaScript]
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
    const root = {};
    for (const r of dictionary) {
        let cur = root;
        for (const ch of r) {
            cur[ch] = cur[ch] || {};
            cur = cur[ch];
        }
        cur.isRoot = true;
    }
    return sentence.split(' ').map((w) => {
        let cur = root;
        for (let i = 0; i < w.length; i++) {
            cur = cur[w[i]];
            if (!cur) break;
            if (cur.isRoot) return w.slice(0, i + 1);
        }
        return w;
    }).join(' ');
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

typedef struct TrieNode {
    struct TrieNode* children[26];
    int isRoot;
} TrieNode;

char* replaceWords(char** dictionary, int dictionarySize, char* sentence) {
    TrieNode* root = (TrieNode*)calloc(1, sizeof(TrieNode));
    for (int d = 0; d < dictionarySize; d++) {
        TrieNode* cur = root;
        for (int k = 0; dictionary[d][k]; k++) {
            int idx = dictionary[d][k] - 'a';
            if (!cur->children[idx]) cur->children[idx] = (TrieNode*)calloc(1, sizeof(TrieNode));
            cur = cur->children[idx];
        }
        cur->isRoot = 1;
    }
    char* res = (char*)malloc(1000005 * sizeof(char));
    res[0] = '\0';
    int n = (int)strlen(sentence), i = 0;
    while (i < n) {
        int j = i;
        while (j < n && sentence[j] != ' ') j++;
        char w[101];
        memcpy(w, sentence + i, j - i);
        w[j - i] = '\0';
        char replace[101];
        strcpy(replace, w);
        TrieNode* cur = root;
        for (int k = 0; k < (int)strlen(w); k++) {
            cur = cur->children[w[k] - 'a'];
            if (!cur) break;
            if (cur->isRoot) {
                memcpy(replace, w, k + 1);
                replace[k + 1] = '\0';
                break;
            }
        }
        if (strlen(res) > 0) strcat(res, " ");
        strcat(res, replace);
        i = j + 1;
    }
    // 释放 trie（简化，可省略）
    return res;
}
```

```ts [TypeScript]
function replaceWords(dictionary: string[], sentence: string): string {
    interface TrieNode {
        children: Record<string, TrieNode>;
        isRoot?: boolean;
    }
    const root: TrieNode = { children: {} };
    for (const r of dictionary) {
        let cur = root;
        for (const ch of r) {
            cur.children[ch] = cur.children[ch] || { children: {} };
            cur = cur.children[ch];
        }
        cur.isRoot = true;
    }
    return sentence.split(' ').map((w) => {
        let cur: TrieNode = root;
        for (let i = 0; i < w.length; i++) {
            const nxt = cur.children[w[i]];
            if (!nxt) break;
            cur = nxt;
            if (cur.isRoot) return w.slice(0, i + 1);
        }
        return w;
    }).join(' ');
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(词典总长 + 单词数 × 词长)`，Trie 查询与词长成正比。
- **空间复杂度**：`O(词典总长)`，Trie 节点。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前缀集合 | `O(词数×词长²)` | `O(词典长)` | 简单直接 |
| Trie 前缀树 | `O(词典长+词数×词长)` | `O(词典长)` | 高效，推荐 |

「找最短词根」最适合用 Trie：沿树走一步判断一步，第一个遇到的词根节点即为最短前缀，查询复杂度与词长成正比。

