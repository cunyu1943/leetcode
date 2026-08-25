# [面试题 08.03. 魔术索引](https://leetcode.cn/problems/magic-index-lcci/)

## 一、题目描述

魔术索引。在数组 `A[0...n-1]` 中，有所谓的魔术索引，满足条件 `A[i] = i`。给定一个有序整数数组，编写一种方法找出魔术索引，若有的话，在数组 A 中找出一个魔术索引，如果没有，则返回 -1。若有多个魔术索引，返回索引值最小的一个。

**示例 1：**

```
输入：nums = [0, 2, 3, 4, 5]
输出：0
说明：0 下标的元素为 0
```

**示例 2：**

```
输入：nums = [1, 1, 1]
输出：1
```

**提示：**

- `nums` 长度在 `[1, 1000000]` 之间。
- 此题为原书中的 Follow-up，即数组中可能包含重复元素的版本。

---

## 二、解答方法

### 2.1 方法一：线性扫描

**1. 思路**

数组有序，最朴素的做法是从左到右逐个检查 `nums[i] == i`，第一个满足的即为最小魔术索引。简单可靠，但时间 `O(n)`，未利用「有序」性质。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findMagicIndex(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == i) return i;
        }
        return -1;
    }
}
```

```python [Python]
class Solution:
    def findMagicIndex(self, nums: List[int]) -> int:
        for i, v in enumerate(nums):
            if v == i:
                return i
        return -1
```

```go [Go]
func findMagicIndex(nums []int) int {
	for i, v := range nums {
		if v == i {
			return i
		}
	}
	return -1
}
```

```c [C]
int findMagicIndex(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == i) return i;
    }
    return -1;
}
```

```cpp [C++]
class Solution {
public:
    int findMagicIndex(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == i) return i;
        }
        return -1;
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) return i;
    }
    return -1;
};
```

```typescript [TypeScript]
function findMagicIndex(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) return i;
    }
    return -1;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：跳跃式二分查找（含重复元素）

**1. 思路**

在无重复元素时，若 `nums[mid] < mid`，则 `mid` 左侧不可能有 `i == nums[i]`（因为数组严格递增，`i >= mid` 时 `nums[i] > nums[mid] >= i` 才可能有解），可整段跳过左半；`nums[mid] > mid` 时同理跳过右半，退化成标准二分，`O(log n)`。

存在重复元素时，二分不能完整排除某一侧，但仍可利用：`nums[mid] == mid` 时记录候选并向左收缩找最小；`nums[mid] < mid` 时左侧 `[lo, mid-1]` 仍可能含解，但 `[mid+1, nums[mid]]` 这一段必无解（因为 `i > mid >= nums[mid]` 不可能满足 `nums[i]==i`），可从 `max(mid+1, nums[mid])` 继续；`nums[mid] > mid` 时右侧 `[nums[mid], hi]` 必无解，从 `min(mid-1, nums[mid])` 继续。这样实现「跳跃式」二分，远快于线性扫描。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int findMagicIndex(int[] nums) {
        return dfs(nums, 0, nums.length - 1);
    }
    private int dfs(int[] nums, int lo, int hi) {
        if (lo > hi) return -1;
        int mid = lo + (hi - lo) / 2;
        int val = nums[mid];
        if (val == mid) {
            int left = dfs(nums, lo, mid - 1);
            return left != -1 ? left : mid;
        } else if (val < mid) {
            // 左段 [lo, mid-1] 仍可能；中段 [mid+1, val] 必无解
            int left = dfs(nums, lo, mid - 1);
            if (left != -1) return left;
            return dfs(nums, Math.max(mid + 1, val), hi);
        } else {
            // 右段 [mid+1, hi] 仍可能；中段 [val, mid-1] 必无解
            int right = dfs(nums, mid + 1, hi);
            if (right != -1) return right;
            return dfs(nums, lo, Math.min(mid - 1, val));
        }
    }
}
```

```python [Python]
class Solution:
    def findMagicIndex(self, nums: List[int]) -> int:
        def dfs(lo, hi):
            if lo > hi:
                return -1
            mid = (lo + hi) // 2
            val = nums[mid]
            if val == mid:
                left = dfs(lo, mid - 1)
                return left if left != -1 else mid
            elif val < mid:
                left = dfs(lo, mid - 1)
                if left != -1:
                    return left
                return dfs(max(mid + 1, val), hi)
            else:
                right = dfs(mid + 1, hi)
                if right != -1:
                    return right
                return dfs(lo, min(mid - 1, val))
        return dfs(0, len(nums) - 1)
