# [140. 单词拆分 II](https://leetcode.cn/problems/word-break-ii/)



## 一、题目描述

给定一个字符串 `s` 和一个字符串字典 `wordDict`，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在字典中。返回所有这样的可能的句子。

注意：词典中的同一个单词可能在分段中被重复使用多次。



**示例 1：**

```
输入: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
输出: ["cats and dog","cat sand dog"]
```

**示例 2：**

```
输入: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
输出: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
解释: 注意 "pineapplepenapple" 可以拆成 "pine applepen apple" 和 "pineapple pen apple"，但无法拆成 "pine pen apple" 因为 "pine pen apple" 的最后一个 "apple" 无法匹配原始串末尾的 "apple"。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
输出: []
```

**提示：**

- `1 <= s.length <= 20`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 10`
- `s` 和 `wordDict[i]` 仅有小写英文字母组成
- `wordDict` 中的所有字符串 **互不相同**



## 二、解答方法

### 2.1 方法一：记忆化搜索（DFS + 记忆）

1. **思路**

本题在 139 的基础上要求返回 **所有** 可行拆分。用回溯枚举所有可能的拆分，并用记忆化避免重复子问题。

- `dfs(start)` 返回「从 `start` 到末尾的所有合法句子列表」；
- 若 `start == n`，返回包含一个空片段的列表（作为递归终止）；
- 枚举从 `start` 开始的每个单词结尾 `end`，若 `s[start..end]` 在字典中，则递归求 `dfs(end)`，把当前单词拼到子结果前面；
- 用 `memo` 缓存每个 `start` 的结果，防止指数级重复。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private Set<String> dict;
    private Map<Integer, List<String>> memo;

    public List<String> wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        memo = new HashMap<>();
        return dfs(s, 0);
    }

    private List<String> dfs(String s, int start) {
        if (start == s.length()) {
            List<String> base = new ArrayList<>();
            base.add("");
            return base;
        }
        if (memo.containsKey(start)) return memo.get(start);

        List<String> res = new ArrayList<>();
        for (int end = start + 1; end <= s.length(); end++) {
            String word = s.substring(start, end);
            if (dict.contains(word)) {
                for (String sub : dfs(s, end)) {
                    res.add(word + (sub.isEmpty() ? "" : " " + sub));
                }
            }
        }
        memo.put(start, res);
        return res;
    }
}
```

```python [Python]
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        word_set = set(wordDict)
        memo = {}

        def dfs(start: int) -> List[str]:
            if start == len(s):
                return [""]
            if start in memo:
                return memo[start]

            res = []
            for end in range(start + 1, len(s) + 1):
                word = s[start:end]
                if word in word_set:
                    for sub in dfs(end):
                        res.append(word if sub == "" else word + " " + sub)
            memo[start] = res
            return res

        return dfs(0)
```

```cpp [C++]
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        unordered_map<int, vector<string>> memo;

        function<vector<string>(int)> dfs = [&](int start) -> vector<string> {
            if (start == s.size()) return {""};
            if (memo.count(start)) return memo[start];

            vector<string> res;
            for (int end = start + 1; end <= s.size(); end++) {
                string word = s.substr(start, end - start);
                if (dict.count(word)) {
                    for (string sub : dfs(end)) {
                        res.push_back(word + (sub.empty() ? "" : " " + sub));
                    }
                }
            }
            memo[start] = res;
            return res;
        };

        return dfs(0);
    }
};
```

```go [Go]
func wordBreak(s string, wordDict []string) []string {
    dict := make(map[string]bool)
    for _, w := range wordDict {
        dict[w] = true
    }
    memo := make(map[int][]string)

    var dfs func(int) []string
    dfs = func(start int) []string {
        if start == len(s) {
            return []string{""}
        }
        if v, ok := memo[start]; ok {
            return v
        }
        var res []string
        for end := start + 1; end <= len(s); end++ {
            word := s[start:end]
            if dict[word] {
                for _, sub := range dfs(end) {
                    if sub == "" {
                        res = append(res, word)
                    } else {
                        res = append(res, word+" "+sub)
                    }
                }
            }
        }
        memo[start] = res
        return res
    }
    return dfs(0)
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
    const dict = new Set(wordDict);
    const memo = {};

    const dfs = (start) => {
        if (start === s.length) return [""];
        if (start in memo) return memo[start];

        const res = [];
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.slice(start, end);
            if (dict.has(word)) {
                for (const sub of dfs(end)) {
                    res.push(sub === "" ? word : word + " " + sub);
                }
            }
        }
        memo[start] = res;
        return res;
    };

    return dfs(0);
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char*** dfs(char* s, int n, char** dict, int dSize, int start, int* retSize) {
    if (start == n) {
        char** base = (char**)malloc(sizeof(char*));
        base[0] = (char*)malloc(1); base[0][0] = '\0';
        char*** wrap = (char***)malloc(sizeof(char**));
        wrap[0] = base;
        *retSize = 1;
        return wrap;
    }
    char*** res = (char***)malloc(2000 * sizeof(char**));
    int cnt = 0;
    for (int end = start + 1; end <= n; end++) {
        char buf[21]; int k = 0;
        for (int t = start; t < end; t++) buf[k++] = s[t];
        buf[k] = '\0';
        bool found = false;
        for (int w = 0; w < dSize; w++) if (strcmp(buf, dict[w]) == 0) { found = true; break; }
        if (found) {
            int subSize = 0;
            char*** sub = dfs(s, n, dict, dSize, end, &subSize);
            for (int si = 0; si < subSize; si++) {
                char* subStr = sub[si][0];
                int len = k + (subStr[0] ? 1 + (int)strlen(subStr) : 0);
                char* combined = (char*)malloc((len + 1) * sizeof(char));
                strcpy(combined, buf);
                if (subStr[0]) { strcat(combined, " "); strcat(combined, subStr); }
                char** entry = (char**)malloc(sizeof(char*));
                entry[0] = combined;
                res[cnt++] = entry;
            }
        }
    }
    *retSize = cnt;
    return res;
}

char*** wordBreak(char* s, char** wordDict, int wordDictSize, int* returnSize, int** returnColumnSizes) {
    int n = (int)strlen(s);
    int dummy;
    char*** res = dfs(s, n, wordDict, wordDictSize, 0, &dummy);
    *returnSize = dummy;
    return res;
}
```

