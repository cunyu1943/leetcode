# [30. 串联所有单词的子串](https://leetcode.cn/problems/substring-with-concatenation-of-all-words/)



## 一、题目描述

给定一个字符串 `s` 和一个字符串数组 `words`。`words` 中所有字符串 **长度相同**。

`s` 中的 **串联子串** 是指一个包含 `words` 中所有字符串以任意顺序排列连接起来的子串。

返回所有串联子串在 `s` 中的开始索引。你可以以 **任意顺序** 返回答案。



**示例 1：**

```
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串长度必须为 6。子串 "barfoo" 开始位置是 0，"foobar" 开始位置是 9。
```

**示例 2：**

```
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]
```

**示例 3：**

```
输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
```

**提示：**

-   `1 <= s.length <= 10^4`
-   `1 <= words.length <= 5000`
-   `1 <= words[i].length <= 30`
-   `words[i]` 和 `s` 由小写英文字母组成



## 二、解答方法

### 2.1 方法一：滑动窗口（按单词长度对齐）

1. **思路**

设每个单词长度为 `len`、单词个数为 `cnt`，则串联子串长度为 `len * cnt`。由于所有单词等长，可以从 `0 ~ len-1` 这 `len` 个起始偏移分别做滑动窗口，保证窗口内按「单词边界」切片：

