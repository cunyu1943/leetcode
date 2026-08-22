# [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)



## 一、题目描述

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。



**示例 1：**

```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
```

**示例 2：**

```
输入：height = [4,2,0,3,2,5]
输出：9
```

**提示：**

-   `n == height.length`
-   `1 <= n <= 2 * 10^4`
-   `0 <= height[i] <= 10^5`



## 二、解答方法

### 2.1 方法一：动态规划（预处理左右最大值）

1. **思路**

位置 `i` 能接的雨水量 = `min(左侧最高, 右侧最高) - height[i]`（若为正）。

-   预处理 `leftMax[i]`：位置 `i` 及其左边的最大高度；
-   预处理 `rightMax[i]`：位置 `i` 及其右边的最大高度；
-   逐位置累加 `min(leftMax[i], rightMax[i]) - height[i]`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n == 0) return 0;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans += Math.min(leftMax[i], rightMax[i]) - height[i];
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def trap(self, height: List[int]) -> int:
        n = len(height)
        if n == 0:
            return 0
        left_max = [0] * n
        right_max = [0] * n
        left_max[0] = height[0]
        for i in range(1, n):
            left_max[i] = max(left_max[i - 1], height[i])
        right_max[n - 1] = height[n - 1]
        for i in range(n - 2, -1, -1):
            right_max[i] = max(right_max[i + 1], height[i])
        ans = 0
        for i in range(n):
            ans += min(left_max[i], right_max[i]) - height[i]
        return ans
