# [345. 反转字符串中的元音字母](https://leetcode.cn/problems/reverse-vowels-of-a-string/)

## 一、题目描述

给定一个字符串 `s`，反转其中所有的 **元音字母**（a, e, i, o, u，大小写都算），非元音位置保持不变。返回结果字符串。

**示例：**
```
输入：s = "hello"   输出："holle"（e 与 o 交换）
输入：s = "leetcode" 输出："leotcede"
```

**提示：** `1 <= s.length <= 3×10⁵`，`s` 由可打印 ASCII 字符组成。

## 二、解答方法

### 方法一：双指针（只交换元音）

**思路：** 左右双指针，跳过非元音，遇到左右都是元音则交换并向中间移动。用 `Set` 判断元音。因字符串不可变，转为字符数组操作。

:::::: code-group

```java [Java]
class Solution {
    Set<Character> vowels = Set.of('a','e','i','o','u','A','E','I','O','U');
    public String reverseVowels(String s) {
        char[] a = s.toCharArray();
        int l = 0, r = a.length - 1;
        while (l < r) {
            while (l < r && !vowels.contains(a[l])) l++;
            while (l < r && !vowels.contains(a[r])) r--;
            if (l < r) { char t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
        }
        return new String(a);
    }
}
```

```python [Python]
class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = set("aeiouAEIOU")
        a = list(s); l, r = 0, len(s)-1
        while l < r:
            while l < r and a[l] not in vowels: l += 1
            while l < r and a[r] not in vowels: r -= 1
            if l < r: a[l], a[r] = a[r], a[l]; l += 1; r -= 1
        return "".join(a)
```

```cpp [C++]
class Solution {
    bool isV(char c){ c=tolower(c); return c=='a'||c=='e'||c=='i'||c=='o'||c=='u'; }
public:
    string reverseVowels(string s) {
        int l=0, r=s.size()-1;
        while(l<r){
            while(l<r && !isV(s[l])) l++;
            while(l<r && !isV(s[r])) r--;
            if(l<r) swap(s[l++], s[r--]);
        }
        return s;
    }
};
```

```go [Go]
func reverseVowels(s string) string {
    vowels := map[byte]bool{'a':true,'e':true,'i':true,'o':true,'u':true,'A':true,'E':true,'I':true,'O':true,'U':true}
    a := []byte(s); l, r := 0, len(s)-1
    for l < r {
        for l < r && !vowels[a[l]] { l++ }
        for l < r && !vowels[a[r]] { r-- }
        if l < r { a[l], a[r] = a[r], a[l]; l++; r-- }
    }
    return string(a)
}
```

```js [JavaScript]
var reverseVowels = function (s) {
    const vowels = new Set("aeiouAEIOU");
    const a = s.split(''); let l=0, r=a.length-1;
    while (l < r) {
        while (l < r && !vowels.has(a[l])) l++;
        while (l < r && !vowels.has(a[r])) r--;
        if (l < r) { [a[l], a[r]] = [a[r], a[l]]; l++; r--; }
    }
    return a.join('');
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`（字符数组，或 `O(1)` 视语言）。

## 三、总结

`344 反转字符串` 的变体：只在元音上做双指针交换。注意大小写都算元音。非元音跳过即可。同类还有 `541 反转字符串 II`、`917 仅仅反转字母`（只反转字母，保留非字母位置）。
