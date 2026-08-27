# [面试题 10.11. 峰与谷](https://leetcode.cn/problems/peaks-and-valleys-lcci/)

## 一、题目描述

在一个整数数组中，「峰」是比相邻整数都大的元素，「谷」是比相邻整数都小的元素。例如，在数组 `[5, 8, 6, 2, 3, 4, 6]` 中，`[8, 6, 6]` 是峰，而 `[5, 2, 3, 4]` 是谷。

现在给定一个整数数组，编写一个方法，将其排列成峰谷交错的形式（即 `arr[0] > arr[1] < arr[2] > arr[3] < ...`）。

**示例：**

```
输入: [5, 3, 1, 2, 3]
输出: 任一排列如 [5, 1, 3, 2, 3]（满足 arr[0] > arr[1] < arr[2] > arr[3] < arr[4]）
```

**说明：**

- 输出结果可以有多种，只要满足峰谷交错即可。

---

## 二、解答方法

### 2.1 方法一：排序后交叉放置

**1. 思路**

先将数组排序，然后把较小的一半和较大的一半交叉放置：取排序后前半段的第 `i` 个元素与后半段的第 `i` 个元素交错排列（`[小, 大, 小, 大, ...]` 或反过来），即可保证峰谷交替。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void wiggleSort(int[] nums) {
        int n = nums.length;
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int left = (n - 1) / 2, right = n - 1;
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) nums[i] = sorted[left--];
            else nums[i] = sorted[right--];
        }
    }
}
```

```python [Python]
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        nums.sort()
        n = len(nums)
        half = (n + 1) // 2
        small = nums[:half][::-1]
        large = nums[half:][::-1]
        nums[0::2] = small
        nums[1::2] = large
```

```go [Go]
func wiggleSort(nums []int) {
    sort.Ints(nums)
    n := len(nums)
    tmp := make([]int, n)
    copy(tmp, nums)
    left, right := (n-1)/2, n-1
    for i := 0; i < n; i++ {
        if i%2 == 0 {
            nums[i] = tmp[left]
            left--
        } else {
            nums[i] = tmp[right]
            right--
        }
    }
}
```

```c [C]
void wiggleSort(int* nums, int numsSize) {
    int* tmp = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) tmp[i] = nums[i];
    // 简单冒泡/选择排序（演示用，实际可调用 qsort）
    for (int i = 0; i < numsSize; i++)
        for (int j = i + 1; j < numsSize; j++)
            if (tmp[i] > tmp[j]) { int t = tmp[i]; tmp[i] = tmp[j]; tmp[j] = t; }
    int left = (numsSize - 1) / 2, right = numsSize - 1;
    for (int i = 0; i < numsSize; i++) {
        if (i % 2 == 0) nums[i] = tmp[left--];
        else nums[i] = tmp[right--];
    }
    free(tmp);
}
```

```cpp [C++]
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        int n = nums.size();
        vector<int> tmp = nums;
        sort(tmp.begin(), tmp.end());
        int left = (n - 1) / 2, right = n - 1;
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) nums[i] = tmp[left--];
            else nums[i] = tmp[right--];
        }
    }
};
```

```javascript [JavaScript]
var wiggleSort = function(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    let left = (n - 1) / 2 | 0, right = n - 1;
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) nums[i] = sorted[left--];
        else nums[i] = sorted[right--];
    }
};
```

```typescript [TypeScript]
function wiggleSort(nums: number[]): void {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    let left = Math.floor((n - 1) / 2), right = n - 1;
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) nums[i] = sorted[left--];
        else nums[i] = sorted[right--];
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，瓶颈在排序。
- **空间复杂度**：`O(n)`，用于存放排序后的副本。

---

### 2.2 方法二：原地贪心交换

**1. 思路**

遍历数组，期望在偶数下标处为「峰」、奇数下标处为「谷」（或反之）。对每个位置，将其与相邻元素比较，若不满足峰谷关系则与较大的（或较小的）邻居交换。一次遍历即可完成，原地无额外空间。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public void wiggleSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if ((i % 2 == 1 && nums[i] > nums[i - 1]) ||
                (i % 2 == 0 && nums[i] < nums[i - 1])) {
                int t = nums[i]; nums[i] = nums[i - 1]; nums[i - 1] = t;
            }
        }
    }
}
```

```python [Python]
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        for i in range(1, len(nums)):
            if (i % 2 == 1 and nums[i] > nums[i - 1]) or \
               (i % 2 == 0 and nums[i] < nums[i - 1]):
                nums[i], nums[i - 1] = nums[i - 1], nums[i]
```

```cpp [C++]
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            if ((i % 2 == 1 && nums[i] > nums[i - 1]) ||
                (i % 2 == 0 && nums[i] < nums[i - 1])) {
                swap(nums[i], nums[i - 1]);
            }
        }
    }
};
```

```javascript [JavaScript]
var wiggleSort = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        if ((i % 2 === 1 && nums[i] > nums[i - 1]) ||
            (i % 2 === 0 && nums[i] < nums[i - 1])) {
            [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
        }
    }
};
```

```typescript [TypeScript]
function wiggleSort(nums: number[]): void {
    for (let i = 1; i < nums.length; i++) {
        if ((i % 2 === 1 && nums[i] > nums[i - 1]) ||
            (i % 2 === 0 && nums[i] < nums[i - 1])) {
            [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
        }
    }
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，原地交换。

---

## 三、总结

| 方法           | 时间复杂度  | 空间复杂度 | 特点                         |
| -------------- | ----------- | ---------- | ---------------------------- |
| 排序后交叉放置 | `O(n log n)`| `O(n)`     | 结果稳定，满足严格峰谷       |
| 原地贪心交换   | `O(n)`      | `O(1)`     | 高效原地，注意可能需多次遍历 |

**推荐**：追求空间最优用原地贪心；要求严格峰谷交错且允许额外空间时，排序交叉法更可靠。
