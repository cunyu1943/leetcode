# [476. 数字的补数](https://leetcode.cn/problems/number-complement/)

## 一、题目描述

给你一个正整数 `num`，返回它的**补数**。补数定义为：把 `num` 的二进制表示中**所有位**（仅含有效位，即不含前导零）取反。

**示例 1：**

```
输入：num = 5
输出：2
解释：5 = 101，取反 010 = 2。
```

**示例 2：**

```
输入：num = 1
输出：0
```

**提示：**

- `1 <= num <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：异或掩码

1. 思路

构造一个与 `num` 同有效位长的全 1 掩码 `mask`（`mask = 2^bits - 1`），返回 `num ^ mask`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findComplement(int num) {
        int mask = (Integer.highestOneBit(num) << 1) - 1;
        return num ^ mask;
    }
}
```

```python [Python]
class Solution:
    def findComplement(self, num: int) -> int:
        mask = (1 << num.bit_length()) - 1
        return num ^ mask
```

```cpp [C++]
class Solution {
public:
    int findComplement(int num) {
        int mask = (1 << (31 - __builtin_clz(num))) * 2 - 1;
        return num ^ mask;
    }
};
```

```go [Go]
func findComplement(num int) int {
	mask := (1 << bits.Len(uint(num))) - 1
	return num ^ mask
}
```

```javascript [JavaScript]
var findComplement = function (num) {
    const bits = num.toString(2).length;
    const mask = (1 << bits) - 1;
    return num ^ mask;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(1)$。
- 空间复杂度：$O(1)$。

## 三、总结

位运算补数 = 同长度全 1 掩码异或。相关题目：405 数字转十六进制、342 4 的幂、231 2 的幂。
