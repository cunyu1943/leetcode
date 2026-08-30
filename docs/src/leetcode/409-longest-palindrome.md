# [409. 最长回文串](https://leetcode.cn/problems/longest-palindrome/)

## 一、题目描述

给定一个包含大写字母和小写字母的字符串 `s`，返回通过这些字母能构造的**最长回文串**的长度。字母区分大小写（如 `"Aa"` 视为两个不同字符）。

**示例 1：**

```
输入：s = "abccccdd"
输出：7
解释：可构造 "dccaccd"（或 "dcccacc" 等），长度 7。
```

**示例 2：**

```
输入：s = "a"
输出：1
```

**提示：**

- `1 <= s.length <= 2000`
- `s` 仅由大小写英文字母组成

## 二、解答方法

### 2.1 方法一：统计频次

1. 思路

回文串中，除中心的那个字符外，其余字符都必须成对出现。统计每个字符出现次数：每对贡献 2 个长度；最多留一个落单字符作中心（长度 +1）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int longestPalindrome(String s) {
        int[] cnt = new int[128];
        for (char c : s.toCharArray()) cnt[c]++;
        int ans = 0, odd = 0;
        for (int v : cnt) {
            ans += v / 2 * 2;
            if (v % 2 == 1) odd = 1;
        }
        return ans + odd;
    }
}
```

```python [Python]
class Solution:
    def longestPalindrome(self, s: str) -> int:
        from collections import Counter
        ans, odd = 0, False
        for v in Counter(s).values():
            ans += v // 2 * 2
            if v % 2 == 1:
                odd = True
        return ans + (1 if odd else 0)
```

```cpp [C++]
class Solution {
public:
    int longestPalindrome(string s) {
        int cnt[128] = {0};
        for (char c : s) cnt[c]++;
        int ans = 0, odd = 0;
        for (int v : cnt) {
            ans += v / 2 * 2;
            if (v % 2) odd = 1;
        }
        return ans + odd;
    }
};
```

```go [Go]
func longestPalindrome(s string) int {
	cnt := [128]int{}
	for _, c := range s {
		cnt[c]++
	}
	ans, odd := 0, 0
	for _, v := range cnt {
		ans += v / 2 * 2
		if v%2 == 1 {
			odd = 1
		}
	}
	return ans + odd
}
```

```javascript [JavaScript]
var longestPalindrome = function (s) {
    const cnt = {};
    for (const c of s) cnt[c] = (cnt[c] || 0) + 1;
    let ans = 0, odd = 0;
    for (const v of Object.values(cnt)) {
        ans += Math.floor(v / 2) * 2;
        if (v % 2) odd = 1;
    }
    return ans + odd;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s|)$。
- 空间复杂度：$O(1)$，固定大小计数数组。

## 三、总结

回文构造的通用结论：成对使用，至多一个单字符居中。相关题目：5 最长回文子串、647 回文子串、234 回文链表。
