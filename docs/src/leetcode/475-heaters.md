# [475. 供暖器](https://leetcode.cn/problems/heaters/)

## 一、题目描述

冬季城市要在房屋处供暖。给定房屋位置数组 `houses` 和供暖器位置数组 `heaters`，供暖器的供暖半径 `r` 相同，且可覆盖距离 $\le r$ 内的所有房屋。求最小的 `r` 使得所有房屋都被供暖。

**示例 1：**

```
输入：houses = [1,2,3], heaters = [2]
输出：1
```

**示例 2：**

```
输入：houses = [1,2,3,4], heaters = [1,4]
输出：1
```

**提示：**

- `1 <= houses.length, heaters.length <= 3 * 10^4`
- `1 <= houses[i], heaters[i] <= 10^9`

## 二、解答方法

### 2.1 方法一：二分半径 + 校验

1. 思路

答案 `r` 的范围 `[0, max(距离)]`。对候选 `r`，排序 `heaters`，检查每个房屋是否被某个供暖器覆盖（找最近供暖器距离 $\le r$）。可二分也可直接贪心：对每个房屋找最近供暖器距离，取最大值即最小半径。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findRadius(int[] houses, int[] heaters) {
        Arrays.sort(heaters);
        int ans = 0;
        for (int h : houses) {
            int idx = Arrays.binarySearch(heaters, h);
            if (idx < 0) idx = -(idx + 1);
            int d1 = idx > 0 ? h - heaters[idx - 1] : Integer.MAX_VALUE;
            int d2 = idx < heaters.length ? heaters[idx] - h : Integer.MAX_VALUE;
            ans = Math.max(ans, Math.min(d1, d2));
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findRadius(self, houses: List[int], heaters: List[int]) -> int:
        import bisect
        heaters.sort()
        ans = 0
        for h in houses:
            j = bisect.bisect_left(heaters, h)
            d1 = h - heaters[j - 1] if j > 0 else inf
            d2 = heaters[j] - h if j < len(heaters) else inf
            ans = max(ans, min(d1, d2))
        return ans
```

```cpp [C++]
class Solution {
public:
    int findRadius(vector<int>& houses, vector<int>& heaters) {
        sort(heaters.begin(), heaters.end());
        int ans = 0;
        for (int h : houses) {
            auto it = lower_bound(heaters.begin(), heaters.end(), h);
            int d1 = it != heaters.begin() ? h - *prev(it) : INT_MAX;
            int d2 = it != heaters.end() ? *it - h : INT_MAX;
            ans = max(ans, min(d1, d2));
        }
        return ans;
    }
};
```

```go [Go]
func findRadius(houses []int, heaters []int) int {
	sort.Ints(heaters)
	ans := 0
	for _, h := range houses {
		j := sort.SearchInts(heaters, h)
		d1, d2 := 1<<31, 1<<31
		if j > 0 {
			d1 = h - heaters[j-1]
		}
		if j < len(heaters) {
			d2 = heaters[j] - h
		}
		d := d1
		if d2 < d {
			d = d2
		}
		if d > ans {
			ans = d
		}
	}
	return ans
}
```

```javascript [JavaScript]
var findRadius = function (houses, heaters) {
    heaters.sort((a, b) => a - b);
    let ans = 0;
    for (const h of houses) {
        let lo = 0, hi = heaters.length, j = heaters.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (heaters[mid] >= h) j = mid, hi = mid;
            else lo = mid + 1;
        }
        const d1 = j > 0 ? h - heaters[j - 1] : Infinity;
        const d2 = j < heaters.length ? heaters[j] - h : Infinity;
        ans = Math.max(ans, Math.min(d1, d2));
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O((n + m) \log m)$。
- 空间复杂度：$O(1)$。

## 三、总结

「每个点取最近设施距离，全局取最大」是覆盖半径问题的标准解法（亦可二分半径）。相关题目：410 分割数组最大值、475 本身、253。
