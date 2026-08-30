# [479. 最大回文数乘积](https://leetcode.cn/problems/largest-palindrome-product/)

## 一、题目描述

给定整数 `n`，返回由 `n` 位数的两个因子相乘得到的**最大回文数**，结果对 `1337` 取模。

`n` 位数字范围 `[10^(n-1), 10^n - 1]`。

**示例 1：**

```
输入：n = 2
输出：987
解释：99 * 91 = 9009，是两位因数能构成的最大回文，9009 % 1337 = 987。
```

**示例 2：**

```
输入：n = 1
输出：9
```

**提示：**

- `1 <= n <= 8`

## 二、解答方法

### 2.1 方法一：构造回文 + 试除

1. 思路

`n` 位因数乘积最多 `2n` 位，回文数可由其前半部分生成：枚举前半 `left`（从大到小，从 `10^n-1` 到 `10^(n-1)`），构造回文 `pal = int(str(left) + str(left)[::-1])`（`2n` 位）或 `2n-1` 位变体。对每个 `pal`，检查是否存在 `n` 位因子（从 `10^n-1` 向下到 `√pal` 试除，`pal % f == 0` 且另一个因子也是 `n` 位）。找到即返回 `pal % 1337`。`n == 1` 特判返回 9。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def largestPalindrome(self, n: int) -> int:
        if n == 1:
            return 9
        hi = 10 ** n - 1
        lo = 10 ** (n - 1)
        for left in range(hi, lo - 1, -1):
            s = str(left)
            pal = int(s + s[::-1])          # 2n 位回文
            f = hi
            while f * f >= pal:
                if pal % f == 0:
                    other = pal // f
                    if lo <= other <= hi:
                        return pal % 1337
                f -= 1
        return -1
```

```java [Java]
class Solution {
    public int largestPalindrome(int n) {
        if (n == 1) return 9;
        long hi = (long) Math.pow(10, n) - 1;
        long lo = (long) Math.pow(10, n - 1);
        for (long left = hi; left >= lo; left--) {
            String s = String.valueOf(left);
            String rev = new StringBuilder(s).reverse().toString();
            long pal = Long.parseLong(s + rev);
            for (long f = hi; f * f >= pal; f--) {
                if (pal % f == 0) {
                    long other = pal / f;
                    if (other >= lo && other <= hi) return (int) (pal % 1337);
                }
            }
        }
        return -1;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(10^n \cdot 10^n)$，但很快找到，实际很快。
- 空间复杂度：$O(1)$。

## 三、总结

「枚举回文前半 + 试除」是回文乘积题的典型做法。相关题目：9 回文数、5 最长回文子串、214 最短回文串。
