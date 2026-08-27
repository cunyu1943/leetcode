# [面试题 17.13. 恢复空格](https://leetcode.cn/problems/re-space-lcci/)

## 一、题目描述

哦，不！你不小心把一个长篇文章中的空格、标点都删掉了，并且大写也弄成了小写。像句子 `"I reset the computer. It still didn’t boot!"` 变成了 `"iresetthecomputeritstilldidntboot"`。在处理标点符号和大小写之前，你得先把它断成词语。当然了，你手头有一本字典。

为方便，我们需要只根据字典里的词还原出原句。给定一个字典（字符串数组 `dictionary`）和一个字符串 `sentence`，用空格把 `sentence` 分割成若干个字典中存在的单词，使得未匹配的字符数最少。返回最少未匹配字符数。

**示例：**

```
输入:
dictionary = ["looked","just","like","her","brother"]
sentence = "jesslookedjustliketimherbrother"
输出: 7
解释: 断句后为 "jess looked just like tim her brother"，其中 "jess" 和 "tim" 不在字典，共 7 个字母未匹配。
```

**提示：**

- `1 <= sentence.length <= 1000`
- `1 <= dictionary.length <= 1000`
- `dictionary[i].length <= 100`

---

## 二、解答方法

### 2.1 方法一：动态规划 + 字典树（Trie）

**1. 思路**

`dp[i]` 表示前缀 `sentence[0..i-1]` 的最少未匹配字符数。转移：`dp[i] = dp[i-1] + 1`（当前字符不匹配），并尝试所有以 `i-1` 结尾的字典词，若 `sentence[j..i-1]` 是字典词则 `dp[i] = min(dp[i], dp[j])`。用 Trie 加速「以 `i-1` 结尾向前匹配字典词」的查找。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    class TrieNode { TrieNode[] children = new TrieNode[26]; boolean end = false; }
    public int respace(String[] dictionary, String sentence) {
        TrieNode root = new TrieNode();
        for (String w : dictionary) {
            TrieNode cur = root;
            for (int i = w.length() - 1; i >= 0; i--) {
                int c = w.charAt(i) - 'a';
                if (cur.children[c] == null) cur.children[c] = new TrieNode();
                cur = cur.children[c];
            }
            cur.end = true;
        }
        int n = sentence.length();
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i - 1] + 1;
            TrieNode cur = root;
            for (int j = i - 1; j >= 0; j--) {
                int c = sentence.charAt(j) - 'a';
                if (cur.children[c] == null) break;
                cur = cur.children[c];
                if (cur.end) dp[i] = Math.min(dp[i], dp[j]);
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Solution:
    def respace(self, dictionary: List[str], sentence: str) -> int:
        root = TrieNode()
        for w in dictionary:
            cur = root
            for ch in reversed(w):
                cur.children.setdefault(ch, TrieNode())
                cur = cur.children[ch]
            cur.end = True
        n = len(sentence)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            dp[i] = dp[i - 1] + 1
            cur = root
            for j in range(i - 1, -1, -1):
                ch = sentence[j]
                if ch not in cur.children: break
                cur = cur.children[ch]
                if cur.end:
                    dp[i] = min(dp[i], dp[j])
        return dp[n]
```

```go [Go]
type TrieNode struct {
    children [26]*TrieNode
    end      bool
}
func respace(dictionary []string, sentence string) int {
    root := &TrieNode{}
    for _, w := range dictionary {
        cur := root
        for i := len(w) - 1; i >= 0; i-- {
            c := w[i] - 'a'
            if cur.children[c] == nil { cur.children[c] = &TrieNode{} }
            cur = cur.children[c]
        }
        cur.end = true
    }
    n := len(sentence)
    dp := make([]int, n+1)
    for i := 1; i <= n; i++ { dp[i] = i }
    for i := 1; i <= n; i++ {
        if dp[i-1]+1 < dp[i] { dp[i] = dp[i-1] + 1 }
        cur := root
        for j := i - 1; j >= 0; j-- {
            c := sentence[j] - 'a'
            if cur.children[c] == nil { break }
            cur = cur.children[c]
            if cur.end {
                if dp[j] < dp[i] { dp[i] = dp[j] }
            }
        }
    }
    return dp[n]
}
```

```c [C]
// Trie 在 C 中实现较长，思路同 Java：倒序建 Trie，dp[i] 用向前匹配更新
```

```cpp [C++]
class TrieNode {
public:
    TrieNode* children[26] = {nullptr};
    bool end = false;
};
class Solution {
public:
    int respace(vector<string>& dictionary, string sentence) {
        TrieNode* root = new TrieNode();
        for (auto& w : dictionary) {
            TrieNode* cur = root;
            for (int i = w.size() - 1; i >= 0; i--) {
                int c = w[i] - 'a';
                if (!cur->children[c]) cur->children[c] = new TrieNode();
                cur = cur->children[c];
            }
            cur->end = true;
        }
        int n = sentence.size();
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i - 1] + 1;
            TrieNode* cur = root;
            for (int j = i - 1; j >= 0; j--) {
                int c = sentence[j] - 'a';
                if (!cur->children[c]) break;
                cur = cur->children[c];
                if (cur->end) dp[i] = min(dp[i], dp[j]);
            }
        }
        return dp[n];
    }
};
```

```javascript [JavaScript]
var respace = function(dictionary, sentence) {
    const root = {};
    for (const w of dictionary) {
        let cur = root;
        for (let i = w.length - 1; i >= 0; i--) {
            const c = w[i];
            cur[c] = cur[c] || {};
            cur = cur[c];
        }
        cur.end = true;
    }
    const n = sentence.length;
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        let cur = root;
        for (let j = i - 1; j >= 0; j--) {
            const c = sentence[j];
            if (!cur[c]) break;
            cur = cur[c];
            if (cur.end) dp[i] = Math.min(dp[i], dp[j]);
        }
    }
    return dp[n];
};
```

```typescript [TypeScript]
function respace(dictionary: string[], sentence: string): number {
    const root: any = {};
    for (const w of dictionary) {
        let cur = root;
        for (let i = w.length - 1; i >= 0; i--) {
            const c = w[i];
            cur[c] = cur[c] || {};
            cur = cur[c];
        }
        cur.end = true;
    }
    const n = sentence.length;
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        let cur = root;
        for (let j = i - 1; j >= 0; j--) {
            const c = sentence[j];
            if (!cur[c]) break;
            cur = cur[c];
            if (cur.end) dp[i] = Math.min(dp[i], dp[j]);
        }
    }
    return dp[n];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n · L + m · L)`，n 为句子长度，L 为最长词长，m 为字典大小。
- **空间复杂度**：`O(m · L)`，Trie 占用。

---

### 2.2 方法二：动态规划 + 哈希集合

**1. 思路**

把字典词存入哈希集合，对 `dp[i]` 枚举最后一段长度 `len`（1~L，L 为最长词长），若 `sentence[i-len..i-1]` 在集合中则 `dp[i] = min(dp[i], dp[i-len])`。省去 Trie，但每次需截取子串。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int respace(String[] dictionary, String sentence) {
        Set<String> set = new HashSet<>(Arrays.asList(dictionary));
        int maxLen = 0;
        for (String w : dictionary) maxLen = Math.max(maxLen, w.length());
        int n = sentence.length();
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i - 1] + 1;
            for (int len = 1; len <= maxLen && len <= i; len++) {
                if (set.contains(sentence.substring(i - len, i)))
                    dp[i] = Math.min(dp[i], dp[i - len]);
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def respace(self, dictionary: List[str], sentence: str) -> int:
        words = set(dictionary)
        max_len = max((len(w) for w in dictionary), default=0)
        n = len(sentence)
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i - 1] + 1
            for l in range(1, min(max_len, i) + 1):
                if sentence[i-l:i] in words:
                    dp[i] = min(dp[i], dp[i-l])
        return dp[n]
```

