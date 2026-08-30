# [495. 提莫攻击](https://leetcode.cn/problems/teemo-attacking/)

## 一、题目描述

提莫攻击艾希，每次攻击使艾希中毒 `duration` 秒。给定一个**升序**的时间数组 `timeSeries`（提莫发起攻击的时间点），计算艾希总共中毒的秒数。

若两次攻击间隔 $\le duration$，中毒时间会**刷新**而非叠加。

**示例 1：**

```
输入：timeSeries = [1,4], duration = 2
输出：4
解释：[1,3] 中毒 2 秒，[4,6] 2 秒，共 4 秒。
```

**示例 2：**

```
输入：timeSeries = [1,2], duration = 2
输出：3
解释：第一次 [1,3]，第二次在 2 刷新，实际中毒到 4，共 [1,4] 3 秒。
```

**提示：**

- `1 <= timeSeries.length <= 10^4`
- `0 <= timeSeries[i], duration <= 10^7`

## 二、解答方法

### 2.1 方法一：相邻间隔求最小

1. 思路

对相邻两次攻击，本次贡献中毒时间为 `min(间隔, duration)`；最后一次贡献 `duration`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findPoisonedDuration(int[] timeSeries, int duration) {
        int ans = 0;
        for (int i = 0; i < timeSeries.length; i++) {
            if (i == timeSeries.length - 1) ans += duration;
            else ans += Math.min(timeSeries[i + 1] - timeSeries[i], duration);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findPoisonedDuration(self, timeSeries: List[int], duration: int) -> int:
        if not timeSeries:
            return 0
        ans = 0
        for i in range(len(timeSeries) - 1):
            ans += min(timeSeries[i + 1] - timeSeries[i], duration)
        return ans + duration
```

```cpp [C++]
class Solution {
public:
    int findPoisonedDuration(vector<int>& timeSeries, int duration) {
        int ans = 0;
        for (int i = 0; i + 1 < timeSeries.size(); i++)
            ans += min(timeSeries[i + 1] - timeSeries[i], duration);
        if (!timeSeries.empty()) ans += duration;
        return ans;
    }
};
```

```go [Go]
func findPoisonedDuration(timeSeries []int, duration int) int {
	ans := 0
	for i := 0; i+1 < len(timeSeries); i++ {
		gap := timeSeries[i+1] - timeSeries[i]
		if gap < duration {
			ans += gap
		} else {
			ans += duration
		}
	}
	if len(timeSeries) > 0 {
		ans += duration
	}
	return ans
}
```

```javascript [JavaScript]
var findPoisonedDuration = function (timeSeries, duration) {
    let ans = 0;
    for (let i = 0; i < timeSeries.length - 1; i++)
        ans += Math.min(timeSeries[i + 1] - timeSeries[i], duration);
    return ans + (timeSeries.length ? duration : 0);
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n)$。
- 空间复杂度：$O(1)$。

## 三、总结

区间合并的简化（不重叠/刷新）。相关题目：252 会议室、56 合并区间、435 无重叠区间。
