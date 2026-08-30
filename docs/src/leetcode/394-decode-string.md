# [394. 字符串解码](https://leetcode.cn/problems/decode-string/)

## 一、题目描述

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为：`k[encoded_string]`，表示其中方括号内部的 `encoded_string` 正好重复 `k` 次。注意 `k` 保证为正整数。

你可以认为输入字符串总是有效的；输入中不包含额外的空格，且输入的方括号总是符合格式要求的。

**示例 1：**

```
输入：s = "3[a]2[bc]"
输出："aaabcbc"
```

**示例 2：**

```
输入：s = "3[a2[c]]"
输出："accaccacc"
```

**示例 3：**

```
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"
```

**提示：**

- `1 <= s.length <= 30`
- `s` 由小写英文字母、数字和方括号 `'[]'` 组成
- `s` 保证是一个**有效**的输入
- 嵌套深度不超过 1 层（实际题目允许更深，解法通用）

## 二、解答方法

### 2.1 方法一：栈（或递归）

1. 思路

用两个栈（或栈存 `(当前字符串, 重复次数)`）：遇到数字累积倍数，遇到 `[` 把当前结果和倍数入栈并重置，遇到 `]` 出栈拼接重复，普通字符追加到当前串。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String decodeString(String s) {
        StringBuilder res = new StringBuilder();
        Stack<String> strStack = new Stack<>();
        Stack<Integer> cntStack = new Stack<>();
        int num = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '[') {
                strStack.push(res.toString());
                cntStack.push(num);
                res = new StringBuilder();
                num = 0;
            } else if (c == ']') {
                int k = cntStack.pop();
                StringBuilder tmp = new StringBuilder(strStack.pop());
                for (int i = 0; i < k; i++) tmp.append(res);
                res = tmp;
            } else {
                res.append(c);
            }
        }
        return res.toString();
    }
}
```

```python [Python]
class Solution:
    def decodeString(self, s: str) -> str:
        res = ""
        stack = []
        num = 0
        for ch in s:
            if ch.isdigit():
                num = num * 10 + int(ch)
            elif ch == '[':
                stack.append((res, num))
                res, num = "", 0
            elif ch == ']':
                prev, k = stack.pop()
                res = prev + res * k
            else:
                res += ch
        return res
```

```cpp [C++]
class Solution {
public:
    string decodeString(string s) {
        string res = "";
        stack<pair<string, int>> st;
        int num = 0;
        for (char c : s) {
            if (isdigit(c)) num = num * 10 + (c - '0');
            else if (c == '[') {
                st.push({res, num});
                res = ""; num = 0;
            } else if (c == ']') {
                auto [prev, k] = st.top(); st.pop();
                string tmp = prev;
                for (int i = 0; i < k; i++) tmp += res;
                res = tmp;
            } else res += c;
        }
        return res;
    }
};
```

```go [Go]
func decodeString(s string) string {
	res := ""
	type pair struct{ str string; cnt int }
	stack := []pair{}
	num := 0
	for _, c := range s {
		if c >= '0' && c <= '9' {
			num = num*10 + int(c-'0')
		} else if c == '[' {
			stack = append(stack, pair{res, num})
			res, num = "", 0
		} else if c == ']' {
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			tmp := top.str
			for i := 0; i < top.cnt; i++ {
				tmp += res
			}
			res = tmp
		} else {
			res += string(c)
		}
	}
	return res
}
```

```javascript [JavaScript]
var decodeString = function (s) {
    let res = "";
    const stack = [];
    let num = 0;
    for (const ch of s) {
        if (ch >= '0' && ch <= '9') {
            num = num * 10 + Number(ch);
        } else if (ch === '[') {
            stack.push([res, num]);
            res = ""; num = 0;
        } else if (ch === ']') {
            const [prev, k] = stack.pop();
            res = prev + res.repeat(k);
        } else {
            res += ch;
        }
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(N)$，其中 $N$ 为解码后字符串总长度（每个字符被写出的次数）。
- 空间复杂度：$O(N)$，栈与结果串。

## 三、总结

括号嵌套天然适合用栈或递归处理。类似「括号 + 重复/计算」的题目还有 224、227、385 迷你语法分析器等。
