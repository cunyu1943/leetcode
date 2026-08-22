# [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)



## 一、题目描述

给你一个未排序的整数数组 `nums`，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 `O(n)` 并且只使用常数级别额外空间的解决方案。



**示例 1：**

```
输入：nums = [1,2,0]
输出：3
```

**示例 2：**

```
输入：nums = [3,4,-1,1]
输出：2
```

**示例 3：**

```
输入：nums = [7,8,9,11,12]
输出：1
```

**提示：**

-   `1 <= nums.length <= 10^5`
-   `-2^31 <= nums[i] <= 2^31 - 1`



## 二、解答方法

### 2.1 方法一：原地哈希（置换到正确位置）

1. **思路**

缺失的正数必然在 `[1, n+1]` 之间（若 `1..n` 都在，则答案是 `n+1`）。利用原数组本身作为哈希表：

-   遍历数组，若 `1 <= nums[i] <= n` 且 `nums[i] != nums[nums[i] - 1]`，就把 `nums[i]` 交换到它「应在的位置」`nums[i] - 1`；
-   第一遍把能归位的正数尽量归位；
-   第二遍找第一个 `nums[i] != i + 1` 的位置，`i + 1` 即答案；若全部归位则返回 `n + 1`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int idx = nums[i] - 1;
                int tmp = nums[idx];
                nums[idx] = nums[i];
                nums[i] = tmp;
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
}
```

```python [Python]
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                j = nums[i] - 1
                nums[i], nums[j] = nums[j], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1
```

```go [Go]
func firstMissingPositive(nums []int) int {
    n := len(nums)
    for i := 0; i < n; i++ {
        for nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i] {
            j := nums[i] - 1
            nums[i], nums[j] = nums[j], nums[i]
        }
    }
    for i := 0; i < n; i++ {
        if nums[i] != i+1 {
            return i + 1
        }
    }
    return n + 1
}
```

```c [C]
int firstMissingPositive(int* nums, int numsSize) {
    int n = numsSize;
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            int j = nums[i] - 1;
            int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) return i + 1;
    }
    return n + 1;
}
```

```cpp [C++]
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const j = nums[i] - 1;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) return i + 1;
    }
    return n + 1;
};
```

```ts [TypeScript]
function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const j = nums[i] - 1;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) return i + 1;
    }
    return n + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素最多被交换到正确位置一次。
- **空间复杂度**：`O(1)`，原地交换，只用常数变量。

### 2.2 方法二：标记法（正负号标记）

1. **思路**

把 `1..n` 范围内出现的数，通过「将位置 `x-1` 的值置为负」来标记 `x` 出现过（不支持原地改值场景可用）。对大于 `n` 或小于等于 0 的数忽略。最后第一个正数位置 `+1` 即答案。实现需先处理 `0/负数` 边界，略繁琐。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if (nums[i] <= 0 || nums[i] > n) nums[i] = n + 1;
        }
        for (int i = 0; i < n; i++) {
            int x = Math.abs(nums[i]);
            if (x <= n) nums[x - 1] = -Math.abs(nums[x - 1]);
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) return i + 1;
        }
        return n + 1;
    }
}
```

```python [Python]
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            if nums[i] <= 0 or nums[i] > n:
                nums[i] = n + 1
        for i in range(n):
            x = abs(nums[i])
            if x <= n:
                nums[x - 1] = -abs(nums[x - 1])
        for i in range(n):
            if nums[i] > 0:
                return i + 1
        return n + 1
```

```go [Go]
func firstMissingPositive(nums []int) int {
    n := len(nums)
    for i := range nums {
        if nums[i] <= 0 || nums[i] > n {
            nums[i] = n + 1
        }
    }
    for i := range nums {
        x := abs(nums[i])
        if x <= n {
            if nums[x-1] > 0 {
                nums[x-1] = -nums[x-1]
            }
        }
    }
    for i := range nums {
        if nums[i] > 0 {
            return i + 1
        }
    }
    return n + 1
}
```

```c [C]
int firstMissingPositive(int* nums, int numsSize) {
    int n = numsSize;
    for (int i = 0; i < n; i++) {
        if (nums[i] <= 0 || nums[i] > n) nums[i] = n + 1;
    }
    for (int i = 0; i < n; i++) {
        int x = abs(nums[i]);
        if (x <= n) nums[x - 1] = -abs(nums[x - 1]);
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] > 0) return i + 1;
    }
    return n + 1;
}
```

```cpp [C++]
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++)
            if (nums[i] <= 0 || nums[i] > n) nums[i] = n + 1;
        for (int i = 0; i < n; i++) {
            int x = abs(nums[i]);
            if (x <= n) nums[x - 1] = -abs(nums[x - 1]);
        }
        for (int i = 0; i < n; i++)
            if (nums[i] > 0) return i + 1;
        return n + 1;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0 || nums[i] > n) nums[i] = n + 1;
    }
    for (let i = 0; i < n; i++) {
        const x = Math.abs(nums[i]);
        if (x <= n) nums[x - 1] = -Math.abs(nums[x - 1]);
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) return i + 1;
    }
    return n + 1;
};
```

```ts [TypeScript]
function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0 || nums[i] > n) nums[i] = n + 1;
    }
    for (let i = 0; i < n; i++) {
        const x = Math.abs(nums[i]);
        if (x <= n) nums[x - 1] = -Math.abs(nums[x - 1]);
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) return i + 1;
    }
    return n + 1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，三遍线性扫描。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 原地哈希（置换到正确位置） | `O(n)` | `O(1)` | 查找/聚合高效 |
| 标记法（正负号标记） | `O(n)` | `O(1)` | 常规实现 |

