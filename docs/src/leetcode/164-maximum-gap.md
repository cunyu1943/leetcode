# [164. 最大间距](https://leetcode.cn/problems/maximum-gap/)



## 一、题目描述

给定一个无序的数组 `nums`，返回 **数组在排序之后** 相邻元素之间最大的差值 。如果数组元素个数小于 2，则返回 `0` 。

你必须实现一个时间复杂度为 `O(n)` 且使用额外空间 `O(n)` 的算法（即不能用普通排序）。



**示例 1：**

```
输入：nums = [3,6,9,1]
输出：3
解释：排序后的数组是 [1,3,6,9]，相邻元素之间的最大差值为 3（6-3=3）。
```

**示例 2：**

```
输入：nums = [10]
输出：0
```

**提示：**

-   `n == nums.length`
-   `1 <= n <= 10⁵`
-   `0 <= nums[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：基数排序（桶排序变体）

1. **思路**

要求 `O(n)` 且不能用比较排序（比较排序下界 `O(n log n)`）。可用**基数排序**（基于计数排序按位处理）或**桶排序**。这里用基数排序：从低位到高位，每轮用计数排序按当前位数字重排，共 10 个桶。

2. **代码实现（Python）**

```python
class Solution:
    def maximumGap(self, nums: List[int]) -> int:
        if len(nums) < 2:
            return 0
        max_val = max(nums)
        exp = 1
        n = len(nums)
        while max_val // exp > 0:
            buckets = [[] for _ in range(10)]
            for num in nums:
                buckets[(num // exp) % 10].append(num)
            nums = [num for bucket in buckets for num in bucket]
            exp *= 10
        ans = 0
        for i in range(1, n):
            ans = max(ans, nums[i] - nums[i - 1])
        return ans
```

### 2.2 方法二：桶排序（鸽笼原理）

1. **思路**

排序后最大间距一定不小于 `ceil((max-min)/(n-1))`，记为 `gap`。构造 `n-1` 个桶，每个桶区间宽度为 `gap`，把数放入桶中。最大间距必然出现在**相邻非空桶**之间（同一桶内间距 < gap）。只需记录每个桶的最大/最小值即可。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maximumGap(int[] nums) {
        if (nums.length < 2) return 0;
        int min = nums[0], max = nums[0];
        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
        if (max - min == 0) return 0;
        int n = nums.length;
        int bucketSize = Math.max(1, (max - min) / (n - 1));
        int bucketCount = (max - min) / bucketSize + 1;
        int[] bucketMin = new int[bucketCount];
        int[] bucketMax = new int[bucketCount];
        Arrays.fill(bucketMin, Integer.MAX_VALUE);
        Arrays.fill(bucketMax, Integer.MIN_VALUE);
        for (int num : nums) {
            int idx = (num - min) / bucketSize;
            bucketMin[idx] = Math.min(bucketMin[idx], num);
            bucketMax[idx] = Math.max(bucketMax[idx], num);
        }
        int ans = 0, prevMax = min;
        for (int i = 0; i < bucketCount; i++) {
            if (bucketMin[i] == Integer.MAX_VALUE) continue;
            ans = Math.max(ans, bucketMin[i] - prevMax);
            prevMax = bucketMax[i];
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maximumGap(self, nums: List[int]) -> int:
        if len(nums) < 2:
            return 0
        min_val, max_val = min(nums), max(nums)
        if max_val - min_val == 0:
            return 0
        n = len(nums)
        bucket_size = max(1, (max_val - min_val) // (n - 1))
        bucket_count = (max_val - min_val) // bucket_size + 1
        buckets = [[float('inf'), float('-inf')] for _ in range(bucket_count)]
        for num in nums:
            idx = (num - min_val) // bucket_size
            buckets[idx][0] = min(buckets[idx][0], num)
            buckets[idx][1] = max(buckets[idx][1], num)
        ans, prev_max = 0, min_val
        for bmin, bmax in buckets:
            if bmin == float('inf'):
                continue
            ans = max(ans, bmin - prev_max)
            prev_max = bmax
        return ans
```

```go [Go]
func maximumGap(nums []int) int {
    if len(nums) < 2 {
        return 0
    }
    minVal, maxVal := nums[0], nums[0]
    for _, num := range nums {
        if num < minVal {
            minVal = num
        }
        if num > maxVal {
            maxVal = num
        }
    }
    if maxVal-minVal == 0 {
        return 0
    }
    n := len(nums)
    bucketSize := max(1, (maxVal-minVal)/(n-1))
    bucketCount := (maxVal-minVal)/bucketSize + 1
    bucketMin := make([]int, bucketCount)
    bucketMax := make([]int, bucketCount)
    for i := range bucketMin {
        bucketMin[i] = 1 << 30
        bucketMax[i] = -1 << 30
    }
    for _, num := range nums {
        idx := (num - minVal) / bucketSize
        if num < bucketMin[idx] {
            bucketMin[idx] = num
        }
        if num > bucketMax[idx] {
            bucketMax[idx] = num
        }
    }
    ans, prevMax := 0, minVal
    for i := 0; i < bucketCount; i++ {
        if bucketMin[i] == 1<<30 {
            continue
        }
        if bucketMin[i]-prevMax > ans {
            ans = bucketMin[i] - prevMax
        }
        prevMax = bucketMax[i]
    }
    return ans
}

func max(a, b int) int { if a > b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        if (nums.size() < 2) return 0;
        int minVal = nums[0], maxVal = nums[0];
        for (int num : nums) {
            minVal = min(minVal, num);
            maxVal = max(maxVal, num);
        }
        if (maxVal - minVal == 0) return 0;
        int n = nums.size();
        int bucketSize = max(1, (maxVal - minVal) / (n - 1));
        int bucketCount = (maxVal - minVal) / bucketSize + 1;
        vector<int> bucketMin(bucketCount, INT_MAX);
        vector<int> bucketMax(bucketCount, INT_MIN);
        for (int num : nums) {
            int idx = (num - minVal) / bucketSize;
            bucketMin[idx] = min(bucketMin[idx], num);
            bucketMax[idx] = max(bucketMax[idx], num);
        }
        int ans = 0, prevMax = minVal;
        for (int i = 0; i < bucketCount; i++) {
            if (bucketMin[i] == INT_MAX) continue;
            ans = max(ans, bucketMin[i] - prevMax);
            prevMax = bucketMax[i];
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
var maximumGap = function (nums) {
    if (nums.length < 2) return 0;
    let minVal = nums[0], maxVal = nums[0];
    for (const num of nums) {
        minVal = Math.min(minVal, num);
        maxVal = Math.max(maxVal, num);
    }
    if (maxVal - minVal === 0) return 0;
    const n = nums.length;
    const bucketSize = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
    const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;
    const bucketMin = new Array(bucketCount).fill(Infinity);
    const bucketMax = new Array(bucketCount).fill(-Infinity);
    for (const num of nums) {
        const idx = Math.floor((num - minVal) / bucketSize);
        bucketMin[idx] = Math.min(bucketMin[idx], num);
        bucketMax[idx] = Math.max(bucketMax[idx], num);
    }
    let ans = 0, prevMax = minVal;
    for (let i = 0; i < bucketCount; i++) {
        if (bucketMin[i] === Infinity) continue;
        ans = Math.max(ans, bucketMin[i] - prevMax);
        prevMax = bucketMax[i];
    }
    return ans;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function maximumGap(nums: number[]): number {
    if (nums.length < 2) return 0;
    let minVal = nums[0], maxVal = nums[0];
    for (const num of nums) {
        minVal = Math.min(minVal, num);
        maxVal = Math.max(maxVal, num);
    }
    if (maxVal - minVal === 0) return 0;
    const n = nums.length;
    const bucketSize = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
    const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;
    const bucketMin = new Array(bucketCount).fill(Infinity);
    const bucketMax = new Array(bucketCount).fill(-Infinity);
    for (const num of nums) {
        const idx = Math.floor((num - minVal) / bucketSize);
        bucketMin[idx] = Math.min(bucketMin[idx], num);
        bucketMax[idx] = Math.max(bucketMax[idx], num);
    }
    let ans = 0, prevMax = minVal;
    for (let i = 0; i < bucketCount; i++) {
        if (bucketMin[i] === Infinity) continue;
        ans = Math.max(ans, bucketMin[i] - prevMax);
        prevMax = bucketMax[i];
    }
    return ans;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

本题是少数要求 `O(n)` 的排序类题目，**鸽笼原理 + 桶排序**是关键：最大间距必然跨桶，因此只需比较相邻非空桶边界，无需完整排序。
