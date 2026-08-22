# [49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)



## 一、题目描述

给你一个字符串数组，请你将 **字母异位词** 组合在一起。可以按任意顺序返回结果列表。

字母异位词是由重新排列源单词的所有字母得到的一个新单词。



**示例 1：**

```
输入：strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出：[["bat"],["nat","tan"],["ate","eat","tea"]]
```

**示例 2：**

```
输入：strs = [""]
输出：[[""]]
```

**示例 3：**

```
输入：strs = ["a"]
输出：[["a"]]
```

**提示：**

-   `1 <= strs.length <= 10^4`
-   `0 <= strs[i].length <= 100`
-   `strs[i]` 仅包含小写字母



## 二、解答方法

### 2.1 方法一：排序作为哈希键

1. **思路**

字母异位词排序后得到的字符串完全相同，可作为哈希表的键：

-   对每个字符串排序（字母重排成统一形式）；
-   用 `HashMap<排序后字符串, 列表>` 将异位词归到同一组；
-   返回所有分组的集合。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ch = s.toCharArray();
            Arrays.sort(ch);
            String key = new String(ch);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        mp = {}
        for s in strs:
            key = "".join(sorted(s))
            mp.setdefault(key, []).append(s)
        return list(mp.values())
```

```go [Go]
func groupAnagrams(strs []string) [][]string {
    mp := map[string][]string{}
    for _, s := range strs {
        b := []byte(s)
        sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
        key := string(b)
        mp[key] = append(mp[key], s)
    }
    res := make([][]string, 0, len(mp))
    for _, v := range mp {
        res = append(res, v)
    }
    return res
}
```

```c [C]
/* 字母异位词分组在 C 中需手动实现排序与哈希，较繁琐，推荐移植上述思路 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& kv : mp) res.push_back(kv.second);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const mp = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!mp.has(key)) mp.set(key, []);
        mp.get(key).push(s);
    }
    return Array.from(mp.values());
};
```

```ts [TypeScript]
function groupAnagrams(strs: string[]): string[][] {
    const mp = new Map<string, string[]>();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!mp.has(key)) mp.set(key, []);
        mp.get(key)!.push(s);
    }
    return Array.from(mp.values());
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(sum(k log k))`，`k` 为每个字符串长度，排序主导。
- **空间复杂度**：`O(sum(k))`，存储结果与哈希表。

### 2.2 方法二：字符计数作为哈希键

1. **思路**

由于只含小写字母，可用长度为 26 的计数数组表示每个字符串的字母频次，把频次拼成如 `"1#2#0#..."` 的字符串作为键。比排序更快（避免字符串排序的 `log k`）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            int[] cnt = new int[26];
            for (char c : s.toCharArray()) cnt[c - 'a']++;
            StringBuilder key = new StringBuilder();
            for (int x : cnt) key.append(x).append('#');
            map.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        mp = {}
        for s in strs:
            cnt = [0] * 26
            for c in s:
                cnt[ord(c) - ord('a')] += 1
            key = tuple(cnt)
            mp.setdefault(key, []).append(s)
        return list(mp.values())
```

```go [Go]
func groupAnagrams(strs []string) [][]string {
    mp := map[string][]string{}
    for _, s := range strs {
        cnt := make([]byte, 26)
        for i := 0; i < len(s); i++ {
            cnt[s[i]-'a']++
        }
        key := string(cnt)
        mp[key] = append(mp[key], s)
    }
    res := make([][]string, 0, len(mp))
    for _, v := range mp {
        res = append(res, v)
    }
    return res
}
```

```c [C]
/* 计数键法在 C 中需手动管理哈希，略去完整实现 */
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (string& s : strs) {
            int cnt[26] = {0};
            for (char c : s) cnt[c - 'a']++;
            string key;
            for (int x : cnt) { key += to_string(x); key += '#'; }
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& kv : mp) res.push_back(kv.second);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const mp = new Map();
    for (const s of strs) {
        const cnt = new Array(26).fill(0);
        for (const c of s) cnt[c.charCodeAt(0) - 97]++;
        const key = cnt.join('#');
        if (!mp.has(key)) mp.set(key, []);
        mp.get(key).push(s);
    }
    return Array.from(mp.values());
};
```

```ts [TypeScript]
function groupAnagrams(strs: string[]): string[][] {
    const mp = new Map<string, string[]>();
    for (const s of strs) {
        const cnt = new Array(26).fill(0);
        for (const c of s) cnt[c.charCodeAt(0) - 97]++;
        const key = cnt.join('#');
        if (!mp.has(key)) mp.set(key, []);
        mp.get(key)!.push(s);
    }
    return Array.from(mp.values());
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(sum(k))`，计数法线性扫描每个字符（键拼接为常量 26）。
- **空间复杂度**：`O(sum(k))`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序作为哈希键 | `O(sum(k log k))` | `O(sum(k))` | 实现简单，通用 |
| 字符计数作为哈希键 | `O(sum(k))` | `O(sum(k))` | 更快，仅适用于定长字母表 |