```

```go [Go]
func findMagicIndex(nums []int) int {
	var dfs func(lo, hi int) int
	dfs = func(lo, hi int) int {
		if lo > hi {
			return -1
		}
		mid := lo + (hi-lo)/2
		val := nums[mid]
		if val == mid {
			left := dfs(lo, mid-1)
			if left != -1 {
				return left
			}
			return mid
		} else if val < mid {
			left := dfs(lo, mid-1)
			if left != -1 {
				return left
			}
			return dfs(max(mid+1, val), hi)
		} else {
			right := dfs(mid+1, hi)
			if right != -1 {
				return right
			}
			return dfs(lo, min(mid-1, val))
		}
	}
	return dfs(0, len(nums)-1)
}
func max(a, b int) int { if a > b { return a }; return b }
func min(a, b int) int { if a < b { return a }; return b }
```

```c [C]
int dfs(int* nums, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    int val = nums[mid];
    if (val == mid) {
        int left = dfs(nums, lo, mid - 1);
        return left != -1 ? left : mid;
    } else if (val < mid) {
        int left = dfs(nums, lo, mid - 1);
        if (left != -1) return left;
        int l = mid + 1 > val ? mid + 1 : val;
        return dfs(nums, l, hi);
    } else {
        int right = dfs(nums, mid + 1, hi);
        if (right != -1) return right;
        int r = mid - 1 < val ? mid - 1 : val;
        return dfs(nums, lo, r);
    }
}
int findMagicIndex(int* nums, int numsSize) {
    return dfs(nums, 0, numsSize - 1);
}
```

```cpp [C++]
class Solution {
public:
    int findMagicIndex(vector<int>& nums) {
        return dfs(nums, 0, nums.size() - 1);
    }
private:
    int dfs(vector<int>& nums, int lo, int hi) {
        if (lo > hi) return -1;
        int mid = lo + (hi - lo) / 2;
        int val = nums[mid];
        if (val == mid) {
            int left = dfs(nums, lo, mid - 1);
            return left != -1 ? left : mid;
        } else if (val < mid) {
            int left = dfs(nums, lo, mid - 1);
            if (left != -1) return left;
            return dfs(nums, max(mid + 1, val), hi);
        } else {
            int right = dfs(nums, mid + 1, hi);
            if (right != -1) return right;
            return dfs(nums, lo, min(mid - 1, val));
        }
    }
};
```

```javascript [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function (nums) {
    const dfs = (lo, hi) => {
        if (lo > hi) return -1;
        const mid = lo + Math.floor((hi - lo) / 2);
        const val = nums[mid];
        if (val === mid) {
            const left = dfs(lo, mid - 1);
            return left !== -1 ? left : mid;
        } else if (val < mid) {
            const left = dfs(lo, mid - 1);
            if (left !== -1) return left;
            return dfs(Math.max(mid + 1, val), hi);
        } else {
            const right = dfs(mid + 1, hi);
            if (right !== -1) return right;
            return dfs(lo, Math.min(mid - 1, val));
        }
    };
    return dfs(0, nums.length - 1);
};
```

```typescript [TypeScript]
function findMagicIndex(nums: number[]): number {
    const dfs = (lo: number, hi: number): number => {
        if (lo > hi) return -1;
        const mid = lo + Math.floor((hi - lo) / 2);
        const val = nums[mid];
        if (val === mid) {
            const left = dfs(lo, mid - 1);
            return left !== -1 ? left : mid;
        } else if (val < mid) {
            const left = dfs(lo, mid - 1);
            if (left !== -1) return left;
            return dfs(Math.max(mid + 1, val), hi);
        } else {
            const right = dfs(mid + 1, hi);
            if (right !== -1) return right;
            return dfs(lo, Math.min(mid - 1, val));
        }
    };
    return dfs(0, nums.length - 1);
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：平均 `O(log n)`，最坏（如全部相同元素）退化到 `O(n)`。
- **空间复杂度**：`O(log n)` 递归栈。

---

## 三、总结

| 方法         | 时间复杂度 | 空间复杂度 | 特点                                   |
| ------------ | ---------- | ---------- | -------------------------------------- |
| 线性扫描     | `O(n)`     | `O(1)`     | 最简单，必过，面试保底                 |
| 跳跃式二分   | 平均 `O(log n)` | `O(log n)` | 利用有序性，含重复也能工作，推荐       |

**推荐解法**：先给线性扫描保证正确（尤其重复元素时二分易错），再补充跳跃式二分展示对「有序 + 重复」性质的深入把握。注意本题数组**可能含重复元素**，不能当作严格递增直接整段排除。
