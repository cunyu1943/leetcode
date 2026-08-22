# [58. 最后一个单词的长度](https://leetcode.cn/problems/length-of-last-word/)



## 一、题目描述

给你一个字符串 `s`，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 **最后一个** 单词的长度。

**单词** 是指仅由字母组成、不包含任何空格字符的最大子字符串。



**示例 1：**

```
输入：s = "Hello World"
输出：5
解释：最后一个单词是 "World"，长度为 5。
```

**示例 2：**

```
输入：s = "   fly me   to   the moon  "
输出：4
解释：最后一个单词是 "moon"，长度为 4。
```

**示例 3：**

```
输入：s = "luffy is still joyboy"
输出：6
解释：最后一个单词是 "joyboy"，长度为 6。
```

**提示：**

-   `1 <= s.length <= 10^4`
-   `s` 仅有英文字母和空格 `' '` 组成
-   `s` 中至少存在一个单词



## 二、解答方法

### 2.1 方法一：从后向前扫描


1. **思路**

从字符串末尾开始向前，先跳过尾随空格，再统计连续字母的个数，遇到空格或开头即停止。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int lengthOfLastWord(String s) {
        int i = s.length() - 1, len = 0;
        while (i >= 0 && s.charAt(i) == ' ') i--;
        while (i >= 0 && s.charAt(i) != ' ') { len++; i--; }
        return len;
    }
}
```

```python [Python]
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        i, length = len(s) - 1, 0
        while i >= 0 and s[i] == ' ':
            i -= 1
        while i >= 0 and s[i] != ' ':
            length += 1
            i -= 1
        return length
```

```go [Go]
func lengthOfLastWord(s string) int {
    i, length := len(s)-1, 0
    for i >= 0 && s[i] == ' ' { i-- }
    for i >= 0 && s[i] != ' ' { length++; i-- }
    return length
}
```

```c [C]
int lengthOfLastWord(char* s) {
    int i = strlen(s) - 1, len = 0;
    while (i >= 0 && s[i] == ' ') i--;
    while (i >= 0 && s[i] != ' ') { len++; i--; }
    return len;
}
```

```cpp [C++]
class Solution {
public:
    int lengthOfLastWord(string s) {
        int i = s.size() - 1, len = 0;
        while (i >= 0 && s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') { len++; i--; }
        return len;
    }
};
```

```javascript [JavaScript]
var lengthOfLastWord = function(s) {
    let i = s.length - 1, len = 0;
    while (i >= 0 && s[i] === ' ') i--;
    while (i >= 0 && s[i] !== ' ') { len++; i--; }
    return len;
};
```

```typescript [TypeScript]
function lengthOfLastWord(s: string): number {
    let i = s.length - 1, len = 0;
    while (i >= 0 && s[i] === ' ') i--;
    while (i >= 0 && s[i] !== ' ') { len++; i--; }
    return len;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，最坏扫描整个字符串一次。
- **空间复杂度**：`O(1)`**，只用到下标变量。

### 2.2 方法二：分割字符串


1. **思路**

利用语言自带 split 按空格切分，去掉空串后取最后一个单词求长度。代码最简洁但会额外产生中间数组。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int lengthOfLastWord(String s) {
        String[] parts = s.trim().split(" +");
        return parts[parts.length - 1].length();
    }
}
```

```python [Python]
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split()[-1])
```

```go [Go]
import "strings"
func lengthOfLastWord(s string) int {
    parts := strings.Fields(s)
    return len(parts[len(parts)-1])
}
```

```c [C]
int lengthOfLastWord(char* s) {
    // 可借助 strtok 按空格切分，完整实现略
    return 0;
}
```

```cpp [C++]
class Solution {
public:
    int lengthOfLastWord(string s) {
        istringstream iss(s);
        string word;
        while (iss >> word);
        return word.size();
    }
};
```

```javascript [JavaScript]
var lengthOfLastWord = function(s) {
    return s.trim().split(/\s+/).pop().length;
};
```

```typescript [TypeScript]
function lengthOfLastWord(s: string): number {
    return s.trim().split(/\s+/).pop()!.length;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，需要扫描并分割字符串。
- **空间复杂度**：`O(n)`**，保存分割后的单词数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 从后向前扫描 | `O(n)` | `O(1)` | 空间最优，推荐 |
| 分割字符串 | `O(n)` | `O(n)` | 代码极简，依赖库函数 |
