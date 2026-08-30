# [231. 2 的幂](https://leetcode.cn/problems/power-of-two/)



## 一、题目描述

给你一个整数 `n`，请你判断该整数是否是 2 的幂次方。如果是，返回 `true` ；否则，返回 `false` 。

如果存在一个整数 `x` 使得 `n == 2ˣ` ，则认为 `n` 是 2 的幂次方。

**示例 1：**

```
输入：n = 1
输出：true
解释：2⁰ = 1
```

**示例 2：**

```
输入：n = 16
输出：true
解释：2⁴ = 16
```

**示例 3：**

```
输入：n = 3
输出：false
```

**提示：**

-   `-2³¹ <= n <= 2³¹ - 1`

**进阶：** 你能够不使用循环/递归解决此问题吗？



## 二、解答方法

### 2.1 方法一：位运算 n & (n-1)（最优）

1. **思路**

2 的幂的二进制表示 **只有一个 1**（如 `8 = 0b1000`）。而 `n & (n - 1)` 会消去最低位的 1。因此若 `n` 是 2 的幂，则 `n & (n-1) == 0`。

注意排除 `n <= 0` 的情况（`n = 0` 时 `0 & -1 == 0`，会误判）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

```python [Python]
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0
```

```go [Go]
func isPowerOfTwo(n int) bool {
    return n > 0 && (n&(n-1)) == 0
}
```

```cpp [C++]
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    return n > 0 && (n & (n - 1)) === 0;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：n & -n（最低位 1 提取）

1. **思路**

`n & (-n)` 可以提取 `n` 的最低位 1。若 `n` 是 2 的幂，则最低位的 1 就是它本身，即 `n & (-n) == n`。

2. **代码实现（Python）**

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & -n) == n
```

### 2.3 方法三：循环除 2

1. **思路**

不断对 `n` 除以 2（用取模判断余数），直到不能整除为止，最后检查是否为 1。

2. **代码实现（Python）**

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n <= 0:
            return False
        while n % 2 == 0:
            n //= 2
        return n == 1
```

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间 | 特点 |
| ---- | ---- | ---- |
| `n & (n-1) == 0` | `O(1)` | 最优，推荐 |
| `n & -n == n` | `O(1)` | 同理 |
| 循环除 2 | `O(log n)` | 直观但需循环 |

位运算 trick 家族：
- `n & (n - 1)`：消去最低位的 1 → 判断 2 的幂、统计 1 的个数（191 题）；
- `n & -n`：提取最低位的 1 → lowbit 运算（树状数组基础）；
- 判断 4 的幂（342 题）：额外要求这个 1 在 **奇数位**，用掩码 `0x55555555` 判断。

务必记得 `n > 0` 的前置判断，否则 `n = 0` 会误判为 true。
