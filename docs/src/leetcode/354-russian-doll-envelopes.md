# [354. 俄罗斯套娃信封](https://leetcode.cn/problems/russian-doll-envelopes/)

## 一、题目描述

给定一些信封，尺寸 `[w, h]`。一个信封能套进另一个当且仅当 `w` 和 `h` 都 **严格大于** 对方。求最多能套几层（最多能装下多少信封）。

**示例：**
```
输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]
输出：3（[2,3] ⊂ [5,4] ⊂ [6,7]）
```

**提示：** `1 <= envelopes.length <= 10⁵`，`1 <= w, h <= 10⁵`。

## 二、解答方法

### 方法一：排序 + LIS

**思路：** 先按 `w` 升序；`w` 相同则按 `h` **降序**（关键！避免同宽信封被错误地嵌套）。此时问题化为「对 `h` 序列求最长严格递增子序列（LIS）」。因为同宽已降序，LIS 不会在同宽内选多个，保证宽度也严格递增。

:::::: code-group

```java [Java]
class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        Arrays.sort(envelopes, (a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);
        int[] tails = new int[envelopes.length];
        int len = 0;
        for (int[] e : envelopes) {
            int h = e[1], lo = 0, hi = len;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (tails[mid] < h) lo = mid + 1; else hi = mid;
            }
            tails[lo] = h;
            if (lo == len) len++;
        }
        return len;
    }
}
```

```python [Python]
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        envelopes.sort(key=lambda e: (e[0], -e[1]))
        tails = []
        for _, h in envelopes:
            import bisect
            i = bisect.bisect_left(tails, h)
            if i == len(tails): tails.append(h)
            else: tails[i] = h
        return len(tails)
```

```cpp [C++]
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        sort(envelopes.begin(), envelopes.end(), [](auto&a,auto&b){
            return a[0]!=b[0] ? a[0]<b[0] : a[1]>b[1];
        });
        vector<int> tails;
        for (auto& e : envelopes) {
            int h = e[1];
            auto it = lower_bound(tails.begin(), tails.end(), h);
            if (it == tails.end()) tails.push_back(h); else *it = h;
        }
        return tails.size();
    }
};
```

```go [Go]
func maxEnvelopes(envelopes [][]int) int {
    sort.Slice(envelopes, func(i, j int) bool {
        if envelopes[i][0] != envelopes[j][0] { return envelopes[i][0] < envelopes[j][0] }
        return envelopes[i][1] > envelopes[j][1]
    })
    tails := []int{}
    for _, e := range envelopes {
        h := e[1]
        lo, hi := 0, len(tails)
        for lo < hi { mid := lo + (hi-lo)/2; if tails[mid] < h { lo = mid+1 } else { hi = mid } }
        if lo == len(tails) { tails = append(tails, h) } else { tails[lo] = h }
    }
    return len(tails)
}
```

```js [JavaScript]
var maxEnvelopes = function (envelopes) {
    envelopes.sort((a,b)=> a[0]!=b[0] ? a[0]-b[0] : b[1]-a[1]);
    const tails = [];
    for (const [,h] of envelopes) {
        let lo=0, hi=tails.length;
        while (lo<hi){ const mid=lo+((hi-lo)>>1); if (tails[mid]<h) lo=mid+1; else hi=mid; }
        if (lo===tails.length) tails.push(h); else tails[lo]=h;
    }
    return tails.length;
};
```

::::::

**复杂度：** 时间 `O(n log n)`，空间 `O(n)`。

## 三、总结

二维偏序 + LIS 经典。`300 最长递增子序列` 的二维推广：一维排序、一维降序去歧、第三维 LIS。关键 trick：**同宽时高降序**，防止同宽信封被算进同一 LIS（因为嵌套要求宽严格大于）。若还有第三维则变 `354+` 三维偏序（需 CDQ 分治/树状数组）。本题是「排序降维 + LIS」思维的代表。
