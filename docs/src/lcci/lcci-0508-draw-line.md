# [面试题 05.08. 绘制直线](https://leetcode.cn/problems/draw-line-lcci/)

## 一、题目描述

已知一个由像素点组成的单色屏幕，每行均有 `w` 个像素点，所有像素点初始为 `0`，左上角位置为 `(0,0)`。

现将每行的像素点按照「每 `32` 个像素点」为一组存放在一个 `int` 中，再依次存入长度为 `length` 的一维数组中。

我们将在屏幕上绘制一条从点 `(x1,y)` 到点 `(x2,y)` 的直线（即像素点修改为 `1`），请返回绘制过后的数组。

**注意：**

- 用例保证屏幕宽度 `w` 可被 32 整除（即一个 `int` 不会分布在两行上）。

**示例 1：**

```
输入：length = 1, w = 32, x1 = 30, x2 = 31, y = 0
输出：[3]
解释：在第 0 行的第 30 位到第 31 位画一条直线，屏幕二进制形式表示为 [00000000000000000000000000000011]，因此返回 [3]。
```

**示例 2：**

```
输入：length = 3, w = 96, x1 = 0, x2 = 95, y = 0
输出：[-1, -1, -1]
解释：由于二进制 11111111111111111111111111111111 的 int 类型代表 -1，因此返回 [-1,-1,-1]。
```

**提示：**

- `1 <= length <= 10^5`
- `1 <= w <= 3 * 10^5`
- `0 <= x1 <= x2 < w`
- `0 <= y <= 10`

---

## 二、解答方法

### 2.1 方法一：逐位设置（直观）

**1. 思路**

把屏幕看成二维像素矩阵，第 `y` 行的起始 `int` 索引为 `y * (w / 32)`，该行第 `x` 列所在的 `int` 索引为 `y * (w / 32) + x / 32`，在该 `int` 中位序号为 `x % 32`（从最低位算起，与题目描述一致）。

从 `x1` 到 `x2` 逐位把对应 `int` 的相应位置为 1 即可。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] drawLine(int length, int w, int x1, int x2, int y) {
        int[] screen = new int[length];
        int bytesPerRow = w / 32;
        int base = y * bytesPerRow;
        for (int x = x1; x <= x2; x++) {
            int idx = base + x / 32;
            int bit = x % 32;
            screen[idx] |= (1 << bit);
        }
        return screen;
    }
}
```

```python [Python]
class Solution:
    def drawLine(self, length: int, w: int, x1: int, x2: int, y: int) -> List[int]:
        screen = [0] * length
        bytesPerRow = w // 32
        base = y * bytesPerRow
        for x in range(x1, x2 + 1):
            idx = base + x // 32
            bit = x % 32
            screen[idx] |= (1 << bit)
        return screen
