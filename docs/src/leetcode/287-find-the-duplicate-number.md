# [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

## 一、题目描述

给定一个包含 `n + 1` 个整数的数组 `nums`，其数字都在 `[1, n]` 范围内（包括 `1` 和 `n`）。可知至少存在一个重复的整数。假设 `nums` 只有一个重复的整数，找出 **这个重复的数**。

**要求：**

-   不能更改原数组（假设数组是只读的）；
-   只能使用 `O(1)` 的额外空间；
-   时间复杂度小于 `O(n²)`；
-   重复的数可能重复不止两次。

**示例：**

```
输入：nums = [1,3,4,2,2]   输出：2
输入：nums = [3,1,3,4,2]   输出：3
```

**提示：** `1 <= n <= 10⁵`，`nums.length == n + 1`，`1 <= nums[i] <= n`。

## 二、解答方法

### 方法一：快慢指针（Floyd 判圈，O(1) 空间）

**思路：** 把数组下标和值看作「链表」：`i → nums[i]`。因为值都在 `[1, n]`、下标在 `[0, n]`，且存在重复值，必定形成 **环**，重复值就是环的入口。

1. 慢指针每次走 1 步（`slow = nums[slow]`），快指针走 2 步；
2. 相遇后，把慢指针重置到起点，两指针同速前进，再次相遇点即为环入口（重复数字）。

:::::: code-group

```java [Java]
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);
        slow = 0;
        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
        return slow;
    }
}
```

```python [Python]
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow = fast = 0
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast: break
        slow = 0
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow
```

```cpp [C++]
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0, fast = 0;
        do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);
        slow = 0;
        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
        return slow;
    }
};
```

```go [Go]
func findDuplicate(nums []int) int {
    slow, fast := 0, 0
    for {
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast { break }
    }
    slow = 0
    for slow != fast {
        slow = nums[slow]
        fast = nums[fast]
    }
    return slow
}
```

```js [JavaScript]
var findDuplicate = function (nums) {
    let slow = 0, fast = 0;
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    slow = 0;
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

### 方法二：二分查找（抽屉原理）

**思路：** 值在 `[1, n]`。统计 `<= mid` 的元素个数 `cnt`，若 `cnt > mid` 说明重复数在 `[1, mid]`（鸽巢原理），否则在 `[mid+1, n]`。二分 1~n。

```python [Python]
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        lo, hi = 1, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            cnt = sum(1 for x in nums if x <= mid)
            if cnt > mid:
                hi = mid
            else:
                lo = mid + 1
        return lo
```

**复杂度：** 时间 `O(n log n)`，空间 `O(1)`（不改数组）。

## 三、总结

| 方法 | 时间 | 空间 | 改动原数组 |
| ---- | ---- | ---- | ---------- |
| 快慢指针（判圈） | `O(n)` | `O(1)` | 否 |
| 二分查找 | `O(n log n)` | `O(1)` | 否 |
| 排序 | `O(n log n)` | `O(1)` | 是（违规） |
| 哈希集合 | `O(n)` | `O(n)` | 否（超空间） |

快慢指针法是最优解，把「数组 → 链表」建模为环检测问题，与 `142 环形链表 II` 完全同构。二分法利用抽屉原理，无需建模但稍慢。注意：由于要求只读且 `O(1)` 空间，只有前两种合法。