```

```go [Go]
func trap(height []int) int {
    n := len(height)
    if n == 0 {
        return 0
    }
    leftMax := make([]int, n)
    rightMax := make([]int, n)
    leftMax[0] = height[0]
    for i := 1; i < n; i++ {
        if height[i] > leftMax[i-1] {
            leftMax[i] = height[i]
        } else {
            leftMax[i] = leftMax[i-1]
        }
    }
    rightMax[n-1] = height[n-1]
    for i := n - 2; i >= 0; i-- {
        if height[i] > rightMax[i+1] {
            rightMax[i] = height[i]
        } else {
            rightMax[i] = rightMax[i+1]
        }
    }
    ans := 0
    for i := 0; i < n; i++ {
        if leftMax[i] < rightMax[i] {
            ans += leftMax[i] - height[i]
        } else {
            ans += rightMax[i] - height[i]
        }
    }
    return ans
}
```

```c [C]
int trap(int* height, int heightSize) {
    if (heightSize == 0) return 0;
    int* leftMax = (int*)malloc(sizeof(int) * heightSize);
    int* rightMax = (int*)malloc(sizeof(int) * heightSize);
    leftMax[0] = height[0];
    for (int i = 1; i < heightSize; i++) {
        leftMax[i] = height[i] > leftMax[i - 1] ? height[i] : leftMax[i - 1];
    }
    rightMax[heightSize - 1] = height[heightSize - 1];
    for (int i = heightSize - 2; i >= 0; i--) {
        rightMax[i] = height[i] > rightMax[i + 1] ? height[i] : rightMax[i + 1];
    }
    int ans = 0;
    for (int i = 0; i < heightSize; i++) {
        int m = leftMax[i] < rightMax[i] ? leftMax[i] : rightMax[i];
        ans += m - height[i];
    }
    free(leftMax);
    free(rightMax);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) return 0;
        vector<int> leftMax(n), rightMax(n);
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) leftMax[i] = max(leftMax[i - 1], height[i]);
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) rightMax[i] = max(rightMax[i + 1], height[i]);
        int ans = 0;
        for (int i = 0; i < n; i++) ans += min(leftMax[i], rightMax[i]) - height[i];
        return ans;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const n = height.length;
    if (n === 0) return 0;
    const leftMax = new Array(n), rightMax = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    let ans = 0;
    for (let i = 0; i < n; i++) ans += Math.min(leftMax[i], rightMax[i]) - height[i];
    return ans;
};
```

```ts [TypeScript]
function trap(height: number[]): number {
    const n = height.length;
    if (n === 0) return 0;
    const leftMax: number[] = new Array(n);
    const rightMax: number[] = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    let ans = 0;
    for (let i = 0; i < n; i++) ans += Math.min(leftMax[i], rightMax[i]) - height[i];
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，三次线性扫描。
- **空间复杂度**：`O(n)`，两个辅助数组。

### 2.2 方法二：双指针（空间优化）

1. **思路**

不用预处理整个数组。用 `left`、`right` 从两端向中间逼近，同时维护 `leftMax`、`rightMax`：

-   若 `height[left] < height[right]`，左侧瓶颈更可能是 `leftMax`，累加 `leftMax - height[left]` 并右移 `left`；
-   否则处理右侧、左移 `right`。

2. **代码实现**

::::: code-group

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
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    ans += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    ans += right_max - height[right]
                right -= 1
        return ans
```

```go [Go]
func trap(height []int) int {
    left, right := 0, len(height)-1
    leftMax, rightMax, ans := 0, 0, 0
    for left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax {
                leftMax = height[left]
            } else {
                ans += leftMax - height[left]
            }
            left++
        } else {
            if height[right] >= rightMax {
                rightMax = height[right]
            } else {
                ans += rightMax - height[right]
            }
            right--
        }
    }
    return ans
}
```

```c [C]
int trap(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
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

```js [JavaScript]
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
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

```ts [TypeScript]
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

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，一次线性扫描。
- **空间复杂度**：`O(1)`，仅用常数变量。

### 2.3 方法三：单调栈

1. **思路**

用单调递减栈维护「可能的凹槽左壁」。遍历柱子：

-   当 `height[i] > 栈顶` 时，栈顶即为凹槽底，弹出一个作为 `bottom`，新的栈顶为左壁 `left`；
-   宽为 `i - left - 1`，高为 `min(height[left], height[i]) - bottom`，累加水量。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int trap(int[] height) {
        Deque<Integer> stack = new ArrayDeque<>();
        int ans = 0;
        for (int i = 0; i < height.length; i++) {
            while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
                int bottom = stack.pop();
                if (stack.isEmpty()) break;
                int left = stack.peek();
                int w = i - left - 1;
                int h = Math.min(height[left], height[i]) - height[bottom];
                ans += w * h;
            }
            stack.push(i);
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def trap(self, height: List[int]) -> int:
        stack = []
        ans = 0
        for i, h in enumerate(height):
            while stack and h > height[stack[-1]]:
                bottom = stack.pop()
                if not stack:
                    break
                left = stack[-1]
                w = i - left - 1
                hh = min(height[left], h) - height[bottom]
                ans += w * hh
            stack.append(i)
        return ans
```

```go [Go]
func trap(height []int) int {
    stack := []int{}
    ans := 0
    for i, h := range height {
        for len(stack) > 0 && h > height[stack[len(stack)-1]] {
            bottom := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            if len(stack) == 0 {
                break
            }
            left := stack[len(stack)-1]
            w := i - left - 1
            hh := min(height[left], h) - height[bottom]
            ans += w * hh
        }
        stack = append(stack, i)
    }
    return ans
}
```

```c [C]
int trap(int* height, int heightSize) {
    int* stack = (int*)malloc(sizeof(int) * heightSize);
    int top = 0, ans = 0;
    for (int i = 0; i < heightSize; i++) {
        while (top > 0 && height[i] > height[stack[top - 1]]) {
            int bottom = stack[top - 1];
            top--;
            if (top == 0) break;
            int left = stack[top - 1];
            int w = i - left - 1;
            int hh = (height[left] < height[i] ? height[left] : height[i]) - height[bottom];
            ans += w * hh;
        }
        stack[top++] = i;
    }
    free(stack);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int trap(vector<int>& height) {
        vector<int> stack;
        int ans = 0;
        for (int i = 0; i < height.size(); i++) {
            while (!stack.empty() && height[i] > height[stack.back()]) {
                int bottom = stack.back();
                stack.pop_back();
                if (stack.empty()) break;
                int left = stack.back();
                int w = i - left - 1;
                int h = min(height[left], height[i]) - height[bottom];
                ans += w * h;
            }
            stack.push_back(i);
        }
        return ans;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const stack = [];
    let ans = 0;
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const bottom = stack.pop();
            if (stack.length === 0) break;
            const left = stack[stack.length - 1];
            const w = i - left - 1;
            const h = Math.min(height[left], height[i]) - height[bottom];
            ans += w * h;
        }
        stack.push(i);
    }
    return ans;
};
```

```ts [TypeScript]
function trap(height: number[]): number {
    const stack: number[] = [];
    let ans = 0;
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const bottom = stack.pop()!;
            if (stack.length === 0) break;
            const left = stack[stack.length - 1];
            const w = i - left - 1;
            const h = Math.min(height[left], height[i]) - height[bottom];
            ans += w * h;
        }
        stack.push(i);
    }
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素进栈出栈各一次。
- **空间复杂度**：`O(n)`，栈最多存 `n` 个元素。

## 三、总结

接雨水的本质是「每个位置能盛的水由其左右最高柱的较小值决定」。三种主流解法中，**双指针法** 空间 `O(1)` 最优；动态规划最易理解但有 `O(n)` 额外空间；单调栈按凹槽逐段计算，适合理解「栈在数组问题」中的应用。面试推荐双指针法。
两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（预处理左右最大值） | `O(n)` | `O(n)` | 思路清晰，易推导 |
| 双指针（空间优化） | `O(n)` | `O(1)` | 空间紧凑，常为常数级 |
| 单调栈 | `O(n)` | `O(n)` | 常规实现 |

