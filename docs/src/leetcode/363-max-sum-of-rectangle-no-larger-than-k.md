# [363. 矩形区域不超过 K 的最大数值和](https://leetcode.cn/problems/max-sum-of-rectangle-no-larger-than-k/)

## 一、题目描述

给定一个 `m × n` 矩阵 `matrix` 和整数 `k`，找出一个矩形子区域，使其元素和 **不超过 k** 且 **最大**。返回该最大和。

**示例：**
```
输入：matrix = [[1,0,1],[0,-2,3]], k = 2
输出：2（选矩形 [0,-2] 或 [1,0,1] 和为 2）
```

**提示：** `1 <= m, n <= 100`，`-100 <= matrix[i][j] <= 100`，`-10⁵ <= k <= 10⁵`。

## 二、解答方法

### 方法一：列压缩 + 前缀和 + 有序集合

**思路：** 枚举上下边界 `(top, bottom)`，把该区间每列压成一维数组 `colSum`。问题变「一维数组中找子数组和 ≤ k 且最大」。对 `colSum` 求前缀和 `pre`，需找 `pre[j] - pre[i] ≤ k` 且尽量大 ⟺ 对固定 `pre[j]` 找 `pre[i] >= pre[j]-k` 的最小 `pre[i]`（有序集合 lower_bound）。用 `TreeSet` 维护前缀和。

:::::: code-group

```java [Java]
class Solution {
    public int maxSumSubmatrix(int[][] matrix, int k) {
        int m = matrix.length, n = matrix[0].length, ans = Integer.MIN_VALUE;
        for (int top = 0; top < m; top++) {
            int[] colSum = new int[n];
            for (int bottom = top; bottom < m; bottom++) {
                for (int c = 0; c < n; c++) colSum[c] += matrix[bottom][c];
                // 一维：找子数组和 <= k 最大
                TreeSet<Integer> set = new TreeSet<>(); set.add(0);
                int pre = 0;
                for (int v : colSum) {
                    pre += v;
                    Integer need = set.ceiling(pre - k);   // pre - need <= k
                    if (need != null) ans = Math.max(ans, pre - need);
                    set.add(pre);
                }
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        import bisect
        m, n = len(matrix), len(matrix[0])
        ans = -10**9
        for top in range(m):
            colSum = [0]*n
            for bottom in range(top, m):
                for c in range(n): colSum[c] += matrix[bottom][c]
                pre = 0; seen = [0]
                for v in colSum:
                    pre += v
                    # 找 pre - need <= k → need >= pre - k，取最小 need
                    i = bisect.bisect_left(seen, pre - k)
                    if i < len(seen): ans = max(ans, pre - seen[i])
                    bisect.insort(seen, pre)
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
        int m=matrix.size(), n=matrix[0].size(), ans=INT_MIN;
        for(int top=0;top<m;top++){
            vector<int> colSum(n,0);
            for(int bottom=top;bottom<m;bottom++){
                for(int c=0;c<n;c++) colSum[c]+=matrix[bottom][c];
                set<int> s; s.insert(0); int pre=0;
                for(int v:colSum){
                    pre+=v;
                    auto it=s.lower_bound(pre-k);
                    if(it!=s.end()) ans=max(ans, pre-*it);
                    s.insert(pre);
                }
            }
        }
        return ans;
    }
};
```

```go [Go]
func maxSumSubmatrix(matrix [][]int, k int) int {
    m, n := len(matrix), len(matrix[0])
    ans := -(1 << 30)
    // 简化较短维遍历（若 n > m 可转置，此处直接枚举行）
    for top := 0; top < m; top++ {
        colSum := make([]int, n)
        for bottom := top; bottom < m; bottom++ {
            for c := 0; c < n; c++ { colSum[c] += matrix[bottom][c] }
            // 有序前缀和（用排序切片近似）
            pre := 0; seen := []int{0}
            for _, v := range colSum {
                pre += v
                // 找 >= pre-k 的最小元素
                lo, hi := 0, len(seen)
                for lo < hi { mid := lo+(hi-lo)/2; if seen[mid] >= pre-k { hi = mid } else { lo = mid+1 } }
                if lo < len(seen) && seen[lo] >= pre-k { if v2 := pre-seen[lo]; v2 > ans { ans = v2 } }
                // 插入保持有序
                pos := lo; if pos > len(seen) { pos = len(seen) }
                seen = append(seen, 0); copy(seen[pos+1:], seen[pos:]); seen[pos] = pre
            }
        }
    }
    return ans
}
```

```js [JavaScript]
var maxSumSubmatrix = function (matrix, k) {
    const m=matrix.length, n=matrix[0].length; let ans=-Infinity;
    for (let top=0; top<m; top++) {
        const colSum = new Array(n).fill(0);
        for (let bottom=top; bottom<m; bottom++) {
            for (let c=0;c<n;c++) colSum[c] += matrix[bottom][c];
            const seen = [0]; let pre=0;
            for (const v of colSum) {
                pre += v;
                // 二分找 >= pre-k 的最小
                let lo=0, hi=seen.length;
                while(lo<hi){ const mid=(lo+hi)>>1; if(seen[mid] >= pre-k) hi=mid; else lo=mid+1; }
                if(lo<seen.length && seen[lo] >= pre-k) ans=Math.max(ans, pre-seen[lo]);
                // 插入有序
                seen.splice(lo,0,pre);
            }
        }
    }
    return ans;
};
```

::::::

**复杂度：** 时间 `O(m² · n log n)`（行边界枚举 + 一维有序集），空间 `O(n)`。

## 三、总结

二维最大子矩阵和 ≤ k 是 `54 最大子数组和`（二维版）的约束扩展。核心：列压缩成一维后，用「有序集合 + lower_bound」在 `O(n log n)` 内找 `pre[i] >= pre[j]-k`。若矩阵列数少可枚举列边界（选较小维枚举省时）。与 `325 和等于 k 最长子数组` 同用前缀和+有序集合思想。注意 `k` 可为负，初始 ans 取极小值。
