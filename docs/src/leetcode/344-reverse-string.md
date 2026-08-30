# [344. 反转字符串](https://leetcode.cn/problems/reverse-string/)

## 一、题目描述

编写一个函数，将输入的字符数组 `s` **原地** 反转（不要分配额外数组）。

**示例：**
```
输入：s = ["h","e","l","l","o"]   输出：["o","l","l","e","h"]
```

**提示：** `1 <= s.length <= 10⁵`，`s[i]` 为可打印 ASCII 字符。

## 二、解答方法

### 方法一：双指针交换

**思路：** 左指针 `l`、右指针 `r` 向中间靠拢，逐位交换 `s[l]` 与 `s[r]`。原地、不借助额外数组。

:::::: code-group

```java [Java]
class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while (l < r) { char t = s[l]; s[l++] = s[r]; s[r--] = t; }
    }
}
```

```python [Python]
class Solution:
    def reverseString(self, s: List[str]) -> None:
        s.reverse()                       # 或双指针
        # l, r = 0, len(s)-1
        # while l < r: s[l], s[r] = s[r], s[l]; l += 1; r -= 1
```

```cpp [C++]
class Solution {
public:
    void reverseString(vector<char>& s) {
        int l=0, r=s.size()-1;
        while(l<r){ swap(s[l++], s[r--]); }
    }
};
```

```go [Go]
func reverseString(s []byte) {
    for l, r := 0, len(s)-1; l < r; l, r = l+1, r-1 { s[l], s[r] = s[r], s[l] }
}
```

```js [JavaScript]
var reverseString = function (s) {
    let l = 0, r = s.length - 1;
    while (l < r) { [s[l], s[r]] = [s[r], s[l]]; l++; r--; }
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

最基础双指针题。注意题目「原地」要求——只能交换、不能新建数组。进阶：`541 反转字符串 II`（每 2k 个反转前 k 个）、`557 反转字符串中的单词 III`（按单词反转）。本题是字符串操作基石。
