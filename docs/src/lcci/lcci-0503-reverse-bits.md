# [面试题 05.03. 翻转数位](https://leetcode.cn/problems/reverse-bits-lcci/)

## 一、题目描述

给定一个 32 位整数 `num`，你可以将一个数位从 0 变为 1。请编写一个程序，找出你能够获得的最长的一串 1 的长度。

**示例 1：**

```
输入：num = 1775 (11011101111)
输出：8
```

**示例 2：**

```
输入：num = 7 (111)
输出：4
```

**提示：**

- `0 <= num < 2^31`

---

## 二、解答方法

### 2.1 方法一：位运算（记录连续 1 的长度）

**1. 思路**

遍历整数的每一位（共 32 位，因为非负整数最多 31 位，但考虑前导 0 可翻转，按 32 位处理）。用变量 `cur` 记录当前连续 1 的个数，用变量 `pre` 记录上一次连续 1 的个数（即上一个 0 之前的连续 1 个数）。当遇到 0 时，如果将这个 0 翻转为 1，则新的连续 1 长度为 `pre + cur + 1`，更新最大值；然后将 `pre = cur`，`cur = 0`。当遇到 1 时，`cur++`。遍历结束后，还要考虑最后一段 1 加上可能的前导 0 翻转，即 `maxLen = max(maxLen, cur + 1)`（因为可以翻转一个 0）。若 `num` 为 0，则答案为 1。

