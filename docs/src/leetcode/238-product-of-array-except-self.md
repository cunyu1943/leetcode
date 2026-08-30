# [238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)



## 一、题目描述

给你一个整数数组 `nums`，返回 **数组 `answer`** ，其中 `answer[i]` 等于 `nums` 中除 `nums[i]` 之外其余各元素的乘积 。

题目数据 **保证** 数组 `nums` 中任意元素的 **全部前缀元素和后缀的乘积** 都在 **32 位整数** 范围内。

请 **不要使用除法**，且在 `O(n)` 时间复杂度内完成此题。

**进阶：** 你可以在 `O(1)` 的 **额外空间** 复杂度内完成这个题目吗？（输出数组 **不被视为** 额外空间。）

**示例 1：**

```
输入：nums = [1,2,3,4]
输出：[24,12,8,6]
```

**示例 2：**

```
输入：nums = [-1,1,0,-3,3]
输出：[0,0,9,0,0]
```

**提示：**

-   `2 <= nums.length <= 10⁵`
-   `-30 <= nums[i] <= 30`
-   输入 **保证** 数组 `nums` 中任意元素的 **全部前缀元素和后缀的乘积** 都在 **32 位整数** 范围内



## 二、解答方法

### 2.1 方法一：左右乘积列表（前缀积 + 后缀积）

1. **思路**

`answer[i] = (i 左侧所有元素的乘积) × (i 右侧所有元素的乘积)`。

1. 从左到右遍历，用 `leftProduct` 累积左侧乘积，存入 `answer[i]`；
2. 从右到左遍历，用 `rightProduct` 累积右侧乘积，`answer[i] *= rightProduct`。

两次遍历即可得到结果，**不使用除法**，且可直接在输出数组上操作，额外空间 `O(1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        // 1. 左侧乘积
        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = leftProduct;
            leftProduct *= nums[i];
        }
        // 2. 乘上右侧乘积
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        return answer;
    }
}
```

```python [Python]
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [1] * n
        left = 1
        for i in range(n):
            answer[i] = left
            left *= nums[i]
        right = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= right
            right *= nums[i]
        return answer
```

```go [Go]
func productExceptSelf(nums []int) []int {
    n := len(nums)
    answer := make([]int, n)
    left := 1
    for i := 0; i < n; i++ {
        answer[i] = left
        left *= nums[i]
    }
    right := 1
    for i := n - 1; i >= 0; i-- {
        answer[i] *= right
        right *= nums[i]
    }
    return answer
}
```

```cpp [C++]
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, 1);
        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = leftProduct;
            leftProduct *= nums[i];
        }
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        return answer;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const n = nums.length;
    const answer = new Array(n);
    let left = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = left;
        left *= nums[i];
    }
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= right;
        right *= nums[i];
    }
    return answer;
};
```

```ts [TypeScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const answer = new Array(n);
    let left = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = left;
        left *= nums[i];
    }
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= right;
        right *= nums[i];
    }
    return answer;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（两次遍历）。
- **空间复杂度**：`O(1)`（不计输出数组，满足进阶要求）。

### 2.2 方法二：前缀积数组 + 后缀积数组（O(n) 空间）

1. **思路**

若不用原地优化，可显式开两个数组 `left[]` 和 `right[]`：

- `left[i]` = `nums[0..i-1]` 的乘积（`left[0] = 1`）；
- `right[i]` = `nums[i+1..n-1]` 的乘积（`right[n-1] = 1`）；
- `answer[i] = left[i] * right[i]`。

思路更直白，但多占 `O(n)` 空间。

2. **代码实现（Python）**

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        left = [1] * n
        right = [1] * n
        for i in range(1, n):
            left[i] = left[i - 1] * nums[i - 1]
        for i in range(n - 2, -1, -1):
            right[i] = right[i + 1] * nums[i + 1]
        return [left[i] * right[i] for i in range(n)]
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 空间 |
| ---- | ---- |
| 滚动变量（两次遍历） | `O(1)`，推荐 |
| 前缀积 + 后缀积数组 | `O(n)` |

核心思路：**把「除自身以外的乘积」拆成「左侧乘积 × 右侧乘积」**，从而规避除法（除法在遇到 `0` 时需要特殊处理，且题目明确禁止）。

第一次遍历填「左侧积」，第二次从右往左用滚动变量累乘「右侧积」并就地更新 —— 输出数组不算额外空间，因此满足 `O(1)` 进阶要求。
