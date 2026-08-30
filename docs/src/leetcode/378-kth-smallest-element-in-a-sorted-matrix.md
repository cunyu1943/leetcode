# [378. 有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)

## 一、题目描述

给定一个 `n × n` 矩阵，其中 **每行、每列都按升序排列**。找出其中第 `k` 小的元素（注意不是第 k 个 **不同** 元素，重复计入）。

**示例：**
```
输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
输出：13（第 8 小是 13）
```

**提示：** `n == matrix.length == matrix[i].length`，`1 <= n <= 300`，`1 <= k <= n²`，`-10⁹ <= matrix[i][j] <= 10⁹`。

## 二、解答方法

### 方法一：最小堆（多路归并）

**思路：** 每行升序，把每行起点 `(matrix[i][0], 行 i, 列 0)` 入最小堆（n 个）。每次弹出最小，扩展该行的下一列入堆。取 k 次即第 k 小。

:::::: code-group

```java [Java]
class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int i = 0; i < n; i++) pq.offer(new int[]{matrix[i][0], i, 0});
        while (--k > 0) {
            int[] cur = pq.poll();
            int r = cur[1], c = cur[2];
            if (c + 1 < n) pq.offer(new int[]{matrix[r][c+1], r, c+1});
        }
        return pq.peek()[0];
    }
}
```

```python [Python]
class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        import heapq
        n = len(matrix)
        pq = [(matrix[i][0], i, 0) for i in range(n)]
        heapq.heapify(pq)
        for _ in range(k-1):
            v, r, c = heapq.heappop(pq)
            if c+1 < n: heapq.heappush(pq, (matrix[r][c+1], r, c+1))
        return heapq.heappop(pq)[0]
```

```cpp [C++]
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n=matrix.size();
        using T=tuple<int,int,int>;
        priority_queue<T,vector<T>,greater<T>> pq;
        for(int i=0;i<n;i++) pq.push({matrix[i][0],i,0});
        while(--k){
            auto [v,r,c]=pq.top(); pq.pop();
            if(c+1<n) pq.push({matrix[r][c+1],r,c+1});
        }
        return get<0>(pq.top());
    }
};
```

```go [Go]
func kthSmallest(matrix [][]int, k int) int {
    n := len(matrix)
    type t struct{ v, r, c int }
    pq := make([]t, 0)
    push := func(x t) { pq = append(pq, x); i := len(pq)-1; for i>0 { p:=(i-1)/2; if pq[p].v<=pq[i].v { break }; pq[p],pq[i]=pq[i],pq[p]; i=p } }
    pop := func() t { top:=pq[0]; pq[0]=pq[len(pq)-1]; pq=pq[:len(pq)-1]; i:=0; for { l:=2*i+1; if l>=len(pq){break}; if l+1<len(pq)&&pq[l+1].v<pq[l].v{l++}; if pq[i].v<=pq[l].v{break}; pq[i],pq[l]=pq[l],pq[i]; i=l } }; return top }
    for i := 0; i < n; i++ { push(t{matrix[i][0], i, 0}) }
    for k--; k > 0; k-- { cur := pop(); if cur.c+1 < n { push(t{matrix[cur.r][cur.c+1], cur.r, cur.c+1}) } }
    return pop().v
}
```

```js [JavaScript]
var kthSmallest = function (matrix, k) {
    const n = matrix.length;
    const pq = [];
    for (let i=0;i<n;i++) pq.push({v:matrix[i][0], r:i, c:0});
    pq.sort((a,b)=>a.v-b.v);
    while(--k) {
        pq.sort((a,b)=>a.v-b.v);
        const cur = pq.shift();
        if (cur.c+1 < n) pq.push({v:matrix[cur.r][cur.c+1], r:cur.r, c:cur.c+1});
    }
    return pq.sort((a,b)=>a.v-b.v)[0].v;
};
```

::::::

### 方法二：二分答案（值域二分）

**思路：** 值在 `[matrix[0][0], matrix[n-1][n-1]]`。二分 `mid`，统计矩阵中 `≤ mid` 的元素个数（从右上角出发，`O(n)` 统计：当前值 ≤ mid 则整行该列左侧都 ≤ mid，下移；否则左移）。个数 ≥ k 则缩小右界。

:::::: code-group

```java [Java]
class Solution {
    public int kthSmallest(int[][] m, int k) {
        int n = m.length, lo = m[0][0], hi = m[n-1][n-1];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            int cnt = count(m, mid, n);
            if (cnt < k) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
    int count(int[][] m, int target, int n) {
        int r = 0, c = n-1, cnt = 0;
        while (r < n && c >= 0) {
            if (m[r][c] <= target) { cnt += c+1; r++; }
            else c--;
        }
        return cnt;
    }
}
```

```python [Python]
class Solution:
    def kthSmallest(self, m: List[List[int]], k: int) -> int:
        n = len(m); lo, hi = m[0][0], m[n-1][n-1]
        def count(target):
            r, c, cnt = 0, n-1, 0
            while r < n and c >= 0:
                if m[r][c] <= target: cnt += c+1; r += 1
                else: c -= 1
            return cnt
        while lo < hi:
            mid = (lo+hi)//2
            if count(mid) < k: lo = mid+1
            else: hi = mid
        return lo
```

```cpp [C++]
class Solution {
public:
    int kthSmallest(vector<vector<int>>& m, int k) {
        int n=m.size(), lo=m[0][0], hi=m[n-1][n-1];
        auto count=[&](int t){
            int r=0,c=n-1,cnt=0;
            while(r<n&&c>=0){ if(m[r][c]<=t){cnt+=c+1;r++;} else c--; }
            return cnt;
        };
        while(lo<hi){ int mid=lo+(hi-lo)/2; if(count(mid)<k) lo=mid+1; else hi=mid; }
        return lo;
    }
};
```

```go [Go]
func kthSmallest(m [][]int, k int) int {
    n := len(m); lo, hi := m[0][0], m[n-1][n-1]
    count := func(t int) int { r, c, cnt := 0, n-1, 0; for r<n && c>=0 { if m[r][c] <= t { cnt += c+1; r++ } else { c-- } }; return cnt }
    for lo < hi { mid := lo+(hi-lo)/2; if count(mid) < k { lo = mid+1 } else { hi = mid } }
    return lo
}
```

```js [JavaScript]
var kthSmallest = function (m, k) {
    const n=m.length; let lo=m[0][0], hi=m[n-1][n-1];
    const count = t => { let r=0,c=n-1,cnt=0; while(r<n&&c>=0){ if(m[r][c]<=t){cnt+=c+1;r++;} else c--; } return cnt; };
    while(lo<hi){ const mid=Math.floor(lo+(hi-lo)/2); if(count(mid)<k) lo=mid+1; else hi=mid; }
    return lo;
};
```

::::::

**复杂度：** 堆 `O(k log n)`；二分 `O(n log(range))`，空间 `O(n)` 或 `O(1)`。

## 三、总结

有序矩阵找第 K 小两种主流法：①多路归并（堆，直观）②值域二分 + 行列计数（`O(n log(max-min))`，空间 `O(1)`，更优）。二分法利用「行/列升序」在 `O(n)` 内数出 `≤mid` 的个数。同类：`373 最小 K 对`、`719 第 K 小距离对`（也是二分答案）。
