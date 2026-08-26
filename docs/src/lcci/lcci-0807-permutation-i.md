# [面试题 08.07. 无重复字符串的排列组合](https://leetcode.cn/problems/permutation-i-lcci/)

## 一、题目描述

无重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合，字符串每个字符均不相同。

**示例 1：**

```
输入：S = "qwe"
输出：["qwe", "qew", "wqe", "weq", "ewq", "eqw"]
```

**示例 2：**

```
输入：S = "ab"
输出：["ab", "ba"]
```

**提示：**

- 字符都是英文字母。
- 字符串长度在 `[1, 9]` 之间。

---

## 二、解答方法

### 2.1 方法一：回溯（交换法）

**1. 思路**

用回溯在字符串上原地交换：固定前缀 `[0, i-1]`，对位置 `i` 依次与 `[i, n-1]` 的每个位置交换，再递归处理 `i+1`。当 `i == n` 时得到一种全排列。由于字符互不相同，无需去重。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String[] permutation(String S) {
        List<String> res = new ArrayList<>();
        char[] cs = S.toCharArray();
        backtrack(cs, 0, res);
        return res.toArray(new String[0]);
    }
    private void backtrack(char[] cs, int i, List<String> res) {
        if (i == cs.length) {
            res.add(new String(cs));
            return;
        }
        for (int j = i; j < cs.length; j++) {
            swap(cs, i, j);
            backtrack(cs, i + 1, res);
            swap(cs, i, j);
        }
    }
    private void swap(char[] cs, int a, int b) {
        char t = cs[a]; cs[a] = cs[b]; cs[b] = t;
    }
}
```

```python [Python]
class Solution:
    def permutation(self, S: str) -> List[str]:
        res = []
        cs = list(S)
        def backtrack(i):
            if i == len(cs):
                res.append("".join(cs))
                return
            for j in range(i, len(cs)):
                cs[i], cs[j] = cs[j], cs[i]
                backtrack(i + 1)
                cs[i], cs[j] = cs[j], cs[i]
        backtrack(0)
        return res
```

```go [Go]
func permutation(S string) []string {
	cs := []byte(S)
	res := []string{}
	var backtrack func(int)
	backtrack = func(i int) {
		if i == len(cs) {
			res = append(res, string(cs))
			return
		}
		for j := i; j < len(cs); j++ {
			cs[i], cs[j] = cs[j], cs[i]
			backtrack(i + 1)
			cs[i], cs[j] = cs[j], cs[i]
		}
	}
	backtrack(0)
	return res
}
```

```c [C]
#include <string.h>
#include <stdlib.h>

static char** g_res;
static int g_idx;
static char* g_cs;

void backtrack(int i, int n) {
    if (i == n) {
        g_res[g_idx] = (char*)malloc((n + 1) * sizeof(char));
        strcpy(g_res[g_idx], g_cs);
        g_idx++;
        return;
    }
    for (int j = i; j < n; j++) {
        char t = g_cs[i]; g_cs[i] = g_cs[j]; g_cs[j] = t;
        backtrack(i + 1, n);
        t = g_cs[i]; g_cs[i] = g_cs[j]; g_cs[j] = t;
    }
}

