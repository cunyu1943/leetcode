# [405. 数字转换为十六进制数](https://leetcode.cn/problems/convert-a-number-to-hexadecimal/)

## 一、题目描述

给定一个 32 位有符号整数 `num`，返回它的十六进制字符串表示。

要求：

- 所有字母用小写；
- 负数用补码（two's complement）表示；
- 不能包含前导零，除数值 `0` 本身返回 `"0"`。

**示例 1：**

```
输入：num = 26
输出："1a"
```

**示例 2：**

```
输入：num = -1
输出："ffffffff"
```

**提示：**

- `-2^31 <= num <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：按 4 位分组（无符号右移）

1. 思路

把整数从低位到高位每 4 位（半个字节）取一次对应的十六进制字符，共 8 组。对负数用**无符号右移**（`>>>`，Python 中先 `& 0xFFFFFFFF`）处理补码。拼接后去掉前导零。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public String toHex(int num) {
        if (num == 0) return "0";
        char[] hex = "0123456789abcdef".toCharArray();
        StringBuilder sb = new StringBuilder();
        while (num != 0) {
            sb.append(hex[num & 0xf]);
            num >>>= 4;
        }
        return sb.reverse().toString();
    }
}
```

```python [Python]
class Solution:
    def toHex(self, num: int) -> str:
        if num == 0:
            return "0"
        hexd = "0123456789abcdef"
        num &= 0xFFFFFFFF
        res = []
        while num:
            res.append(hexd[num & 0xf])
            num >>= 4
        return "".join(reversed(res))
```

```cpp [C++]
class Solution {
public:
    string toHex(int num) {
        if (num == 0) return "0";
        string hex = "0123456789abcdef";
        string res;
        unsigned int n = num;
        while (n) {
            res = hex[n & 0xf] + res;
            n >>= 4;
        }
        return res;
    }
};
```

```go [Go]
func toHex(num int) string {
	if num == 0 {
		return "0"
	}
	hex := "0123456789abcdef"
	n := uint32(num)
	res := []byte{}
	for n != 0 {
		res = append([]byte{hex[n&0xf]}, res...)
		n >>= 4
	}
	return string(res)
}
```

```javascript [JavaScript]
var toHex = function (num) {
    if (num === 0) return "0";
    const hex = "0123456789abcdef";
    let n = num >>> 0;
    let res = "";
    while (n) {
        res = hex[n & 0xf] + res;
        n >>>= 4;
    }
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(1)$，最多循环 8 次。
- 空间复杂度：$O(1)$。

## 三、总结

位运算中取低 4 位用 `x & 0xf`，右移用无符号右移保证负数补码正确。相关题目：190 颠倒二进制位、191 位 1 的个数、231 2 的幂、342 4 的幂。
