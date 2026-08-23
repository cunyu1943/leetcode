# [LCR 039. 柱状图中最大的矩形](https://leetcode.cn/problems/0ynMMM/)



## 一、题目描述

给定 *n* 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。



**示例 1：**

```
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
```

**示例 2：**

```
输入：heights = [2,4]
输出：4
```

**提示：**

- `1 <= heights.length <= 10⁵`
- `0 <= heights[i] <= 10⁴`



## 二、解答方法

### 2.1 方法一：单调栈（求左右边界）

1. **思路**

对每根柱子 `i`，以它作为矩形高度时，矩形的宽由「左侧第一个比它矮的柱子」和「右侧第一个比它矮的柱子」决定。用单调递增栈一次遍历求出左右边界：

- 维护高度单调递增的下标栈；
- 遇到 `heights[i] < heights[栈顶]` 时，栈顶柱子 `j` 的「右侧边界」就是 `i`，而它的「左侧边界」是弹出后新的栈顶，面积 = `heights[j] * (i - 新栈顶 - 1)`；
- 末尾补一根高度 0 的柱子保证所有柱子被弹出。

时间 `O(n)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] h = new int[n + 1];
        System.arraycopy(heights, 0, h, 0, n); // 末尾补 0
        Deque<Integer> stk = new ArrayDeque<>();
        stk.push(-1); // 哨兵，作为左边界兜底
        int ans = 0;
        for (int i = 0; i <= n; i++) {
            while (stk.peek() != -1 && h[i] < h[stk.peek()]) {
                int j = stk.pop();
                int left = stk.peek();
                ans = Math.max(ans, h[j] * (i - left - 1));
            }
            stk.push(i);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        h = heights + [0]
        stk = [-1]
        ans = 0
        for i in range(len(h)):
            while stk[-1] != -1 and h[i] < h[stk[-1]]:
                j = stk.pop()
                left = stk[-1]
                ans = max(ans, h[j] * (i - left - 1))
            stk.append(i)
        return ans
```

```cpp [C++]
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        vector<int> stk;
        stk.push_back(-1);
        int ans = 0;
        for (int i = 0; i < heights.size(); i++) {
            while (stk.back() != -1 && heights[i] < heights[stk.back()]) {
                int j = stk.back();
                stk.pop_back();
                int left = stk.back();
                ans = max(ans, heights[j] * (i - left - 1));
            }
            stk.push_back(i);
        }
        return ans;
    }
};
```

```go [Go]
func largestRectangleArea(heights []int) int {
    h := append(append([]int{}, heights...), 0)
    stk := []int{-1}
    ans := 0
    for i := 0; i < len(h); i++ {
        for stk[len(stk)-1] != -1 && h[i] < h[stk[len(stk)-1]] {
            j := stk[len(stk)-1]
            stk = stk[:len(stk)-1]
            left := stk[len(stk)-1]
            if area := h[j] * (i - left - 1); area > ans {
                ans = area
            }
        }
        stk = append(stk, i)
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    const h = [...heights, 0];
    const stk = [-1];
    let ans = 0;
    for (let i = 0; i < h.length; i++) {
        while (stk[stk.length - 1] !== -1 && h[i] < h[stk[stk.length - 1]]) {
            const j = stk.pop();
            const left = stk[stk.length - 1];
            ans = Math.max(ans, h[j] * (i - left - 1));
        }
        stk.push(i);
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int largestRectangleArea(int* heights, int heightsSize) {
    int n = heightsSize + 1;
    int* h = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < heightsSize; i++) h[i] = heights[i];
    h[heightsSize] = 0;
    int* stk = (int*)malloc((n + 1) * sizeof(int));
    int top = 0;
    stk[top++] = -1;
    int ans = 0;
    for (int i = 0; i < n; i++) {
        while (stk[top - 1] != -1 && h[i] < h[stk[top - 1]]) {
            int j = stk[--top];
            int left = stk[top - 1];
            int area = h[j] * (i - left - 1);
            if (area > ans) ans = area;
        }
        stk[top++] = i;
    }
    free(h);
    free(stk);
    return ans;
}
```

