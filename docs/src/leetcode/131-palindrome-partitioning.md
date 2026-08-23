# [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)



## 一、题目描述

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是 **回文串**。

返回 `s` 所有可能的分割方案。



**示例 1：**

```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

**示例 2：**

```
输入：s = "a"
输出：[["a"]]
```

**提示：**

- `1 <= s.length <= 16`
- `s` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：回溯（DFS）

1. **思路**

问题本质是枚举所有可能的分割方式，并在每一步只保留「当前子串是回文」的分支，属于典型的回溯搜索。

- 从字符串起点 `start` 开始，枚举结束位置 `i`（从 `start` 到末尾）；
- 截取子串 `s[start..i]`，若它是回文串，则将其加入当前路径 `path`；
- 递归处理剩余部分 `s[i+1..]`；
- 递归到底（`start == s.length`）时，把 `path` 的副本加入结果；
- 回溯时把刚加入的子串弹出，尝试下一个分割点。

可先用 `O(n²)` 预处理出 `isPalin[i][j]` 表示子串是否回文，加速判断。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<String>> res = new ArrayList<>();
    private List<String> path = new ArrayList<>();
    private boolean[][] isPalin;
    private String s;

    public List<List<String>> partition(String s) {
        this.s = s;
        int n = s.length();
        isPalin = new boolean[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                if (s.charAt(i) == s.charAt(j) && (i - j <= 2 || isPalin[j + 1][i - 1])) {
                    isPalin[j][i] = true;
                }
            }
        }
        dfs(0);
        return res;
    }

    private void dfs(int start) {
        if (start == s.length()) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            if (isPalin[start][i]) {
                path.add(s.substring(start, i + 1));
                dfs(i + 1);
                path.remove(path.size() - 1);
            }
        }
    }
}
```

```python [Python]
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        is_palin = [[False] * n for _ in range(n)]
        for i in range(n):
            for j in range(i + 1):
                if s[i] == s[j] and (i - j <= 2 or is_palin[j + 1][i - 1]):
                    is_palin[j][i] = True

        res = []
        path = []

        def dfs(start: int):
            if start == n:
                res.append(path[:])
                return
            for i in range(start, n):
                if is_palin[start][i]:
                    path.append(s[start:i + 1])
                    dfs(i + 1)
                    path.pop()

        dfs(0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> partition(string s) {
        int n = s.size();
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        for (int i = 0; i < n; i++)
            for (int j = 0; j <= i; j++)
                if (s[i] == s[j] && (i - j <= 2 || isPalin[j + 1][i - 1]))
                    isPalin[j][i] = true;

        vector<vector<string>> res;
        vector<string> path;

        function<void(int)> dfs = [&](int start) {
            if (start == n) {
                res.push_back(path);
                return;
            }
            for (int i = start; i < n; i++) {
                if (isPalin[start][i]) {
                    path.push_back(s.substr(start, i - start + 1));
                    dfs(i + 1);
                    path.pop_back();
                }
            }
        };

        dfs(0);
        return res;
    }
};
```

