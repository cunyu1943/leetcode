# [459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)

## 一、题目描述

给定一个非空的字符串 `s`，检查它是否可由它的一个子串**重复多次**构成。

**示例 1：**

```
输入：s = "abab"
输出：true
解释：可由子串 "ab" 重复两次构成。
```

**示例 2：**

```
输入：s = "aba"
输出：false
```

**示例 3：**

```
输入：s = "abcabcabcabc"
输出：true
```

**提示：**

- `1 <= s.length <= 10^4`
- `s` 由小写英文字母组成

## 二、解答方法

### 2.1 方法一：KMP / 周期性质

1. 思路

若 `s` 由长度为 `L` 的子串重复构成，则 `s` 的长度 `n` 必能被 `L` 整除，且 `s[i] == s[i-L]`。用 KMP 的 `next` 数组：若 `n % (n - next[n-1]) == 0` 且 `next[n-1] != 0`，则存在周期子串。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean repeatedSubstringPattern(String s) {
        int n = s.length();
        int[] next = new int[n];
        for (int i = 1, j = 0; i < n; i++) {
            while (j > 0 && s.charAt(i) != s.charAt(j)) j = next[j - 1];
            if (s.charAt(i) == s.charAt(j)) j++;
            next[i] = j;
        }
        int p = next[n - 1];
        return p > 0 && n % (n - p) == 0;
    }
}
```

```python [Python]
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        n = len(s)
        # 方法二：拼接法
        return s in (s + s)[1:-1]
```

```cpp [C++]
class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        int n = s.size();
        int j = 0;
        vector<int> next(n, 0);
        for (int i = 1; i < n; i++) {
            while (j > 0 && s[i] != s[j]) j = next[j - 1];
            if (s[i] == s[j]) j++;
            next[i] = j;
        }
        int p = next[n - 1];
        return p > 0 && n % (n - p) == 0;
    }
};
```

```go [Go]
func repeatedSubstringPattern(s string) bool {
	n := len(s)
	// 拼接法：s 是某子串重复 => s 必定是 (s+s)[1:-1] 的子串
	if n == 0 {
		return false
	}
	doubled := s + s
	return strings.Contains(doubled[1:n*2-1], s)
}
```

```javascript [JavaScript]
var repeatedSubstringPattern = function (s) {
    // 拼接法
    return s.length > 0 && (s + s).slice(1, -1).includes(s);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$（KMP 或拼接 `indexOf`）。
- 空间复杂度：$O(n)$。

## 三、总结

「`s+s` 去掉首尾后包含 `s`」是巧妙且正确的判定（避免 KMP）。相关题目：28 找出字符串中第一个匹配项、214 最短回文串（KMP 应用）、686 重复叠加字符串匹配。
