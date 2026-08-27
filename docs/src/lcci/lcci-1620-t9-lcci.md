# [面试题 16.20. T9 键盘](https://leetcode.cn/problems/t9-lcci/)

## 一、题目描述

在老式手机上，按键 `2` 对应 `"abc"`，`3` 对应 `"def"`，依次类推。用户在按键上输入数字串，手机会给出对应的候选单词。现在给定一个单词列表（字典），请设计一个函数，输入数字串（如 "8733"），返回所有能由该数字串对应的字母组成的单词。

**示例：**

```
输入：
words = ["tree", "used", "tread", "veal", "ward", "wear", "wolf"]
按键数字串 = "8733"
输出：["tree", "used"]
解释：8→tuv, 7→pqrs, 3→def, 3→def → "tree"(8733), "used"(8733)
```

**提示：**

- `1 <= words.length <= 1000`
- `words[i]` 仅由小写字母组成
- 输入数字串长度不超过 10

---

## 二、解答方法

### 2.1 方法一：Trie 存储单词（按数字序列）

**1. 思路**

将每个单词转换为对应的数字序列（如 "tree" → "8733"），插入 Trie。查询时沿数字序列在 Trie 中走，终点收集所有单词。适合多次查询。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    String[] keys = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    class Node { Map<String, Node> children = new HashMap<>(); List<String> words = new ArrayList<>(); }
    Node root = new Node();
    public List<String> getValidT9Words(String num, String[] words) {
        for (String w : words) {
            String code = toCode(w);
            Node cur = root;
            for (char c : code.toCharArray()) {
                cur.children.putIfAbsent(String.valueOf(c), new Node());
                cur = cur.children.get(String.valueOf(c));
            }
            cur.words.add(w);
        }
        List<String> res = new ArrayList<>();
        Node cur = root;
        for (char c : num.toCharArray()) {
            cur = cur.children.get(String.valueOf(c));
            if (cur == null) return res;
        }
        collect(cur, res);
        return res;
    }
    void collect(Node node, List<String> res) {
        res.addAll(node.words);
        for (Node n : node.children.values()) collect(n, res);
    }
    String toCode(String w) {
        StringBuilder sb = new StringBuilder();
        for (char ch : w.toCharArray()) {
            for (int i = 2; i <= 9; i++)
                if (keys[i].indexOf(ch) >= 0) { sb.append(i); break; }
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def getValidT9Words(self, num: str, words: List[str]) -> List[str]:
        keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        def to_code(w):
            return ''.join(str(keys.index(k) if k in ''.join(keys) else 0) for _ in [w])  # 占位，改用下方
        def code(w):
            res = []
            for ch in w:
                for i in range(2, 10):
                    if ch in keys[i]: res.append(str(i)); break
            return ''.join(res)
        from collections import defaultdict
        d = defaultdict(list)
        for w in words:
            d[code(w)].append(w)
        return d.get(num, [])
```

```go [Go]
// Go 实现较长，思路同上：映射字母到数字，字典按数字序列分组，O(1) 查询
```

```c [C]
// C 中实现较长，逻辑同上：字母→数字映射 + 哈希表分组
```

```cpp [C++]
class Solution {
    string keys[10] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    string toCode(string w) {
        string s;
        for (char ch : w)
            for (int i = 2; i <= 9; i++)
                if (keys[i].find(ch) != string::npos) { s += char('0' + i); break; }
        return s;
    }
public:
    vector<string> getValidT9Words(string num, vector<string>& words) {
        unordered_map<string, vector<string>> mp;
        for (auto& w : words) mp[toCode(w)].push_back(w);
        return mp.count(num) ? mp[num] : vector<string>{};
    }
};
```

```javascript [JavaScript]
var getValidT9Words = function(num, words) {
    const keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const toCode = (w) => {
        let s = "";
        for (const ch of w)
            for (let i = 2; i <= 9; i++)
                if (keys[i].includes(ch)) { s += i; break; }
        return s;
    };
    const mp = {};
    for (const w of words) (mp[toCode(w)] = mp[toCode(w)] || []).push(w);
    return mp[num] || [];
};
```

```typescript [TypeScript]
function getValidT9Words(num: string, words: string[]): string[] {
    const keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const toCode = (w: string): string => {
        let s = "";
        for (const ch of w)
            for (let i = 2; i <= 9; i++)
                if (keys[i].includes(ch)) { s += i; break; }
        return s;
    };
    const mp: Record<string, string[]> = {};
    for (const w of words) (mp[toCode(w)] = mp[toCode(w)] || []).push(w);
    return mp[num] || [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：预处理 `O(Σlen)`；查询 `O(|num| + 结果数)`。
- **空间复杂度**：`O(Σlen)`。

---

### 2.2 方法二：哈希表直接映射

**1. 思路**

无需 Trie，直接把每个单词转为数字序列作为 key 存入哈希表，查询即取对应列表。实现最简单，适合单次或少量查询。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def getValidT9Words(self, num: str, words: List[str]) -> List[str]:
        keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        mp = {}
        for w in words:
            code = ''.join(str(i) for ch in w for i in range(2, 10) if ch in keys[i])
            mp.setdefault(code, []).append(w)
        return mp.get(num, [])
```

```cpp [C++]
class Solution {
    string keys[10] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
public:
    vector<string> getValidT9Words(string num, vector<string>& words) {
        unordered_map<string, vector<string>> mp;
        for (auto& w : words) {
            string s;
            for (char ch : w)
                for (int i = 2; i <= 9; i++)
                    if (keys[i].find(ch) != string::npos) { s += char('0'+i); break; }
            mp[s].push_back(w);
        }
        return mp.count(num) ? mp[num] : vector<string>{};
    }
};
```

```javascript [JavaScript]
var getValidT9Words = function(num, words) {
    const keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const mp = {};
    for (const w of words) {
        let code = "";
        for (const ch of w) for (let i = 2; i <= 9; i++) if (keys[i].includes(ch)) { code += i; break; }
        (mp[code] = mp[code] || []).push(w);
    }
    return mp[num] || [];
};
```

```typescript [TypeScript]
function getValidT9Words(num: string, words: string[]): string[] {
    const keys = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const mp: Record<string, string[]> = {};
    for (const w of words) {
        let code = "";
        for (const ch of w) for (let i = 2; i <= 9; i++) if (keys[i].includes(ch)) { code += i; break; }
        (mp[code] = mp[code] || []).push(w);
    }
    return mp[num] || [];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(Σlen)` 预处理，查询 `O(1)`（取列表）。
- **空间复杂度**：`O(Σlen)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                       |
| ------------ | ---------- | ---------- | -------------------------- |
| Trie 存储    | `O(Σlen)`  | `O(Σlen)`  | 适合多次查询               |
| 哈希表映射   | `O(Σlen)`  | `O(Σlen)`  | 实现简单，推荐             |

**推荐**：用哈希表将单词按数字序列分组，查询直接取对应列表。
