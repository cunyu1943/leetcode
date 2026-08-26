# [面试题 08.14. 布尔运算](https://leetcode.cn/problems/boolean-evaluation-lcci/)

## 一、题目描述

给定一个布尔表达式和一个期望的布尔结果 `result`，布尔表达式由 `0` (false)、`1` (true)、`&` (AND)、`|` (OR) 和 `^` (XOR) 符号组成。实现一个函数，算出有几种可使该表达式得出 `result` 值的括号方法。

**示例 1：**

```
输入：s = "1^0|0|1", result = 0
输出：2
解释：两种可能的括号方法：
  - 1^(0|(0|1))
  - 1^((0|0)|1)
```

**示例 2：**

```
输入：s = "0&0&0&1^1|0", result = 1
输出：10
```

**提示：**

- 运算符的数量不超过 19 个。

---

## 二、解答方法

### 2.1 方法一：区间 DP + 记忆化（推荐）

**1. 思路**

把表达式按运算符切成「左子表达式」和「右子表达式」。定义 `dfs(i, j, want)` 表示子串 `[i..j]` 计算得到布尔值 `want` 的括号方案数。

- 基线：子串长度为 1（只有 `0` 或 `1`），若 `want == (s[i]=='1')` 则方案数为 1，否则 0。
- 递归：枚举子串内每个运算符 `k`，把表达式分为左右两部分，分别求出左部能算出 `true`/`false` 的方案数（记为 `lT`、`lF`，右部 `rT`、`rF`）。根据运算符把左右结果组合：
  - `&`：`want` 为 true 时方案数 `lT*rT`；为 false 时 `lT*rF + lF*rT + lF*rF`。
  - `|`：`want` 为 true 时 `lT*rT + lT*rF + lF*rT`；为 false 时 `lF*rF`。
  - `^`：`want` 为 true 时 `lT*rF + lF*rT`；为 false 时 `lT*rT + lF*rF`。
