# [393. UTF-8 编码验证](https://leetcode.cn/problems/utf-8-validation/)

## 一、题目描述

给定一个表示数据的整数数组 `data`，返回 `true` 当且仅当它是有效的 UTF-8 编码。

UTF-8 中的一个字符可能的长度为 1 到 4 字节，遵循如下规则：

- 对于 1 字节的字符，字节的第一位设为 `0`，后面 7 位为这个符号的 unicode 码；
- 对于 n 字节的字符 (n > 1)，第一个字节的前 n 位都设为 `1`，第 n+1 位设为 `0`，后面字节的前两位一律设为 `10`。

**示例 1：**

```
输入：data = [197,130,1]
输出：true
解释：数据表示字节序列 11000101 10000010 00000001，这是有效的 2 字节字符 followed by 1 字节字符。
```

**示例 2：**

```
输入：data = [235,140,4]
输出：false
解释：第三字节以 0 开头，不是 10xxxxxx 形式。
```

**提示：**

- `1 <= data.length <= 2 * 10^4`
- `0 <= data[i] <= 255`

## 二、解答方法

### 2.1 方法一：按规则模拟

1. 思路

遍历每个字节：

- 若当前无「待续字节」且首位是 0，说明是 1 字节字符，继续；
- 否则根据前导 1 的个数确定这是一个多字节字符的起始字节，并设定接下来需要的续字节数 `need`；
- 续字节必须满足 `10xxxxxx` 形式（即 `(b & 0xC0) == 0x80`）。

任意不满足即返回 `false`；遍历结束需 `need == 0`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public boolean validUtf8(int[] data) {
        int need = 0;
        for (int b : data) {
            if (need == 0) {
                if ((b & 0x80) == 0) continue;
                else if ((b & 0xE0) == 0xC0) need = 1;
                else if ((b & 0xF0) == 0xE0) need = 2;
                else if ((b & 0xF8) == 0xF0) need = 3;
                else return false;
            } else {
                if ((b & 0xC0) != 0x80) return false;
                need--;
            }
        }
        return need == 0;
    }
}
```

```python [Python]
class Solution:
    def validUtf8(self, data: List[int]) -> bool:
        need = 0
        for b in data:
            if need == 0:
                if b >> 7 == 0:
                    continue
                elif b >> 5 == 0b110:
                    need = 1
                elif b >> 4 == 0b1110:
                    need = 2
                elif b >> 3 == 0b11110:
                    need = 3
                else:
                    return False
            else:
                if b >> 6 != 0b10:
                    return False
                need -= 1
        return need == 0
```

```cpp [C++]
class Solution {
public:
    bool validUtf8(vector<int>& data) {
        int need = 0;
        for (int b : data) {
            if (need == 0) {
                if ((b & 0x80) == 0) continue;
                else if ((b & 0xE0) == 0xC0) need = 1;
                else if ((b & 0xF0) == 0xE0) need = 2;
                else if ((b & 0xF8) == 0xF0) need = 3;
                else return false;
            } else {
                if ((b & 0xC0) != 0x80) return false;
                need--;
            }
        }
        return need == 0;
    }
};
```

```go [Go]
func validUtf8(data []int) bool {
	need := 0
	for _, b := range data {
		if need == 0 {
			switch {
			case b&0x80 == 0:
			case b&0xE0 == 0xC0:
				need = 1
			case b&0xF0 == 0xE0:
				need = 2
			case b&0xF8 == 0xF0:
				need = 3
			default:
				return false
			}
		} else {
			if b&0xC0 != 0x80 {
				return false
			}
			need--
		}
	}
	return need == 0
}
```

```javascript [JavaScript]
var validUtf8 = function (data) {
    let need = 0;
    for (const b of data) {
        if (need === 0) {
            if ((b & 0x80) === 0) continue;
            else if ((b & 0xE0) === 0xC0) need = 1;
            else if ((b & 0xF0) === 0xE0) need = 2;
            else if ((b & 0xF8) === 0xF0) need = 3;
            else return false;
        } else {
            if ((b & 0xC0) !== 0x80) return false;
            need--;
        }
    }
    return need === 0;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$，其中 $n$ 为数组长度。
- 空间复杂度：$O(1)$。

## 三、总结

本题本质是位运算 + 状态机，关键是「续字节计数」变量。类似的按位（位掩码）判断技巧还出现在 191、201、231、342 等题目中。
