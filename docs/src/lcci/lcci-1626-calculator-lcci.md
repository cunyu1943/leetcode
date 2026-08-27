# [面试题 16.26. 计算器](https://leetcode.cn/problems/calculator-lcci/)

## 一、题目描述

给定一个包含正整数、加(`+`)、减(`-`)、乘(`*`)、除(`/`)的算术表达式（括号除外），计算其结果。

表达式仅包含非负整数、`+`、`-`、`*`、`/` 四种运算符，以及空格。整数除法应截去小数（向零截断）。保证表达式合法。

**示例 1：**

```
输入: "3+2*2"
输出: 7
```

**示例 2：**

```
输入: " 3/2 "
输出: 1
```

**示例 3：**

```
输入: " 3+5 / 2 "
输出: 5
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 由整数和运算符 (`+`, `-`, `*`, `/`) 组成，整数和运算符之间可能有空格
- 表达式中的整数均为非负整数且不超过 2³¹ − 1

---

## 二、解答方法

### 2.1 方法一：栈（乘除优先）

**1. 思路**

由于乘除优先级高于加减，用一个栈在遇到数字时：若前一个运算符是 `+` 或 `-`，直接入栈（减号入负数）；若前一个运算符是 `*` 或 `/`，则弹出栈顶与该数字运算后入栈。最后栈内求和即为结果。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        int num = 0; char sign = '+';
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) num = num * 10 + (c - '0');
            if ((!Character.isDigit(c) && c != ' ') || i == s.length() - 1) {
                if (sign == '+') stack.push(num);
                else if (sign == '-') stack.push(-num);
                else if (sign == '*') stack.push(stack.pop() * num);
                else if (sign == '/') stack.push(stack.pop() / num);
                sign = c; num = 0;
            }
        }
        int res = 0;
        while (!stack.isEmpty()) res += stack.pop();
        return res;
    }
}
```

```python [Python]
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        sign = '+'
        for i, c in enumerate(s):
            if c.isdigit():
                num = num * 10 + int(c)
            if (not c.isdigit() and c != ' ') or i == len(s) - 1:
                if sign == '+': stack.append(num)
                elif sign == '-': stack.append(-num)
                elif sign == '*': stack.append(stack.pop() * num)
                elif sign == '/': stack.append(int(stack.pop() / num))
                sign = c; num = 0
        return sum(stack)
```

```go [Go]
func calculate(s string) int {
    stack := []int{}
    num := 0
    sign := byte('+')
    for i := 0; i < len(s); i++ {
        c := s[i]
        if c >= '0' && c <= '9' { num = num*10 + int(c-'0') }
        if (c < '0' || c > '9') && c != ' ' || i == len(s)-1 {
            if sign == '+' { stack = append(stack, num) }
            else if sign == '-' { stack = append(stack, -num) }
            else if sign == '*' { stack[len(stack)-1] *= num }
            else if sign == '/' { stack[len(stack)-1] /= num }
            sign = c; num = 0
        }
    }
    sum := 0
    for _, v := range stack { sum += v }
    return sum
}
```

```c [C]
// C 中手动解析字符串并用数组模拟栈，逻辑同 Python
```

```cpp [C++]
class Solution {
public:
    int calculate(string s) {
        vector<int> st;
        int num = 0; char sign = '+';
        for (int i = 0; i < s.size(); i++) {
            char c = s[i];
            if (isdigit(c)) num = num * 10 + (c - '0');
            if ((!isdigit(c) && c != ' ') || i == s.size() - 1) {
                if (sign == '+') st.push_back(num);
                else if (sign == '-') st.push_back(-num);
                else if (sign == '*') st.back() *= num;
                else if (sign == '/') st.back() /= num;
                sign = c; num = 0;
            }
        }
        int res = 0;
        for (int v : st) res += v;
        return res;
    }
};
```

```javascript [JavaScript]
var calculate = function(s) {
    const stack = [];
    let num = 0, sign = '+';
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') num = num * 10 + (c - '0');
        if ((c < '0' || c > '9') && c !== ' ' || i === s.length - 1) {
            if (sign === '+') stack.push(num);
            else if (sign === '-') stack.push(-num);
            else if (sign === '*') stack.push(stack.pop() * num);
            else if (sign === '/') stack.push(Math.trunc(stack.pop() / num));
            sign = c; num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
};
```

```typescript [TypeScript]
function calculate(s: string): number {
    const stack: number[] = [];
    let num = 0, sign = '+';
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') num = num * 10 + (c.charCodeAt(0) - 48);
        if ((c < '0' || c > '9') && c !== ' ' || i === s.length - 1) {
            if (sign === '+') stack.push(num);
            else if (sign === '-') stack.push(-num);
            else if (sign === '*') stack.push(stack.pop()! * num);
            else if (sign === '/') stack.push(Math.trunc(stack.pop()! / num));
            sign = c; num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`（单次遍历）。
