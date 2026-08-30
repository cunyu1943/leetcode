# [461. 汉明距离](https://leetcode.cn/problems/hamming-distance/)

## 一、题目描述

两个整数之间的 **汉明距离** 指的是这两个数字对应二进制位不同的位置的数目。给你两个整数 `x` 和 `y`，计算并返回它们之间的汉明距离。

**示例 1：**

```
输入：x = 1, y = 3
输出：2
解释：1 = 001, 3 = 011，第 0、1 位不同，距离为 2。
```

**示例 2：**

```
输入：x = 4, y = 1
输出：2
```

**提示：**

- `0 <= x, y <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：异或 + 统计 1 的个数

1. 思路

先 `x ^ y` 得到所有不同位为 1 的数，再统计其中 1 的个数（Brian Kernighan 法或内置 popcount）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int hammingDistance(int x, int y) {
        return Integer.bitCount(x ^ y);
    }
}
```

```python [Python]
class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        return (x ^ y).bit_count()
```

```cpp [C++]
class Solution {
public:
    int hammingDistance(int x, int y) {
        return __builtin_popcount(x ^ y);
    }
};
```

```go [Go]
func hammingDistance(x, y int) int {
	return bits.OnesCount(uint(x ^ y))
}
```

```javascript [JavaScript]
var hammingDistance = function (x, y) {
    let v = x ^ y, c = 0;
    while (v) { v &= v - 1; c++; }
    return c;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(1)$，最多 31 次。
- 空间复杂度：$O(1)$。

## 三、总结

异或 + 位计数。相关题目：477 总汉明距离、191 位 1 的个数、405 数字转十六进制。
