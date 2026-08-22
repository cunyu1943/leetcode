# [1. 两数之和](https://leetcode.cn/problems/two-sum/)



## 一、题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

 

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

**提示：**

-   `2 <= nums.length <= 104`
-   `-109 <= nums[i] <= 109`
-   `-109 <= target <= 109`
-   **只会存在一个有效答案**

**进阶：**你可以想出一个时间复杂度小于 `O(n2)` 的算法吗？



## 二、解答方法

### 2.1 方法一：暴力遍历

**思路：**

最容易想到的方法：枚举数组中的每一个数 `nums[i]`，再寻找是否存在另一个数 `nums[j]`（`j != i`），使得 `nums[i] + nums[j] == target`。

具体做法是使用两层 `for` 循环：

- 外层循环固定第一个数 `nums[i]`；
- 内层循环从 `i + 1` 开始遍历剩余的数，逐个判断是否满足 `nums[i] + nums[j] == target`；
- 一旦找到，直接返回 `[i, j]`。

:::: code-group

```java [Java]
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}
```

```python [Python3]
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
```

```go [Go]
func twoSum(nums []int, target int) []int {
    n := len(nums)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if nums[i]+nums[j] == target {
                return []int{i, j}
            }
        }
    }
    return []int{}
}
```

```c [C]
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* res = (int*)malloc(sizeof(int) * 2);
                res[0] = i;
                res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
};
```

```ts [TypeScript]
function twoSum(nums: number[], target: number): number[] {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}
```

::::

**复杂度分析：**

- **时间复杂度：`O(n²)`**，其中 `n` 是数组长度。最坏情况下需要遍历所有数对，两层循环共执行 `n * (n - 1) / 2` 次比较。
- **空间复杂度：`O(1)`**，只使用了常数个额外变量。

### 2.2 方法二：哈希表

**思路：**

暴力遍历之所以慢，是因为查找 `target - nums[i]` 需要遍历整个数组，而哈希表（对象 / Map）可以在 `O(1)` 时间内完成查找。

我们可以在遍历数组的同时，用哈希表记录「值 -> 下标」的映射：

- 对于当前元素 `nums[i]`，先检查 `target - nums[i]` 是否已存在于哈希表中；
- 如果存在，说明找到了两个数，直接返回 `[map.get(target - nums[i]), i]`；
- 如果不存在，将当前元素 `nums[i]` 及其下标 `i` 存入哈希表，继续遍历下一个元素。

由于题目保证「只会存在一个有效答案」，且我们边遍历边存表，可以避免使用同一个元素两次。

:::: code-group

```java [Java]
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) {
                return new int[]{map.get(diff), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}
```

```python [Python]
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        mp = {}
        for i, num in enumerate(nums):
            if target - num in mp:
                return [mp[target - num], i]
            mp[num] = i
        return []
```

```go [Go]
func twoSum(nums []int, target int) []int {
    mp := make(map[int]int)
    for i, num := range nums {
        if j, ok := mp[target-num]; ok {
            return []int{j, i}
        }
        mp[num] = i
    }
    return []int{}
}
```

```c [C]
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // 简单哈希：开放寻址，表大小为 2 * numsSize
    int cap = numsSize * 2;
    int* keys = (int*)malloc(sizeof(int) * cap);
    int* vals = (int*)malloc(sizeof(int) * cap);
    for (int k = 0; k < cap; k++) keys[k] = -999999;

    int hash(int x) { return (x % cap + cap) % cap; }

    for (int i = 0; i < numsSize; i++) {
        int diff = target - nums[i];
        int h = hash(diff);
        while (keys[h] != -999999) {
            if (keys[h] == diff) {
                int* res = (int*)malloc(sizeof(int) * 2);
                res[0] = vals[h];
                res[1] = i;
                *returnSize = 2;
                free(keys);
                free(vals);
                return res;
            }
            h = (h + 1) % cap;
        }
        h = hash(nums[i]);
        while (keys[h] != -999999) h = (h + 1) % cap;
        keys[h] = nums[i];
        vals[h] = i;
    }
    *returnSize = 0;
    free(keys);
    free(vals);
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (mp.count(diff)) {
                return {mp[diff], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```

```ts [TypeScript]
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff) as number, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```

::::

**复杂度分析：**

- **时间复杂度：`O(n)`**，其中 `n` 是数组长度。只需要遍历一次数组，哈希表的插入和查找操作均摊时间复杂度为 `O(1)`。
- **空间复杂度：`O(n)`**，哈希表中最多存储 `n` 个元素，用于记录元素值与下标的对应关系。
