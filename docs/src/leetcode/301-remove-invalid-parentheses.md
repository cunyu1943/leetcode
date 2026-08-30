# [301. 删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses/)

## 一、题目描述

给你一个由若干括号和字母组成的字符串 `s`，删除最小数量的无效括号，使得输入的字符串变成有效的括号字符串。返回所有可能的结果（不重复）。

**示例：**
```
输入：s = "()())()"   输出：["(())()","()()()"]
输入：s = "(a)())()"  输出：["(a)()()","(a())()"]
```

**提示：** `1 <= s.length <= 25`，`s` 由 `'('`、`')'`、小写字母组成。

## 二、解答方法

### 方法一：BFS 求最小删除

**思路：** 先算出需要删除的左/右括号数 `remL, remR`，用 DFS 在恰好删除这么多个后判断合法性，收集有效结果。或 BFS 逐层删除（首次出现合法串的层即最小删除）。

:::::: code-group

```java [Java]
class Solution {
    public List<String> removeInvalidParentheses(String s) {
        Set<String> res = new HashSet<>();
        int remL = 0, remR = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') remL++;
            else if (c == ')') { if (remL > 0) remL--; else remR++; }
        }
        dfs(s, 0, remL, remR, 0, new StringBuilder(), res);
        return new ArrayList<>(res);
    }
    void dfs(String s, int i, int remL, int remR, int open, StringBuilder cur, Set<String> res) {
        if (i == s.length()) {
            if (remL == 0 && remR == 0 && open == 0) res.add(cur.toString());
            return;
        }
        char c = s.charAt(i);
        if (c == '(' && remL > 0) dfs(s, i + 1, remL - 1, remR, open, cur, res);     // 删除
        else if (c == ')' && remR > 0) dfs(s, i + 1, remL, remR - 1, open, cur, res); // 删除
        cur.append(c);
        if (c != '(' && c != ')') dfs(s, i + 1, remL, remR, open, cur, res);
        else if (c == '(') dfs(s, i + 1, remL, remR, open + 1, cur, res);
        else if (open > 0) dfs(s, i + 1, remL, remR, open - 1, cur, res);
        cur.deleteCharAt(cur.length() - 1);
    }
}
```

```python [Python]
class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        import collections
        def valid(x):
            cnt = 0
            for c in x:
                if c == '(': cnt += 1
                elif c == ')':
                    cnt -= 1
                    if cnt < 0: return False
            return cnt == 0
        res, q = set(), {s}
        while q:
            nxt = set()
            for x in q:
                if valid(x): res.add(x)
            if res: return list(res)
            for x in q:
                for i in range(len(x)):
                    if x[i] in '()':
                        nxt.add(x[:i] + x[i+1:])
            q = nxt
        return [""]
```

```cpp [C++]
class Solution {
    set<string> res;
    int remL, remR;
    void dfs(string& s, int i, int rl, int rr, int open, string cur) {
        if (i == s.size()) {
            if (rl == 0 && rr == 0 && open == 0) res.insert(cur);
            return;
        }
        char c = s[i];
        if (c == '(' && rl > 0) dfs(s, i+1, rl-1, rr, open, cur);
        if (c == ')' && rr > 0) dfs(s, i+1, rl, rr-1, open, cur);
        cur.push_back(c);
        if (c != '(' && c != ')') dfs(s, i+1, rl, rr, open, cur);
        else if (c == '(') dfs(s, i+1, rl, rr, open+1, cur);
        else if (open > 0) dfs(s, i+1, rl, rr, open-1, cur);
    }
public:
    vector<string> removeInvalidParentheses(string s) {
        remL = remR = 0;
        for (char c : s) { if (c=='(') remL++; else if (c==')') { if (remL>0) remL--; else remR++; } }
        dfs(s, 0, remL, remR, 0, "");
        return vector<string>(res.begin(), res.end());
    }
};
```

```go [Go]
func removeInvalidParentheses(s string) []string {
    remL, remR := 0, 0
    for _, c := range s {
        if c == '(' { remL++ } else if c == ')' { if remL > 0 { remL-- } else { remR++ } }
    }
    res := map[string]bool{}
    var dfs func(int, int, int, int, string)
    dfs = func(i, rl, rr, open int, cur string) {
        if i == len(s) {
            if rl == 0 && rr == 0 && open == 0 { res[cur] = true }
            return
        }
        c := s[i]
        if c == '(' && rl > 0 { dfs(i+1, rl-1, rr, open, cur) }
        if c == ')' && rr > 0 { dfs(i+1, rl, rr-1, open, cur) }
        cur += string(c)
        if c != '(' && c != ')' { dfs(i+1, rl, rr, open, cur) } else if c == '(' { dfs(i+1, rl, rr, open+1, cur) } else if open > 0 { dfs(i+1, rl, rr, open-1, cur) }
    }
    dfs(0, remL, remR, 0, "")
    out := []string{}
    for k := range res { out = append(out, k) }
    return out
}
```

```js [JavaScript]
var removeInvalidParentheses = function (s) {
    let remL = 0, remR = 0;
    for (const c of s) { if (c === '(') remL++; else if (c === ')') { if (remL > 0) remL--; else remR++; } }
    const res = new Set();
    const dfs = (i, rl, rr, open, cur) => {
        if (i === s.length) { if (rl === 0 && rr === 0 && open === 0) res.add(cur); return; }
        const c = s[i];
        if (c === '(' && rl > 0) dfs(i+1, rl-1, rr, open, cur);
        if (c === ')' && rr > 0) dfs(i+1, rl, rr-1, open, cur);
        cur += c;
        if (c !== '(' && c !== ')') dfs(i+1, rl, rr, open, cur);
        else if (c === '(') dfs(i+1, rl, rr, open+1, cur);
        else if (open > 0) dfs(i+1, rl, rr, open-1, cur);
    };
    dfs(0, remL, remR, 0, "");
    return [...res];
};
```

::::::

**复杂度：** 时间最坏指数级（但删除数很小），空间 `O(结果数)`。

## 三、总结

先统计必须删的左/右括号数，再 DFS 恰好删这些并验证平衡，可保证「最小删除」。BFS 版本则逐层删一个括号，首次全合法即止（层数=最小删除）。注意用 `Set` 去重。同类：`1249 移除无效的括号`（只求一个结果，更简单）。
