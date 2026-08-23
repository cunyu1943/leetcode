# [LCR 065. 单词的压缩编码](https://leetcode.cn/problems/iSwD2y/)



## 一、题目描述

单词数组 `words` 的 **有效编码** 由任意助记字符串 `s` 和下标数组 `indices` 组成，且满足：

- `words.length == indices.length`
- 助记字符串 `s` 以 `'#'` 字符结尾
- 对于每个下标 `indices[i]` ，`s[indices[i]:]` 等于 `words[i]`

给定一个单词数组 `words` ，返回成功对 `words` 进行编码的最小助记字符串 `s` 的长度 。



**示例 1：**

```
输入：words = ["time", "me", "bell"]
输出：10
解释：一组有效编码为 s = "time#bell#" 和 indices = [0, 2, 5]。
words[0] = "time" ，s[0:4] 是 "time" ，indices[0] = 0；
words[1] = "me" ，s[2:4] 是 "me" ，indices[1] = 2；
words[2] = "bell" ，s[5:9] 是 "bell" ，indices[2] = 5。
```

**示例 2：**

```
输入：words = ["t"]
输出：2
```

**提示：**

- `1 <= words.length <= 2000`
- `1 <= words[i].length <= 7`



## 二、解答方法

### 2.1 方法一：后缀集合（去除真后缀）

1. **思路**

若一个单词是另一个单词的后缀（如 `"me"` 是 `"time"` 的后缀），则它无需单独存储，可被后缀覆盖。

- 先把所有单词放入集合；
- 对每个单词，删除它的 **所有真后缀**（即去掉前若干字符后仍存在的串）；
- 最终集合里剩下的都是「不能作为其他单词后缀」的核心单词，答案 = `Σ(词长 + 1)`（`+1` 是 `#`）。

时间 `O(Σ L²)`（`L` 为词长，`L ≤ 7` 很小），空间 `O(Σ L)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minimumLengthEncoding(String[] words) {
        Set<String> set = new HashSet<>(Arrays.asList(words));
        for (String w : words) {
            for (int i = 1; i < w.length(); i++) {
                set.remove(w.substring(i));
            }
        }
        int ans = 0;
        for (String w : set) ans += w.length() + 1;
        return ans;
    }
}
```

```python [Python]
class Solution:
    def minimumLengthEncoding(self, words: List[str]) -> int:
        s = set(words)
        for w in words:
            for i in range(1, len(w)):
                s.discard(w[i:])
        return sum(len(w) + 1 for w in s)
```

```cpp [C++]
class Solution {
public:
    int minimumLengthEncoding(vector<string>& words) {
        unordered_set<string> s(words.begin(), words.end());
        for (string& w : words) {
            for (int i = 1; i < w.size(); i++) {
                s.erase(w.substr(i));
            }
        }
        int ans = 0;
        for (string& w : s) ans += w.size() + 1;
        return ans;
    }
};
```

```go [Go]
func minimumLengthEncoding(words []string) int {
    s := map[string]bool{}
    for _, w := range words {
        s[w] = true
    }
    for _, w := range words {
        for i := 1; i < len(w); i++ {
            delete(s, w[i:])
        }
    }
    ans := 0
    for w := range s {
        ans += len(w) + 1
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} words
 * @return {number}
 */
var minimumLengthEncoding = function (words) {
    const s = new Set(words);
    for (const w of words) {
        for (let i = 1; i < w.length; i++) s.delete(w.slice(i));
    }
    let ans = 0;
    for (const w of s) ans += w.length + 1;
    return ans;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int minimumLengthEncoding(char** words, int wordsSize) {
    // 简化实现：判断每个单词是否为其他单词的后缀
    int* removed = (int*)calloc(wordsSize, sizeof(int));
    for (int i = 0; i < wordsSize; i++) {
        int li = (int)strlen(words[i]);
        for (int j = 0; j < wordsSize; j++) {
            if (i == j || removed[i]) continue;
            int lj = (int)strlen(words[j]);
            if (lj > li && strcmp(words[j] + (lj - li), words[i]) == 0) {
                removed[i] = 1;
                break;
            }
        }
    }
    int ans = 0;
    for (int i = 0; i < wordsSize; i++)
        if (!removed[i]) ans += (int)strlen(words[i]) + 1;
    free(removed);
    return ans;
}
```