```ts [TypeScript]
function wordBreak(s: string, wordDict: string[]): string[] {
    const dict = new Set(wordDict);
    const memo: Record<number, string[]> = {};

    const dfs = (start: number): string[] => {
        if (start === s.length) return [""];
        if (start in memo) return memo[start];

        const res: string[] = [];
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.slice(start, end);
            if (dict.has(word)) {
                for (const sub of dfs(end)) {
                    res.push(sub === "" ? word : word + " " + sub);
                }
            }
        }
        memo[start] = res;
        return res;
    };

    return dfs(0);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n × 2ⁿ)`（最坏情况，字符串较短且可多方式拆分时），记忆化把大量重复子问题降到可接受范围。本题 `n <= 20`，完全可行。
- **空间复杂度**：`O(n × 2ⁿ)`，记忆化表与结果存储。

### 2.2 方法二：预处理 DP + 回溯

1. **思路**

先做一次类似 139 的 DP，得到 `canBreak[i]` 表示「从位置 `i` 到末尾能否拆分」。回溯时，只枚举「能继续拆出完整句子」的单词，提前剪枝，避免无效递归。

- 计算 `canBreak` 数组（自后向前）；
- `dfs(start, path)`：若 `start == n`，把 `path` 加入结果；否则枚举单词，仅当 `dict` 包含且 `canBreak[end]` 为真时递归。

相比方法一，剪枝更明确，但实现略长。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] can = new boolean[n + 1];
        can[n] = true;
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i + 1; j <= n; j++) {
                if (can[j] && dict.contains(s.substring(i, j))) {
                    can[i] = true;
                    break;
                }
            }
        }

        List<String> res = new ArrayList<>();
        List<String> path = new ArrayList<>();
        dfs(s, 0, dict, can, path, res);
        return res;
    }

    private void dfs(String s, int start, Set<String> dict, boolean[] can,
                     List<String> path, List<String> res) {
        if (start == s.length()) {
            res.add(String.join(" ", path));
            return;
        }
        for (int end = start + 1; end <= s.length(); end++) {
            String word = s.substring(start, end);
            if (dict.contains(word) && can[end]) {
                path.add(word);
                dfs(s, end, dict, can, path, res);
                path.remove(path.size() - 1);
            }
        }
    }
}
```

```python [Python]
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        word_set = set(wordDict)
        n = len(s)
        can = [False] * (n + 1)
        can[n] = True
        for i in range(n - 1, -1, -1):
            for j in range(i + 1, n + 1):
                if can[j] and s[i:j] in word_set:
                    can[i] = True
                    break

        res = []
        path = []

        def dfs(start: int):
            if start == n:
                res.append(" ".join(path))
                return
            for end in range(start + 1, n + 1):
                word = s[start:end]
                if word in word_set and can[end]:
                    path.append(word)
                    dfs(end)
                    path.pop()

        dfs(0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> can(n + 1, false);
        can[n] = true;
        for (int i = n - 1; i >= 0; i--)
            for (int j = i + 1; j <= n; j++)
                if (can[j] && dict.count(s.substr(i, j - i))) { can[i] = true; break; }

        vector<string> res;
        vector<string> path;

        function<void(int)> dfs = [&](int start) {
            if (start == n) {
                string join;
                for (int k = 0; k < path.size(); k++) {
                    if (k) join += " ";
                    join += path[k];
                }
                res.push_back(join);
                return;
            }
            for (int end = start + 1; end <= n; end++) {
                string word = s.substr(start, end - start);
                if (dict.count(word) && can[end]) {
                    path.push_back(word);
                    dfs(end);
                    path.pop_back();
                }
            }
        };

        dfs(0);
        return res;
    }
};
```

```go [Go]
func wordBreak(s string, wordDict []string) []string {
    dict := make(map[string]bool)
    for _, w := range wordDict {
        dict[w] = true
    }
    n := len(s)
    can := make([]bool, n+1)
    can[n] = true
    for i := n - 1; i >= 0; i-- {
        for j := i + 1; j <= n; j++ {
            if can[j] && dict[s[i:j]] {
                can[i] = true
                break
            }
        }
    }

    var res []string
    var path []string

    var dfs func(int)
    dfs = func(start int) {
        if start == n {
            join := ""
            for k, w := range path {
                if k > 0 {
                    join += " "
                }
                join += w
            }
            res = append(res, join)
            return
        }
        for end := start + 1; end <= n; end++ {
            word := s[start:end]
            if dict[word] && can[end] {
                path = append(path, word)
                dfs(end)
                path = path[:len(path)-1]
            }
        }
    }

    dfs(0)
    return res
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
    const dict = new Set(wordDict);
    const n = s.length;
    const can = new Array(n + 1).fill(false);
    can[n] = true;
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j <= n; j++) {
            if (can[j] && dict.has(s.slice(i, j))) { can[i] = true; break; }
        }
    }

    const res = [];
    const path = [];

    const dfs = (start) => {
        if (start === n) {
            res.push(path.join(" "));
            return;
        }
        for (let end = start + 1; end <= n; end++) {
            const word = s.slice(start, end);
            if (dict.has(word) && can[end]) {
                path.push(word);
                dfs(end);
                path.pop();
            }
        }
    };

    dfs(0);
    return res;
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

