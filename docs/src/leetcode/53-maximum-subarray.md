# [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)



## 一、题目描述

给你一个整数数组 `nums`，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。



**示例 1：**

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**示例 2：**

```
输入：nums = [1]
输出：1
```

**示例 3：**

```
输入：nums = [5,4,-1,7,8]
输出：23
```

**提示：**

-   `1 <= nums.length <= 10^5`
-   `-10^4 <= nums[i] <= 10^4`



## 二、解答方法

### 2.1 方法一：动态规划（ Kadane 算法）


1. **思路**

设 `dp[i]` 为「以第 `i` 个数结尾的最大子数组和」。若 `dp[i-1] > 0`，则接上前面更优；否则从 `i` 重新开始。空间可优化为只用单个变量记录上一项。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int maxSubArray(int[] nums) {
        int max = nums[0], cur = nums[0];
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
        max_sum = cur = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            max_sum = max(max_sum, cur)
        return max_sum
```

```go [Go]
func maxSubArray(nums []int) int {
    maxSum, cur := nums[0], nums[0]
    for _, x := range nums[1:] {
        if cur+x > x {
            cur += x
        } else {
            cur = x
        }
        if cur > maxSum {
            maxSum = cur
        }
    }
    return maxSum
}
```

```c [C]
int maxSubArray(int* nums, int numsSize) {
    int maxSum = nums[0], cur = nums[0];
    for (int i = 1; i < numsSize; i++) {
        cur = (cur + nums[i] > nums[i]) ? cur + nums[i] : nums[i];
        if (cur > maxSum) maxSum = cur;
    }
    return maxSum;
}
```

```cpp [C++]
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], cur = nums[0];
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
    let maxSum = nums[0], cur = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        maxSum = Math.max(maxSum, cur);
    }
    return maxSum;
};
```

```typescript [TypeScript]
function maxSubArray(nums: number[]): number {
    let maxSum = nums[0], cur = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        maxSum = Math.max(maxSum, cur);
    }
    return maxSum;
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n)`**，只需遍历一次数组。
- **空间复杂度**：`O(1)`**，只用到常数个变量。

### 2.2 方法二：分治法


1. **思路**

将数组从中间分成左右两部分，最大子数组和要么在左半、要么在右半、要么跨越中点。跨越中点的最大和可由中线向两侧分别扩展求得，递归合并即可。


2. **代码实现**

:::::: code-group
```java [Java]
class Solution {
    public int maxSubArray(int[] nums) {
        return divide(nums, 0, nums.length - 1);
    }

    private int divide(int[] nums, int l, int r) {
        if (l == r) return nums[l];
        int mid = (l + r) / 2;
        int leftMax = divide(nums, l, mid);
        int rightMax = divide(nums, mid + 1, r);
        int cross = crossMax(nums, l, mid, r);
        return Math.max(Math.max(leftMax, rightMax), cross);
    }

    private int crossMax(int[] nums, int l, int mid, int r) {
        int left = Integer.MIN_VALUE, sum = 0;
        for (int i = mid; i >= l; i--) { sum += nums[i]; left = Math.max(left, sum); }
        int right = Integer.MIN_VALUE; sum = 0;
        for (int i = mid + 1; i <= r; i++) { sum += nums[i]; right = Math.max(right, sum); }
        return left + right;
    }
}
```

```python [Python]
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def divide(l, r):
            if l == r:
                return nums[l]
            mid = (l + r) // 2
            left_max = divide(l, mid)
            right_max = divide(mid + 1, r)
            cross = cross_max(l, mid, r)
            return max(left_max, right_max, cross)

        def cross_max(l, mid, r):
            left = float('-inf'); s = 0
            for i in range(mid, l - 1, -1):
                s += nums[i]; left = max(left, s)
            right = float('-inf'); s = 0
            for i in range(mid + 1, r + 1):
                s += nums[i]; right = max(right, s)
            return left + right

        return divide(0, len(nums) - 1)
```

```go [Go]
func maxSubArray(nums []int) int {
    var divide func(l, r int) int
    divide = func(l, r int) int {
        if l == r { return nums[l] }
        mid := (l + r) / 2
        leftMax := divide(l, mid)
        rightMax := divide(mid+1, r)
        cross := crossMax(nums, l, mid, r)
        if leftMax > rightMax { if leftMax > cross { return leftMax }; return cross }
        if rightMax > cross { return rightMax }; return cross
    }
    crossMax := func(nums []int, l, mid, r int) int {
        left, s := -1<<31, 0
        for i := mid; i >= l; i-- { s += nums[i]; if s > left { left = s } }
        right, s := -1<<31, 0
        for i := mid + 1; i <= r; i++ { s += nums[i]; if s > right { right = s } }
        return left + right
    }
    return divide(0, len(nums)-1)
}
```

```c [C]
int maxSubArray(int* nums, int numsSize) {
    // 分治法核心结构同上，完整实现略
    return 0;
}
```

```cpp [C++]
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        function<int(int, int)> divide = [&](int l, int r) {
            if (l == r) return nums[l];
            int mid = (l + r) / 2;
            int leftMax = divide(l, mid);
            int rightMax = divide(mid + 1, r);
            int left = INT_MIN, sum = 0;
            for (int i = mid; i >= l; i--) { sum += nums[i]; left = max(left, sum); }
            int right = INT_MIN; sum = 0;
            for (int i = mid + 1; i <= r; i++) { sum += nums[i]; right = max(right, sum); }
            return max({leftMax, rightMax, left + right});
        };
        return divide(0, nums.size() - 1);
    }
};
```

```javascript [JavaScript]
var maxSubArray = function(nums) {
    const divide = (l, r) => {
        if (l === r) return nums[l];
        const mid = (l + r) >> 1;
        const leftMax = divide(l, mid);
        const rightMax = divide(mid + 1, r);
        let left = -Infinity, sum = 0;
        for (let i = mid; i >= l; i--) { sum += nums[i]; left = Math.max(left, sum); }
        let right = -Infinity; sum = 0;
        for (let i = mid + 1; i <= r; i++) { sum += nums[i]; right = Math.max(right, sum); }
        return Math.max(leftMax, rightMax, left + right);
    };
    return divide(0, nums.length - 1);
};
```

```typescript [TypeScript]
function maxSubArray(nums: number[]): number {
    const divide = (l: number, r: number): number => {
        if (l === r) return nums[l];
        const mid = (l + r) >> 1;
        const leftMax = divide(l, mid);
        const rightMax = divide(mid + 1, r);
        let left = -Infinity, sum = 0;
        for (let i = mid; i >= l; i--) { sum += nums[i]; left = Math.max(left, sum); }
        let right = -Infinity; sum = 0;
        for (let i = mid + 1; i <= r; i++) { sum += nums[i]; right = Math.max(right, sum); }
        return Math.max(leftMax, rightMax, left + right);
    };
    return divide(0, nums.length - 1);
}
```

::::::
3. **复杂度分析**

- **时间复杂度**：`O(n log n)`**，递归深度 `log n`，每层合并遍历 `O(n)`。
- **空间复杂度**：`O(log n)`**，递归栈深度。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（Kadane） | `O(n)` | `O(1)` | 最优，面试首选 |
| 分治法 | `O(n log n)` | `O(log n)` | 思路优美，练习递归 |
