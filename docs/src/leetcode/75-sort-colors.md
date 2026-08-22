# [75. 颜色分类](https://leetcode.cn/problems/sort-colors/)



## 一、题目描述

给定一个包含红色、白色和蓝色、共 `n` 个元素的数组 `nums`，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色（0）、白色（1）、蓝色（2）的顺序排列。

请使用 **原地** 算法，且不使用库函数的 sort 功能。



**示例 1：**

```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```

**示例 2：**

```
输入：nums = [2,0,1]
输出：[0,1,2]
```

**提示：**

-   `n == nums.length`
-   `1 <= n <= 300`
-   `nums[i]` 为 `0`、`1` 或 `2`



## 二、解答方法

### 2.1 方法一：双指针（荷兰国旗）


1. **思路**

用 `p0` 维护 0 的右边界，`p2` 维护 2 的左边界，遍历指针 `i` 碰到 0 与 `p0` 交换、碰到 2 与 `p2` 交换并回退 `i`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void sortColors(int[] nums) {
        int p0 = 0, p2 = nums.length - 1, i = 0;
        while (i <= p2) {
            if (nums[i] == 0) { swap(nums, i++, p0++); }
            else if (nums[i] == 2) { swap(nums, i, p2--); }
            else i++;
        }
    }
    private void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}
```

```python [Python]
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        p0 = i = 0
        p2 = len(nums) - 1
        while i <= p2:
            if nums[i] == 0:
                nums[i], nums[p0] = nums[p0], nums[i]
                i += 1; p0 += 1
            elif nums[i] == 2:
                nums[i], nums[p2] = nums[p2], nums[i]
                p2 -= 1
            else:
                i += 1
```

```go [Go]
func sortColors(nums []int) {
    p0, p2 := 0, len(nums)-1
    for i := 0; i <= p2; {
        if nums[i] == 0 { nums[i], nums[p0] = nums[p0], nums[i]; i++; p0++ }
        else if nums[i] == 2 { nums[i], nums[p2] = nums[p2], nums[i]; p2-- }
        else { i++ }
    }
}
```

```c [C]
void sortColors(int* nums, int numsSize) {
    int p0 = 0, p2 = numsSize - 1, i = 0;
    while (i <= p2) {
        if (nums[i] == 0) { int t = nums[i]; nums[i] = nums[p0]; nums[p0] = t; i++; p0++; }
        else if (nums[i] == 2) { int t = nums[i]; nums[i] = nums[p2]; nums[p2] = t; p2--; }
        else i++;
    }
}
```

```cpp [C++]
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int p0 = 0, p2 = nums.size() - 1, i = 0;
        while (i <= p2) {
            if (nums[i] == 0) swap(nums[i++], nums[p0++]);
            else if (nums[i] == 2) swap(nums[i], nums[p2--]);
            else i++;
        }
    }
};
```

```javascript [JavaScript]
var sortColors = function(nums) {
    let p0 = 0, p2 = nums.length - 1, i = 0;
    while (i <= p2) {
        if (nums[i] === 0) { [nums[i], nums[p0]] = [nums[p0], nums[i]]; i++; p0++; }
        else if (nums[i] === 2) { [nums[i], nums[p2]] = [nums[p2], nums[i]]; p2--; }
        else i++;
    }
};
```

```typescript [TypeScript]
function sortColors(nums: number[]): void {
    let p0 = 0, p2 = nums.length - 1, i = 0;
    while (i <= p2) {
        if (nums[i] === 0) { [nums[i], nums[p0]] = [nums[p0], nums[i]]; i++; p0++; }
        else if (nums[i] === 2) { [nums[i], nums[p2]] = [nums[p2], nums[i]]; p2--; }
        else i++;
    }
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，一次遍历。
- **空间复杂度**：`O(1)`，原地交换。

### 2.2 方法二：计数排序


1. **思路**

统计 0、1、2 的个数，再按数量重写数组。直观但需两次遍历，且非严格"原地单遍"。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public void sortColors(int[] nums) {
        int c0 = 0, c1 = 0, c2 = 0;
        for (int x : nums) {
            if (x == 0) c0++; else if (x == 1) c1++; else c2++;
        }
        int i = 0;
        while (c0-- > 0) nums[i++] = 0;
        while (c1-- > 0) nums[i++] = 1;
        while (c2-- > 0) nums[i++] = 2;
    }
}
```

```python [Python]
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        c = [0, 0, 0]
        for x in nums:
            c[x] += 1
        i = 0
        for v in range(3):
            for _ in range(c[v]):
                nums[i] = v
                i += 1
```

```go [Go]
func sortColors(nums []int) {
    c := [3]int{}
    for _, x := range nums { c[x]++ }
    i := 0
    for v := 0; v < 3; v++ {
        for c[v] > 0 { nums[i] = v; i++; c[v]-- }
    }
}
```

```c [C]
void sortColors(int* nums, int numsSize) {
    int c[3] = {0};
    for (int i = 0; i < numsSize; i++) c[nums[i]]++;
    int i = 0;
    for (int v = 0; v < 3; v++)
        while (c[v]--) nums[i++] = v;
}
```

```cpp [C++]
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int c[3] = {0};
        for (int x : nums) c[x]++;
        int i = 0;
        for (int v = 0; v < 3; v++)
            while (c[v]--) nums[i++] = v;
    }
};
```

```javascript [JavaScript]
var sortColors = function(nums) {
    const c = [0, 0, 0];
    for (const x of nums) c[x]++;
    let i = 0;
    for (let v = 0; v < 3; v++)
        while (c[v]--) nums[i++] = v;
};
```

```typescript [TypeScript]
function sortColors(nums: number[]): void {
    const c: [number, number, number] = [0, 0, 0];
    for (const x of nums) c[x]++;
    let i = 0;
    for (let v = 0; v < 3; v++)
        while (c[v]--) nums[i++] = v;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，两次遍历。
- **空间复杂度**：`O(1)`，只用到计数变量。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（荷兰国旗） | `O(n)` | `O(1)` | 单遍原地，推荐 |
| 计数排序 | `O(n)` | `O(1)` | 直观，需两遍 |
