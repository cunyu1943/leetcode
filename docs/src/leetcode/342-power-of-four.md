# [342. 4 的幂](https://leetcode.cn/problems/power-of-four/)

## 一、题目描述

给定一个整数 `n`，判断它是否为 `4` 的幂次方（即 `n == 4^x`，`x` 为非负整数）。

**示例：**
```
输入：n = 16   输出：true
输入：n = 5    输出：false
```

**提示：** `-2³¹ <= n <= 2³¹-1`。

## 二、解答方法

### 方法一：位运算

**思路：** 4 的幂是 2 的幂，且二进制里 `1` 在 **偶数位**（第 0,2,4... 位）。判定：
1. `n > 0 && (n & (n-1)) == 0`（是 2 的幂）；
2. `n & 0x55555555 != 0`（1 落在偶数位，掩码 `0101...` 的奇位/偶位约定依语言，0x55555555 是低位起第 1,3,5... 为 1，对应偶数位索引）。
或用 `n % 3 == 1`（4^x % 3 = 1，而 2 的幂中 2^(奇数) % 3 = 2）。

:::::: code-group

```java [Java]
class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}
```

```python [Python]
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0
```

```cpp [C++]
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555);
    }
};
```

```go [Go]
func isPowerOfFour(n int) bool {
    return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0
}
```

```js [JavaScript]
var isPowerOfFour = function (n) {
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
};
```

::::::

### 方法二：取模（更直观）

**思路：** 4 的幂满足 `n % 3 == 1`（因为 `4 ≡ 1 mod 3`，`4^x ≡ 1`；而 `2^(2k+1) = 2·4^k ≡ 2 mod 3`）。

:::::: code-group

```java [Java]
class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && n % 3 == 1;
    }
}
```

```python [Python]
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and n % 3 == 1
```

```cpp [C++]
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && n % 3 == 1;
    }
};
```

```go [Go]
func isPowerOfFour(n int) bool {
    return n > 0 && (n & (n - 1)) == 0 && n % 3 == 1
}
```

```js [JavaScript]
var isPowerOfFour = function (n) {
    return n > 0 && (n & (n - 1)) === 0 && n % 3 === 1;
};
```

::::::

**复杂度：** 时间 `O(1)`，空间 `O(1)`。

## 三、总结

`4 的幂` 是 `231/326` 系列延续：2 的幂（位消）、3 的幂（最大整除）、4 的幂（偶数位 + `%3==1`）。位法用掩码 `0x55555555` 检查 1 在偶数位（含 `1,4,16...`）；取模法更直观。注意负数和 0 false。
