# [326. 3 的幂](https://leetcode.cn/problems/power-of-three/)

## 一、题目描述

给定一个整数 `n`，判断它是否为 `3` 的幂次方（即 `n == 3^x`，`x` 为非负整数）。

**示例：**
```
输入：n = 27   输出：true
输入：n = 0    输出：false
输入：n = 45   输出：false
```

**提示：** `-2³¹ <= n <= 2³¹ - 1`。进阶：不用循环/递归。

## 二、解答方法

### 方法一：循环除 3

**思路：** 不断 `n % 3 == 0` 则 `n /= 3`，最后 `n == 1` 则为真。`n <= 0` 直接 false。

:::::: code-group

```java [Java]
class Solution {
    public boolean isPowerOfThree(int n) {
        if (n <= 0) return false;
        while (n % 3 == 0) n /= 3;
        return n == 1;
    }
}
```

```python [Python]
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        if n <= 0: return False
        while n % 3 == 0: n //= 3
        return n == 1
```

```cpp [C++]
class Solution {
public:
    bool isPowerOfThree(int n) {
        if (n <= 0) return false;
        while (n % 3 == 0) n /= 3;
        return n == 1;
    }
};
```

```go [Go]
func isPowerOfThree(n int) bool {
    if n <= 0 { return false }
    for n % 3 == 0 { n /= 3 }
    return n == 1
}
```

```js [JavaScript]
var isPowerOfThree = function (n) {
    if (n <= 0) return false;
    while (n % 3 === 0) n /= 3;
    return n === 1;
};
```

::::::

### 方法二：整数上界 trick（O(1)）

**思路：** 在 32 位有符号整数范围内，最大的 3 的幂是 `3^19 = 1162261467`。它是所有 3 的幂的公约数，故 `n > 0 && 1162261467 % n == 0` 即真。

:::::: code-group

```java [Java]
class Solution {
    public boolean isPowerOfThree(int n) {
        return n > 0 && 1162261467 % n == 0;
    }
}
```

```python [Python]
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        return n > 0 and 1162261467 % n == 0
```

```cpp [C++]
class Solution {
public:
    bool isPowerOfThree(int n) {
        return n > 0 && 1162261467 % n == 0;
    }
};
```

```go [Go]
func isPowerOfThree(n int) bool {
    return n > 0 && 1162261467 % n == 0
}
```

```js [JavaScript]
var isPowerOfThree = function (n) {
    return n > 0 && 1162261467 % n === 0;
};
```

::::::

**复杂度：** 方法一 `O(log₃n)`，方法二 `O(1)`，空间 `O(1)`。

## 三、总结

`3 的幂` 与 `231 2 的幂`（位运算 `n & (n-1)`）、`342 4 的幂`（偶数个 0）同类。循环法通用；O(1) 法依赖「整数范围内最大幂」的整除性质。注意负数和 0 直接 false。
