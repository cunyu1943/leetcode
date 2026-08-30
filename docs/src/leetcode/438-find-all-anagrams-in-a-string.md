# [438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

## 一、题目描述

给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的**字母异位词**的起始索引（顺序不限）。异位词指字母及频次相同、排列不同。

**示例 1：**

```
输入：s = "cbaebabacd", p = "abc"
输出：[0,6]
解释：s[0..2]="cba"、s[6..8]="bac" 都是 "abc" 的异位词。
```

**示例 2：**

```
输入：s = "abab", p = "ab"
输出：[0,1,2]
```

**提示：**

- `1 <= s.length, p.length <= 3 * 10^4`
- `s` 和 `p` 仅含小写字母

## 二、解答方法

### 2.1 方法一：滑动窗口 + 计数

1. 思路

用长度固定为 `|p|` 的窗口滑过 `s`，维护窗口内字母计数 `win`，与 `p` 的计数 `need` 比较；每次右移时加入右端、移除左端，计数一致则该窗口是异位词，记录起点。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        int[] need = new int[26], win = new int[26];
        for (char c : p.toCharArray()) need[c - 'a']++;
        int m = p.length();
        for (int r = 0; r < s.length(); r++) {
            win[s.charAt(r) - 'a']++;
            if (r >= m) win[s.charAt(r - m) - 'a']--;
            if (r >= m - 1 && Arrays.equals(win, need)) res.add(r - m + 1);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        from collections import Counter
        need = Counter(p)
        win = Counter()
        res = []
        for r, ch in enumerate(s):
            win[ch] += 1
            if r >= len(p):
                win[s[r - len(p)]] -= 1
                if win[s[r - len(p)]] == 0:
                    del win[s[r - len(p)]]
            if win == need:
                res.append(r - len(p) + 1)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> need(26, 0), win(26, 0), res;
        for (char c : p) need[c - 'a']++;
        int m = p.size();
        for (int r = 0; r < s.size(); r++) {
            win[s[r] - 'a']++;
            if (r >= m) win[s[r - m] - 'a']--;
            if (r >= m - 1 && win == need) res.push_back(r - m + 1);
        }
        return res;
    }
};
```

```go [Go]
func findAnagrams(s string, p string) []int {
	need := [26]int{}
	for _, c := range p {
		need[c-'a']++
	}
	win := [26]int{}
	res := []int{}
	m := len(p)
	for r := 0; r < len(s); r++ {
		win[s[r]-'a']++
		if r >= m {
			win[s[r-m]-'a']--
		}
		if r >= m-1 {
			match := true
			for i := 0; i < 26; i++ {
				if win[i] != need[i] {
					match = false
					break
				}
			}
			if match {
				res = append(res, r-m+1)
			}
		}
	}
	return res
}
```

```javascript [JavaScript]
var findAnagrams = function (s, p) {
    const need = new Array(26).fill(0);
    for (const c of p) need[c.charCodeAt(0) - 97]++;
    const win = new Array(26).fill(0);
    const res = [];
    const m = p.length;
    for (let r = 0; r < s.length; r++) {
        win[s.charCodeAt(r) - 97]++;
        if (r >= m) win[s.charCodeAt(r - m) - 97]--;
        if (r >= m - 1) {
            let ok = true;
            for (let i = 0; i < 26; i++) if (win[i] !== need[i]) { ok = false; break; }
            if (ok) res.push(r - m + 1);
        }
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s| + |p|)$。
- 空间复杂度：$O(1)$。

## 三、总结

定长滑动窗口 + 计数比较。相关题目：76 最小覆盖子串、567 字符串排列、242 有效的字母异位词。
