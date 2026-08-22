# [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)



## 一、题目描述

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s`，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。



**示例 1：**

```
输入：s = "()"
输出：true
```

**示例 2：**

```
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```
输入：s = "(]"
输出：false
```

**示例 4：**

```
输入：s = "([])"
输出：true
```

**示例 5：**

```
输入：s = "([)]"
输出：false
```

**提示：**

-   `1 <= s.length <= 10^4`
-   `s` 仅由括号 `'()[]{}'` 组成



## 二、解答方法

### 2.1 方法一：栈

1. **思路**

栈是括号匹配的天然数据结构：

-   遇到左括号 `( { [` 时压栈；
-   遇到右括号时，若栈为空（无匹配左括号）或栈顶不是对应的左括号，则无效；
-   匹配成功则弹出栈顶；
-   遍历结束后，栈必须为空才有效。

用哈希表记录「右括号 → 左括号」的映射，可简洁判断对应关系。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isValid(String s) {
        Map<Character, Character> map = new HashMap<>();
        map.put(')', '('); map.put(']', '['); map.put('}', '{');
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (map.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != map.get(c)) return false;
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}
```

```python [Python]
class Solution:
    def isValid(self, s: str) -> bool:
        mp = {')': '(', ']': '[', '}': '{'}
        stack = []
        for c in s:
            if c in mp:
                if not stack or stack.pop() != mp[c]:
                    return False
            else:
                stack.append(c)
        return not stack
```

```go [Go]
func isValid(s string) bool {
    mp := map[byte]byte{')': '(', ']': '[', '}': '{'}
    stack := []byte{}
    for i := 0; i < len(s); i++ {
        c := s[i]
        if left, ok := mp[c]; ok {
            if len(stack) == 0 || stack[len(stack)-1] != left {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, c)
        }
    }
    return len(stack) == 0
}
```

```c [C]
int isValid(char* s) {
    int n = 0;
    while (s[n]) n++;
    char* stack = (char*)malloc(sizeof(char) * (n + 1));
    int top = 0;
    for (int i = 0; i < n; i++) {
        char c = s[i];
        if (c == ')' || c == ']' || c == '}') {
            if (top == 0) { free(stack); return 0; }
            char left = stack[--top];
            if ((c == ')' && left != '(') ||
                (c == ']' && left != '[') ||
                (c == '}' && left != '{')) {
                free(stack); return 0;
            }
        } else {
            stack[top++] = c;
        }
    }
    int ok = (top == 0);
    free(stack);
    return ok;
}
```

```cpp [C++]
class Solution {
public:
    bool isValid(string s) {
        unordered_map<char, char> mp = {{')', '('}, {']', '['}, {'}', '{'}};
        vector<char> stack;
        for (char c : s) {
            if (mp.count(c)) {
                if (stack.empty() || stack.back() != mp[c]) return false;
                stack.pop_back();
            } else {
                stack.push_back(c);
            }
        }
        return stack.empty();
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const mp = { ')': '(', ']': '[', '}': '{' };
    const stack = [];
    for (const c of s) {
        if (c in mp) {
            if (stack.length === 0 || stack.pop() !== mp[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};
```

```ts [TypeScript]
function isValid(s: string): boolean {
    const mp: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    const stack: string[] = [];
    for (const c of s) {
        if (c in mp) {
            if (stack.length === 0 || stack.pop() !== mp[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，其中 `n` 为字符串长度，每个字符进出栈各一次。
- **空间复杂度**：`O(n)`，栈最多存储 `n/2` 个左括号。

### 2.2 方法二：不断消除相邻配对（字符串替换）

1. **思路**

反复从字符串中删除相邻的合法配对 `() [] {}`，直到无法删除。Java 用 `replace`，Python 可用循环 `replace` 至长度不再变化。代码短但效率低，仅作了解。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isValid(String s) {
        while (s.contains("()") || s.contains("[]") || s.contains("{}")) {
            s = s.replace("()", "").replace("[]", "").replace("{}", "");
        }
        return s.isEmpty();
    }
}
```

```python [Python]
class Solution:
    def isValid(self, s: str) -> bool:
        while "()" in s or "[]" in s or "{}" in s:
            s = s.replace("()", "").replace("[]", "").replace("{}", "")
        return not s
```

```go [Go]
func isValid(s string) bool {
    for {
        changed := false
        if idx := indexOf(s, "()"); idx >= 0 {
            s = s[:idx] + s[idx+2:]
            changed = true
        }
        if idx := indexOf(s, "[]"); idx >= 0 {
            s = s[:idx] + s[idx+2:]
            changed = true
        }
        if idx := indexOf(s, "{}"); idx >= 0 {
            s = s[:idx] + s[idx+2:]
            changed = true
        }
        if !changed {
            break
        }
    }
    return s == ""
}
```

```c [C]
/* C 标准库无字符串替换，需用循环 + 字符数组实现，繁琐，不推荐 */
```

```cpp [C++]
class Solution {
public:
    bool isValid(string s) {
        while (true) {
            size_t pos = string::npos;
            if ((pos = s.find("()")) != string::npos) s.erase(pos, 2);
            else if ((pos = s.find("[]")) != string::npos) s.erase(pos, 2);
            else if ((pos = s.find("{}")) != string::npos) s.erase(pos, 2);
            else break;
        }
        return s.empty();
    }
};
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    while (s.includes("()") || s.includes("[]") || s.includes("{}")) {
        s = s.replace("()", "").replace("[]", "").replace("{}", "");
    }
    return s.length === 0;
};
```

```ts [TypeScript]
function isValid(s: string): boolean {
    while (s.includes("()") || s.includes("[]") || s.includes("{}")) {
        s = s.replace("()", "").replace("[]", "").replace("{}", "");
    }
    return s.length === 0;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，每轮替换扫描整个字符串，最多 `n/2` 轮。
- **空间复杂度**：`O(n)`，字符串拷贝开销。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 栈 | `O(n)` | `O(n)` | 常规实现 |
| 不断消除相邻配对（字符串替换） | `O(n²)` | `O(n)` | 常规实现 |

