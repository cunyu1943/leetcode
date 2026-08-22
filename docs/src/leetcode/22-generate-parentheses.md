# [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)



## 一、题目描述

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。



**示例 1：**

```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

**示例 2：**

```
输入：n = 1
输出：["()"]
```

**提示：**

-   `1 <= n <= 8`



## 二、解答方法

### 2.1 方法一：回溯（按剩余括号数剪枝）

1. **思路**

用 `open`、`close` 分别表示「还能使用的左括号数」和「还能使用的右括号数」，或等价地用「已用左括号数 `left`、已用右括号数 `right`」控制：

-   只要 `left < n` 就可以放左括号（不会无效）；
-   只有 `right < left` 才能放右括号（保证先有左后有右、且数量不超）；
-   当 `left == right == n` 时得到一个完整有效组合，加入结果。

这是带剪枝的回溯，避免生成明显无效的序列。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<String> res = new ArrayList<>();

    public List<String> generateParenthesis(int n) {
        backtrack(new StringBuilder(), 0, 0, n);
        return res;
    }

    private void backtrack(StringBuilder path, int left, int right, int n) {
        if (left == n && right == n) {
            res.add(path.toString());
            return;
        }
        if (left < n) {
            path.append('(');
            backtrack(path, left + 1, right, n);
            path.deleteCharAt(path.length() - 1);
        }
        if (right < left) {
            path.append(')');
            backtrack(path, left, right + 1, n);
            path.deleteCharAt(path.length() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def backtrack(path, left, right):
            if left == n and right == n:
                res.append("".join(path))
                return
            if left < n:
                backtrack(path + ["("], left + 1, right)
            if right < left:
                backtrack(path + [")"], left, right + 1)

        backtrack([], 0, 0)
        return res
```

```go [Go]
func generateParenthesis(n int) []string {
    res := []string{}
    var backtrack func(string, int, int)
    backtrack = func(path string, left, right int) {
        if left == n && right == n {
            res = append(res, path)
            return
        }
        if left < n {
            backtrack(path+"(", left+1, right)
        }
        if right < left {
            backtrack(path+")", left, right+1)
        }
    }
    backtrack("", 0, 0)
    return res
}
```

```c [C]
/* 回溯返回字符串数组在 C 中需手动管理，此处给出思路，完整实现省略 */
```

```cpp [C++]
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        function<void(string, int, int)> backtrack = [&](string path, int left, int right) {
            if (left == n && right == n) {
                res.push_back(path);
                return;
            }
            if (left < n) {
                backtrack(path + '(', left + 1, right);
            }
            if (right < left) {
                backtrack(path + ')', left, right + 1);
            }
        };
        backtrack("", 0, 0);
        return res;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = [];
    const backtrack = (path, left, right) => {
        if (left === n && right === n) {
            res.push(path);
            return;
        }
        if (left < n) backtrack(path + '(', left + 1, right);
        if (right < left) backtrack(path + ')', left, right + 1);
    };
    backtrack('', 0, 0);
    return res;
};
```

```ts [TypeScript]
function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    const backtrack = (path: string, left: number, right: number): void => {
        if (left === n && right === n) {
            res.push(path);
            return;
        }
        if (left < n) backtrack(path + '(', left + 1, right);
        if (right < left) backtrack(path + ')', left, right + 1);
    };
    backtrack('', 0, 0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(4^n / sqrt(n))`，即第 `n` 个卡特兰数对应的合法序列数量（Catalan number）。
- **空间复杂度**：`O(n)`，递归栈深度为 `2n`，结果存储不计。

### 2.2 方法二：动态规划（按位置拼接）

1. **思路**

`n` 对括号的结果可由更小的子问题组合：对任意 `i`（0 ≤ i < n），一个 `n` 对括号可拆成 `"(" + dp[i] + ")" + dp[n-1-i]`。即 `dp[n] = "(" + dp[i] + ")" + dp[n-1-i]` 对所有 `i` 求和。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<String> generateParenthesis(int n) {
        List<List<String>> dp = new ArrayList<>();
        dp.add(Arrays.asList(""));
        for (int k = 1; k <= n; k++) {
            List<String> cur = new ArrayList<>();
            for (int i = 0; i < k; i++) {
                for (String inner : dp.get(i)) {
                    for (String outer : dp.get(k - 1 - i)) {
                        cur.add("(" + inner + ")" + outer);
                    }
                }
            }
            dp.add(cur);
        }
        return dp.get(n);
    }
}
```

```python [Python]
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        dp = [[""]]
        for k in range(1, n + 1):
            cur = []
            for i in range(k):
                for inner in dp[i]:
                    for outer in dp[k - 1 - i]:
                        cur.append("(" + inner + ")" + outer)
            dp.append(cur)
        return dp[n]
```

```go [Go]
func generateParenthesis(n int) []string {
    dp := [][]string{{""}}
    for k := 1; k <= n; k++ {
        cur := []string{}
        for i := 0; i < k; i++ {
            for _, inner := range dp[i] {
                for _, outer := range dp[k-1-i] {
                    cur = append(cur, "("+inner+")"+outer)
                }
            }
        }
        dp = append(dp, cur)
    }
    return dp[n]
}
```

```c [C]
/* 动态规划需返回嵌套字符串数组，C 中内存管理复杂，推荐回溯法 */
```

```cpp [C++]
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<vector<string>> dp(n + 1);
        dp[0] = {""};
        for (int k = 1; k <= n; k++) {
            for (int i = 0; i < k; i++) {
                for (string& inner : dp[i]) {
                    for (string& outer : dp[k - 1 - i]) {
                        dp[k].push_back("(" + inner + ")" + outer);
                    }
                }
            }
        }
        return dp[n];
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const dp = [[""]];
    for (let k = 1; k <= n; k++) {
        const cur = [];
        for (let i = 0; i < k; i++) {
            for (const inner of dp[i]) {
                for (const outer of dp[k - 1 - i]) {
                    cur.push("(" + inner + ")" + outer);
                }
            }
        }
        dp.push(cur);
    }
    return dp[n];
};
```

```ts [TypeScript]
function generateParenthesis(n: number): string[] {
    const dp: string[][] = [[""]];
    for (let k = 1; k <= n; k++) {
        const cur: string[] = [];
        for (let i = 0; i < k; i++) {
            for (const inner of dp[i]) {
                for (const outer of dp[k - 1 - i]) {
                    cur.push("(" + inner + ")" + outer);
                }
            }
        }
        dp.push(cur);
    }
    return dp[n];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(4^n / sqrt(n))`，与回溯一致，生成全部合法序列。
- **空间复杂度**：`O(4^n / sqrt(n))`，存储所有结果（不计则 `O(n)`）。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（按剩余括号数剪枝） | `O(4^n / sqrt(n))` | `O(n)` | 暴力枚举所有可能 |
| 动态规划（按位置拼接） | `O(4^n / sqrt(n))` | `O(4^n / sqrt(n))` | 思路清晰，易推导 |

