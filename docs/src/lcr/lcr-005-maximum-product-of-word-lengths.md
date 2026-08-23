# [LCR 005. 最大单词长度乘积](https://leetcode.cn/problems/uppTvZ/)



## 一、题目描述

给定一个字符串数组 `words` ，请计算出两个字符串 `words[i]` 和 `words[j]` 的长度乘积的最大值，并且这两个字符串不包含相同的字符。

若其中任何一个字符串包含重复的字母，则无法满足「不包含相同字符」的要求，返回 `0` 即可。



**示例 1：**

```
输入：words = ["abcw","baz","foo","bar","fxyz","abcdef"]
输出：16
解释：这两个单词为 "abcw" (长度 4) 和 "fxyz" (长度 4)，不包含相同字符，长度乘积为 4 × 4 = 16。
```

**示例 2：**

```
输入：words = ["a","ab","abc","d","cd","bcd","abcd"]
输出：4
解释：这两个单词为 "ab" (长度 2) 和 "cd" (长度 2)，不包含相同字符，长度乘积为 2 × 2 = 4。
```

**示例 3：**

```
输入：words = ["a","aa","aaa","aaaa"]
输出：0
解释：不存在这样的两个字符串。
```

**提示：**

- `2 <= words.length <= 1000`
- `1 <= words[i].length <= 100`
- `words[i]` 仅包含小写字母



## 二、解答方法

### 2.1 方法一：位运算 + 哈希

1. **思路**

由于字符串只含小写字母，可用一个 26 位整数（位掩码）表示某个单词中包含的字母集合：第 `k` 位为 `1` 表示含有字母 `'a'+k`。

- 先对 `words` 中每个单词算出它的掩码，存入数组 `mask`；
- 双重枚举所有 `(i, j)` 对，若 `mask[i] & mask[j] == 0`（无公共字母），则更新答案 `max(len[i] * len[j])`。

时间复杂度 `O(n² + n·L)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maxProduct(String[] words) {
        int n = words.length;
        int[] mask = new int[n];
        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray()) {
                mask[i] |= (1 << (c - 'a'));
            }
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if ((mask[i] & mask[j]) == 0) {
                    ans = Math.max(ans, words[i].length() * words[j].length());
                }
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxProduct(self, words: List[str]) -> int:
        mask = []
        for w in words:
            m = 0
            for ch in w:
                m |= (1 << (ord(ch) - ord('a')))
            mask.append(m)
        ans = 0
        n = len(words)
        for i in range(n):
            for j in range(i + 1, n):
                if (mask[i] & mask[j]) == 0:
                    ans = max(ans, len(words[i]) * len(words[j]))
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxProduct(vector<string>& words) {
        int n = words.size();
        vector<int> mask(n, 0);
        for (int i = 0; i < n; i++) {
            for (char c : words[i]) mask[i] |= (1 << (c - 'a'));
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if ((mask[i] & mask[j]) == 0) {
                    ans = max(ans, (int)words[i].size() * (int)words[j].size());
                }
            }
        }
        return ans;
    }
};
```

```go [Go]
func maxProduct(words []string) int {
    n := len(words)
    mask := make([]int, n)
    for i, w := range words {
        for _, ch := range w {
            mask[i] |= (1 << (ch - 'a'))
        }
    }
    ans := 0
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if mask[i]&mask[j] == 0 {
                if l := len(words[i]) * len(words[j]); l > ans {
                    ans = l
                }
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
    const n = words.length;
    const mask = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (const ch of words[i]) {
            mask[i] |= (1 << (ch.charCodeAt(0) - 97));
        }
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((mask[i] & mask[j]) === 0) {
                ans = Math.max(ans, words[i].length * words[j].length);
            }
        }
    }
    return ans;
};
```

```c [C]
int maxProduct(char** words, int wordsSize) {
    int* mask = (int*)calloc(wordsSize, sizeof(int));
    for (int i = 0; i < wordsSize; i++) {
        for (int k = 0; words[i][k]; k++) {
            mask[i] |= (1 << (words[i][k] - 'a'));
        }
    }
    int ans = 0;
    for (int i = 0; i < wordsSize; i++) {
        for (int j = i + 1; j < wordsSize; j++) {
            if ((mask[i] & mask[j]) == 0) {
                int l1 = (int)strlen(words[i]);
                int l2 = (int)strlen(words[j]);
                if (l1 * l2 > ans) ans = l1 * l2;
            }
        }
    }
    free(mask);
    return ans;
}
```

```ts [TypeScript]
function maxProduct(words: string[]): number {
    const n = words.length;
    const mask: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (const ch of words[i]) {
            mask[i] |= (1 << (ch.charCodeAt(0) - 97));
        }
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((mask[i] & mask[j]) === 0) {
                ans = Math.max(ans, words[i].length * words[j].length);
            }
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n² + n·L)`，`n` 为单词数，`L` 为单词平均长度。
- **空间复杂度**：`O(n)`，存储每个单词的位掩码。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 位运算 + 枚举 | `O(n² + n·L)` | `O(n)` | 巧妙利用 26 位掩码判断无公共字母 |

利用位掩码把「判断两个单词是否含相同字母」降为一次 `O(1)` 的按位与，是本题的核心优化点。

