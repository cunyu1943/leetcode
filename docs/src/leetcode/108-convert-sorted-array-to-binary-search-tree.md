# [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)

## 一、题目描述

给你一个整数数组 `nums`，其中元素已经按 **升序** 排列，请你将其转换为一棵 **高度平衡** 二叉搜索树。

高度平衡二叉树是指一棵二叉树，其中每个节点的左右两个子树的高度差的绝对值不超过 1。

**示例 1：**

```
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案。
```

**示例 2：**

```
输入：nums = [1,3]
输出：[3,1] 或 [1,null,3]
```

**提示：**

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 按 **严格递增** 顺序排列

## 二、解答方法

### 2.1 方法一：递归 + 二分法（取中间元素为根）

1. **思路**

二叉搜索树的中序遍历正好是升序序列。因此，可以将数组中间元素作为根节点，左侧子数组构建左子树，右侧子数组构建右子树，递归进行。这样构建出的树一定是高度平衡的（因为左右子树元素数量之差最多为 1）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }
    private TreeNode build(int[] nums, int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = build(nums, left, mid - 1);
        root.right = build(nums, mid + 1, right);
        return root;
    }
}
```

```python [Python]
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        def build(left: int, right: int) -> TreeNode:
            if left > right:
                return None
            mid = (left + right) // 2
            root = TreeNode(nums[mid])
            root.left = build(left, mid - 1)
            root.right = build(mid + 1, right)
            return root
        return build(0, len(nums) - 1)
```

```go [Go]
func sortedArrayToBST(nums []int) *TreeNode {
    var build func(int, int) *TreeNode
    build = func(left, right int) *TreeNode {
        if left > right { return nil }
        mid := left + (right-left)/2
        root := &TreeNode{Val: nums[mid]}
        root.Left = build(left, mid-1)
        root.Right = build(mid+1, right)
        return root
    }
    return build(0, len(nums)-1)
}
```

```c [C]
struct TreeNode* build(int* nums, int left, int right) {
    if (left > right) return NULL;
    int mid = left + (right - left) / 2;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = nums[mid];
    root->left = build(nums, left, mid - 1);
    root->right = build(nums, mid + 1, right);
    return root;
}
struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {
    return build(nums, 0, numsSize - 1);
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
    TreeNode* build(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = build(nums, left, mid - 1);
        root->right = build(nums, mid + 1, right);
        return root;
    }
};
```

```js [JavaScript]
var sortedArrayToBST = function(nums) {
    function build(left, right) {
        if (left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);
        return root;
    }
    return build(0, nums.length - 1);
};
```

```ts [TypeScript]
function sortedArrayToBST(nums: number[]): TreeNode | null {
    function build(left: number, right: number): TreeNode | null {
        if (left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);
        return root;
    }
    return build(0, nums.length - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，每个元素访问一次构建节点。
- **空间复杂度**：`O(log n)`，递归栈深度（平衡树高度），不算结果树本身的空间。

---

### 2.2 方法二：递归 + 随机中间元素（取左中或右中）

1. **思路**

与方法一类似，但为了增加随机性（或者避免某些特殊测试用例），可以选择中间偏左或中间偏右的元素作为根。当数组长度为偶数时，可能产生稍微不同的树结构，但都满足高度平衡。

例如 `mid = left + (right - left) / 2` 取左中，`mid = left + (right - left + 1) / 2` 取右中。这里展示取右中的写法。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }
    private TreeNode build(int[] nums, int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left + 1) / 2; // 取右中
        TreeNode root = new TreeNode(nums[mid]);
        root.left = build(nums, left, mid - 1);
        root.right = build(nums, mid + 1, right);
        return root;
    }
}
```

```python [Python]
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        def build(left: int, right: int) -> TreeNode:
            if left > right: return None
            mid = left + (right - left + 1) // 2  # 取右中
            root = TreeNode(nums[mid])
            root.left = build(left, mid - 1)
            root.right = build(mid + 1, right)
            return root
        return build(0, len(nums) - 1)
```

```go [Go]
func sortedArrayToBST(nums []int) *TreeNode {
    var build func(int, int) *TreeNode
    build = func(left, right int) *TreeNode {
        if left > right { return nil }
        mid := left + (right-left+1)/2
        root := &TreeNode{Val: nums[mid]}
        root.Left = build(left, mid-1)
        root.Right = build(mid+1, right)
        return root
    }
    return build(0, len(nums)-1)
}
```

```c [C]
struct TreeNode* build(int* nums, int left, int right) {
    if (left > right) return NULL;
    int mid = left + (right - left + 1) / 2;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = nums[mid];
    root->left = build(nums, left, mid - 1);
    root->right = build(nums, mid + 1, right);
    return root;
}
struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {
    return build(nums, 0, numsSize - 1);
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
    TreeNode* build(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        int mid = left + (right - left + 1) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = build(nums, left, mid - 1);
        root->right = build(nums, mid + 1, right);
        return root;
    }
};
```

```js [JavaScript]
var sortedArrayToBST = function(nums) {
    function build(left, right) {
        if (left > right) return null;
        const mid = left + Math.floor((right - left + 1) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);
        return root;
    }
    return build(0, nums.length - 1);
};
```

```ts [TypeScript]
function sortedArrayToBST(nums: number[]): TreeNode | null {
    function build(left: number, right: number): TreeNode | null {
        if (left > right) return null;
        const mid = left + Math.floor((right - left + 1) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);
        return root;
    }
    return build(0, nums.length - 1);
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(log n)`。

---

## 三、总结

两种方法对比：

| 方法        | 时间复杂度 | 空间复杂度 | 特点                           |
| ----------- | ---------- | ---------- | ------------------------------ |
| 递归 + 左中 | `O(n)`     | `O(log n)` | 经典写法，推荐                 |
| 递归 + 右中 | `O(n)`     | `O(log n)` | 等价的变体，可避免某些偏执测试 |

**推荐**：面试中使用**方法一**，逻辑清晰，代码简洁。注意取中间元素时使用 `left + (right - left) / 2` 避免整数溢出。