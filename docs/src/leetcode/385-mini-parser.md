# [385. 迷你语法分析器](https://leetcode.cn/problems/mini-parser/)

## 一、题目描述

给定一个字符串 `s` 表示一个嵌套整型列表（格式如 `[123,[456,[789]]]`），实现一个解析器把它构造成 `NestedInteger` 对象（元素或为整数，或为列表）。`s` 保证语法正确。

**示例：**
```
输入：s = "324"             输出：324（单个整数）
输入：s = "[123,[456,[789]]]"  输出：嵌套结构
```

**提示：** `1 <= s.length <= 4×10⁴`，`s` 由数字、`-`、`,`、`[`、`]` 组成。

## 二、解答方法

### 方法一：栈（遇 `[` 压新列表，遇 `]` 弹出合并）

**思路：** 用栈存「正在构建的列表」。遍历字符：遇 `[` 新建空 `NestedInteger` 入栈；遇 `-` 或数字则解析整数，若栈空说明是顶层整数直接返回，否则加入栈顶列表；遇 `]` 弹出栈顶列表，若栈还有则把它加入新的栈顶（合并嵌套）。

:::::: code-group

```java [Java]
class Solution {
    public NestedInteger deserialize(String s) {
        if (!s.startsWith("[")) return new NestedInteger(Integer.parseInt(s));
        Deque<NestedInteger> st = new ArrayDeque<>();
        int i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == '[') { st.push(new NestedInteger()); i++; }
            else if (s.charAt(i) == ']') { i++;
                NestedInteger top = st.pop();
                if (!st.isEmpty()) st.peek().add(top);
                else return top;
            } else if (s.charAt(i) == ',') { i++; }
            else {   // 解析整数
                int j = i; boolean neg = false;
                if (s.charAt(i) == '-') { neg = true; i++; }
                int num = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) { num = num*10 + (s.charAt(i)-'0'); i++; }
                if (neg) num = -num;
                NestedInteger ni = new NestedInteger(num);
                st.peek().add(ni);
            }
        }
        return new NestedInteger();
    }
}
```

```python [Python]
class Solution:
    def deserialize(self, s: str) -> NestedInteger:
        if s[0] != '[': return NestedInteger(int(s))
        stack = []
        i = 0
        while i < len(s):
            if s[i] == '[': stack.append(NestedInteger()); i += 1
            elif s[i] == ']':
                top = stack.pop()
                if stack: stack[-1].add(top)
                else: return top
                i += 1
            elif s[i] == ',' or s[i] == ' ': i += 1
            else:
                j = i; neg = False
                if s[i] == '-': neg = True; i += 1
                num = 0
                while i < len(s) and s[i].isdigit(): num = num*10 + int(s[i]); i += 1
                if neg: num = -num
                stack[-1].add(NestedInteger(num))
        return NestedInteger()
```

```cpp [C++]
class Solution {
public:
    NestedInteger deserialize(string s) {
        if (s[0] != '[') return NestedInteger(stoi(s));
        vector<NestedInteger> st;
        int i = 0;
        while (i < s.size()) {
            if (s[i] == '[') { st.push_back(NestedInteger()); i++; }
            else if (s[i] == ']') { i++; if (st.size()>1) { auto top=st.back(); st.pop_back(); st.back().add(top); } else return st.back(); }
            else if (s[i] == ',') i++;
            else {
                int j=i; bool neg=false; if(s[i]=='-'){neg=true;i++;} int num=0;
                while(i<s.size()&&isdigit(s[i])){num=num*10+(s[i]-'0');i++;}
                if(neg)num=-num; st.back().add(NestedInteger(num));
            }
        }
        return NestedInteger();
    }
};
```

```go [Go]
func deserialize(s string) *NestedInteger {
    if s[0] != '[' { v := 0; neg := false; if s[0]=='-' { neg=true }; for _, c := range s { if c>='0'&&c<='9' { v=v*10+int(c-'0') } }; if neg { v=-v }; return &NestedInteger{val:v, isInt:true} }
    stack := []*NestedInteger{}
    i := 0
    for i < len(s) {
        if s[i] == '[' { stack = append(stack, &NestedInteger{}); i++ }
        else if s[i] == ']' { top := stack[len(stack)-1]; stack = stack[:len(stack)-1]; if len(stack)>0 { stack[len(stack)-1].Add(top) } else { return top }; i++ }
        else if s[i] == ',' { i++ }
        else {
            neg := false; if s[i]=='-' { neg=true; i++ }; num := 0
            for i < len(s) && s[i]>='0' && s[i]<='9' { num = num*10+int(s[i]-'0'); i++ }
            if neg { num = -num }
            stack[len(stack)-1].Add(&NestedInteger{val:num, isInt:true})
        }
    }
    return &NestedInteger{}
}
```

```js [JavaScript]
var deserialize = function (s) {
    if (s[0] !== '[') return new NestedInteger(parseInt(s));
    const stack = [];
    let i = 0;
    while (i < s.length) {
        if (s[i] === '[') { stack.push(new NestedInteger()); i++; }
        else if (s[i] === ']') { const top = stack.pop(); if (stack.length) stack[stack.length-1].add(top); else return top; i++; }
        else if (s[i] === ',') i++;
        else {
            let j = i, neg = false;
            if (s[i] === '-') { neg = true; i++; }
            let num = 0;
            while (i < s.length && /\d/.test(s[i])) { num = num*10 + (s[i].charCodeAt(0)-48); i++; }
            if (neg) num = -num;
            stack[stack.length-1].add(new NestedInteger(num));
        }
    }
    return new NestedInteger();
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`（栈/深度）。

## 三、总结

括号匹配 + 栈构造嵌套结构：`[` 开新列表、`]` 闭合并挂回父列表、数字直接加。与 `341 扁平化迭代器`、`339/364 嵌套权重` 配套：`385` 负责「构造」，`341` 负责「消费」。注意顶层是单个整数（无 `[]`）的特判。同类：`726 原子的数量`（更复杂括号解析）。
