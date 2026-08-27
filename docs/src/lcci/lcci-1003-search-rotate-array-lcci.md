# [面试题 10.03. 搜索旋转数组](https://leetcode.cn/problems/search-rotate-array-lcci/)

## 一、题目描述

搜索旋转数组。给定一个排序后的数组，包含 `n` 个整数，但这个数组已被旋转过很多次了（即，元素可能不是按升序排列的）。给定一个整数 `target`，如果在数组中找到 `target`，则返回它的索引，否则返回 `-1`。

假设数组中存在重复元素。

**示例 1：**

```
输入: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5
输出: 8（索引从 0 开始）
```

**示例 2：**

```
输入: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 11
输出: -1
```

**提示：**

- `arr` 长度范围在 `[1, 1000000]` 之间。

---

## 二、解答方法

### 2.1 方法一：二分查找（处理重复元素）

**1. 思路**

数组被旋转过但局部仍有序。使用二分查找，每次根据 `mid` 与左右边界的关系判断哪一侧有序。由于存在重复元素，当 `arr[left] == arr[mid] == arr[right]` 时无法判断哪侧有序，此时将 `left++`、`right--` 缩小范围。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[left] == arr[mid] && arr[mid] == arr[right]) {
                left++; right--;
            } else if (arr[left] <= arr[mid]) {
                if (target >= arr[left] && target < arr[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > arr[mid] && target <= arr[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def search(self, arr: List[int], target: int) -> int:
        left, right = 0, len(arr) - 1
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                return mid
            if arr[left] == arr[mid] == arr[right]:
                left += 1
                right -= 1
            elif arr[left] <= arr[mid]:
                if arr[left] <= target < arr[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if arr[mid] < target <= arr[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1
```

```go [Go]
func search(arr []int, target int) int {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := left + (right-left)/2
        if arr[mid] == target {
            return mid
        }
        if arr[left] == arr[mid] && arr[mid] == arr[right] {
            left++
            right--
        } else if arr[left] <= arr[mid] {
            if target >= arr[left] && target < arr[mid] {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            if target > arr[mid] && target <= arr[right] {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
}
```

```c [C]
int search(int* arr, int arrSize, int target) {
    int left = 0, right = arrSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[left] == arr[mid] && arr[mid] == arr[right]) {
            left++; right--;
        } else if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (target > arr[mid] && target <= arr[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int search(vector<int>& arr, int target) {
        int left = 0, right = arr.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[left] == arr[mid] && arr[mid] == arr[right]) {
                left++; right--;
            } else if (arr[left] <= arr[mid]) {
                if (target >= arr[left] && target < arr[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > arr[mid] && target <= arr[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};
```

```javascript [JavaScript]
var search = function(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
            left++; right--;
        } else if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (target > arr[mid] && target <= arr[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
};
```

```typescript [TypeScript]
function search(arr: number[], target: number): number {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
            left++; right--;
        } else if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (target > arr[mid] && target <= arr[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：平均 `O(log n)`；最坏（全部相同元素）`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：顺序查找（最坏情况退化）

**1. 思路**

当数组元素大量重复时，二分查找会退化为顺序查找。直接遍历数组寻找目标值，实现最简单，适合数据规模较小或对效率要求不高的场景。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def search(self, arr: List[int], target: int) -> int:
        for i, v in enumerate(arr):
            if v == target:
                return i
        return -1
```

```cpp [C++]
class Solution {
public:
    int search(vector<int>& arr, int target) {
        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
};
```

```javascript [JavaScript]
var search = function(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
};
```

```typescript [TypeScript]
function search(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

## 三、总结

| 方法           | 时间复杂度   | 空间复杂度 | 特点                               |
| -------------- | ------------ | ---------- | ---------------------------------- |
| 二分查找       | `O(log n)`~`O(n)` | `O(1)`     | 平均高效，处理重复需特殊判断       |
| 顺序查找       | `O(n)`       | `O(1)`     | 实现简单，最坏情况与二分一致       |

**推荐**：使用二分查找。注意当 `arr[left] == arr[mid] == arr[right]` 时无法判断有序区间，应收缩边界。