```go [Go]
func partition(s string) [][]string {
    n := len(s)
    isPalin := make([][]bool, n)
    for i := range isPalin {
        isPalin[i] = make([]bool, n)
    }
    for i := 0; i < n; i++ {
        for j := 0; j <= i; j++ {
            if s[i] == s[j] && (i-j <= 2 || isPalin[j+1][i-1]) {
                isPalin[j][i] = true
            }
        }
    }

    var res [][]string
    var path []string

    var dfs func(int)
    dfs = func(start int) {
        if start == n {
            tmp := make([]string, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for i := start; i < n; i++ {
            if isPalin[start][i] {
                path = append(path, s[start:i+1])
                dfs(i + 1)
                path = path[:len(path)-1]
            }
        }
    }

    dfs(0)
    return res
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const n = s.length;
    const isPalin = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (s[i] === s[j] && (i - j <= 2 || isPalin[j + 1][i - 1])) {
                isPalin[j][i] = true;
            }
        }
    }

    const res = [];
    const path = [];

    const dfs = (start) => {
        if (start === n) {
            res.push([...path]);
            return;
        }
        for (let i = start; i < n; i++) {
            if (isPalin[start][i]) {
                path.push(s.slice(start, i + 1));
                dfs(i + 1);
                path.pop();
            }
        }
    };

    dfs(0);
    return res;
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool isPalin(char* s, int l, int r) {
    while (l < r) if (s[l++] != s[r--]) return false;
    return true;
}

void dfs(char* s, int n, int start, char*** res, int* cnt, char** path, int pathLen) {
    if (start == n) {
        char** copy = (char**)malloc(pathLen * sizeof(char*));
        for (int i = 0; i < pathLen; i++) {
            copy[i] = (char*)malloc((strlen(path[i]) + 1) * sizeof(char));
            strcpy(copy[i], path[i]);
        }
        res[*cnt] = copy;
        (*cnt)++;
        return;
    }
    for (int i = start; i < n; i++) {
        if (isPalin(s, start, i)) {
            char* sub = (char*)malloc((i - start + 2) * sizeof(char));
            strncpy(sub, s + start, i - start + 1);
            sub[i - start + 1] = '\0';
            path[pathLen] = sub;
            dfs(s, n, i + 1, res, cnt, path, pathLen + 1);
            free(sub);
        }
    }
}

char*** partition(char* s, int* returnSize) {
    int n = (int)strlen(s);
    char*** res = (char***)malloc(2000 * sizeof(char**));
    char** path = (char**)malloc(n * sizeof(char*));
    *returnSize = 0;
    dfs(s, n, 0, res, returnSize, path, 0);
    free(path);
    return res;
}
```

```ts [TypeScript]
function partition(s: string): string[][] {
    const n = s.length;
    const isPalin: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = 0; i < n; i++)
        for (let j = 0; j <= i; j++)
            if (s[i] === s[j] && (i - j <= 2 || isPalin[j + 1][i - 1]))
                isPalin[j][i] = true;

    const res: string[][] = [];
    const path: string[] = [];

    const dfs = (start: number): void => {
        if (start === n) { res.push([...path]); return; }
        for (let i = start; i < n; i++) {
            if (isPalin[start][i]) {
                path.push(s.slice(start, i + 1));
                dfs(i + 1);
                path.pop();
            }
        }
    };
    dfs(0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n × 2ⁿ)`，最坏情况下（全为 `'a'`）有 `2ⁿ⁻¹` 种分割，构造结果也需相应开销。
- **空间复杂度**：`O(n²)`（`isPalin` 数组）加上递归栈 `O(n)`，结果存储另计。

### 2.2 方法二：回溯（每次调用判断回文）

1. **思路**

