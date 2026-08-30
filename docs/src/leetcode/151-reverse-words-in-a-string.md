# [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)



## 一、题目描述

给你一个字符串 `s` ，请你反转字符串中 **单词** 的顺序。

单词 是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的 **单词** 分隔开。

返回 **单词** 顺序颠倒且 **单词** 之间用单个空格连接的结果字符串。

**注意：** 输入字符串 `s` 中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。



**示例 1：**

```
输入：s = "the sky is blue"
输出："blue is sky the"
```

**示例 2：**

```
输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能包含前导空格和尾随空格。
```

**示例 3：**

```
输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
```

**提示：**

-   `1 <= s.length <= 10⁴`
-   `s` 包含英文大小写字母、数字和空格 `' '`
-   `s` 中 **至少存在一个** 单词



**进阶：** 如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 `O(1)` 额外空间复杂度的 **原地** 解法。



## 二、解答方法

### 2.1 方法一：语言内置函数 / 双指针分割

1. **思路**

先去掉多余空格，将单词逐个提取到列表中，再逆序拼接。若语言支持（如 Python、JS）可直接 `split` + `reverse` + `join`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i != 0) sb.append(" ");
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))
```

```go [Go]
func reverseWords(s string) string {
    words := strings.Fields(s)
    for i, j := 0, len(words)-1; i < j; i, j = i+1, j-1 {
        words[i], words[j] = words[j], words[i]
    }
    return strings.Join(words, " ")
}
```

```cpp [C++]
class Solution {
public:
    string reverseWords(string s) {
        vector<string> words;
        istringstream iss(s);
        string word;
        while (iss >> word) words.push_back(word);
        reverse(words.begin(), words.end());
        string res;
        for (int i = 0; i < words.size(); i++) {
            if (i != 0) res += " ";
            res += words[i];
        }
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s: string): string {
    return s.trim().split(/\s+/).reverse().join(' ');
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：原地双指针（C++ 示例）

1. **思路**

整体反转字符串，再逐单词反转并去掉多余空格（进阶原地解法，需字符串可变）。

2. **代码实现（C++）**

```cpp
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int n = s.size();
        int idx = 0;
        for (int start = 0; start < n; start++) {
            if (s[start] != ' ') {
                if (idx != 0) s[idx++] = ' ';
                int end = start;
                while (end < n && s[end] != ' ') s[idx++] = s[end++];
                reverse(s.begin() + idx - (end - start), s.begin() + idx);
                start = end;
            }
        }
        s.erase(s.begin() + idx, s.end());
        return s;
    }
};
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（原地）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 分割 + 反转 | `O(n)` | `O(n)` | 实现简单，推荐 |
| 原地双指针 | `O(n)` | `O(1)` | 满足进阶，需可变字符串 |

核心要点：先去多余空格，再反转单词顺序。注意 `split` 在不同语言里对连续空格的处理方式不同（Java 需用 `\\s+`）。
