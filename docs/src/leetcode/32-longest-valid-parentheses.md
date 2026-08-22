# [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)



## 一、题目描述

给你一个只包含 `'('` 和 `')'` 的字符串，找出最长有效（格式正确且连续）括号 **子串** 的长度。

左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如 `"(()())"`。



**示例 1：**

```
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
```

**示例 2：**

```
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
```

**示例 3：**

```
输入：s = ""
输出：0
```

**提示：**

-   `0 <= s.length <= 3 * 10^4`
-   `s[i]` 为 `'('` 或 `')'`



## 二、解答方法

### 2.1 方法一：栈（含哨兵下标）

1. **思路**

在栈中保存「括号的下标」，并用一个初始哨兵 `-1` 表示「当前有效段的起点左侧」：

-   遇 `'('` 将下标入栈；
-   遇 `')'` 弹出栈顶（匹配一个 `'('`）：
    -   若弹出后栈空，说明这段无法在此闭合，把当前下标压栈作为新起点；
    -   否则当前有效长度为 `i - stack.top()`，更新最大值。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int longestValidParentheses(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(-1);
        int maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                stack.push(i);
            } else {
                stack.pop();
                if (stack.isEmpty()) {
                    stack.push(i);
                } else {
                    maxLen = Math.max(maxLen, i - stack.peek());
                }
            }
        }
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack = [-1]
        max_len = 0
        for i, c in enumerate(s):
            if c == '(':
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    max_len = max(max_len, i - stack[-1])
        return max_len
```

```go [Go]
func longestValidParentheses(s string) int {
    stack := []int{-1}
    maxLen := 0
    for i, c := range s {
        if c == '(' {
            stack = append(stack, i)
        } else {
            stack = stack[:len(stack)-1]
            if len(stack) == 0 {
                stack = append(stack, i)
            } else {
                if i-stack[len(stack)-1] > maxLen {
                    maxLen = i - stack[len(stack)-1]
                }
            }
        }
    }
    return maxLen
}
```

```c [C]
int longestValidParentheses(char* s) {
    int n = 0;
    while (s[n]) n++;
    int* stack = (int*)malloc(sizeof(int) * (n + 1));
    int top = 0;
    stack[top++] = -1;
    int maxLen = 0;
    for (int i = 0; i < n; i++) {
        if (s[i] == '(') {
            stack[top++] = i;
        } else {
            top--;
            if (top == 0) {
                stack[top++] = i;
            } else {
                int len = i - stack[top - 1];
                if (len > maxLen) maxLen = len;
            }
        }
    }
    free(stack);
    return maxLen;
}
```

```cpp [C++]
class Solution {
public:
    int longestValidParentheses(string s) {
        vector<int> stack;
        stack.push_back(-1);
        int maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '(') {
                stack.push_back(i);
            } else {
                stack.pop_back();
                if (stack.empty()) {
                    stack.push_back(i);
                } else {
                    maxLen = max(maxLen, i - stack.back());
                }
            }
        }
        return maxLen;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    const stack = [-1];
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLen;
};
```

```ts [TypeScript]
function longestValidParentheses(s: string): number {
    const stack: number[] = [-1];
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLen;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，遍历字符串一次，每个字符进出栈各一次。
- **空间复杂度**：`O(n)`，栈最多存 `n` 个下标。

### 2.2 方法二：贪心（左右计数器）

1. **思路**

用两个计数器 `left`、`right` 分别表示遇到的 `'('` 和 `')'` 数量：

-   左到右扫描：`right == left` 时更新最大长度；若 `right > left` 说明不合法，重置两计数器为 0；
-   但只从左往右会漏掉 `"(()"` 这类（左多右少）的情况，所以再 **从右往左** 扫描一次（对称处理 `left > right` 重置）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int longestValidParentheses(String s) {
        int maxLen = 0, n = s.length();
        int left = 0, right = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '(') left++;
            else right++;
            if (left == right) maxLen = Math.max(maxLen, 2 * right);
            else if (right > left) left = right = 0;
        }
        left = right = 0;
        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == '(') left++;
            else right++;
            if (left == right) maxLen = Math.max(maxLen, 2 * left);
            else if (left > right) left = right = 0;
        }
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        max_len = left = right = 0
        for c in s:
            if c == '(':
                left += 1
            else:
                right += 1
            if left == right:
                max_len = max(max_len, 2 * right)
            elif right > left:
                left = right = 0
        left = right = 0
        for c in reversed(s):
            if c == '(':
                left += 1
            else:
                right += 1
            if left == right:
                max_len = max(max_len, 2 * left)
            elif left > right:
                left = right = 0
        return max_len
