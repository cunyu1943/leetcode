# [387. 字符串中的第一个唯一字符](https://leetcode.cn/problems/first-unique-character-in-a-string/)

## 一、题目描述

给定一个字符串 `s`，找到它的 **第一个不重复的字符** 并返回其下标；若全重复返回 -1。

**示例：**
```
输入：s = "leetcode"   输出：0（'l' 第一个不重复）
输入：s = "loveleetcode" 输出：2（'v'）
```

**提示：** `1 <= s.length <= 10⁵`，`s` 仅小写字母。

## 二、解答方法

### 方法一：两次遍历 + 计数数组

**思路：** 第一遍统计每个字符频次（长度 26 数组）；第二遍从左到右找第一个频次 == 1 的字符返回下标。

:::::: code-group

```java [Java]
class Solution {
    public int firstUniqChar(String s) {
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c - 'a']++;
        for (int i = 0; i < s.length(); i++)
            if (cnt[s.charAt(i) - 'a'] == 1) return i;
        return -1;
    }
}
```

```python [Python]
class Solution:
    def firstUniqChar(self, s: str) -> int:
        from collections import Counter
        c = Counter(s)
        for i, ch in enumerate(s):
            if c[ch] == 1: return i
        return -1
```

```cpp [C++]
class Solution {
public:
    int firstUniqChar(string s) {
        int cnt[26]={0};
        for(char c:s) cnt[c-'a']++;
        for(int i=0;i<s.size();i++) if(cnt[s[i]-'a']==1) return i;
        return -1;
    }
};
```

```go [Go]
func firstUniqChar(s string) int {
    cnt := [26]int{}
    for _, c := range s { cnt[c-'a']++ }
    for i, c := range s { if cnt[c-'a'] == 1 { return i } }
    return -1
}
```

```js [JavaScript]
var firstUniqChar = function (s) {
    const cnt = new Array(26).fill(0);
    for (const c of s) cnt[c.charCodeAt(0)-97]++;
    for (let i=0;i<s.length;i++) if (cnt[s.charCodeAt(i)-97] === 1) return i;
    return -1;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(26)`。

## 三、总结

字符频次 + 保序：计数数组/哈希计数后，再按原顺序找第一个频次为 1 的。用「有序字典」（`LinkedHashMap`/`OrderedDict`）可一次遍历统计并保留首现位置，更省一次扫描。同类：`389 找不同`（异或）、`451 根据字符出现频率排序`。
