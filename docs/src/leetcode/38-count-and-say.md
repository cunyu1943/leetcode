# [38. 外观数列](https://leetcode.cn/problems/count-and-say/)



## 一、题目描述

「外观数列」是一个由递归定义的字符串序列：

-   `countAndSay(1) = "1"`
-   `countAndSay(n)` 是对 `countAndSay(n-1)` 的「读」出来的字符串（即「报数」）。

「报数」是指将字符串按 **相同字符分组**，每组报出「字符个数 + 字符」。例如：

-   `"1"` 读作 `"1 个 1"` → `"11"`
-   `"11"` 读作 `"2 个 1"` → `"21"`
-   `"21"` 读作 `"1 个 2，1 个 1"` → `"1211"`
-   `"1211"` 读作 `"1 个 1，1 个 2，2 个 1"` → `"111221"`

给定整数 `n`，返回 **第 `n` 个** 外观数列的字符串。



**示例 1：**

```
输入：n = 1
输出："1"
解释：这是一个基本样例。
```

**示例 2：**

```
输入：n = 4
输出："1211"
解释：
countAndSay(1) = "1"
countAndSay(2) = "11"
countAndSay(3) = "21"
countAndSay(4) = "1211"
```

**提示：**

-   `1 <= n <= 30`



## 二、解答方法

### 2.1 方法一：迭代（逐次报数）

1. **思路**

从 `"1"` 出发，迭代 `n-1` 次生成下一项：

-   对当前字符串，用双指针/计数扫描连续相同字符段；
-   每段拼接 `"个数" + "字符"`；
-   得到新串作为下一次输入。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String countAndSay(int n) {
        String cur = "1";
        for (int i = 1; i < n; i++) {
            StringBuilder sb = new StringBuilder();
            int j = 0;
            while (j < cur.length()) {
                int k = j;
                while (k < cur.length() && cur.charAt(k) == cur.charAt(j)) k++;
                sb.append(k - j).append(cur.charAt(j));
                j = k;
            }
            cur = sb.toString();
        }
        return cur;
    }
}
```

```python [Python]
class Solution:
    def countAndSay(self, n: int) -> str:
        cur = "1"
        for _ in range(n - 1):
            nxt = []
            j = 0
            while j < len(cur):
                k = j
                while k < len(cur) and cur[k] == cur[j]:
                    k += 1
                nxt.append(str(k - j) + cur[j])
                j = k
            cur = "".join(nxt)
        return cur