-   用哈希表 `need` 统计 `words` 中每个词的频次；
-   滑动窗口维护当前区间内单词频次 `window`，当 `window == need` 且窗口恰好包含 `cnt` 个词，记录左端点；
-   窗口向右滑动一个「单词长度」，移出左端单词、加入右端单词。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> res = new ArrayList<>();
        if (s.isEmpty() || words.length == 0) return res;
        int len = words[0].length(), cnt = words.length;
        int total = len * cnt;
        Map<String, Integer> need = new HashMap<>();
        for (String w : words) need.put(w, need.getOrDefault(w, 0) + 1);
        for (int offset = 0; offset < len; offset++) {
            Map<String, Integer> window = new HashMap<>();
            int matched = 0, left = offset;
            for (int right = offset; right + len <= s.length(); right += len) {
                String w = s.substring(right, right + len);
                if (need.containsKey(w)) {
                    window.put(w, window.getOrDefault(w, 0) + 1);
                    if (window.get(w) <= need.get(w)) matched++;
                }
                if (right - left == total - len) {
                    if (matched == cnt * need.size() / need.size() && matched == cnt) res.add(left);
                    String out = s.substring(left, left + len);
                    if (need.containsKey(out)) {
                        window.put(out, window.get(out) - 1);
                        if (window.get(out) < need.get(out)) matched--;
                    }
                    left += len;
                }
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        from collections import Counter
        res = []
        if not s or not words:
            return res
        len_, cnt = len(words[0]), len(words)
        total = len_ * cnt
        need = Counter(words)
        for offset in range(len_):
            window = {}
            matched = 0
            left = offset
            for right in range(offset, len(s) - len_ + 1, len_):
                w = s[right:right + len_]
                if w in need:
                    window[w] = window.get(w, 0) + 1
                    if window[w] <= need[w]:
                        matched += 1
                if right - left == total - len_:
                    if matched == cnt:
                        res.append(left)
                    out = s[left:left + len_]
                    if out in need:
                        window[out] -= 1
                        if window[out] < need[out]:
                            matched -= 1
                    left += len_
        return res
```

```go [Go]
func findSubstring(s string, words []string) []int {
    res := []int{}
    if len(s) == 0 || len(words) == 0 {
        return res
    }
    lenW, cnt := len(words[0]), len(words)
    total := lenW * cnt
    need := map[string]int{}
    for _, w := range words {
        need[w]++
    }
    for offset := 0; offset < lenW; offset++ {
        window := map[string]int{}
        matched := 0
        left := offset
        for right := offset; right+lenW <= len(s); right += lenW {
            w := s[right : right+lenW]
            if _, ok := need[w]; ok {
                window[w]++
                if window[w] <= need[w] {
                    matched++
                }
            }
            if right-left == total-lenW {
                if matched == cnt {
                    res = append(res, left)
                }
                out := s[left : left+lenW]
                if _, ok := need[out]; ok {
                    window[out]--
                    if window[out] < need[out] {
                        matched--
                    }
                }
                left += lenW
            }
        }
    }
    return res
}
```

```c [C]
/* C 实现需哈希表与动态数组，较繁琐，推荐移植上述滑动窗口思路 */
```

```cpp [C++]
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> res;
        if (s.empty() || words.empty()) return res;
        int len = words[0].size(), cnt = words.size();
        int total = len * cnt;
        unordered_map<string, int> need;
        for (string& w : words) need[w]++;
        for (int offset = 0; offset < len; offset++) {
            unordered_map<string, int> window;
            int matched = 0;
            int left = offset;
            for (int right = offset; right + len <= s.size(); right += len) {
                string w = s.substr(right, len);
                if (need.count(w)) {
                    window[w]++;
                    if (window[w] <= need[w]) matched++;
                }
                if (right - left == total - len) {
                    if (matched == cnt) res.push_back(left);
                    string out = s.substr(left, len);
                    if (need.count(out)) {
                        window[out]--;
                        if (window[out] < need[out]) matched--;
                    }
                    left += len;
                }
            }
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    const res = [];
    if (!s || words.length === 0) return res;
    const len = words[0].length, cnt = words.length;
    const total = len * cnt;
    const need = {};
    for (const w of words) need[w] = (need[w] || 0) + 1;
    for (let offset = 0; offset < len; offset++) {
        const window = {};
        let matched = 0;
        let left = offset;
        for (let right = offset; right + len <= s.length; right += len) {
            const w = s.substring(right, right + len);
            if (w in need) {
                window[w] = (window[w] || 0) + 1;
                if (window[w] <= need[w]) matched++;
            }
            if (right - left === total - len) {
                if (matched === cnt) res.push(left);
                const out = s.substring(left, left + len);
                if (out in need) {
                    window[out]--;
                    if (window[out] < need[out]) matched--;
                }
                left += len;
            }
        }
    }
    return res;
};
```

```ts [TypeScript]
function findSubstring(s: string, words: string[]): number[] {
    const res: number[] = [];
    if (!s || words.length === 0) return res;
    const len = words[0].length, cnt = words.length;
    const total = len * cnt;
    const need: Record<string, number> = {};
    for (const w of words) need[w] = (need[w] || 0) + 1;
    for (let offset = 0; offset < len; offset++) {
        const window: Record<string, number> = {};
        let matched = 0;
        let left = offset;
        for (let right = offset; right + len <= s.length; right += len) {
            const w = s.substring(right, right + len);
            if (w in need) {
                window[w] = (window[w] || 0) + 1;
                if (window[w] <= need[w]) matched++;
            }
            if (right - left === total - len) {
                if (matched === cnt) res.push(left);
                const out = s.substring(left, left + len);
                if (out in need) {
                    window[out]--;
                    if (window[out] < need[out]) matched--;
                }
                left += len;
            }
        }
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n = s.length`。外层 `len` 个偏移，内层线性扫描，每个字符被访问常数次。
- **空间复杂度**：`O(cnt)`，哈希表存储单词频次。

### 2.2 方法二：哈希表 + 逐起始位置暴力

1. **思路**

直接枚举 `s` 中每个可能起点 `i`（共 `n` 个），从 `i` 开始按单词长度切片 `cnt` 次，统计频次与 `need` 比对。实现简单但会被重复比较，效率低于滑动窗口。仅作对比。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> res = new ArrayList<>();
        if (s.isEmpty() || words.length == 0) return res;
        int len = words[0].length(), cnt = words.length;
        int total = len * cnt;
        Map<String, Integer> need = new HashMap<>();
        for (String w : words) need.put(w, need.getOrDefault(w, 0) + 1);
        for (int i = 0; i + total <= s.length(); i++) {
            Map<String, Integer> window = new HashMap<>();
            int j = 0;
            for (; j < cnt; j++) {
                String w = s.substring(i + j * len, i + (j + 1) * len);
                if (!need.containsKey(w)) break;
                window.put(w, window.getOrDefault(w, 0) + 1);
                if (window.get(w) > need.get(w)) break;
            }
            if (j == cnt) res.add(i);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        from collections import Counter
        res = []
        if not s or not words:
            return res
        len_, cnt = len(words[0]), len(words)
        total = len_ * cnt
        need = Counter(words)
        for i in range(len(s) - total + 1):
            window = Counter()
            ok = True
            for j in range(cnt):
                w = s[i + j * len_: i + (j + 1) * len_]
                if w not in need or window[w] + 1 > need[w]:
                    ok = False
                    break
                window[w] += 1
            if ok:
                res.append(i)
        return res
```

```go [Go]
func findSubstring(s string, words []string) []int {
    res := []int{}
    if len(s) == 0 || len(words) == 0 {
        return res
    }
    lenW, cnt := len(words[0]), len(words)
    total := lenW * cnt
    need := map[string]int{}
    for _, w := range words {
        need[w]++
    }
    for i := 0; i+total <= len(s); i++ {
        window := map[string]int{}
        ok := true
        for j := 0; j < cnt; j++ {
            w := s[i+j*lenW : i+(j+1)*lenW]
            if _, ok2 := need[w]; !ok2 {
                ok = false
                break
            }
            window[w]++
            if window[w] > need[w] {
                ok = false
                break
            }
        }
        if ok {
            res = append(res, i)
        }
    }
    return res
}
```

```c [C]
/* 暴力法需哈希表与动态数组，C 中实现繁琐，推荐滑动窗口法 */
```

```cpp [C++]
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> res;
        if (s.empty() || words.empty()) return res;
        int len = words[0].size(), cnt = words.size();
        int total = len * cnt;
        unordered_map<string, int> need;
        for (string& w : words) need[w]++;
        for (int i = 0; i + total <= s.size(); i++) {
            unordered_map<string, int> window;
            int j = 0;
            for (; j < cnt; j++) {
                string w = s.substr(i + j * len, len);
                if (!need.count(w)) break;
                window[w]++;
                if (window[w] > need[w]) break;
            }
            if (j == cnt) res.push_back(i);
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    const res = [];
    if (!s || words.length === 0) return res;
    const len = words[0].length, cnt = words.length;
    const total = len * cnt;
    const need = {};
    for (const w of words) need[w] = (need[w] || 0) + 1;
    for (let i = 0; i + total <= s.length; i++) {
        const window = {};
        let j = 0;
        for (; j < cnt; j++) {
            const w = s.substring(i + j * len, i + (j + 1) * len);
            if (!(w in need)) break;
            window[w] = (window[w] || 0) + 1;
            if (window[w] > need[w]) break;
        }
        if (j === cnt) res.push(i);
    }
    return res;
};
```

```ts [TypeScript]
function findSubstring(s: string, words: string[]): number[] {
    const res: number[] = [];
    if (!s || words.length === 0) return res;
    const len = words[0].length, cnt = words.length;
    const total = len * cnt;
    const need: Record<string, number> = {};
    for (const w of words) need[w] = (need[w] || 0) + 1;
    for (let i = 0; i + total <= s.length; i++) {
        const window: Record<string, number> = {};
        let j = 0;
        for (; j < cnt; j++) {
            const w = s.substring(i + j * len, i + (j + 1) * len);
            if (!(w in need)) break;
            window[w] = (window[w] || 0) + 1;
            if (window[w] > need[w]) break;
        }
        if (j === cnt) res.push(i);
    }
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n * cnt)`，每个起点都重新切片比较 `cnt` 个词。
- **空间复杂度**：`O(cnt)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑动窗口（按单词长度对齐） | `O(n)` | `O(cnt)` | 常规实现 |
| 哈希表 + 逐起始位置暴力 | `O(n * cnt)` | `O(cnt)` | 查找/聚合高效 |

