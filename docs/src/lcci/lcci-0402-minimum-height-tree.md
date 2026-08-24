# [面试题 04.02. 最小高度树](https://leetcode.cn/problems/minimum-height-tree-lcci/)

## 一、题目描述

给定一个有序整数数组（元素各不相同且按升序排列），编写一个算法，创建一棵高度最小的二叉搜索树。

**示例：**

```
给定有序数组: [-10,-3,0,5,9],
一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

          0
         / \
       -3   9
       /   /
     -10  5
```

**提示：**

- 数组长度在 `[0, 10000]` 范围内。
- 数组元素为整数，且各不相同。

---

## 二、解答方法

### 2.1 方法一：递归（分治法）

**1. 思路**

高度最小的二叉搜索树要求树尽可能平衡，即左右子树节点数相差不超过 1。由于数组已排序，可以选取数组中间元素作为根节点，左半部分递归构建左子树，右半部分递归构建右子树。递归终止条件为区间为空（`left > right`）。此方法时间复杂度 O(n)，空间复杂度 O(log n)（递归栈深度）。

**2. 代码实现**

:::::: code-group

```java [Java]
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
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
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        return self.build(nums, 0, len(nums) - 1)

    def build(self, nums, left, right):
        if left > right:
            return None
        mid = (left + right) // 2
        root = TreeNode(nums[mid])
        root.left = self.build(nums, left, mid - 1)
        root.right = self.build(nums, mid + 1, right)
        return root
```

```go [Go]
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func sortedArrayToBST(nums []int) *TreeNode {
    return build(nums, 0, len(nums)-1)
}
func build(nums []int, left, right int) *TreeNode {
    if left > right {
        return nil
    }
    mid := left + (right-left)/2
    root := &TreeNode{Val: nums[mid]}
    root.Left = build(nums, left, mid-1)
    root.Right = build(nums, mid+1, right)
    return root
}
```

```c [C]
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
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
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
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

```javascript [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
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

```typescript [TypeScript]
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
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

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个元素访问一次。
- **空间复杂度**：`O(log n)`，递归栈深度（平衡树高度）。

---

### 2.2 方法二：迭代（使用栈模拟递归）

**1. 思路**

使用显式栈来模拟递归过程。栈中存储三元组 `(left, right, parent, isLeft)`，其中 `left` 和 `right` 是当前子数组的左右边界，`parent` 是父节点，`isLeft` 表示当前节点是父节点的左孩子（`true`）还是右孩子（`false`）。

1. 若数组为空，返回 `null`。
2. 首先创建根节点（取中间元素），将根节点的左右子区间分别压栈，并指定父节点和方向。
3. 循环处理栈，每次弹出栈顶，创建对应节点，连接到父节点。
4. 若新区间有效，继续将其左右子区间压栈。

此方法避免了递归调用，适合对递归深度有严格要求的场景，时间复杂度 `O(n)`，空间复杂度 `O(log n)`（栈深度为树高）。

**2. 代码实现**

:::::: code-group

```java [Java]
import java.util.*;

class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) return null;
        int n = nums.length;
        int mid = (n - 1) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        // 栈元素：{l, r, parent, isLeft}，isLeft: true 左孩子，false 右孩子
        Stack<int[]> ranges = new Stack<>();
        Stack<TreeNode> parents = new Stack<>();
        Stack<Boolean> directions = new Stack<>();
        if (mid - 1 >= 0) {
            ranges.push(new int[]{0, mid - 1});
            parents.push(root);
            directions.push(true);
        }
        if (mid + 1 < n) {
            ranges.push(new int[]{mid + 1, n - 1});
            parents.push(root);
            directions.push(false);
        }
        while (!ranges.isEmpty()) {
            int[] range = ranges.pop();
            int l = range[0], r = range[1];
            TreeNode parent = parents.pop();
            boolean isLeft = directions.pop();
            int m = l + (r - l) / 2;
            TreeNode node = new TreeNode(nums[m]);
            if (isLeft) parent.left = node;
            else parent.right = node;
            if (m - 1 >= l) {
                ranges.push(new int[]{l, m - 1});
                parents.push(node);
                directions.push(true);
            }
            if (m + 1 <= r) {
                ranges.push(new int[]{m + 1, r});
                parents.push(node);
                directions.push(false);
            }
        }
        return root;
    }
}
```

```python [Python]
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums:
            return None
        n = len(nums)
        mid = (n - 1) // 2
        root = TreeNode(nums[mid])
        # 栈中存储 (左边界, 右边界, 父节点, 是否为左孩子)
        stack = []
        if mid - 1 >= 0:
            stack.append((0, mid - 1, root, True))
        if mid + 1 < n:
            stack.append((mid + 1, n - 1, root, False))
        while stack:
            l, r, parent, is_left = stack.pop()
            m = (l + r) // 2
            node = TreeNode(nums[m])
            if is_left:
                parent.left = node
            else:
                parent.right = node
            if m - 1 >= l:
                stack.append((l, m - 1, node, True))
            if m + 1 <= r:
                stack.append((m + 1, r, node, False))
        return root
