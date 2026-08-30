# [500. 键盘行](https://leetcode.cn/problems/keyboard-row/)

## 一、题目描述

给定字符串数组 `words`，返回其中所有「能用键盘上**同一行**字母打完」的单词（大小写不敏感）。键盘三行：`qwertyuiop` / `asdfghjkl` / `zxcvbnm`。

**示例 1：**

```
输入：words = ["Hello","Alaska","Dad","Peace"]
输出：["Alaska","Dad"]
解释：Alaska 全在二行，Dad 全在二行。
```

**示例 2：**

```
输入：words = ["omk"]
输出：[]
```

**提示：**

- `1 <= words.length <= 20`
- `1 <= words[i].length <= 100`
- `words[i]` 由英文字母组成

## 二、解答方法

### 2.1 方法一：行集合判定

1. 思路

把三行字母各放一个集合（或哈希记录每个字母所属行号）。对每个单词，检查所有字母是否都属于同一行。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String[] findWords(String[] words) {
        String[] rows = {"qwertyuiop", "asdfghjkl", "zxcvbnm"};
        int[] rowOf = new int[26];
        for (int r = 0; r < 3; r++)
            for (char c : rows[r].toCharArray()) rowOf[c - 'a'] = r;
        List<String> res = new ArrayList<>();
        for (String w : words) {
            if (w.isEmpty()) continue;
            int r0 = rowOf[Character.toLowerCase(w.charAt(0)) - 'a'];
            boolean ok = true;
            for (char c : w.toLowerCase().toCharArray())
                if (rowOf[c - 'a'] != r0) { ok = false; break; }
            if (ok) res.add(w);
        }
        return res.toArray(new String[0]);
    }
}
```

```python [Python]
class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        rows = [set("qwertyuiop"), set("asdfghjkl"), set("zxcvbnm")]
        res = []
        for w in words:
            low = set(w.lower())
            if any(low <= row for row in rows):
                res.append(w)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> findWords(vector<string>& words) {
        string rows[3] = {"qwertyuiop", "asdfghjkl", "zxcvbnm"};
        int rowOf[26] = {0};
        for (int r = 0; r < 3; r++)
            for (char c : rows[r]) rowOf[c - 'a'] = r;
        vector<string> res;
        for (auto& w : words) {
            if (w.empty()) continue;
            int r0 = rowOf[tolower(w[0]) - 'a'];
            bool ok = true;
            for (char c : w) if (rowOf[tolower(c) - 'a'] != r0) { ok = false; break; }
            if (ok) res.push_back(w);
        }
        return res;
    }
};
```

```go [Go]
func findWords(words []string) []string {
	rows := []string{"qwertyuiop", "asdfghjkl", "zxcvbnm"}
	rowOf := [26]int{}
	for r, row := range rows {
		for _, c := range row {
			rowOf[c-'a'] = r
		}
	}
	res := []string{}
	for _, w := range words {
		if len(w) == 0 {
			continue
		}
		base := rowOf[tolower(w[0])-'a']
		ok := true
		for _, c := range w {
			if rowOf[tolower(c)-'a'] != base {
				ok = false
				break
			}
		}
		if ok {
			res = append(res, w)
		}
	}
	return res
}
func tolower(c byte) byte { if c >= 'A' && c <= 'Z' { return c + 32 }; return c }
```

```javascript [JavaScript]
var findWords = function (words) {
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    const rowOf = {};
    rows.forEach((row, r) => { for (const c of row) rowOf[c] = r; });
    return words.filter(w => {
        if (!w) return false;
        const base = rowOf[w[0].toLowerCase()];
        return [...w.toLowerCase()].every(c => rowOf[c] === base);
    });
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\sum |w|)$。
- 空间复杂度：$O(26)$。

## 三、总结

「字母所属集合/行」判定是字符串分类的入门题。相关题目：219 存在重复元素 II、500 本身、键盘相关题。
