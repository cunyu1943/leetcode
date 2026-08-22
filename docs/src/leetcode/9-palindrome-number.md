# [9. 回文数](https://leetcode.cn/problems/palindrome-number/)



## 一、题目描述

给你一个整数 `x`，如果 `x` 是一个回文整数，返回 `true`；否则，返回 `false`。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

- 例如，`121` 是回文，而 `123` 不是。

**进阶：**你能不将整数转为字符串来解决这个问题吗？



**示例 1：**

```
输入：x = 121
输出：true
```

**示例 2：**

```
输入：x = -121
输出：false
解释：从左向右读，为 -121 。从右向左读，为 121- 。因此它不是一个回文数。
```

**示例 3：**

```
输入：x = 10
输出：false
解释：从右向左读，为 01 。因此它不是一个回文数。
```

**提示：**

-   `-2^31 <= x <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：反转一半数字

1. **思路**

进阶要求「不转字符串」。注意几个边界：

-   负数直接返回 `false`（`-121` 反转后是 `121-`，含负号）；
-   末尾为 0 且非 0 的数（如 `10`）一定不是回文，因为最高位不会是 0；
-   只需反转「后半段」数字，与「前半段」比较即可，既避免溢出又省一半时间。

反转过程：`rev = rev * 10 + x % 10; x /= 10`，当 `x <= rev` 时后半段已不短于前半段，停止。偶数长度时 `x == rev` 即回文；奇数长度时 `x == rev / 10`（去掉中间位）即回文。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return x == rev || x == rev / 10;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False
        rev = 0
        while x > rev:
            rev = rev * 10 + x % 10
            x //= 10
        return x == rev or x == rev // 10
```

```go [Go]
func isPalindrome(x int) bool {
    if x < 0 || (x%10 == 0 && x != 0) {
        return false
    }
    rev := 0
    for x > rev {
        rev = rev*10 + x%10
        x /= 10
    }
    return x == rev || x == rev/10
}
```

```c [C]
int isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return 0;
    int rev = 0;
    while (x > rev) {
        rev = rev * 10 + x % 10;
        x /= 10;
    }
    return x == rev || x == rev / 10;
}
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return x == rev || x == rev / 10;
    }
};
```

```js [JavaScript]
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let rev = 0;
    while (x > rev) {
        rev = rev * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    return x === rev || x === Math.floor(rev / 10);
};
```

```ts [TypeScript]
function isPalindrome(x: number): boolean {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let rev = 0;
    while (x > rev) {
        rev = rev * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    return x === rev || x === Math.floor(rev / 10);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log|x|)`，反转的位数约为 `x` 十进制位数的一半。
- **空间复杂度**：`O(1)`，只使用常数个变量。

### 2.2 方法二：转为字符串比较

1. **思路**

最直观：把整数转为字符串，再用双指针从两端向中间比较字符是否相等（或反转字符串后比较）。实现简单，但需要额外的字符串空间，且不满足进阶要求。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public boolean isPalindrome(int x) {
        String s = String.valueOf(x);
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isPalindrome(self, x: int) -> bool:
        s = str(x)
        return s == s[::-1]
```

```go [Go]
import "strconv"

func isPalindrome(x int) bool {
    s := strconv.Itoa(x)
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        if s[i] != s[j] {
            return false
        }
    }
    return true
}
```

```c [C]
#include <stdio.h>

int isPalindrome(int x) {
    if (x < 0) return 0;
    char buf[12];
    sprintf(buf, "%d", x);
    int n = 0;
    while (buf[n]) n++;
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        if (buf[i] != buf[j]) return 0;
    }
    return 1;
}
```

```cpp [C++]
class Solution {
public:
    bool isPalindrome(int x) {
        string s = to_string(x);
        int left = 0, right = s.size() - 1;
        while (left < right) {
            if (s[left++] != s[right--]) return false;
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    const s = String(x);
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left++] !== s[right--]) return false;
    }
    return true;
};
```

```ts [TypeScript]
function isPalindrome(x: number): boolean {
    const s = String(x);
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left++] !== s[right--]) return false;
    }
    return true;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log|x|)`，字符串长度与 `x` 位数成正比。
- **空间复杂度**：`O(log|x|)`，需要存储字符串表示。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 反转一半数字 | `O(log|x|)` | `O(1)` | 常规实现 |
| 转为字符串比较 | `O(log|x|)` | `O(log|x|)` | 常规实现 |

