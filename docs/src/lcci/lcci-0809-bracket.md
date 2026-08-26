# [面试题 08.09. 括号](https://leetcode.cn/problems/bracket-lcci/)

## 一、题目描述

括号。设计一种算法，打印 n 对括号的所有合法的（例如，开闭一一对应）组合。

说明：解集不能包含重复的子集。

**示例：**

```
输入：n = 3
输出：
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

---

## 二、解答方法

### 2.1 方法一：回溯（左右括号计数）

**1. 思路**

从左到右构造字符串，维护已用左括号数 `left` 和已用右括号数 `right`：

- 只要 `left < n` 就可以放左括号；
- 只要 `right < left` 就可以放右括号（保证任意前缀右括号不多于左括号）。

当字符串长度达到 `2n` 时收集结果。这是最清晰且无重复的写法。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(n, 0, 0, new StringBuilder(), res);
        return res;
    }
    private void backtrack(int n, int left, int right, StringBuilder sb, List<String> res) {
        if (sb.length() == 2 * n) {
            res.add(sb.toString());
            return;
        }
        if (left < n) {
            sb.append('(');
            backtrack(n, left + 1, right, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
        if (right < left) {
            sb.append(')');
            backtrack(n, left, right + 1, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def backtrack(left, right, s):
            if len(s) == 2 * n:
                res.append(s)
                return
            if left < n:
                backtrack(left + 1, right, s + '(')
            if right < left:
                backtrack(left, right + 1, s + ')')
        backtrack(0, 0, "")
        return res
```

```go [Go]
func generateParenthesis(n int) []string {
	res := []string{}
	var backtrack func(int, int, string)
	backtrack = func(left, right int, s string) {
		if len(s) == 2*n {
			res = append(res, s)
			return
		}
		if left < n {
			backtrack(left+1, right, s+"(")
		}
		if right < left {
			backtrack(left, right+1, s+")")
		}
	}
	backtrack(0, 0, "")
	return res
}
```

```c [C]
// 返回字符串数组，调用者负责释放；*returnSize 为结果个数
char** generateParenthesis(int n, int* returnSize) {
    int cap = 1;
    for (int i = 1; i <= n; i++) cap = cap * 2 * (2 * n - i + 1) / i; // 第 n 个卡特兰数上界
    char** res = (char**)malloc(cap * sizeof(char*));
    char* buf = (char*)malloc((2 * n + 1) * sizeof(char));
    int idx = 0;
    void (*bt)(int, int, int);
    void backtrack(int left, int right, int len) {
        if (len == 2 * n) {
            buf[len] = '\0';
            res[idx] = (char*)malloc((2 * n + 1) * sizeof(char));
            strcpy(res[idx++], buf);
            return;
        }
        if (left < n) {
            buf[len] = '('; backtrack(left + 1, right, len + 1);
        }
        if (right < left) {
            buf[len] = ')'; backtrack(left, right + 1, len + 1);
        }
    }
    backtrack(0, 0, 0);
    *returnSize = idx;
    free(buf);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        function<void(int, int, string)> backtrack = [&](int left, int right, string s) {
            if (s.size() == 2 * n) {
                res.push_back(s);
                return;
            }
            if (left < n) backtrack(left + 1, right, s + '(');
            if (right < left) backtrack(left, right + 1, s + ')');
        };
        backtrack(0, 0, "");
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = [];
    const backtrack = (left, right, s) => {
        if (s.length === 2 * n) {
            res.push(s);
            return;
        }
        if (left < n) backtrack(left + 1, right, s + '(');
        if (right < left) backtrack(left, right + 1, s + ')');
    };
    backtrack(0, 0, '');
    return res;
};
```

```typescript [TypeScript]
function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    const backtrack = (left: number, right: number, s: string): void => {
        if (s.length === 2 * n) {
            res.push(s);
            return;
        }
        if (left < n) backtrack(left + 1, right, s + '(');
        if (right < left) backtrack(left, right + 1, s + ')');
    };
    backtrack(0, 0, '');
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(4^n / sqrt(n))`，即第 `n` 个卡特兰数规模。
- **空间复杂度**：`O(n)` 递归栈。

