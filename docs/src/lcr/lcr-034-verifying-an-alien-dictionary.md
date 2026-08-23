# [LCR 034. 验证外星语词典](https://leetcode.cn/problems/lwyVBB/)



## 一、题目描述

某种外星语也使用英文小写字母，但可能顺序 `order` 不同。字母表的顺序（`order`）是一些小写字母的排列。

给定一组用外星语书写的单词 `words`，以及其字母表的顺序 `order`，只有当给定的单词在这种外星语中按字典序排列时，返回 `true`；否则，返回 `false`。



**示例 1：**

```
输入：words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
输出：false
解释：在该语言的字母表中，'h' 位于 'l' 之前，所以单词序列是按字典序排列的。
```

**示例 2：**

```
输入：words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
输出：false
解释：在该语言的字母表中，'d' 位于 'l' 之后，那么 words[0] > words[1]，因此单词序列不是按字典序排列的。
```

**示例 3：**

```
输入：words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
输出：false
解释：当前三个字符 "app" 匹配时，第二个字符串相对短一些，然后根据词典规则 "apple" > "app"，因为 'l' > '∅'（定义为比任何其他字符都更小）。
```

**提示：**

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 20`
- `order.length == 26`
- 在 `words[i]` 和 `order` 中的所有字符都是英文小写字母。



## 二、解答方法

### 2.1 方法一：映射 + 相邻比较

1. **思路**

- 用数组 `rank[26]` 记录外星字母表中每个字符的「优先级下标」（越小越靠前）；
- 依次比较相邻两个单词 `words[i]` 与 `words[i+1]`：
  - 逐字符比较，若 `rank[a] < rank[b]` 则这一对满足；若 `rank[a] > rank[b]` 则直接返回 `false`；
  - 若前 `minLen` 个字符全部相等，则较短的必须在前，否则返回 `false`。

时间 `O(Σ len(words))`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        int[] rank = new int[26];
        for (int i = 0; i < order.length(); i++) rank[order.charAt(i) - 'a'] = i;
        for (int i = 0; i < words.length - 1; i++) {
            String a = words[i], b = words[i + 1];
            int len = Math.min(a.length(), b.length());
            boolean shorter = false;
            for (int j = 0; j < len; j++) {
                int ra = rank[a.charAt(j) - 'a'], rb = rank[b.charAt(j) - 'a'];
                if (ra < rb) { shorter = true; break; }
                if (ra > rb) return false;
            }
            if (!shorter && a.length() > b.length()) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        rank = {c: i for i, c in enumerate(order)}
        for i in range(len(words) - 1):
            a, b = words[i], words[i + 1]
            shorter = False
            for x, y in zip(a, b):
                if rank[x] < rank[y]:
                    shorter = True
                    break
                if rank[x] > rank[y]:
                    return False
            if not shorter and len(a) > len(b):
                return False
        return True
```

```cpp [C++]
class Solution {
public:
    bool isAlienSorted(vector<string>& words, string order) {
        int rank[26];
        for (int i = 0; i < 26; i++) rank[order[i] - 'a'] = i;
        for (int i = 0; i < words.size() - 1; i++) {
            const string& a = words[i];
            const string& b = words[i + 1];
            bool shorter = false;
            int len = min(a.size(), b.size());
            for (int j = 0; j < len; j++) {
                if (rank[a[j] - 'a'] < rank[b[j] - 'a']) { shorter = true; break; }
                if (rank[a[j] - 'a'] > rank[b[j] - 'a']) return false;
            }
            if (!shorter && a.size() > b.size()) return false;
        }
        return true;
    }
};
```

```go [Go]
func isAlienSorted(words []string, order string) bool {
    rank := [26]int{}
    for i, c := range order {
        rank[c-'a'] = i
    }
    for i := 0; i < len(words)-1; i++ {
        a, b := words[i], words[i+1]
        shorter := false
        n := len(a)
        if len(b) < n {
            n = len(b)
        }
        for j := 0; j < n; j++ {
            if rank[a[j]-'a'] < rank[b[j]-'a'] {
                shorter = true
                break
            }
            if rank[a[j]-'a'] > rank[b[j]-'a'] {
                return false
            }
        }
        if !shorter && len(a) > len(b) {
            return false
        }
    }
    return true
}
```

```js [JavaScript]
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
    const rank = new Array(26).fill(0);
    for (let i = 0; i < order.length; i++) rank[order.charCodeAt(i) - 97] = i;
    for (let i = 0; i < words.length - 1; i++) {
        const a = words[i], b = words[i + 1];
        const len = Math.min(a.length, b.length);
        let shorter = false;
        for (let j = 0; j < len; j++) {
            const ra = rank[a.charCodeAt(j) - 97], rb = rank[b.charCodeAt(j) - 97];
            if (ra < rb) { shorter = true; break; }
            if (ra > rb) return false;
        }
        if (!shorter && a.length > b.length) return false;
    }
    return true;
};
```

```c [C]
#include <string.h>

int isAlienSorted(char** words, int wordsSize, char* order) {
    int rank[26];
    for (int i = 0; i < 26; i++) rank[order[i] - 'a'] = i;
    for (int i = 0; i < wordsSize - 1; i++) {
        char* a = words[i];
        char* b = words[i + 1];
        int la = (int)strlen(a), lb = (int)strlen(b);
        int n = la < lb ? la : lb;
        int shorter = 0;
        for (int j = 0; j < n; j++) {
            if (rank[a[j] - 'a'] < rank[b[j] - 'a']) { shorter = 1; break; }
            if (rank[a[j] - 'a'] > rank[b[j] - 'a']) return 0;
        }
        if (!shorter && la > lb) return 0;
    }
    return 1;
}
```

```ts [TypeScript]
function isAlienSorted(words: string[], order: string): boolean {
    const rank: number[] = new Array(26).fill(0);
    for (let i = 0; i < order.length; i++) rank[order.charCodeAt(i) - 97] = i;
    for (let i = 0; i < words.length - 1; i++) {
        const a = words[i], b = words[i + 1];
        const len = Math.min(a.length, b.length);
        let shorter = false;
        for (let j = 0; j < len; j++) {
            const ra = rank[a.charCodeAt(j) - 97], rb = rank[b.charCodeAt(j) - 97];
            if (ra < rb) { shorter = true; break; }
            if (ra > rb) return false;
        }
        if (!shorter && a.length > b.length) return false;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(Σ len(words))`，每个字符最多比较一次。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 映射 + 相邻比较 | `O(Σ len)` | `O(1)` | 最优，逐个字符比较 |

本题把外星字母顺序映射为整数优先级，然后按普通字典序规则比较相邻单词，注意「短单词是长单词前缀时，短者必须在前」。

