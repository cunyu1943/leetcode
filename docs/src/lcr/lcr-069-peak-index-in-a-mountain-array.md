# [LCR 069. 山脉数组的峰顶索引](https://leetcode.cn/problems/B1IRdb/)



## 一、题目描述

符合下列属性的数组 `arr` 称为 **山脉数组**：

- `arr.length >= 3`
- 存在 `i`（`0 < i < arr.length - 1`）使得：
  - `arr[0] < arr[1] < ... arr[i-1] < arr[i]`
  - `arr[i] > arr[i+1] > ... > arr[arr.length - 1]`

给定由整数组成的山脉数组 `arr` ，返回任何满足 `arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]` 的下标 `i` ，即山峰位置。



**示例 1：**

```
输入：arr = [0,1,0]
输出：1
```

**示例 2：**

```
输入：arr = [0,2,1,0]
输出：1
```

**示例 3：**

```
输入：arr = [24,69,100,99,79,78,67,36,26,19]
输出：2
```

**提示：**

- `3 <= arr.length <= 10⁵`
- 对于所有 `i`，都有 `arr[i] != arr[i + 1]`



## 二、解答方法

### 2.1 方法一：二分查找

1. **思路**

山脉数组在峰顶左侧严格上升、右侧严格下降，因此可以用二分：

- 若 `arr[m] < arr[m+1]`，说明处于上升段，峰顶在右侧，`l = m + 1`；
- 否则处于下降段（或就是峰顶），`r = m`。

循环结束 `l` 即峰顶下标。时间 `O(log n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (arr[m] < arr[m + 1]) l = m + 1;
            else r = m;
        }
        return l;
    }
}
```

```python [Python]
class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        l, r = 0, len(arr) - 1
        while l < r:
            m = l + (r - l) // 2
            if arr[m] < arr[m + 1]:
                l = m + 1
            else:
                r = m
        return l
```

```cpp [C++]
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int l = 0, r = arr.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (arr[m] < arr[m + 1]) l = m + 1;
            else r = m;
        }
        return l;
    }
};
```

```go [Go]
func peakIndexInMountainArray(arr []int) int {
    l, r := 0, len(arr)-1
    for l < r {
        m := l + (r-l)/2
        if arr[m] < arr[m+1] {
            l = m + 1
        } else {
            r = m
        }
    }
    return l
}
```

```js [JavaScript]
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
    let l = 0, r = arr.length - 1;
    while (l < r) {
        const m = l + ((r - l) >> 1);
        if (arr[m] < arr[m + 1]) l = m + 1;
        else r = m;
    }
    return l;
};
```

```c [C]
int peakIndexInMountainArray(int* arr, int arrSize) {
    int l = 0, r = arrSize - 1;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (arr[m] < arr[m + 1]) l = m + 1;
        else r = m;
    }
    return l;
}
```

```ts [TypeScript]
function peakIndexInMountainArray(arr: number[]): number {
    let l = 0, r = arr.length - 1;
    while (l < r) {
        const m = l + ((r - l) >> 1);
        if (arr[m] < arr[m + 1]) l = m + 1;
        else r = m;
    }
    return l;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：线性扫描

1. **思路**

从头遍历，找到第一个满足 `arr[i] > arr[i+1]` 的位置即为峰顶。时间 `O(n)`，适合理解题意。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return i;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        for i in range(len(arr) - 1):
            if arr[i] > arr[i + 1]:
                return i
        return -1
```

```cpp [C++]
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        for (int i = 0; i < arr.size() - 1; i++)
            if (arr[i] > arr[i + 1]) return i;
        return -1;
    }
};
```

```go [Go]
func peakIndexInMountainArray(arr []int) int {
    for i := 0; i < len(arr)-1; i++ {
        if arr[i] > arr[i+1] {
            return i
        }
    }
    return -1
}
```

```js [JavaScript]
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return i;
    }
    return -1;
};
```

```c [C]
int peakIndexInMountainArray(int* arr, int arrSize) {
    for (int i = 0; i < arrSize - 1; i++)
        if (arr[i] > arr[i + 1]) return i;
    return -1;
}
```

```ts [TypeScript]
function peakIndexInMountainArray(arr: number[]): number {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return i;
    }
    return -1;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分 | `O(log n)` | `O(1)` | 最优，推荐 |
| 线性扫描 | `O(n)` | `O(1)` | 简单直观 |

二分的关键是比较 `arr[m]` 与 `arr[m+1]`：上升段峰在右，否则在左（含 m 自身）。这是「峰值元素」二分的通用模板。

