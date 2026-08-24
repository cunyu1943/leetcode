# [面试题 16.17. 连续数列](https://leetcode.cn/problems/contiguous-sequence-lcci/)

## 一、题目描述

给定一个整数数组，找出总和最大的连续子数组，并返回其总和。

**示例：**

```
输入： [-2,1,-3,4,-1,2,1,-5,4]
输出： 6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**提示：**

- `1 <= len(array) <= 100000`
- `-10000 <= array[i] <= 10000`

## 二、解答方法

### 2.1 方法一：动态规划（Kadane 算法）

**1. 思路**

维护两个变量：
- `cur`：以当前元素结尾的最大子数组和。
- `max`：全局最大子数组和。

对于每个元素 `x`，`cur = max(x, cur + x)`，`max = max(max, cur)`。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0], max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            max = Math.max(max, cur);
        }
        return max;
    }
}
```

```python [Python]
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        cur = max_sum = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            max_sum = max(max_sum, cur)
        return max_sum
```

```go [Go]
func maxSubArray(nums []int) int {
    cur, max := nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        if nums[i] > cur+nums[i] {
            cur = nums[i]
        } else {
            cur = cur + nums[i]
        }
        if cur > max {
            max = cur
        }
    }
    return max
}
```

```c [C]
int maxSubArray(int* nums, int numsSize) {
    int cur = nums[0], max = nums[0];
    for (int i = 1; i < numsSize; i++) {
        cur = (nums[i] > cur + nums[i]) ? nums[i] : cur + nums[i];
        if (cur > max) max = cur;
    }
    return max;
}
```

```cpp [C++]
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], maxSum = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            maxSum = max(maxSum, cur);
        }
        return maxSum;
    }
};
```

```javascript [JavaScript]
var maxSubArray = function(nums) {
    let cur = nums[0], max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        max = Math.max(max, cur);
    }
    return max;
};
```

```typescript [TypeScript]
function maxSubArray(nums: number[]): number {
    let cur = nums[0], max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        max = Math.max(max, cur);
    }
    return max;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，一次遍历。
- **空间复杂度**：`O(1)`，常数空间。

---

### 2.2 方法二：分治法

**1. 思路**

将数组分成左右两半，最大子数组和可能出现在：
- 左半部分
- 右半部分
- 跨越中点的部分（从中点向左延伸的最大和 + 从中点向右延伸的最大和）

递归计算，时间复杂度 `O(n log n)`，空间 `O(log n)`（递归栈）。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maxSubArray(int[] nums) {
        return divide(nums, 0, nums.length - 1);
    }
    private int divide(int[] nums, int l, int r) {
        if (l == r) return nums[l];
        int mid = l + (r - l) / 2;
        int leftMax = divide(nums, l, mid);
        int rightMax = divide(nums, mid + 1, r);
        // 跨中点的最大和
        int leftSum = Integer.MIN_VALUE, sum = 0;
        for (int i = mid; i >= l; i--) {
            sum += nums[i];
            if (sum > leftSum) leftSum = sum;
        }
        int rightSum = Integer.MIN_VALUE;
        sum = 0;
        for (int i = mid + 1; i <= r; i++) {
            sum += nums[i];
            if (sum > rightSum) rightSum = sum;
        }
        int crossMax = leftSum + rightSum;
        return Math.max(Math.max(leftMax, rightMax), crossMax);
    }
}
```

```python [Python]
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        return self.divide(nums, 0, len(nums)-1)
    
    def divide(self, nums, l, r):
        if l == r: return nums[l]
        mid = (l + r) // 2
        left_max = self.divide(nums, l, mid)
        right_max = self.divide(nums, mid+1, r)
        # 跨中点
        left_sum = float('-inf')
        cur = 0
        for i in range(mid, l-1, -1):
            cur += nums[i]
            if cur > left_sum: left_sum = cur
        right_sum = float('-inf')
        cur = 0
        for i in range(mid+1, r+1):
            cur += nums[i]
            if cur > right_sum: right_sum = cur
        cross_max = left_sum + right_sum
        return max(left_max, right_max, cross_max)
```

