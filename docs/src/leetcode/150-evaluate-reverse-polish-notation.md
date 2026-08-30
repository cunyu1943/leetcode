# [150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)



## 一、题目描述

给你一个字符串数组 `tokens` ，表示一个根据 [逆波兰表示法](https://baike.baidu.com/item/逆波兰式) 表示的算术表达式。

请你计算该表达式的值。返回值是一个整数，表示表达式的值。

注意：

-   有效的算符为 `'+'`、`'-'`、`'*'` 和 `'/'` 。
-   每个操作数（运算对象）都可以是一个整数或者另一个表达式。
-   两个整数之间的除法总是 **向零截断** 。
-   表达式中不含除零表达式。
-   输入是一个根据逆波兰表示法表示的算术表达式。
-   答案及所有中间计算结果可以用 **32 位** 整数表示。



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
解释：该算式转化为常见的中缀算术表达式为：((10 * (6 / ((9 + 3) * -11))) + 17) + 5 = 22
```

**提示：**

-   `1 <= tokens.length <= 10⁴`
-   `tokens[i]` 是一个算符（`"+"`、`"-"`、`"*"` 或 `"/"`），或是在范围 `[-200, 200]` 内的一个整数



## 二、解答方法

### 2.1 方法一：栈

1. **思路**

逆波兰表达式（后缀表达式）天然适合用栈求值：遇到数字入栈；遇到运算符时弹出栈顶两个数字，用该运算符计算（注意顺序：先弹出的是右操作数），结果再入栈。最终栈中只剩一个元素即答案。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String token : tokens) {
            if (isNumber(token)) {
                stack.push(Integer.parseInt(token));
            } else {
                int b = stack.pop();
                int a = stack.pop();
                switch (token) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            }
        }
        return stack.pop();
    }

    private boolean isNumber(String s) {
        return !s.equals("+") && !s.equals("-") && !s.equals("*") && !s.equals("/");
    }
}
```

```python [Python]
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for token in tokens:
            if token in "+-*/":
                b = stack.pop()
                a = stack.pop()
                if token == "+":
                    stack.append(a + b)
                elif token == "-":
                    stack.append(a - b)
                elif token == "*":
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(token))
        return stack.pop()
```

```go [Go]
func evalRPN(tokens []string) int {
    stack := []int{}
    for _, token := range tokens {
        switch token {
        case "+", "-", "*", "/":
            b := stack[len(stack)-1]
            a := stack[len(stack)-2]
            stack = stack[:len(stack)-2]
            switch token {
            case "+":
                stack = append(stack, a+b)
            case "-":
                stack = append(stack, a-b)
            case "*":
                stack = append(stack, a*b)
            case "/":
                stack = append(stack, a/b)
            }
        default:
            num, _ := strconv.Atoi(token)
            stack = append(stack, num)
        }
    }
    return stack[0]
}
```

```cpp [C++]
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (const string& token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (token == "+") st.push(a + b);
                else if (token == "-") st.push(a - b);
                else if (token == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stoi(token));
            }
        }
        return st.top();
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const stack = [];
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const b = stack.pop();
            const a = stack.pop();
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(token, 10));
        }
    }
    return stack.pop();
};
```

```ts [TypeScript]
/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const b = stack.pop()!;
            const a = stack.pop()!;
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(token, 10));
        }
    }
    return stack.pop()!;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，`n` 为 token 数量。
- **空间复杂度**：`O(n)`，栈的深度。

## 三、总结

逆波兰表达式是栈的经典应用，注意两点：1）**除法向零截断**（Java 整数除法天然满足，Python 需用 `int(a/b)` 而非 `//`）；2）**操作数顺序**：先出栈的是右操作数。
