# [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)



## 一、题目描述

给定一个含有 `n` 个 **正整数** 的数组和一个正整数 `target` 。

找出该数组中满足其和 `≥ target` 的 **长度最小** 的 **连续子数组** `[numsl, numsl+1, ..., numsr-1, numsr]` ，并返回其长度**。** 如果不存在符合条件的子数组，返回 `0` 。

**示例 1：**

```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

**示例 2：**

```
输入：target = 4, nums = [1,4,4]
输出：1
```

**示例 3：**

```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

**提示：**

-   `1 <= target <= 10⁹`
-   `1 <= nums.length <= 10⁵`
-   `1 <= nums[i] <= 10⁵`

**进阶：** 如果你已经实现 `O(n)` 时间复杂度的解法，请尝试设计一个 `O(n log n)` 时间复杂度的解法。



## 二、解答方法

### 2.1 方法一：滑动窗口（双指针，最优）

1. **思路**

数组元素均为正数，保证窗口和随右移单调增、随左移单调减，可用滑动窗口：

1. `right` 右移累加 `sum`；
2. 当 `sum >= target` 时，更新最小长度，并不断右移 `left` 缩小窗口（同时减去 `nums[left]`）；
3. 遍历结束若未找到则返回 0。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0;
        int ans = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                ans = Math.min(ans, right - left + 1);
                sum -= nums[left++];
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```

```python [Python]
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        left = 0
        total = 0
        ans = float('inf')
        for right, num in enumerate(nums):
            total += num
            while total >= target:
                ans = min(ans, right - left + 1)
                total -= nums[left]
                left += 1
        return 0 if ans == float('inf') else ans
```

```go [Go]
func minSubArrayLen(target int, nums []int) int {
    left, sum := 0, 0
    ans := len(nums) + 1
    for right, num := range nums {
        sum += num
        for sum >= target {
            if right-left+1 < ans {
                ans = right - left + 1
            }
            sum -= nums[left]
            left++
        }
    }
    if ans == len(nums)+1 {
        return 0
    }
    return ans
}
```

```cpp [C++]
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, ans = nums.size() + 1;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                ans = min(ans, right - left + 1);
                sum -= nums[left++];
            }
        }
        return ans == nums.size() + 1 ? 0 : ans;
    }
};
```

```js [JavaScript]
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let left = 0, sum = 0;
    let ans = Infinity;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            ans = Math.min(ans, right - left + 1);
            sum -= nums[left++];
        }
    }
    return ans === Infinity ? 0 : ans;
};
```

```ts [TypeScript]
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0, sum = 0;
    let ans = Infinity;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            ans = Math.min(ans, right - left + 1);
            sum -= nums[left++];
        }
    }
    return ans === Infinity ? 0 : ans;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（每个元素最多进出窗口各一次）。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：前缀和 + 二分查找（O(n log n)）

1. **思路**

数组元素为正 ⇒ 前缀和数组 `pre` 单调递增。对每个 `i`，在 `pre` 中二分查找 `pre[j] >= pre[i] + target` 的最小 `j`，长度即 `j - i`。

2. **代码实现（Python）**

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        import bisect
        pre = [0]
        for num in nums:
            pre.append(pre[-1] + num)
        ans = float('inf')
        for i in range(len(nums)):
            j = bisect.bisect_left(pre, pre[i] + target)
            if j <= len(nums):
                ans = min(ans, j - i)
        return 0 if ans == float('inf') else ans
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间 | 空间 | 前提 |
| ---- | ---- | ---- | ---- |
| 滑动窗口 | `O(n)` | `O(1)` | 元素全为正（单调性） |
| 前缀和 + 二分 | `O(n log n)` | `O(n)` | 元素全为正 |

**滑动窗口** 是本题最优解，关键前提：数组元素 **全为正数**，窗口和具有单调性。若数组含负数，单调性破坏，须改用前缀和 + 单调队列等技巧。
