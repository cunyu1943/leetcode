# [321. 拼接最大数](https://leetcode.cn/problems/create-maximum-number/)

## 一、题目描述

给定两个长度分别为 `m`、`n` 的数组 `nums1`、`nums2`（元素 `0~9`），以及整数 `k`。从两个数组中总共选取 `k` 个数字（保持各自相对顺序）拼接成一个新数，求能组成的最大数（以数组返回）。`k` 在 `max(0, ...)` 到 `m+n` 之间。

**示例：**
```
输入：nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
输出：[9,8,6,5,3]
```

**提示：** `1 <= m, n <= 500`，`0 <= k <= m+n`。

## 二、解答方法

### 方法一：拆分 + 单调栈 + 合并

**思路：** 枚举从 `nums1` 取 `i` 个、从 `nums2` 取 `k-i` 个（`i` 合法范围），分别用「保持相对顺序的最大子序列」函数 `maxSub(seq, x)`（单调栈，删 `len-x` 个使最大），再用「合并两个序列取字典序最大」`merge(a,b)`，比较所有组合取最优。

:::::: code-group

```java [Java]
class Solution {
    public int[] maxNumber(int[] nums1, int[] nums2, int k) {
        int m = nums1.length, n = nums2.length;
        int[] best = new int[k];
        for (int i = Math.max(0, k-n); i <= Math.min(k, m); i++) {
            int[] sub1 = maxSub(nums1, i);
            int[] sub2 = maxSub(nums2, k - i);
            int[] cand = merge(sub1, sub2);
            if (greater(cand, 0, best, 0)) best = cand;
        }
        return best;
    }
    int[] maxSub(int[] nums, int k) {
        int[] res = new int[k]; int j = 0, drop = nums.length - k;
        for (int x : nums) {
            while (j > 0 && res[j-1] < x && drop > 0) { j--; drop--; }
            if (j < k) res[j++] = x;
        }
        return res;
    }
    int[] merge(int[] a, int[] b) {
        int[] res = new int[a.length + b.length]; int i=0,j=0,p=0;
        while (i<a.length || j<b.length) {
            if (greater(a, i, b, j)) res[p++] = a[i++]; else res[p++] = b[j++];
        }
        return res;
    }
    boolean greater(int[] a, int i, int[] b, int j) {
        while (i<a.length && j<b.length && a[i]==b[j]) { i++; j++; }
        return j==b.length || (i<a.length && a[i]>b[j]);
    }
}
```

```python [Python]
class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        def maxSub(nums, kk):
            res = []; drop = len(nums) - kk
            for x in nums:
                while res and res[-1] < x and drop > 0: res.pop(); drop -= 1
                if len(res) < kk: res.append(x)
            return res
        def greater(a, i, b, j):
            while i < len(a) and j < len(b) and a[i] == b[j]: i += 1; j += 1
            return j == len(b) or (i < len(a) and a[i] > b[j])
        def merge(a, b):
            res, i, j = [], 0, 0
            while i < len(a) or j < len(b):
                if greater(a, i, b, j): res.append(a[i]); i += 1
                else: res.append(b[j]); j += 1
            return res
        m, n = len(nums1), len(nums2)
        best = []
        for i in range(max(0, k-n), min(k, m)+1):
            cand = merge(maxSub(nums1, i), maxSub(nums2, k-i))
            if greater(cand, 0, best, 0): best = cand
        return best
```

```cpp [C++]
class Solution {
public:
    vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
        int m=nums1.size(), n=nums2.size();
        vector<int> best(k, 0);
        auto greater=[&](vector<int>& a,int i,vector<int>& b,int j){
            while(i<a.size()&&j<b.size()&&a[i]==b[j]){i++;j++;}
            return j==b.size()||(i<a.size()&&a[i]>b[j]);
        };
        auto maxSub=[&](vector<int>& nums,int kk){
            vector<int> res; int drop=nums.size()-kk;
            for(int x:nums){ while(res.size()&&res.back()<x&&drop>0){res.pop_back();drop--;} if(res.size()<kk)res.push_back(x);} return res;
        };
        auto merge=[&](vector<int>& a,vector<int>& b){
            vector<int> res; int i=0,j=0;
            while(i<a.size()||j<b.size()){ if(greater(a,i,b,j))res.push_back(a[i++]); else res.push_back(b[j++]); } return res;
        };
        for(int i=max(0,k-n);i<=min(k,m);i++){
            vector<int> cand=merge(maxSub(nums1,i),maxSub(nums2,k-i));
            if(greater(cand,0,best,0)) best=cand;
        }
        return best;
    }
};
```

```go [Go]
func maxNumber(nums1, nums2 []int, k int) []int {
    m, n := len(nums1), len(nums2)
    greater := func(a []int, i int, b []int, j int) bool {
        for i < len(a) && j < len(b) && a[i] == b[j] { i++; j++ }
        return j == len(b) || (i < len(a) && a[i] > b[j])
    }
    maxSub := func(nums []int, kk int) []int {
        res := []int{}; drop := len(nums)-kk
        for _, x := range nums {
            for len(res) > 0 && res[len(res)-1] < x && drop > 0 { res = res[:len(res)-1]; drop-- }
            if len(res) < kk { res = append(res, x) }
        }
        return res
    }
    merge := func(a, b []int) []int {
        res := []int{}; i, j := 0, 0
        for i < len(a) || j < len(b) {
            if greater(a, i, b, j) { res = append(res, a[i]); i++ } else { res = append(res, b[j]); j++ }
        }
        return res
    }
    best := []int{}
    for i := max(0, k-n); i <= min(m, k); i++ {
        cand := merge(maxSub(nums1, i), maxSub(nums2, k-i))
        if greater(cand, 0, best, 0) { best = cand }
    }
    return best
}
func max(a, b int) int { if a > b { return a }; return b }
func min(a, b int) int { if a < b { return a }; return b }
```

```js [JavaScript]
var maxNumber = function (nums1, nums2, k) {
    const greater = (a, i, b, j) => {
        while (i < a.length && j < b.length && a[i] === b[j]) { i++; j++; }
        return j === b.length || (i < a.length && a[i] > b[j]);
    };
    const maxSub = (nums, kk) => {
        const res = []; let drop = nums.length - kk;
        for (const x of nums) {
            while (res.length && res[res.length-1] < x && drop > 0) { res.pop(); drop--; }
            if (res.length < kk) res.push(x);
        }
        return res;
    };
    const merge = (a, b) => {
        const res = []; let i=0, j=0;
        while (i < a.length || j < b.length) { if (greater(a, i, b, j)) res.push(a[i++]); else res.push(b[j++]); }
        return res;
    };
    let best = [];
    for (let i = Math.max(0, k-nums2.length); i <= Math.min(k, nums1.length); i++) {
        const cand = merge(maxSub(nums1, i), maxSub(nums2, k-i));
        if (greater(cand, 0, best, 0)) best = cand;
    }
    return best;
};
```

::::::

**复杂度：** 时间 `O(k·(m+n)·k)` 量级（枚举 i 次，每次 merge `O(m+n)`、比较 `O(k)`），空间 `O(k)`。

## 三、总结

经典「拼接最大数」：分解为①各自取最大子序列（单调栈，删 `len-k` 个）②两序列按字典序（逐位取大，相等时看后续）合并。难点在 `merge` 的字典序比较（相等要往后看谁更大）。是 `316` 单调栈 + 归并思想的综合。注意边界：`i` 范围受两数组长度约束。
