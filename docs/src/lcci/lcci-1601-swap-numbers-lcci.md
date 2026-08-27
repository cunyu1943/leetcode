# [面试题 16.01. 交换数字](https://leetcode.cn/problems/swap-numbers-lcci/)

## 一、题目描述

编写一个函数，不用临时变量，直接交换 `numbers = [a, b]` 中 `a` 与 `b` 的值。

**示例：**

```
输入: numbers = [1,2]
输出: [2,1]
```

**提示：**

- `numbers.length == 2`
- `-2147483647 <= numbers[i] <= 2147483647`

---

## 二、解答方法

### 2.1 方法一：异或运算

**1. 思路**

利用异或 `^` 的三次交换法：`a ^= b; b ^= a; a ^= b;`。无需临时变量，且不产生溢出。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] swapNumbers(int[] numbers) {
        numbers[0] ^= numbers[1];
        numbers[1] ^= numbers[0];
        numbers[0] ^= numbers[1];
        return numbers;
    }
}
```

```python [Python]
class Solution:
    def swapNumbers(self, numbers: List[int]) -> List[int]:
        numbers[0] ^= numbers[1]
        numbers[1] ^= numbers[0]
        numbers[0] ^= numbers[1]
        return numbers
```

```go [Go]
func swapNumbers(numbers []int) []int {
    numbers[0] ^= numbers[1]
    numbers[1] ^= numbers[0]
    numbers[0] ^= numbers[1]
    return numbers
}
```

```c [C]
int* swapNumbers(int* numbers, int numbersSize, int* returnSize) {
    numbers[0] ^= numbers[1];
    numbers[1] ^= numbers[0];
    numbers[0] ^= numbers[1];
    *returnSize = 2;
    return numbers;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> swapNumbers(vector<int>& numbers) {
        numbers[0] ^= numbers[1];
        numbers[1] ^= numbers[0];
        numbers[0] ^= numbers[1];
        return numbers;
    }
};
```

```javascript [JavaScript]
var swapNumbers = function(numbers) {
    numbers[0] ^= numbers[1];
    numbers[1] ^= numbers[0];
    numbers[0] ^= numbers[1];
    return numbers;
};
```

```typescript [TypeScript]
function swapNumbers(numbers: number[]): number[] {
    numbers[0] ^= numbers[1];
    numbers[1] ^= numbers[0];
    numbers[0] ^= numbers[1];
    return numbers;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：加减运算

**1. 思路**

利用加减：`a = a + b; b = a - b; a = a - b;`。注意可能溢出（题目数值范围到 int 边界），不如异或稳妥。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] swapNumbers(int[] numbers) {
        numbers[0] = numbers[0] + numbers[1];
        numbers[1] = numbers[0] - numbers[1];
        numbers[0] = numbers[0] - numbers[1];
        return numbers;
    }
}
```

```python [Python]
class Solution:
    def swapNumbers(self, numbers: List[int]) -> List[int]:
        numbers[0] = numbers[0] + numbers[1]
        numbers[1] = numbers[0] - numbers[1]
        numbers[0] = numbers[0] - numbers[1]
        return numbers
```

```cpp [C++]
class Solution {
public:
    vector<int> swapNumbers(vector<int>& numbers) {
        numbers[0] = numbers[0] + numbers[1];
        numbers[1] = numbers[0] - numbers[1];
        numbers[0] = numbers[0] - numbers[1];
        return numbers;
    }
};
```

```javascript [JavaScript]
var swapNumbers = function(numbers) {
    numbers[0] = numbers[0] + numbers[1];
    numbers[1] = numbers[0] - numbers[1];
    numbers[0] = numbers[0] - numbers[1];
    return numbers;
};
```

```typescript [TypeScript]
function swapNumbers(numbers: number[]): number[] {
    numbers[0] = numbers[0] + numbers[1];
    numbers[1] = numbers[0] - numbers[1];
    numbers[0] = numbers[0] - numbers[1];
    return numbers;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(1)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法     | 时间复杂度 | 空间复杂度 | 特点                       |
| -------- | ---------- | ---------- | -------------------------- |
| 异或交换 | `O(1)`     | `O(1)`     | 无溢出风险，推荐           |
| 加减交换 | `O(1)`     | `O(1)`     | 可能溢出，不推荐           |

**推荐**：使用异或运算完成无临时变量交换。