```go [Go]
func maxSubArray(nums []int) int {
    return divide(nums, 0, len(nums)-1)
}
func divide(nums []int, l, r int) int {
    if l == r { return nums[l] }
    mid := l + (r-l)/2
    leftMax := divide(nums, l, mid)
    rightMax := divide(nums, mid+1, r)
    // 跨中点
    leftSum := -1 << 31
    sum := 0
    for i := mid; i >= l; i-- {
        sum += nums[i]
        if sum > leftSum { leftSum = sum }
    }
    rightSum := -1 << 31
    sum = 0
    for i := mid+1; i <= r; i++ {
        sum += nums[i]
        if sum > rightSum { rightSum = sum }
    }
    crossMax := leftSum + rightSum
    if leftMax >= rightMax && leftMax >= crossMax { return leftMax }
    if rightMax >= leftMax && rightMax >= crossMax { return rightMax }
    return crossMax
}
```

```c [C]
int divide(int* nums, int l, int r) {
    if (l == r) return nums[l];
    int mid = l + (r-l)/2;
    int leftMax = divide(nums, l, mid);
    int rightMax = divide(nums, mid+1, r);
    int leftSum = -2147483648, sum = 0;
    for (int i = mid; i >= l; i--) {
        sum += nums[i];
        if (sum > leftSum) leftSum = sum;
    }
    int rightSum = -2147483648;
    sum = 0;
    for (int i = mid+1; i <= r; i++) {
        sum += nums[i];
        if (sum > rightSum) rightSum = sum;
    }
    int crossMax = leftSum + rightSum;
    int max = leftMax > rightMax ? leftMax : rightMax;
    max = max > crossMax ? max : crossMax;
    return max;
}
int maxSubArray(int* nums, int numsSize) {
    return divide(nums, 0, numsSize-1);
}
```

```cpp [C++]
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        return divide(nums, 0, nums.size()-1);
    }
    int divide(vector<int>& nums, int l, int r) {
        if (l == r) return nums[l];
        int mid = l + (r-l)/2;
        int leftMax = divide(nums, l, mid);
        int rightMax = divide(nums, mid+1, r);
        int leftSum = INT_MIN, sum = 0;
        for (int i = mid; i >= l; i--) {
            sum += nums[i];
            if (sum > leftSum) leftSum = sum;
        }
        int rightSum = INT_MIN;
        sum = 0;
        for (int i = mid+1; i <= r; i++) {
            sum += nums[i];
            if (sum > rightSum) rightSum = sum;
        }
        int crossMax = leftSum + rightSum;
        return max({leftMax, rightMax, crossMax});
    }
};
```

```javascript [JavaScript]
var maxSubArray = function(nums) {
    return divide(nums, 0, nums.length-1);
};
function divide(nums, l, r) {
    if (l === r) return nums[l];
    const mid = l + Math.floor((r-l)/2);
    const leftMax = divide(nums, l, mid);
    const rightMax = divide(nums, mid+1, r);
    let leftSum = -Infinity, sum = 0;
    for (let i = mid; i >= l; i--) {
        sum += nums[i];
        if (sum > leftSum) leftSum = sum;
    }
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid+1; i <= r; i++) {
        sum += nums[i];
        if (sum > rightSum) rightSum = sum;
    }
    const crossMax = leftSum + rightSum;
    return Math.max(leftMax, rightMax, crossMax);
}
```

```typescript [TypeScript]
function maxSubArray(nums: number[]): number {
    return divide(nums, 0, nums.length-1);
}
function divide(nums: number[], l: number, r: number): number {
    if (l === r) return nums[l];
    const mid = l + Math.floor((r-l)/2);
    const leftMax = divide(nums, l, mid);
    const rightMax = divide(nums, mid+1, r);
    let leftSum = -Infinity, sum = 0;
    for (let i = mid; i >= l; i--) {
        sum += nums[i];
        if (sum > leftSum) leftSum = sum;
    }
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid+1; i <= r; i++) {
        sum += nums[i];
        if (sum > rightSum) rightSum = sum;
    }
    const crossMax = leftSum + rightSum;
    return Math.max(leftMax, rightMax, crossMax);
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n log n)`，递归层数 `log n`，每层合并需 `O(n)`。
- **空间复杂度**：`O(log n)`，递归栈深度。

---

## 三、总结

| 方法               | 时间复杂度   | 空间复杂度 | 特点             |
| ------------------ | ------------ | ---------- | ---------------- |
| 动态规划（Kadane） | `O(n)`       | `O(1)`     | **推荐**，最优   |
| 分治法             | `O(n log n)` | `O(log n)` | 展示思路，非最优 |

**推荐**：面试中首选 **动态规划方法**，简单高效，是经典的最优解。
