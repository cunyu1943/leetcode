# [259. 较小的三数之和](https://leetcode.cn/problems/3sum-smaller/) [🔒 会员题]



## 一、题目描述

给定一个长度为 `n` 的整数数组和一个目标值 `target` ，请你找出满足条件 `i < j < k` 且 `nums[i] + nums[j] + nums[k] < target` 的所有三元组 `i`、`j`、`k` 的 **数目** 。

**示例 1：**

```
输入：nums = [-2,0,1,3], target = 2
输出：2
解释：满足条件的三元组有两个：
     (-2, 0, 1)  →  -1 < 2
     (-2, 0, 3)  →   1 < 2
```

**示例 2：**

```
输入：nums = [], target = 0
输出：0
```

**示例 3：**

```
输入：nums = [0], target = 0
输出：0
```

**提示：**

-   `n == nums.length`
-   `0 <= n <= 3500`
-   `-100 <= nums[i] <= 100`
-   `-100 <= target <= 100`



## 二、解答方法

### 2.1 方法一：排序 + 双指针

1. **思路**

先排序。枚举第一个数 `nums[i]`（`i` 从 0 到 n-3），在内层用双指针 `left = i+1`、`right = n-1` 统计：

- 若 `nums[i] + nums[left] + nums[right] < target`，则对于当前的 `left`，**`left+1 ~ right` 与它配成的三元组都满足条件**（因为数组有序，右指针左移只会让和更小）。于是 `count += right - left`，然后 `left++`；
- 否则和太大，需要减小：`right--`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int threeSumSmaller(int[] nums, int target) {
        Arrays.sort(nums);
        int count = 0;
        for (int i = 0; i < nums.length - 2; i++) {
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum < target) {
                    // left 固定时，[left+1, right] 都满足，共 right-left 个
                    count += right - left;
                    left++;
                } else {
                    right--;
                }
            }
        }
        return count;
    }
}
```

```python [Python]
class Solution:
    def threeSumSmaller(self, nums: List[int], target: int) -> int:
        nums.sort()
        count = 0
        for i in range(len(nums) - 2):
            left, right = i + 1, len(nums) - 1
            while left < right:
                if nums[i] + nums[left] + nums[right] < target:
                    count += right - left      # 批量统计
                    left += 1
                else:
                    right -= 1
        return count
```

```go [Go]
func threeSumSmaller(nums []int, target int) int {
    sort.Ints(nums)
    count := 0
    for i := 0; i < len(nums)-2; i++ {
        left, right := i+1, len(nums)-1
        for left < right {
            if nums[i]+nums[left]+nums[right] < target {
                count += right - left
                left++
            } else {
                right--
            }
        }
    }
    return count
}
```

```cpp [C++]
class Solution {
public:
    int threeSumSmaller(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int count = 0;
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            int left = i + 1, right = nums.size() - 1;
            while (left < right) {
                if (nums[i] + nums[left] + nums[right] < target) {
                    count += right - left;
                    left++;
                } else {
                    right--;
                }
            }
        }
        return count;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumSmaller = function (nums, target) {
    nums.sort((a, b) => a - b);
    let count = 0;
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] < target) {
                count += right - left;
                left++;
            } else {
                right--;
            }
        }
    }
    return count;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumSmaller(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    let count = 0;
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] < target) {
                count += right - left;
                left++;
            } else {
                right--;
            }
        }
    }
    return count;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`（排序 `O(n log n)` + 双重扫描 `O(n²)`）。
- **空间复杂度**：`O(1)`（原地排序）。

### 2.2 方法二：二分查找（优化内层）

1. **思路**

同样先排序，枚举 `i` 和 `j`（`i < j`），然后在 `[j+1, n-1]` 范围内 **二分查找** 最大的 `k` 使得 `nums[i] + nums[j] + nums[k] < target`。

复杂度仍是 `O(n² log n)`，比双指针慢，但思路可迁移到更一般的问题。

2. **代码实现（Python）**

```python
class Solution:
    def threeSumSmaller(self, nums: List[int], target: int) -> int:
        import bisect
        nums.sort()
        count = 0
        n = len(nums)
        for i in range(n - 2):
            for j in range(i + 1, n - 1):
                remain = target - nums[i] - nums[j]
                # 找第一个 >= remain 的位置，其左侧全部满足
                k = bisect.bisect_left(nums, remain, j + 1)
                count += k - (j + 1)
        return count
```

3. **复杂度分析**

- **时间复杂度**：`O(n² log n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间 | 特点 |
| ---- | ---- | ---- |
| 排序 + 双指针 | `O(n²)` | 最优，推荐 |
| 排序 + 二分 | `O(n² log n)` | 思路通用 |

关键技巧：**批量统计**。当 `nums[i] + nums[left] + nums[right] < target` 时，由于数组已排序，把 `right` 从当前位置一直左移到 `left+1`，和只会更小，都满足条件 —— 因此一次性 `count += right - left`，而不是逐个计数。这正是能把内层从 `O(n)` 优化掉的关键。

对比：
- `15. 三数之和`：找 **等于** target 的所有三元组，需去重，双指针相向移动；
- `16. 最接近的三数之和`：找 **最接近** target 的和，记录最小差值；
- `259. 较小的三数之和`：统计 **小于** target 的 **个数**，利用有序性批量累加。
