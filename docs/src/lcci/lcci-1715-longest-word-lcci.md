# [面试题 17.15. 最长单词](https://leetcode.cn/problems/longest-word-lcci/)

## 一、题目描述

给定一组单词 `words`，编写一个程序，找出其中的最长单词，且该单词由这组单词中的其他单词组合而成。若有多个长度相同的结果，返回其中字典序最小的一个；若不存在任何由其他单词组合而成的单词，则返回空字符串。

**示例 1：**

```
输入: ["cat","banana","dog","nana","walk","walker","dogwalker"]
输出: "dogwalker"
解释: "dogwalker" 可由 "dog" 和 "walker" 组成。
```

**示例 2：**

```
输入: ["cat","dog","catdog"]
输出: "catdog"
```

---

## 二、解答方法

### 2.1 方法一：按长度排序 + 递归回溯

**1. 思路**

将所有单词按长度降序、字典序升序排序，优先检查更长且字典序更小的候选。对每个单词尝试用集合中的其他单词递归拼接（记忆化已失败的单词）。第一个能拼出的即为答案。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    Set<String> set;
    Set<String> fail = new HashSet<>();
    public String longestWord(String[] words) {
        set = new HashSet<>(Arrays.asList(words));
        List<String> list = new ArrayList<>(set);
        list.sort((a, b) -> a.length() != b.length() ? b.length() - a.length() : a.compareTo(b));
        for (String w : list) {
            if (canBuild(w, true)) return w;
        }
        return "";
    }
    private boolean canBuild(String w, boolean isOriginal) {
        if (w.isEmpty()) return true;
        if (!isOriginal && set.contains(w)) return true;
        if (fail.contains(w)) return false;
        for (int i = 1; i <= w.length(); i++) {
            String prefix = w.substring(0, i);
            if (set.contains(prefix) && canBuild(w.substring(i), false)) return true;
        }
        fail.add(w);
        return false;
    }
}
```

```python [Python]
class Solution:
    def longestWord(self, words: List[str]) -> str:
        wordset = set(words)
        fail = set()
        words.sort(key=lambda w: (-len(w), w))
        def can_build(w, original):
            if not w:
                return True
            if not original and w in wordset:
                return True
            if w in fail:
                return False
            for i in range(1, len(w) + 1):
                if w[:i] in wordset and can_build(w[i:], False):
                    return True
            fail.add(w)
            return False
        for w in words:
            if can_build(w, True):
                return w
        return ""
```

```go [Go]
func longestWord(words []string) string {
    set := map[string]bool{}
    for _, w := range words { set[w] = true }
    sort.Slice(words, func(i, j int) bool {
        if len(words[i]) != len(words[j]) { return len(words[i]) > len(words[j]) }
        return words[i] < words[j]
    })
    fail := map[string]bool{}
    var canBuild func(string, bool) bool
    canBuild = func(w string, original bool) bool {
        if w == "" { return true }
        if !original && set[w] { return true }
        if fail[w] { return false }
        for i := 1; i <= len(w); i++ {
            if set[w[:i]] && canBuild(w[i:], false) { return true }
        }
        fail[w] = true
        return false
    }
    for _, w := range words {
        if canBuild(w, true) { return w }
    }
    return ""
}
```

```c [C]
// 字符串回溯在 C 中实现较长，逻辑同 Python：集合+记忆化递归拼接
```

```cpp [C++]
class Solution {
    unordered_set<string> st, fail;
public:
    string longestWord(vector<string>& words) {
        for (auto& w : words) st.insert(w);
        sort(words.begin(), words.end(), [](string& a, string& b) {
            return a.size() != b.size() ? a.size() > b.size() : a < b;
        });
        for (auto& w : words) if (canBuild(w, true)) return w;
        return "";
    }
    bool canBuild(string w, bool original) {
        if (w.empty()) return true;
        if (!original && st.count(w)) return true;
        if (fail.count(w)) return false;
        for (int i = 1; i <= w.size(); i++) {
            if (st.count(w.substr(0, i)) && canBuild(w.substr(i), false)) return true;
        }
        fail.insert(w);
        return false;
    }
};
```

```javascript [JavaScript]
var longestWord = function(words) {
    const set = new Set(words);
    const fail = new Set();
    words.sort((a, b) => a.length !== b.length ? b.length - a.length : a.localeCompare(b));
    const canBuild = (w, original) => {
        if (w === "") return true;
        if (!original && set.has(w)) return true;
        if (fail.has(w)) return false;
        for (let i = 1; i <= w.length; i++) {
            if (set.has(w.slice(0, i)) && canBuild(w.slice(i), false)) return true;
        }
        fail.add(w);
        return false;
    };
    for (const w of words) if (canBuild(w, true)) return w;
    return "";
};
```

```typescript [TypeScript]
function longestWord(words: string[]): string {
    const set = new Set(words);
    const fail = new Set<string>();
    words.sort((a, b) => a.length !== b.length ? b.length - a.length : a.localeCompare(b));
    const canBuild = (w: string, original: boolean): boolean => {
        if (w === "") return true;
        if (!original && set.has(w)) return true;
        if (fail.has(w)) return false;
        for (let i = 1; i <= w.length; i++) {
            if (set.has(w.slice(0, i)) && canBuild(w.slice(i), false)) return true;
        }
        fail.add(w);
        return false;
    };
    for (const w of words) if (canBuild(w, true)) return w;
    return "";
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：约 `O(n · L²)`，n 为单词数，L 为平均长度（含回溯）。
- **空间复杂度**：`O(n · L)`。

---

### 2.2 方法二：Trie + 回溯

**1. 思路**

将所有单词插入 Trie，再对候选词做回溯。空间较集合法略省，但实现更复杂的分支剪枝。思路同上，仅在「前缀判断」时改用 Trie。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    class Node { Map<Character, Node> children = new HashMap<>(); boolean end = false; }
    public String longestWord(String[] words) {
        Node root = new Node();
        for (String w : words) {
            Node cur = root;
            for (char c : w.toCharArray()) cur = cur.children.computeIfAbsent(c, k -> new Node());
            cur.end = true;
        }
        String[] ans = {""};
        dfs(root, new StringBuilder(), ans, words.length);
        return ans[0];
    }
    private void dfs(Node node, StringBuilder sb, String[] ans, int n) {
        if (sb.length() > ans[0].length()) ans[0] = sb.toString();
        for (char c = 'a'; c <= 'z'; c++) {
            Node nxt = node.children.get(c);
            if (nxt != null && nxt.end && sb.length() < n) {
                sb.append(c);
                dfs(nxt, sb, ans, n);
                sb.deleteCharAt(sb.length() - 1);
            }
        }
    }
}
```

```python [Python]
class Solution:
    def longestWord(self, words: List[str]) -> str:
        trie = {}
        for w in words:
            node = trie
            for ch in w: node = node.setdefault(ch, {})
            node['#'] = True
        ans = [""]
        def dfs(node, path):
            if len(path) > len(ans[0]): ans[0] = path
            for ch, nxt in node.items():
                if ch != '#' and '#' in nxt and len(path) < len(words):
                    dfs(nxt, path + ch)
        dfs(trie, "")
        return ans[0]
