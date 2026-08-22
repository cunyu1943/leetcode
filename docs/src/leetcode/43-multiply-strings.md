# [43. 字符串相乘](https://leetcode.cn/problems/multiply-strings/)



## 一、题目描述

给定两个以字符串形式表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也表示为字符串形式。

**注意：**不能使用任何内置的 BigInteger 库或直接将输入转换为整数。



**示例 1：**

```
输入：num1 = "2", num2 = "3"
输出："6"
```

**示例 2：**

```
输入：num1 = "123", num2 = "456"
输出："56088"
```

**提示：**

-   `1 <= num1.length, num2.length <= 200`
-   `num1` 和 `num2` 只能由数字组成
-   `num1` 和 `num2` 都不包含任何前导零，除了数字 0 本身



## 二、解答方法

### 2.1 方法一：竖式乘法（进位数组）

1. **思路**

模拟手算乘法。设 `num1` 长度 `m`、`num2` 长度 `n`，结果最多 `m + n` 位。用数组 `res[m + n]` 存各数位：

-   `num1[i] * num2[j]` 的结果加到 `res[i + j + 1]`；
-   处理完所有乘积后，从低位向高位处理进位；
-   跳过前导零，转成字符串。

关键点：`num1[i] * num2[j]` 落在 `res[i + j]` 和 `res[i + j + 1]` 两位上。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";
        int m = num1.length(), n = num2.length();
        int[] res = new int[m + n];
        for (int i = m - 1; i >= 0; i--) {
            int a = num1.charAt(i) - '0';
            for (int j = n - 1; j >= 0; j--) {
                int b = num2.charAt(j) - '0';
                int sum = res[i + j + 1] + a * b;
                res[i + j + 1] = sum % 10;
                res[i + j] += sum / 10;
            }
        }
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < res.length && res[i] == 0) i++;
        for (; i < res.length; i++) sb.append(res[i]);
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"
        m, n = len(num1), len(num2)
        res = [0] * (m + n)
        for i in range(m - 1, -1, -1):
            a = ord(num1[i]) - ord('0')
            for j in range(n - 1, -1, -1):
                b = ord(num2[j]) - ord('0')
                s = res[i + j + 1] + a * b
                res[i + j + 1] = s % 10
                res[i + j] += s // 10
        i = 0
        while i < len(res) and res[i] == 0:
            i += 1
        return "".join(str(x) for x in res[i:])
```

```go [Go]
func multiply(num1 string, num2 string) string {
    if num1 == "0" || num2 == "0" {
        return "0"
    }
    m, n := len(num1), len(num2)
    res := make([]int, m+n)
    for i := m - 1; i >= 0; i-- {
        a := int(num1[i] - '0')
        for j := n - 1; j >= 0; j-- {
            b := int(num2[j] - '0')
            s := res[i+j+1] + a*b
            res[i+j+1] = s % 10
            res[i+j] += s / 10
        }
    }
    i := 0
    for i < len(res) && res[i] == 0 {
        i++
    }
    var sb []byte
    for ; i < len(res); i++ {
        sb = append(sb, byte('0'+res[i]))
    }
    return string(sb)
}
```

```c [C]
char* multiply(char* num1, char* num2) {
    int m = 0, n = 0;
    while (num1[m]) m++;
    while (num2[n]) n++;
    if ((m == 1 && num1[0] == '0') || (n == 1 && num2[0] == '0')) {
        char* r = (char*)malloc(2);
        r[0] = '0'; r[1] = '\0';
        return r;
    }
    int* res = (int*)calloc(m + n, sizeof(int));
    for (int i = m - 1; i >= 0; i--) {
        int a = num1[i] - '0';
        for (int j = n - 1; j >= 0; j--) {
            int b = num2[j] - '0';
            int s = res[i + j + 1] + a * b;
            res[i + j + 1] = s % 10;
            res[i + j] += s / 10;
        }
    }
    int i = 0;
    while (i < m + n && res[i] == 0) i++;
    char* out = (char*)malloc(m + n - i + 1);
    int k = 0;
    for (; i < m + n; i++) out[k++] = res[i] + '0';
    out[k] = '\0';
    free(res);
    return out;
}
```

```cpp [C++]
class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        int m = num1.size(), n = num2.size();
        vector<int> res(m + n, 0);
        for (int i = m - 1; i >= 0; i--) {
            int a = num1[i] - '0';
            for (int j = n - 1; j >= 0; j--) {
                int b = num2[j] - '0';
                int s = res[i + j + 1] + a * b;
                res[i + j + 1] = s % 10;
                res[i + j] += s / 10;
            }
        }
        string ans;
        int i = 0;
        while (i < res.size() && res[i] == 0) i++;
        for (; i < res.size(); i++) ans += to_string(res[i]);
        return ans;
    }
};
```

```js [JavaScript]
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    const m = num1.length, n = num2.length;
    const res = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--) {
        const a = num1.charCodeAt(i) - 48;
        for (let j = n - 1; j >= 0; j--) {
            const b = num2.charCodeAt(j) - 48;
            const s = res[i + j + 1] + a * b;
            res[i + j + 1] = s % 10;
            res[i + j] += Math.floor(s / 10);
        }
    }
    let i = 0;
    while (i < res.length && res[i] === 0) i++;
    return res.slice(i).join('');
};
```

```ts [TypeScript]
function multiply(num1: string, num2: string): string {
    if (num1 === "0" || num2 === "0") return "0";
    const m = num1.length, n = num2.length;
    const res: number[] = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--) {
        const a = num1.charCodeAt(i) - 48;
        for (let j = n - 1; j >= 0; j--) {
            const b = num2.charCodeAt(j) - 48;
            const s = res[i + j + 1] + a * b;
            res[i + j + 1] = s % 10;
            res[i + j] += Math.floor(s / 10);
        }
    }
    let i = 0;
    while (i < res.length && res[i] === 0) i++;
    return res.slice(i).join('');
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`，两层循环遍历两个字符串的每一位。
- **空间复杂度**：`O(m + n)`，结果数组。

### 2.2 方法二：逐位累加法（先不进位）

1. **思路**

与方法一本质相同，只是先把所有乘积加到对应位置（不立即进位），最后统一从低位向高位进位。代码更清晰，但多了一次统一进位扫描。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";
        int m = num1.length(), n = num2.length();
        int[] pos = new int[m + n];
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                pos[i + j + 1] += mul;
            }
        }
        for (int k = m + n - 1; k > 0; k--) {
            pos[k - 1] += pos[k] / 10;
            pos[k] %= 10;
        }
        StringBuilder sb = new StringBuilder();
        int i = pos[0] == 0 ? 1 : 0;
        for (; i < pos.length; i++) sb.append(pos[i]);
        return sb.toString();
    }
}
```