```ts [TypeScript]
function largestRectangleArea(heights: number[]): number {
    const h: number[] = [...heights, 0];
    const stk: number[] = [-1];
    let ans = 0;
    for (let i = 0; i < h.length; i++) {
        while (stk[stk.length - 1] !== -1 && h[i] < h[stk[stk.length - 1]]) {
            const j = stk.pop()!;
            const left = stk[stk.length - 1];
            ans = Math.max(ans, h[j] * (i - left - 1));
        }
        stk.push(i);
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个下标进出栈一次。
- **空间复杂度**：`O(n)`，栈。

### 2.2 方法二：暴力（左右扩展）

1. **思路**

对每根柱子，分别向左右找到第一个比它矮的位置，得到以它为高的矩形宽度。三重循环代价高，这里实现「向左右扩展」的 `O(n²)` 朴素写法，仅作对照理解。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length, ans = 0;
        for (int i = 0; i < n; i++) {
            int l = i, r = i;
            while (l - 1 >= 0 && heights[l - 1] >= heights[i]) l--;
            while (r + 1 < n && heights[r + 1] >= heights[i]) r++;
            ans = Math.max(ans, heights[i] * (r - l + 1));
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n = len(heights)
        ans = 0
        for i in range(n):
            l = r = i
            while l - 1 >= 0 and heights[l - 1] >= heights[i]:
                l -= 1
            while r + 1 < n and heights[r + 1] >= heights[i]:
                r += 1
            ans = max(ans, heights[i] * (r - l + 1))
        return ans
```

```cpp [C++]
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int l = i, r = i;
            while (l - 1 >= 0 && heights[l - 1] >= heights[i]) l--;
            while (r + 1 < n && heights[r + 1] >= heights[i]) r++;
            ans = max(ans, heights[i] * (r - l + 1));
        }
        return ans;
    }
};
```

```go [Go]
func largestRectangleArea(heights []int) int {
    n := len(heights)
    ans := 0
    for i := 0; i < n; i++ {
        l, r := i, i
        for l-1 >= 0 && heights[l-1] >= heights[i] {
            l--
        }
        for r+1 < n && heights[r+1] >= heights[i] {
            r++
        }
        if area := heights[i] * (r - l + 1); area > ans {
            ans = area
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    const n = heights.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        let l = i, r = i;
        while (l - 1 >= 0 && heights[l - 1] >= heights[i]) l--;
        while (r + 1 < n && heights[r + 1] >= heights[i]) r++;
        ans = Math.max(ans, heights[i] * (r - l + 1));
    }
    return ans;
};
```

```c [C]
int largestRectangleArea(int* heights, int heightsSize) {
    int ans = 0;
    for (int i = 0; i < heightsSize; i++) {
        int l = i, r = i;
        while (l - 1 >= 0 && heights[l - 1] >= heights[i]) l--;
        while (r + 1 < heightsSize && heights[r + 1] >= heights[i]) r++;
        int area = heights[i] * (r - l + 1);
        if (area > ans) ans = area;
    }
    return ans;
}
```

```ts [TypeScript]
function largestRectangleArea(heights: number[]): number {
    const n = heights.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        let l = i, r = i;
        while (l - 1 >= 0 && heights[l - 1] >= heights[i]) l--;
        while (r + 1 < n && heights[r + 1] >= heights[i]) r++;
        ans = Math.max(ans, heights[i] * (r - l + 1));
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 单调栈 | `O(n)` | `O(n)` | 最优，推荐 |
| 暴力扩展 | `O(n²)` | `O(1)` | 直观，仅作理解 |

单调栈是「以每根柱子为高求最大宽度」问题的标准解法，借助栈维护高度递增序列，一次遍历确定每根柱子的左右边界。

