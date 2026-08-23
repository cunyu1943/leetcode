# [LCR 019. 验证回文串 II](https://leetcode.cn/problems/RQlu7C/)



## 一、题目描述

给定一个非空字符串 `s`，**最多**删除一个字符。判断是否能成为回文字符串。



**示例 1：**

```
输入: s = "aba"
输出: true
解释: 删去 'b' 或 'a' 仍是回文。
```

**示例 2：**

```
输入: s = "abca"
输出: true
解释: 可以删除 'c' 字符，或 'b' 字符。
```

**示例 3：**

```
输入: s = "abc"
输出: false
```

**提示：**

- `1 <= s.length <= 10⁵`
- `s` 由小写英文字母组成



## 二、解答方法

### 2.1 方法一：贪心 + 双指针

1. **思路**

先用双指针判断 `s` 本身是否回文。当遇到 `s[l] != s[r]` 时，由于最多允许删一个字符，只需分别尝试「跳过左端」(`l+1, r`) 或「跳过右端」(`l, r-1`)，看剩余部分是否为回文。只要其中一个是回文即可。

用辅助函数 `check(l, r)` 判断子串是否回文，整体时间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return check(s, l + 1, r) || check(s, l, r - 1);
            }
            l++; r--;
        }
        return true;
    }
    private boolean check(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def validPalindrome(self, s: str) -> bool:
        def check(l: int, r: int) -> bool:
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True
        l, r = 0, len(s) - 1
        while l < r:
            if s[l] != s[r]:
                return check(l + 1, r) or check(l, r - 1)
            l += 1
            r -= 1
        return True
```

```cpp [C++]
class Solution {
public:
    bool validPalindrome(string s) {
        auto check = [&](int l, int r) -> bool {
            while (l < r) {
                if (s[l++] != s[r--]) return false;
            }
            return true;
        };
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (s[l] != s[r]) return check(l + 1, r) || check(l, r - 1);
            l++; r--;
        }
        return true;
    }
};
```

```go [Go]
func validPalindrome(s string) bool {
    check := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }
    l, r := 0, len(s)-1
    for l < r {
        if s[l] != s[r] {
            return check(l+1, r) || check(l, r-1)
        }
        l++
        r--
    }
    return true
}
```

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    const check = (l, r) => {
        while (l < r) {
            if (s[l++] !== s[r--]) return false;
        }
        return true;
    };
    let l = 0, r = s.length - 1;
    while (l < r) {
        if (s[l] !== s[r]) return check(l + 1, r) || check(l, r - 1);
        l++; r--;
    }
    return true;
};
```

```c [C]
#include <string.h>

static int check(char* s, int l, int r) {
    while (l < r) {
        if (s[l++] != s[r--]) return 0;
    }
    return 1;
}

int validPalindrome(char* s) {
    int l = 0, r = (int)strlen(s) - 1;
    while (l < r) {
        if (s[l] != s[r]) return check(s, l + 1, r) || check(s, l, r - 1);
        l++; r--;
    }
    return 1;
}
```

```ts [TypeScript]
function validPalindrome(s: string): boolean {
    const check = (l: number, r: number): boolean => {
        while (l < r) {
            if (s[l++] !== s[r--]) return false;
        }
        return true;
    };
    let l = 0, r = s.length - 1;
    while (l < r) {
        if (s[l] !== s[r]) return check(l + 1, r) || check(l, r - 1);
        l++; r--;
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，最多做两遍 `check`，每次 `O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心 + 双指针 | `O(n)` | `O(1)` | 遇到失配二选一跳过，最优 |

遇到第一个不相等的位置时，只需验证「删左」或「删右」两种可能，避免了回溯，是本题的核心贪心策略。

