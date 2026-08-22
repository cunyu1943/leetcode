# [68. 文本左右对齐](https://leetcode.cn/problems/text-justification/)



## 一、题目描述

给定一个单词数组 `words` 和一个长度 `maxWidth`，重新排版单词，使其成为每行恰好有 `maxWidth` 个字符，且左右两端对齐的文本。

你应该使用 **贪心算法** 来放置给定的单词：即在每一行中放置尽可能多的单词，必要时可用空格 `' '` 填充，使得每行恰好有 `maxWidth` 个字符。

要求尽可能均匀分配单词间的空格数量；如果某一行单词间的空格数无法均匀分布，则左侧放置的空格数要多于右侧。

文本的最后一行应以左对齐方式书写，且单词之间仅有一个空格。

**注意：**

- 单词是指由非空格字符组成的字符序列。
- 每个单词的长度大于 0，且不超过 `maxWidth`。
- 输入单词数组 `words` 至少包含一个单词。



**示例 1：**

```
输入：words = ["This","is","an","example","of","text","justification."], maxWidth = 16
输出：
[
  "This   is   an",
  "example  of text",
  "justification.  "
]
```

**示例 2：**

```
输入：words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
输出：
[
  "What  must  be",
  "acknowledgment  ",
  "shall be        "
]
```

**提示：**

-   `1 <= words.length <= 300`
-   `1 <= words[i].length <= 20`
-   `words[i]` 由小写英文字母和符号组成
-   `1 <= maxWidth <= 100`
-   `words[i].length <= maxWidth`



## 二、解答方法

### 2.1 方法一：贪心逐行填充


1. **思路**

