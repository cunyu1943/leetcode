# [LCR 070. 有序数组中的单一元素](https://leetcode.cn/problems/skFtm2/)



## 一、题目描述

给定一个只包含整数的有序数组 `nums` ，每个元素都会出现两次，唯有一个数只会出现一次，请找出这个唯一的数字。

你设计的解决方案必须满足 `O(log n)` 时间复杂度和 `O(1)` 空间复杂度。



**示例 1：**

```
输入: nums = [1,1,2,3,3,4,4,8,8]
输出: 2
```

**示例 2：**

```
输入: nums = [3,3,7,7,10,11,11]
输出: 10
```

**提示：**

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`



## 二、解答方法

### 2.1 方法一：二分查找（基于配对性质）

1. **思路**

数组长度为奇数，单一元素位于某一侧。利用「配对下标」性质：在单一元素之前，每对 `(2k, 2k+1)` 元素相等；在其之后则错位。

- 取中点 `m`，若 `m` 为奇数则先 `m--` 使之落在偶数下标（配对左端）；
- 若 `nums[m] == nums[m+1]`，说明单一元素在右侧，`l = m + 2`；
- 否则单一元素在左侧（含 m），`r = m`。

时间 `O(log n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (m % 2 == 1) m--; // 落在配对左端
            if (nums[m] == nums[m + 1]) l = m + 2;
            else r = m;
        }
        return nums[l];
    }
}
```

```python [Python]
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            m = l + (r - l) // 2
            if m % 2 == 1:
                m -= 1
            if nums[m] == nums[m + 1]:
                l = m + 2
            else:
                r = m
        return nums[l]
```

```cpp [C++]
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (m % 2 == 1) m--;
            if (nums[m] == nums[m + 1]) l = m + 2;
            else r = m;
        }
        return nums[l];
    }
};
```

```go [Go]
func singleNonDuplicate(nums []int) int {
    l, r := 0, len(nums)-1
    for l < r {
        m := l + (r-l)/2
        if m%2 == 1 {
            m--
        }
        if nums[m] == nums[m+1] {
            l = m + 2
        } else {
            r = m
        }
    }
    return nums[l]
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        let m = l + ((r - l) >> 1);
        if (m % 2 === 1) m--;
        if (nums[m] === nums[m + 1]) l = m + 2;
        else r = m;
    }
    return nums[l];
};
```

```c [C]
int singleNonDuplicate(int* nums, int numsSize) {
    int l = 0, r = numsSize - 1;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (m % 2 == 1) m--;
        if (nums[m] == nums[m + 1]) l = m + 2;
        else r = m;
    }
    return nums[l];
}
```

```ts [TypeScript]
function singleNonDuplicate(nums: number[]): number {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        let m = l + ((r - l) >> 1);
        if (m % 2 === 1) m--;
        if (nums[m] === nums[m + 1]) l = m + 2;
        else r = m;
    }
    return nums[l];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(log n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：异或

1. **思路**

相同元素异或为 0，遍历一遍把所有元素异或，剩下的就是唯一出现一次的数。时间 `O(n)`，空间 `O(1)`，直观但达不到 `O(log n)` 要求（作对照）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int ans = 0;
        for (int x : nums) ans ^= x;
        return ans;
    }
}
```

```python [Python]
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        ans = 0
        for x in nums:
            ans ^= x
        return ans
```

```cpp [C++]
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int ans = 0;
        for (int x : nums) ans ^= x;
        return ans;
    }
};
```

```go [Go]
func singleNonDuplicate(nums []int) int {
    ans := 0
    for _, x := range nums {
        ans ^= x
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let ans = 0;
    for (const x of nums) ans ^= x;
    return ans;
};
```

```c [C]
int singleNonDuplicate(int* nums, int numsSize) {
    int ans = 0;
    for (int i = 0; i < numsSize; i++) ans ^= nums[i];
    return ans;
}
```

```ts [TypeScript]
function singleNonDuplicate(nums: number[]): number {
    let ans = 0;
    for (const x of nums) ans ^= x;
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 配对二分 | `O(log n)` | `O(1)` | 最优，推荐 |
| 异或 | `O(n)` | `O(1)` | 通用，但不满足 log n 要求 |

二分的关键是观察「成对出现的元素下标为偶奇相邻」，通过把中点校正到偶数下标比较配对是否成立，即可定位唯一元素所在侧。

