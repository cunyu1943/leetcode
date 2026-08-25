# [面试题 05.07. 配对交换](https://leetcode.cn/problems/exchange-lcci/)

## 一、题目描述

配对交换。编写程序，交换某个整数的奇数位和偶数位，尽量使用较少的指令（也就是说，位 0 与位 1 交换，位 2 与位 3 交换，以此类推）。

**示例 1：**

```
输入：num = 2（或者0b10）
输出：1（或者0b01）
```

**示例 2：**

```
输入：num = 3
输出：3
```

**提示：**

- `num` 的范围在 `[0, 2^30 - 1]` 之间，不会发生整数溢出。

---

## 二、解答方法

### 2.1 方法一：掩码 + 移位（推荐）

**1. 思路**

奇偶位交换可以用两个掩码一次完成：

- `0x55555555`（二进制 `0101...01`）：保留偶数位（位 0、2、4…），奇数位置 0；
- `0xAAAAAAAA`（二进制 `1010...10`）：保留奇数位（位 1、3、5…），偶数位置 0。

然后偶数位整体左移 1 位、奇数位整体右移 1 位，再按位或，即可完成配对交换。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int exchangeBits(int num) {
        // 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
        return ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >>> 1);
    }
}
```

```python [Python]
class Solution:
    def exchangeBits(self, num: int) -> int:
        # 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
        return ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >> 1)
```

```go [Go]
func exchangeBits(num int) int {
	// 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
	return ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >> 1)
}
```

```c [C]
int exchangeBits(int num) {
    // 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
    return ((num & 0x55555555) << 1) | ((unsigned int)(num & 0xAAAAAAAA) >> 1);
}
```

```cpp [C++]
class Solution {
public:
    int exchangeBits(int num) {
        // 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
        return ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >> 1);
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} num
 * @return {number}
 */
var exchangeBits = function (num) {
    // 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
    return ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >>> 1);
};
```

```typescript [TypeScript]
function exchangeBits(num: number): number {
    // 0x55555555: 0101... 保留偶数位; 0xAAAAAAAA: 1010... 保留奇数位
    return ((num & 0x55555555) << 1) | ((num & 0xAAAAAAAA) >>> 1);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，仅常数次位运算。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：逐位交换

**1. 思路**

从最低位开始，每两位为一组：取出第 `i` 位和第 `i + 1` 位，然后交换它们的位置，重新拼装到结果中。思路直观，适合理解交换过程。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int exchangeBits(int num) {
        int res = 0;
        for (int i = 0; i < 32; i += 2) {
            int bit0 = (num >> i) & 1;        // 偶数位
            int bit1 = (num >> (i + 1)) & 1;  // 奇数位
            res |= (bit1 << i);               // 奇数位放到偶数位
            res |= (bit0 << (i + 1));         // 偶数位放到奇数位
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def exchangeBits(self, num: int) -> int:
        res = 0
        for i in range(0, 32, 2):
            bit0 = (num >> i) & 1        # 偶数位
            bit1 = (num >> (i + 1)) & 1  # 奇数位
            res |= (bit1 << i)           # 奇数位放到偶数位
            res |= (bit0 << (i + 1))     # 偶数位放到奇数位
        return res
```

```go [Go]
func exchangeBits(num int) int {
	res := 0
	for i := 0; i < 32; i += 2 {
		bit0 := (num >> i) & 1
		bit1 := (num >> (i + 1)) & 1
		res |= bit1 << i
		res |= bit0 << (i + 1)
	}
	return res
}
```

```c [C]
int exchangeBits(int num) {
    int res = 0;
    for (int i = 0; i < 32; i += 2) {
        int bit0 = (num >> i) & 1;
        int bit1 = (num >> (i + 1)) & 1;
        res |= bit1 << i;
        res |= bit0 << (i + 1);
    }
    return res;
}
```

```cpp [C++]
class Solution {
public:
    int exchangeBits(int num) {
        int res = 0;
        for (int i = 0; i < 32; i += 2) {
            int bit0 = (num >> i) & 1;
            int bit1 = (num >> (i + 1)) & 1;
            res |= bit1 << i;
            res |= bit0 << (i + 1);
        }
        return res;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} num
 * @return {number}
 */
var exchangeBits = function (num) {
    let res = 0;
    for (let i = 0; i < 32; i += 2) {
        const bit0 = (num >> i) & 1;
        const bit1 = (num >> (i + 1)) & 1;
        res |= bit1 << i;
        res |= bit0 << (i + 1);
    }
    return res;
};
```

```typescript [TypeScript]
function exchangeBits(num: number): number {
    let res = 0;
    for (let i = 0; i < 32; i += 2) {
        const bit0 = (num >> i) & 1;
        const bit1 = (num >> (i + 1)) & 1;
        res |= bit1 << i;
        res |= bit0 << (i + 1);
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(16)`，固定循环 16 组。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                                          |
| ------------ | ---------- | ---------- | --------------------------------------------- |
| 掩码 + 移位  | `O(1)`     | `O(1)`     | 指令数最少，推荐                              |
| 逐位交换     | `O(16)`    | `O(1)`     | 直观，适合理解交换过程，可作对比参考          |

**推荐解法**：方法一（掩码 + 移位）。题目要求「尽量使用较少的指令」，掩码 + 移位正是最简洁的做法；`0x55555555` 与 `0xAAAAAAAA` 这两个经典掩码也常用于其他位运算题目（如黑白棋配色、奇偶校验等），建议牢记。
