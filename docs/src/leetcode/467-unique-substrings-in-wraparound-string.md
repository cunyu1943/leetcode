# [467. 环绕字符串中唯一的子串](https://leetcode.cn/problems/unique-substrings-in-wraparound-string/)

## 一、题目描述

定义环绕字符串 `base = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz..."`（无限循环，相邻字母 a-b、...、z-a 连续）。给定一个字符串 `p`，求 `p` 中有多少个**不同的子串**也出现在 `base` 中（即子串自身是环绕连续字母序列）。

**示例 1：**

```
输入：p = "a"
输出：1
```

**示例 2：**

```
输入：p = "cac"
输出：2
解释：子串 "a"、"c" 是环绕连续；"ca" 不是（c->a 在 base 中是连续的！实际 c->a 在 base 里 z-a-c? base 是 ...z,a,b...，所以 c 后面是 d，a 前面是 z，因此 "ca" 不连续）。唯一子串为 "a"、"c"，共 2。
```

**示例 3：**

```
输入：p = "zab"
输出：6
解释：子串 "z","a","b","za","ab","zab"（z->a 连续、a->b 连续），共 6。
```

**提示：**

- `1 <= p.length <= 10^5`
- `p` 仅由小写英文字母组成

## 二、解答方法

### 2.1 方法一：以每个字母结尾的最长连续子串长度

1. 思路

以某字母 `c` 结尾且与 `base` 中一致的不同子串，其数量等于「以 `c` 结尾的最长连续（环绕）子串长度」（因为该连续段的所有前缀子串都以 `c` 结尾且互不相同）。逐字符扫描 `p`，维护当前连续段长度 `len`，当 `p[i]` 与 `p[i-1]` 在环绕意义上相邻（`(prev+1)%26 == cur`）时 `len++`，否则 `len = 1`。对每个字母 `c`，记录以它结尾的最大 `len`，最后求和。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findSubstringInWraproundString(String p) {
        int[] maxLen = new int[26];
        int len = 0;
        for (int i = 0; i < p.length(); i++) {
            int cur = p.charAt(i) - 'a';
            if (i > 0 && (p.charAt(i - 1) - 'a' + 1) % 26 == cur) len++;
            else len = 1;
            maxLen[cur] = Math.max(maxLen[cur], len);
        }
        int ans = 0;
        for (int v : maxLen) ans += v;
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findSubstringInWraproundString(self, p: str) -> int:
        max_len = [0] * 26
        length = 0
        for i, ch in enumerate(p):
            cur = ord(ch) - 97
            if i > 0 and (ord(p[i - 1]) - 97 + 1) % 26 == cur:
                length += 1
            else:
                length = 1
            max_len[cur] = max(max_len[cur], length)
        return sum(max_len)
```

```cpp [C++]
class Solution {
public:
    int findSubstringInWraproundString(string p) {
        int maxLen[26] = {0}, len = 0;
        for (int i = 0; i < p.size(); i++) {
            int cur = p[i] - 'a';
            if (i > 0 && (p[i - 1] - 'a' + 1) % 26 == cur) len++;
            else len = 1;
            maxLen[cur] = max(maxLen[cur], len);
        }
        int ans = 0;
        for (int v : maxLen) ans += v;
        return ans;
    }
};
```

```go [Go]
func findSubstringInWraproundString(p string) int {
	maxLen := [26]int{}
	length := 0
	for i := 0; i < len(p); i++ {
		cur := int(p[i] - 'a')
		if i > 0 && (int(p[i-1]-'a')+1)%26 == cur {
			length++
		} else {
			length = 1
		}
		if length > maxLen[cur] {
			maxLen[cur] = length
		}
	}
	ans := 0
	for _, v := range maxLen {
		ans += v
	}
	return ans
}
```

```javascript [JavaScript]
var findSubstringInWraproundString = function (p) {
    const maxLen = new Array(26).fill(0);
    let len = 0;
    for (let i = 0; i < p.length; i++) {
        const cur = p.charCodeAt(i) - 97;
        if (i > 0 && (p.charCodeAt(i - 1) - 97 + 1) % 26 === cur) len++;
        else len = 1;
        maxLen[cur] = Math.max(maxLen[cur], len);
    }
    return maxLen.reduce((a, b) => a + b, 0);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|p|)$。
- 空间复杂度：$O(1)$。

## 三、总结

「字母结尾 + 最长连续段」避免重复计数的贪心统计技巧。相关题目：5 最长回文子串、395 至少 K 重复字符的最长子串、3 无重复字符最长子串。
