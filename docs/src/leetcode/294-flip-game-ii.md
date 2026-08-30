# [294. 翻转游戏 II](https://leetcode.cn/problems/flip-game-ii/) [🔒 会员题]

## 一、题目描述

你和朋友玩「翻转游戏」：给定一个只包含 `+` 和 `-` 的字符串，两人轮流把连续的两个 `++` 翻成 `--`，无法操作者输。

给定初始字符串 `currentState`，假设双方都采取 **最优策略**，如果 **先手**（你）能确保获胜，返回 `true`；否则返回 `false`。

**示例：**

```
输入：currentState = "++++"   输出：true
解释：先手翻 (0,1) 得到 "--++"，对手只能翻 (2,3) 得到 "----"，先手无步可走 → 对手输，先手赢
```

**提示：** `1 <= currentState.length <= 60`，`currentState[i]` 为 `+` 或 `-`。

## 二、解答方法

### 方法一：记忆化搜索（Minimax）

**思路：** 博弈树搜索。`canWin(s)` = 是否存在一步合法翻转，使翻转后的局面 `s'` 对手 **不能赢**（即 `!canWin(s')`）。递归 + 记忆化（`HashMap` 缓存已算过的局面）避免重复计算。

- 遍历所有 `++`，翻转一步得到 `s'`；
- 若 `!canWin(s')` 为真（对手输了），则当前先手必胜，立即返回 true；
- 都试过仍不能赢，返回 false。

:::::: code-group

```java [Java]
class Solution {
    private Map<String, Boolean> memo = new HashMap<>();
    public boolean canWin(String currentState) {
        if (memo.containsKey(currentState)) return memo.get(currentState);
        char[] arr = currentState.toCharArray();
        for (int i = 0; i + 1 < arr.length; i++) {
            if (arr[i] == '+' && arr[i + 1] == '+') {
                arr[i] = arr[i + 1] = '-';
                String next = new String(arr);
                boolean oppLose = !canWin(next);   // 对手必败 → 我方必胜
                arr[i] = arr[i + 1] = '+';          // 还原
                if (oppLose) {
                    memo.put(currentState, true);
                    return true;
                }
            }
        }
        memo.put(currentState, false);
        return false;
    }
}
```

```python [Python]
class Solution:
    def canWin(self, currentState: str) -> bool:
        from functools import lru_cache
        @lru_cache(None)
        def dfs(s):
            for i in range(len(s) - 1):
                if s[i:i+2] == "++":
                    if not dfs(s[:i] + "--" + s[i+2:]):   # 对手必败
                        return True
            return False
        return dfs(currentState)
```

```cpp [C++]
class Solution {
    unordered_map<string, bool> memo;
public:
    bool canWin(string currentState) {
        if (memo.count(currentState)) return memo[currentState];
        for (int i = 0; i + 1 < currentState.size(); i++) {
            if (currentState[i] == '+' && currentState[i+1] == '+') {
                currentState[i] = currentState[i+1] = '-';
                string next = currentState;
                bool oppLose = !canWin(next);
                currentState[i] = currentState[i+1] = '+';
                if (oppLose) { memo[currentState] = true; return true; }
            }
        }
        memo[currentState] = false;
        return false;
    }
};
```

```go [Go]
func canWin(currentState string) bool {
    memo := map[string]bool{}
    var dfs func(string) bool
    dfs = func(s string) bool {
        if v, ok := memo[s]; ok { return v }
        b := []byte(s)
        for i := 0; i+1 < len(b); i++ {
            if b[i] == '+' && b[i+1] == '+' {
                b[i], b[i+1] = '-', '-'
                next := string(b)
                b[i], b[i+1] = '+', '+'
                if !dfs(next) {
                    memo[s] = true
                    return true
                }
            }
        }
        memo[s] = false
        return false
    }
    return dfs(currentState)
}
```

```js [JavaScript]
var canWin = function (currentState) {
    const memo = new Map();
    const dfs = (s) => {
        if (memo.has(s)) return memo.get(s);
        for (let i = 0; i + 1 < s.length; i++) {
            if (s[i] === '+' && s[i+1] === '+') {
                const next = s.slice(0, i) + "--" + s.slice(i+2);
                if (!dfs(next)) {
                    memo.set(s, true);
                    return true;
                }
            }
        }
        memo.set(s, false);
        return false;
    };
    return dfs(currentState);
};
```

::::::

**复杂度：** 时间取决于不同局面数（记忆化后指数级但有限），空间 `O(局面数)`。

## 三、总结

博弈搜索（Minimax）范式：`canWin(s)` 返回「先手是否能赢」，判定为「是否存在一步使对手 `!canWin(s')`」。核心是 **记忆化**（同一局面重复出现时直接返回缓存结果），否则会超时。本题与 `292 Nim 游戏` 同类，但 292 有数学结论可直接 O(1)，本题需搜索。注意：先手能赢不要求「所有走法都赢」，只要 **存在** 一种走法令对手必败即可。
