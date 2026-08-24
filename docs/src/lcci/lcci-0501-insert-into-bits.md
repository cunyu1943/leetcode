# [面试题 05.01. 插入](https://leetcode.cn/problems/insert-into-bits-lcci/)

## 一、题目描述

给定两个整型数字 `N` 和 `M`，以及表示位位置的 `i` 和 `j`（`i <= j`），编写一种方法，将 `M` 插入 `N`，使得 `M` 从 `N` 的第 `j` 位开始，到第 `i` 位结束。假定 `j` 到 `i` 的位足以容纳 `M`，也就是说，如果 `M = 10011`，那么 `j` 到 `i` 至少有 5 位。例如，`M` 不会超过 `j` 到 `i` 的位数。你不需要处理溢出情况。返回插入后的整数。

**示例：**

```
输入：N = 1024 (10000000000), M = 19 (10011), i = 2, j = 6
输出：1100 (10001001100)
```

**提示：**

- `0 <= i <= j <= 31`
- `N`、`M` 均为 32 位有符号整数，但保证结果在 32 位范围内。

---

## 二、解答方法

### 2.1 方法一：掩码清空 + 插入（标准位运算）

**1. 思路**

1. 构建一个掩码，使得 `N` 的第 `i` 位到第 `j` 位为 0，其余位为 1。
   - 方法：先构建 `left = ~0 << (j + 1)`，得到高位全 1，低位（0 到 j 位）全 0。
   - 再构建 `right = (1 << i) - 1`，得到低 `i` 位全 1，其余位全 0。
   - 掩码 `mask = left | right`，这样 `mask` 在 `i` 到 `j` 位为 0，其他位为 1。
2. 将 `N` 与 `mask` 按位与，清零 `i` 到 `j` 位。
3. 将 `M` 左移 `i` 位，使其对齐到 `i` 位开始。
4. 将上述结果按位或，得到最终结果。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int insertBits(int N, int M, int i, int j) {
        // 构造掩码：将 i 到 j 位清零
        int left = ~0 << (j + 1);
        int right = (1 << i) - 1;
        int mask = left | right;
        // 清零 N 的 i 到 j 位
        int clearedN = N & mask;
        // 将 M 左移 i 位
        int shiftedM = M << i;
        // 合并
        return clearedN | shiftedM;
    }
}
```

```python [Python]
class Solution:
    def insertBits(self, N: int, M: int, i: int, j: int) -> int:
        # 构造掩码：将 i 到 j 位清零
        left = ~0 << (j + 1)
        right = (1 << i) - 1
        mask = left | right
        # 清零 N 的 i 到 j 位
        clearedN = N & mask
        # 将 M 左移 i 位
        shiftedM = M << i
        # 合并
        return clearedN | shiftedM
