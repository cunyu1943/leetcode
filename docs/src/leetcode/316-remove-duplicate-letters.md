# [316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/)

## 一、题目描述

给你一个字符串 `s`，请你去除其中的重复字母，使得每个字母只出现一次，且返回结果的 **字典序最小**（在去重前提下）。

**示例：**
```
输入：s = "bcabc"   输出："abc"
输入：s = "cbacdcbc" 输出："acdb"
```

**提示：** `1 <= s.length <= 10⁴`，`s` 由小写英文字母组成。

## 二、解答方法

### 方法一：单调栈 + 计数

**思路：** 维护一个栈（保证栈内字符升序）。先统计每个字符剩余出现次数。遍历字符 `c`：
- 若 `c` 已在栈中则跳过（去重）；
- 否则，当栈顶 `> c` 且栈顶字符在后面还会出现（剩余计数 > 0），则弹出栈顶（为了让更小的 `c` 靠前）；再压入 `c`。
用 `inStack` 数组避免重复。

:::::: code-group

```java [Java]
class Solution {
    public String removeDuplicateLetters(String s) {
        int[] last = new int[26], inStack = new int[26];
        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
        Deque<Character> st = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (inStack[c - 'a'] == 1) continue;
            while (!st.isEmpty() && st.peek() > c && last[st.peek() - 'a'] > i) {
                inStack[st.pop() - 'a'] = 0;
            }
            st.push(c); inStack[c - 'a'] = 1;
        }
        StringBuilder sb = new StringBuilder();
        for (char c : st) sb.append(c);
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        last = {c: i for i, c in enumerate(s)}
        stack, inStack = [], set()
        for i, c in enumerate(s):
            if c in inStack: continue
            while stack and stack[-1] > c and last[stack[-1]] > i:
                inStack.discard(stack.pop())
            stack.append(c); inStack.add(c)
        return "".join(stack)
```

```cpp [C++]
class Solution {
public:
    string removeDuplicateLetters(string s) {
        int last[26] = {0}, inStack[26] = {0};
        for (int i=0;i<s.size();i++) last[s[i]-'a']=i;
        string st;
        for (int i=0;i<s.size();i++){
            char c=s[i];
            if (inStack[c-'a']) continue;
            while(!st.empty() && st.back()>c && last[st.back()-'a']>i) { inStack[st.back()-'a']=0; st.pop_back(); }
            st.push_back(c); inStack[c-'a']=1;
        }
        return st;
    }
};
```

```go [Go]
func removeDuplicateLetters(s string) string {
    last := [26]int{}; inStack := [26]bool{}
    for i, c := range s { last[c-'a'] = i }
    stack := []byte{}
    for i := 0; i < len(s); i++ {
        c := s[i]
        if inStack[c-'a'] { continue }
        for len(stack) > 0 && stack[len(stack)-1] > c && last[stack[len(stack)-1]-'a'] > i {
            inStack[stack[len(stack)-1]-'a'] = false
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, c); inStack[c-'a'] = true
    }
    return string(stack)
}
```

```js [JavaScript]
var removeDuplicateLetters = function (s) {
    const last = {}; for (let i=0;i<s.length;i++) last[s[i]] = i;
    const stack = []; const inStack = new Set();
    for (let i=0;i<s.length;i++) {
        const c = s[i];
        if (inStack.has(c)) continue;
        while (stack.length && stack[stack.length-1] > c && last[stack[stack.length-1]] > i) {
            inStack.delete(stack.pop());
        }
        stack.push(c); inStack.add(c);
    }
    return stack.join('');
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(26)`。

## 三、总结

「去重 + 字典序最小」= 单调栈经典题。核心是：遇到更小的 `c` 时，只要栈顶字符后面还会再来就弹出，保证 `c` 尽量靠前，同时不丢失栈顶字符。同模板可解 `1081 不同字符的最小子序列`（完全一致）。记忆：`last` 数组记录最后出现位置 + `inStack` 去重。
