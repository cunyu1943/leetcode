# [LCR 006. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/kLl5u1/)



## 一、题目描述

给定一个已按照 **升序排列** 的整数数组 `numbers` ，请你从数组中找出两个数满足相加之和等于目标数 `target` 。

函数应该以长度为 `2` 的整数数组 `[index1, index2]` 的形式返回这两个数的下标值。`index1` 和 `index2` 分别指向两个数字的下标，其中 `index1 < index2` 且下标从 `1` 开始计数。

假设数组满足：**有且仅有一个** 有效答案，且 **不可以** 使用下标相同的元素。



**示例 1：**

```
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

**示例 2：**

```
输入：numbers = [2,3,4], target = 6
输出：[1,3]
```

**示例 3：**

```
输入：numbers = [-1,0], target = -1
输出：[1,2]
```

**提示：**

- `2 <= numbers.length <= 3 * 10⁴`
- `-1000 <= numbers[i] <= 1000`
- `numbers` 按 **非递减顺序** 排列
- `-1000 <= target <= 1000`
- **仅存在一个有效答案**



## 二、解答方法

### 2.1 方法一：双指针（利用有序性）

1. **思路**

因为数组已经升序，用左右两个指针 `i`（首）、`j`（尾）：

- 若 `numbers[i] + numbers[j] == target`，直接返回 `[i+1, j+1]`；
- 若和小于 `target`，说明需要更大的数，左指针 `i++`；
- 若和大于 `target`，说明需要更小的数，右指针 `j--`。

每次缩小搜索区间，时间复杂度 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int i = 0, j = numbers.length - 1;
        while (i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum == target) return new int[]{i + 1, j + 1};
            else if (sum < target) i++;
            else j--;
        }
        return new int[]{-1, -1};
    }
}
```

```python [Python]
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        i, j = 0, len(numbers) - 1
        while i < j:
            s = numbers[i] + numbers[j]
            if s == target:
                return [i + 1, j + 1]
            elif s < target:
                i += 1
            else:
                j -= 1
        return [-1, -1]
```

```cpp [C++]
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int i = 0, j = numbers.size() - 1;
        while (i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum == target) return {i + 1, j + 1};
            else if (sum < target) i++;
            else j--;
        }
        return {-1, -1};
    }
};
```

```go [Go]
func twoSum(numbers []int, target int) []int {
    i, j := 0, len(numbers)-1
    for i < j {
        s := numbers[i] + numbers[j]
        if s == target {
            return []int{i + 1, j + 1}
        } else if s < target {
            i++
        } else {
            j--
        }
    }
    return []int{-1, -1}
}
```

```js [JavaScript]
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let i = 0, j = numbers.length - 1;
    while (i < j) {
        const sum = numbers[i] + numbers[j];
        if (sum === target) return [i + 1, j + 1];
        else if (sum < target) i++;
        else j--;
    }
    return [-1, -1];
};
```

```c [C]
#include <stdlib.h>

int* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {
    int i = 0, j = numbersSize - 1;
    int* res = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    while (i < j) {
        int sum = numbers[i] + numbers[j];
        if (sum == target) {
            res[0] = i + 1; res[1] = j + 1;
            return res;
        } else if (sum < target) i++;
        else j--;
    }
    res[0] = -1; res[1] = -1;
    return res;
}
```

```ts [TypeScript]
function twoSum(numbers: number[], target: number): number[] {
    let i = 0, j = numbers.length - 1;
    while (i < j) {
        const sum = numbers[i] + numbers[j];
        if (sum === target) return [i + 1, j + 1];
        else if (sum < target) i++;
        else j--;
    }
    return [-1, -1];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，双指针最多遍历一次。
- **空间复杂度**：`O(1)`，仅用常数变量（返回数组不计）。

### 2.2 方法二：二分查找

1. **思路**

固定第一个数 `numbers[i]`，在 `i+1` 到末尾的区间二分查找 `target - numbers[i]`。由于数组有序，二分查找 `O(log n)`，总复杂度 `O(n log n)`。适合理解，但比双指针略慢。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int n = numbers.length;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n - 1, want = target - numbers[i];
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (numbers[m] == want) return new int[]{i + 1, m + 1};
                else if (numbers[m] < want) l = m + 1;
                else r = m - 1;
            }
        }
        return new int[]{-1, -1};
    }
}
```

```python [Python]
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        n = len(numbers)
        for i in range(n):
            l, r, want = i + 1, n - 1, target - numbers[i]
            while l <= r:
                m = l + (r - l) // 2
                if numbers[m] == want:
                    return [i + 1, m + 1]
                elif numbers[m] < want:
                    l = m + 1
                else:
                    r = m - 1
        return [-1, -1]
```

```cpp [C++]
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int n = numbers.size();
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n - 1, want = target - numbers[i];
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (numbers[m] == want) return {i + 1, m + 1};
                else if (numbers[m] < want) l = m + 1;
                else r = m - 1;
            }
        }
        return {-1, -1};
    }
};
```

```go [Go]
func twoSum(numbers []int, target int) []int {
    n := len(numbers)
    for i := 0; i < n; i++ {
        l, r, want := i+1, n-1, target-numbers[i]
        for l <= r {
            m := l + (r-l)/2
            if numbers[m] == want {
                return []int{i + 1, m + 1}
            } else if numbers[m] < want {
                l = m + 1
            } else {
                r = m - 1
            }
        }
    }
    return []int{-1, -1}
}
```

```js [JavaScript]
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    const n = numbers.length;
    for (let i = 0; i < n; i++) {
        let l = i + 1, r = n - 1;
        const want = target - numbers[i];
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (numbers[m] === want) return [i + 1, m + 1];
            else if (numbers[m] < want) l = m + 1;
            else r = m - 1;
        }
    }
    return [-1, -1];
};
```

```c [C]
#include <stdlib.h>

int* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {
    int* res = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    for (int i = 0; i < numbersSize; i++) {
        int l = i + 1, r = numbersSize - 1, want = target - numbers[i];
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (numbers[m] == want) {
                res[0] = i + 1; res[1] = m + 1;
                return res;
            } else if (numbers[m] < want) l = m + 1;
            else r = m - 1;
        }
    }
    res[0] = -1; res[1] = -1;
    return res;
}
```

```ts [TypeScript]
function twoSum(numbers: number[], target: number): number[] {
    const n = numbers.length;
    for (let i = 0; i < n; i++) {
        let l = i + 1, r = n - 1;
        const want = target - numbers[i];
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (numbers[m] === want) return [i + 1, m + 1];
            else if (numbers[m] < want) l = m + 1;
            else r = m - 1;
        }
    }
    return [-1, -1];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针 | `O(n)` | `O(1)` | 最优，利用有序性 |
| 二分查找 | `O(n log n)` | `O(1)` | 易理解，略慢 |

利用「升序」这一关键条件，双指针是最优解，一次线性扫描即可找到答案。

