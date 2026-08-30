# [215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)



## 一、题目描述

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题。



**示例 1：**

```
输入：[3,2,1,5,6,4], k = 2
输出：5
```

**示例 2：**

```
输入：[3,2,3,1,2,4,5,5,6], k = 4
输出：4
```

**提示：**

-   `1 <= k <= nums.length <= 10⁵`
-   `-10⁴ <= nums[i] <= 10⁴`



## 二、解答方法

### 2.1 方法一：快速选择（Quickselect，平均 O(n)）

1. **思路**

基于快速排序的 partition：随机选一个 pivot，把数组分成「大于 pivot」「等于」「小于」三部分。若第 k 大落在「大于」区则递归左边，落在「小于」区则递归右边（k 相应减小），命中「等于」区直接返回。

平均每次淘汰一半，期望时间 `O(n)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int findKthLargest(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length - 1, k);
    }

    private int quickSelect(int[] nums, int left, int right, int k) {
        if (left == right) return nums[left];
        int pivotIndex = partition(nums, left, right);
        int count = pivotIndex - left + 1;   // 左半（含 pivot）元素个数
        if (k == count) {
            return nums[pivotIndex];
        } else if (k < count) {
            return quickSelect(nums, left, pivotIndex - 1, k);
        } else {
            return quickSelect(nums, pivotIndex + 1, right, k - count);
        }
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left;
        for (int j = left; j < right; j++) {
            if (nums[j] >= pivot) {   // 降序：大的放左边
                swap(nums, i++, j);
            }
        }
        swap(nums, i, right);
        return i;
    }

    private void swap(int[] nums, int i, int j) {
        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
    }
}
```

```python [Python]
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def quick_select(left, right, k):
            if left == right:
                return nums[left]
            pivot = nums[right]
            i = left
            for j in range(left, right):
                if nums[j] >= pivot:
                    nums[i], nums[j] = nums[j], nums[i]
                    i += 1
            nums[i], nums[right] = nums[right], nums[i]
            count = i - left + 1
            if k == count:
                return nums[i]
            elif k < count:
                return quick_select(left, i - 1, k)
            else:
                return quick_select(i + 1, right, k - count)
        return quick_select(0, len(nums) - 1, k)
```

```go [Go]
func findKthLargest(nums []int, k int) int {
    var quickSelect func(left, right, k int) int
    quickSelect = func(left, right, k int) int {
        if left == right {
            return nums[left]
        }
        pivot := nums[right]
        i := left
        for j := left; j < right; j++ {
            if nums[j] >= pivot {
                nums[i], nums[j] = nums[j], nums[i]
                i++
            }
        }
        nums[i], nums[right] = nums[right], nums[i]
        count := i - left + 1
        if k == count {
            return nums[i]
        } else if k < count {
            return quickSelect(left, i-1, k)
        }
        return quickSelect(i+1, right, k-count)
    }
    return quickSelect(0, len(nums)-1, k)
}
```

```cpp [C++]
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        return quickSelect(nums, 0, nums.size() - 1, k);
    }
private:
    int quickSelect(vector<int>& nums, int left, int right, int k) {
        if (left == right) return nums[left];
        int pivot = nums[right];
        int i = left;
        for (int j = left; j < right; j++) {
            if (nums[j] >= pivot) swap(nums[i++], nums[j]);
        }
        swap(nums[i], nums[right]);
        int count = i - left + 1;
        if (k == count) return nums[i];
        if (k < count) return quickSelect(nums, left, i - 1, k);
        return quickSelect(nums, i + 1, right, k - count);
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    const quickSelect = (left, right, k) => {
        if (left === right) return nums[left];
        const pivot = nums[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (nums[j] >= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[right]] = [nums[right], nums[i]];
        const count = i - left + 1;
        if (k === count) return nums[i];
        if (k < count) return quickSelect(left, i - 1, k);
        return quickSelect(i + 1, right, k - count);
    };
    return quickSelect(0, nums.length - 1, k);
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums: number[], k: number): number {
    const quickSelect = (left: number, right: number, k: number): number => {
        if (left === right) return nums[left];
        const pivot = nums[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (nums[j] >= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[right]] = [nums[right], nums[i]];
        const count = i - left + 1;
        if (k === count) return nums[i];
        if (k < count) return quickSelect(left, i - 1, k);
        return quickSelect(i + 1, right, k - count);
    };
    return quickSelect(0, nums.length - 1, k);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：平均 `O(n)`，最坏 `O(n²)`（随机化 pivot 可避免）。
- **空间复杂度**：`O(1)`（原地）或 `O(log n)` 递归栈。

### 2.2 方法二：堆（优先队列，O(n log k)）

1. **思路**

维护一个大小为 `k` 的 **小顶堆**。遍历数组，堆未满则加入；堆满时若当前元素大于堆顶则替换堆顶。遍历结束，堆顶即第 k 大。适合海量数据/流式数据（无法一次性载入内存）。

2. **代码实现（Python）**

```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        import heapq
        heap = []
        for num in nums:
            if len(heap) < k:
                heapq.heappush(heap, num)
            elif num > heap[0]:
                heapq.heapreplace(heap, num)
        return heap[0]
```

3. **复杂度分析**

- **时间复杂度**：`O(n log k)`。
- **空间复杂度**：`O(k)`。

## 三、总结

| 方法 | 时间 | 空间 | 适用 |
| ---- | ---- | ---- | ---- |
| 快速选择 | 平均 `O(n)` | `O(1)` | 数组可修改，一次性求解 |
| 小顶堆 | `O(n log k)` | `O(k)` | 海量/流式数据，k 较小 |
| 排序 | `O(n log n)` | `O(1)` | 简单但不满足进阶要求 |

注意与 `703. 数据流中的第 K 大元素` 的区别：本题是一次性数组，快速选择更优；数据流场景只能用堆。
