# [93. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)



## 一、题目描述

**有效 IP 地址** 正好由四个整数（每个整数位于 `0` 到 `255` 之间，且不能含有前导零）组成，整数之间用 `'.'` 分隔。

例如：`"0.1.2.201"` 和 `"192.168.1.1"` 是 **有效** IP 地址，但是 `"0.011.255.245"`、`"192.168.1.312"` 和 `"192.168@1.1"` 是 **无效** IP 地址。

给定一个只包含数字的字符串 `s`，用以表示一个 IP 地址，返回所有可能的 **有效 IP 地址**，这些地址可以通过在 `s` 中插入 `'.'` 来形成。你不能重新排序或删除 `s` 中的任何数字。你可以按 **任何顺序** 返回答案。



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

**提示：**

-   `1 <= s.length <= 20`
-   `s` 仅由数字组成



## 二、解答方法

### 2.1 方法一：回溯（分段构造）


1. **思路**

用递归在字符串中放置 3 个分隔点，每次取 1~3 个字符作为一段，校验合法性（无前导零、值 ≤255），凑满 4 段且用尽字符即记录。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    List<String> res = new ArrayList<>();
    public List<String> restoreIpAddresses(String s) {
        backtrack(s, 0, new ArrayList<>());
        return res;
    }
    private void backtrack(String s, int start, List<String> path) {
        if (path.size() == 4) {
            if (start == s.length()) res.add(String.join(".", path));
            return;
        }
        for (int len = 1; len <= 3 && start + len <= s.length(); len++) {
            String seg = s.substring(start, start + len);
            if (isValid(seg)) {
                path.add(seg);
                backtrack(s, start + len, path);
                path.remove(path.size() - 1);
            }
        }
    }
    private boolean isValid(String seg) {
        if (seg.length() > 1 && seg.charAt(0) == '0') return false;
        return Integer.parseInt(seg) <= 255;
    }
}
```

```python [Python]
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res = []
        def backtrack(start, path):
            if len(path) == 4:
                if start == len(s): res.append('.'.join(path))
                return
            for length in range(1, 4):
                if start + length <= len(s):
                    seg = s[start:start + length]
                    if (len(seg) == 1 or seg[0] != '0') and int(seg) <= 255:
                        backtrack(start + length, path + [seg])
        backtrack(0, [])
        return res