此方法时间复杂度 O(32)，空间 O(1)。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int reverseBits(int num) {
        int maxLen = 0;
        int cur = 0, pre = 0;
        for (int i = 0; i < 32; i++) {
            if ((num & 1) == 1) {
                cur++;
            } else {
                maxLen = Math.max(maxLen, pre + cur + 1);
                pre = cur;
                cur = 0;
            }
            num >>= 1;
        }
        // 处理最后一段：翻转一个0
        maxLen = Math.max(maxLen, cur + 1);
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def reverseBits(self, num: int) -> int:
        max_len = 0
        cur = 0
        pre = 0
        for _ in range(32):
            if num & 1:
                cur += 1
            else:
                max_len = max(max_len, pre + cur + 1)
                pre = cur
                cur = 0
            num >>= 1
        max_len = max(max_len, cur + 1)
        return max_len
```

```go [Go]
func reverseBits(num int) int {
    maxLen := 0
    cur, pre := 0, 0
    for i := 0; i < 32; i++ {
        if num&1 == 1 {
            cur++
        } else {
            if pre+cur+1 > maxLen {
                maxLen = pre + cur + 1
            }
            pre = cur
            cur = 0
        }
        num >>= 1
    }
    if cur+1 > maxLen {
        maxLen = cur + 1
    }
    return maxLen
}
```

```c [C]
int reverseBits(int num) {
    int maxLen = 0;
    int cur = 0, pre = 0;
    for (int i = 0; i < 32; i++) {
        if (num & 1) {
            cur++;
        } else {
            if (pre + cur + 1 > maxLen) maxLen = pre + cur + 1;
            pre = cur;
            cur = 0;
        }
        num >>= 1;
    }
    if (cur + 1 > maxLen) maxLen = cur + 1;
    return maxLen;
}
```

```cpp [C++]
class Solution {
public:
    int reverseBits(int num) {
        int maxLen = 0;
        int cur = 0, pre = 0;
        for (int i = 0; i < 32; i++) {
            if (num & 1) {
                cur++;
            } else {
                maxLen = max(maxLen, pre + cur + 1);
                pre = cur;
                cur = 0;
            }
            num >>= 1;
        }
        maxLen = max(maxLen, cur + 1);
        return maxLen;
    }
};
```

```javascript [JavaScript]
var reverseBits = function(num) {
    let maxLen = 0;
    let cur = 0, pre = 0;
    for (let i = 0; i < 32; i++) {
        if (num & 1) {
            cur++;
        } else {
            maxLen = Math.max(maxLen, pre + cur + 1);
            pre = cur;
            cur = 0;
        }
        num >>= 1;
    }
    maxLen = Math.max(maxLen, cur + 1);
    return maxLen;
};
```

```typescript [TypeScript]
function reverseBits(num: number): number {
    let maxLen = 0;
    let cur = 0, pre = 0;
    for (let i = 0; i < 32; i++) {
        if (num & 1) {
            cur++;
        } else {
            maxLen = Math.max(maxLen, pre + cur + 1);
            pre = cur;
            cur = 0;
        }
        num >>= 1;
    }
    maxLen = Math.max(maxLen, cur + 1);
    return maxLen;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，仅循环 32 次。
- **空间复杂度**：`O(1)`，只使用常数个变量。

---

### 2.2 方法二：滑动窗口（双指针）

**1. 思路**

将整数转换为 32 位二进制字符串（不足 32 位前面补 0），然后使用滑动窗口维护窗口内 0 的个数不超过 1。当窗口内 0 的个数超过 1 时，移动左指针直到 0 的个数恢复为 1，继续扩展右指针。记录窗口的最大长度。此方法时间复杂度 O(32)，空间复杂度 O(32)（用于存储字符串）。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int reverseBits(int num) {
        String s = String.format("%32s", Integer.toBinaryString(num)).replace(' ', '0');
        int left = 0, zeroCount = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            if (s.charAt(right) == '0') zeroCount++;
            while (zeroCount > 1) {
                if (s.charAt(left) == '0') zeroCount--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

```python [Python]
class Solution:
    def reverseBits(self, num: int) -> int:
        s = format(num, '032b')
        left = 0
        zero_count = 0
        max_len = 0
        for right in range(len(s)):
            if s[right] == '0':
                zero_count += 1
            while zero_count > 1:
                if s[left] == '0':
                    zero_count -= 1
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len
```

```go [Go]
import "fmt"
func reverseBits(num int) int {
    s := fmt.Sprintf("%032b", num)
    left, zeroCount, maxLen := 0, 0, 0
    for right := 0; right < len(s); right++ {
        if s[right] == '0' {
            zeroCount++
        }
        for zeroCount > 1 {
            if s[left] == '0' {
                zeroCount--
            }
            left++
        }
        if right-left+1 > maxLen {
            maxLen = right - left + 1
        }
    }
    return maxLen
}
```

```c [C]
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
int reverseBits(int num) {
    char s[33];
    for (int i = 31; i >= 0; i--) {
        s[31 - i] = ((num >> i) & 1) ? '1' : '0';
    }
    s[32] = '\0';
    int left = 0, zeroCount = 0, maxLen = 0;
    for (int right = 0; right < 32; right++) {
        if (s[right] == '0') zeroCount++;
        while (zeroCount > 1) {
            if (s[left] == '0') zeroCount--;
            left++;
        }
        if (right - left + 1 > maxLen) maxLen = right - left + 1;
    }
    return maxLen;
}
```

```cpp [C++]
class Solution {
public:
    int reverseBits(int num) {
        string s = bitset<32>(num).to_string();
        int left = 0, zeroCount = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            if (s[right] == '0') zeroCount++;
            while (zeroCount > 1) {
                if (s[left] == '0') zeroCount--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

```javascript [JavaScript]
var reverseBits = function(num) {
    let s = num.toString(2).padStart(32, '0');
    let left = 0, zeroCount = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (s[right] === '0') zeroCount++;
        while (zeroCount > 1) {
            if (s[left] === '0') zeroCount--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

```typescript [TypeScript]
function reverseBits(num: number): number {
    let s = num.toString(2).padStart(32, '0');
    let left = 0, zeroCount = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (s[right] === '0') zeroCount++;
        while (zeroCount > 1) {
            if (s[left] === '0') zeroCount--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，固定 32 位。
- **空间复杂度**：`O(1)`，字符串长度为 32，常数空间。

---

## 三、总结

| 方法                 | 时间复杂度 | 空间复杂度 | 特点           |
| -------------------- | ---------- | ---------- | -------------- |
| 位运算（记录连续 1） | `O(1)`     | `O(1)`     | 高效，推荐     |
| 滑动窗口（字符串）   | `O(1)`     | `O(1)`     | 直观，易于理解 |

**推荐**：在实际生产环境中，**位运算方法** 是最佳选择，它无需额外空间，且直接操作位，性能最优。滑动窗口方法虽然容易理解，但需要转换字符串，且代码略长。两种方法均能正确求解。