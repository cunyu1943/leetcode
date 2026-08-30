# [340. 至多包含 K 个不同字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-most-k-distinct-characters/) [🔒 会员题]

## 一、题目描述

给定一个字符串 `s` 和整数 `k`，返回 **至多包含 k 种不同字符** 的最长连续子串的长度。

**示例：**
```
输入：s = "eceba", k = 2   输出：3（"ece" 含 e,c 两种，长度 3）
输入：s = "aa", k = 1       输出：2（"aa"）
```

**提示：** `1 <= s.length <= 5×10⁴`，`s` 由英文字母/数字组成，`0 <= k <= 50`。

## 二、解答方法

### 方法一：滑动窗口（双指针）

**思路：** 维护窗口 `[l, r]`，用哈希/数组记录字符频率。右指针 `r` 扩张，若窗口内不同字符数 > k，则左指针 `l` 收缩（移除 `s[l]`，频率为 0 时删除键）直到 ≤ k。期间更新最大窗口长度。

:::::: code-group

```java [Java]
class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        int[] cnt = new int[128];
        int l = 0, distinct = 0, ans = 0;
        for (int r = 0; r < s.length(); r++) {
            if (cnt[s.charAt(r)]++ == 0) distinct++;
            while (distinct > k) {
                if (--cnt[s.charAt(l)] == 0) distinct--;
                l++;
            }
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        from collections import defaultdict
        cnt = defaultdict(int)
        l = 0; distinct = 0; ans = 0
        for r, c in enumerate(s):
            if cnt[c] == 0: distinct += 1
            cnt[c] += 1
            while distinct > k:
                cnt[s[l]] -= 1
                if cnt[s[l]] == 0: distinct -= 1
                l += 1
            ans = max(ans, r - l + 1)
        return ans
```

```cpp [C++]
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        int cnt[128]={0}, l=0, distinct=0, ans=0;
        for(int r=0;r<s.size();r++){
            if(cnt[s[r]]++==0) distinct++;
            while(distinct>k){ if(--cnt[s[l]]==0) distinct--; l++; }
            ans=max(ans, r-l+1);
        }
        return ans;
    }
};
```

```go [Go]
func lengthOfLongestSubstringKDistinct(s string, k int) int {
    cnt := [128]int{}
    l, distinct, ans := 0, 0, 0
    for r := 0; r < len(s); r++ {
        if cnt[s[r]] == 0 { distinct++ }
        cnt[s[r]]++
        for distinct > k {
            cnt[s[l]]--
            if cnt[s[l]] == 0 { distinct-- }
            l++
        }
        if r-l+1 > ans { ans = r-l+1 }
    }
    return ans
}
```

```js [JavaScript]
var lengthOfLongestSubstringKDistinct = function (s, k) {
    const cnt = new Array(128).fill(0);
    let l = 0, distinct = 0, ans = 0;
    for (let r=0;r<s.length;r++){
        if (cnt[s.charCodeAt(r)]++ === 0) distinct++;
        while (distinct > k) { if (--cnt[s.charCodeAt(l)] === 0) distinct--; l++; }
        ans = Math.max(ans, r-l+1);
    }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(k)`（字符集大小）。

## 三、总结

滑动窗口求「至多 k 种字符最长子串」。与 `159 至多包含两个不同字符` 同类（k=2）。收缩条件「不同字符 > k」。对比 `3 无重复字符最长子串`（要求恰好 0 重复，即 distinct 全不同）。模板：右扩 + 条件破坏时左缩 + 更新答案。
