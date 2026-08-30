# [383. 赎金信](https://leetcode.cn/problems/ransom-note/)

## 一、题目描述

给定两个字符串 `ransomNote` 和 `magazine`，判断 `ransomNote` 能否用 `magazine` 里的字符构造出来（每个字符只能用一次）。

**示例：**
```
输入：ransomNote = "a", magazine = "b"   输出：false
输入：ransomNote = "aa", magazine = "aab" 输出：true
```

**提示：** `1 <= ransomNote.length, magazine.length <= 10⁵`，均仅小写字母。

## 二、解答方法

### 方法一：计数数组

**思路：** 统计 `magazine` 各字符频次，遍历 `ransomNote` 每取一个字符频次 -1，若某字符频次 < 0 即不够用返回 false。全是小写字母用长度 26 数组即可。

:::::: code-group

```java [Java]
class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] cnt = new int[26];
        for (char c : magazine.toCharArray()) cnt[c - 'a']++;
        for (char c : ransomNote.toCharArray()) {
            if (--cnt[c - 'a'] < 0) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        from collections import Counter
        c = Counter(magazine)
        for ch in ransomNote:
            if c[ch] <= 0: return False
            c[ch] -= 1
        return True
```

```cpp [C++]
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        int cnt[26]={0};
        for(char c:magazine) cnt[c-'a']++;
        for(char c:ransomNote) if(--cnt[c-'a']<0) return false;
        return true;
    }
};
```

```go [Go]
func canConstruct(ransomNote, magazine string) bool {
    cnt := [26]int{}
    for _, c := range magazine { cnt[c-'a']++ }
    for _, c := range ransomNote { cnt[c-'a']--; if cnt[c-'a'] < 0 { return false } }
    return true
}
```

```js [JavaScript]
var canConstruct = function (ransomNote, magazine) {
    const cnt = new Array(26).fill(0);
    for (const c of magazine) cnt[c.charCodeAt(0)-97]++;
    for (const c of ransomNote) { cnt[c.charCodeAt(0)-97]--; if (cnt[c.charCodeAt(0)-97] < 0) return false; }
    return true;
};
```

::::::

**复杂度：** 时间 `O(m+n)`，空间 `O(26)`。

## 三、总结

字符计数基础题（同 `242 有效的字母异位词`，但这里是「子集」关系）。注意是 `ransomNote` 需被 `magazine` 包含，而非相等。`ransomNote` 比 `magazine` 长直接 false（可提前判）。同类：`387 字符串中的第一个唯一字符`（也用 26 计数）。
