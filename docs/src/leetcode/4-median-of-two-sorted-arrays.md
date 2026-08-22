# [4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)



## 一、题目描述

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的 **中位数** 。

**进阶：**算法的时间复杂度应该为 `O(log (m + n))` 。



**示例 1：**

```
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

**示例 2：**

```
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

**提示：**

-   `nums1.length == m`
-   `nums2.length == n`
-   `0 <= m <= 1000`
-   `0 <= n <= 1000`
-   `1 <= m + n <= 2000`
-   `-106 <= nums1[i], nums2[i] <= 106`



## 二、解答方法

### 2.1 方法一：归并后取中位数（朴素法）

1. **思路**

最直接的想法：把两个有序数组合并成一个有序数组，然后根据总长度奇偶性取中位数。

-   用双指针按大小顺序把 `nums1`、`nums2` 合并到新数组 `merged`；
-   若 `merged.length` 为奇数，中位数就是 `merged[middle]`；
-   若为偶数，中位数是中间两个数的平均值 `(merged[middle - 1] + merged[middle]) / 2`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length;
        int[] merged = new int[m + n];
        int i = 0, j = 0, k = 0;
        while (i < m && j < n) {
            merged[k++] = nums1[i] < nums2[j] ? nums1[i++] : nums2[j++];
        }
        while (i < m) merged[k++] = nums1[i++];
        while (j < n) merged[k++] = nums2[j++];
        if (k % 2 == 1) return merged[k / 2];
        return (merged[k / 2 - 1] + merged[k / 2]) / 2.0;
    }
}
```

```python [Python]
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        merged = sorted(nums1 + nums2)
        k = len(merged)
        if k % 2 == 1:
            return float(merged[k // 2])
        return (merged[k // 2 - 1] + merged[k // 2]) / 2.0
```

```go [Go]
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    m, n := len(nums1), len(nums2)
    merged := make([]int, 0, m+n)
    merged = append(merged, nums1...)
    merged = append(merged, nums2...)
    sort.Ints(merged)
    k := len(merged)
    if k%2 == 1 {
        return float64(merged[k/2])
    }
    return float64(merged[k/2-1]+merged[k/2]) / 2.0
}
```

```c [C]
double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    int m = nums1Size, n = nums2Size;
    int* merged = (int*)malloc(sizeof(int) * (m + n));
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        merged[k++] = nums1[i] < nums2[j] ? nums1[i++] : nums2[j++];
    }
    while (i < m) merged[k++] = nums1[i++];
    while (j < n) merged[k++] = nums2[j++];
    double ans;
    if (k % 2 == 1) ans = merged[k / 2];
    else ans = (merged[k / 2 - 1] + merged[k / 2]) / 2.0;
    free(merged);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> merged;
        merged.reserve(nums1.size() + nums2.size());
        merge(nums1.begin(), nums1.end(), nums2.begin(), nums2.end(), back_inserter(merged));
        int k = merged.size();
        if (k % 2 == 1) return merged[k / 2];
        return (merged[k / 2 - 1] + merged[k / 2]) / 2.0;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const k = merged.length;
    if (k % 2 === 1) return merged[(k - 1) / 2];
    return (merged[k / 2 - 1] + merged[k / 2]) / 2;
};
```

```ts [TypeScript]
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const k = merged.length;
    if (k % 2 === 1) return merged[(k - 1) / 2];
    return (merged[k / 2 - 1] + merged[k / 2]) / 2;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m + n)`**，合并两个数组需要线性时间。
- **空间复杂度**：`O(m + n)`**，需要额外数组存放合并结果。

### 2.2 方法二：二分查找（划分数组）

1. **思路**

要找到中位数，本质是要在两个数组中做「分割」，使左半部分的元素个数等于右半部分（或相差 1），且左半部分所有元素都 <= 右半部分。在较短的数组 `nums1` 上二分查找分割点 `i`，使 `i + j = (m + n + 1) / 2`：

-   `i` 表示 `nums1` 左边取 `i` 个，`nums2` 左边取 `j = (m + n + 1) / 2 - i` 个；
-   令 `L1 = nums1[i-1]`、`R1 = nums1[i]`、`L2 = nums2[j-1]`、`R2 = nums2[j]`；
-   若 `L1 <= R2` 且 `L2 <= R1`，分割正确；
-   否则若 `L1 > R2`，说明 `i` 太大，左移；否则 `i` 太小，右移；
-   分割正确后，总长度为奇数取 `max(L1, L2)`，偶数取 `(max(L1,L2) + min(R1,R2)) / 2`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            int[] t = nums1; nums1 = nums2; nums2 = t;
        }
        int m = nums1.length, n = nums2.length;
        int left = 0, right = m;
        while (left <= right) {
            int i = (left + right) / 2;
            int j = (m + n + 1) / 2 - i;
            int L1 = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
            int R1 = i == m ? Integer.MAX_VALUE : nums1[i];
            int L2 = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
            int R2 = j == n ? Integer.MAX_VALUE : nums2[j];
            if (L1 <= R2 && L2 <= R1) {
                if ((m + n) % 2 == 1) return Math.max(L1, L2);
                return (Math.max(L1, L2) + Math.min(R1, R2)) / 2.0;
            } else if (L1 > R2) {
                right = i - 1;
            } else {
                left = i + 1;
            }
        }
        return 0.0;
    }
}
```

