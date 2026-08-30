# [217. 存在重复元素](https://leetcode.cn/problems/contains-duplicate/)



## 一、题目描述

给你一个整数数组 `nums` 。如果任一值在数组中出现 **至少两次** ，返回 `true` ；如果数组中每个元素互不相同，返回 `false` 。



**示例 1：**

```
输入：nums = [1,2,3,1]
输出：true
```

**示例 2：**

```
输入：nums = [1,2,3,4]
输出：false
```

**示例 3：**

```
输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true
```

**提示：**

-   `1 <= nums.length <= 10⁵`
-   `-10⁹ <= nums[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：哈希集合

1. **思路**

遍历数组，用 `Set` 记录已见过的数。若当前数已存在于集合中，说明重复，返回 `true`；否则加入集合。遍历结束返回 `false`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) return true;   // add 返回 false 说明已存在
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
```

```go [Go]
func containsDuplicate(nums []int) bool {
    seen := make(map[int]bool)
    for _, num := range nums {
        if seen[num] {
            return true
        }
        seen[num] = true
    }
    return false
}
```

```cpp [C++]
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (!seen.insert(num).second) return true;
        }
        return false;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：排序后比较相邻

1. **思路**

先排序，重复元素必然相邻。只需检查 `nums[i] == nums[i-1]`。

2. **代码实现（Python）**

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                return True
        return False
```

3. **复杂度分析**

- **时间复杂度**：`O(n log n)`（排序）。
- **空间复杂度**：`O(1)`（原地排序，取决于语言实现）。

## 三、总结

| 方法 | 时间 | 空间 |
| ---- | ---- | ---- |
| 哈希集合 | `O(n)` | `O(n)` |
| 排序 | `O(n log n)` | `O(1)` |

一行式写法：`return len(set(nums)) != len(nums)`。哈希集合法时间最优（`O(n)`），是本题首选。本题是 `219. 存在重复元素 II`（距离限制）与 `220. 存在重复元素 III`（值差限制）的基础版本。