void dfs(char* s, int n, char** dict, int dSize, int* can, char** path, int depth, int start, char** res, int* resCnt) {
    if (start == n) {
        char* join = (char*)malloc((n * 20 + 1) * sizeof(char));
        join[0] = '\0';
        for (int i = 0; i < depth; i++) {
            if (i) strcat(join, " ");
            strcat(join, path[i]);
        }
        res[(*resCnt)++] = join;
        return;
    }
    for (int end = start + 1; end <= n; end++) {
        char buf[21]; int k = 0;
        for (int t = start; t < end; t++) buf[k++] = s[t];
        buf[k] = '\0';
        bool found = false;
        for (int w = 0; w < dSize; w++) if (strcmp(buf, dict[w]) == 0) { found = true; break; }
        if (found && can[end]) {
            char* cp = (char*)malloc((k + 1) * sizeof(char));
            strcpy(cp, buf);
            path[depth] = cp;
            dfs(s, n, dict, dSize, can, path, depth + 1, end, res, resCnt);
            free(cp);
        }
    }
}

char** wordBreak(char* s, char** wordDict, int wordDictSize, int* returnSize) {
    int n = (int)strlen(s);
    int* can = (int*)calloc(n + 1, sizeof(int));
    can[n] = 1;
    for (int i = n - 1; i >= 0; i--)
        for (int j = i + 1; j <= n; j++) {
            char buf[21]; int k = 0;
            for (int t = i; t < j; t++) buf[k++] = s[t];
            buf[k] = '\0';
            bool found = false;
            for (int w = 0; w < wordDictSize; w++) if (strcmp(buf, wordDict[w]) == 0) { found = true; break; }
            if (found && can[j]) { can[i] = 1; break; }
        }
    char** path = (char**)malloc(21 * sizeof(char*));
    char** res = (char**)malloc(1000 * sizeof(char*));
    int resCnt = 0;
    dfs(s, n, wordDict, wordDictSize, can, path, 0, 0, res, &resCnt);
    free(path); free(can);
    *returnSize = resCnt;
    return res;
}
```

```ts [TypeScript]
function wordBreak(s: string, wordDict: string[]): string[] {
    const dict = new Set(wordDict);
    const n = s.length;
    const can: boolean[] = new Array(n + 1).fill(false);
    can[n] = true;
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j <= n; j++) {
            if (can[j] && dict.has(s.slice(i, j))) { can[i] = true; break; }
        }
    }

    const res: string[] = [];
    const path: string[] = [];

    const dfs = (start: number): void => {
        if (start === n) {
            res.push(path.join(" "));
            return;
        }
        for (let end = start + 1; end <= n; end++) {
            const word = s.slice(start, end);
            if (dict.has(word) && can[end]) {
                path.push(word);
                dfs(end);
                path.pop();
            }
        }
    };

    dfs(0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n × 2ⁿ)`，借助 `can` 剪枝，实际远小于最坏值。
- **空间复杂度**：`O(n × 2ⁿ)`，结果存储与递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 记忆化搜索 | `O(n × 2ⁿ)` | `O(n × 2ⁿ)` | 简洁，自顶向下，推荐 |
| DP 预处理 + 回溯 | `O(n × 2ⁿ)` | `O(n × 2ⁿ)` | 剪枝明确，代码稍长 |

本题是 139 的扩展，在「能否拆分」基础上枚举「所有拆分」。记忆化搜索写法最自然，配合 `n <= 20` 的约束可轻松通过。
