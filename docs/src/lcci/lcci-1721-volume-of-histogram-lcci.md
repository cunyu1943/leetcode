# [面试题 17.21. 直方图的水量](https://leetcode.cn/problems/volume-of-histogram-lcci/)

## 一、题目描述

给定一个直方图（也称柱状图），假设直方图中各矩形条的宽度均为 1，高度由整数数组 `heights` 表示。求一场雨后，该直方图能接多少体积的雨水。

**示例：**

```
输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6
```

**解释：** 可接雨水总量为 6 个单位体积（经典接雨水问题）。

---

## 二、解答方法

### 2.1 方法一：双指针（左右最大高度）

**1. 思路**

对于位置 `i`，其能接的雨水量取决于左右两侧的最大高度中的较小值减去 `heights[i]`。用左右指针维护 `leftMax`、`rightMax`，从两侧向中间推进，更新结果。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, ans = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else ans += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else ans += rightMax - height[right];
                right--;
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        left_max = right_max = ans = 0
        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max: left_max = height[left]
                else: ans += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max: right_max = height[right]
                else: ans += right_max - height[right]
                right -= 1
        return ans
```

```go [Go]
func trap(height []int) int {
    left, right := 0, len(height)-1
    leftMax, rightMax, ans := 0, 0, 0
    for left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax { leftMax = height[left] } else { ans += leftMax - height[left] }
            left++
        } else {
            if height[right] >= rightMax { rightMax = height[right] } else { ans += rightMax - height[right] }
            right--
        }
    }
    return ans
}
```

```c [C]
int trap(int* height, int heightSize) {
    int left = 0, right = heightSize - 1, leftMax = 0, rightMax = 0, ans = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else ans += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else ans += rightMax - height[right];
            right--;
        }
    }
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0, ans = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else ans += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else ans += rightMax - height[right];
                right--;
            }
        }
        return ans;
    }
};
```

```javascript [JavaScript]
var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, ans = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else ans += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else ans += rightMax - height[right];
            right--;
        }
    }
    return ans;
};
```

```typescript [TypeScript]
function trap(height: number[]): number {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, ans = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else ans += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else ans += rightMax - height[right];
            right--;
        }
    }
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

---

### 2.2 方法二：前缀/后缀最大高度数组

**1. 思路**

预处理 `leftMax[i]`（左侧最大）与 `rightMax[i]`（右侧最大），对每列累加 `min(leftMax[i], rightMax[i]) - height[i]`。直观但需 `O(n)` 额外空间。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n == 0) return 0;
        int[] leftMax = new int[n], rightMax = new int[n];
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i-1], height[i]);
        rightMax[n-1] = height[n-1];
        for (int i = n-2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i+1], height[i]);
        int ans = 0;
        for (int i = 0; i < n; i++) ans += Math.min(leftMax[i], rightMax[i]) - height[i];
        return ans;
    }
}
```

```python [Python]
class Solution:
    def trap(self, height: List[int]) -> int:
        n = len(height)
        if n == 0: return 0
        left_max = [0]*n; right_max = [0]*n
        left_max[0] = height[0]
        for i in range(1, n): left_max[i] = max(left_max[i-1], height[i])
        right_max[-1] = height[-1]
        for i in range(n-2, -1, -1): right_max[i] = max(right_max[i+1], height[i])
        return sum(min(left_max[i], right_max[i]) - height[i] for i in range(n))
```

```cpp [C++]
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) return 0;
        vector<int> leftMax(n), rightMax(n);
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) leftMax[i] = max(leftMax[i-1], height[i]);
        rightMax[n-1] = height[n-1];
        for (int i = n-2; i >= 0; i--) rightMax[i] = max(rightMax[i+1], height[i]);
        int ans = 0;
        for (int i = 0; i < n; i++) ans += min(leftMax[i], rightMax[i]) - height[i];
        return ans;
    }
};
```

```javascript [JavaScript]
var trap = function(height) {
    const n = height.length;
    if (n === 0) return 0;
    const leftMax = new Array(n), rightMax = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i-1], height[i]);
    rightMax[n-1] = height[n-1];
    for (let i = n-2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i+1], height[i]);
    let ans = 0;
    for (let i = 0; i < n; i++) ans += Math.min(leftMax[i], rightMax[i]) - height[i];
    return ans;
};
```

```typescript [TypeScript]
function trap(height: number[]): number {
    const n = height.length;
    if (n === 0) return 0;
    const leftMax = new Array(n), rightMax = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i-1], height[i]);
    rightMax[n-1] = height[n-1];
    for (let i = n-2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i+1], height[i]);
    let ans = 0;
    for (let i = 0; i < n; i++) ans += Math.min(leftMax[i], rightMax[i]) - height[i];
    return ans;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 双指针         | `O(n)`     | `O(1)`     | 最优，推荐                 |
| 前后缀最大值   | `O(n)`     | `O(n)`     | 直观，易理解               |

**推荐**：使用双指针法，空间 `O(1)`，注意每次推进较小一侧。
