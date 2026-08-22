# [66. 加一](https://leetcode.cn/problems/plus-one/)



## 一、题目描述

给定一个由 **整数** 组成的非空数组 `digits`，表示一个非负整数。该整数不包含任何前导零（除数字 0 本身）。

请实现一个函数，在给定整数上加 1，并返回结果对应的数组。



**示例 1：**

```
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123，加一后得到 124。
```

**示例 2：**

```
输入：digits = [4,3,2,1]
输出：[4,3,2,2]
```

**示例 3：**

```
输入：digits = [9]
输出：[1,0]
```

**提示：**

-   `1 <= digits.length <= 100`
-   `0 <= digits[i] <= 9`



## 二、解答方法

### 2.1 方法一：从末尾进位


1. **思路**

从最低位向前遍历，若当前位小于 9 则加一后直接返回；若为 9 则置 0 继续进位；遍历结束仍未返回说明需要增加一位，新建长度 +1 的数组首位置 1。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length;
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] res = new int[n + 1];
        res[0] = 1;
        return res;
    }
}
```

```python [Python]
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        n = len(digits)
        for i in range(n - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + [0] * n
```

```go [Go]
func plusOne(digits []int) []int {
    n := len(digits)
    for i := n - 1; i >= 0; i-- {
        if digits[i] < 9 {
            digits[i]++
            return digits
        }
        digits[i] = 0
    }
    res := make([]int, n+1)
    res[0] = 1
    return res
}
```

```c [C]
int* plusOne(int* digits, int digitsSize, int* returnSize) {
    for (int i = digitsSize - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            *returnSize = digitsSize;
            return digits;
        }
        digits[i] = 0;
    }
    int* res = (int*)malloc(sizeof(int) * (digitsSize + 1));
    res[0] = 1;
    for (int i = 1; i <= digitsSize; i++) res[i] = 0;
    *returnSize = digitsSize + 1;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        vector<int> res(n + 1, 0);
        res[0] = 1;
        return res;
    }
};
```

```javascript [JavaScript]
var plusOne = function(digits) {
    const n = digits.length;
    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] < 9) { digits[i]++; return digits; }
        digits[i] = 0;
    }
    return [1, ...digits.map(() => 0)];
};
```

```typescript [TypeScript]
function plusOne(digits: number[]): number[] {
    const n = digits.length;
    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] < 9) { digits[i]++; return digits; }
        digits[i] = 0;
    }
    return [1, ...digits.map(() => 0)];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，最坏遍历整个数组。
- **空间复杂度**：`O(1)`（不计返回结果），原地修改；全为 9 时新建数组为 `O(n)`。

### 2.2 方法二：转数字再加一（仅小范围）


1. **思路**

若数组代表的数字在整型范围内，可先转成整数加一，再拆回数组。简单但不适用于 `n > 9` 的大数，仅作思路拓展。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] plusOne(int[] digits) {
        long num = 0;
        for (int d : digits) num = num * 10 + d;
        num += 1;
        String s = Long.toString(num);
        int[] res = new int[s.length()];
        for (int i = 0; i < s.length(); i++) res[i] = s.charAt(i) - '0';
        return res;
    }
}
```

```python [Python]
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        num = 0
        for d in digits:
            num = num * 10 + d
        return [int(c) for c in str(num + 1)]
```

```go [Go]
func plusOne(digits []int) []int {
    // 大数场景不推荐，仅示意；完整实现略
    return digits
}
```

```c [C]
int* plusOne(int* digits, int digitsSize, int* returnSize) {
    // 转数字方案在 C 中需借助大数库，完整实现略
    *returnSize = digitsSize;
    return digits;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        long long num = 0;
        for (int d : digits) num = num * 10 + d;
        num += 1;
        vector<int> res;
        while (num) { res.insert(res.begin(), (int)(num % 10)); num /= 10; }
        return res;
    }
};
```

```javascript [JavaScript]
var plusOne = function(digits) {
    const num = BigInt(digits.join('')) + 1n;
    return num.toString().split('').map(Number);
};
```

```typescript [TypeScript]
function plusOne(digits: number[]): number[] {
    const num = BigInt(digits.join('')) + 1n;
    return num.toString().split('').map(Number);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，遍历数组拼接数字与拆分。
- **空间复杂度**：`O(n)`**，字符串与结果数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 从末尾进位 | `O(n)` | `O(1)` | 通用，面试首选 |
| 转数字再加一 | `O(n)` | `O(n)` | 仅小范围，易溢出 |
