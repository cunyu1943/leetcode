# [面试题 16.16. 部分排序](https://leetcode.cn/problems/sub-sort-lcci/)

## 一、题目描述

给定一个整数数组，编写一个函数，找出索引 `m` 和 `n`，只要将索引区间 `[m, n]` 的元素排好序，整个数组就是升序的。注意：`n-m` 尽量最小，也就是说，找出符合条件的最短序列。函数返回 `[m, n]`，若不存在这样的 `m` 和 `n`（例如整个数组已经有序），返回 `[-1, -1]`。

**示例：**

```
输入： [1,2,4,7,10,11,7,12,6,7,16,18,19]
输出： [3,9]
解释：索引 3 到 9 的元素 [7,10,11,7,12,6,7] 排序后，整个数组变为升序。
```

**提示：**

- `0 <= len(array) <= 100000`

## 二、解答方法

### 2.1 方法一：排序 + 比较

**1. 思路**

将原数组复制一份并排序，然后从左到右找到第一个与原数组不同的位置 `m`，从右到左找到第一个与原数组不同的位置 `n`。如果数组已经有序，则返回 `[-1, -1]`。

时间复杂度 `O(n log n)`，空间复杂度 `O(n)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] subSort(int[] array) {
        if (array.length == 0) return new int[]{-1, -1};
        int[] sorted = array.clone();
        Arrays.sort(sorted);
        int left = -1, right = -1;
        for (int i = 0; i < array.length; i++) {
            if (array[i] != sorted[i]) {
                left = i;
                break;
            }
        }
        if (left == -1) return new int[]{-1, -1};
        for (int i = array.length - 1; i >= 0; i--) {
            if (array[i] != sorted[i]) {
                right = i;
                break;
            }
        }
        return new int[]{left, right};
    }
}
```

```python [Python]
class Solution:
    def subSort(self, array: List[int]) -> List[int]:
        if not array:
            return [-1, -1]
        sorted_arr = sorted(array)
        left, right = -1, -1
        for i in range(len(array)):
            if array[i] != sorted_arr[i]:
                left = i
                break
        if left == -1:
            return [-1, -1]
        for i in range(len(array)-1, -1, -1):
            if array[i] != sorted_arr[i]:
                right = i
                break
        return [left, right]
```

```go [Go]
func subSort(array []int) []int {
    if len(array) == 0 {
        return []int{-1, -1}
    }
    sorted := make([]int, len(array))
    copy(sorted, array)
    sort.Ints(sorted)
    left, right := -1, -1
    for i := 0; i < len(array); i++ {
        if array[i] != sorted[i] {
            left = i
            break
        }
    }
    if left == -1 {
        return []int{-1, -1}
    }
    for i := len(array)-1; i >= 0; i-- {
        if array[i] != sorted[i] {
            right = i
            break
        }
    }
    return []int{left, right}
}
```

```c [C]
int* subSort(int* array, int arraySize, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    if (arraySize == 0) {
        res[0] = -1; res[1] = -1;
        return res;
    }
    int* sorted = (int*)malloc(arraySize * sizeof(int));
    for (int i = 0; i < arraySize; i++) sorted[i] = array[i];
    // 简单排序（qsort）
    int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }
    qsort(sorted, arraySize, sizeof(int), cmp);
    int left = -1, right = -1;
    for (int i = 0; i < arraySize; i++) {
        if (array[i] != sorted[i]) { left = i; break; }
    }
    if (left == -1) {
        res[0] = -1; res[1] = -1;
        free(sorted);
        return res;
    }
    for (int i = arraySize-1; i >= 0; i--) {
        if (array[i] != sorted[i]) { right = i; break; }
    }
    res[0] = left; res[1] = right;
    free(sorted);
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> subSort(vector<int>& array) {
        if (array.empty()) return {-1, -1};
        vector<int> sorted = array;
        sort(sorted.begin(), sorted.end());
        int left = -1, right = -1;
        for (int i = 0; i < array.size(); i++) {
            if (array[i] != sorted[i]) {
                left = i;
                break;
            }
        }
        if (left == -1) return {-1, -1};
        for (int i = array.size()-1; i >= 0; i--) {
            if (array[i] != sorted[i]) {
                right = i;
                break;
            }
        }
        return {left, right};
    }
};
```

```javascript [JavaScript]
var subSort = function(array) {
    if (array.length === 0) return [-1, -1];
    const sorted = [...array].sort((a, b) => a - b);
    let left = -1, right = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== sorted[i]) {
            left = i;
            break;
        }
    }
    if (left === -1) return [-1, -1];
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] !== sorted[i]) {
            right = i;
            break;
        }
    }
    return [left, right];
};
```

