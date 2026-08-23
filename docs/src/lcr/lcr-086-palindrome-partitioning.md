# [LCR 086. 分割回文串](https://leetcode.cn/problems/M99OJA/)



## 一、题目描述

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是 **回文串** 。返回 `s` 所有可能的分割方案。

**回文串** 是正着读和反着读都一样的字符串。



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

### 2.1 方法一：回溯 + 双指针判回文

1. **思路**

回溯枚举分割点：从位置 `start` 开始，尝试所有可能的子串 `s[start..i]`，若是回文则加入方案并递归 `i+1`，否则跳过。

- 回文判断用双指针；
- 到达末尾时记录一种分割方案。

时间 `O(n · 2ⁿ)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        dfs(s, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(String s, int start, List<String> cur, List<List<String>> res) {
        if (start == s.length()) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            if (!isPalindrome(s, start, i)) continue;
            cur.add(s.substring(start, i + 1));
            dfs(s, i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
    private boolean isPalindrome(String s, int l, int r) {
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

        def dfs(start, cur):
            if start == len(s):
                res.append(cur[:])
                return
            for i in range(start, len(s)):
                sub = s[start:i + 1]
                if sub != sub[::-1]:
                    continue
                cur.append(sub)
                dfs(i + 1, cur)
                cur.pop()

        dfs(0, [])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> cur;
        dfs(s, 0, cur, res);
        return res;
    }
private:
    void dfs(string& s, int start, vector<string>& cur, vector<vector<string>>& res) {
        if (start == s.size()) { res.push_back(cur); return; }
        for (int i = start; i < s.size(); i++) {
            if (!isPal(s, start, i)) continue;
            cur.push_back(s.substr(start, i - start + 1));
            dfs(s, i + 1, cur, res);
            cur.pop_back();
        }
    }
    bool isPal(string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    }
};
```

```go [Go]
func partition(s string) [][]string {
    var res [][]string
    cur := []string{}
    isPal := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }
    var dfs func(start int)
    dfs = func(start int) {
        if start == len(s) {
            tmp := make([]string, len(cur))
            copy(tmp, cur)
            res = append(res, tmp)
            return
        }
        for i := start; i < len(s); i++ {
            if !isPal(start, i) {
                continue
            }
            cur = append(cur, s[start:i+1])
            dfs(i + 1)
            cur = cur[:len(cur)-1]
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
    const cur = [];
    const isPal = (l, r) => {
        while (l < r) {
            if (s[l++] !== s[r--]) return false;
        }
        return true;
    };
    const dfs = (start) => {
        if (start === s.length) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i < s.length; i++) {
            if (!isPal(start, i)) continue;
            cur.push(s.slice(start, i + 1));
            dfs(i + 1);
            cur.pop();
        }
    };
    dfs(0);
    return res;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

char*** res;
int* cols;
int cnt;

static int isPal(char* s, int l, int r) {
    while (l < r) if (s[l++] != s[r--]) return 0;
    return 1;
}

static void dfs(char* s, int start, int n, char** cur, int len) {
    if (start == n) {
        res[cnt] = (char**)malloc(len * sizeof(char*));
        for (int i = 0; i < len; i++) {
            res[cnt][i] = (char*)malloc((strlen(cur[i]) + 1) * sizeof(char));
            strcpy(res[cnt][i], cur[i]);
        }
        cols[cnt] = len;
        cnt++;
        return;
    }
    for (int i = start; i < n; i++) {
        if (!isPal(s, start, i)) continue;
        char* sub = (char*)malloc((i - start + 2) * sizeof(char));
        memcpy(sub, s + start, i - start + 1);
        sub[i - start + 1] = '\0';
        cur[len] = sub;
        dfs(s, i + 1, n, cur, len + 1);
        free(sub);
    }
}

char*** partition(char* s, int* returnSize, int** returnColumnSizes) {
    res = (char***)malloc(500 * sizeof(char**));
    cols = (int*)malloc(500 * sizeof(int));
    cnt = 0;
    char** cur = (char**)malloc(20 * sizeof(char*));
    dfs(s, 0, (int)strlen(s), cur, 0);
    free(cur);
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function partition(s: string): string[][] {
    const res: string[][] = [];
    const cur: string[] = [];
    const isPal = (l: number, r: number): boolean => {
        while (l < r) {
            if (s[l++] !== s[r--]) return false;
        }
        return true;
    };
    const dfs = (start: number) => {
        if (start === s.length) {
            res.push([...cur]);
            return;
        }
        for (let i = start; i < s.length; i++) {
            if (!isPal(start, i)) continue;
            cur.push(s.slice(start, i + 1));
            dfs(i + 1);
            cur.pop();
        }
    };
    dfs(0);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n · 2ⁿ)`，枚举所有分割点组合。
- **空间复杂度**：`O(n)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 + 判回文 | `O(n·2ⁿ)` | `O(n)` | 标准解法 |

枚举每个可行的回文子串作为一段，递归处理剩余部分，即可生成全部分割方案。回文判断每段用双指针 `O(n)` 即可。

