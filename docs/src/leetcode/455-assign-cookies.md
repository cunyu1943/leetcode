# [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)

## 一、题目描述

假设你是一位家长，要给孩子分发饼干。每个孩子有一个胃口值 `g[i]`，每块饼干有一个尺寸 `s[j]`。若 `s[j] >= g[i]`，则这块饼干能满足孩子 `i`。每个孩子最多一块饼干。求最多能满足的孩子数量。

**示例 1：**

```
输入：g = [1,2,3], s = [1,1]
输出：1
解释：只有尺寸 1 的饼干满足胃口 1 的孩子。
```

**示例 2：**

```
输入：g = [1,2], s = [1,2,3]
输出：2
```

**提示：**

- `1 <= g.length, s.length <= 3 * 10^4`
- `0 <= g[i], s[j] <= 2^31 - 1`

## 二、解答方法

### 2.1 方法一：贪心（双指针）

1. 思路

把胃口和饼干都升序排序，用最小的能满足当前孩子的饼干去满足他（即「小饼干喂小胃口」），能最大化满足数量。双指针遍历，饼干够则两人都前进，不够则换更大的饼干。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g); Arrays.sort(s);
        int i = 0, j = 0, ans = 0;
        while (i < g.length && j < s.length) {
            if (s[j] >= g[i]) { ans++; i++; j++; }
            else j++;
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort(); s.sort()
        i = j = ans = 0
        while i < len(g) and j < len(s):
            if s[j] >= g[i]:
                ans += 1
                i += 1
            j += 1
        return ans
```

```cpp [C++]
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end()); sort(s.begin(), s.end());
        int i = 0, j = 0, ans = 0;
        while (i < g.size() && j < s.size()) {
            if (s[j] >= g[i]) { ans++; i++; }
            j++;
        }
        return ans;
    }
};
```

```go [Go]
func findContentChildren(g []int, s []int) int {
	sort.Ints(g)
	sort.Ints(s)
	i, j, ans := 0, 0, 0
	for i < len(g) && j < len(s) {
		if s[j] >= g[i] {
			ans++
			i++
		}
		j++
	}
	return ans
}
```

```javascript [JavaScript]
var findContentChildren = function (g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    let i = 0, j = 0, ans = 0;
    while (i < g.length && j < s.length) {
        if (s[j] >= g[i]) { ans++; i++; }
        j++;
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(n \log n + m \log m)$。
- 空间复杂度：$O(1)$（排序原地）。

## 三、总结

「小饼干喂小胃口」是最优贪心，体现局部最优 → 全局最优。相关题目：135 分发糖果、453 最小操作次数、870 优势洗牌。
