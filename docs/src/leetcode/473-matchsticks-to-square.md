# [473. 火柴拼正方形](https://leetcode.cn/problems/matchsticks-to-square/)

## 一、题目描述

给定若干根火柴（长度数组 `matchsticks`），每根都要用上，能否拼成一个正方形（四条边长度和相等）？返回能否拼成。

**示例 1：**

```
输入：matchsticks = [1,1,2,2,2]
输出：true
解释：能拼成边长 2 的正方形。
```

**示例 2：**

```
输入：matchsticks = [3,3,3,3,4]
输出：false
```

**提示：**

- `1 <= matchsticks.length <= 15`
- `0 <= matchsticks[i] <= 10^9`

## 二、解答方法

### 2.1 方法一：回溯 + 剪枝（装桶）

1. 思路

若总和不被 4 整除或最大值超过边长，直接 `false`。把每根火柴选入 4 条边之一（维护 `side[4]` 当前长度），回溯搜索。剪枝：火柴从大到小排序、避免把相同长度的火柴放入同一条等价边（跳过重复）、边填满一条即进入下一条。

2. 代码实现（Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total = sum(matchsticks)
        if total % 4:
            return False
        side = total // 4
        if max(matchsticks) > side:
            return False
        matchsticks.sort(reverse=True)
        edges = [0] * 4
        def dfs(i):
            if i == len(matchsticks):
                return True
            for j in range(4):
                if edges[j] + matchsticks[i] <= side:
                    edges[j] += matchsticks[i]
                    if dfs(i + 1):
                        return True
                    edges[j] -= matchsticks[i]
                    # 剪枝：若当前边仍为空，放不下说明后面也放不下；跳过等价边
                    if edges[j] == 0:
                        break
            return False
        return dfs(0)
```

```java [Java]
class Solution {
    public boolean makesquare(int[] m) {
        int sum = 0;
        for (int x : m) sum += x;
        if (sum % 4 != 0) return false;
        int side = sum / 4;
        Arrays.sort(m);
        int[] edges = new int[4];
        return dfs(m.length - 1, m, edges, side);
    }
    boolean dfs(int i, int[] m, int[] edges, int side) {
        if (i < 0) return true;
        for (int j = 0; j < 4; j++) {
            if (edges[j] + m[i] <= side) {
                edges[j] += m[i];
                if (dfs(i - 1, m, edges, side)) return true;
                edges[j] -= m[i];
                if (edges[j] == 0) break;
            }
        }
        return false;
    }
}
```

::::::

3. 复杂度分析

- 时间复杂度：回溯带剪枝，规模 $\le 15$ 可接受。
- 空间复杂度：$O(4)$。

## 三、总结

「均分 4 桶 + 回溯剪枝（排序 + 跳过等价边）」是经典装桶问题。相关题目：698 划分为 k 个相等的子集、473 本身、241 为运算表达式设计优先级。