与方法一思路完全一致，区别是不预计算回文表，而是在递归时实时用双指针判断子串是否回文。代码更简短，但每次判断回文需 `O(i - start)`，整体复杂度略高。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private List<List<String>> res = new ArrayList<>();
    private List<String> path = new ArrayList<>();

    public List<List<String>> partition(String s) {
        dfs(s, 0);
        return res;
    }

    private void dfs(String s, int start) {
        if (start == s.length()) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            if (isPalin(s, start, i)) {
                path.add(s.substring(start, i + 1));
                dfs(s, i + 1);
                path.remove(path.size() - 1);
            }
        }
    }

    private boolean isPalin(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        path = []

        def is_palin(l: int, r: int) -> bool:
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        def dfs(start: int):
            if start == len(s):
                res.append(path[:])
                return
            for i in range(start, len(s)):
                if is_palin(start, i):
                    path.append(s[start:i + 1])
                    dfs(i + 1)
                    path.pop()

        dfs(0)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> path;

        auto isPalin = [&](int l, int r) -> bool {
            while (l < r) if (s[l++] != s[r--]) return false;
            return true;
        };

        function<void(int)> dfs = [&](int start) {
            if (start == s.size()) {
                res.push_back(path);
                return;
            }
            for (int i = start; i < s.size(); i++) {
                if (isPalin(start, i)) {
                    path.push_back(s.substr(start, i - start + 1));
                    dfs(i + 1);
                    path.pop_back();
                }
            }
        };

        dfs(0);
        return res;
    }
};
```

```go [Go]
func partition(s string) [][]string {
    var res [][]string
    var path []string

    isPalin := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }

    var dfs func(int)
    dfs = func(start int) {
        if start == len(s) {
            tmp := make([]string, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for i := start; i < len(s); i++ {
            if isPalin(start, i) {
                path = append(path, s[start:i+1])
                dfs(i + 1)
                path = path[:len(path)-1]
            }
        }
    }

    dfs(0)
    return res
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const res = [];
    const path = [];

    const isPalin = (l, r) => {
        while (l < r) {
            if (s[l++] !== s[r--]) return false;
        }
        return true;
    };

    const dfs = (start) => {
        if (start === s.length) {
            res.push([...path]);
            return;
        }
        for (let i = start; i < s.length; i++) {
            if (isPalin(start, i)) {
                path.push(s.slice(start, i + 1));
                dfs(i + 1);
                path.pop();
            }
        }
    };

    dfs(0);
    return res;
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool isPalin(char* s, int l, int r) {
    while (l < r) if (s[l++] != s[r--]) return false;
    return true;
}

void dfs(char* s, int n, int start, char*** res, int* cnt, char** path, int pathLen) {
    if (start == n) {
        char** copy = (char**)malloc(pathLen * sizeof(char*));
        for (int i = 0; i < pathLen; i++) {
            copy[i] = (char*)malloc((strlen(path[i]) + 1) * sizeof(char));
            strcpy(copy[i], path[i]);
        }
        res[*cnt] = copy;
        (*cnt)++;
        return;
    }
    for (int i = start; i < n; i++) {
        if (isPalin(s, start, i)) {
            char* sub = (char*)malloc((i - start + 2) * sizeof(char));
            strncpy(sub, s + start, i - start + 1);
            sub[i - start + 1] = '\0';
            path[pathLen] = sub;
            dfs(s, n, i + 1, res, cnt, path, pathLen + 1);
            free(sub);
        }
    }
}

char*** partition(char* s, int* returnSize) {
    int n = (int)strlen(s);
    char*** res = (char***)malloc(2000 * sizeof(char**));
    char** path = (char**)malloc(n * sizeof(char*));
    *returnSize = 0;
    dfs(s, n, 0, res, returnSize, path, 0);
    free(path);
    return res;
}
```

```ts [TypeScript]
function partition(s: string): string[][] {
    const res: string[][] = [];
    const path: string[] = [];

    const isPalin = (l: number, r: number): boolean => {
        while (l < r) { if (s[l++] !== s[r--]) return false; }
        return true;
    };

    const dfs = (start: number): void => {
        if (start === s.length) { res.push([...path]); return; }
        for (let i = start; i < s.length; i++) {
            if (isPalin(start, i)) {
                path.push(s.slice(start, i + 1));
                dfs(i + 1);
                path.pop();
            }
        }
    };
    dfs(0);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n × 2ⁿ)`，回文判断额外增加了 `O(n)` 因子。
- **空间复杂度**：`O(n)`，递归栈与路径存储（不计结果）。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 + 预计算回文表 | `O(n × 2ⁿ)` | `O(n²)` | 判断回文更快，推荐 |
| 回溯 + 实时判断 | `O(n × 2ⁿ)` | `O(n)` | 代码更短，适合小数据 |

`s.length <= 16` 的约束下两种写法均可轻松通过。