```

```go [Go]
func drawLine(length int, w int, x1 int, x2 int, y int) []int {
	screen := make([]int, length)
	bytesPerRow := w / 32
	base := y * bytesPerRow
	for x := x1; x <= x2; x++ {
		idx := base + x/32
		bit := x % 32
		screen[idx] |= 1 << bit
	}
	return screen
}
```

```c [C]
int* drawLine(int length, int w, int x1, int x2, int y, int* returnSize) {
    int* screen = (int*)calloc(length, sizeof(int));
    int bytesPerRow = w / 32;
    int base = y * bytesPerRow;
    for (int x = x1; x <= x2; x++) {
        int idx = base + x / 32;
        int bit = x % 32;
        screen[idx] |= (1 << bit);
    }
    *returnSize = length;
    return screen;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> drawLine(int length, int w, int x1, int x2, int y) {
        vector<int> screen(length, 0);
        int bytesPerRow = w / 32;
        int base = y * bytesPerRow;
        for (int x = x1; x <= x2; x++) {
            int idx = base + x / 32;
            int bit = x % 32;
            screen[idx] |= (1 << bit);
        }
        return screen;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} length
 * @param {number} w
 * @param {number} x1
 * @param {number} x2
 * @param {number} y
 * @return {number[]}
 */
var drawLine = function (length, w, x1, x2, y) {
    const screen = new Array(length).fill(0);
    const bytesPerRow = Math.floor(w / 32);
    const base = y * bytesPerRow;
    for (let x = x1; x <= x2; x++) {
        const idx = base + Math.floor(x / 32);
        const bit = x % 32;
        screen[idx] |= 1 << bit;
    }
    return screen;
};
```

```typescript [TypeScript]
function drawLine(length: number, w: number, x1: number, x2: number, y: number): number[] {
    const screen: number[] = new Array(length).fill(0);
    const bytesPerRow = Math.floor(w / 32);
    const base = y * bytesPerRow;
    for (let x = x1; x <= x2; x++) {
        const idx = base + Math.floor(x / 32);
        const bit = x % 32;
        screen[idx] |= 1 << bit;
    }
    return screen;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(x2 - x1 + 1)`，与直线覆盖的像素数成正比。
- **空间复杂度**：`O(length)`，结果数组。

---

### 2.2 方法二：整段填充（高效）

**1. 思路**

当直线跨越多个完整的 `int`（即整字节区间）时，可以直接把整段 `int` 置为 `-1`（全 1）；只处理首尾两个不完整 `int` 中从 `x1`/`x2` 到字节边界之间的位，用掩码一次性置位。这样避免逐位循环，效率更高。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] drawLine(int length, int w, int x1, int x2, int y) {
        int[] screen = new int[length];
        int bytesPerRow = w / 32;
        int base = y * bytesPerRow;

        int leftByte = base + x1 / 32;
        int rightByte = base + x2 / 32;

        // 整段字节直接置全 1
        for (int i = leftByte + 1; i < rightByte; i++) {
            screen[i] = -1;
        }

        // 左侧不完整字节：从 x1 的位到所在字节最高位
        long leftMask = (1L << (x1 % 32)) - 1;
        leftMask = ~leftMask;            // x1 位及其右侧全 1
        if (leftByte == rightByte) {
            long rightMask = (1L << (x2 % 32 + 1)) - 1;
            screen[leftByte] |= (int) (leftMask & rightMask);
        } else {
            screen[leftByte] |= (int) leftMask;
            // 右侧不完整字节：从所在字节最低位到 x2 的位
            long rightMask = (1L << (x2 % 32 + 1)) - 1;
            screen[rightByte] |= (int) rightMask;
        }
        return screen;
    }
}
```

```python [Python]
class Solution:
    def drawLine(self, length: int, w: int, x1: int, x2: int, y: int) -> List[int]:
        screen = [0] * length
        bytesPerRow = w // 32
        base = y * bytesPerRow

        leftByte = base + x1 // 32
        rightByte = base + x2 // 32

        for i in range(leftByte + 1, rightByte):
            screen[i] = -1

        leftMask = ~((1 << (x1 % 32)) - 1) & 0xFFFFFFFF
        if leftByte == rightByte:
            rightMask = (1 << (x2 % 32 + 1)) - 1
            screen[leftByte] |= leftMask & rightMask
        else:
            screen[leftByte] |= leftMask
            rightMask = (1 << (x2 % 32 + 1)) - 1
            screen[rightByte] |= rightMask
        return [x if x != (1 << 32) - 1 else -1 for x in screen]
```

```go [Go]
func drawLine(length int, w int, x1 int, x2 int, y int) []int {
	screen := make([]int, length)
	bytesPerRow := w / 32
	base := y * bytesPerRow

	leftByte := base + x1/32
	rightByte := base + x2/32

	for i := leftByte + 1; i < rightByte; i++ {
		screen[i] = -1
	}

	leftMask := ^(int(1)<<(x1%32) - 1)
	if leftByte == rightByte {
		rightMask := (1 << (x2%32 + 1)) - 1
		screen[leftByte] |= leftMask & rightMask
	} else {
		screen[leftByte] |= leftMask
		rightMask := (1 << (x2%32 + 1)) - 1
		screen[rightByte] |= rightMask
	}
	return screen
}
```

```c [C]
int* drawLine(int length, int w, int x1, int x2, int y, int* returnSize) {
    int* screen = (int*)calloc(length, sizeof(int));
    int bytesPerRow = w / 32;
    int base = y * bytesPerRow;

    int leftByte = base + x1 / 32;
    int rightByte = base + x2 / 32;

    for (int i = leftByte + 1; i < rightByte; i++) {
        screen[i] = -1;
    }

    int leftMask = ~((1 << (x1 % 32)) - 1);
    if (leftByte == rightByte) {
        int rightMask = (1 << (x2 % 32 + 1)) - 1;
        screen[leftByte] |= leftMask & rightMask;
    } else {
        screen[leftByte] |= leftMask;
        int rightMask = (1 << (x2 % 32 + 1)) - 1;
        screen[rightByte] |= rightMask;
    }
    *returnSize = length;
    return screen;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> drawLine(int length, int w, int x1, int x2, int y) {
        vector<int> screen(length, 0);
        int bytesPerRow = w / 32;
        int base = y * bytesPerRow;

        int leftByte = base + x1 / 32;
        int rightByte = base + x2 / 32;

        for (int i = leftByte + 1; i < rightByte; i++) {
            screen[i] = -1;
        }

        int leftMask = ~((1 << (x1 % 32)) - 1);
        if (leftByte == rightByte) {
            int rightMask = (1 << (x2 % 32 + 1)) - 1;
            screen[leftByte] |= leftMask & rightMask;
        } else {
            screen[leftByte] |= leftMask;
            int rightMask = (1 << (x2 % 32 + 1)) - 1;
            screen[rightByte] |= rightMask;
        }
        return screen;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number} length
 * @param {number} w
 * @param {number} x1
 * @param {number} x2
 * @param {number} y
 * @return {number[]}
 */
var drawLine = function (length, w, x1, x2, y) {
    const screen = new Array(length).fill(0);
    const bytesPerRow = Math.floor(w / 32);
    const base = y * bytesPerRow;

    const leftByte = base + Math.floor(x1 / 32);
    const rightByte = base + Math.floor(x2 / 32);

    for (let i = leftByte + 1; i < rightByte; i++) {
        screen[i] = -1;
    }

    const leftMask = ~((1 << (x1 % 32)) - 1);
    if (leftByte === rightByte) {
        const rightMask = (1 << (x2 % 32 + 1)) - 1;
        screen[leftByte] |= leftMask & rightMask;
    } else {
        screen[leftByte] |= leftMask;
        const rightMask = (1 << (x2 % 32 + 1)) - 1;
        screen[rightByte] |= rightMask;
    }
    return screen;
};
```

```typescript [TypeScript]
function drawLine(length: number, w: number, x1: number, x2: number, y: number): number[] {
    const screen: number[] = new Array(length).fill(0);
    const bytesPerRow = Math.floor(w / 32);
    const base = y * bytesPerRow;

    const leftByte = base + Math.floor(x1 / 32);
    const rightByte = base + Math.floor(x2 / 32);

    for (let i = leftByte + 1; i < rightByte; i++) {
        screen[i] = -1;
    }

    const leftMask = ~((1 << (x1 % 32)) - 1);
    if (leftByte === rightByte) {
        const rightMask = (1 << (x2 % 32 + 1)) - 1;
        screen[leftByte] |= leftMask & rightMask;
    } else {
        screen[leftByte] |= leftMask;
        const rightMask = (1 << (x2 % 32 + 1)) - 1;
        screen[rightByte] |= rightMask;
    }
    return screen;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(rightByte - leftByte)`，与直线覆盖的 `int` 个数成正比，通常远小于方法一。
- **空间复杂度**：`O(length)`。

---

## 三、总结

| 方法         | 时间复杂度        | 空间复杂度 | 特点                             |
| ------------ | ----------------- | ---------- | -------------------------------- |
| 逐位设置     | `O(x2 - x1 + 1)`  | `O(length)` | 直观易写，推荐理解               |
| 整段填充     | `O(int 区间数)`   | `O(length)` | 用掩码批量置位，效率更高         |

**推荐解法**：方法一（逐位设置）逻辑最清晰，面试中优先保证正确；方法二（整段填充）利用「整段字节直接置 -1 + 首尾掩码」优化，是更贴近题意（Hint 提示整字节一次性设置）的工程做法。