```

```cpp [C++]
class Solution {
    struct Node { unordered_map<char, Node*> children; bool end = false; };
public:
    string longestWord(vector<string>& words) {
        Node* root = new Node();
        for (auto& w : words) {
            Node* cur = root;
            for (char c : w) {
                if (!cur->children[c]) cur->children[c] = new Node();
                cur = cur->children[c];
            }
            cur->end = true;
        }
        string ans = "";
        function<void(Node*, string)> dfs = [&](Node* node, string path) {
            if (path.size() > ans.size()) ans = path;
            for (char c = 'a'; c <= 'z'; c++) {
                auto it = node->children.find(c);
                if (it != node->children.end() && it->second->end && path.size() < words.size())
                    dfs(it->second, path + c);
            }
        };
        dfs(root, "");
        return ans;
    }
};
```

```javascript [JavaScript]
var longestWord = function(words) {
    const root = {};
    for (const w of words) {
        let cur = root;
        for (const ch of w) cur = cur[ch] = cur[ch] || {};
        cur['#'] = true;
    }
    let ans = "";
    const dfs = (node, path) => {
        if (path.length > ans.length) ans = path;
        for (const ch in node) {
            if (ch !== '#' && node[ch]['#'] && path.length < words.length) dfs(node[ch], path + ch);
        }
    };
    dfs(root, "");
    return ans;
};
```

```typescript [TypeScript]
function longestWord(words: string[]): string {
    const root: any = {};
    for (const w of words) {
        let cur = root;
        for (const ch of w) cur = cur[ch] = cur[ch] || {};
        cur['#'] = true;
    }
    let ans = "";
    const dfs = (node: any, path: string): void => {
        if (path.length > ans.length) ans = path;
        for (const ch in node) {
            if (ch !== '#' && node[ch]['#'] && path.length < words.length) dfs(node[ch], path + ch);
        }
    };
    dfs(root, "");
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n · L)`。
- **空间复杂度**：`O(n · L)`。

---

## 三、总结

| 方法           | 时间复杂度     | 空间复杂度 | 特点                       |
| -------------- | -------------- | ---------- | -------------------------- |
| 排序 + 回溯    | `O(n·L²)`      | `O(n·L)`   | 实现简单，推荐             |
| Trie + 回溯    | `O(n·L)`       | `O(n·L)`   | 前缀查询快，结构略复杂     |

**推荐**：用「排序 + 集合回溯」即可，`fail` 记忆化避免重复失败分支。
