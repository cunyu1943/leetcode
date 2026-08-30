# [370. 区间加法](https://leetcode.cn/problems/range-addition/) [🔒 会员题]

## 一、题目描述

假设你有一个长度为 `n` 的初始全 0 数组 `nums`。给定一个操作列表 `updates`，每个操作 `[start, end, inc]` 表示把 `nums[start..end]` 区间每个元素加 `inc`。返回所有操作执行完后的 `nums`。

**示例：**
```
输入：n = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
输出：[-2,0,3,5,3]
解释：
初始 [0,0,0,0,0]
[1,3,2] → [0,2,2,2,0]
[2,4,3] → [0,2,5,5,3]
[0,2,-2] → [-2,0,3,5,3]
```

**提示：** `0 <= start <= end < n`，`1 <= n <= 10⁵`，`0 <= updates.length <= 10⁴`。

## 二、解答方法

### 方法一：差分数组（O(1) 区间更新）

**思路：** 用差分数组 `diff[i] = nums[i] - nums[i-1]`。区间 `[start,end]` 加 `inc` 等价于 `diff[start] += inc`、`diff[end+1] -= inc`（若 `end+1 < n`）。所有操作处理完，前缀和还原 `nums`。

:::::: code-group

```java [Java]
class Solution {
    public int[] getModifiedArray(int n, int[][] updates) {
        int[] diff = new int[n];
        for (int[] u : updates) {
            diff[u[0]] += u[2];
            if (u[1] + 1 < n) diff[u[1] + 1] -= u[2];
        }
        int[] res = new int[n];
        int cur = 0;
        for (int i = 0; i < n; i++) { cur += diff[i]; res[i] = cur; }
        return res;
    }
}
```

```python [Python]
class Solution:
    def getModifiedArray(self, n: int, updates: List[List[int]]) -> List[int]:
        diff = [0]*n
        for start, end, inc in updates:
            diff[start] += inc
            if end+1 < n: diff[end+1] -= inc
        cur = 0; res = []
        for d in diff: cur += d; res.append(cur)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<int> getModifiedArray(int n, vector<vector<int>>& updates) {
        vector<int> diff(n,0);
        for(auto& u:updates){
            diff[u[0]]+=u[2];
            if(u[1]+1<n) diff[u[1]+1]-=u[2];
        }
        vector<int> res(n); int cur=0;
        for(int i=0;i<n;i++){ cur+=diff[i]; res[i]=cur; }
        return res;
    }
};
```

```go [Go]
func getModifiedArray(n int, updates [][]int) []int {
    diff := make([]int, n)
    for _, u := range updates {
        diff[u[0]] += u[2]
        if u[1]+1 < n { diff[u[1]+1] -= u[2] }
    }
    res := make([]int, n); cur := 0
    for i := 0; i < n; i++ { cur += diff[i]; res[i] = cur }
    return res
}
```

```js [JavaScript]
var getModifiedArray = function (n, updates) {
    const diff = new Array(n).fill(0);
    for (const [start, end, inc] of updates) {
        diff[start] += inc;
        if (end+1 < n) diff[end+1] -= inc;
    }
    const res = new Array(n); let cur = 0;
    for (let i=0;i<n;i++) { cur += diff[i]; res[i] = cur; }
    return res;
};
```

::::::

**复杂度：** 时间 `O(n + k)`（k=操作数），空间 `O(n)`。

## 三、总结

差分数组是「多次区间加减」的标准优化：把 `O(n·k)` 降为 `O(n+k)`。核心 `diff[start]+=inc, diff[end+1]-=inc`，最后前缀和还原。同类：`1094 拼车`（差分数组判断容量）、`1109 航班预订统计`（完全相同的差分数组题，LeetCode 公开版）、`253 会议室 II`（也用差分数组统计重叠）。务必判 `end+1 < n` 防越界。
