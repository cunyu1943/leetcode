# [186. 反转字符串中的单词 II](https://leetcode.cn/problems/reverse-words-in-a-string-ii/) [🔒 会员题]



## 一、题目描述

给定一个字符串 `s` ，你需要反转字符串中单词的顺序，同时反转单词中字符的顺序。然而，字符串 `s` 是从 **字符数组** `s` 给出的（char 数组），请在 **原地** 修改输入数组 `s` ，使 `s` 成为反转后的字符串。（换句话说，修改输入数组 `s` 以使其变成反转后的字符串。）

你必须 **原地** 修改输入数组，使用 `O(1)` 的额外空间解决此问题。

**示例 1：**

```
输入：s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
输出：["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
```

**示例 2：**

```
输入：s = ["a"]
输出：["a"]
```

**提示：**

-   `1 <= s.length <= 10⁵`
-   `s[i]` 为小写英文字母或 `' '`
-   `s` 首尾不会有空格
-   `s` 中至少存在一个单词

**进阶：** 你能设计一个 `O(1)` 额外空间的原地解法吗？



## 二、解答方法

### 2.1 方法一：整体反转 + 单词内部反转（原地，O(1) 空间）

1. **思路**

这是「反转单词顺序但不反转字符」(151) 的变体，且要求 **同时反转单词内字符** 并 **原地 O(1)** 空间。技巧：

- 先 **整体反转** 整个数组（单词顺序反转，但每个单词内字符也反了）。
- 再 **逐个反转每个单词**，把单词内字符恢复为正序。

两步之后即得到「单词顺序反转 + 单词内正序」，恰好符合题意。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void reverseWords(char[] s) {
        reverse(s, 0, s.length - 1);   // 整体反转
        int start = 0;
        for (int i = 0; i <= s.length; i++) {
            if (i == s.length || s[i] == ' ') {
                reverse(s, start, i - 1); // 反转单个单词
                start = i + 1;
            }
        }
    }

    private void reverse(char[] s, int l, int r) {
        while (l < r) {
            char tmp = s[l]; s[l] = s[r]; s[r] = tmp;
            l++; r--;
        }
    }
}
```

```python [Python]
class Solution:
    def reverseWords(self, s: List[str]) -> None:
        def reverse(arr, l, r):
            while l < r:
                arr[l], arr[r] = arr[r], arr[l]
                l += 1
                r -= 1
        reverse(s, 0, len(s) - 1)
        start = 0
        for i in range(len(s) + 1):
            if i == len(s) or s[i] == ' ':
                reverse(s, start, i - 1)
                start = i + 1
```

```go [Go]
func reverseWords(s []byte) {
    reverse(s, 0, len(s)-1)
    start := 0
    for i := 0; i <= len(s); i++ {
        if i == len(s) || s[i] == ' ' {
            reverse(s, start, i-1)
            start = i + 1
        }
    }
}

func reverse(s []byte, l, r int) {
    for l < r {
        s[l], s[r] = s[r], s[l]
        l++
        r--
    }
}
```

```cpp [C++]
class Solution {
public:
    void reverseWords(vector<char>& s) {
        reverse(s.begin(), s.end());
        int start = 0;
        for (int i = 0; i <= s.size(); i++) {
            if (i == s.size() || s[i] == ' ') {
                reverse(s.begin() + start, s.begin() + i);
                start = i + 1;
            }
        }
    }
};
```

```js [JavaScript]
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseWords = function (s) {
    const reverse = (l, r) => {
        while (l < r) {
            [s[l], s[r]] = [s[r], s[l]];
            l++;
            r--;
        }
    };
    reverse(0, s.length - 1);
    let start = 0;
    for (let i = 0; i <= s.length; i++) {
        if (i === s.length || s[i] === ' ') {
            reverse(start, i - 1);
            start = i + 1;
        }
    }
};
```

```ts [TypeScript]
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseWords(s: string[]): void {
    const reverse = (l: number, r: number) => {
        while (l < r) {
            [s[l], s[r]] = [s[r], s[l]];
            l++;
            r--;
        }
    };
    reverse(0, s.length - 1);
    let start = 0;
    for (let i = 0; i <= s.length; i++) {
        if (i === s.length || s[i] === ' ') {
            reverse(start, i - 1);
            start = i + 1;
        }
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（原地反转）。

## 三、总结

与 151 题（返回字符串、可额外空间）不同，本题要求 **原地 O(1)** 且 **单词内字符也反转**。经典技巧：**先整体反转，再逐词反转**，两步抵消即得到正确结果。注意题干「同时反转单词中字符顺序」——整体反转已让字符反了，再逐词反转把字符转正。
