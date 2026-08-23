# [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)



## 一、题目描述

给你一个 **非空** 整数数组 `nums`，除了某个元素只出现一次以外，其余每个元素均出现 **两次**。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法且 **不使用额外空间** 来解决此问题。



**示例 1：**

```
输入：nums = [2,2,1]
输出：1
```

**示例 2：**

```
输入：nums = [4,1,2,1,2]
输出：4
```

**示例 3：**

```
输入：nums = [1]
输出：1
```

**提示：**

- `1 <= nums.length <= 3 × 10⁴`
- `-3 × 10⁴ <= nums[i] <= 3 × 10⁴`
- 除了某个元素出现一次以外，其余每个元素均出现 **两次**



## 二、解答方法

### 2.1 方法一：位运算（异或）

1. **思路**

异或运算（XOR）有两个关键性质：

- 任何数与 `0` 异或，结果仍是它本身：`x ^ 0 = x`；
- 任何数与自己异或，结果为 `0`：`x ^ x = 0`；
- 异或满足交换律和结合律。

因此，把数组中所有数依次异或：出现两次的数会两两抵消为 `0`，最后剩下的就是那个只出现一次的数。

- 初始化 `ans = 0`；
- 遍历 `nums`，执行 `ans ^= num`；
- 返回 `ans`。

时间 `O(n)`，空间 `O(1)`，完美满足题目要求。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int singleNumber(int[] nums) {
        int ans = 0;
        for (int num : nums) ans ^= num;
        return ans;
    }
}
```

```python [Python]
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        ans = 0
        for num in nums:
            ans ^= num
        return ans
```

```cpp [C++]
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int num : nums) ans ^= num;
        return ans;
    }
};
```

```go [Go]
func singleNumber(nums []int) int {
    ans := 0
    for _, num := range nums {
        ans ^= num
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let ans = 0;
    for (const num of nums) ans ^= num;
    return ans;
};
```

```c [C]
int singleNumber(int* nums, int numsSize) {
    int ans = 0;
    for (int i = 0; i < numsSize; i++) ans ^= nums[i];
    return ans;
}
```

```ts [TypeScript]
function singleNumber(nums: number[]): number {
    let ans = 0;
    for (const num of nums) ans ^= num;
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，遍历一次数组。
- **空间复杂度**：`O(1)`，只使用常数变量。

### 2.2 方法二：哈希表

1. **思路**

用哈希表统计每个数字出现的次数，最后找出出现次数为 1 的键。

- 遍历数组，用 `Map`/`dict` 计数；
- 再遍历哈希表，返回计数为 1 的键。

虽然直观，但需要 `O(n)` 额外空间，不符合题目「不使用额外空间」的进阶要求。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int singleNumber(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int num : nums) map.put(num, map.getOrDefault(num, 0) + 1);
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if (entry.getValue() == 1) return entry.getKey();
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        cnt = {}
        for num in nums:
            cnt[num] = cnt.get(num, 0) + 1
        for k, v in cnt.items():
            if v == 1:
                return k
        return -1
```

```cpp [C++]
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_map<int, int> cnt;
        for (int num : nums) cnt[num]++;
        for (auto& [k, v] : cnt)
            if (v == 1) return k;
        return -1;
    }
};
```

```go [Go]
func singleNumber(nums []int) int {
    cnt := make(map[int]int)
    for _, num := range nums {
        cnt[num]++
    }
    for k, v := range cnt {
        if v == 1 {
            return k
        }
    }
    return -1
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    const cnt = new Map();
    for (const num of nums) cnt.set(num, (cnt.get(num) || 0) + 1);
    for (const [k, v] of cnt) {
        if (v === 1) return k;
    }
    return -1;
};
```

```c [C]
#include <stdlib.h>

int cmp(const void* a, const void* b) { return *(int*)a - *(int*)b; }

// C 语言无内置哈希表，此处用排序后成对检查来等价实现"统计次数"
int singleNumber(int* nums, int numsSize) {
    qsort(nums, numsSize, sizeof(int), cmp);
    for (int i = 0; i < numsSize; i += 2) {
        if (i + 1 == numsSize || nums[i] != nums[i + 1]) return nums[i];
    }
    return -1;
}
```

```ts [TypeScript]
function singleNumber(nums: number[]): number {
    const cnt = new Map<number, number>();
    for (const num of nums) cnt.set(num, (cnt.get(num) || 0) + 1);
    for (const [k, v] of cnt) {
        if (v === 1) return k;
    }
    return -1;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，遍历数组与哈希表各一次。
- **空间复杂度**：`O(n)`，哈希表存储所有元素计数。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 异或 | `O(n)` | `O(1)` | 最优解，满足进阶要求 |
| 哈希表 | `O(n)` | `O(n)` | 直观但占额外空间 |

异或解法利用「相同数抵消」的特性，是本题最优雅且符合空间约束的答案。
