# [LCR 073. 爱吃香蕉的狒狒](https://leetcode.cn/problems/nZZqjQ/)



## 一、题目描述

狒狒喜欢吃香蕉。这里有 `n` 堆香蕉，第 `i` 堆中有 `piles[i]` 根香蕉。警卫已经离开了，将在 `h` 小时后回来。

狒狒可以决定她吃香蕉的速度 `k` （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 `k` 根。如果这堆香蕉少于 `k` 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。

狒狒喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 `h` 小时内吃掉所有香蕉的最小速度 `k`（`k` 为整数）。



**示例 1：**

```
输入：piles = [3,6,7,11], h = 8
输出：4
```

**示例 2：**

```
输入：piles = [30,11,23,4,20], h = 5
输出：30
```

**示例 3：**

```
输入：piles = [30,11,23,4,20], h = 6
输出：23
```

**提示：**

- `1 <= piles.length <= 10⁴`
- `piles.length <= h <= 10⁹`
- `1 <= piles[i] <= 10⁹`



## 二、解答方法

### 2.1 方法一：二分答案

1. **思路**

吃香蕉速度 `k` 越大，吃完所需总时间越小，满足单调性，因此二分 `k`：

- 判断函数 `check(k)`：对每堆 `piles[i]` 需要 `⌈piles[i] / k⌉` 小时，总时间 `≤ h` 则可行；
- 二分范围 `[1, max(piles)]`，找最小可行速度。

时间 `O(n log maxPile)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int l = 1, r = 0;
        for (int p : piles) r = Math.max(r, p);
        while (l < r) {
            int m = l + (r - l) / 2;
            if (canFinish(piles, h, m)) r = m;
            else l = m + 1;
        }
        return l;
    }
    private boolean canFinish(int[] piles, int h, int k) {
        int time = 0;
        for (int p : piles) time += (p + k - 1) / k;
        return time <= h;
    }
}
```

```python [Python]
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        def can(k):
            return sum((p + k - 1) // k for p in piles) <= h
        l, r = 1, max(piles)
        while l < r:
            m = (l + r) // 2
            if can(m):
                r = m
            else:
                l = m + 1
        return l
```

```cpp [C++]
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int l = 1, r = *max_element(piles.begin(), piles.end());
        while (l < r) {
            int m = l + (r - l) / 2;
            long long time = 0;
            for (int p : piles) time += (p + m - 1) / m;
            if (time <= h) r = m;
            else l = m + 1;
        }
        return l;
    }
};
```

```go [Go]
func minEatingSpeed(piles []int, h int) int {
    l, r := 1, 0
    for _, p := range piles {
        if p > r {
            r = p
        }
    }
    for l < r {
        m := l + (r-l)/2
        time := 0
        for _, p := range piles {
            time += (p + m - 1) / m
        }
        if time <= h {
            r = m
        } else {
            l = m + 1
        }
    }
    return l
}
```

```js [JavaScript]
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
    let l = 1, r = Math.max(...piles);
    while (l < r) {
        const m = (l + r) >> 1;
        let time = 0;
        for (const p of piles) time += Math.ceil(p / m);
        if (time <= h) r = m;
        else l = m + 1;
    }
    return l;
};
```

```c [C]
int minEatingSpeed(int* piles, int pilesSize, int h) {
    int l = 1, r = 0;
    for (int i = 0; i < pilesSize; i++) if (piles[i] > r) r = piles[i];
    while (l < r) {
        int m = l + (r - l) / 2;
        long long time = 0;
        for (int i = 0; i < pilesSize; i++) time += (piles[i] + m - 1) / m;
        if (time <= h) r = m;
        else l = m + 1;
    }
    return l;
}
```

```ts [TypeScript]
function minEatingSpeed(piles: number[], h: number): number {
    let l = 1, r = Math.max(...piles);
    while (l < r) {
        const m = (l + r) >> 1;
        let time = 0;
        for (const p of piles) time += Math.ceil(p / m);
        if (time <= h) r = m;
        else l = m + 1;
    }
    return l;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n log maxPile)`，`maxPile` 为最大堆。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 二分答案 | `O(n log maxPile)` | `O(1)` | 标准解法，推荐 |

「最小可行速度」满足单调性（速度越大越可行），是典型的二分答案问题。每堆耗时用 `⌈p/k⌉` 上取整计算，注意累加用 `long` 防溢出。