```cpp [C++]
class Solution {
public:
    int respace(vector<string>& dictionary, string sentence) {
        unordered_set<string> set(dictionary.begin(), dictionary.end());
        int maxLen = 0;
        for (auto& w : dictionary) maxLen = max(maxLen, (int)w.size());
        int n = sentence.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i - 1] + 1;
            for (int len = 1; len <= maxLen && len <= i; len++) {
                if (set.count(sentence.substr(i - len, len)))
                    dp[i] = min(dp[i], dp[i - len]);
            }
        }
        return dp[n];
    }
};
```

```javascript [JavaScript]
var respace = function(dictionary, sentence) {
    const set = new Set(dictionary);
    let maxLen = 0;
    for (const w of dictionary) maxLen = Math.max(maxLen, w.length);
    const n = sentence.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        for (let l = 1; l <= maxLen && l <= i; l++) {
            if (set.has(sentence.slice(i - l, i))) dp[i] = Math.min(dp[i], dp[i - l]);
        }
    }
    return dp[n];
};
```

```typescript [TypeScript]
function respace(dictionary: string[], sentence: string): number {
    const set = new Set(dictionary);
    let maxLen = 0;
    for (const w of dictionary) maxLen = Math.max(maxLen, w.length);
    const n = sentence.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        for (let l = 1; l <= maxLen && l <= i; l++) {
            if (set.has(sentence.slice(i - l, i))) dp[i] = Math.min(dp[i], dp[i - l]);
        }
    }
    return dp[n];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n · L)`，L 为最长词长。
- **空间复杂度**：`O(m · L)`，存储字典集合。

---

## 三、总结

| 方法           | 时间复杂度       | 空间复杂度     | 特点                       |
| -------------- | ---------------- | -------------- | -------------------------- |
| DP + Trie      | `O(n·L + m·L)`   | `O(m·L)`       | 最优，向前匹配高效，推荐   |
| DP + 哈希集合  | `O(n·L)`         | `O(m·L)`       | 实现简单，子串截取开销略大 |

**推荐**：使用 DP + Trie，将字典词倒序建 Trie 后可从句末向前快速匹配，避免子串生成。
