# [255. 验证前序遍历序列二叉搜索树](https://leetcode.cn/problems/verify-preorder-sequence-in-binary-search-tree/) [🔒 会员题]



## 一、题目描述

给定一个整数数组 `preorder`，判断它是否是一个 **二叉搜索树** 的 **先序遍历** 序列。

**示例 1：**

```
输入：preorder = [5,2,1,3,6]
输出：true
```

**示例 2：**

```
输入：preorder = [5,2,6,1,3]
输出：false
```

**提示：**

-   `1 <= preorder.length <= 10⁴`
-   `1 <= preorder[i] <= 10⁴`
-   `preorder` 中的值 **互不相同**

**进阶：** 你可以只使用 `O(1)` 的额外空间复杂度解决此问题吗？



## 二、解答方法

### 2.1 方法一：单调栈（O(n) 时间，O(n) 空间）

1. **思路**

BST 前序遍历的性质：序列呈现「下降 → 上升」的锯齿形。当出现 **上升**（当前值大于前一个值）时，说明进入了某个节点的 **右子树**，此后所有元素都必须 **大于** 那个「被转向的节点」。

用 **单调递减栈** + 变量 `lowerBound`（记录当前允许的最小值）：

- 遍历每个值 `x`：
  - 若 `x < lowerBound` → 违反 BST 性质，返回 `false`；
  - 当栈不空且 `x > 栈顶` 时，说明进入右子树，不断弹出栈顶并更新 `lowerBound = 弹出的值`；
  - 把 `x` 压栈。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public boolean verifyPreorder(int[] preorder) {
        Deque<Integer> stack = new ArrayDeque<>();
        int lowerBound = Integer.MIN_VALUE;
        for (int x : preorder) {
            if (x < lowerBound) return false;      // 违反 BST 性质
            while (!stack.isEmpty() && x > stack.peek()) {
                lowerBound = stack.pop();          // 进入右子树，抬高下界
            }
            stack.push(x);
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        stack = []
        lower_bound = float('-inf')
        for x in preorder:
            if x < lower_bound:
                return False
            while stack and x > stack[-1]:
                lower_bound = stack.pop()
            stack.append(x)
        return True
```

```go [Go]
func verifyPreorder(preorder []int) bool {
    stack := []int{}
    lowerBound := math.MinInt32
    for _, x := range preorder {
        if x < lowerBound {
            return false
        }
        for len(stack) > 0 && x > stack[len(stack)-1] {
            lowerBound = stack[len(stack)-1]
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, x)
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    bool verifyPreorder(vector<int>& preorder) {
        stack<int> st;
        int lowerBound = INT_MIN;
        for (int x : preorder) {
            if (x < lowerBound) return false;
            while (!st.empty() && x > st.top()) {
                lowerBound = st.top();
                st.pop();
            }
            st.push(x);
        }
        return true;
    }
};
```

```js [JavaScript]
/**
 * @param {number[]} preorder
 * @return {boolean}
 */
var verifyPreorder = function (preorder) {
    const stack = [];
    let lowerBound = -Infinity;
    for (const x of preorder) {
        if (x < lowerBound) return false;
        while (stack.length && x > stack[stack.length - 1]) {
            lowerBound = stack.pop();
        }
        stack.push(x);
    }
    return true;
};
```

```ts [TypeScript]
/**
 * @param {number[]} preorder
 * @return {boolean}
 */
function verifyPreorder(preorder: number[]): boolean {
    const stack: number[] = [];
    let lowerBound = -Infinity;
    for (const x of preorder) {
        if (x < lowerBound) return false;
        while (stack.length && x > stack[stack.length - 1]) {
            lowerBound = stack.pop()!;
        }
        stack.push(x);
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（每个元素最多入栈出栈各一次）。
- **空间复杂度**：`O(n)`。

### 2.2 方法二：原地复用数组模拟栈（O(1) 额外空间，进阶）

1. **思路**

把输入数组本身当作栈：用 `top` 指向栈顶位置，弹栈只需 `top--`，压栈写入 `preorder[++top] = x`。这样额外空间为 `O(1)`。

2. **代码实现（Python）**

```python
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        top = -1                          # 栈顶下标（复用 preorder 作为栈）
        lower_bound = float('-inf')
        for x in preorder:
            if x < lower_bound:
                return False
            while top >= 0 and x > preorder[top]:
                lower_bound = preorder[top]
                top -= 1
            top += 1
            preorder[top] = x             # 入栈
        return True
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（满足进阶要求）。

### 2.3 方法三：递归分治（按 BST 性质划分区间）

1. **思路**

前序序列第一个元素是根，其后可分为「左子树区间（全部 < 根）」和「右子树区间（全部 > 根）」。递归验证每个区间。

朴素实现最坏 `O(n²)`，可用指针优化到 `O(n)`，但代码较复杂。

2. **代码实现（Python，示意）**

```python
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        def helper(low, high):
            if low >= high:
                return True
            root = preorder[low]
            i = low + 1
            while i <= high and preorder[i] < root:   # 左子树区间
                i += 1
            for j in range(i, high + 1):              # 右子树必须全部 > root
                if preorder[j] < root:
                    return False
            return helper(low + 1, i - 1) and helper(i, high)
        return helper(0, len(preorder) - 1)
```

3. **复杂度分析**

- **时间复杂度**：最坏 `O(n²)`（链状树）。
- **空间复杂度**：`O(n)`（递归栈）。

## 三、总结

| 方法 | 时间 | 额外空间 |
| ---- | ---- | -------- |
| 单调栈 | `O(n)` | `O(n)` |
| 原地模拟栈 | `O(n)` | `O(1)`，进阶 |
| 递归分治 | 最坏 `O(n²)` | `O(n)` |

核心洞察：BST 前序序列中，**一旦开始上升（进入某节点的右子树），后续所有元素都必须大于那个节点**。单调栈正是用来「记住」这些可能成为下界的节点。

`lowerBound` 的含义：当前位置的元素必须 **大于** `lowerBound`，否则说明它出现在了不该出现的左子树位置。
