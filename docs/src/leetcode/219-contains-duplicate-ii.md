# [219. 存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/)



## 一、题目描述

给你一个整数数组 `nums` 和一个整数 `k` ，判断数组中是否存在两个 **不同的索引** `i` 和 `j` ，满足 `nums[i] == nums[j]` 且 `abs(i - j) <= k` 。如果存在，返回 `true` ；否则，返回 `false` 。



**示例 1：**

```
输入：nums = [1,2,3,1], k = 3
输出：true
解释：nums[0] == nums[3]，下标差 3 ≤ k。
```

**示例 2：**

```
输入：nums = [1,0,1,1], k = 1
输出：true
解释：nums[2] == nums[3]，下标差 1 ≤ k。
```

**示例 3：**

```
输入：nums = [1,2,3,1,2,3], k = 2
输出：false
解释：相等元素的最小下标差为 3 > k。
```

**提示：**

-   `1 <= nums.length <= 10⁵`
-   `-10⁹ <= nums[i] <= 10⁹`
-   `0 <= k <= 10⁵`



## 二、解答方法

### 2.1 方法一：哈希表记录最近下标

1. **思路**

遍历数组，用哈希表记录 **每个数值最后一次出现的下标**。若当前值已存在且 `i - lastIndex <= k`，返回 `true`；否则更新该值的下标为 `i`（保留最近的下标，使后续判断更容易成立）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> lastIndex = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (lastIndex.containsKey(nums[i]) && i - lastIndex.get(nums[i]) <= k) {
                return true;
            }
            lastIndex.put(nums[i], i);
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        last_index = {}
        for i, num in enumerate(nums):
            if num in last_index and i - last_index[num] <= k:
                return True
            last_index[num] = i
        return False
```

```go [Go]
func containsNearbyDuplicate(nums []int, k int) bool {
    lastIndex := make(map[int]int)
    for i, num := range nums {
        if idx, ok := lastIndex[num]; ok && i-idx <= k {
            return true
        }
        lastIndex[num] = i
    }
    return false
}
```

```cpp [C++]
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> lastIndex;
        for (int i = 0; i < nums.size(); i++) {
            if (lastIndex.count(nums[i]) && i - lastIndex[nums[i]] <= k) {
                return true;
            }
            lastIndex[nums[i]] = i;
        }
        return false;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    const lastIndex = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (lastIndex.has(nums[i]) && i - lastIndex.get(nums[i]) <= k) {
            return true;
        }
        lastIndex.set(nums[i], i);
    }
    return false;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const lastIndex = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        if (lastIndex.has(nums[i]) && i - lastIndex.get(nums[i])! <= k) {
            return true;
        }
        lastIndex.set(nums[i], i);
    }
    return false;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：滑动窗口 + 哈希集合

1. **思路**

维护一个大小不超过 `k` 的滑动窗口，窗口内用 `Set` 保存元素。遍历时若当前元素已在集合中则返回 `true`；加入当前元素后，若窗口大小超过 `k` 则移除最左边的元素（`nums[i-k]`）。

2. **代码实现（Python）**

```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        window = set()
        for i, num in enumerate(nums):
            if num in window:
                return True
            window.add(num)
            if len(window) > k:
                window.remove(nums[i - k])
        return False
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(k)`（窗口最多存 k+1 个元素）。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 哈希表存最近下标 | `O(n)` | 最直观 |
| 滑动窗口 + Set | `O(k)` | 空间更优 |

两种思路本质都是「查找下标差 ≤ k 的相等元素对」。滑动窗口法空间受 k 限制，更适合 k 较小的场景。对比 `220. 存在重复元素 III`：那里约束的是「值差 ≤ t」，需要有序容器（桶排序 / TreeSet）配合。
