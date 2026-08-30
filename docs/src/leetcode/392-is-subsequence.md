# [392. 判断子序列](https://leetcode.cn/problems/is-subsequence/)

## 一、题目描述

给定字符串 `s` 和 `t`，判断 `s` 是否为 `t` 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，`"ace"` 是 `"abcde"` 的一个子序列，而 `"aec"` 不是）。

**进阶：** 如果有大量输入的 `s`，称作 `S = [s_1, s_2, ... s_k]`，需要依次检查它们是否为 `t` 的子序列。你可以设计一个算法更高效地处理这种情况吗？

**示例 1：**

```
输入：s = "abc", t = "ahbgdc"
输出：true
```

**示例 2：**

```
输入：s = "axc", t = "ahbgdc"
输出：false
```

**提示：**

- `0 <= s.length <= 100`
- `1 <= t.length <= 10^4`
- 两个字符串都只由小写字符组成。

## 二、解答方法

### 2.1 方法一：双指针

1. 思路

用两个指针分别遍历 `s` 和 `t`，当字符匹配时 `s` 指针前进，否则只前进 `t` 指针。最终 `s` 指针走完说明是子序列。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) i++;
            j++;
        }
        return i == s.length();
    }
}
```

```python [Python]
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)
```

```cpp [C++]
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < s.size() && j < t.size()) {
            if (s[i] == t[j]) i++;
            j++;
        }
        return i == s.size();
    }
};
```

```go [Go]
func isSubsequence(s string, t string) bool {
	i, j := 0, 0
	for i < len(s) && j < len(t) {
		if s[i] == t[j] {
			i++
		}
		j++
	}
	return i == len(s)
}
```

```javascript [JavaScript]
var isSubsequence = function (s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++;
        j++;
    }
    return i === s.length;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|t|)$。
- 空间复杂度：$O(1)$。

### 2.2 方法二：预处理索引（应对大量 s 的进阶场景）

1. 思路

预先把 `t` 中每个字符出现的位置存成有序列表，对于每个 `s` 中的字符用二分查找下一个出现位置，整体复杂度可降为 $O(|S| \cdot \log|t|)$。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean isSubsequence(String s, String t) {
        List<Integer>[] pos = new List[26];
        for (int i = 0; i < 26; i++) pos[i] = new ArrayList<>();
        for (int i = 0; i < t.length(); i++) pos[t.charAt(i) - 'a'].add(i);
        int prev = -1;
        for (char c : s.toCharArray()) {
            int idx = Collections.binarySearch(pos[c - 'a'], prev + 1);
            if (idx < 0) idx = -idx - 1;
            if (idx == pos[c - 'a'].size()) return false;
            prev = pos[c - 'a'].get(idx);
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        import bisect
        pos = [[] for _ in range(26)]
        for i, ch in enumerate(t):
            pos[ord(ch) - 97].append(i)
        prev = -1
        for ch in s:
            lst = pos[ord(ch) - 97]
            idx = bisect.bisect_left(lst, prev + 1)
            if idx == len(lst):
                return False
            prev = lst[idx]
        return True
```

```cpp [C++]
class Solution {
public:
    bool isSubsequence(string s, string t) {
        vector<vector<int>> pos(26);
        for (int i = 0; i < t.size(); i++) pos[t[i] - 'a'].push_back(i);
        int prev = -1;
        for (char c : s) {
            auto& v = pos[c - 'a'];
            auto it = lower_bound(v.begin(), v.end(), prev + 1);
            if (it == v.end()) return false;
            prev = *it;
        }
        return true;
    }
};
```

```go [Go]
func isSubsequence(s string, t string) bool {
	pos := [26][]int{}
	for i, ch := range t {
		pos[ch-'a'] = append(pos[ch-'a'], i)
	}
	prev := -1
	for _, ch := range s {
		v := pos[ch-'a']
		lo, hi := 0, len(v)
		for lo < hi {
			mid := (lo + hi) / 2
			if v[mid] >= prev+1 {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		if lo == len(v) {
			return false
		}
		prev = v[lo]
	}
	return true
}
```

```javascript [JavaScript]
var isSubsequence = function (s, t) {
    const pos = Array.from({ length: 26 }, () => []);
    for (let i = 0; i < t.length; i++) pos[t.charCodeAt(i) - 97].push(i);
    let prev = -1;
    for (const ch of s) {
        const v = pos[ch.charCodeAt(0) - 97];
        let lo = 0, hi = v.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (v[mid] >= prev + 1) hi = mid; else lo = mid + 1;
        }
        if (lo === v.length) return false;
        prev = v[lo];
    }
    return true;
};
```

::::::

3. 复杂度分析

- 时间复杂度：预处理 $O(|t|)$，每次查询 $O(|s| \log|t|)$。
- 空间复杂度：$O(|t|)$。

## 三、总结

双指针适用于单次判断；若需对大量 `s` 复用同一个 `t`，则预处理 + 二分的方案更优。类似的双指针匹配思路也出现在 167、345 等题目中。