```

```go [Go]
func countAndSay(n int) string {
    cur := "1"
    for i := 1; i < n; i++ {
        var nxt []byte
        j := 0
        for j < len(cur) {
            k := j
            for k < len(cur) && cur[k] == cur[j] {
                k++
            }
            nxt = append(nxt, byte('0'+k-j))
            nxt = append(nxt, cur[j])
            j = k
        }
        cur = string(nxt)
    }
    return cur
}
```

```c [C]
char* countAndSay(int n) {
    char* cur = (char*)malloc(5000);
    cur[0] = '1'; cur[1] = '\0';
    char* nxt = (char*)malloc(5000);
    for (int i = 1; i < n; i++) {
        int j = 0, idx = 0;
        while (cur[j]) {
            int k = j;
            while (cur[k] && cur[k] == cur[j]) k++;
            int cnt = k - j;
            nxt[idx++] = '0' + cnt;
            nxt[idx++] = cur[j];
            j = k;
        }
        nxt[idx] = '\0';
        strcpy(cur, nxt);
    }
    free(nxt);
    return cur;
}
```

```cpp [C++]
class Solution {
public:
    string countAndSay(int n) {
        string cur = "1";
        for (int i = 1; i < n; i++) {
            string nxt;
            int j = 0;
            while (j < cur.size()) {
                int k = j;
                while (k < cur.size() && cur[k] == cur[j]) k++;
                nxt += to_string(k - j) + cur[j];
                j = k;
            }
            cur = nxt;
        }
        return cur;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let cur = "1";
    for (let i = 1; i < n; i++) {
        let nxt = '';
        let j = 0;
        while (j < cur.length) {
            let k = j;
            while (k < cur.length && cur[k] === cur[j]) k++;
            nxt += (k - j) + cur[j];
            j = k;
        }
        cur = nxt;
    }
    return cur;
};
```

```ts [TypeScript]
function countAndSay(n: number): string {
    let cur = "1";
    for (let i = 1; i < n; i++) {
        let nxt = '';
        let j = 0;
        while (j < cur.length) {
            let k = j;
            while (k < cur.length && cur[k] === cur[j]) k++;
            nxt += (k - j) + cur[j];
            j = k;
        }
        cur = nxt;
    }
    return cur;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n * m)`，`n` 为项数，`m` 为当前串长（随 `n` 增长但 `n<=30` 可控）。
- **空间复杂度**：`O(m)`，存储当前串与下一项。

### 2.2 方法二：递归

1. **思路**

`countAndSay(n)` 的「报数」直接依赖于 `countAndSay(n-1)`，可自然写成递归：先求出前一项，再对其报数。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String countAndSay(int n) {
        if (n == 1) return "1";
        String prev = countAndSay(n - 1);
        StringBuilder sb = new StringBuilder();
        int j = 0;
        while (j < prev.length()) {
            int k = j;
            while (k < prev.length() && prev.charAt(k) == prev.charAt(j)) k++;
            sb.append(k - j).append(prev.charAt(j));
            j = k;
        }
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def countAndSay(self, n: int) -> str:
        if n == 1:
            return "1"
        prev = self.countAndSay(n - 1)
        nxt = []
        j = 0
        while j < len(prev):
            k = j
            while k < len(prev) and prev[k] == prev[j]:
                k += 1
            nxt.append(str(k - j) + prev[j])
            j = k
        return "".join(nxt)
```

```go [Go]
func countAndSay(n int) string {
    if n == 1 {
        return "1"
    }
    prev := countAndSay(n - 1)
    var nxt []byte
    j := 0
    for j < len(prev) {
        k := j
        for k < len(prev) && prev[k] == prev[j] {
            k++
        }
        nxt = append(nxt, byte('0'+k-j))
        nxt = append(nxt, prev[j])
        j = k
    }
    return string(nxt)
}
```

```c [C]
char* countAndSay(int n) {
    if (n == 1) {
        char* r = (char*)malloc(2);
        r[0] = '1'; r[1] = '\0';
        return r;
    }
    char* prev = countAndSay(n - 1);
    char* nxt = (char*)malloc(5000);
    int j = 0, idx = 0;
    while (prev[j]) {
        int k = j;
        while (prev[k] && prev[k] == prev[j]) k++;
        nxt[idx++] = '0' + (k - j);
        nxt[idx++] = prev[j];
        j = k;
    }
    nxt[idx] = '\0';
    free(prev);
    return nxt;
}
```

```cpp [C++]
class Solution {
public:
    string countAndSay(int n) {
        if (n == 1) return "1";
        string prev = countAndSay(n - 1);
        string nxt;
        int j = 0;
        while (j < prev.size()) {
            int k = j;
            while (k < prev.size() && prev[k] == prev[j]) k++;
            nxt += to_string(k - j) + prev[j];
            j = k;
        }
        return nxt;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    if (n === 1) return "1";
    const prev = countAndSay(n - 1);
    let nxt = '';
    let j = 0;
    while (j < prev.length) {
        let k = j;
        while (k < prev.length && prev[k] === prev[j]) k++;
        nxt += (k - j) + prev[j];
        j = k;
    }
    return nxt;
};
```

```ts [TypeScript]
function countAndSay(n: number): string {
    if (n === 1) return "1";
    const prev = countAndSay(n - 1);
    let nxt = '';
    let j = 0;
    while (j < prev.length) {
        let k = j;
        while (k < prev.length && prev[k] === prev[j]) k++;
        nxt += (k - j) + prev[j];
        j = k;
    }
    return nxt;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n * m)`，与迭代一致，但有 `O(n)` 递归栈。
- **空间复杂度**：`O(n * m)`，递归栈保存每层串。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 迭代（逐次报数） | `O(n * m)` | `O(m)` | 无递归栈，空间更优 |
| 递归 | `O(n * m)` | `O(n * m)` | 代码简洁，有递归开销 |