```ts [TypeScript]
function minimumLengthEncoding(words: string[]): number {
    const s = new Set(words);
    for (const w of words) {
        for (let i = 1; i < w.length; i++) s.delete(w.slice(i));
    }
    let ans = 0;
    for (const w of s) ans += w.length + 1;
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(Σ L²)`，`L ≤ 7` 时近似线性。
- **空间复杂度**：`O(Σ L)`，集合。

### 2.2 方法二：反转 + 排序 / Trie

1. **思路**

把每个单词反转后，后缀关系变成前缀关系：

- 反转排序后，若某词是相邻下一个词的前缀，则可被覆盖；
- 或直接用 Trie 存储反转后的单词，统计「叶子节点路径长度 + 1」之和。

这里给出排序做法：反转所有词并排序，只有「不是下一个词的前缀」的词需要计入编码。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minimumLengthEncoding(String[] words) {
        String[] rev = new String[words.length];
        for (int i = 0; i < words.length; i++)
            rev[i] = new StringBuilder(words[i]).reverse().toString();
        Arrays.sort(rev);
        int ans = 0;
        for (int i = 0; i < rev.length; i++) {
            if (i + 1 < rev.length && rev[i + 1].startsWith(rev[i])) continue;
            ans += rev[i].length() + 1;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def minimumLengthEncoding(self, words: List[str]) -> int:
        rev = sorted(w[::-1] for w in words)
        ans = 0
        for i, w in enumerate(rev):
            if i + 1 < len(rev) and rev[i + 1].startswith(w):
                continue
            ans += len(w) + 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int minimumLengthEncoding(vector<string>& words) {
        vector<string> rev;
        for (string& w : words) {
            reverse(w.begin(), w.end());
            rev.push_back(w);
        }
        sort(rev.begin(), rev.end());
        int ans = 0;
        for (int i = 0; i < rev.size(); i++) {
            if (i + 1 < rev.size() && rev[i + 1].compare(0, rev[i].size(), rev[i]) == 0)
                continue;
            ans += rev[i].size() + 1;
        }
        return ans;
    }
};
```

```go [Go]
func minimumLengthEncoding(words []string) int {
    rev := make([]string, len(words))
    for i, w := range words {
        b := []byte(w)
        for l, r := 0, len(b)-1; l < r; l, r = l+1, r-1 {
            b[l], b[r] = b[r], b[l]
        }
        rev[i] = string(b)
    }
    sort.Strings(rev)
    ans := 0
    for i := 0; i < len(rev); i++ {
        if i+1 < len(rev) && strings.HasPrefix(rev[i+1], rev[i]) {
            continue
        }
        ans += len(rev[i]) + 1
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} words
 * @return {number}
 */
var minimumLengthEncoding = function (words) {
    const rev = words.map((w) => [...w].reverse().join('')).sort();
    let ans = 0;
    for (let i = 0; i < rev.length; i++) {
        if (i + 1 < rev.length && rev[i + 1].startsWith(rev[i])) continue;
        ans += rev[i].length + 1;
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

static int cmp(const void* a, const void* b) { return strcmp(*(char**)a, *(char**)b); }

static void rev(char* s) {
    int n = strlen(s);
    for (int i = 0; i < n / 2; i++) {
        char t = s[i]; s[i] = s[n - 1 - i]; s[n - 1 - i] = t;
    }
}

int minimumLengthEncoding(char** words, int wordsSize) {
    for (int i = 0; i < wordsSize; i++) {
        char* w = strdup(words[i]);
        rev(w);
        words[i] = w;
    }
    qsort(words, wordsSize, sizeof(char*), cmp);
    int ans = 0;
    for (int i = 0; i < wordsSize; i++) {
        if (i + 1 < wordsSize && strncmp(words[i + 1], words[i], strlen(words[i])) == 0)
            continue;
        ans += (int)strlen(words[i]) + 1;
    }
    return ans;
}
```

```ts [TypeScript]
function minimumLengthEncoding(words: string[]): number {
    const rev = words.map((w) => [...w].reverse().join('')).sort();
    let ans = 0;
    for (let i = 0; i < rev.length; i++) {
        if (i + 1 < rev.length && rev[i + 1].startsWith(rev[i])) continue;
        ans += rev[i].length + 1;
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(Σ L log n)`，排序主导。
- **空间复杂度**：`O(Σ L)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 后缀集合 | `O(Σ L²)` | `O(Σ L)` | 简洁直观 |
| 反转 + 排序 | `O(Σ L log n)` | `O(Σ L)` | 利用前缀关系，推荐 |

编码最小化的关键是「后缀复用」：能作为其他单词后缀的词无需单独编码。集合删除法或反转排序法都能方便地识别可复用后缀。