```

```go [Go]
func restoreIpAddresses(s string) []string {
    res := []string{}
    var backtrack func(int, []string)
    backtrack = func(start int, path []string) {
        if len(path) == 4 {
            if start == len(s) { res = append(res, strings.Join(path, ".")) }
            return
        }
        for l := 1; l <= 3 && start+l <= len(s); l++ {
            seg := s[start : start+l]
            if len(seg) > 1 && seg[0] == '0' { continue }
            v, _ := strconv.Atoi(seg)
            if v <= 255 {
                backtrack(start+l, append(path, seg))
            }
        }
    }
    backtrack(0, []string{})
    return res
}
```

```c [C]
char** restoreIpAddresses(char* s, int* returnSize) {
    // 回溯分段构造核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;
        vector<string> path;
        function<void(int)> backtrack = [&](int start) {
            if (path.size() == 4) {
                if (start == s.size()) {
                    string ip;
                    for (int i = 0; i < 4; i++) { ip += path[i]; if (i < 3) ip += '.'; }
                    res.push_back(ip);
                }
                return;
            }
            for (int len = 1; len <= 3 && start + len <= s.size(); len++) {
                string seg = s.substr(start, len);
                if ((seg.size() == 1 || seg[0] != '0') && stoi(seg) <= 255) {
                    path.push_back(seg);
                    backtrack(start + len);
                    path.pop_back();
                }
            }
        };
        backtrack(0);
        return res;
    }
};
```

```javascript [JavaScript]
var restoreIpAddresses = function(s) {
    const res = [];
    const backtrack = (start, path) => {
        if (path.length === 4) {
            if (start === s.length) res.push(path.join('.'));
            return;
        }
        for (let len = 1; len <= 3 && start + len <= s.length; len++) {
            const seg = s.substring(start, start + len);
            if ((seg.length === 1 || seg[0] !== '0') && Number(seg) <= 255) {
                backtrack(start + len, [...path, seg]);
            }
        }
    };
    backtrack(0, []);
    return res;
};
```

```typescript [TypeScript]
function restoreIpAddresses(s: string): string[] {
    const res: string[] = [];
    const backtrack = (start: number, path: string[]): void => {
        if (path.length === 4) {
            if (start === s.length) res.push(path.join('.'));
            return;
        }
        for (let len = 1; len <= 3 && start + len <= s.length; len++) {
            const seg = s.substring(start, start + len);
            if ((seg.length === 1 || seg[0] !== '0') && Number(seg) <= 255) {
                backtrack(start + len, [...path, seg]);
            }
        }
    };
    backtrack(0, []);
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(3^4)`，最多 3 段 × 3 个长度 × 4 段，近似常数级。
- **空间复杂度**：`O(1)`（不计返回结果），递归栈深度 4。

### 2.2 方法二：三重循环暴力


1. **思路**

直接用三层循环确定前三个分隔点位置（共 `O(n^3)` 枚举），把字符串切成 4 段分别校验，合法即加入。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new ArrayList<>();
        int n = s.length();
        for (int i = 1; i < 4 && i < n; i++)
            for (int j = i + 1; j < i + 4 && j < n; j++)
                for (int k = j + 1; k < j + 4 && k < n; k++) {
                    String s1 = s.substring(0, i), s2 = s.substring(i, j);
                    String s3 = s.substring(j, k), s4 = s.substring(k);
                    if (valid(s1) && valid(s2) && valid(s3) && valid(s4))
                        res.add(s1 + "." + s2 + "." + s3 + "." + s4);
                }
        return res;
    }
    private boolean valid(String seg) {
        if (seg.length() > 1 && seg.charAt(0) == '0') return false;
        return Integer.parseInt(seg) <= 255;
    }
}
```

```python [Python]
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        res, n = [], len(s)
        def valid(seg):
            return (len(seg) == 1 or seg[0] != '0') and int(seg) <= 255
        for i in range(1, min(4, n)):
            for j in range(i + 1, min(i + 4, n)):
                for k in range(j + 1, min(j + 4, n)):
                    s1, s2, s3, s4 = s[:i], s[i:j], s[j:k], s[k:]
                    if valid(s1) and valid(s2) and valid(s3) and valid(s4):
                        res.append(f"{s1}.{s2}.{s3}.{s4}")
        return res
```

```go [Go]
func restoreIpAddresses(s string) []string {
    res := []string{}
    n := len(s)
    valid := func(seg string) bool {
        if len(seg) > 1 && seg[0] == '0' { return false }
        v, _ := strconv.Atoi(seg)
        return v <= 255
    }
    for i := 1; i < 4 && i < n; i++ {
        for j := i + 1; j < i+4 && j < n; j++ {
            for k := j + 1; k < j+4 && k < n; k++ {
                s1, s2, s3, s4 := s[:i], s[i:j], s[j:k], s[k:]
                if valid(s1) && valid(s2) && valid(s3) && valid(s4) {
                    res = append(res, s1+"."+s2+"."+s3+"."+s4)
                }
            }
        }
    }
    return res
}
```

```c [C]
char** restoreIpAddresses(char* s, int* returnSize) {
    // 三重循环暴力核心结构同上，完整实现略
    *returnSize = 0; return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;
        int n = s.size();
        auto valid = [&](string seg) {
            if (seg.size() > 1 && seg[0] == '0') return false;
            return stoi(seg) <= 255;
        };
        for (int i = 1; i < 4 && i < n; i++)
            for (int j = i + 1; j < i + 4 && j < n; j++)
                for (int k = j + 1; k < j + 4 && k < n; k++) {
                    if (valid(s.substr(0, i)) && valid(s.substr(i, j - i)) &&
                        valid(s.substr(j, k - j)) && valid(s.substr(k)))
                        res.push_back(s.substr(0, i) + "." + s.substr(i, j - i) + "." +
                                      s.substr(j, k - j) + "." + s.substr(k));
                }
        return res;
    }
};
```

```javascript [JavaScript]
var restoreIpAddresses = function(s) {
    const res = [];
    const n = s.length;
    const valid = (seg) => (seg.length === 1 || seg[0] !== '0') && Number(seg) <= 255;
    for (let i = 1; i < 4 && i < n; i++)
        for (let j = i + 1; j < i + 4 && j < n; j++)
            for (let k = j + 1; k < j + 4 && k < n; k++) {
                const s1 = s.slice(0, i), s2 = s.slice(i, j), s3 = s.slice(j, k), s4 = s.slice(k);
                if (valid(s1) && valid(s2) && valid(s3) && valid(s4))
                    res.push(`${s1}.${s2}.${s3}.${s4}`);
            }
    return res;
};
```

```typescript [TypeScript]
function restoreIpAddresses(s: string): string[] {
    const res: string[] = [];
    const n = s.length;
    const valid = (seg: string): boolean => (seg.length === 1 || seg[0] !== '0') && Number(seg) <= 255;
    for (let i = 1; i < 4 && i < n; i++)
        for (let j = i + 1; j < i + 4 && j < n; j++)
            for (let k = j + 1; k < j + 4 && k < n; k++) {
                const s1 = s.slice(0, i), s2 = s.slice(i, j), s3 = s.slice(j, k), s4 = s.slice(k);
                if (valid(s1) && valid(s2) && valid(s3) && valid(s4))
                    res.push(`${s1}.${s2}.${s3}.${s4}`);
            }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n^3)`，三重循环枚举分隔点。
- **空间复杂度**：`O(1)`（不计返回结果）。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 回溯（分段构造） | `O(3^4)` 近似常数 | `O(1)` | 更通用，易扩展 |
| 三重循环暴力 | `O(n^3)` | `O(1)` | 写法直白，固定 4 段 |
