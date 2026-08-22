# [84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)



## 一、题目描述

给定 `n` 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 `1`。

求在该柱状图中，能够勾勒出来的矩形的最大面积。



**示例 1：**

```
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10 个单位。
```

**示例 2：**

```
输入：heights = [2,4]
输出：4
```

**提示：**

-   `1 <= heights.length <= 10^5`
-   `0 <= heights[i] <= 10^4`



## 二、解答方法

### 2.1 方法一：单调栈（递增）


1. **思路**

维护一个存储下标的递增栈，当遇到更矮的柱子时，弹出栈顶并以它为高计算矩形面积（左右边界由栈中相邻元素决定）。栈底哨兵保证计算完整。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] h = new int[n + 2];
        System.arraycopy(heights, 0, h, 1, n);
        Deque<Integer> st = new ArrayDeque<>();
        int max = 0;
        for (int i = 0; i < n + 2; i++) {
            while (!st.isEmpty() && h[st.peek()] > h[i]) {
                int height = h[st.pop()];
                int width = i - st.peek() - 1;
                max = Math.max(max, height * width);
            }
            st.push(i);
        }
        return max;
    }
}
```

```python [Python]
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        h = [0] + heights + [0]
        st = []
        max_area = 0
        for i, v in enumerate(h):
            while st and h[st[-1]] > v:
                height = h[st.pop()]
                width = i - st[-1] - 1
                max_area = max(max_area, height * width)
            st.append(i)
        return max_area
```

```go [Go]
func largestRectangleArea(heights []int) int {
    h := make([]int, len(heights)+2)
    copy(h[1:], heights)
    st := []int{}
    maxArea := 0
    for i := 0; i < len(h); i++ {
        for len(st) > 0 && h[st[len(st)-1]] > h[i] {
            height := h[st[len(st)-1]]
            st = st[:len(st)-1]
            width := i - st[len(st)-1] - 1
            if height*width > maxArea { maxArea = height * width }
        }
        st = append(st, i)
    }
    return maxArea
}
```

```c [C]
int largestRectangleArea(int* heights, int heightsSize) {
    int* h = (int*)malloc(sizeof(int) * (heightsSize + 2));
    h[0] = 0; h[heightsSize + 1] = 0;
    for (int i = 0; i < heightsSize; i++) h[i + 1] = heights[i];
    int* st = (int*)malloc(sizeof(int) * (heightsSize + 2));
    int top = -1;
    int maxArea = 0;
    for (int i = 0; i < heightsSize + 2; i++) {
        while (top >= 0 && h[st[top]] > h[i]) {
            int height = h[st[top]]; top--;
            int width = i - st[top] - 1;
            if (height * width > maxArea) maxArea = height * width;
        }
        st[++top] = i;
    }
    free(h); free(st);
    return maxArea;
}
```

```cpp [C++]
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        vector<int> h(heights.size() + 2, 0);
        copy(heights.begin(), heights.end(), h.begin() + 1);
        vector<int> st;
        int maxArea = 0;
        for (int i = 0; i < h.size(); i++) {
            while (!st.empty() && h[st.back()] > h[i]) {
                int height = h[st.back()]; st.pop_back();
                int width = i - st.back() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push_back(i);
        }
        return maxArea;
    }
};
```

```javascript [JavaScript]
var largestRectangleArea = function(heights) {
    const h = [0, ...heights, 0];
    const st = [];
    let maxArea = 0;
    for (let i = 0; i < h.length; i++) {
        while (st.length && h[st[st.length - 1]] > h[i]) {
            const height = h[st.pop()];
            const width = i - st[st.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
};
```

```typescript [TypeScript]
function largestRectangleArea(heights: number[]): number {
    const h = [0, ...heights, 0];
    const st: number[] = [];
    let maxArea = 0;
    for (let i = 0; i < h.length; i++) {
        while (st.length && h[st[st.length - 1]] > h[i]) {
            const height = h[st.pop()!];
            const width = i - st[st.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个下标进出栈各一次。
- **空间复杂度**：`O(n)`，栈与辅助数组。

### 2.2 方法二：枚举中心 + 向两侧扩展


1. **思路**

对每个柱子，向左右扩展直到遇到更矮的，计算以它为高的最大矩形。直观但时间复杂度高。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length, max = 0;
        for (int i = 0; i < n; i++) {
            int l = i, r = i;
            while (l >= 0 && heights[l] >= heights[i]) l--;
            while (r < n && heights[r] >= heights[i]) r++;
            max = Math.max(max, heights[i] * (r - l - 1));
        }
        return max;
    }
}
```

```python [Python]
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n, max_area = len(heights), 0
        for i in range(n):
            l = r = i
            while l >= 0 and heights[l] >= heights[i]: l -= 1
            while r < n and heights[r] >= heights[i]: r += 1
            max_area = max(max_area, heights[i] * (r - l - 1))
        return max_area
```

```go [Go]
func largestRectangleArea(heights []int) int {
    n, maxArea := len(heights), 0
    for i := 0; i < n; i++ {
        l, r := i, i
        for l >= 0 && heights[l] >= heights[i] { l-- }
        for r < n && heights[r] >= heights[i] { r++ }
        if heights[i]*(r-l-1) > maxArea { maxArea = heights[i] * (r - l - 1) }
    }
    return maxArea
}
```

```c [C]
int largestRectangleArea(int* heights, int heightsSize) {
    int maxArea = 0;
    for (int i = 0; i < heightsSize; i++) {
        int l = i, r = i;
        while (l >= 0 && heights[l] >= heights[i]) l--;
        while (r < heightsSize && heights[r] >= heights[i]) r++;
        int area = heights[i] * (r - l - 1);
        if (area > maxArea) maxArea = area;
    }
    return maxArea;
}
```

```cpp [C++]
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size(), maxArea = 0;
        for (int i = 0; i < n; i++) {
            int l = i, r = i;
            while (l >= 0 && heights[l] >= heights[i]) l--;
            while (r < n && heights[r] >= heights[i]) r++;
            maxArea = max(maxArea, heights[i] * (r - l - 1));
        }
        return maxArea;
    }
};
```

```javascript [JavaScript]
var largestRectangleArea = function(heights) {
    const n = heights.length;
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        let l = i, r = i;
        while (l >= 0 && heights[l] >= heights[i]) l--;
        while (r < n && heights[r] >= heights[i]) r++;
        maxArea = Math.max(maxArea, heights[i] * (r - l - 1));
    }
    return maxArea;
};
```

```typescript [TypeScript]
function largestRectangleArea(heights: number[]): number {
    const n = heights.length;
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        let l = i, r = i;
        while (l >= 0 && heights[l] >= heights[i]) l--;
        while (r < n && heights[r] >= heights[i]) r++;
        maxArea = Math.max(maxArea, heights[i] * (r - l - 1));
    }
    return maxArea;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，每柱两侧扩展。
- **空间复杂度**：`O(1)`，只用下标。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 单调栈（递增） | `O(n)` | `O(n)` | 最优，面试首选 |
| 枚举中心扩展 | `O(n²)` | `O(1)` | 直观，大数据超时 |
