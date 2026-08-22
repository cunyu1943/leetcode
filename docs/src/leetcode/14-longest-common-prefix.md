# [14. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/)



## 一、题目描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。



**示例 1：**

```
输入：strs = ["flower","flow","flight"]
输出："fl"
```

**示例 2：**

```
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
```

**提示：**

-   `1 <= strs.length <= 200`
-   `0 <= strs[i].length <= 200`
-   `strs[i]` 如果非空，则仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：纵向扫描

1. **思路**

从第一个字符开始，逐列比较所有字符串在相同位置的字符是否一致：

-   以外层循环遍历字符索引 `i`，内层循环遍历每个字符串；
-   若某个字符串长度不足 `i`，或字符不相同，则公共前缀就是 `strs[0][0..i-1]`；
-   全部通过则返回整个 `strs[0]`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String longestCommonPrefix(String[] strs) {
        String first = strs[0];
        for (int i = 0; i < first.length(); i++) {
            char c = first.charAt(i);
            for (int j = 1; j < strs.length; j++) {
                if (i >= strs[j].length() || strs[j].charAt(i) != c) {
                    return first.substring(0, i);
                }
            }
        }
        return first;
    }
}
```

```python [Python]
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        first = strs[0]
        for i, c in enumerate(first):
            for s in strs[1:]:
                if i >= len(s) or s[i] != c:
                    return first[:i]
        return first
```

```go [Go]
func longestCommonPrefix(strs []string) string {
    first := strs[0]
    for i := 0; i < len(first); i++ {
        c := first[i]
        for j := 1; j < len(strs); j++ {
            if i >= len(strs[j]) || strs[j][i] != c {
                return first[:i]
            }
        }
    }
    return first
}
```

```c [C]
char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";
    char* first = strs[0];
    int i = 0;
    while (first[i]) {
        char c = first[i];
        for (int j = 1; j < strsSize; j++) {
            if (strs[j][i] == '\0' || strs[j][i] != c) {
                char* res = (char*)malloc(sizeof(char) * (i + 1));
                for (int k = 0; k < i; k++) res[k] = first[k];
                res[i] = '\0';
                return res;
            }
        }
        i++;
    }
    char* res = (char*)malloc(sizeof(char) * (i + 1));
    for (int k = 0; k < i; k++) res[k] = first[k];
    res[i] = '\0';
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string first = strs[0];
        for (int i = 0; i < first.size(); i++) {
            char c = first[i];
            for (int j = 1; j < strs.size(); j++) {
                if (i >= strs[j].size() || strs[j][i] != c) {
                    return first.substr(0, i);
                }
            }
        }
        return first;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    const first = strs[0];
    for (let i = 0; i < first.length; i++) {
        const c = first[i];
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== c) {
                return first.substring(0, i);
            }
        }
    }
    return first;
};
```

```ts [TypeScript]
function longestCommonPrefix(strs: string[]): string {
    const first = strs[0];
    for (let i = 0; i < first.length; i++) {
        const c = first[i];
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== c) {
                return first.substring(0, i);
            }
        }
    }
    return first;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(S)`，其中 `S` 是所有字符串字符总数，最坏需比较到最短串结束。
- **空间复杂度**：`O(1)`，只使用常数个变量（不计返回值）。

### 2.2 方法二：横向扫描（两两比较）

1. **思路**

把公共前缀看成「不断收缩」的过程：先用 `strs[0]` 与 `strs[1]` 求公共前缀，再拿结果与 `strs[2]` 求前缀……一旦前缀变空即可提前返回。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String longestCommonPrefix(String[] strs) {
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            int j = 0;
            while (j < prefix.length() && j < strs[i].length()
                   && prefix.charAt(j) == strs[i].charAt(j)) {
                j++;
            }
            prefix = prefix.substring(0, j);
            if (prefix.isEmpty()) break;
        }
        return prefix;
    }
}
```

```python [Python]
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        prefix = strs[0]
        for s in strs[1:]:
            j = 0
            while j < len(prefix) and j < len(s) and prefix[j] == s[j]:
                j += 1
            prefix = prefix[:j]
            if not prefix:
                break
        return prefix
```

```go [Go]
func longestCommonPrefix(strs []string) string {
    prefix := strs[0]
    for _, s := range strs[1:] {
        j := 0
        for j < len(prefix) && j < len(s) && prefix[j] == s[j] {
            j++
        }
        prefix = prefix[:j]
        if prefix == "" {
            break
        }
    }
    return prefix
}
```

```c [C]
char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";
    char* prefix = strs[0];
    for (int i = 1; i < strsSize; i++) {
        int j = 0;
        while (prefix[j] && strs[i][j] && prefix[j] == strs[i][j]) j++;
        prefix[j] = '\0';
        if (j == 0) break;
    }
    return prefix;
}
```

```cpp [C++]
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            int j = 0;
            while (j < prefix.size() && j < strs[i].size() && prefix[j] == strs[i][j]) j++;
            prefix = prefix.substr(0, j);
            if (prefix.empty()) break;
        }
        return prefix;
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        while (j < prefix.length && j < strs[i].length && prefix[j] === strs[i][j]) j++;
        prefix = prefix.substring(0, j);
        if (prefix === '') break;
    }
    return prefix;
};
```

```ts [TypeScript]
function longestCommonPrefix(strs: string[]): string {
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        while (j < prefix.length && j < strs[i].length && prefix[j] === strs[i][j]) j++;
        prefix = prefix.substring(0, j);
        if (prefix === '') break;
    }
    return prefix;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(S)`，总体字符比较次数与所有字符串总长度线性相关。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 纵向扫描 | `O(S)` | `O(1)` | 常规实现 |
| 横向扫描（两两比较） | `O(S)` | `O(1)` | 常规实现 |

