# [67. 二进制求和](https://leetcode.cn/problems/add-binary/)



## 一、题目描述

给你两个二进制字符串 `a` 和 `b`，以二进制字符串的形式返回它们的和。



**示例 1：**

```
输入：a = "11", b = "1"
输出："100"
```

**示例 2：**

```
输入：a = "1010", b = "1011"
输出："10101"
```

**提示：**

-   `1 <= a.length, b.length <= 10^4`
-   `a` 和 `b` 仅由字符 `'0'` 或 `'1'` 组成
-   字符串如果不是 `"0"`，就不含前导零



## 二、解答方法

### 2.1 方法一：模拟加法（从末尾逐位相加）


1. **思路**

双指针从两字符串末尾开始，维护进位 `carry`，逐位求和拼到结果中，最后反转。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int i = a.length() - 1, j = b.length() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int x = i >= 0 ? a.charAt(i--) - '0' : 0;
            int y = j >= 0 ? b.charAt(j--) - '0' : 0;
            int sum = x + y + carry;
            sb.append(sum % 2);
            carry = sum / 2;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        i, j, carry = len(a) - 1, len(b) - 1, 0
        res = []
        while i >= 0 or j >= 0 or carry:
            x = int(a[i]) if i >= 0 else 0
            y = int(b[j]) if j >= 0 else 0
            s = x + y + carry
            res.append(str(s % 2))
            carry = s // 2
            i -= 1; j -= 1
        return ''.join(reversed(res))
```

```go [Go]
func addBinary(a string, b string) string {
    i, j, carry := len(a)-1, len(b)-1, 0
    res := []byte{}
    for i >= 0 || j >= 0 || carry > 0 {
        x, y := 0, 0
        if i >= 0 { x = int(a[i] - '0'); i-- }
        if j >= 0 { y = int(b[j] - '0'); j-- }
        s := x + y + carry
        res = append(res, byte('0'+s%2))
        carry = s / 2
    }
    for l, r := 0, len(res)-1; l < r; l, r = l+1, r-1 {
        res[l], res[r] = res[r], res[l]
    }
    return string(res)
}
```

```c [C]
char* addBinary(char* a, char* b, int* returnSize) {
    int la = strlen(a), lb = strlen(b);
    int len = (la > lb ? la : lb) + 2;
    char* res = (char*)malloc(sizeof(char) * len);
    int i = la - 1, j = lb - 1, carry = 0, k = 0;
    while (i >= 0 || j >= 0 || carry) {
        int x = i >= 0 ? a[i--] - '0' : 0;
        int y = j >= 0 ? b[j--] - '0' : 0;
        int s = x + y + carry;
        res[k++] = '0' + (s % 2);
        carry = s / 2;
    }
    for (int l = 0, r = k - 1; l < r; l++, r--) { char t = res[l]; res[l] = res[r]; res[r] = t; }
    res[k] = '\0';
    *returnSize = k;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    string addBinary(string a, string b) {
        int i = a.size() - 1, j = b.size() - 1, carry = 0;
        string res;
        while (i >= 0 || j >= 0 || carry) {
            int x = i >= 0 ? a[i--] - '0' : 0;
            int y = j >= 0 ? b[j--] - '0' : 0;
            int s = x + y + carry;
            res += char('0' + s % 2);
            carry = s / 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript [JavaScript]
var addBinary = function(a, b) {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    let res = '';
    while (i >= 0 || j >= 0 || carry) {
        const x = i >= 0 ? +a[i--] : 0;
        const y = j >= 0 ? +b[j--] : 0;
        const s = x + y + carry;
        res = (s % 2) + res;
        carry = Math.floor(s / 2);
    }
    return res;
};
```

```typescript [TypeScript]
function addBinary(a: string, b: string): string {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    let res = '';
    while (i >= 0 || j >= 0 || carry) {
        const x = i >= 0 ? +a[i--] : 0;
        const y = j >= 0 ? +b[j--] : 0;
        const s = x + y + carry;
        res = (s % 2) + res;
        carry = Math.floor(s / 2);
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(max(|a|, |b|))`，遍历较长字符串一次。
- **空间复杂度**：`O(max(|a|, |b|))`，结果字符串长度。

### 2.2 方法二：利用语言内置大整数


1. **思路**

将二进制字符串按 2 进制解析为大整数（Python 可直接 `int(x, 2)`，JS 用 `BigInt`），相加后再转回二进制字符串。代码极简。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String addBinary(String a, String b) {
        // Java 无内置二进制大整数，可用 BigInteger
        java.math.BigInteger x = new java.math.BigInteger(a, 2);
        java.math.BigInteger y = new java.math.BigInteger(b, 2);
        java.math.BigInteger sum = x.add(y);
        return sum.toString(2);
    }
}
```

```python [Python]
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return bin(int(a, 2) + int(b, 2))[2:]
```

```go [Go]
import "math/big"
func addBinary(a string, b string) string {
    x, _ := new(big.Int).SetString(a, 2)
    y, _ := new(big.Int).SetString(b, 2)
    x.Add(x, y)
    return x.Text(2)
}
```

```c [C]
char* addBinary(char* a, char* b, int* returnSize) {
    // 内置大整数方案在 C 中需借助库，完整实现略
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    string addBinary(string a, string b) {
        // 可用 boost::multiprecision 或自行模拟，完整实现略
        return a;
    }
};
```

```javascript [JavaScript]
var addBinary = function(a, b) {
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};
```

```typescript [TypeScript]
function addBinary(a: string, b: string): string {
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(max(|a|, |b|))`，大整数运算开销。
- **空间复杂度**：`O(max(|a|, |b|))`，结果存储。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 模拟加法 | `O(max(|a|,|b|))` | `O(max(|a|,|b|))` | 不依赖库，推荐 |
| 内置大整数 | `O(max(|a|,|b|))` | `O(max(|a|,|b|))` | 代码最简，依赖库 |
