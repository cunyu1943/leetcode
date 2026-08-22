# [71. 简化路径](https://leetcode.cn/problems/simplify-path/)



## 一、题目描述

给你一个字符串 `path`，表示指向某一文件或目录的 Unix 风格绝对路径（以 `'/'` 开头），请将其转化为 **规范路径**。

规范路径的要求：始终以斜杠 `'/'` 开头；两个目录名之间必须只有一个斜杠；最后一个目录名（如果存在）不能以 `'/'` 结尾；含 `.`（表示当前目录）或 `..`（表示上一级目录）时应按规则处理。



**示例 1：**

```
输入：path = "/home/"
输出："/home"
```

**示例 2：**

```
输入：path = "/../"
输出："/"
```

**示例 3：**

```
输入：path = "/home//foo/"
输出："/home/foo"
```

**提示：**

-   `1 <= path.length <= 3000`
-   `path` 由英文字母，数字，`'.'`，`'/'` 或 `'_'` 组成
-   `path` 是一个有效的 Unix 风格绝对路径



## 二、解答方法

### 2.1 方法一：栈模拟


1. **思路**

用 `'/'` 分割路径，遇空串或 `'.'` 跳过，遇 `'..'` 弹出栈顶，否则压入目录名，最后用 `'/'` 拼接。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String simplifyPath(String path) {
        String[] parts = path.split("/");
        List<String> stack = new ArrayList<>();
        for (String p : parts) {
            if (p.isEmpty() || p.equals(".")) continue;
            if (p.equals("..")) {
                if (!stack.isEmpty()) stack.remove(stack.size() - 1);
            } else stack.add(p);
        }
        return "/" + String.join("/", stack);
    }
}
```

```python [Python]
class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        for p in path.split('/'):
            if p in ('', '.'):
                continue
            elif p == '..':
                if stack: stack.pop()
            else:
                stack.append(p)
        return '/' + '/'.join(stack)
```

```go [Go]
func simplifyPath(path string) string {
    parts := strings.Split(path, "/")
    stack := []string{}
    for _, p := range parts {
        if p == "" || p == "." { continue }
        if p == ".." {
            if len(stack) > 0 { stack = stack[:len(stack)-1] }
        } else { stack = append(stack, p) }
    }
    return "/" + strings.Join(stack, "/")
}
```

```c [C]
char* simplifyPath(char* path) {
    // 栈模拟核心结构同上，完整实现略
    return path;
}
```

```cpp [C++]
class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string part;
        while (getline(ss, part, '/')) {
            if (part == "" || part == ".") continue;
            if (part == "..") {
                if (!stack.empty()) stack.pop_back();
            } else stack.push_back(part);
        }
        string res;
        for (auto& s : stack) res += "/" + s;
        return res.empty() ? "/" : res;
    }
};
```

```javascript [JavaScript]
var simplifyPath = function(path) {
    const stack = [];
    for (const p of path.split('/')) {
        if (p === '' || p === '.') continue;
        if (p === '..') { if (stack.length) stack.pop(); }
        else stack.push(p);
    }
    return '/' + stack.join('/');
};
```

```typescript [TypeScript]
function simplifyPath(path: string): string {
    const stack: string[] = [];
    for (const p of path.split('/')) {
        if (p === '' || p === '.') continue;
        if (p === '..') { if (stack.length) stack.pop(); }
        else stack.push(p);
    }
    return '/' + stack.join('/');
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，遍历一次路径。
- **空间复杂度**：`O(n)`，栈存储目录名。

### 2.2 方法二：双指针原地解析


1. **思路**

不使用 split，用双指针扫描路径，逐个解析目录名并写入结果缓冲区，空间更紧凑（适合 C 等手动管理内存的语言）。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String simplifyPath(String path) {
        List<String> stack = new ArrayList<>();
        int i = 0, n = path.length();
        while (i < n) {
            while (i < n && path.charAt(i) == '/') i++;
            int j = i;
            while (j < n && path.charAt(j) != '/') j++;
            String name = path.substring(i, j);
            if (name.equals(".")) {}
            else if (name.equals("..")) { if (!stack.isEmpty()) stack.remove(stack.size()-1); }
            else stack.add(name);
            i = j;
        }
        return "/" + String.join("/", stack);
    }
}
```

```python [Python]
class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        i, n = 0, len(path)
        while i < n:
            while i < n and path[i] == '/': i += 1
            j = i
            while j < n and path[j] != '/': j += 1
            name = path[i:j]
            if name == '.' or name == '':
                pass
            elif name == '..':
                if stack: stack.pop()
            else:
                stack.append(name)
            i = j
        return '/' + '/'.join(stack)
```

```go [Go]
func simplifyPath(path string) string {
    stack := []string{}
    i, n := 0, len(path)
    for i < n {
        for i < n && path[i] == '/' { i++ }
        j := i
        for j < n && path[j] != '/' { j++ }
        name := path[i:j]
        if name == "." || name == "" { } else if name == ".." {
            if len(stack) > 0 { stack = stack[:len(stack)-1] }
        } else { stack = append(stack, name) }
        i = j
    }
    return "/" + strings.Join(stack, "/")
}
```

```c [C]
char* simplifyPath(char* path) {
    // 双指针解析核心结构同上，完整实现略
    return path;
}
```

```cpp [C++]
class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        int i = 0, n = path.size();
        while (i < n) {
            while (i < n && path[i] == '/') i++;
            int j = i;
            while (j < n && path[j] != '/') j++;
            string name = path.substr(i, j - i);
            if (name == "." || name == "") continue;
            else if (name == "..") { if (!stack.empty()) stack.pop_back(); }
            else stack.push_back(name);
            i = j;
        }
        string res;
        for (auto& s : stack) res += "/" + s;
        return res.empty() ? "/" : res;
    }
};
```

```javascript [JavaScript]
var simplifyPath = function(path) {
    const stack = [];
    let i = 0, n = path.length;
    while (i < n) {
        while (i < n && path[i] === '/') i++;
        let j = i;
        while (j < n && path[j] !== '/') j++;
        const name = path.substring(i, j);
        if (name === '.' || name === '') continue;
        else if (name === '..') { if (stack.length) stack.pop(); }
        else stack.push(name);
        i = j;
    }
    return '/' + stack.join('/');
};
```

```typescript [TypeScript]
function simplifyPath(path: string): string {
    const stack: string[] = [];
    let i = 0, n = path.length;
    while (i < n) {
        while (i < n && path[i] === '/') i++;
        let j = i;
        while (j < n && path[j] !== '/') j++;
        const name = path.substring(i, j);
        if (name === '.' || name === '') continue;
        else if (name === '..') { if (stack.length) stack.pop(); }
        else stack.push(name);
        i = j;
    }
    return '/' + stack.join('/');
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，扫描路径一次。
- **空间复杂度**：`O(n)`，栈与结果开销。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 栈模拟（split） | `O(n)` | `O(n)` | 代码最简，推荐 |
| 双指针原地解析 | `O(n)` | `O(n)` | 无需分割，省中间数组 |