每行尽可能多地塞入单词，计算剩余空格并均匀分配（左侧多）。最后一行特殊左对齐处理。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < words.length) {
            int j = i + 1, len = words[i].length();
            while (j < words.length && len + 1 + words[j].length() <= maxWidth) {
                len += 1 + words[j].length();
                j++;
            }
            StringBuilder sb = new StringBuilder();
            int count = j - i;
            if (j == words.length) { // 最后一行
                for (int k = i; k < j; k++) {
                    sb.append(words[k]);
                    if (k < j - 1) sb.append(' ');
                }
                while (sb.length() < maxWidth) sb.append(' ');
            } else if (count == 1) {
                sb.append(words[i]);
                while (sb.length() < maxWidth) sb.append(' ');
            } else {
                int total = maxWidth - (len - count + 1);
                int space = total / (count - 1), extra = total % (count - 1);
                for (int k = i; k < j; k++) {
                    sb.append(words[k]);
                    if (k < j - 1) {
                        for (int s = 0; s < space + (k - i < extra ? 1 : 0); s++) sb.append(' ');
                    }
                }
            }
            res.add(sb.toString());
            i = j;
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res, i = [], 0
        while i < len(words):
            j = i + 1
            length = len(words[i])
            while j < len(words) and length + 1 + len(words[j]) <= maxWidth:
                length += 1 + len(words[j])
                j += 1
            line = []
            if j == len(words) or j - i == 1:
                line = ' '.join(words[i:j])
                line += ' ' * (maxWidth - len(line))
            else:
                total = maxWidth - (length - (j - i) + 1)
                space, extra = divmod(total, j - i - 1)
                for k in range(i, j):
                    line.append(words[k])
                    if k < j - 1:
                        line.append(' ' * (space + (1 if k - i < extra else 0)))
            res.append(''.join(line))
            i = j
        return res
```

```go [Go]
func fullJustify(words []string, maxWidth int) []string {
    res := []string{}
    i := 0
    for i < len(words) {
        j := i + 1
        length := len(words[i])
        for j < len(words) && length+1+len(words[j]) <= maxWidth {
            length += 1 + len(words[j])
            j++
        }
        sb := []byte{}
        if j == len(words) || j-i == 1 {
            for k := i; k < j; k++ {
                sb = append(sb, words[k]...)
                if k < j-1 { sb = append(sb, ' ') }
            }
            for len(sb) < maxWidth { sb = append(sb, ' ') }
        } else {
            total := maxWidth - (length - (j - i) + 1)
            space, extra := total/(j-i-1), total%(j-i-1)
            for k := i; k < j; k++ {
                sb = append(sb, words[k]...)
                if k < j-1 {
                    for s := 0; s < space+(k-i<extra?1:0); s++ { sb = append(sb, ' ') }
                }
            }
        }
        res = append(res, string(sb))
        i = j
    }
    return res
}
```

```c [C]
char** fullJustify(char** words, int wordsSize, int maxWidth, int* returnSize) {
    // 贪心逐行填充核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res;
        int i = 0, n = words.size();
        while (i < n) {
            int j = i + 1, len = words[i].length();
            while (j < n && len + 1 + words[j].length() <= maxWidth) {
                len += 1 + words[j].length();
                j++;
            }
            string line;
            if (j == n || j - i == 1) {
                for (int k = i; k; k = k) {}
                for (int k = i; k < j; k++) {
                    line += words[k];
                    if (k < j - 1) line += ' ';
                }
                while (line.length() < maxWidth) line += ' ';
            } else {
                int total = maxWidth - (len - (j - i) + 1);
                int space = total / (j - i - 1), extra = total % (j - i - 1);
                for (int k = i; k < j; k++) {
                    line += words[k];
                    if (k < j - 1) line += string(space + (k - i < extra ? 1 : 0), ' ');
                }
            }
            res.push_back(line);
            i = j;
        }
        return res;
    }
};
```

```javascript [JavaScript]
var fullJustify = function(words, maxWidth) {
    const res = [];
    let i = 0;
    while (i < words.length) {
        let j = i + 1, len = words[i].length;
        while (j < words.length && len + 1 + words[j].length <= maxWidth) {
            len += 1 + words[j].length;
            j++;
        }
        let line = '';
        if (j === words.length || j - i === 1) {
            line = words.slice(i, j).join(' ');
            line += ' '.repeat(maxWidth - line.length);
        } else {
            const total = maxWidth - (len - (j - i) + 1);
            const space = Math.floor(total / (j - i - 1));
            const extra = total % (j - i - 1);
            for (let k = i; k < j; k++) {
                line += words[k];
                if (k < j - 1) line += ' '.repeat(space + (k - i < extra ? 1 : 0));
            }
        }
        res.push(line);
        i = j;
    }
    return res;
};
```

```typescript [TypeScript]
function fullJustify(words: string[], maxWidth: number): string[] {
    const res: string[] = [];
    let i = 0;
    while (i < words.length) {
        let j = i + 1, len = words[i].length;
        while (j < words.length && len + 1 + words[j].length <= maxWidth) {
            len += 1 + words[j].length;
            j++;
        }
        let line = '';
        if (j === words.length || j - i === 1) {
            line = words.slice(i, j).join(' ');
            line += ' '.repeat(maxWidth - line.length);
        } else {
            const total = maxWidth - (len - (j - i) + 1);
            const space = Math.floor(total / (j - i - 1));
            const extra = total % (j - i - 1);
            for (let k = i; k < j; k++) {
                line += words[k];
                if (k < j - 1) line += ' '.repeat(space + (k - i < extra ? 1 : 0));
            }
        }
        res.push(line);
        i = j;
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，每个单词只处理一次。
- **空间复杂度**：`O(n * maxWidth)`（不计返回结果），结果字符串开销。

### 2.2 方法二：拆分更细的辅助函数


1. **思路**

将上述逻辑拆分为「计算一行单词数」「构造一行」两个辅助函数，结构更清晰、便于维护，复杂度与方法一相同。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<>();
        int n = words.length, i = 0;
        while (i < n) {
            int len = words[i].length(), j = i + 1;
            while (j < n && len + 1 + words[j].length() <= maxWidth) {
                len += 1 + words[j].length();
                j++;
            }
            res.add(buildLine(words, i, j, maxWidth, j == n));
            i = j;
        }
        return res;
    }
    private String buildLine(String[] w, int i, int j, int m, boolean last) {
        StringBuilder sb = new StringBuilder();
        if (last || j - i == 1) {
            for (int k = i; k < j; k++) { sb.append(w[k]); if (k < j - 1) sb.append(' '); }
            while (sb.length() < m) sb.append(' ');
        } else {
            int total = m - (j - i), gaps = j - i - 1;
            int base = total / gaps, extra = total % gaps;
            for (int k = i; k < j; k++) {
                sb.append(w[k]);
                if (k < j - 1) {
                    int sp = base + (k - i < extra ? 1 : 0);
                    for (int s = 0; s < sp; s++) sb.append(' ');
                }
            }
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res, i, n = [], 0, len(words)
        while i < n:
            j = i + 1
            l = len(words[i])
            while j < n and l + 1 + len(words[j]) <= maxWidth:
                l += 1 + len(words[j]); j += 1
            res.append(self._build(words, i, j, maxWidth, j == n))
            i = j
        return res

    def _build(self, words, i, j, m, last):
        if last or j - i == 1:
            line = ' '.join(words[i:j])
            return line + ' ' * (m - len(line))
        total = m - (j - i)
        gaps = j - i - 1
        base, extra = divmod(total, gaps)
        line = []
        for k in range(i, j):
            line.append(words[k])
            if k < j - 1:
                line.append(' ' * (base + (1 if k - i < extra else 0)))
        return ''.join(line)
```

```go [Go]
func fullJustify(words []string, maxWidth int) []string {
    res := []string{}
    n, i := len(words), 0
    for i < n {
        j, l := i+1, len(words[i])
        for j < n && l+1+len(words[j]) <= maxWidth { l += 1 + len(words[j]); j++ }
        res = append(res, buildLine(words, i, j, maxWidth, j == n))
        i = j
    }
    return res
}
func buildLine(w []string, i, j, m int, last bool) string {
    if last || j-i == 1 {
        line := ""
        for k := i; k < j; k++ { line += w[k]; if k < j-1 { line += " " } }
        for len(line) < m { line += " " }
        return line
    }
    total, gaps := m-(j-i), j-i-1
    base, extra := total/gaps, total%gaps
    line := ""
    for k := i; k < j; k++ {
        line += w[k]
        if k < j-1 {
            for s := 0; s < base+(k-i<extra?1:0); s++ { line += " " }
        }
    }
    return line
}
```

```c [C]
char** fullJustify(char** words, int wordsSize, int maxWidth, int* returnSize) {
    // 辅助函数拆分核心结构同上，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res; int n = words.size(), i = 0;
        while (i < n) {
            int l = words[i].size(), j = i + 1;
            while (j < n && l + 1 + words[j].size() <= maxWidth) { l += 1 + words[j].size(); j++; }
            res.push_back(build(words, i, j, maxWidth, j == n));
            i = j;
        }
        return res;
    }
private:
    string build(vector<string>& w, int i, int j, int m, bool last) {
        if (last || j - i == 1) {
            string line;
            for (int k = i; k < j; k++) { line += w[k]; if (k < j - 1) line += ' '; }
            while (line.size() < m) line += ' ';
            return line;
        }
        int total = m - (j - i), gaps = j - i - 1, base = total / gaps, extra = total % gaps;
        string line;
        for (int k = i; k < j; k++) {
            line += w[k];
            if (k < j - 1) line += string(base + (k - i < extra ? 1 : 0), ' ');
        }
        return line;
    }
};
```

```javascript [JavaScript]
var fullJustify = function(words, maxWidth) {
    const res = []; let i = 0;
    while (i < words.length) {
        let j = i + 1, l = words[i].length;
        while (j < words.length && l + 1 + words[j].length <= maxWidth) { l += 1 + words[j].length; j++; }
        res.push(buildLine(words, i, j, maxWidth, j === words.length));
        i = j;
    }
    return res;
};
function buildLine(w, i, j, m, last) {
    if (last || j - i === 1) {
        let line = w.slice(i, j).join(' ');
        return line + ' '.repeat(m - line.length);
    }
    const total = m - (j - i), gaps = j - i - 1, base = Math.floor(total / gaps), extra = total % gaps;
    let line = '';
    for (let k = i; k < j; k++) {
        line += w[k];
        if (k < j - 1) line += ' '.repeat(base + (k - i < extra ? 1 : 0));
    }
    return line;
}
```

```typescript [TypeScript]
function fullJustify(words: string[], maxWidth: number): string[] {
    const res: string[] = []; let i = 0;
    while (i < words.length) {
        let j = i + 1, l = words[i].length;
        while (j < words.length && l + 1 + words[j].length <= maxWidth) { l += 1 + words[j].length; j++; }
        res.push(buildLine(words, i, j, maxWidth, j === words.length));
        i = j;
    }
    return res;
}
function buildLine(w: string[], i: number, j: number, m: number, last: boolean): string {
    if (last || j - i === 1) {
        let line = w.slice(i, j).join(' ');
        return line + ' '.repeat(m - line.length);
    }
    const total = m - (j - i), gaps = j - i - 1, base = Math.floor(total / gaps), extra = total % gaps;
    let line = '';
    for (let k = i; k < j; k++) {
        line += w[k];
        if (k < j - 1) line += ' '.repeat(base + (k - i < extra ? 1 : 0));
    }
    return line;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，每个单词只处理一次。
- **空间复杂度**：`O(n * maxWidth)`，结果字符串开销。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心逐行填充 | `O(n)` | `O(n * maxWidth)` | 直观，单函数 |
| 辅助函数拆分 | `O(n)` | `O(n * maxWidth)` | 结构清晰，易维护 |
