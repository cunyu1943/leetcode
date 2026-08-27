# [面试题 17.04. 消失的数字](https://leetcode.cn/problems/missing-number-lcci/)

## 一、题目描述

数组 `nums` 包含从 `0` 到 `n` 的所有整数，但其中缺了一个。请编写代码找出那个缺失的整数。你有办法在 `O(n)` 时间内完成吗？

**示例 1：**

```
输入：[3,0,1]
输出：2
```

**示例 2：**

```
输入：[9,6,4,2,3,5,7,0,1]
输出：8
```

---

## 二、解答方法

### 2.1 方法一：异或法（空间 O(1)）

**1. 思路**

利用异或性质 `a ^ a = 0`、`a ^ 0 = a`。将 `0~n` 与数组所有元素依次异或，成对出现的元素相互抵消，剩下的就是缺失的数。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;
        for (int i = 0; i < nums.length; i++) {
            res ^= i;
            res ^= nums[i];
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = len(nums)
        for i, v in enumerate(nums):
            res ^= i ^ v
        return res
```

```go [Go]
func missingNumber(nums []int) int {
    res := len(nums)
    for i, v := range nums {
        res ^= i ^ v
    }
    return res
}
```

```c [C]
int missingNumber(int* nums, int numsSize) {
    int res = numsSize;
    for (int i = 0; i < numsSize; i++) res ^= i ^ nums[i];
    return res;
}
```

```cpp [C++]
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res = nums.size();
        for (int i = 0; i < nums.size(); i++) res ^= i ^ nums[i];
        return res;
    }
};
```

```javascript [JavaScript]
var missingNumber = function(nums) {
    let res = nums.length;
    for (let i = 0; i < nums.length; i++) res ^= i ^ nums[i];
    return res;
};
```

```typescript [TypeScript]
function missingNumber(nums: number[]): number {
    let res = nums.length;
    for (let i = 0; i < nums.length; i++) res ^= i ^ nums[i];
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：求和公式法

**1. 思路**

`0~n` 的理论和为 `n * (n + 1) / 2`，减去数组实际和即为缺失的数。注意大数求和可能溢出，可用 `long` 处理。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int missingNumber(int[] nums) {
        long n = nums.length;
        long sum = n * (n + 1) / 2;
        long actual = 0;
        for (int v : nums) actual += v;
        return (int)(sum - actual);
    }
}
```

```python [Python]
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)
```

```cpp [C++]
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        long n = nums.size();
        long sum = n * (n + 1) / 2;
        long actual = accumulate(nums.begin(), nums.end(), 0L);
        return (int)(sum - actual);
    }
};
```

```javascript [JavaScript]
var missingNumber = function(nums) {
    const n = nums.length;
    let actual = 0;
    for (const v of nums) actual += v;
    return n * (n + 1) / 2 - actual;
};
```

```typescript [TypeScript]
function missingNumber(nums: number[]): number {
    const n = nums.length;
    let actual = 0;
    for (const v of nums) actual += v;
    return n * (n + 1) / 2 - actual;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 异或法         | `O(n)`     | `O(1)`     | 无溢出风险，推荐           |
| 求和公式法     | `O(n)`     | `O(1)`     | 直观，需防整数溢出         |

**推荐**：优先使用异或法，完全避免溢出问题。
