# [LCR 033. 字母异位词分组](https://leetcode.cn/problems/sfvd7V/)



## 一、题目描述

给定一个字符串数组 `strs` ，将 **变位词** 组合在一起。可以按任意顺序返回结果列表。

**注意：** 若 `s` 和 `t` 中每个字符出现的次数都相同，则称 `s` 和 `t` 互为变位词。



**示例 1：**

```
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**示例 2：**

```
输入: strs = [""]
输出: [[""]]
```

**示例 3：**

```
输入: strs = ["a"]
输出: [["a"]]
```

**提示：**

- `1 <= strs.length <= 10⁴`
- `0 <= strs[i].length <= 100`
- `strs[i]` 仅包含小写字母



## 二、解答方法

### 2.1 方法一：排序 + 哈希表

1. **思路**

互为变位词的字符串排序后得到的「规范化形式」完全相同。用哈希表把「排序后的字符串」映射到「原字符串分组列表」：

- 对每个 `strs[i]` 排序得到 `key`；
- 在哈希表中找到对应分组，加入原串；
- 最后返回所有分组。

时间 `O(n·k log k)`（`k` 为字符串平均长度），空间 `O(nk)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] arr = s.toCharArray();
            Arrays.sort(arr);
            String key = new String(arr);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}
        for s in strs:
            key = ''.join(sorted(s))
            groups.setdefault(key, []).append(s)
        return list(groups.values())
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& p : map) res.push_back(p.second);
        return res;
    }
};
```

```go [Go]
func groupAnagrams(strs []string) [][]string {
    groups := map[string][]string{}
    for _, s := range strs {
        b := []byte(s)
        sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
        key := string(b)
        groups[key] = append(groups[key], s)
    }
    res := make([][]string, 0, len(groups))
    for _, v := range groups {
        res = append(res, v)
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map();
    for (const s of strs) {
        const key = [...s].sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

// C 无内置哈希，这里用「排序后比较」的分组思路：
// 对每个字符串排序后，与前序分组的 key 比较（分组合并处理）
// 实现简洁，时间复杂度较高，用于演示思路。

static int cmpChar(const void* a, const void* b) {
    return *(const char*)a - *(const char*)b;
}

char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {
    char*** res = (char***)malloc(strsSize * sizeof(char**));
    int* cols = (int*)calloc(strsSize, sizeof(int));
    char keys[10000][101];
    int groupCnt = 0;
    for (int i = 0; i < strsSize; i++) {
        char sorted[101];
        strcpy(sorted, strs[i]);
        int len = strlen(sorted);
        qsort(sorted, len, sizeof(char), cmpChar);
        int g = -1;
        for (int j = 0; j < groupCnt; j++) {
            if (strlen(keys[j]) == len && strcmp(keys[j], sorted) == 0) { g = j; break; }
        }
        if (g == -1) {
            g = groupCnt;
            strcpy(keys[g], sorted);
            res[g] = (char**)malloc(strsSize * sizeof(char*));
            groupCnt++;
        }
        res[g][cols[g]] = strs[i];
        cols[g]++;
    }
    for (int j = 0; j < groupCnt; j++)
        res[j] = (char**)realloc(res[j], cols[j] * sizeof(char*));
    *returnSize = groupCnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (const s of strs) {
        const key = [...s].sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(s);
    }
    return [...map.values()];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n·k log k)`，`k` 为字符串平均长度。
- **空间复杂度**：`O(nk)`，哈希表存储全部分组。

### 2.2 方法二：计数编码（避免排序）

1. **思路**

不用排序，把每个字符串编码成「各字母出现次数」的形式，如 `#2#1#0#...#`（26 位计数拼接），相同编码即为同一分组。对短字符串更高效，编码本身 `O(k)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            int[] cnt = new int[26];
            for (char c : s.toCharArray()) cnt[c - 'a']++;
            StringBuilder sb = new StringBuilder();
            for (int n : cnt) sb.append('#').append(n);
            map.computeIfAbsent(sb.toString(), k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}
        for s in strs:
            cnt = [0] * 26
            for ch in s:
                cnt[ord(ch) - ord('a')] += 1
            key = '#'.join(map(str, cnt))
            groups.setdefault(key, []).append(s)
        return list(groups.values())
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (string& s : strs) {
            int cnt[26] = {0};
            for (char c : s) cnt[c - 'a']++;
            string key;
            for (int n : cnt) key += '#' + to_string(n);
            map[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& p : map) res.push_back(p.second);
        return res;
    }
};
```

```go [Go]
func groupAnagrams(strs []string) [][]string {
    groups := map[string][]string{}
    for _, s := range strs {
        cnt := [26]int{}
        for _, ch := range s {
            cnt[ch-'a']++
        }
        key := ""
        for _, n := range cnt {
            key += "#" + strconv.Itoa(n)
        }
        groups[key] = append(groups[key], s)
    }
    res := make([][]string, 0, len(groups))
    for _, v := range groups {
        res = append(res, v)
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map();
    for (const s of strs) {
        const cnt = new Array(26).fill(0);
        for (const ch of s) cnt[ch.charCodeAt(0) - 97]++;
        const key = cnt.join('#');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

// C 无内置哈希，这里用「计数编码 + 线性分组比较」演示编码法思路。
static void encode(const char* s, char out[512]) {
    int cnt[26] = {0};
    for (int i = 0; s[i]; i++) cnt[s[i] - 'a']++;
    int pos = 0;
    for (int i = 0; i < 26; i++) pos += sprintf(out + pos, "#%d", cnt[i]);
}

char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {
    char*** res = (char***)malloc(strsSize * sizeof(char**));
    int* cols = (int*)calloc(strsSize, sizeof(int));
    char keys[10000][512];
    int groupCnt = 0;
    for (int i = 0; i < strsSize; i++) {
        char key[512];
        encode(strs[i], key);
        int g = -1;
        for (int j = 0; j < groupCnt; j++)
            if (strcmp(keys[j], key) == 0) { g = j; break; }
        if (g == -1) {
            g = groupCnt;
            strcpy(keys[g], key);
            res[g] = (char**)malloc(strsSize * sizeof(char*));
            groupCnt++;
        }
        res[g][cols[g]] = strs[i];
        cols[g]++;
    }
    for (int j = 0; j < groupCnt; j++)
        res[j] = (char**)realloc(res[j], cols[j] * sizeof(char*));
    *returnSize = groupCnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (const s of strs) {
        const cnt: number[] = new Array(26).fill(0);
        for (const ch of s) cnt[ch.charCodeAt(0) - 97]++;
        const key = cnt.join('#');
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(s);
    }
    return [...map.values()];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n·k)`，省去排序。
- **空间复杂度**：`O(nk)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 哈希 | `O(n·k log k)` | `O(nk)` | 实现简单 |
| 计数编码 | `O(n·k)` | `O(nk)` | 无需排序，更高效 |

「规范化 key + 哈希分组」是分组类问题的通用套路：把结构相同但表示不同的对象映射到同一个 key，即可自然归组。

