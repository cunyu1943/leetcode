# [139. 单词拆分](https://leetcode.cn/problems/word-break/)



## 一、题目描述

给你一个字符串 `s` 和一个字符串字典 `wordDict`。如果可以利用字典中出现的单词拼接出 `s`，则返回 `true`。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。



**示例 1：**

```
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
```

**示例 2：**

```
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。注意，你可以重复使用字典中的单词。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

**提示：**

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` 和 `wordDict[i]` 仅有小写英文字母组成
- `wordDict` 中的所有字符串 **互不相同**



## 二、解答方法

### 2.1 方法一：动态规划（自前向后）

1. **思路**

定义 `dp[i]` 表示「字符串 `s` 的前 `i` 个字符（`s[0..i-1]`）能否被字典拼接」。

- `dp[0] = true`（空串默认可拼接）；
- 对每个 `i`（1 ~ n），枚举最后一个单词的结尾位置 `j`（0 ~ i-1）：
  若 `dp[j] == true` 且子串 `s[j..i-1]` 在字典中，则 `dp[i] = true`；
- 最终 `dp[n]` 即答案。

可把 `wordDict` 放进哈希集合，`O(1)` 判断子串是否在字典中。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}
```

```python [Python]
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break
        return dp[len(s)]
```

```cpp [C++]
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
};
```

```go [Go]
func wordBreak(s string, wordDict []string) bool {
    dict := make(map[string]bool)
    for _, w := range wordDict {
        dict[w] = true
    }
    n := len(s)
    dp := make([]bool, n+1)
    dp[0] = true
    for i := 1; i <= n; i++ {
        for j := 0; j < i; j++ {
            if dp[j] && dict[s[j:i]] {
                dp[i] = true
                break
            }
        }
    }
    return dp[n]
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const dict = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && dict.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    int n = (int)strlen(s);
    int* dp = (int*)calloc(n + 1, sizeof(int));
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j]) {
                char buf[301]; int k = 0;
                for (int t = j; t < i; t++) buf[k++] = s[t];
                buf[k] = '\0';
                bool found = false;
                for (int w = 0; w < wordDictSize; w++)
                    if (strcmp(buf, wordDict[w]) == 0) { found = true; break; }
                if (found) { dp[i] = 1; break; }
            }
        }
    }
    bool ans = dp[n];
    free(dp);
    return ans;
}
```

```ts [TypeScript]
function wordBreak(s: string, wordDict: string[]): boolean {
    const dict = new Set(wordDict);
    const dp: boolean[] = new Array(s.length + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && dict.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n² × L)`，其中 `n` 为 `s` 长度，`L` 为子串平均长度（Java/Go 的 `substring` 涉及拷贝或比较）。
- **空间复杂度**：`O(n + m)`，`dp` 数组与字典存储。

### 2.2 方法二：记忆化搜索（DFS + 记忆）

1. **思路**

以递归方式判断：从位置 `i` 出发，尝试匹配字典中的单词，若匹配到末尾则返回 `true`。用 `memo` 记录「从位置 `i` 开始能否拼出」避免重复计算。

- `dfs(start)`：枚举从 `start` 开始能匹配的单词；若匹配到结尾 `n` 返回 `true`；
- 若某分支成功即返回 `true`；否则返回 `false`；
- 记忆化保证每个 `start` 只计算一次。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private Set<String> dict;
    private Boolean[] memo;

    public boolean wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        memo = new Boolean[s.length()];
        return dfs(s, 0);
    }

    private boolean dfs(String s, int start) {
        if (start == s.length()) return true;
        if (memo[start] != null) return memo[start];
        for (int end = start + 1; end <= s.length(); end++) {
            if (dict.contains(s.substring(start, end)) && dfs(s, end)) {
                memo[start] = true;
                return true;
            }
        }
        memo[start] = false;
        return false;
    }
}
```

```python [Python]
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        memo = {}

        def dfs(start: int) -> bool:
            if start == len(s):
                return True
            if start in memo:
                return memo[start]
            for end in range(start + 1, len(s) + 1):
                if s[start:end] in word_set and dfs(end):
                    memo[start] = True
                    return True
            memo[start] = False
            return False

        return dfs(0)
```

```cpp [C++]
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        vector<int> memo(s.size(), -1);

        function<bool(int)> dfs = [&](int start) -> bool {
            if (start == s.size()) return true;
            if (memo[start] != -1) return memo[start] == 1;
            for (int end = start + 1; end <= s.size(); end++) {
                if (dict.count(s.substr(start, end - start)) && dfs(end)) {
                    memo[start] = 1;
                    return true;
                }
            }
            memo[start] = 0;
            return false;
        };

        return dfs(0);
    }
};
```

```go [Go]
func wordBreak(s string, wordDict []string) bool {
    dict := make(map[string]bool)
    for _, w := range wordDict {
        dict[w] = true
    }
    memo := make(map[int]bool)

    var dfs func(int) bool
    dfs = func(start int) bool {
        if start == len(s) {
            return true
        }
        if v, ok := memo[start]; ok {
            return v
        }
        for end := start + 1; end <= len(s); end++ {
            if dict[s[start:end]] && dfs(end) {
                memo[start] = true
                return true
            }
        }
        memo[start] = false
        return false
    }
    return dfs(0)
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const dict = new Set(wordDict);
    const memo = {};

    const dfs = (start) => {
        if (start === s.length) return true;
        if (start in memo) return memo[start];
        for (let end = start + 1; end <= s.length; end++) {
            if (dict.has(s.slice(start, end)) && dfs(end)) {
                memo[start] = true;
                return true;
            }
        }
        memo[start] = false;
        return false;
    };

    return dfs(0);
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool dfs(char* s, int n, char** wordDict, int wSize, int start, int* memo) {
    if (start == n) return true;
    if (memo[start] != -1) return memo[start] == 1;
    for (int end = start + 1; end <= n; end++) {
        char buf[301]; int k = 0;
        for (int t = start; t < end; t++) buf[k++] = s[t];
        buf[k] = '\0';
        bool found = false;
        for (int w = 0; w < wSize; w++)
            if (strcmp(buf, wordDict[w]) == 0) { found = true; break; }
        if (found && dfs(s, n, wordDict, wSize, end, memo)) { memo[start] = 1; return true; }
    }
    memo[start] = 0;
    return false;
}

bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    int n = (int)strlen(s);
    int* memo = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) memo[i] = -1;
    bool ans = dfs(s, n, wordDict, wordDictSize, 0, memo);
    free(memo);
    return ans;
}
```

```ts [TypeScript]
function wordBreak(s: string, wordDict: string[]): boolean {
    const dict = new Set(wordDict);
    const memo: Record<number, boolean> = {};

    const dfs = (start: number): boolean => {
        if (start === s.length) return true;
        if (start in memo) return memo[start] as boolean;
        for (let end = start + 1; end <= s.length; end++) {
            if (dict.has(s.slice(start, end)) && dfs(end)) {
                memo[start] = true;
                return true;
            }
        }
        memo[start] = false;
        return false;
    };

    return dfs(0);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n² × L)`，每个起点只计算一次，每次枚举终点。
- **空间复杂度**：`O(n)`，`memo` 与递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(n² × L)` | `O(n + m)` | 自底向上，推荐 |
| 记忆化搜索 | `O(n² × L)` | `O(n)` | 自顶向下，思路自然 |

两种写法本质等价。DP 写法更易于理解和实现，是本题首选。