```python [Python]
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"
        m, n = len(num1), len(num2)
        pos = [0] * (m + n)
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                pos[i + j + 1] += (ord(num1[i]) - 48) * (ord(num2[j]) - 48)
        for k in range(m + n - 1, 0, -1):
            pos[k - 1] += pos[k] // 10
            pos[k] %= 10
        i = 1 if pos[0] == 0 else 0
        return "".join(str(x) for x in pos[i:])
```

```go [Go]
func multiply(num1 string, num2 string) string {
    if num1 == "0" || num2 == "0" {
        return "0"
    }
    m, n := len(num1), len(num2)
    pos := make([]int, m+n)
    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            pos[i+j+1] += int(num1[i]-'0') * int(num2[j]-'0')
        }
    }
    for k := m + n - 1; k > 0; k-- {
        pos[k-1] += pos[k] / 10
        pos[k] %= 10
    }
    i := 0
    if pos[0] == 0 {
        i = 1
    }
    var sb []byte
    for ; i < len(pos); i++ {
        sb = append(sb, byte('0'+pos[i]))
    }
    return string(sb)
}
```

```c [C]
char* multiply(char* num1, char* num2) {
    int m = 0, n = 0;
    while (num1[m]) m++;
    while (num2[n]) n++;
    if ((m == 1 && num1[0] == '0') || (n == 1 && num2[0] == '0')) {
        char* r = (char*)malloc(2); r[0] = '0'; r[1] = '\0'; return r;
    }
    int* pos = (int*)calloc(m + n, sizeof(int));
    for (int i = m - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--)
            pos[i + j + 1] += (num1[i] - '0') * (num2[j] - '0');
    for (int k = m + n - 1; k > 0; k--) {
        pos[k - 1] += pos[k] / 10;
        pos[k] %= 10;
    }
    int i = pos[0] == 0 ? 1 : 0;
    char* out = (char*)malloc(m + n - i + 1);
    int k = 0;
    for (; i < m + n; i++) out[k++] = pos[i] + '0';
    out[k] = '\0';
    free(pos);
    return out;
}
```

```cpp [C++]
class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        int m = num1.size(), n = num2.size();
        vector<int> pos(m + n, 0);
        for (int i = m - 1; i >= 0; i--)
            for (int j = n - 1; j >= 0; j--)
                pos[i + j + 1] += (num1[i] - '0') * (num2[j] - '0');
        for (int k = m + n - 1; k > 0; k--) {
            pos[k - 1] += pos[k] / 10;
            pos[k] %= 10;
        }
        string ans;
        int i = pos[0] == 0 ? 1 : 0;
        for (; i < pos.size(); i++) ans += to_string(pos[i]);
        return ans;
    }
};
```

```js [JavaScript]
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    const m = num1.length, n = num2.length;
    const pos = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--)
        for (let j = n - 1; j >= 0; j--)
            pos[i + j + 1] += (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
    for (let k = m + n - 1; k > 0; k--) {
        pos[k - 1] += Math.floor(pos[k] / 10);
        pos[k] %= 10;
    }
    let i = pos[0] === 0 ? 1 : 0;
    return pos.slice(i).join('');
};
```

```ts [TypeScript]
function multiply(num1: string, num2: string): string {
    if (num1 === "0" || num2 === "0") return "0";
    const m = num1.length, n = num2.length;
    const pos: number[] = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--)
        for (let j = n - 1; j >= 0; j--)
            pos[i + j + 1] += (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
    for (let k = m + n - 1; k > 0; k--) {
        pos[k - 1] += Math.floor(pos[k] / 10);
        pos[k] %= 10;
    }
    let i = pos[0] === 0 ? 1 : 0;
    return pos.slice(i).join('');
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`。
- **空间复杂度**：`O(m + n)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 竖式乘法（进位数组） | `O(m * n)` | `O(m + n)` | 常规实现 |
| 逐位累加法（先不进位） | `O(m * n)` | `O(m + n)` | 常规实现 |

