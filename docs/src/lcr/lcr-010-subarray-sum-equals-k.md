# [LCR 010. 和为 K 的子数组](https://leetcode.cn/problems/QTMn0O/)



## 一、题目描述

给定一个整数数组 `nums` 和一个整数 `k` ，请统计并返回 **该数组中和为 `k` 的子数组的个数** 。



**示例 1：**

```
输入：nums = [1,1,1], k = 2
输出：2
```

**示例 2：**

```
输入：nums = [1,2,3], k = 3
输出：2
```

**提示：**

- `1 <= nums.length <= 2 * 10⁴`
- `-1000 <= nums[i] <= 1000`
- `-10⁷ <= k <= 10⁷`



## 二、解答方法

### 2.1 方法一：前缀和 + 哈希表

1. **思路**

设 `pre[i]` 为前 `i` 个元素之和，则子数组 `[j, i-1]` 的和为 `pre[i] - pre[j]`。要使其等于 `k`，即 `pre[j] == pre[i] - k`。

用哈希表记录「每个前缀和出现的次数」，从左到右遍历，每到一个位置 `i`：

- 当前前缀和为 `sum`；
- 查表看 `sum - k` 出现过几次，累加到答案；
- 把 `sum` 的出现次数加 1。

由于存在负数，不能用滑动窗口，必须用哈希。时间复杂度 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        cnt.put(0, 1);
        int sum = 0, ans = 0;
        for (int num : nums) {
            sum += num;
            ans += cnt.getOrDefault(sum - k, 0);
            cnt.put(sum, cnt.getOrDefault(sum, 0) + 1);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        from collections import defaultdict
        cnt = defaultdict(int)
        cnt[0] = 1
        s = ans = 0
        for x in nums:
            s += x
            ans += cnt[s - k]
            cnt[s] += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> cnt;
        cnt[0] = 1;
        int sum = 0, ans = 0;
        for (int x : nums) {
            sum += x;
            ans += cnt[sum - k];
            cnt[sum]++;
        }
        return ans;
    }
};
```

```go [Go]
func subarraySum(nums []int, k int) int {
    cnt := map[int]int{0: 1}
    s, ans := 0, 0
    for _, x := range nums {
        s += x
        ans += cnt[s-k]
        cnt[s]++
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const cnt = new Map();
    cnt.set(0, 1);
    let sum = 0, ans = 0;
    for (const x of nums) {
        sum += x;
        ans += cnt.get(sum - k) || 0;
        cnt.set(sum, (cnt.get(sum) || 0) + 1);
    }
    return ans;
};
```

```c [C]
// C 语言无内置哈希表，这里用「排序 + 二分」思路较繁琐；下方以线性扫描的
// 朴素前缀和法演示（O(n^2)）。若需 O(n)，可引入第三方哈希库或手动实现。
int subarraySum(int* nums, int numsSize, int k) {
    int ans = 0;
    for (int i = 0; i < numsSize; i++) {
        int sum = 0;
        for (int j = i; j < numsSize; j++) {
            sum += nums[j];
            if (sum == k) ans++;
        }
    }
    return ans;
}
```

```ts [TypeScript]
function subarraySum(nums: number[], k: number): number {
    const cnt: Map<number, number> = new Map();
    cnt.set(0, 1);
    let sum = 0, ans = 0;
    for (const x of nums) {
        sum += x;
        ans += cnt.get(sum - k) || 0;
        cnt.set(sum, (cnt.get(sum) || 0) + 1);
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，哈希表操作均摊 `O(1)`（C 朴素版为 `O(n²)`）。
- **空间复杂度**：`O(n)`，哈希表存储前缀和。

### 2.2 方法二：枚举所有子数组（朴素前缀和）

1. **思路**

直接计算所有 `O(n²)` 个子数组的和并统计等于 `k` 的个数。实现简单但效率较低，适合数据规模很小或作为对照。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int subarraySum(int[] nums, int k) {
        int n = nums.length, ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                if (sum == k) ans++;
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        ans = 0
        for i in range(n):
            s = 0
            for j in range(i, n):
                s += nums[j]
                if s == k:
                    ans += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                if (sum == k) ans++;
            }
        }
        return ans;
    }
};
```

```go [Go]
func subarraySum(nums []int, k int) int {
    n := len(nums)
    ans := 0
    for i := 0; i < n; i++ {
        s := 0
        for j := i; j < n; j++ {
            s += nums[j]
            if s == k {
                ans++
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const n = nums.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += nums[j];
            if (sum === k) ans++;
        }
    }
    return ans;
};
```

```c [C]
int subarraySum(int* nums, int numsSize, int k) {
    int ans = 0;
    for (int i = 0; i < numsSize; i++) {
        int sum = 0;
        for (int j = i; j < numsSize; j++) {
            sum += nums[j];
            if (sum == k) ans++;
        }
    }
    return ans;
}
```

```ts [TypeScript]
function subarraySum(nums: number[], k: number): number {
    const n = nums.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += nums[j];
            if (sum === k) ans++;
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前缀和 + 哈希 | `O(n)` | `O(n)` | 最优，推荐 |
| 朴素枚举 | `O(n²)` | `O(1)` | 简单但慢 |

「前缀和 + 哈希表」是处理「和为 K 的子数组」的标准套路，把 `O(n²)` 降为 `O(n)`。