```

```go [Go]
func sortedArrayToBST(nums []int) *TreeNode {
    if len(nums) == 0 {
        return nil
    }
    n := len(nums)
    mid := (n - 1) / 2
    root := &TreeNode{Val: nums[mid]}
    type stackItem struct {
        l, r   int
        parent *TreeNode
        isLeft bool
    }
    stack := []stackItem{}
    if mid-1 >= 0 {
        stack = append(stack, stackItem{l: 0, r: mid - 1, parent: root, isLeft: true})
    }
    if mid+1 < n {
        stack = append(stack, stackItem{l: mid + 1, r: n - 1, parent: root, isLeft: false})
    }
    for len(stack) > 0 {
        item := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        l, r, parent, isLeft := item.l, item.r, item.parent, item.isLeft
        m := l + (r-l)/2
        node := &TreeNode{Val: nums[m]}
        if isLeft {
            parent.Left = node
        } else {
            parent.Right = node
        }
        if m-1 >= l {
            stack = append(stack, stackItem{l: l, r: m - 1, parent: node, isLeft: true})
        }
        if m+1 <= r {
            stack = append(stack, stackItem{l: m + 1, r: r, parent: node, isLeft: false})
        }
    }
    return root
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

typedef struct {
    int l, r;
    struct TreeNode* parent;
    bool isLeft;
} StackItem;

struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {
    if (numsSize == 0) return NULL;
    int mid = (numsSize - 1) / 2;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = nums[mid];
    root->left = root->right = NULL;
    StackItem* stack = (StackItem*)malloc(numsSize * sizeof(StackItem));
    int top = 0;
    if (mid - 1 >= 0) {
        stack[top].l = 0;
        stack[top].r = mid - 1;
        stack[top].parent = root;
        stack[top].isLeft = true;
        top++;
    }
    if (mid + 1 < numsSize) {
        stack[top].l = mid + 1;
        stack[top].r = numsSize - 1;
        stack[top].parent = root;
        stack[top].isLeft = false;
        top++;
    }
    while (top > 0) {
        top--;
        StackItem item = stack[top];
        int l = item.l, r = item.r;
        struct TreeNode* parent = item.parent;
        bool isLeft = item.isLeft;
        int m = l + (r - l) / 2;
        struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        node->val = nums[m];
        node->left = node->right = NULL;
        if (isLeft) parent->left = node;
        else parent->right = node;
        if (m - 1 >= l) {
            stack[top].l = l;
            stack[top].r = m - 1;
            stack[top].parent = node;
            stack[top].isLeft = true;
            top++;
        }
        if (m + 1 <= r) {
            stack[top].l = m + 1;
            stack[top].r = r;
            stack[top].parent = node;
            stack[top].isLeft = false;
            top++;
        }
    }
    free(stack);
    return root;
}
```

```cpp [C++]
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        if (nums.empty()) return nullptr;
        int n = nums.size();
        int mid = (n - 1) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        struct StackItem {
            int l, r;
            TreeNode* parent;
            bool isLeft;
        };
        vector<StackItem> st;
        if (mid - 1 >= 0) st.push_back({0, mid - 1, root, true});
        if (mid + 1 < n) st.push_back({mid + 1, n - 1, root, false});
        while (!st.empty()) {
            StackItem item = st.back();
            st.pop_back();
            int l = item.l, r = item.r;
            TreeNode* parent = item.parent;
            bool isLeft = item.isLeft;
            int m = l + (r - l) / 2;
            TreeNode* node = new TreeNode(nums[m]);
            if (isLeft) parent->left = node;
            else parent->right = node;
            if (m - 1 >= l) st.push_back({l, m - 1, node, true});
            if (m + 1 <= r) st.push_back({m + 1, r, node, false});
        }
        return root;
    }
};
```

```javascript [JavaScript]
var sortedArrayToBST = function(nums) {
    if (nums.length === 0) return null;
    const n = nums.length;
    const mid = Math.floor((n - 1) / 2);
    const root = new TreeNode(nums[mid]);
    const stack = [];
    if (mid - 1 >= 0) stack.push([0, mid - 1, root, true]);
    if (mid + 1 < n) stack.push([mid + 1, n - 1, root, false]);
    while (stack.length) {
        const [l, r, parent, isLeft] = stack.pop();
        const m = l + Math.floor((r - l) / 2);
        const node = new TreeNode(nums[m]);
        if (isLeft) parent.left = node;
        else parent.right = node;
        if (m - 1 >= l) stack.push([l, m - 1, node, true]);
        if (m + 1 <= r) stack.push([m + 1, r, node, false]);
    }
    return root;
};
```

```typescript [TypeScript]
function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (nums.length === 0) return null;
    const n = nums.length;
    const mid = Math.floor((n - 1) / 2);
    const root = new TreeNode(nums[mid]);
    const stack: [number, number, TreeNode, boolean][] = [];
    if (mid - 1 >= 0) stack.push([0, mid - 1, root, true]);
    if (mid + 1 < n) stack.push([mid + 1, n - 1, root, false]);
    while (stack.length) {
        const [l, r, parent, isLeft] = stack.pop()!;
        const m = l + Math.floor((r - l) / 2);
        const node = new TreeNode(nums[m]);
        if (isLeft) parent.left = node;
        else parent.right = node;
        if (m - 1 >= l) stack.push([l, m - 1, node, true]);
        if (m + 1 <= r) stack.push([m + 1, r, node, false]);
    }
    return root;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n)`，每个元素访问一次。
- **空间复杂度**：`O(log n)`（栈深度，平衡树高度），最坏情况为 `O(n)`（但数组有序保证了平衡性）。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 递归（分治）   | `O(n)`     | `O(log n)` | 简洁高效，推荐             |
| 迭代（栈模拟） | `O(n)`     | `O(log n)` | 避免递归，适合深度受限场景 |

**推荐**：在实际生产环境中，**递归方法（方法一）** 是最佳选择，代码简洁，且递归深度为平衡树高度 `log n`，不会导致栈溢出。迭代方法虽可避免递归，但代码复杂度较高，仅在必须完全避免递归时使用。两种方法均能正确构造最小高度树。
