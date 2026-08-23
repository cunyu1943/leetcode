# [LCR 008. 长度最小的子数组](https://leetcode.cn/problems/1HmOlS/)



## 一、题目描述

给定一个含有 `n` 个正整数的数组和一个正整数 `target` 。

找出该数组中满足其和 `≥ target` 的长度最小的 **连续子数组** `[nums[l], nums[l+1], ..., nums[r]]`，并返回其长度。如果不存在符合条件的子数组，返回 `0` 。



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

- `1 <= target <= 10⁹`
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`



## 二、解答方法

### 2.1 方法一：滑动窗口（双指针）

1. **思路**

因为数组元素均为正数，当窗口内和 `≥ target` 时，再向右扩展只会使和更大、长度更长，所以此时应收缩左边界以寻找更短的子数组。

- 用 `l`、`r` 维护窗口，`sum` 为窗口和；
- `r` 右移扩张，`sum` 累加；
- 当 `sum ≥ target` 时，更新最小长度，并 `l` 右移收缩、减去 `nums[l]`，直到 `sum < target`。

时间复杂度 `O(n)`，每个元素最多进、出窗口各一次。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length, l = 0, sum = 0, ans = Integer.MAX_VALUE;
        for (int r = 0; r < n; r++) {
            sum += nums[r];
            while (sum >= target) {
                ans = Math.min(ans, r - l + 1);
                sum -= nums[l++];
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```

```python [Python]
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        l = s = 0
        ans = float('inf')
        for r in range(n):
            s += nums[r]
            while s >= target:
                ans = min(ans, r - l + 1)
                s -= nums[l]
                l += 1
        return 0 if ans == float('inf') else ans
```

```cpp [C++]
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size(), l = 0, sum = 0, ans = INT_MAX;
        for (int r = 0; r < n; r++) {
            sum += nums[r];
            while (sum >= target) {
                ans = min(ans, r - l + 1);
                sum -= nums[l++];
            }
        }
        return ans == INT_MAX ? 0 : ans;
    }
};
```

```go [Go]
func minSubArrayLen(target int, nums []int) int {
    n := len(nums)
    l, s, ans := 0, 0, n+1
    for r := 0; r < n; r++ {
        s += nums[r]
        for s >= target {
            if r-l+1 < ans {
                ans = r - l + 1
            }
            s -= nums[l]
            l++
        }
    }
    if ans == n+1 {
        return 0
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const n = nums.length;
    let l = 0, sum = 0, ans = Infinity;
    for (let r = 0; r < n; r++) {
        sum += nums[r];
        while (sum >= target) {
            ans = Math.min(ans, r - l + 1);
            sum -= nums[l++];
        }
    }
    return ans === Infinity ? 0 : ans;
};
```

```c [C]
int minSubArrayLen(int target, int* nums, int numsSize) {
    int l = 0, sum = 0, ans = numsSize + 1;
    for (int r = 0; r < numsSize; r++) {
        sum += nums[r];
        while (sum >= target) {
            if (r - l + 1 < ans) ans = r - l + 1;
            sum -= nums[l++];
        }
    }
    return ans == numsSize + 1 ? 0 : ans;
}
```

```ts [TypeScript]
function minSubArrayLen(target: number, nums: number[]): number {
    const n = nums.length;
    let l = 0, sum = 0, ans = Infinity;
    for (let r = 0; r < n; r++) {
        sum += nums[r];
        while (sum >= target) {
            ans = Math.min(ans, r - l + 1);
            sum -= nums[l++];
        }
    }
    return ans === Infinity ? 0 : ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，双指针各遍历一次。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：前缀和 + 二分查找

1. **思路**

先构造前缀和数组 `pre`，`pre[i]` 表示前 `i` 个元素之和。对每个起点 `i`，要在 `pre` 中二分查找最小的 `j` 使得 `pre[j] - pre[i] ≥ target`，即 `pre[j] ≥ pre[i] + target`。复杂度 `O(n log n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int[] pre = new int[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
        int ans = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            int want = pre[i] + target;
            int l = i + 1, r = n;
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (pre[m] >= want) {
                    ans = Math.min(ans, m - i);
                    r = m - 1;
                } else l = m + 1;
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```

```python [Python]
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        import bisect
        n = len(nums)
        pre = [0] * (n + 1)
        for i in range(n):
            pre[i + 1] = pre[i] + nums[i]
        ans = float('inf')
        for i in range(n):
            j = bisect.bisect_left(pre, pre[i] + target)
            if j <= n:
                ans = min(ans, j - i)
        return 0 if ans == float('inf') else ans
```

```cpp [C++]
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        vector<int> pre(n + 1, 0);
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
        int ans = INT_MAX;
        for (int i = 0; i < n; i++) {
            int want = pre[i] + target, l = i + 1, r = n;
            while (l <= r) {
                int m = l + (r - l) / 2;
                if (pre[m] >= want) { ans = min(ans, m - i); r = m - 1; }
                else l = m + 1;
            }
        }
        return ans == INT_MAX ? 0 : ans;
    }
};
```

```go [Go]
func minSubArrayLen(target int, nums []int) int {
    n := len(nums)
    pre := make([]int, n+1)
    for i := 0; i < n; i++ {
        pre[i+1] = pre[i] + nums[i]
    }
    ans := n + 1
    for i := 0; i < n; i++ {
        want := pre[i] + target
        l, r := i+1, n
        for l <= r {
            m := l + (r-l)/2
            if pre[m] >= want {
                if m-i < ans {
                    ans = m - i
                }
                r = m - 1
            } else {
                l = m + 1
            }
        }
    }
    if ans == n+1 {
        return 0
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const n = nums.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
        const want = pre[i] + target;
        let l = i + 1, r = n;
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (pre[m] >= want) { ans = Math.min(ans, m - i); r = m - 1; }
            else l = m + 1;
        }
    }
    return ans === Infinity ? 0 : ans;
};
```

```c [C]
int minSubArrayLen(int target, int* nums, int numsSize) {
    int* pre = (int*)calloc(numsSize + 1, sizeof(int));
    for (int i = 0; i < numsSize; i++) pre[i + 1] = pre[i] + nums[i];
    int ans = numsSize + 1;
    for (int i = 0; i < numsSize; i++) {
        int want = pre[i] + target, l = i + 1, r = numsSize;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (pre[m] >= want) { if (m - i < ans) ans = m - i; r = m - 1; }
            else l = m + 1;
        }
    }
    free(pre);
    return ans == numsSize + 1 ? 0 : ans;
}
```

```ts [TypeScript]
function minSubArrayLen(target: number, nums: number[]): number {
    const n = nums.length;
    const pre: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
        const want = pre[i] + target;
        let l = i + 1, r = n;
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (pre[m] >= want) { ans = Math.min(ans, m - i); r = m - 1; }
            else l = m + 1;
        }
    }
    return ans === Infinity ? 0 : ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`。
- **空间复杂度**：`O(n)`，前缀和数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 滑动窗口 | `O(n)` | `O(1)` | 最优，推荐 |
| 前缀和 + 二分 | `O(n log n)` | `O(n)` | 思路直观 |

利用正数数组「和随窗口扩张单调递增」的特性，滑动窗口在 `O(n)` 内即可找到最短满足条件的子数组。

