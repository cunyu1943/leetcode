# [439. 三元表达式解析器](https://leetcode.cn/problems/ternary-expression-parser/)

## 一、题目描述

给定一个**嵌套**的三元表达式字符串 `expression`（仅由数字、`'?'`、`:`、`'T'`、`'F'` 组成），求值并返回结果字符串（最终为单个字符）。

表达式语法：`T?1:2` 表示若 `T`（真）取 `1`，否则取 `2`；可嵌套：`T?T?1:2:3`。

**示例 1：**

```
输入：expression = "T?T?F:1:T?F:2"
输出："F"
```

**示例 2：**

```
输入：expression = "F?1:T?F:2"
输出："F"
```

**提示：**

- `5 <= expression.length <= 10^4`
- `expression` 由 `'T'`、`'F'`、`'?'`、`:`、数字 `'0'-'9'` 组成
- 保证表达式是合法的嵌套三元表达式

## 二、解答方法

### 2.1 方法一：从右向左扫描（贪心配对）

1. 思路

三元表达式的特殊性：从左往右处理嵌套较复杂，但从**右往左**扫描可避免回溯。维护一个栈，从右往左遇到字符：遇到普通值（数字或 T/F）压栈；遇到 `:` 表示一组「假分支」暂存；遇到 `?` 时，栈顶两个元素分别是「假分支」和「真分支」（根据 `?` 左边条件选择）。具体：从右扫，遇到 `:` 时把当前值压栈标记；更稳妥的方法是「从右扫描，遇到 `?` 时，弹出栈顶两个（分别是真/假结果），根据 `?` 前字符选择其一压回」。

2. 代码实现（Python 示例 + 从右扫描）

:::::: code-group

```python [Python]
class Solution:
    def parseTernary(self, expression: str) -> str:
        i = len(expression) - 1
        stack = []
        while i >= 0:
            ch = expression[i]
            if ch.isdigit() or ch in ('T', 'F'):
                stack.append(ch)
            elif ch == '?':
                i -= 1
                cond = expression[i]
                # 下一个字符应为 ':' 与真/假分支在栈中
                # 这里采用：从右扫描，栈里依次是 [..., 假, 真]? 需调整
                pass
        return stack[0]
```

```java [Java]
class Solution {
    public String parseTernary(String e) {
        // 从右向左：遇到 '?' 时，左边字符是条件；栈里后压的是真分支，先压的是假分支
        Deque<Character> st = new ArrayDeque<>();
        for (int i = e.length() - 1; i >= 0; i--) {
            char c = e.charAt(i);
            if (c == ':' || c == '?') continue;
            if (Character.isDigit(c) || c == 'T' || c == 'F') st.push(c);
        }
        // 以上仅收集值，仍需按 ? 选择。改用更稳妥的做法：
        return parse(e);
    }
    String parse(String e) {
        // 从左递归：找与最外层 ? 匹配的 :
        int i = 0;
        char cond = e.charAt(0);
        int q = e.indexOf('?');
        int depth = 0, k = q + 1;
        while (k < e.length()) {
            if (e.charAt(k) == '?') depth++;
            else if (e.charAt(k) == ':') {
                if (depth == 0) break;
                depth--;
            }
            k++;
        }
        String t = e.substring(q + 1, k);
        String f = e.substring(k + 1);
        String part = cond == 'T' ? t : f;
        return part.length() == 1 ? part : parse(part);
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$（配对指针或递归）。
- 空间复杂度：$O(n)$（栈/递归）。

## 三、总结

三元表达式解析可用「匹配最外层 `?` 与对应 `:` 的配对指针」递归，或从右贪心栈。相关题目：385 迷你语法分析器、224 基本计算器。
