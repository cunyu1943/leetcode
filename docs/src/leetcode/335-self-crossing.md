# [335. 路径交叉](https://leetcode.cn/problems/self-crossing/) [🔒 会员题]

## 一、题目描述

给定一组「连续线段长度」数组 `distance`，你从原点 `(0,0)` 出发，依次：向北 `distance[0]`、向西 `distance[1]`、向南 `distance[2]`、向东 `distance[3]`，然后重复向北、西、南、东……判断是否会出现 **路径自交**。

**示例：**
```
输入：distance = [2,1,1,2]   输出：true（第 4 段向东与第 1 段向北相交）
输入：distance = [1,2,3,4]   输出：false（螺旋向外，不交）
```

**提示：** `1 <= distance.length <= 10⁵`，`1 <= distance[i] <= 10⁵`。

## 二、解答方法

### 方法一：分类讨论边界相交

**思路：** 通过归纳，路径首次相交只可能在第 4、5、6 段与前面相交：
- 第 i 段（i≥3）与 i-3 段相交：`d[i] >= d[i-2]`（向东段跨越向北段）；
- 第 i 段（i≥4）与 i-4 段相交：`d[i-1] <= d[i-3]` 且 `d[i] + d[i-4] >= d[i-2]`（贴着前面一段）；
- 第 i 段（i≥5）与 i-5 段相交：`d[i-2] >= d[i-4]` 且 `d[i-3] <= d[i-1] + d[i-5]` 且 `d[i] + d[i-4] >= d[i-2]`。
任一处成立即返回 true。

:::::: code-group

```java [Java]
class Solution {
    public boolean isSelfCrossing(int[] d) {
        int n = d.length;
        for (int i = 3; i < n; i++) {
            if (d[i] >= d[i-2] && d[i-1] <= d[i-3]) return true;                 // 与 i-3 交
            if (i >= 4 && d[i-1] == d[i-3] && d[i] + d[i-4] >= d[i-2]) return true; // 与 i-4 交
            if (i >= 5 && d[i-2] >= d[i-4] && d[i-3] <= d[i-1] + d[i-5]
                && d[i] + d[i-4] >= d[i-2]) return true;                          // 与 i-5 交
        }
        return false;
    }
}
```

```python [Python]
class Solution:
    def isSelfCrossing(self, d: List[int]) -> bool:
        for i in range(3, len(d)):
            if d[i] >= d[i-2] and d[i-1] <= d[i-3]: return True
            if i >= 4 and d[i-1] == d[i-3] and d[i] + d[i-4] >= d[i-2]: return True
            if i >= 5 and d[i-2] >= d[i-4] and d[i-3] <= d[i-1] + d[i-5] and d[i] + d[i-4] >= d[i-2]: return True
        return False
```

```cpp [C++]
class Solution {
public:
    bool isSelfCrossing(vector<int>& d) {
        for (int i=3;i<d.size();i++){
            if (d[i]>=d[i-2] && d[i-1]<=d[i-3]) return true;
            if (i>=4 && d[i-1]==d[i-3] && d[i]+d[i-4]>=d[i-2]) return true;
            if (i>=5 && d[i-2]>=d[i-4] && d[i-3]<=d[i-1]+d[i-5] && d[i]+d[i-4]>=d[i-2]) return true;
        }
        return false;
    }
};
```

```go [Go]
func isSelfCrossing(distance []int) bool {
    for i := 3; i < len(distance); i++ {
        if distance[i] >= distance[i-2] && distance[i-1] <= distance[i-3] { return true }
        if i >= 4 && distance[i-1] == distance[i-3] && distance[i]+distance[i-4] >= distance[i-2] { return true }
        if i >= 5 && distance[i-2] >= distance[i-4] && distance[i-3] <= distance[i-1]+distance[i-5] && distance[i]+distance[i-4] >= distance[i-2] { return true }
    }
    return false
}
```

```js [JavaScript]
var isSelfCrossing = function (distance) {
    for (let i=3;i<distance.length;i++){
        if (distance[i] >= distance[i-2] && distance[i-1] <= distance[i-3]) return true;
        if (i>=4 && distance[i-1]===distance[i-3] && distance[i]+distance[i-4]>=distance[i-2]) return true;
        if (i>=5 && distance[i-2]>=distance[i-4] && distance[i-3]<=distance[i-1]+distance[i-5] && distance[i]+distance[i-4]>=distance[i-2]) return true;
    }
    return false;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

这是一道「几何归纳」题，首次相交只可能发生在第 i 段与 i-3 / i-4 / i-5 段接触。三种情形对应「直线横跨」「贴边」和「回旋贴边」。无需模拟坐标，直接比较长度即可。面试中属于偏冷门的分类讨论，记住三个不等式条件即可。
