# [面试题 17.06. 2 出现的次数](https://leetcode.cn/problems/number-of-2s-in-range-lcci/)

## 一、题目描述

编写一个方法，计算从 `0` 到 `n`（含 `n`）中数字 `2` 出现的次数。

**示例：**

```
输入: 25
输出: 9
解释: 2 出现在以下数字中：(2), 12, 20, 21, 22(出现两次), 23, 24, 25，共 9 次。
```

**提示：**

- `n <= 10^9`。

---

## 二、解答方法

### 2.1 方法一：按位统计（数位拆分）

**1. 思路**

对每一位（个位、十位、百位……）单独统计数字 2 出现的次数。设当前位权为 `digit`，当前位数字为 `cur`，高位 `high`，低位 `low`：

- 若 `cur < 2`：`count += high * digit`
- 若 `cur == 2`：`count += high * digit + low + 1`
- 若 `cur > 2`：`count += (high + 1) * digit`

遍历所有位累加即可，复杂度与位数相关。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int numberOf2sInRange(int n) {
        int count = 0;
        long digit = 1;
        while (n / digit != 0) {
            long high = n / (digit * 10);
            long cur = (n / digit) % 10;
            long low = n % digit;
            if (cur < 2) count += high * digit;
            else if (cur == 2) count += high * digit + low + 1;
            else count += (high + 1) * digit;
            digit *= 10;
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def numberOf2sInRange(self, n: int) -> int:
        count, digit = 0, 1
        while n // digit != 0:
            high = n // (digit * 10)
            cur = (n // digit) % 10
            low = n % digit
            if cur < 2:
                count += high * digit
            elif cur == 2:
                count += high * digit + low + 1
            else:
                count += (high + 1) * digit
            digit *= 10
        return count
```

```go [Go]
func numberOf2sInRange(n int) int {
    count := 0
    digit := 1
    for n/digit != 0 {
        high := n / (digit * 10)
        cur := (n / digit) % 10
        low := n % digit
        if cur < 2 {
            count += high * digit
        } else if cur == 2 {
            count += high*digit + low + 1
        } else {
            count += (high + 1) * digit
        }
        digit *= 10
    }
    return count
}
```

```c [C]
int numberOf2sInRange(int n) {
    int count = 0;
    long digit = 1;
    while (n / digit != 0) {
        long high = n / (digit * 10);
        long cur = (n / digit) % 10;
        long low = n % digit;
        if (cur < 2) count += high * digit;
        else if (cur == 2) count += high * digit + low + 1;
        else count += (high + 1) * digit;
        digit *= 10;
    }
    return count;
}
```

```cpp [C++]
class Solution {
public:
    int numberOf2sInRange(int n) {
        int count = 0;
        long digit = 1;
        while (n / digit != 0) {
            long high = n / (digit * 10);
            long cur = (n / digit) % 10;
            long low = n % digit;
            if (cur < 2) count += high * digit;
            else if (cur == 2) count += high * digit + low + 1;
            else count += (high + 1) * digit;
            digit *= 10;
        }
        return count;
    }
};
```

```javascript [JavaScript]
var numberOf2sInRange = function(n) {
    let count = 0, digit = 1;
    while (Math.floor(n / digit) !== 0) {
        const high = Math.floor(n / (digit * 10));
        const cur = Math.floor(n / digit) % 10;
        const low = n % digit;
        if (cur < 2) count += high * digit;
        else if (cur === 2) count += high * digit + low + 1;
        else count += (high + 1) * digit;
        digit *= 10;
    }
    return count;
};
```

```typescript [TypeScript]
function numberOf2sInRange(n: number): number {
    let count = 0, digit = 1;
    while (Math.floor(n / digit) !== 0) {
        const high = Math.floor(n / (digit * 10));
        const cur = Math.floor(n / digit) % 10;
        const low = n % digit;
        if (cur < 2) count += high * digit;
        else if (cur === 2) count += high * digit + low + 1;
        else count += (high + 1) * digit;
        digit *= 10;
    }
    return count;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(log n)`，位数。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：逐数统计（暴力）

**1. 思路**

从 1 到 n 逐个数字转字符串，统计字符 '2' 出现次数。实现最简单，但 `n` 较大时超时。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int numberOf2sInRange(int n) {
        int count = 0;
        for (int i = 2; i <= n; i++) {
            int t = i;
            while (t > 0) {
                if (t % 10 == 2) count++;
                t /= 10;
            }
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def numberOf2sInRange(self, n: int) -> int:
        return sum(str(i).count('2') for i in range(n + 1))
```

```cpp [C++]
class Solution {
public:
    int numberOf2sInRange(int n) {
        int count = 0;
        for (int i = 2; i <= n; i++) {
            int t = i;
            while (t) { if (t % 10 == 2) count++; t /= 10; }
        }
        return count;
    }
};
```

```javascript [JavaScript]
var numberOf2sInRange = function(n) {
    let count = 0;
    for (let i = 2; i <= n; i++) {
        let t = i;
        while (t) { if (t % 10 === 2) count++; t = Math.floor(t / 10); }
    }
    return count;
};
```

```typescript [TypeScript]
function numberOf2sInRange(n: number): number {
    let count = 0;
    for (let i = 2; i <= n; i++) {
        let t = i;
        while (t) { if (t % 10 === 2) count++; t = Math.floor(t / 10); }
    }
    return count;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法           | 时间复杂度  | 空间复杂度 | 特点                       |
| -------------- | ----------- | ---------- | -------------------------- |
| 按位统计       | `O(log n)`  | `O(1)`     | 最优，推荐                 |
| 逐数统计       | `O(n log n)`| `O(1)`     | 简单，n 大超时             |

**推荐**：使用按位统计法，对每一位利用 high/cur/low 规律快速计算。
