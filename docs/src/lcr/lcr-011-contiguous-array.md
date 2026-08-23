# [LCR 011. 连续数组](https://leetcode.cn/problems/A1NYOS/)



## 一、题目描述

给定一个二进制数组 `nums` ，找到含有相同数量的 `0` 和 `1` 的最长连续子数组，并返回该子数组的长度。



**示例 1：**

```
输入: nums = [0,1]
输出: 2
解释: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。
```

**示例 2：**

```
输入: nums = [0,1,0]
输出: 2
解释: [0, 1]（或 [1, 0]）是具有相同数量 0 和 1 的最长连续子数组。
```

**提示：**

- `1 <= nums.length <= 10⁵`
- `nums[i]` 不是 `0` 就是 `1`



## 二、解答方法

### 2.1 方法一：前缀和 + 哈希表

1. **思路**

把问题转化成「和为 K 的子数组」：将数组中的 `0` 视为 `-1`，则「0 和 1 数量相等」等价于「子数组元素和为 0」。

- 用前缀和 `sum`（遇 `1` 加 1，遇 `0` 减 1）；
- 若某前缀和 `sum` 之前在位置 `j` 出现过（即 `sum` 相同），则区间 `[j+1, i]` 的和为 0，对应 0/1 数量相等，长度为 `i - j`；
- 哈希表记录「每个前缀和第一次出现的下标」，只在首次出现时记录，这样差值最大。

时间复杂度 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int sum = 0, ans = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i] == 1 ? 1 : -1;
            if (first.containsKey(sum)) {
                ans = Math.max(ans, i - first.get(sum));
            } else {
                first.put(sum, i);
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        first = {0: -1}
        s = ans = 0
        for i, x in enumerate(nums):
            s += 1 if x == 1 else -1
            if s in first:
                ans = max(ans, i - first[s])
            else:
                first[s] = i
        return ans
```

```cpp [C++]
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> first;
        first[0] = -1;
        int sum = 0, ans = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i] == 1 ? 1 : -1;
            if (first.count(sum)) ans = max(ans, i - first[sum]);
            else first[sum] = i;
        }
        return ans;
    }
};
```

```go [Go]
func findMaxLength(nums []int) int {
    first := map[int]int{0: -1}
    s, ans := 0, 0
    for i, x := range nums {
        if x == 1 {
            s++
        } else {
            s--
        }
        if j, ok := first[s]; ok {
            if i-j > ans {
                ans = i - j
            }
        } else {
            first[s] = i
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    const first = new Map();
    first.set(0, -1);
    let sum = 0, ans = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i] === 1 ? 1 : -1;
        if (first.has(sum)) {
            ans = Math.max(ans, i - first.get(sum));
        } else {
            first.set(sum, i);
        }
    }
    return ans;
};
```

```c [C]
// C 语言无内置哈希表，下面用「开放寻址 + 线性探测」手写哈希来等价实现 O(n)。
#include <stdlib.h>
#include <string.h>

#define HASH 200011

int findMaxLength(int* nums, int numsSize) {
    int* key = (int*)malloc(HASH * sizeof(int));
    int* val = (int*)malloc(HASH * sizeof(int));
    for (int i = 0; i < HASH; i++) key[i] = 0x3f3f3f3f;
    key[0 + HASH / 2] = 0; val[0 + HASH / 2] = -1;
    int sum = 0, ans = 0;
    for (int i = 0; i < numsSize; i++) {
        sum += nums[i] == 1 ? 1 : -1;
        int h = (sum + HASH / 2) % HASH;
        while (key[h] != 0x3f3f3f3f && key[h] != sum) h = (h + 1) % HASH;
        if (key[h] == sum) {
            if (i - val[h] > ans) ans = i - val[h];
        } else {
            key[h] = sum; val[h] = i;
        }
    }
    free(key); free(val);
    return ans;
}
```

```ts [TypeScript]
function findMaxLength(nums: number[]): number {
    const first: Map<number, number> = new Map();
    first.set(0, -1);
    let sum = 0, ans = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i] === 1 ? 1 : -1;
        if (first.has(sum)) {
            ans = Math.max(ans, i - first.get(sum)!);
        } else {
            first.set(sum, i);
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，哈希操作均摊 `O(1)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 前缀和 + 哈希 | `O(n)` | `O(n)` | 经典转化：0→-1，找和为 0 的最长子数组 |

把「0/1 数量相等」转化为「前缀和为 0」，即可复用 LCR 010 的哈希思路，注意只在首次出现时记录下标以获得最大长度。

