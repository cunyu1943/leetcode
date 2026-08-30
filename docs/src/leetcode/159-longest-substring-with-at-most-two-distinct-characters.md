# [159. 至多包含两个不同字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-most-two-distinct-characters/) [🔒 会员题]



## 一、题目描述

给定一个字符串 `s` ，找出 **至多** 包含 **两个不同字符** 的最长子串 `t` ，返回该子串的长度。



**示例 1：**

```
输入: s = "eceba"
输出: 3
解释: t 是 "ece"，长度为 3。
```

**示例 2：**

```
输入: s = "ccaabbb"
输出: 5
解释: t 是 "aabbb"，长度为 5。
```

**提示：**

-   `1 <= s.length <= 10⁴`
-   `s` 由英文字母组成



## 二、解答方法

### 2.1 方法一：滑动窗口 + 哈希表

1. **思路**

用左右指针维护窗口，哈希表记录窗口内各字符的出现次数。右指针扩展，当窗口内不同字符数 `> 2` 时，左指针收缩直到恢复为 2。过程中记录最大窗口长度。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int n = s.length();
        if (n < 3) return n;
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 2;
        for (int right = 0; right < n; right++) {
            map.put(s.charAt(right), right);
            if (map.size() > 2) {
                int delIdx = Collections.min(map.values());
                map.remove(s.charAt(delIdx));
                left = delIdx + 1;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        from collections import defaultdict
        n = len(s)
        if n < 3:
            return n
        cnt = defaultdict(int)
        left = max_len = 0
        for right, ch in enumerate(s):
            cnt[ch] += 1
            while len(cnt) > 2:
                cnt[s[left]] -= 1
                if cnt[s[left]] == 0:
                    del cnt[s[left]]
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len
```

```go [Go]
func lengthOfLongestSubstringTwoDistinct(s string) int {
    n := len(s)
    if n < 3 {
        return n
    }
    cnt := make(map[byte]int)
    left, maxLen := 0, 2
    for right := 0; right < n; right++ {
        cnt[s[right]]++
        for len(cnt) > 2 {
            cnt[s[left]]--
            if cnt[s[left]] == 0 {
                delete(cnt, s[left])
            }
            left++
        }
        if right-left+1 > maxLen {
            maxLen = right - left + 1
        }
    }
    return maxLen
}
```

```cpp [C++]
class Solution {
public:
    int lengthOfLongestSubstringTwoDistinct(string s) {
        int n = s.size();
        if (n < 3) return n;
        unordered_map<char, int> cnt;
        int left = 0, maxLen = 2;
        for (int right = 0; right < n; right++) {
            cnt[s[right]]++;
            while (cnt.size() > 2) {
                if (--cnt[s[left]] == 0) cnt.erase(s[left]);
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
    const n = s.length;
    if (n < 3) return n;
    const cnt = new Map();
    let left = 0, maxLen = 2;
    for (let right = 0; right < n; right++) {
        cnt.set(s[right], (cnt.get(s[right]) || 0) + 1);
        while (cnt.size > 2) {
            const c = s[left];
            cnt.set(c, cnt.get(c) - 1);
            if (cnt.get(c) === 0) cnt.delete(c);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstringTwoDistinct(s: string): number {
    const n = s.length;
    if (n < 3) return n;
    const cnt = new Map<string, number>();
    let left = 0, maxLen = 2;
    for (let right = 0; right < n; right++) {
        cnt.set(s[right], (cnt.get(s[right]) || 0) + 1);
        while (cnt.size > 2) {
            const c = s[left];
            cnt.set(c, cnt.get(c)! - 1);
            if (cnt.get(c) === 0) cnt.delete(c);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（字符集有限，最多 3 个键）。

## 三、总结

这是「至多 K 个不同字符」滑动窗口的特例（K=2）。核心模板：右扩 -> 越界则左缩 -> 更新答案。159/340 题（K=3）与本题同构，仅把 `2` 换成 `k` 即可。
