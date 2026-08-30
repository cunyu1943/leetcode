# [434. 字符串中的单词数](https://leetcode.cn/problems/number-of-segments-in-a-string/)

## 一、题目描述

统计字符串 `s` 中**单词**的数量。单词定义为**连续由非空格字符组成的子串**，用空格（`' '`）分隔，空格可连续出现。

**示例 1：**

```
输入：s = "Hello, my name is John"
输出：5
解释：单词为 "Hello,"、"my"、"name"、"is"、"John"。
```

**示例 2：**

```
输入：s = "love live! mu'sic!"
输出：4
```

**提示：**

- `0 <= s.length <= 300`
- `s` 仅由可打印 ASCII 字符组成（不含不可见控制字符）。

## 二、解答方法

### 2.1 方法一：计数空格与词边界

1. 思路

遍历字符串，若当前字符非空格且前一个字符是空格（或位于开头），说明遇到一个新单词起点，计数 +1。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int countSegments(String s) {
        int cnt = 0;
        for (int i = 0; i < s.length(); i++)
            if (s.charAt(i) != ' ' && (i == 0 || s.charAt(i - 1) == ' ')) cnt++;
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def countSegments(self, s: str) -> int:
        return sum(1 for i, ch in enumerate(s) if ch != ' ' and (i == 0 or s[i - 1] == ' '))
```

```cpp [C++]
class Solution {
public:
    int countSegments(string s) {
        int cnt = 0;
        for (int i = 0; i < s.size(); i++)
            if (s[i] != ' ' && (i == 0 || s[i - 1] == ' ')) cnt++;
        return cnt;
    }
};
```

```go [Go]
func countSegments(s string) int {
	cnt := 0
	for i := 0; i < len(s); i++ {
		if s[i] != ' ' && (i == 0 || s[i-1] == ' ') {
			cnt++
		}
	}
	return cnt
}
```

```javascript [JavaScript]
var countSegments = function (s) {
    let cnt = 0;
    for (let i = 0; i < s.length; i++)
        if (s[i] !== ' ' && (i === 0 || s[i - 1] === ' ')) cnt++;
    return cnt;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(|s|)$。
- 空间复杂度：$O(1)$。

### 2.2 方法二：按空格切分

```python
class Solution:
    def countSegments(self, s: str) -> int:
        return len(s.split())
```

## 三、总结

简单的词边界计数，注意连续空格与空串。相关题目：58 最后一个单词的长度、68 文本左右对齐。
