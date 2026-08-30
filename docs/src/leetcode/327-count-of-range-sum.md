# [327. 区间和的个数](https://leetcode.cn/problems/count-of-range-sum/)

## 一、题目描述

给你一个整数数组 `nums` 以及整数 `lower`、`upper`，返回「和落在闭区间 `[lower, upper]` 内的 **子数组** 个数」。

**示例：**
```
输入：nums = [-2,5,-1], lower = -2, upper = 2
输出：3
解释：子数组和分别为 [-2]= -2, [5]=5, [-1]=-1, [-2,5]=3, [5,-1]=4, [-2,5,-1]=2 → 落在 [-2,2] 的有 -2,-1,2 共 3 个
```

**提示：** `1 <= nums.length <= 10⁴`，`-2³¹ <= lower <= upper <= 2³¹-1`，`-2³¹ <= nums[i] <= 2³¹-1`（注意溢出，用 long）。

## 二、解答方法

### 方法一：归并排序 + 前缀和

**思路：** 与前缀和 `pre[i]` 结合，问题转为：对每个 `i`，统计 `j<i` 满足 `lower <= pre[i]-pre[j] <= upper` 即 `pre[i]-upper <= pre[j] <= pre[i]-lower` 的个数。归并排序过程中，对右半每个 `pre[i]`，用双指针在已排序的左半中数出落在区间内的 `pre[j]` 数（左半递增，移动两个边界指针）。

:::::: code-group

```java [Java]
class Solution {
    private long[] pre;
    private int lower, upper, ans;
    public int countRangeSum(int[] nums, int lower, int upper) {
        int n = nums.length;
        pre = new long[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
        this.lower = lower; this.upper = upper; ans = 0;
        sort(0, n);
        return ans;
    }
    void sort(int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        sort(l, m); sort(m + 1, r);
        int i = l, jl = l, jr = l;
        for (int k = m + 1; k <= r; k++) {
            long lo = pre[k] - upper, hi = pre[k] - lower;
            while (jl <= m && pre[jl] < lo) jl++;
            while (jr <= m && pre[jr] <= hi) jr++;
            ans += jr - jl;
        }
        long[] tmp = new long[r - l + 1]; int p = l, q = m + 1, t = 0;
        while (p <= m && q <= r) tmp[t++] = pre[p] <= pre[q] ? pre[p++] : pre[q++];
        while (p <= m) tmp[t++] = pre[p++];
        while (q <= r) tmp[t++] = pre[q++];
        for (int x = 0; x < tmp.length; x++) pre[l + x] = tmp[x];
    }
}
```

```python [Python]
class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        pre = [0]*(len(nums)+1)
        for i, x in enumerate(nums): pre[i+1] = pre[i] + x
        ans = 0
        def merge(l, r):
            nonlocal ans
            if l >= r: return
            m = (l+r)//2
            merge(l, m); merge(m+1, r)
            jl = jr = l
            for k in range(m+1, r+1):
                lo, hi = pre[k]-upper, pre[k]-lower
                while jl <= m and pre[jl] < lo: jl += 1
                while jr <= m and pre[jr] <= hi: jr += 1
                ans += jr - jl
            tmp = []
            p, q = l, m+1
            while p <= m and q <= r:
                if pre[p] <= pre[q]: tmp.append(pre[p]); p += 1
                else: tmp.append(pre[q]); q += 1
            while p <= m: tmp.append(pre[p]); p += 1
            while q <= r: tmp.append(pre[q]); q += 1
            for x in range(len(tmp)): pre[l+x] = tmp[x]
        merge(0, len(nums))
        return ans
```