- **空间复杂度**：`O(n)`（栈）。

---

### 2.2 方法二：双栈（通用表达式）

**1. 思路**

用数字栈和运算符栈，按优先级处理（乘除立刻结算，加减暂存）。本例无括号，等价于方法一；双栈法便于扩展到带括号情形。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def calculate(self, s: str) -> int:
        num_stack = []
        op_stack = []
        num = 0
        for i, c in enumerate(s):
            if c.isdigit():
                num = num * 10 + int(c)
            elif c in '+-*/':
                # 结算栈顶的乘除
                while op_stack and op_stack[-1] in '*/':
                    self.apply(num_stack, op_stack)
                num_stack.append(num)
                op_stack.append(c)
                num = 0
        while op_stack:
            self.apply(num_stack, op_stack)
        return num_stack[0]
    def apply(self, ns, ops):
        b = ns.pop(); a = ns.pop(); op = ops.pop()
        if op == '*': ns.append(a*b)
        elif op == '/': ns.append(int(a/b))
        elif op == '+': ns.append(a+b)
        elif op == '-': ns.append(a-b)
```

```cpp [C++]
class Solution {
    void apply(vector<int>& ns, vector<char>& ops) {
        int b = ns.back(); ns.pop_back();
        int a = ns.back(); ns.pop_back();
        char op = ops.back(); ops.pop_back();
        if (op == '*') ns.push_back(a*b);
        else if (op == '/') ns.push_back(a/b);
        else if (op == '+') ns.push_back(a+b);
        else ns.push_back(a-b);
    }
public:
    int calculate(string s) {
        vector<int> ns; vector<char> ops; int num = 0;
        for (int i = 0; i < s.size(); i++) {
            char c = s[i];
            if (isdigit(c)) num = num*10 + (c-'0');
            if (c == '+' || c == '-' || c == '*' || c == '/') {
                while (!ops.empty() && (ops.back()=='*'||ops.back()=='/')) apply(ns, ops);
                ns.push_back(num); ops.push_back(c); num = 0;
            }
        }
        ns.push_back(num);
        while (!ops.empty()) apply(ns, ops);
        return ns[0];
    }
};
```

```javascript [JavaScript]
var calculate = function(s) {
    const apply = (ns, ops) => {
        const b = ns.pop(), a = ns.pop(), op = ops.pop();
        if (op === '*') ns.push(a*b);
        else if (op === '/') ns.push(Math.trunc(a/b));
        else if (op === '+') ns.push(a+b);
        else ns.push(a-b);
    };
    const ns = [], ops = []; let num = 0;
    for (const c of s) {
        if (c >= '0' && c <= '9') num = num*10 + (c - '0');
        else if ('+-*/'.includes(c)) {
            while (ops.length && (ops[ops.length-1] === '*' || ops[ops.length-1] === '/')) apply(ns, ops);
            ns.push(num); ops.push(c); num = 0;
        }
    }
    ns.push(num);
    while (ops.length) apply(ns, ops);
    return ns[0];
};
```

```typescript [TypeScript]
function calculate(s: string): number {
    const apply = (ns: number[], ops: string[]) => {
        const b = ns.pop()!, a = ns.pop()!, op = ops.pop()!;
        if (op === '*') ns.push(a*b);
        else if (op === '/') ns.push(Math.trunc(a/b));
        else if (op === '+') ns.push(a+b);
        else ns.push(a-b);
    };
    const ns: number[] = [], ops: string[] = []; let num = 0;
    for (const c of s) {
        if (c >= '0' && c <= '9') num = num*10 + (c.charCodeAt(0)-48);
        else if ('+-*/'.includes(c)) {
            while (ops.length && (ops[ops.length-1] === '*' || ops[ops.length-1] === '/')) apply(ns, ops);
            ns.push(num); ops.push(c); num = 0;
        }
    }
    ns.push(num);
    while (ops.length) apply(ns, ops);
    return ns[0];
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（双栈）。

---

## 三、总结

| 方法       | 时间复杂度 | 空间复杂度 | 特点                       |
| ---------- | ---------- | ---------- | -------------------------- |
| 单栈（乘除去优先） | `O(n)` | `O(n)` | 无括号场景最优，推荐     |
| 双栈通用   | `O(n)`     | `O(n)`     | 易扩展至带括号表达式       |

**推荐**：无括号时直接用单栈（遇乘除立刻与栈顶结算），最后累加栈中数即得结果。
