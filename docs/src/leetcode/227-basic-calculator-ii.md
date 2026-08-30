# [227. 基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/)



## 一、题目描述

给你一个字符串表达式 `s` ，请你实现一个基本计算器来计算并返回它的值。

整数除法仅保留 **整数部分**。

你可以假设给定的表达式总是有效的。所有中间结果将在 `[-2³¹, 2³¹ - 1]` 的范围内。

**注意：** 不允许使用任何将字符串作为数学表达式计算的内置函数，比如 `eval()` 。

**示例 1：**

```
输入：s = "3+2*2"
输出：7
```

**示例 2：**

```
输入：s = " 3/2 "
输出：1
```

**示例 3：**

```
输入：s = " 3+5 / 2 "
输出：5
```

**提示：**

-   `1 <= s.length <= 3 * 10⁵`
-   `s` 由整数和算符（`'+'`, `'-'`, `'*'`, `'/'`）组成，中间由一些空格隔开
-   `s` 表示一个 **有效表达式**
-   表达式中的所有整数都是非负整数，且在范围 `[0, 2³¹ - 1]` 内
-   题目数据保证答案是一个 **32-bit 整数**



## 二、解答方法

### 2.1 方法一：栈（保存待累加项，推荐）

1. **思路**

无括号，但有优先级。用栈保存「待累加的项（带符号）」：

- 遇数字：解析完整数字；
- 遇 `*` 或 `/`：因为优先级高，**立即**与栈顶元素运算，结果替换栈顶；
- 遇 `+` 或 `-`：把带符号的数压栈（`-` 压入负数）；
- 最后栈中所有元素求和即为结果。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        char preOp = '+';
        int num = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            }
            if (!Character.isDigit(c) && c != ' ' || i == s.length() - 1) {
                switch (preOp) {
                    case '+': stack.push(num); break;
                    case '-': stack.push(-num); break;
                    case '*': stack.push(stack.pop() * num); break;
                    case '/': stack.push(stack.pop() / num); break;
                }
                preOp = c;
                num = 0;
            }
        }
        int result = 0;
        while (!stack.isEmpty()) {
            result += stack.pop();
        }
        return result;
    }
}
```

```python [Python]
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        pre_op = '+'
        num = 0
        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)
            if (not ch.isdigit() and ch != ' ') or i == len(s) - 1:
                if pre_op == '+':
                    stack.append(num)
                elif pre_op == '-':
                    stack.append(-num)
                elif pre_op == '*':
                    stack.append(stack.pop() * num)
                elif pre_op == '/':
                    stack.append(int(stack.pop() / num))   # 向零取整
                pre_op = ch
                num = 0
        return sum(stack)
```

```go [Go]
func calculate(s string) int {
    stack := []int{}
    preOp := byte('+')
    num := 0
    for i := 0; i < len(s); i++ {
        c := s[i]
        if c >= '0' && c <= '9' {
            num = num*10 + int(c-'0')
        }
        if (c < '0' || c > '9') && c != ' ' || i == len(s)-1 {
            switch preOp {
            case '+':
                stack = append(stack, num)
            case '-':
                stack = append(stack, -num)
            case '*':
                stack[len(stack)-1] *= num
            case '/':
                stack[len(stack)-1] /= num
            }
            preOp = c
            num = 0
        }
    }
    result := 0
    for _, v := range stack {
        result += v
    }
    return result
}
```

```cpp [C++]
class Solution {
public:
    int calculate(string s) {
        vector<long long> stack;
        char preOp = '+';
        long long num = 0;
        for (int i = 0; i < s.size(); i++) {
            char c = s[i];
            if (isdigit(c)) {
                num = num * 10 + (c - '0');
            }
            if ((!isdigit(c) && c != ' ') || i == s.size() - 1) {
                if (preOp == '+') stack.push_back(num);
                else if (preOp == '-') stack.push_back(-num);
                else if (preOp == '*') stack.back() *= num;
                else if (preOp == '/') stack.back() /= num;
                preOp = c;
                num = 0;
            }
        }
        long long result = 0;
        for (long long v : stack) result += v;
        return result;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    const stack = [];
    let preOp = '+';
    let num = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') {
            num = num * 10 + Number(c);
        }
        if ((c < '0' || c > '9') && c !== ' ' || i === s.length - 1) {
            if (preOp === '+') stack.push(num);
            else if (preOp === '-') stack.push(-num);
            else if (preOp === '*') stack.push(stack.pop() * num);
            else if (preOp === '/') stack.push(Math.trunc(stack.pop() / num));
            preOp = c;
            num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {number}
 */
function calculate(s: string): number {
    const stack: number[] = [];
    let preOp = '+';
    let num = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') {
            num = num * 10 + Number(c);
        }
        if ((c < '0' || c > '9') && c !== ' ' || i === s.length - 1) {
            if (preOp === '+') stack.push(num);
            else if (preOp === '-') stack.push(-num);
            else if (preOp === '*') stack.push(stack.pop()! * num);
            else if (preOp === '/') stack.push(Math.trunc(stack.pop()! / num));
            preOp = c;
            num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：双变量法（无需栈，O(1) 空间）

1. **思路**

无括号时可用两个变量：

- `result`：已确定可以累加的部分；
- `lastTerm`：当前待定的项（遇到更高优先级运算时需要修改它）。

处理：
- 遇 `+/-`：`result += lastTerm`，`lastTerm = ±num`；
- 遇 `*/`：`lastTerm = lastTerm * num` 或 `lastTerm / num`；
- 结束返回 `result + lastTerm`。

2. **代码实现（Python）**

```python
class Solution:
    def calculate(self, s: str) -> int:
        result = 0
        last_term = 0
        num = 0
        op = '+'
        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)
            if (not ch.isdigit() and ch != ' ') or i == len(s) - 1:
                if op == '+':
                    result += last_term
                    last_term = num
                elif op == '-':
                    result += last_term
                    last_term = -num
                elif op == '*':
                    last_term *= num
                elif op == '/':
                    last_term = int(last_term / num)
                op = ch
                num = 0
        return result + last_term
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 空间 | 适用 |
| ---- | ---- | ---- |
| 栈存待累加项 | `O(n)` | 通用，易理解 |
| 双变量 | `O(1)` | 无括号场景最优 |

关键点：
1. **乘除立即计算**（优先级高），加减延后到求和阶段；
2. **除法向零取整**：Python 的 `//` 对负数是地板除（向下取整），与题意「向零取整」不同，必须写 `int(a / b)` 或用 `Math.trunc`；
3. 遍历结束时别忘了处理最后一个数字（`i == len(s)-1`）。