```cpp [C++]
class Solution {
    vector<long> pre; int lower, upper, ans=0;
    void sort(int l,int r){
        if(l>=r) return;
        int m=l+(r-l)/2; sort(l,m); sort(m+1,r);
        int jl=l,jr=l;
        for(int k=m+1;k<=r;k++){
            long lo=pre[k]-upper, hi=pre[k]-lower;
            while(jl<=m && pre[jl]<lo) jl++;
            while(jr<=m && pre[jr]<=hi) jr++;
            ans += jr-jl;
        }
        vector<long> tmp(r-l+1); int p=l,q=m+1,t=0;
        while(p<=m&&q<=r) tmp[t++]=pre[p]<=pre[q]?pre[p++]:pre[q++];
        while(p<=m) tmp[t++]=pre[p++];
        while(q<=r) tmp[t++]=pre[q++];
        for(int x=0;x<tmp.size();x++) pre[l+x]=tmp[x];
    }
public:
    int countRangeSum(vector<int>& nums, int lo, int up) {
        pre.resize(nums.size()+1);
        for(int i=0;i<nums.size();i++) pre[i+1]=pre[i]+nums[i];
        lower=lo; upper=up; sort(0,nums.size()); return ans;
    }
};
```

```go [Go]
func countRangeSum(nums []int, lower, upper int) int {
    n := len(nums)
    pre := make([]int64, n+1)
    for i, x := range nums { pre[i+1] = pre[i] + int64(x) }
    ans := 0
    var merge func(int, int)
    merge = func(l, r int) {
        if l >= r { return }
        m := (l+r)/2
        merge(l, m); merge(m+1, r)
        jl, jr := l, l
        for k := m+1; k <= r; k++ {
            lo := pre[k] - int64(upper); hi := pre[k] - int64(lower)
            for jl <= m && pre[jl] < lo { jl++ }
            for jr <= m && pre[jr] <= hi { jr++ }
            ans += jr - jl
        }
        tmp := make([]int64, r-l+1); p, q, t := l, m+1, 0
        for p <= m && q <= r {
            if pre[p] <= pre[q] { tmp[t] = pre[p]; p++ } else { tmp[t] = pre[q]; q++ }
            t++
        }
        for p <= m { tmp[t] = pre[p]; p++; t++ }
        for q <= r { tmp[t] = pre[q]; q++; t++ }
        for x := 0; x < len(tmp); x++ { pre[l+x] = tmp[x] }
    }
    merge(0, n)
    return ans
}
```

```js [JavaScript]
var countRangeSum = function (nums, lower, upper) {
    const pre = new Array(nums.length+1).fill(0);
    for (let i=0;i<nums.length;i++) pre[i+1] = pre[i] + BigInt(nums[i]);
    let ans = 0;
    const sort = (l, r) => {
        if (l >= r) return;
        const m = (l+r)>>1; sort(l, m); sort(m+1, r);
        let jl=l, jr=l;
        for (let k=m+1;k<=r;k++) {
            const lo = pre[k] - BigInt(upper), hi = pre[k] - BigInt(lower);
            while (jl<=m && pre[jl] < lo) jl++;
            while (jr<=m && pre[jr] <= hi) jr++;
            ans += jr - jl;
        }
        const tmp = []; let p=l, q=m+1, t=0;
        while (p<=m && q<=r) tmp[t++] = pre[p] <= pre[q] ? pre[p++] : pre[q++];
        while (p<=m) tmp[t++] = pre[p++];
        while (q<=r) tmp[t++] = pre[q++];
        for (let x=0;x<tmp.length;x++) pre[l+x] = tmp[x];
    };
    sort(0, nums.length);
    return ans;
};
```

::::::

**复杂度：** 时间 `O(n log n)`，空间 `O(n)`。

## 三、总结

`315 计算右侧小于当前元素` 的进阶版：归并排序中双指针统计「左半中落在 `[pre[i]-upper, pre[i]-lower]` 的个数」。前缀和必须用 `long/BigInt` 防溢出。也可用 **树状数组 + 离散化** 做（把前缀和、±边界全离散化后查询区间个数）。核心一致：固定右端点，数左端满足条件的个数。
