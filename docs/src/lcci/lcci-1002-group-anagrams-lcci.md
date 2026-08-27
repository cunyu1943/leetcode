# [面试题 10.02. 变位词组](https://leetcode.cn/problems/group-anagrams-lcci/)

## 一、题目描述

编写一种方法，对字符串数组进行排序，将所有变位词组合在一起。变位词是指字母相同，但排列不同的字符串。

**示例：**

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

**说明：**

- 所有输入均为小写字母。
- 不考虑答案输出的顺序。

---

## 二、解答方法

### 2.1 方法一：排序作为哈希键

**1. 思路**

两个字符串互为变位词，当且仅当它们的字符排序后相同。因此，以「排序后的字符串」作为哈希表的键，将原始字符串分组存入对应的桶中。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] cs = s.toCharArray();
            Arrays.sort(cs);
            String key = new String(cs);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        from collections import defaultdict
        mp = defaultdict(list)
        for s in strs:
            mp["".join(sorted(s))].append(s)
        return list(mp.values())
```

```go [Go]
func groupAnagrams(strs []string) [][]string {
    mp := make(map[string][]string)
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
// 使用计数数组作为键的实现见方法二
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (auto& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& p : mp) res.push_back(p.second);
        return res;
    }
};
```

```javascript [JavaScript]
var groupAnagrams = function(strs) {
    const mp = new Map();
    for (const s of strs) {
        const key = s.split("").sort().join("");
        if (!mp.has(key)) mp.set(key, []);
        mp.get(key).push(s);
    }
    return Array.from(mp.values());
};
```

```typescript [TypeScript]
function groupAnagrams(strs: string[]): string[][] {
    const mp = new Map<string, string[]>();
    for (const s of strs) {
        const key = s.split("").sort().join("");
        if (!mp.has(key)) mp.set(key, []);
        mp.get(key)!.push(s);
    }
    return Array.from(mp.values());
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * k log k)`，n 为字符串个数，k 为字符串平均长度。
- **空间复杂度**：`O(n * k)`，用于存储哈希表。

---

### 2.2 方法二：字符计数作为键

**1. 思路**

由于所有字符均为小写字母，可以用长度为 26 的计数数组表示每个字符出现的次数，将该数组拼接为字符串作为键。相比排序，避免了对字符串的排序操作。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            int[] cnt = new int[26];
            for (char c : s.toCharArray()) cnt[c - 'a']++;
            StringBuilder key = new StringBuilder();
            for (int x : cnt) key.append('#').append(x);
            map.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        from collections import defaultdict
        mp = defaultdict(list)
        for s in strs:
            cnt = [0] * 26
            for c in s:
                cnt[ord(c) - ord('a')] += 1
            mp[tuple(cnt)].append(s)
        return list(mp.values())
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (auto& s : strs) {
            int cnt[26] = {0};
            for (char c : s) cnt[c - 'a']++;
            string key;
            for (int x : cnt) { key += '#'; key += char(x + '0'); }
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& p : mp) res.push_back(p.second);
        return res;
    }
};
```

```javascript [JavaScript]
var groupAnagrams = function(strs) {
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

```typescript [TypeScript]
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

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * k)`，k 为字符串平均长度。
- **空间复杂度**：`O(n * k)`。

---

## 三、总结

| 方法           | 时间复杂度     | 空间复杂度  | 特点                       |
| -------------- | -------------- | ----------- | -------------------------- |
| 排序作为哈希键 | `O(n·k log k)` | `O(n·k)`    | 实现简单直观               |
| 字符计数作为键 | `O(n·k)`       | `O(n·k)`    | 效率更高，适合长字符串     |

**推荐**：在字符串较长时，字符计数法更优；一般情况下两种方法均可，推荐使用排序法以获得更简洁的代码。
