# [388. 文件的最长绝对路径](https://leetcode.cn/problems/longest-absolute-file-path/)

## 一、题目描述

假设有一个文件系统，用字符串 `input` 表示目录结构：用换行 `\n` 分隔各项，每个项的缩进用 `\t`（制表符）表示层级（缩进数 = 深度-1）。目录项以结尾的文件名是否含 `.` 区分（含 `.` 即文件）。求 **最长绝对路径的长度**（目录/文件名用 `/` 连接，长度含 `/`）。

**示例：**
```
输入："dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
输出：20（"dir/subdir2/file.ext" 长度 20）
```

**提示：** `1 <= input.length <= 10⁴`，`input` 可能含文件/目录，只统计路径（文件名含 `.`）。

## 二、解答方法

### 方法一：栈/数组维护各层路径长度

**思路：** 按 `\n` 切分每行，数开头 `\t` 数得深度 `d`（0 基）。用数组 `lengths[d]` 存「第 d 层（含）到根的累计路径长（不含末尾 `/`）」。当前项名长 `L`：若 `d==0` 累计 = `L`，否则累计 = `lengths[d-1] + 1 + L`（`+1` 是 `/`）。更新 `lengths[d]`。若文件名含 `.` 则更新答案 `max(ans, 累计)`（含 `.` 才算完整文件）。

:::::: code-group

```java [Java]
class Solution {
    public int lengthLongestPath(String input) {
        String[] lines = input.split("\n");
        int[] lengths = new int[lines.length];
        int ans = 0;
        for (String line : lines) {
            int depth = line.lastIndexOf('\t') + 1;        // \t 个数 = 深度
            String name = line.substring(depth);            // 去掉缩进
            int cur = (depth == 0) ? name.length() : lengths[depth-1] + 1 + name.length();
            lengths[depth] = cur;
            if (name.contains(".")) ans = Math.max(ans, cur);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def lengthLongestPath(self, input: str) -> int:
        lengths = {}
        ans = 0
        for line in input.split("\n"):
            depth = line.count("\t")
            name = line[depth:]                       # 去缩进
            cur = len(name) if depth == 0 else lengths[depth-1] + 1 + len(name)
            lengths[depth] = cur
            if "." in name: ans = max(ans, cur)
        return ans
```

```cpp [C++]
class Solution {
public:
    int lengthLongestPath(string input) {
        vector<int> lengths(INPUT_LEN, 0);   // 用例长度足矣，或用 map
        int ans=0;
        stringstream ss(input); string line;
        while(getline(ss, line, '\n')){
            int depth = 0; while(depth<line.size() && line[depth]=='\t') depth++;
            string name = line.substr(depth);
            int cur = (depth==0) ? name.size() : lengths[depth-1]+1+name.size();
            lengths[depth] = cur;
            if(name.find('.')!=string::npos) ans = max(ans, cur);
        }
        return ans;
    }
};
```

```go [Go]
func lengthLongestPath(input string) int {
    lengths := map[int]int{}
    ans := 0
    for _, line := range strings.Split(input, "\n") {
        depth := 0
        for depth < len(line) && line[depth] == '\t' { depth++ }
        name := line[depth:]
        cur := len(name)
        if depth > 0 { cur = lengths[depth-1] + 1 + len(name) }
        lengths[depth] = cur
        if strings.Contains(name, ".") { if cur > ans { ans = cur } }
    }
    return ans
}
```

```js [JavaScript]
var lengthLongestPath = function (input) {
    const lines = input.split("\n");
    const lengths = {}; let ans = 0;
    for (const line of lines) {
        const depth = (line.match(/\t/g) || []).length;
        const name = line.slice(depth);
        const cur = depth === 0 ? name.length : lengths[depth-1] + 1 + name.length;
        lengths[depth] = cur;
        if (name.includes(".")) ans = Math.max(ans, cur);
    }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(深度)`。

## 三、总结

文件系统字符串解析：关键是「用数组按深度存累计路径长」，遇到同级项直接覆盖（无需栈弹出，因为同深度共享父路径）。注意路径长度包含 `/`（`+1`）。只有文件名含 `.` 才计入答案（目录不计入）。同类：`249 移位字符串分组`、`679` 之外，本题是字符串模拟经典。
