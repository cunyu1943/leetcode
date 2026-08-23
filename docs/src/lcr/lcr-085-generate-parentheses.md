# [LCR 085. 括号生成](https://leetcode.cn/problems/IDBivT/)



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

- `1 <= n <= 8`



## 二、解答方法

### 2.1 方法一：回溯（左右括号计数）

1. **思路**

递归构造括号串，维护已用的左括号数 `l` 和右括号数 `r`：

- 若 `l < n`，可以加左括号；
- 若 `r < l`，可以加右括号（保证任意前缀右括号数 ≤ 左括号数）；
- 当长度 `== 2n` 时记录。

时间 `O(4ⁿ/√n)`（卡特兰数），空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        dfs(n, 0, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(int n, int l, int r, StringBuilder sb, List<String> res) {
        if (sb.length() == 2 * n) {
            res.add(sb.toString());
            return;
        }
        if (l < n) {
            sb.append('(');
            dfs(n, l + 1, r, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
        if (r < l) {
            sb.append(')');
            dfs(n, l, r + 1, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def dfs(l, r, cur):
            if len(cur) == 2 * n:
                res.append(cur)
                return
            if l < n:
                dfs(l + 1, r, cur + '(')
            if r < l:
                dfs(l, r + 1, cur + ')')

        dfs(0, 0, '')
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        dfs(n, 0, 0, "", res);
        return res;
    }
private:
    void dfs(int n, int l, int r, string cur, vector<string>& res) {
        if (cur.size() == 2 * n) { res.push_back(cur); return; }
        if (l < n) dfs(n, l + 1, r, cur + '(', res);
        if (r < l) dfs(n, l, r + 1, cur + ')', res);
    }
};
```

```go [Go]
func generateParenthesis(n int) []string {
    var res []string
    var dfs func(l, r int, cur string)
    dfs = func(l, r int, cur string) {
        if len(cur) == 2*n {
            res = append(res, cur)
            return
        }
        if l < n {
            dfs(l+1, r, cur+"(")
        }
        if r < l {
            dfs(l, r+1, cur+")")
        }
    }
    dfs(0, 0, "")
    return res
}
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = [];
    const dfs = (l, r, cur) => {
        if (cur.length === 2 * n) {
            res.push(cur);
            return;
        }
        if (l < n) dfs(l + 1, r, cur + '(');
        if (r < l) dfs(l, r + 1, cur + ')');
    };
    dfs(0, 0, '');
    return res;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

char** res;
int cnt;

static void dfs(int n, int l, int r, char* cur, int len) {
    if (len == 2 * n) {
        res[cnt] = (char*)malloc((2 * n + 1) * sizeof(char));
        cur[len] = '\0';
        strcpy(res[cnt], cur);
        cnt++;
        return;
    }
    if (l < n) {
        cur[len] = '(';
        dfs(n, l + 1, r, cur, len + 1);
    }
    if (r < l) {
        cur[len] = ')';
        dfs(n, l, r + 1, cur, len + 1);
    }
}

char** generateParenthesis(int n, int* returnSize) {
    res = (char**)malloc(5000 * sizeof(char*));
    cnt = 0;
    char* cur = (char*)malloc((2 * n + 1) * sizeof(char));
    dfs(n, 0, 0, cur, 0);
    free(cur);
    *returnSize = cnt;
    return res;
}
```

```ts [TypeScript]
function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    const dfs = (l: number, r: number, cur: string) => {
        if (cur.length === 2 * n) {
            res.push(cur);
            return;
        }
        if (l < n) dfs(l + 1, r, cur + '(');
        if (r < l) dfs(l, r + 1, cur + ')');
    };
    dfs(0, 0, '');
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(C(2n, n))`，即卡特兰数的数量级。
- **空间复杂度**：`O(n)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯计数 | `O(C(2n,n))` | `O(n)` | 标准解法 |

有效括号串的关键约束是「任意前缀中右括号数不超过左括号数」，回溯时通过 `r < l` 限制右括号的添加时机即可天然保证合法性。

