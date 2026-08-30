# [315. 计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)

## 一、题目描述

给你一个整数数组 `nums`，返回一个数组 `answer`，其中 `answer[i]` 等于 `nums[i]` 右侧严格小于 `nums[i]` 的元素个数。

**示例：**
```
输入：nums = [5,2,6,1]   输出：[2,1,1,0]
解释：5 右边有 2,1(<5)→2；2 右边 1→1；6 右边 1→1；1 右边无→0
```

**提示：** `1 <= nums.length <= 10⁵`，`-10⁴ <= nums[i] <= 10⁴`。

## 二、解答方法

### 方法一：归并排序（在合并时计数）

**思路：** 自底向上归并。对右半部分每个元素，统计左半部分有多少元素比它小（归并时左指针剩余数）。为保持原下标，需携带索引排序。合并时：若 `left[i] <= right[j]`，`right[j]` 在 `left[i]` 之前被取走，则 `left[i]` 比它大，不影响计数；若 `right[j] < left[i]`，则 `left[i]` 及其后所有左元素都 > `right[j]`，给 `right[j]` 的 `count += mid-i`。

:::::: code-group

```java [Java]
class Solution {
    private int[] count, idx, tmpIdx; private int[] nums;
    public List<Integer> countSmaller(int[] nums) {
        int n = nums.length; count = new int[n]; idx = new int[n]; tmpIdx = new int[n];
        this.nums = nums;
        for (int i=0;i<n;i++) idx[i] = i;
        mergeSort(0, n-1);
        List<Integer> res = new ArrayList<>();
        for (int c : count) res.add(c);
        return res;
    }
    void mergeSort(int l, int r) {
        if (l >= r) return;
        int m = l + (r-l)/2;
        mergeSort(l, m); mergeSort(m+1, r);
        int i = l, j = m+1, k = l;
        while (i <= m && j <= r) {
            if (nums[idx[i]] <= nums[idx[j]]) { tmpIdx[k++] = idx[i++]; }
            else { count[idx[j]] += (m - i + 1); tmpIdx[k++] = idx[j++]; }
        }
        while (i <= m) tmpIdx[k++] = idx[i++];
        while (j <= r) tmpIdx[k++] = idx[j++];
        for (int p=l;p<=r;p++) idx[p] = tmpIdx[p];
    }
}
```

```python [Python]
class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        n = len(nums)
        idx = list(range(n)); count = [0]*n
        def merge(l, r):
            if l >= r: return
            m = (l+r)//2
            merge(l, m); merge(m+1, r)
            i, j, k = l, m+1, l
            tmp = [0]*n
            while i <= m and j <= r:
                if nums[idx[i]] <= nums[idx[j]]: tmp[k] = idx[i]; i += 1
                else:
                    count[idx[j]] += (m - i + 1); tmp[k] = idx[j]; j += 1
                k += 1
            while i <= m: tmp[k] = idx[i]; i += 1; k += 1
            while j <= r: tmp[k] = idx[j]; j += 1; k += 1
            for p in range(l, r+1): idx[p] = tmp[p]
        merge(0, n-1)
        return count
```

```cpp [C++]
class Solution {
    vector<int> count, idx, tmp;
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        count.assign(n, 0); idx.resize(n); tmp.resize(n);
        for (int i=0;i<n;i++) idx[i]=i;
        mergeSort(nums, 0, n-1);
        return count;
    }
    void mergeSort(vector<int>& nums, int l, int r) {
        if (l>=r) return;
        int m = l+(r-l)/2;
        mergeSort(nums,l,m); mergeSort(nums,m+1,r);
        int i=l,j=m+1,k=l;
        while(i<=m && j<=r){
            if(nums[idx[i]]<=nums[idx[j]]) tmp[k++]=idx[i++];
            else { count[idx[j]] += (m-i+1); tmp[k++]=idx[j++]; }
        }
        while(i<=m) tmp[k++]=idx[i++];
        while(j<=r) tmp[k++]=idx[j++];
        for(int p=l;p<=r;p++) idx[p]=tmp[p];
    }
};
```

```go [Go]
func countSmaller(nums []int) []int {
    n := len(nums)
    idx := make([]int, n); count := make([]int, n); tmp := make([]int, n)
    for i := range idx { idx[i] = i }
    var merge func(int, int)
    merge = func(l, r int) {
        if l >= r { return }
        m := (l+r)/2
        merge(l, m); merge(m+1, r)
        i, j, k := l, m+1, l
        for i <= m && j <= r {
            if nums[idx[i]] <= nums[idx[j]] { tmp[k] = idx[i]; i++ } else {
                count[idx[j]] += (m - i + 1); tmp[k] = idx[j]; j++
            }
            k++
        }
        for i <= m { tmp[k] = idx[i]; i++; k++ }
        for j <= r { tmp[k] = idx[j]; j++; k++ }
        for p := l; p <= r; p++ { idx[p] = tmp[p] }
    }
    merge(0, n-1)
    return count
}
```

```js [JavaScript]
var countSmaller = function (nums) {
    const n = nums.length;
    const idx = [...Array(n).keys()], count = new Array(n).fill(0), tmp = new Array(n);
    const merge = (l, r) => {
        if (l >= r) return;
        const m = (l+r)>>1;
        merge(l, m); merge(m+1, r);
        let i=l, j=m+1, k=l;
        while (i<=m && j<=r) {
            if (nums[idx[i]] <= nums[idx[j]]) tmp[k++] = idx[i++];
            else { count[idx[j]] += (m-i+1); tmp[k++] = idx[j++]; }
        }
        while (i<=m) tmp[k++] = idx[i++];
        while (j<=r) tmp[k++] = idx[j++];
        for (let p=l; p<=r; p++) idx[p] = tmp[p];
    };
    merge(0, n-1);
    return count;
};
```

::::::

**复杂度：** 时间 `O(n log n)`，空间 `O(n)`。

## 三、总结

归并排序边排边计数是经典技巧：右半元素被取走时，左半剩余数都 > 它，故 `count += 左剩余个数`。也可用 **树状数组/线段树（逆序对变形）**：从右往左插入，查询「小于当前值」的个数（需离散化）。归并法更直观且不需离散化。同类：`493 翻转对`、`327 区间和的个数`。
