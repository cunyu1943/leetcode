# [493. 翻转对](https://leetcode.cn/problems/reverse-pairs/)

## 一、题目描述

给定一个整数数组 `nums`，翻转对是指满足 `i < j` 且 `nums[i] > 2 * nums[j]` 的下标对 `(i, j)`。返回翻转对的总数。

**示例 1：**

```
输入：nums = [1,3,2,3,1]
输出：2
解释：第 0、2 位 1 都 > 2*3? 实际翻转对：nums[1]=3 > 2*1(索引4)，nums[3]=3 > 2*1，共 2 对。
```

**示例 2：**

```
输入：nums = [2,4,3,5,1]
输出：3
```

**提示：**

- `1 <= nums.length <= 5 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：归并排序计数

1. 思路

在归并排序的分治过程中，对左右两个已排序子数组，用双指针统计「左半元素 > 2 × 右半元素」的对数（两指针独立推进，因为有序），再合并。总计数即答案，时间 $O(n \log n)$。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        def merge_sort(l, r):
            if l >= r:
                return 0
            mid = (l + r) // 2
            cnt = merge_sort(l, mid) + merge_sort(mid + 1, r)
            # 计数：左半 > 2*右半
            j = mid + 1
            for i in range(l, mid + 1):
                while j <= r and nums[i] > 2 * nums[j]:
                    j += 1
                cnt += j - (mid + 1)
            # 归并
            tmp = []
            p, q = l, mid + 1
            while p <= mid and q <= r:
                if nums[p] <= nums[q]:
                    tmp.append(nums[p]); p += 1
                else:
                    tmp.append(nums[q]); q += 1
            while p <= mid: tmp.append(nums[p]); p += 1
            while q <= r: tmp.append(nums[q]); q += 1
            nums[l:r + 1] = tmp
            return cnt
        return merge_sort(0, len(nums) - 1)
```

```java [Java]
class Solution {
    public int reversePairs(int[] nums) {
        return mergeSort(nums, 0, nums.length - 1);
    }
    int mergeSort(int[] nums, int l, int r) {
        if (l >= r) return 0;
        int mid = (l + r) / 2;
        int cnt = mergeSort(nums, l, mid) + mergeSort(nums, mid + 1, r);
        int j = mid + 1;
        for (int i = l; i <= mid; i++) {
            while (j <= r && (long) nums[i] > 2L * nums[j]) j++;
            cnt += j - (mid + 1);
        }
        int[] tmp = new int[r - l + 1];
        int p = l, q = mid + 1, k = 0;
        while (p <= mid && q <= r) tmp[k++] = nums[p] <= nums[q] ? nums[p++] : nums[q++];
        while (p <= mid) tmp[k++] = nums[p++];
        while (q <= r) tmp[k++] = nums[q++];
        for (int i = 0; i < tmp.length; i++) nums[l + i] = tmp[i];
        return cnt;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n)$。
- 空间复杂度：$O(n)$。

## 三、总结

「归并排序计数」处理 `a[i] > 2*a[j]` 类逆序对（比逆序对多了个 2 倍条件）。相关题目：315 计算右侧小于当前元素的个数、327 区间和的个数、493 本身。
