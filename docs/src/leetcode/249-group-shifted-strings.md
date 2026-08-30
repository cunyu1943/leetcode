# [249. 移位字符串分组](https://leetcode.cn/problems/group-shifted-strings/) [🔒 会员题]



## 一、题目描述

给定一个字符串数组，将字母 **异位词** 组合在一起。字母异位词指字母相同，但排列不同的字符串。

**注意：** 本题要求的是「移位字符串」分组 —— 如果字符串 `s` 中的每个字符都 **向前移动相同的位数** 后能得到字符串 `t`，则 `s` 和 `t` 属于同一组。移位是 **循环** 的（`'z'` 向前移一位得到 `'a'`）。

例如：`"abc"` → `"bcd"` → `"xyz"` → `"zab"` 都属于同一组。

**示例：**

```
输入：strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
输出：[["abc","bcd","xyz"],["az","ba"],["acef"],["a","z"]]
解释：
- "abc"、"bcd"、"xyz" 各字符移位量一致（分别是 +0、+1、+23），属于同一组；
- "az" 与 "ba"：'a'→'b' 移 1，'z'→'a' 移 1（循环），同一组；
- "a" 与 "z" 是单字符，全部单字符属于同一模式组。
```

**提示：**

-   `1 <= strings.length <= 200`
-   `1 <= strings[i].length <= 50`
-   `strings[i]` 只包含小写英文字母



## 二、解答方法

### 2.1 方法一：归一化模式串作为哈希键

1. **思路**

把每个字符串 **归一化** 成一个「相对位移模式」：以首字符为基准，计算每个字符相对首字符的偏移量 `diff`，并对 26 取模保证非负。

```
diff_i = (s[i] - s[0] + 26) % 26
```

把 `diff` 序列序列化成字符串（如用 `,` 拼接）作为哈希表的 key，同组的字符串必然有相同的 key。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<List<String>> groupStrings(String[] strings) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strings) {
            StringBuilder key = new StringBuilder();
            for (int i = 0; i < s.length(); i++) {
                int diff = (s.charAt(i) - s.charAt(0) + 26) % 26;
                key.append(diff).append(',');
            }
            map.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}
```

```python [Python]
class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:
        groups = {}
        for s in strings:
            # 以首字符为基准，计算每个字符的相对偏移
            key = tuple((ord(c) - ord(s[0])) % 26 for c in s)
            groups.setdefault(key, []).append(s)
        return list(groups.values())
```

```go [Go]
func groupStrings(strings []string) [][]string {
    groups := make(map[string][]string)
    for _, s := range strings {
        key := ""
        for i := 0; i < len(s); i++ {
            diff := (int(s[i]) - int(s[0]) + 26) % 26
            key += strconv.Itoa(diff) + ","
        }
        groups[key] = append(groups[key], s)
    }
    res := [][]string{}
    for _, v := range groups {
        res = append(res, v)
    }
    return res
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> groupStrings(vector<string>& strings) {
        unordered_map<string, vector<string>> groups;
        for (const string& s : strings) {
            string key;
            for (char c : s) {
                int diff = (c - s[0] + 26) % 26;
                key += to_string(diff) + ",";
            }
            groups[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& kv : groups) res.push_back(kv.second);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {
    const groups = new Map();
    for (const s of strings) {
        const key = [];
        for (const c of s) {
            key.push((c.charCodeAt(0) - s.charCodeAt(0) + 26) % 26);
        }
        const k = key.join(',');
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k).push(s);
    }
    return [...groups.values()];
};
```

```ts [TypeScript]
/**
 * @param {string[]} strings
 * @return {string[][]}
 */
function groupStrings(strings: string[]): string[][] {
    const groups = new Map<string, string[]>();
    for (const s of strings) {
        const key: number[] = [];
        for (let i = 0; i < s.length; i++) {
            key.push((s.charCodeAt(i) - s.charCodeAt(0) + 26) % 26);
        }
        const k = key.join(',');
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k)!.push(s);
    }
    return [...groups.values()];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n × L)`，n 为字符串个数，L 为平均长度。
- **空间复杂度**：`O(n × L)`（存储所有 key 与分组结果）。

### 2.2 方法二：按长度分组后再归一化

1. **思路**

不同长度的字符串一定不同组，可先按长度分桶，再在桶内做归一化分组。这是一层剪枝，逻辑上与方法一等价。

2. **代码实现（Python）**

```python
class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:
        from collections import defaultdict
        by_len = defaultdict(list)
        for s in strings:
            by_len[len(s)].append(s)
        res = []
        for bucket in by_len.values():
            groups = defaultdict(list)
            for s in bucket:
                key = tuple((ord(c) - ord(s[0])) % 26 for c in s)
                groups[key].append(s)
            res.extend(groups.values())
        return res
```

## 三、总结

本题是 `49. 字母异位词分组` 的变体：

| 题目 | 分组依据 | 归一化方式 |
| ---- | -------- | ---------- |
| 49 字母异位词分组 | 字符及频次相同 | 排序后作为 key |
| 249 移位字符串分组 | 相对位移模式相同 | 相对首字符的偏移序列作为 key |

核心技巧：**找到「同组元素的共同不变量」**，把它序列化为哈希键。本题中同组字符串的「相邻字符差值序列」完全一致，这就是不变量。

注意 `(c - s[0] + 26) % 26`：加 26 是为了处理 `c < s[0]` 的负数情况（如 `'a' - 'z'`），保证差值为正。