```typescript [TypeScript]
function subSort(array: number[]): number[] {
    if (array.length === 0) return [-1, -1];
    const sorted = [...array].sort((a, b) => a - b);
    let left = -1, right = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== sorted[i]) {
            left = i;
            break;
        }
    }
    if (left === -1) return [-1, -1];
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] !== sorted[i]) {
            right = i;
            break;
        }
    }
    return [left, right];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，排序耗时。
- **空间复杂度**：`O(n)`，需要复制数组。

---

### 2.2 方法二：一次遍历（双指针，O(n)）

**1. 思路**

- 从左到右找右边界 `right`：记录当前最大值 `max`，若当前值小于 `max`，则它需要被排序，更新 `right` 为当前位置。
- 从右到左找左边界 `left`：记录当前最小值 `min`，若当前值大于 `min`，则它需要被排序，更新 `left` 为当前位置。

最后若 `left == -1` 表示已经有序，返回 `[-1, -1]`。

时间复杂度 `O(n)`，空间复杂度 `O(1)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] subSort(int[] array) {
        if (array.length == 0) return new int[]{-1, -1};
        int n = array.length;
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        int left = -1, right = -1;
        // 从左到右找右边界
        for (int i = 0; i < n; i++) {
            if (array[i] < max) {
                right = i;
            } else {
                max = array[i];
            }
        }
        if (right == -1) return new int[]{-1, -1};
        // 从右到左找左边界
        for (int i = n - 1; i >= 0; i--) {
            if (array[i] > min) {
                left = i;
            } else {
                min = array[i];
            }
        }
        return new int[]{left, right};
    }
}
```

```python [Python]
class Solution:
    def subSort(self, array: List[int]) -> List[int]:
        if not array:
            return [-1, -1]
        n = len(array)
        max_val = float('-inf')
        min_val = float('inf')
        left, right = -1, -1
        for i in range(n):
            if array[i] < max_val:
                right = i
            else:
                max_val = array[i]
        if right == -1:
            return [-1, -1]
        for i in range(n-1, -1, -1):
            if array[i] > min_val:
                left = i
            else:
                min_val = array[i]
        return [left, right]
```

```go [Go]
func subSort(array []int) []int {
    if len(array) == 0 {
        return []int{-1, -1}
    }
    n := len(array)
    maxVal := int(^uint(0) >> 1) * -1 // MinInt
    minVal := int(^uint(0) >> 1)      // MaxInt
    left, right := -1, -1
    for i := 0; i < n; i++ {
        if array[i] < maxVal {
            right = i
        } else {
            maxVal = array[i]
        }
    }
    if right == -1 {
        return []int{-1, -1}
    }
    for i := n - 1; i >= 0; i-- {
        if array[i] > minVal {
            left = i
        } else {
            minVal = array[i]
        }
    }
    return []int{left, right}
}
```

```c [C]
int* subSort(int* array, int arraySize, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    if (arraySize == 0) {
        res[0] = -1; res[1] = -1;
        return res;
    }
    int maxVal = -2147483648, minVal = 2147483647;
    int left = -1, right = -1;
    for (int i = 0; i < arraySize; i++) {
        if (array[i] < maxVal) {
            right = i;
        } else {
            maxVal = array[i];
        }
    }
    if (right == -1) {
        res[0] = -1; res[1] = -1;
        return res;
    }
    for (int i = arraySize-1; i >= 0; i--) {
        if (array[i] > minVal) {
            left = i;
        } else {
            minVal = array[i];
        }
    }
    res[0] = left; res[1] = right;
    return res;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> subSort(vector<int>& array) {
        if (array.empty()) return {-1, -1};
        int n = array.size();
        int maxVal = INT_MIN, minVal = INT_MAX;
        int left = -1, right = -1;
        for (int i = 0; i < n; i++) {
            if (array[i] < maxVal) {
                right = i;
            } else {
                maxVal = array[i];
            }
        }
        if (right == -1) return {-1, -1};
        for (int i = n-1; i >= 0; i--) {
            if (array[i] > minVal) {
                left = i;
            } else {
                minVal = array[i];
            }
        }
        return {left, right};
    }
};
```

```javascript [JavaScript]
var subSort = function(array) {
    if (array.length === 0) return [-1, -1];
    const n = array.length;
    let maxVal = -Infinity, minVal = Infinity;
    let left = -1, right = -1;
    for (let i = 0; i < n; i++) {
        if (array[i] < maxVal) {
            right = i;
        } else {
            maxVal = array[i];
        }
    }
    if (right === -1) return [-1, -1];
    for (let i = n - 1; i >= 0; i--) {
        if (array[i] > minVal) {
            left = i;
        } else {
            minVal = array[i];
        }
    }
    return [left, right];
};
```

```typescript [TypeScript]
function subSort(array: number[]): number[] {
    if (array.length === 0) return [-1, -1];
    const n = array.length;
    let maxVal = -Infinity, minVal = Infinity;
    let left = -1, right = -1;
    for (let i = 0; i < n; i++) {
        if (array[i] < maxVal) {
            right = i;
        } else {
            maxVal = array[i];
        }
    }
    if (right === -1) return [-1, -1];
    for (let i = n - 1; i >= 0; i--) {
        if (array[i] > minVal) {
            left = i;
        } else {
            minVal = array[i];
        }
    }
    return [left, right];
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，只需两次遍历。
- **空间复杂度**：`O(1)`，常数空间。

---

## 三、总结

| 方法               | 时间复杂度   | 空间复杂度 | 特点           |
| ------------------ | ------------ | ---------- | -------------- |
| 排序 + 比较        | `O(n log n)` | `O(n)`     | 直观，但较慢   |
| 一次遍历（双指针） | `O(n)`       | `O(1)`     | **推荐**，最优 |

**推荐**：面试中首选 **方法二（一次遍历）**，时间复杂度 `O(n)`，空间 `O(1)`，且逻辑清晰。
