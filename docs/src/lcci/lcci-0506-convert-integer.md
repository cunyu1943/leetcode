# [面试题 05.06. 整数转换](https://leetcode.cn/problems/convert-integer-lcci/)

## 一、题目描述

整数转换。编写一个函数，确定需要改变几个位才能将整数 A 转成整数 B。

**示例 1：**

```
输入：A = 29（或者0b11101）, B = 15（或者0b01111）
输出：2
```

**示例 2：**

```
输入：A = 1，B = 2
输出：2
```

**提示：**

- `A`、`B` 范围在 `[-2147483648, 2147483647]` 之间。

---

## 二、解答方法

### 2.1 方法一：异或 + 位计数

**1. 思路**

两个整数不同的位，正是它们异或结果中为 1 的位。因此只需计算 `A ^ B` 中 1 的个数，即为需要改变的位数。

统计 1 的个数用经典技巧：`x &= x - 1` 每次都能消去最低位的 1，循环次数即 1 的个数。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int convertInteger(int A, int B) {
        int x = A ^ B;
        int count = 0;
        while (x != 0) {
            x &= (x - 1);
            count++;
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def convertInteger(self, A: int, B: int) -> int:
        # 由于 Python 整数无位数限制，需要与 32 位掩码做与运算
        x = (A ^ B) & 0xFFFFFFFF
        count = 0
        while x:
            x &= (x - 1)
            count += 1
        return count
```

```go [Go]
func convertInteger(A int, B int) int {
	x := uint32(A) ^ uint32(B)
	count := 0
	for x != 0 {
		x &= x - 1
		count++
	}
	return count
}
```

```c [C]
int convertInteger(int A, int B) {
    unsigned int x = (unsigned int)A ^ (unsigned int)B;
    int count = 0;
    while (x) {
        x &= x - 1;
        count++;
    }
    return count;
}
```

```cpp [C++]
class Solution {
public:
    int convertInteger(int A, int B) {
        unsigned int x = A ^ B;
        int count = 0;
        while (x) {
            x &= x - 1;
            count++;
        }
        return count;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var convertInteger = function (A, B) {
    let x = (A ^ B) >>> 0;
    let count = 0;
    while (x !== 0) {
        x &= x - 1;
        count++;
    }
    return count;
};
```

```typescript [TypeScript]
function convertInteger(A: number, B: number): number {
    let x = (A ^ B) >>> 0;
    let count = 0;
    while (x !== 0) {
        x &= x - 1;
        count++;
    }
    return count;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(k)`，其中 `k` 是 `A ^ B` 中 1 的个数，最多 32。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：逐位比较

**1. 思路**

循环 32 次，每次取出 A、B 的对应位进行比较，不同则计数加 1。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int convertInteger(int A, int B) {
        int count = 0;
        for (int i = 0; i < 32; i++) {
            if (((A >> i) & 1) != ((B >> i) & 1)) {
                count++;
            }
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def convertInteger(self, A: int, B: int) -> int:
        count = 0
        for i in range(32):
            if ((A >> i) & 1) != ((B >> i) & 1):
                count += 1
        return count
```

```go [Go]
func convertInteger(A int, B int) int {
	count := 0
	for i := 0; i < 32; i++ {
		if ((A >> i) & 1) != ((B >> i) & 1) {
			count++
		}
	}
	return count
}
```

```c [C]
int convertInteger(int A, int B) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if (((A >> i) & 1) != ((B >> i) & 1)) {
            count++;
        }
    }
    return count;
}
```

```cpp [C++]
class Solution {
public:
    int convertInteger(int A, int B) {
        int count = 0;
        for (int i = 0; i < 32; i++) {
            if (((A >> i) & 1) != ((B >> i) & 1)) {
                count++;
            }
        }
        return count;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var convertInteger = function (A, B) {
    let count = 0;
    for (let i = 0; i < 32; i++) {
        if (((A >> i) & 1) !== ((B >> i) & 1)) {
            count++;
        }
    }
    return count;
};
```

```typescript [TypeScript]
function convertInteger(A: number, B: number): number {
    let count = 0;
    for (let i = 0; i < 32; i++) {
        if (((A >> i) & 1) !== ((B >> i) & 1)) {
            count++;
        }
    }
    return count;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(32)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                     |
| ------------ | ---------- | ---------- | ------------------------ |
| 异或 + 位计数 | `O(k)`，`k ≤ 32` | `O(1)` | 经典套路，代码简洁，推荐 |
| 逐位比较     | `O(32)`    | `O(1)`     | 直观，可作对比参考       |

**推荐解法**：方法一（异或 + 位计数）。「异或后数 1」是位运算中的经典套路，代码简洁；`x &= x - 1` 统计 1 的个数也是高频技巧，需要熟练掌握。注意 Python / JavaScript 中需用掩码或无符号右移处理 32 位语义。
