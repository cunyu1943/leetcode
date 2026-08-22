# [16. 最接近的三数之和](https://leetcode.cn/problems/3sum-closest/)



## 一、题目描述

给你一个长度为 `n` 的整数数组 `nums` 和一个目标值 `target`。请你从 `nums` 中选出三个在 **不同下标位置** 的整数，使它们的和与 `target` 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。



**示例 1：**

```
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2)。
```

**示例 2：**

```
输入：nums = [0,0,0], target = 1
输出：0
```

**提示：**

-   `3 <= nums.length <= 1000`
-   `-1000 <= nums[i] <= 1000`
-   `-10^4 <= target <= 10^4`



## 二、解答方法

### 2.1 方法一：排序 + 双指针

1. **思路**

与三数之和思路一致，但不再要求和为 0，而是记录和与 `target` 的差距，维护「最接近」的结果：

-   先排序，初始化 `best` 为前三个数之和；
-   枚举 `i`，内层用 `left`、`right` 双指针；
-   计算 `sum`，若 `|sum - target| < |best - target|` 则更新 `best`；
-   若 `sum == target` 直接返回（不可能更接近）；若 `sum < target` 则 `left++`（需更大和），否则 `right--`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int best = nums[0] + nums[1] + nums[2];
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (Math.abs(sum - target) < Math.abs(best - target)) {
                    best = sum;
                }
                if (sum == target) return sum;
                else if (sum < target) left++;
                else right--;
            }
        }
        return best;
    }
}
```

```python [Python]
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        best = nums[0] + nums[1] + nums[2]
        n = len(nums)
        for i in range(n - 2):
            left, right = i + 1, n - 1
            while left < right:
                s = nums[i] + nums[left] + nums[right]
                if abs(s - target) < abs(best - target):
                    best = s
                if s == target:
                    return s
                elif s < target:
                    left += 1
                else:
                    right -= 1
        return best
```

```go [Go]
import "math"

func threeSumClosest(nums []int, target int) int {
    sort.Ints(nums)
    best := nums[0] + nums[1] + nums[2]
    n := len(nums)
    for i := 0; i < n-2; i++ {
        left, right := i+1, n-1
        for left < right {
            sum := nums[i] + nums[left] + nums[right]
            if math.Abs(float64(sum-target)) < math.Abs(float64(best-target)) {
                best = sum
            }
            if sum == target {
                return sum
            } else if sum < target {
                left++
            } else {
                right--
            }
        }
    }
    return best
}
```

```c [C]
int threeSumClosest(int* nums, int numsSize, int target) {
    /* C 标准库无内建 sort，需先 qsort 排序，逻辑同下 */
    int best = nums[0] + nums[1] + nums[2];
    int n = numsSize;
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (abs(sum - target) < abs(best - target)) best = sum;
            if (sum == target) return sum;
            else if (sum < target) left++;
            else right--;
        }
    }
    return best;
}
```

```cpp [C++]
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int best = nums[0] + nums[1] + nums[2];
        int n = nums.size();
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (abs(sum - target) < abs(best - target)) best = sum;
                if (sum == target) return sum;
                else if (sum < target) left++;
                else right--;
            }
        }
        return best;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b);
    let best = nums[0] + nums[1] + nums[2];
    const n = nums.length;
    for (let i = 0; i < n - 2; i++) {
        let left = i + 1, right = n - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            if (sum === target) return sum;
            else if (sum < target) left++;
            else right--;
        }
    }
    return best;
};
```

```ts [TypeScript]
function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    let best = nums[0] + nums[1] + nums[2];
    const n = nums.length;
    for (let i = 0; i < n - 2; i++) {
        let left = i + 1, right = n - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            if (sum === target) return sum;
            else if (sum < target) left++;
            else right--;
        }
    }
    return best;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，排序 `O(n log n)` + 双层循环 `O(n²)`。
- **空间复杂度**：`O(log n)`，排序递归栈开销。

### 2.2 方法二：暴力枚举（对比）

1. **思路**

枚举所有三元组，记录与 `target` 最接近的和。直观但超时，仅用于说明下界。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int best = nums[0] + nums[1] + nums[2];
        int n = nums.length;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                for (int k = j + 1; k < n; k++) {
                    int sum = nums[i] + nums[j] + nums[k];
                    if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
                }
        return best;
    }
}
```

```python [Python]
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        best = nums[0] + nums[1] + nums[2]
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):
                    s = nums[i] + nums[j] + nums[k]
                    if abs(s - target) < abs(best - target):
                        best = s
        return best
```

```go [Go]
func threeSumClosest(nums []int, target int) int {
    best := nums[0] + nums[1] + nums[2]
    n := len(nums)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            for k := j + 1; k < n; k++ {
                sum := nums[i] + nums[j] + nums[k]
                if abs(sum-target) < abs(best-target) {
                    best = sum
                }
            }
        }
    }
    return best
}
```

```c [C]
int threeSumClosest(int* nums, int numsSize, int target) {
    int best = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < numsSize; i++)
        for (int j = i + 1; j < numsSize; j++)
            for (int k = j + 1; k < numsSize; k++) {
                int sum = nums[i] + nums[j] + nums[k];
                if (abs(sum - target) < abs(best - target)) best = sum;
            }
    return best;
}
```

```cpp [C++]
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        int best = nums[0] + nums[1] + nums[2];
        int n = nums.size();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                for (int k = j + 1; k < n; k++) {
                    int sum = nums[i] + nums[j] + nums[k];
                    if (abs(sum - target) < abs(best - target)) best = sum;
                }
        return best;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let best = nums[0] + nums[1] + nums[2];
    const n = nums.length;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            for (let k = j + 1; k < n; k++) {
                const sum = nums[i] + nums[j] + nums[k];
                if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            }
    return best;
};
```

```ts [TypeScript]
function threeSumClosest(nums: number[], target: number): number {
    let best = nums[0] + nums[1] + nums[2];
    const n = nums.length;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            for (let k = j + 1; k < n; k++) {
                const sum = nums[i] + nums[j] + nums[k];
                if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            }
    return best;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n³)`，三重循环。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 排序 + 双指针 | `O(n²)` | `O(log n)` | 空间紧凑，常为常数级 |
| 暴力枚举（对比） | `O(n³)` | `O(1)` | 常规实现 |