```

```go [Go]
func longestValidParentheses(s string) int {
    n, maxLen, left, right := len(s), 0, 0, 0
    for i := 0; i < n; i++ {
        if s[i] == '(' {
            left++
        } else {
            right++
        }
        if left == right {
            if 2*right > maxLen {
                maxLen = 2 * right
            }
        } else if right > left {
            left, right = 0, 0
        }
    }
    left, right = 0, 0
    for i := n - 1; i >= 0; i-- {
        if s[i] == '(' {
            left++
        } else {
            right++
        }
        if left == right {
            if 2*left > maxLen {
                maxLen = 2 * left
            }
        } else if left > right {
            left, right = 0, 0
        }
    }
    return maxLen
}
```

```c [C]
int longestValidParentheses(char* s) {
    int n = 0;
    while (s[n]) n++;
    int maxLen = 0, left = 0, right = 0;
    for (int i = 0; i < n; i++) {
        if (s[i] == '(') left++;
        else right++;
        if (left == right) {
            if (2 * right > maxLen) maxLen = 2 * right;
        } else if (right > left) left = right = 0;
    }
    left = right = 0;
    for (int i = n - 1; i >= 0; i--) {
        if (s[i] == '(') left++;
        else right++;
        if (left == right) {
            if (2 * left > maxLen) maxLen = 2 * left;
        } else if (left > right) left = right = 0;
    }
    return maxLen;
}
```

```cpp [C++]
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size(), maxLen = 0, left = 0, right = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == '(') left++;
            else right++;
            if (left == right) maxLen = max(maxLen, 2 * right);
            else if (right > left) left = right = 0;
        }
        left = right = 0;
        for (int i = n - 1; i >= 0; i--) {
            if (s[i] == '(') left++;
            else right++;
            if (left == right) maxLen = max(maxLen, 2 * left);
            else if (left > right) left = right = 0;
        }
        return maxLen;
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    const n = s.length;
    let maxLen = 0, left = 0, right = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') left++;
        else right++;
        if (left === right) maxLen = Math.max(maxLen, 2 * right);
        else if (right > left) left = right = 0;
    }
    left = right = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (s[i] === '(') left++;
        else right++;
        if (left === right) maxLen = Math.max(maxLen, 2 * left);
        else if (left > right) left = right = 0;
    }
    return maxLen;
};
```

```ts [TypeScript]
function longestValidParentheses(s: string): number {
    const n = s.length;
    let maxLen = 0, left = 0, right = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') left++;
        else right++;
        if (left === right) maxLen = Math.max(maxLen, 2 * right);
        else if (right > left) left = right = 0;
    }
    left = right = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (s[i] === '(') left++;
        else right++;
        if (left === right) maxLen = Math.max(maxLen, 2 * left);
        else if (left > right) left = right = 0;
    }
    return maxLen;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，两次线性扫描。
- **空间复杂度**：`O(1)`，只使用几个计数器。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 栈（含哨兵下标） | `O(n)` | `O(n)` | 常规实现 |
| 贪心（左右计数器） | `O(n)` | `O(1)` | 思路直观，通常更优 |