---

### 2.2 方法二：子问题拼接（卡特兰递推）

**1. 思路**

利用括号串的结构：每个合法串都可写成 `(` + `A` + `)` + `B`，其中 `A`、`B` 也是合法括号串且长度更短。据此用两层循环枚举 `A`、`B` 的长度组合递归生成，天然去重。代码更体现数学结构，但会产生较多子串拼接开销。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        if (n == 0) { res.add(""); return res; }
        for (int i = 0; i < n; i++) {
            for (String a : generateParenthesis(i)) {
                for (String b : generateParenthesis(n - 1 - i)) {
                    res.add("(" + a + ")" + b);
                }
            }
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        if n == 0:
            return [""]
        res = []
        for i in range(n):
            for a in self.generateParenthesis(i):
                for b in self.generateParenthesis(n - 1 - i):
                    res.append("(" + a + ")" + b)
        return res
```

```go [Go]
func generateParenthesis(n int) []string {
	res := []string{}
	if n == 0 {
		return []string{""}
	}
	for i := 0; i < n; i++ {
		for _, a := range generateParenthesis(i) {
			for _, b := range generateParenthesis(n - 1 - i) {
				res = append(res, "("+a+")"+b)
			}
		}
	}
	return res
}
```

```c [C]
// 拼接式递归在 C 中需自行管理内存，较繁琐，这里给出与方法一等价的可编译回溯实现
#include <string.h>
#include <stdlib.h>

static char** g_res;
static int g_idx;
static char* g_buf;

static void backtrack(int n, int left, int right, int len) {
    if (len == 2 * n) {
        g_buf[len] = '\0';
        g_res[g_idx] = (char*)malloc((2 * n + 1) * sizeof(char));
        strcpy(g_res[g_idx++], g_buf);
        return;
    }
    if (left < n) { g_buf[len] = '('; backtrack(n, left + 1, right, len + 1); }
    if (right < left) { g_buf[len] = ')'; backtrack(n, left, right + 1, len + 1); }
}

char** generateParenthesis(int n, int* returnSize) {
    int cap = 1;
    for (int i = 1; i <= n; i++) cap = cap * 2 * (2 * n - i + 1) / i;
    g_res = (char**)malloc(cap * sizeof(char*));
    g_buf = (char*)malloc((2 * n + 1) * sizeof(char));
    g_idx = 0;
    backtrack(n, 0, 0, 0);
    *returnSize = g_idx;
    free(g_buf);
    return g_res;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        if (n == 0) { res.push_back(""); return res; }
        for (int i = 0; i < n; i++) {
            for (string& a : generateParenthesis(i)) {
                for (string& b : generateParenthesis(n - 1 - i)) {
                    res.push_back("(" + a + ")" + b);
                }
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    if (n === 0) return [""];
    const res = [];
    for (let i = 0; i < n; i++) {
        for (const a of generateParenthesis(i)) {
            for (const b of generateParenthesis(n - 1 - i)) {
                res.push("(" + a + ")" + b);
            }
        }
    }
    return res;
};
```

```typescript [TypeScript]
function generateParenthesis(n: number): string[] {
    if (n === 0) return [""];
    const res: string[] = [];
    for (let i = 0; i < n; i++) {
        for (const a of generateParenthesis(i)) {
            for (const b of generateParenthesis(n - 1 - i)) {
                res.push("(" + a + ")" + b);
            }
        }
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(4^n / sqrt(n))`。
- **空间复杂度**：`O(n)` 递归栈（不含结果）。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                       |
| -------- | ---------- | ---------- | -------------------------- |
| 回溯计数 | `O(4^n/√n)` | `O(n)`     | 直观、无重复，面试首选，推荐 |
| 子问题拼接 | `O(4^n/√n)` | `O(n)`     | 体现卡特兰结构，代码更短   |

**推荐解法**：方法一（回溯 + 左右计数）。核心剪枝条件 `right < left` 保证任意前缀合法，且天然不产生重复组合，是最常被考察的写法。