```

```go [Go]
func insertBits(N int, M int, i int, j int) int {
    // 构造掩码：将 i 到 j 位清零
    left := ^0 << (j + 1)
    right := (1 << i) - 1
    mask := left | right
    // 清零 N 的 i 到 j 位
    clearedN := N & mask
    // 将 M 左移 i 位
    shiftedM := M << i
    // 合并
    return clearedN | shiftedM
}
```

```c [C]
int insertBits(int N, int M, int i, int j) {
    // 构造掩码：将 i 到 j 位清零
    int left = ~0 << (j + 1);
    int right = (1 << i) - 1;
    int mask = left | right;
    // 清零 N 的 i 到 j 位
    int clearedN = N & mask;
    // 将 M 左移 i 位
    int shiftedM = M << i;
    // 合并
    return clearedN | shiftedM;
}
```

```cpp [C++]
class Solution {
public:
    int insertBits(int N, int M, int i, int j) {
        // 构造掩码：将 i 到 j 位清零
        int left = ~0 << (j + 1);
        int right = (1 << i) - 1;
        int mask = left | right;
        // 清零 N 的 i 到 j 位
        int clearedN = N & mask;
        // 将 M 左移 i 位
        int shiftedM = M << i;
        // 合并
        return clearedN | shiftedM;
    }
};
```

```javascript [JavaScript]
var insertBits = function(N, M, i, j) {
    // 构造掩码：将 i 到 j 位清零
    const left = ~0 << (j + 1);
    const right = (1 << i) - 1;
    const mask = left | right;
    // 清零 N 的 i 到 j 位
    const clearedN = N & mask;
    // 将 M 左移 i 位
    const shiftedM = M << i;
    // 合并
    return clearedN | shiftedM;
};
```

```typescript [TypeScript]
function insertBits(N: number, M: number, i: number, j: number): number {
    // 构造掩码：将 i 到 j 位清零
    const left = ~0 << (j + 1);
    const right = (1 << i) - 1;
    const mask = left | right;
    // 清零 N 的 i 到 j 位
    const clearedN = N & mask;
    // 将 M 左移 i 位
    const shiftedM = M << i;
    // 合并
    return clearedN | shiftedM;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`，只进行常数次位运算。
- **空间复杂度**：`O(1)`，仅使用常数额外空间。

---

### 2.2 方法二：利用减法构建掩码（与法一本质相同，但掩码构造方式略有差异）

**1. 思路**

1. 构建一个全 1 掩码，范围从第 `i` 位到第 `j` 位为 1，其余位为 0。
   - 方法：`mask = ((1 << (j - i + 1)) - 1) << i`，这将得到 `i` 到 `j` 位全 1，其他位全 0。
2. 将 `mask` 取反，得到 `i` 到 `j` 位为 0，其他位为 1 的掩码。
3. 将 `N` 与该掩码按位与，清零 `i` 到 `j` 位。
4. 将 `M` 左移 `i` 位，与清空后的 `N` 按位或，得到结果。

此方法在构建掩码时直接指定长度，逻辑清晰。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int insertBits(int N, int M, int i, int j) {
        int len = j - i + 1;
        // 构造 i 到 j 位全1的掩码
        int mask = ((1 << len) - 1) << i;
        // 取反，得到 i 到 j 位为0，其余为1
        mask = ~mask;
        // 清零 N
        int clearedN = N & mask;
        // 插入 M
        return clearedN | (M << i);
    }
}
```

```python [Python]
class Solution:
    def insertBits(self, N: int, M: int, i: int, j: int) -> int:
        length = j - i + 1
        # 构造 i 到 j 位全1的掩码
        mask = ((1 << length) - 1) << i
        # 取反，得到 i 到 j 位为0，其余为1
        mask = ~mask
        # 清零 N
        clearedN = N & mask
        # 插入 M
        return clearedN | (M << i)
```

```go [Go]
func insertBits(N int, M int, i int, j int) int {
    length := j - i + 1
    // 构造 i 到 j 位全1的掩码
    mask := ((1 << length) - 1) << i
    // 取反，得到 i 到 j 位为0，其余为1
    mask = ^mask
    // 清零 N
    clearedN := N & mask
    // 插入 M
    return clearedN | (M << i)
}
```

```c [C]
int insertBits(int N, int M, int i, int j) {
    int length = j - i + 1;
    // 构造 i 到 j 位全1的掩码
    int mask = ((1 << length) - 1) << i;
    // 取反，得到 i 到 j 位为0，其余为1
    mask = ~mask;
    // 清零 N
    int clearedN = N & mask;
    // 插入 M
    return clearedN | (M << i);
}
```

```cpp [C++]
class Solution {
public:
    int insertBits(int N, int M, int i, int j) {
        int length = j - i + 1;
        // 构造 i 到 j 位全1的掩码
        int mask = ((1 << length) - 1) << i;
        // 取反，得到 i 到 j 位为0，其余为1
        mask = ~mask;
        // 清零 N
        int clearedN = N & mask;
        // 插入 M
        return clearedN | (M << i);
    }
};
```

```javascript [JavaScript]
var insertBits = function(N, M, i, j) {
    const length = j - i + 1;
    // 构造 i 到 j 位全1的掩码
    let mask = ((1 << length) - 1) << i;
    // 取反，得到 i 到 j 位为0，其余为1
    mask = ~mask;
    // 清零 N
    const clearedN = N & mask;
    // 插入 M
    return clearedN | (M << i);
};
```

```typescript [TypeScript]
function insertBits(N: number, M: number, i: number, j: number): number {
    const length = j - i + 1;
    // 构造 i 到 j 位全1的掩码
    let mask = ((1 << length) - 1) << i;
    // 取反，得到 i 到 j 位为0，其余为1
    mask = ~mask;
    // 清零 N
    const clearedN = N & mask;
    // 插入 M
    return clearedN | (M << i);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法                       | 时间复杂度 | 空间复杂度 | 特点                             |
| -------------------------- | ---------- | ---------- | -------------------------------- |
| 掩码清空 + 插入（方法一）  | `O(1)`     | `O(1)`     | 标准做法，使用左移和右移构造掩码 |
| 利用长度构建掩码（方法二） | `O(1)`     | `O(1)`     | 通过长度直接构造掩码，逻辑更直观 |

两种方法本质上相同，均能正确完成任务。推荐使用方法一，因为它更常见且不易出错。方法二需要注意取反运算符 `~` 在不同语言中的行为（Python 中 `~` 会得到负数的补码，但按位与后效果正确），但同样安全。

在实际生产环境中，应确保输入 `N`、`M`、`i`、`j` 在合理范围内，避免移位溢出（题目已保证）。
