# [302. 包含全部黑色像素的最小矩形](https://leetcode.cn/problems/smallest-rectangle-enclosing-black-pixels/) [🔒 会员题]

## 一、题目描述

给你一个 `m × n` 的二进制矩阵 `image`，其中 `0` 表示白色、`1` 表示黑色。先给定一个黑色像素的坐标 `(x, y)`。所有黑色像素相连（4 连通）。求 **恰好包围所有黑色像素的最小矩形** 的面积（即所有黑色像素的最小外接矩形）。

**示例：**
```
输入：image = [[0,0,0],[0,1,0],[0,0,0]], x = 1, y = 1
输出：1
```

**提示：** `m == image.length`, `n == image[i].length`, `1 <= m, n <= 100`，`image[i][j]` 为 0/1，`(x,y)` 一定是黑色像素。

## 二、解答方法

### 方法一：二分查找边界（O(m log n + n log m)）

**思路：** 利用「黑色像素连通且只给一个种子点」性质：最小矩形的上下左右边界，分别是第一个/最后一个含黑像素的行/列。对每行/列用二分判断该行列是否含黑像素（辅助函数 `hasBlack(row/col)`），再在行区间 `[0,m)`、列区间 `[0,n)` 上二分找含黑的最左/最右行、最上/最下列。

:::::: code-group

```java [Java]
class Solution {
    public int minArea(char[][] image, int x, int y) {
        int m = image.length, n = image[0].length;
        int left = bsCol(image, 0, y, true);
        int right = bsCol(image, y, n - 1, false);
        int top = bsRow(image, 0, x, true);
        int bottom = bsRow(image, x, m - 1, false);
        return (right - left + 1) * (bottom - top + 1);
    }
    boolean colHasBlack(char[][] g, int c) {
        for (char[] row : g) if (row[c] == '1') return true;
        return false;
    }
    boolean rowHasBlack(char[][] g, int r) {
        for (char v : g[r]) if (v == '1') return true;
        return false;
    }
    int bsCol(char[][] g, int lo, int hi, boolean first) {
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (colHasBlack(g, mid) == first) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    int bsRow(char[][] g, int lo, int hi, boolean first) {
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (rowHasBlack(g, mid) == first) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
}
```

```python [Python]
class Solution:
    def minArea(self, image: List[List[str]], x: int, y: int) -> int:
        m, n = len(image), len(image[0])
        colHas = lambda c: any(image[r][c] == '1' for r in range(m))
        rowHas = lambda r: any(v == '1' for v in image[r])
        def bs(lo, hi, fn):
            while lo < hi:
                mid = lo + (hi - lo) // 2
                if fn(mid): hi = mid
                else: lo = mid + 1
            return lo
        left = bs(0, y, lambda c: colHas(c))
        right = bs(y, n - 1, lambda c: not colHas(c))
        top = bs(0, x, lambda r: rowHas(r))
        bottom = bs(x, m - 1, lambda r: not rowHas(r))
        return (right - left + 1) * (bottom - top + 1)
```

```cpp [C++]
class Solution {
    int m, n;
    vector<vector<char>> g;
    bool colHas(int c){ for(int r=0;r<m;r++) if(g[r][c]=='1') return true; return false; }
    bool rowHas(int r){ for(int c=0;c<n;c++) if(g[r][c]=='1') return true; return false; }
    int bs(int lo,int hi,bool first,bool isCol){
        while(lo<hi){ int mid=lo+(hi-lo)/2; bool h=isCol?colHas(mid):rowHas(mid); if(h==first) hi=mid; else lo=mid+1; }
        return lo;
    }
public:
    int minArea(vector<vector<char>>& image, int x, int y){
        g=image; m=image.size(); n=image[0].size();
        int left=bs(0,y,true,true), right=bs(y,n-1,false,true);
        int top=bs(0,x,true,false), bottom=bs(x,m-1,false,false);
        return (right-left+1)*(bottom-top+1);
    }
};
```

```go [Go]
func minArea(image [][]byte, x, y int) int {
    m, n := len(image), len(image[0])
    colHas := func(c int) bool { for r := 0; r < m; r++ { if image[r][c] == '1' { return true } }; return false }
    rowHas := func(r int) bool { for c := 0; c < n; c++ { if image[r][c] == '1' { return true } }; return false }
    bs := func(lo, hi int, first, isCol bool) int {
        for lo < hi { mid := lo + (hi-lo)/2; h := false; if isCol { h = colHas(mid) } else { h = rowHas(mid) }; if h == first { hi = mid } else { lo = mid+1 } }; return lo
    }
    left := bs(0, y, true, true); right := bs(y, n-1, false, true)
    top := bs(0, x, true, false); bottom := bs(x, m-1, false, false)
    return (right-left+1)*(bottom-top+1)
}
```

```js [JavaScript]
var minArea = function (image, x, y) {
    const m = image.length, n = image[0].length;
    const colHas = c => image.some(r => r[c] === '1');
    const rowHas = r => image[r].some(v => v === '1');
    const bs = (lo, hi, first, isCol) => {
        while (lo < hi) { const mid = lo + (hi-lo>>1); const h = isCol ? colHas(mid) : rowHas(mid); if (h === first) hi = mid; else lo = mid+1; }
        return lo;
    };
    const left = bs(0, y, true, true), right = bs(y, n-1, false, true);
    const top = bs(0, x, true, false), bottom = bs(x, m-1, false, false);
    return (right-left+1)*(bottom-top+1);
};
```

::::::

**复杂度：** 时间 `O(m log n + n log m)`，空间 `O(1)`。

## 三、总结

利用「种子连通」性质，最小矩形边界 = 含黑像素的最外行列。逐行/列扫描需 `O(mn)`，用二分（配合行列含黑判定）降到 `O(m log n + n log m)`。简单 DFS/BFS 也能做但可能遍历全部像素；二分法在稀疏大图上更优。
