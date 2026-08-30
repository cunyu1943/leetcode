# [191. 位 1 的个数](https://leetcode.cn/problems/number-of-1-bits/)



## 一、题目描述

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 `'1'` 的个数（也被称为 **汉明重量**）。



**示例 1：**

```
输入：n = 00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
```

**示例 2：**

```
输入：n = 00000000000000000000000010000000
输出：1
解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
```

**示例 3：**

```
输入：n = 11111111111111111111111111111101
输出：31
解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
```

**提示：**

-   输入必须是长度为 `32` 的 **二进制串** 。

**进阶：** 如果多次调用这个函数，你将如何优化？



## 二、解答方法

### 2.1 方法一：逐位检查

1. **思路**

循环 32 次，每次检查 `n & 1` 是否为 1，再 `n >>>= 1`（无符号右移）。

2. **代码实现（Python）**

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        for _ in range(32):
            count += n & 1
            n >>= 1
        return count
```

### 2.2 方法二：n & (n-1) 消去最低位 1（最优）

1. **思路**

`n & (n - 1)` 会把 `n` 的最低位 `1` 消去。反复执行直到 `n == 0`，执行次数即 1 的个数。只循环 1 的个数次，比固定 32 次更快。

2. **代码实现**

:::::: code-group

```java [Java]
public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= n - 1;
            count++;
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= n - 1
            count += 1
        return count
```

```go [Go]
func hammingWeight(num uint32) int {
    count := 0
    for num != 0 {
        num &= num - 1
        count++
    }
    return count
}
```

```cpp [C++]
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) {
            n &= n - 1;
            count++;
        }
        return count;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    let count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
};
```

```ts [TypeScript]
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
function hammingWeight(n: number): number {
    let count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
}
```

::::::

3. **复杂度分析**

- **逐位法**：`O(1)`（32 次）。
- **n & (n-1)**：`O(k)`，k 为 1 的个数，更优。

### 2.3 方法三：查表法（多次调用优化）

1. **思路**

预处理 0~255 每字节的 1 个数查表，把 32 位拆成 4 个字节分别查表求和。适合极高频调用。

2. **代码实现（Python）**

```python
class Solution:
    def __init__(self):
        self.tb = [0] * 256
        for i in range(256):
            self.tb[i] = (i & 1) + self.tb[i >> 1]

    def hammingWeight(self, n: int) -> int:
        return self.tb[n & 0xff] + self.tb[(n >> 8) & 0xff] + \
               self.tb[(n >> 16) & 0xff] + self.tb[(n >> 24) & 0xff]
```

## 三、总结

| 方法 | 循环次数 | 特点 |
| ---- | -------- | ---- |
| 逐位检查 | 32 | 简单 |
| `n & (n-1)` | k（1 的个数） | 面试推荐 |
| 查表法 | 4（字节级） | 极高频调用优化 |

`n & (n - 1)` 是位运算经典 trick，可「一次消去一个 1」，引申到「判断 2 的幂」：`n & (n-1) == 0`。
