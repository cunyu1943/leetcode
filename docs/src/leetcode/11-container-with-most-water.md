# [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)



## 一、题目描述

给定一个长度为 `n` 的整数数组 `height`。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])`。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：**你不能倾斜容器。



**示例 1：**

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

**提示：**

-   `n == height.length`
-   `2 <= n <= 10^5`
-   `0 <= height[i] <= 10^4`



## 二、解答方法

### 2.1 方法一：双指针（贪心）

1. **思路**

容器盛水量由「较短的那条线」和「两线间距」决定：`area = min(height[left], height[right]) * (right - left)`。

用双指针 `left`、`right` 分别指向首尾：

-   计算当前面积并更新最大值；
-   每次移动**较矮**的那一端：因为若移动较高的一端，宽度变小而高度仍受较矮端限制，面积必然减小；移动较矮端才可能找到更高的线、获得更大面积。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxArea;
    }
}
```

```python [Python]
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_area = 0
        while left < right:
            h = min(height[left], height[right])
            max_area = max(max_area, h * (right - left))
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_area
```

```go [Go]
func maxArea(height []int) int {
    left, right := 0, len(height)-1
    maxArea := 0
    for left < right {
        h := height[left]
        if height[right] < h {
            h = height[right]
        }
        if area := h * (right - left); area > maxArea {
            maxArea = area
        }
        if height[left] < height[right] {
            left++
        } else {
            right--
        }
    }
    return maxArea
}
```

```c [C]
int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int maxArea = 0;
    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = h * (right - left);
        if (area > maxArea) maxArea = area;
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxArea;
}
```

```cpp [C++]
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxArea = 0;
        while (left < right) {
            int h = min(height[left], height[right]);
            maxArea = max(maxArea, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxArea;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxArea;
};
```

```ts [TypeScript]
function maxArea(height: number[]): number {
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxArea;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，双指针各遍历数组一次。
- **空间复杂度**：`O(1)`，只使用常数个变量。

### 2.2 方法二：暴力枚举（仅作对比）

1. **思路**

枚举所有可能的两条线组合 `(i, j)`，计算面积取最大。虽然直观但超时，仅用于理解问题下界。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int n = height.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int h = Math.min(height[i], height[j]);
                maxArea = Math.max(maxArea, h * (j - i));
            }
        }
        return maxArea;
    }
}
```

```python [Python]
class Solution:
    def maxArea(self, height: List[int]) -> int:
        n = len(height)
        max_area = 0
        for i in range(n):
            for j in range(i + 1, n):
                h = min(height[i], height[j])
                max_area = max(max_area, h * (j - i))
        return max_area
```

```go [Go]
func maxArea(height []int) int {
    n := len(height)
    maxArea := 0
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            h := height[i]
            if height[j] < h {
                h = height[j]
            }
            area := h * (j - i)
            if area > maxArea {
                maxArea = area
            }
        }
    }
    return maxArea
}
```

```c [C]
int maxArea(int* height, int heightSize) {
    int maxArea = 0;
    for (int i = 0; i < heightSize; i++) {
        for (int j = i + 1; j < heightSize; j++) {
            int h = height[i] < height[j] ? height[i] : height[j];
            int area = h * (j - i);
            if (area > maxArea) maxArea = area;
        }
    }
    return maxArea;
}
```

```cpp [C++]
class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxArea = 0;
        int n = height.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int h = min(height[i], height[j]);
                maxArea = max(maxArea, h * (j - i));
            }
        }
        return maxArea;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    const n = height.length;
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const h = Math.min(height[i], height[j]);
            maxArea = Math.max(maxArea, h * (j - i));
        }
    }
    return maxArea;
};
```

```ts [TypeScript]
function maxArea(height: number[]): number {
    const n = height.length;
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const h = Math.min(height[i], height[j]);
            maxArea = Math.max(maxArea, h * (j - i));
        }
    }
    return maxArea;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n²)`，枚举所有数对。
- **空间复杂度**：`O(1)`。

## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 双指针（贪心） | `O(n)` | `O(1)` | 思路直观，通常更优 |
| 暴力枚举（仅作对比） | `O(n²)` | `O(1)` | 常规实现 |

