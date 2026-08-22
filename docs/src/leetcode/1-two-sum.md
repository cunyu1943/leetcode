# [1. 两数之和](https://leetcode.cn/problems/two-sum/)



## 一、题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** `target` 的那**两个**整数，并返回它们的数组下标。

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

**进阶：**你可以想出一个时间复杂度小于 `O(n²)` 的算法吗？



## 二、解答方法

### 2.1 方法一：暴力遍历

1. **思路**

最容易想到的方法：枚举数组中的每一个数 `nums[i]`，再寻找是否存在另一个数 `nums[j]`（`j != i`），使得 `nums[i] + nums[j] == target`。

具体做法是使用两层 `for` 循环：

- 外层循环固定第一个数 `nums[i]`；
- 内层循环从 `i + 1` 开始遍历剩余的数，逐个判断是否满足 `nums[i] + nums[j] == target`；
- 一旦找到，直接返回 `[i, j]`。

2. **代码实现**

::::: code-group

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

```python [Python]
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

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，其中 `n` 是数组长度。最坏情况下需要遍历所有数对，两层循环共执行 `n * (n - 1) / 2` 次比较。
- **空间复杂度**：`O(1)`，只使用了常数个额外变量。

### 2.2 方法二：哈希表

1. **思路**

暴力遍历之所以慢，是因为查找 `target - nums[i]` 需要遍历整个数组，而哈希表（对象 / Map）可以在 `O(1)` 时间内完成查找。

我们可以在遍历数组的同时，用哈希表记录「值 -> 下标」的映射：

- 对于当前元素 `nums[i]`，先检查 `target - nums[i]` 是否已存在于哈希表中；
- 如果存在，说明找到了两个数，直接返回 `[map.get(target - nums[i]), i]`；
- 如果不存在，将当前元素 `nums[i]` 及其下标 `i` 存入哈希表，继续遍历下一个元素。

由于题目保证「只会存在一个有效答案」，且我们边遍历边存表，可以避免使用同一个元素两次。

2. **代码实现**

::::: code-group

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

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`**，其中 `n` 是数组长度。只需要遍历一次数组，哈希表的插入和查找操作均摊时间复杂度为 `O(1)`。
- **空间复杂度**：`O(n)`**，哈希表中最多存储 `n` 个元素，用于记录元素值与下标的对应关系。

### 2.3 方法三：排序 + 双指针

1. **思路**

如果不想使用额外的哈希表空间，也可以先将数组排序，然后用双指针从两端向中间逼近。但题目要求返回的是**原始数组的下标**，而排序会打乱下标，因此需要提前把「值 -> 原始下标」保存下来（注意数组中可能存在重复元素，所以下标要用列表存储）。

- 先构造一个包含 `[值, 原始下标]` 的数组，再按值升序排序；
- 用两个指针 `left`、`right` 分别指向首尾；
- 若 `nums[left] + nums[right] == target`，直接返回二者对应的原始下标；
- 若和小于 `target`，`left` 右移；若和大于 `target`，`right` 左移；
- 由于输入保证只有一个有效答案，循环一定能找到。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        Integer[][] arr = new Integer[n][2];
        for (int i = 0; i < n; i++) {
            arr[i][0] = nums[i];
            arr[i][1] = i;
        }
        Arrays.sort(arr, (a, b) -> a[0] - b[0]);
        int left = 0, right = n - 1;
        while (left < right) {
            int sum = arr[left][0] + arr[right][0];
            if (sum == target) {
                return new int[]{arr[left][1], arr[right][1]};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }
}
```

```python [Python]
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        arr = sorted((num, i) for i, num in enumerate(nums))
        left, right = 0, len(arr) - 1
        while left < right:
            s = arr[left][0] + arr[right][0]
            if s == target:
                return [arr[left][1], arr[right][1]]
            elif s < target:
                left += 1
            else:
                right -= 1
        return []
```

```go [Go]
func twoSum(nums []int, target int) []int {
    n := len(nums)
    type pair struct{ val, idx int }
    arr := make([]pair, n)
    for i, num := range nums {
        arr[i] = pair{num, i}
    }
    sort.Slice(arr, func(i, j int) bool { return arr[i].val < arr[j].val })
    left, right := 0, n-1
    for left < right {
        s := arr[left].val + arr[right].val
        if s == target {
            return []int{arr[left].idx, arr[right].idx}
        } else if s < target {
            left++
        } else {
            right--
        }
    }
    return []int{}
}
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return ((int(*)[2])a)[0] - ((int(*)[2])b)[0];
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int (*arr)[2] = malloc(sizeof(int[2]) * numsSize);
    for (int i = 0; i < numsSize; i++) {
        arr[i][0] = nums[i];
        arr[i][1] = i;
    }
    qsort(arr, numsSize, sizeof(int[2]), cmp);
    int left = 0, right = numsSize - 1;
    while (left < right) {
        int sum = arr[left][0] + arr[right][0];
        if (sum == target) {
            int* res = malloc(sizeof(int) * 2);
            res[0] = arr[left][1];
            res[1] = arr[right][1];
            *returnSize = 2;
            free(arr);
            return res;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    *returnSize = 0;
    free(arr);
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<pair<int, int>> arr;
        for (int i = 0; i < n; i++) {
            arr.push_back({nums[i], i});
        }
        sort(arr.begin(), arr.end());
        int left = 0, right = n - 1;
        while (left < right) {
            int sum = arr[left].first + arr[right].first;
            if (sum == target) {
                return {arr[left].second, arr[right].second};
            } else if (sum < target) {
                left++;
            } else {
                right--;
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
    const arr = nums.map((num, i) => [num, i]).sort((a, b) => a[0] - b[0]);
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left][0] + arr[right][0];
        if (sum === target) {
            return [arr[left][1], arr[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
};
```

```ts [TypeScript]
function twoSum(nums: number[], target: number): number[] {
    const arr = nums
        .map((num, i) => [num, i] as [number, number])
        .sort((a, b) => a[0] - b[0]);
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left][0] + arr[right][0];
        if (sum === target) {
            return [arr[left][1], arr[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`**，瓶颈在排序，双指针遍历为 `O(n)`。
- **空间复杂度**：`O(n)`**，需要额外数组保存「值 + 原始下标」以便排序后还原下标。

## 三、总结

三种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 暴力遍历 | `O(n²)` | `O(1)` | 常规实现 |
| 哈希表 | `O(n)` | `O(n)` | 查找/聚合高效 |
| 排序 + 双指针 | `O(n log n)` | `O(n)` | 空间紧凑，常为常数级 |