char** permutation(char* S, int* returnSize) {
    int n = strlen(S);
    int total = 1;
    for (int i = 2; i <= n; i++) total *= i;
    g_res = (char**)malloc(total * sizeof(char*));
    g_cs = (char*)malloc((n + 1) * sizeof(char));
    strcpy(g_cs, S);
    g_idx = 0;
    backtrack(0, n);
    *returnSize = total;
    free(g_cs);
    return g_res;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> permutation(string S) {
        vector<string> res;
        char* cs = &S[0];
        function<void(int)> backtrack = [&](int i) {
            if (i == S.size()) {
                res.push_back(S);
                return;
            }
            for (int j = i; j < S.size(); j++) {
                swap(cs[i], cs[j]);
                backtrack(i + 1);
                swap(cs[i], cs[j]);
            }
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function (S) {
    const cs = S.split('');
    const res = [];
    const backtrack = (i) => {
        if (i === cs.length) {
            res.push(cs.join(''));
            return;
        }
        for (let j = i; j < cs.length; j++) {
            [cs[i], cs[j]] = [cs[j], cs[i]];
            backtrack(i + 1);
            [cs[i], cs[j]] = [cs[j], cs[i]];
        }
    };
    backtrack(0);
    return res;
};
```

```typescript [TypeScript]
function permutation(S: string): string[] {
    const cs: string[] = S.split('');
    const res: string[] = [];
    const backtrack = (i: number): void => {
        if (i === cs.length) {
            res.push(cs.join(''));
            return;
        }
        for (let j = i; j < cs.length; j++) {
            [cs[i], cs[j]] = [cs[j], cs[i]];
            backtrack(i + 1);
            [cs[i], cs[j]] = [cs[j], cs[i]];
        }
    };
    backtrack(0);
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * n!)`，共 `n!` 个排列，每个拼接成本 `O(n)`。
- **空间复杂度**：`O(n)` 递归栈（不含结果）。

---

### 2.2 方法二：逐位插入（构建法）

**1. 思路**

已知 `k` 个字符的所有排列，要在每个排列的「每个可能位置」插入第 `k+1` 个字符，即可得到 `k+1` 个字符的全排列。从长度为 1 开始递推，直至处理完整个字符串。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String[] permutation(String S) {
        List<String> res = new ArrayList<>();
        res.add(S.substring(0, 1));
        for (int i = 1; i < S.length(); i++) {
            List<String> next = new ArrayList<>();
            char c = S.charAt(i);
            for (String s : res) {
                for (int j = 0; j <= s.length(); j++) {
                    next.add(s.substring(0, j) + c + s.substring(j));
                }
            }
            res = next;
        }
        return res.toArray(new String[0]);
    }
}
```

```python [Python]
class Solution:
    def permutation(self, S: str) -> List[str]:
        res = [S[0]]
        for i in range(1, len(S)):
            nxt = []
            c = S[i]
            for s in res:
                for j in range(len(s) + 1):
                    nxt.append(s[:j] + c + s[j:])
            res = nxt
        return res
```

```go [Go]
func permutation(S string) []string {
	res := []string{S[0:1]}
	for i := 1; i < len(S); i++ {
		nxt := []string{}
		c := string(S[i])
		for _, s := range res {
			for j := 0; j <= len(s); j++ {
				nxt = append(nxt, s[:j]+c+s[j:])
			}
		}
		res = nxt
	}
	return res
}
```

```c [C]
#include <string.h>
#include <stdlib.h>

char** permutation(char* S, int* returnSize) {
    int n = strlen(S);
    int total = 1;
    for (int i = 2; i <= n; i++) total *= i;
    char** res = (char**)malloc(total * sizeof(char*));
    int idx = 0;
    // 初始一个排列
    char* init = (char*)malloc(2 * sizeof(char));
    init[0] = S[0]; init[1] = '\0';
    char** cur = (char**)malloc((total + 1) * sizeof(char*));
    int curCnt = 1;
    cur[0] = init;
    for (int i = 1; i < n; i++) {
        char** nxt = (char**)malloc((total + 1) * sizeof(char*));
        int nxtCnt = 0;
        for (int k = 0; k < curCnt; k++) {
            int len = strlen(cur[k]);
            for (int j = 0; j <= len; j++) {
                char* s = (char*)malloc((len + 2) * sizeof(char));
                int p = 0;
                for (int m = 0; m < j; m++) s[p++] = cur[k][m];
                s[p++] = S[i];
                for (int m = j; m < len; m++) s[p++] = cur[k][m];
                s[p] = '\0';
                nxt[nxtCnt++] = s;
            }
            free(cur[k]);
        }
        free(cur);
        cur = nxt;
        curCnt = nxtCnt;
    }
    for (int i = 0; i < curCnt; i++) res[idx++] = cur[i];
    *returnSize = idx;
    free(cur);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> permutation(string S) {
        vector<string> res = {S.substr(0, 1)};
        for (int i = 1; i < S.size(); i++) {
            vector<string> nxt;
            char c = S[i];
            for (string& s : res) {
                for (int j = 0; j <= s.size(); j++) {
                    nxt.push_back(s.substr(0, j) + c + s.substr(j));
                }
            }
            res = nxt;
        }
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function (S) {
    let res = [S[0]];
    for (let i = 1; i < S.length; i++) {
        const nxt = [];
        const c = S[i];
        for (const s of res) {
            for (let j = 0; j <= s.length; j++) {
                nxt.push(s.slice(0, j) + c + s.slice(j));
            }
        }
        res = nxt;
    }
    return res;
};
```

```typescript [TypeScript]
function permutation(S: string): string[] {
    let res: string[] = [S[0]];
    for (let i = 1; i < S.length; i++) {
        const nxt: string[] = [];
        const c = S[i];
        for (const s of res) {
            for (let j = 0; j <= s.length; j++) {
                nxt.push(s.slice(0, j) + c + s.slice(j));
            }
        }
        res = nxt;
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n * n!)`。
- **空间复杂度**：`O(n * n!)`（结果存储）。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                       |
| -------- | ---------- | ---------- | -------------------------- |
| 回溯交换 | `O(n*n!)`  | `O(n)`     | 原地交换，空间优，推荐     |
| 逐位插入 | `O(n*n!)`  | `O(n*n!)`  | 思路直观，贴合官方提示     |

**推荐解法**：回溯交换法。利用交换在字符串上原地生成排列，递归栈深度 `O(n)`，无需额外存储中间结果集，空间效率最佳。字符互不相同，因此不需要像「有重复字符串排列」那样做去重剪枝。