```python [Python]
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        left, right = 0, m
        while left <= right:
            i = (left + right) // 2
            j = (m + n + 1) // 2 - i
            L1 = float('-inf') if i == 0 else nums1[i - 1]
            R1 = float('inf') if i == m else nums1[i]
            L2 = float('-inf') if j == 0 else nums2[j - 1]
            R2 = float('inf') if j == n else nums2[j]
            if L1 <= R2 and L2 <= R1:
                if (m + n) % 2 == 1:
                    return max(L1, L2)
                return (max(L1, L2) + min(R1, R2)) / 2.0
            elif L1 > R2:
                right = i - 1
            else:
                left = i + 1
        return 0.0
```

```go [Go]
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    if len(nums1) > len(nums2) {
        nums1, nums2 = nums2, nums1
    }
    m, n := len(nums1), len(nums2)
    left, right := 0, m
    for left <= right {
        i := (left + right) / 2
        j := (m+n+1)/2 - i
        L1, R1 := math.MinInt32, math.MaxInt32
        if i != 0 {
            L1 = nums1[i-1]
        }
        if i != m {
            R1 = nums1[i]
        }
        L2, R2 := math.MinInt32, math.MaxInt32
        if j != 0 {
            L2 = nums2[j-1]
        }
        if j != n {
            R2 = nums2[j]
        }
        if L1 <= R2 && L2 <= R1 {
            if (m+n)%2 == 1 {
                return Math.max(L1, L2)
            }
            return (float64(Math.max(L1, L2)) + float64(Math.min(R1, R2))) / 2.0
        } else if L1 > R2 {
            right = i - 1
        } else {
            left = i + 1
        }
    }
    return 0.0
}
```

```c [C]
double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    if (nums1Size > nums2Size) {
        int* t = nums1; nums1 = nums2; nums2 = t;
        int ts = nums1Size; nums1Size = nums2Size; nums2Size = ts;
    }
    int m = nums1Size, n = nums2Size;
    int left = 0, right = m;
    while (left <= right) {
        int i = (left + right) / 2;
        int j = (m + n + 1) / 2 - i;
        int L1 = i == 0 ? INT_MIN : nums1[i - 1];
        int R1 = i == m ? INT_MAX : nums1[i];
        int L2 = j == 0 ? INT_MIN : nums2[j - 1];
        int R2 = j == n ? INT_MAX : nums2[j];
        if (L1 <= R2 && L2 <= R1) {
            if ((m + n) % 2 == 1) return (double)(L1 > L2 ? L1 : L2);
            int lo = L1 > L2 ? L1 : L2;
            int hi = R1 < R2 ? R1 : R2;
            return ((double)lo + (double)hi) / 2.0;
        } else if (L1 > R2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    return 0.0;
}
```

```cpp [C++]
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) swap(nums1, nums2);
        int m = nums1.size(), n = nums2.size();
        int left = 0, right = m;
        while (left <= right) {
            int i = (left + right) / 2;
            int j = (m + n + 1) / 2 - i;
            int L1 = i == 0 ? INT_MIN : nums1[i - 1];
            int R1 = i == m ? INT_MAX : nums1[i];
            int L2 = j == 0 ? INT_MIN : nums2[j - 1];
            int R2 = j == n ? INT_MAX : nums2[j];
            if (L1 <= R2 && L2 <= R1) {
                if ((m + n) % 2 == 1) return max(L1, L2);
                return (max(L1, L2) + min(R1, R2)) / 2.0;
            } else if (L1 > R2) {
                right = i - 1;
            } else {
                left = i + 1;
            }
        }
        return 0.0;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;
    const MIN = -Infinity, MAX = Infinity;
    while (left <= right) {
        const i = Math.floor((left + right) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        const L1 = i === 0 ? MIN : nums1[i - 1];
        const R1 = i === m ? MAX : nums1[i];
        const L2 = j === 0 ? MIN : nums2[j - 1];
        const R2 = j === n ? MAX : nums2[j];
        if (L1 <= R2 && L2 <= R1) {
            if ((m + n) % 2 === 1) return Math.max(L1, L2);
            return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
        } else if (L1 > R2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    return 0;
};
```

```ts [TypeScript]
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;
    const MIN = -Infinity, MAX = Infinity;
    while (left <= right) {
        const i = Math.floor((left + right) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        const L1 = i === 0 ? MIN : nums1[i - 1];
        const R1 = i === m ? MAX : nums1[i];
        const L2 = j === 0 ? MIN : nums2[j - 1];
        const R2 = j === n ? MAX : nums2[j];
        if (L1 <= R2 && L2 <= R1) {
            if ((m + n) % 2 === 1) return Math.max(L1, L2);
            return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
        } else if (L1 > R2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    return 0;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(log(min(m, n)))`，在较短数组上二分，满足进阶要求。
- **空间复杂度**：`O(1)`，只使用常数个变量。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 归并后取中位数（朴素法） | `O(m + n)` | `O(m + n)` | 常规实现 |
| 二分查找（划分数组） | `O(log(min(m, n)))` | `O(1)` | 折半降低复杂度 |

