# [169. 多数元素](https://leetcode.cn/problems/majority-element/)



## 一、题目描述

给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 **大于** `⌊ n/2 ⌋` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。



**示例 1：**

```
输入：nums = [3,2,3]
输出：3
```

**示例 2：**

```
输入：nums = [2,2,1,1,1,2,2]
输出：2
```

**提示：**

-   `n == nums.length`
-   `1 <= n <= 5 * 10⁴`
-   `-10⁹ <= nums[i] <= 10⁹`



**进阶：** 尝试设计时间复杂度为 `O(n)`、空间复杂度为 `O(1)` 的算法解决此问题。



## 二、解答方法

### 2.1 方法一：哈希表计数

1. **思路**

用哈希表统计每个元素出现次数，超过 `n/2` 即为多数元素。

2. **代码实现（Python）**

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        from collections import Counter
        n = len(nums)
        for num, cnt in Counter(nums).items():
            if cnt > n // 2:
                return num
```

### 2.2 方法二：排序

1. **思路**

排序后，多数元素因出现 > n/2 次，必然占据下标 `n/2` 的位置。

2. **代码实现（Java）**

```java
class Solution {
    public int majorityElement(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }
}
```

### 2.3 方法三：摩尔投票法（Boyer-Moore，O(1) 空间）

1. **思路**

核心思想：不同元素两两抵消，多数元素因数量过半，最终一定能「存活」。维护候选 `candidate` 和计数 `count`：遇到相同元素 `count++`，不同则 `count--`；`count == 0` 时更换候选。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}
```

```python [Python]
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate = nums[0]
        count = 0
        for num in nums:
            if count == 0:
                candidate = num
            count += 1 if num == candidate else -1
        return candidate
```

```go [Go]
func majorityElement(nums []int) int {
    candidate, count := nums[0], 0
    for _, num := range nums {
        if count == 0 {
            candidate = num
        }
        if num == candidate {
            count++
        } else {
            count--
        }
    }
    return candidate
}
```

```cpp [C++]
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let candidate = nums[0], count = 0;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums: number[]): number {
    let candidate = nums[0], count = 0;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
}
```

::::::

3. **复杂度分析**

- **哈希表**：时间 `O(n)`，空间 `O(n)`。
- **排序**：时间 `O(n log n)`，空间 `O(1)`。
- **摩尔投票**：时间 `O(n)`，空间 `O(1)`，满足进阶。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 哈希表 | `O(n)` | `O(n)` | 直观 |
| 排序 | `O(n log n)` | `O(1)` | 取中位 |
| 摩尔投票 | `O(n)` | `O(1)` | 最优，推荐 |

摩尔投票法利用「多数元素数量过半必然存活」的性质，是本题最优解，面试常考。
