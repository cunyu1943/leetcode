# [415. 字符串相加](https://leetcode.cn/problems/add-strings/)

## 一、题目描述

给定两个非负整数字符串 `num1` 和 `num2`，返回它们的和（也以字符串形式）。

不能使用任何内置的大整数库（如 `BigInteger`），也不能直接将输入转为整数。

**示例 1：**

```
输入：num1 = "11", num2 = "123"
输出："134"
```

**示例 2：**

```
输入：num1 = "456", num2 = "77"
输出："533"
```

**示例 3：**

```
输入：num1 = "0", num2 = "0"
输出："0"
```

**提示：**

- `1 <= num1.length, num2.length <= 10^4`
- `num1` 和 `num2` 仅由数字组成，不含前导零（除 `"0"` 本身）

## 二、解答方法

### 2.1 方法一：模拟竖式加法

1. 思路

双指针从末位向首位遍历，逐位相加并维护进位 `carry`，拼接结果后反转。注意处理较长的数剩余部分与最后的进位。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String addStrings(String num1, String num2) {
        StringBuilder sb = new StringBuilder();
        int i = num1.length() - 1, j = num2.length() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry != 0) {
            int x = i >= 0 ? num1.charAt(i--) - '0' : 0;
            int y = j >= 0 ? num2.charAt(j--) - '0' : 0;
            int sum = x + y + carry;
            sb.append(sum % 10);
            carry = sum / 10;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        i, j, carry = len(num1) - 1, len(num2) - 1, 0
        res = []
        while i >= 0 or j >= 0 or carry:
            x = int(num1[i]) if i >= 0 else 0
            y = int(num2[j]) if j >= 0 else 0
            s = x + y + carry
            res.append(str(s % 10))
            carry = s // 10
            i -= 1
            j -= 1
        return "".join(reversed(res))
```

```cpp [C++]
class Solution {
public:
    string addStrings(string num1, string num2) {
        string res;
        int i = num1.size() - 1, j = num2.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry) {
            int x = i >= 0 ? num1[i--] - '0' : 0;
            int y = j >= 0 ? num2[j--] - '0' : 0;
            int s = x + y + carry;
            res += char(s % 10 + '0');
            carry = s / 10;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```go [Go]
func addStrings(num1 string, num2 string) string {
	i, j, carry := len(num1)-1, len(num2)-1, 0
	res := []byte{}
	for i >= 0 || j >= 0 || carry > 0 {
		x, y := 0, 0
		if i >= 0 {
			x = int(num1[i] - '0')
			i--
		}
		if j >= 0 {
			y = int(num2[j] - '0')
			j--
		}
		s := x + y + carry
		res = append([]byte{byte(s%10 + '0')}, res...)
		carry = s / 10
	}
	return string(res)
}
```

```javascript [JavaScript]
var addStrings = function (num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, carry = 0;
    let res = "";
    while (i >= 0 || j >= 0 || carry) {
        const x = i >= 0 ? num1.charCodeAt(i--) - 48 : 0;
        const y = j >= 0 ? num2.charCodeAt(j--) - 48 : 0;
        const s = x + y + carry;
        res = (s % 10) + res;
        carry = Math.floor(s / 10);
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(\max(|num1|, |num2|))$。
- 空间复杂度：$O(\max(|num1|, |num2|))$。

## 三、总结

大数运算的基石：逐位 + 进位。相关题目：43 字符串相乘、67 二进制求和、445 两数相加 II、369 给单链表加一。
