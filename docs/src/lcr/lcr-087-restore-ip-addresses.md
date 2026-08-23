# [LCR 087. 复原 IP 地址](https://leetcode.cn/problems/0on3uN/)



## 一、题目描述

给定一个只包含数字的字符串 `s` ，用以表示一个 IP 地址，返回所有可能从 `s` 获得的 **有效 IP 地址** 。你可以按任何顺序返回答案。

有效 IP 地址正好由四个整数（每个位于 `0` 到 `255` 之间组成，且不能含有前导 `0`），整数之间用 `'.'` 分隔。

例如：`"0.1.2.201"` 和 `"192.168.1.1"` 是 **有效** IP 地址，但是 `"0.011.255.245"`、`"192.168.1.312"` 和 `"192.168@1.1"` 是 **无效** IP 地址。



**示例 1：**

```
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
```

**示例 2：**

```
输入：s = "0000"
输出：["0.0.0.0"]
```

**示例 3：**

```
输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

**提示：**

- `1 <= s.length <= 20`
- `s` 仅由数字组成



## 二、解答方法

### 2.1 方法一：回溯（四段划分）

1. **思路**

把字符串分成 4 段，每段是合法的 IP 字段：

- 段长 `1~3`，且无前导 0（除非段就是 `"0"`），数值 `<= 255`；
- 用 `segCount` 与 `start` 追踪；恰好取满 4 段且用尽字符串时记录。

时间 `O(3⁴)`（常数级），空间 `O(1)`（递归深度固定 4）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new ArrayList<>();
        dfs(s, 0, 0, new StringBuilder(), res);
        return res;
    }
    private void dfs(String s, int start, int seg, StringBuilder sb, List<String> res) {
        if (seg == 4) {
            if (start == s.length()) res.add(sb.substring(0, sb.length() - 1));
            return;
        }
        if (start == s.length()) return;
        if (s.charAt(start) == '0') { // 前导 0：段只能是 "0"
            sb.append("0.");
            dfs(s, start + 1, seg + 1, sb, res);
            sb.setLength(sb.length() - 2);
            return;
        }
        int val = 0;
        for (int i = start; i < s.length() && i < start + 3; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            if (val > 255) break;
            sb.append(s, start, i + 1).append('.');
            dfs(s, i + 1, seg + 1, sb, res);
            sb.setLength(sb.length() - (i - start + 2));
        }
    }
}
```

```python [Python]
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []

        def dfs(start, seg, cur):
            if seg == 4:
                if start == len(s):
                    res.append(cur[:-1])
                return
            if start == len(s):
                return
            if s[start] == '0':
                dfs(start + 1, seg + 1, cur + '0.')
                return
            val = 0
            for i in range(start, min(start + 3, len(s))):
                val = val * 10 + int(s[i])
                if val > 255:
                    break
                dfs(i + 1, seg + 1, cur + s[start:i + 1] + '.')

        dfs(0, 0, '')
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;
        string cur;
        dfs(s, 0, 0, cur, res);
        return res;
    }
private:
    void dfs(string& s, int start, int seg, string& cur, vector<string>& res) {
        if (seg == 4) {
            if (start == s.size()) res.push_back(cur.substr(0, cur.size() - 1));
            return;
        }
        if (start == s.size()) return;
        if (s[start] == '0') {
            cur += "0.";
            dfs(s, start + 1, seg + 1, cur, res);
            cur.resize(cur.size() - 2);
            return;
        }
        int val = 0;
        for (int i = start; i < s.size() && i < start + 3; i++) {
            val = val * 10 + (s[i] - '0');
            if (val > 255) break;
            int old = cur.size();
            cur += s.substr(start, i - start + 1) + ".";
            dfs(s, i + 1, seg + 1, cur, res);
            cur.resize(old);
        }
    }
};
```

```go [Go]
func restoreIpAddresses(s string) []string {
    var res []string
    var cur []byte
    var dfs func(start, seg int)
    dfs = func(start, seg int) {
        if seg == 4 {
            if start == len(s) {
                res = append(res, string(cur[:len(cur)-1]))
            }
            return
        }
        if start == len(s) {
            return
        }
        if s[start] == '0' {
            cur = append(cur, '0', '.')
            dfs(start+1, seg+1)
            cur = cur[:len(cur)-2]
            return
        }
        val := 0
        for i := start; i < len(s) && i < start+3; i++ {
            val = val*10 + int(s[i]-'0')
            if val > 255 {
                break
            }
            old := len(cur)
            cur = append(cur, s[start:i+1]...)
            cur = append(cur, '.')
            dfs(i+1, seg+1)
            cur = cur[:old]
        }
    }
    dfs(0, 0)
    return res
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    const res = [];
    const dfs = (start, seg, cur) => {
        if (seg === 4) {
            if (start === s.length) res.push(cur.slice(0, -1));
            return;
        }
        if (start === s.length) return;
        if (s[start] === '0') {
            dfs(start + 1, seg + 1, cur + '0.');
            return;
        }
        let val = 0;
        for (let i = start; i < s.length && i < start + 3; i++) {
            val = val * 10 + Number(s[i]);
            if (val > 255) break;
            dfs(i + 1, seg + 1, cur + s.slice(start, i + 1) + '.');
        }
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

static void dfs(char* s, int start, int n, int seg, char* cur, int len) {
    if (seg == 4) {
        if (start == n) {
            res[cnt] = (char*)malloc((len) * sizeof(char));
            memcpy(res[cnt], cur, len - 1);
            res[cnt][len - 1] = '\0';
            cnt++;
        }
        return;
    }
    if (start == n) return;
    if (s[start] == '0') {
        cur[len] = '0'; cur[len + 1] = '.';
        dfs(s, start + 1, n, seg + 1, cur, len + 2);
        return;
    }
    int val = 0;
    for (int i = start; i < n && i < start + 3; i++) {
        val = val * 10 + (s[i] - '0');
        if (val > 255) break;
        int old = len;
        for (int k = start; k <= i; k++) cur[len++] = s[k];
        cur[len++] = '.';
        dfs(s, i + 1, n, seg + 1, cur, len);
        len = old;
    }
}

char** restoreIpAddresses(char* s, int* returnSize) {
    res = (char**)malloc(100 * sizeof(char*));
    cnt = 0;
    char* cur = (char*)malloc(20 * sizeof(char));
    dfs(s, 0, (int)strlen(s), 0, cur, 0);
    free(cur);
    *returnSize = cnt;
    return res;
}
```

```ts [TypeScript]
function restoreIpAddresses(s: string): string[] {
    const res: string[] = [];
    const dfs = (start: number, seg: number, cur: string) => {
        if (seg === 4) {
            if (start === s.length) res.push(cur.slice(0, -1));
            return;
        }
        if (start === s.length) return;
        if (s[start] === '0') {
            dfs(start + 1, seg + 1, cur + '0.');
            return;
        }
        let val = 0;
        for (let i = start; i < s.length && i < start + 3; i++) {
            val = val * 10 + Number(s[i]);
            if (val > 255) break;
            dfs(i + 1, seg + 1, cur + s.slice(start, i + 1) + '.');
        }
    };
    dfs(0, 0, '');
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(3⁴)`，每段最多 3 位、共 4 段，组合数有限。
- **空间复杂度**：`O(4)`，递归深度固定。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯 | `O(3⁴)` | `O(4)` | 标准解法 |

每段满足「1~3 位、无前导 0（单 0 除外）、数值 ≤ 255」即可，恰好四段且用尽字符串即为有效 IP。递归深度固定为 4，天然受限。

