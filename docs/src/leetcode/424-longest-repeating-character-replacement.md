# [424. 替换后的最长重复字符](https://leetcode.cn/problems/longest-repeating-character-replacement/)

## 一、题目描述

给你一个仅由大写英文字母组成的字符串 `s` 和一个整数 `k`。你可以进行**最多** `k` 次替换操作（每次把一个字符换成另一个）。返回执行操作后，能得到的**只包含单一字母的最长子串**的长度。

**示例 1：**

```
输入：s = "ABAB", k = 2
输出：4
解释：把两个 'A' 换成 'B'（或反之），得到 "BBBB"，长度 4。
```

**示例 2：**

```
输入：s = "AABABBA", k = 1
输出：4
```

**提示：**

- `1 <= s.length <= 10^5`
- `s` 仅由大写字母组成
- `0 <= k <= s.length`

## 二、解答方法

### 2.1 方法一：滑动窗口

1. 思路

维护窗口 `[l, r]`，`maxFreq` 为窗口内出现最多的字符频次。若 `窗口长度 - maxFreq <= k`（即需替换的字符数不超过 k），窗口合法，可扩展；否则右移 `l`。窗口最大长度即答案。注意 `maxFreq` 不必随 `l` 移动而实时减小（不减只会使窗口更松，不影响最终最大长度）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int characterReplacement(String s, int k) {
        int[] cnt = new int[26];
        int l = 0, maxFreq = 0, ans = 0;
        for (int r = 0; r < s.length(); r++) {
            maxFreq = Math.max(maxFreq, ++cnt[s.charAt(r) - 'A']);
            while (r - l + 1 - maxFreq > k) cnt[s.charAt(l++) - 'A']--;
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        cnt = {}
        l = maxFreq = ans = 0
        for r, ch in enumerate(s):
            cnt[ch] = cnt.get(ch, 0) + 1
            maxFreq = max(maxFreq, cnt[ch])
            if r - l + 1 - maxFreq > k:
                cnt[s[l]] -= 1
                l += 1
            ans = max(ans, r - l + 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int characterReplacement(string s, int k) {
        int cnt[26] = {0};
        int l = 0, maxFreq = 0, ans = 0;
        for (int r = 0; r < s.size(); r++) {
            maxFreq = max(maxFreq, ++cnt[s[r] - 'A']);
            while (r - l + 1 - maxFreq > k) cnt[s[l++] - 'A']--;
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
```

```go [Go]
func characterReplacement(s string, k int) int {
	cnt := [26]int{}
	l, maxFreq, ans := 0, 0, 0
	for r := 0; r < len(s); r++ {
		c := int(s[r] - 'A')
		cnt[c]++
		if cnt[c] > maxFreq {
			maxFreq = cnt[c]
		}
		for r-l+1-maxFreq > k {
			cnt[int(s[l]-'A')]--
			l++
		}
		if r-l+1 > ans {
			ans = r - l + 1
		}
	}
	return ans
}
```

```javascript [JavaScript]
var characterReplacement = function (s, k) {
    const cnt = {};
    let l = 0, maxFreq = 0, ans = 0;
    for (let r = 0; r < s.length; r++) {
        const ch = s[r];
        cnt[ch] = (cnt[ch] || 0) + 1;
        maxFreq = Math.max(maxFreq, cnt[ch]);
        if (r - l + 1 - maxFreq > k) {
            cnt[s[l]]--;
            l++;
        }
        ans = Math.max(ans, r - l + 1);
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

滑动窗口 + `窗口长度 - 最高频 ≤ k` 判定是「替换后最长重复串」标准解法。相关题目：3 无重复字符的最长子串、340 至多 K 个不同字符、1004 最大连续 1 的个数 III。
