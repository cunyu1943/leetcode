# [373. 查找和最小的 K 对数字](https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/)

## 一、题目描述

给定两个升序整数数组 `nums1`（长度 m）和 `nums2`（长度 n），找出和最小的 `k` 对 `(u,v)`（`u∈nums1, v∈nums2`），返回这些数对（任意顺序）。

**示例：**
```
输入：nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出：[[1,2],[1,4],[1,6]]（对应和 3,5,7）
```

**提示：** `1 <= m, n <= 10⁵`，`1 <= k <= m*n`，数组升序。

## 二、解答方法

### 方法一：最小堆（多路归并）

**思路：** 每行 `(i, 0)` 的初值 `nums1[i]+nums2[0]` 入堆（共 m 个起点）。每次弹出堆顶 `(i,j)`，加入结果，并把 `(i, j+1)` 入堆（若 `j+1<n`）。共取 k 次。利用两数组均有序：第 i 行按 j 递增和递增。

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) ->
            (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]));
        for (int i = 0; i < nums1.length && i < k; i++) pq.offer(new int[]{i, 0});
        List<List<Integer>> res = new ArrayList<>();
        while (k-- > 0 && !pq.isEmpty()) {
            int[] cur = pq.poll();
            res.add(List.of(nums1[cur[0]], nums2[cur[1]]));
            if (cur[1] + 1 < nums2.length) pq.offer(new int[]{cur[0], cur[1] + 1});
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        import heapq
        pq = [(nums1[i]+nums2[0], i, 0) for i in range(min(len(nums1), k))]
        heapq.heapify(pq)
        res = []
        while k > 0 and pq:
            s, i, j = heapq.heappop(pq)
            res.append([nums1[i], nums2[j]]); k -= 1
            if j+1 < len(nums2): heapq.heappush(pq, (nums1[i]+nums2[j+1], i, j+1))
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        using T = tuple<int,int,int>;
        priority_queue<T, vector<T>, greater<T>> pq;
        for (int i=0; i<nums1.size() && i<k; i++) pq.push({nums1[i]+nums2[0], i, 0});
        vector<vector<int>> res;
        while (k-- > 0 && !pq.empty()) {
            auto [s,i,j] = pq.top(); pq.pop();
            res.push_back({nums1[i], nums2[j]});
            if (j+1 < nums2.size()) pq.push({nums1[i]+nums2[j+1], i, j+1});
        }
        return res;
    }
};
```

```go [Go]
func kSmallestPairs(nums1, nums2 []int, k int) [][]int {
    type t struct{ s, i, j int }
    pq := make([]t, 0)
    push := func(x t) { pq = append(pq, x); up := func(i int){ for i>0 { p:=(i-1)/2; if pq[p].s<=pq[i].s { break }; pq[p],pq[i]=pq[i],pq[p]; i=p } }; up(len(pq)-1) }
    pop := func() t { top:=pq[0]; pq[0]=pq[len(pq)-1]; pq=pq[:len(pq)-1]; down := func(i int){ for { l:=2*i+1; if l>=len(pq) { break }; if l+1<len(pq) && pq[l+1].s<pq[l].s { l++ }; if pq[i].s<=pq[l].s { break }; pq[i],pq[l]=pq[l],pq[i]; i=l } }; down(0); return top }
    for i := 0; i < len(nums1) && i < k; i++ { push(t{nums1[i]+nums2[0], i, 0}) }
    res := [][]int{}
    for k > 0 && len(pq) > 0 {
        cur := pop(); res = append(res, []int{nums1[cur.i], nums2[cur.j]}); k--
        if cur.j+1 < len(nums2) { push(t{nums1[cur.i]+nums2[cur.j+1], cur.i, cur.j+1}) }
    }
    return res
}
```

```js [JavaScript]
var kSmallestPairs = function (nums1, nums2, k) {
    const pq = [];
    for (let i=0; i<nums1.length && i<k; i++) pq.push({ s: nums1[i]+nums2[0], i, j: 0 });
    pq.sort((a,b)=>a.s-b.s);
    const res = [];
    while (k-- > 0 && pq.length) {
        pq.sort((a,b)=>a.s-b.s);
        const cur = pq.shift();
        res.push([nums1[cur.i], nums2[cur.j]]);
        if (cur.j+1 < nums2.length) pq.push({ s: nums1[cur.i]+nums2[cur.j+1], i: cur.i, j: cur.j+1 });
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(k log m)`（m=min(len1,k)），空间 `O(m)`。

## 三、总结

多路归并（类 `23 合并 K 个升序链表`）：把每行起点入最小堆，每次取最小并扩展同行下一元素。利用两数组已排序的性质。若 k 很大（接近 m·n）可用「二分答案 + 计数」（`O(m log(maxSum))`）。同类：`373` 是 `378 有序矩阵中第 K 小`、`719` 的兄弟题。
