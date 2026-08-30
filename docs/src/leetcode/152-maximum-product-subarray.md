# [152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)



## 一、题目描述

给你一个整数数组 `nums` ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 **32 位** 整数。

**子数组** 是数组的连续子序列。



**示例 1：**

```
输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2：**

```
输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```

**提示：**

-   `1 <= nums.length <= 2 * 10⁴`
-   `-10 <= nums[i] <= 10`
-   `nums` 的任何前缀或后缀的乘积都 **保证** 是一个 32 位 整数



## 二、解答方法

### 2.1 方法一：动态规划（维护最大/最小乘积）

1. **思路**

乘积与求和不同：遇到负数时，之前的最小乘积可能变成最大乘积。因此需同时维护「以当前元素结尾的最大乘积 `imax`」和「最小乘积 `imin`」：

- 若 `nums[i] >= 0`：`imax = max(nums[i], imax * nums[i])`，`imin = min(nums[i], imin * nums[i])`
- 若 `nums[i] < 0`：正负翻转，交换 `imax` 与 `imin` 再计算。

答案取所有 `imax` 的最大值。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maxProduct(int[] nums) {
        int ans = nums[0], imax = nums[0], imin = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                int tmp = imax;
                imax = imin;
                imin = tmp;
            }
            imax = Math.max(nums[i], imax * nums[i]);
            imin = Math.min(nums[i], imin * nums[i]);
            ans = Math.max(ans, imax);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        ans = imax = imin = nums[0]
        for num in nums[1:]:
            if num < 0:
                imax, imin = imin, imax
            imax = max(num, imax * num)
            imin = min(num, imin * num)
            ans = max(ans, imax)
        return ans
```

```go [Go]
func maxProduct(nums []int) int {
    ans, imax, imin := nums[0], nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        if nums[i] < 0 {
            imax, imin = imin, imax
        }
        imax = max(nums[i], imax*nums[i])
        imin = min(nums[i], imin*nums[i])
        ans = max(ans, imax)
    }
    return ans
}

func max(a, b int) int { if a > b { return a }; return b }
func min(a, b int) int { if a < b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int ans = nums[0], imax = nums[0], imin = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < 0) {
                swap(imax, imin);
            }
            imax = max(nums[i], imax * nums[i]);
            imin = min(nums[i], imin * nums[i]);
            ans = max(ans, imax);
        }
        return ans;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    let ans = nums[0], imax = nums[0], imin = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [imax, imin] = [imin, imax];
        }
        imax = Math.max(nums[i], imax * nums[i]);
        imin = Math.min(nums[i], imin * nums[i]);
        ans = Math.max(ans, imax);
    }
    return ans;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums: number[]): number {
    let ans = nums[0], imax = nums[0], imin = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [imax, imin] = [imin, imax];
        }
        imax = Math.max(nums[i], imax * nums[i]);
        imin = Math.min(nums[i], imin * nums[i]);
        ans = Math.max(ans, imax);
    }
    return ans;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

最大乘积子数组与最大子数组和（53 题）思路类似，但**必须同时维护最小乘积**以应对负数翻转。这是本题最关键的考点。