- 用三维 `memo[i][j][want]` 缓存避免重复。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    private String s;
    private Integer[][][] memo;
    public int countEval(String s, int result) {
        this.s = s;
        int n = s.length();
        memo = new Integer[n][n][2];
        return dfs(0, n - 1, result == 1);
    }
    private int dfs(int i, int j, boolean want) {
        if (i == j) return (s.charAt(i) == '1') == want ? 1 : 0;
        if (memo[i][j][want ? 1 : 0] != null) return memo[i][j][want ? 1 : 0];
        int ans = 0;
        for (int k = i + 1; k < j; k += 2) {
            char op = s.charAt(k);
            int lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
            int rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
            if (op == '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
            else if (op == '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
            else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
        }
        return memo[i][j][want ? 1 : 0] = ans;
    }
}
```

```python [Python]
class Solution:
    def countEval(self, s: str, result: int) -> int:
        from functools import lru_cache
        @lru_cache(None)
        def dfs(i, j, want):
            if i == j:
                return 1 if (s[i] == '1') == want else 0
            ans = 0
            for k in range(i + 1, j, 2):
                op = s[k]
                lT = dfs(i, k - 1, True); lF = dfs(i, k - 1, False)
                rT = dfs(k + 1, j, True); rF = dfs(k + 1, j, False)
                if op == '&':
                    ans += lT * rT if want else lT * rF + lF * rT + lF * rF
                elif op == '|':
                    ans += (lT * rT + lT * rF + lF * rT) if want else lF * rF
                else:  # ^
                    ans += (lT * rF + lF * rT) if want else lT * rT + lF * rF
            return ans
        return dfs(0, len(s) - 1, result == 1)
```

```go [Go]
func countEval(s string, result int) int {
	n := len(s)
	memo := make([][][2]int, n)
	for i := range memo {
		memo[i] = make([][2]int, n)
		for j := range memo[i] {
			memo[i][j] = [2]int{-1, -1}
		}
	}
	var dfs func(int, int, bool) int
	dfs = func(i, j int, want bool) int {
		if i == j {
			return boolToInt((s[i] == '1') == want)
		}
		w := 0
		if want {
			w = 1
		}
		if memo[i][j][w] != -1 {
			return memo[i][j][w]
		}
		ans := 0
		for k := i + 1; k < j; k += 2 {
			op := s[k]
			lT, lF := dfs(i, k-1, true), dfs(i, k-1, false)
			rT, rF := dfs(k+1, j, true), dfs(k+1, j, false)
			switch op {
			case '&':
				if want {
					ans += lT * rT
				} else {
					ans += lT*rF + lF*rT + lF*rF
				}
			case '|':
				if want {
					ans += lT*rT + lT*rF + lF*rT
				} else {
					ans += lF * rF
				}
			case '^':
				if want {
					ans += lT*rF + lF*rT
				} else {
					ans += lT*rT + lF*rF
				}
			}
		}
		memo[i][j][w] = ans
		return ans
	}
	return dfs(0, n-1, result == 1)
}
func boolToInt(b bool) int { if b { return 1 }; return 0 }
```

```c [C]
int dfs(char* s, int i, int j, int want, int*** memo) {
    if (i == j) return ((s[i] == '1') == want) ? 1 : 0;
    if (memo[i][j][want] != -1) return memo[i][j][want];
    int ans = 0;
    for (int k = i + 1; k < j; k += 2) {
        char op = s[k];
        int lT = dfs(s, i, k - 1, 1, memo);
        int lF = dfs(s, i, k - 1, 0, memo);
        int rT = dfs(s, k + 1, j, 1, memo);
        int rF = dfs(s, k + 1, j, 0, memo);
        if (op == '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
        else if (op == '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
        else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
    }
    memo[i][j][want] = ans;
    return ans;
}
int countEval(char* s, int result) {
    int n = strlen(s);
    int*** memo = (int***)malloc(n * sizeof(int**));
    for (int i = 0; i < n; i++) {
        memo[i] = (int**)malloc(n * sizeof(int*));
        for (int j = 0; j < n; j++) {
            memo[i][j] = (int*)malloc(2 * sizeof(int));
            memo[i][j][0] = memo[i][j][1] = -1;
        }
    }
    int ans = dfs(s, 0, n - 1, result == 1, memo);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) free(memo[i][j]);
        free(memo[i]);
    }
    free(memo);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int countEval(string s, int result) {
        int n = s.size();
        vector<vector<vector<int>>> memo(n, vector<vector<int>>(n, vector<int>(2, -1)));
        function<int(int, int, bool)> dfs = [&](int i, int j, bool want) -> int {
            if (i == j) return ((s[i] == '1') == want) ? 1 : 0;
            if (memo[i][j][want] != -1) return memo[i][j][want];
            int ans = 0;
            for (int k = i + 1; k < j; k += 2) {
                char op = s[k];
                int lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
                int rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
                if (op == '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
                else if (op == '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
                else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
            }
            return memo[i][j][want] = ans;
        };
        return dfs(0, n - 1, result == 1);
    }
};
```

```javascript [JavaScript]
/**
 * @param {string} s
 * @param {number} result
 * @return {number}
 */
var countEval = function (s, result) {
    const n = s.length;
    const memo = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => [undefined, undefined])
    );
    const dfs = (i, j, want) => {
        if (i === j) return (s[i] === '1') === want ? 1 : 0;
        if (memo[i][j][want ? 1 : 0] !== undefined) return memo[i][j][want ? 1 : 0];
        let ans = 0;
        for (let k = i + 1; k < j; k += 2) {
            const op = s[k];
            const lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
            const rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
            if (op === '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
            else if (op === '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
            else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
        }
        return memo[i][j][want ? 1 : 0] = ans;
    };
    return dfs(0, n - 1, result === 1);
};
```

```typescript [TypeScript]
function countEval(s: string, result: number): number {
    const n = s.length;
    const memo: (number | undefined)[][][] = Array.from({ length: n },
        () => Array.from({ length: n }, () => [undefined, undefined] as (number | undefined)[]));
    const dfs = (i: number, j: number, want: boolean): number => {
        if (i === j) return (s[i] === '1') === want ? 1 : 0;
        if (memo[i][j][want ? 1 : 0] !== undefined) return memo[i][j][want ? 1 : 0]!;
        let ans = 0;
        for (let k = i + 1; k < j; k += 2) {
            const op = s[k];
            const lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
            const rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
            if (op === '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
            else if (op === '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
            else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
        }
        return memo[i][j][want ? 1 : 0] = ans;
    };
    return dfs(0, n - 1, result === 1);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n^3)`，子串 `O(n^2)` 个，每个枚举运算符 `O(n)`。
- **空间复杂度**：`O(n^2)` 记忆化表。

---

### 2.2 方法二：朴素递归（无记忆化，仅作对比）

**1. 思路**

去掉 `memo` 缓存，每次直接暴力递归枚举所有括号划分。虽然代码更短，但会产生大量重复子问题，指数级时间，仅用于理解递归结构，不推荐作为正式解法。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int countEval(String s, int result) {
        return dfs(s, 0, s.length() - 1, result == 1);
    }
    private int dfs(String s, int i, int j, boolean want) {
        if (i == j) return (s.charAt(i) == '1') == want ? 1 : 0;
        int ans = 0;
        for (int k = i + 1; k < j; k += 2) {
            char op = s.charAt(k);
            int lT = dfs(s, i, k - 1, true), lF = dfs(s, i, k - 1, false);
            int rT = dfs(s, k + 1, j, true), rF = dfs(s, k + 1, j, false);
            if (op == '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
            else if (op == '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
            else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def countEval(self, s: str, result: int) -> int:
        def dfs(i, j, want):
            if i == j:
                return 1 if (s[i] == '1') == want else 0
            ans = 0
            for k in range(i + 1, j, 2):
                op = s[k]
                lT, lF = dfs(i, k - 1, True), dfs(i, k - 1, False)
                rT, rF = dfs(k + 1, j, True), dfs(k + 1, j, False)
                if op == '&':
                    ans += lT * rT if want else lT * rF + lF * rT + lF * rF
                elif op == '|':
                    ans += (lT * rT + lT * rF + lF * rT) if want else lF * rF
                else:
                    ans += (lT * rF + lF * rT) if want else lT * rT + lF * rF
            return ans
        return dfs(0, len(s) - 1, result == 1)
```

```go [Go]
func countEval(s string, result int) int {
	var dfs func(int, int, bool) int
	dfs = func(i, j int, want bool) int {
		if i == j {
			if (s[i] == '1') == want {
				return 1
			}
			return 0
		}
		ans := 0
		for k := i + 1; k < j; k += 2 {
			op := s[k]
			lT, lF := dfs(i, k-1, true), dfs(i, k-1, false)
			rT, rF := dfs(k+1, j, true), dfs(k+1, j, false)
			switch op {
			case '&':
				if want {
					ans += lT * rT
				} else {
					ans += lT*rF + lF*rT + lF*rF
				}
			case '|':
				if want {
					ans += lT*rT + lT*rF + lF*rT
				} else {
					ans += lF * rF
				}
			case '^':
				if want {
					ans += lT*rF + lF*rT
				} else {
					ans += lT*rT + lF*rF
				}
			}
		}
		return ans
	}
	return dfs(0, len(s)-1, result == 1)
}
```

```c [C]
int dfs(char* s, int i, int j, int want) {
    if (i == j) return ((s[i] == '1') == want) ? 1 : 0;
    int ans = 0;
    for (int k = i + 1; k < j; k += 2) {
        char op = s[k];
        int lT = dfs(s, i, k - 1, 1), lF = dfs(s, i, k - 1, 0);
        int rT = dfs(s, k + 1, j, 1), rF = dfs(s, k + 1, j, 0);
        if (op == '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
        else if (op == '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
        else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
    }
    return ans;
}
int countEval(char* s, int result) {
    return dfs(s, 0, strlen(s) - 1, result == 1);
}
```

```cpp [C++]
class Solution {
public:
    int countEval(string s, int result) {
        function<int(int, int, bool)> dfs = [&](int i, int j, bool want) -> int {
            if (i == j) return ((s[i] == '1') == want) ? 1 : 0;
            int ans = 0;
            for (int k = i + 1; k < j; k += 2) {
                char op = s[k];
                int lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
                int rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
                if (op == '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
                else if (op == '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
                else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
            }
            return ans;
        };
        return dfs(0, s.size() - 1, result == 1);
    }
};
```

```javascript [JavaScript]
/**
 * @param {string} s
 * @param {number} result
 * @return {number}
 */
var countEval = function (s, result) {
    const dfs = (i, j, want) => {
        if (i === j) return (s[i] === '1') === want ? 1 : 0;
        let ans = 0;
        for (let k = i + 1; k < j; k += 2) {
            const op = s[k];
            const lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
            const rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
            if (op === '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
            else if (op === '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
            else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
        }
        return ans;
    };
    return dfs(0, s.length - 1, result === 1);
};
```

```typescript [TypeScript]
function countEval(s: string, result: number): number {
    const dfs = (i: number, j: number, want: boolean): number => {
        if (i === j) return (s[i] === '1') === want ? 1 : 0;
        let ans = 0;
        for (let k = i + 1; k < j; k += 2) {
            const op = s[k];
            const lT = dfs(i, k - 1, true), lF = dfs(i, k - 1, false);
            const rT = dfs(k + 1, j, true), rF = dfs(k + 1, j, false);
            if (op === '&') ans += want ? lT * rT : lT * rF + lF * rT + lF * rF;
            else if (op === '|') ans += want ? lT * rT + lT * rF + lF * rT : lF * rF;
            else ans += want ? lT * rF + lF * rT : lT * rT + lF * rF;
        }
        return ans;
    };
    return dfs(0, s.length - 1, result === 1);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(2^n)`，无记忆化时指数级。
- **空间复杂度**：`O(n)` 递归栈。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                         |
| ------------ | ---------- | ---------- | ---------------------------- |
| 区间DP+记忆化 | `O(n^3)`   | `O(n^2)`   | 利用重复子问题，正式解法，推荐 |
| 朴素递归     | `O(2^n)`   | `O(n)`     | 仅用于理解递归结构，不可用于大输入 |

**推荐解法**：方法一（区间 DP + 记忆化）。核心是把表达式按每个运算符切分左右，递归求左右子表达式算出 true/false 的方案数，再按 `&/|/^` 的规则组合。务必用 `memo[i][j][want]` 缓存，否则指数级超时。注意运算符位置在奇数下标（`0,2,4...` 是数字，`1,3,5...` 是运算符），循环步长为 2。
