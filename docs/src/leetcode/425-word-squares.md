# [425. 单词方块 🔒 会员题](https://leetcode.cn/problems/word-squares/)

## 一、题目描述

给定一个单词集合 `words`（无重复），找出所有能排列成**单词方块**的单词序列。单词方块要求第 `k` 行字符串与第 `k` 列字符串（垂直读）完全相同，即 `words[i][j] == words[j][i]`。

返回一个所有可能方块的列表，方块中单词数等于单词长度。

本题为 LeetCode Premium（会员）题目。

**示例 1：**

```
输入：words = ["area","lead","wall","lady","ball"]
输出：[["wall","area","lead","lady"],["ball","area","lead","lady"]]
```

**示例 2：**

```
输入：words = ["abat","baba","atan","atal"]
输出：[["baba","abat","baba","atan"],["baba","abat","baba","atal"]]
```

**提示：**

- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 4`
- `words[i]` 仅由小写字母组成
- `words[i].length` 全部相同

## 二、解答方法

### 2.1 方法一：回溯 + 前缀树（Trie）剪枝

1. 思路

逐行放置单词：放置第 `r` 行单词时，它必须以「前 `r` 个单词的第 `r` 列字符拼成的字符串」为前缀（因为要求 `words[r][c] == words[c][r]`）。用 Trie 或哈希前缀表快速获取「以某前缀开头的所有候选单词」，回溯构建。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
from collections import defaultdict
class Solution:
    def wordSquares(self, words: List[str]) -> List[List[str]]:
        n = len(words[0])
        prefix = defaultdict(list)
        for w in words:
            for i in range(n):
                prefix[w[:i]].append(w)
        res = []
        def backtrack(path):
            if len(path) == n:
                res.append(path[:])
                return
            r = len(path)
            pre = "".join(p[r] for p in path)
            for w in prefix[pre]:
                backtrack(path + [w])
        backtrack([])
        return res
```

```java [Java]
class Solution {
    public List<List<String>> wordSquares(String[] words) {
        int n = words[0].length();
        Map<String, List<String>> prefix = new HashMap<>();
        for (String w : words) {
            for (int i = 0; i < n; i++) {
                String p = w.substring(0, i);
                prefix.computeIfAbsent(p, k -> new ArrayList<>()).add(w);
            }
        }
        List<List<String>> res = new ArrayList<>();
        List<String> path = new ArrayList<>();
        backtrack(words, prefix, path, res, n);
        return res;
    }
    void backtrack(String[] words, Map<String, List<String>> prefix, List<String> path, List<List<String>> res, int n) {
        if (path.size() == n) { res.add(new ArrayList<>(path)); return; }
        int r = path.size();
        StringBuilder pre = new StringBuilder();
        for (String p : path) pre.append(p.charAt(r));
        for (String w : prefix.getOrDefault(pre.toString(), new ArrayList<>())) {
            path.add(w);
            backtrack(words, prefix, path, res, n);
            path.remove(path.size() - 1);
        }
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：回溯搜索，因 `n ≤ 4` 且用前缀剪枝，实际很快。
- 空间复杂度：$O(\sum |words|)$，前缀表。

## 三、总结

会员题。回溯 + 前缀剪枝（Trie）是「构造满足行列对称方块」的通用解法。相关题目：422 有效单词方块、212 单词搜索 II、79 单词搜索。
