# [LCR 036. 逆波兰表达式求值](https://leetcode.cn/problems/8ZBW90/)



## 一、题目描述

根据 逆波兰表示法（Reverse Polish Notation, RPN），求该后缀表达式计算结果。

有效的算符包括 `+`、`-`、`*`、`/` 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

**注意：** 两个整数之间的除法只保留整数部分。可以保证给定的逆波兰表达式总是有效的。



**示例 1：**

```
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
```

**示例 2：**

```
输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
```

**示例 3：**

```
输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
```

**提示：**

- `1 <= tokens.length <= 10⁴`
- `tokens[i]` 是一个算符（`"+"`、`"-"`、`"*"` 或 `"/"`），或是在范围 `[-200, 200]` 内的一个整数



## 二、解答方法

### 2.1 方法一：栈模拟

1. **思路**

后缀表达式的求值规则：

- 遍历 `tokens`；
- 遇到数字则压栈；
- 遇到运算符则弹出两个操作数（先弹出的在右，后弹出的在左），计算后把结果压回栈。

注意除法是整数除法：`b / a` 应截断小数部分（向零取整）。遍历结束后栈顶即结果。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String s : tokens) {
            if ("+".equals(s) || "-".equals(s) || "*".equals(s) || "/".equals(s)) {
                int b = stack.pop(), a = stack.pop();
                switch (s) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    default: stack.push(a / b);
                }
            } else {
                stack.push(Integer.parseInt(s));
            }
        }
        return stack.pop();
    }
}
```

```python [Python]
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for s in tokens:
            if s in '+-*/':
                b, a = stack.pop(), stack.pop()
                if s == '+':
                    stack.append(a + b)
                elif s == '-':
                    stack.append(a - b)
                elif s == '*':
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(s))
        return stack.pop()
```

```cpp [C++]
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> stk;
        for (string& s : tokens) {
            if (s == "+" || s == "-" || s == "*" || s == "/") {
                int b = stk.top(); stk.pop();
                int a = stk.top(); stk.pop();
                if (s == "+") stk.push(a + b);
                else if (s == "-") stk.push(a - b);
                else if (s == "*") stk.push(a * b);
                else stk.push(a / b);
            } else {
                stk.push(stoi(s));
            }
        }
        return stk.top();
    }
};
```

```go [Go]
func evalRPN(tokens []string) int {
    var stack []int
    for _, s := range tokens {
        switch s {
        case "+", "-", "*", "/":
            b, a := stack[len(stack)-1], stack[len(stack)-2]
            stack = stack[:len(stack)-2]
            var r int
            switch s {
            case "+":
                r = a + b
            case "-":
                r = a - b
            case "*":
                r = a * b
            case "/":
                r = a / b
            }
            stack = append(stack, r)
        default:
            v, _ := strconv.Atoi(s)
            stack = append(stack, v)
        }
    }
    return stack[0]
}
```

```js [JavaScript]
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const stack = [];
    for (const s of tokens) {
        if (s === '+' || s === '-' || s === '*' || s === '/') {
            const b = stack.pop(), a = stack.pop();
            if (s === '+') stack.push(a + b);
            else if (s === '-') stack.push(a - b);
            else if (s === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(Number(s));
        }
    }
    return stack[0];
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

int evalRPN(char** tokens, int tokensSize) {
    int* stack = (int*)malloc(tokensSize * sizeof(int));
    int top = 0;
    for (int i = 0; i < tokensSize; i++) {
        char* s = tokens[i];
        if (strlen(s) == 1 && strchr("+-*/", s[0])) {
            int b = stack[--top];
            int a = stack[--top];
            if (s[0] == '+') stack[top++] = a + b;
            else if (s[0] == '-') stack[top++] = a - b;
            else if (s[0] == '*') stack[top++] = a * b;
            else stack[top++] = a / b;
        } else {
            stack[top++] = atoi(s);
        }
    }
    int res = stack[0];
    free(stack);
    return res;
}
```

```ts [TypeScript]
function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    for (const s of tokens) {
        if (s === '+' || s === '-' || s === '*' || s === '/') {
            const b = stack.pop()!, a = stack.pop()!;
            if (s === '+') stack.push(a + b);
            else if (s === '-') stack.push(a - b);
            else if (s === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(Number(s));
        }
    }
    return stack[0];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 栈模拟 | `O(n)` | `O(n)` | 逆波兰求值标准做法 |

逆波兰表达式天然适合栈求值：数字压栈、运算符弹两个操作数计算后回压。注意整数除法在 Python/JS 中需显式向零取整。

