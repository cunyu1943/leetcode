# [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)



## 一、题目描述

给你两个按 **非递减顺序** 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n`，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你 **合并** `nums2` 到 `nums1` 中，使合并后的数组同样按 **非递减顺序** 排列。

**注意：** 最终，合并后数组不应由函数返回，而是存储在 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 `0`，应忽略。`nums2` 的长度为 `n`。



**示例 1：**

```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
```

**示例 2：**

```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
```

**提示：**

-   `nums1.length == m + n`
-   `nums2.length == n`
-   `0 <= m, n <= 200`
-   `1 <= m + n <= 200`
-   `-10^9 <= nums1[i], nums2[j] <= 10^9`



## 二、解答方法

### 2.1 方法一：双指针从后向前


1. **思路**

从 `nums1` 和 `nums2` 的末尾开始比较，把较大的放到 `nums1` 的末尾（从 `m+n-1` 开始），避免覆盖未处理的元素。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (i >= 0 && j >= 0) {
            nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
        }
        while (j >= 0) nums1[k--] = nums2[j--];
    }
}
```

```python [Python]
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i, j, k = m - 1, n - 1, m + n - 1
        while i >= 0 and j >= 0:
            if nums1[i] > nums2[j]:
                nums1[k] = nums1[i]; i -= 1
            else:
                nums1[k] = nums2[j]; j -= 1
            k -= 1
        while j >= 0:
            nums1[k] = nums2[j]; j -= 1; k -= 1
```

```go [Go]
func merge(nums1 []int, m int, nums2 []int, n int) {
    i, j, k := m-1, n-1, m+n-1
    for i >= 0 && j >= 0 {
        if nums1[i] > nums2[j] { nums1[k] = nums1[i]; i-- } else { nums1[k] = nums2[j]; j-- }
        k--
    }
    for j >= 0 { nums1[k] = nums2[j]; j--; k-- }
}
```

```c [C]
void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
    while (j >= 0) nums1[k--] = nums2[j--];
}
```

```cpp [C++]
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (i >= 0 && j >= 0) {
            nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
        }
        while (j >= 0) nums1[k--] = nums2[j--];
    }
};
```

```javascript [JavaScript]
var merge = function(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
    while (j >= 0) nums1[k--] = nums2[j--];
};
```

```typescript [TypeScript]
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
    while (j >= 0) nums1[k--] = nums2[j--];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`，一次遍历。
- **空间复杂度**：`O(1)`，原地合并。

### 2.2 方法二：复制后双指针


1. **思路**

先把 `nums1` 前 `m` 个元素复制到辅助数组，再与 `nums2` 正常双指针合并回 `nums1`。直观但需额外空间。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int[] tmp = new int[m];
        System.arraycopy(nums1, 0, tmp, 0, m);
        int i = 0, j = 0, k = 0;
        while (i < m && j < n) {
            nums1[k++] = tmp[i] <= nums2[j] ? tmp[i++] : nums2[j++];
        }
        while (i < m) nums1[k++] = tmp[i++];
        while (j < n) nums1[k++] = nums2[j++];
    }
}
```

```python [Python]
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        tmp = nums1[:m]
        i = j = k = 0
        while i < m and j < n:
            if tmp[i] <= nums2[j]: nums1[k] = tmp[i]; i += 1
            else: nums1[k] = nums2[j]; j += 1
            k += 1
        while i < m: nums1[k] = tmp[i]; i += 1; k += 1
        while j < n: nums1[k] = nums2[j]; j += 1; k += 1
```

```go [Go]
func merge(nums1 []int, m int, nums2 []int, n int) {
    tmp := make([]int, m)
    copy(tmp, nums1[:m])
    i, j, k := 0, 0, 0
    for i < m && j < n {
        if tmp[i] <= nums2[j] { nums1[k] = tmp[i]; i++ } else { nums1[k] = nums2[j]; j++ }
        k++
    }
    for i < m { nums1[k] = tmp[i]; i++; k++ }
    for j < n { nums1[k] = nums2[j]; j++; k++ }
}
```

```c [C]
void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {
    int* tmp = (int*)malloc(sizeof(int) * m);
    for (int i = 0; i < m; i++) tmp[i] = nums1[i];
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (tmp[i] <= nums2[j]) nums1[k++] = tmp[i++];
        else nums1[k++] = nums2[j++];
    }
    while (i < m) nums1[k++] = tmp[i++];
    while (j < n) nums1[k++] = nums2[j++];
    free(tmp);
}
```

```cpp [C++]
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        vector<int> tmp(nums1.begin(), nums1.begin() + m);
        int i = 0, j = 0, k = 0;
        while (i < m && j < n) {
            nums1[k++] = tmp[i] <= nums2[j] ? tmp[i++] : nums2[j++];
        }
        while (i < m) nums1[k++] = tmp[i++];
        while (j < n) nums1[k++] = nums2[j++];
    }
};
```

```javascript [JavaScript]
var merge = function(nums1, m, nums2, n) {
    const tmp = nums1.slice(0, m);
    let i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (tmp[i] <= nums2[j]) nums1[k++] = tmp[i++];
        else nums1[k++] = nums2[j++];
    }
    while (i < m) nums1[k++] = tmp[i++];
    while (j < n) nums1[k++] = nums2[j++];
};
```

```typescript [TypeScript]
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    const tmp = nums1.slice(0, m);
    let i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (tmp[i] <= nums2[j]) nums1[k++] = tmp[i++];
        else nums1[k++] = nums2[j++];
    }
    while (i < m) nums1[k++] = tmp[i++];
    while (j < n) nums1[k++] = nums2[j++];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`，一次遍历。
- **空间复杂度**：`O(m)`，辅助数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针从后向前 | `O(m + n)` | `O(1)` | 原地，空间最优，推荐 |
| 复制后双指针 | `O(m + n)` | `O(m)` | 直观，需额外空间 |
