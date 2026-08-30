# [224. 基本计算器](https://leetcode.cn/problems/basic-calculator/)



## 一、题目描述

给你一个字符串表达式 `s` ，请你实现一个基本计算器来计算并返回它的值。

**注意：** 不允许使用任何将字符串作为数学表达式计算的内置函数，比如 `eval()` 。

**示例 1：**

```
输入：s = "1 + 1"
输出：2
```

**示例 2：**

```
输入：s = " 2-1 + 2 "
输出：3
```

**示例 3：**

```
输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
```

**提示：**

-   `1 <= s.length <= 3 * 10⁵`
-   `s` 由数字、`'+'`、`'-'`、`'('`、`')'`、和 `' '` 组成
-   `s` 表示一个有效的表达式
-   `'+'` 不能用作一元运算（例如 `"+1"` 和 `"+(2 + 3)"` 无效）
-   `'-'` 可以用作一元运算（例如 `"-1"` 和 `"-(2 + 3)"` 是有效的）
-   输入中不存在两个连续的操作符
-   每个数字和运行的计算将适合于一个有符号的 32 位整数



## 二、解答方法

### 2.1 方法一：栈（处理括号，推荐）

1. **思路**

只有加减法时，括号的本质是「改变符号」。用栈保存 **进入括号前的累计结果与括号前的符号**：

- 维护 `result`（当前累计和）、`sign`（当前符号，1 或 -1）、`num`（当前数字）；
- 遇 `+`：`result += sign * num`，重置 `num=0`，`sign=1`；
- 遇 `-`：`result += sign * num`，重置 `num=0`，`sign=-1`；
- 遇 `(`：把 `result` 和 `sign` 压栈，重置 `result=0, sign=1`（开始计算括号内）；
- 遇 `)`：先 `result += sign * num`，再弹出栈顶 `prevSign` 与 `prevResult`，`result = prevResult + prevSign * result`；
- 遍历结束返回 `result + sign * num`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        int result = 0, num = 0, sign = 1;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                result += sign * num;
                num = 0;
                sign = c == '+' ? 1 : -1;
            } else if (c == '(') {
                stack.push(result);
                stack.push(sign);
                result = 0;
                sign = 1;
            } else if (c == ')') {
                result += sign * num;
                num = 0;
                int prevSign = stack.pop();
                int prevResult = stack.pop();
                result = prevResult + prevSign * result;
            }
            // 空格忽略
        }
        return result + sign * num;
    }
}
```

```python [Python]
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        result = 0
        num = 0
        sign = 1
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c in '+-':
                result += sign * num
                num = 0
                sign = 1 if c == '+' else -1
            elif c == '(':
                stack.append(result)
                stack.append(sign)
                result = 0
                sign = 1
            elif c == ')':
                result += sign * num
                num = 0
                prev_sign = stack.pop()
                prev_result = stack.pop()
                result = prev_result + prev_sign * result
        return result + sign * num
```

```go [Go]
func calculate(s string) int {
    stack := []int{}
    result, num, sign := 0, 0, 1
    for i := 0; i < len(s); i++ {
        c := s[i]
        switch {
        case c >= '0' && c <= '9':
            num = num*10 + int(c-'0')
        case c == '+' || c == '-':
            result += sign * num
            num = 0
            if c == '+' {
                sign = 1
            } else {
                sign = -1
            }
        case c == '(':
            stack = append(stack, result, sign)
            result, sign = 0, 1
        case c == ')':
            result += sign * num
            num = 0
            n := len(stack)
            prevSign, prevResult := stack[n-1], stack[n-2]
            stack = stack[:n-2]
            result = prevResult + prevSign*result
        }
    }
    return result + sign*num
}
```

```cpp [C++]
class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        long long result = 0, num = 0;
        int sign = 1;
        for (char c : s) {
            if (isdigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                result += sign * num;
                num = 0;
                sign = (c == '+') ? 1 : -1;
            } else if (c == '(') {
                st.push(result);
                st.push(sign);
                result = 0;
                sign = 1;
            } else if (c == ')') {
                result += sign * num;
                num = 0;
                int prevSign = st.top(); st.pop();
                int prevResult = st.top(); st.pop();
                result = prevResult + prevSign * result;
            }
        }
        return result + sign * num;
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
    let result = 0, num = 0, sign = 1;
    for (const c of s) {
        if (c >= '0' && c <= '9') {
            num = num * 10 + Number(c);
        } else if (c === '+' || c === '-') {
            result += sign * num;
            num = 0;
            sign = c === '+' ? 1 : -1;
        } else if (c === '(') {
            stack.push(result, sign);
            result = 0;
            sign = 1;
        } else if (c === ')') {
            result += sign * num;
            num = 0;
            const prevSign = stack.pop();
            const prevResult = stack.pop();
            result = prevResult + prevSign * result;
        }
    }
    return result + sign * num;
};
```

```ts [TypeScript]
/**
 * @param {string} s
 * @return {number}
 */
function calculate(s: string): number {
    const stack: number[] = [];
    let result = 0, num = 0, sign = 1;
    for (const c of s) {
        if (c >= '0' && c <= '9') {
            num = num * 10 + Number(c);
        } else if (c === '+' || c === '-') {
            result += sign * num;
            num = 0;
            sign = c === '+' ? 1 : -1;
        } else if (c === '(') {
            stack.push(result, sign);
            result = 0;
            sign = 1;
        } else if (c === ')') {
            result += sign * num;
            num = 0;
            const prevSign = stack.pop()!;
            const prevResult = stack.pop()!;
            result = prevResult + prevSign * result;
        }
    }
    return result + sign * num;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`（栈深度最多为括号嵌套层数）。

### 2.2 方法二：一元组符号栈（括号符号法）

1. **思路**

只含加减法时，`-(a - b)` 等价于 `-a + b`。可用一个栈保存「当前所处括号环境的符号」，用 `sign` 跟踪当前符号：遇 `(` 压入当前 `sign`，遇 `)` 弹出；遇 `+`/`-` 更新 `sign`。这样只需一个 `result` 累加即可。

2. **代码实现（Python）**

```python
class Solution:
    def calculate(self, s: str) -> int:
        stack = [1]          # 最外层符号为 +1
        result = 0
        sign = 1
        i = 0
        while i < len(s):
            c = s[i]
            if c.isdigit():
                num = 0
                while i < len(s) and s[i].isdigit():
                    num = num * 10 + int(s[i])
                    i += 1
                result += sign * num
                continue
            elif c == '+':
                sign = stack[-1]
            elif c == '-':
                sign = -stack[-1]
            elif c == '(':
                stack.append(sign)
            elif c == ')':
                stack.pop()
            i += 1
        return result
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 思路 |
| ---- | ---- |
| 栈存「结果 + 符号」 | 通用，易扩展到乘除（772 题） |
| 符号栈（一元组） | 仅加减法适用，更简洁 |

关键技巧：**减法即加负数**，把 `-b` 视为 `+(-b)`，全程只做加法。括号处理则是「保存现场 → 局部计算 → 合并回现场」，这也是 772 题（含乘除）和 227 题（含 `*/`）的通用框架。
