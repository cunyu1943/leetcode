# [472. 连接词](https://leetcode.cn/problems/concatenated-words/)

## 一、题目描述

给定一个**不含重复**单词的字符串数组 `words`，返回所有「**连接词**」的集合。连接词指一个单词可由 `words` 中**其它**至少一个单词拼接而成（可重复使用）。

**示例 1：**

```
输入：words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
输出：["catsdogcats","dogcatsdog","ratcatdogcat"]
```

**示例 2：**

```
输入：words = ["a","b","ab","abc"]
输出：["ab","abc"]
```

**提示：**

- `1 <= words.length <= 10^4`
- `0 <= words[i].length <= 30`
- `words[i]` 仅由小写字母组成
- 所有字符串互不相同

## 二、解答方法

### 2.1 方法一：排序 + 字典树 + 单词拆分判断

1. 思路

按长度升序处理单词（短单词用于拼长单词）。把较短单词（非连接词）插入 Trie。对每个单词，用「单词拆分」DP 判断能否由已插入的单词组成，能组成则该词本身是连接词。

2. 代码实现（Python，Trie + DP）

:::::: code-group

```python [Python]
class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        words.sort(key=len)
        trie = {}
        res = []
        def canBreak(w):
            # 判断是否可由 trie 中已有单词拼接而成
            dp = [False] * (len(w) + 1)
            dp[0] = True
            node = trie
            for i in range(len(w)):
                if not dp[i]:
                    continue
                cur = trie
                for j in range(i, len(w)):
                    c = w[j]
                    if c not in cur:
                        break
                    cur = cur[c]
                    if '#' in cur and dp[i]:
                        dp[j + 1] = True
            return dp[len(w)]
        for w in words:
            if w and canBreak(w):
                res.append(w)
            # 插入当前词（作为可被后续词复用）
            node = trie
            for c in w:
                node = node.setdefault(c, {})
            node['#'] = True
        return res
```

```java [Java]
class Solution {
    static class TrieNode { TrieNode[] ch = new TrieNode[26]; boolean end; }
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Arrays.sort(words, (a, b) -> a.length() - b.length);
        TrieNode root = new TrieNode();
        List<String> res = new ArrayList<>();
        for (String w : words) {
            if (w.isEmpty()) continue;
            if (canBreak(w, root)) res.add(w);
            insert(w, root);
        }
        return res;
    }
    boolean canBreak(String w, TrieNode root) {
        boolean[] dp = new boolean[w.length() + 1];
        dp[0] = true;
        for (int i = 0; i < w.length(); i++) {
            if (!dp[i]) continue;
            TrieNode cur = root;
            for (int j = i; j < w.length(); j++) {
                cur = cur.ch[w.charAt(j) - 'a'];
                if (cur == null) break;
                if (cur.end) dp[j + 1] = true;
            }
        }
        return dp[w.length()];
    }
    void insert(String w, TrieNode root) {
        TrieNode cur = root;
        for (char c : w.toCharArray()) {
            if (cur.ch[c - 'a'] == null) cur.ch[c - 'a'] = new TrieNode();
            cur = cur.ch[c - 'a'];
        }
        cur.end = true;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\sum |w|^2)$。
- 空间复杂度：$O(\sum |w|)$。

## 三、总结

「单词拆分 + 长度升序 + Trie」是连接词的标准解法。相关题目：139 单词拆分、140 单词拆分 II、208 实现 Trie。
